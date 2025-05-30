import React , { useEffect, useState } from "react"

//data types
import { RecentActivityData } from "./datatype/Activities"
import { HeartRateData } from "./datatype/BPM"
import { ECGResponse } from "./datatype/ECG"
import { HeartRateZoneData } from "./datatype/HeartRateZone"
import { CaloriesData, StepsData, DistanceData, FloorsData, ActiveMinutesData, SedentaryMinutesData } from "./datatype/Regular"
import { SleepData } from "./datatype/Sleep"

// Tiles content
import BPM from "./tiles_content/BPM"
import Calories from "./tiles_content/calories"
import RecentActivity from "./tiles_content/RecentActivity"

import { Sleep } from "./tiles_content/Sleep"
import { ActiveMinutes } from "./tiles_content/activeMinutes"
import { Distance } from "./tiles_content/distanceWalked"
import { Floors } from "./tiles_content/floorsClimbed"
import { HeartRateZones } from "./tiles_content/HRzones"
import { Sedentary } from "./tiles_content/sedentaryMinutes"
import { Steps } from "./tiles_content/Steps"
import { HRVDaily } from "./tiles_content/HRVDaily"
import { HRVContinuous } from "./tiles_content/HRVContinuous"

// fake/temporary data
import json_bpm from "./heart.json"
import json_sleep from "./sleep.json"
import json_cardio from "./cardio_fitness.json"

interface TileProps {
  title: string
  type: string
  onRemove: () => void
  selectedDate: string
}



// Helper
// const fetchFitbit = async (endpoint: string) => {
//   const token = localStorage.getItem("fitbit_access_token");
//   if (!token) throw new Error("Missing access token");
//
//   const res = await fetch(`${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//     },
//   });
//
//   if (!res.ok) throw new Error(`Fitbit API error: ${res.status}`);
//   return res.json();
// };
const CACHE_TTL = 1000 * 60 * 60 * 2; // 2 hours
const CLEAN_INTERVAL = 1000 * 60 * 30; // cleaning cache is not allowed if last clean was 30 minutes ago: TODO: implement a force clean button or something
const cleanExpiredCache = () => {
  const now = Date.now();
  const lastClean = Number(localStorage.getItem("fitbit_cache_last_cleaned") || 0);

  if (now - lastClean < CLEAN_INTERVAL) return;

  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key?.startsWith("fitbit_cache_")) {
      try {
        const cached = JSON.parse(localStorage.getItem(key)!);
        if (now - cached.timestamp > CACHE_TTL) {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    }
  }

  localStorage.setItem("fitbit_cache_last_cleaned", now.toString());
};



const fetchFitbit = async (endpoint: string) => {
  cleanExpiredCache(); // clean old entries on each call - FIXED: CACHE max frequency is 30 minutes now
  const key = endpoint.trim();
  const now = Date.now();

  // Check localStorage cache
  const cachedRaw = localStorage.getItem("fitbit_cache_" + key);
  if (cachedRaw) {
    try {
      const cached = JSON.parse(cachedRaw);
      if (now - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }

  const token = localStorage.getItem("fitbit_access_token");
  if (!token) throw new Error("Missing access token");

  const res = await fetch(key, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error(`Fitbit API error: ${res.status}`);

  const data = await res.json();

  // Save to cache
  localStorage.setItem(
    "fitbit_cache_" + key,
    JSON.stringify({ data, timestamp: now })
  );

  return data;
};


// Requests



const fetchHeartRateData = async (selectedDate: string): Promise<HeartRateData> => {
  // const data = await fetchFitbit(`/1/user/-/activities/heart/date/${selectedDate}/1d/1min/time/00:00/23:59.json`);
  const data = json_bpm;
  return data;
}

//useless for fitbit inspire 3 - maybe other fitbits. But not used in this app anymore
const fetchECGData = async (selectedDate: string): Promise<ECGResponse> => {
  const data = await fetchFitbit(`/1/user/-/ecg/list.json?afterDate=${selectedDate}&sort=asc&limit=1&offset=0`);
  return data;
};

const fetchCalories = async (selectedDate: string): Promise<CaloriesData> => {
  const data = await fetchFitbit(`/1/user/-/activities/date/${selectedDate}.json`);
  return data.summary.caloriesOut;
};

// const fetchSleepData = async (selectedDate: string): Promise<SleepResponse> => {
//   const data = await fetchFitbit(`/1.2/user/-/sleep/date/${selectedDate}.json`);
//   return data as SleepResponse;
// };
const fetchSleepData = async (selectedDate: string): Promise<SleepData> => {
  const data = json_sleep;
  return data 
};

const fetchSteps = async (selectedDate: string): Promise<StepsData> => {
  const data = await fetchFitbit(`/1/user/-/activities/date/${selectedDate}.json`);
  return data.summary.steps;
};

const fetchDistance = async (selectedDate: string): Promise<DistanceData> => {
  const data = await fetchFitbit(`/1/user/-/activities/date/${selectedDate}.json`);
  return data.summary.distances.find((d: any) => d.activity === "total").distance;
};

const fetchFloors = async (selectedDate: string): Promise<FloorsData> => { // wrong endpoint TODO
  const data = await fetchFitbit(`/1/user/-/activities/date/${selectedDate}.json`);
  return data.summary.floors;
};

const fetchActiveMinutes = async (selectedDate: string): Promise<ActiveMinutesData> => {
  const data = await fetchFitbit(`/1/user/-/activities/date/${selectedDate}.json`);
  return data.summary.fairlyActiveMinutes + data.summary.veryActiveMinutes;
};

const fetchSedentaryMinutes = async (selectedDate: string): Promise<SedentaryMinutesData> => {
  const data = await fetchFitbit(`/1/user/-/activities/date/${selectedDate}.json`);
  return data.summary.sedentaryMinutes;
};

const fetchRecentActivity = async (selectedDate: string): Promise<RecentActivityData> => {
const data = await fetchFitbit(`/1/user/-/activities/list.json?afterDate=${selectedDate}&sort=desc&limit=5&offset=0`);
  return data;
};

interface HRVData {
    dailyRmssd: number
    deepRmssd: number
}
interface HRVDay {
    value: HRVData
    dateTime: string
}

const fetchHRVDay = async (selectedDate: string): Promise<HRVDay> => {
  const data = await fetchFitbit(` /1/user/-/hrv/date/${selectedDate}.json`);
  return data.hrv[0];
};

interface HRVcontinuous {
    data: HRVDay[] // yes very weird but that's the same format
}

// throughout day HRV
const fetchHRVcontinuous = async (selectedDate: string): Promise<HRVcontinuous> => {
  const data = await fetchFitbit(` /1/user/-/hrv/date/${selectedDate}/2025-05-21.json`); //TODO fix the date+1 error (30/31 -> 1)
  return data.hrv;
};

// TODO maybe do this in the future... but not priority right now (20/05/2025)
/*
const fetchHeartZones = async (): Promise<HeartZonesData> => {
  const data = await fetchFitbit(
    `/1/user/-/activities/heart/date/today/1d.json`
  );

  const levels = data.activities?.[0]?.activityLevel || [];

  const zoneMap: Record<string, number> = {
    outOfRange: 0,
    fatBurn: 0,
    cardio: 0,
    peak: 0,
  };

  for (const level of levels) {
    switch (level.name) {
      case 'sedentary':
        zoneMap.outOfRange += level.minutes;
        break;
      case 'lightly':
        zoneMap.fatBurn += level.minutes;
        break;
      case 'fairly':
        zoneMap.cardio += level.minutes;
        break;
      case 'very':
        zoneMap.peak += level.minutes;
        break;
    }
  }

  return {
    outOfRange: zoneMap.outOfRange,
    fatBurn: zoneMap.fatBurn,
    cardio: zoneMap.cardio,
    peak: zoneMap.peak,
  };
};
*/






//
// const HRVdata =  {
//   "hrv": [
//     {
//       "value": {
//         "dailyRmssd": 34.938,
//         "deepRmssd": 31.567
//       },
//       "dateTime": "2021-10-25"
//     }
//   ]
// }     
//



export default function Tile({title, type, onRemove, selectedDate}: TileProps) {
    const [caloriesData, setCaloriesData] = useState<number | null>(null);
    // const [sleepData, setSleepData] = useState<SleepResponse | null>(null);
    const [sleepData, setSleepData] = useState<SleepData | null>(null);
    const [stepsData, setStepsData] = useState<number | null>(null);
    const [distanceData, setDistanceData] = useState<number | null>(null);
    const [floorsData, setFloorsData] = useState<number | null>(null);
    const [activeMinutesData, setActiveMinutesData] = useState<number | null>(null);
    const [sedentaryMinutesData, setSedentaryMinutesData] = useState<number | null>(null);
    const [heartZonesData, setHeartZonesData] = useState<HeartRateZoneData | null>(null);
    const [recentActivityData, setRecentActivityData] = useState<RecentActivityData | null>(null);
    const [bpmData, setBpmData] = useState<HeartRateData| null>(null);
    const [hrvDailyData, setHrvDailyData] = useState<HRVDay | null>(null);
    const [hrvContinuousData, setHrvContinuousData] = useState<HRVDay[] | null>(null);


console.log(selectedDate)

    useEffect(() => {
  const loadData = async () => {
    try {
      if (type === "calories") {
        setCaloriesData(await fetchCalories(selectedDate));
      } else if (type === "sleep") {
        setSleepData(await fetchSleepData(selectedDate));
      } else if (type === "steps") {
        setStepsData(await fetchSteps(selectedDate));
      } else if (type === "distance") {
        setDistanceData(await fetchDistance(selectedDate));
      } else if (type === "floors") {
        setFloorsData(await fetchFloors(selectedDate));
      } else if (type === "activeMinutes") {
        setActiveMinutesData(await fetchActiveMinutes(selectedDate));
      } else if (type === "sedentary") {
        setSedentaryMinutesData(await fetchSedentaryMinutes(selectedDate));
      // } else if (type === "heartZones") {
      //   setHeartZonesData(await fetchHeartZones());
      } else if (type === "recentActivity") {
        setRecentActivityData(await fetchRecentActivity(selectedDate));
      } else if (type === "BPM") {
        setBpmData(await fetchHeartRateData(selectedDate));
      }  else if (type === "hrvDaily") {
          const data = await fetchHRVDay(selectedDate);
          setHrvDailyData(data);
      } else if (type === "hrvContinuous") {
          const data = await fetchHRVcontinuous(selectedDate);
          setHrvContinuousData(data.data);
      }

    } catch (err) {
      console.error(`Failed to fetch Fitbit data for type=${type}:`, err);
    }
}
  loadData();
}, [type, selectedDate]);





  return (
  <div className={`bg-[#1d235e] rounded-xl h-full w-full relative shadow `}>
      <button
        className="absolute top-1 right-2 text-white z-10"
        onClick={onRemove}
      >
        ✕
      </button>
    <div className="p-4 bg-[#11163d] rounded-xl h-full w-full relative">

      <div className="text-sm text-right text-white/60 mb-2">
        <p>{title}</p>
      </div>

      <div className="flex justify-center items-center h-full">
  {type === "calories" && <Calories data={caloriesData} />}
  {type === "steps" && <Steps data={stepsData} goal={10000} />}
  {type === "distance" && <Distance data={distanceData} />}
  {type === "floors" && <Floors data={floorsData} />}
  {type === "activeMinutes" && <ActiveMinutes data={activeMinutesData} />}
  {type === "sedentary" && <Sedentary data={sedentaryMinutesData} />}
      {type === "recentActivity" && <RecentActivity data={recentActivityData} />}
      {type === "sleep" && <Sleep data={sleepData} />}
      {type === "BPM" && <BPM title={title} data={bpmData} />}
      {type === "hrvDaily" && <HRVDaily data={hrvDailyData} />}
      </div>

    </div>
  </div>
);



}


/*
{type === "hrvContinuous" && <HRVContinuous data={hrvContinuousData} />}
      {type === "heartZones" && <HeartRateZones zones={heartZonesData} />}
*/

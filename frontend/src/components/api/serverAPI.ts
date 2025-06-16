import { RecentActivityData } from "../datatype/Activities"
import { HeartRateData } from "../datatype/BPM"
import { ECGResponse } from "../datatype/ECG"
import { HRVDay, HRVcontinuous } from "../datatype/HRV"
import { HeartRateZoneData } from "../datatype/HeartRateZone"
import { CaloriesData, StepsData, DistanceData, FloorsData, ActiveMinutesData, SedentaryMinutesData } from "../datatype/Regular"
import { SleepData } from "../datatype/Sleep"


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

const fetchBackend = async (endpoint: string) => {
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
    console.log(data)
    if (data.error) {
        //check if server detected an error in data. If so don't inform user. If not cache and continue
        console.log("error loading data: ")
        console.log(data.error)
    } else {
        // Save to cache
        localStorage.setItem(
            "fitbit_cache_" + key,
            JSON.stringify({ data, timestamp: now })
        );
    }
    return data;
};


// Requests
export const fetchHeartRateData = async (selectedDate: string): Promise<HeartRateData> => {
    const res = await fetchBackend(`/api/fitbit/heart-rate/${selectedDate}`);
    return res;
};

export const fetchECGData = async (selectedDate: string): Promise<ECGResponse> => {
    const res = await fetchBackend(`/api/fitbit/ecg/${selectedDate}`);
    return res;
};

export const fetchCalories = async (selectedDate: string): Promise<CaloriesData> => {
    const res = await fetchBackend(`/api/fitbit/calories/${selectedDate}`);
    return res;
};

export const fetchSleepData = async (selectedDate: string): Promise<SleepData> => {
    const res = await fetchBackend(`/api/fitbit/sleep/${selectedDate}`);
    return res;
};

export const fetchSteps = async (selectedDate: string): Promise<StepsData> => {
    const res = await fetchBackend(`/api/fitbit/steps/${selectedDate}`);
    return res;
};

export const fetchDistance = async (selectedDate: string): Promise<DistanceData> => {
    const res = await fetchBackend(`/api/fitbit/distance/${selectedDate}`);
    return res;
};

export const fetchFloors = async (selectedDate: string): Promise<FloorsData> => {
    const res = await fetchBackend(`/api/fitbit/floors/${selectedDate}`);
    return res;
};

export const fetchActiveMinutes = async (selectedDate: string): Promise<ActiveMinutesData> => {
    const res = await fetchBackend(`/api/fitbit/active-minutes/${selectedDate}`);
    return res;
};

export const fetchSedentaryMinutes = async (selectedDate: string): Promise<SedentaryMinutesData> => {
    const res = await fetchBackend(`/api/fitbit/sedentary-minutes/${selectedDate}`);
    return res;
};

export const fetchRecentActivity = async (selectedDate: string): Promise<RecentActivityData> => {
    const res = await fetchBackend(`/api/fitbit/recent-activity/${selectedDate}`);
    return res;
};

export const fetchHRVDay = async (selectedDate: string): Promise<HRVDay> => {
    const res = await fetchBackend(`/api/fitbit/hrv-daily/${selectedDate}`);
    return res;
};

export const fetchHRVcontinuous = async (selectedDate: string): Promise<HRVcontinuous> => {
    const res = await fetchBackend(`/api/fitbit/hrv-continuous/${selectedDate}`);
    return res;
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

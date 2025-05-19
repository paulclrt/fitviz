import React , { useEffect } from "react"

import BPM from "./tiles_content/BPM"
import Calories from "./tiles_content/calories"
import RecentActivity from "./tiles_content/RecentActivity"

import { ActiveMinutes } from "./tiles_content/activeMinutes"
import { Distance } from "./tiles_content/distanceWalked"
import { Floors } from "./tiles_content/floorsClimbed"
import { HeartRateZones } from "./tiles_content/HRzones"
import { Sedentary } from "./tiles_content/sedentaryMinutes"
import { Steps } from "./tiles_content/Steps"

interface TileProps {
  title: string
  type: string
  onRemove: () => void
}


const ACTIVITYdata = {
  "activities": [],
  "goals": {
    "activeMinutes": 30,
    "caloriesOut": 1950,
    "distance": 8.05,
    "floors": 10,
    "steps": 6800
  },
  "summary": {
    "activeScore": -1,
    "activityCalories": 525,
    "calorieEstimationMu": 2241,
    "caloriesBMR": 1973,
    "caloriesOut": 2628,
    "caloriesOutUnestimated": 2628,
    "customHeartRateZones": [
      {
        "caloriesOut": 2616.7788,
        "max": 140,
        "min": 30,
        "minutes": 1432,
        "name": "Below"
      },
      {
        "caloriesOut": 0,
        "max": 165,
        "min": 140,
        "minutes": 0,
        "name": "Custom Zone"
      },
      {
        "caloriesOut": 0,
        "max": 220,
        "min": 165,
        "minutes": 0,
        "name": "Above"
      }
    ],
    "distances": [
      {
        "activity": "total",
        "distance": 1.26
      },
      {
        "activity": "tracker",
        "distance": 1.26
      },
      {
        "activity": "loggedActivities",
        "distance": 0
      },
      {
        "activity": "veryActive",
        "distance": 0
      },
      {
        "activity": "moderatelyActive",
        "distance": 0
      },
      {
        "activity": "lightlyActive",
        "distance": 1.25
      },
      {
        "activity": "sedentaryActive",
        "distance": 0
      }
    ],
    "elevation": 0,
    "fairlyActiveMinutes": 0,
    "floors": 0,
    "heartRateZones": [
      {
        "caloriesOut": 1200.33336,
        "max": 86,
        "min": 30,
        "minutes": 812,
        "name": "Out of Range"
      },
      {
        "caloriesOut": 1409.4564,
        "max": 121,
        "min": 86,
        "minutes": 619,
        "name": "Fat Burn"
      },
      {
        "caloriesOut": 6.98904,
        "max": 147,
        "min": 121,
        "minutes": 1,
        "name": "Cardio"
      },
      {
        "caloriesOut": 0,
        "max": 220,
        "min": 147,
        "minutes": 0,
        "name": "Peak"
      }
    ],
    "lightlyActiveMinutes": 110,
    "marginalCalories": 281,
    "restingHeartRate": 77,
    "sedentaryMinutes": 802,
    "steps": 1698,
    "useEstimation": true,
    "veryActiveMinutes": 0
  }
}

function getTotalCalories(data: any) {
  return data.summary.caloriesOut;
}

function getTotalSteps(data: any) {
  return data.summary.steps;
}

function getRecentActivity(data: any) {
  return data.activities.map((activity: any) => ({
    name: activity.name || "Unnamed Activity",
    calories: activity.calories
  }));
}

export function getHeartRateZones(data: any): { name: string; minutes: number }[] {
  return (data?.summary?.heartRateZones ?? []).map((z: any) => ({
    name: z.name,
    minutes: z.minutes
  }));
}

// Distance (total)
export function getTotalDistance(data: any): number {
  const total = data?.summary?.distances?.find((d: any) => d.activity === "total");
  return total?.distance ?? 0;
}

// Active minutes
export function getActiveMinutes(data: any): number {
  return data?.summary?.lightlyActiveMinutes + data?.summary?.fairlyActiveMinutes + data?.summary?.veryActiveMinutes ?? 0;
}

// Floors climbed
export function getFloors(data: any): number {
  return data?.summary?.floors ?? 0;
}

// Sedentary minutes
export function getSedentaryMinutes(data: any): number {
  return data?.summary?.sedentaryMinutes ?? 0;
}




const HRVdata =  {
  "hrv": [
    {
      "value": {
        "dailyRmssd": 34.938,
        "deepRmssd": 31.567
      },
      "dateTime": "2021-10-25"
    }
  ]
}     

const BPMdata = {
    "ecgReadings": [
    {
        "startTime": "2022-09-28T17:12:30.222",
        "averageHeartRate": 70,
        "resultClassification": "Normal Sinus Rhythm",
        "waveformSamples": [
130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,130, 176, 252, 365,
            
        ],
        "samplingFrequencyHz": "250",
        "scalingFactor": 10922,
        "numberOfWaveformSamples": 7700,
        "leadNumber": 1,
        "featureVersion": "1.2.3-2.11-2.14",
        "deviceName": "Sense",
        "firmwareVersion": "1.2.3"
    }
    ],
    pagination : {
        "afterDate": "2022-09-28T20:00:00",
        "limit": 1,
        "next": "https://api.fitbit.com/1/user/-/ecg/list.json?offset=10&limit=10&sort=asc&afterDate=2022-09-28T21:00:00",
        "offset": 0,
        "previous": "",
        "sort": "asc"
    }
}

export default function Tile({title, type, onRemove}: TileProps) {

    const totalCalories = getTotalCalories(ACTIVITYdata);
const totalSteps = getTotalSteps(ACTIVITYdata);
const recentActivities = getRecentActivity(ACTIVITYdata);
const zones = getHeartRateZones(ACTIVITYdata);
const totalDistance = getTotalDistance(ACTIVITYdata);
const activeMinutes = getActiveMinutes(ACTIVITYdata);
const floors = getFloors(ACTIVITYdata);
const sedentaryMinutes = getSedentaryMinutes(ACTIVITYdata);



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
      {type === "BPM" && <BPM title={title} data={BPMdata} />}
  {type === "calories" && <Calories data={totalCalories} />}
  {type === "steps" && <Steps data={totalSteps} />}
  {type === "distance" && <Distance data={totalDistance} />}
  {type === "floors" && <Floors data={floors} />}
  {type === "activeMinutes" && <ActiveMinutes data={activeMinutes} />}
  {type === "sedentary" && <Sedentary data={sedentaryMinutes} />}
  {type === "heartZones" && <HeartRateZones zones={zones} />}
  {type === "recentActivity" && <RecentActivity data={recentActivities} />}
      </div>

    </div>
  </div>
);



}

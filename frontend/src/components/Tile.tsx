import React , { useEffect, useState } from "react"
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { motion } from "motion/react";

// api calls
import { 
    fetchHeartRateData,
    fetchCalories,
    fetchSleepData,
    fetchSteps,
    fetchDistance,
    fetchFloors,
    fetchActiveMinutes,
    fetchSedentaryMinutes,
    fetchRecentActivity,
    fetchHRVDay,
    fetchHRVcontinuous
} from "./api/serverAPI"

//data types
import { RecentActivityData } from "./datatype/Activities"
import { HeartRateData } from "./datatype/BPM"
import { ECGResponse } from "./datatype/ECG"
import { HeartRateZoneData } from "./datatype/HeartRateZone"
import { CaloriesData, StepsData, DistanceData, FloorsData, ActiveMinutesData, SedentaryMinutesData } from "./datatype/Regular"
import { SleepData } from "./datatype/Sleep"
import { HRVDay, HRVcontinuous } from "./datatype/HRV"

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
import { HRVContinue } from "./tiles_content/HRVContinue"


interface TileProps {
  title: string
  x_size: number
  y_size: number
  type: string
  onRemove: () => void
  selectedDate: string
}



export default function Tile({title, x_size, y_size, type, selectedDate, onRemove}: TileProps) {
    const [caloriesData, setCaloriesData] = useState<number | null>(null);
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


    const [isCardOpened, setIsCardOpened] = useState<boolean>(false);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: title,
        animateLayoutChanges: () => true,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };


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


    
    function handleCardExpand() {
        console.log("test cacrd expand")
        setIsCardOpened(!isCardOpened);

    }

    const baseStyle = {
        // height: "100%",
        // width: "100%",
        padding: "1rem",
        // borderRadius: "1rem",
        // boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        // backgroundColor: "#1d235e",
        // position: "relative",
    };
    const expandedStyle = isCardOpened
        ? {
            width: "min(90vw, 95%)",
            height: "calc(100% - 10rem)",
            overflowY: "auto",
            overflowX: "hidden",
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: "auto",
            zIndex: 11,
            display: "flex",
            flexDirection: "column",
        }
        : {};


    return (
        <>
        <motion.div
        className={`cursor-grab bg-[#1d235e] p-3 rounded-xl relative shadow col-span-${x_size} row-span-${y_size}`} 
        ref={setNodeRef} 
        {...attributes} 
        {...listeners}

        style={{ ...style, ...baseStyle, ...expandedStyle } as React.CSSProperties }
        // layout
        transition={{
            default: { ease: "linear" },
            layout: { duration: 0.3 }
        }}
        >

        <div className={`bg-[#1d235e] rounded-xl h-full w-full relative shadow `} >
        <button
        className="absolute top-1 right-2 text-white z-10"
        onClick={(e) => {
            // e.stopPropagation();
            onRemove();
        }}
        >
        ✕
        </button>
        <div className="p-4 bg-[#11163d] rounded-xl h-full w-full relative">

        <div className="text-sm text-right text-white/60 mb-2">
        <p>{title}</p>
        </div>

        <div 
        className="flex justify-center items-center h-full cursor-pointer" 
        id="tile-content" /*so dnd-kit doesn't triggers*/
        onClick={(e) => {
            handleCardExpand();
            e.preventDefault();
            e.stopPropagation();
        }}
        >
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
        </motion.div>
        </>
    );



}


/*
   {type === "hrvContinuous" && <HRVContinuous data={hrvContinuousData} />}
   {type === "heartZones" && <HeartRateZones zones={heartZonesData} />}



        <div className={`cursor-grab bg-[#1d235e] p-3 rounded-xl relative shadow col-span-${x_size} row-span-${y_size}`} ref={setNodeRef} style={style} {...attributes} {...listeners}> 
        </div>
   */

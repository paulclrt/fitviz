import { SleepStageChart } from "./SleepStageChart"


interface SleepLevelData {
    dateTime: string;
    level: "wake" | "light" | "deep" | "rem";
    seconds: number;
}

interface SleepLevelSummary {
    count: number;
    minutes: number;
    thirtyDayAvgMinutes: number;
}

interface SleepLevels {
    data: SleepLevelData[];
    shortData: SleepLevelData[];
    summary: {
        deep: SleepLevelSummary;
        light: SleepLevelSummary;
        rem: SleepLevelSummary;
        wake: SleepLevelSummary;
    };
}

interface SleepLog {
    dateOfSleep: string;
    duration: number;
    efficiency: number;
    endTime: string;
    infoCode: number;
    isMainSleep: boolean;
    levels: SleepLevels;
    logId: number;
    minutesAfterWakeup: number;
    minutesAsleep: number;
    minutesAwake: number;
    minutesToFallAsleep: number;
    logType: string;
    startTime: string;
    timeInBed: number;
    type: "stages";
}

interface SleepSummaryData {
    deep: number;
    light: number;
    rem: number;
    wake: number;
}

interface SleepSummary {
    stages: SleepSummaryData;
    totalMinutesAsleep: number;
    totalSleepRecords: number;
    totalTimeInBed: number;
}

interface SleepResponse {
    sleep: SleepLog[];
    summary: SleepSummary;
}

interface SleepResponseProps {
    data: SleepResponse | null;
}



export function Sleep({ data }: SleepResponseProps) {
    if (data === null) {
        return (
            <div>
            <p>Not sleep data found</p>
            </div>
        );
    } else {
        const mainSleep = data.sleep.find((log) => log.isMainSleep);
        if (!mainSleep) {
            return (
                <div>
                <p>No main sleep session found</p>
                </div>
            )
        } 
        const formatDuration = (ms: number) => {
            const totalMinutes = Math.floor(ms / 60000);
            const h = Math.floor(totalMinutes / 60);
            const m = totalMinutes % 60;
            return `${h}h ${m}m`;
        }

        const total =
            mainSleep.levels.summary.deep.minutes +
            mainSleep.levels.summary.light.minutes +
            mainSleep.levels.summary.rem.minutes +
            mainSleep.levels.summary.wake.minutes;

        const stages = [
            { label: "Deep", color: "#3b82f6", value: mainSleep.levels.summary.deep.minutes },
            { label: "Light", color: "#10b981", value: mainSleep.levels.summary.light.minutes },
            { label: "REM", color: "#facc15", value: mainSleep.levels.summary.rem.minutes },
            { label: "Wake", color: "#ef4444", value: mainSleep.levels.summary.wake.minutes }
        ];

        const filteredStages = mainSleep.levels.data.filter(stage =>
                                                            ["deep", "light", "rem", "wake"].includes(stage.level)
                                                           );

                                                           return (
                                                               <div className="flex gap-4 flex-col lg:flex-row">
                                                               <div className="flex-1">
                                                               <div className="p-4 rounded-xl bg-[#1a1f3c] text-white">
                                                               <h2 className="text-xl font-bold mb-2">Sleep Summary</h2>
                                                               <p className="text-sm text-gray-300 mb-1">
                                                               Duration: <span className="text-white">{formatDuration(mainSleep.duration)}</span>
                                                               </p>
                                                               <p className="text-sm text-gray-300 mb-1">
                                                               Efficiency: <span className="text-white">{mainSleep.efficiency}%</span>
                                                               </p>
                                                               <p className="text-sm text-gray-300 mb-4">
                                                               In bed: <span className="text-white">{mainSleep.timeInBed} min</span>
                                                               </p>

                                                               <div className="w-full h-4 flex overflow-hidden rounded mb-2">
                                                               {stages.map((stage) => (
                                                                   <div
                                                                   key={stage.label}
                                                                   style={{
                                                                       width: `${(stage.value / total) * 100}%`,
                                                                       backgroundColor: stage.color
                                                                   }}
                                                                   />
                                                               ))}
                                                               </div>

                                                               <ul className="text-xs text-gray-200 space-y-1">
                                                               {stages.map((stage) => (
                                                                   <li key={stage.label}>
                                                                   <span
                                                                   className="inline-block w-3 h-3 rounded-full mr-2"
                                                                   style={{ backgroundColor: stage.color }}
                                                                   ></span>
                                                                   {stage.label}: {stage.value} min
                                                                   </li>
                                                               ))}
                                                               </ul>
                                                               </div>
                                                               </div>

                                                               <div className="flex-1">
                                                               <h3 className="text-sm text-gray-400 mb-1">Sleep Stages Over Time</h3>
                                                               <SleepStageChart stages={filteredStages} />
                                                               <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                               <span>{new Date(mainSleep.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                               <span>{new Date(mainSleep.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                               </div>
                                                               </div>
                                                               </div>
                                                           )
    }

}


// export interface SleepLevelData {
//   dateTime: string;
//   level: "wake" | "light" | "deep" | "rem";
//   seconds: number;
// }
//
// export interface SleepLevelSummary {
//   count: number;
//   minutes: number;
//   thirtyDayAvgMinutes: number;
// }
//
// export interface SleepLevels {
//   data: SleepLevelData[];
//   shortData: SleepLevelData[];
//   summary: {
//     deep: SleepLevelSummary;
//     light: SleepLevelSummary;
//     rem: SleepLevelSummary;
//     wake: SleepLevelSummary;
//   };
// }
//
// export interface SleepLog {
//   dateOfSleep: string;
//   duration: number;
//   efficiency: number;
//   endTime: string;
//   infoCode: number;
//   isMainSleep: boolean;
//   levels: SleepLevels;
//   logId: number;
//   minutesAfterWakeup: number;
//   minutesAsleep: number;
//   minutesAwake: number;
//   minutesToFallAsleep: number;
//   logType: string;
//   startTime: string;
//   timeInBed: number;
//   type: "stages";
// }
//
// export interface SleepSummaryData {
//   deep: number;
//   light: number;
//   rem: number;
//   wake: number;
// }
//
// export interface SleepSummary {
//   stages: SleepSummaryData;
//   totalMinutesAsleep: number;
//   totalSleepRecords: number;
//   totalTimeInBed: number;
// }
//
// export interface SleepResponse {
//   sleep: SleepLog[];
//   summary: SleepSummary;
// }

export interface SleepData {
  sleep: SleepEntry[];
  summary: {
    stages: {
      deep: number;
      light: number;
      rem: number;
      wake: number;
    };
    totalMinutesAsleep: number;
    totalSleepRecords: number;
    totalTimeInBed: number;
  };
}


export interface LevelDataEntry {
    level: string;
  dateTime: string;
  seconds: number;
}


export interface LevelsSummary {
  asleep?: { count: number; minutes: number };
  awake?: { count: number; minutes: number };
  restless?: { count: number; minutes: number };
  deep?: { count: number; minutes: number };
  light?: { count: number; minutes: number };
  rem?: { count: number; minutes: number };
  wake?: { count: number; minutes: number };
}


export interface Levels {
  data: LevelDataEntry[];
  summary: LevelsSummary;
  shortData?: any;
}

export interface SleepEntry {
  dateOfSleep: string;
  duration: number;       // in milliseconds
  efficiency: number;
  endTime: string;
  infoCode: number;
  isMainSleep: boolean;
  levels: Levels;
  logId: number;
  logType: string;
  minutesAfterWakeup: number;
  minutesAsleep: number;
  minutesAwake: number;
  minutesToFallAsleep: number;
  startTime: string;
  timeInBed: number;      // in minutes
  type: string;
}



export interface LevelSummary {
  deep: LevelStats;
  light: LevelStats;
  rem: LevelStats;
  wake: LevelStats;
}

export interface LevelStats {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes: number;
}






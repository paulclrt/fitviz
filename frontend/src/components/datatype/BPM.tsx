import { HeartRateZoneData } from "./HeartRateZone"


export interface ActivitiesHeartValue {
  customHeartRateZones: HeartRateZoneData[];
  heartRateZones: HeartRateZoneData[];
  restingHeartRate: number;
}

export interface ActivitiesHeart {
  dateTime: string;
  value: ActivitiesHeartValue;
}

export interface IntradayDataset {
  time: string; // "HH:MM:SS"
  value: number;
}

export interface ActivitiesHeartIntraday {
  dataset: IntradayDataset[];
  datasetInterval: number;
  datasetType: string; // e.g., "minute"
}

export interface HeartRateData {
  "activities-heart": ActivitiesHeart[];
  "activities-heart-intraday": ActivitiesHeartIntraday;
}

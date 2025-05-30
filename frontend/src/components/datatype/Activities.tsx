

// RECENT ACTIVITY
export interface ActivityLevel {
  minutes: number;
  name: "sedentary" | "lightly" | "fairly" | "very";
}

export interface ManualValuesSpecified {
  calories: boolean;
  distance: boolean;
  steps: boolean;
}

export interface Activity {
  activeDuration: number;
  activityLevel: ActivityLevel[];
  activityName: string;
  activityTypeId: number;
  calories: number;
  caloriesLink: string;
  duration: number;
  elevationGain: number;
  lastModified: string;
  logId: number;
  logType: string;
  manualValuesSpecified: ManualValuesSpecified;
  originalDuration: number;
  originalStartTime: string;
  startTime: string;
  steps: number;
  tcxLink: string;
}

export interface Pagination {
  afterDate: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  sort: "asc" | "desc";
}

export interface RecentActivityData {
  activities: Activity[];
  pagination: Pagination;
}


export interface HRVData {
    dailyRmssd: number
    deepRmssd: number
}
export interface HRVDay {
    value: HRVData
    dateTime: string
}

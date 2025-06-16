
export interface HRVData {
    dailyRmssd: number
    deepRmssd: number
}

export interface HRVDay {
    value: HRVData
    dateTime: string
}

export interface HRVcontinuous {
    data: HRVDay[] // yes very weird but that's the same format
}


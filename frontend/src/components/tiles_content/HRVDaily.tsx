interface HRVData {
    dailyRmssd: number
    deepRmssd: number
}
interface HRVDay {
    value: HRVData
    dateTime: string
}
interface HRVDailyProps {
  data: HRVDay | null;
}

export function HRVDaily({ data }: HRVDailyProps) {
  if (!data) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-center text-white">
      <p className="text-sm text-white/60 mb-1">{data.dateTime}</p>
      <p className="text-lg">Daily RMSSD: <span className="font-bold">{data.value.dailyRmssd}</span></p>
      <p className="text-lg">Deep RMSSD: <span className="font-bold">{data.value.deepRmssd}</span></p>
    </div>
  );
}


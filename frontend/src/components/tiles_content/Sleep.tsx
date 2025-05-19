import { SleepStageChart } from "./SleepStageChart"

interface SleepProps {
  data: {
    duration: number
    efficiency: number
    minutesAsleep: number
    timeInBed: number
    startTime: string
    endTime: string
    levels: {
      summary: {
        deep: { minutes: number }
        light: { minutes: number }
        rem: { minutes: number }
        wake: { minutes: number }
      }
      data: {
        dateTime: string
        level: "deep" | "light" | "rem" | "wake" | string // allow string to match API
        seconds: number
      }[]
    }
  }
}

interface Stage {
  dateTime: string
  level: "wake" | "light" | "deep" | "rem"
  seconds: number
}


export function Sleep({ data }: SleepProps) {
  const formatDuration = (ms: number) => {
    const totalMinutes = Math.floor(ms / 60000);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
  }

  const total = data.levels.summary.deep.minutes +
    data.levels.summary.light.minutes +
    data.levels.summary.rem.minutes +
    data.levels.summary.wake.minutes;

  const stages = [
    { label: "Deep", color: "#3b82f6", value: data.levels.summary.deep.minutes },
    { label: "Light", color: "#10b981", value: data.levels.summary.light.minutes },
    { label: "REM", color: "#facc15", value: data.levels.summary.rem.minutes },
    { label: "Wake", color: "#ef4444", value: data.levels.summary.wake.minutes }
  ];

  const filteredStages = data.levels.data.filter(
  (stage): stage is Stage =>
    ["deep", "light", "rem", "wake"].includes(stage.level)
);


  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <div className="flex-1">
        <div className="p-4 rounded-xl bg-[#1a1f3c] text-white">
          <h2 className="text-xl font-bold mb-2">Sleep Summary</h2>
          <p className="text-sm text-gray-300 mb-1">Duration: <span className="text-white">{formatDuration(data.duration)}</span></p>
          <p className="text-sm text-gray-300 mb-1">Efficiency: <span className="text-white">{data.efficiency}%</span></p>
          <p className="text-sm text-gray-300 mb-4">In bed: <span className="text-white">{data.timeInBed} min</span></p>

          <div className="w-full h-4 flex overflow-hidden rounded mb-2">
            {stages.map(stage => (
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
            {stages.map(stage => (
              <li key={stage.label}>
                <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: stage.color }}></span>
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
          <span>{new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  )
}


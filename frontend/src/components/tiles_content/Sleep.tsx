import { SleepStageChart } from "./SleepStageChart";
import { SleepData } from "../datatype/Sleep"



interface SleepPropsNew {
  data: SleepData | null;
}


function formatMinutes(data: number | null): string {
    if (data === null) { return "" }
    else {
        const hours: number = Math.floor(data / 60);
        const minutes: number = Math.floor(data % 60);
        let str: string = "";
        if (hours != 0) { str += `${hours}h`; }
        if (minutes != 0) { str += `${minutes}min`; }
        return str;
    }
}

export function Sleep({ data }: SleepPropsNew) {
  if (!data) return <div><p>No sleep data found</p></div>;

  const mainSleep = data.sleep.find(log => log.isMainSleep);
  if (!mainSleep) return <div><p>No main sleep session found</p></div>;

  const formatDuration = (ms: number) => {
    const totalMinutes = Math.floor(ms / 60000);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
  };


  // Provided summary from data.summary.stages
  const stageLabels = {
    deep: "Deep",
    light: "Light",
    rem: "REM",
    wake: "Wake",
  };

  const stageColor = {
    deep: "#3b82f6",
    light: "#10b981",
    rem: "#facc15",
    wake: "#ef4444",
  };

  const providedSummary = Object.entries(data.summary.stages).map(([key, minutes]) => ({
    label: stageLabels[key as keyof typeof stageLabels] || key,
    color: stageColor[key as keyof typeof stageColor] || "#888",
    minutes,
  }));

  const totalMinutes = providedSummary.reduce((sum, s) => sum + s.minutes, 0);

  // Example expected goals for sleep stages in minutes
  const expectedGoals: Record<string, number> = {
    deep: totalMinutes * 0.20,  // 20% deep sleep typical
    light: totalMinutes * 0.50, // 50% light sleep typical
    rem: totalMinutes * 0.25,   // 25% REM typical
    wake: totalMinutes * 0.05,  // 5% wake typical
  };

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

          <h3 className="mt-4 mb-1 text-sm font-semibold">Sleep Stages Breakdown</h3>

          {/* Bar with percentages and expected goals */}
<div className="w-full h-4 flex overflow-hidden rounded mb-2 border border-gray-600">
  {providedSummary.map(stage => {
    const percent = (stage.minutes / totalMinutes) * 100;
    return (
      <div
        key={stage.label}
        style={{ width: `${percent}%`, backgroundColor: stage.color, height: '100%' }}
        title={`${stage.label}: ${formatMinutes(stage.minutes)} (${percent.toFixed(1)}%)`}
      />
    );
  })}
  {/* Empty space for leftover time */}
  <div
    style={{ width: `${100 - providedSummary.reduce((acc, s) => acc + (s.minutes / totalMinutes) * 100, 0)}%`, backgroundColor: '#222' }}
    title="Unused sleep stage time"
  />
</div>



          <ul className="text-xs text-gray-200 space-y-1">
            {providedSummary.map(stage => {
              const goalMinutes = expectedGoals[stage.label.toLowerCase()] || 0;
              const percent = ((stage.minutes / goalMinutes) * 100).toFixed(1);
              const goalPercent = ((goalMinutes / totalMinutes) * 100).toFixed(1);
              return (
                <li key={stage.label}>
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: stage.color }}
                  ></span>
                  {stage.label}: {formatMinutes(stage.minutes)}/{formatMinutes(Math.round(goalMinutes))} ({percent}%)
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-sm text-gray-400 mb-1">Sleep Stages Over Time (Provided Summary)</h3>
<SleepStageChart stages={mainSleep.levels.data} />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{new Date(mainSleep.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{new Date(mainSleep.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}




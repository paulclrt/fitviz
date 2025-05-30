import React from "react";

interface LevelDataEntry {
  level: string;
  dateTime: string;
  seconds: number;
}

interface SleepStageChartProps {
  stages: LevelDataEntry[] | null;
}

const levelColor: Record<string, string> = {
  wake: "#ef4444",
  light: "#10b981",
  deep: "#3b82f6",
  rem: "#facc15",
};

export function SleepStageChart({ stages }: SleepStageChartProps) {
    if (!stages || stages.length === 0) {
    return <div style={{ height: 60, width: "100%" }}>No sleep data available</div>;
  }

  // Total duration in seconds for scaling
  const totalSeconds = stages.reduce((sum, s) => sum + s.seconds, 0);
let cumulative = 0;
  const stagesWithStart = stages.map(stage => {
    const start = cumulative;
    cumulative += stage.seconds;
    return { ...stage, start };
  });

  // Chart dimensions
  const width = 800; // svg width in px
  const rowHeight = 20;
  const rowGap = 8;
  const rectHeight = 14;
  const cornerRadius = 5;

  // Levels and their order
  const levels = ["wake", "light", "deep", "rem"];

  return (
    <div style={{ width: "100%", maxWidth: width }}>
      <svg
        width="100%"
        height={(rowHeight + rowGap) * levels.length}
        viewBox={`0 0 ${width} ${(rowHeight + rowGap) * levels.length}`}
      >
        {levels.map((level, idx) => {
          const y = idx * (rowHeight + rowGap) + (rowHeight - rectHeight) / 2;

          return (
            <g key={level}>
              {stagesWithStart
                .filter(s => s.level === level)
                .map((stage, i) => {
                  const rectX = (stage.start / totalSeconds) * width;
                  const rectWidth = (stage.seconds / totalSeconds) * width;

                  return (
                    <rect
                      key={i}
                      x={rectX}
                      y={y}
                      width={rectWidth}
                      height={rectHeight}
                      fill={levelColor[level] || "#888"}
                      rx={cornerRadius}
                      ry={cornerRadius}
                    />
                  );
                })}
              {/* Label on left side */}
              <text
                x={-10}
                y={y + rectHeight / 2}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize={12}
                fill="#444"
              >
                {level.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 20 }}>
        {levels.map(level => (
          <div key={level} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 20,
                height: 12,
                backgroundColor: levelColor[level],
                borderRadius: 4,
              }}
            />
            <span style={{ fontSize: 14, textTransform: "capitalize" }}>{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

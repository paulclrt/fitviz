import React, { useEffect } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

interface Stage {
  dateTime: string;
  level: "wake" | "light" | "deep" | "rem";
  seconds: number;
}

interface SleepStageChartProps {
  stages: Stage[];
}

const levelColor = {
  wake: "#ef4444",
  light: "#10b981",
  deep: "#3b82f6",
  rem: "#facc15",
} as const;

export function SleepStageChart({ stages }: SleepStageChartProps) {
  useEffect(() => {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

    const ctx = document.getElementById("sleepStageChart") as HTMLCanvasElement;
    if (!ctx) return;

    // Prepare data for Chart.js horizontal stacked bar
    // Each stage is a separate segment on the timeline, so use one bar with stacked segments
    const labels = ["Sleep Stages"];

    // Map stages to an array of seconds per stage in order
    const dataValues = stages.map(s => s.seconds);

    // Chart.js needs dataset per segment for stacking, so create datasets where only one has value, rest 0
    const datasets = stages.map((stage, index) => ({
      label: stage.level,
      data: stages.map((_, i) => (i === index ? stage.seconds : 0)),
      backgroundColor: levelColor[stage.level],
      barPercentage: 1,
      categoryPercentage: 1,
      borderSkipped: false,
    }));

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets,
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: (context) => {
                const sec = context.parsed.x;
                const min = Math.floor(sec / 60);
                const s = sec % 60;
                return `${context.dataset.label}: ${min}m ${s}s`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            title: { display: true, text: "Duration (seconds)" },
            min: 0,
          },
          y: {
            stacked: true,
            display: false,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [stages]);

  return (
    <div style={{ height: 60, width: "100%" }}>
      <canvas id="sleepStageChart" />
    </div>
  );
}


import React, { useEffect } from "react";
import zoomPlugin from "chartjs-plugin-zoom";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

interface HeartRateZone {
  caloriesOut: number;
  max: number;
  min: number;
  minutes: number;
  name: string;
}

interface ActivitiesHeartValue {
  customHeartRateZones: HeartRateZone[];
  heartRateZones: HeartRateZone[];
  restingHeartRate: number;
}

interface ActivitiesHeart {
  dateTime: string;
  value: ActivitiesHeartValue;
}

interface IntradayDataset {
  time: string; // "HH:MM:SS"
  value: number;
}

interface ActivitiesHeartIntraday {
  dataset: IntradayDataset[];
  datasetInterval: number;
  datasetType: string; // e.g., "minute"
}

interface HeartRateData {
  "activities-heart": ActivitiesHeart[];
  "activities-heart-intraday": ActivitiesHeartIntraday;
}

interface ContentProps {
  title: string;
  data: HeartRateData | null;
}

const chart_wrapper_style: React.CSSProperties = {
  minHeight: "100%",
  minWidth: "95%",
  height: "30vh",
  position: "relative",
};
const wrapper_style: React.CSSProperties = {
  minWidth: "100%",
  maxHeight: "100%",
  minHeight: "100%",
};
const chart_style: React.CSSProperties = {
  maxHeight: "100%",
  minHeight: "100%",
};

export default function BPM({ title, data }: ContentProps) {
  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
  zoomPlugin
  );

  const intraday = data?.["activities-heart-intraday"];
  const hasData = Boolean(intraday?.dataset?.length);

  useEffect(() => {
    if (!hasData) return;

    const ctx = document.getElementById(`${title}_chart`) as HTMLCanvasElement;
    if (!ctx) return;

    const labels = intraday!.dataset.map((d) => d.time);
    const values = intraday!.dataset.map((d) => d.value);

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Heart Rate (bpm)",
            data: values,
            fill: true,
            borderColor: "rgb(255, 99, 132)",
            tension: 0.1,
            pointRadius: 0,
          },
        ],
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: { display: false },
              tooltip: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)", // dark background
                  mode: "index",
                  intersect: false,
                  titleColor: "#fff",
                  bodyColor: "#fff",
                  titleFont: { family: "Arial", size: 14, weight: "bold" },
                  bodyFont: { family: "Arial", size: 12 },
                  padding: 10,
                  cornerRadius: 4,
                  caretSize: 6,
                  displayColors: false, // hides color box
                  callbacks: {
                      label: (context) => `BPM: ${context.raw}`,
                      title: (contexts) => {
                          const time = contexts[0].label.split(":").slice(0, 2).join(":");
                          return `Time: ${time}`;
                      },
                  },

              },
              zoom: {
                  pan: { enabled: true, mode: "x" },
                  zoom: {
                      wheel: { enabled: true },
                      pinch: { enabled: true },
                      mode: "x",
                  },
              },
          },
          hover: {
              mode: "index",
              intersect: false,
          },
        scales: {
          x: {
            display: true,
            title: { display: true, text: "Time", color: "#fff" },
            ticks: { maxTicksLimit: 7, color: "#fff" },
            grid: {
                color: "rgba(255,255,255,0.1)",
            },
          },
          y: {
            display: true,
            title: { display: true, text: "BPM", color: "#fff" },
            ticks: { color: "#fff" },
            grid: {
                color: "rgba(255,255,255,0.1)",
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data, title, hasData]);

  if (!hasData) {
    return (
      <div style={wrapper_style}>
        <p className="text-white text-center py-4">No heart rate data to display.</p>
      </div>
    );
  }

  return (
    <div style={wrapper_style}>
      <div className="overflow-hidden margin-x-auto h-full" style={chart_wrapper_style}>
        <canvas id={`${title}_chart`} style={chart_style}></canvas>
      </div>
    </div>
  );
}


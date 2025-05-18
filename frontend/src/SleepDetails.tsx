import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function SleepDetail() {
  const chartData = {
    labels: ["0", "1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "HRV",
        data: [45, 50, 67, 49, 53, 64, 48],
        fill: false,
        borderColor: "#ff4c4c",
      },
    ],
  };

  return (
    <main className="p-6 bg-[#0a0f2c] min-h-screen text-white">
      <div className="bg-[#11163d] p-6 rounded-2xl shadow-lg">
        <div className="text-sm mb-4">
          <p>Overall sleep quality: GOOD ✅</p>
          <ul className="mt-2">
            <li>Deep sleep: 1h 34m (20%)</li>
            <li>REM sleep: 67m (18%)</li>
            <li>Light sleep: 4h 34m (60%)</li>
          </ul>
        </div>

        <div className="border-t border-white/20 pt-4 mt-4">
          <p className="text-sm mb-2">Here are some advices for your sleep:</p>
          <ul className="text-xs list-disc list-inside space-y-1">
            <li>wind down routine</li>
            <li>avoid screens and things that excite you 2 hours before bed</li>
            <li>eat 4 hours before going to bed</li>
            <li>stay calm 2 hours before the time you want to sleep</li>
            <li>put phone in another room</li>
          </ul>
        </div>

        <div className="mt-6">
          <Line data={chartData} />
        </div>
      </div>
    </main>
  );
}


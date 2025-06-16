import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import {HRVDay} from "../datatype/HRV"



interface HRVContinuousProps {
  data: HRVDay[] | null;
}

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler);


export function HRVContinue({ data }: HRVContinuousProps) {
  if (data === null) return <p className="text-white">Loading...</p>;
  else {
  const labels = data.map(d => d.dateTime.split("T")[1]?.slice(0, 5) || d.dateTime);
  const rmssdValues = data.map(d => d.value.dailyRmssd);

  const chartData = {
    labels,
    datasets: [
      {
        label: "RMSSD",
        data: rmssdValues,
        fill: true,
        borderColor: "#00c3ff",
        backgroundColor: "rgba(0, 195, 255, 0.2)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { ticks: { color: "#aaa" } },
      y: { ticks: { color: "#aaa" } },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1d235e",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  return <Line data={chartData} options={options} />;
  }
}


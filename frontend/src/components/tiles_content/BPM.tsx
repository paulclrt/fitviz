import React, { useEffect } from "react"
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";




interface ContentProps {
  title: string
  data: any
}

const chart_wrapper_style: React.CSSProperties = {
  minHeight: "100%",
  minWidth: "95%",
  position: 'relative', 
}
const wrapper_style: React.CSSProperties = {
  minWidth: "100%",
}
const chart_style: React.CSSProperties = {
  maxHeight: "100%",
}



export default function BPM({title, data}: ContentProps) {

  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

  useEffect(() => {
    const ctx = document.getElementById(`${title}_chart`) as HTMLCanvasElement;
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.ecgReadings[0].waveformSamples,
        datasets: [
          {
            label: "BPM",
            data: data.ecgReadings[0].waveformSamples,
            fill: true,
            borderColor: "rgb(230, 23, 22)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { display: true },
          y: { display: true },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);



    return (
    <div style={wrapper_style}>
    <div className="overflow-hidden margin-x-auto"  style={chart_wrapper_style}>
    <canvas id={`${title}_chart`} style={chart_style}></canvas>
    </div>
    </div>
)
}

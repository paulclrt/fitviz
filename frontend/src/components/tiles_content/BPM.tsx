import React, { useEffect } from "react"
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js"

type ECGReading = {
  startTime: string
  averageHeartRate: number
  resultClassification: string
  waveformSamples: number[]
  samplingFrequencyHz: string
  scalingFactor: number
  numberOfWaveformSamples: number
  leadNumber: number
  featureVersion: string
  deviceName: string
  firmwareVersion: string
}

type ECGResponse = {
  ecgReadings: ECGReading[]
  pagination: {
    afterDate: string
    limit: number
    next: string
    offset: number
    previous: string
    sort: string
  }
}

interface ContentProps {
  title: string
  data: ECGResponse | null
}

const chart_wrapper_style: React.CSSProperties = {
  minHeight: "100%",
  minWidth: "95%",
  position: "relative",
}
const wrapper_style: React.CSSProperties = {
  minWidth: "100%",
}
const chart_style: React.CSSProperties = {
  maxHeight: "100%",
}

export default function BPM({ title, data }: ContentProps) {
  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale
  )

  const reading = data?.ecgReadings?.[0]
  const hasData = Boolean(reading?.waveformSamples?.length)

  useEffect(() => {
    if (!hasData) return

    const ctx = document.getElementById(`${title}_chart`) as HTMLCanvasElement
    if (!ctx) return

    const sampleRate = parseInt(reading!.samplingFrequencyHz)
    const timeAxis = reading!.waveformSamples.map(
      (_, i) => (i / sampleRate).toFixed(2)
    )

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: timeAxis,
        datasets: [
          {
            label: "ECG",
            data: reading!.waveformSamples,
            fill: true,
            borderColor: "rgb(230, 23, 22)",
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
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Time (s)",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Amplitude",
            },
          },
        },
      },
    })

    return () => {
      chart.destroy()
    }
  }, [data, title, hasData])

  if (!hasData) {
    return (
      <div style={wrapper_style}>
        <p className="text-white text-center py-4">No ECG data to display.</p>
      </div>
    )
  }

  return (
    <div style={wrapper_style}>
      <div className="overflow-hidden margin-x-auto" style={chart_wrapper_style}>
        <canvas id={`${title}_chart`} style={chart_style}></canvas>
      </div>
    </div>
  )
}


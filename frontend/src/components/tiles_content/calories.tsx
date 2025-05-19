import React from "react"


interface CaloriesProps {
  data: number
}

export default function Calories({ data }: CaloriesProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl">{data}</h1>
      <span className="text-4xl">🔥</span>
      <p>Calories</p>
    </div>
  )
}


import React from "react"


interface CaloriesProps {
  data: number | null
}

export default function Calories({ data }: CaloriesProps) {
    if (data === null) {
        return (
            <div className="flex flex-col items-center">
            <span className="text-xl">No data found</span>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center">
            <h1 className="text-6xl">{data}</h1>
            <span className="text-4xl">🔥</span>
            <p>Calories</p>
            </div>
        )
    }
}


import React from "react"

interface CaloriesProps {
    data: number
}

export default function Calories({data}: CaloriesProps) {
    return (
    <div>
    <h1>{data}</h1>
    <p> Kcal</p>
    </div>
)
}

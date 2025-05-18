import React , { useEffect } from "react"

import BPM from "./tiles_content/BPM"
import Calories from "./tiles_content/calories"

interface TileProps {
  x_size: number
  y_size: number
  title: string
  type: string
  onRemove: () => void
}



export default function Tile({x_size, y_size, title, type, onRemove}: TileProps) {

  return (
    <div className={`bg-[#11163d] pr-10 p-4 rounded-xl relative shadow col-span-${x_size} row-span-${y_size}`}>
        <div>
        <button
            className="absolute top-2 right-3 text-white"
            onClick={onRemove}
        >
    ✕
        </button>
        <div className="text-sm text-right text-white/60 h-1/4 mb-1">
            <p>{title}</p>
        </div>
        </div>
        <div className="flex justify-center h-3/4">
        {
            type === "BPM" ? <BPM title={title} /> : <div></div>
        }
        {
            type === "calories" ? <Calories /> : <div></div>
        }
        </div>
    </div>


  )
}

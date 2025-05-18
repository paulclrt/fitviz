import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "./components/NavBar";
import Tile from "./components/Tile";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const initialTiles = ["recovery", "calories", "sleep", "BPM"];

export default function App() {
  const [tiles, setTiles] = useState(initialTiles);

  const removeTile = (id: string) => {
    setTiles((tiles) => tiles.filter((tile) => tile !== id));
  };

  const addTile = () => {
    const available = ["chart", "sleep", "recovery", "calories"];
    const remaining = available.find((a) => !tiles.includes(a));
    if (remaining) setTiles((t) => [...t, remaining]);
  };

  return (
    <div>
      <Header />
      <main className="grid grid-cols-4 grid-rows-8 gap-4 p-4 bg-[#0a0f2c] min-h-screen text-white">

        {tiles.map((tileType) => (
          <Tile
            key={tileType}
            x_size={1}
            y_size={2}
            title={tileType}
            type={tileType}
            onRemove={() => removeTile(tileType)}
          />
        ))}

        <button
          onClick={addTile}
          className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-green-500 text-white text-2xl shadow"
        >
          +
        </button>
      </main>
    </div>
  );
}


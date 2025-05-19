import React, { useState } from "react";
import Header from "./components/NavBar";
import Tile from "./components/Tile";
import DraggableTile from "./components/DraggableTile";


const initialTiles = ["recovery", "calories", "sleep", "BPM", "steps", "distance", "floors", "activeMinutes", "sedentary", "heartZones", "recentActivity"];

export default function App() {
  const [tiles, setTiles] = useState(initialTiles);

  const removeTile = (id: string) => {
    setTiles((tiles) => tiles.filter((tile) => tile !== id));
  };

  const addTile = () => {
    const available = initialTiles;
    const remaining = available.find((a) => !tiles.includes(a));
    if (remaining) setTiles((t) => [...t, remaining]);
  };

  const moveTile = (from: number, to: number) => {
    setTiles((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  return (
    <div>
      <Header />
      <main className="grid grid-cols-4 grid-rows-8 gap-4 p-4 bg-[#0a0f2c] min-h-screen text-white">
        {tiles.map((tileType, index) => (
          <DraggableTile
            key={tileType}
            x_size={1}
            y_size={2}
            id={tileType}
            index={index}
            moveTile={moveTile}
          >
            <Tile
              title={tileType}
              type={tileType}
              onRemove={() => removeTile(tileType)}
            />
          </DraggableTile>
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

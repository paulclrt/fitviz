import React, { useState } from "react";
import Header from "./components/NavBar";
import Tile from "./components/Tile";
import DraggableTile from "./components/DraggableTile";


const GRID_COLS = 8;
const tileSizes: Record<string, number> = {
  BPM: 6,
  recovery: 3,
  calories: 3,
  sleep: 6,
  steps: 3,
  distance: 3,
  floors: 3,
  activeMinutes: 3,
  sedentary: 3,
  heartZones: 3,
  recentActivity: 3,
};
const initialTiles = ["recovery", "calories", "sleep", "BPM", "steps", "distance", "floors", "activeMinutes", "sedentary", "heartZones", "recentActivity"];
function groupTilesIntoRows(tiles: string[]): { id: string; x_size: number }[] {
  const rows: { id: string; x_size: number }[] = [];
  let currentRow = [];
  let rowSum = 0;

  for (const tile of tiles) {
    const size = tileSizes[tile] ?? 3;
    if (rowSum + size > 12) {
      const remaining = 12 - rowSum;
      if (remaining >= 1) {
        // Try to shrink last tile if possible
        for (let i = currentRow.length - 1; i >= 0; i--) {
          if (currentRow[i].x_size > 1 && currentRow[i].x_size - 1 >= remaining) {
            currentRow[i].x_size -= remaining;
            rowSum += remaining;
            break;
          }
        }
      }
      rows.push(...currentRow);
      currentRow = [];
      rowSum = 0;
    }

    currentRow.push({ id: tile, x_size: size });
    rowSum += size;
  }

  if (currentRow.length > 0) {
    rows.push(...currentRow);
  }

  return rows;
}





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

  const arrangedTiles = groupTilesIntoRows(tiles);

  return (
    <div>
      <Header />
      <main className="grid grid-cols-12 auto-rows-[minmax(100px,_auto)] gap-4 px-8 bg-[#0a0f2c] min-h-screen text-white">
        {arrangedTiles.map((tile, index) => (
          <DraggableTile
            key={tile.id}
            x_size={tile.x_size}
            y_size={3}
            id={tile.id}
            index={index}
            moveTile={moveTile}
          >
            <Tile
              title={tile.id}
              type={tile.id}
              onRemove={() => removeTile(tile.id)}
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



import React, { useState, useEffect } from "react";
import Header from "./components/NavBar";
import Tile from "./components/Tile";
import DraggableTile from "./components/DraggableTile";
import TileSelector from "./TileSelector";

const STORAGE_KEY = "user_dashboard_tiles";
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
    hrvday: 3,
    hrvcontinuous: 3
};

const defaultTiles = ["calories", "steps", "sleep", "BPM", "distance", "activeMinutes", "floors", "sedentary", "heartZones", "recentActivity", "hrvDaily", "hrvContinuous", "recovery"];

function groupTilesIntoRows(tiles: string[]): { id: string; x_size: number }[] {
    return tiles.map(id => ({ id, x_size: tileSizes[id] ?? 3 }));
}

export default function App() {
    const [tiles, setTiles] = useState<string[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        try {
            return saved ? JSON.parse(saved) : defaultTiles;
        } catch {
            return defaultTiles;
        }
    });
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });
    const [showSelector, setShowSelector] = useState(false);


    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tiles));
    }, [tiles]);


    const removeTile = (id: string) => setTiles(tiles => tiles.filter(tile => tile !== id));
    const addTile = () => {
        const remaining = defaultTiles.find(t => !tiles.includes(t));
        if (remaining) setTiles(t => [...t, remaining]);
    };
    const moveTile = (from: number, to: number) => {
        setTiles(prev => {
            const updated = [...prev];
            const [moved] = updated.splice(from, 1);
            updated.splice(to, 0, moved);
            return updated;
        });
    };

    const arrangedTiles = groupTilesIntoRows(tiles);

    //Selector functions (which tiles are added and removed) // bottom right green circle
    const addTileToUserDisplayedTiles = (tile: string) => {
        setTiles(prev => [...prev, tile]);
        setShowSelector(false);
    };
    const closeSelector = () => {setShowSelector(false);}

    return (
        <div>
        <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
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
            selectedDate={selectedDate}
            />
            </DraggableTile>
        ))}
        <button
        onClick={() => setShowSelector(true)}
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-green-500 text-white text-2xl shadow"
        >
        +
            </button>
        </main>

        {showSelector && 
            <TileSelector defaultTiles={defaultTiles} userDisplayedTiles={tiles} addTileToUserDisplayedTiles={addTileToUserDisplayedTiles} closeSelector={closeSelector} />
        }

        </div>
    );
}



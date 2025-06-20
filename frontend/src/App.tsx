import React, { useState, useEffect } from "react";
import Header from "./components/NavBar";
import Tile from "./components/Tile";
import TileSelector from "./TileSelector";

import {
  DndContext, 
  closestCenter,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

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


    //Selector functions (which tiles are added and removed) // bottom right green circle
    const addTileToUserDisplayedTiles = (tile: string) => {
        setTiles(prev => [...prev, tile]);
        setShowSelector(false);
    };
    const closeSelector = () => {setShowSelector(false);}



    // FUNCTIONS DRAG AND DROP - NPM DND
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 5,
                tolerance: 3,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 5,
                tolerance: 3,
            }
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;
        if (!over) return

        if (active.id !== over.id) {
            setTiles((tiles) => {
                const oldIndex = tiles.indexOf(active.id as string)
                const newIndex = tiles.indexOf(over.id as string)

                return arrayMove(tiles, oldIndex, newIndex);
            });
        }
    }

    return (
        <div>
        <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <main className="grid grid-cols-12 auto-rows-[minmax(100px,_auto)] gap-4 px-8 bg-[#0a0f2c] min-h-screen text-white">
        <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
        >
        <SortableContext 
        items={tiles}
        strategy={rectSortingStrategy}
        >
        {tiles.map((tile, index) => (
            <Tile
            key={tile}
            x_size={tileSizes[tile] ?? 3}
            y_size={3}
            title={tile}
            type={tile}
            onRemove={() => removeTile(tile)}
            selectedDate={selectedDate}
            />
        ))}
        </SortableContext>
        </DndContext>
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



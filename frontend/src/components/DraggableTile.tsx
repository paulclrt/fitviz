import React, { useRef } from "react";

interface DraggableTileProps {
  id: string;
  x_size: number;
  y_size: number;
  index: number;
  moveTile: (from: number, to: number) => void;
  children: React.ReactNode;
}

export default function DraggableTile({ id, x_size, y_size, index, moveTile, children }: DraggableTileProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (fromIndex !== index) moveTile(fromIndex, index);
  };

  return (
    <div className={`cursor-move bg-[#1d235e] p-3 rounded-xl relative shadow col-span-${x_size} row-span-${y_size}`}
      ref={ref}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}


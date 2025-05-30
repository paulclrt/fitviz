import { useState } from "react";

interface DateSelectorProps {
  selectedDate: string;
  onChange: (newDate: string) => void;
}


export default function DateSelector({ selectedDate, onChange }: DateSelectorProps) {
      const todayStr = new Date().toISOString().split("T")[0];

    const dateBefore = () => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() - 1);
        onChange(date.toISOString().split("T")[0]);
    };

  const dateAfter = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    const newDate = date.toISOString().split("T")[0];
    if (newDate <= todayStr) onChange(newDate);
  };



  return (
      <div>
      <span className="px-2 cursor-pointer" onClick={dateBefore}>&lt;</span>
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-white border px-2 py-1 rounded"
    />
      <span className="px-2 cursor-pointer" onClick={dateAfter}>&gt;</span>
    </div>
  );
}


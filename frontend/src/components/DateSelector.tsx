import { useState } from "react";

interface DateSelectorProps {
  selectedDate: string;
  onChange: (newDate: string) => void;
}

export default function DateSelector({ selectedDate, onChange }: DateSelectorProps) {
  return (
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-white border px-2 py-1 rounded"
    />
  );
}


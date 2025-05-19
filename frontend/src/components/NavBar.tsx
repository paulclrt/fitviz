import React, { useState } from "react";
import DateSelector from "./DateSelector"

interface HeaderProps {
  selectedDate: string;
  setSelectedDate: (newDate: string) => void;
}


export default function Header({ selectedDate, setSelectedDate }: HeaderProps) {

  return (
    <header className="flex justify-between items-center px-6 py-4 text-sm">
      <div>
        <span className="text-[#cfd4ff] font-semibold">
            <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
        </span>
      </div>
      <nav className="space-x-4">
        <a href="#" className="hover:underline">Tutorial</a>
        <a href="#" className="hover:underline">Dashboard</a>
        <a href="#" className="hover:underline">Blog</a>
      </nav>
      <a href="#" className="hover:underline">Disconnect</a>
    </header>
  )
}

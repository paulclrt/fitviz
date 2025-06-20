import React, { useState } from "react";
import {useNavigate } from "react-router";
import DateSelector from "./DateSelector"

interface HeaderProps {
  selectedDate: string;
  setSelectedDate: (newDate: string) => void;
}


export default function Header({ selectedDate, setSelectedDate }: HeaderProps) {
    const navigate = useNavigate();

  function handleLogout() {
    // Clear Fitbit tokens and user info
    localStorage.removeItem("fitbit_access_token");
    localStorage.removeItem("fitbit_refresh_token");
    localStorage.removeItem("fitbit_user_id");

    // Optionally clear the code verifier if stored
    sessionStorage.removeItem("code_verifier");

    // Redirect to login
    navigate("/login", { replace: true });
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 text-sm">
      <div>
        <span className="text-[#cfd4ff] font-semibold">
            <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
        </span>
      </div>
      <nav className="space-x-4">
        <a href="/tutorial" className="hover:cursor">Tutorial</a>
        <a href="/dashboard" className="hover:cursor">Dashboard</a>
        <a href="/blog" className="hover:cursor">Blog</a>
      </nav>
      <a onClick={handleLogout} className="hover:cursor cursor-pointer">Disconnect</a>
    </header>
  )
}

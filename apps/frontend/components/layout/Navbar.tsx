"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <header className="h-14 flex items-center justify-between px-8 
                   border-b border-neutral-200 dark:border-neutral-800 
                   bg-white/70 dark:bg-neutral-950/60 backdrop-blur-xl">

      <span className="font-medium">Dashboard</span>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        <span className="text-sm text-neutral-700 dark:text-neutral-300">
          manish@example.com
        </span>
      </div>
    </header>
  );
}

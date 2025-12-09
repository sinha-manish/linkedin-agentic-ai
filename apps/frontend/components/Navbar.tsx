// apps/frontend/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  return (
    <header className="h-14 flex items-center justify-between px-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <button
          aria-label="Toggle sidebar"
          className="p-2 rounded-md hover:bg-slate-100"
          // optional: add sidebar collapse logic later
        >
          ☰
        </button>
        <div className="text-lg font-semibold">Dashboard</div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="p-2 rounded-md hover:bg-slate-100 flex items-center gap-2"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          <span className="sr-only">Toggle theme</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-sm">manish@example.com</div>
          <div className="w-8 h-8 rounded-full bg-slate-200" />
        </div>
      </div>
    </header>
  );
}

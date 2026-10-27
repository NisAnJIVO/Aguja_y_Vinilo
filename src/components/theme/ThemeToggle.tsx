"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getClientThemeSnapshot(): string {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("av-theme");
  if (stored) return stored;
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerThemeSnapshot(): string {
  return "dark";
}

export const ThemeToggle: React.FC = () => {
  const currentTheme = useSyncExternalStore(
    subscribe,
    getClientThemeSnapshot,
    getServerThemeSnapshot
  );

  const [localTheme, setLocalTheme] = useState<string | null>(null);
  const activeTheme = localTheme ?? currentTheme;
  const isDark = activeTheme === "dark";

  const toggleTheme = () => {
    const nextDark = !isDark;
    const nextTheme = nextDark ? "dark" : "light";

    setLocalTheme(nextTheme);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("av-theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("av-theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo papel claro" : "Cambiar a modo vinilo oscuro"}
      title={isDark ? "Modo Papel Claro" : "Modo Vinilo Oscuro"}
      className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#181714] border border-white/15 text-[#C3B9A1] hover:text-[#C89D56] hover:border-[#C89D56]/50 transition-all focus:outline-none focus:ring-1 focus:ring-[#C89D56]"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#C89D56] transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#DDB36D] transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};

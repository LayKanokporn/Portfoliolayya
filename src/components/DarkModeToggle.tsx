"use client";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";

export function DarkModeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#e5e7eb] dark:border-[#1e293b] text-[#6b7280] dark:text-[#94a3b8] hover:bg-[#f8faff] dark:hover:bg-[#1e293b] transition-colors"
    >
      {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
    </button>
  );
}

"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeCtx { dark: boolean; toggle: () => void }
const Ctx = createContext<ThemeCtx>({ dark: false, toggle: () => {} });
export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const sys = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && sys);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () =>
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });

  return <Ctx.Provider value={{ dark, toggle }}>{children}</Ctx.Provider>;
}

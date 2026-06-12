"use client";
import React, { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

export function FloatingTOC({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const ids = items.map((i) => i.id);
  const active = useActiveSection(ids);
  const [showLabel, setShowLabel] = useState<string | null>(null);

  return (
    <>
      {/* Desktop — right-side dot rail */}
      <nav
        aria-label="Section navigation"
        className="hidden lg:flex flex-col gap-3 fixed right-5 top-1/2 -translate-y-1/2 z-30"
      >
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded-full"
            >
              <span
                className={`block rounded-full transition-all ${
                  isActive
                    ? "w-3 h-3 bg-[#1a56db] ring-4 ring-[#1a56db]/15"
                    : "w-2 h-2 bg-[#cbd5e1] dark:bg-[#334155] group-hover:bg-[#94a3b8]"
                }`}
              />
              <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity text-[11px] bg-[#111827] dark:bg-[#f1f5f9] text-white dark:text-[#111827] px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none absolute right-full mr-3">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile — bottom-center section dots */}
      <nav
        aria-label="Section navigation"
        className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-sm border border-[#e5e7eb]/60 dark:border-[#1e293b]/60 rounded-full px-3 py-2 shadow-sm"
      >
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              onMouseEnter={() => setShowLabel(item.id)}
              onMouseLeave={() => setShowLabel(null)}
              onFocus={() => setShowLabel(item.id)}
              onBlur={() => setShowLabel(null)}
              className="relative focus-visible:outline-none"
            >
              <span
                className={`block rounded-full transition-all ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#1a56db]"
                    : "w-1.5 h-1.5 bg-[#cbd5e1] dark:bg-[#334155]"
                }`}
              />
              {showLabel === item.id && (
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-[10px] bg-[#111827] dark:bg-[#f1f5f9] text-white dark:text-[#111827] px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </>
  );
}

export default FloatingTOC;

"use client";
import React from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * Floating dot-rail table of contents, fixed to right-center on lg+ screens.
 * Hidden on mobile. Highlights the section currently in view.
 */
export function FloatingTOC({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const ids = items.map((i) => i.id);
  const active = useActiveSection(ids);

  return (
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
            className="group relative flex items-center gap-2"
          >
            <span
              className={`block rounded-full transition-all ${
                isActive
                  ? "w-3 h-3 bg-[#1a56db] ring-4 ring-[#1a56db]/15"
                  : "w-2 h-2 bg-[#cbd5e1] group-hover:bg-[#94a3b8]"
              }`}
            />
            <span
              className={`opacity-0 group-hover:opacity-100 transition-opacity text-[11px] bg-[#111827] text-white px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none absolute right-full mr-3`}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

export default FloatingTOC;

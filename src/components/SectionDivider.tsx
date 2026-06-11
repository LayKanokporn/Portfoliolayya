"use client";
import React from "react";

/**
 * SectionDivider — subtle SVG separator between sections.
 * Variants:
 *  - "wave"     soft sine wave
 *  - "diagonal" 45° hairline slope
 *  - "ticks"    short vertical tick marks (timeline feel)
 */
export function SectionDivider({
  variant = "wave",
  className = "",
}: {
  variant?: "wave" | "diagonal" | "ticks";
  className?: string;
}) {
  if (variant === "wave") {
    return (
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        className={`block w-full h-8 sm:h-10 ${className}`}
        aria-hidden
      >
        <path
          d="M0,24 C150,40 300,8 450,20 C600,32 750,44 900,28 C1050,12 1200,24 1200,24 L1200,48 L0,48 Z"
          fill="#f8faff"
        />
        <path
          d="M0,24 C150,40 300,8 450,20 C600,32 750,44 900,28 C1050,12 1200,24 1200,24"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      </svg>
    );
  }

  if (variant === "diagonal") {
    return (
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        className={`block w-full h-6 ${className}`}
        aria-hidden
      >
        <line x1="0" y1="32" x2="1200" y2="0" stroke="#e5e7eb" strokeWidth="1" />
      </svg>
    );
  }

  // ticks
  return (
    <div className={`relative h-6 ${className}`} aria-hidden>
      <div className="absolute inset-x-0 top-1/2 h-px bg-[#e5e7eb]" />
      <div className="absolute inset-x-0 top-1/2 flex justify-between max-w-6xl mx-auto px-5 sm:px-7 -translate-y-1/2">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={`block w-px ${i % 4 === 0 ? "h-3 bg-[#1a56db]" : "h-1.5 bg-[#cbd5e1]"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default SectionDivider;

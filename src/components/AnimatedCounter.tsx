"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

/**
 * AnimatedCounter — count-up text on viewport entry.
 *
 * Handles common formats:
 *   "3.53"        → animates float, fixed decimal
 *   "15+"         → animates 0 → 15, appends "+"
 *   "~83%"        → animates 0 → 83, wraps with "~" + "%"
 *   "2+ yrs"      → animates 0 → 2, appends "+ yrs"
 *   "First-Class" → no number → just fades in
 */
export function AnimatedCounter({
  value,
  duration = 1.4,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = useState<string>(() =>
    isStaticLabel(value) ? value : zeroPlaceholder(value)
  );

  useEffect(() => {
    if (!inView) return;
    const parsed = parseValue(value);
    if (!parsed) {
      setDisplay(value);
      return;
    }
    const { num, prefix, suffix, decimals } = parsed;
    const controls = animate(0, num, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        const shown = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
        setDisplay(`${prefix}${shown}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function isStaticLabel(v: string) {
  return !/\d/.test(v);
}

function zeroPlaceholder(v: string) {
  const p = parseValue(v);
  if (!p) return v;
  const z = p.decimals > 0 ? (0).toFixed(p.decimals) : "0";
  return `${p.prefix}${z}${p.suffix}`;
}

function parseValue(
  v: string
): { num: number; prefix: string; suffix: string; decimals: number } | null {
  const m = v.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!m) return null;
  const [, prefix, numStr, suffix] = m;
  const num = parseFloat(numStr);
  if (Number.isNaN(num)) return null;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { num, prefix, suffix, decimals };
}

export default AnimatedCounter;

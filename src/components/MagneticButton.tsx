"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * MagneticButton — element follows the cursor when nearby ("cursor attraction").
 * - Translate strength is configurable (default 0.25 = subtle, senior-friendly).
 * - Springs back smoothly on mouse leave.
 * - Falls back to a normal button on touch devices (no `hover` to track).
 */
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number; // 0 — 1 (default 0.25)
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
};

export function MagneticButton({
  children,
  strength = 0.25,
  className = "",
  as = "button",
  href,
  target,
  rel,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Spring smooths the motion so it never feels jittery
  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.4 });
  // Inner content moves slightly less than the button itself — adds depth
  const innerX = useTransform(x, (v) => v * 0.5);
  const innerY = useTransform(y, (v) => v * 0.5);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * strength);
    rawY.set(dy * strength);
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const inner = (
    <motion.span
      style={{ x: innerX, y: innerY, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
    >
      {children}
    </motion.span>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y, display: "inline-block" }}
    >
      {as === "a" ? (
        <a href={href} target={target} rel={rel} className={className}>
          {inner}
        </a>
      ) : (
        <button {...rest} className={className}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}

export default MagneticButton;

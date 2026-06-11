"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin 2px progress bar at very top of viewport — fills as user scrolls.
 * Pure polish signal; near-zero render cost.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1a56db] via-[#3b82f6] to-[#06b6d4] z-[60] pointer-events-none"
    />
  );
}

export default ScrollProgressBar;

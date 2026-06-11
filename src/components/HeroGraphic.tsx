"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * HeroGraphic — abstract editorial illustration for the home hero.
 *
 * Visualizes "SAP · RPA · API · AI" working together as a small pipeline
 * with three lanes (SAP / RPA / AI) feeding into a "production" sink.
 * Light theme, subtle motion (entrance only — no infinite loops).
 */
export function HeroGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 260"
      className={className}
      role="img"
      aria-label="Abstract diagram: SAP, RPA, and AI pipelines converging into production"
    >
      <defs>
        <linearGradient id="hg-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8faff" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="hg-pipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1a56db" stopOpacity="0.85" />
          <stop offset="1" stopColor="#1a56db" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="hg-orb">
          <stop offset="0" stopColor="#1a56db" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1a56db" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background panel */}
      <rect x="6" y="6" width="348" height="248" rx="12" fill="url(#hg-bg)" stroke="#e5e7eb" />

      {/* Soft orb behind sink */}
      <circle cx="280" cy="130" r="70" fill="url(#hg-orb)" />

      {/* Subtle dot grid */}
      <g fill="#cbd5e1" opacity="0.45">
        {Array.from({ length: 13 }).map((_, i) =>
          Array.from({ length: 9 }).map((_, j) => (
            <circle key={`${i}-${j}`} cx={20 + i * 26} cy={28 + j * 26} r="0.8" />
          ))
        )}
      </g>

      {/* Three source nodes */}
      <motion.g
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Node x={40} y={56} label="SAP" sub="S/4HANA" tone="#1a56db" />
        <Node x={40} y={120} label="RPA" sub="UiPath" tone="#0ea5e9" />
        <Node x={40} y={184} label="AI" sub="OCR · LLM" tone="#9333ea" />
      </motion.g>

      {/* Edges → Hub */}
      <motion.g
        stroke="url(#hg-pipe)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        <motion.path d="M118 76 Q 170 78 180 120" />
        <motion.path d="M118 132 L 180 132" />
        <motion.path d="M118 184 Q 170 184 180 144" />
      </motion.g>

      {/* Hub (orchestrator) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <rect x="178" y="108" width="48" height="48" rx="10" fill="#ffffff" stroke="#1a56db" strokeWidth="2" />
        <circle cx="202" cy="132" r="9" fill="none" stroke="#1a56db" strokeWidth="2" />
        <line x1="198" y1="128" x2="206" y2="136" stroke="#1a56db" strokeWidth="2" />
        <line x1="198" y1="136" x2="206" y2="128" stroke="#1a56db" strokeWidth="2" />
        <text x="202" y="170" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="ui-sans-serif">
          Orchestrate
        </text>
      </motion.g>

      {/* Hub → Production */}
      <motion.path
        d="M226 132 L 260 132"
        stroke="#1a56db"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      />

      {/* Production sink */}
      <motion.g
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <rect x="262" y="100" width="74" height="64" rx="10" fill="#1a56db" />
        <text x="299" y="130" textAnchor="middle" fontSize="12" fill="#fff" fontFamily="ui-sans-serif" fontWeight="500">
          Production
        </text>
        <g transform="translate(280 138)">
          <rect x="0" y="0" width="38" height="6" rx="2" fill="#ffffff" opacity="0.75" />
          <rect x="0" y="10" width="28" height="6" rx="2" fill="#ffffff" opacity="0.55" />
        </g>
      </motion.g>

      {/* Bottom annotation tags */}
      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        fontSize="9"
        fontFamily="ui-sans-serif"
        fill="#6b7280"
      >
        <g transform="translate(36 226)">
          <rect width="80" height="20" rx="10" fill="#ffffff" stroke="#e5e7eb" />
          <text x="40" y="13" textAnchor="middle">Logging by default</text>
        </g>
        <g transform="translate(132 226)">
          <rect width="90" height="20" rx="10" fill="#ffffff" stroke="#e5e7eb" />
          <text x="45" y="13" textAnchor="middle">Idempotent · Retry</text>
        </g>
        <g transform="translate(238 226)">
          <rect width="86" height="20" rx="10" fill="#ffffff" stroke="#e5e7eb" />
          <text x="43" y="13" textAnchor="middle">Audit-traceable</text>
        </g>
      </motion.g>
    </svg>
  );
}

function Node({
  x,
  y,
  label,
  sub,
  tone,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  tone: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="78" height="40" rx="10" fill="#ffffff" stroke={tone} strokeWidth="2" />
      <text x="14" y="18" fontSize="12" fontFamily="ui-sans-serif" fontWeight="500" fill="#111827">
        {label}
      </text>
      <text x="14" y="32" fontSize="9" fontFamily="ui-sans-serif" fill="#6b7280">
        {sub}
      </text>
      <circle cx="68" cy="20" r="3.5" fill={tone} />
    </g>
  );
}

export default HeroGraphic;

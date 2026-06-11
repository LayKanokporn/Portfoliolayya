"use client";
import React from "react";

/**
 * ProjectArt — abstract SVG illustration per project category.
 * Acts as a visual fallback if the real screenshot at `imageSrc` fails to load
 * (or if no image is provided). Keeps the page interesting without filler photos.
 *
 * Style: light editorial — soft gradients, line art, geometric shapes,
 * single accent color per theme. No emoji, no animation loops.
 */

export type ArtTheme =
  | "bot"
  | "sap-monitor"
  | "document-ocr"
  | "finance-rate"
  | "vision-grid"
  | "pipeline"
  | "iot";

const PALETTE: Record<ArtTheme, { primary: string; soft: string; accent: string }> = {
  bot: { primary: "#1a56db", soft: "#dbeafe", accent: "#34d399" },
  "sap-monitor": { primary: "#2563eb", soft: "#dbeafe", accent: "#ef4444" },
  "document-ocr": { primary: "#d97706", soft: "#fef3c7", accent: "#1a56db" },
  "finance-rate": { primary: "#059669", soft: "#d1fae5", accent: "#1a56db" },
  "vision-grid": { primary: "#0ea5e9", soft: "#e0f2fe", accent: "#f59e0b" },
  pipeline: { primary: "#9333ea", soft: "#ede9fe", accent: "#06b6d4" },
  iot: { primary: "#ea580c", soft: "#ffedd5", accent: "#1a56db" },
};

export function ProjectArt({
  theme,
  className = "",
  ariaLabel,
}: {
  theme: ArtTheme;
  className?: string;
  ariaLabel?: string;
}) {
  const c = PALETTE[theme];

  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-full art-in ${className}`}
      role="img"
      aria-label={ariaLabel ?? theme}
    >
      <defs>
        <linearGradient id={`bg-${theme}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.soft} />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id={`accent-${theme}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={c.primary} stopOpacity="0.85" />
          <stop offset="1" stopColor={c.primary} stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="320" height="180" fill={`url(#bg-${theme})`} />
      {/* Subtle grid */}
      <g opacity="0.15" stroke={c.primary} strokeWidth="0.5">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="180" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="320" y2={i * 20} />
        ))}
      </g>

      {/* Per-theme art */}
      {theme === "bot" && (
        <g>
          {/* Chat bubble left */}
          <rect x="40" y="50" width="110" height="50" rx="14" fill={c.primary} opacity="0.9" />
          <rect x="50" y="62" width="70" height="5" rx="2" fill="#ffffff" opacity="0.85" />
          <rect x="50" y="74" width="50" height="5" rx="2" fill="#ffffff" opacity="0.7" />
          <circle cx="44" cy="105" r="4" fill={c.primary} opacity="0.9" />
          {/* Chat bubble right */}
          <rect x="170" y="90" width="110" height="50" rx="14" fill="#ffffff" stroke={c.primary} strokeWidth="1.5" />
          <rect x="182" y="103" width="60" height="5" rx="2" fill={c.primary} opacity="0.7" />
          <rect x="182" y="115" width="40" height="5" rx="2" fill={c.primary} opacity="0.5" />
          <circle cx="284" cy="145" r="4" fill={c.primary} />
          {/* Webhook connection */}
          <path
            d="M150 70 Q 165 80 175 100"
            fill="none"
            stroke={c.accent}
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <circle cx="175" cy="100" r="3.5" fill={c.accent} />
        </g>
      )}

      {theme === "sap-monitor" && (
        <g>
          {/* Stacked records */}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x="40"
              y={42 + i * 22}
              width="180"
              height="16"
              rx="3"
              fill="#ffffff"
              stroke={c.primary}
              strokeWidth="1"
              opacity={1 - i * 0.15}
            />
          ))}
          {/* Highlight row 3 — alert */}
          <rect x="40" y="86" width="180" height="16" rx="3" fill={c.accent} opacity="0.18" />
          <rect x="40" y="86" width="180" height="16" rx="3" fill="none" stroke={c.accent} strokeWidth="1.4" />
          {/* Status dots */}
          {[48, 70, 92, 114].map((y, i) => (
            <circle
              key={i}
              cx="210"
              cy={y + 2}
              r="3.5"
              fill={i === 2 ? c.accent : c.primary}
              opacity={i === 2 ? 1 : 0.6}
            />
          ))}
          {/* Alert badge */}
          <g transform="translate(245 40)">
            <rect width="38" height="24" rx="12" fill={c.accent} />
            <text x="19" y="16" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="ui-sans-serif">
              30d
            </text>
          </g>
        </g>
      )}

      {theme === "document-ocr" && (
        <g>
          {/* Document */}
          <rect x="60" y="30" width="120" height="130" rx="6" fill="#ffffff" stroke={c.primary} strokeWidth="1.5" />
          {/* Page lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x="74"
              y={50 + i * 14}
              width={i % 2 === 0 ? 80 : 60}
              height="4"
              rx="1.5"
              fill={c.primary}
              opacity={0.18 + i * 0.04}
            />
          ))}
          {/* OCR scan line */}
          <rect x="60" y="92" width="120" height="3" fill={c.accent} opacity="0.85" />
          {/* Extracted fields */}
          <g transform="translate(210 60)">
            <rect width="90" height="22" rx="4" fill={c.primary} opacity="0.92" />
            <text x="10" y="15" fontSize="9" fill="#fff" fontFamily="ui-monospace">
              vendor: ✓
            </text>
          </g>
          <g transform="translate(210 92)">
            <rect width="90" height="22" rx="4" fill={c.primary} opacity="0.78" />
            <text x="10" y="15" fontSize="9" fill="#fff" fontFamily="ui-monospace">
              amount: ✓
            </text>
          </g>
          <g transform="translate(210 124)">
            <rect width="90" height="22" rx="4" fill={c.accent} />
            <text x="10" y="15" fontSize="9" fill="#fff" fontFamily="ui-monospace">
              OCR 0.96
            </text>
          </g>
        </g>
      )}

      {theme === "finance-rate" && (
        <g>
          {/* Axes */}
          <line x1="40" y1="150" x2="290" y2="150" stroke={c.primary} strokeWidth="1" opacity="0.5" />
          <line x1="40" y1="30" x2="40" y2="150" stroke={c.primary} strokeWidth="1" opacity="0.5" />
          {/* THOR line */}
          <polyline
            points="50,120 90,100 130,110 170,80 210,70 250,55 285,60"
            fill="none"
            stroke={c.primary}
            strokeWidth="2.5"
          />
          {/* SOFR line */}
          <polyline
            points="50,135 90,128 130,118 170,108 210,95 250,90 285,82"
            fill="none"
            stroke={c.accent}
            strokeWidth="2.5"
            strokeDasharray="5 3"
          />
          {/* Markers */}
          {[
            { x: 50, y: 120 },
            { x: 170, y: 80 },
            { x: 285, y: 60 },
          ].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={c.primary} />
          ))}
          {/* Labels */}
          <text x="50" y="170" fontSize="9" fill={c.primary} fontFamily="ui-sans-serif" fontWeight="500">
            THOR
          </text>
          <text x="100" y="170" fontSize="9" fill={c.accent} fontFamily="ui-sans-serif" fontWeight="500">
            SOFR
          </text>
        </g>
      )}

      {theme === "vision-grid" && (
        <g>
          {/* Image grid */}
          <rect x="60" y="30" width="200" height="120" rx="4" fill="#ffffff" stroke={c.primary} strokeWidth="1" />
          {/* Grid cells */}
          <g opacity="0.25" stroke={c.primary} strokeWidth="0.5">
            {[1, 2, 3, 4].map((i) => (
              <line key={`v${i}`} x1={60 + i * 40} y1="30" x2={60 + i * 40} y2="150" />
            ))}
            {[1, 2].map((i) => (
              <line key={`h${i}`} x1="60" y1={30 + i * 40} x2="260" y2={30 + i * 40} />
            ))}
          </g>
          {/* Detection box 1 */}
          <rect x="100" y="50" width="80" height="55" rx="2" fill="none" stroke={c.accent} strokeWidth="2" />
          <rect x="100" y="40" width="64" height="12" rx="2" fill={c.accent} />
          <text x="108" y="49" fontSize="9" fill="#fff" fontFamily="ui-sans-serif" fontWeight="500">
            0.92
          </text>
          {/* Detection box 2 */}
          <rect x="195" y="80" width="50" height="40" rx="2" fill="none" stroke={c.primary} strokeWidth="1.5" strokeDasharray="3 2" />
        </g>
      )}

      {theme === "pipeline" && (
        <g>
          {/* Source */}
          <rect x="30" y="60" width="60" height="60" rx="6" fill={c.primary} opacity="0.9" />
          <text x="60" y="95" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="ui-sans-serif" fontWeight="500">
            Source
          </text>
          {/* Transform */}
          <rect x="130" y="60" width="60" height="60" rx="6" fill="#ffffff" stroke={c.primary} strokeWidth="2" />
          <circle cx="160" cy="90" r="12" fill="none" stroke={c.primary} strokeWidth="2" />
          <line x1="156" y1="86" x2="164" y2="94" stroke={c.primary} strokeWidth="2" />
          <line x1="156" y1="94" x2="164" y2="86" stroke={c.primary} strokeWidth="2" />
          {/* Sink */}
          <rect x="230" y="60" width="60" height="60" rx="6" fill={c.accent} opacity="0.9" />
          <text x="260" y="95" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="ui-sans-serif" fontWeight="500">
            Sink
          </text>
          {/* Arrows */}
          <g stroke={c.primary} strokeWidth="2" fill="none">
            <line x1="90" y1="90" x2="125" y2="90" markerEnd={`url(#arr-${theme})`} />
            <line x1="190" y1="90" x2="225" y2="90" markerEnd={`url(#arr-${theme})`} />
          </g>
          <defs>
            <marker id={`arr-${theme}`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={c.primary} />
            </marker>
          </defs>
        </g>
      )}

      {theme === "iot" && (
        <g>
          {/* Device */}
          <rect x="120" y="50" width="80" height="100" rx="10" fill="#ffffff" stroke={c.primary} strokeWidth="2" />
          <rect x="132" y="62" width="56" height="40" rx="2" fill={c.primary} opacity="0.15" />
          {/* Button */}
          <circle cx="160" cy="125" r="10" fill={c.primary} />
          {/* Signal waves */}
          <g fill="none" stroke={c.accent} strokeWidth="1.6" opacity="0.85">
            <path d="M210 70 Q 230 80 230 100 Q 230 120 210 130" />
            <path d="M225 60 Q 250 75 250 100 Q 250 125 225 140" opacity="0.6" />
            <path d="M240 50 Q 270 70 270 100 Q 270 130 240 150" opacity="0.4" />
          </g>
          <g fill="none" stroke={c.accent} strokeWidth="1.6" opacity="0.85" transform="translate(-200) scale(-1 1) translate(-110)">
            <path d="M210 70 Q 230 80 230 100 Q 230 120 210 130" />
            <path d="M225 60 Q 250 75 250 100 Q 250 125 225 140" opacity="0.6" />
          </g>
        </g>
      )}

      {/* Decorative corner accent */}
      <circle cx="305" cy="15" r="6" fill={`url(#accent-${theme})`} />
    </svg>
  );
}

export default ProjectArt;

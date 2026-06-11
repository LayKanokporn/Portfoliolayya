import React from "react";

type LogoVariant = "compact" | "full";
type LogoTheme = "light" | "dark" | "blue";

/**
 * Option C — Serif italic accent logo
 *
 *  - "L" serif italic accent (Playfair Display)
 *  - "ay Kanokporn" sans-serif light (Inter 400)
 *  - "Automation Specialist" tiny subtitle (full variant only)
 *  - Adapts across light / dark / blue surfaces
 */
export function Logo({
  variant = "compact",
  theme = "light",
  showSubtitle = false,
}: {
  variant?: LogoVariant;
  theme?: LogoTheme;
  showSubtitle?: boolean;
}) {
  const colors = {
    light: { L: "#1a56db", text: "#111827", sub: "#6b7280", dot: "#e31837" },
    dark: { L: "#7aa6f0", text: "#f8faff", sub: "#9ca3af", dot: "#ff5973" },
    blue: { L: "#ffffff", text: "#ffffff", sub: "rgba(255,255,255,0.7)", dot: "#fbbf24" },
  }[theme];

  if (variant === "compact") {
    return (
      <span
        className="inline-flex items-baseline leading-none tracking-tight select-none"
        aria-label="Lay Kanokporn"
      >
        <span
          className="serif-accent"
          style={{ color: colors.L, fontSize: "1.45em", lineHeight: 0.9 }}
        >
          L
        </span>
        <span className="font-normal" style={{ color: colors.text }}>
          ay
        </span>
        <span style={{ color: colors.dot }}>.</span>
      </span>
    );
  }

  // full variant — used in /portfolio masthead or larger contexts
  return (
    <span className="inline-flex flex-col items-start select-none" aria-label="Lay Kanokporn — Automation Specialist">
      <span className="inline-flex items-baseline leading-none tracking-tight">
        <span
          className="serif-accent"
          style={{ color: colors.L, fontSize: "1.7em", lineHeight: 0.85 }}
        >
          L
        </span>
        <span className="font-normal" style={{ color: colors.text }}>
          ay&nbsp;Kanokporn
        </span>
      </span>
      {showSubtitle && (
        <span
          className="uppercase mt-1"
          style={{
            color: colors.sub,
            fontSize: "0.5em",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          Automation Specialist
        </span>
      )}
    </span>
  );
}

export default Logo;

import React from "react";

type LogoVariant = "compact" | "full";
type LogoTheme = "light" | "dark" | "blue" | "auto";

/**
 * Option C — Serif italic accent logo
 *
 *  - "L" serif italic accent (Playfair Display)
 *  - "ay Kanokporn" sans-serif light (Inter 400)
 *  - "Automation Specialist" tiny subtitle (full variant only)
 *  - Adapts across light / dark / blue surfaces
 *  - theme="auto" → Tailwind dark: classes (responds to .dark on html)
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
  // blue theme still needs inline styles (used on blue hero surfaces)
  const fixedColors =
    theme === "blue"
      ? { L: "#ffffff", text: "#ffffff", sub: "rgba(255,255,255,0.7)", dot: "#fbbf24" }
      : null;

  // auto: Tailwind dark: variants; light/dark: also use auto classes
  const useAuto = theme !== "blue";

  if (variant === "compact") {
    if (fixedColors) {
      return (
        <span
          className="inline-flex items-baseline leading-none tracking-tight select-none"
          aria-label="Lay Kanokporn"
        >
          <span
            className="serif-accent"
            style={{ color: fixedColors.L, fontSize: "1.45em", lineHeight: 0.9 }}
          >
            L
          </span>
          <span className="font-normal" style={{ color: fixedColors.text }}>
            ay
          </span>
          <span style={{ color: fixedColors.dot }}>.</span>
        </span>
      );
    }

    return (
      <span
        className="inline-flex items-baseline leading-none tracking-tight select-none"
        aria-label="Lay Kanokporn"
      >
        <span
          className="serif-accent text-[#1a56db] dark:text-[#7aa6f0]"
          style={{ fontSize: "1.45em", lineHeight: 0.9 }}
        >
          L
        </span>
        <span className="font-normal text-[#111827] dark:text-[#f1f5f9]">
          ay
        </span>
        <span className="text-[#e31837] dark:text-[#ff5973]">.</span>
      </span>
    );
  }

  // full variant
  if (fixedColors) {
    return (
      <span className="inline-flex flex-col items-start select-none" aria-label="Lay Kanokporn — Automation Specialist">
        <span className="inline-flex items-baseline leading-none tracking-tight">
          <span
            className="serif-accent"
            style={{ color: fixedColors.L, fontSize: "1.7em", lineHeight: 0.85 }}
          >
            L
          </span>
          <span className="font-normal" style={{ color: fixedColors.text }}>
            ay&nbsp;Kanokporn
          </span>
        </span>
        {showSubtitle && (
          <span
            className="uppercase mt-1"
            style={{
              color: fixedColors.sub,
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

  return (
    <span className="inline-flex flex-col items-start select-none" aria-label="Lay Kanokporn — Automation Specialist">
      <span className="inline-flex items-baseline leading-none tracking-tight">
        <span
          className="serif-accent text-[#1a56db] dark:text-[#7aa6f0]"
          style={{ fontSize: "1.7em", lineHeight: 0.85 }}
        >
          L
        </span>
        <span className="font-normal text-[#111827] dark:text-[#f1f5f9]">
          ay&nbsp;Kanokporn
        </span>
      </span>
      {showSubtitle && (
        <span
          className="uppercase mt-1 text-[#6b7280] dark:text-[#94a3b8]"
          style={{
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

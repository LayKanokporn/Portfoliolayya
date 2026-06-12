import React from "react";

type IconProps = { className?: string; style?: React.CSSProperties };

export function BluePrismLogo({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
      <path d="M8.5 6.5h3.7c2.32 0 4.05 1.62 4.05 3.9s-1.73 3.9-4.05 3.9H10.4v3.2H8.5V6.5zm1.9 6h1.85c1.21 0 2.05-.83 2.05-2.1s-.84-2.1-2.05-2.1H10.4v4.2z" />
    </svg>
  );
}

export function PowerAutomateLogo({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        d="M21 12a9 9 0 1 1-3.5-7.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14.5 3.5l3.5 1.5-1.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PowerAppsLogo({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        d="M12 2.3L20.5 7.1v9.7L12 21.7 3.5 16.8V7.1L12 2.3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5h4.2c1.7 0 2.8 1.05 2.8 2.6s-1.1 2.6-2.8 2.6H10.6V16H9V8.5zm1.6 3.85h2.4c.9 0 1.4-.5 1.4-1.25s-.5-1.25-1.4-1.25h-2.4v2.5z"
        fill="currentColor"
      />
    </svg>
  );
}

import React from "react";

type IconProps = { className?: string; style?: React.CSSProperties };

export function BluePrismLogo({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 7.5h3.2c1.8 0 3.3 1.3 3.3 3.2s-1.5 3.2-3.3 3.2H10.5v2.6H9V7.5zm1.5 5h2c1 0 1.8-.7 1.8-1.7s-.8-1.7-1.8-1.7h-2v3.4z" />
    </svg>
  );
}

export function PowerAutomateLogo({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 8.485 12" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 11l4.5 4-4.5 4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PowerAppsLogo({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 2L21 7v10l-9 5-9-5V7l9-5z" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 10h8M8 14h5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

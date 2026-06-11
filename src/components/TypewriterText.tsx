"use client";
import { useEffect, useState } from "react";

interface Props {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
}

export function TypewriterText({
  strings,
  typingSpeed = 55,
  deletingSpeed = 28,
  pauseMs = 1800,
  className,
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const target = strings[idx];

    if (phase === "typing") {
      if (displayed.length < target.length) {
        const t = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          typingSpeed
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pause"), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      setPhase("deleting");
      return;
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          deletingSpeed
        );
        return () => clearTimeout(t);
      }
      setIdx((i) => (i + 1) % strings.length);
      setPhase("typing");
    }
  }, [displayed, phase, idx, strings, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

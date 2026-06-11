"use client";
import { useRef, MouseEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function TiltCard({ children, className = "", strength = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(600px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) scale3d(1.02,1.02,1.02)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out" }}
    >
      {children}
    </div>
  );
}

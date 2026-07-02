"use client";
import { useEffect, useRef } from "react";

const SPOTLIGHT_R = 260;

export function HeroSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const reveal = revealRef.current;
    if (!section || !reveal) return;

    function loop() {
      const s = smoothRef.current;
      const m = mouseRef.current;
      s.x += (m.x - s.x) * 0.1;
      s.y += (m.y - s.y) * 0.1;

      const rect = section!.getBoundingClientRect();
      const cx = s.x - rect.left;
      const cy = s.y - rect.top;

      const mask =
        cx < -50
          ? "none"
          : `radial-gradient(circle ${SPOTLIGHT_R}px at ${cx}px ${cy}px, black 0%, black 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, transparent 100%)`;

      reveal!.style.maskImage = mask;
      (reveal!.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY };
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    section.addEventListener("touchstart", onTouch, { passive: true });
    section.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      section.removeEventListener("touchstart", onTouch);
      section.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black cursor-crosshair border-b border-[#1e293b]"
      style={{ height: "520px" }}
    >
      {/* Base — silver futuristic suit */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-base.png')", zIndex: 10 }}
      />

      {/* Reveal — professional black blazer */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/hero-reveal.png')",
          zIndex: 30,
          maskImage: "none",
          WebkitMaskImage: "none",
        }}
      />

      {/* Text overlay */}
      <div
        className="absolute pointer-events-none flex flex-col items-start"
        style={{ top: "50%", transform: "translateY(-50%)", left: "clamp(24px, 5vw, 60px)", zIndex: 50 }}
      >
        <h1 style={{ color: "#fff", lineHeight: 0.95 }}>
          <span
            className="serif-accent block"
            style={{ fontSize: "clamp(36px, 6vw, 52px)", letterSpacing: "-0.05em" }}
          >
            I&apos;m
          </span>
          <span
            className="block font-light"
            style={{ fontSize: "clamp(36px, 6vw, 52px)", letterSpacing: "-0.08em", marginTop: "-4px" }}
          >
            KANOKPORN
          </span>
        </h1>
        <p
          className="serif-accent"
          style={{ color: "rgba(255,255,255,0.9)", fontSize: "16px", letterSpacing: "-0.02em", marginTop: "14px" }}
        >
          Automation Engineer
        </p>
      </div>

      {/* Bottom left */}
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{ bottom: "50px", left: "clamp(24px, 5vw, 60px)", maxWidth: "240px", zIndex: 50 }}
      >
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
          I build automation that saves time and simplifies business processes.
        </p>
      </div>

      {/* Bottom right */}
      <div
        className="absolute pointer-events-none hidden sm:block text-right"
        style={{ bottom: "40px", right: "clamp(24px, 4vw, 40px)", maxWidth: "240px", zIndex: 50 }}
      >
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
          Automation Engineer specializing in SAP, RPA, and workflow automation.
        </p>
      </div>

      {/* Hint */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 60,
          color: "rgba(255,255,255,0.45)",
          fontSize: "10px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        ✦ Move cursor or touch to reveal
      </div>
    </section>
  );
}

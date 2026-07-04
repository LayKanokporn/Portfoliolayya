"use client";
import { useEffect, useRef } from "react";

const SPOTLIGHT_R = 200;

export function HeroSpotlight() {
  const photoRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const photo = photoRef.current;
    const reveal = revealRef.current;
    if (!photo || !reveal) return;

    function loop() {
      const s = smoothRef.current;
      const m = mouseRef.current;
      s.x += (m.x - s.x) * 0.18;
      s.y += (m.y - s.y) * 0.18;

      const rect = photo!.getBoundingClientRect();
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

    photo.addEventListener("mousemove", onMove);
    photo.addEventListener("mouseleave", onLeave);
    photo.addEventListener("touchstart", onTouch, { passive: true });
    photo.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      photo.removeEventListener("mousemove", onMove);
      photo.removeEventListener("mouseleave", onLeave);
      photo.removeEventListener("touchstart", onTouch);
      photo.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <section className="relative border-b border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0a0f1e] overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] min-h-[420px] lg:min-h-[480px]">
        {/* LEFT — photo bleeds to edge, rounded on right */}
        <div
          ref={photoRef}
          className="relative cursor-crosshair bg-black overflow-hidden min-h-[320px] lg:min-h-0 lg:rounded-r-[40px]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-base.png')" }}
          />
          <div
            ref={revealRef}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: "url('/hero-reveal.png')",
              maskImage: "none",
              WebkitMaskImage: "none",
            }}
          />
          <div
            className="absolute pointer-events-none select-none"
            style={{
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.45)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Move cursor to reveal
          </div>
        </div>

        {/* RIGHT — about content */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-8 lg:py-12">
          <h1 className="leading-[0.95]">
            <span
              className="serif-accent block text-[#1a56db] dark:text-[#60a5fa]"
              style={{ fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "-0.04em" }}
            >
              I&apos;m
            </span>
            <span
              className="block font-light text-[#111827] dark:text-[#f1f5f9]"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-0.06em", marginTop: "-2px" }}
            >
              KANOKPORN
            </span>
          </h1>

          <p className="text-[14px] sm:text-[15px] font-medium text-[#1a56db] dark:text-[#60a5fa] mt-4 tracking-tight">
            Automation Problem Solver
          </p>

          <p className="text-[13px] sm:text-[14px] text-[#374151] dark:text-[#cbd5e1] leading-relaxed mt-4 max-w-md">
            Turning business processes into observable, resilient systems with RPA, AI, and ERP.
            Currently shipping 5 SAP S/4HANA automations at AIS — zero silent failures in production.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#e0e7ff] dark:bg-[#1e3a5f] text-[#1a56db] dark:text-[#60a5fa] border border-[#c7d2fe] dark:border-[#1e40af]">
              SAP S/4HANA
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#e0e7ff] dark:bg-[#1e3a5f] text-[#1a56db] dark:text-[#60a5fa] border border-[#c7d2fe] dark:border-[#1e40af]">
              UiPath / Blue Prism
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#e0e7ff] dark:bg-[#1e3a5f] text-[#1a56db] dark:text-[#60a5fa] border border-[#c7d2fe] dark:border-[#1e40af]">
              AI Builder OCR
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#e0e7ff] dark:bg-[#1e3a5f] text-[#1a56db] dark:text-[#60a5fa] border border-[#c7d2fe] dark:border-[#1e40af]">
              Power Automate
            </span>
          </div>

          <div className="flex items-center gap-6 mt-6 pt-5 border-t border-[#e5e7eb] dark:border-[#1e293b]">
            <div>
              <div className="text-[20px] font-medium text-[#111827] dark:text-[#f1f5f9] tabular-nums leading-none">~83%</div>
              <div className="text-[10px] text-[#6b7280] dark:text-[#94a3b8] mt-1">Ops cut</div>
            </div>
            <div>
              <div className="text-[20px] font-medium text-[#111827] dark:text-[#f1f5f9] tabular-nums leading-none">0</div>
              <div className="text-[10px] text-[#6b7280] dark:text-[#94a3b8] mt-1">Silent failures</div>
            </div>
            <div>
              <div className="text-[20px] font-medium text-[#111827] dark:text-[#f1f5f9] tabular-nums leading-none">15+</div>
              <div className="text-[10px] text-[#6b7280] dark:text-[#94a3b8] mt-1">Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

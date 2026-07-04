"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiTrendingDown,
  FiLayers,
  FiAward,
  FiArrowRight,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import {
  SiSap,
  SiUipath,
  SiPython,
  SiLine,
  SiGooglecloud,
} from "react-icons/si";
import { MdSmartToy } from "react-icons/md";
import { BluePrismLogo, PowerAutomateLogo, PowerAppsLogo } from "@/components/BrandLogos";
import { HeroSpotlight } from "@/components/HeroSpotlight";
import { PageShell } from "@/components/PageShell";
import { TiltCard } from "@/components/TiltCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ProjectArt } from "@/components/ProjectArt";
import { PROJECTS } from "@/data/portfolio";
import { useState } from "react";

const METRICS = [
  { icon: <FiCalendar />, num: "2+ yrs", desc: "Industry experience" },
  { icon: <FiTrendingDown />, num: "~83%", desc: "Manual effort cut (verified)" },
  { icon: <FiLayers />, num: "15+", desc: "Projects delivered" },
  { icon: <FiAward />, num: "3.53", desc: "GPA · First-Class Honors" },
];

const TECH_LOGOS = [
  { label: "SAP S/4HANA", color: "#0080a0", Icon: SiSap },
  { label: "SAP Build", color: "#0080a0", Icon: SiSap },
  { label: "UiPath", color: "#fa4616", Icon: SiUipath },
  { label: "Blue Prism", color: "#00aae4", Icon: BluePrismLogo },
  { label: "Power Automate", color: "#0066ff", Icon: PowerAutomateLogo },
  { label: "Power Apps", color: "#742774", Icon: PowerAppsLogo },
  { label: "AI Builder OCR", color: "#742774", Icon: MdSmartToy },
  { label: "Python", color: "#3776ab", Icon: SiPython },
  { label: "Google Cloud", color: "#4285f4", Icon: SiGooglecloud },
  { label: "LINE Bot", color: "#06c755", Icon: SiLine },
];

const TOP_PROJECTS = PROJECTS.slice(0, 3);

export default function HomePage() {
  return (
    <PageShell>
      {/* HERO */}
      <HeroSpotlight />

      {/* METRICS */}
      <section className="relative border-b border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0a0f1e] overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-7 py-7 sm:py-9 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {METRICS.map((m, i) => (
            <TiltCard key={m.desc} strength={8}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative rounded-xl border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-4 sm:p-5 hover:border-[#1a56db]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e0e7ff] text-[#1a56db] flex items-center justify-center text-base shrink-0">
                    {m.icon}
                  </div>
                </div>
                <div className="text-[22px] sm:text-[26px] font-medium leading-none tracking-tight text-[#111827] dark:text-[#f1f5f9] tabular-nums">
                  <AnimatedCounter value={m.num} />
                </div>
                <div className="text-[11px] sm:text-[12px] text-[#6b7280] dark:text-[#94a3b8] mt-2 leading-relaxed">
                  {m.desc}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* TECH STRIP */}
      <section className="relative border-b border-[#e5e7eb] dark:border-[#1e293b] bg-[#f8faff] dark:bg-[#060c18] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-7 py-5 sm:py-6">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider text-[#6b7280] dark:text-[#64748b]">Stack in production</span>
            <span className="h-px flex-1 bg-[#e5e7eb] dark:bg-[#1e293b] min-w-[24px]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {TECH_LOGOS.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2 text-[11.5px] px-3 py-2 rounded-md bg-white dark:bg-[#0f172a] border border-[#e5e7eb] dark:border-[#1e293b] min-w-0"
              >
                <span className="w-4 h-4 inline-flex items-center justify-center shrink-0" style={{ color: t.color }}>
                  <t.Icon className="w-full h-full" />
                </span>
                <span className="text-[#111827] dark:text-[#e2e8f0] truncate">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP 3 PROJECTS */}
      <section className="relative border-b border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0a0f1e] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-7 py-9 sm:py-12">
          <div className="flex items-end justify-between gap-3 mb-6 flex-wrap">
            <h2 className="text-[19px] sm:text-[21px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9]">
              Featured projects
            </h2>
            <Link href="/projects" className="text-[11px] text-[#1a56db] hover:underline inline-flex items-center gap-1">
              View all projects <FiArrowRight />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {TOP_PROJECTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] overflow-hidden hover:shadow-md hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40 transition-all group relative"
              >
                <Link href="/projects" aria-label={`View ${p.name}`} className="absolute inset-0 z-10" />
                <div className={`h-1 ${p.accent}`} />
                <div className="relative w-full h-40 bg-[#f8faff] dark:bg-[#0a0f1e] border-b border-[#e5e7eb] dark:border-[#1e293b] overflow-hidden">
                  <ProjectArt theme={p.art as any} ariaLabel={p.name} />
                  {p.image && (
                    <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {p.badges.map((b) => (
                      <span key={b} className={`text-[10px] px-2 py-0.5 rounded border ${b === "Featured" ? "bg-[#e0e7ff] text-[#1a56db] border-[#c7d2fe]" : "bg-[#f8faff] text-[#6b7280] border-[#e5e7eb]"}`}>{b}</span>
                    ))}
                  </div>
                  <h3 className="text-[14px] font-medium mb-2 leading-snug text-[#111827] dark:text-[#f1f5f9]">{p.name}</h3>
                  <p className="text-[13px] text-[#6b7280] dark:text-[#94a3b8] leading-relaxed line-clamp-2">{p.desc}</p>
                  <div className="flex gap-4 border-t border-[#e5e7eb] dark:border-[#1e293b] pt-2.5 mt-3">
                    {p.stats.map((s) => (
                      <div key={s.l}>
                        <div className="text-[13px] font-medium text-[#1a56db] leading-none">{s.v}</div>
                        <div className="text-[10px] text-[#6b7280] dark:text-[#64748b] mt-1">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#0c2463] to-[#1a5fb4]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 sm:px-7 py-5">
          <div>
            <div className="text-[15px] font-medium text-white">Hiring for Automation · AI Tools · RPA roles?</div>
            <div className="text-[12px] text-white/70 mt-1">I reply within 24 hours · Bangkok, Thailand · Open to hybrid / on-site / relocation</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="mailto:laybabaka@gmail.com" className="text-[12px] font-medium bg-white text-[#0c2463] px-4 py-2 rounded-md hover:bg-[#f8faff] transition-colors">Email me</a>
            <CopyEmailButton />
            <a href="https://www.linkedin.com/in/laykanokporn" target="_blank" rel="noopener noreferrer" className="text-[12px] bg-transparent border border-white/40 text-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors">LinkedIn</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-5 sm:px-7 pb-4 -mt-1">
          <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="font-mono text-[10.5px] text-white/50 hover:text-white/90 transition-colors">
            $ curl portfolio-kanokporn.vercel.app/api/resume
          </a>
          <span className="text-[10.5px] text-white/40 ml-2">— yes, the resume has an API</span>
        </div>
      </section>
    </PageShell>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("laybabaka@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { window.location.href = "mailto:laybabaka@gmail.com"; }
  };
  return (
    <button onClick={copy} className="text-[12px] bg-transparent border border-white/40 text-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors inline-flex items-center gap-1.5" aria-live="polite">
      {copied ? <><FiCheck /> Copied ✓</> : <><FiCopy /> Copy email</>}
    </button>
  );
}

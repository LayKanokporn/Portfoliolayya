"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { PageShell } from "@/components/PageShell";
import { TIMELINE, SKILL_BARS, SKILL_GROUPS } from "@/data/portfolio";
import { ROICalculator } from "@/components/ROICalculator";
import AutomationSimulator from "@/components/AutomationSimulator";

export default function AboutPage() {
  const [roiOpen, setRoiOpen] = useState(false);

  return (
    <PageShell>
      {/* Page header */}
      <div className="border-b border-[#e5e7eb] dark:border-[#1e293b] bg-[#f8faff] dark:bg-[#060c18]">
        <div className="max-w-6xl mx-auto px-4 sm:px-7 py-6">
          <span className="text-[10px] tabular-nums tracking-wider text-[#9ca3af] dark:text-[#64748b]">04 / 04</span>
          <h1 className="text-[24px] sm:text-[28px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9] mt-1">About me</h1>
          <p className="text-[13px] text-[#374151] dark:text-[#cbd5e1] leading-relaxed mt-2 max-w-lg">
            Automation Problem Solver — turning business processes into observable, resilient systems.
            Computer & Robotics Engineering · First-Class Honors (GPA 3.53) · Bangkok University.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-9 sm:py-12 space-y-10">
        {/* TIMELINE */}
        <section>
          <h2 className="text-[19px] sm:text-[21px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9] mb-1">Career timeline</h2>
          <div className="h-[3px] w-10 rounded-full bg-[#1a56db] mb-6" />
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#e5e7eb] dark:bg-[#1e293b]" />
            {TIMELINE.map((t, i) => (
              <motion.div key={t.period} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }} className="relative mb-5 last:mb-0">
                <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0a0f1e] shadow-sm" style={{ backgroundColor: t.color }} />
                <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] px-4 py-3 hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-[12.5px] font-medium text-[#111827] dark:text-[#f1f5f9]">{t.role}</span>
                    {t.active && (
                      <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Current
                      </span>
                    )}
                    {(t as any).edu && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Education</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-[11px] text-[#6b7280] dark:text-[#94a3b8]">{t.company}</span>
                    <span className="text-[10.5px] text-[#9ca3af] dark:text-[#64748b]">{t.period}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {t.highlights.map((h) => (
                      <span key={h} className="text-[10px] px-2 py-0.5 rounded bg-[#f8faff] dark:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#334155] text-[#374151] dark:text-[#94a3b8]">{h}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILL BARS */}
        <section>
          <h2 className="text-[19px] sm:text-[21px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9] mb-1">Skill proficiency</h2>
          <div className="h-[3px] w-10 rounded-full bg-[#1a56db] mb-6" />
          <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-5">
            <div className="space-y-3">
              {SKILL_BARS.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11.5px] text-[#374151] dark:text-[#cbd5e1]">{s.label}</span>
                    <span className="text-[10.5px] text-[#6b7280] dark:text-[#94a3b8] tabular-nums">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#f3f4f6] dark:bg-[#1e293b] overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.05 + 0.1, ease: "easeOut" }} className="h-full rounded-full" style={{ backgroundColor: s.color }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILL GROUPS */}
        <section>
          <h2 className="text-[19px] sm:text-[21px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9] mb-1">Technical skills</h2>
          <div className="h-[3px] w-10 rounded-full bg-[#1a56db] mb-6" />
          <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-5">
            {SKILL_GROUPS.map((g) => (
              <div key={g.name} className="mb-4 last:mb-0">
                <div className="text-[10px] font-medium uppercase tracking-wider text-[#6b7280] dark:text-[#64748b] mb-2">{g.name}</div>
                <div className="flex flex-wrap gap-1.5">
                  {g.tags.map((tag) => (
                    <span key={tag.t} className={`text-[11px] px-2.5 py-1 rounded border ${tag.hi ? "bg-[#e0e7ff] dark:bg-[#1e3a5f] text-[#1a56db] dark:text-[#60a5fa] border-[#c7d2fe] dark:border-[#1e40af]" : "bg-[#f8faff] dark:bg-[#1e293b] text-[#374151] dark:text-[#94a3b8] border-[#e5e7eb] dark:border-[#334155]"}`}>
                      {tag.t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LANGUAGES */}
        <section>
          <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-5">
            <div className="text-[10px] font-medium uppercase tracking-wider text-[#6b7280] dark:text-[#64748b] mb-2">Languages</div>
            <div className="flex flex-wrap gap-4 text-[12px]">
              <div><span className="text-[#111827] dark:text-[#f1f5f9]">Thai</span> <span className="text-[#6b7280] dark:text-[#94a3b8]">— Native</span></div>
              <div><span className="text-[#111827] dark:text-[#f1f5f9]">English</span> <span className="text-[#6b7280] dark:text-[#94a3b8]">— Intermediate (Working Proficiency)</span></div>
            </div>
          </div>
        </section>

        {/* SIMULATOR */}
        <section>
          <h2 className="text-[19px] sm:text-[21px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9] mb-1">Try it live</h2>
          <div className="h-[3px] w-10 rounded-full bg-[#1a56db] mb-6" />
          <AutomationSimulator />
        </section>

        {/* ROI CALCULATOR */}
        <section>
          <button onClick={() => setRoiOpen(v => !v)} className="w-full flex items-center justify-between gap-3 mb-3">
            <h2 className="text-[19px] sm:text-[21px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9] leading-tight">What&apos;s your manual work costing?</h2>
            <span className="flex items-center gap-1.5 text-[11px] text-[#1a56db] shrink-0">
              {roiOpen ? "Hide" : "Try calculator"}
              <FiChevronDown className={`transition-transform ${roiOpen ? "rotate-180" : ""}`} />
            </span>
          </button>
          <div className="h-[3px] w-10 rounded-full bg-[#1a56db] mb-4" />
          {roiOpen && <ROICalculator />}
        </section>
      </div>
    </PageShell>
  );
}

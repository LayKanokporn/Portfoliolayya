"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiBriefcase, FiChevronDown } from "react-icons/fi";
import { PageShell } from "@/components/PageShell";
import { ProjectArt } from "@/components/ProjectArt";
import { PROJECTS, AUTOMATIONS, ROLE_OPTIONS, type HiringRole } from "@/data/portfolio";

// ── Keyword highlight ─────────────────────────────────────────────────
const ROLE_KEYWORDS: Record<HiringRole, string[]> = {
  rpa: ["UiPath", "Blue Prism", "Power Automate", "RPA", "bot", "webhook", "idempotent", "automation", "Automation", "flow", "dedup", "defer queue"],
  ai: ["AI Builder", "OCR", "YOLOv5", "computer vision", "LLM", "document", "confidence gate", "machine learning", "intelligence", "AI"],
  sap: ["SAP S/4HANA", "SAP", "OB83", "BTP", "ERP", "IBOR", "THOR", "SOFR", "audit trail", "finance", "compliance"],
};

function HighlightText({ text, role }: { text: string; role: HiringRole | null }) {
  if (!role) return <>{text}</>;
  const keywords = ROLE_KEYWORDS[role];
  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) => {
        const isMatch = keywords.some((k) => k.toLowerCase() === part.toLowerCase());
        return isMatch ? (
          <mark key={i} className="bg-[#fef3c7] dark:bg-[#78350f]/50 text-[#92400e] dark:text-[#fbbf24] rounded px-0.5 not-italic font-medium">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        );
      })}
    </>
  );
}

// ── Collapsible automation card ───────────────────────────────────────
function AutomationCard({ a, role }: { a: typeof AUTOMATIONS[0]; role: HiringRole | null }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40 hover:shadow-md transition-all">
      {/* Always-visible header */}
      <button onClick={() => setOpen((v) => !v)} className="w-full text-left p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-[#111827] dark:text-[#f1f5f9] truncate">
              <HighlightText text={a.title} role={role} />
            </div>
            <div className="text-[10px] text-[#6b7280] dark:text-[#64748b] mt-0.5">{a.tag}</div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {/* Compact result chips */}
            <div className="hidden sm:flex gap-2">
              {a.results.map((r) => (
                <span key={r.l} className="text-[11px] font-medium text-[#1a56db] dark:text-[#60a5fa] tabular-nums">
                  {r.v}
                </span>
              ))}
            </div>
            <FiChevronDown className={`text-[#9ca3af] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </div>
        </div>
        {/* Result chips on mobile */}
        <div className="flex gap-3 mt-2 sm:hidden">
          {a.results.map((r) => (
            <div key={r.l}>
              <div className="text-[12px] font-medium text-[#1a56db] dark:text-[#60a5fa] leading-none">{r.v}</div>
              <div className="text-[9px] text-[#6b7280] dark:text-[#64748b] mt-0.5">{r.l}</div>
            </div>
          ))}
        </div>
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-[#e5e7eb] dark:border-[#1e293b] pt-3 space-y-2">
              <div className="text-[13px]">
                <span className="text-[10px] uppercase tracking-wide text-[#6b7280] dark:text-[#64748b] mr-2">Challenge</span>
                <span className="text-[#374151] dark:text-[#cbd5e1]">
                  <HighlightText text={a.challenge} role={role} />
                </span>
              </div>
              <div className="text-[13px]">
                <span className="text-[10px] uppercase tracking-wide text-[#6b7280] dark:text-[#64748b] mr-2">Solution</span>
                <span className="text-[#374151] dark:text-[#cbd5e1]">
                  <HighlightText text={a.solution} role={role} />
                </span>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#6b7280] dark:text-[#64748b] mb-1.5">Process flow</div>
                <div className="flex flex-wrap items-center gap-1">
                  {a.flow.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="text-[10px] px-2 py-1 bg-[#f8faff] dark:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#334155] rounded text-[#374151] dark:text-[#cbd5e1]">{step}</span>
                      {idx < a.flow.length - 1 && <span className="text-[#1a56db] text-xs">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 border-t border-[#e5e7eb] dark:border-[#1e293b] pt-2.5 mt-1">
                {a.results.map((r) => (
                  <div key={r.l}>
                    <div className="text-[13px] font-medium text-[#1a56db] dark:text-[#60a5fa] leading-none">{r.v}</div>
                    <div className="text-[10px] text-[#6b7280] dark:text-[#64748b] mt-1">{r.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [hiringRole, setHiringRole] = useState<HiringRole | null>(null);

  const sortedProjects = React.useMemo(
    () =>
      hiringRole
        ? [...PROJECTS].sort((a, b) => Number(b.roles.includes(hiringRole)) - Number(a.roles.includes(hiringRole)))
        : PROJECTS,
    [hiringRole]
  );

  return (
    <PageShell>
      {/* Page header */}
      <div className="border-b border-[#e5e7eb] dark:border-[#1e293b] bg-[#f8faff] dark:bg-[#060c18]">
        <div className="max-w-6xl mx-auto px-4 sm:px-7 py-6 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="text-[10px] tabular-nums tracking-wider text-[#9ca3af] dark:text-[#64748b]">02 / 04</span>
            <h1 className="text-[24px] sm:text-[28px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9] mt-1">Projects</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider text-[#6b7280] dark:text-[#64748b]">I&apos;m hiring for:</span>
            {ROLE_OPTIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setHiringRole(hiringRole === r.id ? null : r.id)}
                aria-pressed={hiringRole === r.id}
                className={`text-[11.5px] px-3 py-1.5 rounded-full border transition-all ${
                  hiringRole === r.id
                    ? "bg-[#1a56db] border-[#1a56db] text-white shadow-sm"
                    : "bg-white dark:bg-[#0f172a] border-[#e5e7eb] dark:border-[#334155] text-[#374151] dark:text-[#cbd5e1] hover:border-[#1a56db]/50"
                }`}
              >
                {r.label}
              </button>
            ))}
            {hiringRole && (
              <button onClick={() => setHiringRole(null)} className="text-[11px] text-[#6b7280] hover:text-[#1a56db] underline underline-offset-2">
                Clear
              </button>
            )}
          </div>
        </div>
        {hiringRole && (
          <div className="max-w-6xl mx-auto px-4 sm:px-7 pb-3">
            <p className="text-[11px] text-[#6b7280] dark:text-[#64748b]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#fbbf24] mr-1.5 align-middle" />
              Keywords matching <span className="font-medium text-[#111827] dark:text-[#f1f5f9]">{ROLE_OPTIONS.find(r => r.id === hiringRole)?.label}</span> are highlighted
            </p>
          </div>
        )}
      </div>

      {/* Projects grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-7 py-9 sm:py-12">
        <div className="grid sm:grid-cols-2 gap-3 mb-12">
          {sortedProjects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-lg border bg-white dark:bg-[#0f172a] overflow-hidden hover:shadow-md transition-all group relative ${
                hiringRole && p.roles.includes(hiringRole)
                  ? "border-[#1a56db]/60 ring-1 ring-[#1a56db]/30"
                  : hiringRole
                    ? "border-[#e5e7eb] dark:border-[#1e293b] opacity-45 saturate-50 hover:opacity-100 hover:saturate-100"
                    : "border-[#e5e7eb] dark:border-[#1e293b] hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40"
              }`}
            >
              <div className={`h-1 ${p.accent}`} />
              <div className={`relative w-full bg-[#f8faff] dark:bg-[#0a0f1e] border-b border-[#e5e7eb] dark:border-[#1e293b] overflow-hidden ${p.art === "pipeline" ? "h-56" : "h-40"}`}>
                <ProjectArt theme={p.art as any} ariaLabel={p.name} />
                {p.image && (
                  <img src={p.image} alt={p.name} className={`absolute inset-0 w-full h-full ${p.art === "pipeline" ? "object-contain bg-[#0c2463]" : "object-cover"}`} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                )}
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {p.badges.map((b) => (
                    <span key={b} className={`text-[10px] px-2 py-0.5 rounded border ${b === "Featured" ? "bg-[#e0e7ff] text-[#1a56db] border-[#c7d2fe]" : "bg-[#f8faff] text-[#6b7280] border-[#e5e7eb]"}`}>{b}</span>
                  ))}
                </div>
                <h3 className="text-[14px] font-medium mb-2 leading-snug text-[#111827] dark:text-[#f1f5f9]">
                  <HighlightText text={p.name} role={hiringRole} />
                </h3>
                <p className="text-[13px] text-[#6b7280] dark:text-[#94a3b8] leading-relaxed mb-3 line-clamp-2">
                  <HighlightText text={p.desc} role={hiringRole} />
                </p>
                <div className="flex gap-4 border-t border-[#e5e7eb] dark:border-[#1e293b] pt-2.5 items-end justify-between">
                  <div className="flex gap-4">
                    {p.stats.map((s) => (
                      <div key={s.l}>
                        <div className="text-[13px] font-medium text-[#1a56db] leading-none">{s.v}</div>
                        <div className="text-[10px] text-[#6b7280] dark:text-[#64748b] mt-1">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#1a56db] group-hover:translate-x-0.5 transition-transform">
                    View details <FiArrowRight />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Automation portfolio — collapsible */}
        <h2 className="text-[19px] sm:text-[21px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9] mb-1">Automation portfolio</h2>
        <div className="h-[3px] w-10 rounded-full bg-[#1a56db] mb-2" />
        <p className="text-[11px] text-[#6b7280] dark:text-[#64748b] mb-5">Click any card to expand challenge → solution → flow</p>
        <div className="flex flex-col gap-2">
          {AUTOMATIONS.map((a) => (
            <AutomationCard key={a.title} a={a} role={hiringRole} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

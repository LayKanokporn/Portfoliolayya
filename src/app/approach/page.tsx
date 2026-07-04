"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiClock, FiAlertTriangle, FiDatabase } from "react-icons/fi";
import { PageShell } from "@/components/PageShell";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { BeforeAfterDiff } from "@/components/BeforeAfterDiff";
import { DecisionLog } from "@/components/DecisionLog";

export default function ApproachPage() {
  return (
    <PageShell>
      {/* Page header */}
      <div className="border-b border-[#e5e7eb] dark:border-[#1e293b] bg-[#f8faff] dark:bg-[#060c18]">
        <div className="max-w-6xl mx-auto px-4 sm:px-7 py-6">
          <span className="text-[10px] tabular-nums tracking-wider text-[#9ca3af] dark:text-[#64748b]">03 / 04</span>
          <h1 className="text-[24px] sm:text-[28px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9] mt-1">Approach</h1>
          <p className="text-[13px] text-[#6b7280] dark:text-[#94a3b8] mt-2 max-w-lg">How I think about automation — from problem framing to production reliability.</p>
        </div>
      </div>

      {/* HOW I WORK */}
      <section className="relative border-b border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0a0f1e] overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-7 py-9 sm:py-12">
          <div className="text-[11px] uppercase tracking-wider text-[#6b7280] dark:text-[#94a3b8] mb-1.5">How I work</div>
          <h2 className="text-[20px] sm:text-[22px] tracking-tight text-[#111827] dark:text-[#f1f5f9] mb-6">
            Systems where humans steer, agents execute,{" "}
            <span className="serif-accent text-[#1a56db] dark:text-[#60a5fa]">outcomes are accountable</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { n: "01", title: "Frame the problem" },
              { n: "02", title: "Pre-mortem first" },
              { n: "03", title: "Spec-first" },
              { n: "04", title: "Ship observable" },
            ].map((p) => (
              <div key={p.n} className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-4 hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40 transition-colors">
                <div className="serif-accent text-[22px] text-[#1a56db]/35 dark:text-[#60a5fa]/35 leading-none mb-2.5">{p.n}</div>
                <div className="text-[13px] font-medium text-[#111827] dark:text-[#f1f5f9]">{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELIABILITY */}
      <section className="relative bg-white dark:bg-[#0a0f1e] border-b border-[#e5e7eb] dark:border-[#1e293b] overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-7 py-10 sm:py-12">
          <div className="text-[10px] uppercase tracking-wider text-[#1a56db] dark:text-[#60a5fa] mb-1.5">Production reliability</div>
          <h2 className="text-[20px] sm:text-[22px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9] mb-6">Measured, not asserted.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
            {[
              { icon: <FiShield />, num: "0", label: "Manual keying errors", sub: "Production AP automation since deploy", tone: "#059669" },
              { icon: <FiClock />, num: "≥85%", label: "OCR confidence gate", sub: "Below threshold → finance review", tone: "#1a56db" },
              { icon: <FiAlertTriangle />, num: "SOX", label: "Audit-grade trail", sub: "Excel log + Outlook trail per advice", tone: "#d97706" },
              { icon: <FiDatabase />, num: "100%", label: "Logging coverage", sub: "INFO · WARN · ERROR in every flow step", tone: "#9333ea" },
            ].map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-4">
                <div className="w-8 h-8 rounded-md flex items-center justify-center text-[13px] mb-2.5" style={{ backgroundColor: `${m.tone}15`, color: m.tone }}>{m.icon}</div>
                <div className="text-[20px] sm:text-[22px] font-medium leading-none tracking-tight text-[#111827] dark:text-[#f1f5f9] tabular-nums">{m.num}</div>
                <div className="text-[11.5px] font-medium text-[#374151] dark:text-[#cbd5e1] mt-1.5">{m.label}</div>
                <div className="text-[10.5px] text-[#6b7280] dark:text-[#64748b] mt-0.5 leading-snug">{m.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Architecture */}
          <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#6b7280] dark:text-[#64748b]">System design · case study</div>
                <div className="text-[14px] font-medium text-[#111827] dark:text-[#f1f5f9] mt-0.5">Payment Advice with AI Builder OCR</div>
              </div>
            </div>
            <div className="relative w-full">
              <ArchitectureDiagram className="w-full h-auto" />
              <img src="/architecture-payment-advice.jpg" alt="Power Automate Cloud Flow editor" className="absolute inset-0 w-full h-full object-contain bg-white dark:bg-[#0f172a] rounded-md" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          </div>

          {/* Principles */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["Reply-200-First", "Idempotent by default", "Async over sync", "Logging is mandatory", "Graceful degrade", "Error → email → MTTR", "Measure before scale"].map((p) => (
              <span key={p} className="text-[10.5px] px-2.5 py-1 rounded-md bg-[#f8faff] dark:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#334155] text-[#374151] dark:text-[#cbd5e1]">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <BeforeAfterDiff />

      {/* DECISION LOG */}
      <DecisionLog />
    </PageShell>
  );
}

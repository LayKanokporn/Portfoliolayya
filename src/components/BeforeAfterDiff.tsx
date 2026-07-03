"use client";

import { motion } from "framer-motion";
import { FiX, FiCheck, FiAlertTriangle } from "react-icons/fi";

const MANUAL_STEPS = [
  "Open shared inbox, scan for payment advice emails",
  "Download each PDF attachment",
  "Open PDF, read vendor / invoice # / amount",
  "Open SAP, search vendor master data",
  "Cross-check invoice reference manually",
  "Verify amount digit by digit",
  "Key data into the tracking spreadsheet",
  "Look up beneficiary email + cc list",
  "Compose email per beneficiary",
  "Attach the right advice to the right email",
  "Send — hope nothing was swapped",
  "Log it… if there's time left",
];

const MANUAL_RISKS = ["Typos on amounts", "Advice sent to wrong vendor", "No audit trail", "Skipped when busy"];

const AUTO_STEPS = [
  { t: "Flow triggers on arrival → AI Builder OCR extracts all fields", s: "confidence gate ≥85%" },
  { t: "SAP master-data validation — vendor match, invoice ref, amount tolerance", s: "bad data stops here" },
  { t: "Auto-distribute per beneficiary + Excel audit log per advice", s: "SOX-grade trail" },
];

export function BeforeAfterDiff() {
  return (
    <section className="relative border-b border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0a0f1e] overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-7 py-9 sm:py-12">
        <div className="text-[11px] uppercase tracking-wider text-[#6b7280] dark:text-[#94a3b8] mb-1.5">
          Before / After
        </div>
        <h2 className="text-[20px] sm:text-[22px] tracking-tight text-[#111827] dark:text-[#f1f5f9] mb-1.5">
          The same process,{" "}
          <span className="serif-accent text-[#1a56db] dark:text-[#60a5fa]">re-engineered</span>
        </h2>
        <p className="text-[12.5px] text-[#6b7280] dark:text-[#94a3b8] mb-6 max-w-2xl">
          Payment advice handling at AIS Finance — what the team did by hand every day vs. what runs now.
          If the left column looks like your team, that&apos;s exactly the work I do.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg border border-[#fecaca] dark:border-[#7f1d1d]/60 bg-[#fef2f2] dark:bg-[#450a0a]/20 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-[12px] font-medium text-[#b91c1c] dark:text-[#f87171]">
                BEFORE — manual, every single day
              </div>
              <div className="text-[10.5px] text-[#b91c1c]/70 dark:text-[#f87171]/70">{MANUAL_STEPS.length} steps</div>
            </div>
            <ol className="space-y-1.5 mb-4">
              {MANUAL_STEPS.map((s, i) => (
                <li key={s} className="flex items-start gap-2 text-[11.5px] text-[#7f1d1d] dark:text-[#fca5a5] leading-snug">
                  <FiX className="mt-0.5 shrink-0 text-[#dc2626]" />
                  <span>
                    <span className="tabular-nums text-[#dc2626]/60 mr-1">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-1.5">
              {MANUAL_RISKS.map((r) => (
                <span key={r} className="text-[10px] px-2 py-0.5 rounded bg-[#dc2626]/10 text-[#b91c1c] dark:text-[#f87171] border border-[#dc2626]/20">
                  ⚠ {r}
                </span>
              ))}
            </div>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border border-[#a7f3d0] dark:border-[#065f46]/60 bg-[#f0fdf4] dark:bg-[#052e16]/20 p-5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-[12px] font-medium text-[#047857] dark:text-[#34d399]">
                AFTER — automated, human only where it matters
              </div>
              <div className="text-[10.5px] text-[#047857]/70 dark:text-[#34d399]/70">{AUTO_STEPS.length} steps</div>
            </div>
            <ol className="space-y-3 mb-4">
              {AUTO_STEPS.map((s, i) => (
                <li key={s.t} className="flex items-start gap-2 text-[12px] text-[#064e3b] dark:text-[#6ee7b7] leading-snug">
                  <FiCheck className="mt-0.5 shrink-0 text-[#059669]" />
                  <span>
                    <span className="tabular-nums text-[#059669]/60 mr-1">{String(i + 1).padStart(2, "0")}</span>
                    {s.t}
                    <span className="block text-[10.5px] text-[#047857]/70 dark:text-[#34d399]/70 mt-0.5">→ {s.s}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-auto rounded-md border border-[#f59e0b]/30 bg-[#fffbeb] dark:bg-[#451a03]/30 p-3">
              <div className="flex items-start gap-2 text-[11.5px] text-[#92400e] dark:text-[#fbbf24] leading-snug">
                <FiAlertTriangle className="mt-0.5 shrink-0" />
                <span>
                  <span className="font-medium">The error path is a first-class step, not an afterthought:</span>{" "}
                  OCR below the confidence gate never gets auto-sent — it routes to a finance-owned review queue with an
                  alert. Failures are visible in minutes, never silent.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

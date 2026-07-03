"use client";

import { motion } from "framer-motion";

const DECISIONS = [
  {
    chose: "AI Builder OCR",
    over: "Tesseract / open-source OCR",
    project: "Payment Advice · AIS",
    because:
      "Vendor advices vary wildly in layout — a trained document model extracts labeled fields instead of raw text + fragile regex. Runs natively on the Power Platform stack finance already licenses and can maintain without me.",
    tradeoff: "Per-page cost vs. accuracy + maintainability",
  },
  {
    chose: "Confidence gate + human review queue",
    over: "Full end-to-end automation",
    project: "Payment Advice · AIS",
    because:
      "One advice sent with a wrong amount costs far more than a hundred manual reviews. Below-threshold documents route to a finance-owned queue — automation handles the routine, humans handle exactly the exceptions.",
    tradeoff: "Throughput vs. blast radius of a wrong send",
  },
  {
    chose: "Reference-field classification",
    over: "Patching the date-based model",
    project: "THOR / SOFR · SAP OB83",
    because:
      "The root cause wasn't data entry — the classification model itself couldn't represent IBOR-replacement rates. Redesigning around Reference fields made the fix extensible to future rate types instead of a one-off patch.",
    tradeoff: "Bigger change now vs. repeated patches later",
  },
  {
    chose: "Email-alerted error path",
    over: "Silent retry until success",
    project: "Every workflow I ship",
    because:
      "A bot that retries silently hides failures until they're incidents. Every ERROR log triggers an alert to an owner with context to act on — MTTR in minutes, and 'zero silent failures' becomes a checkable claim, not a slogan.",
    tradeoff: "Alert noise vs. invisible failure debt",
  },
];

export function DecisionLog() {
  return (
    <section id="decisions" className="relative border-b border-[#e5e7eb] dark:border-[#1e293b] bg-[#f8faff] dark:bg-[#060c18] overflow-hidden scroll-mt-14">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-7 py-9 sm:py-12">
        <div className="text-[11px] uppercase tracking-wider text-[#6b7280] dark:text-[#94a3b8] mb-1.5">
          Decision log
        </div>
        <h2 className="text-[20px] sm:text-[22px] tracking-tight text-[#111827] dark:text-[#f1f5f9] mb-1.5">
          Anyone can list tools.{" "}
          <span className="serif-accent text-[#1a56db] dark:text-[#60a5fa]">Here&apos;s why I chose them.</span>
        </h2>
        <p className="text-[12.5px] text-[#6b7280] dark:text-[#94a3b8] mb-6 max-w-2xl">
          Real trade-offs from shipped systems — the interview question &ldquo;why X and not Y?&rdquo;, answered in advance.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {DECISIONS.map((d, i) => (
            <motion.div
              key={d.chose}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-4 hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40 transition-colors"
            >
              <div className="text-[10px] uppercase tracking-wider text-[#6b7280] dark:text-[#64748b] mb-2">
                {d.project}
              </div>
              <div className="text-[13px] leading-snug mb-2.5">
                <span className="font-medium text-[#059669]">✓ {d.chose}</span>
                <span className="text-[#6b7280] dark:text-[#94a3b8]"> over </span>
                <span className="text-[#6b7280] dark:text-[#94a3b8] line-through decoration-[#dc2626]/40">{d.over}</span>
              </div>
              <p className="text-[11.5px] text-[#374151] dark:text-[#cbd5e1] leading-relaxed mb-3">{d.because}</p>
              <div className="text-[10.5px] text-[#6b7280] dark:text-[#94a3b8] border-t border-[#e5e7eb] dark:border-[#1e293b] pt-2">
                <span className="uppercase tracking-wider text-[9px]">Trade-off accepted:</span> {d.tradeoff}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

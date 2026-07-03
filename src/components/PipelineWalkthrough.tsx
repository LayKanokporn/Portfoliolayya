"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiHelpCircle, FiAlertCircle } from "react-icons/fi";

type Node = {
  id: string;
  label: string;
  sub: string;
  why: string;
  fail: string;
};

const NODES: Node[] = [
  {
    id: "trigger",
    label: "Inbox Trigger",
    sub: "Power Automate",
    why: "Event-driven over polling — the flow fires the moment an advice arrives, so there is no batch window where documents pile up unprocessed. Attachment filter keeps non-advice mail out of the pipeline.",
    fail: "If the trigger ever misses (service outage), advices stay safely in the inbox — nothing is consumed destructively, so recovery is a simple re-run.",
  },
  {
    id: "ocr",
    label: "AI Builder OCR",
    sub: "Document model",
    why: "Chose AI Builder over open-source OCR (Tesseract) because scanned vendor advices vary wildly in layout — a trained document model extracts labeled fields (vendor, invoice #, amount, date), not raw text I'd have to parse with fragile regex. It also lives natively in the Power Platform stack finance already licenses.",
    fail: "Low-quality scans produce low confidence scores — which is exactly what the next gate is for. OCR never fails silently into wrong data.",
  },
  {
    id: "gate",
    label: "Confidence Gate ≥85%",
    sub: "The design decision",
    why: "Why 85% and not 80%? Testing against real advices showed field-level errors — especially on amounts — rise sharply below 85%. The cost of one advice sent with a wrong amount vastly exceeds the cost of a human review. The threshold is a business decision expressed in code.",
    fail: "Below the gate, the advice routes to a finance-owned review queue with an alert — never auto-sent, never dropped. Humans handle exactly the cases automation shouldn't.",
  },
  {
    id: "sap",
    label: "SAP Validation",
    sub: "Master data check",
    why: "OCR confidence alone isn't enough — a confidently-read wrong value still passes the gate. Cross-checking vendor match, invoice reference, and amount tolerance against SAP master data catches semantic errors the OCR score can't see. Added after a real case: OCR caught the vendor name but missed cents.",
    fail: "Any mismatch → same finance review queue. The two checks are independent layers: statistical (OCR) and semantic (SAP).",
  },
  {
    id: "send",
    label: "Per-beneficiary Send",
    sub: "Outlook distribution",
    why: "Distribution is per-vendor with its own recipient + cc list — the highest-stakes step, because a swapped attachment leaks one vendor's payment data to another. It only runs after both gates pass.",
    fail: "Send failures are retried, then alerted — a vendor not receiving an advice is a visible incident, not a mystery discovered weeks later.",
  },
  {
    id: "audit",
    label: "Excel Audit Log",
    sub: "SOX-grade trail",
    why: "Every advice writes one audit row: what was extracted, what was validated, who received it, when. Finance can answer 'what happened to invoice X?' without asking IT — the trail is theirs, in a tool they own.",
    fail: "Logging failure is treated as a pipeline failure — an advice without an audit row is not 'done'. That rule is what makes the trail trustworthy for SOX.",
  },
];

export function PipelineWalkthrough() {
  const [active, setActive] = useState<string>("gate");
  const node = NODES.find((n) => n.id === active)!;

  return (
    <div className="mt-4 rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#6b7280] dark:text-[#64748b]">
            Interactive walkthrough
          </div>
          <div className="text-[14px] font-medium text-[#111827] dark:text-[#f1f5f9] mt-0.5">
            Click any node — see the design decision behind it
          </div>
        </div>
        <div className="text-[10.5px] text-[#6b7280] dark:text-[#94a3b8]">
          Architecture is easy. Knowing <em>why</em> is the job.
        </div>
      </div>

      {/* Node strip */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        {NODES.map((n, i) => (
          <div key={n.id} className="flex items-center gap-1.5">
            <button
              onClick={() => setActive(n.id)}
              className={`text-left px-3 py-2 rounded-md border transition-all ${
                active === n.id
                  ? "border-[#1a56db] bg-[#e0e7ff] dark:bg-[#1e3a5f] shadow-sm"
                  : "border-[#e5e7eb] dark:border-[#334155] bg-[#f8faff] dark:bg-[#1e293b] hover:border-[#1a56db]/50"
              }`}
            >
              <div className={`text-[11.5px] font-medium leading-none ${
                active === n.id ? "text-[#1a56db] dark:text-[#60a5fa]" : "text-[#111827] dark:text-[#e2e8f0]"
              }`}>
                {n.label}
              </div>
              <div className="text-[9.5px] text-[#6b7280] dark:text-[#94a3b8] mt-1">{n.sub}</div>
            </button>
            {i < NODES.length - 1 && (
              <FiChevronRight className="text-[#9ca3af] dark:text-[#475569] shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={node.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="grid md:grid-cols-2 gap-3"
        >
          <div className="rounded-md border border-[#e5e7eb] dark:border-[#1e293b] bg-[#f8faff] dark:bg-[#0a0f1e] p-4">
            <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-[#1a56db] dark:text-[#60a5fa] mb-2">
              <FiHelpCircle /> Why this design
            </div>
            <p className="text-[12px] text-[#374151] dark:text-[#cbd5e1] leading-relaxed">{node.why}</p>
          </div>
          <div className="rounded-md border border-[#e5e7eb] dark:border-[#1e293b] bg-[#f8faff] dark:bg-[#0a0f1e] p-4">
            <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-[#d97706] mb-2">
              <FiAlertCircle /> What happens when it fails
            </div>
            <p className="text-[12px] text-[#374151] dark:text-[#cbd5e1] leading-relaxed">{node.fail}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

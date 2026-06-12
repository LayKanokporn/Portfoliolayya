"use client";
import React from "react";
import { motion } from "framer-motion";

export function ArchitectureDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 340"
      className={className}
      role="img"
      aria-label="Payment Advice with OCR architecture: Outlook inbox to Power Automate to AI Builder OCR to SAP validation to per-beneficiary distribution with Excel audit log and error alerting"
    >
      <defs>
        <marker id="ad-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#1a56db" />
        </marker>
        <marker id="ad-arr-err" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
        </marker>
        <pattern id="ad-grid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="0.6" fill="currentColor" />
        </pattern>
      </defs>

      {/* Panel */}
      <rect x="2" y="2" width="716" height="336" rx="12" className="fill-[#f8faff] dark:fill-[#0f172a]" stroke="none" />
      <rect x="2" y="2" width="716" height="336" rx="12" fill="none" className="stroke-[#e5e7eb] dark:stroke-[#1e293b]" />
      <rect x="2" y="2" width="716" height="336" rx="12" fill="url(#ad-grid)" className="text-[#cbd5e1] dark:text-[#1e293b]" opacity="0.5" />

      {/* Lane labels */}
      <text x="24" y="28" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#64748b]" letterSpacing="1.5">INGEST</text>
      <text x="190" y="28" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#64748b]" letterSpacing="1.5">EXTRACT</text>
      <text x="370" y="28" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#64748b]" letterSpacing="1.5">VALIDATE</text>
      <text x="540" y="28" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#64748b]" letterSpacing="1.5">DISTRIBUTE</text>

      {/* AP Team / Inbox */}
      <motion.g initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <rect x="20" y="60" width="140" height="56" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#0066ff" strokeWidth="1.8" />
        <text x="90" y="82" textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Vendor Email</text>
        <text x="90" y="96" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#0066ff] dark:fill-[#60a5fa]">Outlook inbox</text>
        <text x="90" y="108" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">Payment advice attachment</text>
      </motion.g>

      {/* Power Automate trigger */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <rect x="20" y="140" width="140" height="56" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#0066ff" strokeWidth="1.8" />
        <text x="90" y="162" textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Power Automate</text>
        <text x="90" y="176" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#0066ff] dark:fill-[#60a5fa]">Cloud Flow trigger</text>
        <text x="90" y="188" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">When email arrives</text>
      </motion.g>

      {/* AI Builder OCR */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <rect x="195" y="80" width="160" height="80" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#9333ea" strokeWidth="2" />
        <text x="275" y="100" textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">AI Builder OCR</text>
        <text x="275" y="115" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#9333ea] dark:fill-[#a78bfa]">Document model</text>
        <line x1="207" y1="124" x2="343" y2="124" className="stroke-[#e5e7eb] dark:stroke-[#1e293b]" />
        <text x="275" y="138" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">Extract: vendor, invoice #,</text>
        <text x="275" y="150" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">amount, payment date, ref</text>
      </motion.g>

      {/* Confidence Gate */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <rect x="195" y="180" width="160" height="48" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="275" y="200" textAnchor="middle" fontSize="10.5" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Confidence Gate</text>
        <text x="275" y="214" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">≥ 85% → continue · &lt; → review</text>
      </motion.g>

      {/* SAP Validation */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <rect x="375" y="80" width="150" height="80" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#0080a0" strokeWidth="2" />
        <text x="450" y="100" textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">SAP S/4HANA</text>
        <text x="450" y="115" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#0080a0] dark:fill-[#5eead4]">Master data validation</text>
        <line x1="387" y1="124" x2="513" y2="124" className="stroke-[#e5e7eb] dark:stroke-[#1e293b]" />
        <text x="450" y="138" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">Vendor match · Invoice ref</text>
        <text x="450" y="150" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">Amount tolerance check</text>
      </motion.g>

      {/* Beneficiary Lookup */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <rect x="375" y="180" width="150" height="48" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#0080a0" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="450" y="200" textAnchor="middle" fontSize="10.5" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Beneficiary Lookup</text>
        <text x="450" y="214" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">Per-vendor email + cc list</text>
      </motion.g>

      {/* Outlook send */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
        <rect x="545" y="80" width="150" height="80" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#0066ff" strokeWidth="2" />
        <text x="620" y="100" textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Outlook Send</text>
        <text x="620" y="115" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#0066ff] dark:fill-[#60a5fa]">Per beneficiary</text>
        <line x1="557" y1="124" x2="683" y2="124" className="stroke-[#e5e7eb] dark:stroke-[#1e293b]" />
        <text x="620" y="138" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">Generated advice PDF</text>
        <text x="620" y="150" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">Targeted distribution</text>
      </motion.g>

      {/* Excel Audit Log */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
        <rect x="545" y="180" width="150" height="48" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#059669" strokeWidth="2" />
        <text x="620" y="200" textAnchor="middle" fontSize="10.5" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Excel Audit Log</text>
        <text x="620" y="214" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#059669] dark:fill-[#34d399]">SOX-grade traceability</text>
      </motion.g>

      {/* Error path — Finance review queue */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}>
        <rect x="195" y="248" width="330" height="56" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="360" y="268" textAnchor="middle" fontSize="10.5" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Finance Review Queue</text>
        <text x="360" y="282" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#ef4444]">Low confidence · SAP mismatch · validation fail</text>
        <text x="360" y="295" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">Email alert → manual review → loop back to OCR retrain</text>
      </motion.g>

      {/* Email Alert */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.0 }}>
        <rect x="545" y="248" width="150" height="56" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#ef4444" strokeWidth="1.5" />
        <text x="620" y="268" textAnchor="middle" fontSize="10.5" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Email Alert</text>
        <text x="620" y="282" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#ef4444]">On any failure</text>
        <text x="620" y="295" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">Finance team owner</text>
      </motion.g>

      {/* Happy path edges */}
      <motion.g
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        stroke="#1a56db"
        strokeWidth="1.5"
        fill="none"
      >
        <motion.line x1="90" y1="116" x2="90" y2="138" markerEnd="url(#ad-arr)" />
        <motion.path d="M160 168 Q 175 168 192 120" markerEnd="url(#ad-arr)" />
        <motion.line x1="275" y1="160" x2="275" y2="178" markerEnd="url(#ad-arr)" />
        <motion.path d="M355 204 Q 365 204 373 196" markerEnd="url(#ad-arr)" />
        <motion.line x1="355" y1="120" x2="373" y2="120" markerEnd="url(#ad-arr)" />
        <motion.line x1="450" y1="160" x2="450" y2="178" markerEnd="url(#ad-arr)" />
        <motion.path d="M525 204 Q 535 204 543 196" markerEnd="url(#ad-arr)" />
        <motion.line x1="525" y1="120" x2="543" y2="120" markerEnd="url(#ad-arr)" />
        <motion.line x1="620" y1="160" x2="620" y2="178" markerEnd="url(#ad-arr)" />
      </motion.g>

      {/* Error path edges (dashed red) */}
      <motion.g
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        stroke="#ef4444"
        strokeWidth="1.3"
        strokeDasharray="4 3"
        fill="none"
      >
        <motion.path d="M275 228 L 275 246" markerEnd="url(#ad-arr-err)" />
        <motion.path d="M450 228 L 450 246" markerEnd="url(#ad-arr-err)" />
        <motion.line x1="525" y1="276" x2="543" y2="276" markerEnd="url(#ad-arr-err)" />
      </motion.g>

      {/* Footnote */}
      <text x="360" y="324" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">
        AI Builder OCR · SAP validation · per-beneficiary distribution · SOX-grade audit · error → finance review
      </text>
    </svg>
  );
}

export default ArchitectureDiagram;

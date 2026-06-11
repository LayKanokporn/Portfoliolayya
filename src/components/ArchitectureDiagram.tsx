"use client";
import React from "react";
import { motion } from "framer-motion";

export function ArchitectureDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 320"
      className={className}
      role="img"
      aria-label="KaiJa Bot architecture: LINE webhook to GAS to Sheets with retry, defer queue, and idempotent cache"
    >
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#1a56db" />
        </marker>
        <marker id="arr-err" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
        </marker>
        <pattern id="ad-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="0.6" fill="currentColor" />
        </pattern>
      </defs>

      <rect x="2" y="2" width="716" height="316" rx="12" className="fill-[#f8faff] dark:fill-[#0f172a]" stroke="none" />
      <rect x="2" y="2" width="716" height="316" rx="12" fill="none" className="stroke-[#e5e7eb] dark:stroke-[#1e293b]" />
      <rect x="2" y="2" width="716" height="316" rx="12" fill="url(#ad-dots)" className="text-[#cbd5e1] dark:text-[#1e293b]" opacity="0.5" />

      {/* Lane labels */}
      <text x="24" y="28" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#64748b]" letterSpacing="1.5">EDGE</text>
      <text x="220" y="28" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#64748b]" letterSpacing="1.5">COMPUTE</text>
      <text x="448" y="28" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#64748b]" letterSpacing="1.5">STATE</text>
      <text x="630" y="28" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#64748b]" letterSpacing="1.5">OBSERVE</text>

      {/* LINE User */}
      <motion.g initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <rect x="24" y="60" width="120" height="48" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#06c755" strokeWidth="1.5" />
        <text x="84" y="82" textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">LINE User</text>
        <text x="84" y="96" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">Message / Slip / Cmd</text>
      </motion.g>

      {/* LINE Platform */}
      <motion.g initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <rect x="24" y="148" width="120" height="48" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#06c755" strokeWidth="1.5" />
        <text x="84" y="170" textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">LINE Messaging API</text>
        <text x="84" y="184" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">Webhook · 30s deadline</text>
      </motion.g>

      {/* Webhook Receiver */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <rect x="220" y="60" width="180" height="56" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#1a56db" strokeWidth="2" />
        <text x="310" y="80" textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Webhook Receiver</text>
        <text x="310" y="94" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#1a56db] dark:fill-[#60a5fa]">Reply 200 First</text>
        <text x="310" y="106" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">Google Apps Script doPost</text>
      </motion.g>

      {/* Idempotent Cache */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <rect x="220" y="132" width="180" height="44" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#1a56db" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="310" y="151" textAnchor="middle" fontSize="10.5" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Idempotency Check</text>
        <text x="310" y="165" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">Dedup by messageId (TTL 24h)</text>
      </motion.g>

      {/* Defer Queue */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <rect x="220" y="192" width="180" height="56" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#9333ea" strokeWidth="2" />
        <text x="310" y="212" textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Defer Queue + OCR</text>
        <text x="310" y="226" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#9333ea] dark:fill-[#a78bfa]">Async slip processing</text>
        <text x="310" y="238" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">Time-trigger · Push fallback</text>
      </motion.g>

      {/* Sheets State DB */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <rect x="448" y="60" width="160" height="120" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#0d9488" strokeWidth="2" />
        <text x="528" y="80" textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Google Sheets DB</text>
        <line x1="460" y1="92" x2="596" y2="92" className="stroke-[#e5e7eb] dark:stroke-[#1e293b]" />
        <text x="528" y="108" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">Transactions</text>
        <text x="528" y="124" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">Stock / SKU</text>
        <text x="528" y="140" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">User State</text>
        <text x="528" y="156" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">Defer Queue Log</text>
        <text x="528" y="172" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">Dedup Cache</text>
      </motion.g>

      {/* Push fallback box */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
        <rect x="448" y="196" width="160" height="56" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#06c755" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="528" y="216" textAnchor="middle" fontSize="10.5" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Push API Fallback</text>
        <text x="528" y="230" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">When reply token expires</text>
        <text x="528" y="242" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#06c755] dark:fill-[#34d399]">graceful degrade</text>
      </motion.g>

      {/* Observability */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
        <rect x="624" y="60" width="80" height="100" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#f59e0b" strokeWidth="2" />
        <text x="664" y="80" textAnchor="middle" fontSize="10.5" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Log Sheet</text>
        <line x1="636" y1="90" x2="692" y2="90" className="stroke-[#e5e7eb] dark:stroke-[#1e293b]" />
        <text x="664" y="105" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">INFO</text>
        <text x="664" y="120" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#f59e0b] dark:fill-[#fbbf24]">WARN</text>
        <text x="664" y="135" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#ef4444]">ERROR</text>
        <text x="664" y="150" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#374151] dark:fill-[#cbd5e1]">TRACE</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}>
        <rect x="624" y="172" width="80" height="76" rx="8" className="fill-white dark:fill-[#0a0f1e]" stroke="#ef4444" strokeWidth="1.5" />
        <text x="664" y="192" textAnchor="middle" fontSize="10.5" fontFamily="ui-sans-serif" fontWeight="500" className="fill-[#111827] dark:fill-[#f1f5f9]">Email Alert</text>
        <text x="664" y="208" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#ef4444]">on ERROR</text>
        <text x="664" y="222" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">MTTR &lt; 5m</text>
        <text x="664" y="238" textAnchor="middle" fontSize="8.5" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">on-call: solo</text>
      </motion.g>

      {/* Edges */}
      <motion.g
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        stroke="#1a56db"
        strokeWidth="1.5"
        fill="none"
      >
        <motion.line x1="84" y1="108" x2="84" y2="146" markerEnd="url(#arr)" />
        <motion.line x1="144" y1="172" x2="218" y2="88" markerEnd="url(#arr)" />
        <motion.line x1="310" y1="116" x2="310" y2="130" markerEnd="url(#arr)" />
        <motion.line x1="310" y1="176" x2="310" y2="190" markerEnd="url(#arr)" />
        <motion.path d="M400 160 Q 425 160 446 120" markerEnd="url(#arr)" />
        <motion.path d="M400 220 Q 425 220 446 152" markerEnd="url(#arr)" />
        <motion.line x1="608" y1="120" x2="622" y2="100" markerEnd="url(#arr)" />
        <motion.path d="M400 95 Q 480 30 660 60" markerEnd="url(#arr)" />
      </motion.g>

      {/* Error path */}
      <motion.g
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        stroke="#ef4444"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        fill="none"
      >
        <motion.path d="M664 160 L 664 170" markerEnd="url(#arr-err)" />
      </motion.g>

      {/* Footnote */}
      <text x="360" y="296" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-[#6b7280] dark:fill-[#94a3b8]">
        Reply-200-First · Idempotent · Async OCR · Logged · Auto-alerted on error
      </text>
    </svg>
  );
}

export default ArchitectureDiagram;

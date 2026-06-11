"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiHome, FiBriefcase, FiFileText, FiZap } from "react-icons/fi";
import { Logo } from "@/components/Logo";

const QUICK_LINKS = [
  { icon: <FiHome />, label: "Home", desc: "Dashboard overview", href: "/" },
  { icon: <FiBriefcase />, label: "Portfolio", desc: "Full case studies", href: "/portfolio" },
  { icon: <FiFileText />, label: "Resume", desc: "One-page printable", href: "/resume" },
  { icon: <FiZap />, label: "Creative", desc: "Animated version", href: "/v1" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8faff] text-[#111827] flex flex-col">
      <div className="border-b border-[#e5e7eb] bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-7 py-3 flex items-center justify-between">
          <Link href="/" className="text-[20px] leading-none">
            <Logo variant="compact" theme="light" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#6b7280] hover:text-[#1a56db]"
          >
            <FiArrowLeft /> Back home
          </Link>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center px-5 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute -right-32 -top-32 w-96 h-96 orb-blue pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative max-w-2xl text-center"
        >
          <div className="text-[120px] sm:text-[160px] leading-none font-normal tracking-tight serif-accent text-[#1a56db]/20 select-none mb-2">
            404
          </div>
          <h1 className="text-[22px] sm:text-[28px] tracking-tight mb-2">
            This page isn&apos;t in production yet.
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#6b7280] max-w-md mx-auto mb-8 leading-relaxed">
            The route you tried doesn&apos;t exist (or was retired during a refactor).
            Pick one of these instead — every link works.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {QUICK_LINKS.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="group flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] bg-white hover:border-[#1a56db]/40 hover:shadow-sm transition-all text-left"
              >
                <div className="w-9 h-9 rounded-md bg-[#e0e7ff] text-[#1a56db] flex items-center justify-center shrink-0">
                  {q.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-[#111827] inline-flex items-center gap-1">
                    {q.label}
                  </div>
                  <div className="text-[11px] text-[#6b7280]">{q.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-[#e5e7eb] bg-white py-4">
        <div className="max-w-5xl mx-auto px-5 sm:px-7 text-center text-[11px] text-[#6b7280]">
          © {new Date().getFullYear()} Kanokporn Hudsree · Bangkok
        </div>
      </footer>
    </div>
  );
}

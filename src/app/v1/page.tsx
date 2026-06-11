"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCpu,
  FiZap,
  FiLayers,
  FiInfo,
  FiExternalLink,
} from "react-icons/fi";
import { Logo } from "@/components/Logo";
import { MagneticButton } from "@/components/MagneticButton";
import { HoverCard } from "@/components/HoverCard";

/**
 * v1 — "Creative version" preserve route.
 *
 * The current `/` and `/portfolio` are the editorial, recruiter-facing
 * version. This page keeps a record of the more animated / detailed
 * earlier direction in case visitors want to see the longer story.
 *
 * Light theme, lean — but uses larger gradient hero + animation accents
 * so the personality difference vs. `/` is visible at a glance.
 */
export default function V1Page() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      {/* TOP BAR */}
      <div className="border-b border-[#e5e7eb] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#6b7280] hover:text-[#1a56db]"
          >
            <FiArrowLeft /> Back to current version
          </Link>
          <Logo variant="compact" theme="light" />
        </div>
      </div>

      {/* HERO with animation */}
      <section className="relative overflow-hidden border-b border-[#e5e7eb]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-br from-[#0c2463] via-[#1a3a8f] to-[#1a5fb4]"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.4 }}
          className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="absolute -left-24 bottom-0 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-7 py-14 sm:py-20">
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/70 bg-white/10 border border-white/20 px-2.5 py-1 rounded mb-5"
          >
            <FiInfo /> Creative / Detailed Version
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[28px] sm:text-[42px] tracking-tight leading-tight mb-3 text-white"
          >
            The longer story
            <br />
            <span className="text-white/60">of what I build, and why.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-[13px] sm:text-[14px] text-white/75 max-w-2xl leading-relaxed mb-6"
          >
            The current home page is built for recruiters — fast scan, honest
            numbers, no filler. This page is for the curious: a slightly more
            animated overview, with deeper context and an interactive demo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            <MagneticButton
              as="a"
              href="/portfolio"
              strength={0.3}
              className="inline-flex items-center text-[12px] font-medium bg-white text-[#0c2463] px-4 py-2 rounded-md hover:bg-[#f8faff] transition-colors"
            >
              Explore the full portfolio <FiArrowRight />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/resume"
              strength={0.3}
              className="inline-flex items-center text-[12px] bg-transparent border border-white/40 text-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              One-page resume
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* WHY THIS PAGE EXISTS */}
      <section className="border-b border-[#e5e7eb] bg-[#f8faff] py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-5 sm:px-7">
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-[#6b7280] mb-3">
            Why two versions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card icon={<FiLayers />} title="Editorial (Current)">
              <p className="text-[12.5px] text-[#374151] leading-relaxed">
                Lean, scannable, and information-dense. Built for recruiters
                who decide in 60 seconds. No emoji, no decorative motion,
                proof-based copy only. This is what loads at <code className="text-[11px] bg-white px-1 py-0.5 rounded border border-[#e5e7eb]">/</code>.
              </p>
            </Card>
            <Card icon={<FiZap />} title="Creative (This page)">
              <p className="text-[12.5px] text-[#374151] leading-relaxed">
                Slightly more atmosphere — gradient hero, motion accents,
                magnetic CTAs, and hover popovers. Same content, but framed
                like a story rather than a dashboard.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* INTERACTIVE — HoverCard demo */}
      <section className="border-b border-[#e5e7eb] py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-5 sm:px-7">
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-[#6b7280] mb-3">
            Hover (or tap) for context
          </h2>
          <p className="text-[12.5px] text-[#6b7280] mb-5 max-w-2xl leading-relaxed">
            Each item below opens a popover with deeper context — the same
            interaction pattern used on the sidebar of the current home page.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DEMOS.map((d) => (
              <HoverCard
                key={d.title}
                side="bottom"
                width={300}
                trigger={
                  <div className="rounded-lg border border-[#e5e7eb] bg-white p-4 hover:border-[#1a56db]/40 hover:shadow-sm transition-all cursor-pointer">
                    <div className="text-[#1a56db] mb-2">{d.icon}</div>
                    <div className="text-[13px] font-medium text-[#111827] mb-1">{d.title}</div>
                    <div className="text-[11.5px] text-[#6b7280]">{d.short}</div>
                  </div>
                }
                content={
                  <div>
                    <div className="text-[12px] font-medium text-[#111827] mb-1.5">{d.title}</div>
                    <p className="text-[11.5px] text-[#374151] leading-relaxed mb-2.5">
                      {d.detail}
                    </p>
                    <a
                      href={d.href}
                      className="inline-flex items-center gap-1 text-[11px] text-[#1a56db] hover:underline"
                    >
                      Read more <FiExternalLink />
                    </a>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#0c2463] to-[#1a5fb4]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 sm:px-7 py-6">
          <div>
            <div className="text-[15px] font-medium text-white">
              Ready for the recruiter-facing version?
            </div>
            <div className="text-[12px] text-white/70 mt-1">
              Faster to scan · honest numbers · same content, no filler.
            </div>
          </div>
          <MagneticButton
            as="a"
            href="/"
            strength={0.35}
            className="inline-flex items-center text-[12px] font-medium bg-white text-[#0c2463] px-4 py-2 rounded-md hover:bg-[#f8faff] transition-colors"
          >
            Go to current version <FiArrowRight />
          </MagneticButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e5e7eb] bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-7 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-[#6b7280]">
            © {new Date().getFullYear()} Kanokporn Hudsree · Bangkok
          </span>
          <div className="flex items-center gap-4 text-[12px]">
            <Link href="/" className="text-[#6b7280] hover:text-[#1a56db]">Home</Link>
            <Link href="/portfolio" className="text-[#6b7280] hover:text-[#1a56db]">Full portfolio</Link>
            <Link href="/resume" className="text-[#6b7280] hover:text-[#1a56db]">Resume</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const DEMOS = [
  {
    icon: <FiCpu className="text-2xl" />,
    title: "SAP S/4HANA",
    short: "OB83, BG, GR, Mass SO, Payment Advice",
    detail:
      "Direct work on SAP S/4HANA financial workflows at AIS. OB83 enhancement for THOR + SOFR rates, Bank Guarantee monitoring, Goods Receipt automation, Mass Sales Order processing, and Payment Advice with AI Builder OCR.",
    href: "/portfolio#experience",
  },
  {
    icon: <FiZap className="text-2xl" />,
    title: "Self-built production",
    short: "Sunrise LINE Bots — 16+ weeks live",
    detail:
      "Solo-architected 2-bot LINE OA suite. Reply-200-First webhook, idempotent processing, defer queue for slip OCR. Patterns reused in enterprise UiPath at AIS. Reduced daily ops by ~83%.",
    href: "/portfolio#projects",
  },
  {
    icon: <FiLayers className="text-2xl" />,
    title: "Document AI / OCR",
    short: "Power Automate · Azure · AWS · SAP · Tesseract",
    detail:
      "OCR coverage across every major platform — Power Automate AI Builder (production at AIS), SAP Document AI (Adoption Lab), Azure Document Intelligence, AWS Textract, Google Document AI, Tesseract, and Python pipelines.",
    href: "/portfolio#skills",
  },
];

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
      <div className="text-[#1a56db] mb-2 text-lg">{icon}</div>
      <h3 className="text-[13.5px] font-medium text-[#111827] mb-2">{title}</h3>
      {children}
    </div>
  );
}

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
  FiExternalLink,
  FiCalendar,
  FiTrendingDown,
  FiAward,
  FiDatabase,
} from "react-icons/fi";
import { Logo } from "@/components/Logo";
import { MagneticButton } from "@/components/MagneticButton";
import { HoverCard } from "@/components/HoverCard";
import AutomationSimulator from "@/components/AutomationSimulator";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const METRICS = [
  { icon: <FiCalendar />, num: "2+ yrs", label: "Industry experience" },
  { icon: <FiTrendingDown />, num: "~83%", label: "Manual ops reduced" },
  { icon: <FiDatabase />, num: "0", label: "Silent failures" },
  { icon: <FiAward />, num: "3.53", label: "GPA · First-Class" },
];

const FEATURED = [
  {
    name: "AI Code Assistant for QA",
    org: "PTT Digital · YOU&AI Forward Together",
    image: "/project-ai-code-qa.jpg",
    desc: "AI code review assistant cutting QA cycle time. Offloads lint/vulnerability/convention checks from senior reviewers. Presented live at PTT Digital AI showcase.",
    stats: ["+75% QA productivity", "5-20% cost/release", "Live showcase"],
    accent: "from-[#4c1d95] to-[#7c3aed]",
  },
  {
    name: "Payment Advice with AI Builder OCR",
    org: "AIS · Finance AP Automation",
    image: "/project-payment-advice.jpg",
    desc: "Power Automate Cloud Flow — extracts payment data via AI Builder OCR, validates against SAP master data, auto-generates and distributes advice per beneficiary.",
    stats: ["AI Builder OCR", "SAP validated", "Auto-distributed"],
    accent: "from-[#0c2463] to-[#1a5fb4]",
  },
  {
    name: "BG Alert Automation",
    org: "AIS · SAP S/4HANA",
    image: "/project-bg-alert.jpg",
    desc: "Automated Bank Guarantee expiration monitoring in SAP. Classifies 30d / 7d / expired, distributes targeted email alerts. UiPath + SAP Web GUI + Outlook.",
    stats: ["Daily coverage", "Eliminated manual", "Full audit trail"],
    accent: "from-[#0c4a6e] to-[#0284c7]",
  },
];

const DEMOS = [
  {
    icon: <FiCpu className="text-2xl" />,
    title: "SAP S/4HANA",
    short: "OB83, BG Alert, GR, Mass SO, Payment Advice",
    detail:
      "Direct work on SAP S/4HANA financial workflows at AIS. OB83 enhancement for THOR + SOFR rates, Bank Guarantee monitoring, Goods Receipt automation, Mass Sales Order processing, and Payment Advice with AI Builder OCR.",
    href: "/portfolio#experience",
  },
  {
    icon: <FiZap className="text-2xl" />,
    title: "Self-built production system",
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

export default function V1Page() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      {/* TOP BAR */}
      <div className="sticky top-0 z-30 border-b border-[#e5e7eb] bg-white/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#6b7280] hover:text-[#1a56db] transition-colors"
          >
            <FiArrowLeft /> Back to current version
          </Link>
          <Logo variant="compact" theme="light" />
        </div>
      </div>

      {/* HERO — 2-col: profile photo left, headline right */}
      <section className="relative overflow-hidden border-b border-[#e5e7eb]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-br from-[#0c2463] via-[#1a3a8f] to-[#1a5fb4]"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.4 }}
          className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="absolute -left-24 bottom-0 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-7 py-12 sm:py-20">
          <div className="grid sm:grid-cols-[220px_1fr] gap-8 sm:gap-12 items-center">
            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative mx-auto sm:mx-0 w-[180px] sm:w-full"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-white/25 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt="Kanokporn Hudsree (Lay)"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium px-3 py-1 rounded-full bg-emerald-500 text-white shadow-md">
                Open to Automation Specialist roles
              </span>
            </motion.div>

            {/* Headline + chips + CTAs */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/70 bg-white/10 border border-white/20 px-2.5 py-1 rounded mb-5"
              >
                Creative / Detailed Version
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-[26px] sm:text-[40px] tracking-tight leading-tight mb-3 text-white"
              >
                The longer story
                <br />
                <span className="text-white/55">of what I build, and why.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="text-[13px] sm:text-[14px] text-white/75 max-w-xl leading-relaxed mb-5"
              >
                ERP Developer & Automation Engineer at AIS — SAP S/4HANA
                financial workflows, Power Automate AI Builder OCR, UiPath RPA
                in production. Solo-built a LINE Bot suite that ran 16 weeks with
                zero silent failures.
              </motion.p>

              {/* stat chips */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {[
                  "2+ yrs enterprise exp.",
                  "~83% manual ops cut",
                  "0 silent failures",
                  "3.53 GPA · First-Class",
                ].map((s) => (
                  <span
                    key={s}
                    className="text-[10.5px] px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/85"
                  >
                    {s}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="flex flex-wrap gap-2"
              >
                <MagneticButton
                  as="a"
                  href="/portfolio"
                  strength={0.3}
                  className="inline-flex items-center gap-2 text-[12px] font-medium bg-white text-[#0c2463] px-4 py-2 rounded-md hover:bg-[#f8faff] transition-colors"
                >
                  Explore full portfolio <FiArrowRight />
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="/resume"
                  strength={0.3}
                  className="inline-flex items-center gap-2 text-[12px] bg-transparent border border-white/40 text-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
                >
                  One-page resume
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="border-b border-[#e5e7eb] bg-[#f8faff]">
        <div className="max-w-5xl mx-auto px-5 sm:px-7 py-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-8 h-8 rounded-lg bg-[#e0e7ff] text-[#1a56db] flex items-center justify-center mb-2">
                {m.icon}
              </div>
              <div className="text-[22px] sm:text-[26px] font-medium tracking-tight text-[#111827] tabular-nums">
                <AnimatedCounter value={m.num} />
              </div>
              <div className="text-[11px] text-[#6b7280] mt-1 leading-snug">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="border-b border-[#e5e7eb] py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-5 sm:px-7">
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-[#6b7280] mb-6">
            Featured projects
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {FEATURED.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href="/portfolio#projects"
                  className="group block rounded-xl border border-[#e5e7eb] bg-white overflow-hidden hover:border-[#1a56db]/40 hover:shadow-md transition-all h-full"
                >
                  {/* Image */}
                  <div className={`relative h-44 bg-gradient-to-br ${p.accent} overflow-hidden`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-white bg-[#1a56db] px-2 py-0.5 rounded-full">
                        View detail →
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <div className="text-[10px] text-[#6b7280] mb-1">{p.org}</div>
                    <div className="text-[13px] font-medium text-[#111827] group-hover:text-[#1a56db] transition-colors mb-2 leading-snug">
                      {p.name}
                    </div>
                    <p className="text-[11.5px] text-[#374151] leading-relaxed mb-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stats.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[#e0e7ff] text-[#1a56db] border border-[#c7d2fe]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/portfolio#projects"
              className="inline-flex items-center gap-1.5 text-[12px] text-[#1a56db] hover:underline"
            >
              View all projects <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* HOVER DEMOS */}
      <section className="border-b border-[#e5e7eb] bg-[#f8faff] py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-5 sm:px-7">
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-[#6b7280] mb-2">
            Hover for deeper context
          </h2>
          <p className="text-[12.5px] text-[#6b7280] mb-5 max-w-2xl leading-relaxed">
            Each card opens a popover with specifics — the same interaction used
            on the main portfolio sidebar.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
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
                    <p className="text-[11.5px] text-[#374151] leading-relaxed mb-2.5">{d.detail}</p>
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

      {/* AUTOMATION SIMULATOR */}
      <section className="border-b border-[#e5e7eb] py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-5 sm:px-7">
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-[#6b7280] mb-2">
            Try it — interactive demo
          </h2>
          <p className="text-[12.5px] text-[#6b7280] mb-6 max-w-2xl leading-relaxed">
            Simulate the automation workflow pattern I use in production — input
            a scenario and see how the flow branches, logs, and handles errors.
          </p>
          <AutomationSimulator />
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
            className="inline-flex items-center gap-2 text-[12px] font-medium bg-white text-[#0c2463] px-4 py-2 rounded-md hover:bg-[#f8faff] transition-colors"
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

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiAward,
  FiLayers,
  FiServer,
  FiTrendingDown,
  FiDownload,
  FiArrowRight,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiCpu,
  FiZap,
  FiFileText,
  FiActivity,
  FiCalendar,
  FiBriefcase,
  FiExternalLink,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Logo } from "@/components/Logo";
import AutomationSimulator from "@/components/AutomationSimulator";
import { HoverCard } from "@/components/HoverCard";
import { MagneticButton } from "@/components/MagneticButton";
import { ProjectArt, type ArtTheme } from "@/components/ProjectArt";
import { HeroGraphic } from "@/components/HeroGraphic";
import { PullQuote } from "@/components/PullQuote";
import { SectionDivider } from "@/components/SectionDivider";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { FloatingHireButton } from "@/components/FloatingHireButton";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useActiveSection } from "@/hooks/useActiveSection";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { TypewriterText } from "@/components/TypewriterText";
import { TiltCard } from "@/components/TiltCard";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { FiShield, FiClock, FiAlertTriangle, FiDatabase } from "react-icons/fi";
import {
  SiSap,
  SiUipath,
  SiPython,
  SiLine,
  SiGooglecloud,
} from "react-icons/si";
import { MdSmartToy } from "react-icons/md";
import { BluePrismLogo, PowerAutomateLogo, PowerAppsLogo } from "@/components/BrandLogos";

// ── DATA ──────────────────────────────────────────────────────────────
const METRICS = [
  { icon: <FiCalendar />, num: "2+ yrs", desc: "Industry experience", href: "#experience" },
  { icon: <FiTrendingDown />, num: "~83%", desc: "Manual effort cut (Sunrise · verified)", href: "#projects" },
  { icon: <FiLayers />, num: "15+", desc: "Projects delivered", href: "#projects" },
  { icon: <FiAward />, num: "3.53", desc: "GPA · First-Class Honors", href: "/portfolio#about" },
];

const TECH_LOGOS = [
  { label: "SAP S/4HANA", color: "#0080a0", href: "#projects", Icon: SiSap },
  { label: "SAP Build", color: "#0080a0", href: "/portfolio#experience", Icon: SiSap },
  { label: "UiPath", color: "#fa4616", href: "#experience", Icon: SiUipath },
  { label: "Blue Prism", color: "#00aae4", href: "#experience", Icon: BluePrismLogo },
  { label: "Power Automate", color: "#0066ff", href: "#projects", Icon: PowerAutomateLogo },
  { label: "Power Apps", color: "#742774", href: "#projects", Icon: PowerAppsLogo },
  { label: "AI Builder OCR", color: "#742774", href: "#projects", Icon: MdSmartToy },
  { label: "Python", color: "#3776ab", href: "#experience", Icon: SiPython },
  { label: "Google Cloud", color: "#4285f4", href: "#projects", Icon: SiGooglecloud },
  { label: "LINE Bot", color: "#06c755", href: "#projects", Icon: SiLine },
];

const HERO_CHIPS = [
  { label: "Open to Automation Specialist roles", hot: true },
  { label: "SAP S/4HANA" },
  { label: "UiPath · Blue Prism" },
  { label: "Power Automate · Power Apps" },
  { label: "Python" },
  { label: "API · OData" },
];

type Detail = {
  title: string;
  desc: string;
  bullets: string[];
  link?: { label: string; href: string };
};

const FOCUS_DETAILS: Record<string, Detail> = {
  "Automation Specialist": {
    title: "Automation Specialist",
    desc: "I engineer automation systems with explicit SLOs and structured logging — across SAP, RPA, API, and AI. Reliability over features, measurement over assertion, ownership over hand-off.",
    bullets: [
      "5 enterprise SAP S/4HANA automations live at AIS (BG Alert · Payment Advice · OB83 · GR · Mass SO)",
      "16 weeks solo production · 0 silent failures · p95 reply < 1.5s",
      "Logging mandatory in every function · email-alerted error path · MTTR < 5m",
      "First-Class Honors (GPA 3.53) — Computer & Robotics Engineering",
    ],
    link: { label: "Reliability metrics →", href: "#reliability" },
  },
  "SAP · RPA · AI": {
    title: "Cross-stack engineer",
    desc: "Most candidates know one stack. I engineer SAP, RPA, API, and AI together — which is rare in the market and exactly what enterprise transformation needs.",
    bullets: [
      "SAP S/4HANA OB83 enhancement (THOR + SOFR)",
      "UiPath + Blue Prism + Power Automate — all production",
      "Power Automate AI Builder OCR inside finance workflow",
      "Patterns transfer between enterprise and self-built systems",
    ],
    link: { label: "See projects →", href: "#projects" },
  },
};

const CORE_SKILL_DETAILS: Record<string, Detail> = {
  "SAP S/4HANA & BTP": {
    title: "SAP S/4HANA & BTP",
    desc: "Hands-on SAP S/4HANA financial workflows + Business Technology Platform (Build Process Automation, AI Core, Document AI).",
    bullets: [
      "OB83 Market Rate Maintenance — THOR + SOFR support",
      "BG Alert · GR Process · Mass Sales Order automation",
      "SAP Build Process Automation Workshop",
      "Adoption Lab: AI Core + Document AI for IDP",
    ],
    link: { label: "View AIS experience →", href: "/portfolio#experience" },
  },
  "RPA · UiPath / Blue Prism": {
    title: "RPA Production Delivery",
    desc: "Certified in both major RPA platforms. 8+ bots delivered to production across two enterprise environments.",
    bullets: [
      "UiPath RPA Developer Foundation (certified, 2023)",
      "Blue Prism Developer Certification (certified, 2023)",
      "Web Scraping · SAP Data Entry · Inventory Sync at PTT Digital",
      "BG Alert · GR Process · Mass SO · Payment Advice at AIS",
    ],
    link: { label: "View projects →", href: "#projects" },
  },
  "Power Platform & AI Builder": {
    title: "Power Platform",
    desc: "Microsoft Power Platform across Automate, Apps, and AI Builder — including OCR + form processing inside production finance workflows.",
    bullets: [
      "Power Automate (Cloud + Desktop)",
      "Power Apps Canvas — Payment Advice project",
      "Power Fx · Dataverse · Custom Connectors",
      "AI Builder OCR in Payment Advice automation",
    ],
    link: { label: "View Payment Advice case →", href: "/portfolio#projects" },
  },
  "Document AI / OCR / IDP": {
    title: "Document Intelligence",
    desc: "OCR and intelligent document processing across all major platforms — uniquely broad for a Thai-market candidate.",
    bullets: [
      "Power Automate AI Builder (OCR) — production at AIS",
      "SAP Document AI — Adoption Lab hands-on",
      "Azure Document Intelligence · AWS Textract · Google Document AI",
      "Tesseract · pdfplumber · PyMuPDF · ocrmypdf",
    ],
    link: { label: "View OCR skills →", href: "/portfolio#skills" },
  },
  "Financial Process Automation": {
    title: "Financial Process Automation",
    desc: "Direct work on finance-critical SAP processes with audit-grade traceability.",
    bullets: [
      "Market Rate Maintenance (THOR + SOFR) — IBOR-replacement compliant",
      "Bank Guarantee monitoring with classified alerts",
      "Payment Advice generation + automated distribution",
      "Designed for finance audit trail and compliance",
    ],
    link: { label: "View SAP projects →", href: "#projects" },
  },
};

const CERT_DETAILS: Record<string, Detail> = {
  "UiPath RPA Developer": {
    title: "UiPath RPA Developer Foundation",
    desc: "UiPath Academy — 2023.",
    bullets: ["Process Automation", "Studio Development", "Orchestrator"],
    link: { label: "All certifications →", href: "/portfolio#certifications" },
  },
  "Blue Prism Developer": {
    title: "Blue Prism Developer Certification",
    desc: "Blue Prism University — 2023.",
    bullets: ["Process Studio", "Object Studio", "Control Room"],
    link: { label: "All certifications →", href: "/portfolio#certifications" },
  },
  "Python for Automation": {
    title: "Python for Automation & Data Science",
    desc: "Coursera — 2022.",
    bullets: ["Pandas", "NumPy", "Automation Scripts"],
    link: { label: "All certifications →", href: "/portfolio#certifications" },
  },
};

const SIDE_SKILLS = [
  { icon: <FiServer />, label: "SAP S/4HANA & BTP", tag: "Hands-on" },
  { icon: <FiCpu />, label: "RPA · UiPath / Blue Prism", tag: "Production" },
  { icon: <FiZap />, label: "Power Platform & AI Builder" },
  { icon: <FiFileText />, label: "Document AI / OCR / IDP" },
  { icon: <FiActivity />, label: "Financial Process Automation" },
];

const SIDE_CERTS = ["UiPath RPA Developer", "Blue Prism Developer", "Python for Automation"];

type ProjectLink = { kind: "github" | "demo" | "case"; href: string; label: string };

const PROJECTS: {
  accent: string;
  badges: string[];
  name: string;
  desc: string;
  image: string;
  art: ArtTheme;
  stats: { v: string; l: string }[];
  links?: ProjectLink[];
}[] = [
  {
    accent: "bg-blue-600",
    badges: ["Featured", "Self-built · Production"],
    name: "Sunrise LINE Bots Suite",
    desc: "Hypothesis: cafe ops can run on a single async webhook if reply latency stays sub-2s and dedup is reliable. Measured over 16 weeks production: ↓83% manual effort, p95 <1.5s, zero silent failures. Reply-200-First + idempotent cache + async defer queue. Patterns reused in enterprise UiPath at AIS.",
    image: "/project-sunrise.jpg",
    art: "bot",
    stats: [
      { v: "↓83%", l: "Manual effort" },
      { v: "0", l: "Silent failures" },
      { v: "<1.5s", l: "P95 response" },
    ],
    links: [{ kind: "case", href: "/portfolio#projects", label: "Case study" }],
  },
  {
    accent: "bg-blue-500",
    badges: ["Featured", "SAP S/4HANA"],
    name: "BG Alert Automation",
    desc: "Automated Bank Guarantee expiration monitoring in SAP — extracts from Web GUI, classifies by 30d / 7d / expired, distributes targeted email alerts. Replaces manual compliance review.",
    image: "/project-bg-alert.jpg",
    art: "sap-monitor",
    stats: [
      { v: "Daily", l: "Coverage" },
      { v: "Eliminated", l: "Manual monitor" },
      { v: "Full", l: "Audit trail" },
    ],
    links: [{ kind: "case", href: "/portfolio#projects", label: "Case study" }],
  },
  {
    accent: "bg-amber-500",
    badges: ["Document AI", "Power Platform"],
    name: "Payment Advice Automation",
    desc: "Power Automate Cloud Flow with AI Builder OCR — extracts payment data, validates against SAP, auto-generates and distributes payment advice. Intelligent document processing in a finance workflow.",
    image: "/project-payment-advice.jpg",
    art: "document-ocr",
    stats: [
      { v: "AI Builder", l: "OCR engine" },
      { v: "Reduced", l: "Manual entry" },
      { v: "Auto", l: "Distributed" },
    ],
    links: [{ kind: "case", href: "/portfolio#projects", label: "Case study" }],
  },
  {
    accent: "bg-purple-600",
    badges: ["PTT Digital", "AI · Code Quality"],
    name: "AI Code Assistant for QA (PTT Digital)",
    desc: "Hypothesis: an AI code review assistant can offload routine QA checks (lint, vulnerability scan, convention review) from senior reviewers and cut review cycle time. Measured at PTT Digital: +75% QA productivity, 5-20% release-cycle cost reduction. Presented live at PTT Digital YOU&AI Forward Together AI showcase.",
    image: "/project-ai-code-qa.jpg",
    art: "pipeline",
    stats: [
      { v: "+75%", l: "QA productivity" },
      { v: "5-20%", l: "Cost / release" },
      { v: "Live", l: "PTT AI showcase" },
    ],
    links: [{ kind: "case", href: "/portfolio#projects", label: "Case study" }],
  },
  {
    accent: "bg-emerald-500",
    badges: ["SAP OB83", "Financial ERP"],
    name: "Market Rate Maintenance (THOR & SOFR)",
    desc: "Enhanced SAP S/4HANA transaction OB83 to support THOR + SOFR reference rates — redesigned classification to use Reference fields instead of date-based logic. Cleaner, extensible rate management.",
    image: "/project-thor-sofr.jpg",
    art: "finance-rate",
    stats: [
      { v: "THOR+SOFR", l: "Rate types" },
      { v: "Reference", l: "Classification" },
      { v: "Improved", l: "Maintainability" },
    ],
    links: [{ kind: "case", href: "/portfolio#projects", label: "Case study" }],
  },
];

const AUTOMATIONS: {
  title: string;
  tag: string;
  challenge: string;
  solution: string;
  flow: string[];
  results: { v: string; l: string }[];
  href: string;
}[] = [
  {
    title: "BG Alert Automation (SAP)",
    tag: "UiPath · SAP Web GUI · Outlook",
    challenge: "Manual periodic review of Bank Guarantees across SAP — slow to react, error-prone, no audit trail.",
    solution: "UiPath bot extracts BG records, classifies by expiry window, distributes targeted email alerts.",
    flow: ["SAP Web GUI Extract", "Classify 30d / 7d / expired", "Group + Report", "Outlook Distribution"],
    results: [
      { v: "Manual review", l: "Eliminated" },
      { v: "Full audit", l: "Email-traceable" },
    ],
    href: "/portfolio#projects",
  },
  {
    title: "Payment Advice with OCR",
    tag: "Power Automate · AI Builder · SAP",
    challenge: "Payment advice manually keyed and emailed — error-prone, slow, no audit trail.",
    solution: "Power Automate flow uses AI Builder OCR to extract payment fields, validates against SAP master data, auto-distributes advice.",
    flow: ["Inbox Trigger", "AI Builder OCR", "SAP Validation", "Outlook + Excel Log"],
    results: [
      { v: "Manual entry", l: "Reduced" },
      { v: "Auto-distributed", l: "Per beneficiary" },
    ],
    href: "/portfolio#projects",
  },
  {
    title: "Sunrise LINE Bots Suite",
    tag: "Google Apps Script · LINE API · Sheets",
    challenge: "Daily bookkeeping + stock entry took ~30 min/day with frequent missed records.",
    solution: "2-bot LINE OA suite with Reply-200-First webhook, idempotent dedup, defer queue for slip OCR.",
    flow: ["LINE Webhook (Reply-200-First)", "Idempotent Cache", "Defer Queue (OCR)", "Sheets State DB"],
    results: [
      { v: "↓83%", l: "Manual effort" },
      { v: "0 failures", l: "16+ weeks production" },
    ],
    href: "/portfolio#projects",
  },
  {
    title: "AI Code Assistant for QA",
    tag: "AI · LLM · PTT Digital",
    challenge: "Senior reviewers spent hours per release on routine QA checks (lint, vulnerability scan, convention review).",
    solution: "AI code assistant that pre-screens PRs against QA rule-set and flags anomalies before human review. Presented at PTT Digital YOU&AI Forward Together AI showcase.",
    flow: ["PR Diff Extract", "AI Rule Check", "Vulnerability Scan", "Review Summary"],
    results: [
      { v: "+75%", l: "QA productivity" },
      { v: "5-20%", l: "Cost / release" },
    ],
    href: "/portfolio#projects",
  },
  {
    title: "Multi-Source Inventory Sync",
    tag: "Blue Prism · Python · REST API",
    challenge: "Manual stock updates and oversell incidents across E-Commerce channels.",
    solution: "Scheduled, idempotent sync with HMAC signature auth, retry + DLQ pattern.",
    flow: ["DB Source-of-Truth", "Signature Gen (HMAC)", "API POST + Retry", "Error Log + Alert"],
    results: [
      { v: "Real-time", l: "Sync window" },
      { v: "Zero", l: "Oversell incidents" },
    ],
    href: "/portfolio#projects",
  },
];


const SKILL_GROUPS = [
  {
    name: "Enterprise & SAP",
    tags: [
      { t: "SAP S/4HANA", hi: true },
      { t: "SAP Build Process Automation", hi: true },
      { t: "SAP BTP" },
      { t: "SAP Document AI" },
      { t: "ERP Development" },
    ],
  },
  {
    name: "Automation & Scheduling",
    tags: [
      { t: "UiPath", hi: true },
      { t: "Blue Prism", hi: true },
      { t: "Power Automate", hi: true },
      { t: "Power Apps", hi: true },
      { t: "CronJob" },
      { t: "Python Scheduling" },
      { t: "Process Optimization" },
    ],
  },
  {
    name: "Reliability & Observability",
    tags: [
      { t: "Structured logging", hi: true },
      { t: "Error path / DLQ" },
      { t: "Idempotency" },
      { t: "Retry + backoff" },
      { t: "MTTR ownership" },
      { t: "SLO thinking" },
      { t: "Solo on-call" },
    ],
  },
  {
    name: "AI & Document Intelligence",
    tags: [
      { t: "AI Builder OCR", hi: true },
      { t: "Tesseract OCR" },
      { t: "EasyOCR" },
      { t: "Intelligent Document Processing" },
      { t: "Computer Vision (YOLOv5)" },
    ],
  },
  {
    name: "Programming & Data",
    tags: [
      { t: "Python", hi: true },
      { t: "SQL" },
      { t: "Pandas / FastAPI" },
      { t: "PostgreSQL" },
      { t: "REST API" },
      { t: "JavaScript" },
    ],
  },
];

const SKILL_BARS = [
  { label: "SAP S/4HANA / ERP", pct: 88, color: "#0080a0" },
  { label: "UiPath / Blue Prism / RPA", pct: 85, color: "#fa4616" },
  { label: "Power Automate (Cloud + Desktop)", pct: 82, color: "#0066ff" },
  { label: "Python (Pandas, FastAPI, asyncio)", pct: 78, color: "#3776ab" },
  { label: "LINE Messaging API / GAS", pct: 80, color: "#06c755" },
  { label: "AI Builder / Document AI / OCR", pct: 72, color: "#742774" },
  { label: "SAP BTP / SAP Build Process Automation", pct: 70, color: "#0080a0" },
];

const TIMELINE = [
  {
    period: "Sep 2025 – Present",
    role: "ERP Developer & Automation Engineer",
    company: "AIS (Advanced Info Service)",
    active: true,
    color: "#1a56db",
    highlights: ["5 enterprise SAP automations", "AI Builder OCR pipeline", "UiPath + Power Automate"],
  },
  {
    period: "2025 – Present",
    role: "Founder & Solo Builder",
    company: "Sunrise LINE Bots Suite",
    active: true,
    color: "#06c755",
    highlights: ["↓83% manual effort", "0 silent failures over 16+ wks", "Reply-200-First webhook"],
  },
  {
    period: "Jan – Aug 2025",
    role: "Software Engineer",
    company: "PTT Digital Solutions",
    color: "#0080a0",
    highlights: [
      "AI Code Assistant for QA · +75% productivity · 5-20% cost/release",
      "Presented at PTT Digital YOU&AI Forward Together",
      "YOLOv5 traffic detection 92.5%",
      "API integration & data pipeline",
    ],
  },
  {
    period: "Aug – Dec 2024",
    role: "RPA Developer",
    company: "PTT Digital Solutions",
    color: "#fa4616",
    highlights: ["Blue Prism E-Commerce & ERP", "TikTok Shop API + HMAC auth"],
  },
  {
    period: "Jun – Jul 2023",
    role: "R&D Engineer Intern",
    company: "Ultimate Technology",
    color: "#6b7280",
    highlights: ["Elephant detection AI + 5G Smart Pole"],
  },
  {
    period: "2020 – 2024",
    role: "B.Eng. Computer & Robotics Engineering",
    company: "Bangkok University",
    edu: true,
    color: "#f59e0b",
    highlights: ["First-Class Honors · GPA 3.53", "Smart Pill Dispenser (senior project)"],
  },
];

const NAV_TABS = [
  { label: "About", href: "#about" },
  { label: "Reliability", href: "#reliability" },
  { label: "Projects", href: "#projects" },
  { label: "Automation", href: "#automation" },
  { label: "Try It", href: "#simulator" },
  { label: "Experience", href: "#experience" },
];

// ── COMPONENT ─────────────────────────────────────────────────────────
export default function DashboardPortfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    if (!photoOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setPhotoOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [photoOpen]);
  const sectionIds = React.useMemo(
    () => NAV_TABS.map((t) => t.href.replace("#", "")),
    []
  );
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e] text-[#111827] dark:text-[#f1f5f9]">
      <ScrollProgressBar />
      <FloatingHireButton />
      {/* NAV */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-7 h-[52px] border-b border-[#e5e7eb] dark:border-[#1e293b] bg-white/95 dark:bg-[#0a0f1e]/95 backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <Link href="/" className="text-[20px] leading-none shrink-0">
            <Logo variant="compact" theme="light" />
          </Link>
          <div className="hidden lg:flex">
            {NAV_TABS.map((t) => {
              const isActive = activeSection === t.href.replace("#", "");
              return (
                <a
                  key={t.label}
                  href={t.href}
                  className={`px-3 h-[52px] flex items-center text-[12px] border-b-2 transition-colors ${
                    isActive
                      ? "text-[#1a56db] dark:text-[#60a5fa] border-[#1a56db] dark:border-[#60a5fa]"
                      : "text-[#6b7280] dark:text-[#94a3b8] border-transparent hover:text-[#111827] dark:hover:text-[#f1f5f9] hover:border-[#1a56db]/60"
                  }`}
                >
                  {t.label}
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-[12px] px-3.5 py-1.5 rounded-md border border-[#e5e7eb] dark:border-[#334155] text-[#111827] dark:text-[#e2e8f0] hover:bg-[#f8faff] dark:hover:bg-[#1e293b] transition-colors"
          >
            Resume
          </a>
          <DarkModeToggle />
          <MagneticButton
            as="a"
            href="#contact"
            strength={0.35}
            className="inline-flex text-[12px] px-3 sm:px-3.5 py-1.5 rounded-md bg-[#1a56db] hover:bg-[#1e40af] text-white font-medium transition-colors"
          >
            Hire&nbsp;Me
          </MagneticButton>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#e5e7eb] dark:border-[#334155] text-[#111827] dark:text-[#e2e8f0] hover:bg-[#f8faff] dark:hover:bg-[#1e293b]"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#111827]/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-[280px] max-w-[85%] bg-white dark:bg-[#0f172a] border-l border-[#e5e7eb] dark:border-[#1e293b] shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 h-[52px] border-b border-[#e5e7eb] dark:border-[#1e293b]">
              <Logo variant="compact" theme="light" />
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-[#111827] dark:text-[#e2e8f0] hover:bg-[#f8faff] dark:hover:bg-[#1e293b]"
                aria-label="Close menu"
              >
                <FiX />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3">
              {NAV_TABS.map((t) => (
                <a
                  key={t.label}
                  href={t.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-5 py-2.5 text-[13px] text-[#374151] dark:text-[#cbd5e1] hover:bg-[#f8faff] dark:hover:bg-[#1e293b] hover:text-[#1a56db]"
                >
                  {t.label}
                </a>
              ))}
              <Link
                href="/portfolio"
                onClick={() => setMobileOpen(false)}
                className="block px-5 py-2.5 text-[13px] text-[#1a56db] dark:text-[#60a5fa] hover:bg-[#f8faff] dark:hover:bg-[#1e293b]"
              >
                Full portfolio →
              </Link>
            </nav>
            <div className="border-t border-[#e5e7eb] p-4 space-y-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[12px] px-3 py-2 rounded-md border border-[#e5e7eb] dark:border-[#334155] text-[#111827] dark:text-[#e2e8f0] hover:bg-[#f8faff] dark:hover:bg-[#1e293b]"
              >
                Download Resume
              </a>
              <a
                href="https://www.linkedin.com/in/laykanokporn"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[12px] px-3 py-2 rounded-md bg-[#1a56db] text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="about" className="relative border-b border-[#e5e7eb] dark:border-[#1e293b] bg-[#f8faff] dark:bg-[#0a0f1e] overflow-hidden">
        {/* Decorative grid background */}
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        {/* Gradient orbs — depth without distraction */}
        <div className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full pointer-events-none orb-breathe"
          style={{ background: "radial-gradient(circle at center, rgba(26,86,219,0.10) 0%, transparent 70%)" }} />
        <div className="absolute -left-24 bottom-0 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />
        <div className="absolute left-1/2 top-1/3 w-[280px] h-[280px] -translate-x-1/2 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(6,199,85,0.05) 0%, transparent 70%)" }} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative max-w-6xl mx-auto px-4 sm:px-7 py-8 sm:py-10 grid lg:grid-cols-[1fr_380px] gap-6 items-start"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#6b7280] dark:text-[#94a3b8] bg-white dark:bg-[#0f172a] border border-[#e5e7eb] dark:border-[#334155] px-2.5 py-1 rounded mb-4">
              <FiMapPin className="text-sm" />
              Bangkok, Thailand · Available globally
            </div>
            <h1 className="text-[28px] sm:text-[32px] tracking-tight leading-tight mb-1.5 text-[#111827] dark:text-[#f1f5f9]">
              Kanokporn Hudsree{" "}
              <span className="text-[#6b7280] dark:text-[#94a3b8] font-normal text-[20px] sm:text-[22px]">(Lay)</span>
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#1a56db] dark:text-[#60a5fa] font-medium mb-4 min-h-[24px]">
              <TypewriterText
                strings={[
                  "Automation Specialist · SAP · RPA · API",
                  "Reliable, observable, measured.",
                  "16 weeks production · 0 silent failures",
                  "p95 < 1.5s · MTTR < 5m · 100% logged",
                  "Cross-stack: SAP, UiPath, Blue Prism, Power Platform",
                ]}
                typingSpeed={50}
                deletingSpeed={25}
                pauseMs={2200}
              />
            </p>
            <p className="text-[13px] sm:text-[14px] text-[#374151] dark:text-[#cbd5e1] max-w-2xl leading-relaxed mb-5">
              I engineer automation systems that eliminate manual toil — measured, observable, and
              boring to operate. Production SAP S/4HANA finance workflows (BG Alert, Payment Advice
              with AI Builder OCR, OB83 / THOR / SOFR) at AIS, plus a self-built LINE Bot suite that
              ran 16 weeks with zero silent failures and p95 reply &lt; 1.5s. Comfortable owning the
              system end-to-end: design, ship, monitor, on-call.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {HERO_CHIPS.map((c) => (
                <span
                  key={c.label}
                  className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded border ${
                    c.hot
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
                      : "bg-white dark:bg-[#1e293b] border-[#e5e7eb] dark:border-[#334155] text-[#374151] dark:text-[#cbd5e1]"
                  }`}
                >
                  {c.hot && (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  )}
                  {c.label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <MagneticButton
                as="a"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                strength={0.3}
                className="inline-flex items-center text-[12px] font-medium bg-[#1a56db] hover:bg-[#1e40af] text-white px-4 py-2 rounded-md transition-colors"
              >
                <FiDownload /> Download Resume
              </MagneticButton>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-[12px] bg-white dark:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#334155] text-[#111827] dark:text-[#f1f5f9] px-4 py-2 rounded-md hover:bg-[#f8faff] dark:hover:bg-[#334155] transition-colors"
              >
                View Projects <FiArrowRight />
              </a>
            </div>
            {/* Contact shortcuts — feature #7 */}
            <div className="flex items-center gap-4">
              <a
                href="mailto:laybabaka@gmail.com"
                className="inline-flex items-center gap-1.5 text-[11.5px] text-[#6b7280] dark:text-[#94a3b8] hover:text-[#1a56db] dark:hover:text-[#3b82f6] transition-colors"
              >
                <FiMail size={13} /> laybabaka@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/laykanokporn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11.5px] text-[#6b7280] dark:text-[#94a3b8] hover:text-[#1a56db] dark:hover:text-[#3b82f6] transition-colors"
              >
                <FiLinkedin size={13} /> LinkedIn
              </a>
              <a
                href="https://github.com/LayKanokporn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11.5px] text-[#6b7280] dark:text-[#94a3b8] hover:text-[#1a56db] dark:hover:text-[#3b82f6] transition-colors"
              >
                <FiGithub size={13} /> GitHub
              </a>
            </div>
          </div>

          {/* Right column: graphic + photo chip */}
          <div className="w-full max-w-md justify-self-start lg:justify-self-end space-y-3">
            <HeroGraphic className="w-full h-auto" />
            <div className="flex items-center gap-3.5 px-3.5 py-3 rounded-md border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a]">
              <button
                onClick={() => setPhotoOpen(true)}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#e5e7eb] dark:border-[#334155] bg-[#e0e7ff] dark:bg-[#1e3a5f] shrink-0 flex items-center justify-center ring-2 ring-[#1a56db]/10 hover:ring-[#1a56db]/40 transition-all cursor-zoom-in"
                aria-label="View full profile photo"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt="Kanokporn Hudsree (Lay)"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const initials = document.createElement("span");
                      initials.textContent = "KL";
                      initials.className = "text-[16px] font-medium text-[#1a56db] dark:text-[#60a5fa]";
                      parent.appendChild(initials);
                    }
                  }}
                />
              </button>
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-[#111827] dark:text-[#f1f5f9] truncate">Kanokporn Hudsree (Lay)</div>
                <div className="text-[11px] text-[#6b7280] dark:text-[#94a3b8] truncate">
                  ERP Developer @ AIS · Founder @ Sunrise
                </div>
                <div className="text-[10.5px] text-[#1a56db] dark:text-[#60a5fa] mt-0.5">
                  Open to Automation Specialist roles
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* METRIC TILES — bigger, clickable */}
      <section className="relative border-b border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0a0f1e] overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-7 py-7 sm:py-9 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {METRICS.map((m, i) => (
            <TiltCard key={m.desc} strength={8}>
            <motion.a
              href={m.href}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-xl border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-4 sm:p-5 hover:border-[#1a56db]/40 hover:shadow-md transition-all block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#e0e7ff] text-[#1a56db] flex items-center justify-center text-base shrink-0">
                  {m.icon}
                </div>
                <FiArrowRight className="text-[#9ca3af] group-hover:text-[#1a56db] group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-[22px] sm:text-[26px] font-medium leading-none tracking-tight text-[#111827] dark:text-[#f1f5f9] tabular-nums">
                <AnimatedCounter value={m.num} />
              </div>
              <div className="text-[11px] sm:text-[12px] text-[#6b7280] dark:text-[#94a3b8] mt-2 leading-relaxed">
                {m.desc}
              </div>
            </motion.a>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* TECH STRIP — visual brand chips, all clickable */}
      <section className="relative border-b border-[#e5e7eb] dark:border-[#1e293b] bg-[#f8faff] dark:bg-[#060c18] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-7 py-5 sm:py-6">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider text-[#6b7280] dark:text-[#64748b]">
              Stack in production
            </span>
            <span className="h-px flex-1 bg-[#e5e7eb] dark:bg-[#1e293b] min-w-[24px]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {TECH_LOGOS.map((t) => (
              <a
                key={t.label}
                href={t.href}
                className="group flex items-center gap-2 text-[11.5px] px-3 py-2 rounded-md bg-white dark:bg-[#0f172a] border border-[#e5e7eb] dark:border-[#1e293b] hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40 hover:shadow-sm transition-all min-w-0"
              >
                <span className="w-4 h-4 inline-flex items-center justify-center shrink-0" style={{ color: t.color }}>
                  <t.Icon className="w-full h-full" />
                </span>
                <span className="text-[#111827] dark:text-[#e2e8f0] truncate">{t.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RELIABILITY & SCALE — Agoda-style metrics */}
      <section id="reliability" className="relative bg-white dark:bg-[#0a0f1e] border-b border-[#e5e7eb] dark:border-[#1e293b] overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-7 py-10 sm:py-12">
          <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#1a56db] dark:text-[#60a5fa] mb-1.5">Production reliability</div>
              <h2 className="text-[20px] sm:text-[22px] font-medium tracking-tight text-[#111827] dark:text-[#f1f5f9]">
                Measured, not asserted.
              </h2>
              <p className="text-[12.5px] text-[#6b7280] dark:text-[#94a3b8] mt-1 max-w-2xl">
                Every system I ship gets explicit SLOs, structured logging, and an error path the finance team can act on. Numbers below come from production AP automation at AIS — not demos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
            {[
              { icon: <FiShield />, num: "0", label: "Manual keying errors", sub: "Production AP automation since deploy", tone: "#059669" },
              { icon: <FiClock />, num: "≥85%", label: "OCR confidence gate", sub: "Below threshold → finance review", tone: "#1a56db" },
              { icon: <FiAlertTriangle />, num: "SOX", label: "Audit-grade trail", sub: "Excel log + Outlook trail per advice", tone: "#d97706" },
              { icon: <FiDatabase />, num: "100%", label: "Logging coverage", sub: "INFO · WARN · ERROR in every flow step", tone: "#9333ea" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-4"
              >
                <div className="w-8 h-8 rounded-md flex items-center justify-center text-[13px] mb-2.5" style={{ backgroundColor: `${m.tone}15`, color: m.tone }}>
                  {m.icon}
                </div>
                <div className="text-[20px] sm:text-[22px] font-medium leading-none tracking-tight text-[#111827] dark:text-[#f1f5f9] tabular-nums">
                  {m.num}
                </div>
                <div className="text-[11.5px] font-medium text-[#374151] dark:text-[#cbd5e1] mt-1.5">
                  {m.label}
                </div>
                <div className="text-[10.5px] text-[#6b7280] dark:text-[#64748b] mt-0.5 leading-snug">
                  {m.sub}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Architecture diagram */}
          <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#6b7280] dark:text-[#64748b]">System design · case study</div>
                <div className="text-[14px] font-medium text-[#111827] dark:text-[#f1f5f9] mt-0.5">Payment Advice with AI Builder OCR — AIS Finance AP automation</div>
              </div>
              <div className="text-[10.5px] text-[#6b7280] dark:text-[#94a3b8]">4 lanes · 9 components · finance-owned error path</div>
            </div>
            {/* Toggle: real Power Automate editor screenshot vs logical SVG view */}
            <div className="relative w-full">
              <ArchitectureDiagram className="w-full h-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/architecture-payment-advice.jpg"
                alt="Power Automate Cloud Flow editor showing Payment Advice automation"
                className="absolute inset-0 w-full h-full object-contain bg-white dark:bg-[#0f172a] rounded-md"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-[10.5px]">
              <div>
                <div className="text-[#6b7280] dark:text-[#64748b] uppercase tracking-wider text-[9px] mb-0.5">Hypothesis</div>
                <div className="text-[#374151] dark:text-[#cbd5e1] leading-snug">AI OCR can replace manual keying for AP advices if a confidence gate + SAP master-data check stop bad data before send.</div>
              </div>
              <div>
                <div className="text-[#6b7280] dark:text-[#64748b] uppercase tracking-wider text-[9px] mb-0.5">Metric</div>
                <div className="text-[#374151] dark:text-[#cbd5e1] leading-snug">OCR confidence ≥85% · SAP vendor match rate · advices auto-distributed vs queued.</div>
              </div>
              <div>
                <div className="text-[#6b7280] dark:text-[#64748b] uppercase tracking-wider text-[9px] mb-0.5">Result</div>
                <div className="text-[#374151] dark:text-[#cbd5e1] leading-snug">Manual entry eliminated · per-beneficiary auto-distribution · SOX-grade Excel + email audit.</div>
              </div>
              <div>
                <div className="text-[#6b7280] dark:text-[#64748b] uppercase tracking-wider text-[9px] mb-0.5">Iteration</div>
                <div className="text-[#374151] dark:text-[#cbd5e1] leading-snug">Added SAP tolerance check after OCR caught vendor name but missed cents — false positives went to finance review.</div>
              </div>
            </div>
          </div>

          {/* Engineering principles */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Reply-200-First",
              "Idempotent by default",
              "Async over sync",
              "Logging is mandatory",
              "Graceful degrade",
              "Error → email → MTTR",
              "Measure before scale",
            ].map((p) => (
              <span key={p} className="text-[10.5px] px-2.5 py-1 rounded-md bg-[#f8faff] dark:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#334155] text-[#374151] dark:text-[#cbd5e1]">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE — editorial pause */}
      <section className="relative bg-white dark:bg-[#0a0f1e] py-12 sm:py-16 border-b border-[#e5e7eb] dark:border-[#1e293b] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-7">
          <PullQuote attribution="Personal engineering principle">
            I&apos;m not here to write bots. I&apos;m here to engineer SAP, RPA, API, and AI
            into business processes that actually{" "}
            <span className="serif-accent text-[#1a56db]">move&nbsp;the&nbsp;numbers</span>
            &nbsp;— with production-grade logging, error handling, and measurable outcomes.
          </PullQuote>
        </div>
      </section>

      <SectionDivider variant="wave" className="-mt-px" />

      {/* MAIN: SIDEBAR + CONTENT */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[210px_1fr]">
        {/* SIDEBAR */}
        <aside className="hidden lg:block p-5 border-r border-[#e5e7eb] bg-white">
          <SidebarGroup label="Focus">
            <SidePopover detail={FOCUS_DETAILS["Automation Specialist"]}>
              <SideRow icon={<FiServer />} label="Automation Specialist" active />
            </SidePopover>
            <SidePopover detail={FOCUS_DETAILS["SAP · RPA · AI"]}>
              <SideRow icon={<FiCpu />} label="SAP · RPA · AI" />
            </SidePopover>
          </SidebarGroup>

          <SidebarGroup label="Core skills">
            {SIDE_SKILLS.map((s) => (
              <SidePopover key={s.label} detail={CORE_SKILL_DETAILS[s.label]}>
                <SideRow icon={s.icon} label={s.label} badge={s.tag} />
              </SidePopover>
            ))}
          </SidebarGroup>

          <SidebarGroup label="Certifications">
            {SIDE_CERTS.map((c) => (
              <SidePopover key={c} detail={CERT_DETAILS[c]}>
                <SideRow icon={<FiAward />} label={c} />
              </SidePopover>
            ))}
          </SidebarGroup>

          <SidebarGroup label="Connect">
            <SideRow icon={<FiMail />} label="Email" href="mailto:laybabaka@gmail.com" />
            <SideRow
              icon={<FiLinkedin />}
              label="LinkedIn"
              href="https://www.linkedin.com/in/laykanokporn"
            />
            <SideRow icon={<FiGithub />} label="GitHub" href="https://github.com/LayKanokporn" />
          </SidebarGroup>

          <p className="mt-6 text-[10px] text-[#9ca3af] leading-relaxed">
            Tip: hover (or tap) each item for details.
          </p>
        </aside>

        {/* CONTENT */}
        <div className="p-5 sm:p-7 bg-[#f8faff] dark:bg-[#060c18]">
          {/* ABOUT — proof-based */}
          <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-5 mb-8">
            <SecTitle title="About" />
            <p className="text-[13px] text-[#374151] dark:text-[#cbd5e1] leading-relaxed mb-2">
              ERP Developer &amp; Automation Engineer building production-grade SAP, RPA, and
              AI-powered automation at AIS. Currently shipping 5 SAP S/4HANA automations
              (financial &amp; procurement) and operating a self-built LINE Bot production system
              that cut daily bookkeeping by ~83% over 16 weeks with zero silent failures.
            </p>
            <p className="text-[13px] text-[#6b7280] dark:text-[#94a3b8] leading-relaxed">
              Computer &amp; Robotics Engineering · First-Class Honors (GPA 3.53) · Bangkok
              University · 2+ years industry experience.
            </p>

            {/* Presented at — proof banner with real event photo (full portrait) */}
            <a
              href="#projects"
              className="mt-5 block group relative rounded-md overflow-hidden border border-[#e5e7eb] dark:border-[#1e293b] hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40 transition-all bg-gradient-to-br from-[#0c2463] to-[#1a5fb4]"
            >
              <div className="grid sm:grid-cols-[2fr_3fr]">
                <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[420px] bg-gradient-to-br from-[#0c2463] to-[#1a5fb4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/event-you-ai-forward.jpg"
                    alt="Lay presenting AI Code Assistant for QA at PTT Digital YOU&AI Forward Together AI showcase"
                    className="absolute inset-0 w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider px-2 py-1 rounded bg-black/40 backdrop-blur-sm text-white border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Live presentation
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-white flex flex-col justify-center gap-2">
                  <div className="text-[10px] uppercase tracking-wider opacity-70">PTT Digital · AI showcase</div>
                  <div className="text-[14px] sm:text-[16px] font-medium leading-snug">
                    Presented at YOU&amp;AI Forward Together
                  </div>
                  <div className="text-[10px] sm:text-[11px] opacity-85 mt-0.5">
                    PTT Digital · YOU&AI Forward Together · AI Code Assistant for QA (+75% productivity)
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* PROJECTS */}
          <SecTitle id="projects" title="Featured projects">
            <Link href="/portfolio" className="text-[11px] text-[#1a56db] hover:underline">
              View full portfolio →
            </Link>
          </SecTitle>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] overflow-hidden hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40 hover:shadow-md transition-all group relative"
              >
                {/* Whole-card click target — goes to portfolio detail */}
                <Link
                  href="/portfolio#projects"
                  aria-label={`View ${p.name} details`}
                  className="absolute inset-0 z-10"
                />
                <div className={`h-1 ${p.accent}`} />

                {/* Visual: real screenshot if available, else SVG art fallback */}
                <div className={`relative w-full bg-[#f8faff] dark:bg-[#0a0f1e] border-b border-[#e5e7eb] dark:border-[#1e293b] overflow-hidden ${p.art === "pipeline" ? "h-56" : "h-40"}`}>
                  <ProjectArt theme={p.art} ariaLabel={p.name} />
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      className={`absolute inset-0 w-full h-full ${p.art === "pipeline" ? "object-contain bg-[#0c2463]" : "object-cover"}`}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {p.badges.map((b) => (
                      <span
                        key={b}
                        className={`text-[10px] px-2 py-0.5 rounded border ${
                          b === "Featured"
                            ? "bg-[#e0e7ff] text-[#1a56db] border-[#c7d2fe]"
                            : "bg-[#f8faff] text-[#6b7280] border-[#e5e7eb]"
                        }`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-[14px] font-medium mb-2 leading-snug text-[#111827] dark:text-[#f1f5f9]">
                    {p.name}
                  </h3>

                  <p className="text-[12px] text-[#6b7280] dark:text-[#94a3b8] leading-relaxed mb-3">{p.desc}</p>
                  <div className="flex gap-4 border-t border-[#e5e7eb] dark:border-[#1e293b] pt-2.5 items-end justify-between">
                    <div className="flex gap-4">
                      {p.stats.map((s) => (
                        <div key={s.l}>
                          <div className="text-[13px] font-medium text-[#1a56db] leading-none">
                            {s.v}
                          </div>
                          <div className="text-[10px] text-[#6b7280] dark:text-[#64748b] mt-1">{s.l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 shrink-0 relative z-20">
                      {p.links?.filter(lk => lk.kind === "github").map((lk) => (
                        <a
                          key={lk.kind}
                          href={lk.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-[#1a56db] hover:underline"
                        >
                          <FiGithub /> {lk.label}
                        </a>
                      ))}
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#1a56db] group-hover:translate-x-0.5 transition-transform">
                        View details <FiArrowRight />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AUTOMATION PORTFOLIO — Challenge → Solution → Flow → Results */}
          <SecTitle id="automation" title="Automation portfolio (overview)" />
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {AUTOMATIONS.map((a, i) => (
              <motion.a
                key={a.title}
                href={a.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group block rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-4 hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="text-[13px] font-medium text-[#111827] dark:text-[#f1f5f9] mb-0.5 inline-flex items-center gap-1.5">
                      {a.title}
                      <FiArrowRight className="opacity-0 group-hover:opacity-100 text-[#1a56db] transition-opacity" />
                    </div>
                    <div className="text-[10px] text-[#6b7280] dark:text-[#64748b]">{a.tag}</div>
                  </div>
                  <FiBriefcase className="text-[#1a56db] shrink-0 mt-0.5" />
                </div>
                <div className="space-y-1.5 text-[12px] mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wide text-[#6b7280] dark:text-[#64748b] mr-2">
                      Challenge
                    </span>
                    <span className="text-[#374151] dark:text-[#cbd5e1]">{a.challenge}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wide text-[#6b7280] dark:text-[#64748b] mr-2">
                      Solution
                    </span>
                    <span className="text-[#374151] dark:text-[#cbd5e1]">{a.solution}</span>
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-wide text-[#6b7280] dark:text-[#64748b] mb-1.5">
                  Process flow
                </div>
                <div className="flex flex-wrap items-center gap-1 mb-3">
                  {a.flow.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="text-[10px] px-2 py-1 bg-[#f8faff] dark:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#334155] rounded text-[#374151] dark:text-[#cbd5e1]">
                        {step}
                      </span>
                      {idx < a.flow.length - 1 && (
                        <span className="text-[#1a56db] text-xs">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex gap-4 border-t border-[#e5e7eb] dark:border-[#1e293b] pt-2.5">
                  {a.results.map((r) => (
                    <div key={r.l}>
                      <div className="text-[13px] font-medium text-[#1a56db] dark:text-[#60a5fa] leading-none">
                        {r.v}
                      </div>
                      <div className="text-[10px] text-[#6b7280] dark:text-[#64748b] mt-1">{r.l}</div>
                    </div>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>

          {/* SIMULATOR */}
          <SecTitle id="simulator" title="Try it live">
            <span className="text-[10px] text-[#6b7280]">Interactive · ~ 5s per run</span>
          </SecTitle>
          <div className="mb-8">
            <AutomationSimulator />
          </div>

          {/* CAREER TIMELINE — feature #4 */}
          <SecTitle id="experience" title="Career timeline" />
          <div className="relative mb-8 pl-6">
            {/* Vertical connector line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#e5e7eb] dark:bg-[#1e293b]" />
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.period}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="relative mb-5 last:mb-0"
              >
                {/* Dot */}
                <span
                  className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0a0f1e] shadow-sm"
                  style={{ backgroundColor: t.color }}
                />
                <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] px-4 py-3 hover:border-[#1a56db]/40 dark:hover:border-[#3b82f6]/40 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-[12.5px] font-medium text-[#111827] dark:text-[#f1f5f9]">{t.role}</span>
                    {t.active && (
                      <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Current
                      </span>
                    )}
                    {t.edu && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        Education
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-[11px] text-[#6b7280] dark:text-[#94a3b8]">{t.company}</span>
                    <span className="text-[10.5px] text-[#9ca3af] dark:text-[#64748b]">{t.period}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {t.highlights.map((h) => (
                      <span key={h} className="text-[10px] px-2 py-0.5 rounded bg-[#f8faff] dark:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#334155] text-[#374151] dark:text-[#94a3b8]">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SKILL PROFICIENCY BARS — feature #6 */}
          <SecTitle title="Skill proficiency" />
          <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-5 mb-4">
            <div className="space-y-3">
              {SKILL_BARS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11.5px] text-[#374151] dark:text-[#cbd5e1]">{s.label}</span>
                    <span className="text-[10.5px] text-[#6b7280] dark:text-[#94a3b8] tabular-nums">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#f3f4f6] dark:bg-[#1e293b] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.05 + 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <SecTitle title="Technical skills" />
          <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-5 mb-2">
            {SKILL_GROUPS.map((g) => (
              <div key={g.name} className="mb-4 last:mb-0">
                <div className="text-[10px] font-medium uppercase tracking-wider text-[#6b7280] dark:text-[#64748b] mb-2">
                  {g.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.tags.map((tag) => (
                    <span
                      key={tag.t}
                      className={`text-[11px] px-2.5 py-1 rounded border ${
                        tag.hi
                          ? "bg-[#e0e7ff] dark:bg-[#1e3a5f] text-[#1a56db] dark:text-[#60a5fa] border-[#c7d2fe] dark:border-[#1e40af]"
                          : "bg-[#f8faff] dark:bg-[#1e293b] text-[#374151] dark:text-[#94a3b8] border-[#e5e7eb] dark:border-[#334155]"
                      }`}
                    >
                      {tag.t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Languages — honest */}
          <div className="rounded-lg border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] p-5 mt-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-[#6b7280] dark:text-[#64748b] mb-2">
              Languages
            </div>
            <div className="flex flex-wrap gap-4 text-[12px]">
              <div>
                <span className="text-[#111827] dark:text-[#f1f5f9]">Thai</span>{" "}
                <span className="text-[#6b7280] dark:text-[#94a3b8]">— Native</span>
              </div>
              <div>
                <span className="text-[#111827] dark:text-[#f1f5f9]">English</span>{" "}
                <span className="text-[#6b7280] dark:text-[#94a3b8]">— Intermediate (Working Proficiency)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA BAR */}
      <section
        id="contact"
        className="bg-gradient-to-r from-[#0c2463] to-[#1a5fb4]"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 sm:px-7 py-5">
          <div>
            <div className="text-[15px] font-medium text-white">
              Ready to automate your next challenge?
            </div>
            <div className="text-[12px] text-white/70 mt-1">
              SAP · RPA · AI-powered workflows · Immediate availability · Bangkok, Thailand
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium bg-white text-[#0c2463] px-4 py-2 rounded-md hover:bg-[#f8faff] transition-colors"
            >
              Resume
            </a>
            <a
              href="mailto:laybabaka@gmail.com"
              className="text-[12px] bg-transparent border border-white/40 text-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-6xl mx-auto px-5 sm:px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-[#6b7280] dark:text-[#64748b]">
            © {new Date().getFullYear()} Kanokporn Hudsree · Bangkok, Thailand
          </span>
          <div className="flex items-center gap-4 text-[12px]">
            <a
              href="https://www.linkedin.com/in/laykanokporn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7280] hover:text-[#1a56db]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/LayKanokporn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7280] hover:text-[#1a56db]"
            >
              GitHub
            </a>
            <a href="mailto:laybabaka@gmail.com" className="text-[#6b7280] hover:text-[#1a56db]">
              Email
            </a>
            <Link href="/portfolio" className="text-[#6b7280] hover:text-[#1a56db]">
              Full portfolio
            </Link>
            <Link href="/resume" className="text-[#6b7280] hover:text-[#1a56db]">
              Resume page
            </Link>
            <Link href="/v1" className="text-[#6b7280] hover:text-[#1a56db]">
              Creative version
            </Link>
          </div>
        </div>
      </footer>

      {/* Profile photo lightbox */}
      {photoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setPhotoOpen(false)}
        >
          <div
            className="relative max-w-sm w-full rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="Kanokporn Hudsree (Lay) — professional photo"
              className="w-full h-auto block"
            />
            <button
              onClick={() => setPhotoOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Close"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────
function SidePopover({
  detail,
  children,
}: {
  detail?: Detail;
  children: React.ReactNode;
}) {
  if (!detail) return <>{children}</>;
  return (
    <HoverCard
      trigger={children}
      side="right"
      width={300}
      content={
        <div>
          <div className="text-[12px] font-medium text-[#111827] dark:text-[#f1f5f9] mb-1.5">{detail.title}</div>
          <p className="text-[11.5px] text-[#374151] dark:text-[#cbd5e1] leading-relaxed mb-2.5">{detail.desc}</p>
          <ul className="space-y-1 mb-3">
            {detail.bullets.map((b) => (
              <li key={b} className="flex items-start gap-1.5 text-[11.5px] text-[#374151] dark:text-[#cbd5e1]">
                <span className="text-[#1a56db] mt-0.5 leading-none">·</span>
                <span className="leading-snug">{b}</span>
              </li>
            ))}
          </ul>
          {detail.link && (
            <a
              href={detail.link.href}
              className="inline-flex items-center gap-1 text-[11px] text-[#1a56db] hover:underline"
            >
              {detail.link.label}
            </a>
          )}
        </div>
      }
    />
  );
}

function SidebarGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="text-[10px] font-medium uppercase tracking-wider text-[#6b7280] mb-2 px-2">
        {label}
      </div>
      {children}
    </div>
  );
}

function SideRow({
  icon,
  label,
  badge,
  active,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  active?: boolean;
  href?: string;
}) {
  const inner = (
    <div
      className={`flex items-center gap-2 text-[12px] px-2 py-1.5 rounded transition-colors ${
        active
          ? "bg-[#e0e7ff] text-[#1a56db]"
          : "text-[#6b7280] hover:bg-[#f8faff] hover:text-[#1a56db]"
      }`}
    >
      <span className="text-sm shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
      {badge && (
        <span className="ml-auto text-[9px] bg-[#1a56db] text-white px-1.5 py-0.5 rounded-full shrink-0 font-medium">
          {badge}
        </span>
      )}
    </div>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

function SecTitle({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-[#6b7280] mb-3 scroll-mt-20"
    >
      <span>{title}</span>
      {children}
    </div>
  );
}

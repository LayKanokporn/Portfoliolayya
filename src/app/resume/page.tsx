"use client";
import React from "react";
import Link from "next/link";
import {
  FiMapPin,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiGlobe,
  FiPrinter,
  FiArrowLeft,
  FiCheck,
} from "react-icons/fi";
import { Logo } from "@/components/Logo";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { FloatingHireButton } from "@/components/FloatingHireButton";
import { DarkModeToggle } from "@/components/DarkModeToggle";

// ─── DATA ─────────────────────────────────────────────────────────────

const SUMMARY =
  "ERP Developer & Automation Engineer with First-Class Honors in Computer & Robotics Engineering. Specializing in SAP S/4HANA, Power Automate, UiPath, Blue Prism, and AI-powered document processing. Self-driven end-to-end delivery — take a requirement, analyze it, plan the approach, build it, flag issues early, propose a solution, and ship — while acting as the communication bridge between business stakeholders and technical implementation. Currently delivering enterprise SAP automation at AIS while operating a self-built LINE Bot production system in parallel, and actively tracking new developments in AI, automation, and data platforms to bring back into both.";

const CORE_COMPETENCIES = [
  {
    group: "Project Prioritization & Planning",
    items: "Assess incoming requests, size effort against business impact, and sequence delivery across concurrent automation projects.",
  },
  {
    group: "Development & Execution",
    items: "Build and ship production systems end-to-end — SAP automation, RPA bots, and self-built AI-tooling — not just prototypes.",
  },
  {
    group: "Stakeholder Communication & User Immersion",
    items: "Sit with business users to observe real workflows, translate pain points into technical requirements, and report back in language each side understands.",
  },
  {
    group: "Continuous Learning & Innovation",
    items: "Track new tools in AI, automation, and engineering best practices; proactively propose automation ideas sourced from problems seen in the business; share findings with the team.",
  },
  {
    group: "Self-Driven / Independent",
    items: "Work without step-by-step direction — receive a problem, analyze it, plan, execute, surface blockers, propose a fix, and deliver, end to end.",
  },
];

const EXPERIENCE = [
  {
    role: "ERP Developer & Automation Engineer",
    co: "AIS (Advanced Info Service)",
    period: "Sep 2025 – Present",
    bullets: [
      "Delivered 5 enterprise SAP automations across Finance, Procurement, and Sales (BG Alert, GR Process, Mass Sales Order, THOR/SOFR, Payment Advice with AI Builder OCR).",
      "Enhanced SAP S/4HANA OB83 to support THOR + SOFR reference rates — redesigned classification using Reference fields instead of date-based logic.",
      "Built end-to-end RPA workflows with exception handling, structured logging, and stakeholder reporting.",
      "Acted as the bridge between business users and technical delivery — gathered requirements directly from users, ran UAT, and owned production rollout.",
      "Took each request from requirement through analysis, planning, and execution to delivery independently — flagging blockers and proposing fixes without waiting on step-by-step direction.",
    ],
    stack: "UiPath · SAP S/4HANA · SAP Web GUI · SAP Build Process Automation · Power Automate · AI Builder OCR · Excel · Outlook · SQL",
  },
  {
    role: "Founder & Solo Builder",
    co: "Sunrise LINE Bots Suite — Self-built Production System",
    period: "2025 – Present",
    bullets: [
      "Designed, built, deployed and solo-operated a 2-bot LINE OA suite automating end-to-end cafe operations.",
      "Engineered Reply-200-First webhook (P95 < 1.5s on serverless) with idempotent dedup and defer queue for tasks > 60s.",
      "Established TRACE/INFO/WARN/ERROR structured logging with persistent error sheet — zero silent failures over 16+ weeks of production.",
      "Reduced daily bookkeeping + stock entry from ~30 min/day to ~5 min/day (~83% reduction).",
      "Pattern library (Reply-200-First, idempotent webhook, defer queue) reused directly in enterprise UiPath workflows at AIS.",
    ],
    stack: "Google Apps Script · LINE Messaging API v2 · Flex Messages · Rich Menu API · Google Sheets · CacheService",
  },
  {
    role: "Software Engineer",
    co: "PTT Digital Solutions",
    period: "Jan 2025 – Aug 2025",
    bullets: [
      "Developed AI-integrated automation for industrial traffic detection with YOLOv5 + GPS coordination (92.5% accuracy).",
      "Led API integrations and data pipeline automation across backend services.",
    ],
    stack: "Python · YOLOv5 · OpenCV · EasyOCR · GPS · REST API · PostgreSQL",
  },
  {
    role: "RPA Developer",
    co: "PTT Digital Solutions",
    period: "Aug 2024 – Dec 2024",
    bullets: [
      "Developed Blue Prism automation workflows for E-Commerce and ERP processes.",
      "Integrated TikTok Shop API in Python with secure HMAC signature authentication for real-time inventory sync.",
      "Built data integration pipelines between internal and external systems.",
    ],
    stack: "Blue Prism · Python · SAP GUI · REST API · Web Scraping · JSON",
  },
  {
    role: "R&D Engineer Intern",
    co: "Ultimate Technology Co., Ltd",
    period: "Jun – Jul 2023",
    bullets: [
      "Worked on Elephant Detection and Alert System integrated with 5G Smart Pole.",
      "Trained ML/DL models using YOLOv5s, SSD, and Faster R-CNN; used Roboflow for dataset and optimization.",
    ],
    stack: "YOLOv5s · SSD · Faster R-CNN · Roboflow · Python · 5G Smart Pole",
  },
];

const EDUCATION = {
  degree: "B.Eng. Computer & Robotics Engineering",
  uni: "Bangkok University",
  period: "2020 – 2024",
  gpa: "3.53 / 4.00 — First-Class Honors",
  notes:
    "Senior project (Smart Pill Dispenser) recognized by faculty. Strong foundation in embedded systems, databases, AI/ML, and software engineering.",
};

const WORKSHOPS = [
  "SAP Build Process Automation Workshop",
  "SAP Adoption Lab: End-to-End Intelligent Document Processing (AI Core + Document AI)",
  "SAP Adoption Lab: Central Entry Dashboard (Build Work Zone + Mobile Start)",
];

const SKILLS = [
  { group: "Enterprise & SAP", items: "SAP S/4HANA · SAP Build Process Automation · SAP BTP · SAP Document AI · SAP AI Core · SAP Integration Suite · SAP GUI / Web GUI · OData / BAPI · ERP Development" },
  { group: "RPA & Automation", items: "UiPath · Blue Prism · Power Automate (Cloud + Desktop) · Power Apps · Power Fx · Dataverse · AI Builder OCR · Custom Connector · Google Apps Script · LINE Messaging API" },
  { group: "Programming & Data", items: "Python (Pandas, FastAPI, Pydantic, pytest, asyncio) · C# · JavaScript / TypeScript · SQL · PostgreSQL · MySQL · MongoDB" },
  { group: "AI & Document Intelligence", items: "AI Builder OCR · Azure Document Intelligence · AWS Textract · Tesseract · IDP · Computer Vision (YOLOv5/v8, OpenCV) · Claude API · Prompt Engineering" },
  { group: "Process & Consulting", items: "BPMN 2.0 · PDD / SDD writing · ROI / FTE calculation · Root Cause Analysis · Process Discovery · Stakeholder Management" },
  { group: "Cloud / DevOps", items: "AWS (S3, Lambda, IAM, CloudWatch) · Docker · Git / GitHub Actions · REST API · OAuth 2.0 / JWT · Webhook · Postman" },
];

const CERTS = [
  "UiPath RPA Developer Foundation (2023)",
  "Blue Prism Developer Certification (2023)",
  "Python for Automation & Data Science — Coursera (2022)",
  "AI & Computer Vision with YOLO — Workshop (2022)",
  "Docker & Containerization — Udemy (2021)",
  "PostgreSQL Database Management (2021)",
];

const SELECTED_PROJECTS = [
  {
    name: "BG Alert Automation",
    detail: "SAP Bank Guarantee monitoring with 30d / 7d / expired classification and Outlook distribution.",
  },
  {
    name: "Payment Advice (Power Automate + AI Builder OCR)",
    detail: "End-to-end document extraction, SAP validation, and automated email distribution.",
  },
  {
    name: "Market Rate Maintenance (THOR & SOFR)",
    detail: "SAP S/4HANA OB83 enhancement — Reference-based classification, supports new IBOR-replacement rates.",
  },
  {
    name: "Sunrise LINE Bots Suite",
    detail: "Solo-architected 2-bot production system; ↓83% manual effort, 0 silent failures over 16+ weeks.",
  },
  {
    name: "Multi-Source Inventory Sync API",
    detail: "Idempotent, scheduled inventory sync with HMAC signature auth; zero overselling incidents.",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] dark:bg-[#0a0f1e] print:bg-white">
      <ScrollProgressBar />
      <FloatingHireButton />
      {/* Action bar — hidden in print */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-[#e5e7eb] dark:border-[#1e293b] print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#6b7280] hover:text-[#1a56db]"
          >
            <FiArrowLeft /> Back to home
          </Link>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-[12px] bg-white border border-[#e5e7eb] hover:bg-[#f8faff] text-[#111827] px-3 py-1.5 rounded-md"
            >
              <FiPrinter /> Print / Save PDF
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] bg-[#1a56db] hover:bg-[#1e40af] text-white px-3 py-1.5 rounded-md"
            >
              Open original PDF
            </a>
          </div>
        </div>
      </div>

      {/* Paper */}
      <main className="max-w-[820px] mx-auto bg-white shadow-sm border border-[#e5e7eb] mt-8 mb-6 print:my-0 print:shadow-none print:border-0 print:max-w-full px-8 sm:px-12 py-12 print:py-8 text-[12.5px] text-[#1f2937] leading-relaxed">
        {/* Header */}
        <header className="flex items-start justify-between gap-6 pb-6 border-b border-[#e5e7eb] mb-6">
          <div>
            <div className="text-[26px] mb-2">
              <Logo variant="full" theme="light" showSubtitle />
            </div>
            <div className="text-[12px] text-[#6b7280] mt-1.5">
              ERP Developer · Automation Engineer · Digital Transformation
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 text-[11px] text-[#374151] shrink-0">
            <div className="flex items-center gap-1.5">
              <FiMapPin className="text-[#1a56db]" /> Bangkok, Thailand
            </div>
            <div className="flex items-center gap-1.5">
              <FiGlobe className="text-[#1a56db]" />
              <a
                href="https://portfolio-kanokporn.vercel.app/about-me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a56db]"
              >
                portfolio-kanokporn.vercel.app
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <FiMail className="text-[#1a56db]" />
              <a href="mailto:laybabaka@gmail.com" className="text-[#1a56db]">
                laybabaka@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <FiLinkedin className="text-[#1a56db]" />
              <a
                href="https://www.linkedin.com/in/laykanokporn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a56db]"
              >
                linkedin.com/in/laykanokporn
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <FiGithub className="text-[#1a56db]" />
              <a
                href="https://github.com/LayKanokporn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a56db]"
              >
                github.com/LayKanokporn
              </a>
            </div>
          </div>
        </header>

        {/* Summary */}
        <Section title="Summary">
          <p className="text-[#374151]">{SUMMARY}</p>
        </Section>

        {/* Core Competencies */}
        <Section title="Core Competencies">
          <div className="space-y-1.5">
            {CORE_COMPETENCIES.map((c) => (
              <p key={c.group} className="text-[#374151]">
                <span className="font-medium text-[#111827]">{c.group}</span>
                {" — "}
                {c.items}
              </p>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <div className="space-y-4">
            {EXPERIENCE.map((e) => (
              <div key={e.role + e.co}>
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-[13.5px] font-medium text-[#111827]">{e.role}</div>
                    <div className="text-[12px] text-[#1a56db]">{e.co}</div>
                  </div>
                  <div className="text-[11.5px] text-[#6b7280] whitespace-nowrap">{e.period}</div>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <FiCheck className="text-[#1a56db] mt-1 shrink-0 text-xs" />
                      <span className="text-[#374151]">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-[#6b7280] mt-1.5">
                  <span className="uppercase tracking-wider mr-1">Stack</span>· {e.stack}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Selected Projects */}
        <Section title="Selected projects">
          <ul className="space-y-1">
            {SELECTED_PROJECTS.map((p) => (
              <li key={p.name} className="flex items-start gap-2">
                <span className="text-[#1a56db] mt-0.5 leading-none">·</span>
                <span>
                  <span className="text-[#111827] font-medium">{p.name}</span>
                  <span className="text-[#374151]"> — {p.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Education */}
        <Section title="Education">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <div className="text-[13.5px] font-medium text-[#111827]">{EDUCATION.degree}</div>
              <div className="text-[12px] text-[#1a56db]">{EDUCATION.uni}</div>
            </div>
            <div className="text-[11.5px] text-[#6b7280] whitespace-nowrap">{EDUCATION.period}</div>
          </div>
          <div className="text-[12px] text-[#374151] mt-1">{EDUCATION.gpa}</div>
          <div className="text-[12px] text-[#6b7280] mt-1">{EDUCATION.notes}</div>

          <div className="mt-3">
            <div className="text-[11px] uppercase tracking-wider text-[#6b7280] mb-1">
              SAP Workshops &amp; Adoption Labs
            </div>
            <ul className="space-y-1">
              {WORKSHOPS.map((w) => (
                <li key={w} className="flex items-start gap-2">
                  <span className="text-[#1a56db] mt-0.5 leading-none">·</span>
                  <span className="text-[#374151]">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="space-y-1.5">
            {SKILLS.map((s) => (
              <div key={s.group} className="grid grid-cols-[120px_1fr] gap-3">
                <div className="text-[11.5px] text-[#6b7280] uppercase tracking-wider">
                  {s.group}
                </div>
                <div className="text-[12px] text-[#374151]">{s.items}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section title="Certifications">
          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
            {CERTS.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <span className="text-[#1a56db] mt-0.5 leading-none">·</span>
                <span className="text-[#374151]">{c}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Languages */}
        <Section title="Languages" last>
          <div className="text-[12px] text-[#374151]">
            <span className="text-[#111827]">Thai</span> Native ·{" "}
            <span className="text-[#111827]">English</span> Intermediate (Working Proficiency)
          </div>
        </Section>
      </main>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 14mm 14mm;
          }
          body {
            background: #ffffff;
          }
        }
      `}</style>
    </div>
  );
}

function Section({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={last ? "" : "mb-5"}>
      <h2 className="text-[11px] font-medium uppercase tracking-wider text-[#6b7280] border-b border-[#e5e7eb] pb-1 mb-2.5">
        {title}
      </h2>
      {children}
    </section>
  );
}

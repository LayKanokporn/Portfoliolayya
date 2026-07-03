import { NextResponse } from "next/server";

// Personal API — `curl portfolio-kanokporn.vercel.app/api/resume`
const RESUME = {
  meta: {
    hello: "You found the API. That's exactly the curiosity I hire for in a teammate.",
    pdf: "https://portfolio-kanokporn.vercel.app/resume.pdf",
    website: "https://portfolio-kanokporn.vercel.app",
    updated: "2026-07-03",
  },
  name: "Kanokporn Hudsree",
  nickname: "Lay",
  title: "Automation Problem Solver — RPA · AI · ERP",
  location: "Bangkok, Thailand",
  email: "laybabaka@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/laykanokporn",
    github: "https://github.com/LayKanokporn",
  },
  summary:
    "Turning business processes into observable, resilient systems with RPA, AI, and ERP. Enterprise SAP S/4HANA automation in production at AIS — 83% ops cut, 0 silent failures, p95 < 1.5s. Spec-first workflow with pre-mortem analysis before every go-live.",
  experience: [
    {
      role: "ERP Developer & Automation Engineer",
      company: "AIS (Advanced Info Service)",
      period: "Sep 2025 – Present",
      highlights: [
        "5 production SAP S/4HANA automations across Finance, Procurement, Sales — zero post-deploy silent failures",
        "Payment Advice pipeline: Outlook → AI Builder OCR (≥85% confidence gate) → SAP validation → per-beneficiary distribution, SOX-grade audit trail",
        "OB83 THOR/SOFR reference-rate redesign — IBOR-transition compliant",
      ],
      stack: ["UiPath", "SAP S/4HANA", "SAP Build", "Power Automate", "AI Builder OCR", "Power Apps", "SQL"],
    },
    {
      role: "Software Engineer",
      company: "PTT Digital Solutions",
      period: "Jan 2025 – Aug 2025",
      highlights: [
        "AI Code Assistant for QA — +75% QA productivity, 5–20% release-cycle cost reduction, presented at company-wide YOU&AI showcase",
        "YOLOv5 + OCR + GPS industrial traffic detection — 92.5% accuracy",
      ],
      stack: ["Python", "LLM Tools", "YOLOv5", "OpenCV", "EasyOCR", "REST API", "PostgreSQL"],
    },
    {
      role: "RPA Developer",
      company: "PTT Digital Solutions",
      period: "Aug 2024 – Dec 2024",
      highlights: [
        "Blue Prism automation for E-Commerce and ERP processes",
        "TikTok Shop API integration with HMAC auth — zero overselling incidents",
      ],
      stack: ["Blue Prism", "Python", "SAP GUI", "REST API"],
    },
  ],
  skills: {
    enterprise: ["SAP S/4HANA", "SAP Build Process Automation", "SAP BTP", "SAP Document AI", "OData / BAPI"],
    rpa: ["UiPath", "Blue Prism", "Power Automate", "Power Apps", "AI Builder OCR", "Google Apps Script"],
    aiAugmented: ["Problem Framing", "Pre-mortem Analysis", "Spec-first Workflow", "Prompt Engineering", "Claude API"],
    programming: ["Python", "C#", "JavaScript / TypeScript", "SQL", "PostgreSQL"],
    documentIntelligence: ["AI Builder OCR", "Azure Document Intelligence", "Tesseract", "Computer Vision (YOLO, OpenCV)"],
  },
  education: {
    degree: "B.Eng. Computer & Robotics Engineering",
    school: "Bangkok University",
    period: "2020 – 2024",
    gpa: "3.53 / 4.00 — First-Class Honors",
  },
  certifications: [
    "UiPath RPA Developer Foundation (2023)",
    "Blue Prism Developer Certification (2023)",
    "Python for Automation & Data Science — Coursera (2022)",
  ],
  hiring: {
    openTo: ["Automation Specialist", "AI Automation Engineer", "RPA Developer", "SAP / ERP Automation"],
    workStyle: "Hybrid / on-site / relocation",
    responseTime: "Within 24 hours",
    contact: "mailto:laybabaka@gmail.com",
  },
};

export async function GET() {
  return NextResponse.json(RESUME, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

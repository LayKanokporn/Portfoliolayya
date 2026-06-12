"use client";
import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  FiMapPin,
  FiAward,
  FiDownload,
  FiArrowRight,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiExternalLink,
  FiBriefcase,
  FiBookOpen,
  FiServer,
  FiCpu,
  FiFileText,
  FiActivity,
  FiZap,
  FiCheck,
  FiMenu,
  FiX,
  FiPlay,
} from "react-icons/fi";
import { Logo } from "@/components/Logo";
import AutomationSimulator from "@/components/AutomationSimulator";
import { ProjectArt, type ArtTheme } from "@/components/ProjectArt";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { FloatingHireButton } from "@/components/FloatingHireButton";
import { FloatingTOC } from "@/components/FloatingTOC";
import { useActiveSection } from "@/hooks/useActiveSection";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { AnimatedCounter } from "@/components/AnimatedCounter";

// ─── DATA ─────────────────────────────────────────────────────────────

const NAV_TABS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Try It", href: "#simulator" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const POSITIONING = {
  intro:
    "Hi, I'm Kanokporn (Lay), an ERP Developer & Automation Engineer with a Computer & Robotics Engineering degree from Bangkok University — graduated with First-Class Honors.",
  body:
    "I engineer SAP, RPA, API, and AI together to improve business processes and drive Digital Transformation at enterprise scale — working on SAP S/4HANA financial workflows, SAP Build Process Automation, and end-to-end RPA delivery in production.",
  toolkit:
    "My toolkit spans SAP S/4HANA & BTP, UiPath / Blue Prism / Power Automate, Document AI & IDP, and LLM-based pipelines. I bring an enterprise mindset from ERP work and a builder's mindset from a self-built LINE Bot production system — the same architectural patterns (idempotent webhooks, defer queues, structured logging) reused directly in UiPath workflows at AIS.",
  quote:
    "I'm not here to write bots. I'm here to engineer SAP, RPA, API, and AI into business processes that actually move the numbers — with production-grade logging, error handling, and measurable outcomes.",
};

const TECH_EXPERTISE = [
  { title: "RPA Platforms (UiPath, Blue Prism, PAD)", years: "2+ yrs", projects: "8+ bots in production", cert: "UiPath & Blue Prism Certified", href: "#experience" },
  { title: "Process Analysis & BI", years: "2 yrs", projects: "12+ PDDs/SDDs delivered", cert: "BPMN 2.0", href: "#skills" },
  { title: "Python & Automation", years: "3 yrs", projects: "Pandas/FastAPI/OCR scripts", cert: "Coursera certified", href: "#skills" },
  { title: "Database & SQL", years: "2 yrs", projects: "PostgreSQL/MySQL queries + reports", cert: "", href: "#skills" },
  { title: "API Integration", years: "2 yrs", projects: "REST + OAuth + Webhooks", cert: "", href: "#projects" },
  { title: "SAP Automation", years: "1+ yr", projects: "BG Alert, Payment Advice, THOR/SOFR, OB83", cert: "ERP Developer @ AIS", href: "#projects" },
  { title: "GenAI & LLM Apps", years: "1 yr", projects: "Sunrise LINE bot + Claude tooling", cert: "", href: "#projects" },
  { title: "OCR & Document AI", years: "1 yr", projects: "Tesseract + ocrmypdf + AI Builder OCR", cert: "", href: "#projects" },
];

const CAPABILITIES = [
  { capability: "Process Discovery", impact: "PDD/SDD authored", href: "#skills" },
  { capability: "RPA Development", impact: "8+ bots in production", href: "#experience" },
  { capability: "SAP Automation", impact: "OB83, THOR/SOFR, BG Alert", href: "#projects" },
  { capability: "Bot Governance", impact: "Logging + error handling by default", href: "#projects" },
];

const SKILL_GROUPS = [
  {
    name: "Enterprise & SAP",
    priority: true,
    tags: ["SAP S/4HANA", "SAP Build Process Automation", "SAP Build Apps", "SAP Build Work Zone", "SAP Mobile Start", "SAP BTP", "SAP Integration Suite", "SAP AI Core", "SAP Document AI", "SAP Joule Studio", "SAP GUI Scripting", "SAP Web GUI", "SAP OData / BAPI", "ERP Development"],
    highlights: ["SAP S/4HANA", "SAP Build Process Automation"],
  },
  {
    name: "RPA & Automation",
    priority: true,
    tags: ["UiPath", "Blue Prism", "Power Automate Desktop", "Power Automate Cloud", "Power Apps (Canvas)", "Power Fx", "Dataverse", "AI Builder (OCR + Form)", "Custom Connector", "Solution & ALM", "Google Apps Script", "LINE Messaging API", "Airflow", "n8n", "Make.com", "Excel VBA", "CronJob", "Python Scheduling"],
    highlights: ["UiPath", "Blue Prism", "Power Automate Cloud", "AI Builder (OCR + Form)"],
  },
  {
    name: "GenAI & LLM",
    priority: true,
    tags: ["Claude API (Anthropic)", "OpenAI API", "Gemini API", "Prompt Engineering", "RAG (concept)", "MCP (Model Context Protocol)", "AI Agent / Tool Use", "Claude Code (AI Dev)", "Token & Cost Optimization"],
    highlights: ["Claude API (Anthropic)", "Prompt Engineering"],
  },
  {
    name: "OCR & Document AI",
    priority: true,
    tags: ["Power Automate AI Builder (OCR)", "Azure Document Intelligence", "AWS Textract", "Google Document AI", "SAP Document AI", "Intelligent Document Processing (IDP)", "Tesseract OCR", "UiPath Document Understanding", "ocrmypdf", "pdfplumber", "PyMuPDF", "Table Extraction", "Layout Detection", "Image Preprocessing"],
    highlights: ["Power Automate AI Builder (OCR)", "SAP Document AI", "Intelligent Document Processing (IDP)"],
  },
  {
    name: "Process Consulting",
    priority: true,
    tags: ["BPMN 2.0", "Swimlane Diagram", "Process Discovery", "Task Mining", "Value Stream Mapping", "PDD Writing", "SDD Writing", "ROI Calculation", "FTE Saved Calc", "Feasibility Assessment", "Root Cause Analysis", "5 Why / Fishbone", "Workflow Design", "Change Management", "Stakeholder Management", "Agile / Scrum"],
    highlights: ["PDD Writing", "SDD Writing", "ROI Calculation"],
  },
  {
    name: "Programming & Languages",
    tags: ["Python", "Pandas", "NumPy", "FastAPI", "Pydantic", "pytest", "requests / httpx", "asyncio", "Regex", "Poetry / venv", "C#", "C / C++", "JavaScript / TypeScript", ".NET", "SQL"],
    highlights: ["Python", "Pandas", "FastAPI"],
  },
  {
    name: "AI / ML & Computer Vision",
    tags: ["YOLOv5 / v8", "OpenCV", "Roboflow", "EasyOCR", "Deep Learning", "Model Optimization", "Jupyter Lab"],
    highlights: ["YOLOv5 / v8", "OpenCV"],
  },
  {
    name: "System Design Patterns",
    tags: ["Retry Pattern", "Dead Letter Queue (concept)", "Idempotency", "Rate Limiting", "Event-Driven Architecture", "Cron / Scheduled Jobs", "Microservice vs Monolith", "Encryption (Rest/Transit)"],
    highlights: ["Idempotency", "Retry Pattern"],
  },
  {
    name: "Cloud / DevOps",
    tags: ["AWS S3", "AWS Lambda", "AWS EC2", "AWS IAM", "AWS Secrets Manager", "AWS CloudWatch", "Azure Cloud", "Docker", "Git Branching / Rebase", "GitHub Actions (CI/CD)", "Semantic Versioning", "Jira", "REST API", "OAuth 2.0 / JWT", "Swagger / OpenAPI", "Webhook", "Postman", "Serverless Framework", "System Monitoring"],
    highlights: ["AWS Lambda", "GitHub Actions (CI/CD)", "OAuth 2.0 / JWT"],
  },
  {
    name: "Database & Data Analytics",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "SQL JOIN (All Types)", "Window Functions", "CTE", "Stored Procedure", "Query Optimization", "Data Warehouse", "Power Query (M)", "Power BI", "A/B Testing", "KPI Design", "Data Mining", "Dashboarding"],
    highlights: ["Window Functions", "CTE", "Power BI"],
  },
  {
    name: "Embedded & IoT",
    tags: ["Arduino", "PlatformIO", "LVGL", "Stepper Motor"],
    highlights: [],
  },
  {
    name: "Professional Skills",
    tags: ["Problem Solving", "Collaboration", "Continuous Learning", "Attention to Detail", "Self-Motivated", "Adaptability", "Stakeholder Management", "Documentation"],
    highlights: [],
  },
];

const EXPERIENCE = [
  {
    role: "ERP Developer & Automation Engineer",
    company: "AIS (Advanced Info Service)",
    period: "Sep 2025 – Present",
    duration: "Ongoing",
    location: "Bangkok, Thailand",
    active: true,
    type: "work" as const,
    stack: ["UiPath", "SAP S/4HANA", "SAP Web GUI", "SAP Build Process Automation", "Power Automate", "Power Automate AI Builder (OCR)", "Excel Automation", "Outlook Automation", "SQL"],
    responsibilities: [
      "Delivered enterprise SAP automation across Finance, Procurement, and Sales domains",
      "Built end-to-end RPA workflows with exception handling, structured logging, and stakeholder reporting",
      "Enhanced SAP S/4HANA financial processes via configuration and integration (THOR / SOFR reference rates)",
      "Collaborated with business users on requirement gathering, UAT, and production rollout",
    ],
    projects: [
      { name: "BG Alert Automation", detail: "Automated Bank Guarantee expiration monitoring in SAP — classifies 30d / 7d / expired, distributes email alerts. UiPath + SAP Web GUI + Excel + Outlook." },
      { name: "GR Process Automation", detail: "Automated Goods Receipt workflow in SAP — reduced manual entry, improved exception handling. UiPath + SAP." },
      { name: "Mass Sales Order Automation", detail: "High-volume SO creation/updates with optimized business rules. UiPath + SAP SD + SQL." },
      { name: "Market Rate Maintenance (THOR & SOFR)", detail: "Enhanced SAP S/4HANA OB83 — redesigned classification using Reference fields instead of date-based. SAP S/4HANA + API." },
      { name: "Payment Advice Automation (OCR)", detail: "End-to-end Power Automate flow with AI Builder OCR — extract payment data, validate against SAP, auto-distribute. Power Automate + AI Builder + SAP + Outlook." },
    ],
  },
  {
    role: "Founder & Solo Builder",
    company: "Sunrise LINE Bots Suite — Self-built Production System",
    period: "2025 – Present",
    duration: "16+ weeks in production",
    location: "Bangkok, Thailand",
    active: true,
    type: "work" as const,
    stack: ["Google Apps Script", "LINE Messaging API v2", "Flex Messages", "Rich Menu API", "Google Sheets", "CacheService", "JavaScript ES6+"],
    responsibilities: [
      "Designed, built, deployed, and operated solo a 2-bot LINE OA suite automating end-to-end daily cafe operations",
      "Engineered Reply-200-First webhook architecture — sustained P95 under 1.5s on serverless runtime",
      "Built idempotent webhook processing with CacheService-based deduplication",
      "Implemented defer queue pattern for tasks > 60s (slip OCR) with retry + dead-letter handling",
      "Established structured logging (TRACE/INFO/WARN/ERROR) with persistent error sheet",
      "Reduced daily bookkeeping + stock entry from ~30 min/day to ~5 min/day (~83%)",
      "Pattern library reused directly in enterprise UiPath workflows at AIS",
    ],
    projects: [
      { name: "KaiJa Bot", detail: "Expense tracking, customer order intake, slip OCR pipeline, per-user state machine, Thai NL keyword detection." },
      { name: "Stock Sunrise", detail: "Stock management, Flex-based reporting, 3-tab Rich Menu (Switch Alias API), adaptive renderer with size guard + text fallback." },
    ],
  },
  {
    role: "Software Engineer",
    company: "PTT Digital Solutions",
    period: "Jan 2025 – Aug 2025",
    duration: "8 months",
    location: "Bangkok, Thailand",
    active: false,
    type: "work" as const,
    stack: ["Python", "YOLOv5", "OpenCV", "EasyOCR", "GPS", "REST API", "PostgreSQL"],
    responsibilities: [
      "Developed AI-integrated automation for industrial traffic detection",
      "Built YOLOv5-based traffic light detection system with GPS coordination",
      "Led API integrations and data pipeline automation across backend services",
    ],
    projects: [
      { name: "Real-time Computer Vision Pipeline", detail: "YOLOv5 + OCR + GPS for traffic light detection on Thai traffic scenarios." },
      { name: "API Integration & Data Pipeline", detail: "Automated backend data flows between internal services." },
    ],
  },
  {
    role: "RPA Developer",
    company: "PTT Digital Solutions",
    period: "Aug 2024 – Dec 2024",
    duration: "5 months",
    location: "Bangkok, Thailand",
    active: false,
    type: "work" as const,
    stack: ["Blue Prism", "Python", "SAP GUI", "REST API", "Web Scraping", "TikTok Shop API", "JSON"],
    responsibilities: [
      "Developed automation workflows using Blue Prism for E-Commerce and ERP processes",
      "Analyzed and improved business processes through RPA",
      "Integrated external systems via REST API with secure HMAC signature authentication",
    ],
    projects: [
      { name: "Web Data Scraping Automation", detail: "Automated extraction of product/stock data from E-Commerce sites. Blue Prism + Web Automation." },
      { name: "Real-time Inventory Update via API", detail: "API integration for real-time stock synchronization. Blue Prism + REST API + JSON." },
      { name: "SAP Data Entry Automation", detail: "Automated keying of product data into SAP. Blue Prism + SAP GUI." },
    ],
  },
  {
    role: "R&D Engineer Intern",
    company: "Ultimate Technology Co., Ltd",
    period: "Jun – Jul 2023",
    duration: "2 months",
    location: "Bangkok, Thailand",
    active: false,
    type: "work" as const,
    stack: ["YOLOv5s", "SSD", "Faster R-CNN", "Roboflow", "Python", "5G Smart Pole"],
    responsibilities: [
      "Worked on AI Project: Elephant Detection and Alert System integrated with 5G Smart Pole",
      "Trained ML/DL models using YOLOv5s, SSD, and Faster R-CNN",
      "Used Roboflow for dataset management, augmentation, and model optimization",
    ],
    projects: [
      { name: "Elephant Detection & Alert System (5G Smart Pole)", detail: "Benchmarked YOLOv5s vs SSD vs Faster R-CNN for accuracy/latency trade-off." },
    ],
  },
  {
    role: "B.Eng. Computer & Robotics Engineering",
    company: "Bangkok University",
    period: "2020 – 2024",
    duration: "4 years",
    location: "Bangkok, Thailand",
    active: false,
    type: "education" as const,
    stack: ["C / C++", "C#", "Python", "Assembly", "MySQL", "PostgreSQL", "Arduino", "PlatformIO", "LVGL"],
    responsibilities: [
      "Graduated with First-Class Honors — GPA 3.53 / 4.00",
      "Senior project recognized by faculty for hardware + software integration",
      "Strong foundation across embedded systems, databases, AI/ML, and software engineering",
    ],
    projects: [
      { name: "Senior Project: Smart Pill Dispenser", detail: "IoT medication dispenser — PostgreSQL backend, C# REST API, LVGL embedded UI, PlatformIO firmware." },
      { name: "Purchase Reader Bot (UiPath)", detail: "Automated data extraction from purchase orders using UiPath + OCR." },
      { name: "Logistics Management System", detail: "Console application — C programming." },
      { name: "Bus Schedule System", detail: "Relational schema + queries — MySQL." },
      { name: "Smart Farm Watering System", detail: "Sensor-driven irrigation — Arduino." },
      { name: "Microprocessor Controller", detail: "Low-level register programming — Assembly Language." },
    ],
    workshops: [
      { name: "SAP Build Process Automation Workshop", detail: "Designed low-code workflow automations and approval processes; integrated with SAP applications and external services." },
      { name: "SAP Adoption Lab: End-to-End IDP", detail: "Hands-on with SAP AI Core + SAP Document AI for intelligent document processing in BTP." },
      { name: "SAP Adoption Lab: Central Entry Dashboard", detail: "Built centralized digital workplace with SAP Build Work Zone + SAP Mobile Start." },
    ],
  },
];

const PROJECTS: {
  accent: string;
  name: string;
  role: string;
  category: string;
  image: string;
  art: ArtTheme;
  desc: string;
  impact: { before: string; after: string };
  features: string[];
  tech: string[];
  stats: { v: string; l: string }[];
  links: { kind: string; href: string; label: string }[];
}[] = [
  {
    accent: "border-l-blue-600",
    name: "Sunrise LINE Bots Suite — Self-built Production System",
    role: "Founder & Solo Builder · 2025 – Present",
    category: "Personal · Production System",
    image: "/project-sunrise.jpg",
    art: "bot",
    desc: "End-to-end 2-bot LINE OA suite (KaiJa + Stock Sunrise) automating daily cafe operations — expense tracking, stock management, customer order intake, slip OCR payment, and Flex-based reporting. Designed, built, deployed, and operated solo.",
    impact: {
      before: "Daily bookkeeping + stock entry took ~30 min/day with frequent missed records.",
      after: "Reduced to ~5 min/day with zero silent webhook failures over 16+ weeks of continuous operation.",
    },
    features: [
      "Reply-200-First webhook (P95 < 1.5s on serverless)",
      "Idempotent webhook with CacheService dedup",
      "Defer queue for tasks > 60s (slip OCR) with retry + DLQ",
      "Adaptive Flex renderer with 1.2s build budget + 50KB guard",
      "3-tab Rich Menu via Switch Alias API",
      "Structured TRACE / INFO / WARN / ERROR logging",
    ],
    tech: ["Google Apps Script", "LINE Messaging API v2", "Flex Messages", "Rich Menu API", "Google Sheets", "CacheService"],
    stats: [{ v: "↓83%", l: "Manual effort" }, { v: "0", l: "Silent failures" }, { v: "< 1.5s", l: "P95 response" }],
    links: [{ kind: "github", href: "https://github.com/LayKanokporn", label: "GitHub" }],
  },
  {
    accent: "border-l-blue-500",
    name: "BG Alert Automation (SAP Bank Guarantee)",
    role: "ERP Developer · AIS · Sep 2025 – Present",
    category: "Financial Process Automation · SAP S/4HANA",
    image: "/project-bg-alert.jpg",
    art: "sap-monitor",
    desc: "Automated monitoring of Bank Guarantee expiration in SAP S/4HANA. Extracts BG data from Web GUI, classifies by expiration window (30 days / 7 days / expired), generates and distributes targeted email notifications.",
    impact: {
      before: "Manual periodic review of BG expirations — error-prone and slow to react.",
      after: "Automated daily monitoring with classified notifications routed to the right stakeholder group.",
    },
    features: [
      "BG data extraction from SAP Web GUI",
      "Classification logic for 30d / 7d / expired buckets",
      "Grouping + reporting per business unit",
      "Outlook email distribution with structured content",
      "Exception handling and run-level logging",
    ],
    tech: ["UiPath", "SAP Web GUI", "SAP S/4HANA", "Excel Automation", "Outlook Automation"],
    stats: [{ v: "Daily", l: "Coverage" }, { v: "Eliminated", l: "Manual monitor" }, { v: "Full", l: "Audit trail" }],
    links: [{ kind: "github", href: "https://github.com/LayKanokporn", label: "GitHub" }],
  },
  {
    accent: "border-l-amber-500",
    name: "Payment Advice Automation (Power Automate + AI Builder OCR)",
    role: "ERP Developer · AIS · Sep 2025 – Present",
    category: "Document AI · Power Platform · Finance",
    image: "/project-payment-advice.jpg",
    art: "document-ocr",
    desc: "End-to-end Power Automate Cloud Flow with AI Builder OCR — extracts payment data from incoming documents, validates against SAP, and auto-generates + distributes payment advice via email.",
    impact: {
      before: "Payment advice manually keyed and emailed — error-prone, slow, no audit trail.",
      after: "OCR-driven extraction + SAP validation + automated email distribution with structured logging.",
    },
    features: [
      "AI Builder OCR for payment data extraction",
      "Field-level validation against SAP master data",
      "Auto-generation of payment advice per beneficiary",
      "Outlook distribution with delivery tracking",
      "Excel-based reconciliation and audit log",
    ],
    tech: ["Power Automate Cloud", "AI Builder (OCR)", "SAP", "Outlook", "Excel"],
    stats: [{ v: "AI Builder", l: "OCR engine" }, { v: "Reduced", l: "Manual entry" }, { v: "Auto", l: "Distributed" }],
    links: [{ kind: "github", href: "https://github.com/LayKanokporn", label: "GitHub" }],
  },
  {
    accent: "border-l-purple-600",
    name: "AI Code Assistant for Quality Assurance — PTT Digital",
    role: "Software Engineer · PTT Digital · Jan – Aug 2025",
    category: "AI · LLM · Code Quality Automation",
    image: "/project-ai-code-qa.jpg",
    art: "pipeline",
    desc: "AI-powered code review assistant that pre-screens pull requests against QA rule-set — lint, security/vulnerability scan, naming convention, and architecture pattern checks — before they reach senior reviewers. Presented live at PTT Digital YOU&AI Forward Together AI showcase.",
    impact: {
      before: "Senior reviewers spent hours per release running routine QA checks manually, slowing the release cycle and creating a review bottleneck.",
      after: "AI pre-screens every PR in seconds and surfaces only anomalies for human review — measured +75% QA productivity and 5-20% cost reduction per release cycle.",
    },
    features: [
      "PR diff extraction + AST-aware parsing",
      "Rule-engine for lint, naming, architecture patterns",
      "Security/vulnerability scanner integration",
      "Structured review summary auto-attached to PR",
      "Telemetry for productivity and cost-per-release metrics",
      "Presented at PTT Digital YOU&AI Forward Together AI showcase",
    ],
    tech: ["Python", "LLM Integration", "AST Parsing", "CI/CD Pipeline", "REST API"],
    stats: [{ v: "+75%", l: "QA productivity" }, { v: "5-20%", l: "Cost / release" }, { v: "Live demo", l: "PTT AI showcase" }],
    links: [{ kind: "github", href: "https://github.com/LayKanokporn", label: "GitHub" }],
  },
  {
    accent: "border-l-emerald-500",
    name: "Market Rate Maintenance (THOR & SOFR) — SAP S/4HANA OB83",
    role: "ERP Developer · AIS · Sep 2025 – Present",
    category: "SAP S/4HANA · Financial ERP Development",
    image: "/project-thor-sofr.jpg",
    art: "finance-rate",
    desc: "Enhanced SAP S/4HANA market rate maintenance process in transaction OB83 to support both THOR and SOFR reference rates. Redesigned rate classification to use Reference fields instead of date-based identification.",
    impact: {
      before: "Date-based rate identification — fragile, hard to maintain as new reference rates are introduced.",
      after: "Reference-field-based classification supporting THOR + SOFR cleanly, extensible to future rates.",
    },
    features: [
      "OB83 enhancement supporting THOR + SOFR rates",
      "Reference-field-based rate classification",
      "Backward-compatible with existing rate data",
      "Business-validated test scenarios with finance users",
      "Documented change for downstream financial processes",
    ],
    tech: ["SAP S/4HANA", "OB83", "API Integration", "Financial Process Automation"],
    stats: [{ v: "THOR + SOFR", l: "Rate types" }, { v: "Reference", l: "Classification" }, { v: "Improved", l: "Maintainability" }],
    links: [{ kind: "github", href: "https://github.com/LayKanokporn", label: "GitHub" }],
  },
  {
    accent: "border-l-cyan-500",
    name: "Real-time Computer Vision Pipeline (YOLOv5)",
    role: "Software Engineer · PTT Digital · Feb – Apr 2024",
    category: "Computer Vision · Content QA",
    image: "/project-traffic-light.jpg",
    art: "vision-grid",
    desc: "High-throughput image classification pipeline using YOLOv5 + OCR for content validation and false-positive reduction — applicable to content moderation, image quality QA, and large-scale visual data verification.",
    impact: {
      before: "Manual verification of traffic violations with 40% false positive rate.",
      after: "Automated AI detection with 92.5% accuracy, reducing false alarms by 65%.",
    },
    features: [
      "YOLOv5 trained on 20 real Thai traffic scenarios",
      "OCR integration with EasyOCR for GPS extraction",
      "Geopy distance calculation (60m proximity)",
      "Automated CSV/database logging",
      "Real-time video processing pipeline",
    ],
    tech: ["YOLOv5", "Python", "OpenCV", "EasyOCR", "Geopy", "GPS"],
    stats: [{ v: "92.5%", l: "Model accuracy" }, { v: "↓65%", l: "False alarms" }, { v: "120h", l: "Saved / month" }],
    links: [{ kind: "github", href: "https://github.com/LayKanokporn", label: "GitHub" }],
  },
  {
    accent: "border-l-violet-500",
    name: "Document Intelligence Pipeline (OCR + Validation)",
    role: "RPA Developer · Mar 2024",
    category: "Document AI · Data Extraction",
    image: "/project-purchase-reader.jpg",
    art: "document-ocr",
    desc: "End-to-end document processing pipeline extracting structured data from heterogeneous sources (PDF, scanned forms, handwriting) using OCR + regex + validation rules.",
    impact: {
      before: "Manual data entry from purchase orders: 4–6 min per document, 15% error rate.",
      after: "Automated extraction with 98.34% accuracy in under 30 seconds per document.",
    },
    features: [
      "Multi-format document processing (PDF, scanned, handwriting)",
      "Advanced OCR with Tesseract and regex pattern matching",
      "Intelligent error detection and exception handling",
      "Real-time accuracy dashboard",
      "Scalable workflow architecture",
    ],
    tech: ["UiPath", "Tesseract OCR", "Regex", "Excel", "SQL Server"],
    stats: [{ v: "98.34%", l: "Data extraction" }, { v: "↓90%", l: "Time saved" }, { v: "80h", l: "Saved / month" }],
    links: [{ kind: "github", href: "https://github.com/LayKanokporn", label: "GitHub" }],
  },
  {
    accent: "border-l-rose-500",
    name: "Multi-Source Inventory Sync API",
    role: "Automation Developer · Jul 2024",
    category: "API Integration · Data Pipeline",
    image: "/project-tiktok-api.jpg",
    art: "pipeline",
    desc: "Real-time data synchronization service between a central PostgreSQL source-of-truth and an external distribution channel via authenticated REST APIs — scheduled, idempotent, with alerting.",
    impact: {
      before: "Manual inventory updates 2–3 times daily, frequent overselling incidents.",
      after: "Automated 10-minute interval updates with zero overselling incidents.",
    },
    features: [
      "Secure API authentication (HMAC signature)",
      "Real-time PostgreSQL synchronization",
      "Scheduled CronJob (10-minute intervals)",
      "Comprehensive error logging + email alerting",
      "JSON data transformation pipeline",
    ],
    tech: ["Python", "REST API", "JSON", "CronJob", "PostgreSQL"],
    stats: [{ v: "0", l: "Oversell incidents" }, { v: "↓100%", l: "Manual work" }, { v: "99.9%", l: "Reliability" }],
    links: [{ kind: "github", href: "https://github.com/LayKanokporn", label: "GitHub" }],
  },
  {
    accent: "border-l-orange-500",
    name: "Smart Pill Dispenser (Senior Project)",
    role: "Embedded System Developer · Jan – May 2023",
    category: "IoT · Embedded · Award Winner",
    image: "/project-pill-dispenser.jpg",
    art: "iot",
    desc: "Award-winning IoT medication dispenser with intelligent scheduling, database integration, and embedded UI.",
    impact: {
      before: "Manual medication scheduling with 30% adherence rate.",
      after: "Automated dispensing with smart reminders achieving 95% medication adherence.",
    },
    features: [
      "PostgreSQL DB for medication and patient management",
      "C# REST API for device-cloud communication",
      "LVGL-based embedded UI with touch interface",
      "Precision stepper motor control with RTC timing",
      "WiFi connectivity and remote monitoring",
    ],
    tech: ["PostgreSQL", "C#", "LVGL", "IoT", "Stepper Motor", "RTC", "PlatformIO"],
    stats: [{ v: "95%", l: "Adherence rate" }, { v: "Faculty", l: "Award" }, { v: "↓60%", l: "Missed doses" }],
    links: [{ kind: "github", href: "https://github.com/LayKanokporn", label: "GitHub" }],
  },
];

const CERTIFICATIONS = [
  { title: "UiPath RPA Developer Foundation", issuer: "UiPath Academy", date: "2023", level: "Foundation", skills: ["Process Automation", "Studio Development", "Orchestrator"] },
  { title: "Blue Prism Developer Certification", issuer: "Blue Prism University", date: "2023", level: "Professional", skills: ["Process Studio", "Object Studio", "Control Room"] },
  { title: "Python for Automation & Data Science", issuer: "Coursera", date: "2022", level: "Intermediate", skills: ["Pandas", "NumPy", "Automation Scripts"] },
  { title: "AI & Computer Vision with YOLO", issuer: "Online Workshop", date: "2022", level: "Advanced", skills: ["YOLO", "OpenCV", "Deep Learning"] },
  { title: "Docker & Containerization", issuer: "Udemy", date: "2021", level: "Intermediate", skills: ["Docker", "Kubernetes", "DevOps"] },
  { title: "PostgreSQL Database Management", issuer: "Online Course", date: "2021", level: "Intermediate", skills: ["SQL", "Database Design", "Performance Tuning"] },
];

const CONTINUOUS_LEARNING = [
  "Regular participation in automation webinars",
  "Active in RPA developer communities",
  "Following latest AI/ML trends and tools",
  "Exploring SAP BTP and enterprise platforms",
];

// ─── COMPONENT ────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = React.useMemo(
    () => NAV_TABS.map((t) => t.href.replace("#", "")),
    []
  );
  const activeSection = useActiveSection(sectionIds);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        Swal.fire({
          title: "Message Sent!",
          text: "I'll get back to you soon!",
          icon: "success",
          confirmButtonColor: "#1a56db",
        });
        const form = e.target as HTMLFormElement;
        form?.reset?.();
      } else {
        throw new Error(result.message);
      }
    } catch {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#1a56db",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e] text-[#111827] dark:text-[#f1f5f9]">
      <ScrollProgressBar />
      <FloatingHireButton />
      <FloatingTOC items={NAV_TABS.map((t) => ({ id: t.href.replace("#", ""), label: t.label }))} />
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
                      ? "text-[#1a56db] border-[#1a56db]"
                      : "text-[#6b7280] border-transparent hover:text-[#111827] hover:border-[#1a56db]/60"
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
            className="hidden sm:inline-block text-[12px] px-3.5 py-1.5 rounded-md border border-[#e5e7eb] text-[#111827] hover:bg-[#f8faff] transition-colors"
          >
            Resume
          </a>
          <DarkModeToggle />
          <a
            href="#contact"
            className="text-[12px] px-3 sm:px-3.5 py-1.5 rounded-md bg-[#1a56db] hover:bg-[#1e40af] text-white font-medium transition-colors"
          >
            Hire&nbsp;Me
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#e5e7eb] text-[#111827] hover:bg-[#f8faff]"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-[#111827]/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[280px] max-w-[85%] bg-white dark:bg-[#0f172a] border-l border-[#e5e7eb] dark:border-[#1e293b] shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 h-[52px] border-b border-[#e5e7eb]">
              <Logo variant="compact" theme="light" />
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md hover:bg-[#f8faff]"
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
                  className="block px-5 py-2.5 text-[13px] text-[#374151] hover:bg-[#f8faff] hover:text-[#1a56db] transition-colors"
                >
                  {t.label}
                </a>
              ))}
            </nav>
            <div className="border-t border-[#e5e7eb] p-4 space-y-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[12px] px-3 py-2 rounded-md border border-[#e5e7eb] text-[#111827] hover:bg-[#f8faff]"
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

      {/* MASTHEAD with full Logo */}
      <section className="relative border-b border-[#e5e7eb] bg-[#f8faff] py-10 sm:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute -right-32 -top-32 w-96 h-96 orb-blue pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-72 h-72 orb-amber opacity-40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-7">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#6b7280] bg-white border border-[#e5e7eb] px-2.5 py-1 rounded mb-5">
            <FiMapPin className="text-sm" />
            Bangkok, Thailand · Available globally
          </div>
          <div className="text-[22px] sm:text-[28px] mb-4">
            <Logo variant="full" theme="light" showSubtitle />
          </div>
          <p className="text-[13px] sm:text-[14px] text-[#374151] max-w-3xl leading-relaxed">
            {POSITIONING.intro}
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" title="About">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left: positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
              <p className="text-[13px] text-[#374151] leading-relaxed mb-3">{POSITIONING.body}</p>
              <p className="text-[13px] text-[#374151] leading-relaxed mb-4">{POSITIONING.toolkit}</p>
              <blockquote className="border-l-2 border-[#1a56db] pl-4 text-[13px] italic text-[#374151] leading-relaxed">
                {POSITIONING.quote}
              </blockquote>

              {/* Presented at — proof banner with real event photo */}
              <a
                href="#projects"
                className="mt-5 block group relative rounded-md overflow-hidden border border-[#e5e7eb] hover:border-[#1a56db]/40 transition-all"
              >
                <div className="relative min-h-[280px] sm:min-h-[420px] bg-gradient-to-br from-[#0c2463] to-[#1a5fb4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/event-you-ai-forward.jpg"
                    alt="Lay presenting AI Code Assistant for QA at PTT Digital YOU&AI Forward Together AI showcase"
                    className="absolute inset-0 w-full h-full object-contain opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider px-2 py-1 rounded bg-black/40 backdrop-blur-sm text-white border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Live presentation
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="text-[11.5px] sm:text-[13px] font-medium leading-tight">
                      Presented at YOU&amp;AI Forward Together
                    </div>
                    <div className="text-[10px] sm:text-[11px] opacity-85 mt-0.5">
                      PTT Digital · YOU&AI Forward Together · AI Code Assistant for QA (+75% productivity)
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Capabilities row */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
              <h3 className="text-[11px] uppercase tracking-wider text-[#6b7280] mb-3">
                Immediate impact
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {CAPABILITIES.map((c) => (
                  <a
                    key={c.capability}
                    href={c.href}
                    className="group flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-[#f8faff] border border-[#e5e7eb] hover:border-[#1a56db]/40 hover:bg-[#e0e7ff] transition-colors"
                  >
                    <span className="text-[12px] text-[#111827] inline-flex items-center gap-1.5">
                      {c.capability}
                      <FiArrowRight className="opacity-0 group-hover:opacity-100 text-[#1a56db] transition-opacity" />
                    </span>
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {c.impact}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Technical Expertise cards — Years + Project count */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
              <h3 className="text-[11px] uppercase tracking-wider text-[#6b7280] mb-3">
                Technical expertise
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {TECH_EXPERTISE.map((t) => (
                  <a
                    key={t.title}
                    href={t.href}
                    className="group p-3 rounded-md border border-[#e5e7eb] bg-[#f8faff] hover:border-[#1a56db]/40 hover:shadow-sm transition-all block"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-[12.5px] font-medium text-[#111827] leading-snug">
                        {t.title}
                      </div>
                      <FiArrowRight className="text-[#9ca3af] group-hover:text-[#1a56db] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <span className="text-[10px] text-[#1a56db] bg-[#e0e7ff] border border-[#c7d2fe] px-2 py-0.5 rounded-full">
                        {t.years}
                      </span>
                      {t.cert && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          {t.cert}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#6b7280] mt-1.5">{t.projects}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: facts + actions */}
          <aside className="space-y-3">
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
              <h3 className="text-[11px] uppercase tracking-wider text-[#6b7280] mb-3">
                Snapshot
              </h3>
              <ul className="space-y-2 text-[12px]">
                <FactRow label="Role" value="ERP Developer & Automation Engineer" />
                <FactRow label="Specialization" value="SAP · RPA · AI" />
                <FactRow label="Education" value="Computer & Robotics Eng." />
                <FactRow label="GPA" value="3.53 / 4.00 (First-Class)" />
                <FactRow label="Location" value="Bangkok, Thailand" />
              </ul>
            </div>
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
              <h3 className="text-[11px] uppercase tracking-wider text-[#6b7280] mb-3">
                Languages
              </h3>
              <ul className="space-y-1.5 text-[12px]">
                <li className="flex justify-between">
                  <span className="text-[#374151]">Thai</span>
                  <span className="text-[#6b7280]">Native</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="text-[#374151]">English</span>
                  <span className="text-[#6b7280] text-right">Intermediate (Working)</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-[12px] font-medium bg-[#1a56db] hover:bg-[#1e40af] text-white px-4 py-2 rounded-md transition-colors"
              >
                <FiDownload /> Download Resume
              </a>
              <a
                href="/transcript.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-[12px] bg-white border border-[#e5e7eb] text-[#111827] px-4 py-2 rounded-md hover:bg-[#f8faff] transition-colors"
              >
                <FiFileText /> View Transcript
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 text-[12px] bg-white border border-[#e5e7eb] text-[#111827] px-4 py-2 rounded-md hover:bg-[#f8faff] transition-colors"
              >
                <FiArrowRight /> View Projects
              </a>
            </div>
          </aside>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills & Expertise">
        <p className="text-[12px] text-[#6b7280] mb-4 max-w-2xl">
          Tools I use to engineer SAP, RPA, API, and AI into measurable business process improvement.
        </p>
        <div className="grid lg:grid-cols-2 gap-4">
          {SKILL_GROUPS.map((g) => (
            <div
              key={g.name}
              className={`rounded-lg border bg-white p-5 ${
                g.priority ? "border-[#1a56db]/30 ring-1 ring-[#e0e7ff]" : "border-[#e5e7eb]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[12px] font-medium uppercase tracking-wider text-[#111827]">
                  {g.name}
                </h3>
                {g.priority && (
                  <span className="text-[10px] text-[#1a56db] bg-[#e0e7ff] border border-[#c7d2fe] px-2 py-0.5 rounded-full">
                    Priority
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.tags.map((t) => {
                  const hi = g.highlights.includes(t);
                  return (
                    <span
                      key={t}
                      className={`text-[11px] px-2.5 py-1 rounded border ${
                        hi
                          ? "bg-[#e0e7ff] text-[#1a56db] border-[#c7d2fe]"
                          : "bg-[#f8faff] text-[#374151] border-[#e5e7eb]"
                      }`}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE — with vertical timeline rail */}
      <Section id="experience" title="Experience">
        <div className="relative space-y-4 lg:pl-6">
          {/* Timeline rail (desktop only) */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-[#1a56db] via-[#e5e7eb] to-transparent"
          />
          {EXPERIENCE.map((e) => (
            <div
              key={e.role + e.company}
              className="relative rounded-lg border border-[#e5e7eb] bg-white p-5"
            >
              {/* Timeline dot */}
              <span
                aria-hidden
                className={`hidden lg:block absolute -left-[27px] top-6 w-3 h-3 rounded-full ring-4 ring-[#f8faff] ${
                  e.active
                    ? "bg-emerald-500"
                    : e.type === "education"
                      ? "bg-amber-500"
                      : "bg-[#1a56db]"
                }`}
              />
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-[15px] font-medium text-[#111827]">{e.role}</h3>
                    {e.active && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Current
                      </span>
                    )}
                    {e.type === "education" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
                        <FiBookOpen className="text-[10px]" /> Education
                      </span>
                    )}
                  </div>
                  <div className="text-[13px] text-[#1a56db]">{e.company}</div>
                  <div className="text-[11px] text-[#6b7280]">{e.location}</div>
                </div>
                <div className="text-left lg:text-right">
                  <div className="text-[12px] text-[#111827]">{e.period}</div>
                  <div className="text-[11px] text-[#6b7280]">{e.duration}</div>
                </div>
              </div>

              {/* Tech — clickable to skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {e.stack.map((s) => (
                  <a
                    key={s}
                    href="#skills"
                    className="text-[10px] text-[#374151] bg-[#f8faff] border border-[#e5e7eb] px-2 py-0.5 rounded hover:bg-[#e0e7ff] hover:text-[#1a56db] hover:border-[#c7d2fe] transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>

              {/* Responsibilities */}
              <div className="mb-4">
                <h4 className="text-[11px] uppercase tracking-wider text-[#6b7280] mb-2">
                  {e.type === "education" ? "Highlights" : "Key responsibilities"}
                </h4>
                <ul className="space-y-1.5">
                  {e.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[12.5px] text-[#374151]">
                      <FiCheck className="text-[#1a56db] mt-1 shrink-0" />
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              {e.projects && e.projects.length > 0 && (
                <div className="pt-4 border-t border-[#e5e7eb]">
                  <h4 className="text-[11px] uppercase tracking-wider text-[#6b7280] mb-2.5">
                    {e.type === "education" ? "Academic projects" : "Projects delivered"}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {e.projects.map((p) => (
                      <a
                        key={p.name}
                        href="#projects"
                        className="group block p-2.5 rounded-md border border-[#e5e7eb] bg-[#f8faff] hover:border-[#1a56db]/40 hover:bg-[#e0e7ff] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-1 mb-0.5">
                          <div className="text-[12px] font-medium text-[#111827] group-hover:text-[#1a56db] transition-colors leading-snug">
                            {p.name}
                          </div>
                          <FiArrowRight className="text-[#9ca3af] group-hover:text-[#1a56db] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5 text-[11px]" />
                        </div>
                        <div className="text-[11px] text-[#6b7280] leading-relaxed">{p.detail}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Workshops (education only) */}
              {"workshops" in e && e.workshops && e.workshops.length > 0 && (
                <div className="pt-4 mt-4 border-t border-[#e5e7eb]">
                  <h4 className="text-[11px] uppercase tracking-wider text-amber-700 mb-2.5">
                    Workshops & Adoption Labs
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {e.workshops.map((w) => (
                      <div
                        key={w.name}
                        className="p-2.5 rounded-md border border-amber-200 bg-amber-50/50"
                      >
                        <div className="text-[12px] font-medium text-[#111827] mb-0.5">
                          {w.name}
                        </div>
                        <div className="text-[11px] text-[#6b7280] leading-relaxed">{w.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats summary */}
        <div className="mt-6 rounded-lg border border-[#1a56db]/30 bg-[#f8faff] p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <StatCell value="4" label="Professional roles" />
            <StatCell value="3" label="Organizations" />
            <StatCell value="15+" label="Projects (work + academic)" />
            <StatCell value="3.53" label="GPA · First-Class" />
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects">
        <p className="text-[12px] text-[#6b7280] mb-4 max-w-2xl">
          Production systems and case studies — measurable outcomes, honest framing, and reusable patterns.
        </p>
        <div className="grid lg:grid-cols-2 gap-4">
          {PROJECTS.map((p) => (
            <div
              key={p.name}
              className={`rounded-lg border border-[#e5e7eb] border-l-4 ${p.accent} bg-white overflow-hidden`}
            >
              {/* Visual — real screenshot if available, else SVG art fallback */}
              <div className="relative w-full h-44 bg-[#f8faff] dark:bg-[#0a0f1e] border-b border-[#e5e7eb] dark:border-[#1e293b] overflow-hidden">
                <ProjectArt theme={p.art} ariaLabel={p.name} />
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-[10px] text-[#6b7280] mb-2 flex-wrap">
                  <span className="bg-[#f8faff] border border-[#e5e7eb] px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                </div>
                <h3 className="text-[14px] font-medium text-[#111827] mb-1 leading-snug">
                  {p.name}
                </h3>
                <div className="text-[11px] text-[#6b7280] mb-3">{p.role}</div>

                <p className="text-[12.5px] text-[#374151] leading-relaxed mb-3">{p.desc}</p>

                {/* Before/After */}
                <div className="rounded-md border border-[#e5e7eb] bg-[#f8faff] p-3 mb-3 text-[12px]">
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#6b7280] shrink-0 mt-0.5">
                      Before
                    </span>
                    <span className="text-[#374151] leading-relaxed">{p.impact.before}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#1a56db] shrink-0 mt-0.5">
                      After
                    </span>
                    <span className="text-[#111827] leading-relaxed">{p.impact.after}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-3">
                  <h4 className="text-[10px] uppercase tracking-wider text-[#6b7280] mb-1.5">
                    Features
                  </h4>
                  <ul className="space-y-1">
                    {p.features.map((f) => (
                      <li key={f} className="text-[12px] text-[#374151] flex items-start gap-2">
                        <span className="text-[#1a56db] mt-1 leading-none">·</span>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech — clickable */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tech.map((t) => (
                    <a
                      key={t}
                      href="#skills"
                      className="text-[10px] text-[#374151] bg-[#f8faff] border border-[#e5e7eb] px-2 py-0.5 rounded hover:bg-[#e0e7ff] hover:text-[#1a56db] hover:border-[#c7d2fe] transition-colors"
                    >
                      {t}
                    </a>
                  ))}
                </div>

                {/* Stats + GitHub link */}
                <div className="flex items-end justify-between border-t border-[#e5e7eb] pt-3">
                  <div className="flex gap-4">
                    {p.stats.map((s) => (
                      <div key={s.l}>
                        <div className="text-[13px] font-medium text-[#1a56db] leading-none">
                          {s.v}
                        </div>
                        <div className="text-[10px] text-[#6b7280] mt-1">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {p.links.map((lk) => (
                      <a
                        key={lk.kind}
                        href={lk.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#1a56db] hover:underline"
                      >
                        {lk.kind === "github" ? <FiGithub /> : <FiExternalLink />}
                        {lk.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SIMULATOR — Try It Live */}
      <Section id="simulator" title="Try it live">
        <p className="text-[12px] text-[#6b7280] mb-4 max-w-2xl">
          Three production workflows I built, simulated step-by-step with realistic timings and JSON output —
          the same patterns running in SAP, Power Automate, and on LINE every day.
        </p>
        <AutomationSimulator />
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" title="Certificates & Training">
        <p className="text-[12px] text-[#6b7280] mb-4 max-w-2xl">
          Professional certifications and continuous learning across automation, development, and emerging technologies.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CERTIFICATIONS.map((c) => (
            <div key={c.title} className="rounded-lg border border-[#e5e7eb] bg-white p-4">
              <div className="flex items-start justify-between mb-2">
                <FiAward className="text-[#1a56db] text-lg" />
                <span className="text-[10px] text-[#1a56db] bg-[#e0e7ff] border border-[#c7d2fe] px-2 py-0.5 rounded-full">
                  {c.level}
                </span>
              </div>
              <h3 className="text-[13px] font-medium text-[#111827] mb-1 leading-snug">
                {c.title}
              </h3>
              <div className="flex items-center justify-between text-[11px] mb-2.5">
                <span className="text-[#6b7280]">{c.issuer}</span>
                <span className="text-[#1a56db]">{c.date}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {c.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] text-[#374151] bg-[#f8faff] border border-[#e5e7eb] px-1.5 py-0.5 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-[#1a56db]/30 bg-[#f8faff] p-5">
          <h3 className="text-[12px] font-medium uppercase tracking-wider text-[#111827] mb-3 inline-flex items-center gap-2">
            <FiBookOpen className="text-[#1a56db]" /> Continuous Learning
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {CONTINUOUS_LEARNING.map((c) => (
              <div key={c} className="flex items-start gap-2 text-[12px] text-[#374151]">
                <span className="text-[#1a56db] mt-0.5 leading-none">·</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <div className="grid lg:grid-cols-[1fr_320px] gap-5">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-[#e5e7eb] bg-white p-5 space-y-3"
          >
            <h3 className="text-[12px] uppercase tracking-wider text-[#6b7280] mb-1">
              Send a message
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="contact-name" className="sr-only">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full border border-[#e5e7eb] bg-[#f8faff] rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#1a56db] focus:ring-1 focus:ring-[#1a56db] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Your email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full border border-[#e5e7eb] bg-[#f8faff] rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#1a56db] focus:ring-1 focus:ring-[#1a56db] transition-colors"
                />
              </div>
            </div>
            <label htmlFor="contact-message" className="sr-only">Your message</label>
            <textarea
              id="contact-message"
              name="message"
              required
              placeholder="Your message"
              rows={5}
              className="w-full border border-[#e5e7eb] bg-[#f8faff] rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#1a56db] focus:ring-1 focus:ring-[#1a56db] transition-colors resize-y"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 text-[12px] font-medium bg-[#1a56db] hover:bg-[#1e40af] disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors"
            >
              {isSubmitting ? "Sending…" : "Send message"}
              <FiArrowRight />
            </button>
          </form>

          {/* Direct contact methods */}
          <aside className="space-y-3">
            <ContactRow icon={<FiMail />} label="Email" value="laybabaka@gmail.com" href="mailto:laybabaka@gmail.com" />
            <ContactRow icon={<FiLinkedin />} label="LinkedIn" value="linkedin.com/in/laykanokporn" href="https://www.linkedin.com/in/laykanokporn" />
            <ContactRow icon={<FiGithub />} label="GitHub" value="github.com/LayKanokporn" href="https://github.com/LayKanokporn" />
            <ContactRow icon={<FiMapPin />} label="Location" value="Bangkok, Thailand" />
          </aside>
        </div>
      </Section>

      {/* CTA BAR */}
      <section className="bg-gradient-to-r from-[#0c2463] to-[#1a5fb4]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 sm:px-7 py-5">
          <div>
            <div className="text-[15px] font-medium text-white inline-flex items-center gap-2">
              <FiZap className="text-amber-300" />
              Ready to automate your next challenge?
            </div>
            <div className="text-[12px] text-white/70 mt-1">
              SAP · RPA · AI-powered workflows · Immediate availability
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
      <footer className="border-t border-[#e5e7eb] bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-[#6b7280]">
            © {new Date().getFullYear()} Kanokporn Hudsree · Bangkok, Thailand
          </span>
          <div className="flex items-center gap-4 text-[12px]">
            <a href="https://www.linkedin.com/in/laykanokporn" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a56db]">LinkedIn</a>
            <a href="https://github.com/LayKanokporn" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a56db]">GitHub</a>
            <a href="mailto:laybabaka@gmail.com" className="text-[#6b7280] hover:text-[#1a56db]">Email</a>
            <Link href="/" className="text-[#6b7280] hover:text-[#1a56db]">Home</Link>
            <Link href="/resume" className="text-[#6b7280] hover:text-[#1a56db]">Resume page</Link>
            <Link href="/v1" className="text-[#6b7280] hover:text-[#1a56db]">Creative version</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ─── SUB COMPONENTS ───────────────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  // Alternate section backgrounds: pure white vs tinted blue with dot pattern
  const tinted = ["about", "experience", "simulator", "contact"].includes(id);
  return (
    <section
      id={id}
      className={`relative border-b border-[#e5e7eb] py-8 sm:py-10 scroll-mt-16 overflow-hidden ${
        tinted ? "bg-[#f8faff]" : "bg-white"
      }`}
    >
      {tinted && <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-7">
        <h2 className="text-[11px] font-medium uppercase tracking-wider text-[#6b7280] mb-4 inline-flex items-center gap-2">
          {iconForSection(id)}
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function iconForSection(id: string) {
  const cls = "text-[#1a56db]";
  switch (id) {
    case "about":
      return <FiBriefcase className={cls} />;
    case "skills":
      return <FiCpu className={cls} />;
    case "experience":
      return <FiServer className={cls} />;
    case "projects":
      return <FiActivity className={cls} />;
    case "simulator":
      return <FiPlay className={cls} />;
    case "certifications":
      return <FiAward className={cls} />;
    case "contact":
      return <FiMail className={cls} />;
    default:
      return null;
  }
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-start justify-between gap-3">
      <span className="text-[#6b7280] shrink-0">{label}</span>
      <span className="text-[#111827] text-right">{value}</span>
    </li>
  );
}

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[20px] font-medium text-[#1a56db] tabular-nums">
        <AnimatedCounter value={value} />
      </div>
      <div className="text-[11px] text-[#6b7280] mt-1">{label}</div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="rounded-lg border border-[#e5e7eb] bg-white p-4 hover:border-[#1a56db]/40 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-[#f8faff] border border-[#e5e7eb] flex items-center justify-center text-[#1a56db] shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-[#6b7280]">{label}</div>
          <div className="text-[12.5px] text-[#111827] truncate">{value}</div>
        </div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
      {body}
    </a>
  ) : (
    body
  );
}

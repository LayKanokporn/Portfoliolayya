// Shared data across pages — no JSX here (icon data stays in page files)

export type HiringRole = "rpa" | "ai" | "sap";

export const ROLE_OPTIONS: { id: HiringRole; label: string }[] = [
  { id: "rpa", label: "RPA Developer" },
  { id: "ai", label: "AI Automation" },
  { id: "sap", label: "SAP · ERP" },
];

export type ProjectLink = { kind: "github" | "demo" | "case"; href: string; label: string };

export const PROJECTS: {
  accent: string;
  badges: string[];
  name: string;
  desc: string;
  image: string;
  art: string;
  stats: { v: string; l: string }[];
  links?: ProjectLink[];
  roles: HiringRole[];
}[] = [
  {
    accent: "bg-blue-600",
    badges: ["Personal project"],
    roles: ["rpa"],
    name: "Sunrise LINE Bots",
    desc: "Personal LINE bot suite built for a family cafe — async webhook, idempotent dedup, defer queue. 16 weeks of daily use: ↓83% manual effort, p95 <1.5s, zero silent failures. Patterns later reused in enterprise UiPath at AIS.",
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
    roles: ["rpa", "sap"],
    name: "BG Alert Automation",
    desc: "Problem: manual BG expiry review in SAP was slow, error-prone, and had no audit trail. Approach: pre-mortem on failure modes first, then UiPath bot extracting from Web GUI, classifying 30d / 7d / expired. Impact: manual compliance review eliminated, every alert email-traceable.",
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
    roles: ["rpa", "ai", "sap"],
    name: "Payment Advice Automation",
    desc: "Problem: payment advice manually keyed and emailed — error-prone, no trail. Approach: AI Builder OCR with ≥85% confidence gate, SAP master data validation, finance-owned review queue for failures. Impact: zero manual keying errors since deploy, SOX-grade audit trail per advice.",
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
    roles: ["ai"],
    name: "AI Code Assistant for QA (PTT Digital)",
    desc: "Hypothesis: an AI code review assistant can offload routine QA checks from senior reviewers and cut review cycle time. Measured at PTT Digital: +75% QA productivity, 5-20% release-cycle cost reduction. Presented live at PTT Digital YOU&AI Forward Together AI showcase.",
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
    roles: ["sap"],
    name: "Market Rate Maintenance (THOR & SOFR)",
    desc: "Problem: OB83 date-based rate classification couldn't support IBOR-replacement rates. Approach: reframed the root cause — classification model, not data entry — and redesigned around Reference fields. Impact: extensible rate management, compliant with IBOR transition.",
    image: "/project-thor-sofr.jpg",
    art: "finance-rate",
    stats: [
      { v: "THOR+SOFR", l: "Rate types" },
      { v: "Reference", l: "Classification" },
      { v: "Improved", l: "Maintainability" },
    ],
    links: [{ kind: "case", href: "/portfolio#projects", label: "Case study" }],
  },
  {
    accent: "bg-cyan-600",
    badges: ["PTT Digital", "Computer Vision"],
    roles: ["ai"],
    name: "Traffic Detection — YOLOv5 + OCR + GPS",
    desc: "Problem: manual monitoring of industrial traffic couldn't scale. Approach: computer vision pipeline — YOLOv5 vehicle detection, OCR plate reading, GPS coordinate matching. Impact: 92.5% detection accuracy in field conditions.",
    image: "/project-traffic-cv.jpg",
    art: "vision-grid",
    stats: [
      { v: "92.5%", l: "Detection accuracy" },
      { v: "YOLOv5", l: "+ OCR + GPS" },
      { v: "Field", l: "Deployed conditions" },
    ],
    links: [{ kind: "case", href: "/portfolio#projects", label: "Case study" }],
  },
];

export const AUTOMATIONS: {
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
    challenge: "Senior reviewers spent hours per release on routine QA checks.",
    solution: "AI code assistant that pre-screens PRs against QA rule-set and flags anomalies before human review.",
    flow: ["PR Diff Extract", "AI Rule Check", "Vulnerability Scan", "Review Summary"],
    results: [
      { v: "+75%", l: "QA productivity" },
      { v: "5-20%", l: "Cost / release" },
    ],
    href: "/portfolio#projects",
  },
  {
    title: "Traffic Detection CV Pipeline",
    tag: "YOLOv5 · OCR · GPS · PTT Digital",
    challenge: "Manual monitoring of industrial traffic couldn't scale across sites.",
    solution: "Vision pipeline: YOLOv5 detects vehicles, OCR reads plates, GPS matching pins each event to a site.",
    flow: ["Camera Feed", "YOLOv5 Detection", "OCR Plate Read", "GPS Site Match"],
    results: [
      { v: "92.5%", l: "Detection accuracy" },
      { v: "Automated", l: "Site monitoring" },
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

export const SKILL_GROUPS: {
  name: string;
  roles: HiringRole[];
  tags: { t: string; hi?: boolean; proof?: string }[];
}[] = [
  {
    name: "Enterprise & SAP",
    roles: ["sap"],
    tags: [
      { t: "SAP S/4HANA", hi: true, proof: "/projects" },
      { t: "SAP Build Process Automation", hi: true },
      { t: "SAP BTP" },
      { t: "SAP Document AI" },
      { t: "ERP Development" },
    ],
  },
  {
    name: "Automation & Scheduling",
    roles: ["rpa"],
    tags: [
      { t: "UiPath", hi: true, proof: "/projects" },
      { t: "Blue Prism", hi: true, proof: "/projects" },
      { t: "Power Automate", hi: true, proof: "/approach" },
      { t: "Power Apps", hi: true },
      { t: "CronJob" },
      { t: "Python Scheduling" },
      { t: "Process Optimization" },
    ],
  },
  {
    name: "Reliability & Observability",
    roles: ["rpa", "ai", "sap"],
    tags: [
      { t: "Structured logging", hi: true, proof: "/approach" },
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
    roles: ["ai"],
    tags: [
      { t: "AI Builder OCR", hi: true, proof: "/approach" },
      { t: "Tesseract OCR" },
      { t: "EasyOCR" },
      { t: "Intelligent Document Processing" },
      { t: "Computer Vision (YOLOv5)", proof: "/projects" },
    ],
  },
  {
    name: "Programming & Data",
    roles: ["ai", "rpa"],
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

export const SKILL_BARS = [
  { label: "SAP S/4HANA / ERP", pct: 88, color: "#0080a0" },
  { label: "UiPath / Blue Prism / RPA", pct: 85, color: "#fa4616" },
  { label: "Power Automate (Cloud + Desktop)", pct: 82, color: "#0066ff" },
  { label: "Python (Pandas, FastAPI, asyncio)", pct: 78, color: "#3776ab" },
  { label: "LINE Messaging API / GAS", pct: 80, color: "#06c755" },
  { label: "AI Builder / Document AI / OCR", pct: 72, color: "#742774" },
  { label: "SAP BTP / SAP Build Process Automation", pct: 70, color: "#0080a0" },
];

export const TIMELINE = [
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
    role: "Personal Project",
    company: "Sunrise LINE Bots — built for own use",
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

export const NAV_PAGES = [
  { label: "Home", href: "/", num: "01" },
  { label: "Projects", href: "/projects", num: "02" },
  { label: "Approach", href: "/approach", num: "03" },
  { label: "About", href: "/about-me", num: "04" },
];

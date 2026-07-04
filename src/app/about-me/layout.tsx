import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Lay · Automation Problem Solver",
  description:
    "Kanokporn Hudsree — ERP Developer & Automation Engineer at AIS. 2+ years experience, First-Class Honors (GPA 3.53), SAP/UiPath/Power Platform/AI Builder certified. Career timeline and skill proficiency.",
  openGraph: {
    title: "About — Kanokporn Hudsree",
    description: "Career timeline, skill proficiency, certifications. Bangkok-based Automation Problem Solver open to hybrid/on-site roles.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

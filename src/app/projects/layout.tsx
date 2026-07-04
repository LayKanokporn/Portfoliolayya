import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Lay · Automation Problem Solver",
  description:
    "6 featured projects: SAP S/4HANA automation, AI Builder OCR, UiPath bots, LINE chatbot suite, YOLOv5 traffic detection. Role-filtered portfolio with measurable results.",
  openGraph: {
    title: "Projects — Kanokporn Hudsree",
    description: "SAP · RPA · AI projects with measured impact: 83% ops cut, 0 silent failures, +75% QA productivity.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

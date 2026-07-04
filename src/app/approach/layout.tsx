import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approach — Lay · Automation Problem Solver",
  description:
    "Engineering principles: Problem Framing, Pre-mortem, Spec-first, Observable systems. Production reliability metrics, architecture diagrams, and decision log with trade-off reasoning.",
  openGraph: {
    title: "Approach — Kanokporn Hudsree",
    description: "How I build automation: frame → pre-mortem → spec-first → ship observable. Zero silent failures methodology.",
  },
};

export default function ApproachLayout({ children }: { children: React.ReactNode }) {
  return children;
}

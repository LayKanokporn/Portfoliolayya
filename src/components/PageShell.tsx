"use client";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { FloatingHireButton } from "@/components/FloatingHireButton";
import { BackToTop } from "@/components/BackToTop";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e] text-[#111827] dark:text-[#f1f5f9]">
      <ScrollProgressBar />
      <FloatingHireButton />
      <BackToTop />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0a0f1e]">
      <div className="max-w-6xl mx-auto px-5 sm:px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[11px] text-[#6b7280] dark:text-[#64748b]">
          © {new Date().getFullYear()} Kanokporn Hudsree · Bangkok, Thailand
        </span>
        <div className="flex items-center gap-4 text-[12px]">
          <a href="https://www.linkedin.com/in/laykanokporn" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a56db]">LinkedIn</a>
          <a href="https://github.com/LayKanokporn" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a56db]">GitHub</a>
          <a href="mailto:laybabaka@gmail.com" className="text-[#6b7280] hover:text-[#1a56db]">Email</a>
          <Link href="/projects" className="text-[#6b7280] hover:text-[#1a56db]">Projects</Link>
          <Link href="/approach" className="text-[#6b7280] hover:text-[#1a56db]">Approach</Link>
          <Link href="/about-me" className="text-[#6b7280] hover:text-[#1a56db]">About</Link>
        </div>
      </div>
    </footer>
  );
}

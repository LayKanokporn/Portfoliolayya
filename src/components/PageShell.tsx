"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { FloatingHireButton } from "@/components/FloatingHireButton";
import { BackToTop } from "@/components/BackToTop";
import { NAV_PAGES } from "@/data/portfolio";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e] text-[#111827] dark:text-[#f1f5f9] pb-14 lg:pb-0">
      <ScrollProgressBar />
      <FloatingHireButton />
      <BackToTop />
      <Nav />
      {children}
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 lg:hidden border-t border-[#e5e7eb] dark:border-[#1e293b] bg-white/95 dark:bg-[#0a0f1e]/95 backdrop-blur-md">
      <div className="grid grid-cols-4 h-14">
        {NAV_PAGES.map((p) => {
          const isActive = p.href === pathname || (p.href !== "/" && pathname.startsWith(p.href));
          return (
            <Link
              key={p.href}
              href={p.href}
              className={`flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors ${
                isActive
                  ? "text-[#1a56db] dark:text-[#60a5fa]"
                  : "text-[#9ca3af] dark:text-[#64748b]"
              }`}
            >
              <span className="text-[9px] tabular-nums opacity-60">{p.num}</span>
              <span className="font-medium">{p.label}</span>
              {isActive && <span className="w-3 h-[2px] rounded-full bg-[#1a56db] dark:bg-[#60a5fa] mt-0.5" />}
            </Link>
          );
        })}
      </div>
    </nav>
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

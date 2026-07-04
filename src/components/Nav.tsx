"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Logo } from "@/components/Logo";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { MagneticButton } from "@/components/MagneticButton";
import { NAV_PAGES } from "@/data/portfolio";

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentPage = NAV_PAGES.find(
    (p) => p.href === pathname || (p.href !== "/" && pathname.startsWith(p.href))
  );

  return (
    <>
      <nav className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-7 h-[52px] border-b border-[#e5e7eb] dark:border-[#1e293b] bg-white/95 dark:bg-[#0a0f1e]/95 backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <Link href="/" className="text-[20px] leading-none shrink-0">
            <Logo variant="compact" theme="light" />
          </Link>
          <div className="hidden lg:flex">
            {NAV_PAGES.map((p) => {
              const isActive = p.href === pathname || (p.href !== "/" && pathname.startsWith(p.href));
              return (
                <Link
                  key={p.label}
                  href={p.href}
                  className={`px-3 h-[52px] flex items-center text-[12px] border-b-2 transition-colors gap-1.5 ${
                    isActive
                      ? "text-[#1a56db] dark:text-[#60a5fa] border-[#1a56db] dark:border-[#60a5fa]"
                      : "text-[#6b7280] dark:text-[#94a3b8] border-transparent hover:text-[#111827] dark:hover:text-[#f1f5f9] hover:border-[#1a56db]/60"
                  }`}
                >
                  <span className="text-[10px] tabular-nums opacity-40 mr-1">{p.num}</span>
                  {p.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {currentPage && (
            <span className="hidden sm:inline text-[10px] tabular-nums text-[#9ca3af] dark:text-[#64748b] tracking-wider">
              {currentPage.num} / {String(NAV_PAGES.length).padStart(2, "0")}
            </span>
          )}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="hidden sm:inline-block text-[12px] px-3.5 py-1.5 rounded-md border border-[#e5e7eb] dark:border-[#334155] text-[#111827] dark:text-[#e2e8f0] hover:bg-[#f8faff] dark:hover:bg-[#1e293b] transition-colors"
          >
            Resume
          </a>
          <DarkModeToggle />
          <MagneticButton
            as="a"
            href="mailto:laybabaka@gmail.com"
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
              {NAV_PAGES.map((p) => (
                <Link
                  key={p.label}
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-[13px] text-[#374151] dark:text-[#cbd5e1] hover:bg-[#f8faff] dark:hover:bg-[#1e293b] hover:text-[#1a56db]"
                >
                  <span className="text-[10px] tabular-nums text-[#9ca3af] w-4">{p.num}</span>
                  {p.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-[#e5e7eb] p-4 space-y-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="block text-center text-[12px] px-3 py-2 rounded-md border border-[#e5e7eb] dark:border-[#334155] text-[#111827] dark:text-[#e2e8f0] hover:bg-[#f8faff] dark:hover:bg-[#1e293b]"
              >
                Download Resume (PDF)
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
    </>
  );
}

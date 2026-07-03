"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiCopy, FiCheck, FiLinkedin, FiFileText, FiX } from "react-icons/fi";

const EMAIL = "laybabaka@gmail.com";

/**
 * Floating "Hire Me" pill — appears bottom-right after the user scrolls
 * past the hero. Opens a mini contact popover so visitors can reach out
 * from anywhere on the page without scrolling to #contact.
 */
export function FloatingHireButton({
  threshold = 480,
  label = "Hire Me",
}: {
  threshold?: number;
  label?: string;
}) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (http / permissions) — fall back to mailto
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div ref={rootRef}>
      <AnimatePresence>
        {show && open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="fixed bottom-[70px] right-5 sm:bottom-[76px] sm:right-6 z-40 w-[230px] rounded-xl border border-[#e5e7eb] dark:border-[#334155] bg-white dark:bg-[#0f172a] shadow-xl p-2"
          >
            <div className="px-2 pt-1.5 pb-2 text-[11px] text-[#6b7280] dark:text-[#94a3b8]">
              I reply within 24 hours
            </div>
            <button
              onClick={copyEmail}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] text-[#111827] dark:text-[#e2e8f0] hover:bg-[#f8faff] dark:hover:bg-[#1e293b] transition-colors"
            >
              {copied ? <FiCheck className="text-[#059669]" /> : <FiCopy className="text-[#1a56db]" />}
              <span className="min-w-0 truncate">{copied ? "Copied ✓" : EMAIL}</span>
            </button>
            <a
              href="https://www.linkedin.com/in/laykanokporn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] text-[#111827] dark:text-[#e2e8f0] hover:bg-[#f8faff] dark:hover:bg-[#1e293b] transition-colors"
            >
              <FiLinkedin className="text-[#0a66c2]" /> LinkedIn profile
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] text-[#111827] dark:text-[#e2e8f0] hover:bg-[#f8faff] dark:hover:bg-[#1e293b] transition-colors"
            >
              <FiFileText className="text-[#d97706]" /> Resume (PDF)
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <motion.button
            onClick={() => setOpen((v) => !v)}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 text-[12px] font-medium bg-[#1a56db] hover:bg-[#1e40af] text-white px-4 py-2.5 rounded-full shadow-lg shadow-[#1a56db]/25 hover:shadow-xl transition-all"
            aria-label="Contact Lay"
            aria-expanded={open}
          >
            {open ? <FiX /> : <FiMail />}
            {label}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FloatingHireButton;

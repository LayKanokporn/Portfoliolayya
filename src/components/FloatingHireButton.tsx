"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail } from "react-icons/fi";

/**
 * Floating "Hire Me" pill — appears bottom-right after the user scrolls
 * past the hero. Mobile-prominent (visible always after threshold),
 * desktop-subtle (smaller offset).
 */
export function FloatingHireButton({
  href = "#contact",
  threshold = 480,
  label = "Hire Me",
}: {
  href?: string;
  threshold?: number;
  label?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 text-[12px] font-medium bg-[#1a56db] hover:bg-[#1e40af] text-white px-4 py-2.5 rounded-full shadow-lg shadow-[#1a56db]/25 hover:shadow-xl transition-all"
          aria-label="Contact Lay"
        >
          <FiMail />
          {label}
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default FloatingHireButton;

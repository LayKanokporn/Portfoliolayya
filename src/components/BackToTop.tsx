"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.18 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-50 w-9 h-9 rounded-full bg-white dark:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#334155] shadow-md flex items-center justify-center text-[#6b7280] dark:text-[#94a3b8] hover:text-[#1a56db] dark:hover:text-[#3b82f6] hover:border-[#1a56db] dark:hover:border-[#3b82f6] transition-all"
        >
          <FiArrowUp size={14} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

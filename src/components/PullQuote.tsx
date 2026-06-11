"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * PullQuote — large editorial pull quote with serif accent quotation mark.
 * Used between sections to break up dense text blocks and add personality.
 */
export function PullQuote({
  children,
  attribution,
  className = "",
}: {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`relative max-w-3xl mx-auto py-2 ${className}`}
    >
      {/* Giant serif open-quote — purely decorative */}
      <span
        aria-hidden
        className="serif-accent absolute -top-2 -left-2 sm:-top-6 sm:-left-4 text-[80px] sm:text-[120px] leading-none text-[#1a56db]/15 select-none pointer-events-none"
      >
        “
      </span>
      <blockquote className="relative text-[16px] sm:text-[20px] leading-relaxed text-[#111827] font-normal">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-[11px] uppercase tracking-wider text-[#6b7280] flex items-center gap-2">
          <span className="h-px w-8 bg-[#1a56db]" />
          {attribution}
        </figcaption>
      )}
    </motion.figure>
  );
}

export default PullQuote;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Side = "right" | "bottom" | "left" | "top";

/**
 * HoverCard — opens on hover (desktop) or tap (mobile / touch).
 * - Closes on mouse leave (with 150ms grace), Escape, or outside click.
 * - Re-positions automatically using `side`.
 * - Touch-friendly: tapping the trigger toggles open.
 */
export function HoverCard({
  trigger,
  content,
  side = "right",
  align = "start",
  width = 280,
  triggerClassName = "",
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: Side;
  align?: "start" | "center" | "end";
  width?: number;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const sideClass = {
    right: "left-full top-0 ml-2",
    left: "right-full top-0 mr-2",
    bottom: "top-full left-0 mt-2",
    top: "bottom-full left-0 mb-2",
  }[side];

  const alignTrans = {
    right: align === "center" ? "-translate-y-1/4" : "",
    left: align === "center" ? "-translate-y-1/4" : "",
    bottom: align === "center" ? "-translate-x-1/4" : "",
    top: align === "center" ? "-translate-x-1/4" : "",
  }[side];

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
        className={`w-full text-left ${triggerClassName}`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {trigger}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            initial={{ opacity: 0, y: side === "bottom" ? -4 : 0, x: side === "right" ? -4 : 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: side === "bottom" ? -4 : 0, x: side === "right" ? -4 : 0 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-40 ${sideClass} ${alignTrans} hidden lg:block`}
            style={{ width }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="rounded-lg border border-[#e5e7eb] bg-white shadow-lg p-4">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile inline sheet — appears below when open on small screens */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mt-1 mb-1 rounded-md border border-[#e5e7eb] bg-[#f8faff] p-3 ml-6">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HoverCard;

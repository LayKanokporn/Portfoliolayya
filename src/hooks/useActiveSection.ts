"use client";
import { useEffect, useState } from "react";

/**
 * useActiveSection — IntersectionObserver-based scroll spy.
 * Returns the id of the section currently in view.
 *
 * @param ids  element ids to observe, in document order
 * @param rootMargin  observer threshold offset (default: "-40% 0px -55% 0px"
 *                    so the active section flips around viewport middle)
 */
export function useActiveSection(ids: string[], rootMargin = "-40% 0px -55% 0px") {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the topmost intersecting section
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActive(top.target.id);
        }
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}

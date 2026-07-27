"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mirrors the prototype's single-fire IntersectionObserver reveal: once a
 * section (or list item) scrolls ~20% into view it flips to visible and
 * stays there, driving the `.reveal` / `.is-visible` fade-and-rise CSS.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

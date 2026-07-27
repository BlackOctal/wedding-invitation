"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import type { Blessing } from "@/lib/db";

export function BlessingsSection({ blessings }: { blessings: Blessing[] }) {
  const { ref, visible } = useReveal<HTMLElement>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (blessings.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % blessings.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [blessings.length]);

  const current = blessings[index];

  return (
    <section
      id="blessings"
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} bg-cream px-6 pt-25 pb-30 text-center`}
    >
      <div className="mb-2.5 font-serif text-lg text-sage italic">For Our Guests</div>
      <h2 className="mt-0 mb-4 font-display text-[clamp(28px,4.5vw,38px)] font-medium">
        Share Your Moment &amp; Blessing
      </h2>
      <p className="mx-auto mb-11 max-w-[440px] text-sm leading-[1.7] text-muted-dark">
        Words from our family and friends, shared live from the celebration.
      </p>

      <div className="mx-auto flex min-h-62.5 max-w-105 items-center justify-center rounded-[10px] bg-white px-7.5 py-9 shadow-[0_26px_50px_-30px_rgba(58,46,38,0.25)]">
        {current ? (
          <div key={current.id} className="animate-fade-in-up text-center">
            <div className="mb-4.5 font-serif text-lg text-espresso italic">
              &quot;{current.message}&quot;
            </div>
            <div className="text-[13px] tracking-[0.06em] text-gold uppercase">
              — {current.name}
            </div>
          </div>
        ) : (
          <div className="text-[13px] text-muted">
            Blessings from our loved ones will appear here.
          </div>
        )}
      </div>
    </section>
  );
}

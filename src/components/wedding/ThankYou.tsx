"use client";

import { COUPLE } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";

export function ThankYou() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} px-6 pt-30 pb-15 text-center`}
    >
      <div className="mx-auto mb-7.5 flex h-17.5 w-17.5 items-center justify-center rounded-full border border-gold font-display text-[22px] text-gold">
        {COUPLE.monogram}
      </div>
      <h2 className="mt-0 mb-5 font-display text-[clamp(30px,5vw,48px)] font-medium">
        With Love, Always
      </h2>
      <p className="mx-auto max-w-115 font-serif text-lg text-muted-dark italic leading-[1.8]">
        Thank you for being part of our story. We can&apos;t wait to celebrate this beautiful
        beginning with you.
      </p>
      <div className="mt-17.5 border-t border-divider pt-7.5 text-xs tracking-wide text-muted">
        {COUPLE.bride} &amp; {COUPLE.groom} · {COUPLE.date}
      </div>
    </section>
  );
}

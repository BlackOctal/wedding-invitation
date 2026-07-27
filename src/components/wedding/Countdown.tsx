"use client";

import { useEffect, useState } from "react";
import { COUPLE } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";

const TARGET = new Date(COUPLE.isoDateTime).getTime();
const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (n: number) => Math.max(0, n);

function useCountdown() {
  // Starts null so server and first client render agree (a real clock
  // reading would differ between build time and view time); the effect
  // below fills in the live value asynchronously via rAF, not synchronously,
  // so it counts as reacting to an external clock rather than a render-time
  // side effect.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setNow(Date.now()));
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const diff = now === null ? null : TARGET - now;
  return {
    ready: diff !== null,
    isWeddingDay: diff !== null && diff <= 0,
    days: clamp(Math.floor((diff ?? 0) / 86400000)),
    hours: clamp(Math.floor(((diff ?? 0) % 86400000) / 3600000)),
    minutes: clamp(Math.floor(((diff ?? 0) % 3600000) / 60000)),
    seconds: clamp(Math.floor(((diff ?? 0) % 60000) / 1000)),
  };
}

export function Countdown() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { isWeddingDay, days, hours, minutes, seconds } = useCountdown();

  return (
    <section
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} relative px-6 pt-25 pb-22 text-center`}
    >
      <div className="mb-2.5 font-serif text-lg text-sage italic">The Countdown Begins</div>

      {isWeddingDay ? (
        <h2 className="m-0 font-display text-[clamp(30px,5vw,46px)] font-medium">
          Today Is Our Wedding Day
        </h2>
      ) : (
        <div className="mx-auto mt-7.5 flex max-w-[640px] flex-wrap justify-center gap-4.5">
          {[
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Minutes", value: minutes },
            { label: "Seconds", value: seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="min-w-[100px] rounded-md border border-divider bg-white px-5.5 py-6.5 shadow-[0_20px_40px_-28px_rgba(58,46,38,0.3)]"
            >
              <div className="font-display text-[38px] text-espresso">{pad(item.value)}</div>
              <div className="mt-1.5 text-[11px] tracking-[0.14em] text-muted uppercase">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

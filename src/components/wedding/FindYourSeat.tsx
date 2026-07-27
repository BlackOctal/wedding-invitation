"use client";

import { useMemo, useRef, useState } from "react";
import { CONFETTI_COLORS } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";
import type { Guest } from "@/lib/db";

type ConfettiPiece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
};

function makeConfetti(): ConfettiPiece[] {
  return Array.from({ length: 26 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.8 + Math.random() * 1.2,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  }));
}

export function FindYourSeat({ guests }: { guests: Guest[] }) {
  const { ref, visible } = useReveal<HTMLElement>();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Guest | "notfound" | null>(null);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const clearConfettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const found = useMemo(() => (result && result !== "notfound" ? result : null), [result]);

  const search = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const match = guests.find((g) => g.name.toLowerCase().includes(q));
    if (match) {
      setResult(match);
      setConfetti(makeConfetti());
      if (clearConfettiTimer.current) clearTimeout(clearConfettiTimer.current);
      clearConfettiTimer.current = setTimeout(() => setConfetti([]), 2800);
    } else {
      setResult("notfound");
    }
  };

  return (
    <section
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} relative bg-espresso px-6 pt-22.5 pb-27.5`}
    >
      <div className="mx-auto max-w-[520px] text-center">
        <div className="mb-2 font-serif text-lg text-gold italic">Reserved For You</div>
        <h2 className="mt-0 mb-7.5 font-display text-[clamp(28px,4.5vw,38px)] font-medium text-ivory">
          Find Your Seat
        </h2>

        <div className="flex gap-2.5 rounded-full border border-gold/35 bg-ivory/8 p-2 pl-5.5 backdrop-blur-sm">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="Enter your full name"
            className="flex-1 border-none bg-transparent text-sm text-ivory outline-none placeholder:text-latte/70"
          />
          <button
            onClick={search}
            className="cursor-pointer rounded-full border-none bg-gold px-7 py-3 text-[13px] tracking-[0.08em] text-espresso uppercase"
          >
            Search
          </button>
        </div>

        {found && (
          <div className="mt-8.5 animate-fade-in-up rounded-[10px] border border-gold/35 bg-ivory/6 p-7.5">
            <div className="mb-4 font-display text-[22px] text-ivory">{found.name}</div>
            <div className="flex justify-center gap-9">
              <div>
                <div className="text-[11px] tracking-[0.12em] text-sage uppercase">Table</div>
                <div className="mt-1 font-display text-[28px] text-gold">{found.table}</div>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.12em] text-sage uppercase">Seat</div>
                <div className="mt-1 font-display text-[28px] text-gold">{found.seat}</div>
              </div>
            </div>
          </div>
        )}

        {result === "notfound" && (
          <div className="mt-6.5 text-sm text-latte">
            We couldn&apos;t find that name — please check the spelling, or reach out to us directly.
          </div>
        )}

        {confetti.length > 0 && (
          <div className="fixed inset-0 z-[80] overflow-hidden pointer-events-none">
            {confetti.map((p) => (
              <div
                key={p.id}
                className="animate-confetti-fall absolute top-[-20px] h-3.5 w-2 rounded-sm"
                style={{
                  left: `${p.left}%`,
                  background: p.color,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { ImageSlot } from "@/components/ImageSlot";
import { COUPLE } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";

export function Hero({ heroImage }: { heroImage?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <ImageSlot
          id="hero-bg"
          shape="rect"
          placeholder="Drop the main couple photograph"
          className="h-full w-full"
          src={heroImage}
          priority
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(58,46,38,0.72)_0%,rgba(58,46,38,0.4)_45%,rgba(58,46,38,0.48)_100%)]" />

      <div className="pointer-events-none absolute top-[8%] left-[6%] h-16 w-16 animate-float-y rounded-[50%_50%_50%_0] bg-sage/50" />
      <div className="pointer-events-none absolute right-[8%] bottom-[14%] h-11 w-11 animate-float-y2 rounded-full bg-gold/45" />
      <div className="pointer-events-none absolute top-[30%] right-[14%] h-[26px] w-[26px] animate-float-y3 rounded-full bg-ivory/55" />

      <div
        ref={ref}
        className={`reveal ${visible ? "is-visible" : ""} absolute right-0 bottom-[12%] left-0 z-[2] px-6 text-center`}
      >
        <div className="font-display text-[clamp(38px,8vw,88px)] leading-none text-ivory drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
          {COUPLE.bride} <span className="align-middle text-[0.4em] text-gold">♡</span> {COUPLE.groom}
        </div>
        <div className="mt-5 text-sm tracking-[0.3em] text-[#E8E4DC] uppercase">{COUPLE.date}</div>
      </div>

      <div className="absolute -bottom-px -left-[10%] h-[70px] w-[120%] rounded-t-[100%] bg-ivory" />
    </section>
  );
}

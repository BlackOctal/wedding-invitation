"use client";

import { useEffect, useRef, useState } from "react";
import { COUPLE } from "@/data/wedding";

type Stage = "closed" | "opening" | "open";

export function EnvelopeIntro() {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<Stage>("closed");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const openEnvelope = () => {
    if (stage !== "closed") return;
    setStage("opening");
    timers.current.push(
      setTimeout(() => setStage("open"), 1100),
      setTimeout(() => setVisible(false), 2000)
    );
  };

  if (!visible) return null;

  const isOpen = stage !== "closed";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        opacity: stage === "open" ? 0 : 1,
        transition: "opacity 0.9s ease",
        pointerEvents: isOpen ? "none" : "auto",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#F1EAD9_0%,#F8F5F0_60%,#EFE6D2_100%)]" />

      <div className="relative z-10 px-6 text-center">
        <div className="mb-2 font-serif text-base italic tracking-[0.14em] text-[#A9887A] uppercase">
          The Wedding Of
        </div>
        <div className="mb-0.5 font-display text-[clamp(30px,6vw,52px)] text-espresso">
          {COUPLE.bride} <span className="text-[0.6em] text-gold">&amp;</span> {COUPLE.groom}
        </div>
        <div className="mb-9 text-[13px] tracking-[0.24em] text-[#8a7a6a] uppercase">
          {COUPLE.date}
        </div>

        <div className="relative mx-auto mb-11 h-[210px] w-[280px]" style={{ perspective: "1200px" }}>
          {/* envelope body */}
          <div className="absolute top-14 left-0 h-[130px] w-[280px] rounded-b-md border border-gold/40 bg-[linear-gradient(180deg,#FDFBF7,#F2E9D6)] shadow-[0_30px_50px_-25px_rgba(58,46,38,0.35)]" />
          {/* side folds */}
          <div
            className="absolute top-14 left-0 z-[2] h-[130px] w-[140px] bg-gold/10"
            style={{ clipPath: "polygon(0 0, 0 100%, 100% 58%)" }}
          />
          <div
            className="absolute top-14 left-[140px] z-[2] h-[130px] w-[140px] bg-gold/10"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 58%)" }}
          />
          {/* letter */}
          <div
            className="absolute top-[70px] left-[22px] h-[100px] w-[236px] rounded-sm border border-gold/20 bg-white shadow-[0_4px_14px_rgba(58,46,38,0.1)]"
            style={{
              transform: isOpen ? "translateY(-88px)" : "translateY(0)",
              zIndex: isOpen ? 5 : 0,
              transition: "transform 1s cubic-bezier(.22,1,.36,1) 0.2s",
            }}
          />
          {/* flap */}
          <div
            className="absolute top-14 left-0 z-[3] h-[82px] w-[280px] origin-top bg-[linear-gradient(150deg,#EDE3CE,#E2D3B3)]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: isOpen ? "rotateX(-165deg)" : "rotateX(0deg)",
              transition: "transform 1s ease",
            }}
          />
          {/* seal */}
          <div
            className="absolute top-[112px] left-1/2 z-[4] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-gold font-display text-sm text-ivory shadow-[0_6px_14px_rgba(58,46,38,0.3)]"
            style={{
              opacity: isOpen ? 0 : 1,
              transform: `translateX(-50%) scale(${isOpen ? 0.5 : 1})`,
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {COUPLE.monogram}
          </div>
        </div>

        <button
          onClick={openEnvelope}
          className="cursor-pointer rounded-sm border-none bg-gold px-10 py-4 font-sans text-[13px] tracking-[0.14em] text-ivory uppercase"
          style={{
            animation: stage === "closed" ? "pulse-btn 2.6s ease-in-out infinite" : "none",
            opacity: stage === "closed" ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          View Invitation
        </button>
      </div>
    </div>
  );
}

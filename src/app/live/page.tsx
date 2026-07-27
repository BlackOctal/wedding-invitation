"use client";

import Link from "next/link";
import { useState } from "react";
import { AddImageMemoryForm } from "@/components/live/AddImageMemoryForm";
import { AddBlessingForm } from "@/components/live/AddBlessingForm";

type View = "menu" | "image" | "blessing";

export default function LivePage() {
  const [view, setView] = useState<View>("menu");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 py-16 text-center">
      <div className="mb-2.5 font-serif text-lg text-sage italic">Kavini &amp; Shehan</div>
      <h1 className="mt-0 mb-10 font-display text-[clamp(26px,5vw,36px)] font-medium text-espresso">
        Share This Moment
      </h1>

      <div className="mx-auto w-full max-w-105 rounded-[10px] bg-white px-7.5 py-9 text-left shadow-[0_26px_50px_-30px_rgba(58,46,38,0.25)]">
        {view === "menu" && (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setView("image")}
              className="cursor-pointer rounded-sm border-none bg-gold py-5 text-[13px] tracking-[0.12em] text-white uppercase"
            >
              Add Image Memory
            </button>
            <button
              onClick={() => setView("blessing")}
              className="cursor-pointer rounded-sm border border-gold bg-transparent py-5 text-[13px] tracking-[0.12em] text-gold uppercase"
            >
              Add My Blessing
            </button>
          </div>
        )}

        {view === "image" && (
          <>
            <button
              onClick={() => setView("menu")}
              className="mb-5 cursor-pointer border-none bg-transparent p-0 text-xs tracking-[0.06em] text-muted uppercase"
            >
              ← Back
            </button>
            <AddImageMemoryForm onDone={() => setView("menu")} />
          </>
        )}

        {view === "blessing" && (
          <>
            <button
              onClick={() => setView("menu")}
              className="mb-5 cursor-pointer border-none bg-transparent p-0 text-xs tracking-[0.06em] text-muted uppercase"
            >
              ← Back
            </button>
            <AddBlessingForm onDone={() => setView("menu")} />
          </>
        )}
      </div>

      <Link
        href="/#blessings"
        className="mt-8 text-xs tracking-[0.1em] text-muted uppercase transition-colors hover:text-gold"
      >
        Back to Website
      </Link>
    </div>
  );
}

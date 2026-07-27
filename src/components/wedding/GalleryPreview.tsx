"use client";

import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import { useReveal } from "@/hooks/useReveal";
import type { GalleryTile } from "./gallery-types";

export function GalleryPreview({ items }: { items: GalleryTile[] }) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} px-6 py-27.5 text-center`}
    >
      <div className="mb-2.5 font-serif text-lg text-sage italic">Captured Moments</div>
      <h2 className="mt-0 mb-12.5 font-display text-[clamp(28px,4.5vw,40px)] font-medium">
        Moments Before Forever
      </h2>

      <div className="mx-auto flex max-w-[1000px] flex-wrap justify-center gap-5.5">
        {items.map((g) => (
          <div
            key={g.id}
            className="w-50 bg-white px-2.5 pt-2.5 pb-5.5 shadow-[0_16px_30px_-18px_rgba(58,46,38,0.35)]"
            style={{ transform: `rotate(${g.rotate})` }}
          >
            {g.kind === "slot" ? (
              <ImageSlot id={g.id} shape="rect" placeholder="Photo" className="h-55 w-full" src={g.src} />
            ) : (
              <>
                <div
                  className="h-55 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${g.img})` }}
                />
                <div className="pt-2.5 text-center font-display text-sm text-espresso">
                  {g.name}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <Link
        href="/gallery"
        className="mt-11 inline-block cursor-pointer rounded-sm border border-gold bg-transparent px-9 py-3.5 font-sans text-xs tracking-[0.12em] text-gold uppercase no-underline"
      >
        View All Photos
      </Link>
    </section>
  );
}

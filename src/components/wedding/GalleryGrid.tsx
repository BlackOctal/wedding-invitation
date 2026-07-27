"use client";

import { ImageSlot } from "@/components/ImageSlot";
import type { GalleryTile } from "./gallery-types";

export function GalleryGrid({ items }: { items: GalleryTile[] }) {
  return (
    <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-6.5">
      {items.map((g) => (
        <div
          key={g.id}
          className="w-52.5 bg-white px-2.5 pt-2.5 pb-5"
          style={{
            transform: `rotate(${g.rotate})`,
            boxShadow: "0 16px 30px -18px rgba(58,46,38,0.35)",
          }}
        >
          {g.kind === "slot" ? (
            <ImageSlot id={g.id} shape="rect" placeholder="Photo" className="h-57.5 w-full" src={g.src} />
          ) : (
            <>
              <div
                className="h-57.5 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${g.img})` }}
              />
              <div className="pt-3 text-center">
                <div className="font-display text-[15px] text-espresso">{g.name}</div>
                {g.message && (
                  <div className="mt-1 font-serif text-[13px] text-muted italic">
                    &quot;{g.message}&quot;
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

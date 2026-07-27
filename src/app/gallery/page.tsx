import Link from "next/link";
import { getImages, getMoments } from "@/lib/db";
import { GALLERY_SLOTS } from "@/data/wedding";
import { GalleryGrid } from "@/components/wedding/GalleryGrid";
import type { GalleryTile } from "@/components/wedding/gallery-types";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const [images, moments] = await Promise.all([getImages(), getMoments()]);

  const momentTiles: GalleryTile[] = moments.map((m) => ({
    kind: "moment",
    id: `m${m.id}`,
    name: m.name,
    message: m.message,
    img: m.imageUrl,
    rotate: m.rotate,
  }));
  const slotTiles: GalleryTile[] = GALLERY_SLOTS.map((g) => ({
    kind: "slot",
    id: g.id,
    rotate: g.rotate,
    src: images[g.id],
  }));
  const items = [...momentTiles, ...slotTiles];

  return (
    <div className="min-h-screen bg-ivory px-6 pt-20 pb-20">
      <Link
        href="/"
        aria-label="Back to invitation"
        className="fixed top-5 left-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-white text-lg text-espresso no-underline"
      >
        ←
      </Link>

      <div className="mb-12.5 text-center">
        <div className="mb-2.5 font-serif text-lg text-sage italic">Every Memory, Every Blessing</div>
        <h1 className="m-0 font-display text-[clamp(28px,4.5vw,42px)] font-medium text-espresso">
          The Full Gallery
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center text-sm text-muted">No photos yet.</div>
      ) : (
        <GalleryGrid items={items} />
      )}
    </div>
  );
}

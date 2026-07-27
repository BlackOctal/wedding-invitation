import { GALLERY_SLOTS } from "@/data/wedding";
import { GalleryPreview } from "./GalleryPreview";
import { BlessingsSection } from "./BlessingsSection";
import type { GalleryTile, GuestMoment } from "./gallery-types";
import type { Blessing } from "@/lib/db";

export function GallerySection({
  images,
  initialMoments,
  blessings,
}: {
  images: Record<string, string>;
  initialMoments: GuestMoment[];
  blessings: Blessing[];
}) {
  const momentTiles: GalleryTile[] = initialMoments.map((m) => ({
    kind: "moment",
    id: `m${m.id}`,
    name: m.name,
    message: m.message,
    img: m.img,
    rotate: m.rotate,
  }));
  const slotTiles: GalleryTile[] = GALLERY_SLOTS.map((g) => ({
    kind: "slot",
    id: g.id,
    rotate: g.rotate,
    src: images[g.id],
  }));

  const previewItems = [...slotTiles, ...momentTiles].slice(0, 8);

  return (
    <>
      <GalleryPreview items={previewItems} />
      <BlessingsSection blessings={blessings} />
    </>
  );
}

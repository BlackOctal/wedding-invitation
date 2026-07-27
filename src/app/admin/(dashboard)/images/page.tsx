import Image from "next/image";
import { getImages } from "@/lib/db";
import { IMAGE_SLOTS } from "@/data/wedding";
import { uploadImageAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminImagesPage() {
  const images = await getImages();

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl text-espresso">Images</h1>
      <p className="mb-8 text-sm text-muted">
        Upload a photo for each slot on the site. Uploading again replaces the current photo.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {IMAGE_SLOTS.map((slot) => {
          const url = images[slot.id];
          return (
            <div key={slot.id} className="rounded-lg border border-divider bg-white p-4">
              <div className="relative mb-3 h-40 w-full overflow-hidden rounded bg-cream">
                {url ? (
                  <Image src={url} alt={slot.label} fill sizes="300px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-[11px] text-muted">
                    No photo yet
                  </div>
                )}
              </div>
              <div className="mb-3 text-sm text-espresso">{slot.label}</div>
              <form action={uploadImageAction} className="flex flex-col gap-2">
                <input type="hidden" name="slotId" value={slot.id} />
                <input
                  type="file"
                  name="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  required
                  className="text-xs"
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded border border-gold bg-transparent px-3 py-1.5 text-xs tracking-[0.06em] text-gold uppercase"
                >
                  {url ? "Replace" : "Upload"}
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}

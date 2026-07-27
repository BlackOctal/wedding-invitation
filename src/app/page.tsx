import { WeddingInvitation } from "@/components/wedding/WeddingInvitation";
import { getBlessings, getGuests, getImages, getMoments } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [images, guests, moments, blessings] = await Promise.all([
    getImages(),
    getGuests(),
    getMoments(),
    getBlessings(),
  ]);

  return (
    <WeddingInvitation images={images} guests={guests} initialMoments={moments} blessings={blessings} />
  );
}

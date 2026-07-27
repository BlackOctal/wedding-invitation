import Link from "next/link";
import { getBlessings, getGuests, getMoments, getRsvps, getImages } from "@/lib/db";
import { IMAGE_SLOTS } from "@/data/wedding";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [guests, rsvps, moments, images, blessings] = await Promise.all([
    getGuests(),
    getRsvps(),
    getMoments(),
    getImages(),
    getBlessings(),
  ]);
  const imagesFilled = IMAGE_SLOTS.filter((s) => images[s.id]).length;

  const cards = [
    { href: "/admin/images", label: "Images", value: `${imagesFilled} / ${IMAGE_SLOTS.length}`, hint: "slots filled" },
    { href: "/admin/guests", label: "Guests", value: String(guests.length), hint: "on the seating list" },
    { href: "/admin/rsvps", label: "RSVPs", value: String(rsvps.length), hint: "responses received" },
    { href: "/admin/moments", label: "Moments", value: String(moments.length), hint: "guest photos shared" },
    { href: "/admin/blessings", label: "Blessings", value: String(blessings.length), hint: "guest blessings shared" },
  ];

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl text-espresso">Overview</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-divider bg-white px-6 py-6 no-underline shadow-sm"
          >
            <div className="text-xs tracking-[0.1em] text-muted uppercase">{c.label}</div>
            <div className="mt-2 font-display text-3xl text-espresso">{c.value}</div>
            <div className="mt-1 text-xs text-muted">{c.hint}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

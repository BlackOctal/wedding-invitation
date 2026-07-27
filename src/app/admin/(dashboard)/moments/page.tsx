import Image from "next/image";
import { getMoments } from "@/lib/db";
import { deleteMomentAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminMomentsPage() {
  const moments = await getMoments();

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl text-espresso">Moments</h1>
      <p className="mb-8 text-sm text-muted">
        Guest-submitted photos and blessings from &quot;Share Your Moment &amp; Blessing&quot;.
        Delete anything you don&apos;t want shown publicly.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {moments.length === 0 && <div className="text-sm text-muted">No moments shared yet.</div>}
        {moments.map((m) => (
          <div key={m.id} className="rounded-lg border border-divider bg-white p-4">
            <div className="relative mb-3 h-48 w-full overflow-hidden rounded bg-cream">
              <Image src={m.imageUrl} alt={m.name} fill sizes="300px" className="object-cover" />
            </div>
            <div className="font-display text-base text-espresso">{m.name}</div>
            {m.message && <p className="mt-1 text-sm text-muted italic">&quot;{m.message}&quot;</p>}
            <form action={deleteMomentAction} className="mt-3">
              <input type="hidden" name="id" value={m.id} />
              <button
                type="submit"
                className="cursor-pointer rounded border border-divider px-3 py-1.5 text-xs text-red-700 uppercase"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

import { getRsvps } from "@/lib/db";
import { deleteRsvpAction } from "./actions";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminRsvpsPage() {
  const rsvps = await getRsvps();
  const totalGuests = rsvps
    .filter((r) => r.attending === "yes")
    .reduce((sum, r) => sum + r.guestCount, 0);

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl text-espresso">RSVPs</h1>
      <p className="mb-8 text-sm text-muted">
        {rsvps.length} response{rsvps.length === 1 ? "" : "s"} · {totalGuests} attending guest
        {totalGuests === 1 ? "" : "s"}
      </p>

      <div className="flex flex-col gap-3">
        {rsvps.length === 0 && (
          <div className="rounded-lg border border-divider bg-white px-4 py-6 text-sm text-muted">
            No RSVPs yet.
          </div>
        )}
        {rsvps.map((r) => (
          <div key={r.id} className="rounded-lg border border-divider bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-display text-lg text-espresso">{r.name}</div>
                <div className="mt-1 text-xs tracking-[0.06em] text-muted uppercase">
                  {r.attending === "yes" ? `Attending · ${r.guestCount} guest(s)` : "Not attending"}
                </div>
                {r.message && <p className="mt-2 max-w-lg text-sm text-espresso">{r.message}</p>}
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-xs text-muted">{dateFormatter.format(new Date(r.createdAt))}</div>
                <form action={deleteRsvpAction}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="cursor-pointer rounded border border-divider px-3 py-1 text-xs text-red-700 uppercase"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

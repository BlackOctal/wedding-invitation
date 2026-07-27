import { getGuests } from "@/lib/db";
import { addGuestAction } from "./actions";
import { GuestRow } from "./GuestRow";

export const dynamic = "force-dynamic";

export default async function AdminGuestsPage() {
  const guests = await getGuests();

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl text-espresso">Guests</h1>
      <p className="mb-8 text-sm text-muted">
        This list backs the public &quot;Find Your Seat&quot; search — add every guest with their
        table and seat number.
      </p>

      <form
        action={addGuestAction}
        className="mb-8 grid grid-cols-1 gap-2 rounded-lg border border-divider bg-white p-4 sm:grid-cols-[1fr_100px_100px_auto]"
      >
        <input
          name="name"
          placeholder="Full name"
          required
          className="rounded border border-divider px-2 py-1.5 text-sm"
        />
        <input
          name="table"
          placeholder="Table"
          required
          className="rounded border border-divider px-2 py-1.5 text-sm"
        />
        <input
          name="seat"
          placeholder="Seat"
          required
          className="rounded border border-divider px-2 py-1.5 text-sm"
        />
        <button
          type="submit"
          className="cursor-pointer rounded border border-gold bg-gold px-3 py-1.5 text-xs text-espresso uppercase"
        >
          Add Guest
        </button>
      </form>

      <div className="rounded-lg border border-divider bg-white px-4">
        {guests.length === 0 && <div className="py-6 text-sm text-muted">No guests yet.</div>}
        {guests.map((g) => (
          <GuestRow key={g.id} guest={g} />
        ))}
      </div>
    </div>
  );
}

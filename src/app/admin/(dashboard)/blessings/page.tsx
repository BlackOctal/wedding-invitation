import { getBlessings } from "@/lib/db";
import { deleteBlessingAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBlessingsPage() {
  const blessings = await getBlessings();

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl text-espresso">Blessings</h1>
      <p className="mb-8 text-sm text-muted">
        Guest-submitted blessings from /live. Delete anything you don&apos;t want shown publicly.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blessings.length === 0 && <div className="text-sm text-muted">No blessings shared yet.</div>}
        {blessings.map((b) => (
          <div key={b.id} className="rounded-lg border border-divider bg-white p-4">
            <p className="text-sm text-muted italic">&quot;{b.message}&quot;</p>
            <div className="mt-2 font-display text-base text-espresso">{b.name}</div>
            <form action={deleteBlessingAction} className="mt-3">
              <input type="hidden" name="id" value={b.id} />
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

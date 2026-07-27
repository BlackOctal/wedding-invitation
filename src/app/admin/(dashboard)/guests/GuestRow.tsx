"use client";

import { useState } from "react";
import type { Guest } from "@/lib/db";
import { deleteGuestAction, updateGuestAction } from "./actions";

export function GuestRow({ guest }: { guest: Guest }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateGuestAction(formData);
          setEditing(false);
        }}
        className="grid grid-cols-1 gap-2 border-b border-divider py-3 sm:grid-cols-[1fr_100px_100px_auto]"
      >
        <input type="hidden" name="id" value={guest.id} />
        <input
          name="name"
          defaultValue={guest.name}
          required
          className="rounded border border-divider px-2 py-1.5 text-sm"
        />
        <input
          name="table"
          defaultValue={guest.table}
          required
          className="rounded border border-divider px-2 py-1.5 text-sm"
        />
        <input
          name="seat"
          defaultValue={guest.seat}
          required
          className="rounded border border-divider px-2 py-1.5 text-sm"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="cursor-pointer rounded border border-gold bg-gold px-3 py-1.5 text-xs text-espresso uppercase"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="cursor-pointer rounded border border-divider px-3 py-1.5 text-xs text-muted uppercase"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="grid grid-cols-1 items-center gap-2 border-b border-divider py-3 sm:grid-cols-[1fr_100px_100px_auto]">
      <div className="text-sm text-espresso">{guest.name}</div>
      <div className="text-sm text-muted">Table {guest.table}</div>
      <div className="text-sm text-muted">Seat {guest.seat}</div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="cursor-pointer rounded border border-divider px-3 py-1.5 text-xs text-espresso uppercase"
        >
          Edit
        </button>
        <form action={deleteGuestAction}>
          <input type="hidden" name="id" value={guest.id} />
          <button
            type="submit"
            className="cursor-pointer rounded border border-divider px-3 py-1.5 text-xs text-red-700 uppercase"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

import { getSupabaseAdmin } from "./supabase";

export type Guest = { id: number; name: string; table: string; seat: string };
export type Rsvp = {
  id: number;
  name: string;
  attending: "yes" | "no";
  guestCount: number;
  message: string;
  createdAt: string;
};
export type Moment = {
  id: number;
  name: string;
  message: string;
  imageUrl: string;
  rotate: string;
  createdAt: string;
};
export type Blessing = {
  id: number;
  name: string;
  message: string;
  createdAt: string;
};

function unwrap<T>(result: { data: T | null; error: { message: string } | null }): T {
  if (result.error) throw new Error(result.error.message);
  return result.data as T;
}

// ── Images ──────────────────────────────────────────────────────────────

export async function getImages(): Promise<Record<string, string>> {
  const sb = getSupabaseAdmin();
  const rows = unwrap(await sb.from("images").select("slot_id, url"));
  return Object.fromEntries((rows as { slot_id: string; url: string }[]).map((r) => [r.slot_id, r.url]));
}

export async function setImage(slotId: string, url: string): Promise<void> {
  const sb = getSupabaseAdmin();
  unwrap(
    await sb
      .from("images")
      .upsert({ slot_id: slotId, url, updated_at: new Date().toISOString() }, { onConflict: "slot_id" })
  );
}

// ── Guests ───────────────────────────────────────────────────────────────

type GuestRow = { id: number; name: string; table_number: string; seat_number: string };

export async function getGuests(): Promise<Guest[]> {
  const sb = getSupabaseAdmin();
  const rows = unwrap(
    await sb.from("guests").select("id, name, table_number, seat_number").order("name", { ascending: true })
  );
  return (rows as GuestRow[]).map((r) => ({ id: r.id, name: r.name, table: r.table_number, seat: r.seat_number }));
}

export async function addGuest(input: { name: string; table: string; seat: string }): Promise<void> {
  const sb = getSupabaseAdmin();
  unwrap(
    await sb.from("guests").insert({ name: input.name, table_number: input.table, seat_number: input.seat })
  );
}

export async function updateGuest(
  id: number,
  input: { name: string; table: string; seat: string }
): Promise<void> {
  const sb = getSupabaseAdmin();
  unwrap(
    await sb
      .from("guests")
      .update({ name: input.name, table_number: input.table, seat_number: input.seat })
      .eq("id", id)
  );
}

export async function deleteGuest(id: number): Promise<void> {
  const sb = getSupabaseAdmin();
  unwrap(await sb.from("guests").delete().eq("id", id));
}

// ── RSVPs ────────────────────────────────────────────────────────────────

type RsvpRow = {
  id: number;
  name: string;
  attending: string;
  guest_count: number;
  message: string;
  created_at: string;
};

export async function getRsvps(): Promise<Rsvp[]> {
  const sb = getSupabaseAdmin();
  const rows = unwrap(
    await sb
      .from("rsvps")
      .select("id, name, attending, guest_count, message, created_at")
      .order("created_at", { ascending: false })
  );
  return (rows as RsvpRow[]).map((r) => ({
    id: r.id,
    name: r.name,
    attending: r.attending === "yes" ? "yes" : "no",
    guestCount: r.guest_count,
    message: r.message,
    createdAt: r.created_at,
  }));
}

export async function addRsvp(input: {
  name: string;
  attending: "yes" | "no";
  guestCount: number;
  message: string;
}): Promise<void> {
  const sb = getSupabaseAdmin();
  unwrap(
    await sb.from("rsvps").insert({
      name: input.name,
      attending: input.attending,
      guest_count: input.guestCount,
      message: input.message,
    })
  );
}

export async function deleteRsvp(id: number): Promise<void> {
  const sb = getSupabaseAdmin();
  unwrap(await sb.from("rsvps").delete().eq("id", id));
}

// ── Moments ──────────────────────────────────────────────────────────────

type MomentRow = {
  id: number;
  name: string;
  message: string;
  image_url: string;
  rotate: string;
  created_at: string;
};

export async function getMoments(): Promise<Moment[]> {
  const sb = getSupabaseAdmin();
  const rows = unwrap(
    await sb
      .from("moments")
      .select("id, name, message, image_url, rotate, created_at")
      .order("created_at", { ascending: false })
  );
  return (rows as MomentRow[]).map((r) => ({
    id: r.id,
    name: r.name,
    message: r.message,
    imageUrl: r.image_url,
    rotate: r.rotate,
    createdAt: r.created_at,
  }));
}

export async function addMoment(input: {
  name: string;
  message: string;
  imageUrl: string;
  rotate: string;
}): Promise<Moment> {
  const sb = getSupabaseAdmin();
  const row = unwrap(
    await sb
      .from("moments")
      .insert({ name: input.name, message: input.message, image_url: input.imageUrl, rotate: input.rotate })
      .select("id, name, message, image_url, rotate, created_at")
      .single()
  ) as MomentRow;
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    imageUrl: row.image_url,
    rotate: row.rotate,
    createdAt: row.created_at,
  };
}

export async function deleteMoment(id: number): Promise<Moment | null> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("moments")
    .delete()
    .eq("id", id)
    .select("id, name, message, image_url, rotate, created_at")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  const row = data as MomentRow;
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    imageUrl: row.image_url,
    rotate: row.rotate,
    createdAt: row.created_at,
  };
}

// ── Blessings ────────────────────────────────────────────────────────────

type BlessingRow = { id: number; name: string; message: string; created_at: string };

export async function getBlessings(): Promise<Blessing[]> {
  const sb = getSupabaseAdmin();
  const rows = unwrap(
    await sb.from("blessings").select("id, name, message, created_at").order("created_at", { ascending: false })
  );
  return (rows as BlessingRow[]).map((r) => ({
    id: r.id,
    name: r.name,
    message: r.message,
    createdAt: r.created_at,
  }));
}

export async function addBlessing(input: { name: string; message: string }): Promise<Blessing> {
  const sb = getSupabaseAdmin();
  const row = unwrap(
    await sb
      .from("blessings")
      .insert({ name: input.name, message: input.message })
      .select("id, name, message, created_at")
      .single()
  ) as BlessingRow;
  return { id: row.id, name: row.name, message: row.message, createdAt: row.created_at };
}

export async function deleteBlessing(id: number): Promise<void> {
  const sb = getSupabaseAdmin();
  unwrap(await sb.from("blessings").delete().eq("id", id));
}

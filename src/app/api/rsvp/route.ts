import { NextResponse } from "next/server";
import { addRsvp } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 200) : "";
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  const attending = body.attending === "no" ? "no" : "yes";
  const guestCount = Math.min(10, Math.max(1, Math.trunc(Number(body.guestCount)) || 1));
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";

  await addRsvp({ name, attending, guestCount, message });
  return NextResponse.json({ ok: true });
}

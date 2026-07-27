import { NextResponse } from "next/server";
import { addBlessing } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim().slice(0, 200);
  const message = String(formData.get("message") || "").trim().slice(0, 2000);

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "A blessing message is required." }, { status: 400 });
  }

  const blessing = await addBlessing({ name, message });
  return NextResponse.json({ blessing });
}

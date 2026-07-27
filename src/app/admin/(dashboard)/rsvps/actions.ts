"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { deleteRsvp } from "@/lib/db";

export async function deleteRsvpAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) throw new Error("Missing RSVP id.");
  await deleteRsvp(id);
  revalidatePath("/admin/rsvps");
}

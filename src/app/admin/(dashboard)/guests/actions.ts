"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { addGuest, deleteGuest, updateGuest } from "@/lib/db";

function readGuestFields(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const table = String(formData.get("table") || "").trim();
  const seat = String(formData.get("seat") || "").trim();
  if (!name || !table || !seat) {
    throw new Error("Name, table, and seat are all required.");
  }
  return { name, table, seat };
}

export async function addGuestAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  await addGuest(readGuestFields(formData));
  revalidatePath("/admin/guests");
}

export async function updateGuestAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) throw new Error("Missing guest id.");
  await updateGuest(id, readGuestFields(formData));
  revalidatePath("/admin/guests");
}

export async function deleteGuestAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) throw new Error("Missing guest id.");
  await deleteGuest(id);
  revalidatePath("/admin/guests");
}

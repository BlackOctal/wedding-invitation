"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { deleteBlessing } from "@/lib/db";

export async function deleteBlessingAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) throw new Error("Missing blessing id.");
  await deleteBlessing(id);
  revalidatePath("/admin/blessings");
  revalidatePath("/");
}

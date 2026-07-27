"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { deleteMoment } from "@/lib/db";
import { deleteUploadedImage } from "@/lib/storage";

export async function deleteMomentAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) throw new Error("Missing moment id.");
  const deleted = await deleteMoment(id);
  if (deleted) await deleteUploadedImage(deleted.imageUrl);
  revalidatePath("/admin/moments");
  revalidatePath("/");
}

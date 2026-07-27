"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { uploadImage } from "@/lib/storage";
import { setImage } from "@/lib/db";
import { IMAGE_SLOTS } from "@/data/wedding";

export async function uploadImageAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const slotId = String(formData.get("slotId") || "");
  if (!IMAGE_SLOTS.some((s) => s.id === slotId)) {
    throw new Error(`Unknown image slot: ${slotId}`);
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose an image file to upload.");
  }

  const url = await uploadImage(file, slotId);
  await setImage(slotId, url);

  revalidatePath("/admin/images");
  revalidatePath("/");
}

import { getSupabaseAdmin } from "./supabase";

/** Create this bucket in Supabase → Storage, and mark it Public. */
const BUCKET = "wedding-photos";

const EXT_BY_MIME: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

function extensionFor(file: File): string {
  const fromName = file.name.includes(".") ? file.name.split(".").pop() : undefined;
  return EXT_BY_MIME[file.type] || fromName || "jpg";
}

/** Stores an uploaded image in Supabase Storage and returns its public URL. */
export async function uploadImage(file: File, keyPrefix: string): Promise<string> {
  const sb = getSupabaseAdmin();
  const key = `${keyPrefix}-${Date.now()}.${extensionFor(file)}`;

  const { error } = await sb.storage.from(BUCKET).upload(key, file, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const { data } = sb.storage.from(BUCKET).getPublicUrl(key);
  return data.publicUrl;
}

/** Best-effort cleanup for a URL previously returned by uploadImage. */
export async function deleteUploadedImage(url: string): Promise<void> {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;

  const key = url.slice(idx + marker.length);
  const sb = getSupabaseAdmin();
  await sb.storage.from(BUCKET).remove([key]).catch(() => {});
}

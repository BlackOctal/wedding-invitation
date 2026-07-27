"use client";

import { useRef, useState } from "react";
import { compressImage } from "@/lib/compressImage";

export function AddImageMemoryForm({ onDone }: { onDone: () => void }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []);
    if (picked.length === 0) return;
    setFiles(picked);
    setPreviews(picked.map((f) => URL.createObjectURL(f)));
  };

  const removeAt = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || files.length === 0) return;

    setSubmitting(true);
    setError(null);
    try {
      const compressed = await Promise.all(files.map((f) => compressImage(f)));
      const formData = new FormData();
      formData.append("name", name.trim());
      compressed.forEach((f) => formData.append("photos", f));

      const res = await fetch("/api/moments", { method: "POST", body: formData });
      if (!res.ok) throw new Error("request failed");

      setSubmitted(true);
    } catch {
      setError("Something went wrong uploading your photos — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="animate-fade-in-up py-5 text-center">
        <div className="mx-auto mb-4.5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-gold"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="mb-2 font-display text-[19px] text-espresso">Thank You For Sharing</div>
        <div className="mb-6 text-[13px] text-muted">
          Your photos have been added to the gallery.
        </div>
        <button
          onClick={onDone}
          className="cursor-pointer rounded-sm border-none bg-gold px-6 py-3.5 text-[13px] tracking-[0.12em] text-white uppercase"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFileChange}
        className="hidden"
      />

      {previews.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((src, i) => (
            <div key={src} className="relative">
              <div
                className="h-24 w-full rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url(${src})` }}
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove photo"
                className="absolute top-1 right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-espresso/70 text-ivory"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-3 w-3"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-24 w-full cursor-pointer items-center justify-center rounded-md border-[1.5px] border-dashed border-gold bg-gold/6 font-sans text-[11px] tracking-[0.06em] text-gold"
          >
            + Add More
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-md border-[1.5px] border-dashed border-gold bg-gold/6 px-4 py-8.5 font-sans text-[13px] tracking-[0.06em] text-gold"
        >
          Take or Choose Photos
        </button>
      )}

      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="rounded border border-divider px-3.5 py-3.25 font-sans text-sm text-espresso outline-none"
      />
      {error && <div className="text-sm text-red-700">{error}</div>}
      <button
        type="submit"
        disabled={submitting || files.length === 0}
        className="cursor-pointer rounded-sm border-none bg-gold py-4 text-[13px] tracking-[0.12em] text-white uppercase disabled:opacity-60"
      >
        {submitting ? "Uploading…" : `Add ${files.length || ""} Photo${files.length === 1 ? "" : "s"}`}
      </button>
    </form>
  );
}

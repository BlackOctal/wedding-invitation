"use client";

import { useState } from "react";

export function AddBlessingForm({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("message", message.trim());
      const res = await fetch("/api/blessings", { method: "POST", body: formData });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong sharing your blessing — please try again.");
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
        <div className="mb-6 text-[13px] text-muted">Your blessing has been added.</div>
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
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="rounded border border-divider px-3.5 py-3.25 font-sans text-sm text-espresso outline-none"
      />
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Leave a blessing or thought for the couple"
        rows={4}
        className="resize-y rounded border border-divider px-3.5 py-3.25 font-sans text-sm text-espresso outline-none"
      />
      {error && <div className="text-sm text-red-700">{error}</div>}
      <button
        type="submit"
        disabled={submitting}
        className="cursor-pointer rounded-sm border-none bg-gold py-4 text-[13px] tracking-[0.12em] text-white uppercase disabled:opacity-60"
      >
        {submitting ? "Sharing…" : "Share This Blessing"}
      </button>
    </form>
  );
}

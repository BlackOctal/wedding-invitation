"use client";

import { useState } from "react";
import { ImageSlot } from "@/components/ImageSlot";
import { useReveal } from "@/hooks/useReveal";

const attendClasses = (active: boolean) =>
  `flex-1 cursor-pointer rounded border py-3.5 text-[13px] font-sans ${
    active ? "border-gold bg-gold text-espresso" : "border-gold/35 bg-transparent text-latte"
  }`;

export function Rsvp({ coupleImage }: { coupleImage?: string }) {
  const { ref, visible } = useReveal<HTMLElement>();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, guestCount: guests, message }),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your RSVP — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} relative bg-espresso px-6 py-27.5`}
    >
      <div className="absolute -top-px -left-[10%] h-[70px] w-[120%] rounded-b-[100%] bg-espresso" style={{ transform: "translateY(-100%)" }} />
      <div className="mx-auto max-w-[920px] text-center">
        <div className="mb-2.5 font-serif text-lg text-gold italic">Your Presence, Our Gift</div>
        <h2 className="mt-0 mb-11 font-display text-[clamp(28px,4.5vw,38px)] font-medium text-ivory">
          Kindly RSVP
        </h2>

        <div className="flex flex-wrap items-stretch gap-10 text-left">
          <div className="min-w-70 flex-1 basis-80">
            <ImageSlot
              id="rsvp-photo"
              shape="rounded"
              radius={10}
              placeholder="Drop a couple photo"
              className="h-full min-h-85 w-full shadow-[0_30px_50px_-25px_rgba(0,0,0,0.4)]"
              src={coupleImage}
            />
          </div>

          <div className="min-w-70 flex-1 basis-80">
            {!submitted ? (
              <form onSubmit={submit} className="flex flex-col gap-4.5">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                  className="rounded border border-gold/35 bg-ivory/6 px-4 py-3.5 font-sans text-sm text-ivory outline-none placeholder:text-latte/70"
                />
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    className={attendClasses(attending === "yes")}
                  >
                    Joyfully Accepts
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={attendClasses(attending === "no")}
                  >
                    Regretfully Declines
                  </button>
                </div>
                <div className="flex items-center justify-between rounded border border-gold/35 bg-ivory/6 px-4 py-2.5">
                  <span className="text-[13px] text-latte">Guest Count</span>
                  <div className="flex items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="h-7 w-7 cursor-pointer rounded-full border border-gold bg-transparent text-gold"
                    >
                      −
                    </button>
                    <span className="min-w-3.5 text-center text-ivory">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(10, g + 1))}
                      className="h-7 w-7 cursor-pointer rounded-full border border-gold bg-transparent text-gold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A message for the couple (optional)"
                  rows={3}
                  className="resize-y rounded border border-gold/35 bg-ivory/6 px-4 py-3.5 font-sans text-sm text-ivory outline-none placeholder:text-latte/70"
                />
                {error && <div className="text-sm text-red-300">{error}</div>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1.5 cursor-pointer rounded-sm border-none bg-gold py-4 text-[13px] tracking-[0.12em] text-espresso uppercase disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Send RSVP"}
                </button>
              </form>
            ) : (
              <div className="animate-fade-in-up px-5 py-10 text-center">
                <div className="mx-auto mb-5.5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold text-[28px] text-gold">
                  ✓
                </div>
                <div className="mb-2.5 font-display text-[22px] text-ivory">Thank You, {name}</div>
                <div className="text-sm text-latte">
                  Your response has been received with love.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

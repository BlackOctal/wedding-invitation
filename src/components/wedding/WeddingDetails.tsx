"use client";

import { WEDDING_DETAILS, type WeddingDetail } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";

function DetailCard({ detail, index }: { detail: WeddingDetail; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} w-80 max-w-full rounded-[10px] bg-white px-9 py-11 shadow-[0_26px_50px_-30px_rgba(58,46,38,0.3)]`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="mb-4.5 text-3xl text-sage">{detail.icon}</div>
      <div className="mb-4 font-display text-[22px]">{detail.name}</div>
      <div className="mb-1.5 text-sm text-espresso">{detail.time}</div>
      <div className="mb-5.5 text-[13px] leading-[1.6] text-muted">
        {detail.venue}
        <br />
        {detail.address}
      </div>
      <a
        href={detail.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-sm border border-gold px-6.5 py-2.75 text-[12px] tracking-[0.1em] text-gold uppercase no-underline"
      >
        View Map
      </a>
    </div>
  );
}

export function WeddingDetails() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} relative bg-cream px-6 py-27.5 text-center`}
    >
      <div className="absolute -top-px -left-[10%] h-[70px] w-[120%] rounded-t-[100%] bg-cream" />
      <div className="mb-2.5 font-serif text-lg text-sage italic">Join Us</div>
      <h2 className="mt-0 mb-14 font-display text-[clamp(28px,4.5vw,40px)] font-medium">
        Wedding Details
      </h2>
      <div className="mx-auto flex max-w-[820px] flex-wrap justify-center gap-8">
        {WEDDING_DETAILS.map((d, i) => (
          <DetailCard key={d.id} detail={d} index={i} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { ImageSlot } from "@/components/ImageSlot";
import { COUPLE } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";

export function MeetCouple({
  brideImage,
  groomImage,
}: {
  brideImage?: string;
  groomImage?: string;
}) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} px-6 py-27.5 text-center`}
    >
      <div className="mb-2.5 font-serif text-lg text-sage italic">The Two Souls</div>
      <h2 className="mt-0 mb-15 font-display text-[clamp(28px,4.5vw,40px)] font-medium">
        Meet The Couple
      </h2>

      <div className="mx-auto flex max-w-[900px] flex-wrap items-start justify-center gap-15">
        <div className="max-w-60">
          <ImageSlot
            id="bride-portrait"
            shape="circle"
            placeholder="Bride portrait"
            className="mx-auto mb-6 h-[190px] w-[190px] shadow-[0_20px_40px_-20px_rgba(58,46,38,0.35)]"
            src={brideImage}
          />
          <div className="font-display text-2xl">{COUPLE.brideFull}</div>
          <div className="mt-2 text-[13px] leading-[1.7] text-muted">
            Daughter of
            <br />
            {COUPLE.brideParents}
          </div>
        </div>

        <div className="mt-10 self-center text-[34px] text-gold">✦</div>

        <div className="max-w-60">
          <ImageSlot
            id="groom-portrait"
            shape="circle"
            placeholder="Groom portrait"
            className="mx-auto mb-6 h-[190px] w-[190px] shadow-[0_20px_40px_-20px_rgba(58,46,38,0.35)]"
            src={groomImage}
          />
          <div className="font-display text-2xl">{COUPLE.groomFull}</div>
          <div className="mt-2 text-[13px] leading-[1.7] text-muted">
            Son of
            <br />
            {COUPLE.groomParents}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-[480px] font-serif text-xl text-espresso italic leading-[1.8]">
        &quot;We can&apos;t wait to say &apos;I do&apos; surrounded by the people who mean the most to
        us.&quot;
      </p>
    </section>
  );
}

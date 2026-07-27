"use client";

import { STORY_MILESTONES, type Milestone } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";

function TimelineItem({ milestone, index }: { milestone: Milestone; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const isRight = milestone.side === "right";

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} relative mb-14 flex ${
        isRight ? "sm:justify-end" : "sm:justify-start"
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="w-full pl-10 text-center sm:w-[calc(50%-30px)] sm:pl-0 rounded-lg bg-ivory px-7 py-6.5 shadow-[0_20px_40px_-30px_rgba(58,46,38,0.3)]">

        <div className="mb-2 text-xs tracking-[0.1em] text-gold uppercase">{milestone.date}</div>
        <div className="mb-2 font-display text-xl">{milestone.title}</div>
        <div className="text-[13px] leading-[1.7] text-muted-dark">{milestone.text}</div>
      </div>
      <div className="absolute top-7 left-4 h-3 w-3 -translate-x-1/2 rounded-full border-[3px] border-ivory bg-gold shadow-[0_0_0_1px_var(--color-divider)] sm:left-1/2" />
    </div>
  );
}

export function StoryTimeline() {
  const { ref: headerRef, visible: headerVisible } = useReveal<HTMLElement>();

  return (
    <>
      <section
        ref={headerRef}
        className={`reveal ${headerVisible ? "is-visible" : ""} bg-white px-6 pt-25 pb-15 text-center`}
      >
        <div className="mb-2.5 font-serif text-lg text-sage italic">How Our Day Unfolds</div>
        <h2 className="m-0 font-display text-[clamp(28px,4.5vw,40px)] font-medium">
          Wedding Day Timeline
        </h2>
      </section>

      <section className="bg-white px-6 pt-5 pb-27.5">
        <div className="relative mx-auto max-w-[760px]">
          <div className="absolute top-0 bottom-0 left-4 w-px -translate-x-1/2 bg-divider sm:left-1/2" />
          {STORY_MILESTONES.map((m, i) => (
            <TimelineItem key={m.title} milestone={m} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

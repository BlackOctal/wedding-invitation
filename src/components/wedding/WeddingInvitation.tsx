import { EnvelopeIntro } from "./EnvelopeIntro";
import { MusicToggle } from "./MusicToggle";
import { Hero } from "./Hero";
import { Countdown } from "./Countdown";
import { FindYourSeat } from "./FindYourSeat";
import { MeetCouple } from "./MeetCouple";
import { StoryTimeline } from "./StoryTimeline";
import { WeddingDetails } from "./WeddingDetails";
import { Rsvp } from "./Rsvp";
import { GallerySection } from "./GallerySection";
import { ThankYou } from "./ThankYou";
import type { Blessing, Guest, Moment } from "@/lib/db";

type WeddingInvitationProps = {
  images: Record<string, string>;
  guests: Guest[];
  initialMoments: Moment[];
  blessings: Blessing[];
};

export function WeddingInvitation({ images, guests, initialMoments, blessings }: WeddingInvitationProps) {
  const moments = initialMoments.map((m) => ({
    id: m.id,
    name: m.name,
    message: m.message,
    img: m.imageUrl,
    rotate: m.rotate,
  }));

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ivory text-espresso">
      <EnvelopeIntro />
      <MusicToggle />
      <Hero heroImage={images["hero-bg"]} />
      <Countdown />
      <FindYourSeat guests={guests} />
      <MeetCouple brideImage={images["bride-portrait"]} groomImage={images["groom-portrait"]} />
      <StoryTimeline />
      <WeddingDetails />
      <Rsvp coupleImage={images["rsvp-photo"]} />
      <GallerySection images={images} initialMoments={moments} blessings={blessings} />
      <ThankYou />
    </div>
  );
}

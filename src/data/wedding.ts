export const COUPLE = {
  bride: "Kavini",
  groom: "Shehan",
  brideFull: "Kavini Perera",
  groomFull: "Shehan Fernando",
  brideParents: "Mr. & Mrs. Perera",
  groomParents: "Mr. & Mrs. Fernando",
  date: "5 November 2026",
  /** ISO datetime the countdown counts down to and "today" is measured against. */
  isoDateTime: "2026-11-05T15:00:00",
  monogram: "K&S",
};

export type Milestone = {
  title: string;
  date: string;
  text: string;
  side: "left" | "right";
};

export const STORY_MILESTONES: Milestone[] = [
  { title: "Groom Arrives", date: "10:00 AM", text: "Shehan arrives at the Poruwa location, surrounded by family.", side: "left" },
  { title: "Bride Arrives", date: "10:20 AM", text: "Kavini makes her grand entrance to begin the ceremony.", side: "right" },
  { title: "Poruwa Ceremony", date: "10:30 AM", text: "The sacred rituals unite our families in tradition.", side: "left" },
  { title: "Reception Begins", date: "11:30 AM", text: "Guests are welcomed into the hall for celebration.", side: "right" },
  { title: "Lunch & Toasts", date: "1:00 PM", text: "A shared meal, followed by heartfelt words from loved ones.", side: "left" },
  { title: "First Dance & Send Off", date: "3:00 PM", text: "We close the day dancing into our forever.", side: "right" },
];

export type WeddingDetail = {
  id: string;
  icon: string;
  name: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
};

export const WEDDING_DETAILS: WeddingDetail[] = [
  {
    id: "poruwa",
    icon: "◆",
    name: "Poruwa Ceremony",
    time: "10:00 AM onwards",
    venue: "Cinnamon Grand Colombo, Ballroom A",
    address: "77 Galle Road, Colombo 03",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Cinnamon+Grand+Colombo",
  },
  {
    id: "reception",
    icon: "✦",
    name: "Reception",
    time: "11:30 AM onwards",
    venue: "Shangri-La Colombo, Grand Ballroom",
    address: "1 Galle Face, Colombo 02",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Shangri-La+Colombo",
  },
];

export type Guest = { name: string; table: string; seat: string };

export const GUESTS: Guest[] = [
  { name: "Amal Silva", table: "4", seat: "2" },
  { name: "Nadeesha Gunawardena", table: "2", seat: "5" },
  { name: "Rohan Wickramasinghe", table: "6", seat: "1" },
  { name: "Tharushi Jayasuriya", table: "3", seat: "7" },
  { name: "Dinesh Rajapaksa", table: "5", seat: "3" },
  { name: "Ishara Fonseka", table: "1", seat: "4" },
  { name: "Chamod Perera", table: "4", seat: "6" },
  { name: "Yasodha Bandara", table: "2", seat: "2" },
];

export const GALLERY_ROTATIONS = [
  "-3deg", "2deg", "-1deg", "3deg", "-2deg", "1deg", "-4deg", "2deg",
];

export const GALLERY_SLOTS = GALLERY_ROTATIONS.map((rotate, i) => ({
  id: `gallery-${i + 1}`,
  rotate,
}));

export const CONFETTI_COLORS = ["#B89C63", "#A9BA9A", "#3A2E26", "#F1EAD9"];

export const MOMENT_ROTATIONS = ["-3deg", "2deg", "-2deg", "3deg", "-1deg", "1deg"];

export type ImageSlotDefinition = { id: string; label: string; shape: "rect" | "rounded" | "circle" };

/** Every named <image-slot> in the site — the admin Images page manages exactly this list. */
export const IMAGE_SLOTS: ImageSlotDefinition[] = [
  { id: "hero-bg", label: "Hero background photo", shape: "rect" },
  { id: "bride-portrait", label: "Bride portrait", shape: "circle" },
  { id: "groom-portrait", label: "Groom portrait", shape: "circle" },
  { id: "rsvp-photo", label: "RSVP couple photo", shape: "rounded" },
  ...GALLERY_SLOTS.map((g, i) => ({
    id: g.id,
    label: `Gallery placeholder photo ${i + 1}`,
    shape: "rect" as const,
  })),
];


export type GuestMoment = {
  id: number;
  name: string;
  message: string;
  /** Hosted URL of the guest's captured/uploaded photo. */
  img: string;
  rotate: string;
};

export type GalleryTile =
  | { kind: "slot"; id: string; rotate: string; src?: string }
  | { kind: "moment"; id: string; name: string; message: string; img: string; rotate: string };

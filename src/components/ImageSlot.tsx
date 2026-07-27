import Image from "next/image";
import type { CSSProperties } from "react";

type Shape = "rect" | "rounded" | "circle";

type ImageSlotProps = {
  id?: string;
  /** Caption shown in the empty state, e.g. "Drop the couple photo here". */
  placeholder: string;
  shape?: Shape;
  /** Corner radius in px, only used when shape="rounded". */
  radius?: number;
  /** Once real photography is ready, point this at a file in /public. */
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  /** Passed straight to next/image `sizes`; defaults to a full-bleed guess. */
  sizes?: string;
};

const radiusFor = (shape: Shape, radius?: number) => {
  if (shape === "circle") return "9999px";
  if (shape === "rect") return "0px";
  return `${radius ?? 12}px`;
};

/**
 * Stand-in for the design prototype's <image-slot> drag-and-drop editor
 * chrome. In production there's no in-browser editor — this just renders a
 * soft, subtly-striped placeholder until a real `src` is wired up.
 */
export function ImageSlot({
  id,
  placeholder,
  shape = "rounded",
  radius,
  src,
  alt = "",
  className = "",
  style,
  priority,
  sizes = "100vw",
}: ImageSlotProps) {
  const borderRadius = radiusFor(shape, radius);

  if (src) {
    return (
      <div
        id={id}
        className={`relative overflow-hidden ${className}`}
        style={{ borderRadius, ...style }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`relative flex items-center justify-center overflow-hidden border border-gold/25 bg-[repeating-linear-gradient(135deg,rgba(184,156,99,0.08)_0px,rgba(184,156,99,0.08)_10px,rgba(184,156,99,0.03)_10px,rgba(184,156,99,0.03)_20px)] ${className}`}
      style={{ borderRadius, ...style }}
    >
      <span className="max-w-[80%] text-center font-mono text-[11px] leading-snug tracking-wide text-espresso/50">
        {placeholder}
      </span>
    </div>
  );
}

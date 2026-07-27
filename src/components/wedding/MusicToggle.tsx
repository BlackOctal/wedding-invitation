"use client";

import { useRef, useState } from "react";

/**
 * Drop the reception track at /public/audio/background.mp3 and this just
 * starts working — no code changes needed.
 */
export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    const audio = audioRef.current;
    if (playing) {
      audio?.pause();
      setPlaying(false);
    } else {
      audio?.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/background.mp3" loop preload="none" className="hidden" />
      <button
        onClick={toggle}
        aria-label="Toggle music"
        className="fixed top-5 right-5 z-[60] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gold/50 bg-ivory/85 text-lg text-espresso backdrop-blur-sm"
      >
        {playing ? "♫" : "♪"}
      </button>
    </>
  );
}

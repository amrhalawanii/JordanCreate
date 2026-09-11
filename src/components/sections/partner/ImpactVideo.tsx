"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/** Autoplay partner impact reel — pauses when the user prefers reduced motion. */
export function ImpactVideo({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }
    void video.play().catch(() => {
      /* autoplay may be blocked — poster frame is fine */
    });
  }, [reduceMotion]);

  return (
    <div
      className="relative min-h-[480px] overflow-hidden rounded-(--radius-media) bg-surface lg:h-auto lg:min-h-[100%]"
      role="region"
      aria-label={caption}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src={src}
        autoPlay={!reduceMotion}
        muted
        loop={!reduceMotion}
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
      />
      <p className="absolute bottom-7 left-5 right-5 font-body text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-footer-nav-label sm:bottom-8 sm:left-6 sm:text-[30px]">
        {caption}
      </p>
    </div>
  );
}

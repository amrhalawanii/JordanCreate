"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { PageHero as PageHeroType } from "@/content/schemas/tab";
import { GradientButton } from "./GradientButton";

export function PageHero({ hero }: { hero: PageHeroType }) {
  // The three page heroes are genuinely different sizes on the live site
  // (Speakers/About: 166px, Partner: 100px) — a fluid clamp() scaled off
  // each page's own real desktop size, rather than one shared fixed size,
  // reproduces that difference while still fitting small screens.
  const vw = (hero.headingSizeDesktop / 1440) * 100;
  const min = Math.round(hero.headingSizeDesktop * 0.32);
  const reduceMotion = useReducedMotion();

  return (
    <header className="relative flex min-h-[52vh] flex-col items-center justify-center overflow-hidden bg-canvas-deeper px-5 py-24 text-center sm:min-h-[60vh] md:px-10 md:py-28">
      <motion.div
        // Keep visible during SSR/hydration so a slow JS load isn't a blank page.
        initial={reduceMotion ? false : { opacity: 1, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <Image src={hero.backgroundImage} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-canvas-deeper/60" />
      </motion.div>
      <motion.div
        initial={reduceMotion ? false : { opacity: 1, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          delay: reduceMotion ? 0 : 0.15,
        }}
        className="relative z-10 flex w-full max-w-(--container-primary) flex-col items-center gap-5"
      >
        <h1
          className="max-w-full break-words font-display leading-[1.05] tracking-[-0.05em] text-text-primary [overflow-wrap:anywhere]"
          style={{ fontSize: `clamp(${min}px, ${vw.toFixed(1)}vw, ${hero.headingSizeDesktop}px)` }}
        >
          {hero.heading}
        </h1>
        {hero.subheading && (
          <p className="max-w-md font-body text-lg leading-[1.6] tracking-[-0.4px] text-text-gray-light sm:text-xl">
            {hero.subheading}
          </p>
        )}
        {hero.cta && <GradientButton href={hero.cta.href}>{hero.cta.label}</GradientButton>}
      </motion.div>
    </header>
  );
}

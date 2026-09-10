"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { PageHero as PageHeroType } from "@/content/schemas/tab";
import { GradientButton } from "./GradientButton";

export function PageHero({ hero }: { hero: PageHeroType }) {
  // The three page heroes are genuinely different sizes on the live site
  // (Speakers/About: 166px, Partner: 100px) — a fluid clamp() scaled off
  // each page's own real desktop size, rather than one shared fixed size,
  // reproduces that difference while still fitting small screens.
  const vw = (hero.headingSizeDesktop / 1440) * 100;
  const min = Math.round(hero.headingSizeDesktop * 0.32);

  return (
    <header className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-canvas-deeper px-5 py-28 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <Image src={hero.backgroundImage} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-canvas-deeper/60" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        className="relative z-10 flex flex-col items-center gap-5"
      >
        <h1
          className="font-display leading-[1.05] tracking-[-0.05em] text-text-primary"
          style={{ fontSize: `clamp(${min}px, ${vw.toFixed(1)}vw, ${hero.headingSizeDesktop}px)` }}
        >
          {hero.heading}
        </h1>
        {hero.subheading && (
          <p className="max-w-md font-body-fallback text-xl leading-[1.6] tracking-[-0.4px] text-text-gray-light">
            {hero.subheading}
          </p>
        )}
        {hero.cta && <GradientButton href={hero.cta.href}>{hero.cta.label}</GradientButton>}
      </motion.div>
    </header>
  );
}

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { PageHero as PageHeroType } from "@/content/schemas/tab";

export function PageHero({ hero }: { hero: PageHeroType }) {
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
        <h1 className="font-display text-[48px] italic leading-none text-text-primary uppercase sm:text-[56px]">
          {hero.heading}
        </h1>
        {hero.subheading && (
          <p className="max-w-md font-body text-base text-text-gray-light">{hero.subheading}</p>
        )}
        {hero.cta && (
          <a
            href={hero.cta.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-(--radius-pill-lg) bg-brand-orange px-8 py-3 font-label text-xs font-medium uppercase tracking-wide text-on-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:bg-brand-orange-hot"
          >
            {hero.cta.label}
          </a>
        )}
      </motion.div>
    </header>
  );
}

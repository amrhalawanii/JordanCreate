"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { HeroContent } from "@/content/schemas/hero";

export function HeroAnimated({ hero }: { hero: HeroContent }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-canvas-deeper px-5 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Image
          src="/assets/hero/home-hero.png"
          alt=""
          width={840}
          height={1014}
          priority
          className="h-full max-h-[900px] w-auto object-contain"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <h1 className="font-display text-[56px] leading-none font-normal uppercase text-text-primary sm:text-[66px]">
          {hero.heading}
        </h1>
        <p className="max-w-md font-body-fallback text-[17px] leading-[1.2] text-text-primary">
          {hero.subheading}
        </p>
        <a
          href={hero.cta.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-(--radius-pill-lg) bg-brand-orange px-8 py-3 font-body-fallback text-base font-medium leading-[1.2] text-on-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:bg-brand-orange-hot"
        >
          {hero.cta.label}
        </a>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-body-fallback text-sm leading-[1.3] text-brand-orange"
      >
        {hero.scrollHint}
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { PageHero as PageHeroType } from "@/content/schemas/tab";
import { GradientButton } from "./GradientButton";

/**
 * Shared page hero for About / Agenda / Partner — matched to live Framer
 * `#hero` (Office Space cityscape, ~472–505px desktop, full-opacity cover).
 * Speakers uses its own collage hero instead.
 */
export function PageHero({ hero }: { hero: PageHeroType }) {
  // Live desktop sizes: About 166px, Partner/Agenda 100px — clamp from each.
  const vw = (hero.headingSizeDesktop / 1440) * 100;
  const min = Math.round(hero.headingSizeDesktop * 0.36);
  const reduceMotion = useReducedMotion();

  return (
    <header className="relative flex h-[min(472px,70vw)] min-h-[249px] flex-col items-center justify-center overflow-hidden bg-black px-5 text-center md:px-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 1, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: reduceMotion ? 0 : 0.15,
        }}
        className="relative z-10 flex w-full max-w-(--container-primary) flex-col items-center gap-3 sm:gap-4"
      >
        <h1
          className="max-w-full break-words font-display leading-[1.15] text-white [overflow-wrap:anywhere]"
          style={{
            fontSize: `clamp(${min}px, ${vw.toFixed(1)}vw, ${hero.headingSizeDesktop}px)`,
            letterSpacing: "-0.05em",
          }}
        >
          {hero.heading}
        </h1>
        {hero.subheading ? (
          <p className="max-w-xl font-body text-base leading-[1.5] text-[#797b85] sm:text-lg">
            {hero.subheading}
          </p>
        ) : null}
        {hero.cta ? <GradientButton href={hero.cta.href}>{hero.cta.label}</GradientButton> : null}
      </motion.div>
    </header>
  );
}

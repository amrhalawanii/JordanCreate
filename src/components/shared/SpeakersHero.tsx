"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { PageHero as PageHeroType } from "@/content/schemas/tab";
import {
  speakersHeroCollage,
  speakersHeroCollageMobileOrder,
} from "@/content/data/speakersHeroCollage";
import { GradientButton } from "./GradientButton";

/**
 * Speakers page hero — matched to live jordancreate.com/speakers:
 * solid black, 100vh collage (≥1200px), centered SPEAKERS + sub + CTA;
 * below 1200px: left-aligned copy then a 2-column photo grid.
 */
export function SpeakersHero({ hero }: { hero: PageHeroType }) {
  const reduceMotion = useReducedMotion();
  const byId = Object.fromEntries(speakersHeroCollage.map((item) => [item.id, item]));
  const mobileItems = speakersHeroCollageMobileOrder.map((id) => byId[id]).filter(Boolean);

  return (
    <header className="relative -mt-(--header-height) overflow-hidden bg-black min-[1200px]:h-svh">
      {/* Desktop collage — behind type; coords measured on live at 1440×900 incl. header overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] hidden min-[1200px]:block"
        aria-hidden
      >
        {speakersHeroCollage.map((item, index) => (
          <motion.div
            key={item.id}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : 0.08 + index * 0.04,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="absolute overflow-hidden rounded-(--radius-default)"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              width: `${item.width}%`,
              height: `${item.height}%`,
            }}
          >
            <Image
              src={item.src}
              alt=""
              fill
              sizes="(min-width: 1200px) 18vw, 0px"
              className="object-cover"
              priority={index < 4}
            />
          </motion.div>
        ))}
      </div>

      {/* Copy */}
      <div className="relative z-[3] flex flex-col px-5 pt-[calc(var(--header-height)+2rem)] pb-8 md:px-10 min-[1200px]:h-full min-[1200px]:items-center min-[1200px]:justify-center min-[1200px]:px-10 min-[1200px]:pt-0 min-[1200px]:pb-0">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex w-full max-w-[732px] flex-col items-start gap-3 min-[1200px]:items-center min-[1200px]:gap-5 min-[1200px]:text-center"
        >
          <h1
            className="font-display text-[64px] leading-[1.05] text-white uppercase min-[1200px]:text-[clamp(96px,11.5vw,166px)] min-[1200px]:leading-[1.01] min-[1200px]:tracking-[-0.048em]"
          >
            {hero.heading}
          </h1>
          {hero.subheading ? (
            <p className="max-w-md font-body text-base leading-[1.5] text-[#a3a3a3] sm:text-lg min-[1200px]:max-w-[732px] min-[1200px]:text-xl min-[1200px]:leading-[1.6]">
              {hero.subheading}
            </p>
          ) : null}
          {hero.cta ? (
            <GradientButton
              href={hero.cta.href}
              className="mt-1 h-9 border-0 px-4 py-2 text-sm font-medium leading-none min-[1200px]:mt-0 min-[1200px]:h-auto min-[1200px]:px-6 min-[1200px]:py-3 min-[1200px]:text-base"
            >
              {hero.cta.label}
            </GradientButton>
          ) : null}
        </motion.div>
      </div>

      {/* Mobile / tablet grid */}
      <div className="relative z-[3] grid grid-cols-2 gap-2.5 px-5 pb-10 md:px-10 min-[1200px]:hidden">
        {mobileItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              delay: reduceMotion ? 0 : 0.15 + index * 0.03,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative aspect-square overflow-hidden rounded-(--radius-default) bg-surface"
          >
            <Image
              src={item.src}
              alt=""
              fill
              sizes="(max-width: 1199px) 50vw, 0px"
              className="object-cover"
              priority={index < 4}
            />
          </motion.div>
        ))}
      </div>
    </header>
  );
}

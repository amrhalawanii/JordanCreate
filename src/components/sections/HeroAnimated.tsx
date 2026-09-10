"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import type { HeroContent } from "@/content/schemas/hero";
import { GradientButton } from "@/components/shared/GradientButton";

/**
 * Home hero — matches jordancreate.com layout/motion from the slow
 * screen recording, with the frame kept sharp (no CSS blur).
 *
 * Live site uses a soft blur(2px)+0.6 opacity on the frame layer; we omit
 * that blur per product request and render the frame crisp at full opacity.
 */
export function HeroAnimated({ hero }: { hero: HeroContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Progress while Get to Know Us covers the pinned hero
    offset: ["start start", "end start"],
  });

  const frameY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -80]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.06]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduceMotion ? 1 : 0.35]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, reduceMotion ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, reduceMotion ? 0 : -24]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="sticky top-0 z-0 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-canvas px-5 text-center"
    >
      {/* Frame — sharp, full opacity (no blur) */}
      <motion.div
        style={{ y: frameY, scale: frameScale, opacity: frameOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease }}
          className="relative flex h-full w-full items-center justify-center"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative flex h-[58%] max-h-[560px] w-auto items-center justify-center sm:h-[64%] sm:max-h-[620px]"
          >
            <Image
              src="/assets/hero/home-hero.png"
              alt=""
              width={840}
              height={1014}
              priority
              className="h-full w-auto max-w-[min(90vw,520px)] object-contain"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Copy over the frame opening */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex max-w-2xl flex-col items-center gap-5 sm:gap-6"
      >
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.55 }}
          className="font-display text-[48px] leading-[0.95] font-normal tracking-[-0.02em] text-text-primary uppercase sm:text-[66px]"
        >
          {hero.heading}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.85 }}
          className="max-w-md font-body text-[16px] leading-[1.35] text-text-primary sm:text-[17px]"
        >
          {hero.subheading}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 1.1 }}
        >
          <GradientButton href={hero.cta.href} className="px-8 py-3">
            {hero.cta.label}
          </GradientButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-brand-orange"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="24"
            fill="none"
            viewBox="0 0 16 24"
            aria-hidden
            className="shrink-0"
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="22"
              rx="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="8"
              y1="6"
              x2="8"
              y2="10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-body text-sm leading-[1.3] whitespace-nowrap">
            {hero.scrollHint}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

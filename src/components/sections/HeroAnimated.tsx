"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import type { HeroContent } from "@/content/schemas/hero";

export function HeroAnimated({ hero }: { hero: HeroContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  // Scroll-linked parallax: tracks progress while the hero section itself
  // is the one scrolling past (its top leaving the viewport top through its
  // bottom leaving it), so the frame drifts up, grows slightly, and fades
  // as the user scrolls away -- independent of the one-time mount fade-in
  // below (different transform/opacity layer, so the two don't fight).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const frameY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const frameOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-canvas-deeper px-5 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          style={{ y: frameY, scale: frameScale, opacity: frameOpacity }}
          className="flex h-full items-center justify-center"
        >
          <Image
            src="/assets/hero/home-hero.png"
            alt=""
            width={840}
            height={1014}
            priority
            className="h-[55%] max-h-[560px] w-auto object-contain sm:h-[60%] sm:max-h-[640px]"
          />
        </motion.div>
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

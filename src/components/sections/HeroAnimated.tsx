"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import type { HeroContent } from "@/content/schemas/hero";
import { GradientButton } from "@/components/shared/GradientButton";

/**
 * Home hero — matches jordancreate.com layout/motion from the slow
 * screen recording, with the frame kept sharp (no CSS blur).
 *
 * Live site uses a soft blur(2px)+0.6 opacity on the frame layer; we omit
 * that blur per product request and render the frame crisp at full opacity.
 * Depth comes from a second, slower "frame-on-frame" layer + mouse/scroll.
 */
export function HeroAnimated({ hero }: { hero: HeroContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Progress while Get to Know Us covers the pinned hero
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.4 });

  const frontParallaxX = useTransform(springX, (v) => (reduceMotion ? 0 : v * 18));
  const frontParallaxY = useTransform(springY, (v) => (reduceMotion ? 0 : v * 14));
  const backParallaxX = useTransform(springX, (v) => (reduceMotion ? 0 : v * -28));
  const backParallaxY = useTransform(springY, (v) => (reduceMotion ? 0 : v * -20));
  const frontTiltX = useTransform(springY, (v) => (reduceMotion ? 0 : v * -3));
  const frontTiltY = useTransform(springX, (v) => (reduceMotion ? 0 : v * 3.5));

  const frameY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -120]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.12]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -2.5]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 0.85, reduceMotion ? 1 : 0.2]);
  const backFrameY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -180]);
  const backFrameScale = useTransform(scrollYProgress, [0, 1], [1.06, reduceMotion ? 1.06 : 1.22]);
  const backFrameOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.85],
    [0.28, 0.18, reduceMotion ? 0.28 : 0]
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, reduceMotion ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, reduceMotion ? 0 : -36]);
  const [heroContentInert, setHeroContentInert] = useState(false);
  useMotionValueEvent(contentOpacity, "change", (value) => {
    setHeroContentInert(!reduceMotion && value < 0.08);
  });

  const ease = [0.22, 1, 0.36, 1] as const;

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function onPointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="sticky top-0 z-0 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-canvas px-5 text-center"
    >
      {/* Soft gold ambient wash that breathes with the frame */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          animate={{
            opacity: [0.18, 0.32, 0.18],
            scale: [1, 1.06, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(234,143,45,0.22) 0%, transparent 68%)",
          }}
        />
      )}

      {/* Back frame — larger, dimmer, opposite mouse drift (depth layer) */}
      <motion.div
        style={{
          y: backFrameY,
          scale: backFrameScale,
          opacity: backFrameOpacity,
          x: backParallaxX,
        }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          style={{ y: backParallaxY }}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.18, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
          transition={{ duration: 2.6, ease }}
          className="relative flex h-[62%] max-h-[600px] w-auto items-center justify-center sm:h-[70%] sm:max-h-[680px]"
        >
          <Image
            src="/assets/hero/home-hero.png"
            alt=""
            width={840}
            height={1014}
            priority
            className="h-full w-auto max-w-[min(96vw,580px)] object-contain opacity-80"
          />
        </motion.div>
      </motion.div>

      {/* Front frame — sharp primary layer */}
      <motion.div
        style={{
          y: frameY,
          scale: frameScale,
          opacity: frameOpacity,
          rotate: frameRotate,
          x: frontParallaxX,
        }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.14, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 2.4, ease, delay: 0.12 }}
          className="relative flex h-full w-full items-center justify-center"
          style={{
            rotateX: frontTiltX,
            rotateY: frontTiltY,
            transformPerspective: 1200,
          }}
        >
          <motion.div style={{ y: frontParallaxY }}>
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -10, 0],
                      rotate: [0, -0.8, 0.6, 0],
                      scale: [1, 1.015, 1],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 9, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative flex h-[58%] max-h-[560px] w-auto items-center justify-center sm:h-[64%] sm:max-h-[620px]"
            >
              <Image
                src="/assets/hero/home-hero.png"
                alt=""
                width={840}
                height={1014}
                priority
                className="h-full w-auto max-w-[min(90vw,520px)] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Copy over the frame opening */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        inert={heroContentInert || undefined}
        aria-hidden={heroContentInert || undefined}
        className={`relative z-10 flex max-w-2xl flex-col items-center gap-5 sm:gap-6 ${
          heroContentInert ? "pointer-events-none" : ""
        }`}
      >
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease, delay: 0.7 }}
          className="font-display text-[48px] font-normal not-italic leading-[48px] tracking-normal text-white uppercase sm:text-[66px] sm:leading-[66px]"
        >
          {hero.heading}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, ease, delay: 1.0 }}
          className="max-w-md font-body text-[16px] leading-[1.35] text-text-primary sm:text-[17px]"
        >
          {hero.subheading}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, ease, delay: 1.25 }}
        >
          <GradientButton href={hero.cta.href} className="px-8 py-3">
            {hero.cta.label}
          </GradientButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.75 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-brand-orange"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 6, 0], opacity: [0.7, 1, 0.7] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
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

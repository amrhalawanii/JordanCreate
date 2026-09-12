"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * Scroll-scrubbed character color reveal — matched to live Framer
 * `RevealText` on About → Our Story:
 * unrevealed #666 → revealed brand orange, with a white climax suffix.
 * Words stay atomic (`nowrap`) so lines don't break mid-word.
 */
function RevealChar({
  char,
  index,
  total,
  progress,
  revealedColor,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  revealedColor: string;
}) {
  const color = useTransform(progress, (p) => {
    const threshold = total <= 1 ? 0 : index / (total - 1);
    if (p < threshold - 0.02) return "#666666";
    if (p < threshold) return "#f0b48a";
    return revealedColor;
  });

  return <motion.span style={{ color }}>{char}</motion.span>;
}

export function ScrollColorReveal({
  text,
  highlightSuffix = "",
  className = "",
}: {
  text: string;
  /** Trailing phrase that reveals to white instead of orange (live: "changed that."). */
  highlightSuffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();

  const suffix = highlightSuffix && text.endsWith(highlightSuffix) ? highlightSuffix : "";
  const main = suffix ? text.slice(0, text.length - suffix.length) : text;

  const tokens: { c: string; tone: "orange" | "white" }[] = [
    ...[...main].map((c) => ({ c, tone: "orange" as const })),
    ...[...suffix].map((c) => ({ c, tone: "white" as const })),
  ];

  // Group into words (spaces kept separate). Spaces must live OUTSIDE the
  // inline-block wrappers — trailing whitespace inside inline-block collapses
  // in the layout engine, which glued the Our Story copy into one run-on line.
  const words: { c: string; tone: "orange" | "white" }[][] = [];
  let current: { c: string; tone: "orange" | "white" }[] = [];
  tokens.forEach((token) => {
    if (token.c === " ") {
      if (current.length) words.push(current);
      current = [];
      words.push([]); // empty slot = space separator after previous word
    } else {
      current.push(token);
    }
  });
  if (current.length) words.push(current);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.35"],
  });

  if (reduceMotion) {
    return (
      <p className={className}>
        <span className="text-brand-orange">{main}</span>
        {suffix ? <span className="text-white">{suffix}</span> : null}
      </p>
    );
  }

  let globalIndex = 0;

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => {
        if (word.length === 0) {
          // Explicit space token between word wrappers (counts toward reveal progress).
          const index = globalIndex++;
          return (
            <RevealChar
              key={`sp-${wi}`}
              char=" "
              index={index}
              total={tokens.length}
              progress={scrollYProgress}
              revealedColor="#ea8f2d"
            />
          );
        }

        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.map((item) => {
              const index = globalIndex++;
              return (
                <RevealChar
                  key={index}
                  char={item.c}
                  index={index}
                  total={tokens.length}
                  progress={scrollYProgress}
                  revealedColor={item.tone === "white" ? "#ffffff" : "#ea8f2d"}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// Restrained opacity + small translate on scroll-into-view. Skips motion
// when the user prefers reduced motion (product a11y baseline).
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Initial translate-Y in px (default 24). */
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // "some" = any pixel visible. Fractional `amount` breaks on tall sections
      // (e.g. speakers grid) because 12–15% of the element never fits the viewport.
      viewport={{ once: true, amount: "some", margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Layout wrapper for staggered children — pair with `StaggerItem`. */
export function Stagger({
  children,
  className,
  stagger: _stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  /** Kept for call-site compat; items self-orchestrate via whileInView. */
  stagger?: number;
}) {
  void _stagger;
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Each item reveals itself when it enters view. Parent-orchestrated
  // staggerChildren fails on tall grids (amount never satisfied → opacity 0 forever).
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some", margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

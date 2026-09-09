"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Restrained opacity + small translate on scroll-into-view, matching the
// site's own motion language: short, direct transitions (confirmed link
// transition is 0.1s cubic-bezier(0,0,1,1); confirmed reveal-fade transition
// is opacity 0.4s ease-out — see MOTION-SPEC.md). Fires once, not on every
// scroll-up re-entry, since the exact replay behavior wasn't independently
// confirmed against the live site.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

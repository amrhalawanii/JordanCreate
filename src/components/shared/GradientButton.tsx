"use client";

import { motion, useReducedMotion } from "motion/react";
import { VisuallyHidden } from "./VisuallyHidden";

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("//");
}

// The primary CTA pill everywhere on the site (Count Me In / Join Us /
// Contact us) — a diagonal gradient fill with a 2px translucent white
// border, not a flat orange background. Exact values from the Figma
// source (see design-tokens.json's --gradient-brand-orange).
export function GradientButton({
  href,
  children,
  className = "",
  external,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Defaults to true for absolute http(s) URLs, false for internal paths. */
  external?: boolean;
  "aria-label"?: string;
}) {
  const reduceMotion = useReducedMotion();
  const isExternal = external ?? isExternalHref(href);

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      style={{ backgroundImage: "var(--gradient-brand-orange)" }}
      className={`inline-flex items-center justify-center rounded-(--radius-pill-lg) border-2 border-white/20 px-6 py-3 font-body text-base font-medium leading-[1.2] text-on-orange transition-[filter,border-color] duration-150 hover:border-white/40 hover:brightness-105 active:brightness-95 ${className}`}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0, 0, 1, 1] }}
    >
      {children}
      {isExternal && !ariaLabel ? (
        <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
      ) : null}
    </motion.a>
  );
}

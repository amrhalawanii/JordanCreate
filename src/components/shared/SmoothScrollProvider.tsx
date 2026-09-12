"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// The live site loads Lenis (lenis@1.3.17-framer, confirmed in Phase 0's
// raw stylesheet dump) for smooth scrolling. Default easing/duration here —
// not independently re-derived from the live site's exact tuning, since
// that requires a screen recording rather than static extraction (see
// MOTION-SPEC.md "deferred to Phase 5").
export function SmoothScrollProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // Nested overflow panels (gallery #work) mark themselves with this attr.
      prevent: (node) =>
        node instanceof HTMLElement &&
        (node.hasAttribute("data-lenis-prevent") ||
          Boolean(node.closest("[data-lenis-prevent]"))),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

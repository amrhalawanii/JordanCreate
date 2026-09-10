"use client";

import { motion, useReducedMotion } from "motion/react";

// Exact port of Framer's Grain.LxScFeGX component used on jordancreate.com:
// 256×256 repeating tile, opacity 0.05, oversized to 400% / inset -200%,
// x/y keyframe jitter over 8s with a 10-step "start" stepped ease, infinite.
const GRAIN_X = ["0%", "-5%", "-15%", "7%", "-5%", "-15%", "15%", "0%", "3%", "-10%"];
const GRAIN_Y = ["0%", "-10%", "5%", "-25%", "25%", "10%", "0%", "15%", "35%", "10%"];

function steppedEase(steps: number, from: "start" | "end" = "start") {
  return (t: number) => {
    const n = from === "end" ? Math.min(t, 0.999) : Math.max(t, 0.001);
    const r = n * steps;
    const stepped = (from === "end" ? Math.floor(r) : Math.ceil(r)) / steps;
    return Math.min(1, Math.max(0, stepped));
  };
}

export function GrainOverlay({ opacity = 0.05 }: { opacity?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -inset-[200%] h-[400%] w-[400%]"
        style={{
          opacity,
          backgroundImage: "url('/assets/texture/grain.png')",
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
          willChange: reduceMotion ? undefined : "transform",
        }}
        animate={reduceMotion ? undefined : { x: GRAIN_X, y: GRAIN_Y }}
        transition={
          reduceMotion
            ? undefined
            : {
                ease: steppedEase(10, "start"),
                repeat: Infinity,
                duration: 8,
              }
        }
      />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "motion/react";

// Parses "350+", "70M+", "15", "3" into a numeric core plus preserved
// prefix/suffix, animates the number counting up when it scrolls into view,
// and re-assembles the original formatting so "70M+" counts 0→70 and lands
// back on "70M+" rather than losing its unit.
export function CountUpStat({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(
    reduceMotion || !match ? value : `${match[1]}0${match[3]}`,
  );

  useEffect(() => {
    if (!match || !inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const [, prefix = "", numStr = "0", suffix = ""] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? (numStr.split(".")[1]?.length ?? 0) : 0;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(v) {
        setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion]);

  if (!match) {
    return (
      <motion.span
        ref={ref}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={inView || reduceMotion ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className={className}
      >
        {value}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

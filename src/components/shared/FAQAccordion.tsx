"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { FAQEntry } from "@/content/schemas/faq";

export function FAQAccordion({ entries }: { entries: FAQEntry[] }) {
  // The live site's FAQ is NOT a single-open accordion — multiple rows can
  // be expanded at once (confirmed during Phase 0 extraction). Track open
  // state as a set rather than a single active id.
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const left = entries.filter((_, i) => i % 2 === 0);
  const right = entries.filter((_, i) => i % 2 === 1);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {[left, right].map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4">
          {col.map((entry) => {
            const open = openIds.has(entry.id);
            const buttonId = `${baseId}-${entry.id}-btn`;
            const panelId = `${baseId}-${entry.id}-panel`;
            return (
              <div
                key={entry.id}
                className="rounded-(--radius-default) border border-white/10 bg-canvas-deep transition-colors duration-150 hover:border-white/20"
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => toggle(entry.id)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-3 rounded-(--radius-default) p-4 text-left transition-colors duration-150 hover:bg-white/[0.02]"
                  >
                    <span className="font-label text-base leading-[1.2] font-medium text-text-primary">
                      {entry.question}
                    </span>
                    <span
                      aria-hidden
                      className={`flex h-4 w-4 shrink-0 items-center justify-center transition-transform duration-150 ${open ? "rotate-45" : ""}`}
                    >
                      <Image src="/assets/icons/faq-plus.svg" alt="" width={16} height={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="answer"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.22,
                        ease: [0, 0, 1, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 font-body text-base leading-[1.3] text-text-gray-light">
                        {entry.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

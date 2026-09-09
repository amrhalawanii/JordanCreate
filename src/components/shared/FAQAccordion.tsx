"use client";

import { useState } from "react";
import type { FAQEntry } from "@/content/schemas/faq";

export function FAQAccordion({ entries }: { entries: FAQEntry[] }) {
  // The live site's FAQ is NOT a single-open accordion — multiple rows can
  // be expanded at once (confirmed during Phase 0 extraction). Track open
  // state as a set rather than a single active id.
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

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
    <div className="grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
      {[left, right].map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col">
          {col.map((entry) => {
            const open = openIds.has(entry.id);
            return (
              <div key={entry.id} className="border-b border-border-subtle py-4">
                <button
                  type="button"
                  onClick={() => toggle(entry.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-label text-base leading-[1.2] font-medium text-text-primary">
                    {entry.question}
                  </span>
                  <span
                    aria-hidden
                    className={`shrink-0 text-lg text-text-gray-light transition-transform duration-150 ${open ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <p className="mt-3 font-body text-base leading-[1.3] text-text-gray-light">
                    {entry.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

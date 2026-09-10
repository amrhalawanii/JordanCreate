"use client";

import { useState } from "react";
import Image from "next/image";
import type { InfoTab } from "@/content/schemas/tab";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { GradientButton } from "@/components/shared/GradientButton";

// Rebuilt to match the Figma source exactly: a tab BAR (trigger row with a
// bottom-border indicator on the active item), not the accordion-style
// stacked panels this used to be. Only the active tab's image is visible —
// all three are stacked and crossfaded via opacity, not swapped — and the
// content panel below has no card/border, just text on transparent bg.
export function GetToKnowUs({ tabs }: { tabs: InfoTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0];
  if (!current) return null;

  const count = tabs.length;
  const goPrev = () => setActive((a) => (a - 1 + count) % count);
  const goNext = () => setActive((a) => (a + 1) % count);

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Eyebrow>Get to know us</Eyebrow>
        <h2 className="mt-3 max-w-xl font-display text-[40px] leading-[1.1] tracking-[-1.2px] text-text-primary uppercase sm:text-[52.6px] sm:tracking-[-1.68px]">
          Every answer you <br className="hidden sm:block" />
          need, <span className="text-brand-orange">in one place</span>
        </h2>

        {/* Tab bar */}
        <div className="relative mt-12 flex w-full border-b border-white/10">
          {tabs.map((tab, i) => {
            const isActive = i === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(i)}
                className={`relative px-3 py-2 font-body-fallback text-base leading-[1.2] transition-colors duration-150 ${
                  isActive ? "text-text-primary" : "text-text-gray-muted"
                }`}
              >
                {tab.trigger}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-px bg-white/32" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-8 md:flex-row md:gap-12">
          <div className="relative aspect-square w-full overflow-hidden rounded-(--radius-default) md:flex-1">
            {tabs.map((tab, i) => (
              <Image
                key={tab.id}
                src={tab.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`object-cover transition-opacity duration-300 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
              />
            ))}
            <div className="absolute inset-0 rounded-(--radius-default) border border-white/10" />
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas/80 backdrop-blur transition-colors hover:bg-brand-orange"
              >
                <Image src="/assets/icons/arrow-left.svg" alt="" width={16} height={16} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas/80 backdrop-blur transition-colors hover:bg-brand-orange"
              >
                <Image src="/assets/icons/arrow-right.svg" alt="" width={16} height={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 md:flex-1 md:max-w-[400px]">
            <div className="flex flex-col gap-4">
              <p className="font-body text-xl leading-[1.2] tracking-[-0.4px] text-text-primary">
                {current.body}
              </p>
            </div>
            <GradientButton href={current.cta.href} className="w-fit">
              {current.cta.label}
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
}

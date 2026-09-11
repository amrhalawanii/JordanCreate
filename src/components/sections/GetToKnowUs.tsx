"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import type { InfoTab } from "@/content/schemas/tab";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { GradientButton } from "@/components/shared/GradientButton";
import { Reveal } from "@/components/shared/Reveal";

export function GetToKnowUs({ tabs }: { tabs: InfoTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0];
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  if (!current) return null;

  const count = tabs.length;
  const goPrev = () => setActive((a) => (a - 1 + count) % count);
  const goNext = () => setActive((a) => (a + 1) % count);

  function focusTab(index: number) {
    setActive(index);
    tabRefs.current[index]?.focus();
  }

  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (count === 0) return;
    let next = index;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        next = (index + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        next = (index - 1 + count) % count;
        break;
      case "Home":
        e.preventDefault();
        next = 0;
        break;
      case "End":
        e.preventDefault();
        next = count - 1;
        break;
      default:
        return;
    }
    focusTab(next);
  }

  const prevLabel = tabs[(active - 1 + count) % count]?.trigger ?? "Previous";
  const nextLabel = tabs[(active + 1) % count]?.trigger ?? "Next";
  const panelId = `${baseId}-panel`;
  const tabId = (i: number) => `${baseId}-tab-${i}`;

  return (
    <section className="relative z-10 section-shell bg-canvas" aria-labelledby={`${baseId}-heading`}>
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <Eyebrow>Get to know us</Eyebrow>
          <h2
            id={`${baseId}-heading`}
            className="mt-3 max-w-xl font-display text-[40px] leading-[1.1] tracking-[-1.2px] text-text-primary uppercase sm:text-[52.6px] sm:tracking-[-1.68px]"
          >
            Every answer you <br className="hidden sm:block" />
            need, <span className="text-brand-orange">in one place</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-10 sm:mt-12">
          <div
            role="tablist"
            aria-label="Get to know us topics"
            className="flex w-full gap-1 overflow-x-auto border-b border-white/10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <LayoutGroup id="get-to-know-tabs">
              {tabs.map((tab, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={tabId(i)}
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                    className={`relative shrink-0 px-3 py-2.5 font-body text-sm leading-[1.2] whitespace-nowrap transition-colors duration-150 sm:text-base ${
                      isActive ? "text-text-primary" : "text-text-gray-muted hover:text-text-primary"
                    }`}
                  >
                    {tab.trigger}
                    {isActive && (
                      <motion.span
                        layoutId={reduceMotion ? undefined : "get-to-know-tab-underline"}
                        className="absolute inset-x-0 -bottom-px h-px bg-white/32"
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="mt-8 flex flex-col items-stretch gap-8 md:flex-row md:gap-12">
          <div className="relative aspect-square w-full overflow-hidden rounded-(--radius-default) md:flex-1">
            {tabs.map((tab, i) => (
              <Image
                key={tab.id}
                src={tab.image}
                alt={i === active ? `${tab.trigger} — visual` : ""}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`object-cover transition-opacity duration-300 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
                aria-hidden={i !== active}
              />
            ))}
            <div className="absolute inset-0 rounded-(--radius-default) border border-white/10" />
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label={`Previous: ${prevLabel}`}
                className="flex h-10 w-10 items-center justify-center rounded-(--radius-pill-sm) bg-canvas/80 text-text-primary backdrop-blur transition-colors hover:bg-brand-orange hover:text-on-orange"
              >
                <Image src="/assets/icons/arrow-left.svg" alt="" width={16} height={16} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label={`Next: ${nextLabel}`}
                className="flex h-10 w-10 items-center justify-center rounded-(--radius-pill-sm) bg-canvas/80 text-text-primary backdrop-blur transition-colors hover:bg-brand-orange hover:text-on-orange"
              >
                <Image src="/assets/icons/arrow-right.svg" alt="" width={16} height={16} />
              </button>
            </div>
          </div>

          <div
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId(active)}
            className="flex flex-col justify-center gap-6 md:flex-1 md:max-w-[400px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col gap-4"
              >
                <p className="font-body text-xl leading-[1.2] tracking-[-0.4px] text-text-primary">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
            <GradientButton href={current.cta.href} className="w-fit">
              {current.cta.label}
            </GradientButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

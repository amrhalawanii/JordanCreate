"use client";

import { useState } from "react";
import Image from "next/image";
import type { InfoTab } from "@/content/schemas/tab";
import { Eyebrow } from "@/components/shared/Eyebrow";

export function GetToKnowUs({ tabs }: { tabs: InfoTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0];
  if (!current) return null;

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Eyebrow>Get to know us</Eyebrow>
        <h2 className="mt-3 max-w-xl font-display text-[40px] italic leading-[1.1] tracking-[-1.2px] text-text-primary uppercase sm:text-[56px] sm:tracking-[-1.68px]">
          Every answer you need, <span className="text-brand-orange">in one place</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-square w-full overflow-hidden rounded-(--radius-media) bg-surface">
            <Image
              src="/assets/hero/home-hero.png"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-10 opacity-90 transition-opacity duration-300"
              key={current.id}
            />
          </div>

          <div className="flex flex-col gap-2">
            {tabs.map((tab, i) => {
              const isActive = i === active;
              return (
                <div
                  key={tab.id}
                  className={`rounded-(--radius-default) border p-6 transition-colors duration-150 ${
                    isActive ? "border-border-card bg-surface" : "border-transparent"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`w-full text-left font-body-fallback text-base leading-[1.2] transition-colors duration-150 ${
                      isActive ? "text-text-primary" : "text-text-gray-muted"
                    }`}
                  >
                    {tab.trigger}
                  </button>
                  {isActive && (
                    <div className="mt-4 flex flex-col gap-4">
                      <p className="font-body text-xl leading-[1.2] tracking-[-0.4px] text-text-primary">
                        {tab.body}
                      </p>
                      <a
                        href={tab.cta.href}
                        target="_blank"
                        rel="noreferrer"
                        className="w-fit rounded-(--radius-pill-lg) bg-brand-orange px-6 py-2.5 font-body-fallback text-base font-medium leading-[1.2] text-on-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:bg-brand-orange-hot"
                      >
                        {tab.cta.label}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import type { InfoTab } from "@/content/schemas/tab";

export function GetToKnowUs({ tabs }: { tabs: InfoTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0];
  if (!current) return null;

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <p className="font-label text-xs uppercase tracking-wide text-brand-orange">
          Get to know us
        </p>
        <h2 className="mt-3 max-w-xl font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
          Every answer you need, in one place
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
                    className="w-full text-left font-label text-base font-medium text-text-primary"
                  >
                    {tab.trigger}
                  </button>
                  {isActive && (
                    <div className="mt-4 flex flex-col gap-4">
                      <p className="font-body text-sm leading-relaxed text-text-gray-light">
                        {tab.body}
                      </p>
                      <a
                        href={tab.cta.href}
                        target="_blank"
                        rel="noreferrer"
                        className="w-fit rounded-(--radius-pill-lg) bg-brand-orange px-6 py-2.5 font-label text-xs font-medium uppercase tracking-wide text-on-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:bg-brand-orange-hot"
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

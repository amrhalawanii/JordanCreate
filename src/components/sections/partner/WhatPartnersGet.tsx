import Image from "next/image";
import { getPartnerBenefits, getWhatPartnersGet } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";

export async function WhatPartnersGet() {
  const [benefits, copy] = await Promise.all([getPartnerBenefits(), getWhatPartnersGet()]);

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[40px] italic leading-[1.2] text-text-primary uppercase sm:text-[56px]">
            {copy.headingLine1}
          </h2>
        </Reveal>

        {/* Figma node 17:599 — unified image+copy cards (no divider, Inter titles) */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {benefits.map((b, i) => (
            <Reveal
              key={b.id}
              delay={(i % 3) * 0.08}
              className="flex flex-col overflow-hidden rounded-(--radius-media) border border-border-card bg-surface"
            >
              <div className="relative aspect-[4/3] w-full shrink-0 bg-surface-raised">
                <Image
                  src={b.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                <h3 className="font-body text-lg font-medium leading-[1.3] text-text-primary">
                  {b.title}
                </h3>
                <p className="font-body text-base font-normal leading-[1.5] text-text-gray-light">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

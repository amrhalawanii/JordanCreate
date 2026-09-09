import Image from "next/image";
import { getPartnerBenefits, getWhatPartnersGet } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";

export async function WhatPartnersGet() {
  const [benefits, copy] = await Promise.all([getPartnerBenefits(), getWhatPartnersGet()]);

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <p className="font-label text-xs uppercase tracking-wide text-brand-orange">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
            {copy.headingLine1}
            <br />
            {copy.headingLine2}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 0.1} className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius-media) bg-surface">
                <Image src={b.image} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
              </div>
              <Image
                src="/assets/partners/divider.svg"
                alt=""
                width={80}
                height={20}
                className="opacity-60"
              />
              <h3 className="font-display text-2xl italic text-text-primary">{b.title}</h3>
              <p className="font-body text-sm leading-relaxed text-text-gray-light">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

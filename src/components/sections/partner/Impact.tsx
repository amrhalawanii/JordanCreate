import Image from "next/image";
import { getImpactItems, getPartnerImpact } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import type { ImpactItem } from "@/content/schemas/partnerBenefit";

function ImpactCard({ item }: { item: ImpactItem }) {
  return (
    <article className="flex flex-1 flex-col gap-5 rounded-[12px] border border-border-card bg-surface p-5 sm:p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-surface-raised">
        <Image
          src={item.icon}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 shrink-0 object-contain"
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="font-display text-[22px] italic leading-[1.25] text-text-primary">
          {item.title}
        </h3>
        <p className="font-body text-[15px] font-normal leading-[1.55] text-text-gray-light sm:text-base">
          {item.body}
        </p>
      </div>
    </article>
  );
}

export async function Impact() {
  const [items, copy] = await Promise.all([getImpactItems(), getPartnerImpact()]);
  const left = items.slice(0, 2);
  const right = items.slice(2, 4);

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-xl font-display text-[40px] italic leading-[1.1] tracking-[-0.02em] text-text-primary uppercase sm:text-[52px]">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-xl font-body text-lg font-normal leading-[1.5] text-text-gray-light">
            {copy.sub}
          </p>
        </Reveal>

        {/* Figma: 2 cards | tall portrait media | 2 cards */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_minmax(280px,0.85fr)_1fr] lg:items-stretch lg:gap-5">
          <Reveal className="flex flex-col gap-4">
            {left.map((item) => (
              <ImpactCard key={item.id} item={item} />
            ))}
          </Reveal>

          <Reveal
            delay={0.08}
            className="relative min-h-[480px] overflow-hidden rounded-[12px] bg-surface lg:h-auto lg:min-h-[100%]"
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={copy.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
            />
            <p className="absolute bottom-7 left-5 right-5 font-body text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-footer-nav-label sm:bottom-8 sm:left-6 sm:text-[30px]">
              {copy.mediaCaption}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-4">
            {right.map((item) => (
              <ImpactCard key={item.id} item={item} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

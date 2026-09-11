import Image from "next/image";
import { getImpactItems, getPartnerImpact } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import type { ImpactItem } from "@/content/schemas/partnerBenefit";
import { ImpactVideo } from "./ImpactVideo";

function ImpactCard({ item }: { item: ImpactItem }) {
  return (
    <article className="flex flex-1 flex-col gap-5 rounded-(--radius-media) border border-border-card bg-surface p-5 transition-colors duration-150 hover:border-white/25 sm:p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-(--radius-media) bg-surface-raised">
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
    <section className="section-shell bg-canvas">
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

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_minmax(280px,0.85fr)_1fr] lg:items-stretch lg:gap-5">
          <Reveal className="flex flex-col gap-4">
            {left.map((item) => (
              <ImpactCard key={item.id} item={item} />
            ))}
          </Reveal>

          <Reveal delay={0.08}>
            <ImpactVideo src={copy.video} caption={copy.mediaCaption} />
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

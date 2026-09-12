import Image from "next/image";
import { getPillars } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";

// Matched to live jordancreate.com Pillars:
// eyebrow + italic display heading with orange “ACTUALLY MATTERS”,
// then 3 image cards (portrait media → title → body), no card chrome.
export async function Pillars() {
  const pillars = await getPillars();

  return (
    <section className="section-shell bg-canvas">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <Eyebrow>Pillars</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-display text-[40px] italic leading-[1.1] tracking-[-1.2px] text-text-primary uppercase sm:text-[56px] sm:tracking-[-1.68px]">
            Built around what
            <br />
            <span className="text-brand-orange">actually matters</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {pillars.map((pillar, i) => (
            <Reveal
              key={pillar.id}
              delay={i * 0.08}
              className="group flex flex-col gap-4"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface">
                <Image
                  src={pillar.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                />
              </div>
              <h3 className="font-body text-xl font-medium leading-[1.2] tracking-[-0.4px] text-text-primary">
                {pillar.title}
              </h3>
              <p className="font-body text-base leading-[1.45] text-text-gray-light">
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { getMissionVisionValue } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { GradientButton } from "@/components/shared/GradientButton";

export async function MissionVisionValue() {
  const blocks = await getMissionVisionValue();

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto flex max-w-(--container-primary) flex-col gap-16">
        {blocks.map((b, i) => (
          <div
            key={b.id}
            className={`grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius-media) bg-surface">
              <Image src={b.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display text-[40px] italic leading-[1.1] tracking-[-1.6px] text-text-primary uppercase sm:text-[56px] sm:tracking-[-2.24px]">
                {b.heading}
              </h3>
              <p className="mt-4 font-body text-lg leading-[1.5] tracking-[-0.36px] text-text-muted-80">
                {b.body}
              </p>
              <GradientButton href={b.cta.href} className="mt-6 px-6 py-2.5">
                {b.cta.label}
              </GradientButton>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

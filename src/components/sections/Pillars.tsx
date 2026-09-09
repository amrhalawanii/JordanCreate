import { getPillars } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";

export async function Pillars() {
  const pillars = await getPillars();

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <Eyebrow>Pillars</Eyebrow>
          <h2 className="mt-3 max-w-lg font-display text-[40px] italic leading-[1.1] tracking-[-1.2px] text-text-primary uppercase sm:text-[56px] sm:tracking-[-1.68px]">
            Built around what actually matters
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.id} delay={i * 0.1} className="flex flex-col gap-4">
              <span aria-hidden className="h-1 w-10 rounded-full bg-brand-orange" />
              <h3 className="font-body-fallback text-xl font-medium leading-[1.2] tracking-[-0.4px] text-text-primary">
                {pillar.title}
              </h3>
              <p className="font-body-fallback text-base leading-[1.2] text-text-gray-muted">
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

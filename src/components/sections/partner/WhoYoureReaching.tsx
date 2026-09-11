import { getReachStats, getWhoYoureReaching } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { CountUpStat } from "@/components/shared/CountUpStat";
import { Eyebrow } from "@/components/shared/Eyebrow";

export async function WhoYoureReaching() {
  const [stats, copy] = await Promise.all([getReachStats(), getWhoYoureReaching()]);

  return (
    <section className="section-shell bg-canvas">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-lg font-display text-[40px] italic leading-[1.1] tracking-[-1.2px] text-text-primary uppercase sm:text-[56px] sm:tracking-[-1.68px]">
            {copy.heading}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.id}
              delay={i * 0.1}
              className="flex flex-col gap-3 rounded-(--radius-default) border border-border-card bg-surface p-6 transition-colors duration-150 hover:border-white/25"
            >
              <CountUpStat
                value={stat.value}
                className="font-display text-[46px] italic leading-none text-brand-orange"
              />
              <span className="font-display text-xl italic leading-[1.7] text-text-primary uppercase">
                {stat.label}
              </span>
              <p className="font-body text-base leading-[1.7] text-text-gray-light">
                {stat.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

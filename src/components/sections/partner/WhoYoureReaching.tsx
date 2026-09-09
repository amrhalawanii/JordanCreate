import { getReachStats, getWhoYoureReaching } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { CountUpStat } from "@/components/shared/CountUpStat";

export async function WhoYoureReaching() {
  const [stats, copy] = await Promise.all([getReachStats(), getWhoYoureReaching()]);

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <p className="font-label text-xs uppercase tracking-wide text-brand-orange">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 max-w-lg font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
            {copy.heading}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.id}
              delay={i * 0.1}
              className="flex flex-col gap-3 rounded-(--radius-default) border border-border-card bg-surface p-6"
            >
              <CountUpStat
                value={stat.value}
                className="font-display text-[46px] italic leading-none text-brand-orange"
              />
              <span className="font-label text-xs font-medium uppercase tracking-wide text-text-primary">
                {stat.label}
              </span>
              <p className="font-body text-sm leading-relaxed text-text-gray-light">
                {stat.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

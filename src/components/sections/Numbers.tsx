import { getHomeStats } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { CountUpStat } from "@/components/shared/CountUpStat";

export async function Numbers() {
  const stats = await getHomeStats();

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <p className="font-label text-xs uppercase tracking-wide text-brand-orange">Numbers</p>
          <h2 className="mt-3 max-w-lg font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
            The numbers speak for themselves
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.id}
              delay={i * 0.08}
              className="flex flex-col gap-3 rounded-(--radius-default) border border-border-card bg-surface p-6"
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-brand-orange" />
              <CountUpStat
                value={stat.value}
                className="font-display text-[46px] italic leading-none text-brand-orange"
              />
              <span className="font-display text-2xl italic text-text-primary">{stat.label}</span>
              <p className="font-body text-sm leading-relaxed text-text-gray-light">
                {stat.sublabel}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

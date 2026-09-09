import { getHomeStats } from "@/content/repository";

export async function Numbers() {
  const stats = await getHomeStats();

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <p className="font-label text-xs uppercase tracking-wide text-brand-orange">Numbers</p>
        <h2 className="mt-3 max-w-lg font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
          The numbers speak for themselves
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col gap-3 rounded-(--radius-default) border border-border-card bg-surface p-6"
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-brand-orange" />
              <span className="font-display text-[46px] italic leading-none text-brand-orange">
                {stat.value}
              </span>
              <span className="font-display text-2xl italic text-text-primary">{stat.label}</span>
              <p className="font-body text-sm leading-relaxed text-text-gray-light">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

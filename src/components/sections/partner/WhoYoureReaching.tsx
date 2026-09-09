import { getReachStats, getWhoYoureReaching } from "@/content/repository";

export async function WhoYoureReaching() {
  const [stats, copy] = await Promise.all([getReachStats(), getWhoYoureReaching()]);

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <p className="font-label text-xs uppercase tracking-wide text-brand-orange">
          {copy.eyebrow}
        </p>
        <h2 className="mt-3 max-w-lg font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
          {copy.heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col gap-3 rounded-(--radius-default) border border-border-card bg-surface p-6"
            >
              <span className="font-display text-[46px] italic leading-none text-brand-orange">
                {stat.value}
              </span>
              <span className="font-label text-xs font-medium uppercase tracking-wide text-text-primary">
                {stat.label}
              </span>
              <p className="font-body text-sm leading-relaxed text-text-gray-light">
                {stat.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

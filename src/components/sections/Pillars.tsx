import { getPillars } from "@/content/repository";

export async function Pillars() {
  const pillars = await getPillars();

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <p className="font-label text-xs uppercase tracking-wide text-brand-orange">Pillars</p>
        <h2 className="mt-3 max-w-lg font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
          Built around what actually matters
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="flex flex-col gap-4">
              <span aria-hidden className="h-1 w-10 rounded-full bg-brand-orange" />
              <h3 className="font-display text-2xl italic text-text-primary">{pillar.title}</h3>
              <p className="font-body text-sm leading-relaxed text-text-gray-light">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

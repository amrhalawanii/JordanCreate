import Image from "next/image";
import { getMissionVisionValue } from "@/content/repository";

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
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius-media) bg-surface">
              <Image src={b.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="font-label text-xs uppercase tracking-wide text-brand-orange">
                {b.heading}
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-text-gray-light">
                {b.body}
              </p>
              <a
                href={b.cta.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-(--radius-pill-lg) bg-brand-orange px-6 py-2.5 font-label text-xs font-medium uppercase tracking-wide text-on-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:bg-brand-orange-hot"
              >
                {b.cta.label}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

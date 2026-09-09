import Image from "next/image";
import { getImpactItems, getPartnerImpact } from "@/content/repository";

export async function Impact() {
  const [items, copy] = await Promise.all([getImpactItems(), getPartnerImpact()]);

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <p className="font-label text-xs uppercase tracking-wide text-brand-orange">
          {copy.eyebrow}
        </p>
        <h2 className="mt-3 max-w-xl font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
          {copy.heading}
        </h2>
        <p className="mt-3 max-w-lg font-body text-sm text-text-gray-light">{copy.sub}</p>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <div className="relative aspect-video w-full overflow-hidden rounded-(--radius-media) bg-surface">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={copy.video}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <Image src={item.icon} alt="" width={30} height={30} className="mt-1 shrink-0" />
                <div>
                  <h3 className="font-label text-sm font-medium uppercase tracking-wide text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-text-gray-light">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { getImpactItems, getPartnerImpact } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";

export async function Impact() {
  const [items, copy] = await Promise.all([getImpactItems(), getPartnerImpact()]);

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-xl font-display text-[40px] italic leading-[1.2] text-text-primary uppercase sm:text-[56px]">
            {copy.heading}
          </h2>
          <p className="mt-3 max-w-lg font-body-fallback text-lg font-medium leading-[1.5] text-text-gray-light">
            {copy.sub}
          </p>
        </Reveal>

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
                  <h3 className="font-display text-xl italic leading-[1.5] text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body-fallback text-lg font-medium leading-[1.5] text-text-gray-light">
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

import Image from "next/image";
import { getGalleryImages } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";

export async function Gallery() {
  const images = await getGalleryImages();
  const reversed = [...images].reverse();

  const Row = ({ items, reverse }: { items: typeof images; reverse?: boolean }) => (
    <div className="group flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-4 pr-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="relative h-64 w-44 shrink-0 overflow-hidden rounded-(--radius-media) bg-surface sm:h-80 sm:w-56"
          >
            <Image src={item.image} alt="" fill sizes="224px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-canvas py-20 md:py-28">
      <Reveal className="mx-auto max-w-(--container-primary) px-5 md:px-10">
        <Eyebrow>Jordan Create 2025</Eyebrow>
        <h2 className="mt-3 max-w-lg font-display text-[36px] italic leading-[1] tracking-[-0.7px] text-text-primary uppercase sm:text-[50px] sm:tracking-[-1px]">
          The room where it <span className="text-brand-orange">all happened</span>
        </h2>
        <p className="mt-3 max-w-md font-body-fallback text-xl leading-[1.6] tracking-[-0.4px] text-text-gray-light">
          Moments from the first edition of Jordan&apos;s largest creator economy event.
        </p>
      </Reveal>

      <div className="mt-10 flex flex-col gap-4">
        <Row items={images} />
        <Row items={reversed} reverse />
      </div>
    </section>
  );
}

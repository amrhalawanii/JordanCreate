import Image from "next/image";
import { getGalleryImages } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";

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
        <p className="font-label text-xs uppercase tracking-wide text-brand-orange">
          Jordan Create 2025
        </p>
        <h2 className="mt-3 max-w-lg font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
          The room where it all happened
        </h2>
        <p className="mt-3 max-w-md font-body text-sm text-text-gray-light">
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

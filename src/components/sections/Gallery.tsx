import Image from "next/image";
import { getGalleryImages } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { staggerDelay } from "@/lib/stagger";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { GradientButton } from "@/components/shared/GradientButton";

// Rebuilt to match the Figma source: a fixed-height split section — a
// sticky text panel on the left, and a scrollable 2-column masonry grid of
// the 2025 photos on the right — not the horizontal marquee this used to
// be. Every image on this section is desaturated (the Figma links are
// literally named "Link - Desktop - Grayscale"), unlike the full-color
// treatment used for speaker portraits elsewhere.
export async function Gallery() {
  const images = await getGalleryImages();
  const mid = Math.ceil(images.length / 2);
  const columns = [images.slice(0, mid), images.slice(mid)];
  // A simple alternating tall/short rhythm within each column, echoing the
  // masonry pattern in the design without hardcoding it image-by-image.
  const isTall = (colIdx: number, i: number) =>
    colIdx === 0 ? i % 3 === 1 : i % 3 === 0;

  return (
    <section className="section-shell bg-canvas">
      <div className="mx-auto max-w-(--container-primary)">
        <div className="grid grid-cols-1 gap-8 md:h-[810px] md:grid-cols-[1fr_2fr] md:gap-6">
          <Reveal className="flex flex-col items-start gap-6 md:sticky md:top-24 md:self-start">
            <Eyebrow>Jordan Create 2025</Eyebrow>
            <h2 className="max-w-sm font-display text-[36px] leading-[1] tracking-[-0.7px] text-text-primary uppercase">
              The room where it <span className="text-brand-orange">all happened</span>
            </h2>
            <p className="max-w-sm font-body text-xl leading-[1.6] tracking-[-0.4px] text-text-gray-light">
              Moments from the first edition of Jordan&apos;s largest creator economy event.
            </p>
            <GradientButton href="https://tally.so/r/2EyNej">Count Me In</GradientButton>
          </Reveal>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:overflow-y-auto md:pr-1">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-2">
                {col.map((item, i) => (
                  <Reveal key={item.id} delay={staggerDelay(Math.min(colIdx * mid + i, 10), 0.06)}>
                    <div
                      className={`group relative w-full overflow-hidden rounded-(--radius-default) border border-white/10 bg-black grayscale transition-[filter,transform] duration-300 hover:grayscale-0 ${
                        isTall(colIdx, i) ? "aspect-[2/3]" : "aspect-[3/2]"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { GalleryItem } from "@/content/schemas/galleryItem";
import { getGalleryColumns } from "@/content/data/gallery";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { GradientButton } from "@/components/shared/GradientButton";

/**
 * Live jordancreate.com `#about-3` / `#work` at desktop (≥1200px):
 * - 90vh split: copy (flex 1) | independently scrolling 2-col masonry (flex 2)
 * - 8px gaps, square corners, grayscale → color on hover
 * - Short tiles ~3:2, tall tiles ~2:3, exact live column order
 */
export function GalleryClient({ images }: { images: GalleryItem[] }) {
  const reduceMotion = useReducedMotion();
  const [colLeft, colRight] = getGalleryColumns(images);

  return (
    <section id="gallery" className="bg-canvas">
      <div className="mx-auto max-w-(--container-primary) px-5 md:px-10">
        <div className="grid grid-cols-1 gap-10 py-16 md:h-[90vh] md:grid-cols-[1fr_2fr] md:gap-0 md:py-0">
          <Reveal className="flex flex-col items-start justify-center gap-6 border-t border-white/15 pt-8 md:border-t-0 md:pt-0 md:pr-10 lg:pr-14">
            <Eyebrow>Jordan Create 2025</Eyebrow>
            <h2 className="max-w-sm font-display text-[36px] italic leading-[1.05] tracking-[-0.02em] text-text-primary uppercase">
              The room where it{" "}
              <span className="text-brand-orange">all happened</span>
            </h2>
            <p className="max-w-sm font-body text-xl leading-[1.6] tracking-[-0.4px] text-text-gray-light">
              Moments from the first edition of Jordan&apos;s largest creator economy event.
            </p>
            <GradientButton href="https://tally.so/r/2EyNej">Count Me In</GradientButton>
          </Reveal>

          <div
            data-lenis-prevent
            className="h-auto max-h-[70vh] overflow-y-auto overscroll-contain md:h-full md:max-h-none [-ms-overflow-style:none] [scrollbar-width:thin] [scrollbar-color:rgba(245,239,230,0.2)_transparent]"
          >
            <div className="grid grid-cols-2 gap-2 py-[17px] pr-0 md:pr-5">
              {[colLeft, colRight].map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-2">
                  {col.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                        delay: reduceMotion ? 0 : Math.min(i, 5) * 0.05,
                      }}
                      className={`group relative w-full overflow-hidden bg-surface grayscale transition-[filter,transform] duration-500 hover:grayscale-0 ${
                        item.tall ? "aspect-[2/3]" : "aspect-[3/2]"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 30vw, 50vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

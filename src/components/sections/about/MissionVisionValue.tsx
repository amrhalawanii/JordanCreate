import Image from "next/image";
import { getMissionVisionValue } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { GradientButton } from "@/components/shared/GradientButton";

/**
 * Matched to live About → "About" block:
 * Mission = text-only + "MORE ABOUT US" eyebrow;
 * Vision = image left / copy right;
 * Value = copy left / image right.
 */
export async function MissionVisionValue() {
  const blocks = await getMissionVisionValue();

  return (
    <section className="section-shell bg-canvas">
      <div className="mx-auto flex max-w-(--container-primary) flex-col gap-16 md:gap-20">
        {blocks.map((b) => {
          const copy = (
            <Reveal
              key={`${b.id}-copy`}
              className={`flex max-w-lg flex-col ${b.layout === "image-left" ? "md:justify-self-end" : ""}`}
            >
              {b.eyebrow ? (
                <div className="mb-4">
                  <Eyebrow>{b.eyebrow}</Eyebrow>
                </div>
              ) : null}
              <h2 className="font-display text-[40px] italic leading-[1.1] tracking-[-1.6px] text-text-primary uppercase sm:text-[56px] sm:tracking-[-2.24px]">
                {b.heading}
              </h2>
              <p className="mt-4 font-body text-lg leading-[1.5] tracking-[-0.36px] text-text-muted-80">
                {b.body}
              </p>
              <GradientButton href={b.cta.href} className="mt-6 w-fit self-start px-6 py-2.5">
                {b.cta.label}
              </GradientButton>
            </Reveal>
          );

          if (b.layout === "text-only" || !b.image) {
            return (
              <div key={b.id} className="max-w-xl">
                {copy}
              </div>
            );
          }

          const image = (
            <Reveal
              key={`${b.id}-image`}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius-media) bg-surface md:aspect-[508/390]"
            >
              <Image
                src={b.image}
                alt=""
                fill
                sizes="(min-width: 768px) 508px, 100vw"
                className="object-cover"
              />
            </Reveal>
          );

          return (
            <div
              key={b.id}
              className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12"
            >
              {b.layout === "image-left" ? (
                <>
                  {image}
                  {copy}
                </>
              ) : (
                <>
                  {copy}
                  {image}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { getOurStory } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ScrollColorReveal } from "@/components/shared/ScrollColorReveal";

/**
 * Matched to live About → "About Section":
 * left eyebrow "OUR STORY", right scroll-color RevealText + supporting line.
 * No image / secondary eyebrow / CTA (those live elsewhere on Framer).
 */
export async function OurStory() {
  const story = await getOurStory();

  return (
    <section className="bg-canvas px-5 py-16 md:px-10 md:py-24" aria-labelledby="our-story-heading">
      <div className="mx-auto grid max-w-(--container-primary) grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-12 lg:gap-16">
        <Reveal>
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <h2 id="our-story-heading" className="sr-only">
            Our story
          </h2>
        </Reveal>

        <div className="flex flex-col gap-6">
          <ScrollColorReveal
            text={story.body}
            highlightSuffix={story.highlightSuffix}
            className="font-body text-2xl leading-[1.375] tracking-[-0.03px] sm:text-[32px] sm:leading-[44px]"
          />
          <Reveal delay={0.15}>
            <p className="font-body text-base leading-6 text-white/70">{story.closingLine}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

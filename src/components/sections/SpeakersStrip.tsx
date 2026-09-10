import { getSpeakers, getFeaturedSpeakerSlugs } from "@/content/repository";
import { SpeakerCard } from "@/components/shared/SpeakerCard";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { GradientButton } from "@/components/shared/GradientButton";

export async function SpeakersStrip() {
  const [allSpeakers, featuredSlugs] = await Promise.all([
    getSpeakers(),
    getFeaturedSpeakerSlugs(),
  ]);
  const bySlug = new Map(allSpeakers.map((s) => [s.slug.replace(/⁠/g, ""), s]));
  const featured = featuredSlugs
    .map((slug) => bySlug.get(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Speakers</Eyebrow>
            <h2 className="mt-3 max-w-lg font-display text-[40px] italic leading-[1] tracking-[-0.8px] text-text-primary uppercase sm:text-[56px] sm:tracking-[-1.12px]">
              Meet the voices shaping <span className="text-brand-orange">what&apos;s next</span>
            </h2>
            <p className="mt-3 max-w-md font-body text-xl leading-[1.6] tracking-[-0.4px] text-text-gray-light">
              Learn from the people who&apos;ve turned creativity into craft, community, and real
              careers.
            </p>
          </div>
          <GradientButton href="/speakers" external={false} className="w-fit shrink-0 px-6 py-2.5">
            View All Speakers
          </GradientButton>
        </Reveal>

        {/* Live site: 3 columns, 20px gap, ~349px cards inside 1088px row */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} linkTo="instagram" />
          ))}
        </div>
      </div>
    </section>
  );
}

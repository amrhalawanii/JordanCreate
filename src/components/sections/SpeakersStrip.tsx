import {
  getSpeakers,
  getFeaturedSpeakerSlugs,
  getSpeakersContentMeta,
} from "@/content/repository";
import { SpeakerCard } from "@/components/shared/SpeakerCard";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { GradientButton } from "@/components/shared/GradientButton";
import { ContentNotice } from "@/components/shared/ContentNotice";

export async function SpeakersStrip() {
  const [allSpeakers, featuredSlugs] = await Promise.all([
    getSpeakers(),
    getFeaturedSpeakerSlugs(),
  ]);
  const meta = getSpeakersContentMeta();
  const bySlug = new Map(allSpeakers.map((s) => [s.slug.replace(/⁠/g, ""), s]));
  const featured = featuredSlugs
    .map((slug) => bySlug.get(slug.replace(/⁠/g, "")) ?? bySlug.get(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // If preferred featured slugs miss (handle ≠ marketing slug), fall back to top of list.
  const cards =
    featured.length > 0
      ? featured
      : allSpeakers.filter((s) => s.portrait.startsWith("http")).slice(0, 9);

  return (
    <section className="section-shell bg-canvas">
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
          <GradientButton href="/speakers" className="w-fit shrink-0 px-6 py-2.5">
            View All Speakers
          </GradientButton>
        </Reveal>

        {(meta.degraded || meta.message) && (
          <ContentNotice
            className="mt-8"
            degraded={meta.degraded}
            empty={cards.length === 0}
            message={
              cards.length === 0
                ? meta.message ?? "Speakers will appear here once published."
                : meta.degraded
                  ? meta.message
                  : undefined
            }
          />
        )}

        {cards.length > 0 ? (
          <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((speaker) => (
              <StaggerItem key={speaker.id}>
                <SpeakerCard speaker={speaker} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="mt-10 rounded-(--radius-media) border border-border-card bg-surface px-6 py-16 text-center">
            <p className="font-display text-2xl italic text-text-primary">Lineup loading</p>
            <p className="mt-2 font-body text-base text-text-gray-light">
              We&apos;re finalizing this year&apos;s voices. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

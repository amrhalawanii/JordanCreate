import Link from "next/link";
import { getSpeakers, getFeaturedSpeakerSlugs } from "@/content/repository";
import { SpeakerCard } from "@/components/shared/SpeakerCard";
import { Reveal } from "@/components/shared/Reveal";

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
            <p className="font-label text-xs uppercase tracking-wide text-brand-orange">
              Speakers
            </p>
            <h2 className="mt-3 max-w-lg font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
              Meet the voices shaping what&apos;s next
            </h2>
            <p className="mt-3 max-w-md font-body text-sm text-text-gray-light">
              Learn from the people who&apos;ve turned creativity into craft, community, and real
              careers.
            </p>
          </div>
          <Link
            href="/speakers"
            className="w-fit shrink-0 rounded-(--radius-pill-lg) border border-border-card px-6 py-2.5 font-label text-xs uppercase tracking-wide text-text-primary transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:border-brand-orange hover:text-brand-orange"
          >
            View All Speakers
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {featured.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} linkTo="instagram" />
          ))}
        </div>
      </div>
    </section>
  );
}

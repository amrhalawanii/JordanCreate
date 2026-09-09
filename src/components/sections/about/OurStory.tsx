import Image from "next/image";
import { getOurStory } from "@/content/repository";

export async function OurStory() {
  const story = await getOurStory();

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-(--container-primary) grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius-media) bg-surface">
          <Image src={story.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="font-label text-xs uppercase tracking-wide text-brand-orange">
            {story.eyebrow}
          </p>
          <p className="mt-1 font-label text-xs uppercase tracking-wide text-text-gray-light">
            {story.eyebrowSecondary}
          </p>
          <p className="mt-6 font-display text-2xl italic leading-snug text-text-primary sm:text-3xl">
            {story.body}
          </p>
          <p className="mt-6 font-body text-base text-text-gray-light">{story.closingLine}</p>
          <a
            href={story.cta.href}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-(--radius-pill-lg) border border-border-card px-6 py-2.5 font-label text-xs uppercase tracking-wide text-text-primary transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:border-brand-orange hover:text-brand-orange"
          >
            {story.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

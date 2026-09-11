import Image from "next/image";
import Link from "next/link";
import type { Speaker } from "@/content/schemas/speaker";
import { resolveInstagramUrl } from "@/lib/instagram";
import { GrainOverlay } from "./GrainOverlay";

function SpeakerCardBody({
  speaker,
  priority = false,
}: {
  speaker: Speaker;
  priority?: boolean;
}) {
  // Portrait frame: 3:4, full image visible (contain + top) so heads aren't cropped.
  return (
    <div className="flex h-full flex-col rounded-(--radius-default) border border-transparent bg-surface p-1 transition-colors duration-150 group-hover:border-white/15 group-focus-visible:border-brand-orange/50">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-(--radius-default) bg-canvas">
        <Image
          src={speaker.portrait}
          alt=""
          fill
          sizes="(min-width: 1200px) 349px, (min-width: 640px) 33vw, 50vw"
          className="object-contain object-top transition-transform duration-300 group-hover:scale-105"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <GrainOverlay />
      </div>
      <div className="flex flex-col justify-center gap-4 p-5">
        <div className="flex flex-col gap-1">
          <p className="font-display text-[20px] italic leading-[1.2] tracking-[-0.4px] text-text-primary transition-colors duration-150 group-hover:text-brand-orange">
            {speaker.name}
          </p>
          {speaker.followers && (
            <p className="font-body text-base leading-[1.4] text-text-gray-mid">
              {speaker.followers}
            </p>
          )}
        </div>
        <Image
          src="/assets/brand/instagram-icon.png"
          alt=""
          width={24}
          height={24}
          aria-hidden
          className="opacity-80 transition-opacity duration-150 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}

const cardLinkClass =
  "group block h-full rounded-(--radius-default) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange";

// Speakers directory + home strip both link to detail pages for consistency.
// Instagram remains available on the detail page CTA.
export function SpeakerCard({
  speaker,
  linkTo = "detail",
  priority = false,
}: {
  speaker: Speaker;
  linkTo?: "detail" | "instagram";
  priority?: boolean;
}) {
  const ig = resolveInstagramUrl(speaker.instagramUrl);

  if (linkTo === "instagram" && ig) {
    return (
      <a
        href={ig}
        target="_blank"
        rel="noopener noreferrer"
        className={cardLinkClass}
        aria-label={`${speaker.name} on Instagram (opens in a new tab)`}
      >
        <SpeakerCardBody speaker={speaker} priority={priority} />
      </a>
    );
  }

  return (
    <Link
      href={`/highlighted-speakers-blog/${encodeURIComponent(speaker.slug)}`}
      className={cardLinkClass}
      aria-label={`View ${speaker.name}`}
    >
      <SpeakerCardBody speaker={speaker} priority={priority} />
    </Link>
  );
}

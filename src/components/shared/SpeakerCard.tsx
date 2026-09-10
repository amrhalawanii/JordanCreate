import Image from "next/image";
import Link from "next/link";
import type { Speaker } from "@/content/schemas/speaker";
import { GrainOverlay } from "./GrainOverlay";

function SpeakerCardBody({ speaker }: { speaker: Speaker }) {
  return (
    <div className="overflow-hidden rounded-(--radius-default) border border-white/10">
      <div className="relative aspect-[3/4] w-full bg-surface">
        <Image
          src={speaker.portrait}
          alt={speaker.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <GrainOverlay />
      </div>
      <div className="flex flex-col gap-1 p-5">
        <p className="font-body-fallback text-[19px] leading-[1.6] tracking-[-0.6px] text-text-primary">
          {speaker.name}
        </p>
        {speaker.followers && (
          <p className="font-body-fallback text-base leading-[1.4] text-text-gray-light">
            {speaker.followers}
          </p>
        )}
        <Image
          src="/assets/brand/instagram-icon.png"
          alt=""
          width={24}
          height={24}
          className="mt-1"
        />
      </div>
    </div>
  );
}

// On the live site, the home page's featured strip links straight to each
// speaker's Instagram; the full /speakers grid links to the internal detail
// page instead. Two featured speakers (Yazan Abuajweh, Nasser & Laila) have
// a raw block of pasted brief text dumped into their href instead of a real
// Instagram URL on the live site — replicated as-is, not fixed (see
// FIDELITY-NOTES.md). linkTo="instagram" reproduces that behavior exactly,
// including the broken links.
export function SpeakerCard({
  speaker,
  linkTo = "detail",
}: {
  speaker: Speaker;
  linkTo?: "detail" | "instagram";
}) {
  if (linkTo === "instagram" && speaker.instagramUrl) {
    return (
      <a href={speaker.instagramUrl} target="_blank" rel="noreferrer" className="group block">
        <SpeakerCardBody speaker={speaker} />
      </a>
    );
  }

  return (
    <Link
      href={`/highlighted-speakers-blog/${encodeURIComponent(speaker.slug)}`}
      className="group block"
    >
      <SpeakerCardBody speaker={speaker} />
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Speaker } from "@/content/schemas/speaker";
import { GrainOverlay } from "./GrainOverlay";

function SpeakerCardBody({ speaker }: { speaker: Speaker }) {
  // Live jordancreate.com card: ~349×474, 4px pad, surface fill, square
  // portrait on top + content stack below (name / followers / IG).
  return (
    <div className="flex h-full flex-col rounded-(--radius-default) bg-surface p-1">
      <div className="relative aspect-square w-full overflow-hidden rounded-(--radius-default) bg-canvas">
        <Image
          src={speaker.portrait}
          alt={speaker.name}
          fill
          sizes="(min-width: 1200px) 349px, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <GrainOverlay />
      </div>
      <div className="flex flex-col justify-center gap-4 p-5">
        <div className="flex flex-col gap-1">
          <p className="font-display text-[20px] italic leading-[1.2] tracking-[-0.4px] text-text-primary">
            {speaker.name}
          </p>
          {speaker.followers && (
            <p className="font-body text-base leading-[1.4] text-[#a3a3a3]">
              {speaker.followers}
            </p>
          )}
        </div>
        <Image
          src="/assets/brand/instagram-icon.png"
          alt=""
          width={24}
          height={24}
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
      <a href={speaker.instagramUrl} target="_blank" rel="noreferrer" className="group block h-full">
        <SpeakerCardBody speaker={speaker} />
      </a>
    );
  }

  return (
    <Link
      href={`/highlighted-speakers-blog/${encodeURIComponent(speaker.slug)}`}
      className="group block h-full"
    >
      <SpeakerCardBody speaker={speaker} />
    </Link>
  );
}

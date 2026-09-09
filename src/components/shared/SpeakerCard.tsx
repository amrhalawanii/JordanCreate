import Image from "next/image";
import Link from "next/link";
import type { Speaker } from "@/content/schemas/speaker";

function SpeakerCardBody({ speaker }: { speaker: Speaker }) {
  return (
    <>
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-(--radius-media) bg-surface">
        <Image
          src={speaker.portrait}
          alt={speaker.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <p className="font-label text-sm font-medium text-text-primary">{speaker.name}</p>
        {speaker.followers && (
          <p className="font-label text-xs text-brand-orange">{speaker.followers}</p>
        )}
      </div>
    </>
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
      <a
        href={speaker.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex flex-col gap-3"
      >
        <SpeakerCardBody speaker={speaker} />
      </a>
    );
  }

  return (
    <Link
      href={`/highlighted-speakers-blog/${encodeURIComponent(speaker.slug)}`}
      className="group flex flex-col gap-3"
    >
      <SpeakerCardBody speaker={speaker} />
    </Link>
  );
}

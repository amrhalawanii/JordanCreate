import Image from "next/image";
import Link from "next/link";
import type { Speaker } from "@/content/schemas/speaker";

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Link
      href={`/highlighted-speakers-blog/${encodeURIComponent(speaker.slug)}`}
      className="group flex flex-col gap-3"
    >
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
    </Link>
  );
}

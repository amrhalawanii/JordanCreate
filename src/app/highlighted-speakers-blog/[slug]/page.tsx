import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSpeakers, getSpeakerBySlug } from "@/content/repository";

export async function generateStaticParams() {
  const speakers = await getSpeakers();
  return speakers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const speaker = await getSpeakerBySlug(decodeURIComponent(slug));
  if (!speaker) return {};
  return {
    title: `Jordan Create | ${speaker.name}`,
    description:
      speaker.bio ||
      "A community-powered event bringing together musicians, influencers, content creators, and agencies from across the Kingdom, a creative explosion built to inspire generations.",
  };
}

export default async function SpeakerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const speaker = await getSpeakerBySlug(decodeURIComponent(slug));
  if (!speaker) notFound();

  return (
    <>
      <Header />
      <main className="bg-canvas px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/speakers"
            className="font-label text-xs uppercase tracking-wide text-text-gray-light transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:text-brand-orange"
          >
            ← Back to Speakers
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr]">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-(--radius-media) bg-surface">
              <Image
                src={speaker.portrait}
                alt={speaker.name}
                fill
                sizes="280px"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-display text-[36px] italic leading-tight text-text-primary sm:text-[48px]">
                {speaker.name}
              </h1>
              {speaker.bio && (
                <p className="font-body text-base leading-relaxed text-text-gray-light">
                  {speaker.bio}
                </p>
              )}
              {speaker.followers && (
                <p className="font-label text-sm text-brand-orange">{speaker.followers}</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

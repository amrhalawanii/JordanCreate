import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/shared/Reveal";
import { GradientButton } from "@/components/shared/GradientButton";
import { resolveInstagramUrl } from "@/lib/instagram";
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
  const ig = resolveInstagramUrl(speaker.instagramUrl);

  return (
    <>
      <Header />
      <main id="main-content" className="section-shell bg-canvas">
        <div className="mx-auto max-w-(--container-primary)">
          <Reveal>
            <Link
              href="/speakers"
              className="font-body text-lg leading-[1.2] text-brand-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:text-text-primary"
            >
              ← Back to Speakers
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
            <Reveal className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-(--radius-media) bg-surface md:mx-0 md:max-w-none">
              <Image
                src={speaker.portrait}
                alt={speaker.name}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-contain object-top"
                priority
              />
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-5">
              <h1 className="font-display text-[36px] italic leading-[1.15] text-text-primary sm:text-[48px] md:text-[54px]">
                {speaker.name}
              </h1>
              {speaker.bio && (
                <p className="max-w-xl font-body text-lg leading-[1.45] text-text-muted-80 sm:text-xl">
                  {speaker.bio}
                </p>
              )}
              {speaker.followers && (
                <p
                  style={{ backgroundImage: "var(--gradient-brand-orange)" }}
                  className="w-fit rounded-(--radius-pill-sm) px-3 py-1 font-body text-lg leading-[1.2] text-on-orange"
                >
                  {speaker.followers}
                </p>
              )}
              {ig && (
                <GradientButton
                  href={ig}
                  className="mt-2 w-fit px-6 py-2.5"
                  aria-label={`Follow ${speaker.name} on Instagram (opens in a new tab)`}
                >
                  Follow on Instagram
                </GradientButton>
              )}
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SpeakerCard } from "@/components/shared/SpeakerCard";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { FAQSection } from "@/components/shared/FAQSection";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ContentNotice } from "@/components/shared/ContentNotice";
import { getSpeakers, getSpeakersContentMeta, getSpeakersHero } from "@/content/repository";

export const revalidate = 60;

const title = "Jordan Create | Speakers";
const description =
  "A community-powered event bringing together musicians, influencers, content creators, and agencies from across the Kingdom, a creative explosion built to inspire generations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/speakers" },
  openGraph: { title, description, url: "https://www.jordancreate.com/speakers" },
  twitter: { title, description },
};

export default async function SpeakersPage() {
  const [speakers, hero] = await Promise.all([getSpeakers(), getSpeakersHero()]);
  const meta = getSpeakersContentMeta();

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero hero={hero} />
        <section className="bg-canvas px-5 pt-16 pb-8 md:px-10 md:pt-24 md:pb-12">
          <Reveal className="mx-auto max-w-(--container-primary)">
            <Eyebrow>Speakers</Eyebrow>
            <h2 className="mt-3 max-w-lg font-display text-[40px] italic leading-[1] tracking-[-0.8px] text-text-primary uppercase sm:text-[56px] sm:tracking-[-1.12px]">
              Meet the voices shaping <span className="opacity-50">what&apos;s next</span>
            </h2>
            <p className="mt-3 max-w-md font-body text-xl leading-[1.6] tracking-[-0.4px] text-text-gray-light">
              Learn from the people who&apos;ve turned creativity into craft, community, and real
              careers.
            </p>
          </Reveal>
        </section>
        <section className="section-shell bg-canvas">
          <div className="mx-auto max-w-(--container-primary)">
            {(meta.degraded || (speakers.length === 0 && meta.message)) && (
              <ContentNotice
                className="mb-8"
                degraded={meta.degraded}
                empty={speakers.length === 0}
                message={
                  speakers.length === 0
                    ? meta.message ?? "No published speakers yet."
                    : meta.message
                }
              />
            )}

            {speakers.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {speakers.map((speaker, index) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} priority={index < 3} />
                ))}
              </div>
            ) : (
              <div className="rounded-(--radius-media) border border-border-card bg-surface px-6 py-20 text-center">
                <p className="font-display text-3xl italic text-text-primary">Coming soon</p>
                <p className="mx-auto mt-3 max-w-md font-body text-base text-text-gray-light">
                  Speaker profiles will show up here as soon as they&apos;re published from the
                  programme database.
                </p>
              </div>
            )}
          </div>
        </section>
        <FinalCTA />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

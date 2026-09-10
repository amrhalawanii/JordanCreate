import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SpeakerCard } from "@/components/shared/SpeakerCard";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { FAQSection } from "@/components/shared/FAQSection";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { getSpeakers, getSpeakersHero } from "@/content/repository";

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

  return (
    <>
      <Header />
      <main>
        <PageHero hero={hero} />
        <section className="bg-canvas px-5 pt-16 md:px-10 md:pt-24">
          <Reveal className="mx-auto max-w-(--container-primary)">
            <Eyebrow>Speakers</Eyebrow>
            {/* On this page "WHAT'S NEXT" is a 50%-opacity fade, not the
                orange highlight the same heading gets on the home page —
                confirmed via computed styles on both pages independently. */}
            <h2 className="mt-3 max-w-lg font-display text-[40px] italic leading-[1] tracking-[-0.8px] text-text-primary uppercase sm:text-[56px] sm:tracking-[-1.12px]">
              Meet the voices shaping <span className="opacity-50">what&apos;s next</span>
            </h2>
            <p className="mt-3 max-w-md font-body text-xl leading-[1.6] tracking-[-0.4px] text-text-gray-light">
              Learn from the people who&apos;ve turned creativity into craft, community, and real
              careers.
            </p>
          </Reveal>
        </section>
        <section className="bg-canvas px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-(--container-primary)">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {speakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          </div>
        </section>
        <FinalCTA />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

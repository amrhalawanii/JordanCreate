import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SpeakerCard } from "@/components/shared/SpeakerCard";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { FAQSection } from "@/components/shared/FAQSection";
import { getSpeakers, getSpeakersHero } from "@/content/repository";

export const metadata: Metadata = {
  title: "Jordan Create | Speakers",
  description:
    "A community-powered event bringing together musicians, influencers, content creators, and agencies from across the Kingdom, a creative explosion built to inspire generations.",
};

export default async function SpeakersPage() {
  const [speakers, hero] = await Promise.all([getSpeakers(), getSpeakersHero()]);

  return (
    <>
      <Header />
      <main>
        <PageHero hero={hero} />
        <section className="bg-canvas px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-(--container-primary)">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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

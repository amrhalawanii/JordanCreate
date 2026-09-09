import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { OurStory } from "@/components/sections/about/OurStory";
import { MissionVisionValue } from "@/components/sections/about/MissionVisionValue";
import { MeetTheCrew } from "@/components/sections/about/MeetTheCrew";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { FAQSection } from "@/components/shared/FAQSection";
import { getAboutHero } from "@/content/repository";

const title = "Jordan Create | About Us";
const description =
  "A community-powered event bringing together musicians, influencers, content creators, and agencies from across the Kingdom, a creative explosion built to inspire generations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about-us" },
  openGraph: { title, description, url: "https://www.jordancreate.com/about-us" },
  twitter: { title, description },
};

export default async function AboutUsPage() {
  const hero = await getAboutHero();

  return (
    <>
      <Header />
      <main>
        <PageHero hero={hero} />
        <OurStory />
        <MissionVisionValue />
        <MeetTheCrew />
        <FinalCTA />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { GetToKnowUs } from "@/components/sections/GetToKnowUs";
import { IntroBlock } from "@/components/sections/IntroBlock";
import { Numbers } from "@/components/sections/Numbers";
import { SpeakersStrip } from "@/components/sections/SpeakersStrip";
import { Pillars } from "@/components/sections/Pillars";
import { Gallery } from "@/components/sections/Gallery";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { FAQSection } from "@/components/shared/FAQSection";
import { getInfoTabs } from "@/content/repository";

export default async function HomePage() {
  const infoTabs = await getInfoTabs();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <GetToKnowUs tabs={infoTabs} />
        <IntroBlock />
        <Numbers />
        <SpeakersStrip />
        <Pillars />
        <Gallery />
        <FinalCTA />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

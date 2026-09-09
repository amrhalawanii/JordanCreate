import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { WhoYoureReaching } from "@/components/sections/partner/WhoYoureReaching";
import { WhatPartnersGet } from "@/components/sections/partner/WhatPartnersGet";
import { Impact } from "@/components/sections/partner/Impact";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { FAQSection } from "@/components/shared/FAQSection";
import { getPartnerHero } from "@/content/repository";

export const metadata: Metadata = {
  title: "Jordan Create | Partner with Us",
  description:
    "A community-powered event bringing together musicians, influencers, content creators, and agencies from across the Kingdom, a creative explosion built to inspire generations.",
};

export default async function PartnerWithUsPage() {
  const hero = await getPartnerHero();

  return (
    <>
      <Header />
      <main>
        <PageHero hero={hero} />
        <WhoYoureReaching />
        <WhatPartnersGet />
        <Impact />
        <FinalCTA />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

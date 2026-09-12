import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AgendaSchedule } from "@/components/sections/agenda/AgendaSchedule";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { FAQSection } from "@/components/shared/FAQSection";
import { getAgendaHero } from "@/content/repository";

const title = "Jordan Create | Agenda";
const description =
  "From the first session to the last toast, every pillar, every speaker, every moment mapped out so you never miss what matters.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/agenda" },
  openGraph: { title, description, url: "https://www.jordancreate.com/agenda" },
  twitter: { title, description },
};

export default async function AgendaPage() {
  const hero = await getAgendaHero();

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero hero={hero} />
        <AgendaSchedule />
        <FinalCTA />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

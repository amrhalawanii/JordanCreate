import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AgendaSchedule } from "@/components/sections/agenda/AgendaSchedule";
import { getAgendaHero } from "@/content/repository";

// The live site added this page after Phase 0 extraction (see FIDELITY-NOTES.md).
// Content and layout are taken from the live DOM (scripts/extract-agenda.ts +
// direct computed-style inspection) and cross-checked against the Figma
// redesign (file xcRZno8KujVhST5Ec35K5i, node 16:4183) for the section that
// mattered most: the schedule rows. Figma's get_design_context tool hit this
// project's rate limit mid-session, so this build leans on the Figma
// screenshot + metadata (structure, hero heading size, section widths) plus
// the live site's own computed styles (fonts, colors, exact spacing) rather
// than Figma's generated code -- the two sources agreed everywhere they
// overlapped.
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
      <main>
        <PageHero hero={hero} />
        <AgendaSchedule />
      </main>
      <Footer />
    </>
  );
}

import { getFAQEntries } from "@/content/repository";
import { FAQAccordion } from "./FAQAccordion";

export async function FAQSection() {
  const entries = await getFAQEntries();

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <p className="font-label text-xs uppercase tracking-wide text-brand-orange">FAQ</p>
        <h2 className="mt-3 max-w-lg font-display text-[32px] italic leading-tight text-text-primary">
          Your questions, answered with clarity
        </h2>
        <div className="mt-10">
          <FAQAccordion entries={entries} />
        </div>
      </div>
    </section>
  );
}

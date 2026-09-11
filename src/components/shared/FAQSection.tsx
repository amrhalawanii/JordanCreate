import { getFAQEntries } from "@/content/repository";
import { FAQAccordion } from "./FAQAccordion";
import { Reveal } from "./Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";

export async function FAQSection() {
  const entries = await getFAQEntries();

  return (
    <section className="section-shell bg-canvas">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 max-w-lg font-display text-[28px] italic leading-[1.1] tracking-[-0.84px] text-text-gray-muted sm:text-[36px] sm:tracking-[-1.08px]">
            <span className="text-text-primary">Your questions,</span> answered with clarity
          </h2>
        </Reveal>
        <div className="mt-10">
          <FAQAccordion entries={entries} />
        </div>
      </div>
    </section>
  );
}

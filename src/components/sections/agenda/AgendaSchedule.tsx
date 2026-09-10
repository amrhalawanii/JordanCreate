import { getAgendaIntro, getAgendaSessions } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ScheduleList } from "./ScheduleList";

export async function AgendaSchedule() {
  const [intro, sessions] = await Promise.all([getAgendaIntro(), getAgendaSessions()]);

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[32px] leading-[1.1] tracking-[-0.02em] text-text-primary uppercase sm:text-[56px]">
            {intro.headingLine1}
            <br />
            {intro.headingLine2Plain}
            <span className="text-brand-orange">{intro.headingLine2Highlight}</span>
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-[1.6] text-text-gray-light">
            {intro.sub}
          </p>
        </Reveal>

        <div className="mt-12">
          <ScheduleList sessions={sessions} />
        </div>
      </div>
    </section>
  );
}

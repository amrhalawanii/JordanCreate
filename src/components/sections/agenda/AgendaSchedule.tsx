import { getAgendaIntro, getAgendaSessions, getAgendaContentMeta } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ContentNotice } from "@/components/shared/ContentNotice";
import { ScheduleList } from "./ScheduleList";

export async function AgendaSchedule() {
  const [intro, sessions] = await Promise.all([getAgendaIntro(), getAgendaSessions()]);
  const meta = getAgendaContentMeta();

  return (
    <section className="section-shell bg-canvas">
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

        {(meta.degraded || (sessions.length === 0 && meta.message)) && (
          <ContentNotice
            className="mt-8"
            degraded={meta.degraded}
            empty={sessions.length === 0}
            message={
              sessions.length === 0
                ? meta.message ?? "The schedule will be published here soon."
                : meta.message
            }
          />
        )}

        <div className="mt-12">
          {sessions.length > 0 ? (
            <ScheduleList sessions={sessions} />
          ) : (
            <div className="rounded-(--radius-media) border border-border-card bg-surface px-6 py-16 text-center">
              <p className="font-display text-2xl italic text-text-primary">Schedule coming soon</p>
              <p className="mx-auto mt-2 max-w-md font-body text-base text-text-gray-light">
                Confirmed sessions from the programme database will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { staggerDelay } from "@/lib/stagger";
import { resolveAgendaSpeakers, type AgendaSession } from "@/content/schemas/agenda";

// Layout confirmed via live computed styles (not the stacked-card guess this
// component started as):
// - Gradient row ("Registration and Check-In"): a single horizontal bar,
//   flex justify-between, dark #0f0f0f text on the brand gradient, radius 4px.
// - Regular rows: hairline top border, time chip, italic title, body, and
//   right-aligned speaker thumbnails (rounded squares).
export function ScheduleList({ sessions }: { sessions: AgendaSession[] }) {
  return (
    <ol className="m-0 flex list-none flex-col p-0">
      {sessions.map((session, i) => {
        const speakers = resolveAgendaSpeakers(session);
        return (
          <li key={session.id}>
            {session.highlight ? (
              <Reveal delay={staggerDelay(i, 0.05)}>
                <div
                  className="flex flex-col gap-1 rounded-(--radius-default) p-6 sm:flex-row sm:items-center sm:justify-between"
                  style={{ backgroundImage: "var(--gradient-brand-orange)" }}
                >
                  <time className="font-body text-base font-medium leading-[1.2] text-on-orange">
                    {session.time}
                  </time>
                  <h3 className="font-display text-xl italic text-on-orange">{session.title}</h3>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={staggerDelay(Math.min(i, 8), 0.05)}>
                <div className="group flex flex-col gap-4 border-t border-border-card pt-6 pb-6 sm:flex-row sm:items-start sm:gap-6">
                  <div className="shrink-0 sm:w-40">
                    <time className="inline-block rounded-(--radius-media) bg-surface-raised px-4 py-2 font-body text-sm leading-[1.2] text-text-gray-mid">
                      {session.time}
                    </time>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <h3 className="font-display text-2xl italic text-brand-orange">{session.title}</h3>
                    {session.body && (
                      <p className="max-w-2xl font-body text-sm leading-[1.6] text-text-gray-mid">
                        {session.body}
                      </p>
                    )}
                  </div>
                  {speakers.length > 0 && (
                    <ul className="m-0 flex shrink-0 list-none flex-wrap gap-3 p-0 sm:ml-auto sm:flex-nowrap">
                      {speakers.map((speaker) => {
                        const thumbClass =
                          "relative block h-20 w-20 overflow-hidden rounded-(--radius-media) border border-border-subtle bg-surface grayscale transition-[filter,transform,border-color] duration-300 group-hover:grayscale-0 group-hover:scale-[1.02] group-focus-within:grayscale-0 group-focus-within:border-brand-orange/50";
                        const image = (
                          <Image
                            src={speaker.src}
                            alt=""
                            fill
                            sizes="80px"
                            loading="eager"
                            className="object-cover"
                          />
                        );
                        return (
                          <li key={`${session.id}-${speaker.src}-${speaker.name}`}>
                            {speaker.slug ? (
                              <Link
                                href={`/highlighted-speakers-blog/${encodeURIComponent(speaker.slug)}`}
                                aria-label={`View ${speaker.name}`}
                                className={`${thumbClass} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange`}
                              >
                                {image}
                              </Link>
                            ) : (
                              <span className={thumbClass} role="img" aria-label={speaker.name}>
                                {image}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </Reveal>
            )}
          </li>
        );
      })}
    </ol>
  );
}

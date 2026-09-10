import Image from "next/image";
import type { AgendaSession } from "@/content/schemas/agenda";

// Layout confirmed via live computed styles (not the stacked-card guess this
// component started as):
// - Gradient row ("Registration and Check-In"): a single horizontal bar,
//   flex justify-between, dark #0f0f0f text on the brand gradient, radius 4px.
// - Regular rows: hairline top border (rgba(222,222,222,0.12)), a fixed-width
//   time chip (#1a1a1a fill, radius 8px, no stacking with the title), an
//   italic font-display title in brand-orange, a gray Inter body, and
//   right-aligned speaker thumbnails that are rounded SQUARES (radius 8px,
//   80x80, 12px gap) -- not overlapping circles.
// loading="eager" on the thumbnails: with the default lazy loading, one
// specific image (the single-speaker Keynote row) reproducibly never fired
// its browser-native load even though the asset and every optimizer size
// serve fine on their own -- confirmed repeatable across a fresh tab. These
// are 39 already-tiny (80x80) images total, so eager-loading all of them
// trades a negligible amount of below-the-fold bandwidth for not risking a
// stuck thumbnail.
export function ScheduleList({ sessions }: { sessions: AgendaSession[] }) {
  return (
    <div className="flex flex-col">
      {sessions.map((session) =>
        session.highlight ? (
          <div
            key={session.id}
            className="flex flex-col gap-1 rounded-(--radius-default) p-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ backgroundImage: "var(--gradient-brand-orange)" }}
          >
            <h3 className="font-body-fallback text-base font-medium leading-[1.2] text-on-orange">
              {session.time}
            </h3>
            <h3 className="font-display text-xl italic text-on-orange">{session.title}</h3>
          </div>
        ) : (
          <div
            key={session.id}
            className="flex flex-col gap-4 border-t border-[rgba(222,222,222,0.12)] pt-6 pb-6 sm:flex-row sm:items-start sm:gap-6"
          >
            <div className="shrink-0 sm:w-40">
              <span className="inline-block rounded-lg bg-[#1a1a1a] px-4 py-2 font-body-fallback text-sm leading-[1.2] text-[#999999]">
                {session.time}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h3 className="font-display text-2xl italic text-brand-orange">{session.title}</h3>
              {session.body && (
                <p className="max-w-2xl font-body-fallback text-sm leading-[1.6] text-[#999999]">
                  {session.body}
                </p>
              )}
            </div>
            {session.speakerImages.length > 0 && (
              <div className="flex shrink-0 flex-wrap gap-3 sm:ml-auto sm:flex-nowrap">
                {session.speakerImages.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-white/5 bg-surface grayscale"
                  >
                    <Image src={src} alt="" fill sizes="80px" loading="eager" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

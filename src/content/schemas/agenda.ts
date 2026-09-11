import { z } from "zod";

// The live site added a genuinely distinct /agenda page after Phase 0
// extraction — the "AGENDA" nav label used to be a documented dup pointing
// at /speakers; that's no longer accurate and is fixed alongside this.
export const AgendaSpeakerThumbSchema = z.object({
  src: z.string(),
  name: z.string(),
  slug: z.string().optional(),
});
export type AgendaSpeakerThumb = z.infer<typeof AgendaSpeakerThumbSchema>;

export const AgendaSessionSchema = z.object({
  id: z.string(),
  time: z.string(),
  title: z.string(),
  body: z.string(), // empty for marker rows (Registration, Founders Speech)
  /** Legacy image-only list — prefer `speakers` when available. */
  speakerImages: z.array(z.string()).optional(),
  speakers: z.array(AgendaSpeakerThumbSchema).optional(),
  // The very first row ("Registration and Check-In") is rendered with the
  // brand gradient fill instead of the plain dark row treatment.
  highlight: z.boolean(),
  order: z.number(),
});
export type AgendaSession = z.infer<typeof AgendaSessionSchema>;

export function resolveAgendaSpeakers(session: AgendaSession): AgendaSpeakerThumb[] {
  if (session.speakers && session.speakers.length > 0) return session.speakers;
  return (session.speakerImages ?? []).map((src, i) => ({
    src,
    name: `Speaker ${i + 1}`,
  }));
}

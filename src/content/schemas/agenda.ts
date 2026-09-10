import { z } from "zod";

// The live site added a genuinely distinct /agenda page after Phase 0
// extraction — the "AGENDA" nav label used to be a documented dup pointing
// at /speakers; that's no longer accurate and is fixed alongside this.
export const AgendaSessionSchema = z.object({
  id: z.string(),
  time: z.string(),
  title: z.string(),
  body: z.string(), // empty for marker rows (Registration, Founders Speech)
  speakerImages: z.array(z.string()),
  // The very first row ("Registration and Check-In") is rendered with the
  // brand gradient fill instead of the plain dark row treatment.
  highlight: z.boolean(),
  order: z.number(),
});
export type AgendaSession = z.infer<typeof AgendaSessionSchema>;

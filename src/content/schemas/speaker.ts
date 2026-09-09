import { z } from "zod";

// followers is a free-form string, not a number, deliberately: the live site's
// own formatting is inconsistent ("13.9M Followers", "3k", "15.6" with no
// unit, "" for two team-founder entries) and that inconsistency is replicated
// rather than normalized (see FIDELITY-NOTES.md).
export const SpeakerSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  followers: z.string(),
  portrait: z.string(),
  bio: z.string(),
  // Only populated for the home page's featured strip, where cards link
  // straight to Instagram (the full /speakers grid links to the detail page
  // instead). Two of these are deliberately broken — see FIDELITY-NOTES.md.
  instagramUrl: z.string().optional(),
  order: z.number(),
});
export type Speaker = z.infer<typeof SpeakerSchema>;

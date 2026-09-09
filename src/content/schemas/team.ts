import { z } from "zod";

export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  instagramHandle: z.string(),
  portrait: z.string(),
  order: z.number(),
});
export type TeamMember = z.infer<typeof TeamMemberSchema>;

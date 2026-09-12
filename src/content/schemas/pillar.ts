import { z } from "zod";

export const PillarSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  image: z.string(),
  order: z.number(),
});
export type Pillar = z.infer<typeof PillarSchema>;

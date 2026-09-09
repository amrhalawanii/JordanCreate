import { z } from "zod";

export const StatSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  sublabel: z.string(),
  order: z.number(),
});
export type Stat = z.infer<typeof StatSchema>;

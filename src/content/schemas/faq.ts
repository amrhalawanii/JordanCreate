import { z } from "zod";

export const FAQEntrySchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  order: z.number(),
});
export type FAQEntry = z.infer<typeof FAQEntrySchema>;

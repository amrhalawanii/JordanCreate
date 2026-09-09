import { z } from "zod";
import { CTASchema } from "./nav";

export const InfoTabSchema = z.object({
  id: z.string(),
  trigger: z.string(),
  body: z.string(),
  cta: CTASchema,
  order: z.number(),
});
export type InfoTab = z.infer<typeof InfoTabSchema>;

export const PageHeroSchema = z.object({
  id: z.string(),
  heading: z.string(),
  subheading: z.string(),
  cta: CTASchema.optional(),
  backgroundImage: z.string(),
});
export type PageHero = z.infer<typeof PageHeroSchema>;

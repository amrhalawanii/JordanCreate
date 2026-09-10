import { z } from "zod";
import { CTASchema } from "./nav";

export const InfoTabSchema = z.object({
  id: z.string(),
  trigger: z.string(),
  body: z.string(),
  cta: CTASchema,
  image: z.string(),
  order: z.number(),
});
export type InfoTab = z.infer<typeof InfoTabSchema>;

export const PageHeroSchema = z.object({
  id: z.string(),
  heading: z.string(),
  // Exact live desktop font-size in px — the three page heroes are NOT the
  // same size (Speakers/About: 166px, Partner: 100px), confirmed via
  // computed styles. See PageHero.tsx for the responsive scale-down.
  headingSizeDesktop: z.number(),
  subheading: z.string(),
  cta: CTASchema.optional(),
  backgroundImage: z.string(),
});
export type PageHero = z.infer<typeof PageHeroSchema>;

import { z } from "zod";
import { CTASchema } from "./nav";

export const HeroContentSchema = z.object({
  id: z.string(),
  heading: z.string(),
  subheading: z.string(),
  cta: CTASchema,
  scrollHint: z.string(),
});
export type HeroContent = z.infer<typeof HeroContentSchema>;

import { z } from "zod";

export const PartnerBenefitSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  image: z.string(),
  order: z.number(),
});
export type PartnerBenefit = z.infer<typeof PartnerBenefitSchema>;

export const ImpactItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  icon: z.string(),
  order: z.number(),
});
export type ImpactItem = z.infer<typeof ImpactItemSchema>;

export const ReachStatSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  body: z.string(),
  order: z.number(),
});
export type ReachStat = z.infer<typeof ReachStatSchema>;

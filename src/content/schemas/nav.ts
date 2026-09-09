import { z } from "zod";

export const NavItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
  order: z.number(),
});
export type NavItem = z.infer<typeof NavItemSchema>;

export const CTASchema = z.object({
  label: z.string(),
  href: z.string(),
});
export type CTA = z.infer<typeof CTASchema>;

export const SiteSettingsSchema = z.object({
  siteName: z.string(),
  tagline: z.string(),
  instagramUrl: z.string(),
  contactCta: CTASchema,
});
export type SiteSettings = z.infer<typeof SiteSettingsSchema>;

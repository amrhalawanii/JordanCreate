/**
 * Static content adapter. Reads from the hardcoded data/ files. This is the
 * only adapter wired up today — see repository.ts for how CONTENT_SOURCE
 * selects between this and the future api adapter with zero component
 * changes required on either side.
 */
import { desktopNavItems, mobileNavItems, footerNavItems, siteSettings } from "../data/nav";
import { homeHero } from "../data/hero";
import type { NavItem, SiteSettings } from "../schemas/nav";
import type { HeroContent } from "../schemas/hero";

export async function getDesktopNavItems(): Promise<NavItem[]> {
  return [...desktopNavItems].sort((a, b) => a.order - b.order);
}

export async function getMobileNavItems(): Promise<NavItem[]> {
  return [...mobileNavItems].sort((a, b) => a.order - b.order);
}

export async function getFooterNavItems(): Promise<NavItem[]> {
  return [...footerNavItems].sort((a, b) => a.order - b.order);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getHomeHero(): Promise<HeroContent> {
  return homeHero;
}

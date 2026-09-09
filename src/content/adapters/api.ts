/**
 * Future API adapter. Same function signatures as static.ts, backed by the
 * eventual admin API instead of hardcoded data. Intentionally unimplemented —
 * repository.ts will route to this once CONTENT_SOURCE=api and a real
 * endpoint exists. Kept in the same shape as static.ts so swapping adapters
 * never requires a component change.
 */
import type { NavItem, SiteSettings } from "../schemas/nav";
import type { HeroContent } from "../schemas/hero";

function notImplemented(name: string): never {
  throw new Error(
    `content/adapters/api: ${name}() is not implemented yet. Set CONTENT_SOURCE=static until an admin API exists.`
  );
}

export async function getDesktopNavItems(): Promise<NavItem[]> {
  notImplemented("getDesktopNavItems");
}

export async function getMobileNavItems(): Promise<NavItem[]> {
  notImplemented("getMobileNavItems");
}

export async function getFooterNavItems(): Promise<NavItem[]> {
  notImplemented("getFooterNavItems");
}

export async function getSiteSettings(): Promise<SiteSettings> {
  notImplemented("getSiteSettings");
}

export async function getHomeHero(): Promise<HeroContent> {
  notImplemented("getHomeHero");
}

/**
 * Content repository — the only thing components are allowed to import
 * content through. Selects the adapter based on CONTENT_SOURCE:
 * - static (default): hardcoded TS
 * - supabase: live speakers + agenda from Supabase (anon + RLS), rest static
 * - api: reserved stub for Express programme API
 */
import * as staticAdapter from "./adapters/static";
import * as apiAdapter from "./adapters/api";
import * as supabaseAdapter from "./adapters/supabase";

const source = (process.env.CONTENT_SOURCE ?? "static").toLowerCase();

const adapter =
  source === "supabase"
    ? supabaseAdapter
    : source === "api"
      ? apiAdapter
      : staticAdapter;

export const {
  getDesktopNavItems,
  getMobileNavItems,
  getFooterNavItems,
  getSiteSettings,
  getHomeHero,
  getSpeakers,
  getSpeakerBySlug,
  getFeaturedSpeakerSlugs,
  getTeamMembers,
  getFAQEntries,
  getPillars,
  getHomeStats,
  getReachStats,
  getGalleryImages,
  getPartnerBenefits,
  getImpactItems,
  getInfoTabs,
  getSpeakersHero,
  getPartnerHero,
  getAboutHero,
  getAgendaHero,
  getAgendaSessions,
  getAgendaIntro,
  getIntroBlock,
  getFinalCta,
  getOurStory,
  getMissionVisionValue,
  getMeetTheCrewIntro,
  getWhoYoureReaching,
  getWhatPartnersGet,
  getPartnerImpact,
  getNotFoundContent,
} = adapter;

export function getSpeakersContentMeta() {
  if (source === "supabase" && "getSpeakersContentMeta" in supabaseAdapter) {
    return supabaseAdapter.getSpeakersContentMeta();
  }
  return { source: "static" as const, degraded: false };
}

export function getAgendaContentMeta() {
  if (source === "supabase" && "getAgendaContentMeta" in supabaseAdapter) {
    return supabaseAdapter.getAgendaContentMeta();
  }
  return { source: "static" as const, degraded: false };
}

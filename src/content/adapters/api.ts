/**
 * Future API adapter. Same function signatures as static.ts.
 *
 * Intended production wiring (not implemented yet — frontend-only phase):
 * - CONTENT_SOURCE=api
 * - CONTENT_API_URL → Express API (GET /api/mobile/agenda, GET /api/speakers)
 * - Map programme DTOs → website Zod schemas; keep marketing-only blocks static
 *
 * repository.ts already switches on CONTENT_SOURCE so components never change.
 */
function notImplemented(name: string): never {
  throw new Error(
    `content/adapters/api: ${name}() is not implemented yet. Set CONTENT_SOURCE=static until an admin API exists.`,
  );
}

const names = [
  "getDesktopNavItems",
  "getMobileNavItems",
  "getFooterNavItems",
  "getSiteSettings",
  "getHomeHero",
  "getSpeakers",
  "getSpeakerBySlug",
  "getFeaturedSpeakerSlugs",
  "getTeamMembers",
  "getFAQEntries",
  "getPillars",
  "getHomeStats",
  "getReachStats",
  "getGalleryImages",
  "getPartnerBenefits",
  "getImpactItems",
  "getInfoTabs",
  "getSpeakersHero",
  "getPartnerHero",
  "getAboutHero",
  "getAgendaHero",
  "getAgendaSessions",
  "getAgendaIntro",
  "getIntroBlock",
  "getFinalCta",
  "getOurStory",
  "getMissionVisionValue",
  "getMeetTheCrewIntro",
  "getWhoYoureReaching",
  "getWhatPartnersGet",
  "getPartnerImpact",
  "getNotFoundContent",
] as const;

type Fns = Record<(typeof names)[number], (...args: unknown[]) => Promise<never>>;

const impl = {} as Fns;
for (const name of names) {
  impl[name] = async () => notImplemented(name);
}

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
} = impl;

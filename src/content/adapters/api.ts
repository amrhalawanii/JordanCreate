/**
 * Future API adapter. Same function signatures as static.ts, backed by the
 * eventual admin API instead of hardcoded data. Intentionally unimplemented —
 * repository.ts will route to this once CONTENT_SOURCE=api and a real
 * endpoint exists. Kept in the same shape as static.ts so swapping adapters
 * never requires a component change.
 */
function notImplemented(name: string): never {
  throw new Error(
    `content/adapters/api: ${name}() is not implemented yet. Set CONTENT_SOURCE=static until an admin API exists.`
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

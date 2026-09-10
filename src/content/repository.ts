/**
 * Content repository — the only thing components are allowed to import
 * content through. Selects the static or api adapter based on
 * CONTENT_SOURCE so swapping in a real backend later is a one-line change
 * here, never a component edit.
 */
import * as staticAdapter from "./adapters/static";
import * as apiAdapter from "./adapters/api";

const adapter = process.env.CONTENT_SOURCE === "api" ? apiAdapter : staticAdapter;

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

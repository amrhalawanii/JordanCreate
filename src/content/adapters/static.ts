/**
 * Static content adapter. Reads from the hardcoded data/ files. This is the
 * only adapter wired up today — see repository.ts for how CONTENT_SOURCE
 * selects between this and the future api adapter with zero component
 * changes required on either side.
 */
import { desktopNavItems, mobileNavItems, footerNavItems, siteSettings } from "../data/nav";
import { homeHero } from "../data/hero";
import { speakers } from "../data/speakers";
import { teamMembers } from "../data/team";
import { faqEntries } from "../data/faq";
import { pillars } from "../data/pillars";
import { homeStats, reachStats } from "../data/stats";
import { galleryImages } from "../data/gallery";
import { partnerBenefits, impactItems } from "../data/partnerBenefits";
import { infoTabs } from "../data/infoTabs";
import { speakersHero, partnerHero, aboutHero, agendaHero } from "../data/pageHeroes";
import { agendaSessions } from "../data/agenda";
import * as misc from "../data/misc";

const byOrder = <T extends { order: number }>(items: T[]) => [...items].sort((a, b) => a.order - b.order);

export async function getDesktopNavItems() { return byOrder(desktopNavItems); }
export async function getMobileNavItems() { return byOrder(mobileNavItems); }
export async function getFooterNavItems() { return byOrder(footerNavItems); }
export async function getSiteSettings() { return siteSettings; }
export async function getHomeHero() { return homeHero; }

export async function getSpeakers() { return byOrder(speakers); }
export async function getSpeakerBySlug(slug: string) {
  // Several live slugs carry a leading U+2060 (word-joiner) character — match
  // literally first (so the real, invisible-char URL keeps working exactly
  // like the live site), then fall back to a stripped match so a "clean" URL
  // without the invisible character still resolves.
  return (
    speakers.find((s) => s.slug === slug) ??
    speakers.find((s) => s.slug.replace(/⁠/g, "") === slug.replace(/⁠/g, ""))
  );
}
export async function getFeaturedSpeakerSlugs() {
  // Home page "Meet the voices shaping what's next" strip — the featured
  // subset called out by name in the master prompt, in that order.
  return [
    "sara-al-refai",
    "khaled-shammout",
    "nour-maraqa",
    "mohanad-syoof",
    "yousef-salem",
    "abdullah-absi",
    "yazan-abuajweh",
    "nasser-laila",
    "rozzah",
    "sabasham-a",
  ];
}

export async function getTeamMembers() { return byOrder(teamMembers); }
export async function getFAQEntries() { return byOrder(faqEntries); }
export async function getPillars() { return byOrder(pillars); }
export async function getHomeStats() { return byOrder(homeStats); }
export async function getReachStats() { return byOrder(reachStats); }
export async function getGalleryImages() { return byOrder(galleryImages); }
export async function getPartnerBenefits() { return byOrder(partnerBenefits); }
export async function getImpactItems() { return byOrder(impactItems); }
export async function getInfoTabs() { return byOrder(infoTabs); }

export async function getSpeakersHero() { return speakersHero; }
export async function getPartnerHero() { return partnerHero; }
export async function getAboutHero() { return aboutHero; }
export async function getAgendaHero() { return agendaHero; }
export async function getAgendaSessions() { return byOrder(agendaSessions); }
export async function getAgendaIntro() { return misc.agendaIntro; }

export async function getIntroBlock() { return misc.introBlock; }
export async function getFinalCta() { return misc.finalCta; }
export async function getOurStory() { return misc.ourStory; }
export async function getMissionVisionValue() { return misc.missionVisionValue; }
export async function getMeetTheCrewIntro() { return misc.meetTheCrewIntro; }
export async function getWhoYoureReaching() { return misc.whoYoureReaching; }
export async function getWhatPartnersGet() { return misc.whatPartnersGet; }
export async function getPartnerImpact() { return misc.partnerImpact; }
export async function getNotFoundContent() { return misc.notFoundContent; }

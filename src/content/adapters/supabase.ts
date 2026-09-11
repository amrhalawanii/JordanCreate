/**
 * Hybrid content adapter.
 *
 * - Speakers + agenda load from Supabase (anon key + RLS) when
 *   CONTENT_SOURCE=supabase and env is configured.
 * - On any failure, falls back to the static adapter so the marketing site
 *   never hard-crashes in production.
 * - All other content stays static (marketing copy).
 */
import * as staticAdapter from "./static";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import {
  getSupabaseFeaturedSpeakerSlugs,
  getSupabaseSpeakerBySlug,
  getSupabaseSpeakers,
} from "@/content/supabase/speakers";
import { getSupabaseAgendaSessions } from "@/content/supabase/agenda";

export type ProgrammeSource = "supabase" | "static-fallback" | "static";

type ProgrammeMeta = {
  source: ProgrammeSource;
  degraded: boolean;
  message?: string;
};

let lastSpeakersMeta: ProgrammeMeta = { source: "static", degraded: false };
let lastAgendaMeta: ProgrammeMeta = { source: "static", degraded: false };

export function getSpeakersContentMeta(): ProgrammeMeta {
  return lastSpeakersMeta;
}

export function getAgendaContentMeta(): ProgrammeMeta {
  return lastAgendaMeta;
}

function logProgrammeError(scope: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[content/supabase] ${scope}:`, message);
}

async function withSpeakerFallback<T>(
  live: () => Promise<T>,
  fallback: () => Promise<T>,
  emptyMessage: string,
): Promise<T> {
  if (!isSupabaseConfigured()) {
    lastSpeakersMeta = {
      source: "static",
      degraded: false,
      message: "Supabase env is not configured; using static speakers.",
    };
    return fallback();
  }

  try {
    const data = await live();
    const isEmptyArray = Array.isArray(data) && data.length === 0;
    lastSpeakersMeta = {
      source: "supabase",
      degraded: false,
      message: isEmptyArray ? emptyMessage : undefined,
    };
    return data;
  } catch (error) {
    logProgrammeError("speakers", error);
    lastSpeakersMeta = {
      source: "static-fallback",
      degraded: true,
      message:
        "Live speakers are temporarily unavailable. Showing the last curated lineup.",
    };
    return fallback();
  }
}

async function withAgendaFallback<T>(
  live: () => Promise<T>,
  fallback: () => Promise<T>,
  emptyMessage: string,
): Promise<T> {
  if (!isSupabaseConfigured()) {
    lastAgendaMeta = {
      source: "static",
      degraded: false,
      message: "Supabase env is not configured; using static agenda.",
    };
    return fallback();
  }

  try {
    const data = await live();
    const isEmptyArray = Array.isArray(data) && data.length === 0;
    lastAgendaMeta = {
      source: "supabase",
      degraded: false,
      message: isEmptyArray ? emptyMessage : undefined,
    };
    return data;
  } catch (error) {
    logProgrammeError("agenda", error);
    lastAgendaMeta = {
      source: "static-fallback",
      degraded: true,
      message:
        "Live agenda is temporarily unavailable. Showing the last curated schedule.",
    };
    return fallback();
  }
}

// —— Re-export all static marketing content ——
export const getDesktopNavItems = staticAdapter.getDesktopNavItems;
export const getMobileNavItems = staticAdapter.getMobileNavItems;
export const getFooterNavItems = staticAdapter.getFooterNavItems;
export const getSiteSettings = staticAdapter.getSiteSettings;
export const getHomeHero = staticAdapter.getHomeHero;
export const getTeamMembers = staticAdapter.getTeamMembers;
export const getFAQEntries = staticAdapter.getFAQEntries;
export const getPillars = staticAdapter.getPillars;
export const getHomeStats = staticAdapter.getHomeStats;
export const getReachStats = staticAdapter.getReachStats;
export const getGalleryImages = staticAdapter.getGalleryImages;
export const getPartnerBenefits = staticAdapter.getPartnerBenefits;
export const getImpactItems = staticAdapter.getImpactItems;
export const getInfoTabs = staticAdapter.getInfoTabs;
export const getSpeakersHero = staticAdapter.getSpeakersHero;
export const getPartnerHero = staticAdapter.getPartnerHero;
export const getAboutHero = staticAdapter.getAboutHero;
export const getAgendaHero = staticAdapter.getAgendaHero;
export const getAgendaIntro = staticAdapter.getAgendaIntro;
export const getIntroBlock = staticAdapter.getIntroBlock;
export const getFinalCta = staticAdapter.getFinalCta;
export const getOurStory = staticAdapter.getOurStory;
export const getMissionVisionValue = staticAdapter.getMissionVisionValue;
export const getMeetTheCrewIntro = staticAdapter.getMeetTheCrewIntro;
export const getWhoYoureReaching = staticAdapter.getWhoYoureReaching;
export const getWhatPartnersGet = staticAdapter.getWhatPartnersGet;
export const getPartnerImpact = staticAdapter.getPartnerImpact;
export const getNotFoundContent = staticAdapter.getNotFoundContent;

// —— Programme: Speakers ——
export async function getSpeakers() {
  return withSpeakerFallback(
    getSupabaseSpeakers,
    staticAdapter.getSpeakers,
    "No published speakers yet. Check back soon.",
  );
}

export async function getSpeakerBySlug(slug: string) {
  if (!isSupabaseConfigured()) {
    lastSpeakersMeta = { source: "static", degraded: false };
    return staticAdapter.getSpeakerBySlug(slug);
  }

  try {
    const live = await getSupabaseSpeakerBySlug(slug);
    if (live) {
      lastSpeakersMeta = { source: "supabase", degraded: false };
      return live;
    }
    // Soft miss: try static so old URLs still resolve during migration.
    const fallback = await staticAdapter.getSpeakerBySlug(slug);
    lastSpeakersMeta = {
      source: fallback ? "static-fallback" : "supabase",
      degraded: Boolean(fallback),
      message: fallback
        ? undefined
        : undefined,
    };
    return fallback;
  } catch (error) {
    logProgrammeError("speaker-by-slug", error);
    lastSpeakersMeta = {
      source: "static-fallback",
      degraded: true,
      message: "Live speaker profile unavailable; showing curated copy if present.",
    };
    return staticAdapter.getSpeakerBySlug(slug);
  }
}

export async function getFeaturedSpeakerSlugs() {
  return withSpeakerFallback(
    getSupabaseFeaturedSpeakerSlugs,
    staticAdapter.getFeaturedSpeakerSlugs,
    "No featured speakers published yet.",
  );
}

// —— Programme: Agenda ——
export async function getAgendaSessions() {
  return withAgendaFallback(
    getSupabaseAgendaSessions,
    staticAdapter.getAgendaSessions,
    "The schedule will be published here soon.",
  );
}

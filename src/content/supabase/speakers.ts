import "server-only";

import { unstable_cache } from "next/cache";
import { SpeakerSchema, type Speaker } from "@/content/schemas/speaker";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { SpeakerRow, SpeakerSocialLinkRow } from "@/lib/supabase/types";
import {
  FEATURED_SPEAKER_SLUG_PREFERENCE,
  mapSpeakerRow,
  slugFromHandle,
  speakerHandleKey,
} from "./mappers";

const REVALIDATE_SECONDS = 60;

async function fetchSpeakersUncached(): Promise<Speaker[]> {
  const supabase = getSupabaseServerClient();

  const [{ data: speakerRows, error: speakerError }, { data: linkRows, error: linkError }] =
    await Promise.all([
      supabase
        .from("speakers")
        .select(
          "handle, tagline, category, followers_range, known_for, availability, bio_status, photo_url, tags, archived, updated_at",
        )
        .eq("archived", false)
        .order("handle", { ascending: true }),
      supabase
        .from("speaker_social_links")
        .select("id, speaker_handle, platform, handle, url, sort_order")
        .order("sort_order", { ascending: true }),
    ]);

  if (speakerError) {
    throw new Error(`Supabase speakers query failed: ${speakerError.message}`);
  }
  if (linkError) {
    throw new Error(`Supabase speaker_social_links query failed: ${linkError.message}`);
  }

  const links = (linkRows ?? []) as SpeakerSocialLinkRow[];
  const mapped = ((speakerRows ?? []) as SpeakerRow[])
    .map((row, index) => mapSpeakerRow(row, links, index))
    .filter((row): row is Speaker => Boolean(row))
    .map((row) => SpeakerSchema.parse(row));

  // Prefer speakers with portraits, then alphabetical by name for a stable grid.
  return mapped.sort((a, b) => {
    const aPhoto = a.portrait.startsWith("http") ? 0 : 1;
    const bPhoto = b.portrait.startsWith("http") ? 0 : 1;
    if (aPhoto !== bPhoto) return aPhoto - bPhoto;
    return a.name.localeCompare(b.name);
  }).map((speaker, order) => ({ ...speaker, order }));
}

export const getSupabaseSpeakers = unstable_cache(
  fetchSpeakersUncached,
  ["supabase-speakers-v1"],
  { revalidate: REVALIDATE_SECONDS, tags: ["speakers"] },
);

export async function getSupabaseSpeakerBySlug(slug: string): Promise<Speaker | undefined> {
  const clean = slug.replace(/\u2060/g, "");
  const all = await getSupabaseSpeakers();
  return (
    all.find((s) => s.slug === slug) ??
    all.find((s) => s.slug.replace(/\u2060/g, "") === clean)
  );
}

export async function getSupabaseFeaturedSpeakerSlugs(): Promise<string[]> {
  const all = await getSupabaseSpeakers();
  const bySlug = new Map(all.map((s) => [s.slug, s]));
  const byHandleish = new Map(
    all.flatMap((s) => {
      const key = speakerHandleKey(s.slug);
      return [[key, s.slug] as const, [s.slug, s.slug] as const];
    }),
  );

  const picked: string[] = [];
  for (const pref of FEATURED_SPEAKER_SLUG_PREFERENCE) {
    const slug =
      bySlug.get(pref)?.slug ??
      byHandleish.get(speakerHandleKey(pref)) ??
      byHandleish.get(slugFromHandle(pref));
    if (slug && !picked.includes(slug)) picked.push(slug);
    if (picked.length >= 10) break;
  }

  if (picked.length >= 3) return picked;

  // Fallback: first speakers that have remote portraits.
  return all
    .filter((s) => s.portrait.startsWith("http"))
    .slice(0, 10)
    .map((s) => s.slug);
}

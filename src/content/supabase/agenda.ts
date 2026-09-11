import "server-only";

import { unstable_cache } from "next/cache";
import { AgendaSessionSchema, type AgendaSession } from "@/content/schemas/agenda";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { AgendaSessionRow, SpeakerRow } from "@/lib/supabase/types";
import { mapAgendaSessionRow, sanitizeHttpUrl, speakerHandleKey, slugFromHandle, displayNameFromHandle } from "./mappers";

const REVALIDATE_SECONDS = 60;

async function fetchAgendaUncached(): Promise<AgendaSession[]> {
  const supabase = getSupabaseServerClient();

  const [{ data: sessionRows, error: sessionError }, { data: speakerRows, error: speakerError }] =
    await Promise.all([
      supabase
        .from("agenda_sessions")
        .select(
          "session_id, start_time, end_time, session_type, title, description, speaker_handles, moderator_handle, duration_minutes, interest_tag_ids, location_within_venue, status, flag_notes, sort_order, archived, updated_at",
        )
        .eq("archived", false)
        .eq("status", "confirmed")
        .order("sort_order", { ascending: true }),
      supabase
        .from("speakers")
        .select("handle, photo_url, archived")
        .eq("archived", false),
    ]);

  if (sessionError) {
    throw new Error(`Supabase agenda_sessions query failed: ${sessionError.message}`);
  }
  if (speakerError) {
    throw new Error(`Supabase speakers (for agenda photos) query failed: ${speakerError.message}`);
  }

  const speakersByHandle = new Map<string, { src: string; name: string; slug: string }>();
  for (const row of (speakerRows ?? []) as Pick<SpeakerRow, "handle" | "photo_url">[]) {
    const photo = sanitizeHttpUrl(row.photo_url);
    if (!photo) continue;
    const handle = row.handle?.trim();
    if (!handle) continue;
    const slug = slugFromHandle(handle);
    if (!slug) continue;
    speakersByHandle.set(speakerHandleKey(handle), {
      src: photo,
      name: displayNameFromHandle(handle),
      slug,
    });
  }

  return ((sessionRows ?? []) as AgendaSessionRow[])
    .map((row) => mapAgendaSessionRow(row, speakersByHandle))
    .filter((row): row is AgendaSession => Boolean(row))
    .map((row) => AgendaSessionSchema.parse(row))
    .sort((a, b) => a.order - b.order);
}

export const getSupabaseAgendaSessions = unstable_cache(
  fetchAgendaUncached,
  ["supabase-agenda-v1"],
  { revalidate: REVALIDATE_SECONDS, tags: ["agenda"] },
);

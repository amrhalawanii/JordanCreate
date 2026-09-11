import type { AgendaSession } from "@/content/schemas/agenda";
import type { Speaker } from "@/content/schemas/speaker";
import { resolveInstagramUrl } from "@/lib/instagram";
import type { AgendaSessionRow, SpeakerRow, SpeakerSocialLinkRow } from "@/lib/supabase/types";

const TIME_PATTERN = /^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?$/;

export function speakerHandleKey(handle: string): string {
  return handle.trim().replace(/^@+/, "").toLocaleLowerCase("en");
}

export function slugFromHandle(handle: string): string {
  return speakerHandleKey(handle)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function displayNameFromHandle(handle: string): string {
  const base = handle.trim().replace(/^@+/, "");
  return base
    .split(/[._\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function sanitizeHttpUrl(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return trimmed;
  } catch {
    return null;
  }
}

function normalizeClock(time: string): string | null {
  const match = time.trim().match(TIME_PATTERN);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = match[2]!;
  if (hours > 23) return null;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

export function formatTimeLabel(time: string): string {
  const clock = normalizeClock(time);
  if (!clock) return time.trim();
  const [hours = "00", minutes = "00"] = clock.split(":");
  const hour = Number(hours);
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${String(hour % 12 || 12).padStart(2, "0")}:${minutes} ${suffix}`;
}

export function formatTimeRange(start: string, end: string): string {
  const startLabel = formatTimeLabel(start);
  const endLabel = formatTimeLabel(end);
  if (!start.trim()) return endLabel;
  if (!end.trim() || startLabel === endLabel) return startLabel;
  return `${startLabel} – ${endLabel}`;
}

export function isHighlightSession(row: AgendaSessionRow): boolean {
  const haystack = `${row.session_type} ${row.title}`.toLocaleLowerCase();
  return (
    haystack.includes("registration") ||
    haystack.includes("check-in") ||
    haystack.includes("check in") ||
    haystack.includes("doors")
  );
}

export function instagramUrlForSpeaker(
  handle: string,
  links: SpeakerSocialLinkRow[],
): string | undefined {
  const key = speakerHandleKey(handle);
  const candidates = links
    .filter((link) => speakerHandleKey(link.speaker_handle) === key)
    .sort((a, b) => a.sort_order - b.sort_order);

  for (const link of candidates) {
    if (!/instagram/i.test(link.platform)) continue;
    const resolved = resolveInstagramUrl(link.url) ?? resolveInstagramUrl(`https://instagram.com/${link.handle}`);
    if (resolved) return resolved;
  }
  return undefined;
}

export function mapSpeakerRow(
  row: SpeakerRow,
  links: SpeakerSocialLinkRow[],
  order: number,
): Speaker | null {
  const handle = row.handle?.trim();
  if (!handle) return null;

  const slug = slugFromHandle(handle);
  if (!slug) return null;

  const portrait = sanitizeHttpUrl(row.photo_url) ?? "/assets/brand/logo.png";
  const bio =
    row.bio_status === "missing"
      ? ""
      : (row.known_for?.trim() || row.tagline?.trim() || "");

  return {
    id: `speaker-${slug}`,
    slug,
    name: displayNameFromHandle(handle),
    followers: row.followers_range?.trim() ?? "",
    portrait,
    bio,
    instagramUrl: instagramUrlForSpeaker(handle, links),
    order,
  };
}

export function mapAgendaSessionRow(
  row: AgendaSessionRow,
  speakersByHandle: Map<string, { src: string; name: string; slug: string }>,
): AgendaSession | null {
  const id = row.session_id?.trim();
  const title = row.title?.trim();
  if (!id || !title) return null;

  const handles = [
    ...(row.speaker_handles ?? []),
    ...(row.moderator_handle ? [row.moderator_handle] : []),
  ];

  const speakers = handles
    .map((handle) => speakersByHandle.get(speakerHandleKey(handle)))
    .filter((s): s is { src: string; name: string; slug: string } => Boolean(s));

  return {
    id,
    time: formatTimeRange(row.start_time ?? "", row.end_time ?? ""),
    title,
    body: row.description?.trim() ?? "",
    speakerImages: speakers.map((s) => s.src),
    speakers,
    highlight: isHighlightSession(row),
    order: row.sort_order ?? 0,
  };
}

/** Preferred home-strip order when those slugs exist in live data. */
export const FEATURED_SPEAKER_SLUG_PREFERENCE = [
  "sara-al-refai",
  "thesararefai",
  "khaled-shammout",
  "khaledshammout",
  "nour-maraqa",
  "nourmaraka",
  "mohanad-syoof",
  "mohanadsyoof",
  "yousef-salem",
  "josalem",
  "abdullah-absi",
  "abdullahabsi",
  "yazan-abuajweh",
  "yazan-abuajweh",
  "nasser-laila",
  "leilaxnasser",
  "rozzah",
  "sabasham-a",
  "saba-shamaa",
] as const;

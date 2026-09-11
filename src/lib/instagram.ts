/** Returns a usable Instagram profile URL, or null if the value is invalid. */
export function resolveInstagramUrl(raw?: string | null): string | null {
  if (!raw) return null;
  const match = raw.match(/https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._]+\/?/);
  if (!match) return null;
  const url = match[0].replace(/\/?$/, "/");
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "www.instagram.com" && parsed.hostname !== "instagram.com") {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

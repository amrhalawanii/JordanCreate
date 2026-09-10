import type { MetadataRoute } from "next";
import { getSpeakers } from "@/content/repository";

const BASE = "https://www.jordancreate.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const speakers = await getSpeakers();

  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/agenda`, priority: 0.9 },
    { url: `${BASE}/speakers`, priority: 0.9 },
    { url: `${BASE}/partner-with-us`, priority: 0.8 },
    { url: `${BASE}/about-us`, priority: 0.7 },
    ...speakers.map((s) => ({
      url: `${BASE}/highlighted-speakers-blog/${encodeURIComponent(s.slug)}`,
      priority: 0.5,
    })),
  ];
}

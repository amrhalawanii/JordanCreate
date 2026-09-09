/**
 * Asset harvest pass (master prompt §1.4).
 *
 * Scans every captured DOM snapshot for framerusercontent.com image/svg/video
 * references, strips Framer's resize query params to get each asset's original
 * file, downloads every unique one into reference/assets-original/, and writes
 * ASSET-MANIFEST.json (original URL -> local path -> pages it appears on -> any
 * alt text captured, for later semantic renaming when components are built).
 *
 * A handful of assets the master prompt calls out explicitly by hash (CTA
 * background, OG image, the partner-page video, the apple-touch-icon/logo) are
 * additionally copied into /public/assets/ under their human-readable names.
 */
import { readdir, readFile, mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const DOM_DIR = path.resolve(__dirname, "..", "reference", "dom");
const OUT_DIR = path.resolve(__dirname, "..", "reference", "assets-original");
const PUBLIC_DIR = path.resolve(__dirname, "..", "public", "assets");

const ASSET_URL_RE =
  /https:\/\/framerusercontent\.com\/(images|assets)\/[A-Za-z0-9_-]+\.(png|jpe?g|svg|mp4|webp|gif)/gi;

const ALT_NEAR_RE = /<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi;

interface ManifestEntry {
  url: string;
  localPath: string;
  pages: string[];
  altTexts: string[];
}

function bareUrl(u: string): string {
  return u.split("?")[0].replace(/&amp;/g, "&");
}

async function main() {
  const files = (await readdir(DOM_DIR)).filter((f) => f.endsWith(".html"));
  const manifest = new Map<string, ManifestEntry>();

  for (const file of files) {
    const html = await readFile(path.join(DOM_DIR, file), "utf-8");
    const page = file.replace(/\.html$/, "");

    const urls = new Set<string>();
    for (const m of html.matchAll(ASSET_URL_RE)) urls.add(bareUrl(m[0]));

    const altByUrl = new Map<string, string>();
    for (const m of html.matchAll(ALT_NEAR_RE)) {
      const src = bareUrl(m[1].replace(/&amp;/g, "&"));
      if (m[2]) altByUrl.set(src, m[2]);
    }

    for (const url of urls) {
      const kind = url.includes("/images/") ? "images" : "assets";
      const filename = url.split("/").pop()!;
      const localPath = `reference/assets-original/${kind}/${filename}`;
      if (!manifest.has(url)) {
        manifest.set(url, { url, localPath, pages: [], altTexts: [] });
      }
      const entry = manifest.get(url)!;
      if (!entry.pages.includes(page)) entry.pages.push(page);
      const alt = altByUrl.get(url);
      if (alt && !entry.altTexts.includes(alt)) entry.altTexts.push(alt);
    }
  }

  await mkdir(path.join(OUT_DIR, "images"), { recursive: true });
  await mkdir(path.join(OUT_DIR, "assets"), { recursive: true });

  const entries = Array.from(manifest.values());
  console.log(`Found ${entries.length} unique framerusercontent.com assets to download.`);

  let ok = 0;
  let failed: string[] = [];
  for (const entry of entries) {
    const dest = path.resolve(__dirname, "..", entry.localPath);
    try {
      const res = await fetch(entry.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(dest, buf);
      ok++;
    } catch (e) {
      failed.push(`${entry.url} -> ${(e as Error).message}`);
    }
  }

  console.log(`Downloaded ${ok}/${entries.length}.`);
  if (failed.length) {
    console.log("Failed:");
    failed.forEach((f) => console.log("  " + f));
  }

  await writeFile(
    path.resolve(__dirname, "..", "ASSET-MANIFEST.json"),
    JSON.stringify(entries.sort((a, b) => a.url.localeCompare(b.url)), null, 2),
    "utf-8"
  );

  // Copy the explicitly-named assets from the master prompt into /public/assets
  // with human-readable names.
  const NAMED: { hash: string; kind: "images" | "assets"; ext: string; dest: string }[] = [
    { hash: "zDFwrrKZtda7T7fxuZybaM68Ns", kind: "images", ext: "png", dest: "cta/room-background.png" },
    { hash: "2xUHcovzEQzzDX7p9ceyMwEyvQc", kind: "assets", ext: "png", dest: "og/share-card.png" },
    { hash: "wpL6fYvcEBKngyEbpiCumQ4If98", kind: "assets", ext: "mp4", dest: "partners/impact-loop.mp4" },
    { hash: "VVcNX5XXbXcT0Q9Ao0NDPi99c8", kind: "images", ext: "png", dest: "brand/apple-touch-icon.png" },
  ];
  for (const n of NAMED) {
    const src = path.join(OUT_DIR, n.kind, `${n.hash}.${n.ext}`);
    const destPath = path.join(PUBLIC_DIR, n.dest);
    await mkdir(path.dirname(destPath), { recursive: true });
    try {
      await copyFile(src, destPath);
      console.log(`Named asset: ${n.dest}`);
    } catch (e) {
      console.log(`Could not copy named asset ${n.hash}: ${(e as Error).message}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

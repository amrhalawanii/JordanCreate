import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const speakers = JSON.parse(
    await (await import("node:fs/promises")).readFile(
      path.resolve(__dirname, "..", "reference", "content", "speakers-parsed.json"),
      "utf-8"
    )
  );

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const results: Record<string, { name: string; bio: string; followersOnPage: string; imgSrc: string | null }> = {};

  for (const s of speakers) {
    const page = await context.newPage();
    try {
      const url = `https://www.jordancreate.com/highlighted-speakers-blog/${encodeURIComponent(s.slug)}`;
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(400);
      const data = await page.evaluate(`
        (function() {
          var main = document.querySelector('main') || document.body;
          var paras = Array.from(main.querySelectorAll('p')).map(function(p){return p.textContent.trim();}).filter(Boolean);
          var imgs = Array.from(main.querySelectorAll('img'));
          var bgImg = null;
          var all = Array.from(main.querySelectorAll('*'));
          for (var i=0;i<all.length;i++){
            var bg = getComputedStyle(all[i]).backgroundImage;
            if (bg && bg.indexOf('framerusercontent') !== -1) { bgImg = bg; break; }
          }
          return { paras: paras, imgCount: imgs.length, imgSrc: imgs[0] ? imgs[0].getAttribute('src') : null, bgImg: bgImg };
        })()
      `);
      results[s.slug] = {
        name: s.name,
        bio: (data as any).paras.find((p: string) => p.length > 40) || "",
        followersOnPage: (data as any).paras.find((p: string) => /follow|^\d/i.test(p) && p.length < 40) || "",
        imgSrc: (data as any).imgSrc,
      };
      console.log(`OK ${s.slug}: bio ${results[s.slug].bio.length} chars`);
    } catch (e) {
      console.log(`FAIL ${s.slug}: ${(e as Error).message}`);
      results[s.slug] = { name: s.name, bio: "", followersOnPage: "", imgSrc: null };
    }
    await page.close();
  }

  await writeFile(
    path.resolve(__dirname, "..", "reference", "content", "speaker-bios.json"),
    JSON.stringify(results, null, 2)
  );
  await browser.close();
}
main();

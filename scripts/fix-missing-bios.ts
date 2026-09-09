import { chromium } from "playwright";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const missing = ["chef-taimor-mouag", "⁠ammar-najjar", "⁠alia-faris", "awn-nuwwar", "mohammed-almashhadani"];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const fixes: Record<string, string> = {};

  for (const slug of missing) {
    await page.goto(`https://www.jordancreate.com/highlighted-speakers-blog/${encodeURIComponent(slug)}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const text = await page.evaluate(`document.body.innerText`);
    console.log(`=== ${slug} ===`);
    console.log(text);
    fixes[slug] = text as string;
  }

  await writeFile(path.resolve(__dirname, "..", "reference", "content", "missing-bios-raw.json"), JSON.stringify(fixes, null, 2));
  await browser.close();
}
main();

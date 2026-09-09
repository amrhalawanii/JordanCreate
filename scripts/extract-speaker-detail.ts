import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  const slugs = ["rozzah", "sabasham-a", "nasser-laila"];
  for (const slug of slugs) {
    await page.goto(`https://www.jordancreate.com/highlighted-speakers-blog/${slug}`, {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(800);
    const text = await page.evaluate(`document.body.innerText`);
    const imgs = await page.evaluate(`
      Array.from(document.querySelectorAll('main img')).map(function(i){return i.getAttribute('src');})
    `);
    console.log(`=== ${slug} ===`);
    console.log(text);
    console.log("imgs:", JSON.stringify(imgs));
    await writeFile(
      path.resolve(__dirname, "..", "reference", "content", `speaker-detail-${slug}.txt`),
      (text as string) + "\n\nIMAGES:\n" + JSON.stringify(imgs, null, 2)
    );
  }

  await browser.close();
}
main();

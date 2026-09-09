import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  for (const [slug, url] of [
    ["home", "https://www.jordancreate.com/"],
    ["partner-with-us", "https://www.jordancreate.com/partner-with-us"],
    ["speakers", "https://www.jordancreate.com/speakers"],
    ["404", "https://www.jordancreate.com/this-page-does-not-exist-check"],
  ] as const) {
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    const text = await page.evaluate(`document.body.innerText`);
    await writeFile(
      path.resolve(__dirname, "..", "reference", "content", `${slug}-fulltext.txt`),
      text as string
    );
    console.log(`${slug}: ${(text as string).length} chars`);
  }

  await browser.close();
}
main();

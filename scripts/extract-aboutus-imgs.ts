import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("https://www.jordancreate.com/about-us", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const allImgs = await page.evaluate(`
    Array.from(document.querySelectorAll('main img')).map(function(i){return i.getAttribute('src');})
  `);
  console.log(JSON.stringify(allImgs, null, 2));
  await writeFile(path.resolve(__dirname, "..", "reference", "content", "about-us-imgs.json"), JSON.stringify(allImgs, null, 2));

  // Speakers page hero collage (before the grid)
  await page.goto("https://www.jordancreate.com/speakers", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const speakerHeroImgs = await page.evaluate(`
    (function(){
      var header = document.querySelector('header');
      return header ? Array.from(header.querySelectorAll('img')).map(function(i){return i.getAttribute('src');}) : [];
    })()
  `);
  console.log("speaker hero imgs:", JSON.stringify(speakerHeroImgs));
  await writeFile(path.resolve(__dirname, "..", "reference", "content", "speakers-hero-imgs.json"), JSON.stringify(speakerHeroImgs, null, 2));

  await browser.close();
}
main();

import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("https://www.jordancreate.com/partner-with-us", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const result = await page.evaluate(`
    (function () {
      var all = Array.from(document.querySelectorAll('*'));
      var matches = all.filter(function(e){ return e.textContent.indexOf('NOT A PACKAGE') !== -1; });
      matches.sort(function(a,b){ return a.textContent.length - b.textContent.length; });
      var heading = matches[matches.length-1]; // largest match = the whole section container likely last after sort ascending... use largest
      // find ancestor with many images (>=6)
      var node = heading;
      var best = null;
      for (var i=0;i<12 && node;i++){
        var imgs = node.querySelectorAll('img');
        if (imgs.length >= 6) { best = node; break; }
        node = node.parentElement;
      }
      if (!best) return { found: false };
      var imgs = Array.from(best.querySelectorAll('img'));
      return { found: true, count: imgs.length, srcs: imgs.map(function(i){return i.getAttribute('src');}) };
    })()
  `);
  console.log(JSON.stringify(result, null, 2));

  // also who-you're-reaching hero collage images + partner hero image
  const heroImgs = await page.evaluate(`
    (function(){
      var header = document.querySelector('header');
      if (!header) return [];
      return Array.from(header.querySelectorAll('img')).map(function(i){return i.getAttribute('src');});
    })()
  `);
  console.log("hero imgs:", JSON.stringify(heroImgs));

  await writeFile(path.resolve(__dirname, "..", "reference", "content", "partner-card-imgs.json"), JSON.stringify({ cards: result, hero: heroImgs }, null, 2));
  await browser.close();
}
main();

import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("https://www.jordancreate.com/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const result = await page.evaluate(`
    (function () {
      var all = Array.from(document.querySelectorAll('*'));
      var matches = all.filter(function(e){ return e.textContent.indexOf("VOICES SHAPING WHAT") !== -1; });
      matches.sort(function(a,b){ return a.textContent.length - b.textContent.length; });
      var heading = matches[0];
      var node = heading;
      var best = null;
      for (var i=0;i<12 && node;i++){
        var links = node.querySelectorAll('a');
        if (links.length >= 8) { best = node; break; }
        node = node.parentElement;
      }
      if (!best) return { found: false };
      var links = Array.from(best.querySelectorAll('a'));
      return links.map(function(a){
        return { href: a.getAttribute('href'), text: a.textContent.trim().slice(0,80) };
      });
    })()
  `);
  console.log(JSON.stringify(result, null, 2));
  await writeFile(path.resolve(__dirname, "..", "reference", "content", "home-speaker-links.json"), JSON.stringify(result, null, 2));
  await browser.close();
}
main();

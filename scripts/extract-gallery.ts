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
      var matches = all.filter(function(e){ return e.textContent.indexOf('ROOM WHERE IT ALL HAPPENED') !== -1; });
      matches.sort(function(a,b){ return a.textContent.length - b.textContent.length; });
      var heading = matches[0];
      // climb until we find an ancestor containing at least 5 images
      var node = heading;
      var best = null;
      for (var i=0;i<15 && node;i++){
        var imgs = node.querySelectorAll('img');
        if (imgs.length >= 5) { best = node; break; }
        node = node.parentElement;
      }
      if (!best) return { found: false, headingTag: heading ? heading.tagName : null };
      var imgs = Array.from(best.querySelectorAll('img'));
      return {
        found: true,
        ancestorTag: best.tagName,
        ancestorClass: (best.className||'').toString().slice(0,60),
        count: imgs.length,
        srcs: imgs.map(function(i){ return i.getAttribute('src'); })
      };
    })()
  `);
  console.log(JSON.stringify(result, null, 2).slice(0, 3000));
  await writeFile(path.resolve(__dirname, "..", "reference", "content", "gallery.json"), JSON.stringify(result, null, 2));
  await browser.close();
}
main();

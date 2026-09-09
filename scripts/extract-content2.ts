import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(__dirname, "..", "reference", "content");

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  // ---------- HOME: gallery ----------
  await page.goto("https://www.jordancreate.com/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const gallery = await page.evaluate(`
    (function () {
      var all = Array.from(document.querySelectorAll('*'));
      var matches = all.filter(function(e){ return e.textContent.indexOf('ROOM WHERE IT ALL HAPPENED') !== -1; });
      matches.sort(function(a,b){ return a.textContent.length - b.textContent.length; });
      var heading = matches[0];
      if (!heading) return { found: false };
      var node = heading;
      var sec = null;
      for (var i=0;i<8 && node;i++){ if (node.tagName === 'SECTION') { sec = node; break; } node = node.parentElement; }
      if (!sec) return { found: false, reason: 'no section ancestor' };
      var imgs = Array.from(sec.querySelectorAll('img'));
      return { found: true, count: imgs.length, srcs: imgs.map(function(i){return i.getAttribute('src');}) };
    })()
  `);
  console.log("gallery:", JSON.stringify(gallery).slice(0, 300));

  // ---------- ABOUT US: team ----------
  await page.goto("https://www.jordancreate.com/about-us", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const team = await page.evaluate(`
    (function () {
      var all = Array.from(document.querySelectorAll('*'));
      var matches = all.filter(function(e){ return e.textContent.indexOf('MEET THE CREW') !== -1; });
      matches.sort(function(a,b){ return a.textContent.length - b.textContent.length; });
      var heading = matches[0];
      if (!heading) return { found: false };
      var node = heading;
      var sec = null;
      for (var i=0;i<8 && node;i++){ if (node.tagName === 'SECTION') { sec = node; break; } node = node.parentElement; }
      if (!sec) return { found: false, reason: 'no section ancestor' };
      var imgs = Array.from(sec.querySelectorAll('img'));
      return {
        found: true,
        count: imgs.length,
        items: imgs.map(function(img){
          var card = img;
          for (var j=0;j<5 && card;j++){ card = card.parentElement; if (card && card.textContent.trim().length > 3 && card.textContent.trim().length < 100) break; }
          return { imgSrc: img.getAttribute('src'), nearText: card ? card.textContent.trim().slice(0,100) : null };
        })
      };
    })()
  `);
  console.log("team:", JSON.stringify(team).slice(0, 800));

  // full about-us text for manual mission/vision/value + story extraction
  const fullText = await page.evaluate(`document.body.innerText`);

  await writeFile(path.join(OUT, "gallery.json"), JSON.stringify(gallery, null, 2));
  await writeFile(path.join(OUT, "team.json"), JSON.stringify(team, null, 2));
  await writeFile(path.join(OUT, "about-us-fulltext.txt"), fullText as string);

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

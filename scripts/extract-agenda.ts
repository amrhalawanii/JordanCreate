import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import path from "node:path";

// Bulk-extracts every /agenda schedule row (the live site added this page
// after Phase 0 extraction). Two fixes over the first attempt at this
// script, both left in place since they matter for any future re-run:
// - `waitUntil: "networkidle"` timed out (the page never truly idles,
//   likely background video/analytics) -- switched to "load".
// - The original row/h3 sniffing only caught the one gradient row. The
//   live DOM actually names its parts (`data-framer-name="Time"` /
//   "Content" / "Speaker"` on stable wrapper divs), which is a far more
//   reliable selector than counting `h3` tags -- see the dumped structure
//   in FIDELITY-NOTES.md's Agenda page section.
async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("https://www.jordancreate.com/agenda", { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(3000);

  const hero = await page.evaluate(`
    (function () {
      var h1 = document.querySelector('h1');
      var section = document.querySelector('section[data-framer-name="Schedule Section"]');
      var eyebrowP = section ? section.querySelector('p') : null;
      var h2 = section ? section.querySelector('h2') : null;
      var subP = section
        ? Array.from(section.querySelectorAll('p')).find(function (p) { return p.textContent.length > 40; })
        : null;
      var heroImg = document.querySelector('section[data-framer-name*="Hero"] img, header img');
      return {
        h1: h1 ? h1.textContent.trim() : null,
        eyebrow: eyebrowP ? eyebrowP.textContent.trim() : null,
        heading: h2 ? h2.textContent.trim() : null,
        sub: subP ? subP.textContent.trim() : null,
        heroImgSrc: heroImg ? (heroImg.currentSrc || heroImg.src).split("?")[0] : null,
      };
    })()
  `);

  const gradient = await page.evaluate(`
    (function () {
      var section = document.querySelector('section[data-framer-name="Schedule Section"]');
      var all = Array.from(section.querySelectorAll("*"));
      var titleEl = all.find(function (el) {
        return el.children.length === 0 && el.textContent.indexOf("Registration and Check-In") !== -1;
      });
      var timeEl = all.find(function (el) {
        return el.children.length === 0 && /^\\d{1,2}:\\d{2}\\s*[AP]M/.test(el.textContent.trim());
      });
      return {
        time: timeEl ? timeEl.textContent.trim() : null,
        title: titleEl ? titleEl.textContent.trim() : null,
      };
    })()
  `);

  const rows = await page.evaluate(`
    (function () {
      var section = document.querySelector('section[data-framer-name="Schedule Section"]');
      var rows = Array.from(section.querySelectorAll('div[data-framer-name="Desktop"][data-border]'));
      return rows.map(function (row) {
        var timeP = row.querySelector('[data-framer-name="Time"] p');
        var contentDiv = row.querySelector('[data-framer-name="Content"]');
        var titleH3 = contentDiv ? contentDiv.querySelector("h3") : null;
        var bodyP = contentDiv ? contentDiv.querySelector("p") : null;
        var speakerWrap = row.querySelector('[data-framer-name="Speaker"]');
        var imgs = speakerWrap
          ? Array.from(speakerWrap.querySelectorAll("img")).map(function (im) {
              return (im.src || "").split("?")[0];
            })
          : [];
        return {
          time: timeP ? timeP.textContent.trim() : null,
          title: titleH3 ? titleH3.textContent.trim() : null,
          body: bodyP ? bodyP.textContent.trim() : "",
          images: imgs,
        };
      });
    })()
  `);

  const output = {
    hero,
    gradientRow: gradient,
    sessionCount: 1 + (rows as unknown[]).length,
    rows,
  };

  console.log(JSON.stringify(output, null, 2).slice(0, 1500));
  console.log("...total sessions (incl. gradient row):", output.sessionCount);

  await writeFile(
    path.resolve(__dirname, "..", "reference", "content", "agenda.json"),
    JSON.stringify(output, null, 2)
  );

  await browser.close();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

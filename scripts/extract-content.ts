/**
 * Structured content extraction pass — pulls the actual data (speaker list,
 * partner cards, team, gallery order, etc.) needed to build real components,
 * beyond what the Phase 0 forensic dump captured as raw HTML/CSS.
 */
import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(__dirname, "..", "reference", "content");

async function evalPage(page: any, script: string) {
  return page.evaluate(script);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  // ---------- SPEAKERS PAGE: full grid ----------
  await page.goto("https://www.jordancreate.com/speakers", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const speakers = await evalPage(
    page,
    `
    (function () {
      // Each speaker card is a link to /highlighted-speakers-blog/{slug}
      var links = Array.from(document.querySelectorAll('a[href*="highlighted-speakers-blog"]'));
      var seen = {};
      var out = [];
      links.forEach(function (a) {
        var href = a.getAttribute('href');
        if (seen[href]) return;
        seen[href] = true;
        var img = a.querySelector('img');
        var text = a.textContent.trim();
        out.push({
          href: href,
          text: text,
          imgSrc: img ? img.getAttribute('src') : null,
          imgSrcset: img ? img.getAttribute('srcset') : null
        });
      });
      return out;
    })()
    `
  );
  console.log(`Speakers: found ${speakers.length} unique speaker links`);

  // ---------- HOME PAGE: gallery images + intro block + get-to-know-us ----------
  await page.goto("https://www.jordancreate.com/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const homeExtra = await evalPage(
    page,
    `
    (function () {
      // Intro block ("One of the largest Creator Economy events")
      var all = Array.from(document.querySelectorAll('*'));
      var introHeading = all.find(function(e){ return e.children.length===0 && e.textContent.trim()==='One of the largest Creator Economy events'; });
      var introPara = null;
      if (introHeading) {
        var container = introHeading.parentElement.parentElement.parentElement;
        var paras = container ? Array.from(container.querySelectorAll('p')) : [];
        introPara = paras.map(function(p){return p.textContent.trim();}).filter(Boolean);
      }

      // Gallery: find the "THE ROOM WHERE IT ALL HAPPENED" section and grab all img srcs within, in order
      var galleryHeading = all.find(function(e){ return e.children.length===0 && e.textContent.trim()==='THE ROOM WHERE IT ALL HAPPENED'; });
      var galleryImgs = [];
      if (galleryHeading) {
        var sec = galleryHeading.closest('section') || galleryHeading.parentElement.parentElement.parentElement.parentElement;
        var imgs = sec ? Array.from(sec.querySelectorAll('img')) : [];
        galleryImgs = imgs.map(function(img){ return img.getAttribute('src'); });
      }

      return { introPara: introPara, galleryImgCount: galleryImgs.length, galleryImgs: galleryImgs };
    })()
    `
  );
  console.log(`Home extra: intro paras=${homeExtra.introPara ? homeExtra.introPara.length : 0}, gallery imgs=${homeExtra.galleryImgCount}`);

  // ---------- ABOUT US PAGE: story, mission/vision/value, team ----------
  await page.goto("https://www.jordancreate.com/about-us", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const aboutUs = await evalPage(
    page,
    `
    (function () {
      var all = Array.from(document.querySelectorAll('*'));
      function textOf(matchText) {
        var el = all.find(function(e){ return e.children.length===0 && e.textContent.trim()===matchText; });
        return el;
      }
      // Our story
      var storyHeading = textOf('OUR STORY');
      var storyParas = [];
      if (storyHeading) {
        var sec = storyHeading.closest('section');
        if (sec) storyParas = Array.from(sec.querySelectorAll('p')).map(function(p){return p.textContent.trim();}).filter(Boolean);
      }

      // Mission / Vision / Value blocks — find headings
      function blockFor(label) {
        var h = textOf(label);
        if (!h) return null;
        var sec = h.closest('section') || h.parentElement.parentElement.parentElement;
        var paras = sec ? Array.from(sec.querySelectorAll('p')).map(function(p){return p.textContent.trim();}).filter(Boolean) : [];
        return { heading: label, paras: paras };
      }
      var mission = blockFor('MISSION') || blockFor('Mission');
      var vision = blockFor('VISION') || blockFor('Vision');
      var value = blockFor('VALUE') || blockFor('Value');

      // Team: "MEET THE CREW" section — find each member card (name + role likely siblings)
      var crewHeading = textOf('MEET THE CREW');
      var team = [];
      if (crewHeading) {
        var sec = crewHeading.closest('section');
        if (sec) {
          var imgs = Array.from(sec.querySelectorAll('img'));
          team = imgs.map(function(img){
            var card = img.closest('a') || img.parentElement.parentElement.parentElement;
            return { imgSrc: img.getAttribute('src'), cardText: card ? card.textContent.trim().slice(0,150) : null, href: card && card.tagName === 'A' ? card.getAttribute('href') : null };
          });
        }
      }

      return { storyParas: storyParas, mission: mission, vision: vision, value: value, team: team };
    })()
    `
  );
  console.log(`About us: story paras=${aboutUs.storyParas.length}, team cards=${aboutUs.team.length}`);

  // ---------- PARTNER WITH US: cards + impact items ----------
  await page.goto("https://www.jordancreate.com/partner-with-us", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const partner = await evalPage(
    page,
    `
    (function () {
      var all = Array.from(document.querySelectorAll('*'));
      function textOf(matchText) {
        return all.find(function(e){ return e.children.length===0 && e.textContent.trim()===matchText; });
      }
      var cardTitles = ['Strong Presence','Creator Content','Brand Activiations','Digital Visibility','Digital Access','Exclusive Community'];
      var cards = cardTitles.map(function(title){
        var h = textOf(title);
        if (!h) return { title: title, found: false };
        var card = h.closest('div[data-framer-name]') || h.parentElement.parentElement;
        var paras = card ? Array.from(card.querySelectorAll('p')).map(function(p){return p.textContent.trim();}).filter(function(t){return t && t!==title;}) : [];
        var img = card ? card.querySelector('img') : null;
        return { title: title, found: true, body: paras.join(' '), imgSrc: img ? img.getAttribute('src') : null };
      });

      var impactTitles = ['First of Its Kind','1,000+ From the Creative Ecosystem','A Movement, Not a Moment','Activations, Not Just Panels'];
      var impact = impactTitles.map(function(title){
        var h = textOf(title);
        if (!h) return { title: title, found: false };
        var block = h.closest('div[data-framer-name]') || h.parentElement.parentElement;
        var paras = block ? Array.from(block.querySelectorAll('p')).map(function(p){return p.textContent.trim();}).filter(function(t){return t && t!==title;}) : [];
        return { title: title, found: true, body: paras.join(' ') };
      });

      var videos = Array.from(document.querySelectorAll('video')).map(function(v){
        var src = v.querySelector('source');
        return src ? src.getAttribute('src') : v.getAttribute('src');
      });

      return { cards: cards, impact: impact, videos: videos };
    })()
    `
  );
  console.log(`Partner: cards found=${partner.cards.filter((c:any)=>c.found).length}/6, impact found=${partner.impact.filter((c:any)=>c.found).length}/4`);

  await writeFile(path.join(OUT, "speakers.json"), JSON.stringify(speakers, null, 2));
  await writeFile(path.join(OUT, "home-extra.json"), JSON.stringify(homeExtra, null, 2));
  await writeFile(path.join(OUT, "about-us.json"), JSON.stringify(aboutUs, null, 2));
  await writeFile(path.join(OUT, "partner-with-us.json"), JSON.stringify(partner, null, 2));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

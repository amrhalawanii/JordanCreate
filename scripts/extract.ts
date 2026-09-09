/**
 * Phase 0 forensic extraction script for jordancreate.com.
 *
 * For every page x breakpoint combination this captures:
 *  - a full-page screenshot
 *  - a rendered DOM snapshot
 *  - computed styles for every visible element (a bounded property set)
 *  - raw stylesheets served by the page
 *  - @font-face declarations + the woff2 files they point to
 *  - scroll-position screenshots at 10% increments
 *  - a network request log (for lazy-load / srcset / video behaviour notes)
 *
 * Output layout:
 *   reference/screenshots/{page}-{width}.png
 *   reference/screenshots/scroll/{page}-{width}-{pct}.png
 *   reference/dom/{page}-{width}.html
 *   reference/computed/{page}-{width}.json
 *   reference/css/{page}-{width}/*.css
 *   reference/css/{page}-{width}/fontfaces.json
 *   reference/network/{page}-{width}.json
 *   reference/assets-original/fonts/*.woff2
 */
import { chromium, type Page } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = "https://www.jordancreate.com";

const PAGES: { slug: string; path: string }[] = [
  { slug: "home", path: "/" },
  { slug: "speakers", path: "/speakers" },
  { slug: "partner-with-us", path: "/partner-with-us" },
  { slug: "about-us", path: "/about-us" },
  { slug: "speaker-rozzah", path: "/highlighted-speakers-blog/rozzah" },
  { slug: "speaker-sabasham-a", path: "/highlighted-speakers-blog/sabasham-a" },
  { slug: "speaker-nasser-laila", path: "/highlighted-speakers-blog/nasser-laila" },
  { slug: "404", path: "/this-page-does-not-exist-jc-404-check" },
];

const BREAKPOINTS = [320, 390, 768, 1024, 1280, 1440, 1920];

const COMPUTED_PROPS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "textTransform",
  "color",
  "backgroundColor",
  "backgroundImage",
  "borderRadius",
  "boxShadow",
  "padding",
  "margin",
  "gap",
  "display",
  "gridTemplateColumns",
  "gridTemplateRows",
  "flexDirection",
  "flexWrap",
  "justifyContent",
  "alignItems",
  "maxWidth",
  "transform",
  "opacity",
  "mixBlendMode",
  "backdropFilter",
];

const ROOT = path.resolve(__dirname, "..", "reference");

async function ensureDir(p: string) {
  await mkdir(p, { recursive: true });
}

// NOTE: these three functions pass a *string* of plain JS to page.evaluate rather
// than a real TS function reference. tsx/esbuild instruments closures passed as
// function values with a `__name(...)` helper call for debugging support, but that
// helper doesn't exist in the browser's evaluate sandbox, causing a ReferenceError.
// A string is evaluated by the browser directly and is untouched by esbuild.

async function captureComputedStyles(page: Page) {
  const propsJson = JSON.stringify(COMPUTED_PROPS);
  const script = `
    (function (props) {
      function cssPath(el) {
        if (el.id) return "#" + el.id;
        var parts = [];
        var node = el;
        var depth = 0;
        while (node && node.nodeType === 1 && depth < 6) {
          var selector = node.tagName.toLowerCase();
          if (node.className && typeof node.className === "string") {
            var cls = node.className.trim().split(/\\s+/).slice(0, 2).join(".");
            if (cls) selector += "." + cls;
          }
          var parent = node.parentElement;
          if (parent) {
            var currentNode = node;
            var siblings = Array.from(parent.children).filter(function (c) {
              return c.tagName === currentNode.tagName;
            });
            if (siblings.length > 1) {
              selector += ":nth-of-type(" + (siblings.indexOf(currentNode) + 1) + ")";
            }
          }
          parts.unshift(selector);
          node = parent;
          depth++;
        }
        return parts.join(" > ");
      }
      var out = [];
      var all = Array.from(document.querySelectorAll("body *"));
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) continue;
        var cs = window.getComputedStyle(el);
        var styles = {};
        for (var j = 0; j < props.length; j++) {
          styles[props[j]] = cs[props[j]];
        }
        out.push({
          selector: cssPath(el),
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || "").trim().slice(0, 80),
          rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
          styles: styles
        });
      }
      return out;
    })(${propsJson})
  `;
  return page.evaluate(script);
}

async function captureFontFaces(page: Page) {
  const script = `
    (function () {
      var results = [];
      var sheets = Array.from(document.styleSheets);
      for (var i = 0; i < sheets.length; i++) {
        var rules;
        try {
          rules = sheets[i].cssRules;
        } catch (e) {
          continue;
        }
        var ruleList = Array.from(rules);
        for (var j = 0; j < ruleList.length; j++) {
          var rule = ruleList[j];
          if (rule instanceof CSSFontFaceRule) {
            var style = rule.style;
            results.push({
              family: style.getPropertyValue("font-family").trim(),
              source: style.getPropertyValue("src").trim(),
              style: style.getPropertyValue("font-style").trim(),
              weight: style.getPropertyValue("font-weight").trim()
            });
          }
        }
      }
      return results;
    })()
  `;
  return page.evaluate(script) as Promise<
    { family: string; source: string; style: string; weight: string }[]
  >;
}

async function captureStylesheets(page: Page) {
  const script = `
    (function () {
      var out = [];
      var sheets = Array.from(document.styleSheets);
      for (var i = 0; i < sheets.length; i++) {
        var sheet = sheets[i];
        var href = sheet.href || "inline";
        try {
          var cssText = Array.from(sheet.cssRules)
            .map(function (r) { return r.cssText; })
            .join("\\n");
          out.push({ href: href, cssText: cssText });
        } catch (e) {
          out.push({ href: href, cssText: "/* cross-origin, could not read */" });
        }
      }
      return out;
    })()
  `;
  return page.evaluate(script) as Promise<{ href: string; cssText: string }[]>;
}

async function run() {
  const browser = await chromium.launch();
  const networkLog: Record<string, any[]> = {};
  const fontsSeen = new Set<string>();

  for (const pg of PAGES) {
    for (const width of BREAKPOINTS) {
      const label = `${pg.slug}-${width}`;
      console.log(`Capturing ${label} ...`);
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();

      const requests: any[] = [];
      page.on("requestfinished", async (req) => {
        try {
          const res = await req.response();
          requests.push({
            url: req.url(),
            resourceType: req.resourceType(),
            status: res?.status(),
            headers: res ? await res.allHeaders() : {},
          });
        } catch {
          /* ignore */
        }
      });

      try {
        await page.goto(BASE + pg.path, { waitUntil: "networkidle", timeout: 45000 });
      } catch (e) {
        console.warn(`  navigation issue for ${label}: ${(e as Error).message}`);
      }
      await page.waitForTimeout(1500);

      // full page screenshot
      await ensureDir(path.join(ROOT, "screenshots"));
      await page.screenshot({
        path: path.join(ROOT, "screenshots", `${label}.png`),
        fullPage: true,
      });

      // DOM snapshot
      await ensureDir(path.join(ROOT, "dom"));
      const html = await page.content();
      await writeFile(path.join(ROOT, "dom", `${label}.html`), html, "utf-8");

      // computed styles
      await ensureDir(path.join(ROOT, "computed"));
      const computed = await captureComputedStyles(page);
      await writeFile(
        path.join(ROOT, "computed", `${label}.json`),
        JSON.stringify(computed, null, 2),
        "utf-8"
      );

      // stylesheets + font-faces
      await ensureDir(path.join(ROOT, "css", label));
      const sheets = await captureStylesheets(page);
      await writeFile(
        path.join(ROOT, "css", label, "stylesheets.json"),
        JSON.stringify(sheets, null, 2),
        "utf-8"
      );
      const fontFaces = await captureFontFaces(page);
      await writeFile(
        path.join(ROOT, "css", label, "fontfaces.json"),
        JSON.stringify(fontFaces, null, 2),
        "utf-8"
      );
      for (const ff of fontFaces) {
        const match = ff.source.match(/url\(["']?(https:\/\/[^"')]+\.woff2?)["']?\)/);
        if (match) fontsSeen.add(match[1]);
      }

      // scroll-position screenshots at 10% increments (desktop-representative widths only,
      // to keep volume sane — 1440 and 390)
      if (width === 1440 || width === 390) {
        await ensureDir(path.join(ROOT, "screenshots", "scroll"));
        const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
        for (let pct = 0; pct <= 100; pct += 10) {
          const y = Math.round((scrollHeight * pct) / 100);
          await page.evaluate((yy) => window.scrollTo(0, yy), y);
          await page.waitForTimeout(400);
          await page.screenshot({
            path: path.join(ROOT, "screenshots", "scroll", `${label}-${pct}.png`),
          });
        }
      }

      networkLog[label] = requests;
      await context.close();
    }
  }

  await ensureDir(path.join(ROOT, "network"));
  await writeFile(
    path.join(ROOT, "network", "all-requests.json"),
    JSON.stringify(networkLog, null, 2),
    "utf-8"
  );

  await ensureDir(path.join(ROOT, "assets-original", "fonts"));
  await writeFile(
    path.join(ROOT, "assets-original", "fonts-manifest.json"),
    JSON.stringify(Array.from(fontsSeen), null, 2),
    "utf-8"
  );

  await browser.close();
  console.log(`\nDone. ${fontsSeen.size} unique font files discovered.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

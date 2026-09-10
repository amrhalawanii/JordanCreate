# Progress

## Phase 0 — Forensic extraction: ✅ done

Screenshots, DOM snapshots, computed-style JSON, raw stylesheets, scroll
sequences, network logs across 8 routes × 7 breakpoints. FAQ answers
captured verbatim. 93/93 assets + 55 fonts harvested. See `EXTRACTION.md`,
`design-tokens.json`, `MOTION-SPEC.md`, `ASSET-MANIFEST.json`.

## Phase 2 — Scaffold: ✅ done

Next.js 15 App Router + TypeScript strict + Tailwind v4 (tokens from
`design-tokens.json`) + content-layer skeleton (`src/content/`) + Header/
Footer.

## Phase 3 — All four pages + speaker detail + 404: ✅ done

- **Home** (`/`): Hero, Get to know us (tabs), Intro block, Numbers,
  Speakers strip, Pillars, Gallery (marquee), shared FinalCTA, shared FAQ.
- **Speakers** (`/speakers`): hero, full 37-speaker grid, CTA/FAQ.
- **Partner with Us** (`/partner-with-us`): Who you're reaching, What
  partners get (6 cards, typos preserved), Impact (4 items + video),
  CTA/FAQ.
- **About Us** (`/about-us`): Our story, Mission/Vision/Value, Meet the
  Crew (8 members), CTA/FAQ.
- **Speaker detail** (`/highlighted-speakers-blog/[slug]`): dynamic route,
  `generateStaticParams` for all 37, real per-speaker bios scraped live,
  U+2060 invisible-char slugs verified working.
- **404**: "PAGE IS LOCKED / SEE YOU IN NOVEMBER!" matching live site.

All content flows through `src/content/repository.ts` — 37 real speakers,
8 team members, 8 FAQ answers (verbatim), 3 pillars, 4+3 stats, 14 gallery
images, 6 partner benefit cards, 4 impact items — no hardcoded copy in JSX.
Known live-site defects replicated deliberately (see `FIDELITY-NOTES.md`):
broken Instagram hrefs on 2 home speaker cards, `/404` links, dual-purpose
nav labels, inconsistent numbers/follower formatting, partner-page typos.

## Phase 5 — Motion pass: ✅ done (first pass)

Lenis smooth scroll, `Reveal` scroll-triggered fade+rise on every major
section, `CountUpStat` number count-up (Numbers + partner reach stats),
Hero/PageHero entrance animations, gallery marquee (CSS, pause-on-hover,
`prefers-reduced-motion` respected throughout).

## Typography precision pass: ✅ done

Cross-referenced every visible text style against the Phase 0 computed-
style JSON (real `getComputedStyle()` output) and corrected every
mismatch — font-family/size/color/weight, the orange-highlight vs.
50%-opacity split-color headings, per-page hero sizes (166px vs 100px),
and a missing section on `/speakers`. See `FIDELITY-NOTES.md`.

## Archive cross-reference: ✅ done

Diffed a user-supplied saveweb2zip.com full-site archive against our own
`ASSET-MANIFEST.json` — only 3 genuinely new assets, all real gaps: the
correct favicon, a grain-texture overlay on speaker portraits, and the 3
distinct "Get to know us" tab images (was reusing 1). Also added the
prev/next arrow controls on that panel (master-prompt spec, not yet built
until now). See `FIDELITY-NOTES.md`.

## Verified

- `npm run build` succeeds cleanly — 47 static routes generated (including
  all 37 speaker pages, `sitemap.xml`, `robots.txt`).
- `npx tsc --noEmit` clean.
- No horizontal overflow at 375px on any of the 4 pages (checked via
  `document.documentElement.scrollWidth`).
- Reveal animations confirmed firing on real scroll (not just present in
  DOM) via live opacity checks.
- Count-up confirmed animating 0 → real value on scroll-into-view.
- Favicon, grain overlay, and tab-image arrow-cycling all confirmed live
  in the DOM.

## Not yet built / known gaps

- **TT Ramillas font licensing** — still unresolved, using Cormorant
  Garamond stand-in. Needs a decision before public deploy (see
  `EXTRACTION.md` §1).
- **Speakers page hero collage** — using a single background image instead
  of the live site's 8-image asymmetric floating collage. (Get to know us
  tab imagery, previously listed here too, is now fixed — see below.)
- **Gallery second-row ordering** — reversed, not independently re-derived
  from the live site's actual algorithm.
- **Dedicated per-breakpoint visual QA** — built responsive throughout with
  Tailwind utilities and spot-checked for overflow, but not individually
  diffed against the Phase 0 reference screenshots at each of the 7
  breakpoints.
- **`npm run verify`** (pixelmatch diffing against `reference/screenshots/`)
  and **`PARITY-CHECKLIST.md`** — the master prompt's final verification
  infrastructure, not yet built.
- **Lighthouse targets** (≥95 perf/SEO, LCP <2s, CLS <0.02) — not yet
  measured.

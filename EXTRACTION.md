# EXTRACTION.md — Phase 0 Forensic Extraction

Source: `https://www.jordancreate.com` (live Framer site), captured 2026-09-09 via a
Playwright crawl of 8 routes × 7 breakpoints (320/390/768/1024/1280/1440/1920px),
plus a manual pass to expand and capture the 8 FAQ accordion answers (not present
in the DOM until clicked).

Raw captures live under `/reference/` (screenshots, DOM snapshots, computed-style
JSON, raw stylesheets, network logs, original assets) and are the source of truth
behind every value below. A prior design-token audit of the same site exists in
the sibling project `Jordan-Create-App-V1/design-analysis.md` (2026-08-31, done
for an unrelated mobile app) — its findings are used here only as cross-reference;
every value below was independently re-measured from this pass's own computed-style
dumps and matches that prior audit closely, which gives good confidence in both.

## 1. Typography

### Loaded families (confirmed via computed `font-family` + raw `@font-face` dumps)

| Family | Hosting | Role |
|---|---|---|
| **TT Ramillas Trl Variable Roman** | `framerusercontent.com` (`TfckqeVfnt9K0avlqRorypHOtA.woff2`) | Hero display (upright) |
| **TT Ramillas Trl Variable Italic** | `framerusercontent.com` (`qQBbZq6PzUAO7vsMDmfeo3ZQiU.woff2`) | Dominant italic display — section titles, stat numbers, FAQ title |
| **TT Ramillas Trl Regular** | `framerusercontent.com` (`r2nr0kD1Lrmw35XpFMiBBmrTw5I.woff2`) | Secondary serif |
| **DM Sans** | Google Fonts (`fonts.gstatic.com`) | Nav, labels, FAQ question rows, compact metadata |
| **Host Grotesk** | Google Fonts | Large body copy |
| **Geist** | Google Fonts | Loaded utility sans, limited use |
| **Inter** | `framerusercontent.com` | Framer rich-text fallback / some paragraph text |
| **Switzer** | `framerusercontent.com` | Loaded secondary sans, no confirmed dominant role |

**⚠️ Open decision needed before this ships (flagging per the master prompt's own
rule — not resolving this myself):** TT Ramillas is a commercial typeface. Framer
hosts and serves the webfont files on the live site, but that does not by itself
establish a license to self-host those same files outside Framer. No locally
licensed copy of TT Ramillas exists anywhere in this project tree (checked). A
prior related project (`Jordan-Create-App-V1`) hit the same issue and used
**Cormorant Garamond** as a temporary open-font stand-in pending a real license.
Options for this build: (a) obtain/confirm a TT Ramillas web/app license before
Phase 2, (b) use an open stand-in provisionally and swap later, (c) proceed with
the Framer-hosted files for internal development only, not public deploy. I've
downloaded the files for *measurement* purposes only (`reference/assets-original/`)
— none are copied into `/public` pending this decision.

### Type roles (measured via `getComputedStyle`, desktop 1440px unless noted)

| Role | Family | Size | Line height | Tracking | Weight | Case |
|---|---|---:|---:|---:|---:|---|
| Hero display (`h1`, home) | TT Ramillas Roman | 66px | 66px (1em) | -1.98px (-0.03em) | 400 | uppercase |
| Page display (speakers hero) | TT Ramillas Italic | ~124px | ~168px | ~-8px | 400 | uppercase |
| Section display | TT Ramillas Italic | 56px | ~1.1em | -0.03em | 400 | usually uppercase |
| Compact display | TT Ramillas Italic | 36px | 100% | -0.06em | 400 | uppercase |
| FAQ title | TT Ramillas Italic | 32px | 1.1em | -0.03em | 400 | sentence case |
| Stat number | TT Ramillas Italic | 46px | normal | 0 | 400 | numeric |
| Body / hero supporting copy | Host Grotesk / Inter | 16–17px | 1.2–1.3em | 0 | 400 | sentence case |
| Label / eyebrow | DM Sans | 14px | 1.3em | 0 | 500 | uppercase |
| Utility small | DM Sans | 12px | 1.2em | 0 | 400 | context dependent |

Measured breakpoints Framer actually ships (from raw CSS `@media` queries):
- **Desktop**: `min-width: 1200px`
- **Tablet**: `810px – 1199.98px`
- **Mobile**: `max-width: 809.98px`

The display scale contracts non-linearly below desktop — preserve each role's
relative hierarchy from the per-breakpoint `reference/computed/*.json` dumps
rather than mechanically scaling by one ratio.

Uppercase is used intentionally for nav labels, CTAs, and high-impact display
statements (`JOIN US`, `GET TO KNOW US`, `NUMBERS`, `MEET THE CREW`). Longer
explanatory copy stays sentence case — never uppercase body paragraphs.

## 2. Color

Confirmed by cross-referencing computed `color`/`background-color` frequency
across home/speakers/partner-with-us/about-us against the prior design audit —
values match closely.

| Semantic use | Hex | rgb() as measured |
|---|---|---|
| Canvas / dominant background | `#0f0f0f` | rgb(15,15,15) |
| Deep background | `#0a0a0a` | rgb(10,10,10) |
| Raised dark surface | `#171717` | rgb(23,23,23) — most frequent surface bg |
| Card border | `#303030` | rgb(48,48,48) |
| Primary text | `#ffffff` | rgb(255,255,255) |
| Off-white | `#fafafa` | rgb(250,250,250) |
| Light gray | `#a3a3a3` | rgb(163,163,163) |
| Muted gray | `#858585` | rgb(133,133,133) |
| Mid gray | `#666666` | rgb(102,102,102) |
| **Brand orange (primary accent)** | `#ea8f2d` | rgb(234,143,45) — confirmed exact |
| Hot orange variant | `#eeba2b`-ish / `#ff6b00` | seen on hover/alt states |
| 80%/60% white text | `rgba(255,255,255,0.8)` / `rgba(255,255,255,0.6)` | metadata, muted supporting text |

White and near-black dominate; orange is used sparingly (CTAs, stat numbers,
scroll cue) and never as a large surface fill.

## 3. Layout & spacing

- **Primary desktop container: 1128px** (confirmed — 8 occurrences of `max-width: 1128px` in the home computed dump, the single most common non-trivial max-width).
- Secondary shell widths: 1184px, 1200px. Full-bleed media: 1920px. Narrow reading widths: 640/675/540px.
- Spacing scale (repeated values across padding/margin/gap): `4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 30, 32, 40, 48, 50, 56, 60, 64, 80, 120, 160px`. Most frequent: 8, 10, 12, 16, 20, 24, 40, 48px.
- Grids: desktop commonly `repeat(3, minmax(50px, 1fr))` or 2 equal columns; tablet reduces 3→2; mobile is single column.
- Radius language: **4px is dominant** (429 occurrences — cards, fields, media). 20px/40px pills for buttons only. 100%/100px for circular avatars/marks. Do not apply pill radii to generic cards.

## 4. Section inventory (from `data-framer-name` markers + master-prompt spec, cross-checked)

- **Home**: Hero → Get to know us (tabbed) → Intro block → Numbers → Speakers strip → Pillars → Gallery → Get to know us (repeat) → Numbers (repeat) → FinalCTA → FAQ.
- **Speakers**: Hero (collage) → full speaker grid → FinalCTA → FAQ.
- **Partner with us**: Hero → Impact/"who you're reaching" → What partners get → Impact (second, icon list) → FinalCTA → FAQ.
- **About us**: Hero → Our story → Mission/Vision/Value → Meet the crew → FinalCTA → FAQ.

This matches the master prompt's §5 spec exactly — no surprises found.

## 5. FAQ answers (captured verbatim — see `reference/faq-answers.json`)

All 8 accordion answers were not present in initial DOM (Framer mounts them
lazily on first expand) and were captured by scripted click-and-read. Full text
is in `reference/faq-answers.json`; summary:

1. **What is Jordan Create?** — "Jordan Create is the largest creator economy event in the Levant region. It brings together content creators, artists, musicians, marketers, brands, and platforms into one experience focused on learning, networking, and collaboration. It takes place annually in Jordan."
2. **Who should attend Jordan Create?** — "Jordan Create is for content creators of all levels, marketers, brand managers, agency professionals, artists, musicians, designers, entrepreneurs, and anyone working in or interested in the creator economy."
3. **What happens at Jordan Create?** — "The event features keynotes, panels, workshops, live content breakdowns, brand and creator networking, live music, and entertainment. It is built around three tracks: Creation, Marketing, and Technology."
4. **Is Jordan Create only for big creators?** — "No. Jordan Create is for creators at every level — from people just starting to established creators with large audiences. The event is also designed for marketers, brands, and creative professionals."
5. **What are the three tracks at Jordan Create?** — "Creation — for creators, artists, and anyone who builds content or creative work. Marketing — for marketers, agencies, and brands looking to understand creator-driven campaigns. Technology — for anyone exploring how AI and digital tools are changing content, marketing, and media."
6. **Who speaks at Jordan Create?** — "Jordan Create features creators, industry leaders, marketers, and platform executives from across the region. Speaker announcements are made on the official Jordan Create channels."
7. **Who founded Jordan Create?** — "Jordan Create was founded by Mohammed Almashhadani in 2025 to give Jordan's creative community a central place to connect, learn, and grow."
8. **What makes Jordan Create different from other events?** — "Jordan Create combines education, networking, and entertainment into one experience. It is not a traditional conference — it features live music, brand activations, and community-driven moments alongside high-value sessions and panels."

## 6. SEO / meta (verified per page, matches master prompt §7 exactly)

- Shared description: *"A community-powered event bringing together musicians, influencers, content creators, and agencies from across the Kingdom, a creative explosion built to inspire generations."*
- Titles: `Jordan Create Official`, `Jordan Create | Speakers`, `Jordan Create | Partner with Us`, `Jordan Create | About Us`.
- `og:type=website`, `twitter:card=summary_large_image`, shared `og:image`/`twitter:image` = `https://framerusercontent.com/assets/2xUHcovzEQzzDX7p9ceyMwEyvQc.png` (harvested to `public/assets/og/share-card.png`).
- `robots: max-image-preview:large` on every page.
- `apple-touch-icon` = `https://framerusercontent.com/images/VVcNX5XXbXcT0Q9Ao0NDPi99c8.png` (harvested to `public/assets/brand/apple-touch-icon.png`).

## 7. Assets harvested

See `ASSET-MANIFEST.json` at the project root (generated by `scripts/harvest-assets.ts`)
for the full original-URL → local-path → pages-used mapping — **93/93 unique
`framerusercontent.com` assets recovered** (91 images/SVGs + the OG share-card +
the partner-page video), all downloaded at full original resolution (query
params stripped) into `reference/assets-original/` (~560MB total — some
originals are enormous, e.g. one speaker portrait is a 61MB PNG). 11 of the 93
failed on the first pass with transient network timeouts on the largest files;
all 11 were recovered on retry with backoff — every manifest path now resolves
to a real file on disk (verified). Separately, all 55 `framerusercontent.com`-
hosted font files (the TT Ramillas family + Inter/Switzer subsets) were also
downloaded to `reference/assets-original/fonts/` and confirmed to be valid
WOFF2 files.
The explicitly-named assets from the master prompt were additionally copied into
`/public/assets/` under human-readable names:
- CTA/"Don't hear about it" background → `public/assets/cta/room-background.png`
- OG/share-card image → `public/assets/og/share-card.png`
- Partner-page impact video → `public/assets/partners/impact-loop.mp4`
- Apple-touch-icon/logo mark → `public/assets/brand/apple-touch-icon.png`

The remaining ~87 images (speaker portraits, team portraits, gallery photos,
partner cards, hero collages) are traceable via the manifest but not yet
semantically renamed per-speaker/per-section — Framer's `alt` text is generic
stock-photo description ("Woman Garden Pose", "Speaker Image"), not names, so
accurate renaming needs the page-context association that happens naturally
while building each component in Phase 2. Flagging this as a deliberate scope
boundary for this extraction pass, not a fidelity gap — every real file is
already downloaded and mapped.

## 8. Motion (see MOTION-SPEC.md for details)

- Lenis (`lenis@1.3.17-framer`) drives smooth scrolling.
- Confirmed link/hover transition: `color 0.1s cubic-bezier(0, 0, 1, 1)` — short and direct, not floaty.
- Confirmed a `opacity 0.4s ease-out` fade transition used for scroll-reveal content.
- A prior audit of the same site independently reported reduced-motion CSS collapsing all durations to `1ms`; not independently re-confirmed in this pass's stylesheet dump (may be applied via a mechanism outside `document.styleSheets`, e.g. a class toggle) — worth a second look during the motion-parity pass in Phase 5, not blocking.

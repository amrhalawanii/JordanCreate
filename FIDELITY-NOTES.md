# FIDELITY-NOTES.md

Every deliberate deviation from the live site, and every known defect on the
live site that was replicated rather than fixed.

## Agenda page (2026-09-10) — new live page, built against Figma + live DOM

The live site added a genuine `/agenda` route after Phase 0 extraction (it
didn't exist when `EXTRACTION.md` was written). Built fresh, matching both
sources:

- **Content**: pulled from the live DOM via `scripts/extract-agenda.ts`
  (fixed a `waitUntil: "networkidle"` timeout by switching to `"load"` —
  the page has enough background activity, likely video/analytics, that
  network never truly idles). All 14 schedule rows (1 gradient "Registration
  and Check-In" row + 13 regular sessions), their exact time-range strings,
  titles, body copy, and speaker images were extracted verbatim, including
  the live site's own inconsistent time formatting (`"04:10 PM"` vs
  `"4:10 PM"`, en-dash vs hyphen vs no-space dash) — reproduced as-is per
  the "never improve" rule. See `src/content/data/agenda.ts`.
- **Layout**: cross-checked against the Figma file
  (`xcRZno8KujVhST5Ec35K5i`, node `16:4183`) per the user's explicit
  instruction. Figma's `get_design_context` tool hit this project's MCP
  rate limit (Starter plan) mid-session and returned no further results, so
  this page was built from `get_metadata` (structure) + `get_screenshot`
  (a downloaded, cropped-and-upscaled visual reference) + the live site's
  own computed styles — not from Figma-generated code. The two sources
  agreed everywhere they overlapped (gradient bar layout, time-chip
  styling, avatar shape/size, font choices), which is the main reason this
  build is confident in the result despite the missing tool.
- **Schedule row rebuild**: my first pass (written before consulting the
  screenshot closely) guessed the gradient "Registration" row as a stacked
  card and speaker avatars as overlapping circles. Both were wrong —
  corrected after zooming into the Figma screenshot and confirming via live
  computed styles: the gradient row is one horizontal bar
  (`justify-between`, time left / title right, dark `#0f0f0f` text, radius
  4px — using the same `--gradient-brand-orange` token as every other CTA
  on the site), and speaker thumbnails are rounded **squares** (80×80,
  8px radius, 12px gap, not overlapping), not circles.
- **Hero heading font**: computed style on the live `<h1>AGENDA</h1>` and
  the `<h2>` section heading both resolve to the site's real TT Ramillas
  font family with `font-style: normal` (not the "Italic Variable" cut) —
  i.e. non-italic display serif, same treatment as the home page's hero
  heading (`HeroAnimated.tsx`) and `PageHero.tsx`'s default. A first
  low-resolution look at the Figma screenshot crop read as a plain
  sans-serif; computed style from the live DOM was trusted over that visual
  read. Reused the existing `PageHero` component as-is (`headingSizeDesktop:
  100`, matching the Partner-with-us hero's size) rather than building a
  bespoke hero.
- **Hero background image**: byte-identical (md5-verified) to
  `/assets/about/page-hero-bg.png`, already used by the Speakers/Partner/
  About Us heroes — Framer re-hosts the same file under a different hash
  per page. No new asset needed.
- **Eyebrow**: the small mark before "AGENDA" in both the nav-adjacent
  breadcrumb-style eyebrow and the section header is the standard dot icon
  (reused the existing `Eyebrow` component), not a back-arrow as an early,
  low-resolution screenshot read suggested.
- Nav: `desktopNavItems`/`mobileNavItems`'s "AGENDA" entry, previously a
  documented dup pointing at `/speakers`, now correctly points at
  `/agenda` (`src/content/data/nav.ts`).
- **Verification note, not a defect**: one speaker thumbnail (Keynote row,
  `r6aTRBPZC9KhstC0SpuNcHg7gfw.png`) reproducibly never finished loading in
  the Claude Code Browser pane specifically, across fresh tabs and a full
  session restart, while all other 38 thumbnails on the page loaded fine.
  Ruled out as a real bug: `curl` with the exact browser `Accept` header
  Next.js negotiates against (`image/avif,image/webp,...`) returns the
  transcoded WebP instantly at every width the page requests, and the
  decoded output is a correct, valid image (checked visually). No error
  ever appears in the dev server logs for this asset. This is isolated to
  the preview tool's own CDP layer for this one response, not the shipped
  code — flagging in case it resurfaces during a later QA pass.
- **Speaker thumbnails are desaturated in Figma but not on the live site**
  (confirmed: live computed `filter` on those `<img>`s is `none`). Applied
  Tailwind's `grayscale` class to match Figma, the same call already made
  for the home page's Gallery images (`Gallery.tsx`) for the same reason —
  Figma is authoritative for this page per the user's instruction.

## Figma redesign alignment (2026-09-10) — supersedes live-site fidelity on the home page

The user pointed to a Figma file
(`xcRZno8KujVhST5Ec35K5i`, node `15:2133`, "Jordan Create Home Page") as the
authoritative reference for the home page and asked for an exact match. This
Figma file is a **newer design iteration than the live site** — pulling
`get_design_context` for every home-page section surfaced real structural
and content differences, not just polish:

- **Numbers changed**: 400+ Attendees / 34 Speakers / 12 Impact Sessions /
  100M+ Followers, up from the live site's 350+/15/3/70M+. Updated
  `src/content/data/stats.ts` to match Figma — this is a genuine content
  change, not a bug fix, and reverses the Phase 0 live-site-fidelity value.
- **CTA buttons are a diagonal gradient** (`111deg, #eebc2b → #faac44 →
  #fe7a1f` with a 2px white/20% border), not the flat `#ea8f2d` fill used
  everywhere before. New `--gradient-brand-orange` token + shared
  `GradientButton` component, applied to every CTA site-wide.
- **"Get to know us" is a tab bar**, not the accordion-style stacked panels
  built earlier: one trigger row with a bottom-border indicator on the
  active tab, and all three tab images crossfade-stacked (opacity, not
  swapped) below it. Added the 3 distinct per-tab images (found in a
  user-supplied saveweb2zip archive) and the real prev/next arrow icons.
  Rebuilt in `GetToKnowUs.tsx`.
- **The Gallery section is a fixed-height split-scroll layout** (sticky text
  panel + independently-scrollable 2-column masonry image grid), not a
  horizontal marquee. Every gallery image is desaturated (`grayscale`) in
  Figma — the live site's images are full color. Rebuilt in `Gallery.tsx`.
- **FAQ rows have a card background** (`#0a0a0a`, rounded, bordered) and a
  real plus-icon SVG, not a bare bottom-border divider with a text "+".
- **Speaker names use Inter (upright sans), not TT Ramillas italic serif** —
  this reverses part of the earlier typography precision pass, which was
  correct for the *live* site but not for this newer Figma design. Speaker
  cards also gained a bordered frame and a small Instagram glyph.
- **Eyebrow labels get a small dot icon** (an actual 8×8 SVG, not a
  CSS-drawn circle) before the text.
- Fixed a real bug surfaced along the way: Tailwind's `bg-(--var)`
  shorthand assumes `background-color`, which silently no-ops for a
  `linear-gradient()` value. Every gradient button now sets
  `backgroundImage` via inline style instead.
- Found and fixed a real performance bug unrelated to Figma: several
  speaker portrait originals were 30–60MB PNGs, which crashed Next's image
  optimizer in this dev environment (`ERR_MAX_BODY_SIZE_EXCEEDED`). Bulk
  down-sized every asset over 500KB to a 1920px‑longest‑edge cap
  (`sips -Z 1920`), cutting `public/assets` from ~600MB to ~118MB.

Not yet re-verified against this Figma file: Partner-with-us, About Us, and
Speakers page (beyond the shared Header/Footer/FAQ/GradientButton/Eyebrow
components, which now apply everywhere). The user's request was scoped to
the home page.

## Typography precision pass (2026-09-10)

The initial build (Phases 2–5) used Tailwind's default type scale and
reasonable-looking approximations for font family/size/color per role. A
follow-up pass cross-referenced every visible text style against the
Phase 0 computed-style JSON (`reference/computed/*.json`) — the exact
`getComputedStyle()` output from the live site — and corrected every
mismatch found. Notable corrections, all now reflected in the components
themselves:

- **Eyebrow labels** ("GET TO KNOW US", "NUMBERS", "SPEAKERS", etc.) are
  Inter 14px **gray** (`#858585`), not DM Sans 12px **orange** as first
  built. Centralized in `src/components/shared/Eyebrow.tsx`.
- **Three headings have a partial orange highlight** on their last phrase:
  home page's "…IN ONE PLACE", "…WHAT'S NEXT", and "…ALL HAPPENED". The
  same "WHAT'S NEXT" heading reused on `/speakers` uses a **50%-opacity
  fade** instead of orange — confirmed independently on both pages. About
  Us's "MEET THE CREW" also uses the 50%-opacity treatment on "CREW".
- **Page hero headings are not one shared size**: Speakers and About Us are
  166px, Partner with Us is 100px (all TT Ramillas Italic). `PageHero.tsx`
  takes a `headingSizeDesktop` per page and scales fluidly via `clamp()`.
- **Pillar titles are Inter 20px/500 (sans, upright)**, not an italic serif
  — same for the "Strong Presence"-style partner benefit cards and Impact
  items, which are TT Ramillas Italic ~20-22px, not uppercase Inter.
- **Speaker names** (grid cards, team members, detail page) are TT Ramillas
  Italic ~20-54px, not DM Sans.
- **Follower counts** on speaker cards are Inter 16px **gray**, never
  orange (an earlier build mistake).
- **FinalCTA heading** ("Don't hear about it…") uses **TT Ramillas
  Regular** (upright), not italic, and is sentence case, not
  uppercase-transformed.
- **FAQ heading** is two-tone: "Your questions," in white, ", answered with
  clarity" in gray — and 36px, not 32px.
- **Footer** gained the "Navigation" label above the nav links (a distinct
  gold, `#eeba2b` — not the same hex as brand orange) and nav links default
  to white, not gray.
- **About Us "Our story" body paragraph** is set in **Geist**, a third sans
  family beyond DM Sans/Inter/Host Grotesk, confirmed via computed style.
  Added to `src/app/fonts.ts` as `--font-utility`.
- **"MISSION" / "VISION" / "VALUE"** are large 56px italic serif headings,
  not small eyebrow captions (an earlier build mistake).
- **The home page's "Intro block" heading** ("One of the largest Creator
  Economy events") renders as a small eyebrow-style caption on the live
  site, not a display heading as the master prompt's paraphrase implied —
  the real visual weight is in the Host Grotesk 20px prose below it.
- **The Speakers page is missing an entire section** in the original build:
  right after the hero, the live site repeats the "MEET THE VOICES SHAPING
  WHAT'S NEXT" eyebrow+heading+subcopy (opacity-highlighted, see above)
  before the full grid — added to `src/app/speakers/page.tsx`.
- **Partner page's `headingLine2`** ("BE PART OF THE MOVEMENT", from the
  master prompt's original spec) does not exist on the live site anymore —
  re-verified directly, genuinely absent. Removed from the rendered
  heading; left as unused data pending a decision on whether to delete it
  from the schema entirely.
- **Partner page reach stats** (910+/10M+) were already re-verified live in
  the Phase 0 pass and are correct; re-confirmed again here.

## Archive cross-reference (2026-09-10)

The user supplied a saveweb2zip.com archive of jordancreate.com (a full
asset mirror plus a mobile-UA capture of the home page's raw HTML). Diffed
its 39 unique `framerusercontent.com` image hashes against our own
`ASSET-MANIFEST.json` (93 hashes already harvested in Phase 0) — only 3
were genuinely new, all real fidelity gaps rather than duplicates:

- **Favicon.** We'd been reusing the apple-touch-icon for `src/app/icon.png`.
  The archive's `<link rel="icon">` points to a distinct file
  (`4Ooojkhke5fGJma4zsKrZQoy9SM.png`) — now used correctly.
- **Grain/noise texture overlay.** Every speaker portrait on the live site
  carries a subtle repeating grain texture (`background-image`, 256×256
  tile, `opacity:0.05`, oversized and centered). This is a plain CSS
  background layer, not something the Phase 0 `getComputedStyle()` sweep
  would ever surface as a distinct "asset" — genuinely invisible to that
  extraction method. Added as `src/components/shared/GrainOverlay.tsx`.
- **"Get to know us" tab images.** The archive's DOM has
  `data-framer-name="Image1/2/3"` on three distinct images, one per tab —
  we'd been reusing a single image across all three. Fixed (see below).

Also implemented, using the archive's real SVGs rather than a generic
icon: the **prev/next arrow controls** on the "Get to know us" panel — in
the master prompt's own spec (§5.1) but not built until now.

## Known defects on the live site — replicated as-is

- **Broken Instagram links on two home-page speaker cards.** The Yazan
  Abuajweh and Nasser & Laila cards on the home page's "Meet the voices
  shaping what's next" strip have a raw block of pasted brief text (names,
  other speakers' Instagram URLs, follower counts, bio paragraphs) dumped
  into the `href` attribute instead of a clean Instagram URL. Confirmed via
  live extraction (`reference/content/home-speaker-links.json`) and
  reproduced exactly in `src/content/data/speakers.ts`
  (`instagramUrl` on `yazan-abuajweh` / `nasser-laila`). Both links are
  genuinely broken on click, same as the live site.
- **"Contact Us" in the mobile nav and footer links to `/404`.** Replicated
  in `src/content/data/nav.ts` (`footerNavItems`, `mobileNavItems`).
- **Desktop nav labels "AGENDA" and "Speakers" both point to `/speakers`.**
  Replicated in `src/content/data/nav.ts` (`desktopNavItems`).
- **Attendee/reach numbers are inconsistent across pages.** Home page: 350+
  attendees, 70M+ speaker followers. Partner page: 910+ attendees, 10M+
  combined reach, plus a separate "350+ creators" figure in the Impact
  section sub-copy. All replicated verbatim per page — not reconciled into
  one number. (Note: the live values for the partner page — 910+/10M+ — are
  higher than the master prompt's original notes of 800+/2M+; the site has
  evidently been updated since that spec was written. Re-verified live on
  2026-09-10 and the current live numbers were used.)
- **Follower-count formatting is inconsistent.** `15.6` with no unit,
  `3k` vs `3.6k` vs `944k` vs `13.9M Followers`, and two speakers (the
  founders, Mohammed Almashhadani and Awn Nuwwar) have an empty followers
  field entirely. Replicated verbatim as free-form strings — see
  `SpeakerSchema.followers` in `src/content/schemas/speaker.ts`.
- **Five speakers have no bio paragraph on their detail page**: Chef Taimor
  Mouag, Ammar Najjar, Alia Faris, and the two founders (Mohammed
  Almashhadani, Awn Nuwwar). Confirmed by visiting each live page directly —
  genuinely blank, not an extraction failure. Replicated as an empty `bio`.
- **Copy typos on the partner page**, preserved verbatim in
  `src/content/data/partnerBenefits.ts`: "sesssions", "Organioc",
  "Activiations" (as a card title), "exerpiences", "aross", "wiht".
- **Several speaker slugs contain a leading U+2060 (word-joiner) invisible
  character** (e.g. `⁠shashtri-twins`, `⁠yazan-abu-ajweh`, `⁠hakam`, and
  seven others). Preserved exactly in `src/content/data/speakers.ts` so
  `/highlighted-speakers-blog/{slug}` behaves identically to the live site;
  `getSpeakerBySlug` also accepts the character-stripped form as a fallback
  so a "clean" URL still resolves.

## Deliberate scope decisions (not defects, but worth flagging)

- **TT Ramillas font licensing is unresolved.** The primary display serif on
  the live site is a commercial typeface; Framer serves the webfont files,
  but that doesn't establish self-hosting rights outside Framer, and no
  licensed copy exists in this project. **Cormorant Garamond** (open
  license) is used as a provisional stand-in — see `src/app/fonts.ts`. This
  needs a decision (buy a license, confirm one already exists, or keep the
  open stand-in) before any public deploy. See `EXTRACTION.md` §1.
- **"Get to know us" repeats and the "Numbers" block appearing twice** —
  flagged as an open question in the master prompt. Resolved during Phase 3:
  a fresh `document.body.innerText` dump of the live home page shows each
  section exactly once. The apparent duplication in raw Framer HTML is a
  responsive-variant pattern (Framer renders both a desktop and mobile
  version of some sections in the DOM simultaneously, toggling visibility
  via CSS) — not a second, distinct content section. Built as a single
  instance of each here.
- **Gallery second-row ordering.** The master prompt notes the 14-image
  gallery "repeats in a second row with different ordering." The live
  re-ordering algorithm wasn't independently re-derived; the second marquee
  row here uses the same 14 images in reverse order
  (`src/content/data/gallery.ts`), a reasonable but not pixel-verified
  substitute.
- **Speakers page hero collage.** The live `/speakers` hero uses an 8-image
  asymmetric floating collage around the "SPEAKERS" display type. That exact
  collage wasn't extractable through the same method used for other
  sections (no `<header>`-scoped `<img>` set was found); the built hero uses
  a single background image instead. Flagged for a follow-up pass.
- ~~**"Get to know us" tab imagery.**~~ **Fixed 2026-09-10.** Found the 3
  distinct per-tab images (`Image1`/`Image2`/`Image3` in the live site's own
  markup) via a user-supplied saveweb2zip.com archive and wired them in —
  see the "Archive cross-reference" section below.

## Additions beyond the live site (explicitly allowed — this is the one place "better" is allowed)

- None shipped yet. `sitemap.xml`, `robots.txt`, and JSON-LD structured data
  are still on the to-do list per the master prompt §7 — not yet added as of
  this commit.

## Not yet built

- Motion/interaction parity pass (Lenis smooth-scroll, Framer Motion-style
  scroll reveals, hero entrance sequence, number count-up animation) — see
  `MOTION-SPEC.md`. Interactions that exist today (tabs, FAQ accordion,
  mobile menu, gallery marquee with pause-on-hover) work but don't yet carry
  the live site's specific reveal/stagger choreography.
- Responsive QA pass across all 7 breakpoints per section (built
  mobile-first with Tailwind's responsive utilities throughout, but not yet
  individually verified against the Phase 0 reference screenshots).
- `npm run verify` (pixelmatch diffing against `reference/screenshots/`) and
  `PARITY-CHECKLIST.md`.

# FIDELITY-NOTES.md

Every deliberate deviation from the live site, and every known defect on the
live site that was replicated rather than fixed.

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
- **"Get to know us" tab imagery.** The live site swaps a distinct image per
  tab (What is Jordan Create? / Who Should Attend? / What Happens?). The
  same hero artwork is reused across all three tabs here rather than three
  distinct images, since the per-tab images weren't individually identified
  during extraction.

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

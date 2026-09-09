# Progress

## Phase 0 — Forensic extraction: ✅ done, at checkpoint

- Playwright crawl of 8 routes × 7 breakpoints (56 captures): screenshots, DOM
  snapshots, computed-style JSON, raw stylesheets, `@font-face` data, plus
  scroll-position screenshot sequences (11 frames × 2 representative widths ×
  8 pages) and a full network request log. See `scripts/extract.ts`.
- FAQ accordion: all 8 answers captured verbatim (they don't exist in the DOM
  until clicked — see `scripts/faq-extract.ts` and `reference/faq-answers.json`).
- Asset harvest: 93/93 `framerusercontent.com` images/SVG/video recovered at
  full original resolution, plus all 55 Framer-hosted font files. See
  `scripts/harvest-assets.ts` and `ASSET-MANIFEST.json`.
- Deliverables written: `EXTRACTION.md`, `design-tokens.json`, `MOTION-SPEC.md`,
  `ASSET-MANIFEST.json`.
- **Open item flagged for the user**: TT Ramillas (primary display serif) is a
  commercial typeface with no confirmed self-hosting license — see
  `EXTRACTION.md` §1 before Phase 2 ships it to production.
- **Per the master prompt's own instruction, stopping here** — next step is
  Phase 2 (Next.js scaffold) once EXTRACTION.md/design-tokens.json are
  reviewed and the font-licensing question is resolved.

## Not started yet (per master prompt §10)

Phase 2 (scaffold) → Phase 3 (Home, section by section) → Speakers → Partner
with Us → About Us → speaker detail → 404 → Phase 5 (motion pass) →
responsive pass → `npm run verify` + `PARITY-CHECKLIST.md`.

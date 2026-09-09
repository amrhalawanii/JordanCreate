# MOTION-SPEC.md — Phase 0

Extracted from raw stylesheet dumps (`reference/css/*/stylesheets.json`) and the
prior design audit in `Jordan-Create-App-V1/design-analysis.md`. This is a
starting spec — the scroll-position screenshot sequences in
`reference/screenshots/scroll/{page}-{1440,390}-{0..100}.png` (11 frames per
page at 10% scroll increments) are the primary source to refine exact
translate/opacity/stagger values during the Phase 5 motion pass; treat the
below as the confirmed constants plus the observed pattern, not yet a
frame-by-frame spec for every section.

## Confirmed constants (measured, not estimated)

| What | Value | Source |
|---|---|---|
| Smooth scroll engine | Lenis `1.3.17-framer` | linked stylesheet `unpkg.com/lenis@1.3.17-framer/dist/lenis.css` |
| Link / hover color transition | `color 0.1s cubic-bezier(0, 0, 1, 1)` | raw CSS, home page | 
| Scroll-reveal fade | `opacity 0.4s ease-out` | raw CSS, home page |
| Reduced motion | prior audit: all durations collapse to `1ms` under `prefers-reduced-motion: reduce` | cross-reference only, not re-confirmed this pass |

## Observed patterns (from scroll-screenshot sequences + section structure)

- **Scroll-triggered reveals**: content enters as it crosses into viewport
  (typical Framer "while in view" behavior) with restrained opacity and small
  translate — not large slide-ins. The `0.4s ease-out` opacity transition found
  in the raw CSS is the most likely reveal transition; treat translate distance
  as small (image inspection during Phase 5 should confirm exact px).
- **Hero entrance**: hero heading and "Scroll to explore" indicator are present
  on first paint; the scroll cue itself likely has a subtle bounce/pulse loop
  (confirm exact keyframe timing visually — not captured as static CSS since
  it's likely a Framer Motion `animate` loop, not a CSS animation).
- **FAQ accordion**: each row expands from a fully-unmounted state (confirmed —
  answer text does not exist in the DOM at all until first click, then mounts
  and stays mounted; multiple rows can be open simultaneously — this is **not**
  a single-open accordion, confirmed by opening two FAQ rows at once during
  extraction). Motion should be short and close to linear, consistent with the
  `0.1s cubic-bezier(0,0,1,1)` direct-motion language used elsewhere on the site
  — avoid springy/bouncy easing per the site's overall restrained motion feel.
- **Get to know us tabs**: switching the active tab swaps both the copy panel
  and an adjacent image — treat as a cross-fade, matching the same
  `opacity ease-out` transition family rather than a hard cut or slide.
- **Gallery marquee**: two rows of the 2025 gallery images, evidently moving in
  opposite directions (standard infinite-marquee pattern) — exact speed/pause-
  on-hover behavior needs visual confirmation from the scroll screenshots or a
  short recording during Phase 5; not resolvable from static CSS alone since
  marquees are typically driven by a CSS `@keyframes translateX` loop or a JS
  RAF loop.
- **Card hover states**: given the sparse box-shadow language on this site
  (see design-tokens.json `shadow.note`), hover states are most likely a subtle
  border/opacity/image-scale change rather than an elevation shadow — consistent
  with "no dominant drop-shadow language" measured in the computed-style scan.

## Deferred to Phase 5 (needs live-browser motion observation, not static extraction)

- Exact translate/scale values and stagger timing per section (hero, pillars,
  numbers, gallery).
- Whether scroll-reveals replay on scroll-up or only fire once.
- Mobile menu open/close transition (overlay fade timing, item stagger, body
  scroll lock behavior).
- Number count-up animation (trigger point, duration, formatting) for the
  Numbers section — needs to be watched live since it's state-driven, not
  visible in a static DOM/CSS dump.

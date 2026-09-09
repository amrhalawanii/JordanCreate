# CONTENT-MODEL.md

The content layer lives entirely under `src/content/`. **Components never
import content directly** — everything goes through `src/content/repository.ts`,
which picks between a `static` adapter (hardcoded data, today) and a future
`api` adapter (an eventual admin backend) via `CONTENT_SOURCE`. This file
documents every entity so it doubles as the spec for that future admin panel.

```
src/content/
  schemas/     Zod schema + inferred TS type, one file per entity
  data/        the current hardcoded values, typed against the schemas
  repository.ts   the only import surface components are allowed to use
  adapters/
    static.ts  reads from data/ — the only adapter wired up today
    api.ts     same function signatures, unimplemented, throws until a real
               backend exists (swap CONTENT_SOURCE=api with zero component
               changes)
```

## Entities

| Entity | Schema file | Fields | Notes |
|---|---|---|---|
| **NavItem** | `schemas/nav.ts` | `id, label, href, order` | Three separate lists — `desktopNavItems`, `mobileNavItems`, `footerNavItems` — because the live site uses different labels/sets per surface (e.g. mobile says "For Partners", desktop says "Partner with Us" for the same link). |
| **CTA** | `schemas/nav.ts` | `label, href` | Reused everywhere a button/link pair appears. |
| **SiteSettings** | `schemas/nav.ts` | `siteName, tagline, instagramUrl, contactCta` | Singleton. |
| **HeroContent** | `schemas/hero.ts` | `id, heading, subheading, cta, scrollHint` | Home page hero only today; `PageHero` (below) covers the other three pages' heroes. |
| **PageHero** | `schemas/tab.ts` | `id, heading, subheading, cta?, backgroundImage` | Used by Speakers / Partner with Us / About Us. |
| **InfoTab** | `schemas/tab.ts` | `id, trigger, body, cta, order` | The home page "Get to know us" tabbed panel (3 entries). |
| **Speaker** | `schemas/speaker.ts` | `id, slug, name, followers, portrait, bio, instagramUrl?, order` | 37 entries. `followers` is a free-form string, not a number — the live site's formatting is inconsistent by design (see FIDELITY-NOTES.md) and that's preserved rather than normalized. `slug` may contain a leading U+2060 character. `instagramUrl` is only populated for the 10 speakers featured on the home strip (where cards link straight to Instagram); the full grid links to the detail page instead. |
| **TeamMember** | `schemas/team.ts` | `id, name, role, instagramHandle, portrait, order` | 8 entries, About Us "Meet the Crew". |
| **FAQEntry** | `schemas/faq.ts` | `id, question, answer, order` | 8 entries, shared across all four pages. Answers were captured by scripted click-through since they don't exist in the live DOM until expanded. |
| **Stat** | `schemas/stat.ts` | `id, label, value, sublabel, order` | Home page Numbers section (4 entries). |
| **ReachStat** | `schemas/partnerBenefit.ts` | `id, value, label, body, order` | Partner page "Who you're reaching" (3 entries) — kept as a separate type from `Stat` because the live values and copy conventions differ per page (see FIDELITY-NOTES.md on inconsistent numbers). |
| **Pillar** | `schemas/pillar.ts` | `id, title, body, order` | Home page Pillars (3 entries). |
| **GalleryItem** | `schemas/galleryItem.ts` | `id, image, order` | Home page 2025 gallery marquee (14 entries). |
| **PartnerBenefit** | `schemas/partnerBenefit.ts` | `id, title, body, image, order` | Partner page "What partners get" cards (6 entries). |
| **ImpactItem** | `schemas/partnerBenefit.ts` | `id, title, body, icon, order` | Partner page Impact section (4 entries). |

Plus a handful of one-off, singleton content blocks in `src/content/data/misc.ts`
(intro block, shared FinalCTA band, About Us story/mission/vision/value,
"Meet the crew" intro copy, partner section intros, 404 copy) — these didn't
warrant their own schema/entity since each appears exactly once, but they
still flow through named `repository.ts` getters rather than being inlined
in components.

## Conventions

- Every list entity carries an explicit `order: number` — ordering is never
  inferred from array position, so a future admin UI can reorder without
  restructuring data.
- Every entity has a stable `id` (and `Speaker` additionally has `slug`,
  since `id` is a filesystem-safe version of the slug with invisible
  characters stripped, while `slug` is the literal live-site value used for
  routing).
- Repository functions are all `async` even though the static adapter is
  synchronous under the hood — this is what lets `CONTENT_SOURCE=api` swap
  to real network calls with zero component changes.
- No hardcoded English copy lives in JSX — every string a component renders
  comes from a `getX()` repository call.

## What a future admin backend needs that doesn't exist yet

`JordanCreate-Admin` (a sibling project in this workspace) already has a
production Supabase schema with `speakers`, `partners`, `faq_entries`,
`agenda_sessions`, `event_info`, `venue_zones`, and more — a strong
integration point for the future `api` adapter. It is **missing** entity
types this site's content model needs: `TeamMember`, `Stat`/`ReachStat`,
`Pillar`, `GalleryItem`, `PartnerBenefit`/`ImpactItem`, and any InfoTab-shaped
content. Wiring `CONTENT_SOURCE=api` to that backend would need those tables
added, plus a public-readable API surface (today it only exposes
auth-gated Server Actions, not a public route a separate frontend can call).
This is out of scope for the current build — flagged here for whoever builds
the admin integration next.

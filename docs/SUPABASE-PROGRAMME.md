# Speakers & Agenda — Supabase integration (website-step-2)

> **MVP launch:** the public site ships with `CONTENT_SOURCE=static`. Speakers,
> agenda, FAQ, partners, team, gallery, and all marketing copy are embedded in
> `src/content/data/` (extracted from [jordancreate.com](https://www.jordancreate.com/)).
> Re-enable Supabase only when you are ready to manage programme data in the DB.

## Scope
Live **speakers** and **agenda** from Supabase; all other marketing content stays static.

## Security
- Prefer **anon key** after running `docs/sql/programme-public-read.sql`
- Until then, optional **server-only** `SUPABASE_SERVICE_ROLE_KEY` for SELECT
  (never `NEXT_PUBLIC_`, never imported into Client Components — enforced by `server-only`)
- Never commit `.env.local`
- Photo / Instagram URLs sanitized to `http(s)` only
- Zod validation before render
- Soft-fallback to static content on any failure

## Resilience
| Case | Behaviour |
|---|---|
| Missing env | Static adapter for speakers/agenda |
| Supabase / network / query error | Soft-fallback to static + `ContentNotice` (degraded) |
| Empty confirmed rows | Empty-state UI + status message |
| Detail slug miss on live | Tries static slug as migration safety net |

Cache (when `CONTENT_SOURCE=supabase`): `unstable_cache` **60s**. Static MVP pages do not ISR-poll the DB.

## Enable locally (post-MVP)
1. Copy `.env.example` → `.env.local`
2. Set:
   ```bash
   CONTENT_SOURCE=supabase
   NEXT_PUBLIC_SUPABASE_URL=https://peaoiihysmthpzrxlcxc.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
   SUPABASE_SERVICE_ROLE_KEY=<service role>   # until public RLS SQL is applied
   ```
3. (Recommended) Run `docs/sql/programme-public-read.sql` in the Supabase SQL editor, then remove the service role line.
4. `npm run dev`

Leave `CONTENT_SOURCE=static` for MVP launch, offline, and CI without secrets.

## Mapping (DB → UI)
| UI field | Source |
|---|---|
| Speaker name | Derived from `handle` (no display_name column yet) |
| Portrait | `photo_url` (fallback brand logo) |
| Bio | `known_for` → `tagline` (empty if `bio_status=missing`) |
| Followers | `followers_range` |
| Instagram | `speaker_social_links` where platform ~ Instagram |
| Agenda time | `start_time`–`end_time` → `03:00 PM – 03:20 PM` |
| Speaker thumbs | Resolved from `speaker_handles` / `moderator_handle` photos |
| Highlight row | Heuristic: registration / check-in / doors |

## Verified live counts (service-role read)
- Speakers (non-archived): **36**
- Confirmed agenda sessions: **14**
- Anon without public RLS: **0** (policies not applied yet — use SQL above)

## Files
- `src/lib/supabase/server.ts` — server client
- `src/content/supabase/*` — fetchers + mappers
- `src/content/adapters/supabase.ts` — hybrid + fallbacks
- `src/content/repository.ts` — `CONTENT_SOURCE` switch
- `src/components/shared/ContentNotice.tsx` — user-facing status
- `docs/sql/programme-public-read.sql` — public SELECT RLS

## Follow-ups
- Optional `display_name` column for true stage names
- Explicit `is_highlight` / `is_featured` flags in Admin
- `revalidateTag('speakers'|'agenda')` from Admin on publish
- Wire remaining sections (FAQ, partners) the same way

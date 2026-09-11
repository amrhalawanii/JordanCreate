-- Public read access for marketing-site programme tables (speakers + agenda).
-- Run once in the Supabase SQL editor (project peaoiihysmthpzrxlcxc).
-- After this, the website can use NEXT_PUBLIC_SUPABASE_ANON_KEY alone and
-- you can remove SUPABASE_SERVICE_ROLE_KEY from the marketing site env.

begin;

grant select on table public.speakers to anon, authenticated;
grant select on table public.speaker_social_links to anon, authenticated;
grant select on table public.agenda_sessions to anon, authenticated;

do $$
declare
  t text;
begin
  foreach t in array array[
    'speakers',
    'speaker_social_links',
    'agenda_sessions'
  ]
  loop
    if to_regclass('public.' || t) is null then
      continue;
    end if;
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists %I on public.%I', t || '_select_public', t);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true)',
      t || '_select_public',
      t
    );
  end loop;
end $$;

commit;

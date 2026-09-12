create table if not exists public.dream_journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text,
  dream_date date,
  dream_text text not null,
  spiritual_interpretation text not null,
  related_dream_slug text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists dream_journal_entries_user_created_idx
  on public.dream_journal_entries (user_id, created_at desc);

comment on table public.dream_journal_entries is
  'Private dream journal. Never expose in SEO, sitemap, or public APIs.';

grant select, insert, update, delete on public.dream_journal_entries to authenticated;

alter table public.dream_journal_entries enable row level security;

drop policy if exists dream_journal_select_own on public.dream_journal_entries;
create policy dream_journal_select_own
  on public.dream_journal_entries
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists dream_journal_insert_own on public.dream_journal_entries;
create policy dream_journal_insert_own
  on public.dream_journal_entries
  for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists dream_journal_update_own on public.dream_journal_entries;
create policy dream_journal_update_own
  on public.dream_journal_entries
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists dream_journal_delete_own on public.dream_journal_entries;
create policy dream_journal_delete_own
  on public.dream_journal_entries
  for delete
  to authenticated
  using (user_id = auth.uid());

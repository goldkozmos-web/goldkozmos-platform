-- Unmatched / all rüya searches. No personal identity fields.

create table if not exists public.dream_search_queries (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  normalized_query text not null,
  matched_slug text,
  result_count integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists dream_search_queries_created_idx
  on public.dream_search_queries (created_at desc);
create index if not exists dream_search_queries_norm_idx
  on public.dream_search_queries (normalized_query, created_at desc);

alter table public.dream_search_queries enable row level security;

drop policy if exists dream_search_insert on public.dream_search_queries;
create policy dream_search_insert
  on public.dream_search_queries for insert to anon, authenticated
  with check (char_length(trim(query)) between 2 and 180);

drop policy if exists dream_search_select_admin on public.dream_search_queries;
create policy dream_search_select_admin
  on public.dream_search_queries for select to authenticated
  using (public.is_profile_admin());

grant insert on table public.dream_search_queries to anon, authenticated;
grant select on table public.dream_search_queries to authenticated;

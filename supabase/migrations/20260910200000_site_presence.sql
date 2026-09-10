-- Anonymous visitor presence for Yönetim Merkezi.
-- Visitors stay unnamed (Ziyaretçi). No IP column.

create table if not exists public.site_visitors (
  visitor_key text primary key,
  first_path text,
  first_referrer text,
  first_source text,
  country text,
  region text,
  city text,
  last_path text,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.site_events (
  id uuid primary key default gen_random_uuid(),
  visitor_key text not null,
  kind text not null,
  path text,
  referrer text,
  source text,
  href text,
  country text,
  region text,
  city text,
  created_at timestamptz not null default now(),
  constraint site_events_kind_check
    check (kind in ('page', 'whatsapp', 'purchase', 'appointment'))
);

create index if not exists site_visitors_last_seen_at_idx
  on public.site_visitors (last_seen_at desc);

create index if not exists site_events_kind_created_at_idx
  on public.site_events (kind, created_at desc);

create index if not exists site_events_visitor_created_at_idx
  on public.site_events (visitor_key, created_at desc);

alter table public.site_visitors enable row level security;
alter table public.site_events enable row level security;

drop policy if exists site_visitors_select_admin on public.site_visitors;
create policy site_visitors_select_admin
  on public.site_visitors
  for select
  to authenticated
  using (public.is_profile_admin());

drop policy if exists site_events_select_admin on public.site_events;
create policy site_events_select_admin
  on public.site_events
  for select
  to authenticated
  using (public.is_profile_admin());

create or replace function public.record_site_presence(
  p_visitor_key text,
  p_kind text,
  p_path text,
  p_referrer text,
  p_source text,
  p_href text,
  p_country text,
  p_region text,
  p_city text,
  p_heartbeat boolean
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_visitor_key is null or length(trim(p_visitor_key)) < 8 then
    return;
  end if;

  insert into public.site_visitors as visitor (
    visitor_key,
    first_path,
    first_referrer,
    first_source,
    country,
    region,
    city,
    last_path,
    last_seen_at
  )
  values (
    trim(p_visitor_key),
    coalesce(nullif(trim(p_path), ''), '/'),
    nullif(trim(p_referrer), ''),
    coalesce(nullif(trim(p_source), ''), 'Direkt'),
    nullif(trim(p_country), ''),
    nullif(trim(p_region), ''),
    nullif(trim(p_city), ''),
    coalesce(nullif(trim(p_path), ''), '/'),
    now()
  )
  on conflict (visitor_key) do update
  set
    last_path = excluded.last_path,
    last_seen_at = now(),
    country = coalesce(excluded.country, visitor.country),
    region = coalesce(excluded.region, visitor.region),
    city = coalesce(excluded.city, visitor.city);

  if coalesce(p_heartbeat, false) = false
     and p_kind in ('page', 'whatsapp', 'purchase', 'appointment') then
    insert into public.site_events (
      visitor_key,
      kind,
      path,
      referrer,
      source,
      href,
      country,
      region,
      city
    )
    values (
      trim(p_visitor_key),
      p_kind,
      coalesce(nullif(trim(p_path), ''), '/'),
      nullif(trim(p_referrer), ''),
      coalesce(nullif(trim(p_source), ''), 'Direkt'),
      nullif(trim(p_href), ''),
      nullif(trim(p_country), ''),
      nullif(trim(p_region), ''),
      nullif(trim(p_city), '')
    );
  end if;
end;
$$;

revoke all on function public.record_site_presence(
  text, text, text, text, text, text, text, text, text, boolean
) from public;
grant execute on function public.record_site_presence(
  text, text, text, text, text, text, text, text, text, boolean
) to anon, authenticated;

grant select on table public.site_visitors to authenticated;
grant select on table public.site_events to authenticated;

-- Counts only: no identity, location, URL, referrer or individual event is public.
create or replace function public.public_activity_totals()
returns jsonb
language sql stable security definer
set search_path = public
as $$
  with bounds as (
    select now() - interval '2 minutes' as active_since,
      date_trunc('day', now() at time zone 'Europe/Istanbul') at time zone 'Europe/Istanbul' as day_start
  ), visitors as (
    select count(*) filter (where last_seen_at >= active_since) as online,
      count(*) as visitors
    from public.site_visitors cross join bounds
    where last_seen_at >= day_start
      and coalesce(last_path, '/') !~ '^/(admin|panel|api|auth)(/|$)'
  ), events as (
    select count(*) filter (where kind = 'whatsapp') as whatsapp,
      count(*) filter (where kind = 'appointment') as appointments,
      count(*) filter (where kind = 'purchase') as shopier
    from public.site_events cross join bounds
    where created_at >= day_start
      and coalesce(path, '/') !~ '^/(admin|panel|api|auth)(/|$)'
  )
  select jsonb_build_object('online', online, 'visitors', visitors,
    'whatsapp', whatsapp, 'appointments', appointments, 'shopier', shopier)
  from visitors cross join events;
$$;
revoke all on function public.public_activity_totals() from public;
grant execute on function public.public_activity_totals() to anon, authenticated;

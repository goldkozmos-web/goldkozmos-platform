create table if not exists public.goldlink_events (
 id uuid primary key,
 link_id text not null check (link_id in ('_view','rehber','enerji','birebir','goldbook','telegram','whatsapp','youtube')),
 created_at timestamptz not null default now()
);
alter table public.goldlink_events enable row level security;
revoke all on public.goldlink_events from anon, authenticated;
grant select, insert on public.goldlink_events to service_role;
create index if not exists goldlink_events_link_time on public.goldlink_events(link_id, created_at desc);
create or replace function public.goldlink_summary() returns jsonb language sql stable set search_path=public as $$
 select jsonb_build_object('updatedAt',now(),'rows',coalesce(jsonb_agg(row_to_json(t)),'[]'::jsonb)) from (
 select link_id as id, count(*) as total,
 count(*) filter (where created_at >= (date_trunc('day',now() at time zone 'Europe/Istanbul') at time zone 'Europe/Istanbul')) as today,
 max(created_at) as last_click from public.goldlink_events group by link_id
 ) t;
$$;
revoke all on function public.goldlink_summary() from public, anon, authenticated;
grant execute on function public.goldlink_summary() to service_role;

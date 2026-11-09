-- Owner approved on 2026-10-29. Dedicated private panel storage; public site tables unchanged.
begin;
create table if not exists public.panel_records (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null default auth.uid() references auth.users(id),
 kind text not null check(kind in ('clients','works','appointments','broadcasts','tasks','instagram','youtube','notes','services')),
 data jsonb not null default '{}'::jsonb check(jsonb_typeof(data)='object' and octet_length(data::text)<=100000),
 version integer not null default 1,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 deleted_at timestamptz
);
create index if not exists panel_records_owner_kind on public.panel_records(owner_id,kind,updated_at desc);
alter table public.panel_records enable row level security;
revoke all on public.panel_records from anon;
revoke all on public.panel_records from authenticated;
grant select,insert,update on public.panel_records to authenticated;
drop policy if exists panel_owner_access on public.panel_records;
create policy panel_owner_access on public.panel_records for all to authenticated
using (owner_id=auth.uid() and lower(auth.jwt()->>'email')='goldkozmos@gmail.com')
with check (owner_id=auth.uid() and lower(auth.jwt()->>'email')='goldkozmos@gmail.com');
create or replace function public.panel_record_guard() returns trigger language plpgsql set search_path=public as $$
begin
 if TG_OP='UPDATE' then
  if new.owner_id<>old.owner_id or new.kind<>old.kind or new.created_at<>old.created_at then raise exception 'Record identity cannot change'; end if;
  new.version:=old.version+1;
  new.updated_at:=now();
  if old.deleted_at is null and new.deleted_at is not null and old.kind='clients' and exists(select 1 from public.panel_records r where r.owner_id=old.owner_id and r.deleted_at is null and r.data->>'clientId'=old.id::text) then raise exception 'Archive linked records first'; end if;
 end if;
 if new.deleted_at is null and new.kind in ('works','appointments') and coalesce(new.data->>'clientId','')<>'' then
  perform 1 from public.panel_records r where r.id::text=new.data->>'clientId' and r.owner_id=new.owner_id and r.kind='clients' and r.deleted_at is null for update;
  if not found then raise exception 'Client unavailable'; end if;
 end if;
 return new;
end $$;
drop trigger if exists panel_record_guard on public.panel_records;
create trigger panel_record_guard before insert or update on public.panel_records for each row execute function public.panel_record_guard();
commit;

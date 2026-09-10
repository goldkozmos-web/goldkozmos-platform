-- Live appointment tracking on the existing GoldKozmos Supabase project.
-- Uses public.profiles.is_admin from the current auth setup (no second database).

create or replace function public.is_appointment_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select profile.is_admin
      from public.profiles as profile
      where profile.id = auth.uid()
    ),
    false
  );
$$;

revoke all on function public.is_appointment_admin() from public;
grant execute on function public.is_appointment_admin() to authenticated;

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  service_id text not null default '',
  service_name text not null,
  appointment_date date not null,
  start_time time not null,
  end_time time,
  status text not null default 'pending',
  client_name text not null default '',
  client_email text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint appointments_status_check check (
    status in ('pending', 'confirmed', 'completed', 'cancelled')
  ),
  constraint appointments_service_name_check check (
    char_length(trim(service_name)) > 0
  )
);

create unique index if not exists appointments_active_slot_idx
  on public.appointments (appointment_date, start_time)
  where status in ('pending', 'confirmed');

create index if not exists appointments_user_id_date_idx
  on public.appointments (user_id, appointment_date desc, start_time desc);

create index if not exists appointments_status_date_idx
  on public.appointments (status, appointment_date, start_time);

create index if not exists appointments_created_at_idx
  on public.appointments (created_at desc);

create table if not exists public.appointment_admin_reads (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  last_seen_at timestamptz not null default now()
);

create or replace function public.appointments_fill_client()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  user_email text;
  profile_name text;
  meta_name text;
begin
  select
    users.email,
    nullif(trim(users.raw_user_meta_data ->> 'display_name'), '')
  into user_email, meta_name
  from auth.users as users
  where users.id = new.user_id;

  select nullif(trim(profile.display_name), '')
  into profile_name
  from public.profiles as profile
  where profile.id = new.user_id;

  new.client_email := coalesce(user_email, '');
  new.client_name := coalesce(
    profile_name,
    meta_name,
    nullif(split_part(coalesce(user_email, ''), '@', 1), ''),
    'Danışan'
  );

  return new;
end;
$$;

drop trigger if exists appointments_fill_client on public.appointments;
create trigger appointments_fill_client
  before insert on public.appointments
  for each row
  execute procedure public.appointments_fill_client();

create or replace function public.appointments_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' then
    if not public.is_appointment_admin() then
      raise exception 'Randevu yalnızca admin tarafından güncellenebilir';
    end if;

    new.user_id := old.user_id;
    new.service_id := old.service_id;
    new.service_name := old.service_name;
    new.appointment_date := old.appointment_date;
    new.start_time := old.start_time;
    new.end_time := old.end_time;
    new.client_name := old.client_name;
    new.client_email := old.client_email;
    new.created_at := old.created_at;
    new.updated_at := now();
  end if;

  return new;
end;
$$;

drop trigger if exists appointments_guard on public.appointments;
create trigger appointments_guard
  before update on public.appointments
  for each row
  execute procedure public.appointments_guard();

alter table public.appointments enable row level security;
alter table public.appointment_admin_reads enable row level security;

drop policy if exists appointments_select_own_or_admin on public.appointments;
create policy appointments_select_own_or_admin
  on public.appointments
  for select
  to authenticated
  using (
    user_id = auth.uid()
    or public.is_appointment_admin()
  );

drop policy if exists appointments_insert_own on public.appointments;
create policy appointments_insert_own
  on public.appointments
  for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists appointments_update_admin on public.appointments;
create policy appointments_update_admin
  on public.appointments
  for update
  to authenticated
  using (public.is_appointment_admin())
  with check (public.is_appointment_admin());

drop policy if exists appointment_admin_reads_own on public.appointment_admin_reads;
create policy appointment_admin_reads_own
  on public.appointment_admin_reads
  for all
  to authenticated
  using (user_id = auth.uid() and public.is_appointment_admin())
  with check (user_id = auth.uid() and public.is_appointment_admin());

alter table public.appointments replica identity full;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'appointments'
  ) then
    execute 'alter publication supabase_realtime add table public.appointments';
  end if;
end;
$$;

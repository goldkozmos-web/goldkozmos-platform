-- Permanent GoldKozmos members. Google login and admin-added emails stay forever.

create or replace function public.is_profile_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    lower(coalesce(auth.jwt() ->> 'email', '')) = 'goldkozmos@gmail.com'
    or coalesce(
      (
        select profile.role = 'admin'
        from public.profiles as profile
        where profile.id = auth.uid()
      ),
      false
    );
$$;

revoke all on function public.is_profile_admin() from public;
grant execute on function public.is_profile_admin() to authenticated;

drop policy if exists profiles_select_admin on public.profiles;
create policy profiles_select_admin
  on public.profiles
  for select
  to authenticated
  using (public.is_profile_admin());

grant select on table public.profiles to authenticated;

create table if not exists public.site_members (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  display_name text not null,
  auth_user_id uuid unique references auth.users (id) on delete set null,
  source text not null default 'google',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_members_email_key unique (email),
  constraint site_members_source_check
    check (source in ('google', 'admin', 'shopier')),
  constraint site_members_status_check
    check (status in ('active', 'paused'))
);

create index if not exists site_members_created_at_idx
  on public.site_members (created_at desc);

alter table public.site_members enable row level security;

drop policy if exists site_members_select_admin on public.site_members;
create policy site_members_select_admin
  on public.site_members
  for select
  to authenticated
  using (public.is_profile_admin());

grant select on table public.site_members to authenticated;

create or replace function public.upsert_site_member(
  p_email text,
  p_display_name text,
  p_auth_user_id uuid,
  p_source text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_email text := lower(trim(coalesce(p_email, '')));
  label text := nullif(trim(coalesce(p_display_name, '')), '');
  origin text := coalesce(nullif(trim(p_source), ''), 'google');
begin
  if normalized_email = '' or position('@' in normalized_email) = 0 then
    return;
  end if;

  if origin not in ('google', 'admin', 'shopier') then
    origin := 'google';
  end if;

  if label is null then
    label := split_part(normalized_email, '@', 1);
  end if;

  insert into public.site_members as member (
    email,
    display_name,
    auth_user_id,
    source,
    status,
    updated_at
  )
  values (
    normalized_email,
    label,
    p_auth_user_id,
    origin,
    'active',
    now()
  )
  on conflict (email) do update
  set
    display_name = coalesce(nullif(excluded.display_name, ''), member.display_name),
    auth_user_id = coalesce(excluded.auth_user_id, member.auth_user_id),
    status = 'active',
    updated_at = now();
end;
$$;

create or replace function public.sync_site_members()
returns integer
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  synced integer := 0;
  auth_user auth.users%rowtype;
begin
  if auth.uid() is not null and public.is_profile_admin() is not true then
    return 0;
  end if;

  for auth_user in
    select * from auth.users
    where email is not null
  loop
    perform public.upsert_site_member(
      auth_user.email,
      coalesce(
        nullif(trim(auth_user.raw_user_meta_data ->> 'full_name'), ''),
        nullif(trim(auth_user.raw_user_meta_data ->> 'name'), ''),
        nullif(trim(auth_user.raw_user_meta_data ->> 'display_name'), ''),
        split_part(auth_user.email, '@', 1)
      ),
      auth_user.id,
      'google'
    );
    synced := synced + 1;
  end loop;

  return synced;
end;
$$;

create or replace function public.ensure_own_membership()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  actor uuid := auth.uid();
  actor_email text := lower(trim(coalesce(auth.jwt() ->> 'email', '')));
begin
  if actor is null or actor_email = '' then
    return;
  end if;

  perform public.upsert_site_member(
    actor_email,
    coalesce(
      (
        select profile.display_name
        from public.profiles as profile
        where profile.id = actor
      ),
      split_part(actor_email, '@', 1)
    ),
    actor,
    'google'
  );
end;
$$;

create or replace function public.add_site_member(
  p_email text,
  p_display_name text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_profile_admin() is not true then
    raise exception 'not allowed';
  end if;

  perform public.upsert_site_member(p_email, p_display_name, null, 'admin');
end;
$$;

create or replace function public.list_site_members()
returns table (
  id uuid,
  display_name text,
  role text,
  email text,
  created_at timestamptz,
  source text,
  status text,
  auth_user_id uuid
)
language sql
stable
security definer
set search_path = public
as $$
  select
    member.id,
    member.display_name,
    case
      when lower(member.email) = 'goldkozmos@gmail.com' then 'admin'
      else 'user'
    end as role,
    member.email,
    member.created_at,
    member.source,
    member.status,
    member.auth_user_id
  from public.site_members as member
  where public.is_profile_admin()
  order by member.created_at desc;
$$;

revoke all on function public.upsert_site_member(text, text, uuid, text) from public;
revoke all on function public.sync_site_members() from public;
revoke all on function public.ensure_own_membership() from public;
revoke all on function public.add_site_member(text, text) from public;
revoke all on function public.list_site_members() from public;

grant execute on function public.sync_site_members() to authenticated;
grant execute on function public.ensure_own_membership() to authenticated;
grant execute on function public.add_site_member(text, text) to authenticated;
grant execute on function public.list_site_members() to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role text := 'user';
  label text;
begin
  if lower(coalesce(new.email, '')) = 'goldkozmos@gmail.com' then
    assigned_role := 'admin';
  end if;

  label := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
    nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
    'GoldKozmos'
  );

  insert into public.profiles (id, display_name, avatar_url, role, is_admin)
  values (
    new.id,
    label,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'avatar_url', ''),
      nullif(new.raw_user_meta_data ->> 'picture', '')
    ),
    assigned_role,
    assigned_role = 'admin'
  )
  on conflict (id) do nothing;

  perform public.upsert_site_member(new.email, label, new.id, 'google');

  return new;
end;
$$;

select public.sync_site_members();

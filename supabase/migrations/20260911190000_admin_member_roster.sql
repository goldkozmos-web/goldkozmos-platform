-- Make Google members visible in Yönetim even if the extra profile columns
-- are missing, and let a signed-in user write their own roster row.

create or replace function public.ensure_own_membership()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  actor uuid := auth.uid();
  actor_email text;
  label text;
begin
  if actor is null then
    return;
  end if;

  select lower(trim(coalesce(
    auth.jwt() ->> 'email',
    auth.jwt() -> 'user_metadata' ->> 'email',
    auth_user.email,
    ''
  )))
  into actor_email
  from auth.users as auth_user
  where auth_user.id = actor;

  if actor_email is null or actor_email = '' then
    actor_email := lower(trim(coalesce(auth.jwt() ->> 'email', '')));
  end if;

  if actor_email is null or actor_email = '' then
    return;
  end if;

  select coalesce(
    nullif(trim(coalesce(auth.jwt() -> 'user_metadata' ->> 'full_name', '')), ''),
    nullif(trim(coalesce(auth.jwt() -> 'user_metadata' ->> 'name', '')), ''),
    (
      select profile.display_name
      from public.profiles as profile
      where profile.id = actor
    ),
    split_part(actor_email, '@', 1)
  )
  into label;

  perform public.upsert_site_member(
    actor_email,
    coalesce(label, split_part(actor_email, '@', 1)),
    actor,
    'google'
  );
end;
$$;

grant execute on function public.ensure_own_membership() to authenticated;

drop policy if exists site_members_insert_own on public.site_members;
create policy site_members_insert_own
  on public.site_members
  for insert
  to authenticated
  with check (
    auth_user_id = auth.uid()
    and email = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
  );

drop policy if exists site_members_update_own on public.site_members;
create policy site_members_update_own
  on public.site_members
  for update
  to authenticated
  using (auth_user_id = auth.uid() or email = lower(trim(coalesce(auth.jwt() ->> 'email', ''))))
  with check (auth_user_id = auth.uid());

grant insert, update on table public.site_members to authenticated;

create or replace function public.list_admin_roster()
returns table (
  id uuid,
  display_name text,
  role text,
  email text,
  created_at timestamptz,
  source text,
  status text,
  auth_user_id uuid,
  city text,
  age integer,
  interests text,
  phone text
)
language sql
stable
security definer
set search_path = public, auth
as $$
  select
    coalesce(member.id, profile.id) as id,
    coalesce(member.display_name, profile.display_name, split_part(coalesce(auth_user.email, ''), '@', 1)) as display_name,
    case
      when lower(coalesce(member.email, auth_user.email, '')) = 'goldkozmos@gmail.com' then 'admin'
      else coalesce(profile.role, 'user')
    end as role,
    coalesce(member.email, auth_user.email::text) as email,
    coalesce(member.created_at, profile.created_at, auth_user.created_at) as created_at,
    coalesce(member.source, 'google') as source,
    coalesce(member.status, 'active') as status,
    coalesce(member.auth_user_id, profile.id, auth_user.id) as auth_user_id,
    null::text as city,
    null::integer as age,
    null::text as interests,
    null::text as phone
  from auth.users as auth_user
  left join public.profiles as profile on profile.id = auth_user.id
  left join public.site_members as member
    on member.auth_user_id = auth_user.id
    or lower(member.email) = lower(auth_user.email)
  where public.is_profile_admin()
    and auth_user.email is not null
  order by coalesce(member.created_at, profile.created_at, auth_user.created_at) desc;
$$;

revoke all on function public.list_admin_roster() from public;
grant execute on function public.list_admin_roster() to authenticated;

-- Site admin is goldkozmos@gmail.com (JWT email) or profiles.role = admin.
-- Own-row select is not enough to list members in Yönetim.

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

create or replace function public.list_site_members()
returns table (
  id uuid,
  display_name text,
  role text,
  email text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public, auth
as $$
  select
    profile.id,
    profile.display_name,
    profile.role,
    auth_user.email::text,
    profile.created_at
  from public.profiles as profile
  left join auth.users as auth_user on auth_user.id = profile.id
  where public.is_profile_admin()
  order by profile.created_at desc nulls last
  limit 120;
$$;

revoke all on function public.list_site_members() from public;
grant execute on function public.list_site_members() to authenticated;

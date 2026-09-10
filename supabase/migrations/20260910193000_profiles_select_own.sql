-- Authenticated users can always read their own profile row.
-- Needed so login can route by role / is_admin without using email.

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

grant select on table public.profiles to authenticated;

update public.profiles as profile
set role = 'admin'
from auth.users as auth_user
where profile.id = auth_user.id
  and lower(auth_user.email) = 'goldkozmos@gmail.com';

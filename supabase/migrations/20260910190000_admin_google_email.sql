-- Canonical admin Google account. No separate admin password.

update public.profiles as profile
set role = 'admin'
from auth.users as auth_user
where profile.id = auth_user.id
  and lower(auth_user.email) = 'goldkozmos@gmail.com'
  and profile.role is distinct from 'admin';

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role text := 'user';
begin
  if lower(coalesce(new.email, '')) = 'goldkozmos@gmail.com' then
    assigned_role := 'admin';
  end if;

  insert into public.profiles (id, display_name, avatar_url, role, is_admin)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
      nullif(split_part(new.email, '@', 1), ''),
      'GoldKozmos'
    ),
    nullif(new.raw_user_meta_data ->> 'avatar_url', ''),
    assigned_role,
    assigned_role = 'admin'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

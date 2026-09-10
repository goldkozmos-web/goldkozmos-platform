-- Admin role on profiles. No separate admin password.
-- Promote only from the SQL editor / service role:
--   update public.profiles set role = 'admin' where id = '<auth user uuid>';

alter table public.profiles
  add column if not exists role text not null default 'user';

alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('user', 'admin'));

update public.profiles
set role = 'admin'
where is_admin = true
  and role is distinct from 'admin';

create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if auth.role() = 'authenticated' then
      new.role := 'user';
    end if;

    new.role := coalesce(nullif(new.role, ''), 'user');

    if new.role not in ('user', 'admin') then
      new.role := 'user';
    end if;

    new.is_admin := (new.role = 'admin');
    new.updated_at := now();
    return new;
  end if;

  if auth.role() = 'authenticated' then
    new.role := old.role;
    new.is_admin := old.is_admin;
  end if;

  if new.role not in ('user', 'admin') then
    new.role := old.role;
  end if;

  new.is_admin := (new.role = 'admin');
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists protect_profile_admin_flag on public.profiles;
drop trigger if exists protect_profile_privileges on public.profiles;

create trigger protect_profile_privileges
  before insert or update on public.profiles
  for each row
  execute procedure public.protect_profile_privileges();

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
  on public.profiles
  for insert
  with check (
    auth.uid() = id
    and role = 'user'
    and is_admin = false
  );

create or replace function public.is_profile_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
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

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url, role, is_admin)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
      nullif(split_part(new.email, '@', 1), ''),
      'GoldKozmos'
    ),
    nullif(new.raw_user_meta_data ->> 'avatar_url', ''),
    'user',
    false
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

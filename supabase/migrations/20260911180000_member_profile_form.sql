-- Full membership card after Google: name, city, age, interests, phone, privacy.

alter table public.site_members
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists city text,
  add column if not exists age integer,
  add column if not exists interests text,
  add column if not exists phone text,
  add column if not exists privacy_accepted_at timestamptz,
  add column if not exists profile_completed_at timestamptz;

create or replace function public.save_own_membership_profile(
  p_first_name text,
  p_last_name text,
  p_city text,
  p_age integer,
  p_interests text,
  p_phone text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  actor uuid := auth.uid();
  actor_email text := lower(trim(coalesce(auth.jwt() ->> 'email', '')));
  label text := trim(both from coalesce(p_first_name, '') || ' ' || coalesce(p_last_name, ''));
begin
  if actor is null or actor_email = '' then
    raise exception 'not signed in';
  end if;

  if length(label) < 3 then
    label := split_part(actor_email, '@', 1);
  end if;

  perform public.upsert_site_member(actor_email, label, actor, 'google');

  update public.site_members
  set
    display_name = label,
    first_name = nullif(trim(p_first_name), ''),
    last_name = nullif(trim(p_last_name), ''),
    city = nullif(trim(p_city), ''),
    age = p_age,
    interests = nullif(trim(p_interests), ''),
    phone = nullif(trim(p_phone), ''),
    privacy_accepted_at = coalesce(privacy_accepted_at, now()),
    profile_completed_at = now(),
    status = 'active',
    updated_at = now()
  where auth_user_id = actor
     or email = actor_email;

  insert into public.profiles (id, display_name, updated_at)
  values (actor, label, now())
  on conflict (id) do update
  set
    display_name = excluded.display_name,
    updated_at = now();
end;
$$;

drop function if exists public.list_site_members();

create function public.list_site_members()
returns table (
  id uuid,
  display_name text,
  role text,
  email text,
  created_at timestamptz,
  source text,
  status text,
  auth_user_id uuid,
  first_name text,
  last_name text,
  city text,
  age integer,
  interests text,
  phone text,
  profile_completed_at timestamptz
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
    member.auth_user_id,
    member.first_name,
    member.last_name,
    member.city,
    member.age,
    member.interests,
    member.phone,
    member.profile_completed_at
  from public.site_members as member
  where public.is_profile_admin()
  order by member.created_at desc;
$$;

revoke all on function public.save_own_membership_profile(text, text, text, integer, text, text) from public;
revoke all on function public.list_site_members() from public;

grant execute on function public.save_own_membership_profile(text, text, text, integer, text, text) to authenticated;
grant execute on function public.list_site_members() to authenticated;

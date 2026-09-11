-- Keep whoever signs in (Google or phone) as an active site member.

create or replace function public.ensure_own_membership()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  actor uuid := auth.uid();
  actor_email text := lower(trim(coalesce(auth.jwt() ->> 'email', '')));
  actor_phone text := nullif(trim(coalesce(auth.jwt() ->> 'phone', '')), '');
  label text;
begin
  if actor is null then
    return;
  end if;

  if actor_email = '' and actor_phone is not null then
    actor_email := regexp_replace(actor_phone, '\D', '', 'g') || '@phone.goldkozmos.com';
  end if;

  if actor_email = '' then
    return;
  end if;

  select coalesce(
    (
      select profile.display_name
      from public.profiles as profile
      where profile.id = actor
    ),
    nullif(trim(coalesce(auth.jwt() -> 'user_metadata' ->> 'full_name', '')), ''),
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

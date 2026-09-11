-- Admin live roster bypasses table RLS so goldkozmos@gmail.com always sees who is on the site.

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

create or replace function public.list_live_visitors(p_since timestamptz)
returns table (
  visitor_key text,
  first_path text,
  first_referrer text,
  first_source text,
  country text,
  region text,
  city text,
  last_path text,
  last_seen_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    visitor.visitor_key,
    visitor.first_path,
    visitor.first_referrer,
    visitor.first_source,
    visitor.country,
    visitor.region,
    visitor.city,
    visitor.last_path,
    visitor.last_seen_at
  from public.site_visitors as visitor
  where
    (
      lower(coalesce(auth.jwt() ->> 'email', '')) = 'goldkozmos@gmail.com'
      or public.is_profile_admin()
    )
    and visitor.last_seen_at >= coalesce(p_since, now() - interval '2 days')
  order by visitor.last_seen_at desc
  limit 80;
$$;

revoke all on function public.list_live_visitors(timestamptz) from public;
grant execute on function public.list_live_visitors(timestamptz) to authenticated;

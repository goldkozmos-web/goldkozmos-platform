-- Admin desk: Gold's JWT email may be missing; service role must still read
-- lifetime visitors / WhatsApp. Visit chart prefers site_events (presence).

create or replace function public.is_profile_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select
    auth.role() = 'service_role'
    or exists (
      select 1
      from auth.users as auth_user
      where auth_user.id = auth.uid()
        and lower(coalesce(auth_user.email, '')) = 'goldkozmos@gmail.com'
    )
    or lower(coalesce(
      auth.jwt() ->> 'email',
      auth.jwt() -> 'user_metadata' ->> 'email',
      ''
    )) = 'goldkozmos@gmail.com'
    or coalesce(
      (
        select profile.role = 'admin'
        from public.profiles as profile
        where profile.id = auth.uid()
      ),
      false
    );
$$;

create or replace function public.admin_visit_series(p_from date, p_to date)
returns table (day date, visits bigint, uniques bigint)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_profile_admin() then
    raise exception 'not admin';
  end if;

  return query
  with pages as (
    select event.created_at, event.visitor_key::text as who
    from public.site_events as event
    where event.kind = 'page'
      and (timezone('Europe/Istanbul', event.created_at))::date between p_from and p_to
  ),
  hits as (
    select * from pages
    union all
    select event.created_at, coalesce(event.user_id::text, event.anonymous_session_id)
    from public.analytics_events as event
    where event.event_name = 'page_view'
      and (timezone('Europe/Istanbul', event.created_at))::date between p_from and p_to
      and not exists (select 1 from pages)
  )
  select
    (timezone('Europe/Istanbul', hits.created_at))::date as day,
    count(*)::bigint as visits,
    count(distinct hits.who)::bigint as uniques
  from hits
  group by 1
  order by 1;
end;
$$;

revoke all on function public.admin_visit_series(date, date) from public;
grant execute on function public.admin_visit_series(date, date) to authenticated, service_role;
grant execute on function public.is_profile_admin() to authenticated, service_role;

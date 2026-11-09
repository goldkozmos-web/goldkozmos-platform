-- Public anonymous aggregates only. Never return names, email addresses or IDs.
create or replace function public.public_membership_summary()
returns jsonb language sql stable security definer set search_path = public
as $$
with members as (
 select created_at from auth.users
 where email_confirmed_at is not null and email is not null
 and lower(email) <> 'goldkozmos@gmail.com' and deleted_at is null
), recent as (
 select to_char(created_at at time zone 'Europe/Istanbul','YYYY-MM-DD') as day,count(*)::integer as count
 from members where created_at >= now()-interval '30 days'
 group by 1 order by 1 desc limit 8
)
select jsonb_build_object('total',(select count(*) from members),
 'recent',coalesce((select jsonb_agg(jsonb_build_object('day',day,'count',count) order by day desc) from recent),'[]'::jsonb));
$$;
revoke all on function public.public_membership_summary() from public;
grant execute on function public.public_membership_summary() to anon, authenticated;

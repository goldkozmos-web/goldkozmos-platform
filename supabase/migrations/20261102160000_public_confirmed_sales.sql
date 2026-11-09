-- Only coarse categories, payment days and grouped counts leave the private ledger.
create or replace function public.public_confirmed_sales()
returns jsonb language sql stable security definer set search_path = public
as $$
with eligible as (
 select r.data->>'paidDate' as day,
 case
  when lower(r.data->>'title') like '%hafta%' then '4 haftalık çalışma'
  when lower(r.data->>'title') like '%yoğun%' or lower(r.data->>'title') like '%günlük%' then 'Yoğun çalışma'
  when lower(r.data->>'title') like '%numeroloji%' then 'Numeroloji analizi'
  when lower(r.data->>'title') like '%tarot%' then 'Tarot çalışması'
  when lower(r.data->>'title') like '%rezonans%' then 'Rezonans çalışması'
  when lower(r.data->>'title') like '%enerji%' then 'Kozmik enerji çalışması'
  else 'Birebir çalışma' end as category
 from public.panel_records r join auth.users u on u.id=r.owner_id
 where lower(u.email)='goldkozmos@gmail.com' and r.kind='works' and r.deleted_at is null
 and coalesce(r.data->>'status','') <> 'İptal'
 and case when r.data->>'fee' ~ '^[0-9]+([.][0-9]+)?$' and r.data->>'paid' ~ '^[0-9]+([.][0-9]+)?$'
   then (r.data->>'fee')::numeric > 0 and (r.data->>'paid')::numeric >= (r.data->>'fee')::numeric else false end
 and r.data->>'paidDate' ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
 and r.data->>'paidDate' between to_char((now() at time zone 'Europe/Istanbul')::date-30,'YYYY-MM-DD') and to_char(now() at time zone 'Europe/Istanbul','YYYY-MM-DD')
), grouped as (
 select day,category,count(*)::integer as count from eligible group by day,category order by day desc,category limit 12
)
select coalesce(jsonb_agg(jsonb_build_object('day',day,'category',category,'count',count) order by day desc,category),'[]'::jsonb) from grouped;
$$;
revoke all on function public.public_confirmed_sales() from public;
grant execute on function public.public_confirmed_sales() to anon, authenticated;

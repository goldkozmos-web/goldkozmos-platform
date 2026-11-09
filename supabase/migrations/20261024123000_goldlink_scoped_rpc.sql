create or replace function public.goldlink_summary() returns jsonb language plpgsql stable security definer set search_path=public as $$
begin
 if not coalesce(public.is_profile_admin(),false) then raise exception 'Yönetim oturumu gerekli'; end if;
 return (select jsonb_build_object('updatedAt',now(),'rows',coalesce(jsonb_agg(row_to_json(t)),'[]'::jsonb)) from (
 select link_id as id,count(*) as total,
 count(*) filter(where created_at >= (date_trunc('day',now() at time zone 'Europe/Istanbul') at time zone 'Europe/Istanbul')) as today,
 max(created_at) as last_click from public.goldlink_events group by link_id) t);
end; $$;
revoke all on function public.goldlink_summary() from public,anon;
grant execute on function public.goldlink_summary() to authenticated;
create or replace function public.record_goldlink_event(p_id uuid,p_link_id text) returns void language plpgsql security definer set search_path=public as $$
begin
 if p_id is null or p_link_id not in ('_view','rehber','enerji','birebir','goldbook','telegram','whatsapp','youtube') then raise exception 'Geçersiz kayıt'; end if;
 insert into public.goldlink_events(id,link_id) values(p_id,p_link_id) on conflict(id) do nothing;
end; $$;
revoke all on function public.record_goldlink_event(uuid,text) from public;
grant execute on function public.record_goldlink_event(uuid,text) to anon,authenticated;

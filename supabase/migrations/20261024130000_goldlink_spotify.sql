begin;
alter table public.goldlink_events drop constraint goldlink_events_link_id_check;
alter table public.goldlink_events add constraint goldlink_events_link_id_check check(link_id in ('_view','rehber','enerji','birebir','goldbook','telegram','whatsapp','youtube','spotify'));
create or replace function public.record_goldlink_event(p_id uuid,p_link_id text) returns void language plpgsql security definer set search_path=public as $$
begin
 if p_id is null or p_link_id not in ('_view','rehber','enerji','birebir','goldbook','telegram','whatsapp','youtube','spotify') then raise exception 'Geçersiz kayıt'; end if;
 insert into public.goldlink_events(id,link_id) values(p_id,p_link_id) on conflict(id) do nothing;
end; $$;
revoke all on function public.record_goldlink_event(uuid,text) from public;
grant execute on function public.record_goldlink_event(uuid,text) to anon,authenticated;

commit;

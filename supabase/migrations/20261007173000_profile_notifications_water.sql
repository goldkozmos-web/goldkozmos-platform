begin;
alter table public.notifications add column if not exists source_key text;
alter table public.notifications add column if not exists push_sent_at timestamptz;
create unique index if not exists notifications_source_unique on public.notifications(user_id,source_key);
create or replace function public.get_member_push_subscriptions(p_user uuid)
returns table(id uuid, endpoint text,p256dh text,auth_secret text)
language plpgsql security definer set search_path=public as $$
begin
 if auth.uid() is distinct from p_user and not public.is_profile_admin() and coalesce(auth.role(),'')<>'service_role' then raise exception 'not allowed'; end if;
 return query select s.id,s.endpoint,s.p256dh,s.auth_secret from public.push_subscriptions s where s.user_id=p_user limit 12;
end;$$;
revoke all on function public.get_member_push_subscriptions(uuid) from public,anon;
grant execute on function public.get_member_push_subscriptions(uuid) to authenticated,service_role;
create or replace function public.activity_badges_trigger() returns trigger language plpgsql security definer set search_path=public as $$
begin perform public.refresh_user_badges(new.user_id); return new; end;$$;
drop trigger if exists activity_badges_trigger on public.user_activity;
create trigger activity_badges_trigger after insert on public.user_activity for each row execute function public.activity_badges_trigger();
create or replace function public.badge_notification_trigger() returns trigger language plpgsql security definer set search_path=public as $$
begin
 insert into public.notifications(user_id,title,body,type,link,source_key)
 select new.user_id,'Yeni bir rozet kazandın',b.title,'badge','/profilim?open=badges','badge:'||new.badge_id from public.badges b where b.id=new.badge_id on conflict(user_id,source_key) do nothing;
 return new;
end;$$;
drop trigger if exists badge_notification_trigger on public.user_badges;
create trigger badge_notification_trigger after insert on public.user_badges for each row execute function public.badge_notification_trigger();
-- Confirmation of receipt stays private to the suggestion's author.
create or replace function public.suggestion_receipt_trigger() returns trigger language plpgsql security definer set search_path=public as $$
begin
 if new.post_id='gk-suggestion' then
 insert into public.notifications(user_id,title,body,type,link,source_key) values(new.user_id,'Önerin bize ulaştı','Fikrini bizimle paylaştığın için teşekkür ederiz. Önerin yönetim paneline kaydedildi.','suggestion','/profilim?open=suggest','suggestion:'||new.id::text) on conflict(user_id,source_key) do nothing;
 end if; return new;
end;$$;
drop trigger if exists suggestion_receipt_trigger on public.comments;
create trigger suggestion_receipt_trigger after insert on public.comments for each row execute function public.suggestion_receipt_trigger();
create table if not exists public.water_days(user_id uuid not null references public.profiles(id) on delete cascade,day date not null,glasses smallint not null default 0 check(glasses between 0 and 8),updated_at timestamptz not null default now(),primary key(user_id,day));
create table if not exists public.water_reminder_settings(user_id uuid primary key references public.profiles(id) on delete cascade,enabled boolean not null default false,interval_minutes int not null default 120 check(interval_minutes in(60,90,120,180)),next_due_at timestamptz,updated_at timestamptz not null default now());
alter table public.water_days enable row level security;
alter table public.water_reminder_settings enable row level security;
create policy water_days_own on public.water_days for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
create policy water_reminder_own on public.water_reminder_settings for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
revoke all on public.water_days,public.water_reminder_settings from anon;
grant select,insert,update on public.water_days,public.water_reminder_settings to authenticated;
alter table public.user_activity drop constraint if exists user_activity_kind_check;
alter table public.user_activity add constraint user_activity_kind_check check(kind in('goldmind_complete','goldbook_chapter','emotion_journal','daily_action','growth_series','reminder_complete','journey_day','archetype','favorite_add','water_goal'));
create unique index if not exists water_activity_once on public.user_activity(user_id,(payload->>'day')) where kind='water_goal';
create or replace function public.water_goal_trigger() returns trigger language plpgsql security definer set search_path=public as $$
begin
 if new.glasses=8 then
 insert into public.user_activity(user_id,kind,title,href,payload) values(new.user_id,'water_goal','Günlük su hedefi tamamlandı','/profilim?open=water',jsonb_build_object('day',new.day::text)) on conflict do nothing;
 insert into public.notifications(user_id,title,body,type,link,source_key) values(new.user_id,'Bugünkü su hedefin tamamlandı','Kendine ayırdığın bu küçük molalar için teşekkürler. Günlük takibin kaydedildi.','water','/profilim?open=water','water-goal:'||new.day::text) on conflict(user_id,source_key) do nothing;
 end if;return new;
end;$$;
create trigger water_goal_trigger after insert or update on public.water_days for each row execute function public.water_goal_trigger();
create or replace function public.materialize_due_reminder_notifications() returns integer language plpgsql security definer set search_path=public as $$
declare inserted int:=0;begin
 if auth.uid() is null then return 0;end if;
 insert into public.notifications(user_id,title,body,type,link,source_key)
 select r.user_id,'Hatırlatma zamanı',r.title,'reminder','/profilim?open=todos','reminder:'||r.id::text||':'||r.due_on::text||':'||coalesce(r.due_time::text,'09:00:00') from public.reminders r
 where r.user_id=auth.uid() and r.completed_at is null and r.due_on is not null and ((r.due_on+coalesce(r.due_time,'09:00'::time)) at time zone 'Europe/Istanbul')<=now()
 on conflict(user_id,source_key) do nothing;
 get diagnostics inserted=row_count;return inserted;
end;$$;
revoke all on function public.activity_badges_trigger(),public.badge_notification_trigger(),public.suggestion_receipt_trigger(),public.water_goal_trigger() from public,anon,authenticated;
notify pgrst,'reload schema';
commit;

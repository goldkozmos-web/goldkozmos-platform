begin;
drop policy if exists push_subscriptions_update_own on public.push_subscriptions;
create policy push_subscriptions_update_own on public.push_subscriptions for update to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
grant update on public.push_subscriptions to authenticated;
create or replace function public.materialize_water_reminder_notifications() returns integer language plpgsql security definer set search_path=public as $$
declare prefs public.water_reminder_settings; n timestamptz; count_water int; begin
 if auth.uid() is null then return 0;end if;
 select * into prefs from public.water_reminder_settings where user_id=auth.uid() and enabled and next_due_at<=now() for update;
 if prefs.user_id is null then return 0;end if;
 select glasses into count_water from public.water_days where user_id=auth.uid() and day=public.istanbul_today();
 n=now()+make_interval(mins=>prefs.interval_minutes);
 if (timezone('Europe/Istanbul',n))::time>='21:00'::time then n=((timezone('Europe/Istanbul',now()))::date+1+'09:00'::time) at time zone 'Europe/Istanbul';end if;
 if (timezone('Europe/Istanbul',now()))::time<'09:00'::time then n=(public.istanbul_today()+'09:00'::time) at time zone 'Europe/Istanbul';end if;
 update public.water_reminder_settings set next_due_at=n where user_id=auth.uid();
 if coalesce(count_water,0)>=8 or (timezone('Europe/Istanbul',now()))::time not between '09:00'::time and '20:59:59'::time then return 0;end if;
 insert into public.notifications(user_id,title,body,type,link,source_key) values(auth.uid(),'Küçük bir su molası','Bir bardak su içmek için kendine küçük bir mola ver. Günlük takibini Profilim’den güncelleyebilirsin.','water','/profilim?open=water','water-reminder:'||auth.uid()::text||':'||floor(extract(epoch from prefs.next_due_at))::text) on conflict(user_id,source_key) do nothing;
 return 1;
end;$$;
revoke all on function public.materialize_water_reminder_notifications() from public,anon;
grant execute on function public.materialize_water_reminder_notifications() to authenticated;
notify pgrst,'reload schema';commit;
alter table public.notifications add column if not exists push_claimed_at timestamptz;
create or replace function public.claim_pending_member_notifications() returns table(id uuid,title text,body text,link text) language plpgsql security definer set search_path=public as $$
begin
 if auth.uid() is null then return;end if;
 return query update public.notifications n set push_claimed_at=now() where n.id in(
 select x.id from public.notifications x where x.user_id=auth.uid() and x.push_sent_at is null and x.created_at>now()-interval '1 day' and (x.push_claimed_at is null or x.push_claimed_at<now()-interval '2 minutes') order by x.created_at limit 12 for update skip locked
 ) returning n.id,n.title,n.body,n.link;
end;$$;
revoke all on function public.claim_pending_member_notifications() from public,anon;
grant execute on function public.claim_pending_member_notifications() to authenticated;
create or replace function public.materialize_due_reminder_notifications() returns integer language plpgsql security definer set search_path=public as $$
declare r public.reminders;inserted int:=0;next_day date;begin
 if auth.uid() is null then return 0;end if;
 for r in select * from public.reminders where user_id=auth.uid() and completed_at is null and due_on is not null and ((due_on+coalesce(due_time,'09:00'::time)) at time zone 'Europe/Istanbul')<=now() for update skip locked loop
 insert into public.notifications(user_id,title,body,type,link,source_key) values(r.user_id,'Hatırlatma zamanı',r.title,'reminder','/profilim?open=todos','reminder:'||r.id::text||':'||r.due_on::text||':'||coalesce(r.due_time::text,'09:00:00')) on conflict(user_id,source_key) do nothing;
 inserted=inserted+1;
 if r.repeat_rule<>'none' then
 next_day=r.due_on;
 loop
 if r.repeat_rule='daily' then next_day=next_day+1;elsif r.repeat_rule='weekly' then next_day=next_day+7;else next_day=(next_day+interval '1 month')::date;end if;
 exit when ((next_day+coalesce(r.due_time,'09:00'::time)) at time zone 'Europe/Istanbul')>now();
 end loop;
 update public.reminders set due_on=next_day,notified_at=null where public.reminders.id=r.id;
 end if;
 end loop;return inserted;
end;$$;
notify pgrst,'reload schema';

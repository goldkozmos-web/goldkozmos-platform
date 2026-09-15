-- Test history, water schedule modes, GoldAct uniqueness, profiles trigger, RLS.

alter table public.user_test_results
  drop constraint if exists user_test_results_user_id_test_kind_key;

create index if not exists user_test_results_user_created_idx
  on public.user_test_results (user_id, created_at desc);

alter table public.water_reminder_settings
  add column if not exists schedule_mode text not null default 'count';

alter table public.water_reminder_settings
  drop constraint if exists water_reminder_settings_schedule_mode_check;

alter table public.water_reminder_settings
  add constraint water_reminder_settings_schedule_mode_check
  check (schedule_mode in ('count', 'interval', 'custom'));

delete from public.user_daily_actions a
using public.user_daily_actions b
where a.ctid > b.ctid
  and a.user_id = b.user_id
  and a.action_id = b.action_id
  and a.assigned_on = b.assigned_on;

create unique index if not exists user_daily_actions_user_action_day
  on public.user_daily_actions (user_id, action_id, assigned_on);

alter table public.push_subscriptions
  add column if not exists updated_at timestamptz not null default now();

drop policy if exists push_subscriptions_update_own on public.push_subscriptions;
create policy push_subscriptions_update_own
  on public.push_subscriptions
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

grant select, insert, update, delete on table public.push_subscriptions to authenticated;

-- Profiles: admin can read all, members only own.
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
  on public.profiles
  for select to authenticated
  using (id = auth.uid());

drop policy if exists profiles_select_admin on public.profiles;
create policy profiles_select_admin
  on public.profiles
  for select to authenticated
  using (public.is_profile_admin());

insert into public.profiles (id, display_name, avatar_url, role, is_admin)
select
  u.id,
  coalesce(
    nullif(trim(u.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(u.raw_user_meta_data->>'name'), ''),
    nullif(trim(u.raw_user_meta_data->>'display_name'), ''),
    nullif(split_part(coalesce(u.email, ''), '@', 1), ''),
    'GoldKozmos'
  ),
  coalesce(
    nullif(u.raw_user_meta_data->>'avatar_url', ''),
    nullif(u.raw_user_meta_data->>'picture', '')
  ),
  case when lower(coalesce(u.email, '')) = 'goldkozmos@gmail.com' then 'admin' else 'user' end,
  lower(coalesce(u.email, '')) = 'goldkozmos@gmail.com'
from auth.users u
on conflict (id) do nothing;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role text := 'user';
  label text;
begin
  if lower(coalesce(new.email, '')) = 'goldkozmos@gmail.com' then
    assigned_role := 'admin';
  end if;

  label := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
    nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
    'GoldKozmos'
  );

  insert into public.profiles (id, display_name, avatar_url, role, is_admin)
  values (
    new.id,
    label,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'avatar_url', ''),
      nullif(new.raw_user_meta_data ->> 'picture', '')
    ),
    assigned_role,
    assigned_role = 'admin'
  )
  on conflict (id) do update
  set
    display_name = coalesce(nullif(trim(public.profiles.display_name), ''), excluded.display_name),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
    role = case
      when public.profiles.role = 'admin' then public.profiles.role
      else excluded.role
    end,
    is_admin = public.profiles.is_admin or excluded.is_admin;

  begin
    perform public.upsert_site_member(new.email, label, new.id, 'google');
  exception
    when undefined_function then
      null;
  end;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

grant execute on function public.record_site_presence(
  text, text, text, text, text, text, text, text, text, boolean
) to anon, authenticated, service_role;

grant execute on function public.record_analytics_event(text, text, uuid, text, jsonb)
  to anon, authenticated, service_role;

do $$
begin
  begin
    alter publication supabase_realtime add table public.user_activity;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.suggestions;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.analytics_events;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.profiles;
  exception when duplicate_object then null;
  end;
end;
$$;

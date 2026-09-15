-- Platform fixes: suggestions, tests, success journal, water, analytics,
-- GoldAct XP uniqueness, member listing, realtime.

-- ---------------------------------------------------------------------------
-- Suggestions
-- ---------------------------------------------------------------------------
create table if not exists public.suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now(),
  constraint suggestions_subject_len check (char_length(trim(subject)) between 2 and 80),
  constraint suggestions_message_len check (char_length(trim(message)) between 8 and 4000)
);

alter table public.suggestions enable row level security;

drop policy if exists suggestions_select_own on public.suggestions;
create policy suggestions_select_own
  on public.suggestions for select to authenticated
  using (user_id = auth.uid() or public.is_profile_admin());

drop policy if exists suggestions_insert_own on public.suggestions;
create policy suggestions_insert_own
  on public.suggestions for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists suggestions_update_admin on public.suggestions;
create policy suggestions_update_admin
  on public.suggestions for update to authenticated
  using (public.is_profile_admin())
  with check (public.is_profile_admin());

create index if not exists suggestions_created_idx on public.suggestions (created_at desc);

-- ---------------------------------------------------------------------------
-- Self-knowledge tests
-- ---------------------------------------------------------------------------
create table if not exists public.user_test_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  test_kind text not null check (test_kind in ('archetype', 'character', 'shadow', 'relationship')),
  result jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, test_kind)
);

alter table public.user_test_results enable row level security;

drop policy if exists user_test_results_own on public.user_test_results;
create policy user_test_results_own
  on public.user_test_results for all to authenticated
  using (user_id = auth.uid() or public.is_profile_admin())
  with check (user_id = auth.uid());

alter table public.user_activity drop constraint if exists user_activity_kind_check;
alter table public.user_activity
  add constraint user_activity_kind_check check (
    kind in (
      'goldmind_complete',
      'goldbook_chapter',
      'emotion_journal',
      'daily_action',
      'growth_series',
      'reminder_complete',
      'journey_day',
      'archetype',
      'favorite_add',
      'test_complete',
      'success_journal'
    )
  );

-- ---------------------------------------------------------------------------
-- Success journal
-- ---------------------------------------------------------------------------
create table if not exists public.success_journal (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  achieved text not null,
  how text not null default '',
  appreciate text not null default '',
  note text not null default '',
  logged_on date not null default ((timezone('Europe/Istanbul', now()))::date),
  created_at timestamptz not null default now(),
  constraint success_journal_achieved_len check (char_length(trim(achieved)) between 2 and 400)
);

alter table public.success_journal enable row level security;

drop policy if exists success_journal_own on public.success_journal;
create policy success_journal_own
  on public.success_journal for all to authenticated
  using (user_id = auth.uid() or public.is_profile_admin())
  with check (user_id = auth.uid());

create index if not exists success_journal_user_idx on public.success_journal (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Water reminders
-- ---------------------------------------------------------------------------
create table if not exists public.water_reminder_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  daily_goal int not null default 8 check (daily_goal between 1 and 24),
  start_time time not null default '09:00',
  end_time time not null default '21:00',
  reminders_per_day int not null default 6 check (reminders_per_day between 1 and 24),
  interval_minutes int,
  enabled boolean not null default false,
  timezone text not null default 'Europe/Istanbul',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.water_reminder_times (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  time time not null,
  unique (user_id, time)
);

create table if not exists public.water_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  logged_at timestamptz not null default now(),
  amount int not null default 1 check (amount > 0)
);

create table if not exists public.water_reminder_sent (
  user_id uuid not null references auth.users (id) on delete cascade,
  sent_on date not null,
  reminder_time time not null,
  primary key (user_id, sent_on, reminder_time)
);

alter table public.water_reminder_settings enable row level security;
alter table public.water_reminder_times enable row level security;
alter table public.water_logs enable row level security;
alter table public.water_reminder_sent enable row level security;

drop policy if exists water_settings_own on public.water_reminder_settings;
create policy water_settings_own
  on public.water_reminder_settings for all to authenticated
  using (user_id = auth.uid() or public.is_profile_admin())
  with check (user_id = auth.uid());

drop policy if exists water_times_own on public.water_reminder_times;
create policy water_times_own
  on public.water_reminder_times for all to authenticated
  using (user_id = auth.uid() or public.is_profile_admin())
  with check (user_id = auth.uid());

drop policy if exists water_logs_own on public.water_logs;
create policy water_logs_own
  on public.water_logs for all to authenticated
  using (user_id = auth.uid() or public.is_profile_admin())
  with check (user_id = auth.uid());

drop policy if exists water_sent_own on public.water_reminder_sent;
create policy water_sent_own
  on public.water_reminder_sent for all to authenticated
  using (user_id = auth.uid() or public.is_profile_admin())
  with check (user_id = auth.uid() or public.is_profile_admin());

-- ---------------------------------------------------------------------------
-- Analytics events
-- ---------------------------------------------------------------------------
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  anonymous_session_id text,
  event_name text not null,
  path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_idx on public.analytics_events (created_at desc);
create index if not exists analytics_events_name_idx on public.analytics_events (event_name, created_at desc);

alter table public.analytics_events enable row level security;

drop policy if exists analytics_events_insert on public.analytics_events;
create policy analytics_events_insert
  on public.analytics_events for insert to anon, authenticated
  with check (true);

drop policy if exists analytics_events_select_admin on public.analytics_events;
create policy analytics_events_select_admin
  on public.analytics_events for select to authenticated
  using (public.is_profile_admin());

create or replace function public.record_analytics_event(
  p_event_name text,
  p_path text default null,
  p_user_id uuid default null,
  p_anonymous_session_id text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_uid uuid := coalesce(p_user_id, auth.uid());
begin
  if p_event_name = 'page_view' and coalesce(p_path, '') <> '' then
    if exists (
      select 1
      from public.analytics_events e
      where e.event_name = 'page_view'
        and e.path = p_path
        and e.created_at > now() - interval '4 seconds'
        and (
          (v_uid is not null and e.user_id = v_uid)
          or (
            nullif(trim(p_anonymous_session_id), '') is not null
            and e.anonymous_session_id = trim(p_anonymous_session_id)
          )
        )
    ) then
      return null;
    end if;
  end if;

  insert into public.analytics_events (user_id, anonymous_session_id, event_name, path, metadata)
  values (
    v_uid,
    nullif(trim(p_anonymous_session_id), ''),
    p_event_name,
    p_path,
    coalesce(p_metadata, '{}'::jsonb)
  )
  returning id into v_id;
  return v_id;
end;
$$;

revoke all on function public.record_analytics_event(text, text, uuid, text, jsonb) from public;
grant execute on function public.record_analytics_event(text, text, uuid, text, jsonb) to anon, authenticated, service_role;

alter table public.site_visitors
  add column if not exists user_id uuid references auth.users (id) on delete set null;

create or replace function public.record_site_presence(
  p_visitor_key text,
  p_kind text,
  p_path text,
  p_referrer text,
  p_source text,
  p_href text,
  p_country text,
  p_region text,
  p_city text,
  p_heartbeat boolean
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event text;
begin
  if p_visitor_key is null or length(trim(p_visitor_key)) < 8 then
    return;
  end if;

  insert into public.site_visitors as visitor (
    visitor_key,
    first_path,
    first_referrer,
    first_source,
    country,
    region,
    city,
    last_path,
    last_seen_at,
    user_id
  )
  values (
    trim(p_visitor_key),
    coalesce(nullif(trim(p_path), ''), '/'),
    nullif(trim(p_referrer), ''),
    coalesce(nullif(trim(p_source), ''), 'Direkt'),
    nullif(trim(p_country), ''),
    nullif(trim(p_region), ''),
    nullif(trim(p_city), ''),
    coalesce(nullif(trim(p_path), ''), '/'),
    now(),
    auth.uid()
  )
  on conflict (visitor_key) do update
  set
    last_path = excluded.last_path,
    last_seen_at = now(),
    country = coalesce(excluded.country, visitor.country),
    region = coalesce(excluded.region, visitor.region),
    city = coalesce(excluded.city, visitor.city),
    user_id = coalesce(excluded.user_id, visitor.user_id);

  if coalesce(p_heartbeat, false) = false
     and p_kind in ('page', 'whatsapp', 'purchase', 'appointment') then
    insert into public.site_events (
      visitor_key,
      kind,
      path,
      referrer,
      source,
      href,
      country,
      region,
      city
    )
    values (
      trim(p_visitor_key),
      p_kind,
      coalesce(nullif(trim(p_path), ''), '/'),
      nullif(trim(p_referrer), ''),
      coalesce(nullif(trim(p_source), ''), 'Direkt'),
      nullif(trim(p_href), ''),
      nullif(trim(p_country), ''),
      nullif(trim(p_region), ''),
      nullif(trim(p_city), '')
    );

    v_event := case p_kind
      when 'page' then 'page_view'
      when 'whatsapp' then 'whatsapp_click'
      when 'appointment' then 'booking_intent'
      when 'purchase' then 'shopier_click'
      else p_kind
    end;

    perform public.record_analytics_event(
      v_event,
      coalesce(nullif(trim(p_path), ''), '/'),
      auth.uid(),
      trim(p_visitor_key),
      jsonb_build_object('href', nullif(trim(p_href), ''), 'source', p_source)
    );
  end if;
end;
$$;

-- Visit series from analytics_events (page_view)
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
  select
    (timezone('Europe/Istanbul', event.created_at))::date as day,
    count(*)::bigint as visits,
    count(distinct coalesce(event.user_id::text, event.anonymous_session_id))::bigint as uniques
  from public.analytics_events as event
  where event.event_name = 'page_view'
    and (timezone('Europe/Istanbul', event.created_at))::date between p_from and p_to
  group by 1
  order by 1;
end;
$$;

revoke all on function public.admin_visit_series(date, date) from public;
grant execute on function public.admin_visit_series(date, date) to authenticated;

-- ---------------------------------------------------------------------------
-- GoldAct: one XP / activity per Istanbul day
-- ---------------------------------------------------------------------------
delete from public.user_activity a
using public.user_activity b
where a.kind = 'daily_action'
  and b.kind = 'daily_action'
  and a.user_id = b.user_id
  and (timezone('Europe/Istanbul', a.created_at))::date = (timezone('Europe/Istanbul', b.created_at))::date
  and a.created_at > b.created_at;

create unique index if not exists user_activity_daily_action_day
  on public.user_activity (
    user_id,
    ((timezone('Europe/Istanbul', created_at))::date)
  )
  where kind = 'daily_action';

create or replace function public.complete_today_daily_action()
returns table (
  id uuid,
  title text,
  completed_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := public.istanbul_today();
  uid uuid := auth.uid();
  row_id uuid;
  action_id uuid;
  action_title text;
  done_at timestamptz;
  v_inserted boolean := false;
begin
  if uid is null then
    raise exception 'not authenticated';
  end if;

  perform public.get_today_daily_action();

  select assignment.id, assignment.action_id, action.title, assignment.completed_at
  into row_id, action_id, action_title, done_at
  from public.user_daily_actions as assignment
  join public.daily_actions as action on action.id = assignment.action_id
  where assignment.user_id = uid
    and assignment.assigned_on = today;

  if row_id is null then
    raise exception 'no action';
  end if;

  if done_at is not null then
    return query
    select assignment.action_id, action_title, assignment.completed_at
    from public.user_daily_actions as assignment
    where assignment.id = row_id;
    return;
  end if;

  update public.user_daily_actions
  set completed_at = now()
  where id = row_id
    and completed_at is null
  returning user_daily_actions.completed_at into done_at;

  begin
    insert into public.user_activity (user_id, kind, title, href, payload)
    values (
      uid,
      'daily_action',
      action_title,
      '/',
      jsonb_build_object('action_id', action_id, 'assigned_on', today)
    );
    v_inserted := true;
  exception
    when unique_violation then
      v_inserted := false;
  end;

  if v_inserted then
    perform public.record_analytics_event(
      'daily_action_complete',
      '/',
      uid,
      null,
      jsonb_build_object('action_id', action_id)
    );
  end if;

  perform public.refresh_user_badges(uid);

  return query
  select assignment.action_id, action_title, assignment.completed_at
  from public.user_daily_actions as assignment
  where assignment.id = row_id;
end;
$$;

revoke all on function public.complete_today_daily_action() from public;
grant execute on function public.complete_today_daily_action() to authenticated;

-- ---------------------------------------------------------------------------
-- Profiles backfill + admin member list from profiles
-- ---------------------------------------------------------------------------
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

create or replace function public.admin_list_members()
returns table (
  id uuid,
  display_name text,
  email text,
  avatar_url text,
  role text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  last_active_at timestamptz
)
language sql
security definer
set search_path = public, auth
as $$
  select
    p.id,
    p.display_name,
    u.email::text,
    coalesce(
      p.avatar_url,
      u.raw_user_meta_data->>'avatar_url',
      u.raw_user_meta_data->>'picture'
    ) as avatar_url,
    coalesce(p.role, 'user') as role,
    coalesce(p.created_at, u.created_at) as created_at,
    u.last_sign_in_at,
    v.last_seen_at as last_active_at
  from public.profiles p
  left join auth.users u on u.id = p.id
  left join lateral (
    select s.last_seen_at
    from public.site_visitors s
    where s.user_id = p.id
    order by s.last_seen_at desc nulls last
    limit 1
  ) v on true
  where public.is_profile_admin()
  order by coalesce(p.created_at, u.created_at) desc nulls last;
$$;

revoke all on function public.admin_list_members() from public;
grant execute on function public.admin_list_members() to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Realtime
-- ---------------------------------------------------------------------------
do $$
begin
  begin
    alter publication supabase_realtime add table public.profiles;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.analytics_events;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.suggestions;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.appointments;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.notifications;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.site_events;
  exception when duplicate_object then null;
  end;
end $$;

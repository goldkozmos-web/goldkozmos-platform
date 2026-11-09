begin;
-- Daily practice: emotion journal, messages, actions, activity, notifications, reminders.
-- Uses existing auth.users / public.profiles. No second user system.

create or replace function public.istanbul_today()
returns date
language sql
stable
as $$
  select (timezone('Europe/Istanbul', now()))::date;
$$;

revoke all on function public.istanbul_today() from public;
grant execute on function public.istanbul_today() to authenticated, anon;

-- Catalog: one row per reusable daily message. Scale to 800+ without client fake data.
create table if not exists public.daily_messages (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint daily_messages_body_len check (
    char_length(trim(body)) >= 8 and char_length(body) <= 600
  )
);

create index if not exists daily_messages_active_idx
  on public.daily_messages (is_active, created_at);

create table if not exists public.user_daily_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  message_id uuid not null references public.daily_messages (id) on delete restrict,
  assigned_on date not null,
  created_at timestamptz not null default now(),
  constraint user_daily_messages_once unique (user_id, assigned_on)
);

create index if not exists user_daily_messages_user_day_idx
  on public.user_daily_messages (user_id, assigned_on desc);

create table if not exists public.daily_actions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  category text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint daily_actions_category_check check (
    category in (
      'kisisel_gelisim',
      'sosyal_bag',
      'cevre',
      'oz_bakim',
      'farkindalik',
      'kucuk_iyilik'
    )
  ),
  constraint daily_actions_title_len check (
    char_length(trim(title)) >= 4 and char_length(title) <= 120
  )
);

create index if not exists daily_actions_active_idx
  on public.daily_actions (is_active, category);

create table if not exists public.user_daily_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  action_id uuid not null references public.daily_actions (id) on delete restrict,
  assigned_on date not null,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint user_daily_actions_once unique (user_id, assigned_on)
);

create index if not exists user_daily_actions_user_day_idx
  on public.user_daily_actions (user_id, assigned_on desc);

create table if not exists public.emotion_journal (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  primary_emotion text not null,
  secondary_emotion text not null default '',
  intensity smallint not null,
  trigger_text text not null default '',
  body_area text not null default '',
  need_text text not null default '',
  note text not null default '',
  created_at timestamptz not null default now(),
  constraint emotion_journal_intensity_check check (intensity between 1 and 10),
  constraint emotion_journal_primary_len check (
    char_length(trim(primary_emotion)) >= 2 and char_length(primary_emotion) <= 40
  )
);

create index if not exists emotion_journal_user_created_idx
  on public.emotion_journal (user_id, created_at desc);

create table if not exists public.user_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null,
  title text not null,
  href text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint user_activity_kind_check check (
    kind in (
      'goldmind_complete',
      'goldbook_chapter',
      'emotion_journal',
      'daily_action',
      'growth_series',
      'reminder_complete'
    )
  )
);

create index if not exists user_activity_user_created_idx
  on public.user_activity (user_id, created_at desc);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text not null,
  type text not null default 'system',
  link text,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles (id) on delete set null,
  constraint notifications_title_len check (
    char_length(trim(title)) >= 2 and char_length(title) <= 80
  ),
  constraint notifications_body_len check (
    char_length(trim(body)) >= 2 and char_length(body) <= 2000
  )
);

create index if not exists notifications_user_created_idx
  on public.notifications (user_id, created_at desc);

create index if not exists notifications_user_unread_idx
  on public.notifications (user_id)
  where is_read = false;

create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  note text not null default '',
  due_on date,
  due_time time,
  repeat_rule text not null default 'none',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint reminders_title_len check (
    char_length(trim(title)) >= 2 and char_length(title) <= 80
  ),
  constraint reminders_repeat_check check (
    repeat_rule in ('none', 'daily', 'weekly', 'monthly')
  )
);

create index if not exists reminders_user_due_idx
  on public.reminders (user_id, due_on, created_at desc);

-- Future Web Push: store subscriptions only. Do not send from this migration.
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  endpoint text not null,
  p256dh text not null default '',
  auth_secret text not null default '',
  user_agent text,
  created_at timestamptz not null default now(),
  constraint push_subscriptions_endpoint_unique unique (endpoint)
);

create index if not exists push_subscriptions_user_idx
  on public.push_subscriptions (user_id);

alter table public.daily_messages enable row level security;
alter table public.user_daily_messages enable row level security;
alter table public.daily_actions enable row level security;
alter table public.user_daily_actions enable row level security;
alter table public.emotion_journal enable row level security;
alter table public.user_activity enable row level security;
alter table public.notifications enable row level security;
alter table public.reminders enable row level security;
alter table public.push_subscriptions enable row level security;

-- Catalogs: members read active rows; admins manage.
drop policy if exists daily_messages_select_active on public.daily_messages;
create policy daily_messages_select_active
  on public.daily_messages
  for select
  to authenticated
  using (is_active = true or public.is_profile_admin());

drop policy if exists daily_messages_admin_write on public.daily_messages;
create policy daily_messages_admin_write
  on public.daily_messages
  for all
  to authenticated
  using (public.is_profile_admin())
  with check (public.is_profile_admin());

drop policy if exists daily_actions_select_active on public.daily_actions;
create policy daily_actions_select_active
  on public.daily_actions
  for select
  to authenticated
  using (is_active = true or public.is_profile_admin());

drop policy if exists daily_actions_admin_write on public.daily_actions;
create policy daily_actions_admin_write
  on public.daily_actions
  for all
  to authenticated
  using (public.is_profile_admin())
  with check (public.is_profile_admin());

drop policy if exists user_daily_messages_select_own on public.user_daily_messages;
create policy user_daily_messages_select_own
  on public.user_daily_messages
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists user_daily_actions_select_own on public.user_daily_actions;
create policy user_daily_actions_select_own
  on public.user_daily_actions
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists emotion_journal_select_own on public.emotion_journal;
create policy emotion_journal_select_own
  on public.emotion_journal
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists emotion_journal_insert_own on public.emotion_journal;
create policy emotion_journal_insert_own
  on public.emotion_journal
  for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists emotion_journal_update_own on public.emotion_journal;
create policy emotion_journal_update_own
  on public.emotion_journal
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists emotion_journal_delete_own on public.emotion_journal;
create policy emotion_journal_delete_own
  on public.emotion_journal
  for delete
  to authenticated
  using (user_id = auth.uid());

drop policy if exists user_activity_select_own on public.user_activity;
create policy user_activity_select_own
  on public.user_activity
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists user_activity_insert_own on public.user_activity;
create policy user_activity_insert_own
  on public.user_activity
  for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists notifications_select_own on public.notifications;
create policy notifications_select_own
  on public.notifications
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists notifications_insert_admin on public.notifications;
create policy notifications_insert_admin
  on public.notifications
  for insert
  to authenticated
  with check (public.is_profile_admin());

drop policy if exists notifications_update_own on public.notifications;
create policy notifications_update_own
  on public.notifications
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists reminders_select_own on public.reminders;
create policy reminders_select_own
  on public.reminders
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists reminders_insert_own on public.reminders;
create policy reminders_insert_own
  on public.reminders
  for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists reminders_update_own on public.reminders;
create policy reminders_update_own
  on public.reminders
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists reminders_delete_own on public.reminders;
create policy reminders_delete_own
  on public.reminders
  for delete
  to authenticated
  using (user_id = auth.uid());

drop policy if exists push_subscriptions_select_own on public.push_subscriptions;
create policy push_subscriptions_select_own
  on public.push_subscriptions
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists push_subscriptions_insert_own on public.push_subscriptions;
create policy push_subscriptions_insert_own
  on public.push_subscriptions
  for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists push_subscriptions_delete_own on public.push_subscriptions;
create policy push_subscriptions_delete_own
  on public.push_subscriptions
  for delete
  to authenticated
  using (user_id = auth.uid());

grant select on table public.daily_messages to authenticated;
grant select, insert, update, delete on table public.daily_messages to authenticated;
grant select on table public.daily_actions to authenticated;
grant select, insert, update, delete on table public.daily_actions to authenticated;
grant select on table public.user_daily_messages to authenticated;
grant select on table public.user_daily_actions to authenticated;
grant select, insert, update, delete on table public.emotion_journal to authenticated;
grant select, insert on table public.user_activity to authenticated;
grant select, insert, update on table public.notifications to authenticated;
grant select, insert, update, delete on table public.reminders to authenticated;
grant select, insert, delete on table public.push_subscriptions to authenticated;

create or replace function public.record_user_activity(
  p_kind text,
  p_title text,
  p_href text default null,
  p_payload jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  activity_id uuid;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  insert into public.user_activity (user_id, kind, title, href, payload)
  values (auth.uid(), p_kind, p_title, p_href, coalesce(p_payload, '{}'::jsonb))
  returning id into activity_id;

  return activity_id;
end;
$$;

revoke all on function public.record_user_activity(text, text, text, jsonb) from public;
grant execute on function public.record_user_activity(text, text, text, jsonb) to authenticated;

create or replace function public.emotion_journal_after_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_activity (user_id, kind, title, payload)
  values (
    new.user_id,
    'emotion_journal',
    'Duygu günlüğü kaydı',
    jsonb_build_object(
      'journal_id', new.id,
      'primary_emotion', new.primary_emotion,
      'intensity', new.intensity
    )
  );
  return new;
end;
$$;

drop trigger if exists emotion_journal_after_insert on public.emotion_journal;
create trigger emotion_journal_after_insert
  after insert on public.emotion_journal
  for each row
  execute procedure public.emotion_journal_after_insert();

create or replace function public.get_today_daily_message()
returns table (
  id uuid,
  body text,
  assigned_on date
)
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := public.istanbul_today();
  uid uuid := auth.uid();
  chosen uuid;
  total int;
begin
  if uid is null then
    return;
  end if;

  select assignment.message_id
  into chosen
  from public.user_daily_messages as assignment
  where assignment.user_id = uid
    and assignment.assigned_on = today;

  if chosen is null then
    select count(*) into total
    from public.daily_messages
    where is_active = true;

    if coalesce(total, 0) = 0 then
      return;
    end if;

    select message.id
    into chosen
    from public.daily_messages as message
    where message.is_active = true
    order by md5(uid::text || today::text || message.id::text)
    limit 1;

    insert into public.user_daily_messages (user_id, message_id, assigned_on)
    values (uid, chosen, today)
    on conflict (user_id, assigned_on) do nothing;

    select assignment.message_id
    into chosen
    from public.user_daily_messages as assignment
    where assignment.user_id = uid
      and assignment.assigned_on = today;
  end if;

  return query
  select message.id, message.body, today
  from public.daily_messages as message
  where message.id = chosen;
end;
$$;

revoke all on function public.get_today_daily_message() from public;
grant execute on function public.get_today_daily_message() to authenticated;

create or replace function public.get_today_daily_action()
returns table (
  id uuid,
  title text,
  body text,
  category text,
  assigned_on date,
  completed_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := public.istanbul_today();
  uid uuid := auth.uid();
  chosen uuid;
  total int;
begin
  if uid is null then
    return;
  end if;

  select assignment.action_id
  into chosen
  from public.user_daily_actions as assignment
  where assignment.user_id = uid
    and assignment.assigned_on = today;

  if chosen is null then
    select count(*) into total
    from public.daily_actions
    where is_active = true;

    if coalesce(total, 0) = 0 then
      return;
    end if;

    select action.id
    into chosen
    from public.daily_actions as action
    where action.is_active = true
    order by md5(uid::text || today::text || action.id::text)
    limit 1;

    insert into public.user_daily_actions (user_id, action_id, assigned_on)
    values (uid, chosen, today)
    on conflict (user_id, assigned_on) do nothing;

    select assignment.action_id
    into chosen
    from public.user_daily_actions as assignment
    where assignment.user_id = uid
      and assignment.assigned_on = today;
  end if;

  return query
  select
    action.id,
    action.title,
    action.body,
    action.category,
    today,
    assignment.completed_at
  from public.daily_actions as action
  join public.user_daily_actions as assignment
    on assignment.action_id = action.id
   and assignment.user_id = uid
   and assignment.assigned_on = today
  where action.id = chosen;
end;
$$;

revoke all on function public.get_today_daily_action() from public;
grant execute on function public.get_today_daily_action() to authenticated;

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
  action_title text;
  done_at timestamptz;
begin
  if uid is null then
    raise exception 'not authenticated';
  end if;

  perform public.get_today_daily_action();

  select assignment.id, action.title, assignment.completed_at
  into row_id, action_title, done_at
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

  insert into public.user_activity (user_id, kind, title, payload)
  values (
    uid,
    'daily_action',
    'GoldKozmos eylemi tamamlandı',
    jsonb_build_object('action_title', action_title)
  );

  return query
  select assignment.action_id, action_title, assignment.completed_at
  from public.user_daily_actions as assignment
  where assignment.id = row_id;
end;
$$;

revoke all on function public.complete_today_daily_action() from public;
grant execute on function public.complete_today_daily_action() to authenticated;

create or replace function public.admin_create_notifications(
  p_user_ids uuid[],
  p_title text,
  p_body text,
  p_type text default 'admin',
  p_link text default null
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted int := 0;
begin
  if not public.is_profile_admin() then
    raise exception 'not allowed';
  end if;

  if p_user_ids is null or array_length(p_user_ids, 1) is null then
    insert into public.notifications (user_id, title, body, type, link, created_by)
    select profile.id, p_title, p_body, coalesce(nullif(p_type, ''), 'admin'), p_link, auth.uid()
    from public.profiles as profile;
  else
    insert into public.notifications (user_id, title, body, type, link, created_by)
    select profile.id, p_title, p_body, coalesce(nullif(p_type, ''), 'admin'), p_link, auth.uid()
    from public.profiles as profile
    where profile.id = any (p_user_ids);
  end if;

  get diagnostics inserted = row_count;
  return inserted;
end;
$$;

revoke all on function public.admin_create_notifications(uuid[], text, text, text, text) from public;
grant execute on function public.admin_create_notifications(uuid[], text, text, text, text) to authenticated;

create or replace function public.reminders_after_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.notifications (user_id, title, body, type, link)
  values (
    new.user_id,
    'Hatırlatıcı kaydedildi',
    new.title,
    'reminder',
    '/profilim'
  );
  return new;
end;
$$;

drop trigger if exists reminders_after_insert on public.reminders;
create trigger reminders_after_insert
  after insert on public.reminders
  for each row
  execute procedure public.reminders_after_insert();

create or replace function public.reminders_after_complete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.completed_at is null and new.completed_at is not null then
    insert into public.user_activity (user_id, kind, title, payload)
    values (
      new.user_id,
      'reminder_complete',
      'Görev tamamlandı',
      jsonb_build_object('reminder_id', new.id, 'title', new.title)
    );
  end if;
  return new;
end;
$$;

drop trigger if exists reminders_after_complete on public.reminders;
create trigger reminders_after_complete
  after update on public.reminders
  for each row
  execute procedure public.reminders_after_complete();

create or replace function public.materialize_due_reminder_notifications()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted int := 0;
  today date := public.istanbul_today();
begin
  if auth.uid() is null then
    return 0;
  end if;

  insert into public.notifications (user_id, title, body, type, link)
  select
    reminder.user_id,
    'Hatırlatıcı',
    reminder.title,
    'reminder',
    '/profilim'
  from public.reminders as reminder
  where reminder.user_id = auth.uid()
    and reminder.completed_at is null
    and reminder.due_on is not null
    and reminder.due_on <= today
    and not exists (
      select 1
      from public.notifications as note
      where note.user_id = reminder.user_id
        and note.type = 'reminder'
        and note.body = reminder.title
        and note.created_at::date = today
    );

  get diagnostics inserted = row_count;
  return inserted;
end;
$$;

revoke all on function public.materialize_due_reminder_notifications() from public;
grant execute on function public.materialize_due_reminder_notifications() to authenticated;

insert into public.daily_messages (body)
select body from (values
  ('Bugün kendine bir kez yavaşça dön. Ne hissettiğini adlandırmak yeter.'),
  ('Küçük bir sınır, büyük bir nefes kadar koruyucu olabilir.'),
  ('Kendine sorduğun dürüst soru, bugünün en net pusulası.'),
  ('Tamamlanmış hissetmek zorunda değilsin. Burada olmak yeter.'),
  ('Bir kişiye nazik olmak, kendine de nazik olmanın provasıdır.'),
  ('Bugün bedenine bir kez sor: neye ihtiyacın var?')
) as seed(body)
where not exists (select 1 from public.daily_messages limit 1);

insert into public.daily_actions (title, body, category)
select title, body, category from (values
  ('İki dakikalık nefes', 'Zamanlayıcı açmadan, yalnızca iki dakika nefesine eşlik et.', 'oz_bakim'),
  ('Birine dürüst bir teşekkür', 'Bugün bir kişiye somut bir şey için teşekkür et.', 'sosyal_bag'),
  ('Tek bir cümle yaz', 'Şu an hissettiğin şeyi tek cümleyle kaydet.', 'farkindalik'),
  ('Küçük bir düzen', 'Bulunduğun alanda tek bir yüzeyi sadeleştir.', 'cevre'),
  ('Kendi sınırını söyle', 'Bugün hayır demen gereken bir yerde nazikçe hayır de.', 'kisisel_gelisim'),
  ('Görmeden bir iyilik', 'Karşılık beklemeden küçük bir kolaylık bırak.', 'kucuk_iyilik')
) as seed(title, body, category)
where not exists (select 1 from public.daily_actions limit 1);

create table if not exists public.dream_journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text,
  dream_date date,
  dream_text text not null,
  spiritual_interpretation text not null,
  related_dream_slug text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists dream_journal_entries_user_created_idx
  on public.dream_journal_entries (user_id, created_at desc);

comment on table public.dream_journal_entries is
  'Private dream journal. Never expose in SEO, sitemap, or public APIs.';

grant select, insert, update, delete on public.dream_journal_entries to authenticated;

alter table public.dream_journal_entries enable row level security;

drop policy if exists dream_journal_select_own on public.dream_journal_entries;
create policy dream_journal_select_own
  on public.dream_journal_entries
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists dream_journal_insert_own on public.dream_journal_entries;
create policy dream_journal_insert_own
  on public.dream_journal_entries
  for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists dream_journal_update_own on public.dream_journal_entries;
create policy dream_journal_update_own
  on public.dream_journal_entries
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists dream_journal_delete_own on public.dream_journal_entries;
create policy dream_journal_delete_own
  on public.dream_journal_entries
  for delete
  to authenticated
  using (user_id = auth.uid());

-- Favorites, badges, journey, archetype, waitlist, public daily message, visit series.
-- Reuses profiles, user_activity, daily_messages, site_events. No fake stats.

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
      'favorite_add'
    )
  );

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  content_type text not null,
  content_id text not null,
  title text not null default '',
  href text not null default '',
  created_at timestamptz not null default now(),
  constraint favorites_unique unique (user_id, content_type, content_id)
);

create index if not exists favorites_user_idx on public.favorites (user_id, created_at desc);

create table if not exists public.badges (
  id text primary key,
  title text not null,
  description text not null default ''
);

create table if not exists public.user_badges (
  user_id uuid not null references public.profiles (id) on delete cascade,
  badge_id text not null references public.badges (id) on delete cascade,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

insert into public.badges (id, title, description) values
  ('ilk-adim', 'İlk Adım', 'İlk gerçek aktiviten'),
  ('3-gun-aktif', '3 Gün Aktif', 'Üç ayrı günde aktivite'),
  ('7-gunluk-seri', '7 Günlük Seri', 'Yedi gün üst üste aktivite'),
  ('ilk-duygu', 'İlk Duygu Günlüğü', 'İlk duygu kaydı'),
  ('ilk-eylem', 'İlk GoldKozmos Eylemi', 'İlk günlük eylem'),
  ('ilk-goldmind', 'İlk GoldMind Tamamlama', 'İlk GoldMind kaydı'),
  ('10-icerik', '10 İçerik Tamamlama', 'On içerik/aktivite'),
  ('21-yolculuk', '21 Günlük Kendilik Yolculuğu', '21 günü tamamladın')
on conflict (id) do nothing;

create table if not exists public.user_journey_days (
  user_id uuid not null references public.profiles (id) on delete cascade,
  day smallint not null,
  note text not null default '',
  completed_at timestamptz not null default now(),
  primary key (user_id, day),
  constraint user_journey_day_range check (day between 1 and 21)
);

create table if not exists public.user_archetype (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  primary_id text not null,
  second_id text,
  third_id text,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.community_waitlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  club_id text not null,
  created_at timestamptz not null default now(),
  constraint community_waitlist_unique unique (user_id, club_id)
);

alter table public.favorites enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.user_journey_days enable row level security;
alter table public.user_archetype enable row level security;
alter table public.community_waitlist enable row level security;

drop policy if exists favorites_own on public.favorites;
create policy favorites_own on public.favorites
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists badges_read on public.badges;
create policy badges_read on public.badges for select to authenticated using (true);

drop policy if exists user_badges_own on public.user_badges;
create policy user_badges_own on public.user_badges
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists journey_own on public.user_journey_days;
create policy journey_own on public.user_journey_days
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists archetype_own on public.user_archetype;
create policy archetype_own on public.user_archetype
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists waitlist_own on public.community_waitlist;
create policy waitlist_own on public.community_waitlist
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

grant select, insert, delete on public.favorites to authenticated;
grant select on public.badges to authenticated;
grant select on public.user_badges to authenticated;
grant select, insert, update on public.user_journey_days to authenticated;
grant select, insert, update on public.user_archetype to authenticated;
grant select, insert on public.community_waitlist to authenticated;

create or replace function public.get_public_daily_message()
returns table (id uuid, body text, assigned_on date)
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := public.istanbul_today();
begin
  return query
  select message.id, message.body, today
  from public.daily_messages as message
  where message.is_active = true
  order by md5(today::text || message.id::text)
  limit 1;
end;
$$;

revoke all on function public.get_public_daily_message() from public;
grant execute on function public.get_public_daily_message() to anon, authenticated;

create or replace function public.award_badge(p_user uuid, p_badge text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_badges (user_id, badge_id)
  values (p_user, p_badge)
  on conflict do nothing;
end;
$$;

create or replace function public.refresh_user_badges(p_user uuid default auth.uid())
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  activity_days int;
  streak int := 0;
  cursor_day date;
  prev date;
  total int;
begin
  if p_user is null then
    return;
  end if;

  if auth.uid() is distinct from p_user and coalesce(auth.role(), '') <> 'service_role' then raise exception 'not allowed'; end if;
  select count(*) into total from public.user_activity where user_id = p_user;
  if total >= 1 then
    perform public.award_badge(p_user, 'ilk-adim');
  end if;
  if exists (select 1 from public.user_activity where user_id = p_user and kind = 'emotion_journal') then
    perform public.award_badge(p_user, 'ilk-duygu');
  end if;
  if exists (select 1 from public.user_activity where user_id = p_user and kind = 'daily_action') then
    perform public.award_badge(p_user, 'ilk-eylem');
  end if;
  if exists (select 1 from public.user_activity where user_id = p_user and kind = 'goldmind_complete') then
    perform public.award_badge(p_user, 'ilk-goldmind');
  end if;
  if total >= 10 then
    perform public.award_badge(p_user, '10-icerik');
  end if;
  if (select count(*) from public.user_journey_days where user_id = p_user) >= 21 then
    perform public.award_badge(p_user, '21-yolculuk');
  end if;

  select count(distinct (timezone('Europe/Istanbul', created_at))::date)
  into activity_days
  from public.user_activity
  where user_id = p_user;
  if activity_days >= 3 then
    perform public.award_badge(p_user, '3-gun-aktif');
  end if;

  streak := 0;
  prev := null;
  for cursor_day in
    select distinct (timezone('Europe/Istanbul', created_at))::date as d
    from public.user_activity
    where user_id = p_user
    order by d desc
  loop
    if prev is null or prev = cursor_day + 1 then
      streak := streak + 1;
      prev := cursor_day;
    else
      exit;
    end if;
  end loop;
  if streak >= 7 then
    perform public.award_badge(p_user, '7-gunluk-seri');
  end if;
end;
$$;

revoke all on function public.refresh_user_badges(uuid) from public;
grant execute on function public.refresh_user_badges(uuid) to authenticated;

create or replace function public.complete_journey_day(p_day int, p_note text default '')
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'not authenticated';
  end if;
  if p_day < 1 or p_day > 21 then
    raise exception 'invalid day';
  end if;

  insert into public.user_journey_days (user_id, day, note)
  values (uid, p_day, coalesce(p_note, ''))
  on conflict (user_id, day) do update set note = excluded.note;

  insert into public.user_activity (user_id, kind, title, href, payload)
  values (
    uid,
    'journey_day',
    format('Kendilik yolculuğu gün %s', p_day),
    '/kendilik-yolculugu',
    jsonb_build_object('day', p_day)
  );

  perform public.refresh_user_badges(uid);
end;
$$;

revoke all on function public.complete_journey_day(int, text) from public;
grant execute on function public.complete_journey_day(int, text) to authenticated;

revoke all on function public.complete_today_daily_action() from public;
grant execute on function public.complete_today_daily_action() to authenticated;

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
  action_title text;
  done_at timestamptz;
begin
  if uid is null then
    raise exception 'not authenticated';
  end if;

  perform public.get_today_daily_action();

  select assignment.id, action.title, assignment.completed_at
  into row_id, action_title, done_at
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

  insert into public.user_activity (user_id, kind, title, payload)
  values (
    uid,
    'daily_action',
    'GoldKozmos eylemi tamamlandı',
    jsonb_build_object('action_title', action_title)
  );

  perform public.refresh_user_badges(uid);

  return query
  select assignment.action_id, action_title, assignment.completed_at
  from public.user_daily_actions as assignment
  where assignment.id = row_id;
end;
$$;

revoke all on function public.complete_today_daily_action() from public;
grant execute on function public.complete_today_daily_action() to authenticated;

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
    count(distinct event.visitor_key)::bigint as uniques
  from public.site_events as event
  where event.kind = 'page'
    and (timezone('Europe/Istanbul', event.created_at))::date between p_from and p_to
  group by 1
  order by 1;
end;
$$;

revoke all on function public.admin_visit_series(date, date) from public;
grant execute on function public.admin_visit_series(date, date) to authenticated;

insert into public.daily_messages (body)
select body from (values
  ('Bugün tek bir şeyi yavaş yap. Tempo senin elinde.'),
  ('Kendine dur demek, vazgeçmek değil; yerini hatırlamaktır.'),
  ('Küçük tutulan söz, yüksek niyetten daha onarır.'),
  ('Ne hissettiğini adlandırmak, onu büyütmek zorunda olduğun anlamına gelmez.'),
  ('Bir sınır çizmek, ilişkiyi bitirmek değil, görünür kılmaktır.'),
  ('Bugün bedenine bir kez yer aç. Zihin sonra gelir.'),
  ('İyilik, sahne istemez. Bir kap su da yeter.'),
  ('Kendine sorduğun dürüst soru, en sade pusuladır.')
) as seed(body)
where (select count(*) from public.daily_messages) < 20;

insert into public.daily_actions (title, body, category)
select title, body, category from (values
  ('Bir kap su bırak', 'Sokak hayvanları için bir kap su koy.', 'kucuk_iyilik'),
  ('Teşekkür mesajı', 'Teşekkür etmek istediğin birine kısa bir mesaj gönder.', 'sosyal_bag'),
  ('Telefonsuz yürüyüş', 'On dakika telefonsuz yürü.', 'oz_bakim'),
  ('Üç şey yaz', 'Kendinle ilgili sevdiğin üç şeyi yaz.', 'farkindalik'),
  ('Bir eşya ayır', 'Kullanmadığın bir eşyayı ihtiyacı olana ayır.', 'cevre'),
  ('Bir sınırını koru', 'Bugün bir sınırını nazikçe koru.', 'kisisel_gelisim'),
  ('Ertelediğin iş', 'Uzun zamandır ertelediğin küçük bir işi tamamla.', 'kisisel_gelisim')
) as seed(title, body, category)
where (select count(*) from public.daily_actions) < 20;

-- Do not roll back a saved reminder if the notification side-effect fails.
create or replace function public.reminders_after_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  begin
    insert into public.notifications (user_id, title, body, type, link)
    values (
      new.user_id,
      'Hatırlatıcı kaydedildi',
      left(trim(new.title), 80),
      'reminder',
      '/profilim'
    );
  exception
    when others then
      null;
  end;
  return new;
end;
$$;

alter table public.reminders
  add column if not exists notified_at timestamptz;

create index if not exists reminders_due_notify_idx
  on public.reminders (due_on, notified_at)
  where completed_at is null;

revoke all on function public.award_badge(uuid,text) from public, anon, authenticated;

revoke all on table public.daily_messages,public.user_daily_messages,public.daily_actions,public.user_daily_actions,public.emotion_journal,public.user_activity,public.notifications,public.reminders,public.push_subscriptions,public.favorites,public.badges,public.user_badges,public.user_journey_days,public.user_archetype,public.community_waitlist,public.dream_journal_entries from anon;

notify pgrst, 'reload schema';
commit;

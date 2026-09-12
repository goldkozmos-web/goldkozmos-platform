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

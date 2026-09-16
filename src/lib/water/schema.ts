export const WATER_SCHEMA_SQL = `
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

alter table public.water_reminder_settings
  add column if not exists schedule_mode text not null default 'count';

alter table public.water_reminder_settings enable row level security;
alter table public.water_reminder_times enable row level security;
alter table public.water_logs enable row level security;
alter table public.water_reminder_sent enable row level security;

drop policy if exists water_settings_own on public.water_reminder_settings;
create policy water_settings_own
  on public.water_reminder_settings for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists water_times_own on public.water_reminder_times;
create policy water_times_own
  on public.water_reminder_times for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists water_logs_own on public.water_logs;
create policy water_logs_own
  on public.water_logs for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists water_sent_own on public.water_reminder_sent;
create policy water_sent_own
  on public.water_reminder_sent for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

grant select, insert, update, delete on table public.water_reminder_settings to authenticated, service_role;
grant select, insert, update, delete on table public.water_reminder_times to authenticated, service_role;
grant select, insert, update, delete on table public.water_logs to authenticated, service_role;
grant select, insert, update, delete on table public.water_reminder_sent to authenticated, service_role;

notify pgrst, 'reload schema';
`;

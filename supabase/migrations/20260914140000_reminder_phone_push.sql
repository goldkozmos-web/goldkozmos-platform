alter table public.reminders
  add column if not exists notified_at timestamptz;

create index if not exists reminders_due_notify_idx
  on public.reminders (due_on, notified_at)
  where completed_at is null;

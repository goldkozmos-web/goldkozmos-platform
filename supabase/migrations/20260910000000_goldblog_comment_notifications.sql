-- In-app notifications when someone replies to a GoldBlog comment.

create table if not exists public.comment_notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles (id) on delete cascade,
  actor_id uuid not null references public.profiles (id) on delete cascade,
  comment_id uuid not null references public.comments (id) on delete cascade,
  post_id text not null,
  excerpt text not null default '',
  read_at timestamptz,
  created_at timestamptz not null default now(),
  constraint comment_notifications_not_self check (recipient_id <> actor_id)
);

create index if not exists comment_notifications_recipient_created_idx
  on public.comment_notifications (recipient_id, created_at desc);

create index if not exists comment_notifications_recipient_unread_idx
  on public.comment_notifications (recipient_id)
  where read_at is null;

alter table public.comment_notifications enable row level security;

drop policy if exists comment_notifications_select_own on public.comment_notifications;
create policy comment_notifications_select_own
  on public.comment_notifications
  for select
  using (auth.uid() = recipient_id);

drop policy if exists comment_notifications_insert_actor on public.comment_notifications;
create policy comment_notifications_insert_actor
  on public.comment_notifications
  for insert
  with check (
    auth.uid() = actor_id
    and recipient_id <> actor_id
  );

drop policy if exists comment_notifications_update_own on public.comment_notifications;
create policy comment_notifications_update_own
  on public.comment_notifications
  for update
  using (auth.uid() = recipient_id)
  with check (auth.uid() = recipient_id);

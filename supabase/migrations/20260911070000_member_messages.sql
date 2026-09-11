-- Admin → member inbox. Recipients read their own rows.

create table if not exists public.member_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles (id) on delete cascade,
  recipient_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz,
  constraint member_messages_title_len check (
    char_length(title) > 0 and char_length(title) <= 80
  ),
  constraint member_messages_body_len check (
    char_length(body) > 0 and char_length(body) <= 2000
  )
);

create index if not exists member_messages_recipient_created_idx
  on public.member_messages (recipient_id, created_at desc);

create index if not exists member_messages_sender_created_idx
  on public.member_messages (sender_id, created_at desc);

alter table public.member_messages enable row level security;

drop policy if exists member_messages_select_own_or_admin on public.member_messages;
create policy member_messages_select_own_or_admin
  on public.member_messages
  for select
  to authenticated
  using (
    recipient_id = auth.uid()
    or public.is_profile_admin()
  );

drop policy if exists member_messages_insert_admin on public.member_messages;
create policy member_messages_insert_admin
  on public.member_messages
  for insert
  to authenticated
  with check (public.is_profile_admin() and sender_id = auth.uid());

drop policy if exists member_messages_update_own on public.member_messages;
create policy member_messages_update_own
  on public.member_messages
  for update
  to authenticated
  using (recipient_id = auth.uid())
  with check (recipient_id = auth.uid());

grant select, insert, update on table public.member_messages to authenticated;

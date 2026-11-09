-- Restore the existing application's missing comments storage.
-- Push subscriptions remain encrypted by the server before insertion.
begin;
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id text not null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  parent_comment_id uuid references public.comments(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint comments_content_length check (
    char_length(content) > 0 and
    char_length(content) <= case when post_id = 'gk-push-sub' then 4096 else 1000 end
  )
);
create index if not exists comments_post_id_created_at_idx on public.comments(post_id, created_at desc);
create index if not exists comments_user_id_created_at_idx on public.comments(user_id, created_at desc);
alter table public.comments enable row level security;

create policy comments_read_encrypted_push on public.comments for select to anon using (post_id = 'gk-push-sub');
create policy comments_read_members on public.comments for select to authenticated using (
  post_id not like 'gk-%' or post_id = 'gk-push-sub'
  or auth.uid() = user_id
  or lower(coalesce(auth.jwt()->>'email', '')) = 'goldkozmos@gmail.com'
);
create policy comments_insert_owner on public.comments for insert to authenticated with check (
  auth.uid() = user_id and
  (post_id <> 'gk-push-sub' or lower(coalesce(auth.jwt()->>'email', '')) = 'goldkozmos@gmail.com')
);
create policy comments_update_owner on public.comments for update to authenticated using (auth.uid() = user_id) with check (
  auth.uid() = user_id and
  (post_id <> 'gk-push-sub' or lower(coalesce(auth.jwt()->>'email', '')) = 'goldkozmos@gmail.com')
);
create policy comments_delete_owner on public.comments for delete to authenticated using (
  auth.uid() = user_id or lower(coalesce(auth.jwt()->>'email', '')) = 'goldkozmos@gmail.com'
);
revoke all on public.comments from anon;
grant select (id, post_id, content) on public.comments to anon;
grant select, insert, update, delete on public.comments to authenticated;
notify pgrst, 'reload schema';
commit;

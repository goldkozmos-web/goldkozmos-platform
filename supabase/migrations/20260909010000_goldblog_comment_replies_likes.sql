-- Replies (1 level) and persistent likes for GoldBlog comments.

alter table public.comments
  add column if not exists parent_comment_id uuid references public.comments (id) on delete cascade;

create index if not exists comments_parent_comment_id_idx
  on public.comments (parent_comment_id, created_at);

create table if not exists public.comment_likes (
  comment_id uuid not null references public.comments (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);

create index if not exists comment_likes_user_id_idx
  on public.comment_likes (user_id);

alter table public.comment_likes enable row level security;

drop policy if exists comment_likes_select_all on public.comment_likes;
create policy comment_likes_select_all
  on public.comment_likes
  for select
  using (true);

drop policy if exists comment_likes_insert_own on public.comment_likes;
create policy comment_likes_insert_own
  on public.comment_likes
  for insert
  with check (auth.uid() = user_id);

drop policy if exists comment_likes_delete_own on public.comment_likes;
create policy comment_likes_delete_own
  on public.comment_likes
  for delete
  using (auth.uid() = user_id);

create or replace function public.prevent_nested_comment_replies()
returns trigger
language plpgsql
as $$
declare
  parent_parent uuid;
  parent_post text;
begin
  if new.parent_comment_id is null then
    return new;
  end if;

  select parent_comment_id, post_id
    into parent_parent, parent_post
  from public.comments
  where id = new.parent_comment_id;

  if parent_post is null then
    raise exception 'Parent comment not found';
  end if;

  if parent_parent is not null then
    raise exception 'Nested replies are not allowed';
  end if;

  if parent_post is distinct from new.post_id then
    raise exception 'Reply must belong to the same post';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_nested_comment_replies on public.comments;
create trigger prevent_nested_comment_replies
  before insert on public.comments
  for each row
  execute procedure public.prevent_nested_comment_replies();

create or replace function public.protect_comment_owner()
returns trigger
language plpgsql
as $$
begin
  if new.user_id is distinct from old.user_id
     or new.post_id is distinct from old.post_id
     or new.parent_comment_id is distinct from old.parent_comment_id then
    raise exception 'Comment owner, post and parent cannot change';
  end if;

  new.updated_at := now();
  return new;
end;
$$;

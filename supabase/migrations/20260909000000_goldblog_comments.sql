-- GoldBlog persistent comments + profile display fields.
-- Apply in the existing Supabase project (SQL editor or CLI).

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id text not null,
  user_id uuid not null references public.profiles (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint comments_content_length check (
    char_length(content) > 0
    and char_length(content) <= 1000
  )
);

create index if not exists comments_post_id_created_at_idx
  on public.comments (post_id, created_at desc);

create index if not exists comments_user_id_created_at_idx
  on public.comments (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.comments enable row level security;

drop policy if exists profiles_select_all on public.profiles;
create policy profiles_select_all
  on public.profiles
  for select
  using (true);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
  on public.profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists comments_select_all on public.comments;
create policy comments_select_all
  on public.comments
  for select
  using (true);

drop policy if exists comments_insert_own on public.comments;
create policy comments_insert_own
  on public.comments
  for insert
  with check (auth.uid() = user_id);

drop policy if exists comments_update_own on public.comments;
create policy comments_update_own
  on public.comments
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists comments_delete_own on public.comments;
create policy comments_delete_own
  on public.comments
  for delete
  using (auth.uid() = user_id);

drop policy if exists comments_delete_admin on public.comments;
create policy comments_delete_admin
  on public.comments
  for delete
  using (
    exists (
      select 1
      from public.profiles as profile
      where profile.id = auth.uid()
        and profile.is_admin = true
    )
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
      nullif(split_part(new.email, '@', 1), ''),
      'GoldKozmos'
    ),
    nullif(new.raw_user_meta_data ->> 'avatar_url', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

create or replace function public.protect_profile_admin_flag()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_admin is distinct from old.is_admin
     and auth.role() <> 'service_role' then
    new.is_admin := old.is_admin;
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists protect_profile_admin_flag on public.profiles;
create trigger protect_profile_admin_flag
  before update on public.profiles
  for each row
  execute procedure public.protect_profile_admin_flag();

create or replace function public.protect_comment_owner()
returns trigger
language plpgsql
as $$
begin
  if new.user_id is distinct from old.user_id
     or new.post_id is distinct from old.post_id then
    raise exception 'Comment owner and post cannot change';
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists protect_comment_owner on public.comments;
create trigger protect_comment_owner
  before update on public.comments
  for each row
  execute procedure public.protect_comment_owner();

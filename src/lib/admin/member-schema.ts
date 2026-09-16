export const SITE_MEMBERS_SCHEMA_SQL = `
create table if not exists public.site_members (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  display_name text not null,
  auth_user_id uuid unique,
  source text not null default 'google',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_members_email_key unique (email)
);

alter table public.site_members
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists city text,
  add column if not exists age integer,
  add column if not exists interests text,
  add column if not exists phone text,
  add column if not exists privacy_accepted_at timestamptz,
  add column if not exists profile_completed_at timestamptz;

create index if not exists site_members_created_at_idx
  on public.site_members (created_at desc);

alter table public.site_members enable row level security;

grant select, insert, update on table public.site_members to authenticated;
grant all on table public.site_members to service_role;

create table if not exists public.profiles (
  id uuid primary key,
  display_name text,
  avatar_url text,
  role text not null default 'user',
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update on table public.profiles to authenticated;
grant all on table public.profiles to service_role;
`;

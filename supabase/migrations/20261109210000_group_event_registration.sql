-- Additive migration. No changes to existing application tables or policies.
create table public.group_event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id text not null check (event_id in ('karmalarindan-arin-20261114','mekan-enerjisi-arinmasi-20261117','disil-eril-enerji-dengeleme-20261120','iliskisel-blokajlardan-arinma-20261122')),
  event_title text not null,
  full_name text not null check (length(full_name) between 3 and 120),
  email text not null check (email = lower(email) and length(email) <= 254),
  phone text not null check (length(phone) between 10 and 16),
  amount_kurus integer not null default 60000 check (amount_kurus = 60000),
  currency text not null default 'TRY' check (currency = 'TRY'),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','refunded')),
  provider_order_id text unique,
  access_token_hash text not null check (length(access_token_hash) = 64),
  consent_version text not null,
  privacy_acknowledged_at timestamptz not null,
  terms_accepted_at timestamptz not null,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  confirmation_sent_at timestamptz,
  email_claimed_until timestamptz,
  unique (event_id, email),
  check ((payment_status = 'pending' and provider_order_id is null and paid_at is null) or (payment_status in ('paid','refunded') and provider_order_id is not null and paid_at is not null))
);
create index group_event_registration_recent on public.group_event_registrations(created_at desc);

-- Never expose meeting links or product configuration in public queries.
create table public.group_event_private (
  event_id text primary key,
  meet_url text not null check (meet_url ~ '^https://meet[.]google[.]com/[a-z]{3}-[a-z]{4}-[a-z]{3}$'),
  updated_at timestamptz not null default now()
);
create table public.group_event_rate_limits (
  bucket text primary key,
  attempts integer not null,
  expires_at timestamptz not null
);

alter table public.group_event_registrations enable row level security;
alter table public.group_event_private enable row level security;
alter table public.group_event_rate_limits enable row level security;
revoke all on public.group_event_registrations, public.group_event_private, public.group_event_rate_limits from public, anon, authenticated;
grant select, insert, update on public.group_event_registrations, public.group_event_private, public.group_event_rate_limits to service_role;

create function public.group_event_take_rate_limit(p_bucket text, p_limit integer, p_expires_at timestamptz)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare n integer;
begin
  insert into public.group_event_rate_limits(bucket, attempts, expires_at)
  values (p_bucket, 1, p_expires_at)
  on conflict (bucket) do update set attempts = public.group_event_rate_limits.attempts + 1
  returning attempts into n;
  return n <= p_limit;
end;
$$;

-- A single conditional update makes duplicate/concurrent callbacks idempotent.
create function public.group_event_confirm_payment(p_id uuid, p_order_id text, p_paid_at timestamptz)
returns boolean language plpgsql security invoker set search_path = '' as $$
begin
  update public.group_event_registrations set payment_status = 'paid', provider_order_id = p_order_id, paid_at = p_paid_at
  where id = p_id and payment_status = 'pending';
  if found then return true; end if;
  return exists(select 1 from public.group_event_registrations where id = p_id and payment_status = 'paid' and provider_order_id = p_order_id);
end;
$$;
revoke all on function public.group_event_take_rate_limit(text, integer, timestamptz) from public, anon, authenticated;
revoke all on function public.group_event_confirm_payment(uuid, text, timestamptz) from public, anon, authenticated;
grant execute on function public.group_event_take_rate_limit(text, integer, timestamptz) to service_role;
grant execute on function public.group_event_confirm_payment(uuid, text, timestamptz) to service_role;

alter table public.group_event_registrations
  add column payment_method text not null default 'shopier' check(payment_method in ('shopier','bank_transfer')),
  add column bank_payment_code text unique,
  add column bank_transaction_hash text unique,
  add column whatsapp_opt_in_at timestamptz,
  add column approved_at timestamptz,
  add column approved_by uuid;

create table public.group_event_whatsapp_notifications (
  registration_id uuid primary key references public.group_event_registrations(id),
  status text not null default 'pending' check(status in ('pending','sending','accepted','failed','unknown')),
  provider_message_id text unique,
  attempts integer not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.group_event_whatsapp_notifications enable row level security;
revoke all on public.group_event_whatsapp_notifications from public, anon, authenticated;
grant select, insert, update on public.group_event_whatsapp_notifications to service_role;

-- Approval and notification queuing are atomic. No message is sent by this function.
create function public.group_event_approve_registration(p_id uuid, p_actor uuid, p_amount integer default null, p_transaction_hash text default null)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare r public.group_event_registrations;
begin
  if p_actor is null then raise exception 'Administrator required'; end if;
  select * into r from public.group_event_registrations where id=p_id for update;
  if not found then raise exception 'Registration not found'; end if;
  if r.approved_at is not null then return false; end if;
  if r.payment_status='refunded' then raise exception 'Refunded registration'; end if;
  if r.payment_method='bank_transfer' then
    if p_amount is null or p_amount<>r.amount_kurus or p_transaction_hash is null or p_transaction_hash !~ '^[a-f0-9]{64}$' then
      raise exception 'Bank transaction and exact amount required';
    end if;
    update public.group_event_registrations set payment_status='paid',paid_at=now(),
      provider_order_id='bank:'||p_transaction_hash,bank_transaction_hash=p_transaction_hash where id=p_id;
  elsif r.payment_status<>'paid' or r.provider_order_id is null then
    raise exception 'Verified payment required';
  end if;
  update public.group_event_registrations set approved_at=now(),approved_by=p_actor where id=p_id;
  if r.whatsapp_opt_in_at is not null then
    insert into public.group_event_whatsapp_notifications(registration_id) values(p_id) on conflict do nothing;
  end if;
  return true;
end;
$$;
revoke all on function public.group_event_approve_registration(uuid,uuid,integer,text) from public,anon,authenticated;
grant execute on function public.group_event_approve_registration(uuid,uuid,integer,text) to service_role;

-- Existing card webhook must never confirm a bank transfer registration.
create or replace function public.group_event_confirm_payment(p_id uuid,p_order_id text,p_paid_at timestamptz)
returns boolean language plpgsql security invoker set search_path = '' as $$
begin
  update public.group_event_registrations set payment_status='paid',provider_order_id=p_order_id,paid_at=p_paid_at
    where id=p_id and payment_method='shopier' and payment_status='pending';
  if found then return true; end if;
  return exists(select 1 from public.group_event_registrations where id=p_id and payment_method='shopier' and payment_status='paid' and provider_order_id=p_order_id);
end;
$$;

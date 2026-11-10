alter table public.group_event_registrations
  add column checkout_channel text not null default 'online'
  check (checkout_channel in ('online', 'whatsapp')),
  add constraint group_whatsapp_request_has_reference check (
    checkout_channel <> 'whatsapp' or (payment_method = 'bank_transfer' and bank_payment_code is not null)
  );

create or replace function public.group_event_tracking_status(p_id uuid, p_token_hash text)
returns jsonb language sql stable security invoker set search_path = '' as $$
  select jsonb_build_object(
    'eventTitle', r.event_title,
    'paymentStatus', r.payment_status,
    'approved', r.payment_status = 'paid' and r.approved_at is not null,
    'confirmationSent', r.confirmation_sent_at is not null,
    'whatsappRequest', case
      when r.checkout_channel = 'whatsapp' and r.payment_status = 'pending'
      then jsonb_build_object('code', r.bank_payment_code, 'amountKurus', r.amount_kurus)
    end,
    'invites', coalesce((
      select jsonb_agg(jsonb_build_object('eventId', i.event_id, 'url', i.invite_url) order by selected.ordinality)
      from unnest(r.event_ids) with ordinality as selected(event_id, ordinality)
      join public.group_event_whatsapp_invites i using (event_id)
      where r.payment_status = 'paid' and r.approved_at is not null
    ), '[]'::jsonb)
  )
  from public.group_event_registrations r
  where r.id = p_id and r.access_token_hash = p_token_hash;
$$;

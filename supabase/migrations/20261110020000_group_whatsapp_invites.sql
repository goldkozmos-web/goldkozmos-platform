create table public.group_event_whatsapp_invites (
  event_id text primary key,
  invite_url text not null check (
    length(invite_url) <= 512 and
    invite_url ~ '^https://chat[.]whatsapp[.]com/[A-Za-z0-9]{22}([?][A-Za-z0-9_=&%-]+)?$'
  )
);

alter table public.group_event_whatsapp_invites enable row level security;
revoke all on public.group_event_whatsapp_invites from public, anon, authenticated;
grant select, insert, update, delete on public.group_event_whatsapp_invites to service_role;

-- Read the approval and matching invites from the same database snapshot.
create function public.group_event_tracking_status(p_id uuid, p_token_hash text)
returns jsonb language sql stable security invoker set search_path = '' as $$
  select jsonb_build_object(
    'eventTitle', r.event_title,
    'paymentStatus', r.payment_status,
    'approved', r.payment_status = 'paid' and r.approved_at is not null,
    'confirmationSent', r.confirmation_sent_at is not null,
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

revoke all on function public.group_event_tracking_status(uuid, text) from public, anon, authenticated;
grant execute on function public.group_event_tracking_status(uuid, text) to service_role;

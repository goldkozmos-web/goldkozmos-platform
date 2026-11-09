-- Preserve existing single-event registrations; add one payment per chosen package.
alter table public.group_event_registrations add column event_ids text[];
update public.group_event_registrations set event_ids = array[event_id];
alter table public.group_event_registrations drop constraint group_event_registrations_amount_kurus_check;

create function public.group_event_validate_package()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare
  valid_ids text[] := array['karmalarindan-arin-20261114','mekan-enerjisi-arinmasi-20261117','disil-eril-enerji-dengeleme-20261120','iliskisel-blokajlardan-arinma-20261122'];
  canonical text[];
  expected integer;
begin
  if new.event_ids is null then new.event_ids := array[new.event_id]; end if;
  select array_agg(id order by ord) into canonical from unnest(valid_ids) with ordinality as x(id,ord) where id = any(new.event_ids);
  if canonical is null or cardinality(canonical) <> cardinality(new.event_ids) or array_ndims(new.event_ids) <> 1 then
    raise exception 'Invalid event selection' using errcode = '23514';
  end if;
  new.event_ids := canonical;
  if new.event_id <> canonical[1] then raise exception 'Invalid primary event' using errcode = '23514'; end if;
  expected := case cardinality(canonical) when 1 then 60000 when 2 then 85000 when 3 then 155000 when 4 then 200000 end;
  if new.amount_kurus <> expected then raise exception 'Invalid package total' using errcode = '23514'; end if;
  if TG_OP = 'UPDATE' and (new.event_ids <> old.event_ids or new.amount_kurus <> old.amount_kurus or new.email <> old.email) then
    raise exception 'Registration selection and price are immutable' using errcode = '23514';
  end if;
  if TG_OP = 'INSERT' then
    -- Serialize registrations for the same email, including overlapping packages.
    perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(new.email)::bigint);
    if exists(select 1 from public.group_event_registrations where email = new.email and event_ids && canonical) then
      raise exception 'An event is already registered for this email' using errcode = '23505';
    end if;
  end if;
  return new;
end;
$$;
create trigger group_event_package_guard before insert or update on public.group_event_registrations
for each row execute function public.group_event_validate_package();
alter table public.group_event_registrations alter column event_ids set not null;
create index group_event_package_events on public.group_event_registrations using gin(event_ids);
revoke all on function public.group_event_validate_package() from public, anon, authenticated;
grant execute on function public.group_event_validate_package() to service_role;

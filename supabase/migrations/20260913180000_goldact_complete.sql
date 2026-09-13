-- Keep GoldAct RPCs callable for signed-in members and record completion as GoldAct.

create or replace function public.get_today_daily_action()
returns table (
  id uuid,
  title text,
  body text,
  category text,
  assigned_on date,
  completed_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := public.istanbul_today();
  uid uuid := auth.uid();
  chosen uuid;
  total int;
begin
  if uid is null then
    return;
  end if;

  select assignment.action_id
  into chosen
  from public.user_daily_actions as assignment
  where assignment.user_id = uid
    and assignment.assigned_on = today;

  if chosen is null then
    select count(*) into total
    from public.daily_actions
    where is_active = true;

    if coalesce(total, 0) = 0 then
      return;
    end if;

    select action.id
    into chosen
    from public.daily_actions as action
    where action.is_active = true
    order by md5(uid::text || today::text || action.id::text)
    limit 1;

    insert into public.user_daily_actions (user_id, action_id, assigned_on)
    values (uid, chosen, today)
    on conflict (user_id, assigned_on) do nothing;

    select assignment.action_id
    into chosen
    from public.user_daily_actions as assignment
    where assignment.user_id = uid
      and assignment.assigned_on = today;
  end if;

  return query
  select
    action.id,
    action.title,
    action.body,
    action.category,
    today,
    assignment.completed_at
  from public.daily_actions as action
  join public.user_daily_actions as assignment
    on assignment.action_id = action.id
   and assignment.user_id = uid
   and assignment.assigned_on = today
  where action.id = chosen;
end;
$$;

revoke all on function public.get_today_daily_action() from public;
grant execute on function public.get_today_daily_action() to authenticated;

create or replace function public.complete_today_daily_action()
returns table (
  id uuid,
  title text,
  completed_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := public.istanbul_today();
  uid uuid := auth.uid();
  row_id uuid;
  action_title text;
  done_at timestamptz;
begin
  if uid is null then
    raise exception 'not authenticated';
  end if;

  perform public.get_today_daily_action();

  select assignment.id, action.title, assignment.completed_at
  into row_id, action_title, done_at
  from public.user_daily_actions as assignment
  join public.daily_actions as action on action.id = assignment.action_id
  where assignment.user_id = uid
    and assignment.assigned_on = today;

  if row_id is null then
    raise exception 'no action';
  end if;

  if done_at is not null then
    return query
    select assignment.action_id, action_title, assignment.completed_at
    from public.user_daily_actions as assignment
    where assignment.id = row_id;
    return;
  end if;

  update public.user_daily_actions
  set completed_at = now()
  where id = row_id
    and completed_at is null
  returning user_daily_actions.completed_at into done_at;

  insert into public.user_activity (user_id, kind, title, payload)
  values (
    uid,
    'daily_action',
    'GoldAct tamamlandı',
    jsonb_build_object('action_title', action_title)
  );

  perform public.refresh_user_badges(uid);

  return query
  select assignment.action_id, action_title, assignment.completed_at
  from public.user_daily_actions as assignment
  where assignment.id = row_id;
end;
$$;

revoke all on function public.complete_today_daily_action() from public;
grant execute on function public.complete_today_daily_action() to authenticated;

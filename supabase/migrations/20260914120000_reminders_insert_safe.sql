-- Do not roll back a saved reminder if the notification side-effect fails.
create or replace function public.reminders_after_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  begin
    insert into public.notifications (user_id, title, body, type, link)
    values (
      new.user_id,
      'Hatırlatıcı kaydedildi',
      left(trim(new.title), 80),
      'reminder',
      '/profilim'
    );
  exception
    when others then
      null;
  end;
  return new;
end;
$$;

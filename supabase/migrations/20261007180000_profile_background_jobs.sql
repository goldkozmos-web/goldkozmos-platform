begin;
create or replace function public.claim_profile_push_notifications()
returns table(id uuid,user_id uuid,title text,body text,link text)
language plpgsql security definer set search_path=public as $$
begin
 if coalesce(auth.role(),'')<>'service_role' then raise exception 'not allowed';end if;
 return query update public.notifications n set push_claimed_at=now() where n.id in(
 select x.id from public.notifications x where x.push_sent_at is null and x.created_at>now()-interval '1 day' and (x.push_claimed_at is null or x.push_claimed_at<now()-interval '2 minutes') order by x.created_at limit 100 for update skip locked
 ) returning n.id,n.user_id,n.title,n.body,n.link;
end;$$;
revoke all on function public.claim_profile_push_notifications() from public,anon,authenticated;
grant execute on function public.claim_profile_push_notifications() to service_role;
notify pgrst,'reload schema';commit;

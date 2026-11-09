begin;
create function public.community_post_visibility(p_id uuid,p_restore boolean default false) returns jsonb
language plpgsql security definer set search_path=public as $$
declare u uuid:=auth.uid(); changed uuid;
begin
 if u is null then raise exception 'Giriş yapmalısın.';end if;
 update community_posts set status=case when p_restore then 'active' else 'deleted' end
 where id=p_id and user_id=u and status=case when p_restore then 'deleted' else 'active' end returning id into changed;
 if changed is null then raise exception 'Bu paylaşım için işlem yapamazsın.';end if;
 return jsonb_build_object('ok',true);
end;$$;
revoke all on function public.community_post_visibility(uuid,boolean) from public,anon;
grant execute on function public.community_post_visibility(uuid,boolean) to authenticated;
notify pgrst,'reload schema';
commit;

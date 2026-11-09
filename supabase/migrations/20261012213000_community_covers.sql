begin;
alter table public.community_profiles add column cover_url text;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('community-covers','community-covers',true,5242880,array['image/webp']);
create policy community_cover_upload on storage.objects for insert to authenticated with check(bucket_id='community-covers' and owner_id=auth.uid()::text and name ~ '^[a-f0-9-]{36}\.webp$');
create function public.community_cover(p_path text default null) returns jsonb language plpgsql security definer set search_path=public as $$
declare u uuid:=auth.uid(); object_url text;
begin
 if u is null then raise exception 'Giriş yapmalısın.';end if;
 if p_path is not null then
  if not exists(select 1 from storage.objects where bucket_id='community-covers' and name=p_path and owner_id=u::text) then raise exception 'Bu görseli kullanamazsın.';end if;
  object_url:='https://viomlucbaiewgzeaspoz.supabase.co/storage/v1/object/public/community-covers/'||p_path;
 end if;
 insert into community_profiles(user_id,username) values(u,'uye_'||substr(replace(gen_random_uuid()::text,'-',''),1,12)) on conflict(user_id) do nothing;
 update community_profiles set cover_url=object_url where user_id=u;
 return jsonb_build_object('ok',true);
end;$$;
revoke all on function public.community_cover(text) from public,anon;
grant execute on function public.community_cover(text) to authenticated;
notify pgrst,'reload schema';
commit;

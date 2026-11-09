begin;
alter table public.community_profiles add column profile_completed boolean not null default false;
update public.community_profiles set profile_completed=true where username !~ '^uye_[a-f0-9]{12}$';
create function public.community_complete_profile(p_data jsonb) returns jsonb language plpgsql security definer set search_path=public as $$
declare result jsonb;
begin
 result:=community_write('profile',p_data);
 update community_profiles set profile_completed=true where user_id=auth.uid();
 return result;
end;$$;
revoke all on function public.community_complete_profile(jsonb) from public,anon;
grant execute on function public.community_complete_profile(jsonb) to authenticated;
notify pgrst,'reload schema';
commit;

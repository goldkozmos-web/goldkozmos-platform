begin;
create table public.community_follows (
 follower_id uuid not null references public.community_profiles(user_id) on delete cascade,
 followed_id uuid not null references public.community_profiles(user_id) on delete cascade,
 created_at timestamptz not null default now(),primary key(follower_id,followed_id),check(follower_id<>followed_id)
);
create index community_followers on public.community_follows(followed_id);
alter table public.community_follows enable row level security;
revoke all on public.community_follows from anon,authenticated;
create function public.community_follow(p_username text,p_follow boolean) returns jsonb language plpgsql security definer set search_path=public as $$
declare u uuid:=auth.uid(); target uuid;
begin
 if u is null then raise exception 'Giriş yapmalısın.';end if;
 select user_id into target from community_profiles where username=p_username;
 if target is null or target=u then raise exception 'Bu profili takip edemezsin.';end if;
 insert into community_profiles(user_id,username) values(u,'uye_'||substr(replace(gen_random_uuid()::text,'-',''),1,12)) on conflict(user_id) do nothing;
 perform pg_advisory_xact_lock(hashtextextended(u::text,18));
 if p_follow then insert into community_follows(follower_id,followed_id) values(u,target) on conflict do nothing;
 else delete from community_follows where follower_id=u and followed_id=target;end if;
 return jsonb_build_object('ok',true);
end;$$;
create function public.community_social(p_kind text,p_options jsonb default '{}'::jsonb) returns jsonb language plpgsql stable security definer set search_path=public as $$
declare u uuid:=auth.uid(); target uuid; result jsonb; people jsonb; list_kind text;
begin
 if u is null then raise exception 'Çembere katılmak için giriş yapmalısın.';end if;
 if p_kind='profile' then
  result:=community_read('profile',p_options);
  select user_id into target from community_profiles where username=p_options->>'username';
  return result||jsonb_build_object('social',jsonb_build_object('mine',target=u,'following',exists(select 1 from community_follows where follower_id=u and followed_id=target),'followers',(select count(*) from community_follows where followed_id=target),'following_count',(select count(*) from community_follows where follower_id=target),'posts',(select count(*) from community_posts where user_id=target and not is_anonymous and status='active'),'comments',(select count(*) from community_comments c join community_posts p on p.id=c.post_id where c.user_id=target and not c.is_anonymous and c.status='active' and p.status='active')));
 elsif p_kind='people' then
  select user_id into target from community_profiles where username=p_options->>'username';
  if target is null then raise exception 'Profil bulunamadı.';end if;
  list_kind:=coalesce(p_options->>'list','followers');
  select coalesce(jsonb_agg(community_actor(x.person,false) order by x.created_at desc),'[]') into people from (
   select case when list_kind='following' then followed_id else follower_id end person,created_at from community_follows
   where case when list_kind='following' then follower_id=target else followed_id=target end
   and (nullif(p_options->>'before','') is null or created_at<(p_options->>'before')::timestamptz)
   order by created_at desc limit 100
  ) x;return jsonb_build_object('people',people);
 elsif p_kind='feed' then
  select coalesce(jsonb_agg(community_post_json(x) order by x.created_at desc,x.id desc),'[]') into result from (
   select p.* from community_posts p where p.status='active'
   and (not coalesce((p_options->>'following')::boolean,false) or (not p.is_anonymous and exists(select 1 from community_follows f where f.follower_id=u and f.followed_id=p.user_id)))
   and (nullif(p_options->>'category','') is null or p.category=p_options->>'category')
   and (nullif(p_options->>'search','') is null or (p.title||' '||p.body) ilike '%'||left(p_options->>'search',100)||'%')
   and (not coalesce((p_options->>'saved')::boolean,false) or exists(select 1 from community_saves s where s.user_id=u and s.post_id=p.id))
   and (nullif(p_options->>'before','') is null or (p.created_at,p.id)<((p_options->>'before')::timestamptz,(p_options->>'cursor')::uuid)) order by p.created_at desc,p.id desc limit 21
  )x;return jsonb_build_object('items',result);
 end if;raise exception 'Geçersiz sorgu.';
end;$$;
revoke all on function public.community_follow(text,boolean),public.community_social(text,jsonb) from public,anon;
grant execute on function public.community_follow(text,boolean),public.community_social(text,jsonb) to authenticated;
notify pgrst,'reload schema';
commit;

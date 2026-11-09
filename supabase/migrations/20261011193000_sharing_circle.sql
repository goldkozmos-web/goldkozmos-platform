begin;
create table public.community_profiles (
 user_id uuid primary key references public.profiles(id) on delete cascade,
 username text unique not null check(username ~ '^[a-z0-9_]{3,24}$'),
 display_name text not null default '' check(length(display_name)<=60),
 bio text not null default '' check(length(bio)<=300), avatar_url text,
 created_at timestamptz not null default now()
);
create table public.community_posts (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references public.community_profiles(user_id) on delete cascade,
 title text not null check(length(trim(title)) between 3 and 140), body text not null check(length(trim(body)) between 3 and 6000),
 category text not null check(category in('Kişisel gelişim','İlişkiler','Özdeğer ve sınırlar','Aile ve geçmiş','Günlük hayat','Enerji ve farkındalık')),
 is_anonymous boolean not null default false, status text not null default 'active' check(status in('active','hidden','deleted')),
 created_at timestamptz not null default now()
);
create table public.community_comments (
 id uuid primary key default gen_random_uuid(), post_id uuid not null references public.community_posts(id) on delete cascade,
 user_id uuid not null references public.community_profiles(user_id) on delete cascade,
 parent_id uuid references public.community_comments(id) on delete cascade,
 reply_to uuid references public.community_comments(id) on delete cascade,
 body text not null check(length(trim(body)) between 1 and 2000), is_anonymous boolean not null default false,
 status text not null default 'active' check(status in('active','hidden','deleted')), created_at timestamptz not null default now()
);
create table public.community_reactions (
 id uuid not null default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 post_id uuid references public.community_posts(id) on delete cascade, comment_id uuid references public.community_comments(id) on delete cascade,
 created_at timestamptz not null default now(), check(num_nonnulls(post_id,comment_id)=1)
);
create unique index community_post_reaction_unique on public.community_reactions(user_id,post_id) where post_id is not null;
create unique index community_comment_reaction_unique on public.community_reactions(user_id,comment_id) where comment_id is not null;
create table public.community_saves(user_id uuid references public.profiles(id) on delete cascade,post_id uuid references public.community_posts(id) on delete cascade,created_at timestamptz not null default now(),primary key(user_id,post_id));
create table public.community_reports(id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id) on delete cascade,post_id uuid not null references public.community_posts(id) on delete cascade,comment_id uuid references public.community_comments(id) on delete cascade,reason text not null check(length(trim(reason)) between 3 and 1000),resolved_at timestamptz,created_at timestamptz not null default now());
create unique index community_report_once on public.community_reports(user_id,post_id,coalesce(comment_id,'00000000-0000-0000-0000-000000000000'::uuid));
create index community_feed_cursor on public.community_posts(created_at desc,id desc) where status='active';
create index community_comments_post on public.community_comments(post_id,parent_id,created_at);
alter table public.notifications add column if not exists actor_user_id uuid references public.profiles(id) on delete set null;
alter table public.notifications add column if not exists post_id uuid references public.community_posts(id) on delete cascade;
alter table public.notifications add column if not exists comment_id uuid references public.community_comments(id) on delete cascade;
alter table public.notifications add column if not exists actor_username text;
alter table public.notifications add column if not exists actor_avatar text;

alter table public.community_profiles enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_reactions enable row level security;
alter table public.community_saves enable row level security;
alter table public.community_reports enable row level security;
-- Raw authorship stays private. Public readers only use masked RPC responses.
create policy community_profiles_read on public.community_profiles for select to authenticated using(true);
create policy community_posts_private on public.community_posts for select to authenticated using(user_id=auth.uid() or public.is_profile_admin());
create policy community_comments_private on public.community_comments for select to authenticated using(user_id=auth.uid() or public.is_profile_admin());
create policy community_reactions_own on public.community_reactions for select to authenticated using(user_id=auth.uid());
create policy community_saves_own on public.community_saves for select to authenticated using(user_id=auth.uid());
create policy community_reports_private on public.community_reports for select to authenticated using(user_id=auth.uid() or public.is_profile_admin());
revoke all on public.community_profiles,public.community_posts,public.community_comments,public.community_reactions,public.community_saves,public.community_reports from anon,authenticated;
grant select on public.community_profiles to authenticated;
grant select on public.community_posts,public.community_comments,public.community_reactions,public.community_saves,public.community_reports to authenticated;

create function public.community_actor(p_user uuid,p_anon boolean) returns jsonb language sql stable security definer set search_path=public as $$
 select case when p_anon then jsonb_build_object('name','Anonim üye','username',null,'avatar',null,'admin',false)
 else coalesce((select jsonb_build_object('name',coalesce(nullif(c.display_name,''),c.username),'username',c.username,'avatar',c.avatar_url,'admin',p.role='admin') from community_profiles c join profiles p on p.id=c.user_id where c.user_id=p_user),jsonb_build_object('name','Üye')) end
$$;
create function public.community_post_json(p community_posts) returns jsonb language plpgsql stable security definer set search_path=public as $$begin
 return jsonb_build_object('id',p.id,'title',p.title,'body',p.body,'category',p.category,'anonymous',p.is_anonymous,'actor',community_actor(p.user_id,p.is_anonymous),'created_at',p.created_at,'status',p.status,
 'mine',p.user_id=auth.uid(),'supports',(select count(*) from community_reactions r where r.post_id=p.id),'supported',exists(select 1 from community_reactions r where r.post_id=p.id and r.user_id=auth.uid()),'saved',exists(select 1 from community_saves s where s.post_id=p.id and s.user_id=auth.uid()),'comments',(select count(*) from community_comments c where c.post_id=p.id and c.status='active'))
;end;$$;
create function public.community_comment_json(c community_comments) returns jsonb language plpgsql stable security definer set search_path=public as $$begin
 return jsonb_build_object('id',c.id,'post_id',c.post_id,'parent_id',c.parent_id,'reply_to',c.reply_to,'body',c.body,'actor',community_actor(c.user_id,c.is_anonymous),'created_at',c.created_at,'mine',c.user_id=auth.uid(),'supports',(select count(*) from community_reactions r where r.comment_id=c.id),'supported',exists(select 1 from community_reactions r where r.comment_id=c.id and r.user_id=auth.uid()));
end;$$;
create function public.community_notice(p_recipient uuid,p_actor uuid,p_anon boolean,p_type text,p_post uuid,p_comment uuid,p_text text,p_event text) returns void language plpgsql security definer set search_path=public as $$
declare a jsonb; t text;begin
 if p_recipient is null or p_recipient=p_actor then return;end if;
 a:=community_actor(p_actor,p_anon);
 select title into t from community_posts where id=p_post;
 insert into notifications(user_id,actor_user_id,actor_username,actor_avatar,type,post_id,comment_id,title,body,link,source_key)
 values(p_recipient,case when p_anon then null else p_actor end,a->>'username',a->>'avatar',p_type,p_post,p_comment,left(case when (a->>'admin')::boolean then 'Özge • Yönetici' when p_anon then 'Anonim üye' else '@'||(a->>'username') end||' '||p_text,80),left(t,140),'/paylasim-cemberi/'||p_post::text||case when p_comment is null then '' else '#yorum-'||p_comment::text end,'circle:'||p_event||':'||p_recipient::text)
 on conflict(user_id,source_key) do nothing;
end;$$;
create function public.community_mentions(p_text text,p_actor uuid,p_anon boolean,p_post uuid,p_comment uuid,p_event text,p_skip uuid[]) returns void language plpgsql security definer set search_path=public as $$
declare recipient uuid;begin
 for recipient in select distinct c.user_id from regexp_matches(p_text,'@([a-zA-Z0-9_]{3,24})','g') m join community_profiles c on c.username=lower(m[1]) where not(c.user_id=any(p_skip)) loop
  perform community_notice(recipient,p_actor,p_anon,'mention',p_post,p_comment,case when p_comment is null then 'seni bir paylaşımda etiketledi.' else 'seni bir yorumda etiketledi.' end,p_event);
 end loop;
end;$$;

create function public.community_write(p_action text,p_data jsonb default '{}'::jsonb) returns jsonb language plpgsql security definer set search_path=public as $$
#variable_conflict use_column
declare u uuid:=auth.uid(); cp community_profiles; p community_posts; c community_comments; target community_comments; i uuid; anon_mode boolean; owner uuid; admin_mode boolean; new_reaction boolean; recipient uuid; skip_ids uuid[]:=array[]::uuid[];begin
 if u is null then raise exception 'Giriş yapmalısın.';end if;
 -- Serialize this user's writes, including quota checks and reaction toggles.
 perform pg_advisory_xact_lock(hashtextextended(u::text,17));
 admin_mode:=public.is_profile_admin();
 insert into community_profiles(user_id,username) values(u,'uye_'||substr(replace(gen_random_uuid()::text,'-',''),1,12)) on conflict(user_id) do nothing;
 select * into cp from community_profiles where user_id=u;
 if p_action='profile' then
  if not admin_mode and lower(trim(p_data->>'username')) in('ozge','ozge_batigun','goldkozmos','admin','yonetici') then raise exception 'Bu kullanıcı adı yönetime ayrılmıştır.';end if;
  if length(coalesce(p_data->>'avatar',''))>1000 or (nullif(p_data->>'avatar','') is not null and p_data->>'avatar' !~ '^https://') then raise exception 'Fotoğraf bağlantısı geçersiz.';end if;
  update community_profiles set username=lower(trim(p_data->>'username')),display_name=trim(coalesce(p_data->>'name','')),bio=trim(coalesce(p_data->>'bio','')),avatar_url=nullif(p_data->>'avatar','') where user_id=u;
  return jsonb_build_object('ok',true);
 elsif p_action='post' then
  if exists(select 1 from community_posts where user_id=u and created_at>now()-interval '30 seconds') then raise exception 'Yeni paylaşım için kısa bir süre bekle.';end if;
  insert into community_posts(user_id,title,body,category,is_anonymous) values(u,trim(p_data->>'title'),trim(p_data->>'body'),p_data->>'category',coalesce((p_data->>'anonymous')::boolean,false)) returning * into p;
  perform community_mentions(p.body,u,p.is_anonymous,p.id,null,p.id::text,array[u]);
  return jsonb_build_object('id',p.id);
 elsif p_action in('announcement') then
  if not admin_mode then raise exception 'Yönetici yetkisi gerekli.';end if;
  insert into notifications(user_id,title,body,type,link,created_by,source_key) select c.user_id,left(trim(p_data->>'title'),80),trim(p_data->>'body'),'system','/bildirimler',u,'circle-announcement:'||gen_random_uuid()::text from community_profiles c;
  return jsonb_build_object('ok',true);
 end if;
 select * into p from community_posts where id=(p_data->>'post_id')::uuid;
 if p.id is null then raise exception 'Paylaşım bulunamadı.';end if;
 if p_action='moderate' then
  if not admin_mode then raise exception 'Yönetici yetkisi gerekli.';end if;
  if p_data->>'status' not in('active','hidden') then raise exception 'Geçersiz işlem.';end if;
  if nullif(p_data->>'comment_id','') is null then update community_posts set status=p_data->>'status' where id=p.id;
  else update community_comments set status=p_data->>'status' where id=(p_data->>'comment_id')::uuid and post_id=p.id;end if;
  update community_reports set resolved_at=now() where post_id=p.id and (nullif(p_data->>'comment_id','') is null or comment_id=(p_data->>'comment_id')::uuid);
  return jsonb_build_object('ok',true);
 end if;
 if p.status<>'active' then raise exception 'Bu paylaşım artık görünür değil.';end if;
 if p_action='comment' then
  if exists(select 1 from community_comments where user_id=u and created_at>now()-interval '5 seconds') then raise exception 'Yeni yorum için kısa bir süre bekle.';end if;
  if nullif(p_data->>'reply_to','') is not null then
   select * into target from community_comments where id=(p_data->>'reply_to')::uuid and post_id=p.id and status='active';
   if target.id is null then raise exception 'Yanıtlanacak yorum bulunamadı.';end if;
  end if;
  anon_mode:=coalesce((p_data->>'anonymous')::boolean,false) or (p.user_id=u and p.is_anonymous) or coalesce(target.user_id=u and target.is_anonymous,false);
  insert into community_comments(post_id,user_id,parent_id,reply_to,body,is_anonymous) values(p.id,u,coalesce(target.parent_id,target.id),target.id,trim(p_data->>'body'),anon_mode) returning * into c;
  if target.id is not null then
   perform community_notice(target.user_id,u,anon_mode,case when admin_mode and not anon_mode then 'admin_reply' else 'comment_reply' end,p.id,c.id,'yorumuna cevap verdi.',c.id::text);skip_ids:=array_append(skip_ids,target.user_id);
  else perform community_notice(p.user_id,u,anon_mode,case when admin_mode and not anon_mode then 'admin_reply' else 'post_comment' end,p.id,c.id,'paylaşımına yorum yaptı.',c.id::text);skip_ids:=array_append(skip_ids,p.user_id);end if;
  if target.id is not null and p.user_id<>target.user_id then perform community_notice(p.user_id,u,anon_mode,case when admin_mode and not anon_mode then 'admin_reply' else 'post_comment' end,p.id,c.id,'paylaşımındaki sohbete katıldı.',c.id::text);skip_ids:=array_append(skip_ids,p.user_id);end if;
  perform community_mentions(c.body,u,anon_mode,p.id,c.id,c.id::text,skip_ids||array[u]);
  return jsonb_build_object('id',c.id);
 elsif p_action='support' then
  if nullif(p_data->>'comment_id','') is not null then
   select * into c from community_comments where id=(p_data->>'comment_id')::uuid and post_id=p.id and status='active';if c.id is null then raise exception 'Yorum bulunamadı.';end if;
   if exists(select 1 from community_reactions where user_id=u and comment_id=c.id) then delete from community_reactions where user_id=u and comment_id=c.id;
   else insert into community_reactions(user_id,comment_id) values(u,c.id) returning id into i;perform community_notice(c.user_id,u,(p.user_id=u and p.is_anonymous) or exists(select 1 from community_comments ac where ac.post_id=p.id and ac.user_id=u and ac.is_anonymous),'comment_reaction',p.id,c.id,'yorumunu destekledi.','reaction:'||i::text);end if;
  else
   if exists(select 1 from community_reactions where user_id=u and post_id=p.id) then delete from community_reactions where user_id=u and post_id=p.id;
   else insert into community_reactions(user_id,post_id) values(u,p.id) returning id into i;perform community_notice(p.user_id,u,(p.user_id=u and p.is_anonymous) or exists(select 1 from community_comments ac where ac.post_id=p.id and ac.user_id=u and ac.is_anonymous),'post_reaction',p.id,null,'paylaşımını destekledi.','reaction:'||i::text);end if;
  end if;
 elsif p_action='save' then
  if exists(select 1 from community_saves where user_id=u and post_id=p.id) then delete from community_saves where user_id=u and post_id=p.id;else insert into community_saves(user_id,post_id) values(u,p.id);end if;
 elsif p_action='report' then
  if nullif(p_data->>'comment_id','') is not null and not exists(select 1 from community_comments where id=(p_data->>'comment_id')::uuid and post_id=p.id) then raise exception 'Yorum bulunamadı.';end if;
  insert into community_reports(user_id,post_id,comment_id,reason) values(u,p.id,nullif(p_data->>'comment_id','')::uuid,trim(p_data->>'reason')) on conflict do nothing;
 else raise exception 'Geçersiz işlem.';end if;
 return jsonb_build_object('ok',true);
end;$$;

create function public.community_read(p_kind text,p_options jsonb default '{}'::jsonb) returns jsonb language plpgsql security definer set search_path=public as $$
#variable_conflict use_column
declare result jsonb; person community_profiles; p community_posts; u uuid:=auth.uid();begin
 if p_kind<>'me' and u is null then raise exception 'Çembere katılmak için giriş yapmalısın.';end if;
 if p_kind='me' then
  return jsonb_build_object('authenticated',u is not null,'admin',u is not null and public.is_profile_admin(),'profile',(select to_jsonb(c)-'user_id' from community_profiles c where user_id=u));
 elsif p_kind='feed' then
  if coalesce((p_options->>'saved')::boolean,false) and u is null then raise exception 'Giriş yapmalısın.';end if;
  select coalesce(jsonb_agg(community_post_json(x) order by x.created_at desc,x.id desc),'[]') into result from (
   select p.* from community_posts p where p.status='active' and (nullif(p_options->>'category','') is null or p.category=p_options->>'category')
   and (not coalesce((p_options->>'saved')::boolean,false) or exists(select 1 from community_saves s where s.post_id=p.id and s.user_id=u))
   and (nullif(p_options->>'before','') is null or (p.created_at,p.id)<((p_options->>'before')::timestamptz,(p_options->>'cursor')::uuid)) order by p.created_at desc,p.id desc limit 21
  ) x;return jsonb_build_object('items',result);
 elsif p_kind='post' then
  select * into p from community_posts where id=(p_options->>'id')::uuid and (status='active' or (u is not null and public.is_profile_admin()));
  if p.id is null then raise exception 'Paylaşım bulunamadı.';end if;
  return jsonb_build_object('post',community_post_json(p));
 elsif p_kind='comments' then
  if not exists(select 1 from community_posts where id=(p_options->>'post_id')::uuid and status='active') then raise exception 'Paylaşım bulunamadı.';end if;
  select coalesce(jsonb_agg(community_comment_json(x) order by x.created_at,x.id),'[]') into result from (select c.* from community_comments c where c.post_id=(p_options->>'post_id')::uuid and c.status='active'
    and c.parent_id is not distinct from nullif(p_options->>'parent_id','')::uuid
    and (nullif(p_options->>'after','') is null or (c.created_at,c.id)>((p_options->>'after')::timestamptz,(p_options->>'cursor')::uuid)) order by c.created_at,c.id limit 31) x;
  return jsonb_build_object('items',result,'reply_counts',(select coalesce(jsonb_object_agg(x.parent_id::text,x.n),'{}') from (select parent_id,count(*) n from community_comments where post_id=(p_options->>'post_id')::uuid and status='active' and parent_id is not null group by parent_id)x));
 elsif p_kind='comment_context' then
  select * into p from community_posts where id=(p_options->>'post_id')::uuid and status='active';if p.id is null then raise exception 'Paylaşım bulunamadı.';end if;
  return (select jsonb_build_object('comment',community_comment_json(c),'root',community_comment_json(r)) from community_comments c join community_comments r on r.id=coalesce(c.parent_id,c.id) where c.id=(p_options->>'id')::uuid and c.post_id=p.id and c.status='active' and r.status='active');
 elsif p_kind='profile' then
  select * into person from community_profiles where username=p_options->>'username';if person.user_id is null then raise exception 'Profil bulunamadı.';end if;
  return jsonb_build_object('profile',(to_jsonb(person)-'user_id')||jsonb_build_object('admin',exists(select 1 from profiles where id=person.user_id and role='admin')),
   'posts',(select coalesce(jsonb_agg(community_post_json(x) order by x.created_at desc),'[]') from (select p.* from community_posts p where p.user_id=person.user_id and not p.is_anonymous and p.status='active' order by p.created_at desc limit 50)x),
   'comments',(select coalesce(jsonb_agg(community_comment_json(x) order by x.created_at desc),'[]') from (select c.* from community_comments c join community_posts p on p.id=c.post_id where c.user_id=person.user_id and not c.is_anonymous and c.status='active' and p.status='active' order by c.created_at desc limit 50)x));
 elsif p_kind='notifications' then
  if u is null then raise exception 'Giriş yapmalısın.';end if;
  select coalesce(jsonb_agg(to_jsonb(x) order by x.created_at desc),'[]') into result from (select id,title,body,type,link,is_read,created_at,actor_username,actor_avatar from notifications where user_id=u
   and case coalesce(p_options->>'filter','all') when 'comments' then type='post_comment' when 'replies' then type in('comment_reply','admin_reply') when 'likes' then type in('post_reaction','comment_reaction') when 'admin' then type='admin_reply' else true end
   and (nullif(p_options->>'before','') is null or (created_at,id)<((p_options->>'before')::timestamptz,(p_options->>'cursor')::uuid)) order by created_at desc,id desc limit 51)x;
  return jsonb_build_object('items',result,'unread',(select count(*) from notifications where user_id=u and not is_read));
 elsif p_kind='admin' then
  if u is null or not public.is_profile_admin() then raise exception 'Yönetici yetkisi gerekli.';end if;
  return jsonb_build_object('reports',(select coalesce(jsonb_agg(to_jsonb(x)),'[]') from (select r.*,p.title,p.body,p.user_id as author_account,c.body as comment_body,c.user_id as comment_account from community_reports r join community_posts p on p.id=r.post_id left join community_comments c on c.id=r.comment_id where r.resolved_at is null order by r.created_at desc limit 100)x),
   'posts',(select coalesce(jsonb_agg(to_jsonb(x)),'[]') from (select p.*,c.username from community_posts p join community_profiles c on c.user_id=p.user_id order by p.created_at desc limit 100)x));
 end if;
 raise exception 'Geçersiz sorgu.';
end;$$;
revoke all on function public.community_actor(uuid,boolean),public.community_post_json(public.community_posts),public.community_comment_json(public.community_comments),public.community_notice(uuid,uuid,boolean,text,uuid,uuid,text,text),public.community_mentions(text,uuid,boolean,uuid,uuid,text,uuid[]),public.community_read(text,jsonb),public.community_write(text,jsonb) from public,anon,authenticated;
grant execute on function public.community_read(text,jsonb) to anon,authenticated;
grant execute on function public.community_write(text,jsonb) to authenticated;
-- Existing notification policies protect each recipient; realtime only exposes their own rows.
do $$begin if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='notifications') then alter publication supabase_realtime add table public.notifications;end if;end;$$;
notify pgrst,'reload schema';
commit;

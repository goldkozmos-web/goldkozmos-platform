begin;
create table if not exists public.chat_threads (
 id uuid primary key default gen_random_uuid(), token_hash text not null unique,
 name text not null default 'Ziyaretçi' check(length(name) between 1 and 60),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unread integer not null default 0
);
create table if not exists public.chat_messages (
 id uuid primary key default gen_random_uuid(), thread_id uuid not null references public.chat_threads(id) on delete cascade,
 sender text not null check(sender in ('visitor','admin')), body text not null check(length(body) between 1 and 2000),
 request_id uuid not null, created_at timestamptz not null default now(), unique(thread_id, request_id)
);
create index if not exists chat_messages_thread_time on public.chat_messages(thread_id,created_at);
alter table public.chat_threads enable row level security;
alter table public.chat_messages enable row level security;
revoke all on public.chat_threads,public.chat_messages from anon,authenticated;
grant select on public.chat_threads,public.chat_messages to authenticated;
create policy chat_owner_threads on public.chat_threads for select to authenticated using (lower(auth.jwt()->>'email')='goldkozmos@gmail.com');
create policy chat_owner_messages on public.chat_messages for select to authenticated using (lower(auth.jwt()->>'email')='goldkozmos@gmail.com');

create or replace function public.chat_visit(p_token text,p_body text default null,p_name text default null,p_request uuid default null)
returns jsonb language plpgsql security definer set search_path=public as $$
declare t public.chat_threads; m public.chat_messages; h text;
begin
 if p_token !~ '^[a-f0-9]{64}$' or p_token is null then raise exception 'Geçersiz sohbet.'; end if;
 h:=encode(sha256(convert_to(p_token,'UTF8')),'hex');
 perform pg_advisory_xact_lock(hashtextextended(h,0));
 select * into t from public.chat_threads where token_hash=h;
 if p_body is not null then
  if length(trim(p_body)) not between 1 and 2000 or p_request is null then raise exception 'Mesaj 1–2000 karakter olmalı.'; end if;
  if t.id is null then
   if (select count(*) from public.chat_threads where created_at>now()-interval '1 day')>=500 then raise exception 'Şu an yoğunluk var. Biraz sonra tekrar dene.'; end if;
   insert into public.chat_threads(token_hash,name) values(h,left(coalesce(nullif(trim(p_name),''),'Ziyaretçi'),60)) returning * into t;
  end if;
  select * into m from public.chat_messages where thread_id=t.id and request_id=p_request;
  if m.id is null then
   if (select count(*) from public.chat_messages where thread_id=t.id and sender='visitor' and created_at>now()-interval '1 minute')>=5
    or (select count(*) from public.chat_messages where thread_id=t.id and sender='visitor' and created_at>now()-interval '1 day')>=100 then raise exception 'Çok hızlı yazıyorsun. Biraz bekleyip tekrar dene.'; end if;
   insert into public.chat_messages(thread_id,sender,body,request_id) values(t.id,'visitor',trim(p_body),p_request) returning * into m;
   update public.chat_threads set updated_at=now(),unread=unread+1 where id=t.id;
  else
   return jsonb_build_object('messages',(select coalesce(jsonb_agg(x order by x.created_at,x.id),'[]'::jsonb) from (select id,sender,body,created_at from public.chat_messages where thread_id=t.id order by created_at desc,id desc limit 200) x),'new',false);
  end if;
 end if;
 return jsonb_build_object('messages',(select coalesce(jsonb_agg(x order by x.created_at,x.id),'[]'::jsonb) from (select id,sender,body,created_at from public.chat_messages where thread_id=t.id order by created_at desc,id desc limit 200) x),'new',m.id is not null);
end $$;
revoke all on function public.chat_visit(text,text,text,uuid) from public;
grant execute on function public.chat_visit(text,text,text,uuid) to anon,authenticated;

create or replace function public.chat_admin_reply(p_thread uuid,p_body text default null,p_request uuid default null)
returns void language plpgsql security definer set search_path=public as $$
begin
 if coalesce(lower(auth.jwt()->>'email'),'')<>'goldkozmos@gmail.com' then raise exception 'Yönetici girişi gerekli.'; end if;
 perform 1 from public.chat_threads where id=p_thread for update;
 if not found then raise exception 'Sohbet bulunamadı.'; end if;
 if p_body is not null then
  if length(trim(p_body)) not between 1 and 2000 or p_request is null then raise exception 'Geçersiz mesaj.'; end if;
  insert into public.chat_messages(thread_id,sender,body,request_id) values(p_thread,'admin',trim(p_body),p_request) on conflict(thread_id,request_id) do nothing;
  update public.chat_threads set updated_at=now(),unread=0 where id=p_thread;
 else update public.chat_threads set unread=0 where id=p_thread;
 end if;
end $$;
revoke all on function public.chat_admin_reply(uuid,text,uuid) from public,anon;
grant execute on function public.chat_admin_reply(uuid,text,uuid) to authenticated;
commit;

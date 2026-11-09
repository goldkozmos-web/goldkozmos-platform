-- Transactional checks: all inserted fixtures are rolled back.
begin;
select set_config('request.jwt.claims', json_build_object('sub',(select id from auth.users where lower(email)='goldkozmos@gmail.com' limit 1),'email','goldkozmos@gmail.com','role','authenticated')::text,true);
set local role authenticated;
do $$
declare c uuid; w uuid; n integer; v integer; k text; other uuid:=gen_random_uuid(); owner_uid uuid:=auth.uid();
begin
 if owner_uid is null then raise exception 'Owner account not found'; end if;
 insert into public.panel_records(kind,data) values('clients','{"title":"PANEL TEST - rollback"}') returning id into c;
 insert into public.panel_records(kind,data) values('works',jsonb_build_object('title','Test çalışma','clientId',c,'paid','1500','completed','2')) returning id into w;
 update public.panel_records set data=data||'{"note":"updated"}' where id=w;
 select version into v from public.panel_records where id=w;
 if v<>2 then raise exception 'Version update failed'; end if;
 update public.panel_records set data=data||'{"note":"stale write"}' where id=w and version=1;
 get diagnostics n=row_count;
 if n<>0 then raise exception 'Optimistic lock failed'; end if;
 begin
  update public.panel_records set deleted_at=now() where id=c;
  raise exception 'Linked client deletion unexpectedly succeeded';
 exception when raise_exception then
  if SQLERRM<>'Archive linked records first' then raise; end if;
 end;
 update public.panel_records set deleted_at=now() where id=w;
 update public.panel_records set deleted_at=now() where id=c;
 update public.panel_records set deleted_at=null where id=c;
 update public.panel_records set deleted_at=null where id=w;
 if (select count(*) from public.panel_records where id in(c,w) and deleted_at is null)<>2 then raise exception 'Restore failed'; end if;
 foreach k in array array['appointments','broadcasts','tasks','instagram','youtube','notes','services'] loop
  insert into public.panel_records(kind,data) values(k,jsonb_build_object('title','PANEL TEST - rollback','date','2026-10-29'));
 end loop;
 perform set_config('request.jwt.claims',json_build_object('sub',owner_uid,'email','member-panel-test@example.invalid','role','authenticated')::text,true);
 if exists(select 1 from public.panel_records where id in(c,w)) then raise exception 'Non-admin read allowed'; end if;
 begin
  insert into public.panel_records(kind,data) values('notes','{"title":"DENIED"}');
  raise exception 'Non-admin insert allowed';
 exception when insufficient_privilege then null;
 end;
 perform set_config('request.jwt.claims',json_build_object('sub',other,'email','goldkozmos@gmail.com','role','authenticated')::text,true);
 if exists(select 1 from public.panel_records where id in(c,w)) then raise exception 'Different owner read allowed'; end if;
 perform set_config('request.jwt.claims',json_build_object('sub',owner_uid,'email','goldkozmos@gmail.com','role','authenticated')::text,true);
 if not exists(select 1 from public.panel_records where id=w) then raise exception 'Owner read failed'; end if;
end $$;
reset role;
set local role anon;
do $$begin
 begin
  perform 1 from public.panel_records limit 1;
  raise exception 'Anonymous read allowed';
 exception when insufficient_privilege then null;
 end;
end $$;
reset role;
rollback;
select 'PASS: owner CRUD, 9 modules, soft-delete, restore, optimistic lock, non-admin/other-owner/anonymous isolation. Fixtures rolled back.' as panel_database_test;

begin;
revoke all on public.comments from anon;
grant select (id, post_id, content) on public.comments to anon;
notify pgrst, 'reload schema';
commit;

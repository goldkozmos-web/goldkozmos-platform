const fs = require('node:fs'), vm = require('node:vm'), ts = require('typescript');
const test = require('node:test'), assert = require('node:assert/strict');
function fixture({ roster = [{auth_user_id:'a'},{auth_user_id:'a'},{auth_user_id:'b'}], rosterError = null, admin = true, insertError = null } = {}) {
  const inserted = [], calls = [];
  const client = { from(table) { calls.push(table); const query = {
    eq() { return query; }, not() { return Promise.resolve({data:roster,error:rosterError}); },
    select() { return query; }, in(_column, ids) { return Promise.resolve({data:ids.filter(id=>id!=="orphan").map(id=>({id})),error:null}); },
    insert(rows) { inserted.push(...rows); return { select: async () => ({ data: insertError ? null : rows.map((row,i)=>({...row,id:String(i),created_at:'2026-10-07T00:00:00Z'})), error:insertError }) }; }
  }; return query; } };
  const mocks = {
    '../supabase/create-server-client': {createSupabaseServerClient:async()=>client},
    '../admin/auth.server': {getAdminAccess:async()=>admin?{status:'ok',actor:{id:'admin'}}:{status:'forbidden'}},
    '../profilim/auth.server': {getProfilimSessionUser:async()=>null},
    './validate': {parseMemberMessageInput:raw=>raw.title&&raw.body&&raw.recipientId ? raw : {error:'invalid'}}
  };
  const module = {exports:{}};
  const code = ts.transpileModule(fs.readFileSync('src/lib/messages/server.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  vm.runInNewContext(code,{module,exports:module.exports,require:name=>mocks[name],Date,Set});
  return {server:module.exports,inserted,calls};
}
const message = {title:'Yeni içerik',body:'Duyuru metni',recipientId:'all'};
test('bulk announcements deduplicate active recipients and return stored message ids',async()=>{const f=fixture();const result=await f.server.sendMemberMessage(message);assert.equal(result.count,2);assert.equal(f.inserted.length,2);assert.equal(result.sent[0].id,'0');});
test('roster failure never falls back to broadcasting to every profile',async()=>{const f=fixture({rosterError:{code:'denied'}});const result=await f.server.sendMemberMessage(message);assert.equal(result.status,500);assert.equal(f.inserted.length,0);assert.equal(f.calls.includes('profiles'),false);});
test('empty active roster sends nothing',async()=>{const f=fixture({roster:[]});assert.equal((await f.server.sendMemberMessage(message)).status,400);assert.equal(f.inserted.length,0);});
test('non-admin cannot send member announcements',async()=>{const f=fixture({admin:false});assert.equal((await f.server.sendMemberMessage(message)).status,401);assert.equal(f.inserted.length,0);});
test('failed database insert never reports successful delivery',async()=>{const f=fixture({insertError:{code:'failure'}});assert.equal((await f.server.sendMemberMessage(message)).status,500);});

test("historical roster without a profile does not break the announcement",async()=>{const f=fixture({roster:[{auth_user_id:"a"},{auth_user_id:"orphan"}]});const result=await f.server.sendMemberMessage(message);assert.equal(result.count,1);assert.equal(f.inserted[0].recipient_id,"a");});

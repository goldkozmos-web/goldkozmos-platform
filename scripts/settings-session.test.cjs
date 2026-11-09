const fs = require('node:fs'), vm = require('node:vm'), ts = require('typescript');
const test = require('node:test'), assert = require('node:assert/strict');
const moduleUnderTest = { exports: {} };
const code = ts.transpileModule(fs.readFileSync('src/lib/profilim/settings-session.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
vm.runInNewContext(code,{module:moduleUnderTest,exports:moduleUnderTest.exports,setTimeout,clearTimeout,require(name){
 if(name==='./userFromAuth') return {profilimUserFromAuth:user=>user};
 if(name==='../admin/access') return {isSiteAdminEmail:email=>email==='goldkozmos@gmail.com'};
 if(name==='./sessionEvents') return {shouldClearProfilimUser:event=>event==='SIGNED_OUT'};
 throw Error(name);
}});
const {startSettingsSession}=moduleUnderTest.exports;
const user={id:'member',displayName:'Member',email:'member@example.test'};
function fixture(initial=user,timeout=1000){let resolve,reject,callback,unsubscribed=false;const states=[];
 const pending=new Promise((yes,no)=>{resolve=yes;reject=no});
 const client={auth:{getUser(){throw Error('Settings must not block on getUser');},getSession:()=>pending,onAuthStateChange:cb=>{callback=cb;return {data:{subscription:{unsubscribe(){unsubscribed=true}}}}}}};
 const close=startSettingsSession(client,initial,value=>states.push(value),timeout);
 return {states,resolve,reject,close,event:(event,session)=>callback(event,session),unsubscribed:()=>unsubscribed};
}
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));
test('server verified session survives empty browser initialization',async()=>{const f=fixture();f.event('INITIAL_SESSION',null);f.resolve({data:{session:null},error:null});await tick();assert.equal(f.states.at(-1).user.id,'member');assert.equal(f.states.at(-1).ready,true);f.close();});
test('network rejection cannot erase a verified session',async()=>{const f=fixture();f.reject(Error('network'));await tick();assert.equal(f.states.at(-1).user.id,'member');assert.equal(f.states.at(-1).error,'');f.close();});
test('hung mobile session ends with retry feedback',async()=>{const f=fixture(null,10);await new Promise(resolve=>setTimeout(resolve,25));assert.equal(f.states.at(-1).ready,true);assert.match(f.states.at(-1).error,/Yeniden/);f.close();});
test('explicit sign-out is not undone by a late session result',async()=>{const f=fixture();f.event('SIGNED_OUT',null);f.resolve({data:{session:{user}},error:null});await tick();assert.equal(f.states.at(-1).user,null);f.close();});
test('sign-in while settings is open updates the shared session',async()=>{const f=fixture(null);f.event('SIGNED_IN',{user});f.resolve({data:{session:null},error:null});await tick();assert.equal(f.states.at(-1).user.id,'member');f.close();});
test('unmount prevents late updates and cleans up subscription',async()=>{const f=fixture(null,10);f.close();f.resolve({data:{session:{user}},error:null});await tick();assert.equal(f.states.length,0);assert.equal(f.unsubscribed(),true);});

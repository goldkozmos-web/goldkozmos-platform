"use client";
function supported(){return typeof window!=="undefined"&&"serviceWorker" in navigator&&"PushManager" in window&&typeof Notification!=="undefined";}
function limit<T>(promise:Promise<T>,ms=12000):Promise<T>{return new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('timeout')),ms);promise.then(value=>{clearTimeout(timer);resolve(value);},error=>{clearTimeout(timer);reject(error);});});}
function applicationKey(value:string){const raw=atob((value+'='.repeat((4-value.length%4)%4)).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from(raw,char=>char.charCodeAt(0));}
export async function enableMemberPush(){
 if(!supported())return {ok:false as const,reason:'unsupported' as const};
 try{
  const permission=Notification.permission==='granted'?'granted':await Notification.requestPermission();
  if(permission!=='granted')return {ok:false as const,reason:'denied' as const};
  const registration=await limit(navigator.serviceWorker.register('/sw.js',{scope:'/'}));
  await limit(navigator.serviceWorker.ready);
  const keyResponse=await fetch('/api/profilim/push',{cache:'no-store',signal:AbortSignal.timeout(12000)});
  const key=await keyResponse.json() as {publicKey?:string};if(!keyResponse.ok||!key.publicKey)return {ok:false as const,reason:'key' as const};
  const subscription=await limit(registration.pushManager.getSubscription())||await limit(registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:applicationKey(key.publicKey)}));
  const save=await fetch('/api/profilim/push',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({subscription}),signal:AbortSignal.timeout(12000)});
  if(!save.ok)return {ok:false as const,reason:'save' as const};
  return {ok:true as const,registration};
 }catch{return {ok:false as const,reason:'network' as const};}
}
export async function showLocalTodoNotice(title:string,body:string){
 if(!supported()||Notification.permission!=='granted')return false;
 try{const registration=await limit(navigator.serviceWorker.ready);await registration.showNotification(title,{body,icon:'/notifications/goldkozmos-icon.png',badge:'/notifications/goldkozmos-badge.png?v=2',data:{url:'/profilim?open=todos'}});return true;}catch{return false;}
}
export async function sendTodoPhoneNotice(title:string,body:string){
 const ready=await enableMemberPush();if(!ready.ok)return ready;
 try{const response=await fetch('/api/profilim/push/send',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,body,url:'/profilim?open=todos'}),signal:AbortSignal.timeout(15000)});const result=await response.json() as {sent?:number};if(response.ok&&(result.sent??0)>0)return {ok:true as const};}catch{/* Try the device's registered worker. */}
 const displayed=await showLocalTodoNotice(title,body);return displayed?{ok:true as const}:{ok:false as const,reason:'delivery' as const};
}

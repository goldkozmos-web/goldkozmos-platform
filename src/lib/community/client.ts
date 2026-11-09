"use client";
export async function circleRead<T>(kind:string,options:Record<string,unknown>={}):Promise<T>{
 const query=new URLSearchParams({kind,options:JSON.stringify(options)});
 const response=await fetch(`/api/paylasim-cemberi?${query}`,{cache:'no-store',credentials:'same-origin'});
 const data=await response.json();if(!response.ok)throw Error(data.error||'Topluluk yüklenemedi.');return data;
}
export async function circleWrite<T=Record<string,unknown>>(action:string,data:Record<string,unknown>):Promise<T>{
 const response=await fetch('/api/paylasim-cemberi',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data})});
 const result=await response.json();if(!response.ok)throw Error(result.error||'İşlem tamamlanamadı.');window.dispatchEvent(new Event('community-changed'));return result;
}
export function mentionParts(text:string){return text.split(/(@[a-zA-Z0-9_]{3,24})/g);}
export function circleTime(value:string){return new Intl.DateTimeFormat('tr-TR',{timeZone:'Europe/Istanbul',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(value));}

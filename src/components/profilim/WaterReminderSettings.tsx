"use client";
import { useEffect, useState } from 'react';
import { enableMemberPush } from '../../lib/push/browser';
import { WATER_DEFAULTS, readWaterPreferences } from '../../lib/profilim/water-schedule';
import { writeWaterSettings } from '../../lib/profilim/waterStore';
import { waterCalendar } from '../../lib/profilim/water-calendar';

export default function WaterReminderSettings({ userId }: { userId: string }) {
 const [enabled,setEnabled]=useState(false),[interval,setIntervalValue]=useState(120),[pending,setPending]=useState(false),[loading,setLoading]=useState(true),[status,setStatus]=useState('');
 const [preferences,setPreferences]=useState(WATER_DEFAULTS);
 useEffect(()=>{let active=true;void fetch('/api/profilim/water',{cache:'no-store'}).then(response=>{if(!response.ok)throw Error();return response.json();}).then(data=>{if(active){setEnabled(data.enabled);setIntervalValue(data.intervalMinutes);setPreferences(readWaterPreferences(data.preferences));}}).catch(()=>{if(active)setStatus('Ayarların yüklenemedi; yeniden kaydetmeyi deneyebilirsin.');}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[]);
 async function save(nextEnabled:boolean){
  if(pending||loading)return;setPending(true);setStatus('');
  const permissionPromise=nextEnabled?enableMemberPush():null;
  try {
   const response=await fetch('/api/profilim/water',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({enabled:nextEnabled,intervalMinutes:interval,preferences})});
   if(!response.ok){const result=await response.json();throw Error(result.error||'Ayarlar kaydedilemedi.');}
   setEnabled(nextEnabled);writeWaterSettings(userId,preferences);
   const permission=await permissionPromise;
   setStatus(!nextEnabled?'Ayarların kaydedildi. Site hatırlatmaları kapalı.':permission?.ok?'Ayarların kaydedildi; bildirim iznin açık. Site kapalıyken düzenli hatırlatma için takvim seçeneğini kullan.':'Ayarların kaydedildi. Bildirim izni açılamadı; takvim seçeneğini kullanabilirsin.');
  }catch(error){setStatus(error instanceof Error?error.message:'Kaydedilemedi.');}finally{setPending(false);}
 }
 async function test(){
  if(pending||loading)return;setPending(true);setStatus('');
  const ready=await enableMemberPush();
  try{if(!ready.ok)throw Error('Bildirim izni açılamadı. iPhone kullanıyorsan önce siteyi ana ekrana ekleyip oradan aç.');
   const options={body:'Su molası zamanı. Bu bir deneme bildirimidir.',icon:'/notifications/goldkozmos-icon.png',tag:'water-test',vibrate:preferences.vibration?[160,80,160]:[],silent:!preferences.vibration,data:{url:'/profilim?open=water'}};
   await ready.registration.showNotification('GoldKozmos · Su molası',options);
   setStatus('Deneme bildirimi gönderildi. Titreşim ve saat gösterimini cihaz ayarlarından kontrol et.');
  }catch(error){setStatus(error instanceof Error?error.message:'Deneme gönderilemedi.');}finally{setPending(false);}
 }
 function exportCalendar(){
  const file=new Blob([waterCalendar(new Date(),interval,preferences.startHour,preferences.endHour)],{type:'text/calendar;charset=utf-8'});
  const url=URL.createObjectURL(file),link=document.createElement('a');link.href=url;link.download='goldkozmos-su-molalari.ics';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
  setStatus('30 günlük takvim dosyan hazır. Telefon takvimine aktar ve etkinlik bildirimlerini aç.');
 }
 const disabled=pending||loading;
 return <section className="profileReminderSettings waterPreferences" aria-label="Su hatırlatma ayarları">
  <h3>Su molalarını kendine göre ayarla.</h3>
  <div className="waterPreferencesGrid">
   <label>Günlük takip hedefi<select value={preferences.goal} disabled={disabled} onChange={event=>setPreferences({...preferences,goal:Number(event.target.value)})}>{Array.from({length:8},(_,i)=><option key={i} value={i+1}>{i+1} bardak</option>)}</select></label>
   <label>Hatırlatma aralığı<select value={interval} disabled={disabled} onChange={event=>setIntervalValue(Number(event.target.value))}><option value={60}>Her saat</option><option value={90}>90 dakikada bir</option><option value={120}>2 saatte bir</option><option value={180}>3 saatte bir</option></select></label>
   <label>Başlangıç · İstanbul saati<select value={preferences.startHour} disabled={disabled} onChange={event=>{const startHour=Number(event.target.value);setPreferences({...preferences,startHour,endHour:Math.max(startHour+1,preferences.endHour)});}}>{Array.from({length:24},(_,i)=><option key={i} value={i}>{String(i).padStart(2,'0')}:00</option>)}</select></label>
   <label>Bitiş · İstanbul saati<select value={preferences.endHour} disabled={disabled} onChange={event=>setPreferences({...preferences,endHour:Number(event.target.value)})}>{Array.from({length:24-preferences.startHour},(_,i)=>{const hour=i+preferences.startHour+1;return <option key={hour} value={hour}>{String(hour).padStart(2,'0')}:00</option>;})}</select></label>
  </div>
  <label className="waterVibrationToggle"><input type="checkbox" checked={preferences.vibration} disabled={disabled} onChange={event=>setPreferences({...preferences,vibration:event.target.checked})}/>Titreşim iste (destekleyen cihazlarda)</label>
  <div className="waterPreferencesActions"><button type="button" disabled={disabled} onClick={()=>void save(true)}>{pending?'Kaydediliyor…':enabled?'Ayarları kaydet':'Kaydet ve hatırlatmayı aç'}</button><button type="button" disabled={disabled} onClick={()=>void save(false)}>Site hatırlatmasını kapat</button><button type="button" disabled={disabled} onClick={()=>void test()}>Bildirimi dene</button></div>
  {status?<p role="status">{status}</p>:null}
  <details className="waterWatchGuide"><summary>Site kapalıyken ve akıllı saatte hatırlatma</summary><p>Site açıkken seçtiğin saatlerde hatırlatılır; hedef tamamlanınca site hatırlatması durur. Site kapalıyken düzenli hatırlatma için aşağıdaki takvim dosyasını telefonuna aktarabilirsin.</p><button type="button" onClick={exportCalendar} disabled={disabled}>30 günlük su molalarını takvime aktar</button><p>Dosya, seçtiğin saatleri ve aralığı kullanır. Takvim hatırlatmaları su sayacını takip etmez; kapatmak veya değiştirmek için takvimdeki tekrar eden etkinlikleri düzenle.</p><p><strong>Apple Watch:</strong> iPhone Watch uygulamasında Bildirimler → Takvim bölümünü kontrol et; takvim uyarılarını ve saatin dokunuşlarını aç.</p><p><strong>Galaxy Watch / Wear OS:</strong> Saatin telefon uygulamasında bildirimler bölümünden kullandığın takvim uygulamasına izin ver. Menü adları modele göre değişebilir.</p><p>Telefon ve saatin eşleşmiş olmalı. Sessiz mod, Odak / Rahatsız Etmeyin ve pil ayarları bildirimi veya titreşimi engelleyebilir. Her modelde gösterim ve titreşim garanti edilemez.</p></details>
 </section>;
}

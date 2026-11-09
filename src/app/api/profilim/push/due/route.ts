import { NextResponse } from 'next/server';
import { sendMemberPush } from '@/lib/admin/push-server';
import { createSupabaseServerClient } from '@/lib/supabase/create-server-client';
import { createSupabaseServiceClient } from '@/lib/supabase/service';
import { materializeWaterReminder } from '@/lib/profilim/water-reminders';
import { readWaterPreferences } from '@/lib/profilim/water-schedule';
export const dynamic='force-dynamic';
export async function POST(){
 const client=await createSupabaseServerClient();if(!client)return NextResponse.json({error:'Giriş gerekli.'},{status:401});
 const {data:{user}}=await client.auth.getUser();if(!user)return NextResponse.json({error:'Giriş gerekli.'},{status:401});
 const preferences=readWaterPreferences(user.user_metadata?.water_preferences);
 const service=createSupabaseServiceClient();
 let waterSent=0;
 try {
  await client.rpc('materialize_due_reminder_notifications');
  if(service)await materializeWaterReminder(service,user.id,preferences);
  else waterSent=await materializeWaterReminder(client,user.id,preferences,new Date(),()=>sendMemberPush(user.id,{title:'Su molası zamanı',body:'Kendine küçük bir su molası ver; takibini Profilim bölümünden güncelleyebilirsin.',url:'/profilim?open=water',vibration:preferences.vibration},client))??0;
 }catch{return NextResponse.json({error:'Hatırlatma işlenemedi; sonraki denemede tekrar kontrol edilecek.'},{status:503});}
 const {data,error}=await client.rpc('claim_pending_member_notifications');
 if(error)return NextResponse.json({error:'Bildirimler alınamadı.'},{status:503});
 let sent=waterSent;
 for(const item of data??[]){const result=await sendMemberPush(user.id,{title:String(item.title),body:String(item.body),url:item.link||'/profilim',...(String(item.link).includes('open=water')?{vibration:preferences.vibration}:{})},client);if(result.sent>0){sent+=result.sent;await client.from('notifications').update({push_sent_at:new Date().toISOString()}).eq('id',item.id).eq('user_id',user.id);}}
 return NextResponse.json({ok:true,sent});
}

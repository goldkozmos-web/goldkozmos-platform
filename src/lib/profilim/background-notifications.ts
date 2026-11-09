import { createSupabaseServiceClient } from "../supabase/service";
import { sendMemberPush } from "../admin/push-server";
import { reminderDueStamp,nextReminderDay } from "./reminder-schedule";
import { readWaterPreferences } from "./water-schedule";
import { materializeWaterReminder } from "./water-reminders";
import { istanbulDay } from "../../data/goldAct";

export async function processProfileNotifications(){
  const client=createSupabaseServiceClient();if(!client)return {configured:false,sent:0};
  const now=new Date();
  const reminders=await client.from("reminders").select("id,user_id,title,due_on,due_time,repeat_rule").is("completed_at",null).not("due_on","is",null).lte("due_on",istanbulDay()).limit(300);
  if(reminders.error) throw new Error("Görev bildirimleri alınamadı.");
  for(const row of reminders.data??[]){
    if(reminderDueStamp(row.due_on,row.due_time)>now.getTime())continue;
    const key=`reminder:${row.id}:${row.due_on}:${row.due_time||"09:00:00"}`;
    const notice=await client.from("notifications").upsert({user_id:row.user_id,title:"Hatırlatma zamanı",body:row.title,type:"reminder",link:"/profilim?open=todos",source_key:key},{onConflict:"user_id,source_key",ignoreDuplicates:true});
    if(!notice.error&&row.repeat_rule!=="none")await client.from("reminders").update({due_on:nextReminderDay(row.due_on,row.repeat_rule,now.getTime(),row.due_time),notified_at:null}).eq("id",row.id).eq("due_on",row.due_on);
  }
  const water=await client.from("water_reminder_settings").select("user_id,interval_minutes,next_due_at").eq("enabled",true).lte("next_due_at",now.toISOString()).limit(300);
  if(water.error) throw new Error("Su hatırlatmaları alınamadı.");
  for(const row of water.data??[]){
    const {data,error}=await client.auth.admin.getUserById(row.user_id);
    if(error||!data.user)continue;
    await materializeWaterReminder(client,row.user_id,readWaterPreferences(data.user.user_metadata?.water_preferences),now);
  }
  const jobs=await client.rpc("claim_profile_push_notifications");let sent=0;
  if(jobs.error)throw new Error("Bildirim kuyruğu alınamadı.");
  for(const job of jobs.data??[]){const isWater=String(job.link).includes('open=water');
    const account=isWater?await client.auth.admin.getUserById(job.user_id):null;
    const delivery=await sendMemberPush(job.user_id,{title:job.title,body:job.body,url:job.link||"/profilim",...(isWater?{vibration:readWaterPreferences(account?.data.user?.user_metadata?.water_preferences).vibration}:{})});if(delivery.sent>0){sent+=delivery.sent;await client.from("notifications").update({push_sent_at:new Date().toISOString()}).eq("id",job.id);}}
  return {configured:true,sent};
}

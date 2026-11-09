import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";
import { istanbulDay } from "@/data/goldAct";
import { nextWaterDue, parseWaterInput, readWaterPreferences } from "@/lib/profilim/water-schedule";
export const dynamic="force-dynamic";
async function context(){const client=await createSupabaseServerClient();if(!client)return null;const {data:{user}}=await client.auth.getUser();return user?{client,user}:null;}
export async function GET(){
  const ctx=await context();if(!ctx)return NextResponse.json({error:"Giriş gerekli."},{status:401});
  const day=istanbulDay();const [count,prefs]=await Promise.all([ctx.client.from("water_days").select("glasses").eq("user_id",ctx.user.id).eq("day",day).maybeSingle(),ctx.client.from("water_reminder_settings").select("enabled,interval_minutes,next_due_at").eq("user_id",ctx.user.id).maybeSingle()]);
  if(count.error||prefs.error)return NextResponse.json({error:"Su takibin yüklenemedi."},{status:503});
  return NextResponse.json({day,glasses:count.data?.glasses??null,enabled:prefs.data?.enabled??false,intervalMinutes:prefs.data?.interval_minutes??120,nextDueAt:prefs.data?.next_due_at??null,preferences:readWaterPreferences(ctx.user.user_metadata?.water_preferences)});
}
export async function POST(request:Request){
  let raw;try{raw=await request.json();}catch{return NextResponse.json({error:"Geçersiz kayıt."},{status:400});}
  const parsed=parseWaterInput(raw);if("error" in parsed)return NextResponse.json(parsed,{status:400});
  const ctx=await context();if(!ctx)return NextResponse.json({error:"Giriş gerekli."},{status:401});
  if(parsed.glasses!==undefined){const {error}=await ctx.client.from("water_days").upsert({user_id:ctx.user.id,day:istanbulDay(),glasses:parsed.glasses,updated_at:new Date().toISOString()});if(error)return NextResponse.json({error:"Bardak kaydı saklanamadı."},{status:503});}
  const preferences=parsed.preferences??readWaterPreferences(ctx.user.user_metadata?.water_preferences);
  if(parsed.preferences){const {error}=await ctx.client.auth.updateUser({data:{water_preferences:preferences}});if(error)return NextResponse.json({error:"Ayarların kaydedilemedi."},{status:503});}
  if(parsed.enabled!==undefined||parsed.intervalMinutes!==undefined||parsed.preferences!==undefined){const {data}=await ctx.client.from("water_reminder_settings").select("enabled,interval_minutes").eq("user_id",ctx.user.id).maybeSingle();const enabled=parsed.enabled??data?.enabled??false;const interval=parsed.intervalMinutes??data?.interval_minutes??120;const {error}=await ctx.client.from("water_reminder_settings").upsert({user_id:ctx.user.id,enabled,interval_minutes:interval,next_due_at:enabled?nextWaterDue(new Date(),interval,preferences.startHour,preferences.endHour):null,updated_at:new Date().toISOString()});if(error)return NextResponse.json({error:"Hatırlatma tercihi saklanamadı."},{status:503});}
  return NextResponse.json({ok:true});
}

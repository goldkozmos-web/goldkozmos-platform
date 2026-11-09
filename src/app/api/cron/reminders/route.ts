import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { processProfileNotifications } from '@/lib/profilim/background-notifications';
export const dynamic='force-dynamic';
export async function GET(request:Request){
 const secret=process.env.CRON_SECRET?.trim();
 if(!secret)return NextResponse.json({error:'Arka plan bildirim bağlantısı kurulmamış.'},{status:503});
 const expected=Buffer.from(`Bearer ${secret}`),received=Buffer.from(request.headers.get('authorization')||'');
 if(received.length!==expected.length||!timingSafeEqual(received,expected))return NextResponse.json({error:'Yetkin yok.'},{status:401});
 try { const result=await processProfileNotifications(); return NextResponse.json(result,{status:result.configured?200:503}); }
 catch { return NextResponse.json({error:"Bildirimler işlenemedi; kayıtlar sonraki deneme için korunuyor."},{status:503}); }
}

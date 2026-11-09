import {NextResponse} from 'next/server';
import {createSupabaseServerClient} from '@/lib/supabase/create-server-client';
export const dynamic='force-dynamic';
const reads=new Set(['me','feed','post','comments','comment_context','profile','notifications','admin','people']);
const writes=new Set(['profile','post','comment','support','save','report','moderate','announcement','delete','restore','follow','cover']);
function failure(error:{code?:string;message?:string}){
 if(['PGRST202','PGRST205','42P01','42883'].includes(error.code??''))return NextResponse.json({error:'Topluluk bağlantısı hazır değil. Lütfen biraz sonra tekrar dene.'},{status:503});
 if(error.code==='P0001')return NextResponse.json({error:error.message},{status:400});
 if(error.code==='23505')return NextResponse.json({error:'Bu kullanıcı adı kullanılıyor. Başka bir ad seç.'},{status:409});
 return NextResponse.json({error:'İşlem tamamlanamadı. Alanları kontrol edip yeniden dene.'},{status:400});
}
export async function GET(request:Request){
 const url=new URL(request.url),kind=url.searchParams.get('kind')??'feed';if(!reads.has(kind))return NextResponse.json({error:'Geçersiz istek.'},{status:400});
 let options;try{options=JSON.parse(url.searchParams.get('options')||'{}');}catch{return NextResponse.json({error:'Geçersiz istek.'},{status:400});}
 if(!options||typeof options!=='object'||Array.isArray(options))return NextResponse.json({error:'Geçersiz istek.'},{status:400});
 const client=await createSupabaseServerClient();if(!client)return NextResponse.json({error:'Bağlantı kurulamadı.'},{status:503});
 const {data,error}=await client.rpc(['profile','feed','people'].includes(kind)?'community_social':'community_read',{p_kind:kind,p_options:options});if(error)return failure(error);
 return NextResponse.json(data,{headers:{'Cache-Control':'private, no-store'}});
}
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return NextResponse.json({error:'Geçersiz kaynak.'},{status:403});
 const text=await request.text();if(text.length>24000)return NextResponse.json({error:'Metin çok uzun.'},{status:413});
 let body;try{body=JSON.parse(text);}catch{return NextResponse.json({error:'Geçersiz istek.'},{status:400});}
 if(!writes.has(body?.action)||!body?.data||typeof body.data!=='object'||Array.isArray(body.data))return NextResponse.json({error:'Geçersiz işlem.'},{status:400});
 const client=await createSupabaseServerClient();if(!client)return NextResponse.json({error:'Bağlantı kurulamadı.'},{status:503});
 const {data:{user}}=await client.auth.getUser();if(!user)return NextResponse.json({error:'Bu işlem için giriş yapmalısın.'},{status:401});
 const {data,error}=await (body.action==='profile'?client.rpc('community_complete_profile',{p_data:body.data}):body.action==='cover'?client.rpc('community_cover',{p_path:body.data.path??null}):body.action==='follow'?client.rpc('community_follow',{p_username:body.data.username,p_follow:body.data.follow}):['delete','restore'].includes(body.action)?client.rpc('community_post_visibility',{p_id:body.data.post_id,p_restore:body.action==='restore'}):client.rpc('community_write',{p_action:body.action,p_data:body.data}));if(error)return failure(error);
 return NextResponse.json(data,{headers:{'Cache-Control':'private, no-store'}});
}

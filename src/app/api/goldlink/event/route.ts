import { resolveAdminRequest } from "@/lib/admin/auth.server";
import { NextResponse } from "next/server";
import { createSupabaseAnonClient } from "@/lib/supabase/anon";
import { GOLDLINK_LINKS } from "@/data/goldlink";
import { isPresenceBot } from "@/lib/presence/labels";
export async function POST(request: Request) {
 if(request.headers.get('origin')!==new URL(request.url).origin) return NextResponse.json({error:'Geçersiz kaynak'},{status:403});
 if(isPresenceBot(request.headers.get('user-agent'))) return NextResponse.json({ok:true});
 let body;try{body=await request.json();}catch{return NextResponse.json({error:'Geçersiz kayıt'},{status:400});}
 if(!body || typeof body.id!=='string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.id) || !['_view',...GOLDLINK_LINKS.map(l=>l.id)].includes(body.linkId)) return NextResponse.json({error:'Geçersiz kayıt'},{status:400});
 if(/(?:^|;\s*)gk_metrics_excluded=1(?:;|$)/.test(request.headers.get('cookie')||'')) return NextResponse.json({ok:true,excluded:true});
 const {access}=await resolveAdminRequest(request);
 if(access.status==='ok') return NextResponse.json({ok:true,excluded:true});
 const client=createSupabaseAnonClient();if(!client) return NextResponse.json({ok:false},{status:503});
 const {error}=await client.rpc('record_goldlink_event',{p_id:body.id,p_link_id:body.linkId});
 return NextResponse.json({ok:!error||error.code==='23505'},{status:error&&error.code!=='23505'?503:200,headers:{'Cache-Control':'no-store'}});
}

import { NextResponse } from "next/server";
import { resolveAdminRequest } from "@/lib/admin/auth.server";
export const dynamic='force-dynamic';
export async function GET(request: Request) {
 const {access,client}=await resolveAdminRequest(request);
 if(access.status!=='ok'||!client) return NextResponse.json({error:'Yönetim oturumu gerekli.'},{status:401});
 const {data,error}=await client.rpc('goldlink_summary');
 if(error) return NextResponse.json({error:'GoldLink verileri yüklenemedi.'},{status:503});
 const response=NextResponse.json(data,{headers:{'Cache-Control':'private, no-store'}});
 response.cookies.set('gk_metrics_excluded','1',{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:31536000});
 return response;
}

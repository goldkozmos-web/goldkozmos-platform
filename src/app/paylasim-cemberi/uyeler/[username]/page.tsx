import {notFound} from 'next/navigation';
import {CircleMember} from '../../../../components/community/CircleUI';
export default async function Page({params}:{params:Promise<{username:string}>}){const {username}=await params;if(!/^[a-z0-9_]{3,24}$/.test(username))notFound();return <CircleMember username={username}/>;}

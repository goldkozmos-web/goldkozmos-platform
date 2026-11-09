import {notFound} from 'next/navigation';
import {CirclePostView} from '../../../components/community/CircleUI';
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;if(!/^[a-f0-9-]{36}$/i.test(id))notFound();return <CirclePostView id={id}/>;}

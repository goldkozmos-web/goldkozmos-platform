"use client";
import {useCallback,useEffect,useState} from 'react';
import AyarlarFrame from '../ayarlar/AyarlarFrame';
import {CircleProfileForm} from './CircleUI';
import {circleRead} from '../../lib/community/client';
import type {CircleMe} from '../../lib/community/types';
import '../../styles/community.css';
function Editor(){
 const [me,setMe]=useState<CircleMe|null>(null),[status,setStatus]=useState('');
 const load=useCallback(async()=>{setMe(await circleRead<CircleMe>('me'));},[]);
 useEffect(()=>{let active=true;void circleRead<CircleMe>('me').then(value=>{if(active)setMe(value);}).catch(error=>{if(active)setStatus(error.message);});return()=>{active=false;};},[]);
 return <div className="circleSettingsEditor"><p>Toplulukta görünen adını, kullanıcı adını, bio’nu, profil fotoğrafını ve kapak görselini buradan güncelleyebilirsin.</p>{me?<CircleProfileForm me={me} onSaved={load} forceOpen/>:<p role="status">{status||'Profilin açılıyor…'}</p>}</div>;
}
export default function CircleProfileSettings(){return <AyarlarFrame title="Topluluk profili" backHref="/ayarlar">{()=> <Editor/>}</AyarlarFrame>;}

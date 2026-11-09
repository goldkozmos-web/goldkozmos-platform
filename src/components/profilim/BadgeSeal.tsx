import type { ReactNode } from 'react';
export const PROFILE_BADGES=[
{id:'ilk-adim',title:'İlk Adım',description:'İlk günlük eylemini veya gelişim aktiviteni tamamla.'},
{id:'3-gun-aktif',title:'Üç Günün Işığı',description:'Üç ayrı günde kendine zaman ayır.'},
{id:'7-gunluk-seri',title:'Bir Hafta Kendinle',description:'Yedi gün üst üste bir gelişim aktivitesi tamamla.'},
{id:'ilk-duygu',title:'Duyguma Yer Açtım',description:'İlk duygu günlüğü kaydını oluştur.'},
{id:'ilk-eylem',title:'Niyetten Eyleme',description:'İlk Goldkozmos günlük eylemini tamamla.'},
{id:'ilk-goldmind',title:'İç Sessizlik',description:'İlk GoldMind içeriğini tamamla.'},
{id:'10-icerik',title:'Keşif Yolcusu',description:'On gelişim aktivitesi tamamla.'},
{id:'21-yolculuk',title:'Kendi Kozmosum',description:'Kendilik yolculuğunun 21 gününü tamamla.'}
];
const art:Record<string,ReactNode>={
'ilk-adim':<><path d="M12 27V15l8-10 8 10v12M8 27h24M16 17h8"/><circle cx="20" cy="12" r="2"/></>,
'3-gun-aktif':<><path d="M20 5v30M5 20h30M9 9l22 22M9 31 31 9"/><circle cx="20" cy="20" r="6"/></>,
'7-gunluk-seri':<><circle cx="20" cy="20" r="12"/><path d="m13 20 5 5 10-11M13 5h14M20 3v4"/></>,
'ilk-duygu':<path d="M20 32 7 20C0 8 13 2 20 13 27 2 40 8 33 20Z"/>,
'ilk-eylem':<><path d="m20 4 4 10 11 6-11 6-4 10-4-10-11-6 11-6Z"/><circle cx="20" cy="20" r="3"/></>,
'ilk-goldmind':<><path d="M29 5A15 15 0 1 0 35 26 14 14 0 0 1 29 5Z"/><path d="m30 11 2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"/></>,
'10-icerik':<><path d="M7 8q8-3 13 2 5-5 13-2v24q-8-3-13 2-5-5-13-2ZM20 10v24"/><path d="M11 14h5M11 19h5M24 14h5M24 19h5"/></>,
'21-yolculuk':<><circle cx="20" cy="20" r="10"/><ellipse cx="20" cy="20" rx="18" ry="6" transform="rotate(-40 20 20)"/><path d="m20 15 2 3 3 2-3 2-2 3-2-3-3-2 3-2Z"/></>
};
export default function BadgeSeal({id,earned=false}:{id:string;earned?:boolean}){return <span className={`profilimBadgeSeal${earned?'':' isLocked'}`} aria-hidden="true"><svg viewBox="0 0 40 40">{art[id]??art['ilk-adim']}</svg></span>;}

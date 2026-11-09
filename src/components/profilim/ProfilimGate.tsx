import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfilimSignIn from "./ProfilimSignIn";

const features = [
  { title: "Kendi ritminde ilerle", detail: "Günlüklerin ve gelişim yolculuğun", path: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" },
  { title: "Sevdiklerin yanında olsun", detail: "Kaydettiğin içerikler ve favorilerin", path: "M6 3h12v18l-6-4-6 4V3Z" },
  { title: "Çemberle bağ kur", detail: "Paylaşımların, mesajların ve bildirimlerin", path: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-1a2.5 2.5 0 1 0 0-5M3 20v-2a5 5 0 0 1 10 0v2m3-6a4 4 0 0 1 5 4v2" },
];
export default function ProfilimGate() {
  return (
    <section className="profilimGate profilimWelcome profilimWelcomeRefined">
      <div className="profilimWelcomeArt">
        <Image src="/images/profilim/personal-cosmos.webp" alt="" fill sizes="(max-width: 700px) 100vw, 45vw" />
        <span className="profilimArtLabel">SANA AYRILMIŞ BİR ALAN</span>
        <div className="profilimArtCaption"><span aria-hidden="true">✧</span><p>Kendine dön.<br /><em>Kozmosunu keşfet.</em></p><small>GOLDKOZMOS · REZONANS EKOLÜ</small></div>
      </div>
      <div className="profilimWelcomeContent">
        <p className="profilimGateEyebrow">ÜCRETSİZ ÜYELİK · KİŞİSEL ALANIN</p>
        <h1>Hoş geldin.<span>Burada kendine yer var.</span></h1>
        <p className="profilimGateLead">Ücretsiz hesabını oluştur; sevdiğin içerikleri favorilerine ekle, günlük alanlarını keşfet ve Paylaşım Çemberi’ne katıl. Her gelişinde kendine ayırdığın bu alana dön.</p>
        <ul className="profilimWelcomeFeatures">{features.map(feature => <li key={feature.title}><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d={feature.path} /></svg></span><div><strong>{feature.title}</strong><small>{feature.detail}</small></div></li>)}</ul>
        <Suspense><ProfilimSignIn /></Suspense>
        <p className="profilimWelcomePrivacy">İlk girişinde üyelik bilgilerini tamamla. Zaten üye misin? Aynı Google hesabınla devam edebilirsin.<br />Üyelik ücretsizdir; ücretli çalışmalar ve dijital ürünler ayrıca sunulur.<br /><Link href="/gizlilik-politikasi">Gizlilik politikası</Link></p>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import { resonances } from "./resonance-options";
import { resonanceHref } from "./resonance-seo";
import { resonanceCardCopy } from "./resonance-card-copy";
import s from "./resonance.module.css";
export default function ResonancePage(){
 return <main className={`homeV3Page ${s.page}`} id="top"><HomeNavbar />
 <header className={s.hero}><p className={s.eyebrow}>GOLDKOZMOS · KOZMİK ENERJİ ÇALIŞMALARI</p><h1>İhtiyacına bir alan aç.<br/><em>Sana uygun rezonansı seç.</em></h1><p className={s.lead}>Özge Batıgün ile birebir görüşmeler ve kozmik enerji çalışmaları. Önce odaklanmak istediğin konuyu, ardından sana uygun seansı belirle.</p><div className={s.facts}><span>Online katılım</span><span>Net süre ve ücret</span><span>WhatsApp ile planlama</span></div></header>
 <div className={s.content}><div className={s.steps} aria-label="Randevu adımları"><span>01 · Alanını seç</span><span>02 · Seansını karşılaştır</span><span>03 · Birlikte planlayalım</span></div>
 <section className={s.gallery} aria-labelledby="resonance-gallery-title"><div className={s.galleryHead}><div><p className={s.eyebrow}>DÖRT ALAN · SANA UYGUN BİR BAŞLANGIÇ</p><h2 id="resonance-gallery-title">Kendini hangi alanda buluyorsun?</h2></div></div><p className={s.swipeHint}>Sana yakın gelen alanı seç, çalışma detaylarını incele.</p><div className={s.rail} aria-label="Rezonans çalışma kartları">{resonances.map((item,i)=><article className={s.discoveryCard} key={item.id}><div className={s.cardImage}><Image src={item.image} alt="" width={600} height={600} sizes="(max-width:650px) 35vw, 280px"/><span>0{i+1}</span></div><div className={s.cardBody}><p className={s.eyebrow}>{item.id==="enerji"?"MEVCUT DANIŞANLARA ÖZEL":item.id==="iliski"?"ÇİFTLERE ÖZEL":"BİREYSEL ÇALIŞMA"}</p><h3>{item.name}</h3><p>{resonanceCardCopy[item.id]}</p><Link className={s.cta} href={resonanceHref(item.id)} aria-label={item.name+" detaylarını incele"}>Detayları incele <span aria-hidden="true">↗</span></Link></div></article>)}</div></section>
<section className={s.booking}><p className={s.eyebrow}>BİRLİKTE NETLEŞTİRELİM</p><h2>Randevu süreci nasıl işliyor?</h2><ol><li><strong>Talebini gönder.</strong> Seçtiğin çalışma ve seans bilgisi WhatsApp mesajına otomatik eklenir.</li><li><strong>Gün ve saati belirleyelim.</strong> Katılım ayrıntılarını ve uygun zamanı birlikte netleştiririz.</li><li><strong>Planını onayla.</strong> Randevu talebi tek başına kesin rezervasyon veya ödeme oluşturmaz.</li></ol><p className={s.disclaimer}>Çalışmalar kişisel gelişim ve spiritüel farkındalık amaçlıdır; psikolojik tedavi veya çift terapisi yerine geçmez. Garanti sonuç veya kesin iyileşme vaat edilmez.</p></section></div><FooterSection/></main>;
}

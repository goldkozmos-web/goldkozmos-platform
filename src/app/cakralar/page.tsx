import type { Metadata } from "next";
import { TopicHubPage } from "../../components/seo/TopicHubPage";
import { chakraGuides } from "../../data/chakras";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata(
  "/cakralar",
  "7 Çakra Nedir? Çakra Dengesizliği ve Dengeleme Rehberi",
  "Kök, sakral, solar pleksus, kalp, boğaz, üçüncü göz ve taç çakra için farkındalık ve dengeleme rehberi.",
  "/images/page-heroes/cakralar.webp",
);

export default function CakralarPage() {
  return <TopicHubPage
    url="https://goldkozmos.com/cakralar"
    eyebrow="GOLDKOZMOS · 7 ÇAKRA REHBERİ"
    title="Çakralar nedir?"
    accent="İç dünyanı yedi başlıkta gözlemle."
    description="Çakra kavramlarını, beden ve duygu deneyimini gözlemlemek için kullanılan sembolik bir farkındalık haritası olarak ele alıyoruz."
    image="/images/page-heroes/cakralar.webp"
    introTitle="Her başlık, kendine sorabileceğin bir soru açar."
    intro={[
      "Yedi çakra; kök, sakral, solar pleksus, kalp, boğaz, üçüncü göz ve taç çakra başlıklarıyla anılır. Bu sayfa tıbbi bir teşhis sunmaz; her başlığın güvenlik, yaratıcılık, özdeğer, bağ, ifade, sezgi ve anlam duygusuyla ilişkisini sembolik olarak incelemene yardımcı olur.",
      "Çakra dengeleme yaklaşımını günlük hayatındaki ihtiyaçları fark etmek, nefes ve yazı gibi küçük pratikler seçmek ve kendine daha dürüst sorular sormak için kullanabilirsin. Uzun süren fiziksel veya duygusal yakınmalar için her zaman uygun sağlık uzmanından destek al.",
    ]}
    cards={chakraGuides.map((chakra) => ({ href: `/cakralar/${chakra.slug}`, eyebrow: chakra.sanskrit.toUpperCase(), title: chakra.name, description: chakra.summary, image: `/images/chakra-cards/${chakra.slug}.webp` }))}
    guideTitle="Çakra rehberini kullanmanın sade yolu"
    guide={[
      "Önce tek bir başlık seç: Şu anda hayatında en çok dikkat isteyen konu hangisi? Hepsini aynı anda düzeltmeye çalışma.",
      "Beden sinyalini fark et: Nefes, omuzlar, çene ve karın gibi alanlarda neler olduğunu birkaç dakika gözlemle.",
      "Bir soru yaz: Bu başlıkta neye ihtiyacım var ve bugün bunu destekleyen en küçük adım ne olabilir?",
      "Düzenli ama esnek kal: Bir pratiği birkaç gün dene, işe yarayanı koru ve kendini zorlayan kısmı bırak.",
    ]}
    faqs={[
      { question: "Çakra dengesizliği bir hastalık mıdır?", answer: "Hayır. Çakra dili spiritüel ve sembolik bir farkındalık çerçevesidir; tıbbi tanı veya hastalık açıklaması değildir." },
      { question: "7 çakrayı dengelemek ne kadar sürer?", answer: "Bunun herkes için geçerli bir süresi yoktur. Buradaki amaç tek seferlik bir sonuç aramak yerine kendini gözlemlemeyi ve sana uygun pratikleri sürdürmeyi desteklemektir." },
      { question: "Çakra çalışması için meditasyon yapmalı mıyım?", answer: "Şart değil. Nefes, yazı, yürüyüş, yaratıcı bir uğraş veya sınır koyma gibi günlük pratikler de sembolik farkındalık alanı açabilir." },
    ]}
    ctaTitle="Çakra kavramlarını birebir çalışmada keşfet."
    ctaDescription="7 Çakra Dengeleme çalışmasının kapsamını ve başvuru adımlarını incele."
    ctaHref="/calismalar/detay/7-cakra-dengeleme"
    ctaLabel="Çalışmayı incele"
  />;
}

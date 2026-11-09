import type { Metadata } from "next";
import { TopicHubPage } from "../../components/seo/TopicHubPage";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata(
  "/enerji-temizligi",
  "Mekân Enerji Arınması | GoldKozmos Rehberi",
  "Kişisel ve mekânsal enerji temizliği, nazar, karma, atalardan gelen bağlar ve 7 çakra dengeleme üzerine GoldKozmos rehberi.",
  "/images/page-heroes/enerji-temizligi.webp",
);

export default function EnerjiTemizligiPage() {
  return <TopicHubPage
    url="https://goldkozmos.com/enerji-temizligi"
    eyebrow="GOLDKOZMOS · MEKÂN ENERJİ ARINMASI"
    title="Mekân Enerji Arınması"
    accent="Alanını yeniden düzenle."
    description="Enerji temizliği; kişisel sınırlarını, yaşadığın mekânı ve gün içinde taşıdığın yükleri fark ederek daha dengeli bir ritim kurma yaklaşımıdır."
    image="/images/page-heroes/enerji-temizligi.webp"
    introTitle="Kişisel alan ve mekân birlikte düşünülür."
    intro={[
      "Kişisel enerji temizliği, gün içinde seni tüketen etkileşimleri ve tekrarlayan düşünceleri fark etmekle başlar. Mekânsal enerji temizliği ise odanı, çalışma alanını ve eşyalarınla kurduğun ilişkiyi daha ferah ve işlevsel hale getiren sembolik bir düzenleme pratiği olabilir.",
      "Nazar temizliği, karma temizliği, atalardan gelen negatif bağlar ve 7 çakra dengeleme gibi başlıkları kesin sonuç iddialarıyla değil; niyet, sınır, öz-farkındalık ve ritüel dili üzerinden ele alıyoruz. Her çalışmanın kapsamını ve sınırlarını açıkça anlatmak bu yüzden önemlidir.",
    ]}
    cards={[
      { href: "/calismalar/detay/nazar-temizligi", eyebrow: "KİŞİSEL ALAN", title: "Nazar temizliği", description: "Üzerinde ağırlık hissettiğin etkileşimleri sembolik bir arınma çalışmasıyla ele al." },
      { href: "/calismalar/detay/mekan-enerjisi-temizligi", eyebrow: "MEKÂN", title: "Mekân enerjisi temizliği", description: "Yaşam veya çalışma alanını niyet, düzen ve farkındalıkla yeniden ele al." },
      { href: "/calismalar/detay/karma-temizligi", eyebrow: "DÖNGÜLER", title: "Karma temizliği", description: "Tekrarlayan ilişki ve davranış döngülerini düşünmek için sembolik bir çalışma alanı aç." },
      { href: "/calismalar/detay/atalardan-gelen-negatif-bag", eyebrow: "AİLESEL İZLER", title: "Atalardan gelen bağlar", description: "Aile hikâyelerinin sende bıraktığı izleri daha bilinçli bir dille incele." },
      { href: "/calismalar/detay/7-cakra-dengeleme", eyebrow: "7 ÇAKRA", title: "7 çakra dengeleme", description: "Çakra sembollerini bedensel ve duygusal farkındalık sorularıyla keşfet." },
      { href: "/ruhsal-arinma", eyebrow: "İÇSEL DENGE", title: "Ruhsal arınma", description: "Arınma kavramını günlük nefes, gözlem ve sınır pratikleriyle ele al." },
    ]}
    guideTitle="Temizliği günlük bir sınır pratiğine dönüştür"
    guide={[
      "Önce alanı tanımla: Seni yoran kişi, düşünce, oda veya alışkanlık hangisi? Belirsiz bir yükü küçük bir başlığa çevirmek başlangıçtır.",
      "Sonra sadeleştir: Bir pencere açmak, masayı toplamak, telefonu sessize almak veya bir konuşmayı ertelemek bile alan açabilir.",
      "Niyetini yaz: Bugün neyi geride bırakmak, neyi korumak ve neye yer açmak istediğini tek cümleyle belirt.",
      "Sınırını koru: Çalışma sonrasında günlük hayatına dönerken kendini gözlemle; kesin sonuç veya garanti aramak yerine deneyimini kaydet.",
    ]}
    faqs={[
      { question: "Enerji temizliği gerçekten neyi değiştirir?", answer: "Bu çalışmaların amacı dış dünyayı kesin biçimde değiştirmek değil; kişisel deneyimini, sınırlarını ve bulunduğun alanla ilişkini daha bilinçli gözlemlemene yardımcı olmaktır." },
      { question: "Mekân temizliği için ritüel şart mı?", answer: "Hayır. Temizlik, havalandırma, eşya düzeni, ışık ve çalışma sınırları gibi somut adımlar da mekânla ilişkini değiştirebilir. Ritüel dili kullanmak isteyenler bunu niyet belirleme aracı olarak görebilir." },
      { question: "Karma veya nazar çalışması tıbbi destek yerine geçer mi?", answer: "Hayır. Spiritüel çalışmalar sağlık hizmeti, psikoterapi veya hukuki danışmanlık yerine geçmez. Güvenlik ya da sağlıkla ilgili bir sorun yaşıyorsan ilgili uzmandan destek al." },
    ]}
    ctaTitle="Sana uygun enerji çalışmasını keşfet."
    ctaDescription="Çalışmaların kapsamını, süresini ve başvuru adımlarını açık bilgilerle incele."
    ctaHref="/calismalar/enerji-calismalari"
    ctaLabel="Enerji çalışmalarını incele"
  />;
}

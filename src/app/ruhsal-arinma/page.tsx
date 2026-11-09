import type { Metadata } from "next";
import { TopicHubPage } from "../../components/seo/TopicHubPage";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata(
  "/ruhsal-arinma",
  "Ruhsal Arınma Nedir? Enerji Temizliği ve İçsel Denge Rehberi",
  "Ruhsal arınma nedir, nasıl uygulanır? Meditasyon, doğal nefes, enerji temizliği ve günlük farkındalık pratiklerini GoldKozmos rehberinde keşfet.",
  "/images/page-heroes/ruhsal-arinma.webp",
);

export default function RuhsalArinmaPage() {
  return <TopicHubPage
    url="https://goldkozmos.com/ruhsal-arinma"
    eyebrow="GOLDKOZMOS · İÇSEL DENGE REHBERİ"
    title="Ruhsal arınma nedir?"
    accent="Kendine daha yakından dön."
    description="Ruhsal arınma; zihni, bedeni ve duyguları daha yakından gözlemleyerek sana iyi gelmeyen yüklerle arana alan koyma pratiğidir."
    image="/images/page-heroes/ruhsal-arinma.webp"
    introTitle="Ruhsal arınma nedir, nasıl uygulanır?"
    intro={[
      "Ruhsal arınma, günlük yaşamda taşıdığın duygusal yükleri, tekrar eden düşünceleri ve seni zorlayan alışkanlıkları fark etmek için kendine ayırdığın bir gözlem sürecidir. Spiritüel yaklaşımlarda enerjisel arınma olarak da anlatılır; niyet belirleme, meditasyon ve kişisel farkındalık pratikleriyle ele alınır.",
      "Başlamak için sessiz bir yerde birkaç dakika durabilir, nefesini değiştirmeden izleyebilir ve bedenindeki hisleri fark edebilirsin. Ardından ‘Bugün beni ne yordu, neye ihtiyacım var?’ sorularını kısa bir notla yanıtla. Dinlenmek, bir sınır koymak veya yaşam alanını sadeleştirmek gibi küçük bir adım seç.",
      "Ruhsal arınma iç dünyanı gözlemlemeye odaklanırken enerji temizliği, kişisel alanın ve yaşadığın mekânla kurduğun ilişkiyi de kapsar. GoldKozmos’ta bu başlıkları kozmik enerji ve çakra kavramlarıyla birlikte, spiritüel farkındalık çerçevesinde ele alıyoruz. Aşağıdaki rehberlerden ilgini çeken konuyu seçerek uygulamaları ve birebir çalışma seçeneklerini inceleyebilirsin.",
    ]}
    cards={[
      { href: "/enerji-temizligi", eyebrow: "ENERJİ TEMİZLİĞİ", title: "Alanını ve ritmini sadeleştir", description: "Kişisel ve mekânsal enerji arınması kavramlarını güvenli, sembolik bir çerçevede incele." },
      { href: "/cakralar", eyebrow: "7 ÇAKRA REHBERİ", title: "Bedenini ve duygularını gözlemle", description: "Çakra başlıklarını farkındalık soruları ve küçük günlük pratiklerle keşfet." },
      { href: "/kozmik-enerji", eyebrow: "KOZMİK ENERJİ", title: "Büyük resmi gör", description: "Kozmik enerji yaklaşımının kişisel gelişim ve sembolik anlam dünyasındaki yerini öğren." },
      { href: "/goldblog/kozmik-enerji-nedir", eyebrow: "GOLDBLOG", title: "Kozmik enerji nedir?", description: "Kavramın kökenini, kullanım alanlarını ve sınırlarını anlaşılır bir yazıda oku." },
      { href: "/goldmind", eyebrow: "GOLDMIND", title: "Günlük farkındalık alanı", description: "Kendine ayırdığın zamanı küçük ve sürdürülebilir adımlarla yapılandır." },
      { href: "/calismalar/detay/tek-birebir-seans", eyebrow: "BİREBİR ÇALIŞMA", title: "Kendi soruna alan aç", description: "Sana uygun çalışma biçimini ve görüşme akışını incele." },
    ]}
    guideTitle="Günün içinde dört küçük durak"
    guide={[
      "Dur: Gün içinde seni zorlayan bir anı hemen çözmeye çalışmadan önce birkaç nefeslik bir ara ver.",
      "His: Bedende nerede gerilim, ağırlık veya huzursuzluk olduğunu yargılamadan fark et.",
      "Adlandır: İhtiyacını tek bir kelimeyle yaz; dinlenme, sınır, açıklık veya destek gibi.",
      "Seç: Bugün uygulayabileceğin en küçük adımı belirle ve kendinden kusursuzluk bekleme.",
    ]}
    faqs={[
      { question: "Ruhsal arınma ile enerji temizliği aynı şey mi?", answer: "Günlük kullanımda birbirine yakın anlamlarda geçebilir. GoldKozmos'ta ruhsal arınmayı içsel gözlem ve alan açma, enerji temizliğini ise kişisel ya da mekânsal yükleri sembolik olarak düzenleme başlığı altında ele alıyoruz." },
      { question: "Meditasyon ve nefes nasıl yardımcı olabilir?", answer: "Düzenli ve zorlamadan yapılan nefes ya da meditasyon pratikleri dikkati ana getirmeyi ve kendi deneyimini gözlemlemeyi destekleyebilir. Kısa, sürdürülebilir ve sana uygun bir ritimle başlamak daha değerlidir." },
      { question: "Bu uygulamalar tedavi yerine geçer mi?", answer: "Hayır. Spiritüel farkındalık çalışmaları tıbbi veya psikolojik değerlendirme ve tedavinin yerine geçmez. Uzun süren ya da ağırlaşan bir yakınman varsa uygun bir sağlık uzmanına başvur." },
    ]}
    ctaTitle="Kendine sakin bir çalışma alanı aç."
    ctaDescription="Enerji ve kişisel gelişim çalışmalarını kapsam, süre ve uygunluk bilgileriyle birlikte incele."
    ctaHref="/calismalar/enerji-calismalari"
    ctaLabel="Çalışmaları incele"
  />;
}

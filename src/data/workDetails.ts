import { energyWorks } from "./energyWorks";
import { getEducationCourses } from "./education";
import { allWorkCards, type WorkCard } from "./worksCatalog";

export type WorkDetailSection = { title: string; text: string; points?: string[] };
export type WorkDetail = WorkCard & {
  format: string;
  sections: WorkDetailSection[];
};

const birebirWorkAreas: WorkDetailSection[] = [
      { title: "Özdeğer · Kendi değerini hatırla", text: "Kendini yetersiz hissetme, sürekli onay bekleme ve hayır diyememe üzerine odaklanırız. Önce seni dinlerim; ardından kozmik enerji çalışmasında niyetimizi kendinle bağını güçlendirmeye, kişisel sınırlarına ve üzerinde taşıdığını hissettiğin değersizlik yüküne yöneltiriz." },
      { title: "Atalar · Ailenden taşıdığın kalıpları fark et", text: "Ailende tekrar eden fedakârlık, suçluluk, kaybetme korkusu ve kıtlık düşüncelerini ele alırız. Spiritüel yaklaşımda atalar alanı olarak çalıştığımız bu temalarda, aileye aidiyetinle kendi yolunu seçme ihtiyacını ayırmaya ve sana ait olmadığını hissettiğin yükleri bırakma niyetine odaklanırız." },
      { title: "Aşk · Kalbinde yeniye yer aç", text: "Geçmiş aşklara takılı kalma, reddedilme korkusu ve sevilmeye layık hissetmeme üzerine çalışırız. Kozmik enerji yaklaşımıyla odağımız; geçmiş bağların sende bıraktığı duygusal yükler, kalp alanın ve karşılıklı sevgiye açık olma niyetindir." },
      { title: "İlişki · Bağ kurarken kendini kaybetme", text: "İlişkide kendinden vazgeçme, aynı döngüleri yaşama, sınır koyamama ve iletişimde zorlanma konularını ele alırız. Enerji çalışmasını, bağın içinde kendi alanını fark etmeye ve alma–verme dengesine yöneltiriz; odağımız senin ihtiyaçların ve seçimlerindir." },
      { title: "Bolluk ve bereket · Alma–verme dengesine bak", text: "Para konusunda suçluluk, kıtlık korkusu, emeğinin karşılığını istemekte zorlanma ve almaya kapalı hissetme üzerine odaklanırız. Kozmik enerji çalışmasında bolluk alanını; hak ediş, paylaşım ve yaşamın sunduklarını kabul etme niyetiyle ele alırız." },
];

const content: Record<string, { format: string; sections: WorkDetailSection[] }> = {
  "tek-birebir-seans": { format: "Online birebir", sections: birebirWorkAreas },
  "4-haftalik-calisma-paketi": { format: "Online birebir · Haftada bir gün", sections: birebirWorkAreas },
  "5-gunluk-yogun-calisma": { format: "Online birebir · Art arda 5 gün", sections: [
    { title: "Beş gün art arda, aynı konuya odaklan", text: "İhtiyaç duyduğun konu üzerinde beş gün üst üste birlikte çalışırız. Her gün yaklaşık 60 dakika boyunca yaşadıklarını, aklına takılanları ve bir önceki çalışmadan sonraki deneyimlerini ele alırız." },
    ...birebirWorkAreas,
    { title: "Takvim ve katılım", text: "Beş günlük çalışma takvimini ve paketin kapsamını WhatsApp üzerinden birlikte netleştiririz." }
  ] },
  "numeroloji-analizi": {
    format: "Kişiye özel · Dijital analiz",
    sections: [
      { title: "Kişisel sayı haritana yakından bak", text: "İsim ve doğum tarihi üzerinden hazırlanan numeroloji analizi, kişisel eğilimlerini ve yaşamında tekrar eden temaları sembolik bir çerçevede incelemene alan açar." },
      { title: "Analizde neler ele alınır?", text: "Kişisel sayı haritan farklı yaşam alanlarıyla birlikte değerlendirilir.", points: ["Yaşam yolu ve karakter eğilimleri", "Yetenekler ve kişisel potansiyeller", "İlişkilerde tekrar eden temalar", "Yaşam dönemleri ve kişisel yönelimler"] },
      { title: "Nasıl hazırlanır?", text: "Analiz için gerekli isim ve doğum tarihi bilgileri alınır. Sana özel dijital çalışma hazırlanır; teslim ve paylaşım ayrıntıları iletişim sırasında netleştirilir." },
    ],
  },
  "tarot-bakimi": {
    format: "Kişiye özel · Sesli yorum",
    sections: [
      { title: "Kartların sembolik diliyle farklı bir bakış", text: "Tarot bakımı, içinde bulunduğun duruma ve zihnindeki sorulara kartların sembolik dili üzerinden bakmana yardımcı olan kişiye özel bir yorum çalışmasıdır." },
      { title: "Hangi konulara bakılır?", text: "Çalışmanın odağını senin sorun ve mevcut durumun belirler.", points: ["Aşk ve ilişki alanındaki dinamikler", "Kariyer ve üretkenlik", "Para ve kişisel değer algısı", "Kişisel yolculuk ve karar süreçleri"] },
      { title: "Nasıl ilerler?", text: "Sorun ve odaklanmak istediğin alan netleştirildikten sonra kartlar yorumlanır. Kişiye özel sesli yorum paylaşılır. Çalışma, kesin gelecek sonuçları sunmak yerine mevcut durumuna farklı bir açıdan bakmaya odaklanır." },
    ],
  },
  "7-cakra-dengeleme-kaydi": {
    format: "Kayıtlı çalışma · Kendi zamanında",
    sections: [
      { title: "Kendi ritminde bir çalışma alanı", text: "7 Çakra Dengeleme Çalışması, canlı çalışmanın kayıtlı versiyonudur. Kaydı kendi zamanında takip ederek yedi ana enerji merkezi üzerine odaklanabilirsin." },
      { title: "Çalışmanın odağı", text: "Kayıt, enerji merkezlerini fark etmeye ve dikkatini yeniden kendine yöneltmeye alan açar.", points: ["Yedi ana çakra üzerine odaklanma", "İçsel denge ve beden farkındalığı", "Kendi ritminde yönlendirmeleri takip etme"] },
      { title: "Nasıl kullanılır?", text: "Sakin ve kesintisiz bir zaman ayırarak kaydı takip edebilirsin. Katılım ve kayda erişim ayrıntıları için WhatsApp üzerinden iletişime geçebilirsin." },
    ],
  },
  "8-frekans-yuklemesi": {
    format: "Canlı çalışma kaydı · Kendi zamanında",
    sections: [
      { title: "Sekiz yaşam alanına odaklan", text: "8 Frekans Yüklemesi, aşk ve ilişkiden bolluğa, özdeğerden kariyere uzanan sekiz yaşam alanına odaklanan canlı çalışmanın kaydıdır." },
      { title: "Kaydın sunduğu alan", text: "Çalışmayı kendi zamanında takip ederek yaşamındaki farklı temalara yakından bakabilirsin.", points: ["Aşk ve ilişki alanına odaklanma", "Bolluk ve kişisel değer algısını gözlemleme", "Özdeğer, kariyer ve yaşam yönü üzerine farkındalık"] },
      { title: "Nasıl kullanılır?", text: "Kendine sakin bir zaman ve rahat bir alan ayırarak kaydı takip edebilirsin. Katılım ve erişim bilgileri için WhatsApp üzerinden iletişime geçebilirsin." },
    ],
  },
};

const educationTopics: Record<string, string[]> = {
  "kendilik-rezonansi": ["Özdeğer ve kendilik algısı", "Onay ihtiyacı ve kişisel sınırlar", "Kendinle kurduğun ilişki ve içsel kalıplar"],
  "iliski-rezonansi": ["Partner seçimleri ve ilişki örüntüleri", "Bağlanma ve duygusal dinamikler", "İletişim, sınırlar ve ilişkideki ihtiyaçlar"],
  "bolluk-rezonansi": ["Para algısı ve kıtlık düşünceleri", "Değer, alma ve verme dengesi", "Üretkenlik alışkanlıkları ve bollukla ilişki"],
};

export function getWorkDetails(): WorkDetail[] {
  return allWorkCards().map((card) => {
    const energy = energyWorks.find((work) => work.slug === card.slug);
    if (energy) {
      if (energy.slug === "sarkac-uyumlama") {
        return { ...card, format: energy.format, sections: [
          { title: "Sarkaç uyumlaması nedir?", text: "Sarkaç, bir zincire bağlı doğal taşın elde tutularak kullanıldığı bir araçtır. Bu çalışmada uyumlama, seçilen doğal taşlı sarkacın kişinin çalışmak istediği alan ve niyet doğrultusunda kişiye özel olarak hazırlanmasıdır." },
          { title: "Nasıl yapılır?", text: energy.howItWorks },
          { title: "Hangi alanlarda uyumlama yapılır?", text: "Uyumlama, çalışmak istediğin alana özel yapılır. Örneğin aşk alanında sorun yaşıyorsan yalnızca aşka odaklanan bir uyumlama seçebilirsin. Doğal taş seçimi ve seansın niyeti belirlediğin alana göre şekillenir.", points: ["Mekân temizliği: Yaşam veya çalışma alanına yönelik uyumlama.", "Çakra dengeleme: Çakra çalışmalarına yönelik uyumlama.", "Aşk: Aşk alanındaki konular için yalnızca aşka özel uyumlama.", "Bolluk: Bolluk ve para alanına özel uyumlama."] },
          { title: "Uyumlanan sarkacını nasıl kullanabilirsin?", text: "Seans sonrasında sarkacını çalışılan alana uygun bir niyet belirleyerek yeniden uyumlayabilirsin. Ardından uyumlu sarkacına bu alanla ilgili kısa ve net sorular sorarak kendi uygulamanı sürdürebilirsin." },
          { title: "Süre ve uygulama", text: "30 dakikalık çalışma online ve birebir gerçekleşir. Uygun gün ve saat iletişim sırasında birlikte planlanır." },
        ] };
      }
      return { ...card, format: energy.format, sections: [
        { title: "Çalışmanın odağı", text: energy.shortDescription },
        { title: "Kimler için?", text: energy.suitableFor },
        { title: "Nasıl ilerler?", text: energy.howItWorks },
        { title: "Süre ve uygulama", text: "30 dakikalık çalışma online ve birebir gerçekleşir. Uygun gün ve saat iletişim sırasında birlikte planlanır." },
      ] };
    }
    const course = getEducationCourses().find((item) => item.slug === card.slug);
    if (course) {
      return { ...card, duration: "15 farkındalık ses kaydı", format: "Hazırlanıyor · Kayıtlı ses çalışması", sections: [
        { title: "Bu eğitimde sana açılan alan", text: course.shortDescription + " " + course.homeSummary },
        { title: "Eğitimin odağı", text: course.description, points: educationTopics[course.slug] },
        { title: "15 kayıtla, kendi ritminde", text: "Çalışma, seçtiğin alana odaklanan 15 farkındalık ses kaydından oluşacak. Kayıtları kendi zamanında dinleyerek konuları adım adım takip edebileceksin." },
        { title: "Enerji desteği nasıl sunulacak?", text: "Duruma ve ihtiyaca göre enerji çalışmalarıyla desteklenecek. Bu çalışmalar da ses kaydı olarak sunulacak; her farkındalık kaydından sonra veya 15 kayıt tamamlandığında zorunlu bir enerji çalışması olmayacak." },
        { title: "Ne zaman yayına girecek?", text: "Rezonans çalışmaları şu anda yapım aşamasında ve satışa açık değil. Ocak–Şubat döneminde yayına alınması planlanıyor. Kesin tarih ve erişim ayrıntıları hazır olduğunda duyurulacak." },
      ] };
    }
    return { ...card, ...content[card.slug] };
  });
}

export function getWorkDetail(slug: string) {
  return getWorkDetails().find((work) => work.slug === slug);
}

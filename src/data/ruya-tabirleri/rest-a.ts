import type { DreamGuide } from "./types";

function guide(
  partial: Omit<DreamGuide, "published" | "updatedAt">,
): DreamGuide {
  return { ...partial, published: true, updatedAt: "2026-09-14" };
}

export const restGuides: DreamGuide[] = [
  guide({
    id: "ruyada-eski-sevgiliyi-gormek",
    title: "Rüyada Eski Sevgiliyi Görmek",
    slug: "ruyada-eski-sevgiliyi-gormek",
    h1: "Rüyada Eski Sevgiliyi Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Eski Sevgiliyi Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada eski sevgiliyi görmek ne anlama gelir? Kapanmamış bağ ve uğurlama temasını rüyanın detayına göre oku.",
    searchAliases: [
      "eski sevgili",
      "eski sevgilimi gördüm",
      "eski sevgiliyi görmek",
      "eski aşk",
    ],
    intro:
      "Ana mesaj çoğu zaman geri dönüş değildir. Eski sevgili, kapanmamış bir bağ hattının, öğrenilmiş bir sevme biçiminin veya sende hâlâ yaşayan bir dönemin yüzüdür. Rüya kişiyi kapıya dayamaktan çok, o dönemde kalan titreşimi görünür kılar. Nasıl durduğu, ne konuştuğunuz ve sende kalan his yönü belirler.\n\nSahne evdeyse mahremiyet, yoldaysa yön, kalabalıktaysa görünürlük öne çıkar. Giysi ve ışık bağın niteliğini boyayabilir: beyaz veda, kırmızı henüz sönmemiş çekim, mavi mesafeli sükûnet gibi. Renk karşıdakinin bugünkü niyetinden çok, sende kalan titreşimin rengidir.",
    spiritualMeaning:
      "Resmi bitiş ile enerjisel kapanış aynı anda olmaz. Gece gelen yüz, o ipin hâlâ bir yerinden çekildiğini gösterir. Çeken taraf karşıdaki kişi olmak zorunda değildir. Özlem, yarım kalan dürüstlük veya o dönemde öğrendiğin seven hal ipi gerer. Bazen gerçek kişidir, bazen senin o zamanki halindir. Rüya o hali selamlamaya, onarmaya ya da uğurlamaya çağırıyor olabilir.\n\nBu sahne geçmişi kutsamak için gelmez. Geçmişin senin içindeki tahtını gösterir. Taht doluysa bugünkü bağlar o gölgede nefes alır. Uğurlama bir tören değil, yer değiştirmedir: hatıra kalabilir, yön hakkı bugüne geçer. Tekrar, mesajın henüz okunmadığını söyler. Okumak geri dönmek değildir. Okumak, bağın ruhuna bakmaktır.\n\nYakın ve sıcak temas kapanmamış çekimi; cam, kapı, merdiven bir geçişi; telefon veya bulunamayan söz ifade hattını; kavga sınırın konuşulmak istediğini; sessiz bakış sözsüz kalan şefkati taşıyabilir. Sabah göğüste ağırlık varsa yük hâlâ duruyordur. Ferahlık varsa bir bırakış başlamıştır. O dönemde kullandığın yaşam kuvveti bugün başka bir işte, başka bir susmada tekrar ediyor da olabilir.\n\nO yüz ayna, öğretmen ve yarım kalmış söz olabilir. Ayna nasıl bağlandığını gösterir. Öğretmen o bağdan kalan dersi taşır. Nostalji kılıftır. İçinde sınır, değer ve yeniden doğuş durabilir. Kişinin genç hali senin o zamanki seven halindir. Yaşlanmış hali bağın zaman içinde aldığı biçimdir. Kaybolması uğurlanmakta olan enerjiyi, ansızın belirmesi henüz arşivlenmemiş bir titreşimi anlatır. Konuşulan cümleler kehanet gibi ezberlenmek zorunda değildir. Daha çok, hâlâ duymaya ihtiyaç duyduğun içsel cümleyi gece taşırlar.",
    variations: [
      {
        heading: "Rüyada Eski Sevgiliyle Konuşmak",
        body: "İfade katmanı açılır. Söylenen kadar söylenemeyen de önemlidir. Henüz verilmemiş bir cümle gece yolunu buluyor olabilir.",
      },
      {
        heading: "Rüyada Eski Sevgiliyle Barışmak",
        body: "Yeniden birleşmek zorunda değildir. Enerjisel kapanış, içsel af veya o döneme ait gerilimin çözülmesi duruyor olabilir.",
      },
      {
        heading: "Rüyada Eski Sevgiliyi Başkasıyla Görmek",
        body: "Bağ artık senin tek alanın değildir. Bırakış, kıyas ve kendi değerini yeniden kurma öne çıkabilir.",
      },
      {
        heading: "Rüyada Eski Sevgiliyi Evde Görmek",
        body: "Mahrem çember hâlâ o titreşimle çalışıyordur. Oda tanıdıksa enerji arşivlenmemiştir. Yabancı bir evdeyse o bağ yeni bir yaşam sahnesine sızıyor olabilir.",
      },
      {
        heading: "Rüyada Eski Sevgiliyle Kavga Etmek",
        body: "Sınır ve ifade uyanır. Kızgınlık bazen kişiye, daha sık o dönemde susulan hakikate aittir. Aynı susuşla kalamayacağını duyuruyor olabilir.",
      },
    ],
    emotionMeaning:
      "Özlem kapanmamış kalbi, öfke ihlali, huzur uğurlanmış barışı, korku aynı döngüye çekilme tedirginliğini taşır. His, rüyanın asıl cümlesidir. Yüzü tanımak yetmez; sabah göğüste ne durduğuna bakılır.",
    relationshipMeaning:
      "Bugünkü bağın üzerine düşen eski bir gölgeyi gösterebilir. Yeni ilişkide aynı susma, fedakârlık veya kaçış varsa, eski yüz o kalıbın maskesidir. Tek başınaysan yalnızlık kehaneti değil; bağ kurma biçimini gözden geçirme çağrısıdır. “Kesin geri döneceksiniz” bu dilin parçası değildir.",
    summary:
      "Eski sevgili çoğu zaman kişiyi değil, sende yaşayan dönemi getirir. Geri dönüş kehaneti yoktur. Bağ biçimi, veda ve sınır konuşur. O dönemi görmek, onu yeniden yaşamak zorunda olduğun anlamına gelmez.",
    relatedDreams: [
      "ruyada-yilan-gormek",
      "ruyada-aglamak",
      "ruyada-deniz-gormek",
    ],
    faqs: [
      {
        question: "Rüyada eski sevgiliyi görmek geri döneceği anlamına mı gelir?",
        answer:
          "Hayır. Daha sık kapanmamış enerji, öğrenilmiş bağ biçimi veya uğurlanmamış bir döneme işaret eder.",
      },
    ],
  }),
  guide({
    id: "ruyada-bebek-gormek",
    title: "Rüyada Bebek Görmek",
    slug: "ruyada-bebek-gormek",
    h1: "Rüyada Bebek Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Bebek Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada bebek görmek ne anlama gelir? Yeni başlangıç ve bakım temasını rüyanın detayına göre oku.",
    searchAliases: ["bebek", "bebek görmek", "rüyada bebek", "bebek doğurmak"],
    intro:
      "Ana mesaj, henüz kırılgan bir özün alana girdiğidir. Bu her zaman çocuk arzusu değildir. Niyet, kimlik filizi, taze bir yol veya özen isteyen bir kuvvet bebek biçimini alabilir. Bebeğin hali ve senin duruşun, doğmakta olana nasıl baktığını gösterir.\n\nKucakta ağır duran bebek sorumluluğun hissedildiğini; uçup giden bebek henüz köklenmemiş bir başlangıcı; ışık içindeki bebek kutsal bir doğuşu işaret edebilir. Tempo fazla hızlıysa ağlama artar. Koruma yoksa filiz kaybolur gibi durur.",
    spiritualMeaning:
      "Bebek maskesiz potansiyeldir. Henüz dünyanın diline teslim edilmemiştir. Rüya, yeni bir halin doğduğunu ve bu halin kendi kendine büyümeyeceğini söyler. Ritim, sıcaklık ve koruma ister. Sertleşmiş, fazla erken büyümüş bir yan da gece kucağa bırakılmış olabilir. Masumiyet geri çağrılır; yeni olan görünmeden önce özen ister.\n\nAğlayan bebek bakılmayan ihtiyacı, gülen bebek uyumlu doğuşu, kaybolan bebek ihmal edilen filizi anlatır. Kucakta tutmak sorumluluğu sevgiyle almak; başkasına vermek yeni hali başkasının bakışına teslim etmektir. Beslemek niyete yaşam kuvveti vermektir. Uyuyan bebek henüz görünmeden olgunlaşan süreci taşır. Emzirmek veya düzenli özen, sözden önce gelir.\n\nKüçüklük değersizlik değil, başlangıcın ölçüsüdür. Acele hasat, ağlayan bebeğe benzer. Tohumun boyunu zorlamak yerine bakım vermek, rüyanın pratik çağrısıdır. Beşik yuva ritmini, kundak henüz sınırları yeni öğrenen özü, ilk adım filizin görünür hale gelmesini taşıyabilir.\n\nDoğuş gürültülü yıkım değildir. Eski kimlik bir anda yok olmaz; kucağa yeni bir hal gelir. Yer açmak, bir alışkanlığı yavaşlatmayı veya kendi ritmini başkasının temposundan ayırmayı isteyebilir. Unvan henüz gelmemiş olsa da öz canlıdır. Filizi sergilemeden önce beslemek, GoldKozmos dilinde müjdeyi abartmadan bakımı hatırlatır.",
    variations: [
      {
        heading: "Rüyada Bebek Doğurmak",
        body: "Uzun süredir taşınan bir niyet görünür hale gelir. Doğumun kolay veya zor oluşu geçişin ritmini anlatır.",
      },
      {
        heading: "Rüyada Ağlayan Bebek",
        body: "Bakılmayan, acele ettirilen veya anlaşılmayan bir ihtiyaç vardır. Yeni enerji ihmal ediliyordur.",
      },
      {
        heading: "Rüyada Bebeğini Kaybetmek",
        body: "Kesin kayıp kehaneti değildir. Filizi koruyamamaktan duyulan tedirginlik veya ertelenen bir başlangıç duruyor olabilir.",
      },
      {
        heading: "Rüyada Bebeği Kucağında Tutmak",
        body: "Yeni olanla doğrudan temas vardır. Ağırlık sevgiyle taşınıyorsa bakım uyumludur; fazla geliyorsa tempo henüz oturmamıştır.",
      },
      {
        heading: "Rüyada Tanımadığın Bir Bebek",
        body: "Henüz adını koymadığın bir başlangıç yüz bulmuştur. Dışarıdaki tanımlardan önce senin niyetin gece görünür olmuş olabilir.",
      },
    ],
    emotionMeaning:
      "Huzur yeni olanla uyumu, korku bakamayacağına dair inancı, şaşkınlık beklenmedik bir doğuşu gösterir. Telaş varsa filiz acele ettiriliyordur. Yumuşaklık varsa bakım çağrısı uyumludur.",
    summary:
      "Bebek, özen isteyen bir doğuştur. Çocuk temasına indirgenmez. Niyet, kimlik ve yol filizlenebilir. Bakım olmadan doğuş tamamlanmaz. Kehanet yoktur; kırılgan olana bakış vardır.",
    relatedDreams: ["ruyada-deniz-gormek", "ruyada-aglamak", "ruyada-kedi-gormek"],
    faqs: [
      {
        question: "Rüyada bebek görmek hamilelik anlamına mı gelir?",
        answer:
          "Her zaman fiziksel doğumu işaret etmez. Sıkça yeni bir niyet, kimlik veya yaşam filizini temsil eder.",
      },
    ],
  }),
];

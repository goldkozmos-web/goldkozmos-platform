import type { DreamGuide } from "./types";

function guide(
  partial: Omit<DreamGuide, "published" | "updatedAt">,
): DreamGuide {
  return { ...partial, published: true, updatedAt: "2026-09-12" };
}

export const restGuides: DreamGuide[] = [
  guide({
    id: "ruyada-eski-sevgiliyi-gormek",
    title: "Rüyada Eski Sevgiliyi Görmek",
    slug: "ruyada-eski-sevgiliyi-gormek",
    h1: "Rüyada Eski Sevgiliyi Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Eski Sevgiliyi Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada eski sevgiliyi görmek ne anlama gelir? Kapanmamış bağ, dönüşüm ve spiritüel mesajı renk, mekan ve hislere göre oku.",
    searchAliases: [
      "eski sevgili",
      "eski sevgilimi gördüm",
      "eski sevgiliyi görmek",
      "eski aşk",
    ],
    intro:
      "Rüyada eski sevgiliyi görmek, çoğu insanda kalbi ikiye bölen bir sahnedir. Özlem, şaşkınlık, öfke veya beklenmedik bir yumuşaklık bir arada durabilir. GoldKozmos yorumunda bu rüya, kişinin kapına yeniden dayanması anlamına gelmek zorunda değildir. Eski sevgili, kapanmamış bir enerji hattının, öğrenilmiş bir bağ biçiminin veya senin kendi içinde hâlâ yaşayan bir döneminin yüzü olabilir. Rüya, geçmişi geri çağırmaktan çok, geçmişin sende bıraktığı titreşimi görünür kılar. Nasıl göründüğü, ne konuştuğunuz, evde mi dışarıda mı olduğunuz ve sende kalan his; yorumun yönünü belirler.",
    spiritualMeaning:
      "Spiritüel olarak eski sevgili, tamamlanmamış bir döngünün elçisi gibi durabilir. Bir bağ bittiğinde beden ve alan hemen susmaz. Bazı bağlar resmi olarak kapanır, enerjisel olarak ise yıllarca kıpırdamaya devam eder. Rüyada eski sevgiliyi görmek, o kıpırtının gece yüzeye çıkması olabilir. Bu, geri dönmek zorunda olduğun anlamına gelmez. Daha sık olarak, o dönemde öğrendiğin bir sevme biçiminin, bir vazgeçişin veya bir susmanın bugün hâlâ sende çalıştığını gösterir. Spiritüel bakışta eski sevgili bazen gerçek kişidir, bazen de senin o zamanki halindir. Rüya, o hali selamlamaya, onarmaya ya da uğurlamaya çağırıyor olabilir. Konuşulmayan sözler, verilmeyen veda, yarım kalan bir dürüstlük bu sahnede dolaşabilir. GoldKozmos dilinde bu rüya, geçmişi putlaştırmadan, bağın ruhuna bakmaktır.",
    energyMessage:
      "Enerji mesajı, sahnedeki mesafede gizlidir. Eski sevgili yakındır ve sıcaktır; kapanmamış bir çekim hâlâ alanda olabilir. Uzaktır, siliktir; bağ çözülmektedir. Kavga vardır; sınır ve ifade teması uyanıyordur. Sarılma varsa, bağın şifalanmak isteyen kısmı konuşuyor olabilir. Enerjisel olarak eski sevgili rüyaları kalp, gırtlak ve karın hattında iz bırakır. Sabah göğüste ağırlık varsa, rüya yalnızca anı değil, hâlâ taşınan bir yüktür. Hafiflik varsa, bir uğurlama gerçekleşiyor olabilir. Tekrar eden rüyalar, döngünün henüz kapanmadığını gösterir. Enerji, sen onu çağırmasan da kendi ritminde gelir. Bu rüya, o ritme bilinçli bakman için bir davettir.",
    symbolism:
      "Eski sevgili sembolü, zamanın içinde donmuş bir kapıdır. O kapı bazen ev, bazen bir yol, bazen bir bakıştır. Spiritüel temsilde eski aşk; ayna, öğretmen, yarım kalmış dua ve çözülmemiş yemin gibi okunabilir. Kişi, senin nasıl bağlandığını hatırlatır. Bağlanma biçimin bugün başka bir ilişkide aynı kıvrımı yapıyorsa, rüya eski yüzle yeni dersi üst üste bindirir. Sembol, nostaljiye indirgenmemelidir. Nostalji, mesajın yumuşak kılıfıdır. İçinde yön, sınır, değer ve yeniden doğuş durabilir.",
    variations: [
      {
        heading: "Rüyada Eski Sevgiliyle Konuşmak",
        body: "Konuşmak, bağın ifade katmanının açıldığını gösterir. Söylenen sözler kadar söylenemeyenler de önemlidir. Bu sahne, henüz verilmemiş bir mesajın gece yolunu bulması olabilir.",
      },
      {
        heading: "Rüyada Eski Sevgiliyle Barışmak",
        body: "Barış, kişiyle yeniden birleşmek zorunda değildir. Enerjisel bir kapanış, içsel bir af ya da o döneme ait gerilimin çözülmesi teması taşıyabilir.",
      },
      {
        heading: "Rüyada Eski Sevgiliyi Başkasıyla Görmek",
        body: "Bu sahne kıskançlıktan çok, bağın artık senin tek alanın olmadığını hatırlatıyor olabilir. Bırakış, kıyas ve kendi değerini yeniden kurma temaları öne çıkabilir.",
      },
    ],
    colorMeaning:
      "Eski sevgilinin giysisi, mekânın ışığı ve rüyanın rengi bağın niteliğini boyar. Beyaz arınma ve veda; siyah giz ve kapanmamış gölge; kırmızı tutku ve henüz sönmemiş çekim; mavi mesafeli bir sükûnet işaret ediyor olabilir. Renk, o kişinin bugünkü niyetinden çok, sende kalan titreşimin rengidir.",
    placeMeaning:
      "Eski ev, eski bağın kökünü; okul veya çocukluk yeri, öğrenilmiş sevme biçimini; yol, ilişkinin yönünü; kalabalık, görünürlük ve utanma temasını gösterebilir. Mekan tanıdıksa, enerji henüz arşivlenmemiştir. Yabancı bir yerde eski sevgiliyi görmek, o bağın yeni bir yaşam sahnesine sızdığını düşündürebilir.",
    peopleMeaning:
      "Yanınızdaki üçüncü kişiler, bağın tanıklarını temsil edebilir. Aile figürleri onay veya yasak temasını; arkadaşlar paylaşımı; çocuklar o bağdan doğan yeni bir niyeti işaret ediyor olabilir. Yalnızsanız, rüya daha çok senin içsel diyalogundur.",
    emotionMeaning:
      "Özlem, kapanmamış kalp enerjisini; öfke, ihlal ve sınır temasını; huzur, uğurlanmış bir barışı; korku, aynı döngüye çekilme tedirginliğini; mutluluk ise o dönemde canlı kalan bir özü hatırlatıyor olabilir. His, rüyanın asıl cümlesidir.",
    relationshipMeaning:
      "Aşk açısından bu rüya, bugünkü bağın üzerine düşen eski bir gölgeyi gösterebilir. Yeni ilişkide aynı susmayı, aynı fedakârlığı veya aynı kaçışı yaşıyorsan, eski sevgili o kalıbın yüzü olur. Tek başınaysan, rüya yalnızlık değil; bağ kurma biçimini gözden geçirme çağrısı olabilir. Spiritüel olarak aşk burada kehanet değil, ayna işidir.",
    careerMoneyMeaning:
      "İş ve yaşam yolu açısından eski sevgili, eski bir iş kimliği, bırakılmış bir yol veya değerini başka bir bakışa teslim ettiğin bir dönem olabilir. Para ve emek temasında, kendini ucuza satma ya da değerini geri alma kıpırtısı bu yüzle gelebilir. Eski bağ bazen meslek seçimindeki duygusal kökü de taşır.",
    transformationMeaning:
      "Dönüşüm açısından rüya, eski bir seven halini uğurlamaya çağırır. O hal gittikten sonra daha olgun, daha sınırlı ve daha sahici bir kalp alanı açılabilir. Dönüşüm, geçmişi silmek değil; geçmişin senin içindeki tahtını indirmektir.",
    reflection:
      "Bu rüya, geri dönmen için değil; hâlâ sende yaşayan bağı görmen için gelmiş olabilir. Eski sevgili bazen bir kişidir, çoğu zaman ise bir dönemdir. O dönemin enerjisi bugün hangi kapıdan içeri giriyor, asıl soru budur.",
    questions: [
      "Bu rüya seni geriye mi çağırıyor, yoksa uğurlamaya mı?",
      "Eski bağın hangi hali bugünkü ilişkilerinde hâlâ duruyor?",
      "Söylenmemiş hangi söz hâlâ alanda titreşiyor olabilir?",
      "Bu kişi gerçekten o kişi mi, yoksa senin eski seven halin mi?",
    ],
    summary:
      "Rüyada eski sevgiliyi görmek, kapanmamış bir enerji hattını görünür kılabilir. Bu, mutlaka geri dönüş kehaneti değildir. Bağ biçimi, veda, sınır ve kalbin eski derisi bu sahnede konuşur. His, mekan ve konuşulanlar yorumu belirler. Rüya çoğu zaman kişiyi değil, sende yaşayan dönemi getirir.",
    relatedDreams: [
      "ruyada-yilan-gormek",
      "ruyada-aglamak",
      "ruyada-deniz-gormek",
    ],
    faqs: [
      {
        question: "Rüyada eski sevgiliyi görmek geri döneceği anlamına mı gelir?",
        answer:
          "Hayır. Spiritüel olarak bu rüya daha sık kapanmamış enerji, öğrenilmiş bağ biçimi veya uğurlanmamış bir döneme işaret eder. Kişinin gelişi ayrı, sembolün mesajı ayrı okunur.",
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
      "Rüyada bebek görmek ne anlama gelir? Yeni başlangıç, kırılgan enerji ve spiritüel doğuş temasını rüyanın detayına göre oku.",
    searchAliases: ["bebek", "bebek görmek", "rüyada bebek", "bebek doğurmak"],
    intro:
      "Rüyada bebek görmek, çoğu zaman yumuşak, kırılgan ve yeni bir şeyin alana girdiğini hissettirir. Bu rüya yalnızca doğurganlık veya çocuk arzusu olarak okunmak zorunda değildir. Spiritüel dilde bebek, henüz korunan bir niyet, yeni bir kimlik filizi, taze bir yol ve özen isteyen bir enerjidir. Bebeğin huzurlu, ağlayan, kayıp ya da senin kucağında oluşu yorumu değiştirir. GoldKozmos yaklaşımında bu sahne, hayatında doğmak üzere olan şeye nasıl baktığını gösterir.",
    spiritualMeaning:
      "Bebek, spiritüel olarak saf potansiyeldir. Henüz dünyanın dilini konuşmaz, fakat varlığıyla bütün alanı etkiler. Rüyada bebek görmek, senin içindeki yeni bir halin doğduğunu işaret ediyor olabilir. Bu bir proje, bir bağ, bir inanç, bir şifa süreci veya daha dürüst bir yaşam biçimi olabilir. Bebek bakımı ister. Yani rüya, yeni olanın kendi kendine büyümesini bekleme; ona ritim, sıcaklık ve koruma ver diyor olabilir. Spiritüel bakışta bebek aynı zamanda masumiyetin geri çağrılmasıdır. Sertleşmiş, yorulmuş, fazla erken büyümüş bir yanın gece kucağına bırakılmış olabilir.",
    energyMessage:
      "Enerji mesajı kırılganlık üzerinedir. Yeni enerji güçlü olabilir ama henüz korumasızdır. Ağlayan bebek, bakıma muhtaç bir niyeti; gülen bebek, uyum içindeki bir başlangıcı; kaybolan bebek, ihmal edilen bir filizi anlatıyor olabilir. Kucakta tutmak, sorumluluğu sevgiyle almak; bebeği başkasına vermek, yeni halini başkasının bakışına teslim etmek teması taşıyabilir. Bu rüya kök ve kalp hatlarında iz bırakır. Sabah yumuşak bir açıklık varsa, doğuş uyumludur. Sıkışma varsa, yeni olan henüz güvende hissetmiyordur.",
    symbolism:
      "Bebek sembolü; tohum, şafak, ilk nefes ve henüz adlandırılmamış dualardır. Küçüklüğü değersizliği değil, başlangıcın ölçüsünü anlatır. Spiritüel temsilde bebek, senin en korunması gereken gerçeğindir. Dünya henüz ona isim takmamıştır. Bu yüzden rüya, dışarıdaki tanımlardan önce senin niyetine işaret eder.",
    variations: [
      {
        heading: "Rüyada Bebek Doğurmak",
        body: "Doğurmak, içsel bir sürecin görünür hale geldiğini gösterir. Uzun süredir taşınan bir niyet beden buluyor olabilir. Doğumun kolay ya da zor oluşu, geçişin ritmini anlatır.",
      },
      {
        heading: "Rüyada Ağlayan Bebek",
        body: "Ağlayan bebek, bakılmayan bir ihtiyacı işaret eder. Yeni enerji ihmal edilmiş, acele ettirilmiş veya anlaşılmamış olabilir.",
      },
      {
        heading: "Rüyada Bebeğini Kaybetmek",
        body: "Kaybetmek, gerçek bir kayıp kehaneti değildir. Daha sık, yeni olanı koruyamamaktan duyulan tedirginliği veya bir filizin ertelenmesini anlatır.",
      },
    ],
    colorMeaning:
      "Beyaz giysi arınma ve kutsal başlangıç; pembe şefkat; mavi sükûnet ve korunma; altın ise bu yeni enerjinin değerli ve yönlendirici olduğunu işaret ediyor olabilir. Bebeğin tenindeki ışık da önemlidir: soluksa enerji henüz zayıf, parlarsa doğuş güçlüdür.",
    placeMeaning:
      "Evde bebek, özel hayatta doğan bir şeyi; hastane, geçiş ve eşik temasını; doğa, doğal ritme dönüşü gösterir. Kalabalıkta bebek, yeni halinin görünürlükle imtihanını anlatıyor olabilir.",
    peopleMeaning:
      "Bebeği kimin tuttuğu kritiktir. Sen tutuyorsan sorumluluk sendedir. Tanıdık biri tutuyorsa, o bağ yeni enerjinin bekçisi gibi duruyor olabilir. Yabancı, henüz tanımadığın bir rehberliği veya dışarıdan gelen bir etkiyi gösterebilir.",
    emotionMeaning:
      "Huzur, yeni olanla uyumu; korku, bakamayacağına dair bir inancı; mutluluk, doğuşun onayını; şaşkınlık, beklemediğin bir başlangıcı işaret eder. His, bebeğin senden ne istediğini söyler.",
    relationshipMeaning:
      "Aşkta bebek, bağın masum ve yeni bir katmanını gösterebilir. İlişkiye taze bir niyet, daha sahici bir yakınlık veya ortak bir yaratım teması girebilir. Bazen de partner dinamikte çocuksu bir ihtiyaç uyanır. Yorum, karşı tarafı küçültmek için değil; bağın hangi filizi koruduğunu görmek içindir.",
    careerMoneyMeaning:
      "İş ve yaşam yolunda bebek, yeni bir iş fikri, henüz kırılgan bir yetenek veya emeklemekte olan bir yol olabilir. Para temasında, yeni bir gelir filizinin özen istediğini düşündürebilir. Acele hasat, rüyadaki ağlayan bebeğe benzer.",
    transformationMeaning:
      "Dönüşüm burada gürültülü yıkım değil, doğuştur. Eski kimlik bir anda yok olmaz; kucağına yeni bir hal gelir. O hale yer açmak, dönüşümün ta kendisidir.",
    reflection:
      "Bu rüya, hayatında doğmakta olan şeyi görmeni istiyor olabilir. Kırılgan olan değersiz değildir. Bakım, niyetin görünür halidir.",
    questions: [
      "Hayatında henüz çok yeni olduğu için küçümsediğin bir şey var mı?",
      "Hangi niyetin bakıma ihtiyacı var?",
      "Yeni halini kimin kucağına bırakıyorsun?",
      "Bu doğuşu acele mi ettiriyorsun, yoksa ihmal mi ediyorsun?",
    ],
    summary:
      "Rüyada bebek görmek, yeni, kırılgan ve özen isteyen bir enerjinin alana girdiğini gösterebilir. Bu yalnızca çocuk teması değildir. Niyet, kimlik, bağ ve yaşam yolu filizlenebilir. Bebeğin hali ve senin hissen yorumu belirler. Rüya, doğmakta olana bakmanı ister.",
    relatedDreams: ["ruyada-deniz-gormek", "ruyada-aglamak", "ruyada-kedi-gormek"],
    faqs: [
      {
        question: "Rüyada bebek görmek hamilelik anlamına mı gelir?",
        answer:
          "Spiritüel yorumda bebek her zaman fiziksel doğumu işaret etmez. Sıkça yeni bir niyet, kimlik veya yaşam filizini temsil eder. Rüyanın bütünü ve hissi birlikte okunur.",
      },
    ],
  }),
];

import type { DreamGuide, DreamVariation } from "./types";

type Extra = Partial<
  Pick<
    DreamGuide,
    | "intro"
    | "spiritualMeaning"
    | "energyMessage"
    | "symbolism"
    | "colorMeaning"
    | "placeMeaning"
    | "peopleMeaning"
    | "emotionMeaning"
    | "relationshipMeaning"
    | "careerMoneyMeaning"
    | "transformationMeaning"
    | "reflection"
    | "summary"
  >
> & {
  variations?: DreamVariation[];
  questions?: string[];
  faqs?: DreamGuide["faqs"];
};

function join(base: string, extra?: string) {
  if (!extra) return base;
  return `${base}\n\n${extra}`;
}

export const DREAM_EXPANSIONS: Record<string, Extra> = {
  "ruyada-eski-sevgiliyi-gormek": {
    intro:
      "Bu rüya çoğu zaman sabahı ikiye böler: biri “neden şimdi?” diye sorar, diğeri o yüzün hâlâ ne kadar tanıdık olduğunu fark eder. GoldKozmos bu sahneyi geri dönüş takvimi gibi okumaz. Eski sevgili, senin kalbinin öğrendiği bir dili yeniden konuşturuyor olabilir. O dil bazen şefkat, bazen susma, bazen kendini küçültme, bazen de aşırı bağlanma biçimidir. Rüyanın gücü, kişiyi geri çağırmasında değil; o dilin bugün hâlâ sende çalışıp çalışmadığını göstermesindedir. Sahne evdeyse mahremiyet, yoldaysa yön, kalabalıktaysa görünürlük teması öne çıkar. Konuşulan cümleler kehanet gibi ezberlenmek zorunda değildir. Daha çok, senin hâlâ duymaya ihtiyaç duyduğun içsel cümleyi gece taşıyor olabilirler.",
    spiritualMeaning:
      "Spiritüel olarak eski bağ, zamanın dışında titreşmeye devam edebilen bir iptir. Resmi bitiş, enerjisel kapanışla aynı anda gerçekleşmez. Rüyada eski sevgiliyi görmek, o ipin hâlâ bir yerinden çekildiğini işaret ediyor olabilir. Çeken taraf karşıdaki kişi olmak zorunda değildir. Bazen senin özlemin, bazen yarım kalan bir dürüstlük, bazen de o dönemde öğrendiğin bir seven halin ipi gerer. Bu rüya, geçmişi kutsamak için gelmez. Geçmişin senin içindeki tahtını göstermek için gelir. O taht hâlâ doluysa, bugünkü bağlar o gölgenin altında nefes almaya çalışır. Spiritüel bakışta uğurlama bir tören değil, içsel bir yer değiştirmedir: o yüzün hatırası kalabilir, fakat yön belirleme hakkı bugünkü sana geçer. Tekrar eden eski sevgili rüyaları, mesajın henüz okunmadığını gösterir. Okumak, geri dönmek değildir. Okumak, bağın ruhuna bakmaktır.",
    energyMessage:
      "Enerji, sahnedeki mesafeden ve bedenin sabah bıraktığı izden okunur. Yakın ve sıcak bir temas, kapanmamış çekimin hâlâ alanda olduğunu düşündürebilir. Cam, kapı, merdiven gibi eşikler varsa, bağ bir geçiş halindedir. Telefon, mesaj veya bulunamayan bir söz varsa, ifade hattı uyanıyordur. Kavga, sınırın konuşulmak istediğini; sessiz bakış, sözsüz kalan bir şefkati işaret ediyor olabilir. Kalp çukurunda ağırlık, hâlâ taşınan yükü; göğüste ferahlık, bir uğurlamanın başladığını gösterir. Enerjisel olarak bu rüya bazen yalnızca o kişiye değil, o dönemde kullandığın yaşam kuvvetine aittir. O kuvvet bugün başka bir işte, başka bir ilişkide, başka bir susmada tekrar ediyor olabilir. Rüya, o tekrarın ritmini duyurur.",
    symbolism:
      "Eski sevgili sembolü bir müze vitrini değildir. Canlı, hareket eden, bazen gülümseyen bazen uzak duran bir kapıdır. Kapının ardında ev, yol, mevsim veya bir bakış durabilir. Spiritüel temsilde bu yüz ayna, öğretmen, yarım dua ve çözülmemiş yemin gibi katmanlanabilir. Ayna, senin nasıl sevdiğini gösterir. Öğretmen, o bağdan kalan dersi taşır. Yarım dua, söylenmemiş sözdür. Çözülmemiş yemin ise “hep böyle olacağım” diye içine gömdüğün bir karardır. Sembol nostaljiye indirgenirse mesaj incelir. Nostalji kılıftır. İçinde yön, sınır, değer ve yeniden doğuş durabilir. Kişinin genç hali, senin o zamanki seven halindir. Yaşlanmış hali, bağın zaman içinde aldığı biçimdir. Kaybolması, uğurlanmakta olan enerjiyi; ansızın belirmesi, henüz arşivlenmemiş bir titreşimi anlatıyor olabilir.",
    variations: [
      {
        heading: "Rüyada Eski Sevgiliyi Evde Görmek",
        body: "Ev, mahrem çemberdir. Eski sevgilinin evde durması, bağın hâlâ özel alanın ritmine işlediğini işaret ediyor olabilir. Oda tanıdıksa enerji arşivlenmemiştir; yabancı bir evdeyse o bağ yeni bir yaşam sahnesine sızıyor olabilir.",
      },
      {
        heading: "Rüyada Eski Sevgiliyle Kavga Etmek",
        body: "Kavga, sınır ve ifade temasını açar. Kızgınlık bazen kişiye, daha sık o dönemde susulan hakikate aittir. Bu sahne geri dönüş değil; artık aynı susuşla kalamayacağını duyuruyor olabilir.",
      },
      {
        heading: "Rüyada Eski Sevgiliyi Sarılmak",
        body: "Sarılma, bağın şifalanmak isteyen kısmını taşıyabilir. Bu, birleşmek zorunda olduğun anlamına gelmez. Enerjisel bir kapanış, içsel bir yumuşama veya o döneme ait gerilimin çözülmesi teması duruyor olabilir.",
      },
    ],
    colorMeaning:
      "Giysi, ışık ve mekânın rengi bağın niteliğini boyar. Beyaz arınma ve veda; siyah giz ve kapanmamış gölge; kırmızı henüz sönmemiş çekim; mavi mesafeli sükûnet; yeşil şifa; altın ise o bağdan kalan kıymetli dersi işaret ediyor olabilir. Renk, karşıdakinin bugünkü niyetinden çok, sende kalan titreşimin rengidir. Soluk renkler yorgun bir hattı, parlak renkler hâlâ canlı bir kıpırtıyı anlatabilir.",
    placeMeaning:
      "Eski ev kökü, okul öğrenilmiş sevme biçimini, yol ilişkinin yönünü, kalabalık görünürlük ve utanma temasını, deniz ise bağın gelgitini gösterebilir. Mekân tanıdıksa enerji henüz dosyalanmamıştır. Yabancı bir şehirde eski sevgiliyi görmek, o bağın yeni bir kimlik sahnesine taşındığını düşündürebilir. Kapalı oda sıkışmayı, açık alan uğurlamaya yer açıldığını işaret ediyor olabilir.",
    peopleMeaning:
      "Yanınızdaki üçüncü kişiler bağın tanıklarını temsil edebilir. Aile onay veya yasak temasını, arkadaş paylaşımı, çocuk o bağdan doğan yeni bir niyeti gösterebilir. Yalnızsanız rüya daha çok senin içsel diyaloğundur. Eski sevgilinin yeni bir yüzle gelmesi, bağın dönüşmüş halini; hiç değişmemesi, senin içindeki donmuş bir kareyi anlatıyor olabilir.",
    emotionMeaning:
      "Özlem kapanmamış kalp enerjisini, öfke ihlal ve sınır temasını, huzur uğurlanmış bir barışı, korku aynı döngüye çekilme tedirginliğini, mutluluk o dönemde canlı kalan özü, şaşkınlık ise beklenmedik bir yüzleşmeyi işaret ediyor olabilir. His, rüyanın asıl cümlesidir. Sabah o his göğüste duruyorsa yorum oradan okunmalıdır. Duyguyu yok saymak, sahneyi yalnızca yüz tanıma işine indirger.",
    relationshipMeaning:
      "Aşk açısından bu rüya, bugünkü bağın üzerine düşen eski bir gölgeyi gösterebilir. Yeni ilişkide aynı susmayı, aynı fedakârlığı veya aynı kaçışı yaşıyorsan, eski sevgili o kalıbın yüzü olur. Tek başınaysan rüya yalnızlık değil; bağ kurma biçimini gözden geçirme çağrısı olabilir. Spiritüel olarak aşk burada kehanet değil, ayna işidir. “Kesin geri döneceksiniz” cümlesi bu dilin parçası değildir. Daha dürüst okuma şudur: bir bağ biçimi hâlâ sende nefes alıyor. O nefes bugünkü yakınlığı ya şefkatle besler ya da eski derinin altında boğar.",
    careerMoneyMeaning:
      "İş ve yaşam yolu açısından eski sevgili, eski bir iş kimliği, bırakılmış bir yol veya değerini başka bir bakışa teslim ettiğin bir dönem olabilir. Para ve emek temasında kendini ucuza satma ya da değerini geri alma kıpırtısı bu yüzle gelebilir. Eski bağ bazen meslek seçimindeki duygusal kökü de taşır. Birlikte kurulan hayaller, ortak işler veya o dönemde vazgeçilen bir yetenek gece yeniden görünür olabilir. Rüya, maddi bir müjde ilan etmez. Değerin kime göre ölçüldüğünü sorar.",
    transformationMeaning:
      "Dönüşüm açısından rüya, eski bir seven halini uğurlamaya çağırır. O hal gittikten sonra daha olgun, daha sınırlı ve daha sahici bir kalp alanı açılabilir. Dönüşüm geçmişi silmek değil; geçmişin senin içindeki tahtını indirmektir. Bazen uğurlama yumuşak, bazen keskindir. Tekrar eden sahneler, tahtın henüz boşalmadığını gösterir. GoldKozmos dilinde bu rüya, kalbi cezalandırmaz. Kalbin öğrendiği dili daha bilinçli seçmeni ister.",
    reflection:
      "Bu rüya geri dönmen için değil; hâlâ sende yaşayan bağı görmen için gelmiş olabilir. Eski sevgili bazen bir kişidir, çoğu zaman ise bir dönemdir. O dönemin enerjisi bugün hangi kapıdan içeri giriyor, asıl soru budur. Kapı aşk olabilir, iş olabilir, kendi değerin olabilir. Rüya o kapıya isim koymanı istemez önce. Önce titreşimi fark etmeni ister. İsim, fark edişten sonra gelir.",
    questions: [
      "Bu yüz bugünkü hangi bağının üzerine gölge düşürüyor?",
      "Uğurlamak mı istiyorsun, yoksa henüz kapanmamış bir cümleyi mi duymak?",
    ],
    summary:
      "Rüyada eski sevgiliyi görmek, kapanmamış bir enerji hattını görünür kılabilir. Bu, mutlaka geri dönüş kehaneti değildir. Bağ biçimi, veda, sınır ve kalbin eski derisi bu sahnede konuşur. His, mekân ve konuşulanlar yorumu belirler. Rüya çoğu zaman kişiyi değil, sende yaşayan dönemi getirir. O dönemi görmek, onu yeniden yaşamak zorunda olduğun anlamına gelmez. Görmek, yönü bugüne bırakmanın ilk adımıdır.",
    faqs: [
      {
        question: "Rüyada eski sevgiliyle barışmak yeniden birleşmek midir?",
        answer:
          "Spiritüel olarak barış, kişiyle yeniden birleşmek zorunda değildir. Enerjisel bir kapanış, içsel bir af veya o döneme ait gerilimin çözülmesi teması taşıyabilir.",
      },
    ],
  },
  "ruyada-bebek-gormek": {
    intro:
      "Bebek rüyası yumuşak durduğu için bazen küçümsenir. Oysa kırılgan olan, çoğu zaman en canlı olanıdır. GoldKozmos yorumunda bebek, henüz dünyanın diline teslim edilmemiş bir özü taşır. Bu öz bir çocuk olabileceği gibi bir niyet, bir yetenek, bir bağın taze katmanı veya daha dürüst bir yaşam filizi de olabilir. Rüyanın tonu önemlidir. Kucakta ağır duran bebek, sorumluluğun hissedildiğini; uçup giden bebek, henüz köklenmemiş bir başlangıcı; ışık içindeki bebek, kutsal bir doğuşu işaret ediyor olabilir. Bu sayfa, rüyada bebek görmeyi tek bir müjdeye indirgemez. Bakım, tempo, koruma ve yeni olanın nasıl karşılandığı üzerine bakar.",
    spiritualMeaning:
      "Spiritüel olarak bebek, potansiyele verilen bedendir. Henüz savunmasızdır çünkü maskesi yoktur. Rüyada bebek görmek, senin içindeki yeni bir halin doğduğunu işaret ediyor olabilir. Bu hal bir proje, bir inanç, bir şifa süreci veya daha sahici bir kimlik olabilir. Bebek bakımı ister. Yani rüya, yeni olanın kendi kendine büyümesini bekleme; ona ritim, sıcaklık ve koruma ver diyor olabilir. Spiritüel bakışta bebek aynı zamanda masumiyetin geri çağrılmasıdır. Sertleşmiş, yorulmuş, fazla erken büyümüş bir yanın gece kucağına bırakılmış olabilir. Ağlayan bebek, bakılmayan ihtiyacı; gülen bebek, uyum içindeki doğuşu anlatır. Kaybolan bebek, ihmal edilen filizi. Bu sahneler kehanet değildir. Yeni enerjinin senden ne istediğini gösterir.",
    energyMessage:
      "Enerji mesajı kırılganlık ve ısı üzerinedir. Yeni enerji güçlü olabilir ama henüz korumasızdır. Kucakta tutmak, sorumluluğu sevgiyle almak; bebeği başkasına vermek, yeni halini başkasının bakışına teslim etmek teması taşıyabilir. Emzirmek veya beslemek, niyete yaşam kuvveti vermeyi; uyuyan bebek, henüz görünmeden olgunlaşan bir süreci işaret ediyor olabilir. Bu rüya kök ve kalp hatlarında iz bırakır. Sabah yumuşak bir açıklık varsa doğuş uyumludur. Sıkışma varsa, yeni olan henüz güvende hissetmiyordur. Tekrar eden bebek rüyaları, filizin hâlâ bakıma muhtaç olduğunu gösterir.",
    symbolism:
      "Bebek sembolü tohum, şafak, ilk nefes ve henüz adlandırılmamış dualardır. Küçüklüğü değersizliği değil, başlangıcın ölçüsünü anlatır. Spiritüel temsilde bebek, senin en korunması gereken gerçeğindir. Dünya henüz ona isim takmamıştır. Bu yüzden rüya, dışarıdaki tanımlardan önce senin niyetine işaret eder. Beşik, yuva ve ritmi; kundak, henüz sınırları yeni öğrenen bir özü; ilk adım ise filizin görünür hale gelmesini taşıyabilir. Sembol, acele hasadı reddeder. Tohumun boyunu zorlamak, rüyadaki ağlayan bebeğe benzer.",
    variations: [
      {
        heading: "Rüyada Bebeği Kucağında Tutmak",
        body: "Kucak, yeni olanla doğrudan temas kurduğunu gösterir. Ağırlık sevgiyle taşınıyorsa bakım uyumludur; fazla geliyorsa tempo henüz senin ritmine oturmamış olabilir.",
      },
      {
        heading: "Rüyada Bebeği Beslemek",
        body: "Beslemek, niyete yaşam kuvveti vermeyi anlatır. Rüya, yeni halin sözle değil, düzenli bir özenle büyüyeceğini işaret ediyor olabilir.",
      },
      {
        heading: "Rüyada Tanımadığın Bir Bebek",
        body: "Yabancı bebek, henüz adını koymadığın bir başlangıcı taşıyabilir. Sende uyanan şey, dışarıdaki tanımlardan önce gece yüz bulmuş olabilir.",
      },
    ],
    colorMeaning:
      "Beyaz giysi arınma ve kutsal başlangıç, pembe şefkat, mavi sükûnet ve korunma, altın bu yeni enerjinin değerli ve yönlendirici olduğunu işaret ediyor olabilir. Bebeğin tenindeki ışık da önemlidir: soluksa enerji henüz zayıf, parlarsa doğuş güçlüdür. Karanlık bir odadaki parlak bebek, zor bir dönemde doğan net bir niyeti anlatıyor olabilir.",
    placeMeaning:
      "Evde bebek özel hayatta doğan bir şeyi, hastane geçiş ve eşik temasını, doğa doğal ritme dönüşü gösterir. Kalabalıkta bebek, yeni halinin görünürlükle imtihanını anlatıyor olabilir. Su kenarında bebek, duygusal bir doğuşu; yol üstünde bebek, yürüyüşün içine giren yeni bir yönü işaret edebilir.",
    peopleMeaning:
      "Bebeği kimin tuttuğu kritiktir. Sen tutuyorsan sorumluluk sendedir. Tanıdık biri tutuyorsa o bağ yeni enerjinin bekçisi gibi duruyor olabilir. Yabancı, henüz tanımadığın bir rehberliği veya dışarıdan gelen bir etkiyi gösterebilir. Aile büyükleri, soy hattından gelen bir doğuş temasını; partner, ortak bir yaratımı anlatıyor olabilir.",
    emotionMeaning:
      "Huzur yeni olanla uyumu, korku bakamayacağına dair bir inancı, mutluluk doğuşun onayını, şaşkınlık beklemediğin bir başlangıcı işaret eder. His, bebeğin senden ne istediğini söyler. Sabah göğüste yumuşaklık varsa bakım çağrısı uyumludur. Telaş varsa, yeni olan acele ettiriliyor olabilir.",
    relationshipMeaning:
      "Aşkta bebek, bağın masum ve yeni bir katmanını gösterebilir. İlişkiye taze bir niyet, daha sahici bir yakınlık veya ortak bir yaratım teması girebilir. Bazen de partner dinamikte çocuksu bir ihtiyaç uyanır. Yorum, karşı tarafı küçültmek için değil; bağın hangi filizi koruduğunu görmek içindir. Yeni bir bağın başında bebek görmek, ilişkinin henüz kırılgan ve özen isteyen yüzünü işaret ediyor olabilir.",
    careerMoneyMeaning:
      "İş ve yaşam yolunda bebek, yeni bir iş fikri, henüz kırılgan bir yetenek veya emeklemekte olan bir yol olabilir. Para temasında yeni bir gelir filizinin özen istediğini düşündürebilir. Acele hasat, rüyadaki ağlayan bebeğe benzer. Unvan ve görünürlük henüz gelmemiş olsa da öz canlıdır. Rüya, filizi sergilemeden önce beslemeni ister.",
    transformationMeaning:
      "Dönüşüm burada gürültülü yıkım değil, doğuştur. Eski kimlik bir anda yok olmaz; kucağına yeni bir hal gelir. O hale yer açmak, dönüşümün ta kendisidir. Yer açmak bazen bir alışkanlığı yavaşlatmayı, bazen bir bağı daha nazik tutmayı, bazen de kendi ritmini başkasının temposundan ayırmayı ister.",
    reflection:
      "Bu rüya, hayatında doğmakta olan şeyi görmeni istiyor olabilir. Kırılgan olan değersiz değildir. Bakım, niyetin görünür halidir. GoldKozmos dilinde bebek rüyası müjdeyi abartmaz, bakımı hatırlatır.",
    questions: [
      "Bu filizi kimin ritmine göre büyütüyorsun?",
      "Yeni olanı korumak için hangi tempo fazla hızlı?",
    ],
    summary:
      "Rüyada bebek görmek, yeni, kırılgan ve özen isteyen bir enerjinin alana girdiğini gösterebilir. Bu yalnızca çocuk teması değildir. Niyet, kimlik, bağ ve yaşam yolu filizlenebilir. Bebeğin hali ve senin hissen yorumu belirler. Rüya, doğmakta olana bakmanı ister. Bakım olmadan doğuş tamamlanmaz.",
  },
  "ruyada-deniz-gormek": {
    intro:
      "Deniz rüyası, kıyıda duran ile suya giren kişiyi aynı sahnede iki ayrı yola ayırır. Kıyı, görmek ve ölçmektir. Su, temas ve ritmdir. GoldKozmos yorumunda deniz, ruhsal genişliğin ve yaşamın gelgitinin sahnesidir. Durgunluk sükûnet, dalga hareket, fırtına eşik, berraklık netlik, bulanıklık henüz çözülmemiş bir enerji olabilir. Denizde yüzmek ile denize bakmak ayrı rüyalardır. Biri akışla ilişki kurduğunu, diğeri henüz mesafeyi koruduğunu anlatır. Bu sayfa denizi tek bir “iyi haber”e sıkıştırmaz. Suyun hâli, rengin, derinliğin ve senin konumunun birlikte okunmasını ister.",
    spiritualMeaning:
      "Spiritüel olarak deniz, bireysel iradenin ötesindeki akıştır. Rüyada deniz görmek, kendini daha büyük bir ritme bırakmaya çağrı olabilir. Bu teslimiyet yok olmak değil, kendi kıyını hatırlayarak derinle buluşmaktır. Deniz yaşamın gelgitini taşır. Gelen dalga bir açıklık, çekilen dalga bir bırakış olabilir. Spiritüel bakışta deniz aynı zamanda kadim hafızadır. Kişisel hikâyenin altında daha geniş bir su vardır. Rüya o suya kulak vermeni isteyebilir. Korkuyla bakılan deniz, derinliğe henüz hazır olmadığını; huzurla bakılan deniz, ruhun o genişlikte yer tutabildiğini gösterir. Tuz hem yakar hem temizler. Bu ikilik, rüyanın şifa ile eşiği birlikte taşıyabileceğini hatırlatır.",
    energyMessage:
      "Enerji mesajı suyun hâlinde gizlidir. Durgun deniz kalp ve boğaz hattında açılma, kabaran deniz yaşam kuvvetinin taşması, çekilen deniz bir enerjinin alandan geri çekilmesi olabilir. Denizde yüzmek akışla ilişki kurduğunu, boğulmak üzere olmak kapasitenin aşıldığını, kıyıya vurmak bir döngünün karaya çıktığını işaret ediyor olabilir. Dalga aynı yere tekrar tekrar vuruyorsa, hayatında da aynı tema ritmik biçimde geri geliyor olabilir. Sabah bedende dalgalı bir his varsa rüya henüz kapanmamıştır. Ayakların ıslak uyanmak, temasın pratik hayata indiğini düşündürebilir.",
    symbolism:
      "Deniz sembolü sonsuzluk, ana kucak, bilinmeyen derinlik ve arınmadır. Dalga hem getirir hem götürür. Spiritüel temsilde deniz, kontrol edemediğin fakat içinde yol alabildiğin alandır. Gemi iradeyi, liman sığınmayı, ada yalnız fakat bütün bir içsel sahayı, kayalık kıyı sınırı anlatabilir. Denizin dibi görünüyorsa netlik artmıştır. Dibinin görünmemesi, henüz adlandırılmamış bir katmanın çalıştığını işaret ediyor olabilir. Sembol, suyu düşman ilan etmez. Suyu okumayı ister.",
    variations: [
      {
        heading: "Rüyada Durgun Deniz Görmek",
        body: "Durgunluk, kalbin genişleyebileceği bir sükûneti işaret ediyor olabilir. Bu sahne durağanlık değil, derinliğin gürültüsüz halidir.",
      },
      {
        heading: "Rüyada Denize Girmek",
        body: "Suya girmek, mesafeden temasa geçmektir. Ayak bileğine kadar girmek temkinli bir açılmayı, tamamen dalmak ise ritme teslimiyeti anlatabilir.",
      },
      {
        heading: "Rüyada Kıyıdan Denize Bakmak",
        body: "Bakmak, henüz suya bırakılmamış bir farkındalıktır. Derinlik çağırıyor olabilir; fakat beden hâlâ karanın kesinliğini tercih ediyor olabilir.",
      },
    ],
    colorMeaning:
      "Mavi sükûnet ve hakikat, yeşil-mavi şifa, siyah deniz giz ve korkulan derinlik, altın yansımalar değer ve kutsal netlik işaret ediyor olabilir. Su nasıl görünüyorsa ruh hali o renge bürünmüştür. Kırmızımsı akşam ışığı veda veya tamamlanma, sabah ışığı ise yeni bir akışın başlangıcını taşıyabilir.",
    placeMeaning:
      "Açık deniz bilinmeyeni, liman sığınmayı, kayalık kıyı sınırları, evin yanındaki deniz özel hayatın duygusal iklimini gösterir. Mekân, denizin hangi yaşam sahasına değdiğini söyler. Tanıdık bir tatil yeri anıyı, hiç görmediğin bir sahil henüz tanımadığın bir içsel alanı işaret ediyor olabilir.",
    peopleMeaning:
      "Denizde yanındaki kişiler, o derinlikte kiminle yol aldığını gösterir. Yalnızsan rüya daha içseldir. Birinin elini tutmak, bağın suyun içinde de sürdüğünü işaret edebilir. Kalabalık bir plaj, görünür duyguları; ıssız kıyı, mahrem bir arınmayı anlatır.",
    emotionMeaning:
      "Huzur genişlikle uyumu, korku derinliğe direnci, özlem kayıp bir akışı, mutluluk ruhun nefes almasını, öfke ise taşan ve yön bulamayan bir dalgayı anlatır. His, denizin sana dost mu eşik mi olduğunu ayırır. Aynı fırtına birinde yıkım, diğerinde eski kıyının açılması gibi durabilir.",
    relationshipMeaning:
      "Aşkta deniz, bağın derinliğini, gelgitini ve taşıyamadığın yükleri gösterebilir. Sakin deniz uyumlu bir yakınlığı, fırtına konuşulmayan gerilimi işaret ediyor olabilir. İlişki bazen kıyıdır, bazen birlikte yüzülen sudur. Partnerin suda kaybolması, bağda temasın zayıfladığını; birlikte kıyıya çıkmak ise bir döngünün karaya ulaştığını düşündürebilir.",
    careerMoneyMeaning:
      "İş ve yaşam yolunda deniz, büyük bir alan, belirsiz ama verimli bir hareket veya mesleki akışın durgunlaşıp dalgalanması olabilir. Para temasında gelgit gelirin ritmini, açık deniz henüz keşfedilmemiş bir potansiyeli anlatabilir. Fırtına, planların doğrusal yürümeyeceği bir dönemi işaret ediyor olabilir. Rüya kesin kazanç ilan etmez. Akışın ölçeğini gösterir.",
    transformationMeaning:
      "Dönüşüm, karanın kesinliğinden suyun esnekliğine geçmektir. Eski form ıslanır, yumuşar, bazen dağılır. Deniz rüyası, sert kimliğin çözülüp daha canlı bir hâle evrilmesini taşıyor olabilir. Islanmak kayıp gibi durabilir. Spiritüel olarak bakıldığında ise kabuğun suya alışmasıdır.",
    reflection:
      "Bu rüya, hayatının hangi kıyısında durduğunu ve hangi derinliğe çağrıldığını soruyor olabilir. Deniz düşman değil, ayna gibi duran geniş bir alandır. Kıyıda kalmak da bir seçimdir. Önemli olan, seçimin farkında olmaktır.",
    questions: [
      "Hangi kıyı artık sana dar geliyor?",
      "Bu su seni temizliyor mu, yoksa taşıyor mu?",
    ],
    summary:
      "Rüyada deniz görmek, ruhsal ve duygusal genişlikle teması anlatır. Suyun hâli, rengin ve senin konumun yorumu değiştirir. Bu rüya kehanet değil; akış, derinlik ve kıyı arasındaki yerini görmektir. Dalga tekrar ediyorsa tema da tekrar ediyordur. Mesaj, suyu kontrol etmek değil, ritmini okumaktır.",
  },
  "ruyada-para-gormek": {
    intro:
      "Para rüyası, zihni hemen hesaba çeker. GoldKozmos bu refleksin farkındadır ve onu küçümsemez. Fakat rüyanın asıl konuştuğu yer çoğu zaman cüzdan değil, değerdir. Para, emek, karşılık, onur, değiş tokuş ve yaşam kuvvetinin görünür yüzüdür. Rüyada para görmek, gerçek bir kazancı kesin ilan etmez. Daha çok, değerin senin hayatında nasıl aktığını, nerede tıkandığını veya nerede görünür olmak istediğini gösterir. Paranın temiz, yırtık, bol, eksik, yerde veya kilitli oluşu bu akışın niteliğini değiştirir.",
    spiritualMeaning:
      "Spiritüel olarak para, enerji alışverişinin simgesidir. Aldığın, verdiğin, sakladığın ve kıskandığın şeylerin görünür hali olabilir. Rüyada para görmek, kendi değerini hatırlama çağrısı taşıyabilir. Eksik para içsel yoksunluk inancına, bol para açılan bir kanala, sahte para sahicilik temasına değiyor olabilir. Para yerdeyse değer henüz sahiplenilmemiştir. Cüzdandaysa korunan fakat dolaşmayan bir enerji duruyor olabilir. Spiritüel bakışta bolluk yalnızca rakam değil, akışın kendisidir. Altın özellikle kıymet, yetenek ve özün parıltısını taşır. Kâğıt para günlük dolaşımı, bozuk para küçük fakat biriken kıpırtıları anlatabilir.",
    energyMessage:
      "Enerji mesajı paranın hareketindedir. Geliyorsa bir kanal açılıyor, gidiyorsa bir bağ çözülüyor, sayılıyorsa değer üzerinde bir gerilim uyanıyor olabilir. Para kaybetmek gerçek bir kayıp kehaneti değil; değerini savurduğuna dair bir uyarı veya eski bir değer sisteminin dökülmesi olabilir. Para vermek, akışa izin; para saklamak, henüz güvende hissetmeyen bir bolluk inancını işaret ediyor olabilir. Sabah elde bir sıkılık varsa rüya, tutma temasını gündüze taşımıştır. Hafiflik varsa, değer hareket etmeye başlamış olabilir.",
    symbolism:
      "Para sembolü karşılık, onur, değiş tokuş ve dünyada yer tutma hakkıdır. Spiritüel temsilde para kirli değildir. Kirli olan, değerin çarpıtılmasıdır. Rüya senin bu çarpıtmayla yüzleşmeni isteyebilir. Kasa, kilitli potansiyeli; pazar, görünür değiş tokuşu; hediye ise karşılıksız gibi duran fakat bağ kuran bir akışı anlatabilir. Sembol, zenginliği putlaştırmaz. Kıymetin nasıl dolaştığına bakar.",
    variations: [
      {
        heading: "Rüyada Yerde Para Görmek",
        body: "Yerde duran değer, henüz sahiplenilmemiş bir potansiyeli işaret ediyor olabilir. Görmek yetmez; almak, o kıymeti hayatına davet etmektir.",
      },
      {
        heading: "Rüyada Para Saymak",
        body: "Saymak, değer üzerinde zihinsel bir gerilim veya netleşme arzusunu gösterir. Akış durmuş olabilir ya da tam tersine, görünür hale gelen bir kanal ölçülmek isteniyordur.",
      },
      {
        heading: "Rüyada Başkasına Para Vermek",
        body: "Vermek, enerji alışverişindeki rolünü açar. Cömertlik uyumluysa akış sağlıklıdır; gönülsüz vermek, değerinin çekildiğini düşündürebilir.",
      },
    ],
    colorMeaning:
      "Altın kutsal değer, gümüş sezgisel zekâ, yeşil kâğıt dünyevi akış, kirli veya yırtık para yıpranmış bir değer inancını işaret ediyor olabilir. Parlak maden, görünür hale gelen kıymeti; soluk kâğıt, yorgun bir alışverişi anlatabilir.",
    placeMeaning:
      "Evde para özel alandaki değeri, iş yerinde emek karşılığını, yerde sahipsiz potansiyeli, kilitli bir kutuda sıkışmış bolluğu gösterebilir. Banka resmi kanalları, pazar gündelik dolaşımı, tapınak benzeri bir mekân ise kıymetin kutsal yüzünü işaret ediyor olabilir.",
    peopleMeaning:
      "Parayı kimin verdiği veya aldığı, değer alışverişindeki rolleri anlatır. Tanıdık biri o bağdaki dengeyi, yabancı henüz tanımadığın bir kanalı işaret edebilir. Kalabalıkta para, görünürlük ve kıyas temasını; yalnızken saymak ise içsel değer ölçünü konuşturur.",
    emotionMeaning:
      "Sevinç açılan akışı, utanç değerle kurulan çarpık bağı, korku yoksunluk inancını, huzur yeterli hissetmeyi anlatır. His, rakamdan daha doğru konuşur. Aynı bol para birinde ferahlık, diğerinde yük gibi durabilir. Yorum, sahnedeki rakama değil, bedendeki titreşime bakmalıdır.",
    relationshipMeaning:
      "Aşkta para, emeğin, karşılığın ve değer görmenin diline dönüşebilir. Birinin rüyanda sana para vermesi bağda destek, senden para istemesi dengesiz bir akış teması taşıyabilir. İlişki burada muhasebe değil, değer aynasıdır. Ortak kasa, ortak niyeti; gizli para, konuşulmayan bir dengesizliği işaret ediyor olabilir.",
    careerMoneyMeaning:
      "İş ve yaşam yolunda bu rüya doğrudan emek, ücret, görünürlük ve yeteneğin karşılığıyla konuşur. Yine de “kesin para gelecek” demek rüyanın dilini bozar. Daha dürüst okuma şudur: değerin hareket ediyor. O hareketi pratikte nasıl karşılayacağın sana kalır. Yeni bir iş, yeni bir fiyat, yeni bir sınır bu kıpırtının gündüz yüzü olabilir.",
    transformationMeaning:
      "Dönüşüm, yoksunluk kimliğinden yeterlilik haline geçiş olabilir. Para rüyası, kendini küçük gören bir derinin dökülmesini işaret ediyor olabilir. Deri dökülünce rakam hemen değişmez. Önce kıymeti taşıma biçimin değişir.",
    reflection:
      "Bu rüya, hayatında değerin nerede aktığını ve nerede durduğunu göstermeye gelmiş olabilir. Bolluk bazen rakam, çoğu zaman ise akış cesaretidir. Saklanan para ile dolaşan para aynı simgeyi iki ayrı hayata böler.",
    questions: [
      "Değerini kimin bakışına göre ölçüyorsun?",
      "Akış durduğunda tuttuğun şey kıymet mi, korku mu?",
    ],
    summary:
      "Rüyada para görmek, maddi bir kehanetten çok değer ve enerji alışverişine işaret eder. Paranın hali, rengi ve sende uyandırdığı his yorumu belirler. Rüya, bolluğu rakama indirgemeden akışa bakmanı ister. Sahiplenilmeyen değer yerde kalır. Dolaşmayan değer ise kilitte uykudadır.",
  },
  "ruyada-kopek-gormek": {
    intro:
      "Köpek rüyası, bağın bekçilik yüzünü görünür kılar. Köpek eşiğin hayvanıdır: kimi rüyada kuyruk sallar, kimi rüyada hırlar, kimi rüyada kaybolur. GoldKozmos yorumunda köpek, sadakat, koruma, içgüdü ve bağlılık temalarını bir arada taşır. Irkı, rengi, büyüklüğü, saldırganlığı ve seninle mesafesi yorumu değiştirir. Bu rüya körü körüne vefa övgüsü değildir. Sadakat kutsal olabilir; fakat kendini yok eden bağlılık ağırdır. Köpek, bu iki ucu ayırmanı isteyebilir.",
    spiritualMeaning:
      "Spiritüel olarak köpek, kalbin bekçisi ve yolun yoldaşılığıdır. Rüyada köpek görmek, yalnız yürümediğini hatırlatıyor olabilir. Aynı zamanda kör bağlılığın da sembolü olabilir. Koruyan köpek, alanının muhafaza edildiğini; saldıran köpek, ihlal edilen bir sınırı veya çarpıtılmış bir bağlılığı işaret ediyor olabilir. Kaybolan köpek, bir yoldaşlık enerjisinin çekildiğini düşündürebilir. Spiritüel bakışta köpek, görünmeyen alemin bekçisi gibi de durur. Gece gelen köpek, korunan bir geçidi anlatıyor olabilir. Yoldaşlık burada put değildir. Seçilmiş bir duruştur.",
    energyMessage:
      "Enerji mesajı köpeğin sesinde ve bedenindedir. Kuyruk sallamak alanın güvenli olduğunu, hırlama sınır uyarısını, ısırık temasın artık nazik olmadığını gösterir. Peşinden gelmek yoldaşlığı, önünü kesmek eşiği, evin kapısında beklemek mahrem çemberin muhafızını işaret ediyor olabilir. Sabah göğüste sıcaklık varsa bağ canlıdır. Tedirginlik varsa, bağlılığın karanlık yüzü uyanmış olabilir.",
    symbolism:
      "Köpek sembolü eşik, yoldaş, içgüdü ve bağlılıktır. Spiritüel temsilde köpek, görünmeyen geçidin bekçisi gibi durur. Tasma gönüllü bağ ile fazla bağı ayırır. Sahipsiz köpek yönsüz bir sadakati, sürü ise toplu bir bağlılık alanını anlatabilir. Sembol, koruma ile kıstırılmayı aynı hayvanda tutar. Yorum, hangisinin sende çalıştığını ayırmaktır.",
    variations: [
      {
        heading: "Rüyada Köpeğin Peşinden Gelmesi",
        body: "Peşinden gelmek, yoldaşlık enerjisinin sana eşlik ettiğini gösterir. Yol yalnız değilse, bir bekçilik hattı açık olabilir.",
      },
      {
        heading: "Rüyada Sahipsiz Köpek",
        body: "Sahipsiz köpek, yönünü kaybetmiş bir bağlılığı veya henüz evine gelmemiş bir sadakati işaret ediyor olabilir.",
      },
      {
        heading: "Rüyada Köpeği Beslemek",
        body: "Beslemek, bağlılığa yaşam kuvveti vermektir. Rüya, koruduğun bağı nasıl büyüttüğünü gösterir.",
      },
    ],
    colorMeaning:
      "Beyaz köpek arınmış bağlılık, siyah gizli koruma veya korkulan sadakat, kahverengi dünyevi yoldaşlık, altın tonları değerli ve rehber nitelikli bir bağı işaret ediyor olabilir. Rengin parlaklığı, bağlılığın ne kadar görünür olduğunu da söyler.",
    placeMeaning:
      "Evde köpek özel alanın bekçisidir. Sokakta sahipsiz köpek yönsüz bir bağlılığı, kapıda bekleyen köpek eşiğe gelen bir mesajı anlatabilir. Ormanda köpek, içgüdünün yabanıl yüzünü; iş yerinde köpek, mesleki sadakat ve ekip bekçiliğini işaret ediyor olabilir.",
    peopleMeaning:
      "Köpeğin kime ait olduğu, sadakatin kime aktığını gösterir. Senin köpeğin kendi bağlılığın, başkasının köpeği o bağdaki dinamik olabilir. Tanımadığın birinin köpeği, henüz adını koymadığın bir yoldaşlık hattını taşıyabilir.",
    emotionMeaning:
      "Sevgi yoldaşlığı, korku bağlılığın karanlık yüzünü, huzur korunmayı, öfke ihlal edilen sadakati işaret eder. His, köpeğin dost mu bekçi mi uyarı mı olduğunu ayırır. Aynı ısırık birinde sınır, diğerinde fazla yakın bir enerjinin taşması gibi okunabilir.",
    relationshipMeaning:
      "Aşkta köpek, vefa, kıskanç koruma, fazla bağlanma veya güvenli yoldaşlığı gösterebilir. Partner köpekle özdeşleşiyorsa, bağdaki bekçilik rolü konuşuyor olabilir. Tasma, ilişkinin ne kadar gönüllü olduğunu sorar. Serbest ve sakin bir köpek, seçilmiş yakınlığı işaret ediyor olabilir.",
    careerMoneyMeaning:
      "İş hayatında köpek, ekip sadakati, koruyucu bir figür veya körü körüne bağlı kalınan bir düzeni anlatabilir. Yaşam yolunda “kimin yanında duruyorsun?” sorusunu açar. Para temasında, emeğini kime bekçilik ederek verdiğin görünür olabilir. Rüya, bağlılığın onur mu yük mü olduğunu ayırmanı ister.",
    transformationMeaning:
      "Dönüşüm, kör bağlılıktan bilinçli yoldaşlığa geçmektir. Köpek rüyası, kimi beklediğini ve kime bekçilik ettiğini yenilemeni isteyebilir. Eski sadakat dökülürken yalnızlık gibi durabilir. Spiritüel olarak bakıldığında ise eşik bekçisinin değişmesidir.",
    reflection:
      "Bu rüya, sadakatin hangi yönde aktığını göstermeye gelmiş olabilir. Koruma ile kıstırılma aynı hayvanda durabilir. Hangisinin sende çalıştığı, rüyadaki ses ve mesafe ile anlaşılır.",
    questions: [
      "Bekçilik ettiğin bağ hâlâ gönüllü mü?",
      "Bu köpek senin sınırın mı, yoksa başkasının tasmaşı mı?",
    ],
    summary:
      "Rüyada köpek görmek, sadakat, koruma ve içgüdüsel bağ temalarını taşır. Köpeğin hâli ve senin hissen yorumu belirler. Rüya, bağlılığın kutsal mı yoksa ağır mı olduğunu ayırmanı ister. Eşik bekçisi bazen dost, bazen uyarıdır. Mesaj, yoldaşlığı putlaştırmadan okumaktır.",
  },
  "ruyada-kedi-gormek": {
    intro:
      "Kedi rüyası, görünmeden gören yanı çağırır. Kedi yoldaşlık ilan etmez; seçer, yaklaşır, çekilir. GoldKozmos yorumunda kedi, özerklik, sezgi, zarafet ve yumuşak fakat sınırlı güç temalarını açar. Rengi, bakışı, tırmalaması ve evde olup olmadığı yorumu değiştirir. Beyaz kedi ile siyah kedi aynı hayvanın iki ayrı gece yüzüdür. Bu sayfa kediyi uğursuzluk veya şans falına indirgemez. Sezginin nasıl dolaştığına bakar.",
    spiritualMeaning:
      "Spiritüel olarak kedi, eşiklerde dolaşan sezgisel bir varlıktır. Rüyada kedi görmek, görünmeyen ayrıntıları okuma yeteneğinin uyandığını işaret ediyor olabilir. Kedi, boyun eğmeyen bilgeliği taşır. Bu rüya, başkasının ritmine girmeden kendi yumuşak kuvvetini hatırlatıyor olabilir. Siyah kedi giz ve korunmuş sezgi, beyaz kedi arınmış dişil netlik teması taşıyabilir. Kedinin kaçması, henüz evcilleştirilmemiş bir özü; kucağa gelmesi, o özle barışmayı anlatır. Spiritüel bakışta kedi, gece görüşüdür. Adını koymadığın bir hakikat, bakışla teslim ediliyor olabilir.",
    energyMessage:
      "Enerji mesajı dokunuştadır. Tırmalama sınır, mırıldama uyum, bakış sezgisel okuma olabilir. Kedi rüyaları boğaz ve sezgi hattında iz bırakabilir. Sabah “bir şey biliyorum ama adını koyamıyorum” hissi varsa kedi işini yapmıştır. Pencere kenarı, içerisi ile dışarısı arasındaki geçidi; yatak, mahremiyeti işaret eder. Enerji, zorlamadan gelir. Zorlanan kedi, zorlanan sezgidir.",
    symbolism:
      "Kedi sembolü bağımsızlık, gece, zarafet, dişil kuvvet ve seçici yakınlıktır. Spiritüel temsilde kedi, görünmeden korunan bilgidir. Tüy rengi karakteri boyar, kuyruk mesafe ritmini, gözler okuma biçimini anlatır. Sembol, yumuşak gücün güçsüzlük olmadığını hatırlatır. Evcil kedi seçilmiş teması, sokak kedisi sahipsiz fakat özgür özü taşır.",
    variations: [
      {
        heading: "Rüyada Kedinin Kucağa Gelmesi",
        body: "Kucağa gelmek, özerk yanın güvenle temasa geçtiğini gösterir. Sezgi artık yalnızca uzaktan bakmıyordur; yakınlığa izin vermiştir.",
      },
      {
        heading: "Rüyada Kedinin Kaçması",
        body: "Kaçmak, henüz evcilleştirilmemiş veya ihlal edilen bir özerkliği işaret ediyor olabilir. Mesafe, sezginin kendini koruma biçimi olabilir.",
      },
      {
        heading: "Rüyada Birden Fazla Kedi",
        body: "Birden fazla kedi, aynı anda kıpırdayan birkaç sezgi hattını anlatabilir. Hangisine önce kulak vereceğini seçmek rüyanın pratik çağrısı olabilir.",
      },
    ],
    colorMeaning:
      "Beyaz netlik, siyah giz, turuncu yaratım ve canlılık, gri ara eşik ve belirsiz sezgi işaret ediyor olabilir. Altın bakış, kıymetli bir iç sesi; soluk tüy, yorgun bir sezgi hattını anlatabilir.",
    placeMeaning:
      "Pencere kenarındaki kedi içerisi ile dışarısı arasındaki sezgiyi, yataktaki kedi mahremiyeti, sokak kedisi sahipsiz fakat özgür bir özü anlatabilir. Çatı, yüksekten gören bakışı; kapı eşiği ise seçilmiş geçidi işaret ediyor olabilir.",
    peopleMeaning:
      "Kedinin kime yaklaştığı, kimin sezgisel alanına izin verildiğini gösterir. Senden kaçıyorsa kendi özerk yanın henüz güvenle durmuyor olabilir. Başkasının kedisi, o bağdaki mesafe dansını anlatır.",
    emotionMeaning:
      "Huzur sezgiyle uyumu, tedirginlik kontrol edilemeyen bir bilgeliği, sevgi dişil kuvvetle barışı, öfke ihlal edilen özerkliği anlatır. His, kedinin senden mesafe mi temas mı istediğini ayırır.",
    relationshipMeaning:
      "Aşkta kedi, mesafe ile yakınlık arasındaki dansı gösterir. Boğmayan bağ, seçilmiş temas, kıskançlıktan çok özerklik ihtiyacı bu rüyada konuşabilir. Partnerin kediyi sevmesi, bağın yumuşak sınırla yürüyebileceğini; kedinin tırmalaması ise ihlal edilen bir alanı işaret ediyor olabilir.",
    careerMoneyMeaning:
      "İş yolunda kedi, bağımsız çalışma, sezgisel karar ve görünmeden ilerleyen bir zekâyı işaret ediyor olabilir. Para temasında zorlamadan gelen bir kanal da belirebilir. Rüya, görünürlük için evcilleşmemeni hatırlatıyor olabilir. Yetenek, kedinin bakışı gibi: seçici ve keskin.",
    transformationMeaning:
      "Dönüşüm, başkasının bekçiliğinden kendi yumuşak egemenliğine geçmektir. Kedi rüyası, boyun eğmeden durabilmeyi hatırlatır. Bu duruş soğukluk değildir. Seçilmiş yakınlıktır.",
    reflection:
      "Bu rüya, sezgilerinin nerede bağımsız kalmak istediğini göstermeye gelmiş olabilir. Yumuşak güç, güçsüzlük değildir. Görünmeden gören yan, çoğu zaman en doğru zamanı seçer.",
    questions: [
      "Sezgini kimin ritmine göre evcilleştiriyorsun?",
      "Yakınlık senin için seçim mi, zorunluluk mu?",
    ],
    summary:
      "Rüyada kedi görmek, sezgi, özerklik ve yumuşak kuvvet temalarını taşır. Renk, bakış ve mesafe yorumu belirler. Rüya, görünmeden gören yanını hatırlatır. Uğursuzluk kehaneti yoktur. Giz, korunmuş bir bilgeliğin kıyafetidir.",
  },
  "ruyada-dis-dokulmesi": {
    intro:
      "Diş rüyası ağızda başlar, hayatta devam eder. Ağız sözün, sınırın ve yaşam kuvvetinin kapısıdır. Dişler tutunmayı, kesmeyi ve dünyayla temas etmeyi taşır. GoldKozmos yorumunda diş dökülmesi, bir ifade biçiminin, bir gücün veya eski bir kimliğin yerinden çıktığını işaret ediyor olabilir. Kehanet gibi okunmaz; dönüşümün ağızdaki izi gibi okunur. Hangi dişin düştüğü, kan olup olmadığı ve sahnede ayna bulunup bulunmadığı yorumu inceler.",
    spiritualMeaning:
      "Spiritüel olarak diş, hakikati tutan ve hayatı ısırarak alan kuvvettir. Dökülmesi, artık o şekilde tutunamayacağını gösterebilir. Eski sözler, eski savunmalar, eski gurur veya eski bir rol ağızdan düşüyor olabilir. Bu kayıp gibi durur. Spiritüel bakışta ise yeni bir konuşma biçimine yer açılabilir. Kan varsa geçiş canlı ve yoğundur. Acısız dökülme, zamanı gelmiş bir bırakışı anlatabilir. Ön diş görünür kimliği, azı dişi içsel dayancı işaret eder. Dilin yanında açılan boşluk, söylenecek yeni bir söz için yer olabilir.",
    energyMessage:
      "Enerji mesajı boğaz ve çene hattındadır. Sabah çene sıkılığı, rüyanın gündüzdeki devamıdır. Ayna karşısında dökülme, kendini görmeyle ilgilidir. Kalabalıkta dökülme görünürlük eşiğini, yalnızken dökülme içsel yenilenmeyi anlatabilir. Enerji, sözün artık eski haliyle taşınamadığını duyurur. Boşluk yokluk değildir. Yeni ifadenin yuvası olabilir.",
    symbolism:
      "Diş sembolü güç, söz, sınır, hayata tutunma ve yüzün hakikatidir. Spiritüel temsilde dökülen diş, dar gelen bir maskenin parçası olabilir. Kan, canlı geçişi; ayna, yüzleşmeyi; elin dişe gitmesi, bırakışı senin seçtiğini anlatır. Sembol, hastalığa veya kesin kayba indirgenmez. Tutunma biçiminin değişmesine bakar.",
    variations: [
      {
        heading: "Rüyada Azı Dişinin Dökülmesi",
        body: "Azı dişi içsel dayancı taşır. Dökülmesi, görünür yüzden çok, içeride taşıdığın gücün yenilenmek istediğini işaret ediyor olabilir.",
      },
      {
        heading: "Rüyada Dişlerin Ayna Karşısında Dökülmesi",
        body: "Ayna, kendini görmeyi açar. Dökülen şey, başkasının bakışından önce senin kendi yüzüne dair bir bırakış olabilir.",
      },
      {
        heading: "Rüyada Dökülen Dişi Elinde Tutmak",
        body: "Elinde tutmak, bırakılan parçayla hâlâ konuştuğunu gösterir. Uğurlama başlamıştır fakat henüz tamamlanmamış olabilir.",
      },
    ],
    colorMeaning:
      "Beyaz diş arınmış söz, sarı yıpranmış gurur, kan kırmızı yaşam kuvveti ve canlı geçiş işaret ediyor olabilir. Koyu bir ağız boşluğu, henüz doldurulmamış yeni ifadeyi; parlak bir gülüş ise yenilenen yüzü anlatabilir.",
    placeMeaning:
      "Ayna karşısında dökülme kendini görmeyle, kalabalıkta dökülme görünürlük ve utanma eşiğiyle, yalnızken dökülme içsel bir yenilenmeyle ilgilidir. Banyo arınmayı, sahne temsili, ev mahrem kimliği işaret ediyor olabilir.",
    peopleMeaning:
      "Birinin senin dişine bakması, sözünün başkası tarafından tartıldığını; birinin dişini çekmesi, o bağın senin ifaden üzerindeki etkisini gösterebilir. Kimse yoksa rüya, seninle yüzün arasındadır.",
    emotionMeaning:
      "Utanç görünür kimliğin sarsılmasını, korku güç kaybı inancını, rahatlama dar gelen sözün nihayet düşmesini, şaşkınlık beklenmedik bir bırakışı anlatır. His, kaybın mı yoksa yer açılmanın mı önde olduğunu ayırır.",
    relationshipMeaning:
      "Aşkta diş dökülmesi, ilişkideki konuşma biçiminin değişmesini, suskunluğun sonunu veya eski bir gururun inmesini işaret ediyor olabilir. Söz artık eski haliyle tutunmuyordur. Partnerin senin dişine bakması, bağda görünür hakikatin tartıldığını düşündürebilir.",
    careerMoneyMeaning:
      "İş yolunda bu rüya unvan, temsil ve dünyaya nasıl ısırdığın ile konuşur. Eski bir uzmanlık kimliği dökülüyor, yeni bir ifade doğuyor olabilir. Para temasında, değerini eski dilinle savunmanın yetmediğini düşündürebilir. Rüya, fiyatı değil, sözün taşıma gücünü sorar.",
    transformationMeaning:
      "Dönüşüm, eski yüzün bir parçasını kaybedip daha sahici bir ağızla kalmaktır. Boşluk yokluk değil, yeni sözün yuvası olabilir. Deri değiştirmek yılanda nasılsa, diş dökülmesi ağızda o işi görür.",
    reflection:
      "Bu rüya, hayatında hangi sözün ve hangi gücün artık tutunmadığını göstermeye gelmiş olabilir. Dökülen şey, yer açan şey olabilir. Yeni ifade, boşluğun korkusundan değil, boşluğun davetinden doğar.",
    questions: [
      "Hangi maske artık dişlerinin arasında duruyor?",
      "Bu boşluk yeni hangi cümleye yer açıyor?",
    ],
    summary:
      "Rüyada diş dökülmesi, söz, güç ve kimlikte bir bırakışı işaret edebilir. Kayıp gibi duran sahne, yeni bir ifade için yer açıyor olabilir. His ve hangi dişin düştüğü yorumu belirler. GoldKozmos bu rüyayı kesin hastalık veya ölüm diline çevirmez. Tutunma biçiminin yenilenmesine bakar.",
  },
  "ruyada-aglamak": {
    intro:
      "Ağlamak rüyası, kalbin gece izin verdiği bir akıştır. Gündüz tutulmuş bir su, rüyada yolunu bulur. GoldKozmos yorumunda ağlamak zayıflık değil, enerjinin hareketidir. Gözyaşı arındırır, yumuşatır, sıkışmış bir alanı açar. Kimin için ağladığın, sessiz mi hıçkırarak mı ağladığın ve ağladıktan sonraki ferahlık yorumu değiştirir. Sevinç gözyaşı ile veda gözyaşı aynı tuzda, ayrı kapılarda durur.",
    spiritualMeaning:
      "Spiritüel olarak gözyaşı, kalbin tuzlu dualarıdır. Rüyada ağlamak, bir bağın, bir dönemin veya bir yükün çözülmek istediğini işaret ediyor olabilir. Bazen sevinçten ağlanır; bu, kalbin genişlemesidir. Bazen veda ağlatır; bu, uğurlamanın beden dilidir. Spiritüel bakışta tutulmuş gözyaşı, tutulmuş yaşam kuvvetidir. Rüya o kuvveti geri vermeye çalışıyor olabilir. Hıçkırık, uzun süredir kapalı bir kapının ani açılışıdır. Sessiz yaş, henüz boğazdan geçemeyen bırakıştır.",
    energyMessage:
      "Enerji mesajı göğüs ve boğazdadır. Sabah gözlerin yaşlı uyanmak, arınmanın gündüze sarktığını gösterir. Rahatlama varsa su işini görmüştür. Hâlâ düğümlüyse daha fazla bırakış bekliyordur. Yağmurla birleşen ağlayış, kişisel suyun daha büyük bir ritme katılmasını işaret ediyor olabilir. Enerji, zayıflık pozu üretmez. Sıkışmış olanın hareketini duyurur.",
    symbolism:
      "Ağlamak sembolü yağmur, arınma, kalp kapısının açılması ve tuzun temizleyiciliğidir. Spiritüel temsilde gözyaşı, duaların en sessiz olanıdır. Mendil, tutulan suyu; omuz, şefkat kanalını; deniz kenarı, kişisel suyun büyük suya karışmasını anlatır. Sembol, gözyaşını utanç nesnesi yapmaz. Akışın kendisi mesajdır.",
    variations: [
      {
        heading: "Rüyada Hıçkırarak Ağlamak",
        body: "Hıçkırık, uzun süre kapalı duran bir bırakışın ani açılışı olabilir. Enerji nazik sızmıyor, kapıdan birden geçiyordur.",
      },
      {
        heading: "Rüyada Yağmur Altında Ağlamak",
        body: "Kişisel su, daha büyük bir ritme katılıyor olabilir. Arınma yalnızca kalbe değil, bütün alana yayılıyordur.",
      },
      {
        heading: "Rüyada Ağladıktan Sonra Ferahlamak",
        body: "Ferahlık, suyun işini gördüğünü gösterir. Rüya, tutulmuş olanın aktığını ve alanın yumuşadığını işaret ediyor olabilir.",
      },
    ],
    colorMeaning:
      "Berrak gözyaşı arınma, bulanık su karışık bir bırakış, yağmurla birleşen ağlayış daha büyük bir ruhsal yıkanmayı işaret ediyor olabilir. Gece karanlığında parlayan yaş, gizlenen kalbin görünür hale gelmesidir.",
    placeMeaning:
      "Kalabalıkta ağlamak görünür kılınan kalbi, yalnız odada ağlamak mahrem arınmayı, denizin kenarında ağlamak kişisel suyun büyük suya katılmasını anlatabilir. İş yerinde ağlamak, emek kimliğinin yumuşamasını; eski evde ağlamak, kökteki bir bırakışı işaret ediyor olabilir.",
    peopleMeaning:
      "Kimin omzunda ağladığın şefkat kanalını gösterir. Kimse yoksa rüya doğrudan seninle kalbin arasındadır. Tanıdık bir yüz, o bağdaki çözülmek isteyen suyu; yabancı bir omuz, henüz tanımadığın bir şefkat hattını taşıyabilir.",
    emotionMeaning:
      "Rahatlama arınmanın tamamlanmasına, utanç kalbi gizleme alışkanlığına, özlem kapanmamış bağa, şükran genişleyen kalbe işaret eder. Ağlamanın kendisi zaten mesajdır. Aynı gözyaşı birinde veda, diğerinde açılış olabilir.",
    relationshipMeaning:
      "Aşkta rüyada ağlamak, bağın yumuşamasını, veda ihtiyacını veya uzun süredir tutulmuş bir şefkati gösterebilir. Partnerin ağlaması, o bağdaki çözülmek isteyen suyu anlatır. Birlikte ağlamak, ortak bir bırakışı; tek başına ağlamak ise mahrem bir arınmayı işaret ediyor olabilir.",
    careerMoneyMeaning:
      "İş yolunda ağlamak, emekle kurulan kimliğin yumuşamasını veya uzun süredir taşınan bir yükün bırakılmasını işaret edebilir. Para temasında, değerle kurulan gerilimin çözülmesi de belirebilir. Rüya, başarısızlık kehaneti değildir. Sert kabuğun yaşla çatlamasıdır.",
    transformationMeaning:
      "Dönüşüm, sert kabuğun yaşla çatlamasıdır. Ağlayan rüya, daha canlı ve daha açık bir hale geçişin eşiği olabilir. Yaş kuruduktan sonra kalan boşluk, yeni bir nefes için yerdir.",
    reflection:
      "Bu rüya, tutulmuş olanın akmasına izin vermeni istiyor olabilir. Gözyaşı kayıp değil, hareket eden enerjidir. GoldKozmos dilinde ağlamak, kalbin duruşudur; düşüşü değil.",
    questions: [
      "Tutulmuş su hangi odada birikiyor?",
      "Bu gözyaşı veda mi, şükran mı, yoksa açılış mı?",
    ],
    summary:
      "Rüyada ağlamak, kalbin arınma ve bırakış hareketidir. Zayıflık değil, enerjinin akışıdır. Kimin için ve nasıl ağladığın yorumu belirler. Rüya, tutulmuş suya yol açmanı ister. Ferahlık varsa su işini görmüştür. Düğüm duruyorsa bırakış henüz tamamlanmamıştır.",
  },
  "ruyada-olmus-birini-gormek": {
    intro:
      "Bu rüya kalbi hem ürperten hem teselli eden bir sahnedir. GoldKozmos onu korku diliyle okumaz. Ölmüş biri, tamamlanmış bir döngünün elçisi, soy hattının sesi, uğurlanmamış bir bağın ziyareti veya senin içindeki bitmiş bir halin yüzü olabilir. Rüya ölüm kehaneti üretmez. Daha çok, yaşam ile uğurlama arasındaki eşiği görünür kılar. Huzur, söz, ışık ve sende kalan his, ziyaretin niteliğini ayırır.",
    spiritualMeaning:
      "Spiritüel olarak bu rüya, perdenin inceldiği bir temastır. Gelen kişi bazen gerçekten o bağın enerjisidir, bazen de senin o kişiyle özdeşleştirdiğin bir niteliktir. Huzurlu bir ziyaret uğurlanmış bir barışı, telaşlı bir sahne tamamlanmamış bir sözü işaret ediyor olabilir. Soydan biri geliyorsa aile hattındaki bir tema uyanıyor olabilir. Sevgili veya arkadaş ise o bağın ruhsal devamı konuşuyor olabilir. Spiritüel bakışta her rüya “öte taraftan haber” diye bağırmaz. Daha sık olarak, senin içindeki kapanış ihtiyacı gece bir yüz bulur. Gülümseyen yüz, bağın düşman olmadığını; uzak duran yüz, henüz yaklaşılmayan bir vedayı anlatabilir.",
    energyMessage:
      "Enerji mesajı sahnedeki ışıkta ve sende kalan sükûnette gizlidir. Sabah huzur varsa ziyaret şifalıdır. Ağırlık varsa henüz uğurlanmamış bir yük duruyordur. Koku, ses, bakış gibi net duyular, temasın güçlü olduğunu gösterir. Silik bir gölge ise bağın çözülmekte olduğunu düşündürebilir. Enerji, korkutmak için değil; eşiği görünür kılmak için gelir.",
    symbolism:
      "Ölmüş kişi sembolü eşik, hafıza, soy, veda ve görünmeyen yoldaşlıktır. Spiritüel temsilde ölüm yok oluş değil, form değiştirmektir. Rüya bu form değişiminin senin hayatındaki yankısını taşır. Beyaz ışık arınma, yol yürüyüş, eski ev kök, mezarlık eşik ritüelini anlatabilir. Sembol, gelen yüzü putlaştırmaz. Yankıyı okur.",
    variations: [
      {
        heading: "Rüyada Ölmüş Birini Eski Evde Görmek",
        body: "Eski ev, soy ve kök hattını açar. Ziyaret, aileden gelen bir tema veya uğurlanmamış bir ev enerjisiyle ilgili olabilir.",
      },
      {
        heading: "Rüyada Ölmüş Birinin Yol Göstermesi",
        body: "Yol, yaşam yönüdür. Bu sahne, o bağın niteliğinin hâlâ senin yürüyüşünde rehberlik edebileceğini işaret ediyor olabilir. Kehanet değil, içsel pusuladır.",
      },
      {
        heading: "Rüyada Ölmüş Birine Sarılmak",
        body: "Sarılma, bağın şefkatle kapanmak veya yumuşamak istediğini gösterir. Uğurlama burada soğuk bir kopuş değil, sıcak bir bırakış olabilir.",
      },
    ],
    colorMeaning:
      "Beyaz ışık arınma ve geçiş, altın şefkatli bir rehberlik, loş karanlık henüz konuşulmamış veda, yeşil şifa temasını işaret ediyor olabilir. Rengin yumuşaklığı, ziyaretin niteliğini boyar.",
    placeMeaning:
      "Eski ev soy ve kökü, mezarlık eşik ritüelini, tanıdık bir oda mahrem hafızayı, yol o bağın hâlâ senin yürüyüşünde olduğunu gösterebilir. Deniz kenarı, kişisel suyun büyük suya katıldığı bir uğurlamayı işaret ediyor olabilir.",
    peopleMeaning:
      "Yanınızdaki yaşayan kişiler, bu uğurlamanın hangi bağlar içinde yapıldığını anlatır. Yalnızsanız rüya daha çok seninle o ruh hali arasındadır. Çocuklar, soyun devam eden filizini; büyükler, hattın kadim yüzünü taşıyabilir.",
    emotionMeaning:
      "Huzur tamamlanmış teması, özlem kapanmamış kalp hattını, korku eşiğe dair tedirginliği, şükran bağın dönüşmüş halini anlatır. His, rüyanın kapısını açan anahtardır. Aynı yüz birinde teselli, diğerinde yük olabilir.",
    relationshipMeaning:
      "Aşk ve bağlar açısından bu rüya, veda edilmemiş bir yakınlığı, soyun ilişki kalıplarını veya bugünkü bir bağın üzerine düşen eski bir gölgeyi gösterebilir. Yeni bir ilişkide ölmüş birini görmek, o bağa eski bir bağlılık biçiminin sızdığını düşündürebilir. Yorum, yaşayan bağı suçlamak için değil; hangi eski derinin hâlâ sahnede olduğunu görmek içindir.",
    careerMoneyMeaning:
      "Yaşam yolunda ölmüş birini görmek, miras gibi duran bir yeteneği, aileden gelen bir iş inancını veya bırakılmış bir yolun uğurlanmasını işaret edebilir. Para temasında “bana kalan değer” sorusu uyanıyor olabilir. Rüya, maddi miras kehaneti değildir. Kıymetin hangi hattan aktığını sorar.",
    transformationMeaning:
      "Dönüşüm, yaşayanla yaşayanın, bitmişle bitmişin yerini ayırmaktır. Bu rüya, bir dönemi gerçekten uğurlayıp daha sahici bir hayata geçmeni isteyebilir. Uğurlama, sevgiyi silmek değildir. Yön belirleme hakkını bugüne bırakmaktır.",
    reflection:
      "Bu rüya korkutmak için değil; kapanış, şefkat ve soy hattındaki bir temayı göstermek için gelmiş olabilir. Gelen yüz bazen bir kişi, bazen senin bitmiş bir halindir. Hangi olduğunu his söyler.",
    questions: [
      "Bu ziyaret teselli mi, yoksa henüz bırakılmamış bir yük mü?",
      "Uğurlamak istediğin şey kişi mi, yoksa o kişiyle özdeşleştirdiğin bir hal mi?",
    ],
    summary:
      "Rüyada ölmüş birini görmek, ölüm kehaneti değil; eşik, uğurlama ve bağın dönüşmüş halidir. Huzur, söz, mekân ve his yorumu belirler. Rüya, kapanışı şefkatle görmeni ister. Gelen yüz bazen bağ, bazen senin bitmiş bir dönemindir. Ayırmak, sevgiyi azaltmaz; yönü netleştirir.",
  },
};

export function applyDreamExpansion(dream: DreamGuide): DreamGuide {
  const extra = DREAM_EXPANSIONS[dream.slug];
  if (!extra) return dream;

  const questions = [...dream.questions, ...(extra.questions ?? [])].slice(0, 6);
  return {
    ...dream,
    intro: join(dream.intro, extra.intro),
    spiritualMeaning: join(dream.spiritualMeaning, extra.spiritualMeaning),
    energyMessage: join(dream.energyMessage, extra.energyMessage),
    symbolism: join(dream.symbolism, extra.symbolism),
    variations: [...dream.variations, ...(extra.variations ?? [])],
    colorMeaning: join(dream.colorMeaning, extra.colorMeaning),
    placeMeaning: join(dream.placeMeaning, extra.placeMeaning),
    peopleMeaning: join(dream.peopleMeaning, extra.peopleMeaning),
    emotionMeaning: join(dream.emotionMeaning, extra.emotionMeaning),
    relationshipMeaning: join(dream.relationshipMeaning, extra.relationshipMeaning),
    careerMoneyMeaning: join(dream.careerMoneyMeaning, extra.careerMoneyMeaning),
    transformationMeaning: join(
      dream.transformationMeaning,
      extra.transformationMeaning,
    ),
    reflection: join(dream.reflection, extra.reflection),
    questions,
    summary: join(dream.summary, extra.summary),
    faqs: [...dream.faqs, ...(extra.faqs ?? [])],
  };
}

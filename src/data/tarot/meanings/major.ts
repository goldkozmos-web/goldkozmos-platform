import { polar, type MeaningKernel } from "./schema";

export const MAJOR_MEANINGS: MeaningKernel[] = [
  {
    slug: "deli",
    name: "Deli",
    suit: "major",
    rank: "0",
    number: "0",
    arcana: "major",
    coreThemes: ["eşik", "yeni başlangıç", "hesapsız adım", "masumiyet"],
    polar: polar({ motion: true, confusion: true }),
    generalMeaning:
      "Deli, henüz haritası çizilmemiş bir eşiği gösterir. Kişi bildiği formu bırakıp henüz adı konmamış bir yola basmak üzeredir. Kart aptallık değil; deneyimlenmeden öğrenilemeyecek bir başlangıçtır. Risk, saflık ve özgürlük aynı anda durur. Soru “hazır mıyım?” değil, “artık eski kapıdan gidemiyor muyum?” olabilir.",
    spiritualMeaning:
      "Spiritüel olarak Deli, inancı kurallara bağlamadan yola çıkmayı anlatır. İçsel yol, kanıt beklemeden atılan ilk adımdır. Rehberlik burada harita değil, rüzgârdır. Kart, korunaklı bilgiden çok canlı tecrübeyi kutsar.",
    loveMeaning:
      "Aşkta Deli, ilişkinin veya tanışmanın henüz tanımsız bir evreye girdiğini gösterir. Bağ, eski beklentilerin kalıbına sığmayabilir. Heyecan vardır, fakat süreklilik henüz vaat edilmez. Kalp, sonucu hesaplamadan yaklaşmak ister.",
    relationshipMeaning:
      "Karşı tarafta Deli, kişiye dair niyetin tam oturmadığını, fakat bir kıpırtının başladığını gösterir. Yaklaşım naif, ani veya plansız olabilir. Bu, aldırmazlık değil; henüz biçimlenmemiş bir ilgidir.",
    thoughtsMeaning:
      "Düşüncelerde Deli, zihnin senaryoyu kilitlemediğini gösterir. Kişi seni yeni, açık ve henüz sınıflandırmadığı bir ihtimal gibi düşünebilir. Plan kurmak yerine “ne olur ki” hattında gezinir. Karar yok diye yokluk yoktur; kafa henüz serbesttir.",
    feelingsMeaning:
      "Duygularda Deli, taze, hafif ve tanımsız bir çekim taşır. His adlandırılmadan yaşanır. Kişi yanında rahat veya çocuksu bir ferahlık duyabilir. Bu, derin bağlılık ilanı değil; kalbin henüz korkusuzca kıpırdamasıdır.",
    actionMeaning:
      "Davranışta Deli, ani bir mesaj, beklenmedik bir yakınlaşma veya plansız bir adım üretebilir. Tutarlı bir strateji beklenmez. Kişi bir gün yaklaşır, bir gün kaybolur; tempo serbesttir. Hareket, hesaplı bir kurdan çok denemedir.",
    careerMeaning:
      "İş hayatında Deli, ezber mesleki yoldan sapma, yeni bir iş fikri veya henüz CV’ye sığmayan bir başlangıcı gösterir. Tecrübe eksikliği riskdir; canlılık ise kazanç. Kart, güvenli kadroyu değil, denenecek kapıyı konuşur.",
    moneyMeaning:
      "Parada Deli, plansız harcama veya henüz oturmamış bir gelir denemesi olabilir. Bütçe disiplini zayıf, fırsat ise taze durur. Kart servet vaat etmez; parayla daha serbest, bazen savruk bir ilişkiyi gösterir.",
    futurePotential:
      "Olası yönde Deli, sürecin yeni bir sayfaya atlayabileceğini gösterir. Eski kural işlemezse beklenmedik bir başlangıç açılır. Bu garanti değil, eşiğin büyümesidir.",
    adviceMeaning:
      "Tavsiye olarak Deli, fazla hesapla kalbi dondurmamanı ister. Küçük, dürüst bir adım at. Her şeyi bilmeden yola çıkmak bazen tek gerçek bilgidir. Saflığı aptallıkla karıştırma; merakını koru, uçurumu da gör.",
    shadowMeaning:
      "Gölgede Deli, sorumsuzluk, sonucu yok sayma ve başkalarını plansızlığın içinde bırakmaktır. Özgürlük, emeği ve sözü hiçe sayınca kaçağa döner.",
    reversedMeaning:
      "Ters Deli, çıkılamayan eşiği, ertelenen adımı veya pervasızlığı gösterir. Ya korku yüzünden hiç başlanmaz, ya da düşünülmeden atılır. Düzeltme, cesaret ile ölçü arasına dönmektir.",
    symbols:
      "Uçurum, küçük torba, bakışın ileri gitmesi ve eşlik eden hayvan; masumiyet, risk ve yola güveni taşır. Numara sıfırdır: henüz form almamış potansiyel.",
  },
  {
    slug: "buyucu",
    name: "Büyücü",
    suit: "major",
    rank: "I",
    number: "1",
    arcana: "major",
    coreThemes: ["irade", "beceri", "tezahür", "odak"],
    polar: polar({ motion: true, labor: true }),
    generalMeaning:
      "Büyücü, eldeki araçlarla şekil vermeyi gösterir. Fikir, söz, duygu ve madde masada durur; kart bunları bir niyette birleştirmeyi ister. Yetenek vardır, fakat kullanılmazsa kart boş bir gösteriye döner. Asıl mesaj: “kaynağın yok değil, yönün dağınık olabilir.”",
    spiritualMeaning:
      "Spiritüel olarak Büyücü, niyetin bedene ve eyleme inmesidir. Dualar araçsız kalmasın diye irade istenir. İçsel güç, mucize beklemek değil; dil, el ve dikkatle yaratımdır.",
    loveMeaning:
      "Aşkta Büyücü, bağın iradeyle kurulduğunu gösterir. İlgi tesadüfe bırakılmaz; kişi yaklaşımı bilinçli seçer. Çekim canlıdır, fakat samimiyet kadar etki ve ikna de devrededir. İlişki, “olursa olur” değil, şekil verilen bir alandır.",
    relationshipMeaning:
      "Karşı tarafta Büyücü, kişinin sende bir etki bırakmak, bağ kurmak veya süreci yönlendirmek istediğini gösterir. Bu manipülasyon olmak zorunda değildir; bazen net bir ilgi ve becerikli bir yaklaşımdır.",
    thoughtsMeaning:
      "Düşüncelerde Büyücü, zihnin sorunu “nasıl yapılır?” diye kurduğunu gösterir. Kişi seni bir niyet, bir plan veya bir etki alanı olarak düşünüyor olabilir. Kafa dağınık değil, yönlüdür. Fikirler pratik adımlara çevrilmek ister.",
    feelingsMeaning:
      "Duygularda Büyücü, hissin soğuk olmadığını fakat kontrolle taşındığını gösterir. Kalp var, el de var. Kişi duygusunu olduğu gibi bırakmak yerine onu yönlendirmek, göstermek veya biçimlemek isteyebilir.",
    actionMeaning:
      "Davranışta Büyücü, mesaj, teklif, girişim veya görünür bir adım üretir. Kişi bekleyip gören değil, sahneyi kuran tarafta durur. Yaklaşım becerikli, bazen fazla hesaplı olabilir.",
    careerMeaning:
      "Kariyerde Büyücü, yeteneğini satabilen, projeyi başlatan, araçları birleştiren kişiyi gösterir. İş, ilhamın masaya yatırılmasıdır. Fırsat vardır; değerlendirme iradene bağlıdır.",
    moneyMeaning:
      "Parada Büyücü, geliri beceri ve girişimle çoğaltma potansiyelidir. Kaynak yok diye durulmaz; eldeki birleştirilir. Spekülasyon riski: etkiyi abartıp boş vaat üretmek.",
    futurePotential:
      "Olası yönde Büyücü, niyet netleşirse somut bir sonuç, iş veya bağın şekil alabileceğini gösterir. Potansiyel, eyleme bağlanırsa büyür.",
    adviceMeaning:
      "Tavsiye olarak Büyücü, dağınık isteği tek bir net harekete indirgemeni ister. Elindeki araçları say. Konuş, yaz, teklif et, üret. Beklemek değil, yön vermek kartın dilidir.",
    shadowMeaning:
      "Gölgede Büyücü, ikna, gösteriş ve başkasının iradesini eğme oyunudur. Beceri, dürüst niyetten kopunca manipülasyona döner.",
    reversedMeaning:
      "Ters Büyücü, yeteneğin dağılması, erteleme veya sahte bir güç gösterisidir. Ya hiç başlanmaz, ya da söz eylemden büyük durur. Düzeltme, tek gerçek işe dönmektir.",
    symbols:
      "Masa üzerindeki kupa, kılıç, değnek ve tılsım dört unsurun elde olduğunu anlatır. Elin yukarı-aşağı duruşu, niyetin maddeye inişidir.",
  },
  {
    slug: "yuksek-rahibe",
    name: "Yüksek Rahibe",
    suit: "major",
    rank: "II",
    number: "2",
    arcana: "major",
    coreThemes: ["sezgi", "giz", "iç ses", "bekleme"],
    polar: polar({ pause: true, secrecy: true }),
    generalMeaning:
      "Yüksek Rahibe, henüz konuşulmayan bilgiyi gösterir. Cevap dışarıda değil, perde arkasında ve bedenin sezgisindedir. Kart acele açıklama istemez. Sessizlik, rüya, işaret ve “bilinçaltının bildiği” öne çıkar. Zorla netleştirmek kartı kaçırır.",
    spiritualMeaning:
      "Spiritüel olarak perde, tapınak ve ay bilgeliğidir. Öğreti kitapta değil, dinlemededir. İçsel yol, görünmeyene saygı duruşudur.",
    loveMeaning:
      "Aşkta Yüksek Rahibe, bağın henüz her şeyi söylemediğini gösterir. Yakınlık vardır fakat mesafe de kutsaldır. İlişki, itiraf değil sezgiyle yürüyor olabilir. Sabırsız sorgu, kalbi kapatır.",
    relationshipMeaning:
      "Karşı tarafta kişi hislerini tam açmaz. Bu ilgisizlik olmak zorunda değildir; içini tartıyor, saklıyor veya henüz kelimeye dökemiyor olabilir.",
    thoughtsMeaning:
      "Düşüncelerde kafa analitik plan kurmaz. Kişi seni sezgi, işaret ve “bir şey var ama adını koymadım” hattında tutar. Zihin sessiz, dolu ve kapalı durabilir.",
    feelingsMeaning:
      "Duygularda his derindir fakat görünürlüğü düşüktür. Kişi yanında sakin, gizemli veya çekingen bir yakınlık duyabilir. Duygu yok değildir; mahremdir.",
    actionMeaning:
      "Davranışta bekleme, az konuşma, dolaylı temas öne çıkar. Kişi hemen adım atmaz. Yaklaşım, kapıyı aralık bırakmak kadar olabilir.",
    careerMeaning:
      "İşde bilgi, araştırma, sır, danışmanlık ve görünmeyen emek öne çıkar. Acele satış kartın dili değildir. Doğru zaman, doğru bilgiyi bekler.",
    moneyMeaning:
      "Parada gizli kaynak, ertelenen karar veya henüz açıklanmamış bir teklif olabilir. Şeffaf olmayan para işlerinde dikkat istenir.",
    futurePotential:
      "Olası yönde hakikat zamanla sızar. Şimdi zorlanan netlik, dinlenirse kendiliğinden belirir. Süreç acele etmez.",
    adviceMeaning:
      "Tavsiye olarak iç sesi yok sayma. Her şeyi hemen konuşmak zorunda değilsin. Rüya, beden ve duraksama da bilgidir. Sabır, pasiflik değil; dinlemedir.",
    shadowMeaning:
      "Gölgede aşırı giz, duygusal kaçınma ve gerçeği kendinden bile saklamaktır. Sessizlik, bağlantıyı boğabilir.",
    reversedMeaning:
      "Tersinde sezgi bastırılır veya sır patlar. Ya körlemesine ilerlenir, ya da mahremiyet ihlal edilir. Düzeltme, iç sesle dürüstlüktür.",
    symbols:
      "Perde, ay, kitap ve sütunlar; görülmeyen bilgi, eşik ve iç tapınağı taşır.",
  },
  {
    slug: "imparatorice",
    name: "İmparatoriçe",
    suit: "major",
    rank: "III",
    number: "3",
    arcana: "major",
    coreThemes: ["bereket", "bakım", "beden", "çoğalma"],
    polar: polar({ warmth: true }),
    generalMeaning:
      "İmparatoriçe, bakılan şeyin büyümesini gösterir. Yaratım, şefkat, beden, doğa ve bolluk aynı sahneedir. Kart, emek kadar yumuşaklığın da üretken olduğunu söyler. Kuru disiplin burada yetmez; hayatın beslenmesi gerekir.",
    spiritualMeaning:
      "Spiritüel olarak yaşam kuvvetinin maddede çiçek açmasıdır. Kutsal, soyut değil; ten, yemek, toprak ve sevgidir.",
    loveMeaning:
      "Aşkta İmparatoriçe, bağın besleyici, tensel ve cömert bir evresini gösterir. Şefkat, konfor ve “yanında büyümek” öne çıkar. İlişki, bakım verilirse çoğalır.",
    relationshipMeaning:
      "Karşı tarafta kişi koruyucu, sıcak ve bağa hayat vermek isteyen bir yerden duruyor olabilir. İlgi, bakım ve yakınlık yoluyla görünür.",
    thoughtsMeaning:
      "Düşüncelerde kişi seni rahat, verimli, birlikte bir hayat kurulabilir biri gibi kuruyor olabilir. Zihin, ilişkiyi büyütme ve besleme senaryolarına açıktır.",
    feelingsMeaning:
      "Duygularda sıcaklık, şefkat, tensel çekim ve “yanında iyi olma” hissi öne çıkar. Kalp cömerttir; his kuru bir saygıdan çok canlı bir yakınlıktır.",
    actionMeaning:
      "Davranışta hediye, vakit, dokunuş, davet ve bakım jestleri belirir. Kişi bağa hayat verecek somut şeyler yapabilir.",
    careerMeaning:
      "İşde proje olgunlaşır, iş büyür, yaratıcı üretim meyve verir. Bakılan iş gelişir. Tükenene kadar vermek ise gölgedir.",
    moneyMeaning:
      "Parada akış, bereket ve emeğin karşılık bulması mümkündür. Bolluk, cömertlikle birlikte savurganlığa da kayabilir.",
    futurePotential:
      "Olası yönde bakılırsa bağ veya iş büyür. Kart, kurak bir son değil; beslenirse açılan bir mevsim gösterir.",
    adviceMeaning:
      "Tavsiye olarak kendine ve bağa bakım ver. Üret, besle, bedeni unutma. Sertleşerek değil, büyüterek ilerle.",
    shadowMeaning:
      "Gölgede boğucu bakım, bağımlılık ve kendi ihtiyaçlarını yok sayarak verme vardır.",
    reversedMeaning:
      "Tersinde tıkanmış yaratım, ihmal veya aşırı şımartma durur. Bereket kesilmez; yönü bozulur. Düzeltme, gerçek bakımdır.",
    symbols:
      "Doğa, tahıl, yastık ve Venüs işareti; doğurganlık, konfor ve yaşamın çoğalmasıdır.",
  },
  {
    slug: "imparator",
    name: "İmparator",
    suit: "major",
    rank: "IV",
    number: "4",
    arcana: "major",
    coreThemes: ["yapı", "sınır", "otorite", "istikrar"],
    polar: polar({ labor: true, pause: true }),
    generalMeaning:
      "İmparator, hayatı rasgele akıştan çıkarıp omurga kazandırmayı gösterir. Kural, sınır, sorumluluk ve koruma öne çıkar. Kart soğuk görünür çünkü duyguyu değil düzeni konuşur. Güven, duvardan gelir.",
    spiritualMeaning:
      "Spiritüel olarak iç disiplindir. Özgürlük, sınırsızlık değil; kendini taşıyabilmektir.",
    loveMeaning:
      "Aşkta İmparator, bağın ciddiyet, sorumluluk ve koruma katmanını açar. Tutku kadar “ben buradayım” duruşu istenir. Aşırı kontrol ise yakınlığı kurutur.",
    relationshipMeaning:
      "Karşı tarafta kişi koruyucu, mesafeli-otoriter veya ilişkiyi düzene sokmak isteyen duruşta olabilir. İlgi, söz ve istikrarla görünür.",
    thoughtsMeaning:
      "Düşüncelerde kişi seni uzun vadeli, ciddi ve “hayata nasıl oturur?” diye tartıyor olabilir. Zihin romantik süs değil, yapı arar.",
    feelingsMeaning:
      "Duygularda his vardır fakat ifade kontrollüdür. Güven, gurur ve sorumluluk öne çıkar. Kalp yumuşaklığını herkese göstermez.",
    actionMeaning:
      "Davranışta net kural, plan, koruma veya mesafeli bir ciddiyet belirir. Kişi söz verir ve çerçevesini çizer. Ani coşku beklenmez.",
    careerMeaning:
      "İşde yönetim, sistem, yetki ve somut sonuç öne çıkar. Dağınık iş toparlanır. Otorite hem fırsat hem baskı olabilir.",
    moneyMeaning:
      "Parada bütçe, birikim ve uzun vadeli güvenlik istenir. Spekülasyon değil, temel atılır.",
    futurePotential:
      "Olası yönde süreç resmiyet, yapı ve kalıcılığa evrilebilir. Dağınık bağ veya iş omurga kazanır.",
    adviceMeaning:
      "Tavsiye olarak sınır koy, sözünü tut, dağınıklığı iskelete bağla. Duyguyu yok etme; onu taşıyacak düzeni kur.",
    shadowMeaning:
      "Gölgede katılık, tahakküm ve duygusuz kontrol vardır.",
    reversedMeaning:
      "Tersinde ya dağılmış otorite ya da baskıcı tutum durur. Düzeltme, güç ile şefkati birlikte taşımaktır.",
    symbols:
      "Taht, zırh ve sert manzara; korunan düzen ve babasal omurgadır.",
  },
  {
    slug: "aziz",
    name: "Aziz",
    suit: "major",
    rank: "V",
    number: "5",
    arcana: "major",
    coreThemes: ["öğreti", "aidiyet", "ritüel", "anlam"],
    polar: polar({ pause: true }),
    generalMeaning:
      "Aziz, anlamın bir gelenek, inanç veya topluluk içinde aktarılmasını gösterir. Kişi yalnız içgüdüyle değil, bir yolun diliyle yürümek ister. Kart, aidiyet kadar “bu öğreti bana uyuyor mu?” sorusunu da taşır.",
    spiritualMeaning:
      "Spiritüel olarak rehber, ritüel ve kutsanmış sözdür. Arayış, rastgele değil; bir yola bağlanarak ilerler.",
    loveMeaning:
      "Aşkta Aziz, ilişkiyi değerler, aile, inanç veya “biz nasıl yaşarız?” sorusuyla okur. Bağ, ortak bir anlam arar. Uyuşmaz değerler gerilim üretir.",
    relationshipMeaning:
      "Karşı tarafta kişi ilişkiyi ciddi bir yol, onay veya ortak değer üzerinden düşünebilir. Yaklaşım, rastgele flörtten çok aidiyet arar.",
    thoughtsMeaning:
      "Düşüncelerde kişi “bu doğru mu, uyuyor muyuz, çevrem ne der?” hattında tartıyor olabilir. Zihin, bağa anlam ve meşruiyet arar.",
    feelingsMeaning:
      "Duygularda saygı, bağlılık ve güven öne çıkar. Tutku ikinci planda kalabilir; his, kutsal veya ciddi bir yerden akar.",
    actionMeaning:
      "Davranışta resmiyet, tanışma, ritüel, tavsiye alma veya ilişkiyi bir çerçeveye oturtma adımı görülebilir.",
    careerMeaning:
      "İşde kurum, eğitim, mentorluk ve etik çerçeve öne çıkar. Yalnız kahramanlık değil, bir yapının içinde büyümek.",
    moneyMeaning:
      "Parada paylaşım, bağış, kurumsal gelir veya “doğru kazanıldı mı?” sorusu durur.",
    futurePotential:
      "Olası yönde bağ veya iş bir yola, ritüele veya resmi çerçeveye oturabilir.",
    adviceMeaning:
      "Tavsiye olarak kimin dilinden konuştuğuna bak. Körü körüne uyma, fakat kökü de hor görme. Anlamını seç.",
    shadowMeaning:
      "Gölgede dogma, ikiyüzlülük ve başkasının inancını dayatmaktır.",
    reversedMeaning:
      "Tersinde öğretiden kopuş veya sahte kutsiyet durur. Düzeltme, iç değerle dış aidiyeti dürüstçe ayırmaktır.",
    symbols:
      "İki figür, ritüel eli ve tapınak; aktarılan anlam ve topluluk bağıdır.",
  },
  {
    slug: "asiklar",
    name: "Aşıklar",
    suit: "major",
    rank: "VI",
    number: "6",
    arcana: "major",
    coreThemes: ["seçim", "bağ", "değer", "kalp"],
    polar: polar({ warmth: true, confusion: true }),
    generalMeaning:
      "Aşıklar yalnızca romantizm değil, değerlerle hizalanan bir seçimdir. İki yol, iki kişi veya iki yaşam biçimi karşı karşıya durur. Kart, kalbin ve vicdanın aynı cümleyi söylemesini ister. Kaçınılan seçim de bir seçimdir.",
    spiritualMeaning:
      "Spiritüel olarak ruhun evet dediği yola hizalanmaktır. Aşk, tanrısal bir birleşme kadar dürüst bir tercihtir.",
    loveMeaning:
      "Aşkta Aşıklar, bağın gerçek bir tercih meselesi olduğunu gösterir. Çekim güçlüdür. Kart, “ikisini birden” kaçışını sevmez; kalbin durduğu yeri ister.",
    relationshipMeaning:
      "Karşı tarafta kişi senden yana bir tercih, çekim ve bağ hissi taşıyor olabilir. Aynı anda başka seçenek de zihni meşgul edebilir; asıl tema seçimdir.",
    thoughtsMeaning:
      "Düşüncelerde kişi “sen mi, başka yol mu, ikimiz neyiz?” diye tartar. Zihin kalple pazarlık eder. Kararsızlık, ilgisizlik değil; seçimin ağırlığıdır.",
    feelingsMeaning:
      "Duygularda çekim, bağ ve “bu kişi önemli” hissi netleşir. Kalp evet demeye yakındır, fakat evet’in bedeli de görülür.",
    actionMeaning:
      "Davranışta bir teklif, bir tercih cümlesi veya kaçınılan kararın yüzeye çıkması görülebilir. Kişi yaklaşır veya bir yol ayırır.",
    careerMeaning:
      "İşde iki teklif, meslek ile özel hayat çatışması veya değerine uymayan işi bırakma seçimi durur.",
    moneyMeaning:
      "Parada kazanç ile vicdan çatışabilir. Ucuz yol ile doğru yol ayrı durur.",
    futurePotential:
      "Olası yönde dürüst bir evet veya hayır bağın biçimini değiştirir. Seçilmeyen yol da sahneyi şekillendirir.",
    adviceMeaning:
      "Tavsiye olarak kalbinle pazarlık etme. Değerini söyle. İki kapıyı sonsuza dek aralık bırakmak kartın öğüdü değildir.",
    shadowMeaning:
      "Gölgede kararsızlık, baştan çıkarma ve seçmeden bağlanmaktır.",
    reversedMeaning:
      "Tersinde uyumsuz seçim, kaçınılan karar veya değer çatışması durur. Düzeltme, dürüst tercihtir.",
    symbols:
      "İki figür ve üstteki varlık; seçim, çekim ve hizalanmadır.",
  },
  {
    slug: "savas-arabasi",
    name: "Savaş Arabası",
    suit: "major",
    rank: "VII",
    number: "7",
    arcana: "major",
    coreThemes: ["irade", "yön", "zafer", "disiplin"],
    polar: polar({ motion: true }),
    generalMeaning:
      "Savaş Arabası, karşıtları tek yöne sürmeyi gösterir. Dağınık istekler dizginlenir. Kart, irade ve ilerleyiştir. Zafer, tesadüf değil; odaklanmış harekettir. Kontrol kaybolursa araba savrulur.",
    spiritualMeaning:
      "Spiritüel olarak iradenin dağınık benliği taşımasıdır. Yol, dizginle kutsanır.",
    loveMeaning:
      "Aşkta Savaş Arabası, ilişkiyi ilerletme, kazanma veya dağınık duyguları tek yöne çekme çabasını gösterir. Tutku vardır; acele zafer ise bağa zarar verebilir.",
    relationshipMeaning:
      "Karşı tarafta kişi yaklaşımı yönlendirmek, hızlanmak veya “kazanmak” isteyebilir. İlgi aktif ve iradeli durur.",
    thoughtsMeaning:
      "Düşüncelerde kafa hedefe kilitlenir. Kişi seni bir yön, bir kazanç veya aşılması gereken mesafe gibi düşünebilir. Kararsızlık azalır, irade artar.",
    feelingsMeaning:
      "Duygularda coşku, rekabet, gurur ve “ilerlemek istiyorum” hissi vardır. Kalp yumuşaklıktan çok ivme taşır.",
    actionMeaning:
      "Davranışta mesaj, ziyaret, net talep veya hızlanan adım görülür. Kişi bekleyen değil, süren taraftadır.",
    careerMeaning:
      "İşde proje hızlanır, rakip aşılır, hedefe kilitlenilir. Disiplin kazandırır; kör inat kaybettirir.",
    moneyMeaning:
      "Parada kararlı hamle, borç kapatma veya hedefe kilitli kazanç çabası durur.",
    futurePotential:
      "Olası yönde irade dağılmazsa görünür bir ilerleme açılır. Tempo artar.",
    adviceMeaning:
      "Tavsiye olarak dağınık istekleri tek yola bağla. Dizgini bırakma, karşıtı yok sayma; onu sür.",
    shadowMeaning:
      "Gölgede zorbalık, acele zafer ve duyguları ezerek ilerlemektir.",
    reversedMeaning:
      "Tersinde savrulan irade veya kontrolden çıkan hız durur. Düzeltme, yönü yeniden seçmektir.",
    symbols:
      "Araba ve iki karşıt varlık; iradenin zıtları taşımasıdır.",
  },
  {
    slug: "guc",
    name: "Güç",
    suit: "major",
    rank: "VIII",
    number: "8",
    arcana: "major",
    coreThemes: ["yumuşak kuvvet", "cesaret", "nefsi gütmek", "şefkat"],
    polar: polar({ warmth: true, labor: true }),
    generalMeaning:
      "Güç, vahşi olanı ezmeden durabilmeyi gösterir. Cesaret bağırmaz; nefes, şefkat ve sebatla çalışır. Kart, öfkeyi yok etmez, evcilleştirir. Asıl zafer, kendini incitmeden durabilmektir.",
    spiritualMeaning:
      "Spiritüel olarak içgüdüyle düşman olmamaktır. Kudret, yumuşak omurgadır.",
    loveMeaning:
      "Aşkta Güç, bağın sabır, şefkat ve kıskançlığı yutmayan bir cesaretle büyümesini gösterir. Tutku vardır; kontrol krizine dönmez. İlişki, nazik sebat ister.",
    relationshipMeaning:
      "Karşı tarafta kişi yumuşak fakat dirençli bir bağlılık taşıyor olabilir. His, zorla değil, sabırla tutulur.",
    thoughtsMeaning:
      "Düşüncelerde kişi seni sakinleştiren, cesaret isteyen veya “acele etmeden durulacak” biri olarak kuruyor olabilir. Zihin savaş planı değil, evcilleştirme arar.",
    feelingsMeaning:
      "Duygularda sıcak, cesur ve koruyucu bir his vardır. Öfke varsa bile şefkatle taşınır. Kalp, kırılganlığı yok saymaz.",
    actionMeaning:
      "Davranışta yumuşak ısrar, sakin duruş, nazik sınır ve sabırlı yaklaşım belirir. Kişi saldırmadan yerinde durabilir.",
    careerMeaning:
      "İşde zor kişiyi yönetmek, krizde sakin kalmak ve uzun işi sabırla bitirmek öne çıkar. Kaba güç değil, sebat kazandırır.",
    moneyMeaning:
      "Parada panik harcama yerine sakin yönetim istenir. Kaynak, korkuyla değil, ölçüyle tutulur.",
    futurePotential:
      "Olası yönde ilişki veya iş, zorlanmadan değil ama kırılmadan olgunlaşabilir.",
    adviceMeaning:
      "Tavsiye olarak sertleşme. Nefesini tut, öfkeyi konuştur, cesareti yumuşak tut. Asıl güç, durabilmektir.",
    shadowMeaning:
      "Gölgede bastırılmış öfke veya başkasını “ıslah etme” arzusudur.",
    reversedMeaning:
      "Tersinde özgüven düşer veya öfke taşar. Düzeltme, şefkatli omurgadır.",
    symbols:
      "Aslan ve sonsuzluk işareti; evcilleşen içgüdü ve sonsuz sebattır.",
  },
  {
    slug: "ermis",
    name: "Ermiş",
    suit: "major",
    rank: "IX",
    number: "9",
    arcana: "major",
    coreThemes: ["içe dönüş", "yalnızlık", "rehberlik", "ışık"],
    polar: polar({ pause: true }),
    generalMeaning:
      "Ermiş, kalabalığın öğretemediği şeyi yalnızlıkta görmeyi gösterir. Kart izolasyon değil, bilinçli çekilmedir. Kişi kendi ışığını taşıyacak kadar sadeleşir. Tavsiye dışarıdan çok içeriden gelir.",
    spiritualMeaning:
      "Spiritüel olarak iç rehberlik ve sade yoldur. Bilgelik, sahneye çıkmadan durur.",
    loveMeaning:
      "Aşkta Ermiş, bağın biraz mesafeye, içsel netliğe veya yalnız düşünmeye ihtiyaç duyduğunu gösterir. Bu terketme olmak zorunda değildir; kişi kendini toparlar.",
    relationshipMeaning:
      "Karşı tarafta kişi içine çekilmiş, kendi ışığında duran veya ilişkiyi biraz uzaktan okuyan bir yerde olabilir.",
    thoughtsMeaning:
      "Düşüncelerde kafa kalabalık yorumdan çekilir. Kişi seni kendi içinde, sessizce ve derin tartıyor olabilir. Dışarıya az yansır.",
    feelingsMeaning:
      "Duygularda his samimi fakat mahremdir. Yalnızlık, yoksunluk değil; korunan bir iç alan olabilir. Kalp sakin ve mesafelidir.",
    actionMeaning:
      "Davranışta az görünme, geç cevap, yalnız vakit veya sade bir söz belirir. Gösterişli jest beklenmez.",
    careerMeaning:
      "İşde uzmanlık, danışmanlık, sadeleştirme ve kalabalıktan çekilip işi derinleştirme öne çıkar.",
    moneyMeaning:
      "Parada sade bütçe, azla yetinme ve gösterişten kaçış durur.",
    futurePotential:
      "Olası yönde süreç, gürültü azalırsa daha net bir iç karara varabilir.",
    adviceMeaning:
      "Tavsiye olarak her kapıyı çalma. Bir süre kendi ışığında dur. Cevap, dış onayda değil.",
    shadowMeaning:
      "Gölgede kopukluk, küçümseyen yalnızlık ve yardımı reddetmektir.",
    reversedMeaning:
      "Tersinde ya aşırı izolasyon ya da iç sesi duyamayan kalabalık durur. Düzeltme, sakin tek başinalıktır.",
    symbols:
      "Fener, dağ ve asâ; kendi ışığını taşıyan sade yolcudur.",
  },
  {
    slug: "kader-carki",
    name: "Kader Çarkı",
    suit: "major",
    rank: "X",
    number: "10",
    arcana: "major",
    coreThemes: ["döngü", "değişim", "zaman", "tesadüf"],
    polar: polar({ motion: true, confusion: true }),
    generalMeaning:
      "Kader Çarkı, senin kontrolün dışındaki dönüşü gösterir. Bir evre kapanır, başka bir evre döner. Kart, her şeyin senin iradende olmadığını hatırlatır. Şans, zamanlama ve döngü konuşur. Tutunulan tepe sonsuz değildir.",
    spiritualMeaning:
      "Spiritüel olarak çarkın kutsal hareketidir. Teslim, çaresizlik değil; zamanı okumaktır.",
    loveMeaning:
      "Aşkta Kader Çarkı, bağın bir döngüye girdiğini gösterir. Eski bir tema dönebilir, zamanlama değişebilir, “tesadüf” gibi duran bir kıpırtı belirebilir. Kalıcılık vaadi değil, hareket vaadidir.",
    relationshipMeaning:
      "Karşı tarafta kişi kader, zamanlama veya “nasıl olsa döner” hissiyle duruyor olabilir. Durum onun tek başına kurduğu bir plan olmayabilir.",
    thoughtsMeaning:
      "Düşüncelerde kafa “zamanı mı geldi, tesadüf mü, döngü mü?” diye döner. Kişi seni kaçınılmaz bir kıpırtı gibi düşünebilir.",
    feelingsMeaning:
      "Duygularda iniş-çıkış, heyecan ve belirsiz bir umut karışır. His sabit değil, çark gibi hareketlidir.",
    actionMeaning:
      "Davranışta ani bir karşılaşma, beklenmedik mesaj veya zamanlamanın zorladığı adım görülebilir. Plan ikinci plandadır.",
    careerMeaning:
      "İşde dönem değişir, fırsat döner, sektör hareket eder. Esneklik kazandırır; inat ettirmek kaybettirir.",
    moneyMeaning:
      "Parada dalgalanma, beklenmedik giriş veya çıkış olabilir. Tek sayıya kilitlenme.",
    futurePotential:
      "Olası yönde sahne kendi kendine döner. Yeni bir evre açılabilir; eski tepe inebilir.",
    adviceMeaning:
      "Tavsiye olarak çarka karşı kürek çekme. Zamanlamayı oku, hazır ol, tutunmayı bırak.",
    shadowMeaning:
      "Gölgede kaderciliğe sığınıp iradeyi iptal etmektir.",
    reversedMeaning:
      "Tersinde kötü zamanlama, direnç veya ters dönen şans durur. Düzeltme, döngüyü görmektir.",
    symbols:
      "Dönen çark ve figürler; yükselen ve inen kader dilidir.",
  },
  {
    slug: "adalet",
    name: "Adalet",
    suit: "major",
    rank: "XI",
    number: "11",
    arcana: "major",
    coreThemes: ["denge", "hakikat", "sonuç", "ölçü"],
    polar: polar({ pause: true }),
    generalMeaning:
      "Adalet, her sözün ve eylemin tartıldığını gösterir. Kart duygusal müjde değil, sonuçtur. Denge bozulduysa görünür olur. Hakikat, taraflı hikâyeyi keser. Sorumluluk kaçılmaz.",
    spiritualMeaning:
      "Spiritüel olarak kozmik ölçü ve dürüstlüktür. Vicdan, süs değil terazidir.",
    loveMeaning:
      "Aşkta Adalet, ilişkideki emeğin, sözün ve dengenin tartıldığını gösterir. Tek taraflı bağ görünür olur. Kart, adil konuşmayı ve hesabı ister.",
    relationshipMeaning:
      "Karşı tarafta kişi ilişkiyi hak, haksızlık, denge ve “kim ne verdi?” üzerinden okuyor olabilir. Duygusal sis azalır, ölçü artar.",
    thoughtsMeaning:
      "Düşüncelerde kafa yargıçtır. Kişi seni doğru-yanlış, adil-haksız, denk-denk değil diye tartar. Romantik süs geride kalır.",
    feelingsMeaning:
      "Duygularda soğuk bir netlik, kırgın bir haklılık veya dengelenmiş bir saygı durabilir. His, masalsı değil ölçülüdür.",
    actionMeaning:
      "Davranışta konuşma, sınır, resmi adım, özür veya hesabı görme görülebilir. Kişi kaçamak jest değil, tartılmış hamle yapar.",
    careerMeaning:
      "İşde sözleşme, hukuk, değerlendirme ve emeğin karşılığı öne çıkar. Hile uzun sürmez.",
    moneyMeaning:
      "Parada borç, alacak, adil paylaşım ve resmi hesap durur.",
    futurePotential:
      "Olası yönde gerçek sonuç görünür. Saklanan dengesizlik açığa çıkar.",
    adviceMeaning:
      "Tavsiye olarak doğruyu söyle, payını üstlen, teraziyi eğme. Duygu, ölçüyü iptal etmesin.",
    shadowMeaning:
      "Gölgede acımasız yargı ve merhametsiz haklılıktır.",
    reversedMeaning:
      "Tersinde haksızlık, kaçınılan hesap veya çarpık ölçü durur. Düzeltme, dürüst tartıdır.",
    symbols:
      "Terazi ve kılıç; ölçü ile kesen hakikattir.",
  },
  {
    slug: "asilan-adam",
    name: "Asılan Adam",
    suit: "major",
    rank: "XII",
    number: "12",
    arcana: "major",
    coreThemes: ["teslim", "bekleyiş", "yeni bakış", "askı"],
    polar: polar({ pause: true }),
    generalMeaning:
      "Asılan Adam, iradenin işe yaramadığı askıyı gösterir. Kart, ters bakış ve bekleyişteki bilgeliktir. Zorla ilerlemek sahneyi bozar. Teslim, yenilgi değil; başka bir açıdan görmektir.",
    spiritualMeaning:
      "Spiritüel olarak ego’nun askıya alınmasıdır. Anlam, durunca iner.",
    loveMeaning:
      "Aşkta Asılan Adam, ilişkinin bir bekleyişe, ertelemeye veya bakış değişimine girdiğini gösterir. Acele talep bağa zarar verir. Kalp, ters açıdan bakmayı öğrenir.",
    relationshipMeaning:
      "Karşı tarafta kişi bekliyor, askıda tutuyor veya henüz hareket etmemeyi seçmiş olabilir. Bu yokluk değil, durdurulmuş zamandır.",
    thoughtsMeaning:
      "Düşüncelerde kafa eski çözümü bırakır. Kişi seni “şimdi zorlamayayım, başka türlü bakayım” diye düşünebilir. Analiz yavaşlar, perspektif değişir.",
    feelingsMeaning:
      "Duygularda sükûnet, tuhaflık, kabul ve biraz çaresiz şefkat karışabilir. His yoğundur fakat dışarı taşmaz.",
    actionMeaning:
      "Davranışta durma, erteleme, cevap gecikmesi veya görünür bir hareketsizlik belirir. Adım, bakış değişince gelir.",
    careerMeaning:
      "İşde proje askıda, terfi bekler, strateji tersine çevrilir. Zorla kapatmak bozar.",
    moneyMeaning:
      "Parada dondurulmuş karar, bekleyen ödeme veya “şimdi değil” duruşu vardır.",
    futurePotential:
      "Olası yönde bekleyiş bir bakış değişimine dönüşürse yeni bir yol açılır. Tempo yavaş kalır.",
    adviceMeaning:
      "Tavsiye olarak itme. Askıyı utanç sayma. Ters açıdan bak. Cevap, durunca gelir.",
    shadowMeaning:
      "Gölgede kurban rolü ve sonsuz ertelemedir.",
    reversedMeaning:
      "Tersinde ya inatla zorlamak ya da gereksiz askı durur. Düzeltme, doğru teslimdir.",
    symbols:
      "Ters asılı beden; iradenin durduğu ve bakışın döndüğü andır.",
  },
  {
    slug: "olum",
    name: "Ölüm",
    suit: "major",
    rank: "XIII",
    number: "13",
    arcana: "major",
    coreThemes: ["bitiş", "dökülme", "geçiş", "yenilenme"],
    polar: polar({ wound: true, motion: true }),
    generalMeaning:
      "Ölüm, fiziksel ölüm kehaneti değil; eski formun dökülmesidir. Kart, artık işlemeyen bağın, işin veya kimliğin bittiğini gösterir. Tutunmak acıyı uzatır. Ardından boşluk, sonra yeni deri gelir.",
    spiritualMeaning:
      "Spiritüel olarak eşik ve yenilenmedir. Ölmeden dönüşülmez.",
    loveMeaning:
      "Aşkta Ölüm, ilişkinin bir evresinin kapandığını gösterir. Bu her zaman ayrılık değildir; eski rol, eski oyun, eski beklenti ölür. Tutulan ceset bağa zarar verir.",
    relationshipMeaning:
      "Karşı tarafta kişi bir şeyi bitirmiş, bitirmek üzere veya eski hâle dönemeyeceğini biliyor olabilir. His, veda ile karışıktır.",
    thoughtsMeaning:
      "Düşüncelerde kafa “bitti, değişti, eski biz yok” cümlesine yaklaşır. Kişi seni geçmiş bir form olarak da görebilir. Zihin, kapanışla meşguldür.",
    feelingsMeaning:
      "Duygularda yas, ferahlama, korku ve tuhaf bir boşluk bir arada durabilir. Kalp, eskiye dönmenin mümkün olmadığını bilir.",
    actionMeaning:
      "Davranışta mesafe, kapanış, ilişkiyi dondurma veya eski kapıyı sürmeme görülebilir. Hareket, veda karakterindedir.",
    careerMeaning:
      "İşde rol biter, iş kapanır, kimlik değişir. Yeni iş, dökülmeden sonra gelir.",
    moneyMeaning:
      "Parada bir gelir kapısı kapanır veya harcama biçimi ölür. Yenisi, boşluktan sonra kurulur.",
    futurePotential:
      "Olası yönde eski sahne kapanır. Yeni form, tutunma bırakılırsa açılır.",
    adviceMeaning:
      "Tavsiye olarak biteni diriltme. Yasını tut, derini bırak, boşluğa izin ver.",
    shadowMeaning:
      "Gölgede her değişimi felaket saymak veya acımasız kopuştur.",
    reversedMeaning:
      "Tersinde bitmeyen veda, zombi bağ veya korkulan değişim durur. Düzeltme, dökülmeye izin vermektir.",
    symbols:
      "İskelet, bayrak ve batıp doğan ışık; kaçınılmaz geçiştir.",
  },
  {
    slug: "denge",
    name: "Denge",
    suit: "major",
    rank: "XIV",
    number: "14",
    arcana: "major",
    coreThemes: ["uyum", "tempo", "karışım", "ölçü"],
    polar: polar({ pause: true, warmth: true }),
    generalMeaning:
      "Denge, zıtları doğru ölçüde karıştırmayı gösterir. Kart, aşırılığı yumuşatır. Çok ateş veya çok su sahneyi bozar. Şifa, tempo ve orta yoldur. Acele sonuç değil, ayar ister.",
    spiritualMeaning:
      "Spiritüel olarak simya ve ölçülü akıştır. Kutsal, karışımdadır.",
    loveMeaning:
      "Aşkta Denge, ilişkinin yumuşaması, tempo bulması ve uçların karışmasını gösterir. Bir tarafın aşırı gittiği yerde orta aranır. Bağ, ayar ile yürür.",
    relationshipMeaning:
      "Karşı tarafta kişi uyum, barış ve “bir orta bulalım” niyeti taşıyor olabilir. Sert uçlar yumuşar.",
    thoughtsMeaning:
      "Düşüncelerde kafa uçları tartar. Kişi seni aşırı bir kararla değil, karışım ve tempo ile düşünüyor olabilir.",
    feelingsMeaning:
      "Duygularda sakinleşme, yumuşama ve karışık hislerin bir arada durabilmesi öne çıkar. Kalp, aşırı sıcak veya soğuk değildir.",
    actionMeaning:
      "Davranışta uzlaşma, ritim ayarı, yavaş yaklaşım ve ölçülü jest belirir. Aşırı hamle beklenmez.",
    careerMeaning:
      "İşde ekip uyumu, süreç iyileştirme ve aşırı yükü dengeleme öne çıkar.",
    moneyMeaning:
      "Parada gelir-gider ayarı, savurganlık ile cimrilik arası ölçü durur.",
    futurePotential:
      "Olası yönde süreç yumuşar, tempo oturur, uçlar karışır. Patlama değil, ayar gelir.",
    adviceMeaning:
      "Tavsiye olarak bir ucu bırak, diğerini de. Karıştır, ölç, acele etme.",
    shadowMeaning:
      "Gölgede kararsız orta ve tuzsuz uyumdur.",
    reversedMeaning:
      "Tersinde dengesizlik, aşırı uç veya uyumsuz karışım durur. Düzeltme, dozu bulmaktır.",
    symbols:
      "İki kap arasında akan su; karışım ve ölçüdür.",
  },
  {
    slug: "seytan",
    name: "Şeytan",
    suit: "major",
    rank: "XV",
    number: "15",
    arcana: "major",
    coreThemes: ["bağ", "arzu", "gölge", "tasma"],
    polar: polar({ wound: true, secrecy: true }),
    generalMeaning:
      "Şeytan, özgürlüğü unutturan bağı gösterir. Arzu, alışkanlık, kıskançlık, utanç veya maddi tasma kişiye “ben buyum” dedirtir. Kart şeytanlaştırma değil; zincirin görünmesidir. Zincir çoğu zaman gevşektir, fakat çıkarılmaz.",
    spiritualMeaning:
      "Spiritüel olarak gölgeyle yüzleşmedir. Işık, inkârla değil, bakmakla gelir.",
    loveMeaning:
      "Aşkta Şeytan, bağımlı, kıskanç, tensel veya çıkışsız hissedilen bir bağı gösterir. Çekim güçlüdür. Özgür irade unutulursa ilişki tasmasına döner. Kart, her tutkuyu günah saymaz; tasmayı gösterir.",
    relationshipMeaning:
      "Karşı tarafta kişi arzu, kıskançlık, alışkanlık veya “bırakamiyorum” hali taşıyor olabilir. Bağ, sağlıklı bağlılıktan çok tasma gibi durabilir.",
    thoughtsMeaning:
      "Düşüncelerde kafa kişiyi takıntı, arzu, kıyas veya “bu işten çıkamıyorum” döngüsünde tutar. Zihin özgürce seçtiğini sanır, alışkanlık konuşur.",
    feelingsMeaning:
      "Duygularda yoğun çekim, utanç, kıskançlık veya bağımlı bir sıcaklık durabilir. His güçlüdür, rahat değildir.",
    actionMeaning:
      "Davranışta gel-git, kıskanç jest, tensel yakınlık, kontrol veya kopamama görülür. Tutarlı özgür adım zorlaşır.",
    careerMeaning:
      "İşde toksik bağ, bağımlı düzen, etik kayma veya “bu işe mahkûmum” inancı öne çıkar.",
    moneyMeaning:
      "Parada borç, gösteriş, bağımlı harcama veya paraya tasma vardır.",
    futurePotential:
      "Olası yönde zincir görülmezse döngü sürer. Görülürse özgürlük kapısı aralanır.",
    adviceMeaning:
      "Tavsiye olarak tasmayı say. Arzuyu yok sayma, ona köle de olma. Çıkış, utançla değil, dürüst bakışla gelir.",
    shadowMeaning:
      "Gölgede suistimal, manipülasyon ve kendi gölgesini başkasına yüklemektir.",
    reversedMeaning:
      "Tersinde zincirin fark edilmesi veya daha da sıkılması durur. Düzeltme, özgürlüğü hatırlamaktır.",
    symbols:
      "Zincir, boynuz ve çıplak bağ; görünmeyen tasmadır.",
  },
  {
    slug: "kule",
    name: "Kule",
    suit: "major",
    rank: "XVI",
    number: "16",
    arcana: "major",
    coreThemes: ["yıkım", "ani hakikat", "çatlak", "uyanış"],
    polar: polar({ wound: true, motion: true }),
    generalMeaning:
      "Kule, sahte yapının inmesini gösterir. Kart nazik değildir. Yanlış inanç, yalan güvenlik veya şişmiş ego çatlar. Acı, hakikatin hızındandır. Enkazın ardından gerçek zemin görünür.",
    spiritualMeaning:
      "Spiritüel olarak yıldırım uyanışıdır. Yapı kutsal sanılırken insan yapımı olduğu anlaşılır.",
    loveMeaning:
      "Aşkta Kule, ilişkinin bir hakikatinin ani çöküşünü gösterir. Aldatma, kriz, itiraf veya “sandığım kişi o değil” anı olabilir. Kart her bağı bitirmez; yalan zemini bitirir.",
    relationshipMeaning:
      "Karşı tarafta kişi sarsılmış, öfkeli, şokta veya gerçeği görmüş olabilir. Durum, yumuşak bir süreç değil.",
    thoughtsMeaning:
      "Düşüncelerde kafa eski hikâyeyi tutamaz. Kişi seni kriz, kopuş veya “her şey yıkıldı” cümlesiyle düşünebilir. Zihin sakin plan kuramaz.",
    feelingsMeaning:
      "Duygularda şok, öfke, korku ve tuhaf bir ferahlama karışabilir. Kalp, eski masalı taşıyamaz.",
    actionMeaning:
      "Davranışta ani mesafe, patlayan konuşma, ayrılık jesti veya krizin zorladığı hamle görülür. İnce ayar beklenmez.",
    careerMeaning:
      "İşde yapı bozulur, iş kaybı, ifşa veya ani yön değişimi olabilir. Enkaz, yeni işin zeminini açar.",
    moneyMeaning:
      "Parada ani kayıp, borç gerçeği veya şişmiş planın inmesi durur.",
    futurePotential:
      "Olası yönde sahte güvenlik durmaz. Hakikat görünür, sonra sade bir zemin kurulur.",
    adviceMeaning:
      "Tavsiye olarak yıkılanı yapıştırma. Gerçeğe izin ver. Enkazı utanç sayma; zemin arıyordun.",
    shadowMeaning:
      "Gölgede yıkımı romantize etmek veya başkasının kulesini keyifle izlemektir.",
    reversedMeaning:
      "Tersinde geciken çöküş veya inkâr durur. Düzeltme, yıldırımı görmektir.",
    symbols:
      "Yıldırım ve düşen figürler; ani hakikattir.",
  },
  {
    slug: "yildiz",
    name: "Yıldız",
    suit: "major",
    rank: "XVII",
    number: "17",
    arcana: "major",
    coreThemes: ["umut", "şifa", "ilham", "açıklık"],
    polar: polar({ warmth: true, pause: true }),
    generalMeaning:
      "Yıldız, krizden sonra kalan çıplak umudu gösterir. Kart müjde bombası değil; sakin, uzun, şifaya açık bir ışıktır. Kişi yarayı gizlemeden yenilenir. İlham, gösterişsizdir.",
    spiritualMeaning:
      "Spiritüel olarak yeniden inanç ve göğe açık olmaktır. Şifa, acele etmez.",
    loveMeaning:
      "Aşkta Yıldız, bağın yumuşamasını, umudun dönmesini ve daha dürüst bir şefkati gösterir. Yara bitmiş olmayabilir; ışık yine de vardır. İlişki, iyileşme iklimine girer.",
    relationshipMeaning:
      "Karşı tarafta kişi umut, şefkat ve “belki olur” açıklığı taşıyor olabilir. His, kule tozundan sonra kalan sakin ışıktır.",
    thoughtsMeaning:
      "Düşüncelerde kafa geleceğe daha yumuşak bakar. Kişi seni şifa, umut ve açık bir ihtimal olarak düşünebilir. Felaket senaryosu zayıflar.",
    feelingsMeaning:
      "Duygularda kırılgan, temiz ve umutlu bir sıcaklık durur. Kalp savunmasızdır, fakat bu savunmasızlık şifaya açıktır.",
    actionMeaning:
      "Davranışta nazik temas, özür, yumuşak mesaj ve şifaya izin veren jestler görülebilir. Tempo yavaş ve temizdir.",
    careerMeaning:
      "İşde yenilenen motivasyon, yaratıcı ilham ve uzun vadeli umut öne çıkar. Mucize iş değil, iyileşen yön.",
    moneyMeaning:
      "Parada toparlanma, sade bolluk ve korkunun azalması durur.",
    futurePotential:
      "Olası yönde süreç yumuşak bir yenilenmeye açılır. Işık, acele etmeden büyür.",
    adviceMeaning:
      "Tavsiye olarak umudu küçümseme. Yaranı gizleme, ilhamı takip et, sakin kal.",
    shadowMeaning:
      "Gölgede naif kaçış ve gerçek yaranın üstünü yıldızla örtmektir.",
    reversedMeaning:
      "Tersinde umutsuzluk veya sahte pozitiflik durur. Düzeltme, çıplak ışıktır.",
    symbols:
      "Yıldız, su ve çıplaklık; şifa ve açık inançtır.",
  },
  {
    slug: "ay",
    name: "Ay",
    suit: "major",
    rank: "XVIII",
    number: "18",
    arcana: "major",
    coreThemes: ["sis", "korku", "sezgi", "yanılsama"],
    polar: polar({ confusion: true, secrecy: true }),
    generalMeaning:
      "Ay, görünenin altındaki dalgayı gösterir. Kart, korku, rüya, projeksiyon ve henüz netleşmemiş hakikati taşır. Her gölge düşman değildir; her ışık da gerçek değildir. Sezgi gerekir, panik değil.",
    spiritualMeaning:
      "Spiritüel olarak gece bilgeliği ve bilinçaltıdır. Yol, gündüz gözüyle çizilmez.",
    loveMeaning:
      "Aşkta Ay, ilişkide belirsizlik, kıskançlık, yanlış okuma veya söylenmeyen hisleri gösterir. Çekim vardır, netlik yoktur. Kart, her sisin yalan olduğunu söylemez; göremediğini hatırlatır.",
    relationshipMeaning:
      "Karşı tarafta kişi karışık, korkulu, özlemli veya ne hissettiğini bilemeyen bir yerde olabilir. Dışarı yansıyan, içteki dalgayı tam göstermez.",
    thoughtsMeaning:
      "Düşüncelerde kafa senaryo üretir, korku büyütür, işaret okur. Kişi seni net bir gerçek gibi değil, sisli bir ihtimal gibi düşünür. Analiz bozulur.",
    feelingsMeaning:
      "Duygularda özlem, korku, çekim ve belirsizlik karışır. Kalp dalgalıdır. His vardır, adı tam konmaz.",
    actionMeaning:
      "Davranışta gel-git, kaçamak, gecikmiş cevap veya dolaylı temas görülür. Net hamle, sis dağılmadan zor gelir.",
    careerMeaning:
      "İşde belirsiz rol, söylenti, gizli gündem veya netleşmeyen teklif durur. Acele imza risklidir.",
    moneyMeaning:
      "Parada belirsiz gelir, gizli masraf veya korku temelli karar vardır.",
    futurePotential:
      "Olası yönde sis ya dağılır ya da korku büyür. Yön, panikle değil, sezgiyle netleşir.",
    adviceMeaning:
      "Tavsiye olarak her gölgeye inanma. Sezgini dinle, korkunu kanıt sanma. Sabah ışığını bekle.",
    shadowMeaning:
      "Gölgede yalan, kendini kandırma ve başkasını sisle boğmaktır.",
    reversedMeaning:
      "Tersinde sisin dağılması veya korkunun daha da büyümesi durur. Düzeltme, dalgayı görmektir.",
    symbols:
      "Ay, su ve iki köpek; gece korkusu ve sezgidir.",
  },
  {
    slug: "gunes",
    name: "Güneş",
    suit: "major",
    rank: "XIX",
    number: "19",
    arcana: "major",
    coreThemes: ["netlik", "canlılık", "görünürlük", "sevinç"],
    polar: polar({ warmth: true, motion: true }),
    generalMeaning:
      "Güneş, saklananın görünmesi ve hayatın ısınmasıdır. Kart, sahicilik, vitalite ve sade bir mutluluğu gösterir. Karmaşa dağılır. Bu, her sorunun bittiği anlamına gelmez; ışık, sahneyi gizlemez.",
    spiritualMeaning:
      "Spiritüel olarak içten gelen ferahlık ve görünür hakikattir. Ruh, utançsiz ısınır.",
    loveMeaning:
      "Aşkta Güneş, bağın daha açık, sıcak ve görünür olduğunu gösterir. Çekim gizlenmek istemez. İlişki, utangaç sisden çıkıp sahici bir canlılığa döner.",
    relationshipMeaning:
      "Karşı tarafta kişi sıcaklık, çekim, samimiyet ve yanında iyi hissettiği bir enerji taşır. Duygular saklanmaktan çok görünür olma eğilimindedir.",
    thoughtsMeaning:
      "Düşüncelerde kafa daha sade ve olumlu kurar. Kişi seni net, aydınlık, “bu iyi hissettiriyor” diye düşünebilir. Karmaşık senaryo azalır.",
    feelingsMeaning:
      "Duygular tarafında tablo düşüncelerden daha açık olabilir. Güneş sıcaklık, çekim, samimiyet ve kişinin yanında iyi hissettiği bir iklim taşır. Sana karşı olumlu duygular beslemesi, seni düşündüğünde daha canlı, rahat veya görünür hissetmesi mümkündür. Bu kart duyguların saklanmasından çok yüzeye çıkma eğilimini taşır; utanç, sis veya oyun burada ikinci plandadır. His yok değildir, gizlenmek de istemez.",
    actionMeaning:
      "Davranışta açık mesaj, görünür ilgi, davet ve utangaç olmayan bir yakınlaşma görülebilir. Kişi gizlenerek değil, ışıkta durarak yaklaşır.",
    careerMeaning:
      "İşde başarı görünür, emek ışığa çıkar, moral yükselir. Kart, gizli kalmış işin tanınmasını da gösterir.",
    moneyMeaning:
      "Parada açıklık, toparlanan nakit ve daha ferah bir akış durur. Gizlenen hesap azalır.",
    futurePotential:
      "Olası yönde süreç ısınır, netleşir ve daha görünür bir bağ veya başarı açılabilir.",
    adviceMeaning:
      "Tavsiye olarak gizleme. Sahici ol, ısın, görün. Küçük sevinci küçümseme.",
    shadowMeaning:
      "Gölgede naif körlük ve her şeyi pembe boyamaktır.",
    reversedMeaning:
      "Tersinde geçici bulanıklık, gurur veya sevinci erteleme durur. Düzeltme, sade ışıktır.",
    symbols:
      "Güneş, çocuk ve ayçiçeği; görünür canlılıktır.",
  },
  {
    slug: "mahkeme",
    name: "Mahkeme",
    suit: "major",
    rank: "XX",
    number: "20",
    arcana: "major",
    coreThemes: ["çağrı", "uyanış", "hesap", "uğurlama"],
    polar: polar({ motion: true }),
    generalMeaning:
      "Mahkeme, duyulan ses ve eskiyi uğurlamaktır. Kart, geçmişin çağrılması, affın, hesabın ve yeniden doğuşun eşiğidir. Bir şey tamamlanır, bir şey uyanır. Bu yargıç korkusu değil; çağrıdır.",
    spiritualMeaning:
      "Spiritüel olarak diriliş ve duyulan iç sestir. Geçmiş, inkârla değil, uğurlamayla kapanır.",
    loveMeaning:
      "Aşkta Mahkeme, eski bir bağın, sözün veya kırgınlığın yeniden yüzeye çıkmasını gösterir. Kart, kapanış, af veya ikinci bir dürüst konuşma getirebilir. Geçmiş yok sayılmaz.",
    relationshipMeaning:
      "Karşı tarafta kişi geçmişi hatırlıyor, bir çağrı duyuyor veya hesabı kapatmak/yeniden açmak istiyor olabilir.",
    thoughtsMeaning:
      "Düşüncelerde kafa eski sahneyi tarar. Kişi seni geçmiş, pişmanlık, “keşke” veya uyanış cümleleriyle düşünebilir.",
    feelingsMeaning:
      "Duygularda pişmanlık, özlem, ferahlama ve uyanmış bir şefkat karışabilir. Kalp, eski dosyayı duyar.",
    actionMeaning:
      "Davranışta arama, konuşma, özür, kapanış veya geçmişi yoklayan bir adım görülebilir.",
    careerMeaning:
      "İşde eski projenin dönüşü, değerlendirme, kariyer uyanışı veya mesleki çağrı öne çıkar.",
    moneyMeaning:
      "Parada eski borç, iade, kapanan hesap veya geçmişin mali yankısı durur.",
    futurePotential:
      "Olası yönde bir çağrı duyulursa yeni bir evre, eskiyi uğurlayarak açılır.",
    adviceMeaning:
      "Tavsiye olarak geçmişi gömme, onu uğurla. Çağrıyı duy, hesabı kaçırma.",
    shadowMeaning:
      "Gölgede bitmeyen dava ve kendini yargıç ilan etmektir.",
    reversedMeaning:
      "Tersinde duyulmayan çağrı veya kapanmayan geçmiş durur. Düzeltme, uğurlamaktır.",
    symbols:
      "Borazan ve yükselen figürler; çağrı ve uyanıştır.",
  },
  {
    slug: "dunya",
    name: "Dünya",
    suit: "major",
    rank: "XXI",
    number: "21",
    arcana: "major",
    coreThemes: ["tamamlanma", "bütünlük", "yerini bulmak", "çember"],
    polar: polar({ warmth: true, labor: true }),
    generalMeaning:
      "Dünya, bir çemberin kapanışını ve yerini bulmayı gösterir. Kart, dağınık parçaların bütün olmasıdır. Başarı, seyahat, entegrasyon ve “ buradayım” hissi öne çıkar. Yeni döngü, bu kapanışın ardından gelir.",
    spiritualMeaning:
      "Spiritüel olarak bütünlük ve dünyada yerini almaktır. Ruh, kaçmaz; enkarne olur.",
    loveMeaning:
      "Aşkta Dünya, ilişkinin olgun, bütün ve “yerini bulmuş” bir evresini gösterir. Bağ, eksik parça arayışından çıkıp dans eder. Kart, her bağın evlilik olduğu anlamına gelmez; tamamlanmış bir ritimdir.",
    relationshipMeaning:
      "Karşı tarafta kişi sende bir bütünlük, olgunluk ve “bu kişi hayatıma oturuyor” hissi taşıyor olabilir.",
    thoughtsMeaning:
      "Düşüncelerde kafa seni tamamlanmış, oturmuş, uzun vadeli bir resmin parçası gibi kuruyor olabilir. Zihin dağınık seçenek değil, bütün arar.",
    feelingsMeaning:
      "Duygularda huzur, gurur, bağlılık ve “yerim burası” hissi öne çıkar. Kalp tedirgin kaçışta değildir.",
    actionMeaning:
      "Davranışta tamamlama, somut adım, birlik jesti veya işi bitirip bağa yer açma görülür.",
    careerMeaning:
      "İşde proje biter, tanınma gelir, uluslararası veya bütüncül bir başarı açılır.",
    moneyMeaning:
      "Parada olgunlaşma, tamamlanan döngü ve daha bütün bir güvenlik durur.",
    futurePotential:
      "Olası yönde süreç kapanır ve yeni bir çember, daha bütün bir yerden başlar.",
    adviceMeaning:
      "Tavsiye olarak işi bitir, yerini al, dağınık parçayı bütünle. Kaçış değil, dans.",
    shadowMeaning:
      "Gölgede bitmeyen iş ve “hiçbir yerde yerim yok” inancıdır.",
    reversedMeaning:
      "Tersinde kapanmayan döngü veya geciken tamamlanma durur. Düzeltme, son adımı atmaktır.",
    symbols:
      "Dans eden figür ve çelenk; bütünlük ve yerini bulmaktır.",
  },
];

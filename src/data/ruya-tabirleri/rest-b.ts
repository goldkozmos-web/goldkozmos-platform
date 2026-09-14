import type { DreamGuide } from "./types";

function guide(
  partial: Omit<DreamGuide, "published" | "updatedAt">,
): DreamGuide {
  return { ...partial, published: true, updatedAt: "2026-09-14" };
}

export const restGuidesB: DreamGuide[] = [
  guide({
    id: "ruyada-deniz-gormek",
    title: "Rüyada Deniz Görmek",
    slug: "ruyada-deniz-gormek",
    h1: "Rüyada Deniz Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Deniz Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada deniz görmek ne anlama gelir? Durgun veya fırtınalı denizin spiritüel anlamını rüyanın detayına göre oku.",
    searchAliases: ["deniz", "deniz görmek", "denizde yüzmek", "okyanus", "dalga"],
    intro:
      "Ana mesaj, bireysel iradenin ötesindeki akışla karşılaşmaktır. Kıyı görmek ve ölçmektir; su temas ve ritimdir. Durgunluk sükûnet, dalga hareket, fırtına eşik, bulanıklık henüz çözülmemiş bir derinlik olabilir. Denizi tek bir müjdeye sıkıştırmak mesajı bozar.\n\nAçık deniz bilinmeyeni, liman sığınmayı, evin yanındaki deniz özel hayatın iklimini taşır. Yanındaki kişi o derinlikte kiminle yol aldığını gösterir. Yalnızsan sahne daha içseldir.",
    spiritualMeaning:
      "Deniz, kendi kıyını hatırlayarak daha büyük bir ritme bırakılmayı ister. Teslimiyet yok olmak değildir. Gelen dalga açıklık, çekilen dalga bırakış olabilir. Kişisel hikâyenin altında daha geniş bir su durur. Rüya o suya kulak vermeni isteyebilir. Korkuyla bakılan derinlik henüz hazır olunmayan bir katmanı; huzurla bakılan genişlik ruhun o alanda yer tutabildiğini gösterir.\n\nYüzmek akışla ilişki kurduğunu, kıyıdan bakmak henüz mesafeyi koruduğunu anlatır. Ayak bileğine kadar girmek temkinli açılmadır. Boğulur gibi olmak kapasitenin aşıldığını, kıyıya vurmak bir döngünün karaya çıktığını gösterir. Aynı yere vuran dalga, hayatta da aynı temanın ritmik dönüşüdür. Sabah bedende dalgalı bir his varsa sahne henüz kapanmamıştır.\n\nTuz hem yakar hem temizler. Gemi iradeyi, liman sığınmayı, ada yalnız fakat bütün bir içsel sahayı, kayalık kıyı sınırı taşır. Dibinin görünmesi netliği, görünmemesi henüz adlandırılmamış katmanı işaret eder. Su düşman değildir. Okunması gereken geniş bir alandır.\n\nSert kimlik ıslanır, yumuşar, bazen dağılır. Islanmak kayıp gibi durabilir; kabuğun suya alışmasıdır. Kıyıda kalmak da bir seçimdir. Önemli olan seçimin farkında olmaktır. Deniz bağın gelgitini veya emeğin büyük ölçeğini de taşıyabilir; asıl okuma yine suyun hâli ve senin konumundadır.",
    variations: [
      {
        heading: "Rüyada Durgun Deniz Görmek",
        body: "Derinliğin gürültüsüz halidir. Durağanlık değil, kalbin genişleyebileceği bir sükûnet duruyor olabilir.",
      },
      {
        heading: "Rüyada Denizde Yüzmek",
        body: "Akışla aktif bağ kurulur. Ritmin uyumluysa sahne destekleyicidir; çırpınma varsa zorlanmış bir teslimiyet vardır.",
      },
      {
        heading: "Rüyada Fırtınalı Deniz",
        body: "Eşik ve yön değişimidir. Kaos gibi duran şey, eski kıyının yıkılıp yeni bir limanın görünmesi olabilir.",
      },
      {
        heading: "Rüyada Denizin Çekilmesi",
        body: "Gizlenen taban açılır. Uzun süre suyun altında tutulan bir mesele yüzeye çıkıyor olabilir.",
      },
      {
        heading: "Rüyada Kıyıdan Denize Bakmak",
        body: "Henüz suya bırakılmamış bir farkındalıktır. Derinlik çağırıyor olabilir; beden hâlâ karanın kesinliğini tutuyordur.",
      },
    ],
    emotionMeaning:
      "Huzur genişlikle uyumu, korku derinliğe direnci, öfke yön bulamayan taşmayı ayırır. Aynı fırtına birinde yıkım, diğerinde eski kıyının açılması gibi durabilir.",
    summary:
      "Deniz, kıyı ile derinlik arasındaki yerini gösterir. Suyun hâli ve senin konumun yorumu değiştirir. Mesaj suyu kontrol etmek değil, ritmini okumaktır.",
    relatedDreams: ["ruyada-yilan-gormek", "ruyada-aglamak", "ruyada-bebek-gormek"],
    faqs: [
      {
        question: "Rüyada deniz görmek iyiye mi işaret?",
        answer:
          "Tek başına iyi ya da kötü değildir. Durgunluk, fırtına, yüzmek veya kıyıdan bakmak mesajı değiştirir.",
      },
    ],
  }),
  guide({
    id: "ruyada-para-gormek",
    title: "Rüyada Para Görmek",
    slug: "ruyada-para-gormek",
    h1: "Rüyada Para Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Para Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada para görmek ne anlama gelir? Değer ve bolluk temasını rüyanın detayına göre oku.",
    searchAliases: ["para", "para görmek", "altın görmek", "para bulmak", "rüyada para"],
    intro:
      "Ana mesaj çoğu zaman cüzdan değil, değerin nasıl aktığıdır. Para emek, karşılık, onur ve yaşam kuvvetinin görünür yüzüdür. Gerçek bir kazancı kesin ilan etmez. Temiz, yırtık, bol, eksik, yerde veya kilitli oluşu akışın niteliğini değiştirir.\n\nEvde görünmesi özel alandaki kıymeti, iş yerinde emek karşılığını konuşturur. Parayı kimin verdiği veya aldığı, alışverişteki rolleri ayırır. His, rakamdan daha doğru konuşur.",
    spiritualMeaning:
      "Para, alışverişin simgesidir. Aldığın, verdiğin, sakladığın şeylerin görünür hali olabilir. Eksik para yoksunluk inancına, bol para açılan kanala, sahte para sahicilik temasına değinir. Yerdeyse kıymet henüz sahiplenilmemiştir. Cüzdandaysa korunan fakat dolaşmayan bir kuvvet duruyor olabilir. Kilitli kutu sıkışmış bolluğu, pazar görünür değiş tokuşu anlatır.\n\nHareket yönü söyler. Geliyorsa kanal açılır, gidiyorsa bir bağ çözülür, sayılıyorsa değer üzerinde gerilim uyanır. Kaybetmek kesin kayıp kehaneti değildir; savrulan kıymet veya dökülen eski bir ölçü olabilir. Vermek akışa izin, saklamak henüz güvende hissetmeyen bolluktur. Gönülsüz vermek çekilen değeri düşündürür.\n\nAltın kıymet, yetenek ve özün parıltısını; kâğıt günlük dolaşımı; bozuk para küçük fakat biriken kıpırtıları taşır. Gümüş sezgisel zekâyı, yırtık kâğıt yıpranmış bir ölçü inancını boyayabilir. Kirli olan madde değil, çarpıtılmış değerdir. Bolluk yalnızca rakam değildir. Saklanan ile dolaşan aynı simgeyi iki hayata böler.\n\nÖnce kıymeti taşıma biçimin değişir; rakam sonra gelir. Yoksunluk kimliğinden yeterlilik haline geçiş bu sahnede dökülen deri gibidir. Değerin kime göre ölçüldüğü, emeğin nasıl savunulduğu ve akışın nerede durduğu asıl sorulardır.",
    variations: [
      {
        heading: "Rüyada Para Bulmak",
        body: "Henüz fark edilmemiş bir değer görünür olur. Tesadüf gibi duran şey, hazır olduğun bir kanalın açılması olabilir.",
      },
      {
        heading: "Rüyada Altın Görmek",
        body: "Sıradan bolluktan çok kutsal kıymet konuşur. Fiyat değil, özün parıltısı öne çıkar.",
      },
      {
        heading: "Rüyada Para Kaybetmek",
        body: "Akış bir noktada sızıyor veya eski bir ölçü dökülüyordur. Dikkat çağrısıdır, felaket ilanı değildir.",
      },
      {
        heading: "Rüyada Yerde Para Görmek",
        body: "Sahiplenilmemiş potansiyel durur. Görmek yetmez; almak, o kıymeti hayata davet etmektir.",
      },
      {
        heading: "Rüyada Para Saymak",
        body: "Değer üzerinde netleşme veya gerilim vardır. Akış durmuş olabilir ya da görünür hale gelen kanal ölçülmek isteniyordur.",
      },
    ],
    emotionMeaning:
      "Sevinç açılan akışı, utanç çarpık değeri, korku yoksunluk inancını, huzur yeterliliği anlatır. Aynı bol sahne birinde ferahlık, diğerinde yük gibi durabilir. Rakamdan önce bedendeki titreşim okunur.",
    careerMoneyMeaning:
      "Emek, ücret ve yeteneğin karşılığı doğrudan bu sembole bağlıdır. Kazancı kesin ilan etmek dili bozar. Değer hareket ediyordur. Yeni bir sınır, yeni bir fiyat veya emeğini nasıl savunduğun bu kıpırtının gündüz yüzü olabilir.",
    summary:
      "Para, maddi kehanetten çok değer alışverişidir. Hali ve his yönü değiştirir. Sahiplenilmeyen kıymet yerde kalır. Dolaşmayan kıymet kilitte uykudadır.",
    relatedDreams: [
      "ruyada-yilan-gormek",
      "ruyada-eski-sevgiliyi-gormek",
      "ruyada-deniz-gormek",
    ],
    faqs: [
      {
        question: "Rüyada para görmek zenginlik getirir mi?",
        answer:
          "Kesin kazanç ilan etmez. Para, değerin ve akışın sembolüdür. Rüya bu alana dikkat çeker.",
      },
    ],
  }),
  guide({
    id: "ruyada-kopek-gormek",
    title: "Rüyada Köpek Görmek",
    slug: "ruyada-kopek-gormek",
    h1: "Rüyada Köpek Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Köpek Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada köpek görmek ne anlama gelir? Sadakat ve koruma temasını rüyanın detayına göre oku.",
    searchAliases: ["köpek", "kopek", "köpek görmek", "rüyada köpek", "köpek ısırmak"],
    intro:
      "Ana mesaj, sadakat ile kıstırılma arasındaki çizgidir. Köpek eşiğin bekçisidir: kimi rüyada yoldaş, kimi rüyada uyarı durur. Kör vefa övgüsü değildir. Koruma kutsal olabilir; kendini yok eden bağlılık ağırdır.\n\nIrkı ve büyüklüğü yorumu abartmaz; sesi ve mesafesi abartır. Beyaz bekçilik arınmış bağlılığı, kahverengi dünyevi yoldaşlığı taşıyabilir. Kime ait olduğu, vefanın kime aktığını gösterir.",
    spiritualMeaning:
      "Köpek kalbin bekçisi ve yolun yoldaşı olabilir. Yalnız yürümediğini hatırlatır. Aynı bedende kör bağlılık da durur. Koruyan hayvan alanın muhafaza edildiğini, saldıran ihlali veya çarpıtılmış vefayı, kaybolan çekilen bir yoldaşlığı işaret eder. Gece gelen bekçi, korunan bir geçidi anlatıyor olabilir. Yoldaşlık put değildir. Seçilmiş bir duruştur.\n\nSes ve mesafe ritmi söyler. Kuyruk alanın güvenli olduğunu, hırlama sınır uyarısını, ısırık temasın artık nazik olmadığını gösterir. Peşinden gelmek eşlik, önünü kesmek eşik, kapıda beklemek mahrem çemberin muhafızıdır. Beslemek bağlılığa yaşam kuvveti vermektir. Evde durması özel alanın bekçiliğini, sokakta sahipsiz kalması yönsüz vefayı açar.\n\nTasma gönüllü bağ ile fazla bağı ayırır. Serbest ve sakin duruş seçilmiş yakınlığı, sıkı tasma gönülsüz bağlılığı düşündürür. Sürü toplu bir bağlılık alanını taşır. Dönüşüm, kör bağlılıktan bilinçli yoldaşlığa geçmektir. Eski vefa dökülürken yalnızlık gibi durabilir. Eşik bekçisi değişiyordur.\n\nBağda bekçilik rolü, ekip sadakati veya “kimin yanında duruyorsun?” sorusu bu hayvanda yüz bulabilir. Yorum kişiyi suçlamak için değil; koruma ile kıstırılmadan hangisinin sende çalıştığını ayırmak içindir.",
    variations: [
      {
        heading: "Rüyada Köpek Isırması",
        body: "Bağlılıkta acı, ihlal veya fazla yakın bir enerjinin taşması durur. Isırılan yer, hangi alanın uyarıldığını söyler.",
      },
      {
        heading: "Rüyada Siyah Köpek",
        body: "Henüz adlandırılmamış bir koruma veya korkulan sadakat teması taşıyabilir. Gölge bekçiliktir, otomatik uğursuzluk değildir.",
      },
      {
        heading: "Rüyada Köpekle Oynamak",
        body: "Sadakat yük değil, canlı yoldaşlıktır. Bağın hafif yüzü açılır.",
      },
      {
        heading: "Rüyada Köpeğin Peşinden Gelmesi",
        body: "Bir bekçilik hattı açıktır. Yol yalnız değilse, eşlik eden bir kuvvet vardır.",
      },
      {
        heading: "Rüyada Sahipsiz Köpek",
        body: "Yönünü kaybetmiş bir bağlılık veya henüz evine gelmemiş bir sadakat duruyor olabilir.",
      },
    ],
    emotionMeaning:
      "Sevgi yoldaşlığı, korku bağlılığın karanlık yüzünü, huzur korunmayı ayırır. Aynı ısırık birinde sınır, diğerinde fazla yakınlığın taşmasıdır.",
    summary:
      "Köpek, vefa ile kıstırılmayı aynı hayvanda tutar. Hâli ve his hangisinin sende çalıştığını ayırır. Mesaj yoldaşlığı putlaştırmadan okumaktır.",
    relatedDreams: [
      "ruyada-kedi-gormek",
      "ruyada-yilan-gormek",
      "ruyada-eski-sevgiliyi-gormek",
    ],
    faqs: [
      {
        question: "Rüyada köpek ısırması kötü müdür?",
        answer:
          "Tek başına kötü kehanet değildir. Bağlılıkta bir sınırın aşıldığını veya temasın şiddetlendiğini işaret ediyor olabilir.",
      },
    ],
  }),
  guide({
    id: "ruyada-kedi-gormek",
    title: "Rüyada Kedi Görmek",
    slug: "ruyada-kedi-gormek",
    h1: "Rüyada Kedi Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Kedi Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada kedi görmek ne anlama gelir? Sezgi ve özerklik temasını rüyanın detayına göre oku.",
    searchAliases: ["kedi", "kedi görmek", "beyaz kedi", "siyah kedi", "rüyada kedi"],
    intro:
      "Ana mesaj, görünmeden gören sezginin ve seçilmiş yakınlığın uyanmasıdır. Kedi yoldaşlık ilan etmez; yaklaşır, çekilir. Özerklik, zarafet ve yumuşak fakat sınırlı kuvvet bu sahnede durur. Uğursuzluk veya şans falına indirgenmez.\n\nRenk bakışı boyar: beyaz netlik, siyah giz, turuncu canlı yaratım, gri ara eşik olabilir. Kime yaklaştığı, kimin sezgisel alanına izin verildiğini gösterir. Senden kaçıyorsa özerk yan henüz güvenle durmuyordur.",
    spiritualMeaning:
      "Kedi eşiklerde dolaşır. Görünmeyen ayrıntıyı okuma yeteneği kıpırdar. Boyun eğmeyen bilgelik, başkasının ritmine girmeden durmayı hatırlatır. Kaçması henüz evcilleştirilmemiş özü, kucağa gelmesi o özle barışmayı anlatır. Gece görüşüdür: adı konmamış bir hakikat bakışla teslim ediliyor olabilir.\n\nDokunuş sınırdır. Tırmalama ihlal edilen özerkliği, mırıldama uyumu taşır. Sabah “biliyorum ama adını koyamıyorum” hissi varsa işini yapmıştır. Pencere kenarı içerisi ile dışarısı arasındaki geçidi, yatak mahremiyeti, sokak kedisi sahipsiz fakat özgür özü anlatır. Zorlanan kedi, zorlanan sezgidir.\n\nYumuşak güç güçsüzlük değildir. Seçilmiş yakınlıktır. Evcil kedi seçilmiş teması, sokak kedisi özgür fakat sahipsiz özü taşır. Birden fazla kedi aynı anda kıpırdayan birkaç sezgi hattı olabilir. Hangisine önce kulak vereceğini seçmek pratik çağrıdır.\n\nDönüşüm, başkasının bekçiliğinden kendi yumuşak egemenliğine geçmektir. Bu duruş soğukluk değildir. Boğmayan bağ, kıskançlıktan çok özerklik ihtiyacı bu sahnede konuşabilir. Görünmeden gören yan, çoğu zaman en doğru zamanı seçer.",
    variations: [
      {
        heading: "Rüyada Beyaz Kedi Görmek",
        body: "Berrak iç ses ve arınmış sezgi öne çıkar. Yumuşak bir rehberlik gibi duruyor olabilir. Beyaz, kedinin mesafesini yok etmez; bakışı netleştirir.",
      },
      {
        heading: "Rüyada Siyah Kedi Görmek",
        body: "Giz ve korunmuş sezgi katmanıdır. Uğursuzluk kehaneti yoktur. Henüz söylenmemiş bir bilgi bakışla teslim ediliyor olabilir.",
      },
      {
        heading: "Rüyada Kedinin Tırmalaması",
        body: "Yumuşak kuvvet sınır koyar. İhlal edilen bir özerklik alanı uyanıyordur.",
      },
      {
        heading: "Rüyada Kedinin Kucağa Gelmesi",
        body: "Özerk yan güvenle temasa geçer. Sezgi artık yalnızca uzaktan bakmıyordur.",
      },
      {
        heading: "Rüyada Kedinin Kaçması",
        body: "Mesafe, sezginin kendini koruma biçimi olabilir. Henüz güvenle durmayan bir özerklik vardır.",
      },
    ],
    emotionMeaning:
      "Huzur sezgiyle uyumu, tedirginlik kontrol edilemeyen bilgeliği, öfke ihlal edilen özerkliği ayırır. His, kedinin mesafe mi temas mı istediğini söyler.",
    summary:
      "Kedi, sezgi ve seçilmiş yakınlıktır. Renk ve mesafe yönü değiştirir. Giz, korunmuş bilgeliğin kıyafetidir. Fal yoktur; bakış vardır.",
    relatedDreams: ["ruyada-kopek-gormek", "ruyada-yilan-gormek", "ruyada-bebek-gormek"],
    faqs: [
      {
        question: "Rüyada siyah kedi uğursuz mudur?",
        answer:
          "Uğursuzluk kehaneti yoktur. Siyah kedi giz, koruma ve henüz adlandırılmamış sezgiyi işaret ediyor olabilir.",
      },
    ],
  }),
  guide({
    id: "ruyada-dis-dokulmesi",
    title: "Rüyada Diş Dökülmesi",
    slug: "ruyada-dis-dokulmesi",
    h1: "Rüyada Diş Dökülmesi Ne Anlama Gelir?",
    seoTitle: "Rüyada Diş Dökülmesi Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada diş dökülmesi ne anlama gelir? Söz ve yenilenme temasını rüyanın detayına göre oku.",
    searchAliases: ["diş", "dis", "dişim döküldü", "diş dökülmesi", "dişimin düştüğünü görmek"],
    intro:
      "Ana mesaj, eski bir tutunma biçiminin ağızdan düşmesidir. Diş sözü, sınırı ve dünyayla teması taşır. Dökülme kayıp gibi durur; çoğu zaman yeni bir ifade için yer açılır. Hastalık veya ölüm kehaneti yoktur.\n\nHangi dişin düştüğü, kan olup olmadığı ve sahnede ayna bulunup bulunmadığı yorumu inceler. Biri senin dişine bakıyorsa sözün tartılıyordur. Biri çekiyorsa o bağ ifaden üzerinde etki bırakıyordur.",
    spiritualMeaning:
      "Diş, hakikati tutan ve hayatı ısırarak alan kuvvettir. Artık o şekilde tutunulamıyordur. Eski savunma, gurur veya rol düşüyor olabilir. Kan varsa geçiş canlıdır. Acısız dökülme zamanı gelmiş bırakıştır. Dilin yanındaki boşluk yeni cümle için yuvadır.\n\nÖn diş görünür kimliği, azı içsel dayancı işaret eder. Ayna karşısında düşmek kendini görmeyle, kalabalıkta düşmek görünürlük eşiğiyle, yalnızken düşmek içsel yenilenmeyle ilgilidir. Elin dişe gitmesi bırakışı senin seçtiğini gösterir. Sabah çene sıkılığı sahnenin gündüzdeki izidir.\n\nBoşluk yokluk değildir. Dar gelen maskenin parçası düşer. Yılanda deri nasıl değişirse, ağızda bu işi diş görür. Yeni ifade, boşluğun korkusundan değil davetinden doğar. Söz artık eski haliyle taşınamıyordur.\n\nBağda konuşma biçimi, suskunluğun sonu veya eski gururun inmesi bu sahnede yüz bulabilir. Emek kimliğinde unvan ve temsil de dökülebilir. Yorum hastalık ilanı değildir. Tutunma biçiminin yenilenmesine bakar.",
    variations: [
      {
        heading: "Rüyada Ön Dişin Dökülmesi",
        body: "Dışarıya gösterilen yüz yenilenmek üzeredir. Görünür kimlik ve ifade sarsılıyor olabilir.",
      },
      {
        heading: "Rüyada Azı Dişinin Dökülmesi",
        body: "İçeride taşınan güç yenilenmek ister. Görünür yüzden çok dayanç konuşur.",
      },
      {
        heading: "Rüyada Dişlerin Kanaması",
        body: "Bırakış fikir düzeyinde değildir. Yaşamın içinde işleyen canlı bir geçiş vardır.",
      },
      {
        heading: "Rüyada Dişlerini Kendin Çekmek",
        body: "Bırakışı sen seçersin. Eski bir ifade biçimini bilinçli olarak alandan çıkarıyor olabilirsin.",
      },
      {
        heading: "Rüyada Dişlerin Ayna Karşısında Dökülmesi",
        body: "Başkasının bakışından önce kendi yüzüne dair bir bırakış durur.",
      },
    ],
    emotionMeaning:
      "Utanç görünür kimliğin sarsılmasını, korku güç kaybı inancını, rahatlama dar gelen sözün nihayet düşmesini ayırır. His, kaybın mı yoksa yer açılmanın mı önde olduğunu söyler.",
    summary:
      "Diş dökülmesi, söz ve kimlikte bir bırakıştır. Kayıp gibi duran sahne yeni ifadeye yer açıyor olabilir. Hangi dişin düştüğü ve his yönü belirler.",
    relatedDreams: ["ruyada-aglamak", "ruyada-yilan-gormek", "ruyada-eski-sevgiliyi-gormek"],
    faqs: [
      {
        question: "Rüyada diş dökülmesi ölüm veya hastalık mı demektir?",
        answer:
          "Bu kesin yargılar GoldKozmos yorumunun parçası değildir. Diş, söz ve tutunma sembolüdür.",
      },
    ],
  }),
  guide({
    id: "ruyada-aglamak",
    title: "Rüyada Ağlamak",
    slug: "ruyada-aglamak",
    h1: "Rüyada Ağlamak Ne Anlama Gelir?",
    seoTitle: "Rüyada Ağlamak Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada ağlamak ne anlama gelir? Arınma ve bırakış temasını rüyanın detayına göre oku.",
    searchAliases: ["ağlamak", "aglamak", "rüyada ağlamak", "ağladım"],
    intro:
      "Ana mesaj, tutulmuş bir suyun gece yolunu bulmasıdır. Ağlamak zayıflık değil, kalbin hareketidir. Kimin için, nasıl ve ağladıktan sonraki ferahlık yorumu değiştirir. Sevinç yaşı ile veda yaşı aynı tuzda, ayrı kapılardadır.\n\nKalabalıkta ağlamak görünür kılınan kalbi, yalnız odada mahrem arınmayı, deniz kenarında kişisel suyun büyük suya katılmasını anlatabilir. Kimin omzunda ağladığın şefkat kanalını gösterir.",
    spiritualMeaning:
      "Gözyaşı kalbin tuzlu duasıdır. Bir bağ, dönem veya yük çözülmek ister. Sevinçten ağlamak genişlemedir. Veda ağlatırsa uğurlamanın beden dilidir. Tutulmuş yaş, tutulmuş yaşam kuvvetidir. Rüya o kuvveti geri vermeye çalışır.\n\nHıçkırık uzun süre kapalı bir kapının ani açılışıdır. Sessiz yaş henüz boğazdan geçemeyen bırakıştır. Sabah göz yaşlıysa arınma gündüze sarkmıştır. Ferahlık varsa su işini görmüştür. Düğüm duruyorsa bırakış tamamlanmamıştır. Yağmurla birleşen ağlayış, kişisel suyun daha büyük bir ritme katılmasını taşıyabilir.\n\nSert kabuk yaşla çatlar. Yaş kuruduktan sonra kalan boşluk yeni nefes içindir. Gözyaşı utanç nesnesi değildir. Akışın kendisi mesajdır. Mendil tutulan suyu, omuz şefkat kanalını anlatır. Kimse yoksa sahne seninle kalbin arasındadır.\n\nBağın yumuşaması, uzun tutulmuş şefkat veya emek kimliğinin çatlaması bu suda yüz bulabilir. Rüya başarısızlık ilanı değildir. Kalbin duruşudur; düşüşü değil.",
    variations: [
      {
        heading: "Rüyada Sevinçten Ağlamak",
        body: "Kalp genişler. Şükran, kavuşma veya içsel onay gözyaşı biçimini almıştır.",
      },
      {
        heading: "Rüyada Sessiz Ağlamak",
        body: "Gösterilemeyen bir bırakış vardır. Boğaz hattı henüz tam açılmamış olabilir.",
      },
      {
        heading: "Rüyada Hıçkırarak Ağlamak",
        body: "Kapalı duran su nazik sızmaz, kapıdan birden geçer. Uzun tutulmuş bir bırakış ani açılır.",
      },
      {
        heading: "Rüyada Ağladıktan Sonra Ferahlamak",
        body: "Su işini görmüştür. Tutulmuş olan akmış, alan yumuşamıştır.",
      },
      {
        heading: "Rüyada Yağmur Altında Ağlamak",
        body: "Kişisel su daha büyük bir ritme katılır. Arınma yalnızca kalbe değil, bütün alana yayılır.",
      },
      {
        heading: "Rüyada Birinin Ağladığını Görmek",
        body: "O kişi gerçek bir bağ olabileceği gibi, senin ağlayan yanının yüzü de olabilir. Şefkat çağrısıdır.",
      },
    ],
    emotionMeaning:
      "Rahatlama arınmanın tamamlandığını, utanç kalbi gizleme alışkanlığını, özlem kapanmamış bağı ayırır. Aynı yaş birinde veda, diğerinde açılıştır. Ağlamanın kendisi zaten mesajdır; asıl ayrım, sahnedeki tondadır.",
    summary:
      "Ağlamak kalbin arınma hareketidir. Kimin için ve nasıl aktığı yönü değiştirir. Ferahlık varsa su tamamlanmıştır. Düğüm duruyorsa bırakış henüz bitmemiştir.",
    relatedDreams: [
      "ruyada-deniz-gormek",
      "ruyada-eski-sevgiliyi-gormek",
      "ruyada-olmus-birini-gormek",
    ],
    faqs: [
      {
        question: "Rüyada ağlamak kötüye mi işaret eder?",
        answer:
          "Hayır. Çoğu zaman arınma, bırakış ve kalp açılımını işaret eder.",
      },
    ],
  }),
  guide({
    id: "ruyada-olmus-birini-gormek",
    title: "Rüyada Ölmüş Birini Görmek",
    slug: "ruyada-olmus-birini-gormek",
    h1: "Rüyada Ölmüş Birini Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Ölmüş Birini Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada ölmüş birini görmek ne anlama gelir? Uğurlama ve eşik temasını rüyanın detayına göre oku.",
    searchAliases: [
      "ölen birini görmek",
      "ölmüş birini görmek",
      "olmus birini gormek",
      "vefat eden",
      "rüyada ölü",
    ],
    intro:
      "Ana mesaj ölüm haberi değildir. Gelen yüz, tamamlanmış bir döngünün elçisi, soy hattının sesi, uğurlanmamış bir bağ veya senin içindeki bitmiş bir hal olabilir. Yaşam ile uğurlama arasındaki eşik görünür olur. Huzur, söz ve sende kalan his niteliği ayırır.\n\nBeyaz ışık arınma, loşluk henüz konuşulmamış veda, eski ev kök hattını açabilir. Yanındaki yaşayan kişiler, bu uğurlamanın hangi bağlar içinde yapıldığını anlatır. Yalnızsan sahne seninle o ruh hali arasındadır.",
    spiritualMeaning:
      "Perde incelir. Gelen bazen o bağın enerjisidir, bazen o kişiyle özdeşleştirdiğin bir niteliktir. Huzurlu ziyaret uğurlanmış barışı, telaşlı sahne tamamlanmamış sözü taşır. Soydan biri aile hattındaki bir temayı, sevgili veya arkadaş o bağın ruhsal devamını açabilir. Her gece “öte taraftan haber” diye bağırmaz. Daha sık, kapanış ihtiyacı bir yüz bulur.\n\nSabah huzur varsa ziyaret şifalıdır. Ağırlık varsa henüz uğurlanmamış yük duruyordur. Net koku, ses, bakış temasın güçlü olduğunu; silik gölge bağın çözülmekte olduğunu düşündürür. Gülümseyen yüz bağın düşman olmadığını, uzak duran yüz henüz yaklaşılmayan vedayı anlatır.\n\nÖlüm yok oluş değil, form değiştirmektir. Rüya bu değişimin hayattaki yankısını taşır. Eski ev kökü, yol yürüyüşü, mezarlık eşik ritüelini açabilir. Uğurlama sevgiyi silmez. Yön belirleme hakkını bugüne bırakır.\n\nGelen yüz bazen kişi, bazen senin bitmiş bir dönemindir. Hangisi olduğunu his söyler. Yaşayanla yaşayanın, bitmişle bitmişin yerini ayırmak dönüşümdür. Ayırmak sevgiyi azaltmaz; yönü netleştirir.",
    variations: [
      {
        heading: "Rüyada Ölmüş Birinin Gülmesi",
        body: "Barış ve uğurlanmış şefkat durur. Kalp, o bağın artık düşman olmadığını hatırlar.",
      },
      {
        heading: "Rüyada Ölmüş Birinin Konuşması",
        body: "Sözler kehanet gibi ezberlenmek zorunda değildir. İhtiyacın olan içsel cümle gece duyulur.",
      },
      {
        heading: "Rüyada Ölmüş Birini Hayatta Görmek",
        body: "Bağ senin içinde hâlâ canlıdır. Uğurlama tamamlanmamış veya o niteliğin sende yaşamaya devam ediyor olabilir.",
      },
      {
        heading: "Rüyada Ölmüş Birinin Yol Göstermesi",
        body: "O bağın niteliği yürüyüşünde rehberlik edebilir. Kehanet değil, içsel pusuladır.",
      },
      {
        heading: "Rüyada Ölmüş Birine Sarılmak",
        body: "Bağ şefkatle kapanmak ister. Uğurlama soğuk kopuş değil, sıcak bırakış olabilir.",
      },
    ],
    emotionMeaning:
      "Huzur tamamlanmış temayı, özlem kapanmamış kalp hattını, korku eşiğe dair tedirginliği ayırır. Aynı yüz birinde teselli, diğerinde yüktür. Kapıyı açan anahtar sahnedeki histir.",
    summary:
      "Ölmüş birini görmek ölüm kehaneti değil, eşik ve uğurlamadır. Huzur ve söz niteliği belirler. Ayırmak sevgiyi azaltmaz; yönü netleştirir.",
    relatedDreams: ["ruyada-aglamak", "ruyada-eski-sevgiliyi-gormek", "ruyada-bebek-gormek"],
    faqs: [
      {
        question: "Rüyada ölmüş birini görmek ölüm haberi midir?",
        answer:
          "Hayır. Daha sık uğurlama, soy hattı ve kapanmamış bağ temalarını taşır.",
      },
    ],
  }),
];

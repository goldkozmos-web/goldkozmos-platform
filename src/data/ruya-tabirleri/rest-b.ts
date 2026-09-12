import type { DreamGuide } from "./types";

function guide(
  partial: Omit<DreamGuide, "published" | "updatedAt">,
): DreamGuide {
  return { ...partial, published: true, updatedAt: "2026-09-12" };
}

export const restGuidesB: DreamGuide[] = [
  guide({
    id: "ruyada-deniz-gormek",
    title: "Rüyada Deniz Görmek",
    slug: "ruyada-deniz-gormek",
    h1: "Rüyada Deniz Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Deniz Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada deniz görmek ne anlama gelir? Durgun veya fırtınalı denizin spiritüel ve enerjisel anlamını rüyanın detayına göre keşfet.",
    searchAliases: ["deniz", "deniz görmek", "denizde yüzmek", "okyanus", "dalga"],
    intro:
      "Rüyada deniz görmek, içsel genişlikle karşılaşmaktır. Deniz sınır tanımayan, derin, bazen kucaklayan bazen yutan bir alandır. GoldKozmos yorumunda deniz, duygusal ve ruhsal sahanın kendisidir. Durgunluğu sükûnet, dalgalılığı hareket, fırtınası eşik, berraklığı netlik, bulanıklığı ise henüz çözülmemiş bir enerjiyi işaret ediyor olabilir. Denizde olmak ile kıyıdan bakmak ayrı rüyalardır. Biri temasa, diğeri mesafeye aittir.",
    spiritualMeaning:
      "Spiritüel olarak deniz, bireysel iradenin ötesindeki akıştır. Rüyada deniz görmek, kendini daha büyük bir ritme bırakmaya çağrı olabilir. Bu teslimiyet yok olmak değil, kendi kıyını hatırlayarak derinle buluşmaktır. Deniz, yaşamın gelgitini taşır. Gelen dalga bir fırsat, çekilen dalga bir bırakış olabilir. Spiritüel bakışta deniz aynı zamanda kadim hafızadır. Kişisel hikâyenin altında kollektif bir su vardır. Rüya, o suya kulak vermeni isteyebilir. Korkuyla bakılan deniz, derinliğe henüz hazır olmadığını; huzurla bakılan deniz, ruhun o genişlikte yer tutabildiğini gösterir.",
    energyMessage:
      "Enerji mesajı suyun hâlinde gizlidir. Durgun deniz kalp ve boğaz hattında açılma; kabaran deniz yaşam kuvvetinin taşması; çekilen deniz ise bir enerjinin alandan geri çekilmesi olabilir. Denizde yüzmek, akışla ilişki kurduğunu; boğulmak üzere olmak, kapasitenin aşıldığını; kıyıya vurmak, bir döngünün karaya çıktığını işaret ediyor olabilir. Sabah bedende dalgalı bir his varsa, rüya henüz kapanmamıştır.",
    symbolism:
      "Deniz sembolü; sonsuzluk, ana kucak, bilinmeyen derinlik ve arınmadır. Tuz hem yakar hem temizler. Dalga hem getirir hem götürür. Spiritüel temsilde deniz, kontrol edemediğin fakat içinde yol alabildiğin alandır.",
    variations: [
      { heading: "Rüyada Denizde Yüzmek", body: "Yüzmek, akışla aktif bir bağ kurduğunu gösterir. Ritmin uyumluysa rüya destekleyicidir; çırpınma varsa zorlanmış bir teslimiyet teması belirebilir." },
      { heading: "Rüyada Fırtınalı Deniz", body: "Fırtına, eşik ve yön değişimidir. Kaos gibi duran şey, eski kıyının yıkılıp yeni bir limanın görünmesi olabilir." },
      { heading: "Rüyada Denizin Çekilmesi", body: "Çekilen deniz, gizlenen bir tabanı açar. Görünmeyen gerçekler, saklı duygular veya uzun süredir suyun altında tutulan bir mesele yüzeye çıkıyor olabilir." },
    ],
    colorMeaning:
      "Mavi sükûnet ve hakikat; yeşil-mavi şifa; siyah deniz giz ve korkulan derinlik; altın yansımalar değer ve kutsal netlik işaret ediyor olabilir. Su nasıl görünüyorsa, ruh hali o renge bürünmüştür.",
    placeMeaning:
      "Açık deniz bilinmeyeni, liman sığınmayı, kayalık kıyı sınırları, evin yanındaki deniz ise özel hayatın duygusal iklimini gösterir. Mekan, denizin hangi yaşam sahasına değdiğini söyler.",
    peopleMeaning:
      "Denizde yanındaki kişiler, o derinlikte kiminle yol aldığını gösterir. Yalnızsan rüya daha içseldir. Birinin elini tutmak, bağın suyun içinde de sürdüğünü işaret edebilir.",
    emotionMeaning:
      "Huzur, genişlikle uyumu; korku, derinliğe direnci; özlem, kayıp bir akışı; mutluluk, ruhun nefes almasını anlatır. His, denizin sana dost mu eşik mi olduğunu ayırır.",
    relationshipMeaning:
      "Aşkta deniz, bağın derinliğini, gelgitini ve taşıyamadığın yükleri gösterebilir. Sakin deniz uyumlu bir yakınlığı; fırtına konuşulmayan gerilimi işaret ediyor olabilir. İlişki bazen kıyıdır, bazen birlikte yüzülen sudur.",
    careerMoneyMeaning:
      "İş ve yaşam yolunda deniz, büyük bir alan, belirsiz ama verimli bir hareket veya mesleki akışın durgunlaşıp dalgalanması olabilir. Para temasında gelgit, gelirin ritmini; açık deniz ise henüz keşfedilmemiş bir potansiyeli anlatabilir.",
    transformationMeaning:
      "Dönüşüm, karanın kesinliğinden suyun esnekliğine geçmektir. Eski form ıslanır, yumuşar, bazen dağılır. Deniz rüyası, sert kimliğin çözülüp daha canlı bir hâle evrilmesini taşıyor olabilir.",
    reflection:
      "Bu rüya, hayatının hangi kıyısında durduğunu ve hangi derinliğe çağrıldığını soruyor olabilir. Deniz düşman değil, ayna gibi duran geniş bir alandır.",
    questions: [
      "Şu an kıyıda mısın, yoksa suyun içinde misin?",
      "Hangi duygu dalgası uzun süredir geri gelip duruyor?",
      "Kontrol etmeye çalıştığın akış hangisi?",
      "Bu deniz seni yutuyor mu, yoksa taşıyor mu?",
    ],
    summary:
      "Rüyada deniz görmek, ruhsal ve duygusal genişlikle teması anlatır. Suyun hâli, rengin ve senin konumun yorumu değiştirir. Bu rüya kehanet değil; akış, derinlik ve kıyı arasındaki yerini görmektir.",
    relatedDreams: ["ruyada-yilan-gormek", "ruyada-aglamak", "ruyada-bebek-gormek"],
    faqs: [{ question: "Rüyada deniz görmek iyiye mi işaret?", answer: "Tek başına iyi ya da kötü değildir. Durgunluk, fırtına, yüzmek veya kıyıdan bakmak spiritüel mesajı değiştirir." }],
  }),
  guide({
    id: "ruyada-para-gormek",
    title: "Rüyada Para Görmek",
    slug: "ruyada-para-gormek",
    h1: "Rüyada Para Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Para Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada para görmek ne anlama gelir? Değer, bolluk ve yaşam kuvvetinin spiritüel anlamını rüyanın detayına göre oku.",
    searchAliases: ["para", "para görmek", "altın görmek", "para bulmak", "rüyada para"],
    intro:
      "Rüyada para görmek, birçok kişide hemen maddi bir müjde arayışı uyandırır. GoldKozmos yorumu bu arayışı küçümsemez fakat orada durmaz. Para, spiritüel dilde değer, enerji değişimi, emek, karşılık ve yaşam kuvvetinin somut yüzüdür. Rüyada para görmek, gerçek bir kazancı “kesin” ilan etmez. Daha çok, değerin senin hayatında nasıl aktığını, nerede tıkandığını veya nerede görünür olmak istediğini gösterir.",
    spiritualMeaning:
      "Spiritüel olarak para, enerji alışverişinin simgesidir. Aldığın, verdiğin, sakladığın ve kıskandığın şeylerin görünür hali olabilir. Rüyada para görmek, kendi değerini hatırlama çağrısı taşıyabilir. Eksik para, içsel yoksunluk inancına; bol para, açılan bir kanala; sahte para, sahicilik temasina değiyor olabilir. Para yerdeyse, değerin henüz sahiplenilmediğini; cüzdandaysa, korunan fakat dolaşmayan bir enerjiyi işaret edebilir. Spiritüel bakışta bolluk yalnızca rakam değil, akışın kendisidir.",
    energyMessage:
      "Enerji mesajı paranın hareketindedir. Geliyorsa bir kanal açılıyor, gidiyorsa bir bağ çözülüyor, sayılıyorsa zihin değer üzerinde geriliyor olabilir. Altın para kutsal değer ve yetenek; kâğıt para günlük akış; bozuk para küçük fakat biriken kıpırtılar olabilir. Para kaybetmek, gerçek bir kayıp kehaneti değil; değerini savurduğuna dair bir uyarı veya eski bir değer sisteminin dökülmesi olabilir.",
    symbolism:
      "Para sembolü; karşılık, onur, değiş tokuş ve dünyada yer tutma hakkıdır. Spiritüel temsilde para kirli değildir. Kirli olan, değerin çarpıtılmasıdır. Rüya, senin bu çarpıtmayla yüzleşmeni isteyebilir.",
    variations: [
      { heading: "Rüyada Para Bulmak", body: "Bulmak, henüz fark edilmemiş bir değeri görünür kılar. Tesadüf gibi duran şey, aslında hazır olduğun bir kanalın açılması olabilir." },
      { heading: "Rüyada Altın Görmek", body: "Altın, sıradan bolluktan çok kutsal değer, yetenek ve özün parıltısını taşır. Rüya, fiyatı değil kıymeti konuşuyor olabilir." },
      { heading: "Rüyada Para Kaybetmek", body: "Kaybetmek, akışın bir noktada sızdığını veya eski bir değer ölçüsünün döküldüğünü gösterebilir. Kehanet değil, dikkat çağrısıdır." },
    ],
    colorMeaning:
      "Altın kutsal değer; gümüş sezgisel zekâ; yeşil kâğıt dünyevi akış; kirli veya yırtık para ise yıpranmış bir değer inancını işaret ediyor olabilir.",
    placeMeaning:
      "Evde para, özel alandaki değeri; iş yerinde emek karşılığını; yerde sahipsiz potansiyeli; kilitli bir kutuda ise sıkışmış bolluğu gösterebilir.",
    peopleMeaning:
      "Parayı kimin verdiği veya aldığı, değer alışverişindeki rolleri anlatır. Tanıdık biri, o bağdaki dengeyi; yabancı, henüz tanımadığın bir kanalı işaret edebilir.",
    emotionMeaning:
      "Sevinç, açılan akışı; utanç, değerle kurulan çarpık bağı; korku, yoksunluk inancını; huzur ise yeterli hissetmeyi anlatır. His, rakamdan daha doğru konuşur.",
    relationshipMeaning:
      "Aşkta para, emeğin, karşılığın ve değer görmenin diline dönüşebilir. Birinin rüyanda sana para vermesi, bağda destek; senden para istemesi, dengesiz bir akış teması taşıyabilir. İlişki burada muhasebe değil, değer aynasıdır.",
    careerMoneyMeaning:
      "İş ve yaşam yolunda bu rüya doğrudan emek, ücret, görünürlük ve yeteneğin karşılığıyla konuşur. Yine de “kesin para gelecek” demek rüyanın dilini bozar. Daha dürüst okuma şudur: değerin hareket ediyor. O hareketi pratikte nasıl karşılayacağın sana kalır.",
    transformationMeaning:
      "Dönüşüm, yoksunluk kimliğinden yeterlilik haline geçiş olabilir. Para rüyası, kendini küçük gören bir derinin dökülmesini işaret ediyor olabilir.",
    reflection:
      "Bu rüya, hayatında değerin nerede aktığını ve nerede durduğunu göstermeye gelmiş olabilir. Bolluk bazen rakam, çoğu zaman ise akış cesaretidir.",
    questions: [
      "Kendi emeğine nasıl bir değer biçiyorsun?",
      "Hayatında akış nerede duruyor?",
      "Bu rüyadaki para senin mi, yoksa başkasının bakışı mı?",
      "Hangi yeteneğin henüz sahiplenilmedi?",
    ],
    summary:
      "Rüyada para görmek, maddi bir kehanetten çok değer ve enerji alışverişine işaret eder. Paranın hali, rengi ve sende uyandırdığı his yorumu belirler. Rüya, bolluğu rakama indirgemeden akışa bakmanı ister.",
    relatedDreams: ["ruyada-yilan-gormek", "ruyada-eski-sevgiliyi-gormek", "ruyada-deniz-gormek"],
    faqs: [{ question: "Rüyada para görmek zenginlik getirir mi?", answer: "Spiritüel yorum kesin kazanç ilan etmez. Para, değerin ve akışın sembolüdür. Rüya bu alana dikkat çeker." }],
  }),
  guide({
    id: "ruyada-kopek-gormek",
    title: "Rüyada Köpek Görmek",
    slug: "ruyada-kopek-gormek",
    h1: "Rüyada Köpek Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Köpek Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada köpek görmek ne anlama gelir? Sadakat, koruma ve içgüdüsel bağın spiritüel anlamını rüyanın detayına göre keşfet.",
    searchAliases: ["köpek", "kopek", "köpek görmek", "rüyada köpek", "köpek ısırmak"],
    intro:
      "Rüyada köpek görmek, bağ, sadakat, koruma ve içgüdü temalarını bir arada taşır. Köpek, eşiğin bekçisidir. Kimi rüyada dost, kimi rüyada tehdit gibi durur. GoldKozmos yorumunda köpek, senin sadık yanını, korunma ihtiyacını veya bir bağdaki bağlılık kıpırtısını gösterebilir. Irkı, rengi, saldırganlığı ve seninle mesafesi yorumu değiştirir.",
    spiritualMeaning:
      "Spiritüel olarak köpek, kalbin bekçisi ve yolun yoldaşılığıdır. Rüyada köpek görmek, yalnız yürümediğini hatırlatıyor olabilir. Aynı zamanda körü körüne bağlılığın da sembolü olabilir. Sadakat kutsal, fakat kendini yok eden bağlılık ağırdır. Köpek rüyası bu iki ucu ayırmanı isteyebilir. Koruyan köpek, alanının muhafaza edildiğini; saldıran köpek, ihlal edilen bir sınırı veya çarpıtılmış bir bağlılığı işaret ediyor olabilir.",
    energyMessage:
      "Enerji mesajı köpeğin sesinde ve bedenindedir. Kuyruk sallaş, alan güvenlidir. Hırlama, sınır uyarısıdır. Isırık, temasın artık nazik olmadığını gösterir. Sadık bir hayvanın rüyada kaybolması, bir yoldaşlık enerjisinin çekildiğini düşündürebilir.",
    symbolism:
      "Köpek sembolü; eşik, yoldaş, içgüdü ve bağlılıktır. Spiritüel temsilde köpek, görünmeyen alemin bekçisi gibi de durur. Gece gelen köpek, korunan bir geçidi anlatıyor olabilir.",
    variations: [
      { heading: "Rüyada Köpek Isırması", body: "Isırık, bağlılıkta acı, ihlal veya fazla yakın bir enerjinin taşmasını gösterebilir. Nereden ısırıldığı, hangi yaşam alanının uyarıldığını söyler." },
      { heading: "Rüyada Siyah Köpek", body: "Siyah köpek, gölge bekçilik ve henüz adlandırılmamış bir koruma ya da korku temasını taşıyabilir." },
      { heading: "Rüyada Köpekle Oynamak", body: "Oyun, bağın hafif ve canlı yüzüdür. Sadakat burada yük değil, neşeli bir yoldaşlık olabilir." },
    ],
    colorMeaning:
      "Beyaz köpek arınmış bağlılık; siyah gizli koruma veya korkulan sadakat; kahverengi dünyevi yoldaşlık; altın tonları ise değerli ve rehber nitelikli bir bağı işaret ediyor olabilir.",
    placeMeaning:
      "Evde köpek, özel alanın bekçisidir. Sokakta sahipsiz köpek, yönsüz bir bağlılığı; kapıda bekleyen köpek, eşiğe gelen bir mesajı anlatabilir.",
    peopleMeaning:
      "Köpeğin kime ait olduğu, sadakatin kime aktığını gösterir. Senin köpeğin, kendi bağlılığın; başkasının köpeği, o bağdaki dinamik olabilir.",
    emotionMeaning:
      "Sevgi, yoldaşlığı; korku, bağlılığın karanlık yüzünü; huzur, korunmayı; öfke ise ihlal edilen sadakati işaret eder.",
    relationshipMeaning:
      "Aşkta köpek, vefa, kıskanç koruma, fazla bağlanma veya güvenli yoldaşlığı gösterebilir. Partner köpekle özdeşleşiyorsa, bağdaki bekçilik rolü konuşuyor olabilir.",
    careerMoneyMeaning:
      "İş hayatında köpek, ekip sadakati, koruyucu bir figür veya körü körüne bağlı kalınan bir düzeni anlatabilir. Yaşam yolunda “kimin yanında duruyorsun?” sorusunu açar.",
    transformationMeaning:
      "Dönüşüm, kör bağlılıktan bilinçli yoldaşlığa geçmektir. Köpek rüyası, kimi beklediğini ve kime bekçilik ettiğini yenilemeni isteyebilir.",
    reflection:
      "Bu rüya, sadakatin hangi yönde aktığını göstermeye gelmiş olabilir. Koruma ile kıstırılma aynı hayvanda durabilir.",
    questions: [
      "Hayatında körü körüne bağlandığın bir yer var mı?",
      "Seni kim bekliyor, sen kimi bekliyorsun?",
      "Bu köpek dost mu, bekçi mi, yoksa uyarı mı?",
      "Güven alanın nerede ihlal ediliyor?",
    ],
    summary:
      "Rüyada köpek görmek, sadakat, koruma ve içgüdüsel bağ temalarını taşır. Köpeğin hâli ve senin hissen yorumu belirler. Rüya, bağlılığın kutsal mı yoksa ağır mı olduğunu ayırmanı ister.",
    relatedDreams: ["ruyada-kedi-gormek", "ruyada-yilan-gormek", "ruyada-eski-sevgiliyi-gormek"],
    faqs: [{ question: "Rüyada köpek ısırması kötü müdür?", answer: "Tek başına kötü kehanet değildir. Isırık, bağlılıkta bir sınırın aşıldığını veya temasın şiddetlendiğini işaret ediyor olabilir." }],
  }),
  guide({
    id: "ruyada-kedi-gormek",
    title: "Rüyada Kedi Görmek",
    slug: "ruyada-kedi-gormek",
    h1: "Rüyada Kedi Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Kedi Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada kedi görmek ne anlama gelir? Bağımsızlık, sezgi ve dişil enerjinin spiritüel anlamını rüyanın detayına göre oku.",
    searchAliases: ["kedi", "kedi görmek", "beyaz kedi", "siyah kedi", "rüyada kedi"],
    intro:
      "Rüyada kedi görmek, sezgi, bağımsızlık ve görünmeden görme temalarını açar. Kedi, köpek gibi yoldaşlık ilan etmez; seçer, yaklaşır, çekilir. GoldKozmos yorumunda kedi, senin özerk yanını, gece görüşünü ve yumuşak fakat sınırlı gücünü temsil ediyor olabilir. Rengi, bakışı ve evde olup olmadığı yorumu değiştirir.",
    spiritualMeaning:
      "Spiritüel olarak kedi, eşiklerde dolaşan sezgisel bir varlıktır. Rüyada kedi görmek, görünmeyen ayrıntıları okuma yeteneğinin uyandığını işaret ediyor olabilir. Kedi, boyun eğmeyen bilgeliği taşır. Bu rüya, başkasının ritmine girmeden kendi yumuşak kuvvetini hatırlatıyor olabilir. Siyah kedi giz ve korunmuş sezgi; beyaz kedi arınmış dişil netlik teması taşıyabilir. Kedinin kaçması, henüz evcilleştirilmemiş bir özü; kucağa gelmesi, o özle barışmayı anlatır.",
    energyMessage:
      "Enerji mesajı dokunuştadır. Tırmalama, sınır; mırıldama, uyum; bakış, sezgisel okuma olabilir. Kedi rüyaları boğaz ve üçüncü göz hattında iz bırakabilir. Sabah “bir şey biliyorum ama adını koyamıyorum” hissi varsa, kedi işini yapmıştır.",
    symbolism:
      "Kedi sembolü; bağımsızlık, gece, zarafet, dişil kuvvet ve seçici yakınlıktır. Spiritüel temsilde kedi, görünmeden korunan bilgidir.",
    variations: [
      { heading: "Rüyada Beyaz Kedi Görmek", body: "Beyaz kedi, arınmış sezgi ve daha berrak bir iç ses temasını taşıyabilir. Yumuşak bir rehberlik gibi duruyor olabilir." },
      { heading: "Rüyada Siyah Kedi Görmek", body: "Siyah kedi, gizli koruma ve henüz söylenmemiş sezgiyi işaret eder. Uğursuzluk kehaneti değildir; giz katmanıdır." },
      { heading: "Rüyada Kedinin Tırmalaması", body: "Tırmalama, yumuşak gücün sınır koyduğunu gösterir. İhlal edilen bir özerklik alanı uyanıyor olabilir." },
    ],
    colorMeaning:
      "Beyaz netlik; siyah giz; turuncu yaratım ve canlılık; gri ara eşik ve belirsiz sezgi işaret ediyor olabilir.",
    placeMeaning:
      "Pencere kenarındaki kedi, içerisi ile dışarısı arasındaki sezgiyi; yataktaki kedi mahremiyeti; sokak kedisi sahipsiz fakat özgür bir özü anlatabilir.",
    peopleMeaning:
      "Kedinin kime yaklaştığı, kimin sezgisel alanına izin verildiğini gösterir. Senden kaçıyorsa, kendi özerk yanın henüz güvenle durmuyor olabilir.",
    emotionMeaning:
      "Huzur, sezgiyle uyumu; tedirginlik, kontrol edilemeyen bir bilgeliği; sevgi, dişil kuvvetle barışı anlatır.",
    relationshipMeaning:
      "Aşkta kedi, mesafe ile yakınlık arasındaki dansı gösterir. Boğmayan bağ, seçilmiş temas, kıskançlıktan çok özerklik ihtiyacı bu rüyada konuşabilir.",
    careerMoneyMeaning:
      "İş yolunda kedi, bağımsız çalışma, sezgisel karar ve görünmeden ilerleyen bir zekâyı işaret ediyor olabilir. Para temasında, zorlamadan gelen bir kanal da belirebilir.",
    transformationMeaning:
      "Dönüşüm, başkasının bekçiliğinden kendi yumuşak egemenliğine geçmektir. Kedi rüyası, boyun eğmeden durabilmeyi hatırlatır.",
    reflection:
      "Bu rüya, sezgilerinin nerede bağımsız kalmak istediğini göstermeye gelmiş olabilir. Yumuşak güç, güçsüzlük değildir.",
    questions: [
      "Hayatında nerede fazla evcilleştirildin?",
      "Hangi sezgini henüz dile getirmedin?",
      "Yakınlık senin için seçim mi, zorunluluk mu?",
      "Bu kedi senden ne istiyor: mesafe mi, temas mı?",
    ],
    summary:
      "Rüyada kedi görmek, sezgi, özerklik ve yumuşak kuvvet temalarını taşır. Renk, bakış ve mesafe yorumu belirler. Rüya, görünmeden gören yanını hatırlatır.",
    relatedDreams: ["ruyada-kopek-gormek", "ruyada-yilan-gormek", "ruyada-bebek-gormek"],
    faqs: [{ question: "Rüyada siyah kedi uğursuz mudur?", answer: "GoldKozmos yorumunda uğursuzluk kehaneti yoktur. Siyah kedi giz, koruma ve henüz adlandırılmamış sezgiyi işaret ediyor olabilir." }],
  }),
  guide({
    id: "ruyada-dis-dokulmesi",
    title: "Rüyada Diş Dökülmesi",
    slug: "ruyada-dis-dokulmesi",
    h1: "Rüyada Diş Dökülmesi Ne Anlama Gelir?",
    seoTitle: "Rüyada Diş Dökülmesi Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada diş dökülmesi ne anlama gelir? Söz, güç ve yenilenmenin spiritüel anlamını rüyanın detayına göre keşfet.",
    searchAliases: ["diş", "dis", "dişim döküldü", "diş dökülmesi", "dişimin düştüğünü görmek"],
    intro:
      "Rüyada diş dökülmesi, birçok kişide tedirginlik bırakır. Ağız, sözün ve yaşam kuvvetinin kapısıdır. Dişler tutunmayı, kesmeyi, sınır koymayı ve dünyayla temas etmeyi taşır. GoldKozmos yorumunda diş dökülmesi, bir ifade biçiminin, bir gücün veya eski bir kimliğin yerinden çıktığını işaret ediyor olabilir. Kehanet gibi okunmaz; dönüşümün ağızdaki izi gibi okunur.",
    spiritualMeaning:
      "Spiritüel olarak diş, hakikati tutan ve hayatı ısırarak alan kuvvettir. Dökülmesi, artık o şekilde tutunamayacağını gösterebilir. Eski sözler, eski savunmalar, eski gurur veya eski bir rol ağızdan düşüyor olabilir. Bu kayıp gibi durur. Spiritüel bakışta ise yeni bir konuşma biçimine yer açılabilir. Kan varsa, geçiş canlı ve yoğundur. Acısız dökülme, zamanı gelmiş bir bırakışı anlatabilir.",
    energyMessage:
      "Enerji mesajı boğaz ve çene hattındadır. Sabah çene sıkılığı, rüyanın gündüzdeki devamıdır. Ön dişler görünür kimliği; azı dişleri içsel dayancı işaret ediyor olabilir. Dilin yanında boşluk varsa, söylenecek yeni bir söz için yer açılmıştır.",
    symbolism:
      "Diş sembolü; güç, söz, sınır, hayata tutunma ve yüzün hakikatidir. Spiritüel temsilde dökülen diş, dar gelen bir maskenin parçası olabilir.",
    variations: [
      { heading: "Rüyada Ön Dişin Dökülmesi", body: "Görünür kimlik ve ifade sarsılıyor olabilir. Dışarıya gösterdiğin yüz yenilenmek üzere olabilir." },
      { heading: "Rüyada Dişlerin Kanaması", body: "Canlı, yoğun bir bırakış vardır. Enerji yalnızca fikir düzeyinde değil, yaşamın içinde işliyordur." },
      { heading: "Rüyada Dişlerini Kendin Çekmek", body: "Bırakışı sen seçiyorsun. Zor da olsa, eski bir ifade biçimini bilinçli olarak alandan çıkarıyor olabilirsin." },
    ],
    colorMeaning:
      "Beyaz diş arınmış söz; sarı yıpranmış gurur; kan kırmızı yaşam kuvveti ve canlı geçiş işaret ediyor olabilir.",
    placeMeaning:
      "Ayna karşısında dökülme, kendini görmeyle ilgilidir. Kalabalıkta dökülme, görünürlük ve utanma eşiğini; yalnızken dökülme ise içsel bir yenilenmeyi anlatabilir.",
    peopleMeaning:
      "Birinin senin dişine bakması, sözünün başkası tarafından tartıldığını; birinin dişini çekmesi, o bağın senin ifaden üzerindeki etkisini gösterebilir.",
    emotionMeaning:
      "Utanç, görünür kimliğin sarsılmasını; korku, güç kaybı inancını; rahatlama ise dar gelen sözün nihayet düşmesini anlatır.",
    relationshipMeaning:
      "Aşkta diş dökülmesi, ilişkideki konuşma biçiminin değişmesini, suskunluğun sonunu veya eski bir gururun inmesini işaret ediyor olabilir. Söz artık eski haliyle tutunmuyordur.",
    careerMoneyMeaning:
      "İş yolunda bu rüya, unvan, temsil ve dünyaya nasıl “ısırdığın” ile konuşur. Eski bir uzmanlık kimliği dökülüyor, yeni bir ifade doğuyor olabilir. Para temasında, değerini eski dilinle savunmanın yetmediğini düşündürebilir.",
    transformationMeaning:
      "Dönüşüm, eski yüzün bir parçasını kaybedip daha sahici bir ağızla kalmaktır. Boşluk, yokluk değil; yeni sözün yuvası olabilir.",
    reflection:
      "Bu rüya, hayatında hangi sözün ve hangi gücün artık tutunmadığını göstermeye gelmiş olabilir. Dökülen şey, yer açan şey olabilir.",
    questions: [
      "Hangi eski sözün artık sana dar geliyor?",
      "Neyi savunmayı bıraktığında ferahlarsın?",
      "Görünür kimliğinin hangi parçası dökülmek istiyor?",
      "Bu boşluk yeni hangi ifadeye yer açıyor?",
    ],
    summary:
      "Rüyada diş dökülmesi, söz, güç ve kimlikte bir bırakışı işaret edebilir. Kayıp gibi duran sahne, yeni bir ifade için yer açıyor olabilir. His ve hangi dişin düştüğü yorumu belirler.",
    relatedDreams: ["ruyada-aglamak", "ruyada-yilan-gormek", "ruyada-eski-sevgiliyi-gormek"],
    faqs: [{ question: "Rüyada diş dökülmesi ölüm veya hastalık mı demektir?", answer: "Bu tür kesin yargılar GoldKozmos yorumunun parçası değildir. Diş, söz ve tutunma sembolüdür; rüya yenilenme eşiğini işaret ediyor olabilir." }],
  }),
  guide({
    id: "ruyada-aglamak",
    title: "Rüyada Ağlamak",
    slug: "ruyada-aglamak",
    h1: "Rüyada Ağlamak Ne Anlama Gelir?",
    seoTitle: "Rüyada Ağlamak Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada ağlamak ne anlama gelir? Arınma, kalp açılımı ve spiritüel bırakışın anlamını rüyanın detayına göre oku.",
    searchAliases: ["ağlamak", "aglamak", "rüyada ağlamak", "ağladım"],
    intro:
      "Rüyada ağlamak, kalbin gece izin verdiği bir akıştır. Gündüz tutulmuş bir su, rüyada yolunu bulur. GoldKozmos yorumunda ağlamak zayıflık değil; enerjinin hareketidir. Gözyaşı arındırır, yumuşatır, sıkışmış bir alanı açar. Kimin için ağladığın, sessiz mi hıçkırarak mı ağladığın ve ağladıktan sonraki ferahlık yorumu değiştirir.",
    spiritualMeaning:
      "Spiritüel olarak gözyaşı, kalbin tuzlu dualarıdır. Rüyada ağlamak, bir bağın, bir dönemin veya bir yükün çözülmek istediğini işaret ediyor olabilir. Bazen sevinçten ağlanır; bu, kalbin genişlemesidir. Bazen veda ağlatır; bu, uğurlamanın beden dilidir. Spiritüel bakışta tutulmuş gözyaşı, tutulmuş yaşam kuvvetidir. Rüya, o kuvveti geri vermeye çalışıyor olabilir.",
    energyMessage:
      "Enerji mesajı göğüs ve boğazdadır. Sabah gözlerin yaşlı uyanmak, rüyanın tamamlanmadığını değil, arınmanın gündüze sarktığını gösterir. Rahatlama varsa, su işini görmüştür. Hâlâ düğümlüyse, daha fazla bırakış bekliyordur.",
    symbolism:
      "Ağlamak sembolü; yağmur, arınma, kalp kapısının açılması ve tuzun temizleyiciliğidir. Spiritüel temsilde gözyaşı, duaların en sessiz olanıdır.",
    variations: [
      { heading: "Rüyada Sevinçten Ağlamak", body: "Kalp genişliyor olabilir. Bir şükran, bir kavuşma veya içsel bir onay gözyaşı biçimini almıştır." },
      { heading: "Rüyada Sessiz Ağlamak", body: "Söylenemeyen, gösterilemeyen bir bırakış vardır. Boğaz hattı henüz tam açılmamış olabilir." },
      { heading: "Rüyada Birinin Ağladığını Görmek", body: "O kişi gerçek bir bağ olabileceği gibi, senin ağlayan yanının yüzü de olabilir. Şefkat çağrısıdır." },
    ],
    colorMeaning:
      "Berrak gözyaşı arınma; bulanık su karışık bir bırakış; yağmurla birleşen ağlayış ise daha büyük bir ruhsal yıkanmayı işaret ediyor olabilir.",
    placeMeaning:
      "Kalabalıkta ağlamak görünür kılınan kalbi; yalnız odada ağlamak mahrem arınmayı; denizin kenarında ağlamak ise kişisel suyun büyük suya katılmasını anlatabilir.",
    peopleMeaning:
      "Kimin omzunda ağladığın, şefkat kanalını gösterir. Kimse yoksa, rüya doğrudan seninle kalbin arasındadır.",
    emotionMeaning:
      "Rahatlama, arınmanın tamamlanmasına; utanç, kalbi gizleme alışkanlığına; özlem, kapanmamış bağa işaret eder. Ağlamanın kendisi zaten mesajdır.",
    relationshipMeaning:
      "Aşkta rüyada ağlamak, bağın yumuşamasını, veda ihtiyacını veya uzun süredir tutulmuş bir şefkati gösterebilir. Partnerin ağlaması, o bağdaki çözülmek isteyen suyu anlatır.",
    careerMoneyMeaning:
      "İş yolunda ağlamak, emekle kurulan kimliğin yumuşamasını veya uzun süredir taşınan bir yükün bırakılmasını işaret edebilir. Para temasında, değerle kurulan gerilimin çözülmesi de belirebilir.",
    transformationMeaning:
      "Dönüşüm, sert kabuğun yaşla çatlamasıdır. Ağlayan rüya, daha canlı ve daha açık bir hale geçişin eşiği olabilir.",
    reflection:
      "Bu rüya, tutulmuş olanın akmasına izin vermeni istiyor olabilir. Gözyaşı kayıp değil, hareket eden enerjidir.",
    questions: [
      "Gündüz hangi suyu tutuyorsun?",
      "Bu gözyaşı veda mi, şükran mı, yoksa açılış mı?",
      "Kalbin hangi sözü henüz boğazından geçiremiyor?",
      "Ağladıktan sonra bedenin ferahladı mı?",
    ],
    summary:
      "Rüyada ağlamak, kalbin arınma ve bırakış hareketidir. Zayıflık değil, enerjinin akışıdır. Kimin için ve nasıl ağladığın yorumu belirler. Rüya, tutulmuş suya yol açmanı ister.",
    relatedDreams: ["ruyada-deniz-gormek", "ruyada-eski-sevgiliyi-gormek", "ruyada-olmus-birini-gormek"],
    faqs: [{ question: "Rüyada ağlamak kötüye mi işaret eder?", answer: "Hayır. Spiritüel olarak ağlamak çoğu zaman arınma, bırakış ve kalp açılımını işaret eder." }],
  }),
  guide({
    id: "ruyada-olmus-birini-gormek",
    title: "Rüyada Ölmüş Birini Görmek",
    slug: "ruyada-olmus-birini-gormek",
    h1: "Rüyada Ölmüş Birini Görmek Ne Anlama Gelir?",
    seoTitle: "Rüyada Ölmüş Birini Görmek Ne Anlama Gelir? | GoldKozmos",
    metaDescription:
      "Rüyada ölmüş birini görmek ne anlama gelir? Uğurlama, soy hattı ve spiritüel mesajı rüyanın detayına göre sakin bir dille oku.",
    searchAliases: [
      "ölen birini görmek",
      "ölmüş birini görmek",
      "olmus birini gormek",
      "vefat eden",
      "rüyada ölü",
    ],
    intro:
      "Rüyada ölmüş birini görmek, kalbi hem ürperten hem teselli eden bir sahnedir. GoldKozmos bu rüyayı korku diliyle okumaz. Ölmüş biri, tamamlanmış bir döngünün elçisi, soy hattının sesi, uğurlanmamış bir bağın ziyareti veya senin içindeki bitmiş bir halin yüzü olabilir. Rüya, ölüm kehaneti üretmez. Daha çok, yaşam ile uğurlama arasındaki eşiği görünür kılar.",
    spiritualMeaning:
      "Spiritüel olarak bu rüya, perdenin inceldiği bir temastır. Gelen kişi bazen gerçekten o bağın enerjisidir, bazen de senin o kişiyle özdeşleştirdiğin bir niteliktir. Huzurlu bir ziyaret, uğurlanmış bir barışı; telaşlı bir sahne, tamamlanmamış bir sözü işaret ediyor olabilir. Soydan biri geliyorsa, aile hattındaki bir tema uyanıyor olabilir. Sevgili veya arkadaş ise, o bağın ruhsal devamı konuşuyor olabilir. Spiritüel bakışta ölüler susmaz; fakat her rüya da “öte taraftan haber” diye bağırmaz. Daha sık olarak, senin içindeki kapanış ihtiyacı gece bir yüz bulur.",
    energyMessage:
      "Enerji mesajı sahnedeki ışıkta ve sende kalan sükûnette gizlidir. Sabah huzur varsa, ziyaret şifalıdır. Ağırlık varsa, henüz uğurlanmamış bir yük duruyordur. Koku, ses, bakış gibi net duyular, temasın güçlü olduğunu gösterir. Silik bir gölge ise, bağın çözülmekte olduğunu düşündürebilir.",
    symbolism:
      "Ölmüş kişi sembolü; eşik, hafıza, soy, veda ve görünmeyen yoldaşlıktır. Spiritüel temsilde ölüm, yok oluş değil; form değiştirmektir. Rüya bu form değişiminin senin hayatındaki yankısını taşır.",
    variations: [
      { heading: "Rüyada Ölmüş Birinin Gülmesi", body: "Barış, onay ve uğurlanmış bir şefkat teması taşıyabilir. Kalp, o bağın artık düşman olmadığını hatırlıyor olabilir." },
      { heading: "Rüyada Ölmüş Birinin Konuşması", body: "Sözler kehanet gibi ezberlenmek zorunda değildir. Daha çok, senin ihtiyacın olan içsel cümleyi gece duyurur." },
      { heading: "Rüyada Ölmüş Birini Hayatta Görmek", body: "Bağ henüz senin içinde canlıdır. Uğurlama tamamlanmamış veya o kişinin niteliği sende yaşamaya devam ediyor olabilir." },
    ],
    colorMeaning:
      "Beyaz ışık arınma ve geçiş; altın şefkatli bir rehberlik; loş karanlık henüz konuşulmamış veda; yeşil ise şifa temasını işaret ediyor olabilir.",
    placeMeaning:
      "Eski ev soy ve kökü; mezarlık eşik ritüelini; tanıdık bir oda mahrem hafızayı; yol ise o bağın hâlâ senin yürüyüşünde olduğunu gösterebilir.",
    peopleMeaning:
      "Yanınızdaki yaşayan kişiler, bu uğurlamanın hangi bağlar içinde yapıldığını anlatır. Yalnızsanız, rüya daha çok seninle o ruh hali arasındadır.",
    emotionMeaning:
      "Huzur, tamamlanmış teması; özlem, kapanmamış kalp hattını; korku, eşiğe dair tedirginliği; şükran ise bağın dönüşmüş halini anlatır. His, rüyanın kapısını açan anahtardır.",
    relationshipMeaning:
      "Aşk ve bağlar açısından bu rüya, veda edilmemiş bir yakınlığı, soyun ilişki kalıplarını veya bugünkü bir bağın üzerine düşen eski bir gölgeyi gösterebilir. Yeni bir ilişkide ölmüş birini görmek, o bağa eski bir bağlılık biçiminin sızdığını düşündürebilir.",
    careerMoneyMeaning:
      "Yaşam yolunda ölmüş birini görmek, miras gibi duran bir yeteneği, aileden gelen bir iş inancını veya bırakılmış bir yolun uğurlanmasını işaret edebilir. Para temasında, “bana kalan değer” sorusu uyanıyor olabilir.",
    transformationMeaning:
      "Dönüşüm, yaşayanla yaşayanın, bitmişle bitmişin yerini ayırmaktır. Bu rüya, bir dönemi gerçekten uğurlayıp daha sahici bir hayata geçmeni isteyebilir.",
    reflection:
      "Bu rüya, korkutmak için değil; kapanış, şefkat ve soy hattındaki bir temayı göstermek için gelmiş olabilir. Gelen yüz, bazen bir kişi, bazen senin bitmiş bir halindir.",
    questions: [
      "Bu ziyaret seni teselli mi ediyor, yoksa bir yükü mü hatırlatıyor?",
      "Uğurlanmamış hangi söz hâlâ sende duruyor?",
      "Gelen kişi gerçekten o kişi mi, yoksa senin bir niteliğin mi?",
      "Bu rüyadan sonra kalbin ferahladı mı, ağırlaştı mı?",
    ],
    summary:
      "Rüyada ölmüş birini görmek, ölüm kehaneti değil; eşik, uğurlama ve bağın dönüşmüş halidir. Huzur, söz, mekan ve his yorumu belirler. Rüya, kapanışı şefkatle görmeni ister.",
    relatedDreams: ["ruyada-aglamak", "ruyada-eski-sevgiliyi-gormek", "ruyada-bebek-gormek"],
    faqs: [{ question: "Rüyada ölmüş birini görmek ölüm haberi midir?", answer: "Hayır. GoldKozmos yorumu kehanet üretmez. Bu rüya daha sık uğurlama, soy hattı ve kapanmamış bağ temalarını taşır." }],
  }),
];

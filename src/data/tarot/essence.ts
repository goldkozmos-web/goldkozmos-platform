import type { TarotCard } from "./types";

export type CardTone =
  | "warm"
  | "open"
  | "hope"
  | "joy"
  | "passion"
  | "stable"
  | "commit"
  | "clarity"
  | "truth"
  | "choice"
  | "delay"
  | "confusion"
  | "scatter"
  | "illusion"
  | "hurt"
  | "grief"
  | "fear"
  | "conflict"
  | "blocked"
  | "stuck"
  | "ending"
  | "power"
  | "distance"
  | "burden"
  | "growth"
  | "begin"
  | "movement"
  | "secret"
  | "wait";

export type CardEssence = {
  meaning: string;
  mind: string;
  heart: string;
  move: string;
  love: string;
  work: string;
  adviceMeaning?: string;
  futurePotential?: string;
  tones: CardTone[];
};

export const CARD_ESSENCE: Record<string, CardEssence> = {
  deli: {
    meaning:
      "Deli, henüz haritası çizilmemiş bir başlangıcı anlatır. Masumiyet, cesaret ve bilinmeyene adım vardır; plan tamamlanmış olmak zorunda değildir.",
    mind: "Zihni yeni bir sayfa, kaçış veya henüz adı konmamış bir ihtimal etrafında dolaşıyor olabilir. Net bir plan değil, ‘neden olmasın’ hali öne çıkabilir.",
    heart: "Kalpte tazelik, hafiflik veya bağın kalıplarından çıkma arzusu duruyor olabilir. His henüz sorumluluk diline oturmamış olabilir.",
    move: "Ani bir adım, mesafe koyma veya beklenmedik bir giriş eğilimi olabilir. Hareketi acele veya uçarı görünebilir; niyet her zaman kötü değildir.",
    love: "İlişkide yeni bir sayfa, bağlanmadan önceki özgürlük veya henüz tanımlanamamış bir çekim konuşur. Evlilik vaadi taşımaz; eşiği gösterir.",
    work: "İşte yeni bir yol, risk veya alışılmadık bir başlangıç belirebilir. Zemin henüz sağlam olmayabilir; fırsat cesaret ister.",
    tones: ["begin", "open", "movement"],
  },
  buyucu: {
    meaning:
      "Büyücü, eldeki araçlarla yön vermeyi anlatır. İrade, beceri ve ‘yapabilirim’ bilinci bir araya gelir; potansiyel kullanılmayı bekler.",
    mind: "Zihni çözüm, strateji ve etki kurma üzerine çalışıyor olabilir. Ne istediğini biliyor ve bunu şekillendirmeye odaklanmış olabilir.",
    heart: "Duyguda çekim olsa da his, niyet ve iradeyle yönlendiriliyor olabilir. Kalp tesadüfe bırakılmamış; bir şey oluşturma hali vardır.",
    move: "İnisiyatif alma, yazma, konuşma veya sahneye girme eğilimi olabilir. Beklemekten çok elindeki imkânı kullanmak ister.",
    love: "Bağda irade ve tezahür öne çıkar. Karşı taraf ilişkiyi yönlendirmek, etkilemek veya görünür kılmak isteyebilir.",
    work: "Yetenek, görünürlük ve inisiyatif konuşur. Fırsat kendiliğinden gelmez; eldeki kaynakla şekil vermek gerekir.",
    tones: ["power", "clarity", "begin"],
  },
  "yuksek-rahibe": {
    meaning:
      "Yüksek Rahibe, söylenmeyen bilgiyi ve iç sesi anlatır. Perde arkasında bir hakikat durur; her şey henüz açıklanmaz.",
    mind: "Zihni tam konuşmuyor olabilir. Sezgi, giz ve ‘bir şey biliyorum ama söylemiyorum’ hali dolaşıyor olabilir.",
    heart: "Duygu derinde tutuluyor olabilir. Yakınlık vardır ama henüz yüzeye çıkarılmamış, korunmuş bir his duruyor olabilir.",
    move: "Açık hamleden çok bekleme, gözlem ve suskunluk eğilimi olabilir. Kart, acele açıklama yapmayabileceğini gösterir.",
    love: "İlişkide giz, sezgi ve henüz dile gelmeyen bağ vardır. Karşı taraf her şeyi göstermiyor olabilir.",
    work: "İşin görünmeyen tarafı, sezgiyle alınan karar veya henüz açıklanmamış bir bilgi öne çıkar. Sabırsız görünürlük işe yaramayabilir.",
    tones: ["secret", "wait", "clarity"],
  },
  imparatorice: {
    meaning:
      "İmparatoriçe, besleme, bereket ve şefkatli büyümeyi anlatır. Hayat burada bakımla çoğalır; kuruluk değil, verim öne çıkar.",
    mind: "Zihni bakım, birliktelik, güzelleştirme veya ‘bunu büyütmek’ üzerine kuruluyor olabilir. Sert hesap değil, çoğalma düşüncesi vardır.",
    heart: "Sıcak, besleyici ve kabul edici bir duygu duruyor olabilir. Şefkat, çekim ve ‘yanında olmak güzel’ hali öne çıkabilir.",
    move: "İlgi gösterme, davet, bakım veya bağa hayat verme eğilimi olabilir. Soğuk mesafe değil, yumuşak yaklaşım daha güçlüdür.",
    love: "İlişkide şefkat, bedensel yakınlık ve bağın beslenmesi konuşur. Duygu kuru değil; çoğalmaya açıktır.",
    work: "İşin verimli, yaratıcı ve bakıldığında büyüyen yüzü öne çıkar. Emek boşa gitmiyor olabilir; bakım isteyen bir süreç vardır.",
    tones: ["warm", "open", "growth"],
  },
  imparator: {
    meaning:
      "İmparator, düzen, sınır ve otoriteyi anlatır. Yapı kurulmak istenir; dağınıklık yerine kontrol ve sağlam zemin öne çıkar.",
    mind: "Zihni kural, plan ve ‘bunun bir düzeni olmalı’ üzerinden çalışıyor olabilir. Duygusal dağınıklığa tahammülü az olabilir.",
    heart: "His vardır ama korunmuş ve kontrollü duruyor olabilir. Kalp, sınır koymadan açılmıyor olabilir.",
    move: "Mesafeli, net ve yöneten bir duruş eğilimi olabilir. Adım atarsa bunu çerçeve içinde atmak ister.",
    love: "İlişkide güvenlik, rol ve sınır konuşur. Bağ duygusal taşmadan çok düzen ve sahiplenmeyle okunur.",
    work: "Otorite, yapı, sorumluluk ve somut zemin öne çıkar. Dağınık bir iş ritmi bu kartla sıkışır.",
    tones: ["power", "stable", "commit"],
  },
  aziz: {
    meaning:
      "Aziz, gelenek, aidiyet ve onaylanmış bir yolu anlatır. Öğreti, ritüel veya ‘doğru bulunan’ bağ biçimi öne çıkar.",
    mind: "Zihni ‘nasıl olmalı’, ‘bu doğru mu’, ‘çevrem ne der’ soruları etrafında dolaşıyor olabilir. Aile, inanç veya alışılmış değerler düşüncesini etkiliyor olabilir. Karar, anlık hevesten çok meşru ve anlamlı bir çerçeve arıyor olabilir.",
    heart: "Duyguda samimiyet olsa da aidiyet, güven ve onay arayışı karışmış olabilir. His, flörtün ötesinde ‘bu bağın bir yeri olsun’ ihtiyacına çekiliyor olabilir. Kalp, kaotik bir çekimden çok durulmuş bir bağlılık ister.",
    move: "Resmiyet, tanışma, söz, aileye açılma veya daha geleneksel bir adım eğilimi olabilir. Kaotik bir hamleden çok, onaylı ve ciddi bir yol seçilebilir. Acele tutkudan çok duruş önemlidir.",
    love: "İlişkide ciddiyet, değerler, güven, bağlılık veya bağın belirli bir çerçeveye oturma ihtiyacı öne çıkabilir. Taraflardan biri ilişkiye daha geleneksel veya ciddi yaklaşmak istiyor olabilir. Bu kart, bağın yüzeysel bir etkileşimden ziyade ‘bu ilişkinin yeri ne?’ sorusunu gündeme getirebileceğini anlatır. Evlilik kehaneti değildir; anlam ve sınır arayışıdır.",
    work: "Kurum, mentor, doğru kanal veya yerleşik yöntem öne çıkar. Tek başına uçmak değil, aidiyetle ve kuralı olan bir yolla ilerlemek vardır. İtibar ve doğru kapı, rastgele fırsattan daha güçlü durur.",
    adviceMeaning:
      "Kendi değerlerinle çelişen bir bağ veya iş yolunu ‘olur böyle’ diye geçiştirme. Çerçevenin ne olduğunu netleştir. Ciddiyet, baskı değil; duruştur.",
    futurePotential:
      "Süreç olgunlaşırsa daha resmi, daha tanımlı veya daha aidiyetli bir yapıya kayabilir. Bu, acele bir taahhüt değil; bağın veya işin meşru bir zemine oturma potansiyelidir.",
    tones: ["commit", "stable", "choice"],
  },
  asiklar: {
    meaning:
      "Aşıklar, kalbin seçimini ve değerlerle hizalanmayı anlatır. İki yol, iki kişi veya iki dürüst ihtiyaç karşı karşıya duruyor olabilir.",
    mind: "Zihni ‘kimi / neyi seçiyorum?’ sorusu etrafında çalışıyor olabilir. Karar mantıktan çok değer ve bağ üzerinden tartılıyor olabilir.",
    heart: "Güçlü bir çekim, bağlanma arzusu veya kalbin taraf tutması duruyor olabilir. His nötr değildir; bir tercih uyanmıştır.",
    move: "Birini seçme, yaklaşma veya bağa dair net bir duruş eğilimi olabilir. Kaçış değil, hizalanma konuşur — yine de acele söz verilmiş olmak zorunda değildir.",
    love: "İlişkide seçim, karşılıklı çekim ve değerlerin uyumu öne çıkar. Bağ ‘olsa da olur’ halinde değildir.",
    work: "İş ile kalp değerlerinin hizası konuşur. Bir yol ayrımında hangi işin sana ait olduğu soruluyor olabilir.",
    tones: ["choice", "warm", "commit"],
  },
  "savas-arabasi": {
    meaning:
      "Savaş Arabası, irade ve kararlı ilerleyişi anlatır. Karşıtlar dizginlenir; yön seçilir ve gidilir.",
    mind: "Zihni hedefe kilitlenmiş olabilir. ‘Nasıl ilerlerim?’ sorusu, kararsızlıktan daha güçlü duruyor olabilir.",
    heart: "Duygu tutkuyla karışık bir kararlılık taşıyor olabilir. His yumuşak dağılmaz; bir yöne çekilir.",
    move: "Harekete geçme, kontrolü alma veya geri çekilmeden ilerleme eğilimi olabilir. Beklemek bu kartın doğal dili değildir.",
    love: "İlişkide irade, rekabet veya bağa yön verme konuşur. Karşı taraf meselenin sürmesini istiyor olabilir.",
    work: "Hedef, hız ve zafer ritmi öne çıkar. Dağınık emek değil, yön verilmiş çaba vardır.",
    tones: ["movement", "power", "clarity"],
  },
  guc: {
    meaning:
      "Güç, yumuşak kuvveti ve iç cesareti anlatır. Vahşi olan bastırılmaz; şefkatle tutulur.",
    mind: "Zihni ‘sabırla tutabilirim’ üzerinden çalışıyor olabilir. Zorlamadan etkileme, yumuşak hakimiyet düşüncesi vardır.",
    heart: "Derin, sıcak ve cesur bir duygu duruyor olabilir. Korku olsa bile kalp kaçmak yerine durmayı seçiyor olabilir.",
    move: "Sert kopuş değil, sabırlı yaklaşım eğilimi olabilir. İnatla değil, iç kuvvetle ilerlemek ister.",
    love: "İlişkide şefkat, cinsel/yaşamsal çekim ve güvenle durmak konuşur. Bağ kırılgan olsa da terk edilmek zorunda değildir.",
    work: "Zor bir işin yumuşak ısrarla taşınması öne çıkar. Güç bağırmaz; dayanır.",
    tones: ["warm", "power", "stable"],
  },
  ermis: {
    meaning:
      "Ermiş, içe dönüşü ve kendi ışığını taşımayı anlatır. Cevap dışarıda değil, yalnız bakışta aranır.",
    mind: "Zihni uzaklaşma, düşünme ve kendi başına anlam çıkarma üzerine kuruluyor olabilir. Kalabalık fikir değil, iç ses öne çıkar.",
    heart: "Duygu derin fakat mesafeli duruyor olabilir. Sevgi yok olmaz; paylaşılmadan önce içerde olgunlaşmak ister.",
    move: "Çekilme, az konuşma veya ‘şimdi yalnız olayım’ eğilimi olabilir. Bu ilgisizlik değil, içe dönüş olabilir.",
    love: "İlişkide mesafe, ihtiyaç duyulan alan ve içsel netlik konuşur. Karşı taraf şu an birleşmekten çok düşünüyor olabilir.",
    work: "Mentorluk, yalnız çalışma veya gürültüden çekilip özü görmek öne çıkar. Acele görünürlük uymaz.",
    tones: ["distance", "wait", "clarity"],
  },
  "kader-carki": {
    meaning:
      "Kader Çarkı, döngünün döndüğünü anlatır. Şans, zaman ve kaçınılmaz değişim sahneye girer; her şey eski yerinde kalamaz.",
    mind: "Zihni ‘zamanı geldi mi?’ ve değişen koşullar etrafında dolaşıyor olabilir. Kontrol etmekten çok akışa bakıyor olabilir.",
    heart: "Duyguda iniş çıkış, kader hissi veya ‘bu bir işaret’ hali duruyor olabilir. His sabit değil, dönüyor olabilir.",
    move: "Beklenmedik bir dönüş, geri dönüş veya sahnenin değişmesi eğilimi olabilir. Hareket kişiye değil, zamana da bağlı görünebilir.",
    love: "İlişkide döngü, tekrar ve değişen şans konuşur. Eski bir bağ yeniden dönebilir veya mevcut ritim bozulabilir.",
    work: "Fırsatın dönmesi, zamanlamanın değişmesi veya kontrol dışı bir gelişme öne çıkar. Statü sabit kalmak zorunda değildir.",
    tones: ["movement", "growth", "choice"],
  },
  adalet: {
    meaning:
      "Adalet, hakikat, ölçü ve sonucun görünmesini anlatır. Tartılan söz vardır; kaçınılan hesap yüzeye çıkar.",
    mind: "Zihni haklılık, denge ve ‘bu adil mi?’ sorusu etrafında çalışıyor olabilir. Duygusal yanlılıktan çok ölçü arıyor olabilir.",
    heart: "His soğuk görünse de adalet arayışıyla karışmış olabilir. Sevgi, hesap görülmeden rahat etmiyor olabilir.",
    move: "Dürüst konuşma, sınır koyma veya sonucu kabul etme eğilimi olabilir. Yanlışın üstünü örtmek istemeyebilir.",
    love: "İlişkide denge, karşılıklılık ve açık hesap konuşur. Tek taraflı emek bu kartta rahat durmaz.",
    work: "Sözleşme, hak, görünür sonuç ve dürüst değerlendirme öne çıkar. Belirsiz vaat uymaz.",
    tones: ["truth", "clarity", "choice"],
  },
  "asilan-adam": {
    meaning:
      "Asılan Adam, bekleyişteki bilgeliği ve bakışın tersine dönmesini anlatır. Şimdi zorlamak değil, asılı kalıp başka açıdan görmek vardır.",
    mind: "Zihni erteleme, teslim ve ‘şimdi anlamıyorum ama beklemeliyim’ halinde olabilir. Klasik çözümler işlemiyor olabilir.",
    heart: "Duygu askıda duruyor olabilir. Sevgi yok olmaz; akış şimdilik durmuş, başka bir anlayış bekleniyor olabilir.",
    move: "Hamle gecikebilir. Bu tembellik değil, henüz doğru anın gelmediği bir duruş olabilir.",
    love: "İlişkide bekleyiş, fedakârlık ve bakış değiştirme konuşur. Acele sonuç bu kartta zorlanır.",
    work: "Askıya alınan iş, bekleyen karar veya stratejiyi tersinden görme öne çıkar. Zorlamak verimi düşürebilir.",
    tones: ["wait", "delay", "stuck"],
  },
  olum: {
    meaning:
      "Ölüm, eski formun dökülmesini anlatır. Bitiş vardır; fakat bu literal bir felaket değil, kaçınılmaz bir geçiştir.",
    mind: "Zihni ‘bitti’ veya ‘artık aynı kalamaz’ cümlesi etrafında dolaşıyor olabilir. Eski senaryoyu zorlamak istemiyor olabilir.",
    heart: "Duyguda veda, boşalma veya köklü bir değişim duruyor olabilir. His ağır olabilir; aynı zamanda yer açılıyor olabilir.",
    move: "Kopuş, kapanış veya ilişkiyi/işi eski haliyle sürdürmeme eğilimi olabilir. Bu her zaman kötü niyet değildir.",
    love: "İlişkide bir dönemin kapanması, dönüşüm veya eski bağ biçiminin ölmesi konuşur. Aynı kalmak zorlaşır.",
    work: "Rolün, işin veya düzenin bitişi öne çıkar. Yeni biçim ancak eskisi dökülünce gelir.",
    tones: ["ending", "growth"],
  },
  denge: {
    meaning:
      "Denge (Dengeleme), zıtları bir arada tutmayı ve ölçülü akışı anlatır. Aşırıya kaçmadan karışım aranır.",
    mind: "Zihni orta yolu, zamanlamayı ve ‘ikisini birden nasıl taşırım?’ı tartıyor olabilir. Uç kararlardan kaçınıyor olabilir.",
    heart: "Duygu sakin, şefkatli ve ayarlanmış duruyor olabilir. Fırtına değil, uyum arayışı öne çıkar.",
    move: "Acele değil, ölçülü yaklaşım eğilimi olabilir. Sert kopuş veya taşkın hamle bu kartta zayıftır.",
    love: "İlişkide uyum, sabır ve karşılıklı ayar konuşur. Bağın yaşaması dengeye bağlıdır.",
    work: "Süreç, tempo ve kaynakların dengeli kullanılması öne çıkar. Aşırı yük veya aşırı hız uymaz.",
    tones: ["stable", "wait", "hope"],
  },
  seytan: {
    meaning:
      "Şeytan, bağlanma, arzu ve görünmeyen tasmayı anlatır. Özgürlük unutulmuş olabilir; çekim güçlü fakat ağırdır.",
    mind: "Zihni saplantı, kıskançlık, arzu veya ‘bırakamiyorum’ döngüsünde dolaşıyor olabilir. Düşünce özgürce akmıyor olabilir.",
    heart: "Yoğun, karanlık veya bağımlı bir çekim duruyor olabilir. His sıcak olsa da sağlıklı olmak zorunda değildir.",
    move: "Geri gelme, kıskandırma, gizleme veya bağı koparamama eğilimi olabilir. Hareket özgür seçimden çok tasma gibi durabilir.",
    love: "İlişkide tutku, kıskançlık, gizli bağ veya sağlıksız tekrar konuşur. Çekim güçlüdür; netlik zayıf olabilir.",
    work: "Altın parıltılı fakat tüketen bir düzen, borç, bağımlılık veya ‘çıkamıyorum’ hali öne çıkar.",
    tones: ["passion", "blocked", "secret"],
  },
  kule: {
    meaning:
      "Kule, sahte yapının inmesini ve ani hakikati anlatır. Sarsıntı vardır; ardından gizlenen gerçek görünür.",
    mind: "Zihni şok, yüzleşme ve ‘ben bunu böyle biliyordum’un yıkılması etrafında olabilir. Eski fikir duramaz.",
    heart: "Duyguda kırılma, öfke veya ani uyanış duruyor olabilir. His yumuşak bir geçiş değildir.",
    move: "Ani konuşma, kopuş, ifşa veya meselenin patlaması eğilimi olabilir. Kontrol elden kaymış görünebilir.",
    love: "İlişkide kriz, sırın dökülmesi veya güvenin sarsılması konuşur. Eski hali sürdürmek zorlaşır.",
    work: "Beklenmedik gelişme, planın çökmesi veya zorunlu yeniden kurulum öne çıkar.",
    tones: ["hurt", "truth", "ending"],
  },
  yildiz: {
    meaning:
      "Yıldız, umut, şifa ve yenilenen inancı anlatır. Gece bitmemiştir ama ışık düşmüştür.",
    mind: "Zihni ‘yine olur’ ve iyileşme ihtimali etrafında yumuşuyor olabilir. Karanlık düşünce tek hakim olmak zorunda değildir.",
    heart: "Umut, şefkat ve kalbin yeniden açılması duruyor olabilir. His kırılgan olsa da aydınlığa döner.",
    move: "Yumuşak bir uzanma, barış arayışı veya şifaya yer açma eğilimi olabilir. Sert hesap bu kartın dili değildir.",
    love: "İlişkide onarım, umut ve ruhsal yakınlık konuşur. Mucize vaadi değil; iyileşen inanç vardır.",
    work: "Uzun vadeli ilham, anlam ve toparlanma öne çıkar. Kuru kazançtan çok içsel yön bulunur.",
    tones: ["hope", "open", "warm"],
  },
  ay: {
    meaning:
      "Ay, sis, yanılsama ve sezgisel belirsizliği anlatır. Görünen her şey olduğu gibi olmayabilir; korku da gerçeği büyütebilir.",
    mind: "Zihni varsayım, şüphe ve netleşmemiş imgelerle dolu olabilir. Ne düşündüğünü tam ayırt edemiyor olabilir.",
    heart: "Duygu karışık, korkulu veya özlemle karışık duruyor olabilir. His vardır ama kaynağı sisli olabilir.",
    move: "Dolaylı davranış, kaçınma veya ‘şimdi net adım atamam’ eğilimi olabilir. Kart, açık hamleyi geciktirebilir.",
    love: "İlişkide belirsizlik, gizli korku ve netleşmeyen bağ konuşur. Her bakış gerçek niyet olmayabilir.",
    work: "Belirsiz koşullar, eksik bilgi veya yanıltıcı bir tablo öne çıkar. Acele imza uymaz.",
    tones: ["confusion", "illusion", "fear"],
  },
  gunes: {
    meaning:
      "Güneş, açıklık, canlılık ve içten gelen ferahlığı anlatır. Sıcaklık görünür olur; saklama ihtiyacı azalır.",
    mind: "Zihni daha net, iyimser ve sade olabilir. Karmaşık oyunlardan çok ‘bu iyi hissettiriyor’ düşüncesi duruyor olabilir.",
    heart: "Sıcaklık, çekim, mutluluk ve açık bir duygu öne çıkar. Kalp tarafı bulutlu olmak zorunda değildir.",
    move: "Daha açık davranma, görünme, paylaşım veya yaklaşma eğilimi olabilir. Gizlenmek bu karta uymaz — yine de herkes hemen adım atmaz, ama yön olumludur.",
    love: "İlişkide neşe, açıklık ve canlı bir bağ konuşur. Karşı tarafın duygusu burada genellikle sıcak okunur.",
    work: "Başarı görünürlüğü, açıklık ve işin hayat bulması öne çıkar. Gölgede kalmak zorlaşır.",
    tones: ["joy", "warm", "open", "clarity"],
  },
  mahkeme: {
    meaning:
      "Mahkeme, çağrı, uyanış ve eskiyi uğurlamayı anlatır. Duyulan bir ses vardır; geçmişle yüzleşme ve yeniden doğuş karışır.",
    mind: "Zihni hesap, pişmanlık veya ‘artık dürüst olayım’ çağrısı etrafında çalışıyor olabilir. Eski dosya kapanmak istiyor olabilir.",
    heart: "Duyguda uyanış, bağışlama veya geçmişin yankısı duruyor olabilir. His yüzeysel değildir.",
    move: "Hesaplaşma, özür, geri dönüp konuşma veya bir kapıyı bilinçli kapatma eğilimi olabilir.",
    love: "İlişkide geçmişin çağrısı, ikinci bir bakış veya bağın yeniden değerlendirilmesi konuşur.",
    work: "Eski emeğin görünmesi, bir çağrı veya kariyerde uyanış öne çıkar. Geçmiş dosya kapanmadan yeni sayfa zor açılır.",
    tones: ["truth", "ending", "growth"],
  },
  dunya: {
    meaning:
      "Dünya, tamamlanma, bütünlük ve yerini bulmayı anlatır. Çember kapanır; bir döngü olgunlaşmıştır.",
    mind: "Zihni ‘bu tamam’ veya bütün resmi görme hali etrafında duruyor olabilir. Eksik parça arayışı zayıflamış olabilir.",
    heart: "Doygun, bütün ve huzurlu bir duygu duruyor olabilir. Kalp dağınık arayışta olmak zorunda değildir.",
    move: "Tamamlama, taahhüt veya döngüyü güzelce kapatıp yeni çembere geçme eğilimi olabilir.",
    love: "İlişkide olgunluk, ait hissetme ve bağın bir aşamayı tamamlaması konuşur.",
    work: "Eserin tamamlanması, tanınma ve sağlam kapanış öne çıkar. Yarım iş bu karta uymaz.",
    tones: ["stable", "commit", "joy"],
  },

  "kupa-asi": {
    meaning:
      "Kupa Ası, kalbin yeni bir açılışını anlatır. Taze duygu, şefkat veya duygusal bir teklif tohumu duruyor olabilir.",
    mind: "Zihni yeni bir his, yumuşak bir başlangıç veya ‘kalbim kıpırdadı’ üzerine kuruluyor olabilir. Sert strateji zayıf kalır.",
    heart: "Açık, taze ve umutlu bir duygu öne çıkar. Sevgi veya şefkat yeni başlıyor olabilir.",
    move: "Duygusunu gösterme, yazma, yaklaşma veya kalbini aralama eğilimi olabilir. Büyük söz verilmiş olmak zorunda değildir.",
    love: "İlişkide yeni bir duygusal kapı, taze çekim veya kalbin yeniden açılması konuşur.",
    work: "Anlamlı bir işe gönül koyma, yeni bir işbirliği duygusu veya emeğe kalpten bağlanma öne çıkar. Nakit vaadi değil; duygusal yatırım vardır.",
    tones: ["begin", "warm", "open"],
  },
  "kupa-ikilisi": {
    meaning:
      "Kupa İkilisi, karşılıklı akışı ve iki kalbin buluşmasını anlatır. Bağ tek taraflı olmak zorunda değildir.",
    mind: "Zihni ‘biz’ ve karşılıklılık üzerine kuruluyor olabilir. Seni denk bir bağ olarak görüyor olabilir.",
    heart: "Karşılıklı çekim, uyum ve ‘bu kişiye ısınıyorum’ hali duruyor olabilir.",
    move: "Buluşma, itiraf, dengeleme veya bağa ortak adım eğilimi olabilir.",
    love: "İlişkide karşılıklı his ve ortak kadeh konuşur. Tek taraflı aşk bu kartta zayıftır.",
    work: "Ortaklık, uyumlu işbirliği ve karşılıklı fayda öne çıkar.",
    tones: ["warm", "commit", "open"],
  },
  "kupa-uclusu": {
    meaning:
      "Kupa Üçlüsü, paylaşımı, kutlamayı ve sosyal neşeyi anlatır. Kalp yalnız değil, bir çemberde açılır.",
    mind: "Zihni birliktelik, dostluk ve ‘bunu paylaşmak güzel’ üzerine dolaşıyor olabilir. Ağır bir kriz düşüncesi zayıf kalır.",
    heart: "Hafif, neşeli ve paylaşılmak istenen bir duygu duruyor olabilir. Derin giz değil, açık sevinç öne çıkar.",
    move: "Davet, grup içinde görünme veya bağın sosyal yüzünü açma eğilimi olabilir.",
    love: "İlişkide dostane sıcaklık, kutlama ve üçüncü kişilerin de olduğu bir neşe konuşur. Bazen flört ortamı, bazen bağın rahat yüzü.",
    work: "Ekip, görünür kutlama ve paylaşılan başarı öne çıkar. Tek başına inziva uymaz.",
    tones: ["joy", "open", "warm"],
  },
  "kupa-dortlusu": {
    meaning:
      "Kupa Dörtlüsü, doygunluk, bıkkınlık veya sunulanı görememeyi anlatır. Kalp kapalı duruyor olabilir.",
    mind: "Zihni ‘yine aynı’ ve isteksizlik etrafında dolaşıyor olabilir. Yeni teklifi bile küçümsüyor olabilir.",
    heart: "Duygu durgun, ilgisiz veya korunmuş olabilir. Bu nefret değil; içe kapanmış bir kalp olabilir.",
    move: "Cevapsızlık, erteleme veya teklifi görmezden gelme eğilimi olabilir.",
    love: "İlişkide duygusal durgunluk ve kaçırılan fırsat konuşur. Karşı taraf şu an bağa doymuş veya yorgun olabilir.",
    work: "Motivasyon düşüklüğü, aynı işin tekrarından sıkılma öne çıkar. Fırsat duruyor olsa da alınmıyor olabilir.",
    tones: ["stuck", "distance", "delay"],
  },
  "kupa-beslisi": {
    meaning:
      "Kupa Beşlisi, kayıp, pişmanlık ve dökülen kadehe bakmayı anlatır. Ayakta duran kadehler henüz görülmüyor olabilir.",
    mind: "Zihni ‘keşke’ ve geçmiş kırgınlık etrafında dönüyor olabilir. Olanın eksik tarafı abartılıyor olabilir.",
    heart: "Üzüntü, hayal kırıklığı ve yas benzeri bir his duruyor olabilir. Kalp şu an neşeye kapalı olabilir.",
    move: "Geri çekilme, suskunluk veya kaybın ardından toparlanamama eğilimi olabilir.",
    love: "İlişkide pişmanlık ve dökülen duygu konuşur. Hâlâ ayakta olan bağ görülmüyor olabilir.",
    work: "Kaçan fırsat, hayal kırıklığı veya emeğin boşa gittiği hissi öne çıkar.",
    tones: ["grief", "hurt", "distance"],
  },
  "kupa-altilisi": {
    meaning:
      "Kupa Altılısı, geçmişi, nostaljiyi ve eski bir tatlılığı anlatır. Şimdi, eski bir bağın kokusuyla karışmış olabilir.",
    mind: "Zihni anılar, eski haller ve ‘eskiden nasıldık’ üzerine dolaşıyor olabilir. Gelecek planından çok geçmiş sahne duruyor olabilir.",
    heart: "Yumuşak özlem, tanıdık bir şefkat veya çocuksu bir bağ duruyor olabilir.",
    move: "Eski bir mesaj, hatırlatma veya geçmişe dönük bir jest eğilimi olabilir.",
    love: "İlişkide eski sevgili, ortak geçmiş veya nostaljik bağ konuşur. Yeni sayfa kadar eski defter de açıktır.",
    work: "Eski iş çevresi, geçmiş bir proje veya tanıdık bir kapı öne çıkar.",
    tones: ["hope", "warm", "wait"],
  },
  "kupa-yedilisi": {
    meaning:
      "Kupa Yedilisi, birden fazla ihtimal, hayal ve netleşmemiş seçeneği anlatır. Görünenlerin bir kısmı gerçek, bir kısmı idealize edilmiş olabilir.",
    mind: "Kafasında birçok senaryo, hayal ve ‘olursa’ cümlesi dolaşıyor olabilir. Seni düşünüyor olabilir; fakat düşünceler henüz tek bir net karara oturmamış olabilir.",
    heart: "Duyguda da birden fazla çekim veya karışık arzu duruyor olabilir. His tek kişiye kilitlenmiş olmak zorunda değildir.",
    move: "Adım dağılabilir veya gecikebilir. Seçmeden tartmak, hayal etmek, somut hamleyi ertelemek eğilimi olabilir.",
    love: "İlişkide net tercih henüz oturmamış olabilir. İdeal ile gerçek karışıyor; bağın yönü sisli kalabilir.",
    work: "Birden fazla iş yolu, teklif veya hayal aynı anda duruyor olabilir. Somut seçim henüz yapılmamış olabilir.",
    tones: ["scatter", "confusion", "illusion", "choice"],
  },
  "kupa-sekizlisi": {
    meaning:
      "Kupa Sekizlisi, duygusal bir sahneden yola çıkmayı anlatır. Kalp, artık yetmeyen bir bağdan uzaklaşmak isteyebilir.",
    mind: "Zihni ‘bu bana yetmiyor’ ve ayrılma düşüncesi etrafında duruyor olabilir. Kadehler dolu görünse de anlam eksiktir.",
    heart: "Duyguda bırakış, arayış ve içsel bir veda duruyor olabilir. Nefret şart değildir; doymamışlık vardır.",
    move: "Mesafe koyma, çekilme veya bağdan yavaşça çıkma eğilimi olabilir.",
    love: "İlişkide duygusal ayrılış ve daha derin bir anlam arayışı konuşur.",
    work: "Anlamsızlaşan işten uzaklaşma veya başka bir yola yürüme öne çıkar.",
    tones: ["ending", "distance", "growth"],
  },
  "kupa-dokuzlusu": {
    meaning:
      "Kupa Dokuzlusu, dileğin doyuma yaklaşmasını anlatır. Kişisel tatmin ve ‘istediğim oldu’ hali öne çıkar.",
    mind: "Zihni memnuniyet, kendine yetme ve dileğin gerçekleşmesi etrafında duruyor olabilir.",
    heart: "Tatmin, gurur ve kişisel mutluluk duruyor olabilir. Kalp eksik hissetmek zorunda değildir.",
    move: "Kendi dünyasında kalma veya doyumu paylaşmadan yaşama eğilimi de olabilir; yine de duygu olumludur.",
    love: "İlişkide kişisel mutluluk ve dileğin bağ üzerinden okunması konuşur. Bazen ‘ben iyiyim’ mesafesi de karışır.",
    work: "Emeğin kişisel karşılığı, rahatlık ve istediğin sonuca yaklaşma öne çıkar.",
    tones: ["joy", "warm", "stable"],
  },
  "kupa-onlusu": {
    meaning:
      "Kupa Onlusu, duygusal tamamlanmayı ve aile gibi bir bağ çemberini anlatır. Kalp evini bulmuş gibi durur.",
    mind: "Zihni uzun vadeli birlik, yuva ve ‘biz bir aileyiz’ üzerine kuruluyor olabilir.",
    heart: "Derin aidiyet, mutluluk ve paylaşılmış sevinç duruyor olabilir.",
    move: "Ciddi bağ, birlikteliği büyütme veya kalıcı bir adım eğilimi olabilir.",
    love: "İlişkide yuva, uzun vade ve duygusal doluluk konuşur.",
    work: "Ekip ailesi, kalıcı değer ve emeğin duygusal doyumu öne çıkar.",
    tones: ["commit", "joy", "warm"],
  },
  "kupa-prensi": {
    meaning:
      "Kupa Prensi, duygusal bir haberi, taze meraki ve kalpten gelen ilk adımı anlatır.",
    mind: "Zihni seni merak etme, hayal kurma ve yumuşak bir ‘acaba’ halinde olabilir.",
    heart: "Utangaç, taze ve meraklı bir duygu duruyor olabilir. Derin taahhüt henüz yok; kıpırtı vardır.",
    move: "Mesaj, jest veya çekingen bir yaklaşma eğilimi olabilir.",
    love: "İlişkide yeni flört enerjisi ve duygusal haber konuşur.",
    work: "Yaratıcı bir teklif, duygusal bir iş kapısı veya öğrenme merceği öne çıkar.",
    tones: ["begin", "open", "hope"],
  },
  "kupa-sovalyesi": {
    meaning:
      "Kupa Şövalyesi, duygunun hareket halini anlatır. Teklif, romantizm ve kalpten gelen bir ilerleyiş vardır; bazen acele de karışır.",
    mind: "Zihni romantize edilmiş bir bağ ve ‘gidip anlatayım’ hali etrafında olabilir.",
    heart: "Sıcak, idealize ve akışkan bir duygu duruyor olabilir.",
    move: "Yazmak, davet, duygusunu göstermek veya gelmek eğilimi olabilir. Süreklilik her zaman garanti değildir.",
    love: "İlişkide romantik hamle ve teklif konuşur.",
    work: "Gönülden bir teklif, işbirliği daveti veya duygusal satış/ilişki öne çıkar.",
    tones: ["warm", "movement", "passion"],
  },
  "kupa-kralicesi": {
    meaning:
      "Kupa Kraliçesi, olgun şefkati ve duygusal zekâyı anlatır. His tutulur, taşmaz; derinlemesine okunur.",
    mind: "Zihni empati ve ‘karşı taraf ne hissediyor?’ üzerinden çalışıyor olabilir.",
    heart: "Derin, şefkatli ve kabul edici bir duygu duruyor olabilir.",
    move: "Dinleme, bakım ve yumuşak fakat bilinçli yaklaşım eğilimi olabilir.",
    love: "İlişkide olgun sevgi ve duygusal güvenlik konuşur.",
    work: "İnsanı okuyan, bakım veren ve sezgisel bir yetkinlik öne çıkar.",
    tones: ["warm", "stable", "open"],
  },
  "kupa-krali": {
    meaning:
      "Kupa Kralı, duyguda olgun hakimiyeti anlatır. Kalp vardır; fakat savrulmaz, yönetilir.",
    mind: "Zihni duyguyu tartarak, sakin ve diplomatik çalışıyor olabilir.",
    heart: "Derin fakat kontrollü bir sevgi duruyor olabilir. Taşkınlık zayıftır.",
    move: "Olgun bir konuşma, koruyucu duruş veya sakin bir adım eğilimi olabilir.",
    love: "İlişkide güvenilir duygusal duruş konuşur. Oyun değil, olgun bağ aranır.",
    work: "Duygusal zekâ ile yönetme, danışmanlık ve sakin otorite öne çıkar.",
    tones: ["stable", "commit", "warm"],
  },

  "kilic-asi": {
    meaning:
      "Kılıç Ası, zihinsel netlik, hakikat ve keskin bir fikri anlatır. Sis dağılır; söz ve karar keskinleşir.",
    mind: "Zihni bir gerçeği görmüş, bir kararı netleştirmiş veya keskin bir fikir üretmiş olabilir.",
    heart: "Duygu zihnin ardından gelir. Kalp yumuşak olsa da hakikat hissi öne çıkar.",
    move: "Net konuşma, karar alma veya durumu kesip atma eğilimi olabilir.",
    love: "İlişkide dürüstlük ve zihinsel netlik konuşur. Oyun bozulur.",
    work: "Yeni bir fikir, net karar ve keskin çözüm öne çıkar.",
    tones: ["clarity", "truth", "begin"],
  },
  "kilic-ikilisi": {
    meaning:
      "Kılıç İkilisi, kararı ertelemeyi ve iki seçenek arasında körleşmeyi anlatır. Ateşkes vardır; çözüm yoktur.",
    mind: "Zihni ikiye bölünmüş olabilir. Seçmemek için gözlerini kapıyor olabilir.",
    heart: "Duygu donmuş veya askıya alınmış olabilir. His yok değildir; bakılmıyordur.",
    move: "Kararsızlık, erteleme veya ‘şimdi yüzleşmem’ eğilimi olabilir.",
    love: "İlişkide kaçınılan konuşma ve askıdaki bağ konuşur.",
    work: "İki iş yolu arasında kilitlenme öne çıkar. Karar verilmeden ilerleme zayıf kalır.",
    tones: ["choice", "blocked", "delay"],
  },
  "kilic-uclusu": {
    meaning:
      "Kılıç Üçlüsü, kırgınlık, hayal kırıklığı ve kalbe batan hakikati anlatır. Acı zihinden de geçer; söz yaralamış olabilir.",
    mind: "Zihni incinme, ‘neden böyle oldu’ ve tekrar eden kırgın cümleler etrafında dolaşıyor olabilir.",
    heart: "Kalpte kırılma, üzüntü ve yeniden zarar görme hassasiyeti duruyor olabilir.",
    move: "Mesafelenme, sert söz, geri çekilme veya yarayı koruma eğilimi olabilir. Olumlu bir his olsa bile davranış temkinli kalabilir.",
    love: "İlişkide kırgınlık ve acı veren bir gerçek konuşur. Bağ bitmiş olmak zorunda değildir; kalp tedbirlidir.",
    work: "Hayal kırıklığı, eleştiri veya işte yaşanan bir kırılma öne çıkar.",
    tones: ["hurt", "grief", "distance"],
  },
  "kilic-dortlusu": {
    meaning:
      "Kılıç Dörtlüsü, dinlenme, toparlanma ve zihni durdurmayı anlatır. Savaş durmuştur; şifa için ara vardır.",
    mind: "Zihni ‘şimdi yeter’ ve geri çekilip dinlenme üzerine kuruluyor olabilir.",
    heart: "Duygu sakin, yorgun veya iyileşmek isteyen bir yerde duruyor olabilir.",
    move: "Sessizlik, ara verme veya iletişimi yavaşlatma eğilimi olabilir.",
    love: "İlişkide mola ve duygusal toparlanma konuşur. Kopuş şart değildir; nefes şarttır.",
    work: "Molaya ihtiyaç, tükenmişlik ve zihni boşaltma öne çıkar.",
    tones: ["wait", "delay", "distance"],
  },
  "kilic-beslisi": {
    meaning:
      "Kılıç Beşlisi, çatışma, ego ve kazansa da kaybettiren bir mücadeleyi anlatır.",
    mind: "Zihni haklı çıkma, tartışma ve ‘ben kazandım’ üzerinden çalışıyor olabilir.",
    heart: "Duyguda kırgınlık, gurur ve soğuma duruyor olabilir.",
    move: "Sert söz, çekişme veya galip görünüp bağı zedeleme eğilimi olabilir.",
    love: "İlişkide kavga ve güç gösterisi konuşur. Kazanan taraf bile yalnız kalabilir.",
    work: "Rekabet, ofis çatışması ve etik olmayan bir zafer öne çıkar.",
    tones: ["conflict", "hurt", "power"],
  },
  "kilic-altilisi": {
    meaning:
      "Kılıç Altılısı, zorlu bir sahneden geçişi anlatır. Tam şifa değil; daha sakin sulara taşıma vardır.",
    mind: "Zihni ‘buradan çıkmalıyız’ ve geçiş planı etrafında duruyor olabilir.",
    heart: "Duygu yorgun fakat umuda doğru kayıyor olabilir.",
    move: "Mesafe alarak ilerleme, konuyu yumuşatma veya ortamı değiştirme eğilimi olabilir.",
    love: "İlişkide fırtınadan çıkış ve daha sakin bir döneme geçiş konuşur.",
    work: "İş değişimi, sorunlu bir dosyayı kapatıp ilerleme öne çıkar.",
    tones: ["movement", "hope", "growth"],
  },
  "kilic-yedilisi": {
    meaning:
      "Kılıç Yedilisi, strateji, giz ve tam görünmeyen bir planı anlatır. Her şey açık söylenmiyor olabilir.",
    mind: "Zihni saklama, dolanma veya ‘nasıl idare ederim’ stratejisi etrafında olabilir.",
    heart: "Duygu tam teslim değildir. Güvensizlik veya gizlenen bir niyet karışmış olabilir.",
    move: "Dolaylı davranış, eksik anlatma veya arkadan dolanma eğilimi olabilir. Her zaman kötü niyet değildir; çekingen taktik de olabilir.",
    love: "İlişkide tam dürüst olunmayan bir alan konuşur. Kart yalan kehaneti değil; açıklığın eksik olduğunu gösterir.",
    work: "Politik hamle, gizlenen plan veya kaynak kaydırma öne çıkar.",
    tones: ["secret", "scatter"],
  },
  "kilic-sekizlisi": {
    meaning:
      "Kılıç Sekizlisi, zihinsel sıkışmayı anlatır. Kişi kendini bağlı hisseder; bağ çoğu zaman düşüncededir.",
    mind: "Zihni ‘çıkış yok’ inancıyla dolu olabilir. Seçenek varken görmüyor olabilir.",
    heart: "Duyguda çaresizlik ve sıkışma duruyor olabilir.",
    move: "Adım atamama, kendini sınırlama veya başkasını suçlayarak yerinde kalma eğilimi olabilir.",
    love: "İlişkide tutsak hissi ve konuşulamayan bağ konuşur.",
    work: "İşin içinde sıkışmışlık, vizyon daralması öne çıkar.",
    tones: ["stuck", "fear", "blocked"],
  },
  "kilic-dokuzlusu": {
    meaning:
      "Kılıç Dokuzlusu, gece düşüncelerini, kaygıyı ve zihnin kendini yemesini anlatır.",
    mind: "Zihni senaryo üretiyor, korkutuyor ve uyutmuyor olabilir. Gerçekten olan, düşünülen kadar ağır olmayabilir.",
    heart: "Duyguda endişe, suçluluk veya korku duruyor olabilir.",
    move: "Kaçınma, aşırı analiz veya iletişimde donma eğilimi olabilir.",
    love: "İlişkide kaygı ve felaket senaryoları konuşur. His gerçek bağdan çok zihnin gölgesiyle karışmış olabilir.",
    work: "İş stresi, uykusuz hesap ve başarısızlık korkusu öne çıkar.",
    tones: ["fear", "burden", "confusion"],
  },
  "kilic-onlusu": {
    meaning:
      "Kılıç Onlusu, bir zihin döngüsünün dibini anlatır. Acı yoğundur; fakat bu son aynı zamanda bitiş kapısıdır.",
    mind: "Zihni ‘bitti, dayanamam’ noktasına gelmiş olabilir. Eski düşünce biçimi çökmüş olabilir.",
    heart: "Duyguda tükenmişlik ve ağır bir kapanış duruyor olabilir.",
    move: "Kopuş, pes etme veya artık aynı savaşı sürdürmeme eğilimi olabilir.",
    love: "İlişkide acı bir eşik ve eski bağ biçiminin çöküşü konuşur.",
    work: "Bir projenin, rolün veya krizin sonu öne çıkar. Dibin ardından yeni zihin gerekir.",
    tones: ["ending", "hurt", "grief"],
  },
  "kilic-prensi": {
    meaning:
      "Kılıç Prensi, meraklı zihni, haberi ve keskin gözlemeyi anlatır.",
    mind: "Zihni soru soruyor, araştırıyor, durumu çözmeye çalışıyor olabilir.",
    heart: "Duygu henüz olgunlaşmamış olabilir. Merak kalpten önce gelir.",
    move: "Mesaj, soru, ani bir söz veya bilgi alma eğilimi olabilir.",
    love: "İlişkide meraklı fakat bazen mesafeli bir zihin konuşur.",
    work: "Araştırma, haber ve öğrenme öne çıkar.",
    tones: ["clarity", "begin", "movement"],
  },
  "kilic-sovalyesi": {
    meaning:
      "Kılıç Şövalyesi, hızlı sözü ve keskin ilerleyişi anlatır. Zihin at koşturur; kalp geride kalabilir.",
    mind: "Zihni hızlı, tartışmacı ve net olmak isteyen bir yerde olabilir.",
    heart: "Duygu aceleye kurban gidebilir. Sertlik, soğukluk karışmış olabilir.",
    move: "Ani mesaj, tartışma veya hızlı bir karar eğilimi olabilir.",
    love: "İlişkide keskin dil ve acele hamle konuşur.",
    work: "Hızlı karar, kriz yönetimi ve keskin iletişim öne çıkar.",
    tones: ["movement", "conflict", "clarity"],
  },
  "kilic-kralicesi": {
    meaning:
      "Kılıç Kraliçesi, bağımsız zekâyı ve dürüst bakışı anlatır. Söz nettir; yanılgıya yer azdır.",
    mind: "Zihni durumu berrak görüyor, sınır koyuyor ve duygusal sisle oyalanmıyor olabilir.",
    heart: "Duygu vardır ama mesafeli ve seçicidir. Kalp kapılarını herkese açmaz.",
    move: "Net cümle, sınır ve bağımsız duruş eğilimi olabilir.",
    love: "İlişkide dürüstlük ve duygusal bağımsızlık konuşur.",
    work: "Analiz, net karar ve yanılmayan bakış öne çıkar.",
    tones: ["clarity", "truth", "distance"],
  },
  "kilic-krali": {
    meaning:
      "Kılıç Kralı, ilkeli zihni ve otoriter hakikati anlatır. Karar mantıkla verilir.",
    mind: "Zihni kural, sonuç ve soğuk değerlendirme üzerinedir.",
    heart: "Duygu ikincildir. Adalet duygusu, romantik yumuşaktan güçlü olabilir.",
    move: "Resmi konuşma, karar açıklama veya mesafeli bir duruş eğilimi olabilir.",
    love: "İlişkide mantık ve ilke konuşur. Kalp ikinci planda kalabilir.",
    work: "Yönetim, strateji ve kesin karar öne çıkar.",
    tones: ["clarity", "power", "truth"],
  },

  "degnek-asi": {
    meaning:
      "Değnek Ası, kıvılcımı, arzuyu ve yeni bir iradeyi anlatır. Ateş yeni yanmıştır.",
    mind: "Zihni ‘istiyorum’ ve yeni bir heves etrafında duruyor olabilir.",
    heart: "Tutkulu, canlı ve uyanmış bir arzu duruyor olabilir.",
    move: "İlk adımı atma, yazma, başlatma eğilimi olabilir.",
    love: "İlişkide taze tutku ve kıvılcım konuşur.",
    work: "Yeni proje, girişim ve yaratıcı ateş öne çıkar.",
    tones: ["begin", "passion", "movement"],
  },
  "degnek-ikilisi": {
    meaning:
      "Değnek İkilisi, dünyayı seyredip plan kurmayı anlatır. Potansiyel vardır; adım henüz tam atılmamış olabilir.",
    mind: "Zihni gelecek planı, seçenek ve ‘nereye gitsem’ üzerine kuruluyor olabilir.",
    heart: "Arzu vardır ama temkinle tutuluyor olabilir.",
    move: "Hazırlık, bekleme veya henüz kapıdan çıkmama eğilimi olabilir.",
    love: "İlişkide potansiyeli tartma ve uzun vadeyi ölçme konuşur.",
    work: "Strateji, büyüme planı ve henüz uygulanmamış vizyon öne çıkar.",
    tones: ["choice", "wait", "growth"],
  },
  "degnek-uclusu": {
    meaning:
      "Değnek Üçlüsü, bakılan ufku ve yola çıkan emeğin ilk dönüşünü anlatır.",
    mind: "Zihni ‘geliyor mu, açılıyor mu?’ beklentisi etrafında duruyor olabilir.",
    heart: "Umut ve genişleme arzusu duruyor olabilir.",
    move: "Beklemekle birlikte hazır duruş; fırsat görünce ilerleme eğilimi olabilir.",
    love: "İlişkide bağın genişlemesi ve geleceğe bakış konuşur.",
    work: "Emeğin sonuç beklemesi, genişleme ve dışa açılma öne çıkar.",
    tones: ["hope", "growth", "wait"],
  },
  "degnek-dortlusu": {
    meaning:
      "Değnek Dörtlüsü, kutlama, yuva ve istikrarlı neşeyi anlatır.",
    mind: "Zihni ‘burası güvenli, burada durulur’ üzerine kuruluyor olabilir.",
    heart: "Sıcak, kutlayan ve ait hisseden bir duygu duruyor olabilir.",
    move: "Davet, paylaşım veya bağı sağlamlaştırma eğilimi olabilir.",
    love: "İlişkide yuva, nişan benzeri bir kutlama veya bağın rahat yüzü konuşur.",
    work: "Ekip başarısı, sağlam zemin ve görünür kutlama öne çıkar.",
    tones: ["joy", "stable", "warm"],
  },
  "degnek-beslisi": {
    meaning:
      "Değnek Beşlisi, rekabeti ve iradelerin çarpışmasını anlatır. Kaos vardır; yok oluş şart değildir.",
    mind: "Zihni tartışma, yarış ve ‘ben de varım’ etrafında olabilir.",
    heart: "Kıskançlık, heyecan ve gerilim karışmış olabilir.",
    move: "Çekişme, inat veya sahneye girip yer kapma eğilimi olabilir.",
    love: "İlişkide ego çatışması ve kıvılcımlı gerilim konuşur.",
    work: "Rekabet, dağınık çaba ve yönsüz mücadele öne çıkar.",
    tones: ["conflict", "passion", "scatter"],
  },
  "degnek-altilisi": {
    meaning:
      "Değnek Altılısı, görünür zaferi ve tanınmayı anlatır. Emek alkışlanır.",
    mind: "Zihni başarı, görülmek ve ‘bu iş oldu’ üzerine duruyor olabilir.",
    heart: "Gurur, coşku ve onaylanma duygusu duruyor olabilir.",
    move: "Öne çıkma, haber verme veya kazancı gösterme eğilimi olabilir.",
    love: "İlişkide görünür bağ ve karşı tarafın seni seçmiş gibi durması konuşur.",
    work: "Tanınma, terfi hissi ve emeğin görünmesi öne çıkar.",
    tones: ["joy", "power", "growth"],
  },
  "degnek-yedilisi": {
    meaning:
      "Değnek Yedilisi, konumunu savunmayı anlatır. Yüksek yerdesin; saldırı da gelebilir.",
    mind: "Zihni ‘yerimi kaptırmayayım’ ve savunma üzerine kuruluyor olabilir.",
    heart: "Kararlılık, gerginlik ve koruma hissi duruyor olabilir.",
    move: "Sınır koyma, direnme veya geri adım atmamak eğilimi olabilir.",
    love: "İlişkide bağını savunma veya dış etkiye karşı durma konuşur.",
    work: "Rekabet karşısında pozisyon koruma öne çıkar.",
    tones: ["conflict", "power", "stuck"],
  },
  "degnek-sekizlisi": {
    meaning:
      "Değnek Sekizlisi, hızı, haberi ve işlerin çabuk ilerlemesini anlatır.",
    mind: "Zihni hızlı akar; beklemeye tahammül az olabilir.",
    heart: "Heyecan ve kıpırtı duruyor olabilir.",
    move: "Mesaj, geliş, ani gelişme eğilimi olabilir. Kart ‘kesin yazacak’ demez; iletişim ve hareket hızlanabilir.",
    love: "İlişkide tempo artışı ve haberleşme konuşur.",
    work: "Hızlı sonuç, seyahat, evrak ve gelişmeler öne çıkar.",
    tones: ["movement", "begin", "hope"],
  },
  "degnek-dokuzlusu": {
    meaning:
      "Değnek Dokuzlusu, yorgun fakat vazgeçmeyen duruşu anlatır. Son savunma hattı vardır.",
    mind: "Zihni ‘bir kez daha yaralanmayayım’ tedbiriyle çalışıyor olabilir.",
    heart: "Yorgunluk, tetikte olma ve hâlâ ayakta kalma hissi duruyor olabilir.",
    move: "Temkinli yaklaşım, sınır, kolay güvenmeme eğilimi olabilir.",
    love: "İlişkide geçmiş yorgunluğun savundurduğu bir kalp konuşur.",
    work: "Tükenmiş ısrar ve son eşiği tutmak öne çıkar.",
    tones: ["burden", "fear", "stable"],
  },
  "degnek-onlusu": {
    meaning:
      "Değnek Onlusu, fazla yükü anlatır. Taşınan demet omuzu eğer.",
    mind: "Zihni sorumluluk listesi ve ‘hepsini ben taşıyorum’ hali etrafında olabilir.",
    heart: "Bastırılmış duygu; yorgun bir bağlılık duruyor olabilir.",
    move: "Erteleme, bunalma veya yükü bırakamama eğilimi olabilir.",
    love: "İlişkide tek taraflı emek ve ağırlık konuşur.",
    work: "Aşırı iş yükü ve devredilemeyen sorumluluk öne çıkar.",
    tones: ["burden", "stuck", "blocked"],
  },
  "degnek-prensi": {
    meaning:
      "Değnek Prensi, hevesli başlangıcı ve keşif ateşini anlatır.",
    mind: "Zihni yeni fikir ve meraklı bir ‘deneyelim’ halinde olabilir.",
    heart: "Hafif, canlı bir kıvılcım duruyor olabilir. Derinlik henüz yok; ateş vardır.",
    move: "İlk temas, deneme, coşkulu fakat süreksiz bir adım eğilimi olabilir.",
    love: "İlişkide flört hevesi konuşur.",
    work: "Yeni öğrenme ve girişim kıvılcımı öne çıkar.",
    tones: ["begin", "passion", "open"],
  },
  "degnek-sovalyesi": {
    meaning:
      "Değnek Şövalyesi, ateşli ilerleyişi anlatır. Macera vardır; sabır az olabilir.",
    mind: "Zihni hız, hedef ve ‘hemen’ üzerine kuruluyor olabilir.",
    heart: "Tutku yüksektir; süreklilik soru işaretli olabilir.",
    move: "Ani geliş, coşkulu hamle, sonra yavaşlama da olabilir.",
    love: "İlişkide tutkulu fakat sabırsız yaklaşım konuşur.",
    work: "Hızlı girişim ve risk öne çıkar.",
    tones: ["passion", "movement", "scatter"],
  },
  "degnek-kralicesi": {
    meaning:
      "Değnek Kraliçesi, özgüvenli ateşi ve çekici duruşu anlatır. Sıcaklık sahibidir.",
    mind: "Zihni ‘ben bilirimi’ ve yaratıcı hakimiyet üzerine duruyor olabilir.",
    heart: "Canlı, çekici ve kendinden emin bir duygu duruyor olabilir.",
    move: "Sahneye çıkma, cazibe ve bağımsız yaklaşım eğilimi olabilir.",
    love: "İlişkide manyetik çekim ve özgüven konuşur.",
    work: "Yaratıcı liderlik ve görünür yetkinlik öne çıkar.",
    tones: ["passion", "warm", "power"],
  },
  "degnek-krali": {
    meaning:
      "Değnek Kralı, vizyoner iradeyi anlatır. Ateş olgunlaşmış, yön vermektedir.",
    mind: "Zihni büyük resim ve liderlik üzerine kuruluyor olabilir.",
    heart: "Tutku vardır; savrulmaz, yönetilir.",
    move: "Yön gösterme, kararlı adım ve sahne alma eğilimi olabilir.",
    love: "İlişkide olgun tutku ve bağa yön verme konuşur.",
    work: "Girişimcilik, yönetim ve vizyon öne çıkar.",
    tones: ["power", "clarity", "growth"],
  },

  "tilsim-asi": {
    meaning:
      "Tılsım Ası, maddi tohumu ve somut bir fırsatı anlatır. Değer filizlenmek ister.",
    mind: "Zihni fırsat, kazanç ve ‘bu tutulmalı’ üzerine duruyor olabilir.",
    heart: "Güven ve somutlaşma arzusu duruyor olabilir. His, zemine basmak ister.",
    move: "Teklifi değerlendirme, somut adım veya yeni bir kapıya girme eğilimi olabilir.",
    love: "İlişkide somutlaşma, ciddiyet ve paylaşılacak zemin konuşur.",
    work: "Yeni iş, gelir kapısı veya değerli bir başlangıç öne çıkar. Garanti değil; tohum vardır.",
    tones: ["begin", "growth", "stable"],
  },
  "tilsim-ikilisi": {
    meaning:
      "Tılsım İkilisi, kaynakları dengelemeyi ve uyumla savrulmayı anlatır.",
    mind: "Zihni ‘ikisini birden nasıl taşırım?’ hesabı etrafında olabilir.",
    heart: "Esneklik vardır; kalp dağınık da olabilir.",
    move: "Ayar değiştirme, idare etme, net seçmeden dengeleme eğilimi olabilir.",
    love: "İlişkide zaman/enerji dengeleme ve kararsız ritim konuşur.",
    work: "Gelir gider, birden fazla iş, esnek idare öne çıkar.",
    tones: ["scatter", "choice", "wait"],
  },
  "tilsim-uclusu": {
    meaning:
      "Tılsım Üçlüsü, ustalığı, birlikte emeği ve işin kalitesini anlatır. Bir şey tek başına değil, omuz omuza inşa edilir.",
    mind: "Zihni ‘bunu birlikte iyi yapalım’, plan, rol paylaşımı ve somut ilerleme üzerine duruyor olabilir. Hayal kurmaktan çok, nasıl inşa edileceğini tartıyor olabilir.",
    heart: "Emeğe saygı, ortak gurur ve ‘yan yana üretmek güzel’ hali duruyor olabilir. His, kaçış değil; katkı ve süreklilik arar. Karşılıklı emek görülünce kalp ısınır. Tamamen geri çekilmekten çok, bağın nasıl geliştirilebileceğini görme isteği duruyor olabilir. Hızlı romantik çıkışlardan çok davranış, emek ve süreklilik önemlidir.",
    move: "İşbirliği, somut üretim, randevuyu aksatmamak, birlikte bir düzen kurmak eğilimi olabilir. Büyük romantik jestten çok, tutulan söz ve görünen emek öne çıkar.",
    love: "Karşılıklı emek verme, birbirini tanıma ve birlikte bir şey inşa etme potansiyeli taşır. Karşı tarafın enerjisinde tamamen geri çekilmekten çok, ilişkinin nasıl geliştirilebileceğini görme isteği olabilir. Bu kart hızlı romantik çıkışlardan çok davranış, emek ve sürekliliği önemser. Sevgi sözünden önce ‘birlikte yapabiliyor muyuz?’ sorusu durur.",
    work: "Zanaat, ekip ve kaliteli çıktı öne çıkar. Görünür emek, doğru işbirliği ve işin hakkını vermek vardır. Tek başına parlamak değil, birlikte sağlam iş çıkarmak konuşur.",
    adviceMeaning:
      "Sözü büyütme, emeği küçültme. Kim ne katıyor, ne aksıyor, birlikte ne inşa ediliyor, oraya bak.",
    futurePotential:
      "Emek sürerse bağ veya iş daha sağlam, daha görünür, daha paylaşılmış bir yapıya evrilebilir. Kalite zamana yayılır; acele parıltı bu kartın dili değildir.",
    tones: ["growth", "stable", "commit"],
  },
  "tilsim-dortlusu": {
    meaning:
      "Tılsım Dörtlüsü, tutmayı, saklamayı ve kaybetme korkusunu anlatır.",
    mind: "Zihni ‘kaptırmayayım’ ve kontrol etrafında kilitli olabilir.",
    heart: "Cömertlik zayıf; korunma güçlü olabilir.",
    move: "Paylaşmama, mesafeyi sıkı tutma veya kaynak/duyguyu kilitleme eğilimi olabilir.",
    love: "İlişkide cimrileşen duygu veya kontrol konuşur.",
    work: "Biriktirme, riskten kaçınma ve sıkı tutulan para öne çıkar.",
    tones: ["blocked", "fear", "stuck"],
  },
  "tilsim-beslisi": {
    meaning:
      "Tılsım Beşlisi, yoksunluk, dışarıda kalma ve maddi/manevi üşümeyi anlatır.",
    mind: "Zihni ‘yeterince yok’ ve dışlanma korkusu etrafında olabilir.",
    heart: "Yalnızlık, endişe ve destek görememe hissi duruyor olabilir.",
    move: "Yardım istememe, çekilme veya kapalı kapı sanma eğilimi olabilir.",
    love: "İlişkide ihmal ve soğukluk konuşur. Kapı aslında yakında olabilir.",
    work: "Para stresi, işsizlik korkusu veya güvencesizlik öne çıkar.",
    tones: ["fear", "burden", "hurt"],
  },
  "tilsim-altilisi": {
    meaning:
      "Tılsım Altılısı, verme ve almayı, yardım dengesini anlatır.",
    mind: "Zihni ‘kim destekliyor, kim borçlu?’ üzerine duruyor olabilir.",
    heart: "Şefkat veya güç dengesizliği karışmış olabilir.",
    move: "Yardım, hediye, destek isteme veya birinin yükünü taşıma eğilimi olabilir.",
    love: "İlişkide veren-alan dengesi konuşur. Tek taraflılık görünür olur.",
    work: "Maaş, destek, sponsorluk veya paylaşım öne çıkar.",
    tones: ["open", "choice", "stable"],
  },
  "tilsim-yedilisi": {
    meaning:
      "Tılsım Yedilisi, hasadı beklemeyi anlatır. Emek atılmıştır; sonuç henüz koparılmaz.",
    mind: "Zihni ‘oldu mu acaba?’ ve sabırsız değerlendirme etrafında olabilir.",
    heart: "Umut ile şüphe karışmış olabilir.",
    move: "Bekleme, kontrol etme, erken koparmama eğilimi olabilir.",
    love: "İlişkide sabır ve emeğin karşılığını bekleme konuşur.",
    work: "Yatırımın olgunlaşması ve erken kararın zararı öne çıkar.",
    tones: ["wait", "hope", "delay"],
  },
  "tilsim-sekizlisi": {
    meaning:
      "Tılsım Sekizlisi, ustalaşmayı ve tekrar eden emeği anlatır. El işi öğrenir.",
    mind: "Zihni ‘çalışayım, gelişeyim’ disiplinine kilitli olabilir.",
    heart: "Gurur sessizdir; bağlılık iş üzerinden akar.",
    move: "İstikrarlı emek, öğrenme ve görünür üretim eğilimi olabilir.",
    love: "İlişkide bağın emekle örülmesi konuşur. Sözden çok iş vardır.",
    work: "Çıraklık, ustalık ve kaliteli tekrar öne çıkar.",
    tones: ["commit", "growth", "stable"],
  },
  "tilsim-dokuzlusu": {
    meaning:
      "Tılsım Dokuzlusu, kendi emeğinin meyvesini anlatır. Bağımsızlık ve konfor öne çıkar.",
    mind: "Zihni ‘ben hallettim’ ve kişisel yeterlilik üzerinedir.",
    heart: "Huzur, gurur ve kendine yetme duruyor olabilir. Paylaşım şart değildir.",
    move: "Kendi alanını koruma veya kazancının tadını çıkarma eğilimi olabilir.",
    love: "İlişkide bağımsızlık ve ‘ben iyiyim’ duruşu konuşur. Yakınlık seçilir, muhtaç olunmaz.",
    work: "Kişisel başarı, birikim ve konfor öne çıkar.",
    tones: ["joy", "stable", "power"],
  },
  "tilsim-onlusu": {
    meaning:
      "Tılsım Onlusu, kalıcı zemin, miras ve aile gibi değeri anlatır.",
    mind: "Zihni uzun vade, güvenlik ve ‘bunu kalıcı kılalım’ üzerinedir.",
    heart: "Aidiyet ve somut güven duruyor olabilir.",
    move: "Kalıcı adım, ortak düzen, ailevi/somut bağ eğilimi olabilir.",
    love: "İlişkide ev, gelecek ve kalıcı birlik konuşur.",
    work: "Kurumsallaşma, miras, uzun vadeli varlık öne çıkar.",
    tones: ["commit", "stable", "growth"],
  },
  "tilsim-prensi": {
    meaning:
      "Tılsım Prensi, öğrenen eli ve pratik haberi anlatır. Tohum çalışkanlıkla gelir; henüz hasat yoktur.",
    mind: "Zihni öğrenme, ‘nasıl yapılır?’, küçük somut adımlar ve temkinli bir başlangıç üzerinedir. Büyük sonucu değil, doğru ilk hamleyi tartıyor olabilir.",
    heart: "Sakin, temkinli bir iyi niyet duruyor olabilir. His sıcak olsa da acele bağlanmaz; güven, tanıyarak büyür. Çekingenlik ilgisizlik olmak zorunda değildir.",
    move: "Mesaj, görüşme, araştırmak, yavaş bir yaklaşım veya küçük ama ciddi bir adım eğilimi olabilir. Büyük söz zayıf; küçük gerçek hareket güçlüdür.",
    love: "Süreç hızlı ilerlemeyebilir fakat daha somut ve güvenilir bir adıma dönüşme potansiyeli taşır. Mesaj, görüşme, küçük ama ciddi bir yaklaşım veya ilişkiyi daha sağlam zeminde ilerletme isteği görülebilir. Büyük sözlerden çok küçük ama gerçek hareketlere bakılır. Öğrenci hali vardır: bağ henüz ustalaşmamıştır, fakat sahici başlayabilir.",
    work: "Staj, yeni iş öğrenme, pratik bir kapı ve emekle filizlenen fırsat öne çıkar. Anında statü değil; çalışarak büyüme vardır.",
    adviceMeaning:
      "Abartılı vaade değil, atılan küçük adıma bak. Öğrenmeye açık dur; acele ustalığa zorlama.",
    futurePotential:
      "Zaman verilirse tohum somut bir düzene dönüşebilir. Yavaş ilerleme, yokluk değil; kök salma olabilir. Acele zorlanırsa filiz kırılır.",
    tones: ["begin", "wait", "stable"],
  },
  "tilsim-sovalyesi": {
    meaning:
      "Tılsım Şövalyesi, yavaş fakat güvenilir ilerleyişi anlatır. At koşmaz; taşır.",
    mind: "Zihni sabır, iş bitirme ve sözünü tutma üzerinedir.",
    heart: "Gösterişsiz bağlılık duruyor olabilir.",
    move: "Yavaş ama somut adım eğilimi olabilir. Acele vaat zayıftır.",
    love: "İlişkide güvenilir, ağır fakat sahici ilerleyiş konuşur.",
    work: "İstikrarlı emek ve teslim edilen iş öne çıkar.",
    tones: ["stable", "commit", "movement"],
  },
  "tilsim-kralicesi": {
    meaning:
      "Tılsım Kraliçesi, toprağı besleyen olgunluğu anlatır. Konfor ve şefkat pratiktir.",
    mind: "Zihni bakım, ev/iş düzeni ve ‘bu büyüsün’ üzerinedir.",
    heart: "Sıcak, cömert ve güven veren bir duygu duruyor olabilir.",
    move: "Somut destek, davet, besleme eğilimi olabilir.",
    love: "İlişkide bakım ve güvenli yakınlık konuşur.",
    work: "Kaynak yönetimi, verimli bakım ve bolluk zekâsı öne çıkar.",
    tones: ["warm", "stable", "growth"],
  },
  "tilsim-krali": {
    meaning:
      "Tılsım Kralı, maddi yetkinliği ve sağlayan otoriteyi anlatır.",
    mind: "Zihni iş, güvenlik ve somut sonuç üzerinedir.",
    heart: "Duygu pratik bağlılıkla karışır. Romantik savrulma zayıftır.",
    move: "Ciddi teklif, düzen kurma veya sağlayıcı duruş eğilimi olabilir.",
    love: "İlişkide ciddiyet ve somut sorumluluk konuşur.",
    work: "Yönetim, varlık ve işin efendiliği öne çıkar.",
    tones: ["power", "commit", "stable"],
  },
};

export function attachReading(card: TarotCard): TarotCard {
  const e = CARD_ESSENCE[card.id];
  if (!e) return card;
  return {
    ...card,
    generalMeaning: e.meaning,
    loveMeaning: e.love,
    feelingsMeaning: e.heart,
    thoughtsMeaning: e.mind,
    actionMeaning: e.move,
    careerMeaning: e.work,
    adviceMeaning: e.adviceMeaning ?? e.mind,
    futurePotential: e.futurePotential ?? e.move,
  };
}

export function tonesOf(id: string): CardTone[] {
  return CARD_ESSENCE[id]?.tones ?? [];
}

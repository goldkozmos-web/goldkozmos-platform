import type { Gender, SignId, SignProfile } from "./types";

type Extra = Partial<
  Pick<
    SignProfile,
    | "character"
    | "inLove"
    | "values"
    | "whenInterested"
    | "whenDistant"
    | "feelingsShown"
    | "workLife"
  >
>;

export const PROFILE_EXTRA: Record<SignId, Record<Gender, Extra>> = {
  koc: {
    kadin: {
      character:
        "Sabah kahvesini bitirmeden kapıya yönelmesi, hayatı bir toplantı ajandası gibi değil, bir eşik gibi yaşamasındandır. Arkadaş çevresinde ‘biraz dur’ cümlesi onu küçültmez; durmanın anlamını sorar. Çocuklukta bile oyun, sıra beklemekten çok ilk adımı kapmaktı. Bu, olgunlaşmamışlık değil; Mars’ın öncü ateş burcunda yönün bedende uyanmasıdır. Kitap okur, plan yapar, sonra planın kendisini eşiğin yerine koymasından sıkılır. Yalnız kalmayı bilir. Yalnızlığı, kimse onu seçmediği için değil, seçimin canlı kalması için ister. Bu ayrım anlatılmazsa çevre onu ‘bencil’ okur. Bencillik değil, iradenin nefesidir.",
      inLove:
        "Sevgide Koç kadını, suskun bir bekleyişi romantik bir sınav gibi taşımaz. Sınav varsa açıktır: birlikte bir yere gidilecek midir, yoksa duygu masada unutulacak mıdır? Partnerinin onu ‘sakinleşmesi gereken bir çocuk’ gibi eğitmesi, yakınlığı artırmaktan çok utandırır. Utanç, bu burç yapısında öfkeye çevrilebilir. Öfke kişilik kaderi değil, eşiğin çiğnenmesidir. Özür geldiğinde uzun nutuk beklemez; yeni bir adım ister. Bu sadelik küçümsenirse ikinci kapı daralır.",
    },
    erkek: {
      character:
        "Koç erkeğinin masasında işler üst üste binebilir; zihin yürürken netleşir. Arkadaşlarına karşı da aynı damar işler: dolaylı ima yerine ‘ne oldu?’ Koç erkeği her kapıyı tek başına açmak zorunda değildir; zorunda hissetmesi Mars’ın bakımsız halidir. Spor salonunda, trafikte, kriz anında beden düşünür. Bu, incelik yoksunluğu değil, ateşin organıdır. Yumuşaklık, hız kesilince görünür: hasta bir dost, kırılmış bir plan, utançla söylenen bir cümle.",
      inLove:
        "Aşkta ‘ben hallederim’ cümlesi hem armağan hem gölgedir. Armağan tarafı, partnerini yalnız bırakmamaktır. Gölge tarafı, partnerin temposunu saygısızlık sanmaktır. Koç erkeği kıskançlık afişi taşımaz; seçilmediğini sandığı anda sahneyi terk etme refleksi daha sık çalışır. Geri dönüş, şiirden çok yeni bir tekliftir. Teklif küçümsenirse gurur kilitlenir.",
      feelingsShown:
        "Duygu bazen bir yolda, farların içinde, iş bitince sızar. Ağır itiraf sahneyi fazla uzun açık tutmak gibi durabilir. Partneri yalnızca kelime beklerse çevirmen eksik kalır. Çevirmen, eylemi dile bağlayan küçük bir cümledir; o cümle öğrenilebilir.",
    },
  },
  boga: {
    kadin: {
      character:
        "Boğa kadınının evi çoğu zaman bir vitrin değil, sinir sisteminin iskelesidir. Kumaş, ışık, yemek, para — bunlar süs değil, dünyanın eline batmamasını sağlayan dokunuşlardır. Değişim geldiğinde önce beden durur: omuz kapanır, iştah kayar, ses kısılır. Bu inat afişi değil, sabit toprağın alarmıdır. Arkadaşları onu ‘sağlam’ bilir; sağlamlık, her rüzgârda kök sökmeyen bir bahçedir. Venüs burada flört numarası değil, değer atfetme sanatıdır. Kime masa kurulur, kime kurulmaz — bu envanter sessiz tutulur.",
      inLove:
        "Sevgide acele öpücükten çok, kalınan zamanı çoğaltır. Partnerinin onu ‘sıkıcı düzen’ diye utandırması, yakınlığı tiyatroya çevirir. Boğa kadını dram aramaz; dramın altındaki savurganlığı kaldıramaz. Savurganlık para da olabilir, söz de, gece de. Güven, yarının da aynı masada kurulmasıyla büyür. Kıskançlık her Boğa kadınına yapışık değildir; savrulan bağ bedeni tedirgin eder.",
      workLife:
        "İşinde emeğin göründüğü yerde canlıdır. Görünmeyen emek — ev, bakım, düzen — küçümsenirse karakter huysuz sanılır. Asıl aranan, ritmin kopmamasıdır. Toplantı üstüne toplantı onu öldürmez; anlamı kopuk koşuşturma boğar.",
    },
    erkek: {
      character:
        "Boğa erkeği sessizliği boşluk diye doldurmak zorunda hissetmez. Sessizlik sindirmedir. Para ve konfor vitrin değil, yarının çökmemesi için kurulan iskeledir. Sabit nitelik vazgeçmemeyi sebat da inat da yapabilir. İnat, güvenlik ihtiyacı adlandırılmadan kaldığında büyür. Zekâsı pratiktir; işe yaramayan fikri uzatmaz. Bu, hayal yoksunluğu değil, toprağın süzgecidir.",
      inLove:
        "Dokunuş, zaman ve somut özen onun dilidir. Partneri yalnızca konuşma beklerse dil yok sanılır. Dil vardır: tamir edilen bir şey, beklenen bir saat, kurulan bir masa. Acele ısı onu kaçırabilir; yavaş ısı kök salar. Uzaklaşınca ritim kesilir. Masa kurulmaz. Bu ceza gibi durabilir; sinir sisteminin kapanmasıdır.",
      feelingsShown:
        "Öfke geç ve ağır çıkabilir çünkü beden önce durur. Şefkat bir yemekle, bir bekleyişle, bir ‘yanındayım’ın tekrarıyla sızar. Tekrar, sıkıcılık değil, Venüs toprağının sadakatidir.",
      workLife:
        "Zanaat, finans, tarım, tasarım, beden — emeğin göründüğü iş onu besler. Kaos ritmi koparırsa kapanır. Kapanmak terk değildir; toprağın kışıdır.",
    },
  },
  ikizler: {
    kadin: {
      character:
        "İkizler kadınının zihni bir kavşaktır: tabela geç gelir diye yol yok değildir. Öğrenmek onun için sadakatin bir biçimidir; kişiye, konuya, şehre tekrar dönmek. Kalabalık besler, gürültü dağıtır. Bu ayrım anlatılmazsa ‘yüzeysel’ etiketi yapışır. Yüzey, henüz güvenli derinlik bulunamadığında durulan yerdir. Merkür dünyayı dile çevirir; çeviri bitmezse ev kurulamaz ama çeviri yasaklanırsa nefes kesilir.",
      inLove:
        "Sevgide önce dil, sonra beden ısınabilir. Partnerinin onu tek sahneye hapsetmesi yakınlığı öldürür. Derinlikten korkmaz; derinlik adına konuşmanın yasaklanmasından korkar. Sözün yarın inkâr edilmesi, bu hava burcunda ihanete yakın çalınabilir. Kaçış bazen şakadır. Şaka görülürse yumuşar.",
      workLife:
        "Yazı, satış, öğretim, medya, çeviri, ağ — çeşitlilik olan iş canlıdır. Tekdüze büro merakı koparırsa kaçar. Kaçış, işe ihanet değil, Merkür’ün duran havayı sevmemesidir.",
    },
    erkek: {
      character:
        "İkizler erkeğinin mizahı savunma da olabilir, köprü de. Sessizlik onda bazen sıkılmış bir zihindir. Değişken hava uyumu hem armağan hem savrulma yapar. Tabela seçilmeden kavşak şenliği ev olmaz. Bu hüküm değil, rüzgârın bakımıdır.",
      inLove:
        "Sohbet, espri, ortak merak — yakınlık buradan kurulur. Cevap durursa rüzgâr kayabilir; her kayış ilgisizlik değildir. Zor histe şaka artabilir. Partneri yalnızca ağır sessizlik beklerse dil sahte sanılır. Dil vardır: paylaşılmış fikir, yarın inkâr edilmeyen söz.",
      feelingsShown:
        "Duygu çoğu zaman şiir değil, ‘bunu seninle konuşmak istedim’dir. Ağır itiraf geç gelebilir çünkü cümle henüz ikinci cümleyi görmeden bitmez. Bitirmek öğrenilir.",
      workLife:
        "Medya, satış, öğretim, yazı, ağ bu damarı besler. Mikro yönetim merakı koparır.",
    },
  },
  yengec: {
    kadin: {
      character:
        "Yengeç kadınının hafızası müze gibi işler: nesne değil, atmosfer saklanır. Öncü su yuvayı beklenen bir şey gibi değil, kurulan bir şey gibi başlatır. Beslemek dilidir. Beslenmeyen yerde kabuk kapanır. Ay atmosferi okur; odadaki soğuma cümleden önce gelir. Bu ‘huysuzluk’ afişi değil, gelgit organıdır. Geçmişe tutunmak kökü koparmadan yürümek isteyebilir; zincire döndüğünde bakımsız Ay’dır.",
      inLove:
        "İçeri alma daveti sahiplenme değildir. Acele teşhir kabuğu kapatır. Çekilme her zaman vazgeçiş değildir; korunmadır. Partneri çekilmeyi terk sanırsa ev soğur. Aidiyet alay konusu edilince su karışır. Kıskançlık evrensel damga değildir; dışarıda bırakılma korkusu daha sık çalışır.",
      workLife:
        "Eğitim, mutfak, bakım, mekân, hatıra taşıyan iş canlıdır. Soğuk kurumsal dil aidiyeti koparırsa kaçar. Kaçış, işe ihanet değil, evin soğumasıdır.",
    },
    erkek: {
      character:
        "Yengeç erkeği liman gibi toplanır. Fırtınada içeride, güneşte açık. Koruma içgüdüsü kontrol kaderi değildir; aidiyet organıdır. Geçmiş hem kök hem zincir olabilir. Beslemek dilidir. Anlatılmazsa ‘içe kapanık’ okunur.",
      inLove:
        "Seni içeri aldım — bu cümle jestten ağırdır. Kabuk zorla kırılmasın ister. Çekilme vazgeçiş sanılırsa ev soğur. Yumuşak özen geri getirir; sert yüzleşme Ay’ı kaçırır.",
      feelingsShown:
        "Duygu cümleden önce beden ve özenle gelir. Öfke dolaylı olabilir. Partneri yalnızca nutuk beklerse dil yok sanılır. Dil vardır: hatırlanan küçük şey, korunan gece.",
      workLife:
        "Bakım, mekân, aile, hatıra taşıyan iş canlıdır. Aidiyet koparsa kaçar.",
    },
  },
  aslan: {
    kadin: {
      character:
        "Aslan kadınının cömertliği görülmezse ocak gurura çekilir. Güneş ego kaderi değil, yaşam ısısını dağıtma organıdır. Görünür olmak teşhircilik değil, varlığın inkâr edilmemesidir. Sabit ateş sadakati taç gibi taşır; taç düşerse ev soğur. Oyun, sanat, liderlik, çocuk bu damarı besler. ‘Çok fazla’ diye kısılmak, yakınlığı artırmaktan çok utandırır.",
      inLove:
        "Seçim ilan edilmek ister: jest, bakış, ‘seninleyim’in ısısı. Sahte alkış doyurmaz. Silinme korkusu kıskançlıktan daha sık çalışabilir. Yalvarma Güneş’i kaçırır; onurlu jest geri getirir. Partnerinin onu sahnesiz bırakması, bağı gizli bir utanca çevirir.",
      workLife:
        "Görünür emek, sahne, liderlik, yaratım, eğitim canlıdır. Küçümseyen hiyerarşi ısısını kaçırır. Isı kaçınca iş de ev de donabilir.",
    },
    erkek: {
      character:
        "Aslan erkeğinin ocağı ısınır, ışık verir, bakılmazsa gurura çekilir. Cömertlik armağandır. Takdir sahte olmasın ister. Sabit nitelik sadakati kilitler. Görünür olmak inkâr edilmemektir.",
      inLove:
        "Yakınlık onurlu bir bağdır. Alenen küçümsenmek güveni eritir. İlgi görülmezse kalkan iner. Kalkan kader değil, bakımsız Güneş’tir. Onurlu jest onarır.",
      feelingsShown:
        "Jest, ilan, ısı — duygu buradan sızar. Öfke gururdan, şefkat cömertlikten gelir. Partneri yalnızca fısıltı beklerse dil gösteriş sanılır. Dil vardır: seçimin görünür kılınması.",
      workLife:
        "Liderlik ve yaratım canlıdır. Küçümseyen hiyerarşi ısısını kaçırır.",
    },
  },
  basak: {
    kadin: {
      character:
        "Başak kadınının kumaşı okunur: sökük görülür, onarılır. Kusursuzluk aramaz; kusurun yok sayılmasını kaldıramaz. Merkür eleştiri kaderi değil, dünyayı kullanılabilir kılma iştahıdır. Emeği görünmezse ‘huysuz’ etiketi yapışır. Asıl aranan, faydanın sayılmasıdır. Değişken toprak uyumu hem hizmet hem kaygı yapabilir. Kaygı adlandırılırsa dağılır.",
      inLove:
        "İşe yarar jest davettir, kontrol değil. Hayatınızı kolaylaştırmak tuzak değildir. Emek görülmezse geri çekilir. Düzeltmeyi sevgi sanmak gölgedir; gölge, eleştirisiz bir cümleyle yumuşar. Özgürlük kusursuz olmak zorunda kalmamaktır.",
      workLife:
        "Sağlık, editörlük, zanaat, analiz, hizmet — ayrıntının anlam taşıdığı iş canlıdır. Anlamsız kusur avı tüketir.",
    },
    erkek: {
      character:
        "Başak erkeğinin atölyesi söküğü onarır. Niyet yıkmak değil, işe yarar kılmaktır. Emeği görülmezse kapanır. Ayrıntı zekâsı süs değil, tamirdir.",
      inLove:
        "Kelime az, hizmet çok olabilir. Partneri yalnızca şiir beklerse dil yok sanılır. Dil vardır: sadeleştirilen gün, hatırlanan ihtiyaç. Eleştiri kaygının kılığına girebilir. Eleştirisiz cümle onarır.",
      feelingsShown:
        "Şefkat iş bitince sızabilir. Öfke düzeltme kılığında gelebilir. Bu kader değil, bakımsız topraktır.",
      workLife:
        "Ayrıntının anlam taşıdığı iş canlıdır. Anlamsız kusur avı tüketir.",
    },
  },
  terazi: {
    kadin: {
      character:
        "Terazi kadınının kolu kayınca tüm oda kayar. Karar gecikmesi seçeneksizlik değil, iki gerçeği birden taşıma çabası olabilir. Çatışmayı sevmez diye güçsüz değildir; çatışmanın çirkinleşmesini sevmez. Venüs süs kaderi değil, değerleri güzellikle bağlama sanatıdır. Öncü hava ilişkiyi başlatır. Başlatmak bitirmek demek değildir.",
      inLove:
        "Masa karşılıklıdır. Tek taraflı emek tartıyı bozar. Kaba haklılık yakınlığı öldürür. Gerçeği geciktirmek ikiyüzlülük gibi durabilir; çirkin çatışma korkusudur. Adil konuşma geri getirir. Özgürlük başkasının gözünde kaybolmamaktır.",
      workLife:
        "İnsan, estetik, hukuk, tasarım, diplomasi bu damarı besler. Tek taraflı güç tüketir.",
    },
    erkek: {
      character:
        "Terazi erkeği ayna ve masa kurar. Sosyal-estetik zekâ adaletsizliği çabuk görür. Çatışmanın çirkinleşmesi kapatır. Karar gecikmesi iki gerçeği taşıma çabası olabilir.",
      inLove:
        "Zarafet ve dinleme davettir. Tek taraflılık tartıyı bozar. Partneri yalnızca ham patlama beklerse dil yok sanılır. Dil vardır: adil dikkat, incelikli jest.",
      feelingsShown:
        "Öfke gecikir çünkü çirkinleşmesin ister. Şefkat uyumla sızar. Erteleme bakımsız terazidir; adlandırılırsa konuşulur.",
      workLife:
        "Hukuk, tasarım, diplomasi canlıdır. Tek taraflı güç tüketir.",
    },
  },
  akrep: {
    kadin: {
      character:
        "Akrep kadınının kuyusu üstten düz, alttan katmanlıdır. Kalabalığı ruhunun envanteri gibi kullanmamayı tercih edebilir; bu asosyal kader değildir. Gülmesi geç gelebilir çünkü eşik ciddidir. Plüton bitmiş görünen duygunun altında çalışan dönüşüm ısısıdır. Mars sınır ihlaline keskin cevap verebilir. Güç, alkış değil, mahremiyeti yönetebilmektir. ‘Bütün Akrep kadınları kıskançtır’ cümlesi bu sayfada yok; var olan, yoğunluğu hafife alınınca sertleşebilen sudur.",
      inLove:
        "Sizi sessiz bölgesine almak büyük ilandan ağırdır. Erken söz onda ucuz değil ağırdır. Test varsa bırakılma korkusunun erken provasıdır; fark edilirse yumuşar. Partnerinin onu ‘çok yoğun’ diye eğlenceli hafifliğe zorlaması utandırır. İkiyüzlülüğü kaldıramaz. Kusursuz partner aramaz.",
      workLife:
        "Araştırma, kriz, terapi, finansın görünmeyen yüzü, sanatın karanlık katmanı bu damarı besler. Anlamı kopuk işte tükenir. Para konusunda kontrol, cimrilik değil eşiği kaybetmeme çabası olabilir.",
    },
    erkek: {
      character:
        "Akrep erkeğinin kilidi herkese kopya çıkarılmaz. Göz odadaki güç kaymasını okur; bu manipülasyon kaderi değil, hayatta kalma zekâsının ilişkiye taşınmasıdır. Mizah geç ve kuru gelebilir. Yalnızlığı her zaman seçmez; ruhunun envanterini rastgele dağıtmamayı seçer.",
      inLove:
        "Spektrum izni: sizi gölgesine de alır. Sırınızı silah yapmamak sevgi göstergesidir. Bağın başka gözlerde seyredilmesi suyu karartabilir. Erken söz ağırdır. Sessiz sabitleşme takip değil eşik ölçmektir.",
      feelingsShown:
        "Sadakatin sessizliği dilin yerini tutabilir. ‘Seni seviyorum’ bazen krizden sonra gelir. Partneri yalnızca günlük cıvıltı beklerse dil yok sanılır. Çeviri anahtarı mahremiyettir.",
      workLife:
        "Kriz, araştırma, finans, cerrahi netlik bu damarı besler. Anlamı kopuk iş tükenir. Günlük hayatta düzeni güvenlik için ister; savurganlık eşiği kaybetme korkusunu büyütür. Bu cimrilik hükmü değil, kilit meselesidir. Partnerinin mahremiyeti alay konusu etmesi, işteki netliği evde de keskinleştirebilir. Keskinlik kader değil, bakımsız Mars’tır. Tek bir gerçek cümle ve korunan sır, hem işte hem evde omurga olabilir. Dönüşüm ısısı bitmiş sanılan dosyaları yeniden anlamlandırabilir; aynı ısı, adlandırılmazsa şüpheye döner.",
    },
  },
  yay: {
    kadin: {
      character:
        "Yay kadını dar odada küçülür, anlamda büyür. Jüpiter şans kaderi değil, hayatı büyüten iştahtır. Dürüstlük keskinleşebilir; bu kabalık değil, dar yalanı sevmemektir. Öğrenmek, gezmek, öğretmek damarı besler. Değişken ateş uyumu hem macera hem savrulma yapar. Tabela yoksa harita şenliği ev olmaz.",
      inLove:
        "Ortak yol, açık söz, ‘hadi görelim’. Yuva kurabilir; yuvanın kafes olmamasını ister. Partnerinin onu evcil hayvan gibi düzenlemesi yakınlığı öldürür. Vaat küçülmeden tutulsun ister. Zor histe yola çıkmak terk gibi durabilir; daralmış nefestir.",
      workLife:
        "Öğretim, yayın, seyahat, inanç, spor — anlam taşıyan iş canlıdır. Anlamsız mikro yönetim kaçırır.",
    },
    erkek: {
      character:
        "Yay erkeğinin haritasında durak zorunlu değildir ama durak konuşulmazsa vaat uçar. Keskin dürüstlük dar yalanı sevmez. Ufuk küçümsenmesin ister.",
      inLove:
        "Nefes, ortak plan, kahkaha. Özgürlük aldatma izni değil, ufkun kilitlenmemesidir. Tutulmuş küçük söz geri getirir. Ayrıntı körlüğü bakımsız Jüpiter’dir.",
      feelingsShown:
        "İyimser cümle duygu kılığına girebilir. Zor histe yol çağırır. Partneri yalnızca ağır sessizlik beklerse dil kaçış sanılır. Dil vardır: açık ufuk, tutulmuş söz.",
      workLife:
        "Öğretim, yol, yayın canlıdır. Mikro yönetim kaçırır.",
    },
  },
  oglak: {
    kadin: {
      character:
        "Oğlak kadını hevesle değil, durarak kanıtlanır. Satürn ceza kaderi değil, zamana form veren omurgadır. Duyguyu ertelemeyi güvenlik sanabilir. İtibar vitrin değil, emeğin çiğnenmemesidir. Dağ yolu yavaştır, düşülünce tekrar çıkılır. ‘Soğuk’ etiketi içini yok saysın istemez.",
      inLove:
        "Zor günde durmak jestten ağırdır. Acele ısı kaçırabilir. Ciddiye alınmama tedirginliği kıskançlık afişinden daha sık çalışır. Tutulmuş söz ve ölçülü yakınlık onarır. Şov aramaz, duruş arar.",
      workLife:
        "Yapı, yönetim, zanaat, hukuk, uzun iş canlıdır. Anlamsız şov tüketir.",
    },
    erkek: {
      character:
        "Oğlak erkeğinin iskelesi yarının çökmemesi içindir. Uzun vadeli zekâ bugünün alkışını tartar. Duyguyu ertelemek gölgedir. Omurga alay konusu edilmesin ister.",
      inLove:
        "Emek ve sadakat dilidir. Partneri yalnızca erken şiir beklerse dil yok sanılır. Dil vardır: zor günde kalmak, sözü zamana yaysa da tutmak.",
      feelingsShown:
        "Şefkat geç sızabilir çünkü görev önce gelir. Bu ilgisizlik değil, Satürn dilidir. Öğrenilmiş çeviri, görevi duyguya bağlar.",
      workLife:
        "Yapı ve uzun iş canlıdır. Anlamsız şov tüketir.",
    },
  },
  kova: {
    kadin: {
      character:
        "Kova kadınının anteni sıradanı geçer. Dostluk aşkın rakibi değil, omurgası olabilir. Farklılık cezalandırılırsa ‘uzak’ etiketi yapışır. Uranüs şok ve özgünlük, Satürn anlaşmanın iskeletidir. Sabit hava ilkeleri kilitler. Zihnin hapiste olmaması nefes payıdır.",
      inLove:
        "Boğmadan yanındayım — bu cümle soğukluk değil davettir. Acele sahiplenme anteni kapatır. Sadakati ilke gibi taşır; ilke çiğnenirse elektrik kesilir. Beden zihin ısındıktan sonra gelebilir. Bu gecikme his yoksunluğu değildir.",
      workLife:
        "Teknoloji, topluluk, yenilik, bilim, sivil zekâ canlıdır. Ruhsuz hiyerarşi kaçırır.",
    },
    erkek: {
      character:
        "Kova erkeği mesafe ve içtenliği aynı odada tutabilir. Soğuk görünmesi hissetmediği anlamına gelmez. İlkeler kilitlenir. Anten boğulmasın ister.",
      inLove:
        "Fikir ve elektrik davettir. Farklılık ihanet sayılmasın ister. Fikirle kaçmak boğulma refleksi olabilir. Nefes payı geri getirir.",
      feelingsShown:
        "Duygu çoğu zaman paylaşılmış gelecekte sızar. Öfke ilke çiğnenince gelir. Partneri yalnızca gelgit beklerse dil yok sanılır.",
      workLife:
        "Yenilik ve topluluk canlıdır. Ruhsuz hiyerarşi kaçırır.",
    },
  },
  balik: {
    kadin: {
      character:
        "Balık kadını odanın atmosferini içer. Sınır geç gelir diye sınır yok değildir; inşa edilir. Neptün kaçış kaderi değil, görünmeyeni duyma organıdır. Başkasının acısını taşımak erdemdir; sınır yoksa erimeye döner. Sanat, rüya, müzik, bakım damarı besler. ‘Naif’ etiketi hassasiyeti ezmesin ister.",
      inLove:
        "Birleşme merhamet gibi hissedilsin ister. Kaba netlik ürkütür; tutulmuş küçük gerçek açar. Vaadin sis içinde kaybolması güveni eritir. Sise çekilmek kayıtsızlık gibi durabilir; boğulma refleksidir.",
      workLife:
        "Sanat, bakım, müzik, şifa canlıdır. Ruhsuz keskinlik dağıtır.",
    },
    erkek: {
      character:
        "Balık erkeğinin kıyısı gelgitlidir. Net tablo geç kurulur. Sezgi zekâdır. Sınır erimesi bakımsız Neptün’dür. İnsanı insan olarak görmek armağandır.",
      inLove:
        "Atmosfer, dokunuş, ‘seni içimde taşıyorum’. Omurga yumuşak tutulsun ister. Küçük gerçek sisden ağırdır. Partneri yalnızca keskin cümle beklerse dil yok sanılır.",
      feelingsShown:
        "İmge, müzik, dokunuş. Öfke dağılabilir, şefkat taşabilir. Çeviri, imgeyi küçük gerçeğe bağlamaktır.",
      workLife:
        "Sanat ve şifa canlıdır. Ruhsuz keskinlik dağıtır.",
    },
  },
};

export function mergeProfile(base: SignProfile, extra?: Extra): SignProfile {
  if (!extra) return base;
  const keys = Object.keys(extra) as (keyof Extra)[];
  const out = { ...base };
  for (const key of keys) {
    const add = extra[key];
    if (!add) continue;
    const current = out[key];
    out[key] = current ? `${current} ${add}` : add;
  }
  return out;
}

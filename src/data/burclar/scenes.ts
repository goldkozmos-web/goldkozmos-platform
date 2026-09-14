import type { Gender, SignId } from "./types";

export const SCENES: Record<SignId, Record<Gender, string>> = {
  koc: {
    kadin:
      "Bir Koç kadınının günü çoğu zaman kapı tokmağında başlar: dışarı çıkılacak mı, yoksa masa bir kez daha ertelenecek mi? Asansörde bile yön arar. Arkadaşının ‘bir düşünelim’ cümlesi onu küçültmez, ama düşünmenin eylemin yerini almasını yorar. Spor, yürüyüş, ani bir yol, yarım kalmış bir mesaj — bunlar karakter afişi değil, ateşin günlük organıdır. Akşam olduğunda özür uzun olmasın ister; yeni bir plan olsun ister. Bu sadelik, derinlik yoksunluğu sanılır. Derinlik, onun için ertelenmiş hayatın içinde değil, seçimin canlı tutulduğu yerdedir. Yalnız yemek yiyebilir. Yalnızlık cezası değil, iradenin nefesidir. Partneri bu nefesi terk sanırsa ev erken soğur. Soğuma, ateşin sönmesi değil, eşiğin çiğnenmesidir.",
    erkek:
      "Koç erkeğinin gününde işler üst üste binebilir çünkü zihin yürürken netleşir. Trafikte, sahada, mutfakta ‘hadi’ kelimesi sık duyulur. Bu kaba bir emir değil, kıvılcımın dile gelmesidir. Arkadaş meclisinde dolaylı ima onu yorar. Krizde yön tarif eder; tarife alkış beklemeyebilir, duruş bekler. Akşam yorgunluğu yumuşaklığı getirir: hasta bir dost, kırık bir plan, utançla söylenen kısa bir cümle. Yumuşaklık yok değildir; hız kesilince görünür. Partneri yalnızca gündüzkü kıvılcımı görürse geceki şefkati kaçırır. Kaçırmak, burcun suçu değil, çevirmenin eksikliğidir.",
  },
  boga: {
    kadin:
      "Boğa kadınının günü ışık, kumaş ve kahve kokusuyla kurulur. Bu lüks afişi değil, sinir sisteminin iskelesidir. Market listesi, fatura, çarşafın dokusu — küçük şeyler onun için dünyanın eline batmamasını sağlar. Değişim haberi geldiğinde önce beden durur: omuz, iştah, ses. Durmak inat diye okunur. İnat, güvenlik adlandırılmadan kaldığında büyür. Akşam yemeği bir sahne değil, ‘buradayız’ın tekraridir. Tekrar sıkıcılık sanılır. Sıkıcılık değil, Venüs toprağının sadakatidir. Partneri ritmi alay konusu ederse masa kalkar. Kalkan masa terk değildir; kışın toprağıdır.",
    erkek:
      "Boğa erkeğinin gününde tamir, bekleme ve sessizlik yan yana durur. Sessizliği doldurmak zorunda hissetmez. Para konuşması vitrin değil, yarının çökmemesi içindir. İş bitince el yıkanır, masa kurulur, beden yaklaşır. Bu şiir değildir; topraktır. Partneri yalnızca konuşma beklerse elin dilini kaçırır. Elin dili, ‘yanındayım’ın tekraridir. Acele ısı kaçırır, yavaş ısı kök salar. Kök sökülmesin ister. Sökülme ihanet gibi çalınabilir; aslında bahçenin alarmıdır.",
  },
  ikizler: {
    kadin:
      "İkizler kadınının günü sekmeden sekmeye, mesajdan mesaja akar. Bu dağınıklık kaderi değil, Merkür’ün dünyayı dile çevirme iştahıdır. Öğrendiği şeyi birine anlatmak onun için sadakatin bir biçimidir. Kalabalık besler, gürültü dağıtır. Akşam olduğunda ikinci bir kapı arar: kitap, dizi, kısa bir yürüyüş, yarım bir cümle. Tek sahneye hapsolmak nefesi keser. Partneri bu nefesi uçarı diye okursa ev sıkılır. Sıkılmak ihanet değildir; duran havanın alarmıdır. Söz yarın inkâr edilmesin ister. İnkar, bu burçta ihanete yakın çalınabilir.",
    erkek:
      "İkizler erkeğinin günü kavşaktır. Tabela geç gelir diye yol yok değildir. Mizah köprü de olur savunma da. Sessizlik bazen sıkılmış zihindir. İşte çeşitlilik canlı tutar; mikro yönetim merakı koparır. Akşam sohbeti, ‘bunu seninle konuşmak istedim’ cümlesiyle ısınır. Partneri yalnızca ağır sessizlik beklerse dil sahte sanılır. Dil vardır: paylaşılmış fikir. Zor histe şaka artabilir. Şaka görülürse yumuşar. Görülmezse rüzgâr kayabilir. Kayış her zaman ilgisizlik değildir.",
  },
  yengec: {
    kadin:
      "Yengeç kadınının günü evin atmosferiyle kurulur: ışık soğudu mu, ses sertleşti mi, biri dışarıda mı kaldı? Ay bu soruları organ gibi sorar. Yemek, hatıra, çamaşır, bir mesajın tonu — bunlar ev işi değil, aidiyetin dokusudur. Çekilme öğleden sonra gelebilir. Çekilme vazgeçiş sanılırsa kabuk kalınlaşır. Akşam yumuşak bir özen kabuğu inceltebilir. Sert yüzleşme Ay’ı kaçırır. Geçmiş müze gibi taşınır. Müze zincire döndüğünde bakımsız sudur. Beslenmeyen yerde ev soğur. Soğuma, burcun suçu değil, gelgitin bakımıdır.",
    erkek:
      "Yengeç erkeğinin günü liman ile açık deniz arasında salınır. Koruma içgüdüsü kontrol diye okunur. Kontrol kaderi değildir; aidiyet organıdır. İş yerinde bile odanın soğumasını duyar. Akşam içeri alma daveti gelir: çay, sessizlik, ‘buradasın’. Kabuk zorla kırılmasın ister. Kırılmak teşhir gibi çalınır. Partneri çekilmeyi terk sanırsa ev erken kışa girer. Kış, vazgeçiş değil, korunmadır. Yumuşak özen baharı getirir.",
  },
  aslan: {
    kadin:
      "Aslan kadınının günü ısının dağıtılmasıyla geçer: bir jest, bir bakış, bir işin görünür kılınması. Güneş ego kaderi değil, ocaktır. Ocak bakılmazsa gurura çekilir. Öğle yemeği bile sahne olabilir; sahne teşhir değil, varlığın inkâr edilmemesidir. ‘Çok fazla’ diye kısılmak utandırır. Utanç, öfkeye veya soğumaya çevrilebilir. Akşam onurlu bir jest ocağı yeniden yakar. Yalvarma Güneş’i kaçırır. Cömertlik görülmezse taç ağırlaşır. Taç düşmesin ister. Düşmek, alkış bitmesi değil, seçimin görünmez kalmasıdır.",
    erkek:
      "Aslan erkeğinin gününde iş görünür olsun ister. Küçümseyen hiyerarşi ısısını kaçırır. Arkadaş meclisinde cömertlik armağandır. Takdir sahte olmasın ister. Sahte alkış doyurmaz. Akşam seçim ilan edilmek ister: jest, bakış, ‘seninleyim’. Partneri yalnızca fısıltı beklerse dil gösteriş sanılır. Dil vardır: onurlu ısı. Gurur kalkanı bakımsız Güneş’tir. Onurlu jest kalkanı indirir. Yalvarma indirmez.",
  },
  basak: {
    kadin:
      "Başak kadınının günü sökük ve iğneyle geçer. Liste, mail, evin bir köşesi, bedenin bir işareti — ayrıntı zekâsı burada çalışır. Kusursuzluk aramaz; kusurun yok sayılmasını kaldıramaz. Emeği görünmezse huysuz sanılır. Asıl aranan faydanın sayılmasıdır. Öğle arası birini hayatı kolaylaştırmak davettir, kontrol değil. Akşam eleştiri kaygı kılığına girebilir. Eleştirisiz bir cümle odayı yumuşatır. Düzeltmeyi sevgi sanmak gölgedir. Gölge adlandırılırsa tamire döner. Anlamsız kusur avı tüketir. Tüketim, burcun suçu değil, bakımsız topraktır.",
    erkek:
      "Başak erkeğinin günü atölyedir. İşe yaramayan cümle uzamaz. El tamir eder, zihin ayıklar. Partneri yalnızca şiir beklerse elin dilini kaçırır. Elin dili sadeleştirilen gündür. Akşam hizmet kesilirse bu ceza gibi durabilir; kaygının dilidir. Eleştirisiz cümle geri getirir. Kusursuz olmak zorunda kalmamak özgürlüktür. Özgürlük özensizlik değildir. Özensizlik güveni inceltebilir.",
  },
  terazi: {
    kadin:
      "Terazi kadınının günü tartıyla geçer: kimin emeği fazla, hangi cümle çirkinleşti, masa kaydı mı? Venüs süs kaderi değil, adaleti güzellikle bağlama sanatıdır. Çatışmayı sevmez diye güçsüz değildir; çirkinleşmesini sevmez. Öğle vakti karar gecikebilir. Gecikme seçeneksizlik değil, iki gerçeği taşıma çabası olabilir. Akşam adil bir konuşma tartıyı düzeltir. Tek taraflı emek tartıyı bozar. Kaba haklılık yakınlığı öldürür. Özgürlük başkasının gözünde kaybolmamaktır. Kaybolmak, zarafetin bakımsız halidir.",
    erkek:
      "Terazi erkeğinin günü ayna ve masadır. Sosyal zekâ adaletsizliği çabuk görür. Çatışma çirkinleşince kapanır. Akşam incelikli jest duygu kılığına girer. Partneri yalnızca ham patlama beklerse dil yok sanılır. Dil vardır: adil dikkat. Gerçeği geciktirmek ikiyüzlülük gibi durabilir; çirkinleşme korkusudur. Adil konuşma korkuyu dağıtır. Tek taraflılık tartıyı bozar.",
  },
  akrep: {
    kadin:
      "Akrep kadınının günü eşikle geçer: kime kapı açıldı, hangi söz mahrem kaldı, kim üçüncü göz oldu? Kuyu üstten düzdür. Gülme geç gelebilir. Geç gelmesi soğukluk değil, eşiğin ciddiye alınmasıdır. Öğle vakti bir cümleyi hatırlar, rastlantıyı azaltır. Bu tuzak değil, ölçümdür. Akşam tek bir gerçek cümle kapıyı aralayabilir. Cümle küçümsenirse ikinci eşik açılmayabilir. Yoğunluk hafife alınınca su sertleşebilir. Sertleşme kader cümlesi değil, bakımsız Plüton’dur. Sır silah yapılmasın ister. Yapılırsa kilit döner.",
    erkek:
      "Akrep erkeğinin günü kilit ve envanterle geçer. Kalabalıkta kaybolabilir; envanteri rastgele dağıtmamayı seçer. Göz güç kaymasını okur. Bu manipülasyon kaderi değil, hayatta kalma zekâsıdır. Akşam spektrum izni: sizi gölgesine de alır. Sır silah yapılmasın ister. Partneri yalnızca cıvıltı beklerse sadakatin sessizliğini kaçırır. Sessizlik yokluk değildir. Krizden sonra gelen cümle geç kalmış değil, eşiğin kendisidir.",
  },
  yay: {
    kadin:
      "Yay kadınının günü haritayla geçer: bir video, bir kitap, bir bilet, bir ‘hadi’. Jüpiter şans kaderi değil, iştahtır. Dar oda küçültür. Öğle yemeği bile ufuk konuşmasına dönebilir. Dar yalanı sevmez. Keskin dürüstlük kabalık sanılır. Kabalık değil, kafes korkusudur. Akşam tutulmuş küçük bir söz büyük vaatten ağırdır. Vaat uçmasın ister. Zor histe yola çıkmak terk gibi durabilir; daralmış nefestir. Yuva kurabilir. Yuva kafes olmasın ister.",
    erkek:
      "Yay erkeğinin günü tabela ve yoldur. Durak konuşulmazsa vaat uçar. Öğretim, kahkaha, ani plan. Mikro yönetim kaçırır. Akşam açık söz duygu kılığına girer. Partneri yalnızca ağır sessizlik beklerse dil kaçış sanılır. Dil vardır: ufuk ve tutulmuş söz. Ayrıntı körlüğü bakımsız Jüpiter’dir. Körlük adlandırılırsa durak seçilir.",
  },
  oglak: {
    kadin:
      "Oğlak kadınının günü zaman çizelgesiyle geçer. Heves değil, duruş. Satürn ceza kaderi değil, omurgadır. Öğle vakti iş biter, duygu bekler. Beklemek ilgisizlik sanılır. İlgisizlik değil, görevin önce gelmesidir. Akşam tutulmuş söz ve ölçülü yakınlık odayı ısıtır. Acele ısı kaçırır. Ciddiye alınmama tedirginliği kıskançlık afişinden sık çalışır. İtibar vitrin değil, emeğin çiğnenmemesidir. Dağ yolu düşülünce tekrar çıkılır. Çıkmak, soğukluk değil, sebattır.",
    erkek:
      "Oğlak erkeğinin günü iskele kurmakla geçer. Yarının çökmemesi. Uzun vadeli zekâ bugünün alkışını tartar. Akşam emek duygu kılığına girer. Partneri yalnızca erken şiir beklerse dil yok sanılır. Dil vardır: zor günde kalmak. Katılık bakımsız Satürn’dür. Ölçülü yakınlık katılığı yumuşatır. Şov aramaz. Duruş arar.",
  },
  kova: {
    kadin:
      "Kova kadınının günü antenle geçer: sıradan ritmi geçer, tuhaf olanı okur. Dostluk omurgadır. Farklılık cezalandırılırsa uzak etiketi yapışır. Öğle vakti bir fikir, bir topluluk, bir elektrik. Acele sahiplenme anteni kapatır. Akşam ‘boğmadan yanındayım’ cümlesi soğukluk sanılır. Soğukluk değil, nefes payıdır. İlke çiğnenirse elektrik kesilir. Kesilme terk değil, sabit havanın alarmıdır. Beden zihin ısındıktan sonra gelebilir. Gecikme his yoksunluğu değildir.",
    erkek:
      "Kova erkeğinin günü mesafe ve içtenliği aynı odada tutar. Soğuk görünmesi hissetmediği anlamına gelmez. Yenilik, topluluk, gelecek. Ruhsuz hiyerarşi kaçırır. Akşam fikir duygu kılığına girer. Partneri yalnızca gelgit beklerse elektriği kaçırır. Elektrik yokluk değildir. Fikirle kaçmak boğulma refleksi olabilir. Nefes payı geri getirir.",
  },
  balik: {
    kadin:
      "Balık kadınının günü atmosferle geçer: müzik, ışık, birinin sesindeki çatlak. Neptün kaçış kaderi değil, görünmeyeni duyma organıdır. Öğle vakti başkasının acısı içeri sızabilir. Sızmak erdemdir; sınır yoksa erimeye döner. Akşam tutulmuş küçük gerçek sisden ağırdır. Kaba netlik ürkütür. Sise çekilmek kayıtsızlık gibi durabilir; boğulma refleksidir. Sanat, rüya, bakım damarı besler. Ruhsuz keskinlik dağıtır. Dağılmak, burcun suçu değil, kıyının bakımıdır.",
    erkek:
      "Balık erkeğinin günü kıyıdır. Net tablo geç kurulur. Sezgi zekâdır. Akşam imge, dokunuş, müzik. Partneri yalnızca keskin cümle beklerse dili kaçırır. Dil vardır: yumuşak gerçek. Sınır erimesi bakımsız Neptün’dür. Omurga yumuşak tutulsun ister. Küçük gerçek sisden ağırdır. Ağırlık, yalanın değil, tutulmuş sözün ağırlığıdır.",
  },
};

import type { Sign, SignId } from "./types";

export type SignOverviewCopy = {
  metaDescription: string;
  brief: string;
  dateRange: string;
  element: string;
  modality: string;
  ruling: string;
  character: string;
  strengths: string;
  challenges: string;
  love: string;
  relationships: string;
  friendship: string;
  career: string;
  woman: string;
  man: string;
  compatibility: string;
};

export const SIGN_OVERVIEWS: Record<SignId, SignOverviewCopy> = {
  koc: {
    metaDescription:
      "Koç burcu özellikleri: tarih aralığı, Mars, ateş elementi, karakter, aşk ve ilişki dili. Koç kadını, Koç erkeği ve aşk uyumu sayfalarına geç.",
    brief:
      "Koç burcu, astrolojik haritada yılın ilk kapısı gibi durur: işi uzatmadan yönünü belli etmek ister. Bu sayfa Koç’u cinsiyet profili olarak değil, burcun ortak damarı olarak okur. Editorial bir haritadır; kader cümlesi değildir. Koç, durağanlığı kişilik sanmaz; seçimin canlı kalmasını ister.",
    dateRange:
      "Koç burcunun klasik tarih aralığı 21 Mart – 19 Nisan’dır. Güneş’in bu dilimde durduğu kişiler ‘Koç burcu’ diye anılır. Sınır günlerinde yükselen, Ay ve diğer gezegenler tabloyu değiştirebilir; tek tarih, tek karakter demek değildir.",
    element:
      "Koç’un elementi ateştir. Ateş burada ısınmak için değil, yön vermek için yanar. Fikir masada bekletilince sönmez; harekete bağlanamayınca sıkılır. Su burcunun gelgiti, toprak burcunun sebatı, hava burcunun kelimesi Koç’ta ikinci plandadır; önce kıvılcım, sonra cümle gelir.",
    modality:
      "Niteliği öncüdür. Öncü burç kapıyı açar, ‘hazır mıyız?’ sorusunu yolda sorar. Koç’ta bu, her işe pat diye atlamak değil; başlanmamış hayatın onu sis gibi yormasıdır. Sabit burçlar kalıcılık, değişken burçlar esneklik ister; Koç ise eşiğin kendisini sever.",
    ruling:
      "Yönetici gezegeni Mars’tır. Mars, kaba kuvvet kaderi değil; irade, kas, sınır ve ‘şimdi’ hissidir. Bakımlı Mars net teklif üretir. Bakımsız Mars kapıyı erken çarpar. Koç burcunu anlamak, öfkeyi teşhis etmek değil; kıvılcımın nereye düştüğünü seyretmektir.",
    character:
      "Temel karakter, hareketle düşünen bir omurgadır. Analizi beden yürürken tamamlar. Dolaylı ima onu zekâsız kılmaz, tempo düşürür. Gururu örtüsüzlüktendir: doğrudan konuştuğu için kırılganlığı da açıktadır. Rekabet çoğu zaman dış düşmandan çok, kendi durağanlığını kırma refleksidir. Yumuşaklık yok değildir; hız kesilince görünür.",
    strengths:
      "Güçlü yönü, korkunun odadaki tek ses olmasına izin vermemesidir. Dürüst başlangıç, diri irade ve ‘sonra’yı kutsal saymama, birçok işi ve bağı gerçekten açar. Krizde yön tarif edebilir. Sahte incelik yerine canlı duruş sunar.",
    challenges:
      "Zorlayıcı yönü, hızın onarımın yerini almasıdır. Sabırsızlık, yarım bırakılmış konuşma ve öfkenin erken çıkışı iz bırakabilir. Partnerinin temposunu saygısızlık sanmak, ateşin bakımsız halidir. Bu bir hüküm değil, ritim öğrenilecek bir eşiktir.",
    love:
      "Aşkta Koç sevgiyi bekletilmiş bir dosya gibi biriktirmekten çok, bakışta ve kararda göstermeyi yeğler. Yakınlık ‘yanında durmak’tan ziyade birlikte bir yere doğru hareket etmektir. Seçildiğini hissetmediği yerde sahneyi terk etme refleksi görülebilir; bu soğukluk değil, iradenin tanınmasını istemektir.",
    relationships:
      "İlişkilerde sözün dolandırılmaması bağın kumaşıdır. İma edilen kırgınlık, açık bir cümleden daha çok yorar. Sadakat büyük nutuktan çok, zor anda yanında durmaktır. Erteleme, Koç dilinde bazen ihanete yakın bir soğukluk gibi çalınır; anlatılmazsa öfke gibi görünür.",
    friendship:
      "Arkadaşlıkta Koç, sahte yumuşaklık yerine dürüst ısı sunar. Planı erteleyen, karar vermeyen çevrede çabuk sıkılır. Dostluğu bir macera çağrısı gibi kurabilir: gel, gidelim, halledelim. Uzun sessizlikleri ‘alındım’ diye okumaz; daha çok, ateşin yön aradığını düşünür.",
    career:
      "İş ve kariyerde kararın yürüdüğü masada canlıdır. Bürokrasi küçültmez ama anlamı koparırsa isyan eder. Liderlik unvan istemez; işin önünün açılmasını ister. Spor, saha, girişim, kriz anı bu damarı besleyebilir. Rutin öldürmez; rutinin nedeni yoksa sıkılır.",
    woman:
      "Koç kadını, bu genel damarın kadın sayfasında ayrı yazılmıştır: tempo, teklif ve iradenin tanınması orada daha yakın plandan okunur. Cinsiyet klişesi değildir; aynı ateşin başka bir anlatı katmanıdır.",
    man:
      "Koç erkeği sayfası, duygunun eylemle kanıtlanması, erken öfke ve sade onarım dilini ayrıca ele alır. Genel Koç sayfası burcun omurgasını; erkek sayfası o omurganın gündelik jestlerini anlatır.",
    compatibility:
      "Koç aşk uyumu, tek bir ‘en iyi burç’ listesi değil; tempo, element ve onarım biçiminin çarpışmasıdır. Klasik haritada Aslan, Yay, İkizler ve Terazi ile daha az çeviri isteyebilir. Tüm çiftler Burç Aşk Uyumu alanında, tek canonical kombinasyonla okunur.",
  },
  boga: {
    metaDescription:
      "Boğa burcu özellikleri: 20 Nisan–20 Mayıs, Venüs, toprak elementi, karakter, aşk ve ilişki ritmi. Boğa kadını, erkeği ve uyum sayfalarına geç.",
    brief:
      "Boğa burcu, hayatı bir fırtına gibi değil, her gün kurulan bir masa gibi tutmak ister. Bu sayfa Boğa’yı kadın veya erkek profili olarak değil, burcun ortak toprağı olarak okur. Editorialdir. Boğa, konforu tembellik sanmaz; bedenin ev gibi hissedilmesini ister.",
    dateRange:
      "Boğa burcunun klasik aralığı 20 Nisan – 20 Mayıs’tır. Sınır tarihlerinde Güneş başka burca kayabilir; yükselen ve Ay, ‘sabit toprak’ tablosunu yumuşatır veya sertleştirir. Tarih bir etiket, karakter bir spektrumdur.",
    element:
      "Elementi topraktır. Toprak burada ağırlık değil, duyusal zekâdır: koku, dokunuş, yemek, para, ritim. Ateş Boğa’nın masasını sarsar, hava kelimeye çevirir, su şefkat katar. Boğa ise somut olanın yarına kalmasını ister.",
    modality:
      "Niteliği sabittir. Sabit burç yerinden oynamayan bir bağ ve düzen kurabilir; kilit ya yuva olur ya da inat. Öncü burç menteşeyi değiştirmek ister, Boğa menteşenin gıcırdamasını sorar. Değişim ihanet değildir; Boğa bunu bedeninde geç öğrenir.",
    ruling:
      "Yönetici gezegeni Venüs’tür. Venüs burada flört reklamı değil; değer, güzellik, dokunuş ve ‘bu bana yeter’ hissidir. Bakımlı Venüs özen üretir. Bakımsız Venüs sahip olma korkusuna döner. Boğa’yı anlamak, onu yerinden kırmak değil; masayı birlikte kurmaktır.",
    character:
      "Temel karakter, acele cümleden çok kanıtlanmış duruşla konuşur. Sözü az, izi kalıcıdır. Sebat hem armağan hem dirençtir. Beden ritmi bozulunca ruh da bozulur gibi durur. Bu, her Boğa’nın inatçı olduğu anlamına gelmez; ritmi kaybedince kendine gelemediği anlamına gelebilir.",
    strengths:
      "Güçlü yönü sebat, duyusal zekâ ve somut şefkattir. Krizde nutuk atmaz, masayı kurar, faturayı öder, eli tutar. Sadakati spektrum ilanı değil, yarın da orada olmaktır.",
    challenges:
      "Zorlayıcı yönü değişime direnç, sahip olma korkusu ve inattır. Rutin bozulunca ihanet gibi duyabilir. Para ve duygu savurganlığı onu güvensizliğe iter. Bu kader değil; toprağın bakımsız kaldığı andır.",
    love:
      "Aşkta Boğa sevgiyi dokunuş, ritim ve ‘yanındayım’ın tekrarında kurar. Yakınlığı aceleyle değil, ısınan bir oda gibi açar. Sözün yarın da durması, jest kalabalığından daha çok şey söyler.",
    relationships:
      "İlişkilerde güvenlik alay konusu edilmesin ister. Tempo sürekli değişen partner, Boğa’nın sinir sistemini ‘sevgi’ diye değil ‘tehlike’ diye okuyabilir. Sadakat somut özenle büyür: yemek, ev, para, dokunuş. Anlatılmazsa inat gibi görünür.",
    friendship:
      "Arkadaşlıkta Boğa az kişiye çok yer açar. Kalabalık eğlence onu soğutmaz ama rastgele dağılma yorar. Dostluğu bir masa gibidir: gel, otur, kal. Kaybolan arkadaşlığı kolay unutmaz; unutmaması kin değil, toprağın hafızasıdır.",
    career:
      "İş ve kariyerde somut sonuç, düzen ve değer üretimi öne çıkar. Finans, sanatın maddi yüzü, gastronomi, zanaat, beden işi bu damarı besleyebilir. Anlamı kopuk, sürekli pivot eden işlerde çabuk tükenir. Para konusunda savurganlıktan çok tutma eğilimi görülebilir; bu cimrilik değil, masayı kaybetmeme çabası olabilir.",
    woman:
      "Boğa kadını sayfası, beden ritmi, duyusal sadakat ve ‘ev gibi hissedilmek’ ihtiyacını ayrı anlatır. Genel sayfa burcun toprağını; kadın sayfası o toprağın yakın plandaki jestlerini verir.",
    man:
      "Boğa erkeği sayfası, yavaş ısınma, somut özen ve değişimi ihanet gibi duymayı ayrıca işler. İki metin aynı paragrafın kopyası değildir; aynı damarın iki kapısıdır.",
    compatibility:
      "Boğa aşk uyumu, tempo ve güvenlik dilinin çarpışmasıdır. Yengeç, Başak, Oğlak ve Balık ile daha az çeviri isteyebilir. Tüm kombinasyonlar Burç Aşk Uyumu hub’ında ve çift sayfalarında tek canonical URL ile durur.",
  },
  ikizler: {
    metaDescription:
      "İkizler burcu özellikleri: 21 Mayıs–20 Haziran, Merkür, hava elementi, merak, aşk ve iletişim. İkizler kadını, erkeği ve uyum linkleri.",
    brief:
      "İkizler burcu, bağı tek sahneye kilitlemekten çok konuşarak çoğalan bir yol gibi yaşamak ister. Bu sayfa cinsiyet profili değil, burcun ortak havasıdır. Editorialdir. İkizler, hafiflik ile zekâyı karıştırmaz; tek role hapsolmayı sis gibi duyar.",
    dateRange:
      "Klasik aralık 21 Mayıs – 20 Haziran’dır. Merkür retrosu ve yükselen, ‘çift kapı’yı daha da çoğaltabilir. Tarih bir kapı; harita bir koridordur.",
    element:
      "Elementi havadır. Hava burada boşluk değil, dil, merak, köprüdür. Ateş kelimeye yön katar, toprak uçuşu yere indirir, su hissi ağırlaştırır. İkizler önce konuşur, sonra yerleşme kararı verir.",
    modality:
      "Niteliği değişkendir. Değişken burç esner, uyarlanır, dağılabilir. Sabit burç tek hat ister, öncü burç kapı açar; İkizler ise kapıları sayar. Esneklik ihanet değildir; bakımsız kalınca kararsızlık gibi görünür.",
    ruling:
      "Yönetici gezegeni Merkür’dür. Merkür haber, zihin, el, şaka ve çeviridir. Bakımlı Merkür köprü kurar. Bakımsız Merkür konuyu dağıtır, sözü yarın inkâr eder gibi durur. İkizler’i anlamak, onu ‘ikiyüzlü’ ilan etmek değil; hangi kapının açık olduğunu sormaktır.",
    character:
      "Temel karakter meraktır. Hızlı bağlar, espriyle yumuşatır, sıkılınca konuyu değil odayı değiştirebilir. Zekâ pratik ve çeviktir. Tek rol — ‘hep ciddi ol’ veya ‘hep eğlen’ — onu küçültür. Çift kapı kişilik bozukluğu değil; uyum zekâsının burç dilindeki adıdır.",
    strengths:
      "Güçlü yönü uyum, zekâ ve köprü kurmadır. Dağılan masayı cümleyle toparlayabilir. Dostlukta ve işte taze hava getirir. Merak, birçok hayatı gerçekten açar.",
    challenges:
      "Zorlayıcı yönü dağılma, yüzeyde kalma korkusu ve kararsızlıktır. Zor duyguda konuyu dağıtmak, bağın kumaşını inceltebilir. Sözün yarın inkâr edilmesi güveni çatlatır. Bu kader değil; havanın bakımsız halidir.",
    love:
      "Aşkta İkizler sevgiyi paylaşılmış fikir, şaka ve taze hava gibi taşır. Yakınlığı oyun ve dil üzerinden açar. Sıkılmadan dinlenen bir zihin, jest kalabalığından daha erotik gelebilir. Tek sahneye kilitlenmek, ona kafes gibi durabilir.",
    relationships:
      "İlişkilerde zihnin küçümsenmemesi bağın omurgasıdır. Partnerin ‘ciddi ol’ baskısı, İkizler’i soğutabilir. Sadakat nutuktan çok, sözün yarın da aynı masada durmasıdır. Dağılan dikkat anlatılmazsa vefasızlık sanılır.",
    friendship:
      "Arkadaşlıkta İkizler kalabalıkla ısınır, tek kişiyle derinleşebilir. Mesaj, şaka, rastgele buluşma onun şefkat dilidir. Uzun süren sessiz drama yorar. Dostluğu bir sohbet koridoru gibi tutar: kapılar açık, hava temiz olsun ister.",
    career:
      "İş ve kariyerde yazı, satış, medya, eğitim, dil, lojistik, kısa döngülü projeler bu damarı besler. Tek düze, anlamı kopuk, konuşmanın yasak olduğu masalarda tükenir. Zekâsını kullanamadığı iş, ona yoksulluk gibi gelir; para azlığı değil, merak azlığıdır.",
    woman:
      "İkizler kadını sayfası, çift kapı, dilin çevikliği ve tek role hapsolmama ihtiyacını ayrı katmanda anlatır. Genel sayfadaki hava, orada gündelik jestlere iner.",
    man:
      "İkizler erkeği sayfası, meraka bağlı bağ, dağılma ve onarım cümlesini ayrıca işler. Kopya metin değil; aynı Merkür’ün ikinci kapısıdır.",
    compatibility:
      "İkizler aşk uyumu, zihin temposunun çarpışmasıdır. Terazi, Kova, Koç ve Aslan ile daha az çeviri isteyebilir. Çift sayfalarına Burç Aşk Uyumu alanından ve aşağıdaki linklerden ulaşılır.",
  },
  yengec: {
    metaDescription:
      "Yengeç burcu özellikleri: 21 Haziran–22 Temmuz, Ay, su elementi, yuva, aşk ve şefkat. Yengeç kadını, erkeği ve aşk uyumu.",
    brief:
      "Yengeç burcu, bağı bir sözleşme gibi değil, içeri alınan bir ev gibi kurmak ister. Bu sayfa cinsiyet değil, burcun ortak suyudur. Editorialdir. Yengeç, hassasiyeti zayıflık sanmaz; aidiyetin alay konusu edilmemesini ister.",
    dateRange:
      "Klasik aralık 21 Haziran – 22 Temmuz’dır. Ay’ın evresi ve yükselen, gelgiti büyütür veya kabuğu kalınlaştırır. Tarih bir ev eşiği, harita odaların düzenidir.",
    element:
      "Elementi sudur. Su burada gözyaşı klişesi değil; hafıza, atmosfer, koruma içgüdüsüdür. Ateş evi ısıtır da yakabilir, toprak masa verir, hava cümleye çevirir. Yengeç önce hisseder, sonra adlandırır.",
    modality:
      "Niteliği öncüdür. Öncü su, kapıyı şefkatle açar: ‘gel içeri’. Sabit su (Akrep) eşiği kilitler, değişken su (Balık) erir. Yengeç’te öncülük, yuva kurma hamlesidir; herkese açık ev demek değildir.",
    ruling:
      "Yöneticisi Ay’dır. Ay beden, alışkanlık, gece, yemek, çocukluk evi ve ruh halidir. Bakımlı Ay şefkat üretir. Bakımsız Ay kabuğa çekilir, geçmişe tutunur. Yengeç’i anlamak, onu ‘çok hassas’ diye indirgemek değil; gelgiti okumaktır.",
    character:
      "Temel karakter yuva içgüdüsü ve gelgit duygudur. Dolaylı konuşabilir; hissi önce beden, sonra cümle taşır. Hafızası uzundur: küçük özeni de küçük ihmali de saklar. Koruyan şefkat, bazen boğucu bakım gibi durabilir; niyet evdir, yöntem öğrenilir.",
    strengths:
      "Güçlü yönü şefkat, hafıza ve yuva kurmadır. Krizde besler, hatırlar, içeri alır. Birçok bağ, bu ev olmadan açılmaz.",
    challenges:
      "Zorlayıcı yönü çekilme, geçmişe tutunma ve dolaylı kırgınlıktır. Kırgınlığı kabuğun içine götürmek, partneri ‘ne oldu?’ sisinde bırakır. Bu kader değil; suyun bakımsız halidir.",
    love:
      "Aşkta Yengeç sevgiyi beslemek, hatırlamak ve korumak üzerinden gösterir. Yakınlığı korunmuş bir oda gibi açar. Aidiyet bozulunca güven incelir. Küçümsenmeyen duygu, jest kalabalığından daha çok şey söyler.",
    relationships:
      "İlişkilerde evin — somut veya duygusal — dağılmaması omurgadır. Partnerin sert mizahı, Yengeç’te alay gibi çalınabilir. Sadakat, zor gecede odada kalmaktır. Anlatılmazsa kıskançlık veya sulugözlük sanılır.",
    friendship:
      "Arkadaşlıkta Yengeç az kişiye ev kapısı açar. Hastalık, kriz, doğum günü, yemek: şefkat somut gelir. Kalabalık partide kaybolabilir. Unutulan dostluğu kolay affetmez; affetmemesi kin değil, evin ihlal edilmesidir.",
    career:
      "İş ve kariyerde bakım, eğitim, mutfak, mekân, kriz desteği, aile işi bu damarı besler. Anlamı kopuk, duygusuz, ‘sadece rakam’ masalarda tükenir. Başarıyı evine götüremediği iş, ona yarıda kalmış hayat gibi gelir.",
    woman:
      "Yengeç kadını sayfası, yuva, gelgit ve koruyan şefkati yakın plandan anlatır. Genel sayfa burcun evini; kadın sayfası o evin odalarını verir.",
    man:
      "Yengeç erkeği sayfası, kabuk, dolaylı kırgınlık ve şefkatin erkek dilindeki jestlerini ayrıca işler. Aynı su, başka kap.",
    compatibility:
      "Yengeç aşk uyumu, aidiyet dilinin çarpışmasıdır. Akrep, Balık, Boğa ve Başak ile daha az çeviri isteyebilir. Çiftler Burç Aşk Uyumu sayfasında canonical URL’lerle durur.",
  },
  aslan: {
    metaDescription:
      "Aslan burcu özellikleri: 23 Temmuz–22 Ağustos, Güneş, ateş elementi, yürek, aşk ve görünürlük. Aslan kadını, erkeği ve uyum.",
    brief:
      "Aslan burcu, bağı gizli bir dosya gibi değil, onurla taşınan bir seçim gibi göstermek ister. Bu sayfa cinsiyet profili değil, burcun ortak güneşidir. Editorialdir. Aslan, görünürlüğü ego sanmaz; yüreğinin ‘sahne’ diye geçiştirilmemesini ister.",
    dateRange:
      "Klasik aralık 23 Temmuz – 22 Ağustos’tur. Güneş’in kendi burcunda durduğu bu dilim, ‘ışıltı’yı büyütür; yükselen sahneyi başka yere kaydırabilir.",
    element:
      "Elementi ateştir. Ateş burada kıvılcım (Koç) veya ufuk (Yay) değil; yürek ısısıdır. Toprak sahneyi eve çevirir, hava alkışı kelimeye bağlar, su ışıltıyı yumuşatır. Aslan ısınmak ve ısıtmak ister.",
    modality:
      "Niteliği sabittir. Sabit ateş, bir kez seçtiği sahneyi kolay bırakmaz. Öncü ateş kapı açar, değişken ateş yolu değiştirir; Aslan ise onuru sabit tutar. Kilit ya cömert sadakat olur ya da gurur kalkanı.",
    ruling:
      "Yöneticisi Güneş’tir. Güneş yaşam ısısı, görünürlük, yürek ve ‘ben buradayım’ hissidir. Bakımlı Güneş cömertlik üretir. Bakımsız Güneş takdir açlığına döner. Aslan’ı anlamak, onu narsist ilan etmek değil; ısının samimi olup olmadığına bakmaktır.",
    character:
      "Temel karakter yürek ısısı ve görünür olmadır. Dramatik olabilir; niyeti yüceltir, küçümsenince sahneyi terk eder. Cömerttir: dikkat, hediye, koruma. Gurur kırılgandır çünkü ışıltı örtüsüzlüktür.",
    strengths:
      "Güçlü yönü cömertlik, cesaret ve ısındırmadır. Odadaki enerjiyi yükseltebilir. Sadakati ilan edilir; gizli dosya gibi yaşamaz.",
    challenges:
      "Zorlayıcı yönü gurur, takdir açlığı ve sahne kaybı korkusudur. Gururu kalkan yapmak, bağın kumaşını inceltebilir. Samimi takdir gelmezse ışıltı öfkeye döner. Bu kader değil; güneşin bakımsız halidir.",
    love:
      "Aşkta Aslan sevgiyi görünür kılar: jest, ilan, ‘seni seçiyorum’un ısısı. Yakınlığı ışıltı ve yürekle açar. Alenen küçümsenmek, onu soğutur. Sahte alkış, yokluktan daha çok yaralar.",
    relationships:
      "İlişkilerde onur ve samimi takdir omurgadır. Partnerin alaylı mizahı, Aslan’da ihanet gibi çalınabilir. Sadakat, seçimi açıkça taşımaktır. Anlatılmazsa ego sanılır.",
    friendship:
      "Arkadaşlıkta Aslan masayı ışıtır, hesabı üstlenir, doğum gününü unutmaz. Küçümsenen jest, dostluğu çabuk soldurur. Kalabalık sahne onu besler; sahnesiz bırakılmak yalnızlık değil, görünmezliktir.",
    career:
      "İş ve kariyerde sahne, eğitim, liderlik, yaratıcı iş, çocuk, spor, görünür marka bu damarı besler. Emeği görünmeyen, alkışsız, ‘arka oda’ işlerde ısısı düşer. Başarı, onurla taşınmak ister; gizlilik burcun dili değildir.",
    woman:
      "Aslan kadını sayfası, yürek, görünür seçim ve cömert sadakati yakın plandan anlatır. Genel sayfa güneşi; kadın sayfası o ısının jestlerini verir.",
    man:
      "Aslan erkeği sayfası, onur, sahne ve takdir dilini ayrıca işler. Aynı Güneş, başka anlatı.",
    compatibility:
      "Aslan aşk uyumu, görünür seçim ve gururun çarpışmasıdır. Koç, Yay, İkizler ve Terazi ile daha az çeviri isteyebilir. Çiftler Burç Aşk Uyumu’nda canonical durur.",
  },
  basak: {
    metaDescription:
      "Başak burcu özellikleri: 23 Ağustos–22 Eylül, Merkür, toprak, özen, aşk ve iş. Başak kadını, erkeği ve aşk uyumu sayfaları.",
    brief:
      "Başak burcu, bağı nutukla değil, düzeltilen küçük şeylerle canlı tutmak ister. Bu sayfa cinsiyet değil, burcun ortak toprağıdır. Editorialdir. Başak, mükemmeliyetçiliği kişilik sanmaz; emeğinin görünmesini ister.",
    dateRange:
      "Klasik aralık 23 Ağustos – 22 Eylül’dür. Merkür’ün buradaki hali, ayrıntı zekâsını büyütür veya kaygıyı keskinleştirir. Tarih bir liste başı, harita maddelerdir.",
    element:
      "Elementi topraktır. Toprak burada Boğa’nın duyusal konforu veya Oğlak’ın iskeleti değil; tamir, sadeleştirme, işe yarar kılmadır. Ateş listeyi yakabilir, hava analizi çoğaltır, su kaygıyı ıslatır.",
    modality:
      "Niteliği değişkendir. Değişken toprak uyarlanır, düzeltir, dağıtabilir. Sabit toprak kilitler, öncü toprak yapı kurar; Başak ise küçük eşiği onarır. Esneklik, kusursuzluk takıntısı değildir; bakımsız kalınca eleştiri gibi durur.",
    ruling:
      "Yöneticisi Merkür’dür. Merkür burada haberden çok zanaat, analiz, beden-zihin köprüsüdür. Bakımlı Merkür faydalı şefkat üretir. Bakımsız Merkür kusuru sevgi sanır. Başak’ı anlamak, onu ‘huysuz’ ilan etmek değil; özenin nereye aktığını görmektir.",
    character:
      "Temel karakter ayrıntı zekâsı ve hizmettir. Kesin konuşur, kusuru görür, niyeti düzeltmek olsa da kulağa eleştiri gibi gelebilir. Kendini yeterince görmeme, başkasını düzeltme refleksine dönebilir.",
    strengths:
      "Güçlü yönü özen, zekâ ve faydalı şefkattir. Hayatı kolaylaştırır. Krizde liste yapar, işi böler, fayda üretir.",
    challenges:
      "Zorlayıcı yönü kaygı, eleştiri ve kendini küçültmedir. Düzeltmeyi sevgi sanmak bağı yorar. Dağınıklık güvensizlik gibi çalınabilir. Bu kader değil; toprağın bakımsız halidir.",
    love:
      "Aşkta Başak sevgiyi işe yarar kılmak, düzeltmek, sadeleştirmek üzerinden taşır. Yakınlığı temiz, dikkatli bir dokunuşla açar. Emeğin takdir edilmesi, ilan kalabalığından daha çok şey söyler.",
    relationships:
      "İlişkilerde özensizlik — sözde, evde, bedende — bağın kumaşını inceltebilir. Partnerin ‘takma’ cümlesi, Başak’ta görünmezlik gibi durur. Sadakat, küçük şeylerin tamiridir. Anlatılmazsa kontrol sanılır.",
    friendship:
      "Arkadaşlıkta Başak yardım eder, hatırlar, pratik çözüm getirir. Sürekli dağınık, sözünde durmayan çevrede yorulur. Dostluğu bir tamir atölyesi gibi tutabilir; atölye sevgisiz değildir, dilsiz kalırsa eleştiri gibi duyulur.",
    career:
      "İş ve kariyerde sağlık, analiz, editörlük, zanaat, hizmet, düzen, araştırma bu damarı besler. Anlamı kopuk, özensiz, ‘idare et’ masalarda kaygı büyür. Başarı, işe yarar olmaktır; alkış ikinci plandadır.",
    woman:
      "Başak kadını sayfası, özen, kaygı ve faydalı şefkati yakın plandan anlatır. Genel sayfa toprağı; kadın sayfası o toprağın el izini verir.",
    man:
      "Başak erkeği sayfası, düzeltme refleksi ve emeğin görülmesini ayrıca işler. Aynı Merkür, başka jest.",
    compatibility:
      "Başak aşk uyumu, özen dilinin çarpışmasıdır. Boğa, Oğlak, Yengeç ve Akrep ile daha az çeviri isteyebilir. Çiftler Burç Aşk Uyumu’nda canonical okunur.",
  },
  terazi: {
    metaDescription:
      "Terazi burcu özellikleri: 23 Eylül–22 Ekim, Venüs, hava, denge, aşk ve ilişki zekâsı. Terazi kadını, erkeği ve uyum.",
    brief:
      "Terazi burcu, bağı tek başına bir zafer gibi değil, iki tarafı da gören bir masa gibi kurmak ister. Bu sayfa cinsiyet değil, burcun ortak havasıdır. Editorialdir. Terazi, kararsızlığı kişilik sanmaz; adaletin çiğnenmemesini ister.",
    dateRange:
      "Klasik aralık 23 Eylül – 22 Ekim’dir. Venüs’ün buradaki hali zarafeti veya ertelemeyi büyütür. Tarih bir terazi kefesi, harita ağırlıklardır.",
    element:
      "Elementi havadır. Hava burada İkizler’in merakı veya Kova’nın elektriği değil; ilişki zekâsı, estetik, diplomatik köprüdür. Ateş dengeyi sarsar, toprak eve çevirir, su kefeyi ıslatır.",
    modality:
      "Niteliği öncüdür. Öncü hava, ilişkiyi başlatır: ‘birlikte oturalım’. Sabit hava fikri kilitler, değişken hava çoğaltır; Terazi ise masayı kurar. Öncülük, her kararı hemen vermek değil; bağın eşiğini açmaktır.",
    ruling:
      "Yöneticisi Venüs’tür. Venüs burada Boğa’daki duyusal topraktan çok, çekim, zarafet, adalet ve ‘iki taraf da görünsün’ hissidir. Bakımlı Venüs diplomasi üretir. Bakımsız Venüs gerçeği huzur adına geciktirir. Terazi’yi anlamak, onu ‘yüzeysel’ ilan etmek değil; kefenin neden titrediğini sormaktır.",
    character:
      "Temel karakter denge arayışı ve ilişki zekâsıdır. Kibar başlar, adaletsizlikte keskinleşir; çatışmayı erteleyebilir. Başkasının gözünden yaşama, kendi sesini geç duyurabilir. Estetik, süs değil; uyumun görünür halidir.",
    strengths:
      "Güçlü yönü diplomasi, zarafet ve ilişkiyi görmedir. Dağılan masayı adaletle toparlayabilir. Çirkinliği — sözde, mekânda, bağda — uzun taşıyamaz.",
    challenges:
      "Zorlayıcı yönü erteleme, başkasının gözünden yaşama ve çatışmadan kaçıştır. Huzur adına gerçeği geciktirmek, bağın kumaşını inceltebilir. Bu kader değil; havanın bakımsız halidir.",
    love:
      "Aşkta Terazi sevgiyi denge, güzellik ve karşılıklı saygı üzerinden taşır. Yakınlığı çekim ve uyumla açar. Tek taraflı emek, onu sessizce soğutur. Adil karşılık, jest kalabalığından daha erotiktir.",
    relationships:
      "İlişkilerde adalet omurgadır. Partnerin kaba zafer dili, Terazi’de ihanet gibi çalınabilir. Sadakat, masanın iki yanının da dolu olmasıdır. Anlatılmazsa kararsızlık sanılır.",
    friendship:
      "Arkadaşlıkta Terazi grupları birleştirir, davet eder, çatışmayı yumuşatır. Tek taraflı emekte yorulur. Dostluğu bir salon gibi tutar: herkes görünsün, kimse ezilmesin. Salon boş kalınca zarafet maske gibi durabilir.",
    career:
      "İş ve kariyerde hukuk, tasarım, diplomasi, sanat, danışmanlık, insan kaynakları, estetik iş bu damarı besler. Kaba, tek taraflı, çirkin masalarda ısısı düşer. Kararın sonsuza ertelendiği yerde de tükenir; denge, kararsızlık değildir.",
    woman:
      "Terazi kadını sayfası, denge, zarafet ve ilişki zekâsını yakın plandan anlatır. Genel sayfa kefeyi; kadın sayfası o kefenin jestlerini verir.",
    man:
      "Terazi erkeği sayfası, adalet, erteleme ve çekim dilini ayrıca işler. Aynı Venüs, başka kap.",
    compatibility:
      "Terazi aşk uyumu, adalet ve tempo çarpışmasıdır. İkizler, Kova, Koç ve Aslan ile daha az çeviri isteyebilir. Çiftler Burç Aşk Uyumu’nda canonical durur.",
  },
  akrep: {
    metaDescription:
      "Akrep burcu özellikleri: 23 Ekim–21 Kasım, Plüton ve Mars, su, derinlik, aşk ve mahremiyet. Akrep kadını, erkeği ve uyum.",
    brief:
      "Akrep burcu, yüzeyde kalan yakınlığı ilişki saymaz; bağın görünmeyen katmanına inilmesini ister. Bu sayfa kadın veya erkek metninin özeti değil, burcun ortak kuyusudur. Editorialdir. Akrep, yoğunluğu saplantı sanmaz; duygusunun ‘ağır’ diye dışarıda bırakılmamasını ister.",
    dateRange:
      "Klasik aralık 23 Ekim – 21 Kasım’dır. Plüton ve Mars’ın haritadaki hali kuyuyu derinleştirir veya kilidi sertleştirir. Tarih bir eşik, harita katmanlardır.",
    element:
      "Elementi sudur. Su burada Yengeç’in evi veya Balık’ın sisi değil; sır eşiği, dönüşüm, görünmez olanı ciddiye alan bakıştır. Ateş suyu kaynatabilir, toprak kap verir, hava kelimeye çevirir. Akrep inmeden konuşmaz.",
    modality:
      "Niteliği sabittir. Sabit su, bir kez geçilen eşiği kolay unutmaz. Öncü su içeri alır, değişken su erir; Akrep kilitler. Kilit ya sadakat olur ya da kapanan kapı. Yerinden oynamamak kader değil; mahremiyetin mimarisidir.",
    ruling:
      "Yöneticileri Plüton ve geleneksel olarak Mars’tır. Plüton dönüşüm ısısı, bitmiş görünenin altında çalışan güçtür. Mars sınır ihlaline verilen keskin cevaptır. Bakımlı ikili derinlik üretir. Bakımsız ikili şüpheyi test gibi yaşatır. Akrep’i anlamak, onu karanlık ilan etmek değil; eşiğin izinsiz açılmamasıdır.",
    character:
      "Temel karakter yoğun bağ ve sır eşiğidir. Az konuşur, çok okur; cümlenin ardındaki niyeti duyar. Güç alkış değil, mahremiyeti yönetebilmektir. Kalabalığı sevmemek asosyal olmak değildir; ruhun envanterini rastgele dağıtmamaktır.",
    strengths:
      "Güçlü yönü derinlik, sadakat ve krizde durabilmektir. Yüzeysel teselli yerine gerçeğin yanında durur. Dönüşüm ısısı, bitmiş sanılanı yeniden anlamlandırabilir.",
    challenges:
      "Zorlayıcı yönü şüphe, kontrol ihtiyacı ve kapanan kapıyı yeniden açmamaktır. Şüpheyi test gibi yaşatmak bağı boğar. Yoğunluk, karşının temposunu ihanet gibi okutabilir. Bu hüküm değil; bakılacak bir eşiktir.",
    love:
      "Aşkta Akrep sevgiyi spektrumun tamamını görme izni gibi yaşar: ışık da gölge de masaya gelsin ister. Yakınlığı yavaş ve geri alınamaz bir eşik gibi açar. Kaçmayan dürüstlük, jest kalabalığından daha çok şey söyler.",
    relationships:
      "İlişkilerde sırların silah yapılmaması omurgadır. Üçüncü gözle seyredilen bağ, suyu çabuk karartır. Sadakat nutuktan çok, kriz anında kaçmamaktır. Anlatılmazsa kıskançlık damgası yapışır; damga bu sayfanın işi değildir.",
    friendship:
      "Arkadaşlıkta Akrep az kişiye kuyu açar. Sır tutar, krizde odada kalır, sahte neşeyi sevmez. İhanet — küçük bir ifşa bile — kapıyı uzun kapatabilir. Dostluğu bir eşiktir; eşik ciddiye alınsın ister.",
    career:
      "İş ve kariyerde araştırma, kriz, finansın görünmeyen yüzü, psikoloji, cerrahi netlik, sanatın karanlık katmanı bu damarı besler. Anlamı kopuk, yüzeysel, ‘sadece imaj’ işlerde tükenir. Para konusunda kontrol eğilimi cimrilik değil, eşiği kaybetmeme çabası olabilir.",
    woman:
      "Akrep kadını, bu kuyunun kadın sayfasında ayrı yazılmıştır: güven eşiği, mahremiyet ve yoğun bağ orada yakın plandadır. Genel sayfa burcun suyunu kopyalamaz; kadın sayfasına kapı açar.",
    man:
      "Akrep erkeği sayfası, kilit, sessiz sadakat ve şüphe dilini ayrıca ele alır. Aynı Plüton, başka anlatı katmanı; paragraf tekrarı değildir.",
    compatibility:
      "Akrep aşk uyumu, mahremiyet ve tempo çarpışmasıdır. Yengeç, Balık, Boğa ve Oğlak ile daha az çeviri isteyebilir. Koç ile tutku artabilir, eşiğin altı sorulur. Tüm çiftler Burç Aşk Uyumu’nda tek canonical kombinasyonla durur.",
  },
  yay: {
    metaDescription:
      "Yay burcu özellikleri: 22 Kasım–21 Aralık, Jüpiter, ateş, ufuk, aşk ve anlam. Yay kadını, erkeği ve aşk uyumu.",
    brief:
      "Yay burcu, bağı bir kafes gibi değil, birlikte genişleyen bir yol gibi yaşamak ister. Bu sayfa cinsiyet değil, burcun ortak ufkudur. Editorialdir. Yay, kaçışı özgürlük sanmaz; ufkunun küçümsenmemesini ister.",
    dateRange:
      "Klasik aralık 22 Kasım – 21 Aralık’tır. Jüpiter’in hali umudu veya vaat genişliğini büyütür. Tarih bir yolun başı, harita duraklardır.",
    element:
      "Elementi ateştir. Ateş burada Koç’un kıvılcımı veya Aslan’ın sahnesi değil; ufuk iştahı, anlam, dürüst ısıdır. Toprak ufkı yere indirir, hava haritayı çoğaltır, su yolu ıslatır.",
    modality:
      "Niteliği değişkendir. Değişken ateş yolu değiştirir, inancı tazeler, dağıtabilir. Sabit ateş sahneyi kilitler, öncü ateş kapı açar; Yay ise haritayı büyütür. Esneklik ihanet değildir; bakımsız kalınca kaçış gibi durur.",
    ruling:
      "Yöneticisi Jüpiter’dir. Jüpiter büyüme, anlam, inanç, yol, abartı ve cömertliktir. Bakımlı Jüpiter umut üretir. Bakımsız Jüpiter vaadi şişirir, ayrıntıyı körleştirir. Yay’ı anlamak, onu ‘sorumsuz’ ilan etmek değil; ufkun nerede tutulacağını sormaktır.",
    character:
      "Temel karakter ufuk iştahı ve doğrudanlıktır. İyimser konuşur; ayrıntıda sıkılır, inancını cümleye katar. Dürüstlük armağandır, bakımsız kalınca inceliksiz ok gibi iner.",
    strengths:
      "Güçlü yönü umut, dürüstlük ve anlam arayışıdır. Daralan hayatı açabilir. Birçok bağ, bu nefes olmadan boğulur.",
    challenges:
      "Zorlayıcı yönü kaçış, vaat genişliği ve ayrıntı körlüğüdür. Zor histe yola çıkmak, onarımı erteler. Bu kader değil; ateşin bakımsız halidir.",
    love:
      "Aşkta Yay sevgiyi macera, anlam ve açık ufuk üzerinden taşır. Yakınlığı yol ve inançla açar. ‘Kaçıyor’ diye her nefesin ihanet sayılması, onu gerçekten kaçırabilir. Tutulmuş küçük söz, büyük vaatten daha erotiktir.",
    relationships:
      "İlişkilerde ufkun küçümsenmemesi omurgadır. Partnerin ev-kafes dili, Yay’da ölüm gibi çalınabilir. Sadakat, yola birlikte çıkmaktır. Anlatılmazsa vefasızlık sanılır.",
    friendship:
      "Arkadaşlıkta Yay yol arkadaşı arar: seyahat, fikir, kahkaha, anlam. Küçük kıskançlık dramaları yorar. Dostluğu bir harita gibi tutar; harita güncellenmezse sıkılır, bu ihanet değildir.",
    career:
      "İş ve kariyerde eğitim, yayın, seyahat, hukukun anlam yüzü, spor, inanç, uluslararası iş bu damarı besler. Mikro yönetim, anlamsız ayrıntı, kapalı oda onu söndürür. Başarı, ufkun büyümesidir; unvan ikinci plandadır.",
    woman:
      "Yay kadını sayfası, ufuk, dürüstlük ve yol dilini yakın plandan anlatır. Genel sayfa haritayı; kadın sayfası adımları verir.",
    man:
      "Yay erkeği sayfası, vaat, kaçış ve anlam arayışını ayrıca işler. Aynı Jüpiter, başka jest.",
    compatibility:
      "Yay aşk uyumu, nefes ve ev dilinin çarpışmasıdır. Koç, Aslan, Kova ve Terazi ile daha az çeviri isteyebilir. Çiftler Burç Aşk Uyumu’nda canonical durur.",
  },
  oglak: {
    metaDescription:
      "Oğlak burcu özellikleri: 22 Aralık–19 Ocak, Satürn, toprak, zaman, aşk ve sorumluluk. Oğlak kadını, erkeği ve uyum.",
    brief:
      "Oğlak burcu, bağı bir heves gibi değil, zamanla kanıtlanan bir yapı gibi kurmak ister. Bu sayfa cinsiyet değil, burcun ortak iskeletidir. Editorialdir. Oğlak, soğukluğu kişilik sanmaz; emeğinin ve itibarının küçümsenmemesini ister.",
    dateRange:
      "Klasik aralık 22 Aralık – 19 Ocak’tır. Satürn’ün hali zaman iskeletini büyütür veya duyguyu erteler. Tarih bir basamak, harita merdivendir.",
    element:
      "Elementi topraktır. Toprak burada Boğa’nın masası veya Başak’ın listesi değil; zaman, itibar, sorumluluk, uzun vadedir. Ateş iskeleti sarsar, hava cümleye çevirir, su taşı ısıtır.",
    modality:
      "Niteliği öncüdür. Öncü toprak yapı kurar: ‘bu uzun sürer, başlayalım’. Sabit toprak kilitler, değişken toprak tamir eder; Oğlak basamak çıkar. Öncülük, acele değil; yükü omuzlamaktır.",
    ruling:
      "Yöneticisi Satürn’dür. Satürn zaman, sınır, emek, korku, olgunluk ve ‘hak etmek’tir. Bakımlı Satürn sebat üretir. Bakımsız Satürn duyguyu görevle erteler. Oğlak’ı anlamak, onu ‘sevgi yok’ ilan etmek değil; ısının geç geldiğini kabul etmektir.",
    character:
      "Temel karakter zaman iskeleti ve sorumluluktur. Az ve ölçülü konuşur; duyguyu iş bitince, krizde görev diliyle taşır. İç yok değildir; iç, itibar zedelenmesin diye geç görünür.",
    strengths:
      "Güçlü yönü sebat, sorumluluk ve uzun vadeli zekâdır. Krizde omurga olur. Birçok hayat, bu yapı olmadan dağılır.",
    challenges:
      "Zorlayıcı yönü katılık, duyguyu erteleme ve kontroldür. Söz zamana yayılsa da tutulmazsa güven çatlar. Bu kader değil; toprağın bakımsız halidir.",
    love:
      "Aşkta Oğlak sevgiyi sadakat, emek ve zaman içinde durmak üzerinden taşır. Yakınlığı yavaş, onurlu, kalıcı bir eşik gibi açar. Ciddiye alınmak, ışıltı kalabalığından daha çok şey söyler.",
    relationships:
      "İlişkilerde emeğin küçümsenmemesi omurgadır. Partnerin ‘hissini söyle’ baskısı, Oğlak’ta sınav gibi durabilir. Sadakat, uzun vadede odada kalmaktır. Anlatılmazsa soğukluk sanılır.",
    friendship:
      "Arkadaşlıkta Oğlak az, seçilmiş, zamana yayılan bağ kurar. Krizde gelir, faturayı böler, sözünü tutar. Sürekli kriz üreten, sözünde durmayan çevrede çekilir. Dostluğu bir yapı gibidir; yapı süs değildir.",
    career:
      "İş ve kariyerde yönetim, mimari, finans, hukuk, uzun proje, kurum, zanaatın ciddi yüzü bu damarı besler. Heves işi, imaj işi, ‘hemen olsun’ masalarında ısısı düşer. Başarı, zamanın kanıtıdır.",
    woman:
      "Oğlak kadını sayfası, itibar, emek ve geç ısınan yakınlığı ayrı anlatır. Genel sayfa iskeleti; kadın sayfası eklemleri verir.",
    man:
      "Oğlak erkeği sayfası, görev dili ve uzun vadeli duruşu ayrıca işler. Aynı Satürn, başka kap.",
    compatibility:
      "Oğlak aşk uyumu, zaman ve ısı çarpışmasıdır. Boğa, Başak, Akrep ve Balık ile daha az çeviri isteyebilir. Çiftler Burç Aşk Uyumu’nda canonical durur.",
  },
  kova: {
    metaDescription:
      "Kova burcu özellikleri: 20 Ocak–18 Şubat, Uranüs ve Satürn, hava, özgünlük, aşk ve dostluk. Kova kadını, erkeği ve uyum.",
    brief:
      "Kova burcu, bağı sahiplenen bir kilit gibi değil, iki özgür zihnin anlaşması gibi kurmak ister. Bu sayfa cinsiyet değil, burcun ortak elektriğidir. Editorialdir. Kova, mesafeyi soğukluk sanmaz; farklılığının ihanet sayılmamasını ister.",
    dateRange:
      "Klasik aralık 20 Ocak – 18 Şubat’tır. Uranüs ve Satürn’ün hali elektriği veya mesafeyi büyütür. Tarih bir şebeke düğümü, harita kablolardır.",
    element:
      "Elementi havadır. Hava burada sohbet (İkizler) veya denge (Terazi) değil; gelecek zekâsı, özgünlük, dostça mesafedir. Ateş elektriğe yön katar, toprak yere indirir, su şoka sokabilir.",
    modality:
      "Niteliği sabittir. Sabit hava, fikrini ve özgürlük mimarisini kolay vazgeçirmez. Öncü hava masa kurar, değişken hava çoğaltır; Kova şebekeyi kilitler. Kilit ya sadık dostluk olur ya da inatçı bağımsızlık.",
    ruling:
      "Yöneticileri Uranüs ve geleneksel Satürn’dür. Uranüs sürpriz, özgünlük, kopuş, gelecektir. Satürn form, ilke, mesafeli sorumluluktur. Bakımlı ikili elektrik ve omurga üretir. Bakımsız ikili yakınlıkta fikre kaçırır. Kova’yı anlamak, onu ‘duygusuz’ ilan etmek değil; ısının zihinden geçtiğini görmektir.",
    character:
      "Temel karakter mesafeli içtenlik ve özgünlüktür. Fikirle ısınır, duygu sahnede gecikebilir. Sıradışı dürüstlük taşıyabilir. Kalabalıkta ‘biz’i, ikilide ‘nefes payı’nı savunur.",
    strengths:
      "Güçlü yönü özgünlük, dostluk zekâsı ve geleceği görmedir. Sıkışmış bağa hava verir. Birçok hayat, bu nefes olmadan boğulur.",
    challenges:
      "Zorlayıcı yönü mesafe, duygusal gecikme ve inatçı bağımsızlıktır. Yakınlıkta elektrik kesip fikirle kaçmak, partneri yalnız bırakır. Bu kader değil; havanın bakımsız halidir.",
    love:
      "Aşkta Kova sevgiyi dostluk, fikir ve elektrik üzerinden taşır. Yakınlığı zihin ve sürprizle açar. Boğmayan bir zihin payı, sahiplenmeden daha erotiktir.",
    relationships:
      "İlişkilerde farklılığın ihanet sayılmaması omurgadır. Partnerin kilit dili, Kova’da ölüm gibi çalınabilir. Sadakat, iki özgürlüğün anlaşmasıdır. Anlatılmazsa soğukluk sanılır.",
    friendship:
      "Arkadaşlık Kova’nın ana dilidir: grup, fikir, gelecek, tuhaf mizah. İkili drama, dostluğu boğabilir. Unutulan ilke — adalet, özgünlük — kapıyı kapatır. Dostluğu bir şebeke gibi tutar.",
    career:
      "İş ve kariyerde teknoloji, bilim, sivil toplum, tasarım, gelecek işi, ağ, reform bu damarı besler. Hiyerarşik, ‘herkes gibi ol’ masalarında ısısı düşer. Başarı, özgün katkıdır; unvan ikinci plandadır.",
    woman:
      "Kova kadını sayfası, özgünlük, mesafe ve elektrik dilini yakın plandan anlatır. Genel sayfa şebekeyi; kadın sayfası düğümleri verir.",
    man:
      "Kova erkeği sayfası, bağımsızlık ve geciken duyguyu ayrıca işler. Aynı Uranüs, başka jest.",
    compatibility:
      "Kova aşk uyumu, nefes ve sahiplenme çarpışmasıdır. İkizler, Terazi, Yay ve Koç ile daha az çeviri isteyebilir. Çiftler Burç Aşk Uyumu’nda canonical durur.",
  },
  balik: {
    metaDescription:
      "Balık burcu özellikleri: 19 Şubat–20 Mart, Neptün ve Jüpiter, su, şefkat, aşk ve sınır. Balık kadını, erkeği ve uyum.",
    brief:
      "Balık burcu, bağı keskin bir sınır gibi değil, birbirine karışan iki su gibi hissetmek ister. Bu sayfa cinsiyet değil, burcun ortak sisidir. Editorialdir. Balık, hassasiyeti saflık sanmaz; rüyasının alay konusu edilmemesini ister.",
    dateRange:
      "Klasik aralık 19 Şubat – 20 Mart’tır. Neptün ve Jüpiter’in hali geçirgenliği veya kaçışı büyütür. Tarih bir kıyı, harita gelgitlerdir.",
    element:
      "Elementi sudur. Su burada ev (Yengeç) veya kuyu (Akrep) değil; geçirgenlik, merhamet, rüya zekâsıdır. Ateş sisi yakabilir, toprak kap verir, hava net cümle ister.",
    modality:
      "Niteliği değişkendir. Değişken su erir, uyarlanır, dağılabilir. Öncü su ev açar, sabit su kilitler; Balık kıyıya vurur. Esneklik şefkattir; bakımsız kalınca sınır erimesi olur.",
    ruling:
      "Yöneticileri Neptün ve geleneksel Jüpiter’dir. Neptün rüya, sis, birleşme, kaçış, sanat, merhamettir. Jüpiter inanç ve genişlemedir. Bakımlı ikili şefkat üretir. Bakımsız ikili vaadi sise gömer. Balık’ı anlamak, onu ‘gerçek dışı’ ilan etmek değil; kıyının nerede tutulacağını sormaktır.",
    character:
      "Temel karakter geçirgenlik ve şefkattir. Dolaylı, imgeli, sezgisel konuşur; net cümle geç gelebilir. Başkasının hissini kendi hissi sanabilir. Bu empati armağandır, bakımsız kalınca kaybolmadır.",
    strengths:
      "Güçlü yönü şefkat, hayal ve bağışlamadır. Odadaki acıyı yumuşatabilir. Birçok bağ, bu merhamet olmadan sertleşir.",
    challenges:
      "Zorlayıcı yönü sınır erimesi, kaçış ve belirsizliktir. Netlikten kaçıp sisin içine çekilmek, partneri yalnız bırakır. Bu kader değil; suyun bakımsız halidir.",
    love:
      "Aşkta Balık sevgiyi birleşme, merhamet ve atmosfer üzerinden taşır. Yakınlığı erime ve rüya ısısıyla açar. Sınırını kırılmadan tutacak bir omurga, sisin içinde pusuladır.",
    relationships:
      "İlişkilerde vaadin sis içinde kaybolmaması omurgadır. Partnerin sert netliği, Balık’ta zulüm gibi çalınabilir. Sadakat, merhametin tutulmuş küçük gerçekle birleşmesidir. Anlatılmazsa manipülasyon sanılır; bu sayfa o damgayı yapıştırmaz.",
    friendship:
      "Arkadaşlıkta Balık dinler, affeder, atmosfer kurar. Sürekli netlik dayatan, alay eden çevrede çekilir. Dostluğu bir kıyı gibi tutar; kıyı kaybolunca kaçış başlar.",
    career:
      "İş ve kariyerde sanat, müzik, bakım, film, maneviyat, yardım, suyun olduğu işler bu damarı besler. Sert, yalnızca rakam, sınırın aşağılandığı masalarda tükenir. Başarı, anlamın akmasıdır; unvan sisin içinde kaybolabilir.",
    woman:
      "Balık kadını sayfası, geçirgenlik, şefkat ve rüya dilini yakın plandan anlatır. Genel sayfa kıyıyı; kadın sayfası dalgaları verir.",
    man:
      "Balık erkeği sayfası, sis, kaçış ve merhameti ayrıca işler. Aynı Neptün, başka kap.",
    compatibility:
      "Balık aşk uyumu, sınır ve erime çarpışmasıdır. Yengeç, Akrep, Boğa ve Oğlak ile daha az çeviri isteyebilir. Çiftler Burç Aşk Uyumu’nda canonical durur.",
  },
};

export function signOverviewCopy(sign: Sign) {
  return SIGN_OVERVIEWS[sign.id];
}

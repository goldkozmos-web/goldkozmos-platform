import type { Ritual } from "./types";
import { ritualImagePath } from "./types";

const rituals: Ritual[] = [
  {
    slug: "tuz-ile-arinma",
    title: "Tuz ile Arınma Ritüeli",
    summary: "Günün birikimini sade bir tuz uygulamasıyla bırakmak için kısa bir alan temizliği.",
    intro:
      "Bu ritüel, mekânı ve zihni kalabalıktan ayırmak için tasarlandı. Tuz burada bir sembol: netlik, sınır ve sakin bir reset.",
    purpose:
      "Odada ve bedende biriken yorgunluğu fark etmek, fazla uyarılmayı bırakmak, günü daha temiz bir dikkatle kapatmak.",
    when: "Yoğun bir günün ardından, ev değişiminde veya yeni bir çalışma dönemine girmeden önce.",
    duration: "12 dakika",
    materials: ["Bir kase deniz tuzu veya sofra tuzu", "Temiz bir kâse", "Ilık su", "Küçük bir havlu"],
    steps: [
      "Pencereyi biraz aç. Telefonu başka bir odaya bırak.",
      "Kaseye bir avuç tuz koy. Tuzun dokusuna üç nefes bak.",
      "Odanın dört köşesine, abartmadan, küçük birer tutam tuz bırak.",
      "Ellerini ılık suda yıka. Yüzünü havluyla kurularken ‘bugün bitti’ de.",
      "Tuzu ertesi gün toplayıp çöpe at. Alanı süpür veya sil.",
    ],
    intention: "Bu alanda sakin, net ve kendime ait bir düzen bırakıyorum.",
    after: "Işıkları kıs. Beş dakika sessiz otur. Yeni bir niyet ekleme; sadece dur.",
    tags: ["Arınma", "Korunma"],
    image: ritualImagePath("tuz-ile-arinma"),
  },
  {
    slug: "nazar-koruma",
    title: "Nazar Koruma Ritüeli",
    summary: "Dış bakışın etkisini abartmadan sınırlamak ve kendi merkezine dönmek için kısa bir koruma uygulaması.",
    intro:
      "Nazar burada kıskançlık masalı değil; fazla görünürlük, yorgunluk ve dağılmış dikkat. Ritüel, sınırı hatırlatır.",
    purpose:
      "Sosyal yorgunluğu yatıştırmak, kendi alanını toparlamak ve dış yorumlara karşı sakin bir mesafe kurmak.",
    when: "Kalabalık bir gün, yoğun paylaşım veya ‘üzerimde duruluyor’ hissi sonrası.",
    duration: "10 dakika",
    materials: ["Küçük bir ayna", "Bir bardak su", "Tercihen bir nazar boncuğu veya sade bir taş"],
    steps: [
      "Aynayı masaya koy. Kendine bakmadan önce suya bak.",
      "Taşı veya boncuğu avucunda ısıt. Nefesi burundan al, ağızdan ver.",
      "‘Bu bakış bana ait değil’ cümlesini içinden bir kez söyle.",
      "Aynayı ters çevir. Suyu lavaboya dök.",
      "Kapıyı kapatıp omuzlarını indir. İşin bitti.",
    ],
    intention: "Kendi bakışımı tutuyorum. Dış yorumlar burada durur.",
    after: "Sosyal medyayı bir saat kapat. Sessiz bir yürüyüş yeterli.",
    tags: ["Nazar", "Korunma"],
    image: ritualImagePath("nazar-koruma"),
  },
  {
    slug: "bolluk-kapisi-acma",
    title: "Bolluk Kapısı Açma Ritüeli",
    summary: "Para ve fırsat kaygısını pratik bir düzene bağlayan sakin bir bolluk uygulaması.",
    intro:
      "Bolluk burada mucize bekleyen bir sahne değil. Kapı, düzenli dikkat ve açık bir iş listesi demek.",
    purpose:
      "Kıtlık dilini bırakıp somut bir adım ve temiz bir çalışma alanı bırakmak.",
    when: "Ay başı, yeni bir proje veya gelirle ilgili sıkışma hissedildiğinde.",
    duration: "15 dakika",
    materials: ["Bir kâğıt ve kalem", "Masanın üzerindeki gereksiz eşyalar", "Bir kase taze su", "Tercihen bir madeni para"],
    steps: [
      "Masayı boşalt. Sadece kâğıt, kalem ve kase kalsın.",
      "Üç satır yaz: ne istiyorum, neyi bırakıyorum, bugün hangi tek adım.",
      "Parayı kâsenin yanına koy. Abartma; sembol yeterli.",
      "Kâğıdı katla ve cüzdana veya deftere koy.",
      "Suyu iç veya bitkilere ver. Masayı öyle bırak.",
    ],
    intention: "Kapıyı açık tutuyorum. Adımım sade ve uygulanabilir.",
    after: "Yazdığın tek adımı aynı gün içinde başlat. Ritüeli uzatma.",
    tags: ["Bolluk", "Bereket"],
    image: ritualImagePath("bolluk-kapisi-acma"),
  },
  {
    slug: "yeni-ay-niyet",
    title: "Yeni Ay Niyet Ritüeli",
    summary: "Yeni bir döngüye tek bir niyetle girmek için sade bir başlangıç ritüeli.",
    intro:
      "Yeni ay, liste şişirmek için değil. Burada tek cümle, tek yön ve sakin bir başlangıç var.",
    purpose:
      "Dağınık istekleri teke indirmek ve önümüzdeki dört haftaya net bir çerçeve vermek.",
    when: "Yeni ay günü veya onu izleyen üç gece içinde.",
    duration: "14 dakika",
    materials: ["Bir mum", "Not defteri", "Kalem", "Sessiz bir masa"],
    steps: [
      "Mum yak. Telefonu kapat.",
      "Deftere üç istek yaz, sonra ikisini çiz. Biri kalsın.",
      "Kalan cümleyi tek satırda yeniden yaz.",
      "Mumu söndürmeden önce cümleyi içinden oku.",
      "Defteri kapat. Mumu güvenli şekilde söndür.",
    ],
    intention: "Bu döngüde tek yönüm net. Fazlasını taşımıyorum.",
    after: "Niyeti takvime bir küçük görev olarak ekle. Başka ritüel ekleme.",
    tags: ["Yeni Başlangıç", "Odak"],
    image: ritualImagePath("yeni-ay-niyet"),
  },
  {
    slug: "dolunay-birakma",
    title: "Dolunay Bırakma Ritüeli",
    summary: "Döngünün sonunda fazla yükü bırakmak için kısa, ölçülü bir bırakma uygulaması.",
    intro:
      "Dolunay, birikeni göstermek içindir. Bu ritüel dram değil; isim koyup bırakmak.",
    purpose:
      "Bitmeyen işleri, eski kırgınlığı veya artık işe yaramayan bir alışkanlığı sayfadan çıkarmak.",
    when: "Dolunay gecesi veya ertesi sabah, ev sakinken.",
    duration: "12 dakika",
    materials: ["Bir kâğıt", "Kalem", "Bir kase su", "Çöp kutusu"],
    steps: [
      "Kâğıda bıraktığın şeyi bir cümleyle yaz.",
      "Cümleyi yüksek sesle okuma; içinden bir kez oku yeter.",
      "Kâğıdı ikiye katla. Kaseye değdirip çıkar.",
      "Kâğıdı çöpe at. Suyu lavaboya dök.",
      "Pencereyi aç. Üç derin nefes al.",
    ],
    intention: "Bu yükü taşımıyorum. Yerini sakinliğe bırakıyorum.",
    after: "Aynı gece o konuyu tekrar konuşma. Sabah kısa bir yürüyüş iyi gelir.",
    tags: ["Arınma", "Yeni Başlangıç"],
    image: ritualImagePath("dolunay-birakma"),
  },
  {
    slug: "ask-alani-temizleme",
    title: "Aşk Alanını Temizleme Ritüeli",
    summary: "İlişki alanında biriken gerilimi sakinleştirmek için ölçülü bir temizlik ritüeli.",
    intro:
      "Aşk alanını temizlemek karşı tarafı değiştirmek değil. Kendi dilini, beklentini ve odadaki havayı toparlamaktır.",
    purpose:
      "Kırgınlığı büyütmeden ilişki alanına düzen, nezaket ve nefes bırakmak.",
    when: "Tartışma sonrası, soğukluk dönemlerinde veya yeni bir bağa yer açmak isterken.",
    duration: "16 dakika",
    materials: ["Pembe veya krem bir kumaş/örtü", "Bir bardak su", "Not kâğıdı", "Hafif bir koku (isteğe bağlı)"],
    steps: [
      "Yatağı veya oturma köşesini topla. Örtüyü düzgün ser.",
      "Kâğıda ‘bıraktığım’ ve ‘koruduğum’ diye iki satır yaz.",
      "Suyu köşeye koy. Üç nefes boyunca dur.",
      "Kâğıdı katlayıp bir çekmeceye koy. Gösteriş yok.",
      "Odayı sessiz bırak. Konuyu o gece açma.",
    ],
    intention: "Bu alanda saygı, netlik ve yumuşak bir mesafe olsun.",
    after: "Ertesi gün tek nazik bir cümle yeter. Hesap sorma turu açma.",
    tags: ["Aşk", "Arınma"],
    image: ritualImagePath("ask-alani-temizleme"),
  },
  {
    slug: "disil-enerjiyle-bag",
    title: "Dişil Enerjiyle Bağ Kurma Ritüeli",
    summary: "Tempo ve baskıyı düşürüp bedenle daha yumuşak bir bağ kurmak için sakin bir uygulama.",
    intro:
      "Dişil enerji burada cinsiyet rolü değil. Yavaşlık, alıcılık ve iç ritim. Ritüel sade tutulur.",
    purpose:
      "Sürekli üretme refleksini durdurmak, bedeni dinlemek ve daha yumuşak bir tempo seçmek.",
    when: "Yorgunluk, aşırı plan ve ‘yetişemiyorum’ hissi yoğunlaştığında.",
    duration: "18 dakika",
    materials: ["Yumuşak bir örtü", "Ilık bir içecek", "Sakin bir müzik (isteğe bağlı)", "Not defteri"],
    steps: [
      "Örtüyü yere veya koltuğa ser. Ayakkabıyı çıkar.",
      "İçeceği yudumla. Acele etme.",
      "Bir elini karına koy. Nefesi orada hisset.",
      "Deftere ‘şimdi bedenim ne istiyor?’ diye bir satır yaz.",
      "Cevabı uygula: uzan, yürü veya ışığı kıs.",
    ],
    intention: "Tempo bende. Yumuşak olmak eksik olmak değil.",
    after: "O akşam bir iş listesi daha ekleme. Erken yat.",
    tags: ["Dişil Enerji", "Odak"],
    image: ritualImagePath("disil-enerjiyle-bag"),
  },
  {
    slug: "ev-enerjisini-tazeleme",
    title: "Ev Enerjisini Tazeleme Ritüeli",
    summary: "Evi görsel ve zihinsel olarak toparlayan kısa, uygulanabilir bir tazeleme ritüeli.",
    intro:
      "Ev enerjisi mistik bir sis değil. Açık pencere, toplanmış yüzey ve sakin koku. Düzen, hissi taşır.",
    purpose:
      "Eve dönüşü daha temiz kılmak, dağınıklığı azaltmak ve ortak alanı nefeslenebilir hale getirmek.",
    when: "Hafta sonu sabahı, misafir öncesi veya evde ağırlık hissedildiğinde.",
    duration: "20 dakika",
    materials: ["Açık pencere", "Bir bez ve yüzey spreyi", "Küçük bir kase tuz veya limon dilimi", "Çöp torbası"],
    steps: [
      "Pencereleri aç. Zamanlayıcıyı 20 dakikaya kur.",
      "Göz hizasındaki yüzeyleri sil. Derin temizlik yok.",
      "Gereksiz üç nesneyi kaldır veya çöpe at.",
      "Kaseyi girişe koy. Limon veya tuz yeterli.",
      "Işıkları azalt. Evi dolaşıp işin bittiğini gör.",
    ],
    intention: "Bu ev nefes alsın. Ben de öyle.",
    after: "Yeni dekor ekleme. Bir odayı ‘bitti’ kabul et.",
    tags: ["Arınma", "Korunma", "Bereket"],
    image: ritualImagePath("ev-enerjisini-tazeleme"),
  },
  {
    slug: "odak-ve-zihin-toparlama",
    title: "Odak ve Zihin Toparlama Ritüeli",
    summary: "Dağınık zihni tek göreve indirmek için kısa bir masa ve nefes ritüeli.",
    intro:
      "Odak, daha fazla araç değil. Masa, nefes ve tek satırlık bir iş. Ritüel burayı temizler.",
    purpose:
      "Zihni bölünmekten çıkarıp 25 dakikalık sakin bir çalışma penceresi açmak.",
    when: "İşe başlamadan önce, toplantı aralarında veya ekran yorgunluğunda.",
    duration: "8 dakika + 25 dakika iş",
    materials: ["Temiz bir masa", "Bir kâğıt", "Kalem", "Su bardağı", "Telefonu başka oda"],
    steps: [
      "Masadaki fazla nesneleri kaldır.",
      "Kâğıda tek görev yaz. İkinci satır yasak.",
      "Dört tur nefes: dört sayarak al, dört tut, dört ver.",
      "Suyu iç. Zamanlayıcıyı 25 dakikaya kur.",
      "Süre bitince ayağa kalk. Ritüeli uzatma.",
    ],
    intention: "Şimdi tek iş. Gerisi sırasını bekler.",
    after: "Kısa bir ara ver. Aynı anda ikinci görevi açma.",
    tags: ["Odak"],
    image: ritualImagePath("odak-ve-zihin-toparlama"),
  },
  {
    slug: "uyku-oncesi-sakinlesme",
    title: "Uyku Öncesi Sakinleşme Ritüeli",
    summary: "Günü kapatıp uykuya yumuşak geçmek için ekransız, kısa bir gece ritüeli.",
    intro:
      "Uyku öncesi ritüel performans değil. Işık, nefes ve yarını masadan kaldırmak.",
    purpose:
      "Sinir sistemini yavaşlatmak, zihindeki açık sekmeleri kapatmak ve uykuya yer açmak.",
    when: "Yatmadan 30 dakika önce, her gece veya uykunun bozulduğu dönemlerde.",
    duration: "10 dakika",
    materials: ["Loş ışık", "Bir bardak ılık su veya bitki çayı", "Not kâğıdı", "Telefonu şarj alanında, yatakta değil"],
    steps: [
      "Ekranı kapat. Işığı kıs.",
      "Yarına kalanı tek satır yaz. Listeyi uzatma.",
      "İçeceği yavaş iç. Omuzları indir.",
      "Yatakta dört uzun nefes. Sayıyı takip et.",
      "Kâğıdı odanın dışında bırak.",
    ],
    intention: "Gün bitti. Beden dinlensin, zihin beklesin.",
    after: "Yatakta içerik açma. Uyuyamazsan ışığı kapalı tut, nefesle kal.",
    tags: ["Uyku", "Odak"],
    image: ritualImagePath("uyku-oncesi-sakinlesme"),
  },
];

export function publishedRituals() {
  return rituals;
}

export function ritualBySlug(slug: string) {
  return rituals.find((ritual) => ritual.slug === slug) ?? null;
}

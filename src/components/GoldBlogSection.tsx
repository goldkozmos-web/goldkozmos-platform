"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  UIEvent,
} from "react";
import GoldBlogComments from "./GoldBlogComments";
import GoldBlogNotifications from "./GoldBlogNotifications";

type GoldBlogCategoryKey =
  | "spirituel-stoa"
  | "iliski-rezonansi"
  | "kendilik-rezonansi"
  | "bolluk-rezonansi"
  | "goldkozmos-gunlugu";

type GoldBlogArticle = {
  slug: string;
  number: string;
  categoryKey: GoldBlogCategoryKey;
  category: string;
  title: string;
  description: string;
  readingTime: string;
  isNew: boolean;
  content: string[];
};

type GoldBlogCategory = {
  key: GoldBlogCategoryKey;
  number: string;
  label: string;
  title: string;
  description: string;
};

const goldBlogCategories: GoldBlogCategory[] = [
  {
    "key": "spirituel-stoa",
    "number": "01",
    "label": "SPİRİTÜEL STOA",
    "title": "Spiritüel Stoa",
    "description": "Kontrol alanı, anlam arayışı, içsel yön ve insanın kendisiyle kurduğu ilişki."
  },
  {
    "key": "iliski-rezonansi",
    "number": "02",
    "label": "İLİŞKİ REZONANSI",
    "title": "İlişki Rezonansı",
    "description": "Çekim, bağlanma, sınırlar ve ilişkilerde tekrar eden duygusal örüntüler."
  },
  {
    "key": "kendilik-rezonansi",
    "number": "03",
    "label": "KENDİLİK REZONANSI",
    "title": "Kendilik Rezonansı",
    "description": "Özdeğer, kimlik, onay ihtiyacı, sınırlar ve insanın kendi sesine dönüşü."
  },
  {
    "key": "bolluk-rezonansi",
    "number": "04",
    "label": "BOLLUK REZONANSI",
    "title": "Bolluk Rezonansı",
    "description": "Para, emek, değer, kaynaklar ve daha fazlasını taşıyabilme kapasitesi."
  },
  {
    "key": "goldkozmos-gunlugu",
    "number": "05",
    "label": "GOLDKOZMOS GÜNLÜĞÜ",
    "title": "GoldKozmos Günlüğü",
    "description": "Gündelik hayatın içinden kişisel gözlemler, düşünce notları ve küçük fark edişler."
  }
 ] as GoldBlogCategory[];

const goldBlogCategoryImages: Record<
  GoldBlogCategoryKey,
  string
> = {
  "spirituel-stoa":
    "/images/services/goldblog/categories/spirituel-stoa.webp",
  "iliski-rezonansi":
    "/images/services/goldblog/categories/iliski-rezonansi.webp",
  "kendilik-rezonansi":
    "/images/services/goldblog/categories/kendilik-rezonansi.webp",
  "bolluk-rezonansi":
    "/images/services/goldblog/categories/bolluk-rezonansi.webp",
  "goldkozmos-gunlugu":
    "/images/services/goldblog/categories/goldkozmos-gunlugu.webp",
};

const goldBlogArticles: GoldBlogArticle[] = [
  {
    "slug": "insan-bazen-kaybolmaz",
    "number": "01",
    "categoryKey": "spirituel-stoa",
    "category": "SPİRİTÜEL STOA",
    "title": "İnsan Bazen Kaybolmaz, Sadece Kendinden Uzaklaşır",
    "description": "İnsanın hayatın içinde kaybolduğunu sandığı anlarda aslında kendi sesinden, sınırlarından ve seçimlerinden nasıl uzaklaşabildiğini anlatan bir yazı.",
    "readingTime": "7 Dakika",
    "isNew": true,
    "content": [
      "İnsan bazen hayatının içinde kaybolduğunu düşünür. Ne yapması gerektiğini bilmediği, hangi yolu seçerse seçsin içinde bir şeylerin eksik kalacağı hissine kapıldığı dönemler olur. Sabah aynı evde uyanır, aynı aynaya bakar, aynı insanlarla konuşur ama sanki kendi hayatına dışarıdan bakıyormuş gibi hisseder. Her şey tanıdıktır ama hiçbir şey eskisi kadar yakın değildir. Çoğu zaman böyle zamanlarda hayatı değiştirmek isteriz. Başka bir şehir, başka bir ilişki, başka bir iş, başka bir çevre… İçimizdeki huzursuzluğun dışarıdaki bir şey yüzünden oluştuğuna inanmak daha kolay gelir. Oysa bazen değiştirmek istediğimiz hayat değil, o hayatın içinde uzun zamandır susturduğumuz kendimizdir. İnsan kendisinden bir anda uzaklaşmaz. Bu mesafe yavaş yavaş oluşur. Önce istemediği bir şeye “tamam” der. Sonra kırıldığı bir yerde susar. Birinin sevgisini kaybetmemek için kendi sınırından biraz vazgeçer. Ardından herkesin ondan beklediği kişiye dönüşmeye çalışırken kendi beklentilerini erteler. Bunların hiçbiri o anda büyük görünmez. İnsan zaten çoğu zaman kendisini büyük kararlarla değil, küçük vazgeçişlerle kaybeder.",
      "Bir süre sonra neyi gerçekten istediğini ayırt etmek zorlaşır. Sevdiğin şeyleri mi yapıyorsun, yoksa sevilmek için öğrendiğin şeyleri mi? O ilişkiyi gerçekten istiyor musun, yoksa yalnız kalmaktan mı korkuyorsun? O hayat sana mı ait, yoksa yıllardır sana doğru hayatın böyle olması gerektiği mi anlatıldı? İnsan kendi cevaplarından uzaklaştığında dışarıdan gelen cevaplara daha fazla ihtiyaç duymaya başlıyor. Birileri ona ne yapması gerektiğini söylesin istiyor. Bir işaret arıyor, bir denk gelişin peşine düşüyor, gördüğü bir sayıya, duyduğu bir cümleye, karşısına çıkan bir insana gereğinden fazla anlam yükleyebiliyor. Çünkü insan kendi sesini duyamadığında dünyanın ona bir şey söylemesini bekliyor. Spiritüel düşüncede işaretlerden, enerjiden, akıştan sıkça bahsedilir ama belki de insanın en önemli işareti kendi içinde tekrar tekrar ortaya çıkan o rahatsızlıktır. Sürekli bastırdığı bir duygu, gitmek istemediği halde kaldığı bir yer, her karşılaşmada yeniden açılan aynı yara… Bunların her birini kaderin gizemli dili gibi görmek yerine, bazen kendimizi daha yakından dinlemek gerekir. Çünkü hayatın bize ne anlattığını anlamaya çalışırken kendimizin ne söylediğini kaçırabiliyoruz.",
      "Stoa felsefesi insana dışarıdaki dünyayı tamamen yönetemeyeceğini hatırlatır. İnsanların davranışlarını, zamanın akışını, kayıpları, tesadüfleri, başkalarının fikirlerini ve hayatın getireceği her sonucu kontrol etmek mümkün değildir. Fakat insanın kendi tutumu, kendi seçimi, kendi sınırı ve kendi davranışı hâlâ ona aittir. Belki de bu yüzden insanın kendine dönüşü, hayatındaki her şeyi değiştirmekle başlamaz. Önce neyin gerçekten kendisine ait olduğunu fark etmekle başlar. Başkasının öfkesini taşımamayı öğrenmek, birinin gitmesini kendi değersizliğinin kanıtı gibi görmemek, geçmişte yaptığı bir hatayı ömür boyu kendisini cezalandırmak için kullanmamak… Bunlar dışarıdan küçük görünen ama insanın iç dünyasında büyük kapılar açan şeylerdir. Çünkü kendine dönmek, kusursuz bir insan haline gelmek değildir. Tam tersine, kendinle ilgili görmek istemediğin şeyleri de görebilmektir. Kıskançlığını, korkunu, öfkeni, onay ihtiyacını, terk edilme endişeni, kontrol etme isteğini… İnsan kendi karanlık taraflarını reddettikçe onların etkisinden kurtulmaz. Sadece onları fark etmeden yaşamaya devam eder.",
      "Belki de spiritüel gelişim denilen şey sürekli daha yüksek bir yerde olmaya çalışmak değildir. Her sabah iyi hissetmek, her olayda olumlu bir anlam bulmak, bütün insanları affetmek ya da yaşanan her şeyi güzel bir ders haline getirmek zorunda değiliz. Bazı şeyler canımızı yakar ve bunun daha süslü bir açıklamaya ihtiyacı yoktur. Bazen bir kayıp yalnızca kayıptır. Bir ihanet yalnızca ihanettir. Bir hayal kırıklığı, üzerinden hemen anlam çıkarmamız gereken bir sınav değildir. İnsan bazı şeylerin içinden güçlü çıkmaz; bazen sadece çıkar. Bir süre yorgun olur, kafası karışır, eskisi kadar kolay inanamaz. Fakat zamanla o yaşanan şeyin kendisinden çok, onunla ne yaptığı önem kazanmaya başlar. Çünkü başımıza gelen her şeyi seçemeyiz ama yaşadıklarımızın hayatımızdaki son söz olmasına izin verip vermeyeceğimiz konusunda düşündüğümüzden daha fazla söz hakkımız vardır.",
      "Belki de kendine dönmek tam olarak burada başlıyor. Hayatın senden aldığı şeyleri saymayı bıraktığın yerde değil, onların arasında hâlâ sana ait kalan şeyi fark ettiğin yerde. Bir insan gidebilir ama sen kendine nasıl davranacağını seçebilirsin. Bir plan bozulabilir ama yeniden ne kuracağını seçebilirsin. Geçmiş değişmez ama geçmişin bugünkü hayatındaki yerini değiştirebilirsin. İnsanların seni nasıl gördüğünü tamamen kontrol edemezsin ama onların bakışını kendi gerçeğin haline getirmek zorunda değilsin. Belki özgürlük, hayatın tam olarak istediğin gibi olması değildir. Hayat istediğin gibi olmadığında bile kendinden vazgeçmemeyi öğrenmektir. İnsan bazen kaybolduğunu sanır ama aslında yalnızca çok uzun zamandır kendi sesinden uzak yaşamıştır. Ve belki de dönüş yolu sandığımız kadar uzak değildir. Bazen yalnızca kendine dürüstçe soracağın tek bir soruyla başlar: Ben bütün bunların içinde ne zamandır kendimi duymuyorum?"
    ]
  },
  {
    "slug": "neden-hep-benzer-insanlara-cekiliyoruz",
    "number": "02",
    "categoryKey": "iliski-rezonansi",
    "category": "İLİŞKİ REZONANSI",
    "title": "Neden Hep Benzer İnsanlara Çekiliyoruz?",
    "description": "Tanıdık duyguların, geçmiş ilişki örüntülerinin ve sınırlarımızın partner seçimlerimizi nasıl etkileyebildiğini inceleyen bir yazı.",
    "readingTime": "10 Dakika",
    "isNew": true,
    "content": [
      "İnsan bazen hayatına giren kişilerin birbirinden tamamen farklı olduğunu düşünür. Biri daha sessizdir, biri daha dominant, biri daha romantik, diğeri daha mesafeli. İsimleri, yüzleri, meslekleri, hayat tarzları değişir ama ilişkinin içinde yaşanan duygular garip biçimde birbirine benzemeye başlayabilir. Başlangıçta çok değerli hissederken bir süre sonra yine bekleyen taraf olursun. İlk aylarda her şey çok yakınken sonra yine mesafe girer. Bir ilişkide kendini anlatmaya çalışmışsındır, diğerinde anlaşılmaya çalışırsın ama sonunda yine aynı yerde bulursun kendini: “Neden hep benzer şeyleri yaşıyorum?” İşte ilişki rezonansı dediğim yer tam olarak burada başlıyor. Çünkü insan yalnızca karşısındaki kişiyi seçmiyor; çoğu zaman tanıdığı bir duyguyu da seçiyor. Ve bazen o duygu sana iyi geldiği için değil, sana tanıdık geldiği için çekici oluyor.",
      "İnsan zihni tanıdığı şeyleri güvenli kabul etmeye eğilimlidir. Bu yüzden çocuklukta, aile ilişkilerinde ya da geçmiş deneyimlerde öğrendiğimiz bazı duygusal dinamikler yetişkin ilişkilerinde tekrar tekrar karşımıza çıkabilir. Sevgiye ulaşmak için çaba göstermek zorunda kaldıysan, seni kolayca seven biri sana yeterince yoğun gelmeyebilir. Sürekli eleştirildiğin bir ortamda büyüdüysen, onay almak için uğraştığın ilişkiler sana alışıldık gelebilir. Yakınlığın ardından mesafe geldiyse, sevgiyi hep kaybetme ihtimaliyle birlikte deneyimlemiş olabilirsin. Sonra hayatına biri girer ve sana yine aynı duyguyu yaşatır. Sen bunun güçlü bir çekim olduğunu düşünürsün. Kalbin hızlanır, zihnin sürekli onu düşünür, mesajını beklersin, davranışlarını anlamlandırmaya çalışırsın. Fakat bazen yoğunluk sandığımız şey sevgi değildir; eski bir duygunun yeniden harekete geçmesidir.",
      "İlişkilerde en çok karıştırdığımız şeylerden biri de budur. Bizi zorlayan kişiye daha fazla bağlandığımızda bunu “çok seviyorum” diye yorumlarız. Oysa bazen bağlandığımız kişi değil, onun içimizde aktive ettiği eksiklik hissidir. Biri sana yeterince açık davranmadığında daha fazla düşünmeye başlarsın. Ne hissettiğini anlamaya çalışırsın. Bir gün yakın, bir gün uzaksa her küçük yakınlık sana büyük bir ödül gibi gelir. Belirsizlik arttıkça zihnin ilişkiye daha fazla enerji harcar ve bir süre sonra yoğun düşünmeyi yoğun sevgiyle karıştırmaya başlayabilirsin. Oysa huzurlu bir ilişkide sürekli bir şey çözmek zorunda kalmazsın. Karşındaki insanın seni sevip sevmediğini her gün analiz etmezsin. Mesajların arasındaki süreyi ölçmez, her cümleden yeni anlamlar çıkarmazsın. Sevgi bazen düşündüğümüzden çok daha sessizdir. Fakat kaosa alışmış bir insan için sessizlik ilk başta boşluk gibi gelebilir.",
      "Bu yüzden insanın ilişkilerde kimi seçtiğinden önce, neyi tanıdığını anlaması gerekir. Çünkü bazen “ben hep yanlış insanları buluyorum” dediğimiz yerde aslında benzer duyguları üreten kişilere yöneliyoruzdur. Bunun tamamen bilinçli bir seçim olması gerekmez. Kimse oturup “beni değersiz hissettirecek birini bulmalıyım” diye düşünmez. Fakat içimizde çözülmemiş bazı inançlar, hangi davranışları tolere ettiğimizi ve hangi insanlara daha hızlı bağlandığımızı etkileyebilir. “Sevgi emek ister” cümlesi örneğin masum görünür. Fakat sen bu cümleyi “sevilmek için sürekli kendimi kanıtlamalıyım” şeklinde yaşıyorsan, ilişkide fedakârlık sınırını çok kolay aşabilirsin. Karşındaki insan geri çekildikçe sen daha fazla yaklaşır, ilgisi azaldıkça daha fazla vermeye başlarsın. Sonunda ilişki iki insanın karşılıklı kurduğu bir bağ olmaktan çıkar ve bir tarafın diğerini ikna etmeye çalıştığı bir yere dönüşür.",
      "İlişki rezonansı yalnızca karşına çıkan insanlarla ilgili değildir. Senin bir ilişkinin içinde nasıl birine dönüştüğünle de ilgilidir. Çünkü aynı kişi farklı ilişkilerde bambaşka davranabilir. Bazı insanların yanında daha güvende, bazı insanların yanında sürekli tetikte hissedersin. Biriyle konuşurken kendini açıkça ifade edebilirken başka biriyle her cümleni düşünmeye başlarsın. Burada yalnızca karşı tarafın davranışlarını incelemek yetmez. Kendi içindeki değişimi de görmek gerekir. Bu insanın yanında ben kim oluyorum? Daha çok mu susuyorum? Kendimi kanıtlamaya mı çalışıyorum? Onun ilgisini kaybetmemek için istemediğim şeylere evet mi diyorum? Sürekli onu anlamaya çalışırken kendi hislerimi geri plana mı atıyorum? Bir ilişkinin sana iyi gelip gelmediğini anlamanın en güçlü yollarından biri karşındaki kişiyi analiz etmek değil, o kişinin yanında kendinle kurduğun ilişkiye bakmaktır.",
      "Çünkü bazen bir insanın sana uygun olmadığını onun kötü biri olmasından anlamazsın. Yanında sürekli kendinden uzaklaştığını fark ederek anlarsın. Belki seni aldatmıyordur, sana bağırmıyordur, dışarıdan bakıldığında ortada büyük bir problem bile yoktur ama sen sürekli kendini küçültüyorsundur. Ne istediğini söylemekten çekiniyor, duygularını fazla buluyor, beklentilerini azaltıyor ve ilişki devam etsin diye kendinin bazı parçalarını sessizce kapatıyorsundur. Sonra bunu uyum sağlamak sanarsın. Oysa uyum ile kendinden vazgeçmek arasında çok ince ama çok önemli bir fark vardır. Sağlıklı bir ilişkide insan değişebilir, esneyebilir, bazı konularda orta yol bulabilir ama kendi varlığını kaybetmez. Sevilmek için başka bir karaktere dönüşmek zorunda kalmaz.",
      "Belki de bu yüzden bir ilişkinin bitmesi bazen yalnızca bir insanı kaybetmek değildir. O ilişkinin içinde kurduğun kimliği de kaybedersin. Gününün bir kısmı onunla konuşmaya göre şekillenmiştir. Gelecek planında o vardır. Bazı alışkanlıkların, bazı düşüncelerin, hatta kendini görme biçimin bile o ilişkinin içine yerleşmiştir. Ayrılık geldiğinde bu yüzden sadece kişiyi özlemezsin. O kişinin yanında olduğun halini de özlersin. Sonra insan çoğu zaman bu boşluğu tekrar eski ilişkiye dönerek kapatmak ister. Çünkü tanıdık acı, bilinmeyen bir hayattan daha güvenli gelebilir. İşte bazı döngüler tam burada yeniden başlar. Aynı kişiye dönmesen bile aynı dinamiği taşıyan başka birine yönelirsin ve hikâye yeni bir yüzle devam eder.",
      "Spiritüel dilde “rezonans” kelimesi çoğu zaman benzer enerjilerin birbirini çekmesi şeklinde anlatılır. Fakat bu fikri yalnızca görünmeyen bir çekim olarak ele almak insanın kendi davranışlarını görmesini zorlaştırabilir. Çünkü ilişkilerde rezonans dediğimiz şey bazen çok somut biçimlerde çalışır. Neye alışık olduğun, neye göz yumduğun, hangi davranışı sevgi sandığın, nerede sınır koyamadığın ve hangi duyguyu aşk olarak yorumladığın hayatına aldığın insanlarla kurduğun bağı etkiler. İnsan bir şeyi değiştirmek istediğinde yalnızca “daha farklı birini hayatıma çekmek istiyorum” demesi yetmez. Farklı bir ilişki yaşayabilmek için bazen ilişkinin içinde farklı davranmayı da öğrenmek gerekir.",
      "Çünkü sınır koymayan biri hayatına mükemmel insanı getirerek sınır sorununu çözmez. Kendini değersiz hisseden biri yalnızca çok seven bir partner bularak özdeğerini kalıcı biçimde kuramaz. Terk edilme korkusu yaşayan biri dünyanın en güvenilir insanıyla birlikte olsa bile içinde o korkuyu taşıyabilir. Bir partner bazı yaralarımızın iyileşmesine eşlik edebilir ama bizim yerimize o yarayı iyileştiremez. İlişkiler bazen bize kendimizle ilgili çok güçlü aynalar sunar. Sevildiğimiz yerde sevgiyi kabul edip edemediğimizi, eleştirildiğimiz yerde kendimizi nasıl koruduğumuzu, belirsizlikte ne kadar kaybolduğumuzu, yakınlık arttığında kaçıp kaçmadığımızı gösterir. Ve belki de ilişki rezonansını anlamanın en önemli kısmı budur: Karşındaki insan sana yalnızca kendisini göstermez, senin kendinle kurduğun ilişkiyi de görünür hale getirir.",
      "Bazen insan aynı ilişkiyi tekrar yaşamamak için yeni insanlardan kaçmaya çalışıyor. “Artık kimseye güvenmeyeceğim,” diyor. “Kimseye bağlanmayacağım.” Böylece zarar görmeyeceğini düşünüyor. Fakat kapanmak, iyileşmek değildir. Sadece yaranın dokunulmasını engellemektir. Gerçek değişim, bir daha kimseye ihtiyaç duymamak değil; ihtiyaç duyduğunda kendinden vazgeçmemeyi öğrenmektir. Sevmek ama sevgiyi dilenmemek. Yakınlaşmak ama sınırlarını kaybetmemek. Birini istemek ama onun seni istememesini kendi değerin hakkında verilmiş bir karar gibi görmemek. Bir ilişki bittiğinde üzülmek ama hayatının da bittiğine inanmamak. Bunlar kulağa küçük farklar gibi gelebilir ama insanın ilişki kaderini değiştiren şey çoğu zaman tam da bu farklardır.",
      "Belki de hayatımıza giren insanları tamamen kontrol edemeyiz. Kiminle karşılaşacağımızı, kimin kalacağını, kimin değişeceğini, kimin gideceğini önceden bilemeyiz. Stoa’nın hatırlattığı yer de burasıdır: Başkasının seçimi bizim kontrolümüzde değildir. Fakat kimi hayatımızda tutacağımız, neyi kabul edeceğimiz, hangi davranışın karşısında kalacağımız ve kendi değerimizi birinin davranışına teslim edip etmeyeceğimiz konusunda söz hakkımız vardır. İnsan ilişkilerde gerçek gücünü karşısındaki kişiyi değiştirdiğinde değil, kendi sınırını tanıdığında kazanmaya başlar.",
      "Belki de en büyük ilişki değişimi yeni birini bulduğunda başlamaz. Eski bir davranışı artık yapmadığında başlar. Eskiden peşinden koştuğun yerde durduğunda, sürekli açıklama aradığın yerde gerçeği gördüğünde, birinin ilgisizliğini kendi eksikliğin sanmadığında, sırf yalnız kalmamak için sana iyi gelmeyen bir yerde kalmadığında… İşte o zaman ilişki rezonansın değişmeye başlar. Çünkü artık yalnızca hayatına giren insanlar değişmiyordur. Sen de ilişkinin içinde başka bir yerden duruyorsundur. Ve bazen insanın hayatındaki en büyük dönüşüm, sonunda farklı birini seçmesi değil, kendisini terk etmeyi bırakmasıdır."
    ]
  },
  {
    "slug": "her-seyi-ayni-anda-tasimak-zorunda-degilim",
    "number": "03",
    "categoryKey": "goldkozmos-gunlugu",
    "category": "GOLDKOZMOS GÜNLÜĞÜ",
    "title": "Her Şeyi Aynı Anda Taşımak Zorunda Değilim",
    "description": "Üretkenlik, zihinsel yük, kendine yetişme baskısı ve bazen birazını yere bırakabilmenin neden gelişimin bir parçası olduğunu anlatan kişisel bir düşünce notu.",
    "readingTime": "5 Dakika",
    "isNew": true,
    "content": [
      "Son zamanlarda kendimde sık sık fark ettiğim bir şey var: Aynı anda çok fazla şeyi düşünmeye çalışıyorum. Bir iş yaparken diğerini düşünüyorum, birini tamamlarken aklım çoktan sıradakine geçiyor. Gün içinde aslında birçok şey yapmış olsam bile akşam olduğunda zihnim hâlâ “daha ne kaldı?” diye soruyor. Eskiden bunu üretkenlik sanıyordum. Bir şeylerle sürekli ilgilenmek, hep bir sonraki adımı düşünmek, boş durmamak bana çalışkanlık gibi geliyordu. Şimdi ise bazı günler bunun üretkenlikten çok zihinsel bir koşu hali olduğunu fark ediyorum. İnsan fiziksel olarak aynı yerde dururken bile kendi kafasının içinde saatlerce koşabiliyor.",
      "Geçenlerde yine böyle bir gün geçirdim. Yapmam gereken işler vardı ve hepsinin aynı gün tamamlanmasını istiyordum. Birine başladım, diğerini düşündüm. Öbürüne geçtim, ilkini yarım bıraktığım için huzursuz oldum. Günün sonunda aslında düşündüğümden çok daha fazla şey yapmıştım ama içimde hâlâ “yetmedi” hissi vardı. O an durup şunu düşündüm: Ben gerçekten yapılacak işlerden mi yoruluyorum, yoksa sürekli kendime yetişemediğimi söylemekten mi? Çünkü bazen insanın üzerinde baskı kuran şey dışarıdaki yoğunluk değil, kendi içinde kullandığı dil oluyor.",
      "Bunu fark ettiğimden beri üretkenliğe biraz daha farklı bakmaya çalışıyorum. Her gün aynı tempoda olmak zorunda değilim. Bazı günler çok şey yapabilirim, bazı günler daha az. Bunun karakterimle, değerimle ya da disiplinimle doğrudan bir ilgisi yok. İnsan bazen gerçekten yorulur. Bazen zihni doludur. Bazen bir işi yapmak için gereken enerji o gün yoktur. Bunları kabul etmek bana tembellik gibi gelmiyor artık. Tam tersine, kendi kapasitemi daha gerçekçi görmek gibi geliyor.",
      "Sanırım uzun süre “her şeyi halledeyim, sonra rahatlarım” düşüncesiyle yaşadım. Fakat hayat öyle işlemiyor. Bir şey bitiyor, başka bir şey başlıyor. Bir problem çözülüyor, yenisi çıkıyor. Bir dönem kapanıyor, başka bir dönem açılıyor. Her şeyin tamamen sakinleşeceği, bütün işlerin biteceği ve sonunda rahat rahat yaşayacağımız kusursuz bir gün yok. Bunu kabullenmek bana garip biçimde iyi geldi. Çünkü rahatlamayı sürekli geleceğe ertelediğinde, bugünün içinde hiç dinlenemiyorsun.",
      "Şimdi kendime daha çok şunu hatırlatıyorum: Bugün yapabildiğim şey, bugün için yeterli olabilir. Bu cümle bana hâlâ zaman zaman fazla rahat geliyor çünkü içimde sürekli daha fazlasını isteyen bir taraf var. Ama belki mesele onu tamamen susturmak değil. Ne zaman konuştuğunu fark etmek. Gerçekten daha fazlasını yapabilecek halde miyim, yoksa sadece kendime alıştığım baskıyı mı kuruyorum? Bu ikisini ayırmak benim için önemli hale geldi.",
      "Bence insan kendisini geliştirmeye çalışırken bazen kendisiyle olan ilişkisini unutabiliyor. Daha disiplinli olayım, daha sakin olayım, daha başarılı olayım, daha doğru kararlar vereyim derken kendimizi sürekli düzeltilmesi gereken bir proje gibi görmeye başlıyoruz. Oysa kendimizi tanımak yalnızca eksik yanlarımızı bulmak değil. Nerede kendimize gereksiz yük bindirdiğimizi de görebilmek.",
      "Ben şu sıralar bunu öğreniyorum. Her şeyi aynı anda taşımak zorunda değilim. Bir işi yarına bırakmak hayatımın dağıldığı anlamına gelmiyor. Bir gün daha az üretmek geriye gittiğim anlamına gelmiyor. Ve belki en önemlisi, kendime verdiğim değeri o gün kaç maddeyi tamamladığıma göre belirlememem gerekiyor.",
      "Bazen gelişim daha fazlasını yapmak değil, kendine gereksiz yere yüklediğin şeyi fark edip birazını yere bırakabilmekmiş. Benim bu ara en çok düşündüğüm şey bu."
    ]
  },
  {
    "slug": "insan-kendinden-ne-zaman-uzaklasir",
    "number": "04",
    "categoryKey": "kendilik-rezonansi",
    "category": "KENDİLİK REZONANSI",
    "title": "İnsan Kendinden Ne Zaman Uzaklaşır?",
    "description": "Özdeğer, sınırlar, onay ihtiyacı ve başkalarının beklentileri arasında insanın kendi sesini nasıl kaybedebildiğini sorgulayan bir yazı.",
    "readingTime": "8 Dakika",
    "isNew": true,
    "content": [
      "İnsan çoğu zaman kendisini tanıdığını düşünür. Neyi sevdiğini, neyi sevmediğini, nasıl biri olduğunu, neye dayanabildiğini bildiğini sanır. Fakat hayatın bazı dönemlerinde verdiğimiz kararların ne kadarının gerçekten bize ait olduğunu sorgulamaya başladığımızda işler değişir. Çünkü insan her zaman kendi istediği hayatı yaşamaz. Bazen kendisinden beklenen hayatı yaşar. Bazen ailesinin doğru bulduğu kişiye dönüşür, bazen çevresinin kabul edeceği şekilde davranır, bazen sevdiği birini kaybetmemek için kendi ihtiyaçlarını küçültür. Bunların hiçbiri bir anda olmaz. İnsan kendisinden yavaş yavaş uzaklaşır. Bir gün istemediği halde evet der, başka bir gün kırıldığı yerde sesini çıkarmaz, sonra kendisini fazla bulduklarını düşünerek daha az konuşmaya başlar. Bir süre sonra da bütün bunların kendi karakteri olduğuna inanmaya başlayabilir.",
      "Kendilik rezonansı dediğim şey tam olarak burada başlıyor. İnsanın yalnızca kendisi hakkında ne düşündüğüyle değil, kendisiyle nasıl bir ilişki kurduğu ile ilgilidir. Çünkü insanın kendi değerine dair taşıdığı düşünceler, hayatın birçok alanına sessizce sızar. Kendini yeterli görmeyen biri, yaptığı şeyi küçümseyebilir. Sevilmeye layık olduğuna inanmayan biri, sevgi gördüğünde bile bundan şüphe edebilir. Sürekli onay almaya alışmış biri, yalnızca kendi istediği için karar vermekte zorlanabilir. Kendini başkalarının gözünden görmeye başlayan biri için insanların memnuniyeti zamanla kendi huzurundan daha önemli hale gelebilir. Sonra insan neden sürekli yorulduğunu, neden hayatındaki insanlara bu kadar fazla verdiğini, neden hayır diyemediğini anlamaya çalışır. Belki de sorun yalnızca çevresindeki insanların çok şey istemesi değildir. Bazen insan kendi değerini faydalı olmakla, sevilmekle, kabul görmekle ya da birilerine yetebilmekle ölçmeyi öğrenmiştir.",
      "Bu yüzden kendilik meselesi yalnızca “kendini sev” cümlesiyle açıklanabilecek kadar basit değildir. İnsan kendisini sevdiğini söyleyebilir ama hâlâ kendi sınırlarını çiğneyebilir. Kendisine değer verdiğini düşünebilir ama başkasının onayı gelmediğinde bütün özgüvenini kaybedebilir. Güçlü olduğunu söyleyebilir ama yardım istemeyi zayıflık olarak gördüğü için sürekli tek başına mücadele edebilir. Kendine iyi davranmak bazen güzel cümleler söylemekten çok daha zor bir şeydir. Çünkü gerçek kendilik, insanın kendi ihtiyaçlarını da ciddiye almasını gerektirir. Yorulduğunu kabul etmeyi, istemediği bir şeyi reddetmeyi, bazen hayal kırıklığı yaratmayı göze almayı, herkes tarafından anlaşılmayacağını bilmeyi ve buna rağmen kendi doğrusu ile kalabilmeyi gerektirir.",
      "İnsanların büyük bir kısmı kendilerini başkalarının tepkileri üzerinden tanımaya çok erken yaşlarda başlar. Sessiz olduğunda “ne kadar uslu”, başarılı olduğunda “aferin”, itiraz ettiğinde “zor”, duygulandığında “çok hassas” denir. Bir çocuk bütün bunları yalnızca duymaz; kendisi hakkında bilgi gibi kaydeder. Sonra büyüdüğünde kendi duygularını bile bu etiketlerin içinden değerlendirebilir. Öfkelenince kendisini kötü biri sanır, sınır koyunca suçlu hisseder, dinlenmek istediğinde tembel olduğunu düşünür. Çünkü insan bazen kendi iç sesini kendi sesi zanneder ama o ses yıllar önce başka insanların söylediği cümlelerden oluşmuştur. Kendilik rezonansında en önemli farkındalıklardan biri de budur: Kafamın içinde benim hakkımda konuşan bu ses gerçekten bana mı ait?",
      "Belki de insanın kendisine dönmesi, önce bu sesleri ayırmayı öğrenmesiyle başlar. Ben gerçekten başarısız mıyım, yoksa hata yapmaktan korktuğum için hiçbir şeye başlamıyor muyum? Ben gerçekten fazla mı hassasım, yoksa yıllarca duygularım küçümsendiği için artık onları göstermeye çekiniyor muyum? İnsanlara yardım etmeyi gerçekten seviyor muyum, yoksa ancak ihtiyaç duyulduğum zaman değerli hissedebildiğim için mi sürekli kurtarıcı rolüne giriyorum? Yalnız kalmayı mı seviyorum, yoksa reddedilme ihtimalinden kaçtığım için mi kimseye yaklaşmıyorum? İnsan kendisine doğru soruları sormaya başladığında bazı özelliklerinin sandığı kadar değişmez olmadığını fark ediyor. Çünkü bazen karakter dediğimiz şey, uzun zamandır tekrar ettiğimiz bir savunma biçimidir.",
      "Kendimizi korumak için geliştirdiğimiz davranışlar bir dönem gerçekten işe yaramış olabilir. Çok fazla sorumluluk almak sana kontrol duygusu vermiş olabilir. Herkesin ihtiyacını önceden düşünmek çatışmadan uzak durmanı sağlamış olabilir. Duygularını göstermemek incinmeni engellemiş olabilir. Kimseye ihtiyaç duymamak güvenli hissettirmiş olabilir. Fakat insan büyüdüğünde eski korunma yöntemleri yeni hayatında görünmez bir kafese dönüşebilir. Artık seni korumayan bir davranışı hâlâ sürdürdüğünde, bunun bedelini ilişkilerinde, işinde ve kendi iç huzurunda ödemeye başlayabilirsin. Kendilik rezonansı biraz da bu yüzden insanın kendisini yargılamadan incelemesini gerektirir. “Neden böyleyim?” sorusundan çok “Bu davranış bir zamanlar beni neden koruyordu?” sorusu bazen çok daha fazla şey anlatır.",
      "İnsan kendisini anlamaya başladığında geçmişte yaptığı bazı şeylere de başka gözle bakıyor. Belki neden o ilişkide bu kadar uzun kaldığını, neden birinin peşinden bu kadar çok koştuğunu, neden kendisine iyi gelmeyen bir ortamdan çıkamadığını daha iyi görebiliyor. O zamanki halini küçümsemek yerine, o kişinin elindeki imkânlarla hayatta kalmaya çalıştığını fark ediyor. Kendini anlamak geçmişteki her davranışı haklı çıkarmak değildir ama kendi hikâyene yalnızca suçlayarak bakmayı bırakmaktır. Çünkü insan kendisine sürekli kızdığında değişmiyor; çoğu zaman daha fazla utanıyor ve aynı davranışları saklamaya başlıyor. Dönüşüm ise insanın kendisini dürüstçe görebildiği yerde başlıyor.",
      "Kendilik rezonansını spiritüel bir yerden düşündüğümüzde de benzer bir noktaya geliyoruz. İnsan çoğu zaman hayatına neyi çektiğini merak ediyor ama kendisine nasıl davrandığını daha az sorguluyor. Oysa sürekli kendisini küçümseyen, kendi emeğini değersiz gören, sınırlarını ihlal eden birinin dışarıdan yalnızca değer ve saygı beklemesi içsel bir çelişki yaratabilir. Buradaki mesele “sen neye inanırsan onu çekersin” gibi basit bir denklem değil. Mesele, kendimiz hakkında taşıdığımız inançların seçimlerimizi etkilemesi. Kendine değersiz davranan biri, değersiz hissettiren davranışlara daha uzun süre tahammül edebilir. Kendine güvenmeyen biri, fırsat geldiğinde geri çekilebilir. Sürekli başarısız olacağına inanan biri, başlamadığı şeylerin sonucunu kader zannedebilir. İnsan bazen hayatın ona ne verdiğini değil, kendisinin neyi kabul edilebilir gördüğünü değiştirdiğinde çok şey değişmeye başlar.",
      "Stoa felsefesinin burada sunduğu sakin ama güçlü bir taraf vardır. İnsan başkalarının kendisi hakkında ne düşüneceğini yönetemez. Herkes tarafından sevilmesini sağlayamaz. Geçmişini değiştiremez. Başına hiçbir kötü şey gelmeyeceğini garanti edemez. Fakat kendi değerini başkalarının fikrine teslim edip etmeyeceği, nerede duracağı, hangi davranışı kabul edeceği ve kendi hayatında nasıl biri olmak istediği konusunda bir alanı vardır. İnsan bu alanı fark ettiğinde kendilik duygusu da dışarıdaki dünyanın tepkilerinden biraz daha bağımsız hale gelir. Birinin seni beğenmemesi artık kim olduğuna dair nihai bir karar değildir. Bir başarısızlık bütün kimliğini tanımlamaz. Bir ayrılık seni sevilmez yapmaz. Bir hata karakterinin özeti değildir.",
      "Belki insanın kendisine yapabileceği en büyük haksızlıklardan biri, hayatının tek bir dönemini bütün kimliği sanmaktır. Kötü bir dönemden geçiyorsan başarısız biri olduğuna, yorulduysan güçsüz olduğuna, yanlış bir seçim yaptıysan karar veremeyen biri olduğuna inanmak kolaydır. Oysa insan sabit bir şey değildir. Yaşadıklarımız bizi etkiler ama bizi tamamen tanımlamaz. Bugün sınır koyamıyor olman bunu hiçbir zaman öğrenemeyeceğin anlamına gelmez. Bugün kendine güvenmemen, hayatının geri kalanında da böyle yaşayacağın anlamına gelmez. İnsan kendi davranışlarını fark edebildiği ölçüde onları dönüştürme ihtimali de kazanır.",
      "Kendilik rezonansının en zor taraflarından biri de başkalarının bizden memnun olmamasına dayanabilmektir. Çünkü uzun süre uyumlu, anlayışlı ve fedakâr olarak yaşamış biri değişmeye başladığında çevresindeki herkes bundan hoşlanmayabilir. Eskiden her şeye evet diyen biri hayır demeye başladığında “değiştin” denebilir. Sürekli açıklama yapan biri kendisini açıklamayı bıraktığında soğuk bulunabilir. Herkesin sorununu çözen biri kendi hayatına yönelmeye başladığında bencil olmakla suçlanabilir. Bu noktada insan eski haline dönmek isteyebilir çünkü kabul görmek tanıdıktır. Fakat kendine dönüş bazen birkaç insanın seni artık eskisi kadar kolay yönetememesi anlamına gelir. Ve bu her zaman rahat bir süreç değildir.",
      "İnsanın kendisini seçmesi, herkesi hayatından çıkarması ya da yalnızlaşması anlamına gelmez. Tam tersine, ilişkilerin içinde kendini koruyabilmek anlamına gelir. Sevmek ama kendinden vazgeçmemek, destek olmak ama herkesin yükünü taşımamak, empati kurmak ama kötü davranışı açıklamak için sürekli bahane üretmemek… Kendilik güçlü olduğunda insan başkalarına ihtiyaç duymayan biri haline gelmez. İhtiyaç duyduğu halde kendi değerini kaybetmeyen biri olur.",
      "Belki de kendini bulmak diye anlattığımız şey aslında yeni bir insan yaratmak değildir. Üzerine yıllar boyunca eklenen beklentilerin, korkuların, rollerin ve başkalarından alınmış tanımların arasından kendi sesini yeniden ayırt etmektir. İnsan kim olduğunu bir anda keşfetmez. Bazen kim olmadığını fark ederek yaklaşır kendisine. Artık taşımak istemediği rolleri bırakır, sürekli kanıtlamak zorunda hissettiği şeylerden uzaklaşır, kendisini başkalarının sevgisine göre ölçmemeyi öğrenir. Ve bütün bunların sonunda çok daha gösterişli bir versiyonuna değil, daha gerçek bir haline ulaşır.",
      "Belki kendilik rezonansı tam olarak budur. Hayatın sana sürekli seni değerli hissettirmesini beklemek yerine, kendi değerini yalnızca dışarıdan gelen tepkilerle ölçmemeyi öğrenmek. Herkesin seni anlamasını istemek yerine, önce kendine dürüst olabilmek. Kendi hayatında başkalarının beklentilerine göre şekil değiştiren biri olmaktan yavaş yavaş vazgeçmek. Çünkü insanın kendisine dönüşü çoğu zaman büyük bir aydınlanma anıyla başlamaz. Bazen yalnızca bir gün, yıllardır yaptığı bir şeyi yapmamayı seçmesiyle başlar."
    ]
  },
  {
    "slug": "insan-parayla-degerle-nasil-iliski-kurar",
    "number": "05",
    "categoryKey": "bolluk-rezonansi",
    "category": "BOLLUK REZONANSI",
    "title": "İnsan Parayla Değil, Değerle Nasıl Bir İlişki Kurar?",
    "description": "Para, özdeğer, alma-verme dengesi, emeğin karşılığı ve kaynaklarla kurduğumuz ilişkinin seçimlerimize nasıl yansıdığını ele alan bir yazı.",
    "readingTime": "10 Dakika",
    "isNew": true,
    "content": [
      "İnsan parayla ilişkisini çoğu zaman yalnızca ne kadar kazandığı üzerinden değerlendirir. Oysa para, hayatımızdaki en görünür konulardan biri olsa da onunla kurduğumuz ilişki çoğu zaman görünmeyen yerlerde şekillenir. Çocukken evde para hakkında nasıl konuşulduğu, eksikliğin nasıl yaşandığı, başarıya hangi anlamların yüklendiği, zengin insanların nasıl anlatıldığı, çalışmanın değerle nasıl ilişkilendirildiği zamanla zihnimizde küçük cümlelere dönüşür. “Para zor kazanılır.” “Çok isteyen insan açgözlüdür.” “Bizim ailede kimse öyle büyük paralar kazanmadı.” “Elindekinin kıymetini bil, fazlasını isteme.” “Önce çok çalışmalısın, sonra belki rahat edersin.” İnsan bu cümleleri yıllarca taşıdığında, yetişkin olduğunda yalnızca para kazanmaya çalışmaz; aynı zamanda para hakkında öğrendiği bütün eski anlamlarla da yaşamaya devam eder. İşte bolluk rezonansı dediğim yer biraz burada başlar. Ne kadar paran olduğundan önce, paraya, değere, almaya, üretmeye ve sahip olmaya içeride hangi anlamları verdiğinle ilgilidir.",
      "Bolluk denildiğinde çoğu insanın aklına daha fazla para gelir. Oysa bolluk yalnızca miktar değildir. İnsanın hayatında kaynaklarla kurduğu ilişkinin tamamıdır. Zamanını nasıl kullandığın, emeğinin karşılığını nasıl belirlediğin, bir fırsat geldiğinde onu alabilecek kadar kendine güvenip güvenmediğin, bir şey istediğinde bunu istemeye hakkın olup olmadığını nasıl değerlendirdiğin, kazandığın şeyi koruyup koruyamadığın da bu ilişkinin parçalarıdır. İnsan bazen para kazanmak ister ama kazandığında onu tutamaz. Bazen daha fazlasını hak ettiğini söyler ama ücret belirlerken sürekli geri çekilir. Bazen fırsat bekler ama fırsat geldiğinde “ben yapamam” diyerek kendisini dışarıda bırakır. Sonra hayatın ona yeterince vermediğini düşünür. Oysa bazı durumlarda mesele yalnızca dışarıdan ne geldiği değildir; insanın gelen şeyi kabul edebilme kapasitesi de önemlidir.",
      "Kendilik duygusu ile bolluk arasındaki ilişki tam da burada görünür hale gelir. İnsan kendi emeğini değersiz gördüğünde, başkasının ona verdiği değeri de kolay kolay kabul edemez. Yaptığı işi sürekli küçümser, “bunu herkes yapabilir” der, ücret isterken utanır, bir başarı kazandığında bunu şansa bağlar. Başkası aynı şeyi yaptığında profesyonel bulduğu işi kendisi yaptığında sıradan görür. Çünkü insan bazen kendi değerini tanımadığı için değil, değerli olduğunu söylemenin kendisine fazla geldiği için geri çekilir. Görünür olmak kibir gibi, istemek ayıp gibi, kazanmak tehlikeli gibi hissettirebilir. Böyle olunca bolluk isteği ile bolluğu taşıyabilme hali arasında sessiz bir çatışma oluşur.",
      "Bazı insanlar için para güvenliktir. Bazıları için özgürlük. Bazıları için güç. Bazıları için kontrol. Bazıları içinse sürekli kaybedilebilecek bir şey. Bu yüzden aynı miktardaki para iki insanda tamamen farklı duygular yaratabilir. Biri kazandığında rahatlar, diğeri kaybetme korkusuyla daha da gerilir. Biri harcadığında keyif alır, diğeri en küçük harcamada suçluluk hisseder. Biri yatırım yapmayı gelecek kurmak olarak görürken diğeri paranın elinden çıkmasını tehdit olarak algılar. Para kendi başına bütün bu anlamları taşımaz. İnsan yıllar boyunca ona anlam yükler ve sonra o anlamların içinde davranmaya başlar.",
      "Belki de bollukla ilgili en önemli farkındalıklardan biri şudur: Para konusunda aldığımız kararların tamamı matematikten ibaret değildir. Bazen duygularımız bütçemizden daha güçlüdür. Kendimizi kötü hissettiğimizde kontrolsüz harcayabilir, korktuğumuzda hiçbir şeye yatırım yapamayabilir, birine değerimizi kanıtlamak için gereğinden fazla para harcayabilir, ailemize yardım etmeyi sevgiyle karıştırıp kendi sınırlarımızı zorlayabiliriz. Bazen paramız olduğu halde yokmuş gibi yaşarız, bazen yokken varmış gibi davranırız. Çünkü para, insanın iç dünyasındaki pek çok şeyi görünür hale getiren güçlü bir alandır.",
      "Bolluk rezonansını yalnızca “pozitif düşünürsen para gelir” gibi bir fikirle açıklamak bu yüzden yetersiz kalır. Düşünceler elbette davranışlarımızı etkileyebilir ama hayatın ekonomik gerçekleri, fırsatlar, eğitim, koşullar, piyasa ve içinde yaşadığımız sistem de vardır. İnsan bütün bunları yok sayarak yalnızca zihnini değiştirip her sonucu kontrol edemez. Fakat kontrol edemediğimiz koşulların varlığı, kendi payımızı görmemize engel değildir. Stoa’nın burada hatırlattığı şey oldukça nettir: Bütün sonucu yönetemezsin ama kendi seçimin, hazırlığın, emeğin ve tutumun konusunda bir alanın vardır. İnsan bollukla ilişkisinde de önce bu alanı tanımak zorundadır.",
      "Çünkü bazen hayatımızda para eksikliğinden söz ederken aslında düzen eksikliğini konuşuyoruzdur. Ne kazandığımızı bilmiyoruzdur, nereye harcadığımızı takip etmiyoruzdur, plansız hareket ediyoruzdur ama bütün bunların üzerine “para bende durmuyor” gibi değişmez bir kimlik kurmuşuzdur. Bazen sorun fırsat gelmemesi değil, elimizdeki fırsatı küçümsemektir. Çok küçük olduğu için başlamayız. Mükemmel olmadığı için üretmeyiz. İlk adımın bize hemen büyük bir sonuç getirmeyeceğini bildiğimiz için erteleriz. Sonra yıllar geçer ve hâlâ büyük başlangıcı beklediğimizi fark ederiz. Oysa bolluk çoğu zaman büyük bir kapının açılmasıyla değil, insanın küçük kaynakları daha bilinçli kullanmaya başlamasıyla büyür.",
      "Üretkenlik de bollukla düşündüğümüzden daha yakın bir ilişkidedir. Fakat üretkenlik sürekli çalışmak anlamına gelmez. İnsan kendisini tüketerek de çok şey üretebilir ama bu sürdürülebilir olmayabilir. Bolluk yalnızca daha fazla yapmak değil, yaptığının karşılığını alabileceğin bir düzen kurabilmektir. Sürekli başkalarının ihtiyaçlarına yetişirken kendi işine zaman ayıramayan biri, çok çalışıyor olabilir ama kendi hayatında bir şey inşa etmiyor olabilir. Her gelen işe evet diyen biri kazanç elde ediyor gibi görünürken aslında enerjisini ve zamanını dağıtıyor olabilir. Bu yüzden insan bazen bolluğu artırmak için daha fazla şey yapmak yerine bazı şeyleri bırakmayı öğrenmek zorundadır.",
      "Bollukla ilgili bir başka zor mesele de alma kapasitesidir. Vermek çoğu insana daha güvenli gelir. Yardım etmek, destek olmak, bir şey sunmak kontrol hissi verir. Fakat almak insanı daha savunmasız hissettirebilir. İlgi almak, para almak, destek kabul etmek, yapılan işin karşılığını istemek bazı insanlar için düşündüğünden daha zor olabilir. Çünkü almak insanın kendi değerini kabul etmesini gerektirir. “Bunu hak ediyorum” diyebilmek, özellikle yıllarca değeri fedakârlıkla ölçmüş biri için kolay değildir. İnsan bazen vermeyi cömertlik sanarken aslında almaktan kaçıyor olabilir.",
      "Çocukken “iyi insan paylaşır” cümlesini öğrenmiş olabiliriz ama “iyi insan kendi ihtiyacını da önemser” kısmı çoğu zaman söylenmez. Başkalarına yardım ederken kendi kaynaklarını tüketmek erdem değildir. Sürekli borç verip kendi hayatını zorlaştırmak bolluk değildir. Emeğinin karşılığını istememek tevazu değildir. Kendini yok sayarak başkasını rahat ettirmek de fedakârlığın sağlıklı biçimi değildir. Bolluk biraz da insanın vermekle almak arasında denge kurabilmesidir. Çünkü yalnızca veren bir sistem sonunda tükenir, yalnızca alan bir sistem ise ilişki kuramaz.",
      "İnsan kendi parasal geçmişine dürüstçe baktığında bazı tekrarlar görebilir. Para eline geçtiğinde hızla bitmesi, her yükselişten sonra bir düşüş yaşaması, tam düzen kuracakken vazgeçmesi, gelir arttığında harcamanın da aynı hızla artması… Bunların hepsini mistik bir kader gibi görmek yerine davranış örüntülerine bakmak daha dönüştürücü olabilir. Bazen insan kendisine tanıdık gelen ekonomik seviyeye geri dönmeye çalışır. Daha fazla kazandığında garip hisseder, bunu sürdüremeyeceğini düşünür ve fark etmeden eski düzenine döner. Çünkü insanın alıştığı şey yalnızca para miktarı değil, kendisi hakkında taşıdığı kimliktir. “Ben zaten hep kıt kanaat geçinirim” düşüncesi uzun süre tekrarlandığında, daha farklı bir hayat kurmak yalnızca maddi değil kimliksel bir değişim haline gelir.",
      "Bolluk rezonansı bu yüzden insanın kendisine “Ne kadar para istiyorum?” diye sormasından önce “Para benim için ne demek?” diye sormasını gerektirir. Daha çok kazansan ne değişirdi? Kendini daha değerli mi hissederdin? Daha güvende mi? Birilerine kendini kanıtlamış mı olurdun? Yoksa yalnızca daha rahat yaşamak mı isterdin? Bu soruların cevabı önemlidir çünkü insan bazen paradan paranın veremeyeceği bir şeyi bekler. Para bazı sorunları gerçekten çözebilir, hayatı kolaylaştırabilir, seçenekleri artırabilir, güvenlik sağlayabilir. Ama insanın kendi değerini tamamen paraya bağladığı yerde miktar arttıkça huzurun da aynı oranda artacağına dair bir garanti yoktur.",
      "Aynı şey eksiklik hissi için de geçerlidir. İnsan bazen elinde çok şey olduğu halde zihinsel olarak sürekli yetersizlik içinde yaşayabilir. Çünkü kıtlık yalnızca maddi değildir. “Yetmez” duygusu bir düşünme biçimine dönüşebilir. Yeterince param yok, yeterince zamanım yok, yeterince yetenekli değilim, yeterince takipçim yok, yeterince başarılı değilim… Böyle bir zihin ne elde ederse etsin gözünü bir sonraki eksikliğe çevirir. Bu nedenle bolluk, sahip olduklarımızı romantikleştirip daha fazlasını istemekten vazgeçmek değildir. Elindekini görebilirken daha fazlasını da isteyebilme dengesidir. Şükretmek ile hedef koymak birbirinin zıttı değildir. İnsan bugünkü hayatını küçümsemeden yarın için daha fazlasını kurabilir.",
      "Spiritüel dünyada bolluk uzun süre “evrene doğru mesajı gönderme” fikri üzerinden anlatıldı. Belki bunun insanlara umut veren bir tarafı vardı ama umut tek başına sistem kurmaz. Bir niyet, davranışla buluşmadığında çoğu zaman yalnızca güzel bir düşünce olarak kalır. Daha fazla gelir istiyorsan bazen yeni bir beceri öğrenmen, daha görünür olman, ücretini yeniden düzenlemen, bütçeni takip etmen, bir projeyi gerçekten bitirmen veya uzun süredir korktuğun bir adımı atman gerekir. Bolluk bazı dönemlerde daha fazla inanmak değil, daha düzenli davranmak olabilir. Çünkü hayatımızdaki birçok değişim sessiz, tekrarlanan ve pek de büyülü görünmeyen kararlarla oluşur.",
      "İnsanın bollukla ilişkisi aynı zamanda sabırla da ilgilidir. Günümüzde her şey hızlı sonuç üzerinden anlatıldığı için küçük ilerlemeler değersiz görünmeye başladı. Bir işe başlanıyor ve birkaç hafta içinde büyük sonuç alınmadığında bırakılıyor. Bir içerik üretiliyor, hemen karşılık gelmezse yanlış olduğu düşünülüyor. Yeni bir düzen kuruluyor ama birkaç gün aksayınca tamamen terk ediliyor. Oysa hayatın büyük bölümünde sonuçlar bizim istediğimiz hızda oluşmaz. Stoa burada yeniden devreye girer. Sonucu tamamen yönetemezsin ama devam edip etmeyeceğini yönetebilirsin. Tohumun hangi gün büyüyeceğini belirleyemezsin ama toprağı sulayıp sulamayacağına karar verebilirsin.",
      "Belki bollukla ilişkimizde en fazla ihtiyaç duyduğumuz şey de budur: Sonuç ile özdeğeri birbirinden ayırmak. Bir işin tutmaması senin değersiz olduğunu göstermez. Bir ay az kazanmak başarısız bir insan olduğun anlamına gelmez. Bir fırsatı kaçırmak hayatın sana kapandığı anlamına gelmez. İnsan her sonucu kendi kimliğine çevirdiğinde üretmekten korkmaya başlar. Çünkü artık başarısız olan proje değildir, kendisidir. Böyle yaşayınca denemek bile tehlikeli hale gelir. Oysa insanın kendisine daha geniş bir alan açması gerekir. Bir şey işe yaramayabilir. Yeniden düzenlenebilir. Başka bir yol denenebilir. Para kaybedilebilir ve yeniden kazanılabilir. Planlar değişebilir. Bunların hiçbiri insanın değerini tek başına belirlemez.",
      "Belki de gerçek bolluk, insanın hayatında hiçbir zaman eksiklik yaşamaması değildir. Eksiklik geldiğinde kendisini kaybetmemesidir. Paranın azaldığı bir dönemde korkabilir ama bütün geleceğini o korkuya teslim etmez. Bir plan bozulduğunda yeniden düşünebilir. Kazandığında kendisini sabote etmek yerine bunu taşıyabilir. Başkasının başarısını gördüğünde kendi hayatının bittiğini düşünmez. İhtiyacı olduğunda yardım isteyebilir, kazandığında paylaşabilir, ama kendisini de unutmaz.",
      "İnsan bollukla daha sağlıklı bir ilişki kurmaya başladığında hayat bir anda kusursuz hale gelmez. Fakat bazı şeyler sessizce değişir. Artık her fırsatın peşinden koşmaz, kendisine uygun olanı seçmeye başlar. Daha fazla kazanmak için kendisini sürekli tüketmesi gerekmediğini fark eder. Parayı yalnızca harcanacak ya da korkulacak bir şey değil, yönetilecek bir kaynak olarak görmeye başlar. Emeğine fiyat biçerken utanmaz. Başarısını küçültmez. Bir şey istediğinde bunu istemesinin ayıp olmadığını bilir. Sahip olduklarını görebilirken daha fazlasını da kurabilir.",
      "Belki bolluk rezonansı tam olarak budur. Hayatın sana sürekli daha fazlasını vermesini beklemek değil, eline geçen şeyi görebilecek, yönetebilecek ve büyütebilecek bir iç düzen kurmak. Para geldiğinde korkmamak, para azaldığında kendini değersiz sanmamak, başarıyı kimliğinin tek ölçüsü haline getirmemek ve kendi emeğinin karşılığını istemekten çekinmemek. Çünkü bazen bolluğun önündeki en büyük engel, hayatın bize hiçbir şey vermemesi değildir. Elimizdekiyle ne yapacağımızı öğrenmeden sürekli daha fazlasını beklememizdir."
    ]
  }
] as GoldBlogArticle[];


const goldBlogHubStyles = `
  .goldblogPage .goldBlogSection {
    padding: 62px 0 78px !important;
    background: transparent !important;
  }

  .goldblogPage .goldBlogHub {
    width: min(1320px, calc(100% - 64px));
    margin: 0 auto;
  }

  .goldblogPage .goldBlogHubIntro {
    display: block;
    margin-bottom: 28px;
  }

  .goldblogPage .goldBlogHubEyebrow,
  .goldblogPage .goldBlogHubSectionEyebrow,
  .goldblogPage .goldBlogReaderEyebrow {
    margin: 0 0 12px;
    color: #a1772d;
    font-size: 10px;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: 0.19em;
  }

  .goldblogPage .goldBlogHubIntro h2,
  .goldblogPage .goldBlogHubSectionHeading h3 {
    margin: 0;
    color: #241911;
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 400;
    letter-spacing: -1.4px;
  }

  .goldblogPage .goldBlogHubIntro h2 {
    max-width: 760px;
    font-size: clamp(40px, 4vw, 61px);
    line-height: 0.98;
  }

  .goldblogPage .goldBlogHubIntro h2 span,
  .goldblogPage .goldBlogHubSectionHeading h3 span {
    color: #a8792a;
  }

  .goldblogPage .goldBlogHubIntroText {
    max-width: 470px;
    justify-self: end;
  }

  .goldblogPage .goldBlogHubIntroText p {
    margin: 0;
    color: #6e675d;
    font-size: 14px;
    line-height: 1.75;
  }

  .goldblogPage .goldBlogHubIntroText strong {
    color: #32241a;
    font-weight: 700;
  }

  .goldblogPage .goldBlogHubRailShell {
    position: relative;
    margin-bottom: 72px;
  }

  .goldblogPage .goldBlogHubRailTop,
  .goldblogPage .goldBlogHubSectionHeading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 18px;
  }

  .goldblogPage .goldBlogHubRailTop p {
    margin: 0;
    color: #8f8477;
    font-size: 11px;
    line-height: 1.5;
  }

  .goldblogPage .goldBlogHubRailControls {
    display: flex;
    gap: 8px;
  }

  .goldblogPage .goldBlogHubRailControls button {
    width: 40px;
    height: 40px;
    padding: 0;
    display: grid;
    place-items: center;
    border: 1px solid rgba(160, 117, 42, 0.27);
    border-radius: 50%;
    background: rgba(255, 253, 248, 0.82);
    color: #916a27;
    font-size: 15px;
    cursor: pointer;
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background 160ms ease;
  }

  .goldblogPage .goldBlogHubRailControls button:hover {
    transform: translateY(-2px);
    border-color: rgba(160, 117, 42, 0.48);
    background: #fffdf8;
  }

  .goldblogPage .goldBlogCategoryRail,
  .goldblogPage .goldBlogNewRail {
    display: flex;
    gap: 16px;
    width: 100%;
    padding: 4px 2px 12px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .goldblogPage .goldBlogCategoryRail::-webkit-scrollbar,
  .goldblogPage .goldBlogNewRail::-webkit-scrollbar {
    display: none;
  }

  .goldblogPage .goldBlogCategoryCard {
    position: relative;
    flex: 0 0 calc((100% - 64px) / 5);
    min-width: 220px;
    min-height: 0;
    padding: 18px 18px 20px;
    overflow: hidden;
    scroll-snap-align: start;
    border: 1px solid rgba(202, 157, 76, 0.28);
    border-radius: 24px;
    background:
      radial-gradient(circle at 88% 10%, rgba(213, 171, 91, 0.17), transparent 30%),
      linear-gradient(145deg, #2b1d13 0%, #1b120d 100%);
    box-shadow: none;
    color: #fffaf1;
    text-align: left;
    cursor: pointer;
    transition:
      transform 180ms ease,
      border-color 180ms ease;
  }

  .goldblogPage .goldBlogCategoryCard:hover,
  .goldblogPage .goldBlogCategoryCard.isActive {
    transform: translateY(-4px);
    border-color: rgba(217, 175, 94, 0.72);
  }

  .goldblogPage .goldBlogCategoryCard::after {
    content: "";
    position: absolute;
    right: -42px;
    bottom: -64px;
    width: 150px;
    height: 150px;
    border: 1px solid rgba(217, 175, 94, 0.11);
    border-radius: 50%;
  }

  .goldblogPage .goldBlogCategoryCardTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
  }

  .goldblogPage .goldBlogCategoryCardTop span:first-child {
    color: #d5aa58;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.15em;
  }

  .goldblogPage .goldBlogCategoryCardTop span:last-child {
    width: 29px;
    height: 29px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(218, 176, 96, 0.26);
    border-radius: 50%;
    color: #d5aa58;
    font-size: 11px;
  }

  .goldblogPage .goldBlogCategoryCard p {
    margin: 0 0 9px;
    color: #c99d4e;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.14em;
  }

  .goldblogPage .goldBlogCategoryCard h3 {
    max-width: 190px;
    margin: 0;
    color: #fffaf1;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 25px;
    font-weight: 400;
    line-height: 1.03;
  }

  .goldblogPage .goldBlogCategoryCard small {
    display: block;
    max-width: 210px;
    margin-top: 13px;
    color: rgba(255, 250, 241, 0.57);
    font-size: 10px;
    line-height: 1.55;
  }

  .goldblogPage .goldBlogCategoryCardImage {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    margin: 0 0 16px;
    overflow: hidden;
    border: 1px solid rgba(207, 164, 82, 0.18);
    border-radius: 16px;
    background: rgba(255, 250, 241, 0.045);
  }

  .goldblogPage .goldBlogCategoryCardImage img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
  }

  .goldblogPage .goldBlogNewSection {
    margin-bottom: 76px;
    padding: 34px 34px 28px;
    border: 1px solid rgba(168, 124, 44, 0.16);
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.58);
    box-shadow: 0 22px 60px rgba(78, 51, 17, 0.06);
  }

  .goldblogPage .goldBlogHubSectionHeading h3 {
    font-size: clamp(31px, 3vw, 44px);
    line-height: 1;
  }

  .goldblogPage .goldBlogNewCard {
    flex: 0 0 calc((100% - 32px) / 3);
    min-width: 220px;
    min-height: 0;
    padding: 18px;
    display: flex;
    flex-direction: column;
    scroll-snap-align: start;
    border: 1px solid rgba(168, 124, 44, 0.17);
    border-radius: 18px;
    background:
      radial-gradient(circle at 96% 4%, rgba(200, 157, 78, 0.12), transparent 29%),
      linear-gradient(180deg, #fffdf9 0%, #fbf6ed 100%);
    box-shadow: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }

  .goldblogPage .goldBlogNewCardMeta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 28px;
  }

  .goldblogPage .goldBlogNewBadge {
    padding: 6px 9px;
    border: 1px solid rgba(166, 121, 40, 0.2);
    border-radius: 999px;
    color: #936a26;
    background: rgba(196, 150, 63, 0.07);
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.13em;
  }

  .goldblogPage .goldBlogNewCardMeta span:last-child {
    color: #9d958a;
    font-size: 9px;
    font-weight: 700;
  }

  .goldblogPage .goldBlogNewCard p {
    margin: 0 0 8px;
    color: #9b742f;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.14em;
  }

  .goldblogPage .goldBlogNewCard h4 {
    margin: 0;
    color: #251b14;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 25px;
    font-weight: 400;
    line-height: 1.05;
  }

  .goldblogPage .goldBlogNewCardTitle {
    margin: 0;
    color: #251b14;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -0.03em;
  }

  .goldblogPage .goldBlogNewCard > span {
    display: block;
    margin-top: 12px;
    color: #756e64;
    font-size: 10.5px;
    line-height: 1.58;
  }

  .goldblogPage .goldBlogNewCard button {
    width: fit-content;
    margin-top: auto;
    padding: 10px 14px;
    border: 1px solid rgba(160, 117, 42, 0.24);
    border-radius: 999px;
    background: transparent;
    color: #8d6728;
    font-size: 9px;
    font-weight: 800;
    cursor: pointer;
  }

  .goldblogPage .goldBlogArchive {
    scroll-margin-top: 110px;
  }

  .goldblogPage .goldBlogArchiveHeader {
    display: grid;
    grid-template-columns: minmax(0, 0.75fr) minmax(340px, 1.25fr);
    gap: 56px;
    align-items: end;
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(164, 120, 43, 0.16);
  }

  .goldblogPage .goldBlogArchiveHeader h3 {
    margin: 0;
    color: #251b14;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(34px, 3.2vw, 48px);
    font-weight: 400;
    line-height: 1;
  }

  .goldblogPage .goldBlogArchiveHeader h3 span {
    color: #a8792a;
  }

  .goldblogPage .goldBlogArchiveHeader > p {
    margin: 0;
    color: #746d63;
    font-size: 13px;
    line-height: 1.7;
  }

  .goldblogPage .goldBlogArticleList {
    display: grid;
    gap: 12px;
  }

  .goldblogPage .goldBlogArticleRow {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr) auto;
    gap: 24px;
    align-items: center;
    padding: 24px 26px;
    border: 1px solid rgba(162, 118, 40, 0.14);
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.67);
    box-shadow: 0 12px 30px rgba(76, 49, 15, 0.04);
  }

  .goldblogPage .goldBlogArticleRowNumber {
    color: #b38434;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 25px;
  }

  .goldblogPage .goldBlogArticleRowCopy p {
    margin: 0 0 7px;
    color: #9d742d;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.14em;
  }

  .goldblogPage .goldBlogArticleRowCopy h4 {
    margin: 0;
    color: #281d15;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 25px;
    font-weight: 400;
    line-height: 1.08;
  }

  .goldblogPage .goldBlogArticleRowCopy span {
    display: block;
    max-width: 780px;
    margin-top: 8px;
    color: #777066;
    font-size: 11px;
    line-height: 1.55;
  }

  .goldblogPage .goldBlogArticleRowAction {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 11px;
  }

  .goldblogPage .goldBlogArticleRowAction small {
    color: #989086;
    font-size: 9px;
    font-weight: 700;
  }

  .goldblogPage .goldBlogArticleRowAction button {
    min-width: 132px;
    min-height: 40px;
    padding: 0 15px;
    border: 1px solid rgba(181, 137, 56, 0.34);
    border-radius: 999px;
    background:
      linear-gradient(135deg, #2a1c13 0%, #1a120d 100%);
    color: #ddb362;
    font-size: 9px;
    font-weight: 800;
    cursor: pointer;
    transition: transform 160ms ease;
  }

  .goldblogPage .goldBlogArticleRowAction button:hover {
    transform: translateY(-2px);
  }

  .goldblogPage .goldBlogNewsletter {
    margin-top: 64px !important;
  }

  .goldBlogReaderBackdrop {
    position: fixed;
    inset: 0;
    z-index: 100000;
    padding: 28px;
    display: grid;
    place-items: center;
    background: rgba(20, 13, 9, 0.72);
    backdrop-filter: blur(9px);
  }

  .goldBlogReaderPaper {
    position: relative;
    display: flex;
    flex-direction: column;
    width: min(980px, 100%);
    height: min(90vh, 920px);
    overflow: hidden;
    border: 1px solid rgba(206, 161, 75, 0.36);
    border-radius: 28px;
    background:
      radial-gradient(circle at 92% 4%, rgba(206, 161, 75, 0.10), transparent 25%),
      #fffdf8;
    box-shadow:
      0 40px 120px rgba(0, 0, 0, 0.38),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  .goldBlogReaderTopbar {
    position: absolute;
    inset: 0 0 auto;
    z-index: 5;
    min-height: 72px;
    padding: 0 18px 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    border-bottom: 1px solid rgba(173, 129, 48, 0.13);
    background: rgba(255, 253, 248, 0.94);
    backdrop-filter: blur(15px);
  }

  .goldBlogReaderBrand {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #9c742d;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.13em;
  }

  .goldBlogReaderBrand span:first-child {
    width: 29px;
    height: 29px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(171, 127, 45, 0.27);
    border-radius: 50%;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 11px;
  }

  .goldBlogReaderActions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .goldBlogReaderShareButton,
  .goldBlogReaderCloseButton {
    min-height: 38px;
    border: 1px solid rgba(166, 121, 41, 0.24);
    background: #fffaf1;
    color: #7f5c24;
    cursor: pointer;
  }

  .goldBlogReaderShareButton {
    padding: 0 14px;
    border-radius: 999px;
    font-size: 9px;
    font-weight: 800;
  }

  .goldBlogReaderCloseButton {
    width: 38px;
    padding: 0;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 17px;
  }

  .goldBlogReaderProgress {
    position: absolute;
    top: 71px;
    left: 0;
    z-index: 6;
    width: 100%;
    height: 2px;
    background: rgba(164, 119, 39, 0.08);
  }

  .goldBlogReaderProgress span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #9e7224, #dfbf7c);
    transition: width 100ms linear;
  }

  .goldBlogReaderScroll {
    flex: 1;
    min-height: 0;
    height: auto;
    padding: 112px 0 120px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .goldBlogReaderArticle {
    width: min(760px, calc(100% - 80px));
    margin: 0 auto;
  }

  .goldBlogReaderEyebrow {
    margin-bottom: 14px;
  }

  .goldBlogReaderArticle h2 {
    max-width: 720px;
    margin: 0;
    color: #221812;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(39px, 5vw, 58px);
    font-weight: 400;
    line-height: 1.01;
    letter-spacing: -1.8px;
  }

  .goldBlogReaderMeta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 22px 0 36px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(166, 121, 41, 0.14);
  }

  .goldBlogReaderMeta span {
    padding: 7px 10px;
    border: 1px solid rgba(166, 121, 41, 0.16);
    border-radius: 999px;
    color: #8e6a2b;
    background: rgba(192, 146, 58, 0.05);
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.09em;
  }

  .goldBlogReaderBody {
    color: #443a32;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 18px;
    line-height: 1.92;
  }

  .goldBlogReaderBody p {
    margin: 0 0 27px;
  }

  .goldBlogReaderBody p:first-child::first-letter {
    float: left;
    margin: 8px 9px 0 0;
    color: #a5792a;
    font-size: 58px;
    line-height: 0.75;
  }

  .goldBlogReaderEnd {
    margin-top: 42px;
    padding: 28px 0 0;
    border-top: 1px solid rgba(164, 119, 39, 0.16);
  }

  .goldBlogReaderEnd > p {
    margin: 0;
    color: #9d742d;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.14em;
  }

  .goldBlogReaderEnd h3 {
    margin: 9px 0 18px;
    color: #281d15;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 25px;
    font-weight: 400;
  }

  .goldBlogSharePopover {
    position: absolute;
    top: 64px;
    right: 64px;
    z-index: 10;
    width: min(330px, calc(100vw - 48px));
    padding: 18px;
    border: 1px solid rgba(176, 130, 44, 0.24);
    border-radius: 18px;
    background: #fffdf8;
    box-shadow: 0 20px 54px rgba(46, 29, 12, 0.18);
  }

  .goldBlogSharePopover > p {
    margin: 0 0 5px;
    color: #8d6728;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.11em;
  }

  .goldBlogSharePopover > span {
    display: block;
    margin-bottom: 14px;
    color: #746d63;
    font-size: 10px;
    line-height: 1.5;
  }

  .goldBlogShareOptions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .goldBlogShareOptions button {
    min-height: 42px;
    padding: 0 11px;
    border: 1px solid rgba(169, 124, 42, 0.19);
    border-radius: 12px;
    background: #fbf6ed;
    color: #5a4630;
    font-size: 9px;
    font-weight: 800;
    cursor: pointer;
  }

  .goldBlogShareHint {
    margin-top: 12px !important;
    color: #9a9187 !important;
    font-size: 8px !important;
    font-weight: 600 !important;
    line-height: 1.5 !important;
    letter-spacing: 0 !important;
  }

  @media (max-width: 1000px) {
    .goldblogPage .goldBlogHubIntro,
    .goldblogPage .goldBlogArchiveHeader {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .goldblogPage .goldBlogHubIntroText {
      max-width: 680px;
      justify-self: start;
    }

    .goldblogPage .goldBlogCategoryCard {
      flex-basis: 33%;
    }

    .goldblogPage .goldBlogNewCard {
      flex-basis: 47%;
    }
  }

  @media (max-width: 700px) {
    .goldblogPage .goldBlogSection {
      padding: 42px 0 58px !important;
    }

    .goldblogPage .goldBlogHub {
      width: calc(100% - 28px);
    }

    .goldblogPage .goldBlogHubIntro {
      margin-bottom: 26px;
    }

    .goldblogPage .goldBlogHubIntro h2 {
      font-size: 39px;
    }

    .goldblogPage .goldBlogHubRailShell {
      margin-bottom: 50px;
    }

    .goldblogPage .goldBlogHubRailControls {
      display: none;
    }

    .goldblogPage .goldBlogCategoryRail,
    .goldblogPage .goldBlogNewRail {
      margin-right: -14px;
      width: calc(100% + 14px);
    }

    .goldblogPage .goldBlogCategoryCard {
      flex-basis: 82%;
      min-width: 0;
      padding: 16px;
    }

    .goldblogPage .goldBlogNewSection {
      margin-left: -2px;
      margin-right: -2px;
      margin-bottom: 54px;
      padding: 25px 18px 20px;
      border-radius: 24px;
    }

    .goldblogPage .goldBlogNewCard {
      flex-basis: 88%;
      min-width: 0;
    }

    .goldblogPage .goldBlogArticleRow {
      grid-template-columns: 44px minmax(0, 1fr);
      gap: 14px;
      padding: 20px 18px;
    }

    .goldblogPage .goldBlogArticleRowAction {
      grid-column: 2;
      align-items: flex-start;
    }

    .goldblogPage .goldBlogArticleRowCopy h4 {
      font-size: 23px;
    }

    .goldBlogReaderBackdrop {
      padding: 0;
      place-items: stretch;
    }

    .goldBlogReaderPaper {
      width: 100%;
      height: 100dvh;
      border: 0;
      border-radius: 0;
    }

    .goldBlogReaderTopbar {
      min-height: 66px;
      padding: 0 12px 0 16px;
    }

    .goldBlogReaderProgress {
      top: 65px;
    }

    .goldBlogReaderBrand {
      font-size: 8px;
    }

    .goldBlogReaderShareButton {
      padding: 0 11px;
    }

    .goldBlogReaderScroll {
      padding: 98px 0 120px;
    }

    .goldBlogReaderArticle {
      width: calc(100% - 38px);
    }

    .goldBlogReaderArticle h2 {
      font-size: 37px;
      letter-spacing: -1.2px;
    }

    .goldBlogReaderBody {
      font-size: 16.5px;
      line-height: 1.82;
    }

    .goldBlogReaderBody p {
      margin-bottom: 24px;
    }

    .goldBlogSharePopover {
      top: 58px;
      right: 12px;
    }
  }

  /* =========================================================
     GOLDBLOG DESKTOP - PREMIUM EDITORIAL OVERRIDE
     SADECE MASAÜSTÜ GÖRÜNÜM
  ========================================================= */
  @media (min-width: 901px) {
    .goldblogPage .goldBlogSection {
      padding: 76px 0 96px !important;
      background:
        radial-gradient(circle at 100% 0%, rgba(185, 134, 42, 0.09), transparent 24%),
        radial-gradient(circle at 0% 58%, rgba(179, 132, 47, 0.055), transparent 22%),
        linear-gradient(180deg, #fffdf9 0%, #f7f0e5 100%) !important;
    }

    .goldblogPage .goldBlogHub {
      width: min(1580px, calc(100% - 96px)) !important;
      max-width: none !important;
      margin: 0 auto !important;
    }

    /* ---------- ÜST BAŞLIK ---------- */

    .goldblogPage .goldBlogHubIntro {
      display: block !important;
      margin-bottom: 36px !important;
      padding-bottom: 28px !important;
      border-bottom:
        1px solid rgba(162, 115, 34, 0.14) !important;
    }

    .goldblogPage .goldBlogHubEyebrow,
    .goldblogPage .goldBlogHubSectionEyebrow,
    .goldblogPage .goldBlogReaderEyebrow {
      margin-bottom: 15px !important;
      color: #a2752a !important;
      font-size: 11px !important;
      letter-spacing: 0.22em !important;
    }

    .goldblogPage .goldBlogHubIntro h2 {
      max-width: 920px !important;
      font-size: clamp(54px, 4.4vw, 78px) !important;
      line-height: 0.96 !important;
      letter-spacing: -2.7px !important;
    }

    .goldblogPage .goldBlogHubIntro h2 span {
      color: #b28434 !important;
    }

    .goldblogPage .goldBlogHubIntroText {
      max-width: 520px !important;
      padding: 0 0 5px 31px !important;
      border-left:
        1px solid rgba(169, 123, 43, 0.22) !important;
    }

    .goldblogPage .goldBlogHubIntroText p {
      color: #685f55 !important;
      font-size: 15px !important;
      line-height: 1.82 !important;
    }

    .goldblogPage .goldBlogHubIntroText strong {
      color: #2c2018 !important;
    }

    /* ---------- KATEGORİLER ---------- */

    .goldblogPage .goldBlogHubRailShell {
      margin-bottom: 94px !important;
    }

    .goldblogPage .goldBlogHubRailTop {
      margin-bottom: 17px !important;
      padding: 0 2px !important;
    }

    .goldblogPage .goldBlogHubRailTop > p {
      color: #8a7f72 !important;
      font-size: 11px !important;
      letter-spacing: 0.02em !important;
    }

    .goldblogPage .goldBlogHubRailControls {
      gap: 9px !important;
    }

    .goldblogPage .goldBlogHubRailControls button {
      width: 43px !important;
      height: 43px !important;
      border:
        1px solid rgba(166, 121, 40, 0.24) !important;
      background: rgba(255, 253, 248, 0.94) !important;
      color: #8f6827 !important;
      box-shadow:
        0 8px 22px rgba(74, 49, 17, 0.05) !important;
    }

    .goldblogPage .goldBlogCategoryRail {
      gap: 18px !important;
      padding: 5px 2px 18px !important;
    }

    .goldblogPage .goldBlogCategoryCard {
      flex:
        0 0 calc((100% - 72px) / 5) !important;
      min-width: 260px !important;
      min-height: 0 !important;
      padding: 22px 22px 20px !important;
      border:
        1px solid rgba(174, 128, 45, 0.18) !important;
      border-radius: 19px !important;
      background:
        radial-gradient(circle at 96% 0%, rgba(202, 158, 75, 0.12), transparent 31%),
        linear-gradient(155deg, #fffefb 0%, #f8f1e6 100%) !important;
      box-shadow:
        0 18px 42px rgba(68, 43, 14, 0.055),
        inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
      color: #2a1e16 !important;
    }

    .goldblogPage .goldBlogCategoryCard::before {
      content: "" !important;
      position: absolute !important;
      top: 0 !important;
      left: 27px !important;
      width: 58px !important;
      height: 2px !important;
      background:
        linear-gradient(
          90deg,
          #a87826,
          rgba(213, 174, 96, 0.35)
        ) !important;
    }

    .goldblogPage .goldBlogCategoryCard::after {
      right: -58px !important;
      bottom: -78px !important;
      width: 185px !important;
      height: 185px !important;
      border:
        1px solid rgba(173, 127, 44, 0.08) !important;
    }

    .goldblogPage
    .goldBlogCategoryCard:not(.isActive):hover {
      transform: translateY(-6px) !important;
      border-color:
        rgba(173, 127, 44, 0.34) !important;
      box-shadow:
        0 24px 54px rgba(68, 43, 14, 0.09) !important;
    }

    .goldblogPage .goldBlogCategoryCard.isActive {
      transform: translateY(-7px) !important;
      border-color:
        rgba(218, 177, 97, 0.62) !important;
      background:
        radial-gradient(circle at 92% 4%, rgba(203, 159, 76, 0.16), transparent 30%),
        linear-gradient(145deg, #2b1d14 0%, #160e0a 100%) !important;
      box-shadow:
        0 28px 64px rgba(42, 25, 12, 0.22),
        0 0 0 1px rgba(213, 170, 87, 0.05) !important;
    }

    .goldblogPage
    .goldBlogCategoryCard.isActive::before {
      background:
        linear-gradient(
          90deg,
          #d6a957,
          rgba(235, 205, 145, 0.42)
        ) !important;
    }

    .goldblogPage
    .goldBlogCategoryCard
    .goldBlogCategoryCardTop {
      margin-bottom: 12px !important;
    }

    .goldblogPage
    .goldBlogCategoryCardTop
    span:first-child {
      color: #ad7e2b !important;
      font-size: 10px !important;
      letter-spacing: 0.18em !important;
    }

    .goldblogPage
    .goldBlogCategoryCardTop
    span:last-child {
      width: 32px !important;
      height: 32px !important;
      color: #9b7128 !important;
      border-color:
        rgba(169, 123, 43, 0.22) !important;
      background:
        rgba(255, 255, 255, 0.45) !important;
    }

    .goldblogPage
    .goldBlogCategoryCard.isActive
    .goldBlogCategoryCardTop
    span:first-child,
    .goldblogPage
    .goldBlogCategoryCard.isActive
    .goldBlogCategoryCardTop
    span:last-child {
      color: #d7aa59 !important;
    }

    .goldblogPage
    .goldBlogCategoryCard.isActive
    .goldBlogCategoryCardTop
    span:last-child {
      border-color:
        rgba(220, 178, 95, 0.28) !important;
      background:
        rgba(255, 250, 240, 0.025) !important;
    }

    .goldblogPage .goldBlogCategoryCard > p {
      margin-bottom: 11px !important;
      color: #a4772a !important;
      font-size: 9px !important;
      letter-spacing: 0.16em !important;
    }

    .goldblogPage .goldBlogCategoryCard h3 {
      max-width: 240px !important;
      color: #2a1e16 !important;
      font-size: 31px !important;
      line-height: 1.02 !important;
      letter-spacing: -0.7px !important;
    }

    .goldblogPage .goldBlogCategoryCard small {
      max-width: 235px !important;
      margin-top: 16px !important;
      color: #786f65 !important;
      font-size: 11px !important;
      line-height: 1.62 !important;
    }

    .goldblogPage .goldBlogCategoryCard.isActive h3 {
      color: #fffaf1 !important;
    }

    .goldblogPage .goldBlogCategoryCard.isActive > p {
      color: #d1a253 !important;
    }

    .goldblogPage .goldBlogCategoryCard.isActive small {
      color:
        rgba(255, 249, 239, 0.62) !important;
    }

    /* ---------- YENİ EKLENENLER ---------- */

    .goldblogPage .goldBlogNewSection {
      margin-bottom: 94px !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    .goldblogPage
    .goldBlogNewSection
    .goldBlogHubSectionHeading {
      margin-bottom: 27px !important;
      padding-bottom: 24px !important;
      border-bottom:
        1px solid rgba(164, 119, 39, 0.14) !important;
    }

    .goldblogPage
    .goldBlogHubSectionHeading
    h3 {
      font-size: clamp(42px, 3.6vw, 60px) !important;
      letter-spacing: -1.8px !important;
    }

    .goldblogPage .goldBlogNewRail {
      gap: 18px !important;
      padding: 4px 2px 18px !important;
      align-items: stretch !important;
    }

    .goldblogPage .goldBlogNewCard {
      position: relative !important;
      flex: 0 0 25.5% !important;
      min-width: 350px !important;
      min-height: 348px !important;
      padding: 31px !important;
      overflow: hidden !important;
      border:
        1px solid rgba(166, 121, 40, 0.16) !important;
      border-radius: 22px !important;
      background:
        radial-gradient(circle at 100% 0%, rgba(192, 145, 55, 0.10), transparent 33%),
        linear-gradient(180deg, #fffefb 0%, #f8f1e7 100%) !important;
      box-shadow:
        0 17px 42px rgba(70, 45, 15, 0.055) !important;
    }

    .goldblogPage .goldBlogNewCard:first-child {
      flex-basis: 45% !important;
      min-width: 560px !important;
      background:
        radial-gradient(circle at 96% 4%, rgba(202, 158, 76, 0.14), transparent 31%),
        linear-gradient(145deg, #2c1e15 0%, #17100c 100%) !important;
      border-color:
        rgba(216, 172, 88, 0.42) !important;
      box-shadow:
        0 26px 64px rgba(43, 26, 13, 0.17) !important;
    }

    .goldblogPage .goldBlogNewCard::after {
      position: absolute !important;
      right: 22px !important;
      bottom: -20px !important;
      color:
        rgba(157, 112, 34, 0.08) !important;
      font-family:
        Georgia,
        "Times New Roman",
        serif !important;
      font-size: 112px !important;
      line-height: 1 !important;
      pointer-events: none !important;
    }

    .goldblogPage .goldBlogNewCard:nth-child(1)::after {
      content: "01" !important;
      color:
        rgba(230, 190, 111, 0.08) !important;
    }

    .goldblogPage .goldBlogNewCard:nth-child(2)::after {
      content: "02" !important;
    }

    .goldblogPage .goldBlogNewCard:nth-child(3)::after {
      content: "03" !important;
    }

    .goldblogPage .goldBlogNewCardMeta {
      margin-bottom: 52px !important;
    }

    .goldblogPage .goldBlogNewBadge {
      padding: 7px 10px !important;
      color: #936a25 !important;
      background:
        rgba(185, 137, 48, 0.06) !important;
      font-size: 8px !important;
    }

    .goldblogPage
    .goldBlogNewCard:first-child
    .goldBlogNewBadge {
      color: #d8aa58 !important;
      border-color:
        rgba(219, 177, 95, 0.26) !important;
      background:
        rgba(255, 250, 240, 0.035) !important;
    }

    .goldblogPage
    .goldBlogNewCardMeta
    span:last-child {
      font-size: 10px !important;
    }

    .goldblogPage
    .goldBlogNewCard:first-child
    .goldBlogNewCardMeta
    span:last-child {
      color:
        rgba(255, 248, 236, 0.56) !important;
    }

    .goldblogPage .goldBlogNewCard > p {
      margin-bottom: 11px !important;
      font-size: 9px !important;
      color: #a4772a !important;
    }

    .goldblogPage .goldBlogNewCard h4 {
      position: relative !important;
      z-index: 2 !important;
      max-width: 470px !important;
      font-size: 30px !important;
      line-height: 1.02 !important;
      letter-spacing: -0.7px !important;
    }

    .goldblogPage
    .goldBlogNewCard:first-child
    h4 {
      max-width: 590px !important;
      color: #fffaf1 !important;
      font-size: 42px !important;
      line-height: 0.99 !important;
      letter-spacing: -1.25px !important;
    }

    .goldblogPage
    .goldBlogNewCard:first-child
    > p {
      color: #d2a253 !important;
    }

    .goldblogPage .goldBlogNewCard > span {
      position: relative !important;
      z-index: 2 !important;
      max-width: 520px !important;
      margin-top: 17px !important;
      color: #71695f !important;
      font-size: 12px !important;
      line-height: 1.68 !important;
    }

    .goldblogPage
    .goldBlogNewCard:first-child
    > span {
      color:
        rgba(255, 248, 236, 0.63) !important;
      font-size: 13px !important;
    }

    .goldblogPage .goldBlogNewCard button {
      position: relative !important;
      z-index: 2 !important;
      margin-top: auto !important;
      padding: 12px 17px !important;
      border:
        1px solid rgba(160, 117, 42, 0.25) !important;
      color: #815c22 !important;
      background:
        rgba(255, 253, 248, 0.62) !important;
      font-size: 9px !important;
    }

    .goldblogPage
    .goldBlogNewCard:first-child
    button {
      border-color:
        rgba(218, 174, 91, 0.38) !important;
      color: #e0b86c !important;
      background:
        rgba(255, 250, 240, 0.03) !important;
    }

    /* ---------- SEÇİLEN KATEGORİ / ARŞİV ---------- */

    .goldblogPage .goldBlogArchive {
      margin: 0 -34px !important;
      padding: 54px 54px 58px !important;
      scroll-margin-top: 108px !important;
      overflow: hidden !important;
      border:
        1px solid rgba(214, 170, 87, 0.28) !important;
      border-radius: 30px !important;
      background:
        radial-gradient(circle at 100% 0%, rgba(204, 160, 77, 0.13), transparent 27%),
        linear-gradient(145deg, #2a1d14 0%, #17100c 100%) !important;
      box-shadow:
        0 34px 84px rgba(42, 25, 12, 0.17) !important;
    }

    .goldblogPage .goldBlogArchiveHeader {
      grid-template-columns:
        minmax(0, 0.9fr)
        minmax(390px, 1.1fr) !important;
      gap: 80px !important;
      margin-bottom: 32px !important;
      padding-bottom: 31px !important;
      border-bottom:
        1px solid rgba(224, 184, 107, 0.16) !important;
    }

    .goldblogPage
    .goldBlogArchiveHeader
    .goldBlogHubSectionEyebrow {
      color: #d0a052 !important;
    }

    .goldblogPage .goldBlogArchiveHeader h3 {
      color: #fffaf1 !important;
      font-size: clamp(44px, 3.5vw, 60px) !important;
      letter-spacing: -1.8px !important;
    }

    .goldblogPage .goldBlogArchiveHeader h3 span {
      color: #d5a856 !important;
    }

    .goldblogPage .goldBlogArchiveHeader > p {
      color:
        rgba(255, 248, 237, 0.63) !important;
      font-size: 14px !important;
      line-height: 1.75 !important;
    }

    .goldblogPage .goldBlogArticleList {
      gap: 13px !important;
    }

    .goldblogPage .goldBlogArticleRow {
      grid-template-columns:
        78px
        minmax(0, 1fr)
        auto !important;
      gap: 29px !important;
      padding: 28px 30px !important;
      border:
        1px solid rgba(219, 176, 95, 0.14) !important;
      border-radius: 18px !important;
      background:
        linear-gradient(
          145deg,
          rgba(255, 252, 246, 0.975),
          rgba(247, 238, 223, 0.965)
        ) !important;
      box-shadow:
        0 16px 34px rgba(0, 0, 0, 0.11) !important;
      transition:
        transform 170ms ease,
        border-color 170ms ease !important;
    }

    .goldblogPage .goldBlogArticleRow:hover {
      transform: translateY(-3px) !important;
      border-color:
        rgba(218, 174, 91, 0.34) !important;
    }

    .goldblogPage .goldBlogArticleRowNumber {
      color: #ad7e2b !important;
      font-size: 30px !important;
    }

    .goldblogPage .goldBlogArticleRowCopy > p {
      margin-bottom: 9px !important;
      color: #a1742a !important;
      font-size: 9px !important;
    }

    .goldblogPage .goldBlogArticleRowCopy h4 {
      font-size: 29px !important;
      line-height: 1.04 !important;
      letter-spacing: -0.55px !important;
    }

    .goldblogPage .goldBlogArticleRowCopy > span {
      max-width: 880px !important;
      margin-top: 11px !important;
      color: #70685e !important;
      font-size: 12px !important;
      line-height: 1.62 !important;
    }

    .goldblogPage .goldBlogArticleRowAction {
      gap: 13px !important;
    }

    .goldblogPage
    .goldBlogArticleRowAction
    small {
      color: #8b8278 !important;
      font-size: 9px !important;
    }

    .goldblogPage
    .goldBlogArticleRowAction
    button {
      min-width: 146px !important;
      min-height: 44px !important;
      border:
        1px solid rgba(196, 150, 63, 0.34) !important;
      background:
        linear-gradient(
          135deg,
          #2a1c13,
          #17100c
        ) !important;
      color: #e1b96d !important;
      font-size: 9px !important;
    }

    /* ---------- NEWSLETTER ---------- */

    .goldblogPage .goldBlogNewsletter {
      width: 100% !important;
      max-width: none !important;
      margin: 82px 0 0 !important;
      padding: 42px 46px !important;
      display: grid !important;
      grid-template-columns:
        minmax(0, 1fr)
        auto !important;
      gap: 46px !important;
      align-items: center !important;
      border:
        1px solid rgba(212, 168, 84, 0.31) !important;
      border-radius: 24px !important;
      background:
        radial-gradient(circle at 92% 0%, rgba(202, 157, 73, 0.15), transparent 28%),
        linear-gradient(145deg, #2b1d14, #180f0b) !important;
      box-shadow:
        0 28px 70px rgba(44, 26, 12, 0.17) !important;
    }

    .goldblogPage
    .goldBlogNewsletterEyebrow {
      margin: 0 0 11px !important;
      color: #c99a49 !important;
      font-size: 9px !important;
      letter-spacing: 0.16em !important;
    }

    .goldblogPage .goldBlogNewsletter h3 {
      max-width: 760px !important;
      margin: 0 !important;
      color: #fffaf1 !important;
      font-size: 35px !important;
      line-height: 1.04 !important;
      letter-spacing: -0.8px !important;
    }

    .goldblogPage .goldBlogNewsletter > a {
      min-height: 48px !important;
      padding: 0 20px !important;
      border:
        1px solid rgba(219, 176, 94, 0.45) !important;
      border-radius: 999px !important;
      color: #e3bb70 !important;
      background:
        rgba(255, 250, 240, 0.035) !important;
      font-size: 10px !important;
    }

    /* ---------- OKUMA PENCERESİ ---------- */

    .goldBlogReaderBackdrop {
      padding: 34px !important;
      background:
        rgba(20, 13, 9, 0.78) !important;
      backdrop-filter: blur(13px) !important;
    }

    .goldBlogReaderPaper {
      width: min(1080px, 100%) !important;
      height: min(92vh, 960px) !important;
      border:
        1px solid rgba(210, 165, 80, 0.42) !important;
      border-radius: 30px !important;
      background:
        radial-gradient(circle at 96% 0%, rgba(201, 155, 68, 0.10), transparent 27%),
        #fffdf8 !important;
      box-shadow:
        0 46px 140px rgba(0, 0, 0, 0.44) !important;
    }

    .goldBlogReaderTopbar {
      min-height: 78px !important;
      padding: 0 22px 0 29px !important;
      background:
        rgba(255, 253, 248, 0.97) !important;
    }

    .goldBlogReaderProgress {
      top: 77px !important;
    }

    .goldBlogReaderShareButton {
      min-height: 41px !important;
      padding: 0 16px !important;
      border:
        1px solid rgba(157, 112, 33, 0.26) !important;
      color: #8a6324 !important;
      background: #fbf5e9 !important;
    }

    .goldBlogReaderCloseButton {
      width: 41px !important;
      min-height: 41px !important;
      color: #dcb466 !important;
      border-color:
        rgba(207, 163, 78, 0.37) !important;
      background:
        linear-gradient(
          145deg,
          #2b1d14,
          #180f0b
        ) !important;
    }

    .goldBlogReaderScroll {
      padding: 126px 0 66px !important;
    }

    .goldBlogReaderArticle {
      width: min(800px, calc(100% - 96px)) !important;
    }

    .goldBlogReaderArticle h2 {
      font-size: clamp(46px, 4.5vw, 66px) !important;
      line-height: 0.99 !important;
      letter-spacing: -2.1px !important;
    }

    .goldBlogReaderMeta {
      margin: 26px 0 42px !important;
      padding-bottom: 27px !important;
    }

    .goldBlogReaderBody {
      color: #3f352e !important;
      font-size: 19px !important;
      line-height: 1.95 !important;
    }

    .goldBlogReaderBody p {
      margin-bottom: 30px !important;
    }
  }


  /* =========================================================
     GOLDBLOG DESKTOP - KATEGORİLER SOLDA / YENİLER SAĞDA
     SADECE ÜST YERLEŞİMİ YENİDEN DÜZENLER
  ========================================================= */
  @media (min-width: 901px) {
    .goldblogPage .goldBlogHub {
      display: grid !important;
      grid-template-columns:
        minmax(0, 1.55fr)
        minmax(360px, 0.72fr) !important;
      column-gap: 30px !important;
      row-gap: 0 !important;
      align-items: start !important;
    }

    .goldblogPage .goldBlogHubIntro {
      grid-column: 1 / -1 !important;
    }

    /* SOL: 5 ANA KATEGORİ */
    .goldblogPage .goldBlogHubRailShell {
      grid-column: 1 !important;
      grid-row: 2 !important;
      min-width: 0 !important;
      margin: 0 !important;
      padding: 28px 28px 24px !important;
      border:
        1px solid rgba(168, 122, 40, 0.14) !important;
      border-radius: 28px !important;
      background:
        radial-gradient(
          circle at 100% 0%,
          rgba(199, 153, 68, 0.09),
          transparent 30%
        ),
        rgba(255, 253, 248, 0.72) !important;
      box-shadow:
        0 22px 58px rgba(73, 47, 15, 0.055),
        inset 0 1px 0 rgba(255, 255, 255, 0.82) !important;
    }

    .goldblogPage .goldBlogHubRailTop {
      margin-bottom: 20px !important;
      padding: 0 2px 16px !important;
      border-bottom:
        1px solid rgba(164, 118, 38, 0.10) !important;
    }

    .goldblogPage .goldBlogHubRailTop > p {
      max-width: 480px !important;
      color: #71685e !important;
      font-size: 12px !important;
      line-height: 1.6 !important;
    }

    .goldblogPage .goldBlogCategoryRail {
      gap: 16px !important;
      padding: 6px 2px 12px !important;
      scroll-padding-left: 2px !important;
    }

    .goldblogPage .goldBlogCategoryCard {
      flex: 0 0 calc((100% - 16px) / 2) !important;
      min-width: 0 !important;
      min-height: 0 !important;
      padding: 22px 22px 20px !important;
      border-radius: 22px !important;
    }

    .goldblogPage .goldBlogCategoryCard h3 {
      max-width: 270px !important;
      font-size: 34px !important;
      line-height: 1 !important;
    }

    .goldblogPage .goldBlogCategoryCard small {
      max-width: 280px !important;
      font-size: 11.5px !important;
      line-height: 1.66 !important;
    }

    .goldblogPage
    .goldBlogCategoryCard
    .goldBlogCategoryCardTop {
      margin-bottom: 12px !important;
    }

    /* SAĞ: YENİ EKLENENLER */
    .goldblogPage .goldBlogNewSection {
      grid-column: 2 !important;
      grid-row: 2 !important;
      min-width: 0 !important;
      margin: 0 !important;
      padding: 28px 24px 24px !important;
      overflow: hidden !important;
      border:
        1px solid rgba(213, 169, 84, 0.27) !important;
      border-radius: 28px !important;
      background:
        radial-gradient(
          circle at 100% 0%,
          rgba(205, 161, 77, 0.15),
          transparent 31%
        ),
        linear-gradient(
          145deg,
          #2b1d14 0%,
          #18100c 100%
        ) !important;
      box-shadow:
        0 28px 68px rgba(43, 26, 13, 0.18) !important;
    }

    .goldblogPage
    .goldBlogNewSection
    .goldBlogHubSectionHeading {
      margin-bottom: 18px !important;
      padding-bottom: 18px !important;
      align-items: flex-end !important;
      border-bottom:
        1px solid rgba(225, 184, 105, 0.15) !important;
    }

    .goldblogPage
    .goldBlogNewSection
    .goldBlogHubSectionEyebrow {
      margin-bottom: 9px !important;
      color: #cf9f4f !important;
      font-size: 8px !important;
      letter-spacing: 0.18em !important;
    }

    .goldblogPage
    .goldBlogNewSection
    .goldBlogHubSectionHeading
    h3 {
      max-width: 290px !important;
      color: #fffaf1 !important;
      font-size: 31px !important;
      line-height: 1.02 !important;
      letter-spacing: -0.8px !important;
    }

    .goldblogPage
    .goldBlogNewSection
    .goldBlogHubSectionHeading
    h3 span {
      color: #d5a856 !important;
    }

    .goldblogPage
    .goldBlogNewSection
    .goldBlogHubRailControls {
      gap: 6px !important;
    }

    .goldblogPage
    .goldBlogNewSection
    .goldBlogHubRailControls
    button {
      width: 35px !important;
      height: 35px !important;
      border-color:
        rgba(219, 176, 95, 0.25) !important;
      background:
        rgba(255, 250, 240, 0.035) !important;
      color: #ddb363 !important;
      box-shadow: none !important;
    }

    .goldblogPage .goldBlogNewRail {
      gap: 12px !important;
      padding: 2px 0 3px !important;
    }

    .goldblogPage .goldBlogNewCard,
    .goldblogPage .goldBlogNewCard:first-child {
      flex: 0 0 100% !important;
      width: 100% !important;
      min-width: 100% !important;
      box-sizing: border-box !important;
      min-height: 0 !important;
      padding: 18px 18px 16px !important;
      border:
        1px solid rgba(218, 176, 96, 0.17) !important;
      border-radius: 20px !important;
      background:
        linear-gradient(
          155deg,
          rgba(255, 253, 248, 0.985),
          rgba(247, 239, 224, 0.97)
        ) !important;
      box-shadow:
        0 16px 34px rgba(0, 0, 0, 0.11) !important;
    }

    .goldblogPage .goldBlogNewCard::after,
    .goldblogPage .goldBlogNewCard:first-child::after {
      right: 17px !important;
      bottom: -18px !important;
      color:
        rgba(157, 112, 34, 0.065) !important;
      font-size: 88px !important;
    }

    .goldblogPage .goldBlogNewCardMeta,
    .goldblogPage
    .goldBlogNewCard:first-child
    .goldBlogNewCardMeta {
      margin-bottom: 26px !important;
    }

    .goldblogPage .goldBlogNewBadge,
    .goldblogPage
    .goldBlogNewCard:first-child
    .goldBlogNewBadge {
      padding: 6px 9px !important;
      color: #936a25 !important;
      border-color:
        rgba(166, 121, 40, 0.18) !important;
      background:
        rgba(185, 137, 48, 0.06) !important;
    }

    .goldblogPage
    .goldBlogNewCardMeta
    span:last-child,
    .goldblogPage
    .goldBlogNewCard:first-child
    .goldBlogNewCardMeta
    span:last-child {
      color: #8c8379 !important;
      font-size: 9px !important;
    }

    .goldblogPage .goldBlogNewCard > p,
    .goldblogPage
    .goldBlogNewCard:first-child
    > p {
      margin-bottom: 9px !important;
      color: #a4772a !important;
      font-size: 8px !important;
    }

    .goldblogPage .goldBlogNewCard h4,
    .goldblogPage
    .goldBlogNewCard:first-child
    h4 {
      max-width: 320px !important;
      color: #291e16 !important;
      font-size: 27px !important;
      line-height: 1.02 !important;
      letter-spacing: -0.55px !important;
    }

    .goldblogPage .goldBlogNewCard > span,
    .goldblogPage
    .goldBlogNewCard:first-child
    > span {
      max-width: 330px !important;
      margin-top: 12px !important;
      color: #71695f !important;
      font-size: 10.5px !important;
      line-height: 1.58 !important;
    }

    .goldblogPage .goldBlogNewCard button,
    .goldblogPage
    .goldBlogNewCard:first-child
    button {
      margin-top: 22px !important;
      padding: 10px 14px !important;
      border-color:
        rgba(160, 117, 42, 0.22) !important;
      color: #815c22 !important;
      background:
        rgba(255, 253, 248, 0.68) !important;
      font-size: 8px !important;
    }

    /* ALT ALANLAR İKİ KOLONU TEKRAR TAM GENİŞLİKTE KAPSASIN */
    .goldblogPage .goldBlogArchive {
      grid-column: 1 / -1 !important;
      grid-row: 3 !important;
      margin-top: 88px !important;
    }

    .goldblogPage .goldBlogNewsletter {
      grid-column: 1 / -1 !important;
      grid-row: 4 !important;
    }
  }


  /* =========================================================
     GOLDBLOG DESKTOP - KİBAR KAPANIŞ / SOSYAL KANALLAR
     SADECE ALT HABERDAR OL ALANI
  ========================================================= */
  @media (min-width: 901px) {
    .goldblogPage .goldBlogNewsletter {
      grid-column: 1 / -1 !important;
      grid-row: 4 !important;
      width: 100% !important;
      max-width: none !important;
      margin: 72px 0 0 !important;
      padding: 0 !important;
      display: grid !important;
      grid-template-columns:
        minmax(0, 0.82fr)
        minmax(520px, 1.18fr) !important;
      gap: 0 !important;
      align-items: stretch !important;
      overflow: hidden !important;
      border:
        1px solid rgba(168, 122, 40, 0.17) !important;
      border-radius: 26px !important;
      background:
        linear-gradient(
          145deg,
          rgba(255, 253, 248, 0.96),
          rgba(248, 241, 230, 0.96)
        ) !important;
      box-shadow:
        0 22px 58px rgba(66, 42, 14, 0.075) !important;
    }

    .goldblogPage .goldBlogNewsletterCopy {
      position: relative !important;
      padding: 38px 42px 37px !important;
      border-right:
        1px solid rgba(164, 118, 38, 0.12) !important;
      background:
        radial-gradient(
          circle at 0% 100%,
          rgba(193, 146, 57, 0.08),
          transparent 32%
        ) !important;
    }

    .goldblogPage .goldBlogNewsletterCopy::before {
      content: "" !important;
      position: absolute !important;
      top: 0 !important;
      left: 42px !important;
      width: 64px !important;
      height: 2px !important;
      background:
        linear-gradient(
          90deg,
          #a97928,
          rgba(208, 165, 82, 0.22)
        ) !important;
    }

    .goldblogPage
    .goldBlogNewsletterEyebrow {
      margin: 0 0 12px !important;
      color: #9e7228 !important;
      font-size: 8px !important;
      font-weight: 800 !important;
      letter-spacing: 0.19em !important;
    }

    .goldblogPage
    .goldBlogNewsletterCopy
    h3 {
      max-width: 470px !important;
      margin: 0 !important;
      color: #281d15 !important;
      font-family:
        Georgia,
        "Times New Roman",
        serif !important;
      font-size: 34px !important;
      font-weight: 400 !important;
      line-height: 1.02 !important;
      letter-spacing: -0.8px !important;
    }

    .goldblogPage
    .goldBlogNewsletterText {
      max-width: 440px !important;
      margin: 15px 0 0 !important;
      color: #746c62 !important;
      font-size: 11.5px !important;
      line-height: 1.65 !important;
    }

    .goldblogPage
    .goldBlogNewsletterWhatsapp {
      width: fit-content !important;
      min-height: 42px !important;
      margin-top: 23px !important;
      padding: 0 16px !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 10px !important;
      border:
        1px solid rgba(164, 119, 40, 0.24) !important;
      border-radius: 999px !important;
      color: #835e22 !important;
      background:
        rgba(255, 253, 248, 0.8) !important;
      box-shadow:
        0 8px 18px rgba(72, 46, 14, 0.04) !important;
      font-size: 9px !important;
      font-weight: 800 !important;
      text-decoration: none !important;
      transition:
        transform 160ms ease,
        border-color 160ms ease,
        background 160ms ease !important;
    }

    .goldblogPage
    .goldBlogNewsletterWhatsapp:hover {
      transform: translateY(-2px) !important;
      border-color:
        rgba(164, 119, 40, 0.42) !important;
      background: #fffdf8 !important;
    }

    .goldblogPage
    .goldBlogNewsletterSocials {
      padding: 37px 40px 35px !important;
      background:
        radial-gradient(
          circle at 100% 0%,
          rgba(207, 165, 82, 0.09),
          transparent 34%
        ),
        rgba(255, 255, 255, 0.32) !important;
    }

    .goldblogPage
    .goldBlogNewsletterSocialEyebrow {
      margin: 0 0 17px !important;
      color: #9f742b !important;
      font-size: 8px !important;
      font-weight: 800 !important;
      letter-spacing: 0.19em !important;
    }

    .goldblogPage
    .goldBlogNewsletterSocialGrid {
      display: grid !important;
      grid-template-columns:
        repeat(2, minmax(0, 1fr)) !important;
      gap: 10px !important;
    }

    .goldblogPage
    .goldBlogNewsletterSocialGrid
    a {
      min-height: 52px !important;
      padding: 0 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;
      border:
        1px solid rgba(164, 119, 40, 0.13) !important;
      border-radius: 14px !important;
      color: #3c3027 !important;
      background:
        rgba(255, 253, 249, 0.7) !important;
      text-decoration: none !important;
      box-shadow:
        0 8px 20px rgba(72, 46, 14, 0.035) !important;
      transition:
        transform 160ms ease,
        border-color 160ms ease,
        background 160ms ease !important;
    }

    .goldblogPage
    .goldBlogNewsletterSocialGrid
    a:hover {
      transform: translateY(-2px) !important;
      border-color:
        rgba(164, 119, 40, 0.30) !important;
      background: #fffdf8 !important;
    }

    .goldblogPage
    .goldBlogNewsletterSocialGrid
    a
    span:first-child {
      font-family:
        Georgia,
        "Times New Roman",
        serif !important;
      font-size: 16px !important;
      font-weight: 400 !important;
    }

    .goldblogPage
    .goldBlogNewsletterSocialGrid
    a
    span:last-child {
      color: #a5792c !important;
      font-size: 11px !important;
    }
  }


  /* =========================================================
     GOLDBLOG DESKTOP - ALT KAPANIŞI İKİ AYRI KART YAP
     SOL: WHATSAPP / SAĞ: SOSYAL MEDYA
  ========================================================= */
  @media (min-width: 901px) {
    .goldblogPage .goldBlogNewsletter {
      grid-column: 1 / -1 !important;
      grid-row: 4 !important;

      width: 100% !important;
      max-width: none !important;

      margin: 72px 0 0 !important;
      padding: 0 !important;

      display: grid !important;
      grid-template-columns:
        minmax(0, 0.82fr)
        minmax(520px, 1.18fr) !important;

      gap: 24px !important;

      align-items: stretch !important;

      overflow: visible !important;

      border: 0 !important;
      border-radius: 0 !important;

      background: transparent !important;

      box-shadow: none !important;
    }

    .goldblogPage .goldBlogNewsletterCopy,
    .goldblogPage .goldBlogNewsletterSocials {
      position: relative !important;

      min-height: 100% !important;

      border:
        1px solid rgba(168, 122, 40, 0.17) !important;

      border-radius: 24px !important;

      background:
        radial-gradient(
          circle at 100% 0%,
          rgba(202, 156, 73, 0.08),
          transparent 32%
        ),
        linear-gradient(
          145deg,
          rgba(255, 253, 248, 0.97),
          rgba(248, 241, 230, 0.96)
        ) !important;

      box-shadow:
        0 20px 52px rgba(66, 42, 14, 0.065) !important;
    }

    .goldblogPage .goldBlogNewsletterCopy {
      padding: 38px 42px 37px !important;

      border-right:
        1px solid rgba(168, 122, 40, 0.17) !important;
    }

    .goldblogPage .goldBlogNewsletterSocials {
      padding: 37px 40px 35px !important;
    }

    .goldblogPage .goldBlogNewsletterCopy::before {
      left: 42px !important;
    }
  }


  /* =========================================================
     GOLDBLOG DESKTOP - SOSYALLER SOLDA / SEÇİLİ YAZILAR SAĞDA
     5 ANA KARTIN HEMEN ALTINDA İKİ BAĞIMSIZ ALAN
  ========================================================= */
  @media (min-width: 901px) {
    .goldblogPage .goldBlogSocialRailSection {
      grid-column: 2 !important;
      grid-row: 3 !important;
      min-width: 0 !important;
      margin-top: 28px !important;
      padding: 27px 26px 25px !important;
      overflow: hidden !important;

      border:
        1px solid rgba(168, 122, 40, 0.15) !important;
      border-radius: 27px !important;

      background:
        radial-gradient(
          circle at 0% 100%,
          rgba(193, 146, 57, 0.08),
          transparent 34%
        ),
        linear-gradient(
          145deg,
          rgba(255, 253, 248, 0.97),
          rgba(248, 241, 230, 0.96)
        ) !important;

      box-shadow:
        0 22px 56px rgba(67, 43, 15, 0.065) !important;
    }

    .goldblogPage .goldBlogSocialRailHeader {
      display: flex !important;
      align-items: flex-end !important;
      justify-content: space-between !important;
      gap: 24px !important;

      margin-bottom: 19px !important;
      padding-bottom: 18px !important;

      border-bottom:
        1px solid rgba(164, 118, 38, 0.11) !important;
    }

    .goldblogPage
    .goldBlogSocialRailHeader
    .goldBlogHubSectionEyebrow {
      margin: 0 0 9px !important;
      color: #9f742b !important;
      font-size: 8px !important;
      letter-spacing: 0.18em !important;
    }

    .goldblogPage .goldBlogSocialRailHeader h3 {
      max-width: 480px !important;
      margin: 0 !important;

      color: #281d15 !important;

      font-family:
        Georgia,
        "Times New Roman",
        serif !important;

      font-size: 31px !important;
      font-weight: 400 !important;
      line-height: 1.02 !important;
      letter-spacing: -0.75px !important;
    }

    .goldblogPage .goldBlogSocialRailHeader h3 span {
      color: #a8792a !important;
    }

    .goldblogPage .goldBlogSocialRail {
      display: flex !important;
      gap: 12px !important;

      width: 100% !important;
      padding: 2px 1px 7px !important;

      overflow-x: auto !important;
      overflow-y: hidden !important;

      scroll-snap-type: x mandatory !important;
      scrollbar-width: none !important;
    }

    .goldblogPage
    .goldBlogSocialRail::-webkit-scrollbar {
      display: none !important;
    }

    .goldblogPage .goldBlogSocialCard {
      position: relative !important;

      flex: 0 0 calc((100% - 12px) / 2) !important;
      min-width: 250px !important;
      min-height: 194px !important;

      padding: 22px 21px 20px !important;

      display: flex !important;
      flex-direction: column !important;

      scroll-snap-align: start !important;

      overflow: hidden !important;

      border:
        1px solid rgba(166, 121, 40, 0.14) !important;
      border-radius: 18px !important;

      color: #2b2018 !important;

      background:
        radial-gradient(
          circle at 100% 0%,
          rgba(193, 146, 57, 0.09),
          transparent 32%
        ),
        rgba(255, 254, 251, 0.84) !important;

      box-shadow:
        0 12px 28px rgba(66, 42, 14, 0.045) !important;

      text-decoration: none !important;

      transition:
        transform 160ms ease,
        border-color 160ms ease,
        box-shadow 160ms ease !important;
    }

    .goldblogPage .goldBlogSocialCard:hover {
      transform: translateY(-3px) !important;
      border-color:
        rgba(166, 121, 40, 0.31) !important;
      box-shadow:
        0 18px 36px rgba(66, 42, 14, 0.075) !important;
    }

    .goldblogPage .goldBlogSocialCardMark {
      width: 46px !important;
      height: 46px !important;

      display: grid !important;
      place-items: center !important;

      margin-bottom: 30px !important;

      border:
        1px solid rgba(166, 121, 40, 0.21) !important;
      border-radius: 50% !important;

      color: #9c7128 !important;

      font-family:
        Arial,
        Helvetica,
        sans-serif !important;
      font-size: 9px !important;
      font-weight: 800 !important;
      letter-spacing: 0.04em !important;
    }

    .goldblogPage .goldBlogSocialCard > p {
      margin: 0 0 7px !important;

      color: #a1742a !important;

      font-size: 7.5px !important;
      font-weight: 800 !important;
      letter-spacing: 0.15em !important;
    }

    .goldblogPage .goldBlogSocialCard h4 {
      margin: 0 !important;

      color: #281d15 !important;

      font-family:
        Georgia,
        "Times New Roman",
        serif !important;

      font-size: 24px !important;
      font-weight: 400 !important;
      line-height: 1 !important;
    }

    .goldblogPage .goldBlogSocialCardLink {
      margin-top: auto !important;
      padding-top: 20px !important;

      color: #82786c !important;

      font-size: 9px !important;
      font-weight: 700 !important;
    }

    /* SAĞDA SEÇİLİ KATEGORİ */
    .goldblogPage .goldBlogArchive {
      grid-column: 1 !important;
      grid-row: 3 !important;

      min-width: 0 !important;

      margin:
        28px 0 0 0 !important;

      padding:
        30px 28px 30px !important;

      border-radius: 27px !important;
    }

    .goldblogPage .goldBlogArchiveHeader {
      grid-template-columns: 1fr !important;
      gap: 12px !important;

      margin-bottom: 22px !important;
      padding-bottom: 21px !important;
    }

    .goldblogPage .goldBlogArchiveHeader h3 {
      font-size: 39px !important;
      line-height: 0.99 !important;
      letter-spacing: -1.1px !important;
    }

    .goldblogPage .goldBlogArchiveHeader > p {
      max-width: 440px !important;

      font-size: 10.5px !important;
      line-height: 1.65 !important;
    }

    .goldblogPage .goldBlogArticleRow {
      grid-template-columns:
        42px
        minmax(0, 1fr) !important;

      gap: 14px !important;

      padding: 20px 18px !important;
    }

    .goldblogPage .goldBlogArticleRowNumber {
      font-size: 24px !important;
    }

    .goldblogPage .goldBlogArticleRowCopy h4 {
      font-size: 23px !important;
      line-height: 1.04 !important;
    }

    .goldblogPage .goldBlogArticleRowCopy > span {
      font-size: 10px !important;
      line-height: 1.55 !important;
    }

    .goldblogPage .goldBlogArticleRowAction {
      grid-column: 2 !important;

      align-items: flex-start !important;

      margin-top: 5px !important;
    }

    .goldblogPage
    .goldBlogArticleRowAction
    button {
      min-width: 128px !important;
      min-height: 39px !important;
    }
  }


  /* =========================================================
     GOLDBLOG - SOSYAL KANAL GÖRSELLERİ
  ========================================================= */
  .goldblogPage .goldBlogSocialCardMark {
    overflow: hidden !important;
    background: #fffdf8 !important;
  }

  .goldblogPage .goldBlogSocialCardMark img {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
    object-fit: cover !important;
    border-radius: inherit !important;
  }


  /* =========================================================
     GOLDBLOG DESKTOP - 5 ANA KART 16:9 KAPAK GÖRSELLERİ
  ========================================================= */
  @media (min-width: 901px) {
    .goldblogPage .goldBlogCategoryCard {
      min-height: 0 !important;
      padding: 22px 22px 24px !important;
    }

    .goldblogPage
    .goldBlogCategoryCard
    .goldBlogCategoryCardTop {
      margin-bottom: 15px !important;
    }

    .goldblogPage .goldBlogCategoryCardImage {
      position: relative !important;

      width: 100% !important;
      aspect-ratio: 16 / 9 !important;

      margin: 0 0 22px !important;

      overflow: hidden !important;

      border:
        1px solid rgba(207, 164, 82, 0.18) !important;
      border-radius: 16px !important;

      background:
        rgba(255, 250, 241, 0.045) !important;

      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.05),
        0 12px 26px rgba(24, 14, 8, 0.12) !important;
    }

    .goldblogPage .goldBlogCategoryCardImage img {
      width: 100% !important;
      height: 100% !important;

      display: block !important;

      object-fit: cover !important;
      object-position: center !important;

      transition:
        transform 280ms ease !important;
    }

    .goldblogPage
    .goldBlogCategoryCard:hover
    .goldBlogCategoryCardImage
    img,
    .goldblogPage
    .goldBlogCategoryCard.isActive
    .goldBlogCategoryCardImage
    img {
      transform: scale(1.025) !important;
    }

    .goldblogPage .goldBlogCategoryCard h3 {
      max-width: 100% !important;
      font-size: 31px !important;
    }

    .goldblogPage .goldBlogCategoryCard small {
      max-width: 100% !important;
    }
  }


  /* =========================================================
     GOLDBLOG DESKTOP - ÜST İKİ ANA BLOK AYNI YÜKSEKLİK
     TAŞMA YAPMADAN GRID STRETCH
  ========================================================= */
  @media (min-width: 901px) {
    .goldblogPage .goldBlogHub {
      align-items: stretch !important;
    }

    .goldblogPage .goldBlogHubRailShell,
    .goldblogPage .goldBlogNewSection {
      height: auto !important;
      min-height: 0 !important;
      align-self: stretch !important;
    }
  }


  /* =========================================================
     GOLDBLOG MOBİL - BÖLÜM SIRASI
     Seçili kategori -> Son Eklenenler -> Goldkozmos Kanalları
  ========================================================= */
  @media (max-width: 700px) {
    .goldblogPage .goldBlogArchive {
      order: 10 !important;
    }

    .goldblogPage .goldBlogNewSection {
      order: 20 !important;
    }

    .goldblogPage .goldBlogSocialRailSection {
      order: 30 !important;
      margin-bottom: 0 !important;
    }
  }

  /* =========================================================
     GOLDBLOG MOBİL - SEÇİLİ KATEGORİ SONUÇ ALANI
     Yalnızca kategori sonucu bölümünü daha anlaşılır yapar.
  ========================================================= */
  .goldblogPage .goldBlogArchiveCount {
    display: none;
  }

  @media (max-width: 700px) {

    .goldblogPage .goldBlogArchive {
      margin-top: 0 !important;
      scroll-margin-top: 92px !important;
    }

    .goldblogPage .goldBlogArchiveHeader {
      position: relative !important;

      display: block !important;

      margin: 0 0 16px !important;
      padding: 18px 18px 17px !important;

      overflow: hidden !important;

      border:
        1px solid rgba(174, 128, 47, 0.16) !important;

      border-radius: 18px !important;

      background:
        radial-gradient(
          circle at 96% 0%,
          rgba(196, 148, 61, 0.08),
          transparent 34%
        ),
        linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.88),
          rgba(249, 242, 231, 0.94)
        ) !important;

      box-shadow:
        0 12px 28px
        rgba(67, 42, 13, 0.055) !important;
    }

    .goldblogPage .goldBlogArchiveHeader::before {
      content: "" !important;

      position: absolute !important;

      top: 0 !important;
      left: 0 !important;
      bottom: 0 !important;

      width: 3px !important;

      background:
        linear-gradient(
          180deg,
          #9f7125 0%,
          #d8ad59 100%
        ) !important;
    }

    .goldblogPage .goldBlogArchiveHeaderTop {
      width: 100% !important;

      display: flex !important;
      align-items: flex-start !important;
      justify-content: space-between !important;

      gap: 14px !important;
    }

    .goldblogPage
    .goldBlogArchiveHeader
    .goldBlogHubSectionEyebrow {
      margin: 0 0 7px !important;

      color: #a4772a !important;

      font-size: 7px !important;
      line-height: 1 !important;

      letter-spacing: 0.18em !important;

      font-weight: 800 !important;
    }

    .goldblogPage
    .goldBlogArchiveHeader
    h3 {
      max-width: 245px !important;

      margin: 0 !important;

      color: #281c14 !important;

      font-family:
        Georgia,
        "Times New Roman",
        serif !important;

      font-size: 27px !important;
      line-height: 1 !important;

      letter-spacing: -0.6px !important;

      font-weight: 400 !important;
    }

    .goldblogPage .goldBlogArchiveCount {
      flex: 0 0 auto !important;

      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;

      min-height: 27px !important;

      margin-top: 1px !important;
      padding: 0 10px !important;

      border:
        1px solid rgba(170, 124, 42, 0.21) !important;

      border-radius: 999px !important;

      background:
        rgba(184, 137, 49, 0.07) !important;

      color: #8e6727 !important;

      font-size: 7px !important;
      line-height: 1 !important;

      font-weight: 800 !important;

      letter-spacing: 0.08em !important;
      white-space: nowrap !important;
    }

    .goldblogPage
    .goldBlogArchiveHeader
    > p {
      max-width: 310px !important;

      margin: 11px 0 0 !important;

      color: #777066 !important;

      font-size: 9.5px !important;
      line-height: 1.55 !important;
    }


    /* =====================================================
       KATEGORİDEKİ YAZI KARTI
    ====================================================== */

    .goldblogPage .goldBlogArticleList {
      display: grid !important;

      gap: 12px !important;
    }

    .goldblogPage .goldBlogArticleRow {
      position: relative !important;

      display: grid !important;
      grid-template-columns: 1fr !important;

      gap: 0 !important;

      padding: 19px 18px 17px !important;

      border:
        1px solid rgba(168, 123, 43, 0.15) !important;

      border-radius: 20px !important;

      background:
        radial-gradient(
          circle at 96% 0%,
          rgba(194, 149, 64, 0.08),
          transparent 32%
        ),
        #fffdf9 !important;

      box-shadow:
        0 14px 32px
        rgba(65, 40, 13, 0.055) !important;
    }

    .goldblogPage .goldBlogArticleRowNumber {
      width: fit-content !important;

      margin: 0 0 14px !important;
      padding: 6px 9px !important;

      border:
        1px solid rgba(174, 128, 46, 0.19) !important;

      border-radius: 999px !important;

      background:
        rgba(178, 130, 43, 0.06) !important;

      color: #a8792a !important;

      font-family:
        Arial,
        sans-serif !important;

      font-size: 7px !important;
      line-height: 1 !important;

      font-weight: 800 !important;

      letter-spacing: 0.14em !important;
    }

    .goldblogPage
    .goldBlogArticleRowCopy
    > p {
      margin: 0 0 7px !important;

      color: #a2762b !important;

      font-size: 7px !important;
      line-height: 1 !important;

      letter-spacing: 0.15em !important;

      font-weight: 800 !important;
    }

    .goldblogPage
    .goldBlogArticleRowCopy
    h4 {
      max-width: 310px !important;

      margin: 0 !important;

      color: #281c14 !important;

      font-family:
        Georgia,
        "Times New Roman",
        serif !important;

      font-size: 24px !important;
      line-height: 1.02 !important;

      letter-spacing: -0.45px !important;

      font-weight: 400 !important;
    }

    .goldblogPage
    .goldBlogArticleRowCopy
    > span {
      max-width: 315px !important;

      margin-top: 10px !important;

      color: #797166 !important;

      font-size: 9.5px !important;
      line-height: 1.55 !important;
    }

    .goldblogPage
    .goldBlogArticleRowAction {
      width: 100% !important;

      margin-top: 17px !important;
      padding-top: 14px !important;

      display: flex !important;
      flex-direction: row !important;

      align-items: center !important;
      justify-content: space-between !important;

      gap: 12px !important;

      border-top:
        1px solid rgba(163, 119, 40, 0.11) !important;
    }

    .goldblogPage
    .goldBlogArticleRowAction
    small {
      color: #91887c !important;

      font-size: 8px !important;

      font-weight: 700 !important;
    }

    .goldblogPage
    .goldBlogArticleRowAction
    button {
      min-width: 118px !important;
      min-height: 38px !important;

      margin: 0 !important;
      padding: 0 14px !important;

      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;

      border:
        1px solid rgba(205, 160, 74, 0.42) !important;

      border-radius: 999px !important;

      background:
        linear-gradient(
          135deg,
          #2b1d13,
          #1b120d
        ) !important;

      color: #d9ab55 !important;

      font-size: 8px !important;

      font-weight: 800 !important;
    }
  }

  .goldblogPage .goldBlogCategoryCard,
  .goldblogPage .goldBlogCategoryCard:hover,
  .goldblogPage .goldBlogCategoryCard.isActive,
  .goldblogPage .goldBlogNewCard,
  .goldblogPage .goldBlogNewCard:hover,
  .goldblogPage .goldBlogNewCard:first-child {
    box-shadow: none !important;
  }

  .goldblogPage .goldBlogDiscoverBackdrop {
    position: fixed;
    inset: 0;
    z-index: 70;
    background: #24170f;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .goldblogPage .goldBlogDiscoverPaper {
    width: min(640px, 100%);
    min-height: 100%;
    margin: 0 auto;
    padding: 20px 16px 120px;
    box-sizing: border-box;
    background:
      linear-gradient(180deg, #3a271b 0%, #24170f 48%, #1a120c 100%);
  }

  .goldblogPage .goldBlogDiscoverTop {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 22px;
  }

  .goldblogPage .goldBlogDiscoverTopActions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .goldblogPage .goldBlogDiscoverTop p {
    margin: 0 0 8px;
    color: #e0c07a;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  .goldblogPage .goldBlogDiscoverTop h2 {
    margin: 0;
    color: #fffaf1;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 34px;
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.04em;
  }

  .goldblogPage .goldBlogDiscoverClose {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(232, 204, 148, 0.28);
    border-radius: 50%;
    color: #f6edd8;
    background: transparent;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
  }

  .goldblogPage .goldBlogDiscoverList {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .goldblogPage .goldBlogDiscoverItem {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 18px 16px 14px;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid rgba(214, 178, 108, 0.38);
    border-radius: 18px;
    background:
      linear-gradient(180deg, #fffefb 0%, #f7f0e4 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.92);
    text-align: left;
    transform: none;
  }

  .goldblogPage .goldBlogDiscoverCopy {
    display: block;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
    background: transparent;
    text-align: left;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    transform: none;
  }

  .goldblogPage .goldBlogDiscoverCopy p {
    margin: 0 0 8px;
    color: #a1772d;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.16em;
  }

  .goldblogPage .goldBlogDiscoverTitleRow {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: 12px;
  }

  .goldblogPage .goldBlogDiscoverCopy strong,
  .goldblogPage .goldBlogDiscoverTitleRow strong {
    display: block;
    min-width: 0;
    margin: 0;
    color: #1f160f;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.18;
    letter-spacing: -0.03em;
  }

  .goldblogPage .goldBlogDiscoverMore {
    flex: 0 0 auto;
    margin: 6px 0 0;
    color: #a1772d;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.2;
    white-space: nowrap;
  }

  .goldblogPage .goldBlogDiscoverCopy > span {
    display: block;
    margin-top: 8px;
    color: #5f564c;
    font-size: 13px;
    line-height: 1.5;
  }

  @media (max-width: 700px) {
    .goldblogPage .goldBlogNewCard,
    .goldblogPage .goldBlogNewCard:first-child {
      flex: 0 0 min(68vw, 220px) !important;
      width: min(68vw, 220px) !important;
      min-width: 0 !important;
      min-height: 0 !important;
      padding: 14px 14px 16px !important;
      border-radius: 18px !important;
    }

    .goldblogPage .goldBlogNewCard h4,
    .goldblogPage .goldBlogNewCard:first-child h4,
    .goldblogPage .goldBlogNewCardTitle {
      font-size: 18px !important;
      letter-spacing: -0.03em !important;
    }
  }

  .goldblogPage .goldBlogNewSection {
    order: 0;
    margin: 0 0 28px;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    overflow: visible;
  }

  .goldblogPage .goldBlogNewSection::before {
    display: none !important;
    content: none !important;
  }

  .goldblogPage .goldBlogNewHead {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin: 0 0 12px;
  }

  .goldblogPage .goldBlogNewHeadActions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .goldBlogNotify {
    position: relative;
  }

  .goldBlogNotifyBell {
    position: relative;
    width: 36px;
    height: 36px;
    border: 1px solid rgba(168, 124, 44, 0.28);
    border-radius: 50%;
    background: #fffaf1;
    color: #c45c4a;
    font-size: 11px;
    cursor: pointer;
  }

  .goldBlogNotifyBell span {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    border-radius: 999px;
    background: #b42318;
    color: #fff;
    font-size: 9px;
    font-weight: 800;
    line-height: 16px;
  }

  .goldBlogNotifyPanel {
    position: absolute;
    top: 44px;
    right: 0;
    z-index: 20;
    width: min(280px, 72vw);
    max-height: 320px;
    overflow: auto;
    padding: 12px;
    border: 1px solid rgba(168, 124, 44, 0.22);
    border-radius: 14px;
    background: #fffdf8;
    box-shadow: 0 16px 40px rgba(28, 16, 8, 0.16);
  }

  .goldBlogNotifyPanel p {
    margin: 0 0 10px;
    color: #241911;
    font-size: 12px;
    font-weight: 700;
  }

  .goldBlogNotifyPanel span {
    color: #7a736b;
    font-size: 12px;
  }

  .goldBlogNotifyPanel button {
    display: block;
    width: 100%;
    margin: 0 0 8px;
    padding: 8px 0;
    border: 0;
    border-top: 1px solid rgba(168, 124, 44, 0.12);
    background: transparent;
    text-align: left;
    cursor: pointer;
  }

  .goldBlogNotifyPanel strong {
    display: block;
    color: #241911;
    font-size: 12px;
  }

  .goldBlogNotifyPanel em,
  .goldBlogNotifyPanel small {
    display: block;
    margin-top: 3px;
    color: #7a736b;
    font-size: 11px;
    font-style: normal;
  }

  .goldblogPage .goldBlogNewHead h3 {
    margin: 0;
    color: #6d645a;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  .goldblogPage .goldBlogNewSeeAll {
    padding: 0;
    border: 0;
    background: none;
    color: #a1772d;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
  }

  .goldblogPage .goldBlogNewRail {
    gap: 10px;
    padding: 6px 2px 14px;
  }

  .goldblogPage .goldBlogNewCard,
  .goldblogPage .goldBlogNewCard:first-child {
    flex: 0 0 min(72vw, 210px);
    width: min(72vw, 210px);
    min-width: min(72vw, 210px);
    min-height: 0;
    padding: 14px 14px 16px;
    border-radius: 16px;
    transition: transform 180ms ease;
  }

  .goldblogPage .goldBlogNewCardMeta,
  .goldblogPage .goldBlogNewCard:first-child .goldBlogNewCardMeta {
    margin-bottom: 12px;
  }

  .goldblogPage .goldBlogNewCardTitle,
  .goldblogPage .goldBlogNewCard h4,
  .goldblogPage .goldBlogNewCard:first-child h4 {
    font-size: 16px !important;
    line-height: 1.18 !important;
    letter-spacing: -0.03em !important;
    color: #251b14 !important;
  }

  .goldblogPage .goldBlogCategoryCard,
  .goldblogPage .goldBlogSocialCard {
    transition:
      transform 180ms ease,
      border-color 180ms ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .goldblogPage .goldBlogCategoryCard:hover,
    .goldblogPage .goldBlogNewCard:hover,
    .goldblogPage .goldBlogSocialCard:hover,
    .goldblogPage .goldBlogMiniItem:hover {
      transform: translateY(-6px) !important;
    }
  }

  .goldblogPage .goldBlogMiniBackdrop {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    padding: 18px 16px 28px;
    background: rgba(24, 15, 10, 0.48);
    backdrop-filter: blur(8px);
  }

  .goldblogPage .goldBlogMiniPaper {
    width: min(420px, 100%);
    max-height: min(78dvh, 640px);
    overflow: auto;
    padding: 18px 16px 20px;
    box-sizing: border-box;
    border: 1px solid rgba(206, 161, 75, 0.28);
    border-radius: 22px;
    background:
      linear-gradient(180deg, #fffdf8 0%, #f6eee0 100%);
    box-shadow: 0 28px 70px rgba(28, 16, 8, 0.28);
  }

  .goldblogPage .goldBlogMiniTop {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }

  .goldblogPage .goldBlogMiniTop p {
    margin: 0 0 6px;
    color: #a1772d;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.16em;
  }

  .goldblogPage .goldBlogMiniTop h2 {
    margin: 0;
    color: #241911;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: -0.03em;
  }

  .goldblogPage .goldBlogMiniClose {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(168, 124, 44, 0.28);
    border-radius: 50%;
    color: #7a5a22;
    background: #fffaf1;
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
  }

  .goldblogPage .goldBlogMiniList {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .goldblogPage .goldBlogMiniItem {
    width: 100%;
    padding: 14px 14px 12px;
    border: 1px solid rgba(168, 124, 44, 0.18);
    border-radius: 14px;
    background: #fffdf9;
    text-align: left;
    cursor: pointer;
    transition: transform 180ms ease;
  }

  .goldblogPage .goldBlogMiniItem p {
    margin: 0 0 5px;
    color: #a1772d;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.14em;
  }

  .goldblogPage .goldBlogMiniItem strong {
    display: block;
    color: #241911;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.2;
  }

  .goldblogPage .goldBlogMiniItem span {
    display: block;
    margin-top: 6px;
    color: #8a8176;
    font-size: 11px;
  }

  .goldBlogReaderBackdrop.isMini {
    padding: 20px 16px 28px !important;
    place-items: center !important;
    align-items: center !important;
  }

  .goldBlogReaderBackdrop.isMini .goldBlogReaderPaper {
    width: min(440px, 100%) !important;
    height: min(82dvh, 760px) !important;
    display: flex !important;
    flex-direction: column !important;
    border: 1px solid rgba(206, 161, 75, 0.36) !important;
    border-radius: 22px !important;
  }

  .goldBlogReaderBackdrop.isMini .goldBlogReaderScroll {
    flex: 1 !important;
    min-height: 0 !important;
    padding-bottom: 140px !important;
  }

  @media (min-width: 901px) {
    .goldblogPage .goldBlogHub {
      display: flex !important;
      flex-direction: column !important;
      grid-template-columns: none !important;
    }

    .goldblogPage .goldBlogNewSection,
    .goldblogPage .goldBlogHubIntro,
    .goldblogPage .goldBlogHubRailShell,
    .goldblogPage .goldBlogSocialRailSection {
      grid-column: auto !important;
      grid-row: auto !important;
      width: 100% !important;
    }

    .goldblogPage .goldBlogNewSection {
      margin-bottom: 36px !important;
      padding: 0 !important;
      overflow: visible !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    .goldblogPage .goldBlogNewHead h3 {
      font-size: 17px !important;
      color: #6d645a !important;
      max-width: none !important;
    }

    .goldblogPage .goldBlogHubRailShell {
      margin-top: 0 !important;
    }

    .goldblogPage .goldBlogNewCard,
    .goldblogPage .goldBlogNewCard:first-child {
      flex: 0 0 220px !important;
      width: 220px !important;
      min-width: 220px !important;
      background:
        linear-gradient(180deg, #fffdf9 0%, #fbf6ed 100%) !important;
    }
  }

  @media (max-width: 700px) {
    .goldblogPage .goldBlogHub {
      display: flex !important;
      flex-direction: column !important;
    }

    .goldblogPage .goldBlogNewSection {
      order: 0 !important;
      margin: 0 0 22px !important;
      padding: 0 !important;
      overflow: visible !important;
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    .goldblogPage .goldBlogHubIntro {
      order: 1 !important;
    }

    .goldblogPage .goldBlogHubRailShell {
      order: 2 !important;
    }

    .goldblogPage .goldBlogSocialRailSection {
      order: 3 !important;
    }
  }

  .goldblogPage .goldBlogHubIntro h2 {
    display: none !important;
  }

  .goldblogPage .goldBlogHubIntro {
    margin-bottom: 14px !important;
  }

  .goldblogPage .goldBlogCategoryCard,
  .goldblogPage .goldBlogCategoryCard:hover,
  .goldblogPage .goldBlogCategoryCard.isActive {
    overflow: hidden !important;
    border: 1px solid rgba(196, 160, 86, 0.28) !important;
    box-shadow:
      0 1px 0 rgba(255, 240, 220, 0.1) inset,
      0 2px 6px rgba(24, 14, 8, 0.12),
      0 18px 36px rgba(24, 14, 8, 0.16) !important;
  }

  .goldblogPage {
    background:
      radial-gradient(ellipse 92% 58% at 12% -12%, rgba(204, 162, 122, 0.7), transparent 56%),
      radial-gradient(ellipse 78% 48% at 94% 6%, rgba(168, 130, 104, 0.34), transparent 50%),
      radial-gradient(ellipse 70% 42% at 50% 108%, rgba(255, 252, 248, 0.95), transparent 52%),
      linear-gradient(180deg, #c9b096 0%, #deccba 30%, #eee5d9 58%, #f6f1ea 82%, #fcfaf6 100%) !important;
  }

  .goldblogPage .goldBlogNewCard,
  .goldblogPage .goldBlogNewCard:first-child {
    isolation: isolate;
    flex: 0 0 min(48vw, 168px) !important;
    width: min(48vw, 168px) !important;
    min-width: 0 !important;
    min-height: 0 !important;
    padding: 12px 13px 13px !important;
    border: 1.5px solid transparent !important;
    border-radius: 16px !important;
    background:
      linear-gradient(#ffffff, #ffffff) padding-box,
      linear-gradient(145deg, #f0dc9a 0%, #c4a056 42%, #8d6a28 78%, #e2c67c 100%) border-box !important;
    box-shadow:
      0 1px 0 rgba(255, 252, 240, 0.7) inset,
      0 1px 2px rgba(72, 46, 28, 0.05),
      0 6px 14px rgba(72, 46, 28, 0.06),
      0 18px 34px rgba(72, 46, 28, 0.07) !important;
    color: #1c1410 !important;
    text-align: left;
  }

  @media (hover: hover) and (pointer: fine) {
    .goldblogPage .goldBlogNewCard:hover,
    .goldblogPage .goldBlogNewCard:first-child:hover {
      transform: translateY(-3px) !important;
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.92) inset,
        0 4px 10px rgba(72, 46, 28, 0.08),
        0 16px 28px rgba(72, 46, 28, 0.1) !important;
    }

    .goldblogPage .goldBlogCategoryCard:hover {
      transform: translateY(-3px) !important;
      box-shadow:
        0 1px 0 rgba(255, 240, 220, 0.12) inset,
        0 8px 18px rgba(24, 14, 8, 0.14),
        0 22px 40px rgba(24, 14, 8, 0.18) !important;
    }
  }

  .goldblogPage .goldBlogNewCard::after,
  .goldblogPage .goldBlogNewCard:first-child::after {
    display: none !important;
  }

  .goldblogPage .goldBlogNewCardImage {
    display: none !important;
  }

  .goldblogPage .goldBlogNewCardMeta,
  .goldblogPage .goldBlogNewCard:first-child .goldBlogNewCardMeta {
    margin-bottom: 10px !important;
    color: #6a5040 !important;
    font-size: 8px !important;
    letter-spacing: 0.04em;
  }

  .goldblogPage .goldBlogNewCard > p,
  .goldblogPage .goldBlogNewCard:first-child > p {
    margin: 0 0 5px !important;
    color: #c4a056 !important;
    font-size: 8px !important;
    font-weight: 700 !important;
    letter-spacing: 0.16em !important;
    line-height: 1.3 !important;
  }

  .goldblogPage .goldBlogNewCardTitle,
  .goldblogPage .goldBlogNewCard h4,
  .goldblogPage .goldBlogNewCard:first-child h4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0 !important;
    color: #16110c !important;
    background: none !important;
    -webkit-text-fill-color: #16110c !important;
    font-family: Georgia, "Times New Roman", serif !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 1.28 !important;
    letter-spacing: -0.03em !important;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
  }

  .goldblogPage .goldBlogNewBadge {
    padding: 3px 7px !important;
    border: 0 !important;
    border-radius: 999px !important;
    color: #1a120c !important;
    background: #d4b56a !important;
    font-size: 7px !important;
    font-weight: 700 !important;
    letter-spacing: 0.12em !important;
  }

  .goldblogPage .goldBlogCategoryCard p,
  .goldblogPage .goldBlogCategoryCard h3,
  .goldblogPage .goldBlogCategoryCard small {
    position: relative;
    z-index: 1;
  }

  .goldblogPage .goldBlogCategoryCard p {
    color: #e2c67c !important;
    font-weight: 700 !important;
    letter-spacing: 0.14em !important;
  }

  .goldblogPage .goldBlogCategoryCard h3 {
    color: #e2c67c !important;
    background-image: linear-gradient(180deg, #f0dc9a 0%, #e2c67c 42%, #c4a056 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
    -webkit-font-smoothing: antialiased;
  }

  .goldblogPage .goldBlogCategoryCard small {
    color: rgba(246, 237, 216, 0.88) !important;
    line-height: 1.45 !important;
  }

  .goldblogPage .goldBlogCategoryCard[data-category-key="spirituel-stoa"] {
    background: linear-gradient(180deg, #2c1c14 0%, #1a120c 100%) !important;
  }

  .goldblogPage .goldBlogCategoryCard[data-category-key="iliski-rezonansi"] {
    background: linear-gradient(180deg, #3d281c 0%, #27180f 100%) !important;
  }

  .goldblogPage .goldBlogCategoryCard[data-category-key="kendilik-rezonansi"] {
    background: linear-gradient(180deg, #322a18 0%, #1e1a10 100%) !important;
  }

  .goldblogPage .goldBlogCategoryCard[data-category-key="bolluk-rezonansi"] {
    background: linear-gradient(180deg, #3f3218 0%, #2a220e 100%) !important;
  }

  .goldblogPage .goldBlogCategoryCard[data-category-key="goldkozmos-gunlugu"] {
    background: linear-gradient(180deg, #321c18 0%, #1c100e 100%) !important;
  }

  .goldblogPage .goldBlogSection,
  .goldblogPage .goldBlogHub,
  .goldblogPage .goldBlogNewSection,
  .goldblogPage .goldBlogHubRailShell {
    overflow: visible !important;
  }

  .goldblogPage .goldBlogNewRail,
  .goldblogPage .goldBlogCategoryRail {
    overflow-x: auto !important;
    padding: 22px 12px 40px !important;
    margin: -10px -12px -22px !important;
  }

  .goldblogPage .goldBlogNewCard,
  .goldblogPage .goldBlogNewCard:first-child {
    overflow: visible !important;
  }

  .goldblogPage .goldBlogNewHead h3 {
    color: #16110c !important;
    background: none !important;
    -webkit-text-fill-color: #16110c !important;
    font-size: 16px !important;
    letter-spacing: -0.03em !important;
  }

  .goldblogPage .goldBlogHubEyebrow {
    color: #c4a056 !important;
    background: none !important;
    -webkit-text-fill-color: #c4a056 !important;
  }

  .goldblogPage .goldBlogNewSeeAll {
    color: #16110c !important;
    -webkit-text-fill-color: #16110c !important;
  }

  .goldblogPage .goldBlogMiniBackdrop {
    z-index: 100050 !important;
    padding: 28px 16px calc(28px + env(safe-area-inset-bottom, 0px)) !important;
    background: rgba(18, 12, 8, 0.52) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
  }

  .goldblogPage .goldBlogMiniPaper {
    width: min(400px, 100%) !important;
    max-height: min(76dvh, 620px) !important;
    padding: 20px 16px 18px !important;
    border: 1.5px solid transparent !important;
    border-radius: 22px !important;
    background:
      linear-gradient(#ffffff, #ffffff) padding-box,
      linear-gradient(145deg, #f0dc9a 0%, #c4a056 40%, #8d6a28 76%, #e2c67c 100%) border-box !important;
    box-shadow:
      0 1px 0 rgba(255, 252, 240, 0.75) inset,
      0 18px 40px rgba(20, 12, 8, 0.18),
      0 40px 70px rgba(20, 12, 8, 0.16) !important;
  }

  .goldblogPage .goldBlogMiniTop {
    margin-bottom: 14px !important;
    align-items: center !important;
  }

  .goldblogPage .goldBlogMiniTop p {
    color: #c4a056 !important;
    font-size: 8px !important;
    font-weight: 700 !important;
    letter-spacing: 0.18em !important;
  }

  .goldblogPage .goldBlogMiniTop h2 {
    color: #16110c !important;
    background: none !important;
    -webkit-text-fill-color: #16110c !important;
    font-size: 24px !important;
    letter-spacing: -0.04em !important;
    line-height: 1.1 !important;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
  }

  .goldblogPage .goldBlogMiniClose {
    width: 34px !important;
    height: 34px !important;
    border: 1px solid rgba(196, 160, 86, 0.38) !important;
    background:
      linear-gradient(180deg, #fffdf8, #f4eadc) !important;
    color: #6a4a28 !important;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.85) inset !important;
  }

  .goldblogPage .goldBlogMiniList {
    gap: 8px !important;
  }

  .goldblogPage .goldBlogMiniItem {
    padding: 13px 14px 12px !important;
    border: 1.5px solid transparent !important;
    border-radius: 14px !important;
    background:
      linear-gradient(#ffffff, #ffffff) padding-box,
      linear-gradient(145deg, #f0dc9a 0%, #c4a056 42%, #8d6a28 78%, #e2c67c 100%) border-box !important;
    box-shadow:
      0 1px 0 rgba(255, 252, 240, 0.7) inset,
      0 6px 14px rgba(48, 32, 18, 0.04) !important;
  }

  .goldblogPage .goldBlogMiniItem p {
    color: #c4a056 !important;
    font-size: 8px !important;
    letter-spacing: 0.16em !important;
  }

  .goldblogPage .goldBlogMiniItem strong {
    color: #16110c !important;
    background: none !important;
    -webkit-text-fill-color: #16110c !important;
    font-size: 15px !important;
    line-height: 1.28 !important;
    letter-spacing: -0.03em !important;
  }

  .goldblogPage .goldBlogMiniItem span {
    color: #7a7066 !important;
    font-size: 11px !important;
  }

`;

const canonicalGoldBlogUrl =
  "https://goldkozmos.com/goldblog";


export default function GoldBlogSection() {
  const [activeCategory, setActiveCategory] =
    useState<GoldBlogCategoryKey>("spirituel-stoa");

  const [discoverCategory, setDiscoverCategory] =
    useState<GoldBlogCategoryKey | null>(null);

  const [newAllOpen, setNewAllOpen] =
    useState(false);

  const [readerMini, setReaderMini] =
    useState(false);

  const [readerArticle, setReaderArticle] =
    useState<GoldBlogArticle | null>(null);

  const [shareOpen, setShareOpen] =
    useState(false);

  const [shareQuote, setShareQuote] =
    useState("");

  const [copyLabel, setCopyLabel] =
    useState("Bağlantıyı Kopyala");

  const [readingProgress, setReadingProgress] =
    useState(0);

  const [commentCounts, setCommentCounts] =
    useState<Record<string, number>>({});

  const categoryRailRef =
    useRef<HTMLDivElement>(null);

  const newRailRef =
    useRef<HTMLDivElement>(null);

  const readerContentRef =
    useRef<HTMLDivElement>(null);

  const handleCommentCount = useCallback(
    (postId: string, count: number) => {
      setCommentCounts((current) => ({
        ...current,
        [postId]: count,
      }));
    },
    [],
  );

  const newArticles = useMemo(
    () =>
      goldBlogArticles.filter(
        (article) => article.isNew,
      ),
    [],
  );

  useEffect(() => {
    let cancelled = false;

    fetch("/api/goldblog/comments/counts", {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled && data?.counts) {
          setCommentCounts(data.counts);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const backToTop =
      document.querySelector<HTMLAnchorElement>(
        ".goldblogPage .siteGlobalBackToTop",
      );

    if (!backToTop) return;

    const handleBackToTop = (
      event: MouseEvent,
    ) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    backToTop.addEventListener(
      "click",
      handleBackToTop,
    );

    return () => {
      backToTop.removeEventListener(
        "click",
        handleBackToTop,
      );
    };
  }, []);

  useEffect(() => {
    const syncReaderFromUrl = () => {
      const params = new URLSearchParams(
        window.location.search,
      );

      const slug = params.get("yazi");

      if (!slug) {
        setReaderArticle(null);
        return;
      }

      const matchedArticle =
        goldBlogArticles.find(
          (article) =>
            article.slug === slug,
        );

      if (matchedArticle) {
        setReaderArticle(matchedArticle);
        setActiveCategory(
          matchedArticle.categoryKey,
        );
      }
    };

    syncReaderFromUrl();

    window.addEventListener(
      "popstate",
      syncReaderFromUrl,
    );

    return () => {
      window.removeEventListener(
        "popstate",
        syncReaderFromUrl,
      );
    };
  }, []);

  useEffect(() => {
    if (!readerArticle && !newAllOpen && !discoverCategory) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key !== "Escape") return;

      if (shareOpen) {
        setShareOpen(false);
        return;
      }

      if (readerArticle) {
        closeReader();
        return;
      }

      if (newAllOpen) {
        setNewAllOpen(false);
        return;
      }

      setDiscoverCategory(null);
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [readerArticle, shareOpen, newAllOpen, discoverCategory]);

  function selectCategory(
    categoryKey: GoldBlogCategoryKey,
  ) {
    setActiveCategory(categoryKey);
    setDiscoverCategory(categoryKey);
  }

  function updateArticleUrl(
    slug: string | null,
  ) {
    const url = new URL(
      window.location.href,
    );

    if (slug) {
      url.searchParams.set(
        "yazi",
        slug,
      );
    } else {
      url.searchParams.delete("yazi");
    }

    window.history.replaceState(
      {},
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }

  function openReader(
    article: GoldBlogArticle,
    mini = false,
  ) {
    setReaderMini(mini);
    setReaderArticle(article);
    setActiveCategory(
      article.categoryKey,
    );
    setShareOpen(false);
    setShareQuote("");
    setReadingProgress(0);

    updateArticleUrl(article.slug);
  }

  function closeReader() {
    setReaderArticle(null);
    setReaderMini(false);
    setShareOpen(false);
    setShareQuote("");
    setReadingProgress(0);

    updateArticleUrl(null);
  }

  function handleReaderScroll(
    event: UIEvent<HTMLDivElement>,
  ) {
    const element = event.currentTarget;

    const available =
      element.scrollHeight -
      element.clientHeight;

    const progress =
      available <= 0
        ? 100
        : Math.min(
            100,
            Math.max(
              0,
              (element.scrollTop /
                available) *
                100,
            ),
          );

    setReadingProgress(progress);
  }

  function getSelectedReaderText() {
    if (
      typeof window === "undefined" ||
      !readerContentRef.current
    ) {
      return "";
    }

    const selection =
      window.getSelection();

    if (
      !selection ||
      selection.rangeCount === 0
    ) {
      return "";
    }

    const selectedText =
      selection.toString().trim();

    if (!selectedText) {
      return "";
    }

    const range =
      selection.getRangeAt(0);

    const commonNode =
      range.commonAncestorContainer;

    if (
      !readerContentRef.current.contains(
        commonNode,
      )
    ) {
      return "";
    }

    return selectedText
      .replace(/\s+/g, " ")
      .slice(0, 420);
  }

  function toggleShare() {
    const selectedText =
      getSelectedReaderText();

    setShareQuote(selectedText);
    setShareOpen((current) => !current);
    setCopyLabel("Bağlantıyı Kopyala");
  }

  function getShareUrl(
    article: GoldBlogArticle,
  ) {
    return `${canonicalGoldBlogUrl}?yazi=${encodeURIComponent(
      article.slug,
    )}`;
  }

  function getShareMessage(
    article: GoldBlogArticle,
    quote = shareQuote,
  ) {
    const url = getShareUrl(article);

    if (quote) {
      return `“${quote}”\n\n${article.title}\n${url}`;
    }

    return `${article.title}\n${url}`;
  }

  async function nativeShare(
    article: GoldBlogArticle,
  ) {
    const url = getShareUrl(article);

    const text = shareQuote
      ? `“${shareQuote}”`
      : article.description;

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text,
          url,
        });

        return;
      } catch {
        return;
      }
    }

    await copyShareLink(article);
  }

  function shareToWhatsapp(
    article: GoldBlogArticle,
  ) {
    const message =
      getShareMessage(article);

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        message,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function shareToX(
    article: GoldBlogArticle,
  ) {
    const url = getShareUrl(article);

    const text = shareQuote
      ? `“${shareQuote.slice(
          0,
          180,
        )}”\n\n${article.title}`
      : article.title;

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function copyShareLink(
    article: GoldBlogArticle,
  ) {
    const url = getShareUrl(article);

    try {
      await navigator.clipboard.writeText(
        url,
      );

      setCopyLabel("Kopyalandı ✓");

      window.setTimeout(() => {
        setCopyLabel(
          "Bağlantıyı Kopyala",
        );
      }, 1800);

      return;
    } catch {
      const textarea =
        document.createElement(
          "textarea",
        );

      textarea.value = url;
      textarea.style.position =
        "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(
        textarea,
      );

      textarea.select();

      document.execCommand("copy");

      document.body.removeChild(
        textarea,
      );

      setCopyLabel("Kopyalandı ✓");
    }
  }

  return (
    <>
      <style>{goldBlogHubStyles}</style>

      <section
        className="goldBlogSection"
        id="goldblog"
      >
        <div className="goldBlogHub">
          <section className="goldBlogNewSection">
            <div className="goldBlogNewHead">
              <h3>Son eklenenler</h3>

              <div className="goldBlogNewHeadActions">
                <GoldBlogNotifications
                  onOpenPost={(slug) => {
                    const article = goldBlogArticles.find(
                      (item) => item.slug === slug,
                    );

                    if (article) {
                      openReader(article, true);
                    }
                  }}
                />

                <button
                  type="button"
                  className="goldBlogNewSeeAll"
                  onClick={() => setNewAllOpen(true)}
                >
                  Tümünü gör
                </button>
              </div>
            </div>

            <div
              className="goldBlogNewRail"
              ref={newRailRef}
            >
              {newArticles.map(
                (article) => (
                  <button
                    type="button"
                    className="goldBlogNewCard"
                    data-category-key={article.categoryKey}
                    key={article.slug}
                    onClick={() =>
                      openReader(article, true)
                    }
                  >
                    <div className="goldBlogNewCardMeta">
                      <span className="goldBlogNewBadge">
                        YENİ
                      </span>

                      <span>
                        {article.readingTime}
                      </span>
                    </div>

                    <p>
                      {article.category}
                    </p>

                    <h4 className="goldBlogNewCardTitle">
                      {article.title}
                    </h4>
                  </button>
                ),
              )}
            </div>
          </section>

          <header className="goldBlogHubIntro">
            <div>
              <p className="goldBlogHubEyebrow">
                GOLDKOZMOS® · GOLDBLOG
              </p>
            </div>
          </header>

          <div className="goldBlogHubRailShell">
            <div
              className="goldBlogCategoryRail"
              ref={categoryRailRef}
            >
              {goldBlogCategories.map(
                (category) => (
                  <button
                    type="button"
                    data-category-key={
                      category.key
                    }
                    className="goldBlogCategoryCard"
                    key={category.key}
                    onClick={() =>
                      selectCategory(
                        category.key,
                      )
                    }
                  >
                    <div className="goldBlogCategoryCardTop">
                      <span>
                        {category.number}
                      </span>

                      <span
                        aria-hidden="true"
                      >
                        ↘
                      </span>
                    </div>

                    <div className="goldBlogCategoryCardImage">
                      <img
                        src={
                          goldBlogCategoryImages[
                            category.key
                          ]
                        }
                        alt=""
                        aria-hidden="true"
                      />
                    </div>

                    <p>
                      {category.label}
                    </p>

                    <h3>
                      {category.title}
                    </h3>

                    <small>
                      {category.description}
                    </small>
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {newAllOpen ? (
        <div
          className="goldBlogMiniBackdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setNewAllOpen(false);
            }
          }}
        >
          <div
            className="goldBlogMiniPaper"
            role="dialog"
            aria-modal="true"
            aria-labelledby="goldBlogNewAllTitle"
          >
            <div className="goldBlogMiniTop">
              <div>
                <p>GOLDBLOG</p>
                <h2 id="goldBlogNewAllTitle">
                  Son eklenenler
                </h2>
              </div>
              <button
                type="button"
                className="goldBlogMiniClose"
                onClick={() => setNewAllOpen(false)}
                aria-label="Son eklenenleri kapat"
              >
                ×
              </button>
            </div>

            <div className="goldBlogMiniList">
              {newArticles.map((article) => (
                <button
                  type="button"
                  className="goldBlogMiniItem"
                  key={`all-${article.slug}`}
                  onClick={() => openReader(article, true)}
                >
                  <p>{article.category}</p>
                  <strong>{article.title}</strong>
                  <span>{article.readingTime} okuma</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {discoverCategory ? (
        <div className="goldBlogDiscoverBackdrop">
          <div className="goldBlogDiscoverPaper">
            <div className="goldBlogDiscoverTop">
              <div>
                <p>KEŞFET</p>
                <h2>
                  {goldBlogCategories.find(
                    (category) =>
                      category.key === discoverCategory,
                  )?.title}
                </h2>
              </div>
              <div className="goldBlogDiscoverTopActions">
                <GoldBlogNotifications
                  onOpenPost={(slug) => {
                    const article = goldBlogArticles.find(
                      (item) => item.slug === slug,
                    );

                    if (article) {
                      setDiscoverCategory(null);
                      openReader(article, true);
                    }
                  }}
                />
                <button
                  type="button"
                  className="goldBlogDiscoverClose"
                  onClick={() => setDiscoverCategory(null)}
                  aria-label="Keşfet ekranını kapat"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="goldBlogDiscoverList">
              {goldBlogArticles
                .filter(
                  (article) =>
                    article.categoryKey === discoverCategory,
                )
                .map((article) => (
                  <article
                    className="goldBlogDiscoverItem"
                    key={article.slug}
                  >
                    <button
                      type="button"
                      className="goldBlogDiscoverCopy"
                      onClick={() => {
                        openReader(article);
                      }}
                    >
                      <p>{article.category}</p>
                      <div className="goldBlogDiscoverTitleRow">
                        <strong>{article.title}</strong>
                        <span className="goldBlogDiscoverMore">
                          Devamını oku
                        </span>
                      </div>
                      <span>{article.description}</span>
                    </button>

                    <GoldBlogComments
                      postId={article.slug}
                      compact
                      compose={false}
                      onReadClick={() => openReader(article)}
                      onCountChange={handleCommentCount}
                    />
                  </article>
                ))}
            </div>
          </div>
        </div>
      ) : null}

      {readerArticle && (
        <div
          className={
            readerMini
              ? "goldBlogReaderBackdrop isMini"
              : "goldBlogReaderBackdrop"
          }
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeReader();
            }
          }}
        >
          <div
            className="goldBlogReaderPaper"
            role="dialog"
            aria-modal="true"
            aria-labelledby="goldBlogReaderTitle"
          >
            <div className="goldBlogReaderTopbar">
              <div className="goldBlogReaderBrand">
                <span>
                  GK
                </span>

                <span>
                  GOLDBLOG OKUMA MODU
                </span>
              </div>

              <div className="goldBlogReaderActions">
                <button
                  type="button"
                  className="goldBlogReaderShareButton"
                  onClick={toggleShare}
                >
                  Paylaş ↗
                </button>

                <button
                  type="button"
                  className="goldBlogReaderCloseButton"
                  onClick={closeReader}
                  aria-label="Yazıyı kapat"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="goldBlogReaderProgress">
              <span
                style={{
                  width: `${readingProgress}%`,
                }}
              />
            </div>

            {shareOpen && (
              <div className="goldBlogSharePopover">
                <p>
                  {shareQuote
                    ? "SEÇTİĞİN BÖLÜMÜ PAYLAŞ"
                    : "YAZIYI PAYLAŞ"}
                </p>

                <span>
                  {shareQuote
                    ? "Metinde seçtiğin bölüm paylaşım mesajına eklenecek."
                    : "Yazının bağlantısını istediğin yerde paylaşabilirsin."}
                </span>

                <div className="goldBlogShareOptions">
                  <button
                    type="button"
                    onClick={() =>
                      nativeShare(
                        readerArticle,
                      )
                    }
                  >
                    Cihazda Paylaş
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      shareToWhatsapp(
                        readerArticle,
                      )
                    }
                  >
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      shareToX(
                        readerArticle,
                      )
                    }
                  >
                    X
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      copyShareLink(
                        readerArticle,
                      )
                    }
                  >
                    {copyLabel}
                  </button>
                </div>

                <p className="goldBlogShareHint">
                  İstersen önce yazının içinden
                  sevdiğin bir cümleyi seç, sonra
                  “Paylaş”a bas. Seçtiğin bölüm
                  paylaşım metnine eklenir.
                </p>
              </div>
            )}

            <div
              className="goldBlogReaderScroll"
              onScroll={handleReaderScroll}
            >
              <article
                className="goldBlogReaderArticle"
                ref={readerContentRef}
              >
                <p className="goldBlogReaderEyebrow">
                  {readerArticle.category}
                </p>

                <h2 id="goldBlogReaderTitle">
                  {readerArticle.title}
                </h2>

                <div className="goldBlogReaderMeta">
                  <span>
                    {readerArticle.readingTime} Okuma
                  </span>

                  <span>
                    GOLDKOZMOS® GOLDBLOG
                  </span>
                </div>

                <div className="goldBlogReaderBody">
                  {readerArticle.content.map(
                    (paragraph, index) => (
                      <p
                        key={`${readerArticle.slug}-${index}`}
                      >
                        {paragraph}
                      </p>
                    ),
                  )}
                </div>

                <div className="goldBlogReaderEnd">
                  <p>
                    YAZININ SONU
                  </p>

                  <h3>
                    Okuduğun şey sende ne bıraktı?
                  </h3>

                  <GoldBlogComments
                    postId={readerArticle.slug}
                    onCountChange={handleCommentCount}
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
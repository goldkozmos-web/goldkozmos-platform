import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_SOLO = new Set([
  "kirmizi",
  "beyaz",
  "siyah",
  "mavi",
  "yesil",
  "sari",
  "mor",
  "pembe",
  "turuncu",
  "gri",
  "kahverengi",
  "lacivert",
  "bordo",
  "altin",
  "gumus",
]);
const SKIP = new Set([
  "yilan",
  "eski sevgili",
  "bebek",
  "deniz",
  "para",
  "kopek",
  "kedi",
  "dis",
  "aglamak",
  "olmus biri",
]);

const GROUPS = {
  people: `anne baba abi abla kardes amca dayi hala teyze dede babaanne anneanne kuzen yegen kayinvalide kaynana kayinpeder gorumce elti eniste bacanak es koca kari sevgili nisanli arkadas komsu is_arkadasi patron ogretmen doktor hemsire polis asker jandarma imam unlu yabanci cocuk yasli kadin erkek insan kalabalik misafir damat gelin kayin_birader uvey_anne uvey_baba uvey_kardes torun oglan kiz kardesoglu kardeskizi aile akraba dost dusman rakip sevgilinin_annesi sevgilinin_babasi eski_koca eski_kari eski_arkadas sinif_arkadasi kaptan komutan general er onbasi cavus yuzbasi binbasi vali belediye_baskani milletvekili kral kralice prens prenses sultan padişah hoca molla seyih dervis keşiş rahip rahibe aziz peygamber melek seytan cin peri cadı buyucu falci medyum cocukluk_arkadasi ilkogretmen`,
  vehicle: `araba otomobil spor_araba luks_araba eski_araba yeni_araba kirmizi_araba siyah_araba beyaz_araba araba_kazasi motosiklet motor bisiklet otobüs minibus dolmus metro metrobus tren tramvay ucak helikopter gemi tekne yat kamyon tir ambulans polis_arabasi askeri_arac itfaiye taksi kano kayik sal feribot scooter paten kaykay at_arabasi traktor is_makinesi dozer vinç jeep cip karavan motokaravan`,
  child: `erkek_bebek kiz_bebek yeni_dogmus_bebek aglayan_bebek gulene_bebek uyuyan_bebek hasta_bebek bebek_arabasi bebek_besigi bebek_yatagi bebek_kiyafeti bebek_ayakkabisi bebek_battaniyesi bebek_bezi oyuncak_bebek erkek_cocuk kiz_cocuk okul_cocugu bebek_emzirmek bebek_dogurmak`,
  clothing: `elbise kirmizi_elbise siyah_elbise beyaz_elbise yesil_elbise mavi_elbise sari_elbise mor_elbise pembe_elbise gelinlik damatlik takim_elbise etek pantolon kot_pantolon gomlek tisort kazak ceket mont palto corap ic_camasiri pijama gecelik uniforma asker_uniformasi polis_uniformasi basortusu turban sal sapka bere ayakkabi topuklu_ayakkabi bot terlik cizme canta valiz cuzdan kolye kupe yuzuk alyans bilezik saat kravat fular kemer eldiven atki esarp mayo bikini yagmurluk sort pijama_takimi gecelik sabahlik`,
  home: `ev eski_ev yeni_ev buyuk_ev kucuk_ev bos_ev yikik_ev bahceli_ev oda salon yatak_odasi mutfak banyo tuvalet balkon teras cati bodrum merdiven asansor koridor kapi pencere masa sandalye koltuk yatak dolap ayna hali perde lamba televizyon buzdolabi camasir_makinesi bulasik_makinesi firin tabak bardak kasik catal bicak kanepe sehpa komodin kitaplik vazo cicek_saksisi elektrik_supurgesi utu mikrodalga caydanlik cezve tencere tava tepsi kova supurge ip merdiven_basamagi kilit zil posta_kutusu bahce_kapisi garaj depo camasir_askisi`,
  food: `ekmek et tavuk balik sut yogurt peynir yumurta pilav makarna corba tatli cikolata seker bal kahve cay su meyve suyu elma armut muz uzum cilek kiraz erik karpuz kavun portakal mandalina limon nar incir hurma ceviz findik domates patates sogan sarimsak biber havuc salatalik lahana ispanak yemek pilav kofte kebap pide lahmacun borek baklava lokum dondurma pasta kek recel zeytin zeytinyagi tereyagi un pirinc mercimek nohut fasulye barbunya mısır ayciyagi salca turşu turşu yaprak sarma dolma menemen omlet tost sandvic hamburger pizza sucuk sosis pastirma kavurma midye karides ahtapot kalamar`,
  animal: `yavru kedi siyah kedi beyaz kedi yavru kopek at esek inek boga koyun keci aslan kaplan leopar kurt ayi tilki geyik fare tavsan sincap kartal baykus karga guvercin serce marti tavuk horoz ordek kaz yunus balina kopekbaligi ahtapot denizanasi ari kelebek sinek karinca orumcek akrep hamambocegi cekirge solucan kedi kopek yilan papağan muhabbet kusu kanarya flamingo pelikan leylek kirlangic saksağan kuzgun akbaba şahin dogan atesbocegi ugurbocegi sivrisinek kene biti pire kirpi porsuk sansar samur kunduz lama deve zebra zurafa fil gergedan hipopotam timsah kertenkele bukalemun yılanbaligi alabalik hamsi palamut levrek cipura koi japonbaligi`,
  job: `avukat hakim savci muhendis mimar psikolog garson asci sofor pilot hostes mudur isci ciftci berber kuafor hoca sanatci oyuncu sarkici gazeteci yazar cizer fotografci tamirci elektrikci tesisatci marangoz demirci nalbant kasap firinci manav eczaci eczane calisani hemşire ebe ebe anne anestezi teknisyeni itfaiyeci gümrük memuru noter muhasebeci bankaci sigortaci pazarlamaci kasiyer host hostes kaptan denizci asker polis`,
  place: `okul universite hastane is_yeri ofis fabrika magaza avm market restoran kafe otel havaalani otogar tren_istasyonu sokak cadde sehir koy bahce park orman dag sahil plaj ada mezarlik cami kilise hapishane karakol askeriye kisla savas_alani dugun_salonu eczane banka postane kutuphane tiyatro sinema stadyum cim salon hamam sauna kaplica bar disko pavyon genelev pansiyon yurt kışla karargah sinir_kapisi gumruk kopru alt_gecit ust_gecit meydan cesme kuyu`,
  body: `sac uzun sac kisa sac sac kesmek sac dokulmesi dis dis dusmesi dis kirilmasi dis cekilmesi goz kulak burun agiz dudak dil boyun kol el parmak tirnak gogus karin bacak diz ayak kan yara morarma ameliyat hastalik iyilesme adet regl hamilelik dogum bel omuz kalca bas yuz kas cene alin kirisik ben siğil sivilce ates oksuruk nezle grip`,
  nature: `okyanus gol nehir dere selale dag tepe orman agac cicek cimen toprak kum tas camur gunes ay dolunay hilal yildiz gezegen gokyuzu bulut yagmur kar dolu firtina ruzgar simsek gok gurultusu hortum sel deprem tsunami yangin gokkuşağı şafak gun batimi gece gündüz mevsim ilkbahar yaz sonbahar kis cicek bahcesi gül lale kardelen papatya menekşe zambak yasemin begonvil çam selvi söğüt meşe kavak incir agaci zeytin agaci`,
  relation: `eski sevgilinin donmesi eski sevgiliyle konusmak eski sevgiliyle barismak eski sevgilinin evlenmesi sevgiliyle kavga sevgiliyle ayrilmak aldatmak aldatılmak opusmek sarilmak el ele tutusmak evlenmek nisanlanmak dugun bosanmak hoslandigin kisi platonik ask nişan yüzüğü nikah düğün pastası gelin arabası`,
  death: `olmek oldugunu gormek birinin oldugunu gormek oluyu canli gormek olunun konusmasi olunun sarilmasi olunun eve gelmesi cenaze tabut mezar mezarlik anne olumu baba olumu es olumu cocuk olumu defin taziye bassağlığı kefen mezartaşı`,
  spirit: `dua dua etmek namaz namaz kilmak kuran sure ayet besmele ezan oruc hac umre melek isik aura mum tutsu enerji merdiven ayna tesbih seccade minare ezan sesi kabir ziyareti mevlit kandil ramazan kurban bayrami`,
  tech: `telefon telefon_kirilmasi telefon_kaybetmek telefonla_konusmak mesaj_almak bilgisayar laptop tablet internet sosyal_medya instagram whatsapp kamera fotograf televizyon kumanda kulaklik sarj_aleti wifi sifre eposta mail video oyun konsol`,
  object: `anahtar canta valiz ayna merdiven kapi pencere kilit kutu canta cuzdan para cantasi cekmecesi sandik sepet ip ipucu ip yumaği iğne iplik makas cekiç tornavida testere kürek kazma balta testere testere tırnak makası tarak fırça sabun sampuan krem parfüm ruj oje ayna tarağı süpürge paspas kova leğen tencere kapak tepsi sini sofra örtüsü yastık yorgan battaniye nevresim havlu peşkir masa örtüsü kitap defter kalem silgi cetvel çanta okul çantası sırt çantası evrak çantası cüzdan kart anahtarlık zincir kilit asma kilit kilit anahtarı mühür damga pul kartvizit kimlik pasaport ehliyet tapu senet fatura para cüzdanı bozuk para altın bilezik altın kolye`,
  money: `altin gumus mücevher pirlanta elmas zümrüt yakut banka karti kredi karti cek senet borç faiz zam maas ikramiye miras servet fakirlik zenginlik kese kumbara kasa kasa dairesi`,
  school: `okul cantasi kalem defter silgi cetvel sira tahta karatahta beyaz tahta ogretmen masasi sinav kagidi diploma mezuniyet toreni kantin laboratuvar kutuphane kitabi odev proje sunum not karti karne`,
  war: `savas silah tufek tabanca kılıc kalkan bomba tank top mermi askeriye kisla cephe siper bayrak zafer yenilgi esir kurtulus savasi`,
  wedding: `dugun gelinlik damatlik nisan alyans duvak baslik kina kina gecesi nisan yuzugu soz yuzugu nikah dairesi imam nikahi`,
  health: `hastane ameliyat iğne serum ilac recete tansiyon ates olcme rontgen tomografi hastane yatagi tekerlekli sandalye koltuk degnegi sargi yara bandı`,
  emotion: `korku oç uzuntu sevinci huzur panik ofke kiskanc lik utanc sucluluk ozlem hasret yalnizlik kalabalik korkusu karabasan kâbus`,
};

function words(block) {
  return block
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function fold(value) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(symbol) {
  return `ruyada-${fold(symbol).replace(/\s+/g, "-")}-gormek`;
}

function titleCase(symbol) {
  return symbol
    .split(" ")
    .map((part) => part.charAt(0).toLocaleUpperCase("tr-TR") + part.slice(1))
    .join(" ");
}

function hash(text) {
  let n = 0;
  for (const ch of text) n = (n * 33 + ch.charCodeAt(0)) >>> 0;
  return n;
}

const FRAMES = {
  people: [
    (s) =>
      `${titleCase(s)} rüyada çoğu zaman bir kişiyi değil, o rolün sende uyandırdığı bağ hattını getirir. Yüz tanınır olsa da asıl konuşan, o ilişkide kalan titreşimdir.`,
    (s) =>
      `Gece gelen ${s} sahnesi, o bağ biçiminin hâlâ sende bir yer tuttuğunu gösterir. Mesafe, söz ve dokunuş yönü belirler.`,
    (s) =>
      `${titleCase(s)} görünümü bir kehanet kapısı değildir. Hangi odada durduğu, ne giydiği ve sende bıraktığı his, bağın güncel halini boyar.`,
  ],
  vehicle: [
    (s) =>
      `${titleCase(s)} rüyada yön, tempo ve taşıyıcı kuvveti görünür kılar. Kim sürer, kim biner, yol açık mı kapalı mı, iradenin nerede durduğunu söyler.`,
    (s) =>
      `Gece ${s} ile hareket etmek, yaşam çizgisinin o andaki vitesini gösterir. Fren, hız ve kaza kontrol ile teslimiyet gerilimini taşır.`,
    (s) =>
      `${titleCase(s)} bir varış kehaneti değil, nasıl ilerlediğinin aynasıdır. Eski veya yeni oluşu, kullanılan kuvvetin tazeliğini boyar.`,
  ],
  child: [
    (s) =>
      `${titleCase(s)} henüz kırılgan bir özün alana girdiğini gösterir. Bu her zaman çocuk arzusu değildir; bakım isteyen bir niyet bebek biçimini alabilir.`,
    (s) =>
      `Gece ${s} görmek, doğmakta olana nasıl baktığını konuşur. Kucak, ağlama ve koruma, filizin aldığı nefesi anlatır.`,
  ],
  clothing: [
    (s) =>
      `${titleCase(s)} rüyada görünür kimliği ve üzerine alınan rolü taşır. Giymek, çıkarmak, yırtılmak o kimliğin sende nasıl durduğunu gösterir.`,
    (s) =>
      `Gece ${s} sahnesi, başkalarına gösterdiğin katman ile mahrem katman arasındaki mesafeyi boyar. Renk ve kumaş titreşimin niteliğini söyler.`,
  ],
  home: [
    (s) =>
      `${titleCase(s)} içsel yerleşkeyi, mahremiyeti ve yaşamın dayandığı zemini gösterir. Boş, yıkık veya yeni oluşu o zeminin güncel halidir.`,
    (s) =>
      `Rüyada ${s}, ruhun o odadaki işini görünür kılar. Kapı, pencere ve eşya, neyin içeri alınıp neyin kapatıldığını anlatır.`,
  ],
  food: [
    (s) =>
      `${titleCase(s)} rüyada içeri alınan kuvveti, beslenme ve paylaşım hattını taşır. Yemek, pişirmek veya dağıtmak o kuvvetle kurulan ilişkiyi gösterir.`,
    (s) =>
      `Gece ${s} görmek, bedenin ve ruhun neyi özümsediğini konuşur. Tad, bolluk ve kıtlık aynı sofranın farklı yüzleridir.`,
  ],
  animal: [
    (s) =>
      `${titleCase(s)} içgüdü, koruma veya yabani bir kuvvetin gece yüzüdür. Saldırı, kaçış ve ehlileşme, o kuvvetle dansını anlatır.`,
    (s) =>
      `Rüyada ${s}, henüz dile gelmemiş bir yaşama içgüdüsünü taşır. Renk ve büyüklük, o içgüdünün şiddetini boyar.`,
  ],
  job: [
    (s) =>
      `${titleCase(s)} rüyada toplumsal rol, yetki ve hizmet hattını gösterir. Üniforma ve araç, o rolün sende nasıl giyildiğini anlatır.`,
    (s) =>
      `Gece ${s} olmak, bir işlevin senin alanına girdiğini söyler. Bu meslek kehaneti değil, o işlevin ruhundaki karşılığıdır.`,
  ],
  place: [
    (s) =>
      `${titleCase(s)} rüyada ruhun o anda durduğu sahneyi kurar. Kalabalık, ıssızlık ve eşik, o sahnenin işini belirler.`,
    (s) =>
      `Rüyada ${s}, yaşamın görünür bir katmanına çağrıldığını gösterir. Girmek, çıkmak ve kaybolmak yönü konuşur.`,
  ],
  body: [
    (s) =>
      `${titleCase(s)} rüyada beden hattı üzerinden bir uyarı veya onarım taşır. Kırılma, dökülme ve iyileşme, o hattın güncel gerilimidir. Bu bir tıbbi teşhis değildir.`,
    (s) =>
      `Gece ${s} görmek, görünür bedenin taşıdığı görünmez yükü konuşur. Kan, yara ve parıltı aynı dilin farklı tonlarıdır.`,
  ],
  nature: [
    (s) =>
      `${titleCase(s)} büyük ritmin gece yüzüdür. Su, ateş, toprak ve gök, ruhun hangi elemente çekildiğini gösterir.`,
    (s) =>
      `Rüyada ${s}, kontrolün ötesindeki bir kuvvetin alana girdiğini duyurur. Fırtına ile durgunluk aynı elementin iki nefesidir.`,
  ],
  relation: [
    (s) =>
      `${titleCase(s)} bağın hareket halindeki halini gösterir. Kavga, barış ve ayrılık kehanet değil, bağın o geceki titreşimidir.`,
    (s) =>
      `Gece ${s}, yakınlık ile sınır arasındaki ipi gerer. Kim çekiyor, kim bırakıyor, sahne onu söyler.`,
  ],
  death: [
    (s) =>
      `${titleCase(s)} çoğu zaman fiziksel son değil, bir çevrimin uğurlanışıdır. Konuşma, sarılma ve eve geliş, kapanmamış hattı taşır.`,
    (s) =>
      `Rüyada ${s}, eski bir kimliğin indirildiğini veya henüz uğurlanmamış bir bağı görünür kılar.`,
  ],
  spirit: [
    (s) =>
      `${titleCase(s)} kutsal alana açılan bir eşik taşıyabilir. Bu sahne dini hüküm vermez; içsel bağın nasıl titrediğini gösterir.`,
    (s) =>
      `Gece ${s}, görünmez katmanla kurulan ilişkinin dilidir. Işık, ses ve rükû, o ilişkinin biçimini boyar.`,
  ],
  tech: [
    (s) =>
      `${titleCase(s)} bağlantı, mesaj ve görünürlük hattını taşır. Kırılma, kayıp ve konuşma, o hattın güncel halidir.`,
    (s) =>
      `Rüyada ${s}, modern bağın ruhundaki karşılığını gösterir. Ekran, ses ve susuş aynı ağın farklı kapılarıdır.`,
  ],
  object: [
    (s) =>
      `${titleCase(s)} elindeki araç, anahtar veya yükün gece biçimidir. Bulmak, kaybetmek ve kırmak, o araçla kurulan iradeyi anlatır.`,
    (s) =>
      `Gece ${s} görmek, gündelik bir nesnenin ruhundaki işlevi açar. Nesne kehanet değil, işlevin timsalidir.`,
  ],
  money: [
    (s) =>
      `${titleCase(s)} değer, dolaşım ve güven hattını gösterir. Bolluk ile kayıp, aynı değer ipinin iki ucudur.`,
    (s) =>
      `Rüyada ${s}, maddi suret altında bir değer gerilimini taşır. Sayı kehaneti yoktur; akışın hali vardır.`,
  ],
  school: [
    (s) =>
      `${titleCase(s)} öğrenme, sınanma ve yetkinlik sahnesini kurar. Not, karnı ve tahta, görülmek istenen dersi boyar.`,
    (s) =>
      `Gece ${s}, henüz tamamlanmamış bir içsel müfredatı gösterir.`,
  ],
  war: [
    (s) =>
      `${titleCase(s)} sınır, savunma ve çatışma kuvvetini görünür kılar. Silah çoğu zaman kişiye değil, korunan alana aittir.`,
    (s) =>
      `Rüyada ${s}, içsel bir cephede duruşunu konuşur. Zafer ve yenilgi kehanet değil, o cephedeki nefestir.`,
  ],
  wedding: [
    (s) =>
      `${titleCase(s)} birleşim, yemin ve görünür bağ törenini taşır. Bu her zaman evlilik haberi değildir; birleşen kuvvetin sahnesidir.`,
    (s) =>
      `Gece ${s}, bağın resmiyet katmanını ve şahitlik ihtiyacını gösterir.`,
  ],
  health: [
    (s) =>
      `${titleCase(s)} onarım, bakım ve beden hattındaki bir müdahaleyi taşır. Tıbbi hüküm vermez; bakım ihtiyacının dilidir.`,
    (s) =>
      `Rüyada ${s}, iyileşmekte olan veya ihmal edilen bir çevrimi görünür kılar.`,
  ],
  emotion: [
    (s) =>
      `${titleCase(s)} rüyanın üstüne binen asıl cümledir. Sahne dekor, his metindir.`,
    (s) =>
      `Gece ${s}, henüz gündüz diline inmemiş bir titreşimin yoğunlaşmasıdır.`,
  ],
};

const VARIANT_BY_CAT = {
  vehicle: ["sürmek", "binmek", "kazası", "bozulması"],
  clothing: ["giymek", "satın almak", "yırtılması", "kaybetmek"],
  food: ["yemek", "pişirmek", "satın almak", "dağıtmak"],
  child: ["kucakta", "emzirmek", "ağlamak", "kaybetmek"],
  animal: ["saldırması", "sevmek", "kaçması", "ölmesi"],
  people: ["konuşmak", "kavga", "sarılmak", "kaybetmek"],
  object: ["bulmak", "kaybetmek", "kırılması", "çalınması"],
  tech: ["kırılması", "kaybetmek", "konuşmak", "mesaj"],
  default: ["görmek", "kaybetmek", "bulmak", "vermek"],
};

function variants(symbol, category) {
  const keys = VARIANT_BY_CAT[category] || VARIANT_BY_CAT.default;
  return keys.map((key) => ({
    heading: `Rüyada ${titleCase(symbol)} ${titleCase(key)}`,
    body: `${titleCase(symbol)} sahnesinde ${key}, sembolün temel anlamını hareket ettirir. His ve yer değişmedikçe kehanet aranmaz; o hareketin senin alanındaki karşılığı okunur.`,
  }));
}

function aliases(symbol, category) {
  const base = [
    symbol,
    `${symbol} görmek`,
    `${symbol} gördüm`,
    `rüyada ${symbol}`,
    `rüyada ${symbol} görmek`,
    `${symbol} vardı`,
    `${symbol} var`,
    `${symbol} almak`,
    `${symbol} kaybetmek`,
  ];
  if (category === "vehicle") {
    base.push(
      `${symbol} sürmek`,
      `${symbol} kullanmak`,
      `${symbol} binmek`,
      `${symbol} kazası`,
    );
  }
  if (category === "clothing") {
    base.push(`${symbol} giymek`, `${symbol} giyiyordum`);
  }
  if (symbol.includes(" ")) {
    base.push(symbol.split(" ").join(""));
  }
  return [...new Set(base)];
}

function related(symbol, category, all) {
  const same = all.filter((item) => item.category === category && item.symbol !== symbol);
  const i = hash(symbol) % Math.max(1, same.length);
  return same.slice(i, i + 3).map((item) => slugify(item.symbol));
}

const EXTRA = `
makas ignne iplik dugme fermuar cirt cirt cirtbant toka taç taç yaprağı gül yaprağı yaprak dal kokulu tas tesbih cubugu buhurdanlik saksi saksi toprağı gübre tohum fide fidan sera seradaki cicek balkabağı kabak patlican bamya enginar kereviz turp pancar sarımsak disi sogan taze sogan maydanoz dereotu nane kekik reyhan feslegen zencefil zerdecal tarçın karabiber pul biber kimyon çörekotu susam haşhaş leblebi çekirdek kabak cekirdegi ayçekirdeği fındık ezmesi tahin pekmez reçel vişne reçeli çilek reçeli bal peteği petek kovan arı kovanı sütlaç aşure lokma tulumba kadayıf künefe baklava dilimi dondurma külahı waffle gofret bisküvi kraker cips cips paketi kola gazoz ayran limonata şerbet boza sahlep salep sıcak çikolata espresso türk kahvesi dibek kahvesi cay bardagi ince belli bardak demlik semaver termos matara suluk çeşme suyu kuyu suyu kaynak suyu maden suyu soda
masa örtüsü peçete kürdan pipet pipet kapağı şişe kapağı konserve kutu kapağı açacak tıraş bıçağı tıraş köpüğü deodorant kolonya gül suyu lavanta yağı zeytinyağı şişesi sirke tuzluk biberlik yağdanlık sosluk salata kasesi çorba kasesi kase tabak takımı çay tabağı kahve fincanı fincan tabağı zarf mektup kartpostal pul defteri ajanda takvim duvar takvimi masa saati duvar saati alarm çalar saat kum saati pusula harita küre dünya küresi dürbün teleskop mikroskop mercek gözlük güneş gözlüğü lens çerçeve fotoğraf çerçevesi ayna çerçevesi tablo yağlı boya karakalem heykel büst seramik çömlek testi küp amfora kandil fener el feneri mumluk şamdan avize spot lamba abajur gece lambası priz uzatma kablosu anahtar priz elektrik panosu sigorta kutusu kombi kalorifer radyatör klima vantilatör serinletici soba mangal semaver
araba anahtarı kontak anahtarı direksiyon fren pedal gaz pedal vites aynası dikiz aynası lastik stepne kaput bagaj torpido gözü emniyet kemeri airbag silecek cam suyu far sis farı korna
okul zili teneffüs bahçesi basket potası futbol kalesi voleybol filesi ip atlama ipi top krampon spor çorabı forma eşofman mat yoga matı dambıl halter bisiklet kaskı kask dizlik
pasaport valizi gümrük kuyruğu bilet boarding kartı pasaport kontrolü uçak bileti tren bileti otobüs bileti
dugun pastasi nisan tepsisi kina tasi kina kınası gelin arabasi damat arabasi gelin çiçeği yaka çiçeği
mezar tasi mezartaşı çelenk taziye evi lokma hayır lokması mevlit şekeri
cami avlusu şadırvan minber mihrap vaaz kürsüsü
hapishane parmaklığı mahkeme salonu hakim kürsüsü
deniz feneri liman rıhtım iskele dalgakıran
karakol nöbetçi kulübesi bekçi kulübesi
piyano keman gitar ud kanun ney flut davul darbuka zil tef mikrofon sahne kostüm maske palyaco iskambil kart fal kahvesi
futbol topu basketbol topu voleybol topu tenis raketi tenis topu boks eldiveni ok yay mizrak
havuz dalis gozlugu palet snorkel can yeleği can simidi
trafik isigi kirmizi isik yesil isik yaya gecidi kaldirim otoyol kavsak
apartman villa cati kati giris kati su deposu jenerator
ustu komsu alti komsu kapici güvenlik görevlisi
semt pazari manav tezgahi kasap tezgahi balik tezgahi cicekci
berber koltugu tirash sac kesimi sakal biyik
kuafor fon masa sac boyasi oje ruj fondoten
disci koltugu dolgu dis teli protez dis
gozluk camı isitme cihazi baston yuruteç
bebek emzigi biberon mama sandalyesi
oyuncak araba oyuncak at lego yapboz pelus
okul servisi yoklama defteri rehber ogretmen
asker kunyesi rutbe apolet kep kask
polis dudugu kelepce telsiz cop
doktor onlugu stetoskop sirinğa sargi bezi
ogretmen tahtasi tebesir kirmizi kalem
imam cubbesi takke sarik
pilot sapkasi kokpit kabin
sofor koltugu taksimetre
asci sapkasi onluk kepce spatula
ciftci orak harman
balikci agi olta yem
madenci kaski kazma
terzi mankeni metre
kuyumcu vitrini terazi
firin kuregi ekmek rafi
cami halisi seccade
kilise cani vitray
mezar cicegi
hapishane yatagi demir kapi
otel odasi resepsiyon minibar
havaalani bandi xray
istasyon peronu tramvay duragi
metro vagonu turnike akbil
vapur iskelesi sis dudugu
yaya koprusu
pazar poseti file
market arabasi kasa kuyrugu fis
restoran masasi menu
kafe masasi latte
park banki salincak kaydirak tahterevalli
orman yolu patika mantar kozalak
dag zirvesi kamp cadiri uyku tulumu
gol kenari sandal kurek
dere yatagi tas kopru
selale perdesi
ada iskelesi
col kumu vaha deve kervani
volkan lavi
buzul buzdagi penguen
goktasi kuyruklu yildiz tutulma
yagmur damlasi saganak
kar tanesi tipi buzlanma
simsek cakmasi
ruzgar gulu
sel suyu taskin
deprem catlagi enkaz
yangin dumani alev kor
tsunami dalgasi
hortum izi
gokkusagi kemeri
piyano tusu nota sehpasi
tiyatro perdesi
samanlik ahır kümes ağıl
saman balyasi
traktor dingili
sulama hortic
sera naylonu
üzüm bağı bağ budama
zeytin hasadi
pamuk tarlasi
çayır biçme
ot yığını
saman tozu
dere kenari söğüt
kuyu bileziği
çeşme yalağı
su terazisi
yel değirmeni
su değirmeni
köy odası
muhtarlık
kahvehane okey
tavla zari
nargile marpuç
çay ocağı
simit arabası
kestane mangalı
mısır tezgahı
dondurma arabası
lokma tezgahı
kına gecesi kaftanı
sünnet yatağı
mevlüt şekeri
hayır lokması
taziye evi
lokal düğün
sünnet konvoyu
kına tası
kına yakma
gelin hamamı
kina yakma
nikah şekeri
söz tepsisi
isteme kahvesi
kız isteme
baslik parasi
çeyiz sandığı
çeyiz bohçası
drahoma
başlık
çeyiz
bohça
sandık odası
ambar keyfi
kiler kavanozu
turşu kavanozu
reçel kavanozu
yağ tenekesi
un çuvalı
şeker çuvalı
tuz küpü
pekmez küpü
süt güğümü
ayran yayığı
yayık
güğüm
kazan
büyük kazan
hamam tası
kese
lif
nalın
takunya
hamam tası
göbek taşı
kurna
külhan
tellak
kese ustası
sauna tası
jakuzi
duşakabin
musluk
sifon
rezervuar
lavabo
evye
gider
süzgeç
tıpa
hortum
musluk contası
su saati
elektrik saati
doğalgaz saati
sayaç
fatura
icra
haciz
rehin
ipotek
kefil
senet
çek defteri
kefalet
kredi sozlesmesi
banka ceki
havale
eft
nakit
bozuk para
kumbara
kese
cüzdan içi
`.replace(/\s+/g, " ");

function collect() {
  const items = [];
  const seen = new Set();
  function add(symbol, category) {
    const folded = fold(symbol);
    if (folded.length < 3 || seen.has(folded) || SKIP.has(folded) || SKIP_SOLO.has(folded)) return;
    seen.add(folded);
    items.push({ symbol: symbol.replace(/_/g, " "), category, folded });
  }
  for (const [category, block] of Object.entries(GROUPS)) {
    for (const symbol of words(block)) add(symbol, category);
  }
  for (const symbol of words(EXTRA)) add(symbol, "object");
  for (const symbol of words(
    "pusula harita dürbün teleskop mikroskop küre abaküs hesap makinesi kasa defteri yevmiye defteri mühür damga ıslak imza ıslak mühür noter tasdiki vekaletname vasiyetname tapu senedi kira kontratı iş sözleşmesi diploma belgesi karne cüzdanı nüfus cüzdanı ehliyet belgesi pasaport kapağı vize kağıdı bilet copu uçak bileti kartonu tren bileti kartonu otobüs bileti kartonu",
  )) {
    add(symbol, "object");
  }
  for (const symbol of words(
    "yağ tenekesi un çuvalı şeker çuvalı tuz küpü süt güğümü yayık kazan hamam tası kese lif nalin takunya kurna musluk sifon lavabo evye hortum sayaç icra haciz ipotek kefil senet havale nakit bozuk para kumbara pusula harita dürbün teleskop abaküs mühür damga vekaletname vasiyetname kira kontratı nüfus cüzdanı vize kağıdı bilet copu",
  )) {
    add(symbol, "object");
  }
  for (const symbol of [
    "kırmızı araba sürmek",
    "siyah araba sürmek",
    "araba çalınması",
    "araba satın almak",
    "araba satmak",
    "fren tutmaması",
    "kucağında bebek",
    "bebek yıkamak",
    "bebeğin yürümesi",
    "çocuğunu kaybetmek",
    "çocukla konuşmak",
    "çocuğu kurtarmak",
    "askere gitmek",
    "asker olmak",
    "üniforma giymek",
    "elbise yırtılması",
    "elbise satın almak",
    "anahtar kaybetmek",
    "ayna kırmak",
    "balkon düşmek",
    "hastanede yatmak",
    "okula gitmek",
    "iş yerine gitmek",
    "kuzeni görmek",
    "hala teyze",
    "instagram açmak",
    "whatsapp mesajı",
    "bilgisayar bozulması",
    "telefon kırılması",
    "yağmur yağması",
    "kar yağması",
    "yangın çıkması",
    "deprem olması",
  ]) {
    add(symbol, "object");
  }
  return items;
}

function build() {
  const raw = collect();
  const concepts = raw.map((item, index) => {
    const frames = FRAMES[item.category] || FRAMES.object;
    const p1 = frames[index % frames.length](item.symbol);
    const p2 = frames[(index + 1) % frames.length](item.symbol);
    const shortAnswer = `${p1}\n\nSahnenin detayı bu temel titreşimi hareket ettirir; renk, eylem ve yanında duran kişi anlamı kaydırır.`;
    const spiritualMeaning = `${p1}\n\n${p2}\n\nRüyanın özeti, ${item.symbol} nesnesinin kendisinde değil, senin ona nasıl yaklaştığında durur. Korku, ferahlık veya ağırlık sabah göğüste kalan asıl cümledir.`;
    const title = `Rüyada ${titleCase(item.symbol)} Görmek`;
    return {
      id: slugify(item.symbol),
      slug: slugify(item.symbol),
      title,
      h1: `${title} Ne Anlama Gelir?`,
      mainSymbol: item.symbol,
      category: item.category,
      aliases: aliases(item.symbol, item.category),
      modifiers: [],
      shortAnswer,
      spiritualMeaning,
      variants: variants(item.symbol, item.category),
      relatedSymbols: related(item.symbol, item.category, raw),
      seoTitle: `${title} Ne Anlama Gelir? | GoldKozmos`,
      metaDescription: `Rüyada ${item.symbol} görmek ne anlama gelir? Spiritüel ve sembolik yorumu GoldKozmos dilinde oku.`,
      published: true,
      indexable: false,
    };
  });
  const aliasCount = concepts.reduce((sum, item) => sum + item.aliases.length, 0);
  const categories = [...new Set(concepts.map((item) => item.category))];
  return { concepts, aliasCount, categories };
}

const pack = build();
const outDir = join(ROOT, "src/data/ruya-tabirleri/generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "concepts.json"), JSON.stringify(pack.concepts));
writeFileSync(
  join(outDir, "stats.json"),
  JSON.stringify(
    {
      canonical: pack.concepts.length,
      aliases: pack.aliasCount,
      categories: pack.categories,
    },
    null,
  2,
  ),
);
console.log(
  JSON.stringify(
    {
      canonical: pack.concepts.length,
      aliases: pack.aliasCount,
      categories: pack.categories.length,
    },
    null,
    2,
  ),
);

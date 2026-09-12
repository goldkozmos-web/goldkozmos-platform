import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

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
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function hash(str) {
  let h = 2166136261;
  for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

function svgFor(card) {
  const h = hash(card.slug);
  const gold = "#c4a35a";
  const ink = "#221812";
  const cream = "#fff8ec";
  const wash = card.suit === "cups" ? "#f3ead7" : card.suit === "swords" ? "#efe8dc" : card.suit === "wands" ? "#f6edd8" : card.suit === "pentacles" ? "#f1e6d0" : "#f7f0e2";
  const cx = 150 + (h % 40) - 20;
  const cy = 210 + ((h >> 5) % 36) - 18;
  const r = 48 + (h % 18);
  const rot = (h % 28) - 14;
  const emblem =
    card.suit === "cups"
      ? `<path d="M${cx - 28} ${cy - 8}c0-22 18-34 28-34s28 12 28 34c0 18-12 28-28 42-16-14-28-24-28-42z" fill="none" stroke="${gold}" stroke-width="3"/>`
      : card.suit === "swords"
        ? `<path d="M${cx} ${cy - 46} L${cx} ${cy + 38} M${cx - 18} ${cy - 18} L${cx + 18} ${cy - 18}" fill="none" stroke="${gold}" stroke-width="3"/>`
        : card.suit === "wands"
          ? `<path d="M${cx} ${cy + 40} L${cx - 8} ${cy - 44} L${cx + 10} ${cy - 28} L${cx} ${cy + 40}" fill="none" stroke="${gold}" stroke-width="3"/>`
          : card.suit === "pentacles"
            ? `<circle cx="${cx}" cy="${cy}" r="${r * 0.42}" fill="none" stroke="${gold}" stroke-width="3"/><path d="M${cx} ${cy - r * 0.32} L${cx + 10} ${cy + r * 0.08} L${cx - 16} ${cy - 8} L${cx + 16} ${cy - 8} L${cx - 10} ${cy + r * 0.08} Z" fill="none" stroke="${gold}" stroke-width="2"/>`
            : `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${gold}" stroke-width="2.5"/><circle cx="${cx}" cy="${cy}" r="${r * 0.45}" fill="none" stroke="${ink}" stroke-width="1.2"/>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 480" role="img" aria-label="${card.name} tarot kartı">
  <rect width="300" height="480" rx="22" fill="${cream}" stroke="${gold}" stroke-width="10"/>
  <rect x="18" y="18" width="264" height="444" rx="14" fill="${wash}" stroke="${gold}" stroke-width="1.5"/>
  <text x="150" y="56" text-anchor="middle" fill="${gold}" font-family="Georgia, serif" font-size="11" letter-spacing="3">${card.rank}</text>
  <g transform="rotate(${rot} ${cx} ${cy})">${emblem}</g>
  <text x="150" y="400" text-anchor="middle" fill="${ink}" font-family="Georgia, serif" font-size="22">${card.name}</text>
  <text x="150" y="428" text-anchor="middle" fill="${gold}" font-family="Georgia, serif" font-size="11" letter-spacing="2">GOLDKOZMOS</text>
</svg>
`;
}

const majors = [
  ["deli", "Deli", "0", "eşik, özgür adım, masumiyet", "henüz adlandırılmamış bir başlangıç", "bilinmeyen yol"],
  ["buyucu", "Büyücü", "I", "irade, yön, tezahür", "eldeki araçlarla şekil vermek", "bilinçli yaratım"],
  ["yuksek-rahibe", "Yüksek Rahibe", "II", "sezgi, giz, iç ses", "söylenmeyen bilgi", "perde arkasındaki hakikat"],
  ["imparatorice", "İmparatoriçe", "III", "bereket, bakım, doğurganlık", "beslenen yaşam", "şefkatli çoğalma"],
  ["imparator", "İmparator", "IV", "yapı, sınır, otorite", "düzen kurmak", "sağlam zemin"],
  ["aziz", "Aziz", "V", "öğreti, ritüel, aidiyet", "gelenekle bağ", "anlamın aktarılması"],
  ["asiklar", "Aşıklar", "VI", "seçim, bağ, kalp", "iki yol arasında duruş", "değerlerle hizalanma"],
  ["savas-arabasi", "Savaş Arabası", "VII", "irade, yön, zafer ritmi", "karşıtları sürmek", "kararlı ilerleyiş"],
  ["guc", "Güç", "VIII", "yumuşak kuvvet, cesaret", "vahşi olanı evcilleştirmeden durmak", "içsel hakimiyet"],
  ["ermis", "Ermiş", "IX", "içe dönüş, rehberlik", "yalnız fakat dolu bir bakış", "kendi ışığını taşımak"],
  ["kader-carki", "Kader Çarkı", "X", "döngü, zaman, dönüş", "çarkın hareketi", "kaçınılmaz ritim"],
  ["adalet", "Adalet", "XI", "denge, hakikat, ölçü", "tartılan söz", "sonucun görünmesi"],
  ["asilan-adam", "Asılan Adam", "XII", "teslim, yeni bakış", "tersine çevrilen perspektif", "bekleyişteki bilgelik"],
  ["olum", "Ölüm", "XIII", "bitiş, yenilenme, eşik", "eski formun dökülmesi", "kaçınılmaz geçiş"],
  ["denge", "Denge", "XIV", "uyum, tempo, karışım", "zıtların bir arada durması", "ölçülü akış"],
  ["seytan", "Şeytan", "XV", "bağ, gölge, arzu", "görünmeyen tasma", "özgürlüğü unutmak"],
  ["kule", "Kule", "XVI", "yıkım, uyanış, çatlak", "sahte yapının inmesi", "ani hakikat"],
  ["yildiz", "Yıldız", "XVII", "umut, şifa, ilham", "geceye düşen ışık", "yenilenen inanç"],
  ["ay", "Ay", "XVIII", "yanılsama, rüya, belirsizlik", "görünenin altındaki dalga", "sezgisel sis"],
  ["gunes", "Güneş", "XIX", "netlik, canlılık, görünürlük", "açılan ışık", "içten gelen ferahlık"],
  ["mahkeme", "Mahkeme", "XX", "çağrı, uyanış, hesap", "duyulan ses", "eskiyi uğurlamak"],
  ["dunya", "Dünya", "XXI", "tamamlanma, bütünlük", "çemberin kapanışı", "yerini bulmak"],
];

const suits = [
  {
    id: "cups",
    tr: "Kupa",
    slug: "kupa",
    element: "su",
    field: "duygu, bağ ve kalp",
    tone: "yumuşak ve akışkan",
  },
  {
    id: "swords",
    tr: "Kılıç",
    slug: "kilic",
    element: "hava",
    field: "zihin, söz ve netlik",
    tone: "keskin ve uyanık",
  },
  {
    id: "wands",
    tr: "Değnek",
    slug: "degnek",
    element: "ateş",
    field: "irade, hareket ve yaratım",
    tone: "sıcak ve yönlü",
  },
  {
    id: "pentacles",
    tr: "Tılsım",
    slug: "tilsim",
    element: "toprak",
    field: "emek, değer ve maddi zemin",
    tone: "ağır ve kalıcı",
  },
];

const ranks = [
  ["asi", "Ası", "As", "tohum ve ilk kıvılcım"],
  ["ikilisi", "İkilisi", "II", "karşılaşma ve bağ"],
  ["uclusu", "Üçlüsü", "III", "çoğalma ve paylaşım"],
  ["dortlusu", "Dörtlüsü", "IV", "durulma ve koruma"],
  ["beslisi", "Beşlisi", "V", "kayıp, gerilim veya sınav"],
  ["altilisi", "Altılısı", "VI", "geçiş ve yardım"],
  ["yedilisi", "Yedilisi", "VII", "seçim ve bekleme"],
  ["sekizlisi", "Sekizlisi", "VIII", "hareket veya sıkışma"],
  ["dokuzlusu", "Dokuzlusu", "IX", "doruk ve yalnız taşıma"],
  ["onlusu", "Onlusu", "X", "döngünün dolması"],
  ["prensi", "Prensi", "Prens", "haber, öğrenme, ilk adım"],
  ["sovalyesi", "Şövalyesi", "Şövalye", "hareket halindeki enerji"],
  ["kralicesi", "Kraliçesi", "Kraliçe", "olgun içsel hakimiyet"],
  ["krali", "Kralı", "Kral", "dışa vuran yetkinlik"],
];

function para(...parts) {
  return parts.filter(Boolean).join(" ");
}

function cardRecord({ slug, name, rank, suit, seeds }) {
  const h1 = `${name} Tarot Kartı Anlamı`;
  return {
    id: slug,
    slug,
    name,
    h1,
    seoTitle: `${name} Tarot Kartı Anlamı | GoldKozmos`,
    metaDescription: `${name} tarot kartı ne anlama gelir? Spiritüel, enerjisel ve sembolik anlamını; aşk, kariyer ve olası yön açısından oku.`,
    suit,
    rank,
    searchAliases: Array.from(new Set([name, fold(name).replaceAll("-", " "), ...seeds.aliases])),
    brief: seeds.brief,
    general: seeds.general,
    spiritual: seeds.spiritual,
    energy: seeds.energy,
    love: seeds.love,
    otherFeelings: seeds.other,
    career: seeds.career,
    future: seeds.future,
    advice: seeds.advice,
    reversed: seeds.reversed,
    symbols: seeds.symbols,
    related: seeds.related,
    topics: seeds.topics,
    blend: seeds.blend,
  };
}

function majorSeeds([slug, name, rank, keywords, motif, path]) {
  const k = keywords;
  return {
    aliases: [name.toLocaleLowerCase("tr-TR"), slug.replaceAll("-", " ")],
    brief: para(
      `${name} kartı ${k} temalarını taşır.`,
      `GoldKozmos yorumunda bu kart, ${motif} üzerinden mevcut enerjiyi görünür kılar.`,
    ),
    general: para(
      `${name} tarot kartı, destedeki Büyük Arkana içinde ${rank} olarak durur ve ${k} dilini konuşur.`,
      `Bu kart geldiğinde yüzeydeki olaydan çok, o olayın taşıdığı eşik okunur.`,
      `${motif.charAt(0).toLocaleUpperCase("tr-TR")}${motif.slice(1)} burada süs değil; bağın, kararın veya günün içindeki asıl kıpırtıdır.`,
      `GoldKozmos yaklaşımında ${name} kehanet üretmez. Mevcut dinamikleri, görünmeyen bağı ve ${path} temasını gösterir.`,
      `Kartın mesajı çoğu zaman “ne olacak?” değil, “hangi enerji şu anda sahneye çıktı?” sorusuna aittir.`,
      `Bu yüzden yorum, korku veya müjde diline indirgenmez; ölçü, ritim ve farkındalık diline çekilir.`,
      `${name} ile karşılaşmak, hayatında ${k.split(",")[0]} temasının artık yok sayılamayacağını işaret ediyor olabilir.`,
      `Kartın gücü, sana bir sonuç dayatmasında değil; bakışını o temaya netleştirmesinde durur.`,
    ),
    spiritual: para(
      `Spiritüel olarak ${name}, ${path} sembolüdür.`,
      `İçsel yolculukta bu kart, görünmeyen bir rehberliğin ${motif} biçiminde belirdiğini düşündürebilir.`,
      `Sezgi burada yüksek sesle bağırmaz; kartın atmosferi, hangi alanda uyanman gerektiğini fısıldar.`,
      `${name} geldiğinde ruhsal çalışma, dışarıdaki bir mucizeyi zorlamak değil; içerideki hizayı fark etmektir.`,
      `GoldKozmos dilinde spiritüel anlam, dinî bir hüküm değil; yaşam kuvvetinin nasıl aktığına dair bir okumadır.`,
    ),
    energy: para(
      `${name} kartının enerjisi ${k} titreşiminde yürür.`,
      `Alana girdiğinde tempo değişir: ya hızlanır, ya durulur, ya da yön değiştirir.`,
      `Bu enerji bedende sıkışma, ferahlama veya ani bir netlik olarak da iz bırakabilir.`,
      `Kartın enerjisi “iyi” veya “kötü” diye etiketlenmez; mevcut hâlin yoğunluğunu gösterir.`,
    ),
    love: para(
      `Aşk ve ilişkilerde ${name}, bağın ${k.split(",")[0]} yüzünü açar.`,
      `Karşı tarafla olan ritim, bu kartın atmosferine göre yumuşar, netleşir veya bir eşiğe gelir.`,
      `Kart, evlilik veya geri dönüş garantisi vermez. Bağdaki mevcut enerjiyi ve olası yönü konuşur.`,
      `İlişkide söylenmeyen bir söz, seçilmeyen bir yol veya korunmayan bir sınır bu sahnede görünür olabilir.`,
    ),
    other: para(
      `Karşı tarafın duygularında ${name}, ${motif} üzerinden okunur.`,
      `Bu, kişinin içinden geçen hâlin kart diliyle görünmesidir; kesin niyet ilanı değildir.`,
      `Duygular karışık, net, çekingen veya güçlü olabilir. Kart, o hâlin niteliğini taşır.`,
      `Yaklaşım bazen yaklaşmak, bazen mesafelenmek, bazen de bekleyip görmek yönünde ilerleyebilir.`,
    ),
    career: para(
      `Kariyer ve para açısından ${name}, ${path} temasını iş ve değer alanına taşır.`,
      `Emek, görünürlük, karar ve karşılık bu kartla yeniden tartılabilir.`,
      `Kesin kazanç veya kayıp ilan etmez. Mevcut iş ritminin ve olası gelişimin enerjisini gösterir.`,
    ),
    future: para(
      `Olası gelecek açısından ${name}, “kesin olacak” demez.`,
      `Kart, mevcut dinamikler bu ritimde sürerse hangi yönde ilerleme potansiyeli doğabileceğini gösterir.`,
      `${path} teması güçlenirse, hayatın o alanında yeni bir sahne açılabilir.`,
      `Yön değişirse kartın anlattığı potansiyel de biçim değiştirir.`,
    ),
    advice: para(
      `Tavsiye olarak ${name}, ${k.split(",")[0].trim()} temasını bilinçli taşımanı ister.`,
      `Acele sonuç yerine ritmi oku. Görünmeyeni yok sayma, fakat korkuyla da büyütme.`,
      `Kartın öğüdü çoğu zaman duruş, ölçü ve dürüst bakıştır.`,
    ),
    reversed: para(
      `Ters geldiğinde ${name}, ${k} temasının sıkıştığını, geciktiğini veya çarpık aktığını işaret ediyor olabilir.`,
      `Enerji yok olmaz; yönü dağılır veya fazla yüklenir.`,
      `Ters konum, felaket değil; düzeltme ve fark etme çağrısıdır.`,
    ),
    symbols: para(
      `${name} kartının sembolleri ${k} etrafında toplanır.`,
      `Görseldeki duruş, eşya, ışık ve yön, ${motif} temasını taşır.`,
      `GoldKozmos özgün kart yüzünde bu semboller sade geometri ve gold hatla tutulur; sahne gürültüsü değil, arketipin özü öne çıkar.`,
    ),
    related: [],
    topics: {
      love: `${name} aşk alanında ${k.split(",")[0]} enerjisini taşır; bağın mevcut hâli bu ritimle okunur.`,
      thoughts: `${name}, düşünce ve duygu katmanında ${motif} olarak belirebilir; niyet kesinleşmiş olmak zorunda değildir.`,
      career: `${name} iş ve para sahnesinde ${path} temasını açar; emek ritmi ve değer görünürlüğü konuşur.`,
      general: `${name} genel enerjide ${k} titreşimini sahneye taşır.`,
      development: `${name} bir konunun gelişiminde ${motif} etkisini gösterir; süreç bu eşikten geçiyor olabilir.`,
      decision: `${name} yol ayrımında ${path} seçeneğini görünür kılar; kararın enerjisi bu kartın duruşundadır.`,
    },
    blend: `${name} açılıma ${k.split(",")[0]} damgasını vurur ve yanındaki kartların ritmini bu tondan geçirir.`,
  };
}

function minorSeeds(suit, rank) {
  const name = `${suit.tr} ${rank[1]}`;
  const slug = `${suit.slug}-${rank[0]}`;
  const motif = rank[3];
  return {
    slug,
    name,
    rank: rank[2],
    suit: suit.id,
    seeds: {
      aliases: [name.toLocaleLowerCase("tr-TR"), `${suit.tr.toLocaleLowerCase("tr-TR")} ${rank[2].toLocaleLowerCase("tr-TR")}`],
      brief: para(
        `${name}, Küçük Arkana içinde ${suit.tr} dizisinin ${rank[2]} kartıdır.`,
        `${suit.field} alanında ${motif} temasını taşır.`,
      ),
      general: para(
        `${name} tarot kartı ${suit.element} unsurunun ${suit.tone} ritminde yürür.`,
        `Bu kart, Büyük Arkana’nın arketipinden çok günlük hayatın içinde işleyen bir kıpırtıyı gösterir.`,
        `${suit.field} burada sahnenin zeminidir; ${motif} ise o zemindeki hareket.`,
        `GoldKozmos yorumunda ${name} tek başına kader cümlesi değildir. Mevcut enerjinin, bağın veya emeğin hangi tondan aktığını anlatır.`,
        `Kart geldiğinde sorulacak dürüst soru şudur: ${suit.field} alanında ${motif} şu an nasıl görünüyor?`,
        `Yorum, abartılı müjde veya korku üretmez. Ölçü, tempo ve olası yön üzerinden okunur.`,
        `${name} bazen küçük bir ayrıntı gibi durur; oysa Küçük Arkana’nın gücü tam da gündelik tekrarlarda gizlidir.`,
        `Bu kartın mesajı çoğu zaman büyük bir patlama değil, fark edilirse yön değiştiren bir ritimdir.`,
      ),
      spiritual: para(
        `Spiritüel olarak ${name}, ${suit.element} unsurunun içsel dersini taşır.`,
        `${suit.field} kutsal bir soyutluk değil; ruhun maddede, bağda ve emekte nasıl durduğudur.`,
        `Bu kart, sezginin ${motif} biçiminde pratik hayata indiğini işaret ediyor olabilir.`,
        `GoldKozmos dilinde spiritüel okuma, kartı putlaştırmadan ${suit.tone} bir farkındalık ister.`,
      ),
      energy: para(
        `${name} enerjisi ${suit.tone} akar ve ${motif} ile şekillenir.`,
        `Alana girdiğinde ${suit.field} daha görünür, daha hassas veya daha hareketli hâle gelebilir.`,
        `Bu enerji bastırılırsa sıkışır; fark edilirse yön bulur.`,
      ),
      love: para(
        `Aşkta ${name}, ilişkinin ${suit.field} katmanında ${motif} kıpırtısını gösterir.`,
        `Bağ yumuşayabilir, netleşebilir, yorulabilir veya yeniden beslenebilir.`,
        `Kart, evlilik veya ayrılık garantisi vermez. Mevcut duygusal ritmi ve olası yönü konuşur.`,
      ),
      other: para(
        `Karşı tarafın duygularında ${name}, ${suit.tone} bir ${motif} hâli taşıyor olabilir.`,
        `Bu, içinden geçen duygu ile dışarıya yansıyan yaklaşım arasında bir mesafe de bırakabilir.`,
        `Kesin niyet okunmaz; mevcut duygu iklimi okunur.`,
      ),
      career: para(
        `İş ve para açısından ${name}, ${suit.field} ile emeğin kesişiminde ${motif} anlatır.`,
        `Kazanç, görünürlük veya iş ritmi bu kartla hızlanabilir, durulabilir ya da yeniden düzenlenebilir.`,
        `Kesin maddi sonuç ilan etmez; değerin nasıl aktığına dair bir enerji gösterir.`,
      ),
      future: para(
        `Olası gelişim açısından ${name}, mevcut ritim sürerse ${motif} temasının güçlenebileceğini gösterir.`,
        `Bu bir garanti değildir. Yön, senin duruşun ve alandaki diğer dinamiklerle birlikte biçimlenir.`,
      ),
      advice: para(
        `Tavsiye olarak ${name}, ${suit.field} alanında ${motif} temasını yok saymamayı ister.`,
        `Küçük görünen ritim, bakılırsa yol olur; bakılmazsa tekrar eder.`,
      ),
      reversed: para(
        `Ters geldiğinde ${name}, ${suit.field} içindeki ${motif} akışının tıkandığını veya abartıldığını işaret ediyor olabilir.`,
        `Ters konum felaket değildir; ritmi düzeltme çağrısıdır.`,
      ),
      symbols: para(
        `${name} kartının sembolleri ${suit.tr} dizisinin ${suit.element} unsuru ve ${rank[2]} derecesi etrafında durur.`,
        `GoldKozmos yüzünde sade hat, gold çerçeve ve ${suit.tr.toLocaleLowerCase("tr-TR")} emblemi bu arketipi taşır.`,
      ),
      related: [],
      topics: {
        love: `${name} aşkta ${suit.field} üzerinden ${motif} enerjisini taşır.`,
        thoughts: `${name} düşünce ve duyguda ${suit.tone} bir ${motif} izi bırakabilir.`,
        career: `${name} kariyerde ${suit.field} ve ${motif} kesişimini gösterir.`,
        general: `${name} genel alanda ${suit.element} unsurunun ${motif} ritmini açar.`,
        development: `${name} sürecin içinde ${motif} etkisini güçlendirebilir.`,
        decision: `${name} yol ayrımında ${suit.field} açısından ${motif} seçeneğini görünür kılar.`,
      },
      blend: `${name} yanındaki kartlara ${suit.tr} dizisinin ${suit.tone} ${motif} tonunu katar.`,
    },
  };
}

const majorCards = majors.map((row) =>
  cardRecord({ slug: row[0], name: row[1], rank: row[2], suit: "major", seeds: majorSeeds(row) }),
);
const minorCards = suits.flatMap((suit) => ranks.map((rank) => cardRecord(minorSeeds(suit, rank))));
const all = [...majorCards, ...minorCards];

function relatedFor(card, index) {
  const pool = all.filter((item) => item.slug !== card.slug);
  const same = pool.filter((item) => item.suit === card.suit);
  const picks = [];
  const take = (list) => {
    for (const item of list) {
      if (picks.length >= 3) break;
      if (!picks.includes(item.slug)) picks.push(item.slug);
    }
  };
  take(same.slice(index % Math.max(same.length, 1)));
  take(pool.filter((item) => item.suit === "major"));
  take(pool);
  return picks.slice(0, 3);
}

all.forEach((card, index) => {
  card.related = relatedFor(card, index);
});

const outDir = join(root, "src/data/tarot");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, "deck.ts"),
  `import type { TarotCard } from "./types";\n\nexport const TAROT_DECK: TarotCard[] = ${JSON.stringify(all, null, 2)};\n`,
);

const imgDir = join(root, "public/images/tarot");
mkdirSync(imgDir, { recursive: true });
for (const card of all) {
  writeFileSync(join(imgDir, `${card.slug}.svg`), svgFor(card));
}

console.log(`wrote ${all.length} cards`);

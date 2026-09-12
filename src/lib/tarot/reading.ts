import { TAROT_DECK } from "../../data/tarot/deck";
import { CARD_ESSENCE, type CardEssence, type CardTone } from "../../data/tarot/essence";
import { TAROT_TOPICS, type TarotCard, type TarotTopicId } from "../../data/tarot/types";
import { randomInt } from "node:crypto";

export function topicById(id: string) {
  return TAROT_TOPICS.find((item) => item.id === id) ?? null;
}

export function drawUniqueCards(count = 3): TarotCard[] {
  const pool = [...TAROT_DECK];
  const picked: TarotCard[] = [];
  while (picked.length < count && pool.length > 0) {
    const index = randomInt(pool.length);
    const [card] = pool.splice(index, 1);
    if (card) picked.push(card);
  }
  return picked;
}

function essenceOf(card: TarotCard): CardEssence {
  const found = CARD_ESSENCE[card.id];
  if (found) return found;
  return {
    meaning: `${card.name} bu açılımın sorusuna klasik tarot anlamıyla cevap verir.`,
    mind: "Zihin henüz tek bir cümleye kilitlenmemiş olabilir.",
    heart: "Duygu katmanı kartın kendi dilinden okunmalıdır.",
    move: "Hareket, kartın anlattığı eğilimle şekillenebilir.",
    love: "İlişkide bu kartın klasik anlamı geçerlidir.",
    work: "İş ve değer alanında bu kartın klasik anlamı geçerlidir.",
    tones: [],
  };
}

function joinSentences(...parts: string[]) {
  return parts
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

function finishReading(text: string, extra: string) {
  const trimmed = joinSentences(text);
  if (wordCount(trimmed) >= 80) return trimmed;
  return joinSentences(trimmed, extra);
}

function extraFor(topic: TarotTopicId, index: number) {
  if (topic === "thoughts") {
    return [
      "Bu konum zihni okur. Düşünce, niyet ilanı değildir; kafasından geçebilecek hâli tarif eder.",
      "Bu konum kalbi okur. Duygu, kesin bir bağlanma cümlesi değildir; his katmanının eğilimini tarif eder.",
      "Bu konum davranışı okur. Hareket, yarın mutlaka olacak bir sahne değil; duruşundaki eğilimdir.",
    ][index];
  }
  if (topic === "love") {
    return [
      "Bu konum senin bağdaki yerini okur. Karşı tarafın niyeti değil; senin hâlin konuşur.",
      "Bu konum bağın diğer kutbunu okur. Senin dileğin değil; karşı alanda dolaşan hâldir.",
      "Bu konum olası yönü okur. Kehanet değil; bağ bu hâlle sürerse nereye kayabileceğidir.",
    ][index];
  }
  if (topic === "career") {
    return [
      "Bu konum işin zeminini okur. Kazanç vaadi değil; emeğin şu anki hâlinin tarifidir.",
      "Bu konum eşiği okur. Felaket değil; yok sayılan sürtünmenin görünmesidir.",
      "Bu konum gelişimi okur. Garanti sonuç değil; emek bu hâlle sürerse açılabilecek yöndür.",
    ][index];
  }
  if (topic === "general") {
    return [
      "Bu konum günün damarını okur. Tek bir olay değil; şu an hangi hâlin önde olduğudur.",
      "Bu konum mesajı okur. Emir değil; bakışını indirmen istenen noktadır.",
      "Bu konum olası yönü okur. Kesin gelecek değil; bu hâl sürerse aralanabilecek kapıdır.",
    ][index];
  }
  if (topic === "development") {
    return [
      "Bu konum konunun zeminini okur. Sonuç değil; meselenin şu an durduğu yerdir.",
      "Bu konum süreci etkileyen gücü okur. Mevcut enerjiyi tekrar etmez; takılan veya ilerleyen yeri büyütür.",
      "Bu konum olası sonucu okur. Kader cümlesi değil; zemin ve etki böyle durursa varılabilecek yerdir.",
    ][index];
  }
  return [
    "Bu konum karar eşiğindeki hâlini okur. Seçilmiş yol değil; henüz hamurun yoğrulduğu yerdir.",
    "Bu konum dikkat noktasını okur. İçindeki enerjiyi tekrar etmez; seçimi saptırabilecek eşiği gösterir.",
    "Bu konum açılan yolu okur. Tek doğru cevap değil; uyarı taşınırsa nefes alabilecek kapıdır.",
  ][index];
}

export function cardPositionReading(
  card: TarotCard,
  topic: TarotTopicId,
  index: number,
) {
  return finishReading(readCard(card, topic, index), extraFor(topic, index) ?? "");
}

function readCard(
  card: TarotCard,
  topic: TarotTopicId,
  index: number,
) {
  const e = essenceOf(card);
  const name = card.name;

  if (topic === "thoughts") {
    if (index === 0) {
      return joinSentences(
        `${name} burada onun düşüncelerini gösterir.`,
        e.mind,
        e.meaning,
        "Bu konum kalbin değil, zihnin sahnesidir. Kafasından geçen, dışarıya yansıyan davranışla aynı olmak zorunda değildir. Birini düşünmek, o kişi hakkında tek ve net bir sonuca varmış olmak demek değildir.",
        "Kesinleşmiş bir karar veya niyet ilanı değildir.",
      );
    }
    if (index === 1) {
      return joinSentences(
        `${name} burada onun duygularını gösterir.`,
        e.heart,
        e.meaning,
        "Zihin başka bir kartta duruyor olabilir. Bu konum, kalbin hangi yerden aktığını sorar. Düşünce karışık olsa bile duygu daha açık — ya da tam tersi — duruyor olabilir.",
        "‘Kesin seviyor’ demek değildir; duygu katmanının eğilimini anlatır.",
      );
    }
    return joinSentences(
      `${name} burada yaklaşımını ve olası hareketini gösterir.`,
      e.move,
      e.meaning,
      "İçinden geçenle davranış her zaman örtüşmez. Olumlu bir his bile temkinli, mesafeli veya gecikmiş bir adıma dönüşebilir. Kişi seni önemsiyor olsa da adımı erteleyebilir.",
      "Yarın mutlaka şöyle yapacak demek değildir; hareketindeki eğilimi okur.",
    );
  }

  if (topic === "love") {
    if (index === 0) {
      return joinSentences(
        `${name} senin bu bağdaki mevcut hâlini gösterir.`,
        e.love,
        e.heart,
        e.meaning,
        "Karşı tarafın niyetinden önce senin duruşun, sınırın ve kalbinin yeri konuşur. Bu kart, bağın sende nasıl yaşandığını tarif eder.",
        "Evlilik veya kopuş kehaneti değildir. Senin alanın açık, yorgun, seçici veya tam tersine bağlanmaya hazır olabilir; kart hangi hâlin önde olduğunu söyler.",
      );
    }
    if (index === 1) {
      return joinSentences(
        `${name} bağın veya karşı tarafın alanını gösterir.`,
        e.heart,
        e.love,
        e.meaning,
        "Burada senin dileğin değil, diğer kutupta dolaşan hâl okunur. Karşı tarafın içinden geçen, senin beklediğin cevapla örtüşmek zorunda değildir.",
        "Bu konumdaki kart, senin mevcut enerjini tekrar etmez; bağın öteki yanını tarif eder.",
        "Kesin niyet ilanı değildir.",
      );
    }
    return joinSentences(
        `${name} ilişkinin olası yönünü gösterir.`,
        e.move,
        e.love,
        e.meaning,
        "Bağ bu hâlle sürerse hangi yöne kayabileceğini anlatır. ‘Kesin bitecek’ veya ‘kesin birleşeceksiniz’ cümlesi değildir. Yön, iki kutbun nasıl konuştuğuna bağlıdır.",
    );
  }

  if (topic === "career") {
    if (index === 0) {
      return joinSentences(
        `${name} iş ve para alanındaki mevcut durumu gösterir.`,
        e.work,
        e.meaning,
        "Zemin, emek ve değerin şu an nasıl aktığı burada durur. Zam veya kayıp ilanı değildir. Kart, işin görünür yüzünden çok emeğin gerçek hâlini tarif eder.",
      );
    }
    if (index === 1) {
      return joinSentences(
        `${name} dikkat edilmesi gereken eşiği gösterir.`,
        e.work,
        e.mind,
        e.meaning,
        "Yok sayılan sürtünme çoğu zaman bu konumdadır. Felaket haberi değil; emeğin kör noktasıdır. Burayı okumadan üçüncü karttaki gelişim eksik kalır.",
      );
    }
    return joinSentences(
        `${name} olası gelişimi gösterir.`,
        e.work,
        e.move,
        e.meaning,
        "Bu zemin ve bu eşik böyle durursa emeğin hangi yöne evrilebileceğini anlatır. Garanti sonuç değildir. Yön, ikinci karttaki eşiğin nasıl taşındığıyla değişir.",
    );
  }

  if (topic === "general") {
    if (index === 0) {
      return joinSentences(
        `${name} şu anki enerjini gösterir.`,
        e.meaning,
        e.heart,
        "Tek bir olay değil, günün damarıdır. İyi-kötü etiketinden çok, hâlin niteliğini okur. Bu kart, sahnenin şu an hangi yerden nefes aldığını anlatır.",
        "Şu anki tempo dağılabilir, kilitlenebilir veya yumuşayabilir; kart hangi hâlin önde olduğunu söyler. Mesaj ve yön kartları bu zeminin üzerine oturur.",
      );
    }
    if (index === 1) {
      return joinSentences(
        `${name} sana gelen mesajı gösterir.`,
        e.meaning,
        e.mind,
        "Görmen, duyman veya durman istenen noktadır. Emir değil; sezgisel bir çağrıdır. Kart, bakışını o noktaya indirmeden yolun bulanık kalabileceğini fısıldar.",
        "Bu konumdaki anlam, şu anki enerji kartını tekrar etmez; görmezden gelinen ayrıntıyı büyütür.",
      );
    }
    return joinSentences(
        `${name} olası yönü gösterir.`,
        e.meaning,
        e.move,
        "Bu hâl sürerse hayatın hangi kapıya yaklaşabileceğini anlatır. Kesin gelecek tablosu değildir. Potansiyel, senin duruşun değişirse biçim de değiştirir.",
        "Yön kartı müjde veya tehdit üretmez; mevcut hâlin devamında hangi kapının aralanabileceğini gösterir.",
    );
  }

  if (topic === "development") {
    if (index === 0) {
      return joinSentences(
        `${name} konunun mevcut enerjisini gösterir.`,
        e.meaning,
        e.heart,
        "Henüz sonuç değil, meselenin şu an durduğu zemindir. Konu bu hâlle nefes alıyordur; gelişim ikinci ve üçüncü karta bağlıdır.",
        "Bu kart konuyu özetlemez, şu anki niteliğini gösterir. İyimser veya ağır durması, sonun da öyle olacağı anlamına gelmez.",
      );
    }
    if (index === 1) {
      return joinSentences(
        `${name} süreci etkileyen unsuru gösterir.`,
        e.meaning,
        e.mind,
        "Konuyu hızlandıran, yavaşlatan veya saptıran güç buradadır. Dış bir kişi de olabilir, senin duruşun da. Bu kartı atlamak, gelişimi yanlış okumaktır.",
        "Etki kartı, mevcut enerjiyi tekrar etmez; sürecin neden takıldığını veya neden ilerlediğini gösterir.",
      );
    }
    return joinSentences(
        `${name} olası sonuç ve yönü gösterir.`,
        e.meaning,
        e.move,
        "Süreç bu hâlle akarssa nereye varabileceğini anlatır. Kader cümlesi değildir. İkinci karttaki etki yumuşar veya sertleşirse sonuç da kayar.",
        "Olası yön, dileğin değil; mevcut hâl ile etkinin birlikte ürettiği kapıdır.",
    );
  }

  if (index === 0) {
    return joinSentences(
      `${name} içinde bulunduğun enerjiyi gösterir.`,
      e.meaning,
      e.heart,
      "Seçilmiş yol değil; karar eşiğindeki hâlin kendisidir. Henüz adım atılmamış olsa da, seçimin hamuru burada yoğruluyordur.",
      "Bu konumda kart, hangi ruh hâliyle yol ayrımına geldiğini anlatır. Acele sonuç değil, eşiğin kendisi okunur.",
    );
  }
  if (index === 1) {
    return joinSentences(
      `${name} dikkat etmen gereken noktayı gösterir.`,
      e.meaning,
      e.mind,
      "Kararı bulandıran, korkutan veya saptıran yer burasıdır. Yok sayılırsa seçim sağlıklı oturmaz. Bu kart, aceleyle atlanan eşiği işaret eder.",
      "Dikkat kartı, içinde bulunduğun enerjiyi tekrar etmez; seçimi saptırabilecek noktayı büyütür.",
    );
  }
  return joinSentences(
    `${name} sana açılan yolu gösterir.`,
    e.meaning,
    e.move,
    "Dikkat edilen nokta taşınırsa hangi kapının nefes alabileceğini anlatır. Tek doğru cevabı dayatmaz. Yol, ikinci karttaki uyarı taşınmadan da açılabilir; fakat o zaman sarsıntılı olur.",
  );
}

const WARM: CardTone[] = ["warm", "open", "hope", "joy", "passion"];
const HEAVY: CardTone[] = [
  "hurt",
  "grief",
  "fear",
  "conflict",
  "blocked",
  "stuck",
  "ending",
  "burden",
];
const SCATTER: CardTone[] = ["confusion", "scatter", "illusion", "choice"];
const MOVE: CardTone[] = ["movement", "begin", "growth"];
const HOLD: CardTone[] = ["wait", "delay", "distance", "stuck", "blocked"];

function hasAny(tones: CardTone[], group: CardTone[]) {
  return tones.some((item) => group.includes(item));
}

function describeTones(e: CardEssence) {
  if (hasAny(e.tones, WARM) && !hasAny(e.tones, HEAVY)) return "açık ve olumlu";
  if (hasAny(e.tones, HEAVY) && hasAny(e.tones, WARM)) return "karışık";
  if (hasAny(e.tones, HEAVY)) return "ağır ve temkinli";
  if (hasAny(e.tones, SCATTER)) return "dağınık veya netleşmemiş";
  if (hasAny(e.tones, HOLD)) return "bekleyen veya mesafeli";
  if (hasAny(e.tones, MOVE)) return "harekete dönük";
  return "ölçülü";
}

function relationOf(a: CardEssence, b: CardEssence) {
  const clash =
    (hasAny(a.tones, WARM) && hasAny(b.tones, HEAVY)) ||
    (hasAny(a.tones, HEAVY) && hasAny(b.tones, WARM)) ||
    (hasAny(a.tones, SCATTER) && hasAny(b.tones, WARM)) ||
    (hasAny(a.tones, WARM) && hasAny(b.tones, SCATTER));
  if (clash) return "çelişki";
  const support =
    (hasAny(a.tones, WARM) && hasAny(b.tones, WARM)) ||
    (hasAny(a.tones, HEAVY) && hasAny(b.tones, HEAVY)) ||
    (hasAny(a.tones, SCATTER) && hasAny(b.tones, SCATTER));
  if (support) return "destek";
  return "katman";
}

export function spreadSynthesis(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  if (!one || !two || !three) return "";
  const a = essenceOf(one);
  const b = essenceOf(two);
  const c = essenceOf(three);
  const topicLabel = topicById(topic)?.label ?? "bu konu";
  const ab = relationOf(a, b);
  const bc = relationOf(b, c);
  const aKind = describeTones(a);
  const bKind = describeTones(b);
  const cKind = describeTones(c);

  const together =
    ab === "destek" && bc === "destek"
      ? "Üç kart birbirini büyük ölçüde aynı yönde okuyor. Hikâye dağılmıyor; katman katman aynı temayı büyütüyor."
      : ab === "çelişki" || bc === "çelişki"
        ? `Kartlar tek slogan gibi durmuyor. ${one.name} ile ${two.name} ${ab === "çelişki" ? "birbirini geriyor" : "farklı katmanlarda duruyor"}; ${three.name} bu gerilimi ${bc === "çelişki" ? "davranışta da görünür kılıyor" : "ya taşıyor ya da başka bir yöne çeviriyor"}.`
        : "Kartlar birbirini yok etmiyor. Biri zemin, diğeri iç hâl, üçüncüsü de dışarıya sızan duruş veya yön oluyor.";

  const blockedAction =
    hasAny(b.tones, WARM) &&
    (hasAny(c.tones, HEAVY) || hasAny(c.tones, HOLD) || hasAny(c.tones, SCATTER));

  const scatterThenWarm = hasAny(a.tones, SCATTER) && hasAny(b.tones, WARM);

  const flow = blockedAction
    ? `İkinci kartın açıklığı üçüncü karta otomatik rahat bir hareket olarak geçmiyor. İçerdeki sıcaklık veya olumluluk, ${three.name} yüzünden yavaşlayabilir, korunabilir veya kırgınlıkla mesafelenebilir.`
    : scatterThenWarm
      ? `Birinci kart netleşmemiş veya seçeneklere bölünmüşken ikinci kart daha açık duruyor. Dışarıdan ‘kararsız ama ilgili’ gibi görünebilir.`
      : hasAny(c.tones, MOVE) && !hasAny(c.tones, HOLD)
        ? `Üçüncü kart, ilk iki hâlin dışarıya yansıma potansiyelini taşır. Hareket kapısı aralanmıştır; zamanı yine kişiye kalır.`
        : `Üçüncü kart, ilk ikinin toplamı değil. Onların sahneye nasıl dökülebileceğini gösterir.`;

  const bits: string[] = [];
  if (hasAny(a.tones, SCATTER) || hasAny(b.tones, SCATTER) || hasAny(c.tones, SCATTER)) {
    bits.push("netleşmemiş seçenek");
  }
  if (hasAny(a.tones, WARM) || hasAny(b.tones, WARM) || hasAny(c.tones, WARM)) {
    bits.push("açıklık veya çekim");
  }
  if (hasAny(a.tones, HEAVY) || hasAny(b.tones, HEAVY) || hasAny(c.tones, HEAVY)) {
    bits.push("kırgınlık, korku veya kapanış");
  }
  if (hasAny(a.tones, HOLD) || hasAny(b.tones, HOLD) || hasAny(c.tones, HOLD)) {
    bits.push("bekleme veya mesafe");
  }
  const theme =
    bits.length > 0
      ? `Açılımın ana teması ${bits.slice(0, 3).join(" ile ")}.`
      : `Açılımın ana teması, ${one.name} kartının açtığı hâlin diğer iki kartta nasıl şekillendiğidir.`;

  const potential = hasAny(c.tones, ["ending"])
    ? "Mevcut enerji, eski bir biçimin dökülmesi veya dönüşmesi yönünde ilerleme potansiyeli taşıyor."
    : blockedAction
      ? "Mevcut enerji ilerlemeye tamamen kapalı değil; fakat davranış, içerdeki olumluluktan daha yavaş ve temkinli akabilir."
      : `Mevcut enerji ${cKind} bir yöne doğru ilerleme potansiyeli taşıyor.`;

  if (topic === "thoughts") {
    const mindHeart =
      ab === "çelişki"
        ? `Düşünce ve duygu aynı yerde değil. Zihin (${one.name}) ${aKind} dururken kalp (${two.name}) ${bKind} okunuyor. ‘Ne düşünüyor?’ ile ‘ne hissediyor?’ sorularının cevabı bu yüzden birbirini tutmayabilir.`
        : `Düşünce ve duygu birbirini büyük ölçüde destekliyor. Zihin (${one.name}) ${aKind}, kalp (${two.name}) ${bKind}. İçerideki hikâye tek parça gibi duruyor.`;
    const act = blockedAction
      ? `Kişinin sana karşı duygusu daha açık olsa bile zihinsel karışıklık, geçmiş kırgınlık veya temkin davranışı yavaşlatıyor olabilir. Yaklaşımı (${three.name}) bu yüzden mesafeli, geç veya korumacı görünebilir.`
      : `Yaklaşımı (${three.name}) ${cKind} duruyor. İçerideki düşünce ve duygu dışarıya bu tondan sızabilir.`;

    return [
      `${topicLabel} açılımında kartlar ayrı sloganlar değil, tek bir insanın katmanlarıdır. ${one.name} zihni, ${two.name} kalbi, ${three.name} de dışarıya yansıyan duruşu taşır.`,
      mindHeart,
      act,
      `Üçü birlikte şöyle durur. ${one.name} zihni şu hâlde tutuyor olabilir: ${a.mind} ${two.name} kalbi başka bir yerden konuşuyor olabilir: ${b.heart} ${three.name} ise bu iki hâlin dışarıya nasıl dökülebileceğini gösterir: ${c.move}`,
      together,
      flow,
      `${theme} ${potential} Bu, ‘kesin yazacak’ veya ‘kesin seviyor’ cümlesi değildir. Zihin netleşir veya kalpteki kırılma yumuşarsa üçüncü kartın dili de değişir. Okuma, bu kişinin ne düşünebileceğini, ne hissedebileceğini ve nasıl davranabileceğini daha dürüst görmek içindir.`,
    ].join("\n\n");
  }

  if (topic === "love") {
    return [
      `${topicLabel} açılımında ${one.name} senin bu bağdaki hâlini, ${two.name} karşı tarafı veya bağın diğer kutbunu, ${three.name} de olası yönü taşır.`,
      `Senin duruşun ${aKind}, karşı alandaki hâl ${bKind}, olası yön ${cKind}. ${
        ab === "çelişki"
          ? "İki kutup aynı yerde değil; biri açıkken diğeri ağır veya mesafeli duruyor olabilir."
          : "İki kutup birbirini tamamen yutmuyor; bağ bu iki hâl üzerinden okunur."
      }`,
      together,
      flow,
      `Bağın hikâyesi üç kartın kesişiminde durur. Senin alanın: ${a.love} Karşı kutup: ${b.heart} Olası yön: ${c.move}`,
      `${theme} ${potential} Kesin evlilik, geri dönüş veya kopuş vaadi yoktur. Kartlar bağın şu anki dürüst tablosunu ve bu tablo sürerse nereye kayabileceğini gösterir.`,
    ].join("\n\n");
  }

  if (topic === "career") {
    return [
      `${topicLabel} açılımında ${one.name} mevcut iş zeminini, ${two.name} sürtünmeyi, ${three.name} de emeğin olası gelişimini taşır.`,
      `Zemin ${aKind}, eşik ${bKind}, olası gelişim ${cKind}. ${
        ab === "çelişki"
          ? "İşin görünen yüzü ile asıl sıkışma aynı hikâye değil; ikisini birlikte okumak gerekir."
          : "Mevcut durum ve eşik birbirini besliyor; gelişim kartı bu zeminin devamı gibi duruyor."
      }`,
      together,
      flow,
      `Emeğin hikâyesi üç kartın kesişiminde durur. Zemin: ${a.work} Eşik: ${b.mind} Olası gelişim: ${c.move}`,
      `${theme} ${potential} Zam, kovulma veya zenginleşme kehaneti yoktur. Kartlar değerin nasıl aktığını ve hangi eşiğin yok sayılamayacağını gösterir.`,
    ].join("\n\n");
  }

  const pos0 =
    topic === "decision"
      ? "içinde bulunduğun enerjiyi"
      : topic === "development"
        ? "konunun mevcut hâlini"
        : "şu anki enerjini";
  const pos1 =
    topic === "decision"
      ? "dikkat etmen gereken noktayı"
      : topic === "development"
        ? "süreci etkileyen unsuru"
        : "sana gelen mesajı";
  const pos2 = topic === "decision" ? "sana açılan yolu" : "olası yönü";

  return [
    `${topicLabel} açılımında ${one.name} ${pos0}, ${two.name} ${pos1}, ${three.name} de ${pos2} taşır.`,
    `Birinci kart ${aKind}, ikinci kart ${bKind}, üçüncü kart ${cKind}. ${together}`,
    flow,
    `Üç kartın kesişimi şöyle okunur. Birinci: ${a.meaning} İkinci: ${b.meaning} Üçüncü: ${c.meaning}`,
    `${theme} ${potential} Kesin sonuç dayatmaz. Yön, senin duruşun ve ikinci karttaki eşiğin nasıl taşındığıyla biçim değiştirir.`,
  ].join("\n\n");
}

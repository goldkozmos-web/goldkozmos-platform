import { randomInt } from "node:crypto";

import { TAROT_DECK } from "../../data/tarot/catalog";
import { tonesOf, type CardTone } from "../../data/tarot/essence";
import { TAROT_TOPICS, type TarotCard, type TarotTopicId } from "../../data/tarot/types";

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

function joinSentences(...parts: string[]) {
  return parts
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function field(
  card: TarotCard,
  key:
    | "generalMeaning"
    | "loveMeaning"
    | "feelingsMeaning"
    | "thoughtsMeaning"
    | "actionMeaning"
    | "careerMeaning"
    | "adviceMeaning"
    | "futurePotential",
) {
  return card[key]?.trim() || "";
}

export function cardPositionReading(
  card: TarotCard,
  topic: TarotTopicId,
  index: number,
) {
  if (topic === "thoughts") {
    if (index === 0) {
      return joinSentences(
        field(card, "thoughtsMeaning"),
        "Bu konum kalbi değil, zihni okur. Düşünmek, kararını ilan etmiş olmak demek değildir.",
      );
    }
    if (index === 1) {
      return joinSentences(
        field(card, "feelingsMeaning"),
        "Bu konum zihni değil, duyguyu okur. His, kesin bir ‘seviyor / sevmiyor’ cümlesi değildir.",
      );
    }
    return joinSentences(
      field(card, "actionMeaning"),
      "Bu konum içerideki hâlin dışarıya nasıl dökülebileceğini okur. Yarın mutlaka şöyle davranacak demek değildir.",
    );
  }

  if (topic === "love") {
    if (index === 0) {
      return joinSentences(
        field(card, "loveMeaning"),
        "Burada karşı tarafın niyetinden önce senin bu bağdaki duruşun konuşur. Evlilik veya kopuş kehaneti yoktur.",
      );
    }
    if (index === 1) {
      return joinSentences(
        field(card, "feelingsMeaning"),
        "Bu konum senin dileğini değil, bağın diğer yanında dolaşan hâli okur. Karşı tarafın temposu seninkinden farklı olabilir.",
      );
    }
    return joinSentences(
      field(card, "futurePotential"),
      field(card, "actionMeaning"),
      "Bu, kesin gelecek tablosu değildir. Bağ bu hâlle sürerse hangi yöne kayabileceğini anlatır.",
    );
  }

  if (topic === "career") {
    if (index === 0) {
      return joinSentences(
        field(card, "careerMeaning"),
        "Zam veya kayıp ilanı değildir; emeğin şu an nasıl aktığını tarif eder.",
      );
    }
    if (index === 1) {
      return joinSentences(
        field(card, "adviceMeaning"),
        field(card, "thoughtsMeaning"),
        "Felaket haberi değil; yok sayılan eşiği gösterir.",
      );
    }
    return joinSentences(
      field(card, "futurePotential"),
      field(card, "careerMeaning"),
      "Garanti sonuç değildir. Emek bu hâlle sürerse hangi yöne evrilebileceğini anlatır.",
    );
  }

  if (topic === "general") {
    if (index === 0) {
      return joinSentences(
        field(card, "generalMeaning"),
        field(card, "feelingsMeaning"),
        "Tek bir olay değil; şu an hangi hâlin önde durduğunu anlatır.",
      );
    }
    if (index === 1) {
      return joinSentences(
        field(card, "adviceMeaning"),
        "Emir değil; bakışını indirmen istenen noktadır.",
      );
    }
    return joinSentences(
      field(card, "futurePotential"),
      "Kesin gelecek değil; bu hâl sürerse aralanabilecek kapıdır.",
    );
  }

  if (topic === "development") {
    if (index === 0) {
      return joinSentences(
        field(card, "generalMeaning"),
        "Henüz sonuç değil; konunun şu an durduğu yerdir.",
      );
    }
    if (index === 1) {
      return joinSentences(
        field(card, "adviceMeaning"),
        field(card, "thoughtsMeaning"),
        "Süreci hızlandıran, yavaşlatan veya saptıran güç buradadır.",
      );
    }
    return joinSentences(
      field(card, "futurePotential"),
      "Kader cümlesi değildir. Zemin ve etki böyle durursa varılabilecek yerdir.",
    );
  }

  if (index === 0) {
    return joinSentences(
      field(card, "generalMeaning"),
      field(card, "feelingsMeaning"),
      "Seçilmiş yol değil; karar eşiğindeki hâlin kendisidir.",
    );
  }
  if (index === 1) {
    return joinSentences(
      field(card, "adviceMeaning"),
      field(card, "thoughtsMeaning"),
      "Kararı bulandıran veya saptıran yer burasıdır. Yok sayılırsa seçim sağlıklı oturmaz.",
    );
  }
  return joinSentences(
    field(card, "futurePotential"),
    field(card, "actionMeaning"),
    "Tek doğru cevap dayatmaz; uyarı taşınırsa nefes alabilecek kapıyı gösterir.",
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
const HOLD: CardTone[] = ["wait", "delay", "distance", "stuck", "blocked"];
const MOVE: CardTone[] = ["movement", "begin", "growth"];

function hasAny(id: string, group: CardTone[]) {
  return tonesOf(id).some((item) => group.includes(item));
}

function kind(id: string) {
  const tones = tonesOf(id);
  if (hasAny(id, WARM) && !hasAny(id, HEAVY)) return "açık ve olumlu";
  if (hasAny(id, HEAVY) && hasAny(id, WARM)) return "karışık";
  if (hasAny(id, HEAVY)) return "ağır veya temkinli";
  if (hasAny(id, SCATTER)) return "netleşmemiş veya seçeneklere bölünmüş";
  if (hasAny(id, HOLD)) return "yavaş, bekleyen veya mesafeli";
  if (hasAny(id, MOVE)) return "harekete dönük";
  if (tones.includes("commit") || tones.includes("stable")) return "ciddi ve yapılandırıcı";
  return "ölçülü";
}

function clash(a: string, b: string) {
  return (
    (hasAny(a, WARM) && hasAny(b, HEAVY)) ||
    (hasAny(a, HEAVY) && hasAny(b, WARM)) ||
    (hasAny(a, SCATTER) && hasAny(b, WARM)) ||
    (hasAny(a, WARM) && hasAny(b, SCATTER))
  );
}

export function spreadSynthesis(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  if (!one || !two || !three) return "";

  const a = one.id;
  const b = two.id;
  const c = three.id;
  const topicLabel = topicById(topic)?.label ?? "bu konu";

  const support =
    !clash(a, b) && !clash(b, c)
      ? "Kartlar birbirini yutmuyor; aynı hikâyenin farklı katmanları gibi duruyor."
      : clash(a, b)
        ? "İlk iki kart aynı yerde değil. İçerideki hâl ile yanındaki katman gerilim üretiyor olabilir."
        : "İçerideki hâl ile dışarıya yansıyan duruş bire bir örtüşmeyebilir.";

  const slowBuild =
    (hasAny(a, ["commit", "stable"]) || hasAny(b, ["commit", "stable"])) &&
    (hasAny(c, HOLD) || hasAny(c, ["begin", "wait", "stable"]));

  const blockedAction =
    hasAny(b, WARM) && (hasAny(c, HEAVY) || hasAny(c, HOLD) || hasAny(c, SCATTER));

  const scatterWarm = hasAny(a, SCATTER) && hasAny(b, WARM);

  let relation = "";
  if (blockedAction) {
    relation =
      "Duygu veya ikinci katman daha açık dururken hareket temkinli, kırgın veya yavaş kalabilir. İçerdeki olumluluk, dışarıda otomatik bir adıma dönüşmek zorunda değildir.";
  } else if (scatterWarm) {
    relation =
      "Zihin veya mevcut hâl netleşmeden kalp daha açık duruyor olabilir. Dışarıdan kararsız ama ilgili gibi görünebilir.";
  } else if (slowBuild) {
    relation =
      "Ciddiyet ve emek, hızlı bir tutku patlamasından çok yavaş, dikkatli ve somut adımlarla ilerleme potansiyeli taşıyor. Sözlerden çok davranış ve süreklilik öne çıkar.";
  } else if (hasAny(c, MOVE) && !hasAny(c, HOLD)) {
    relation =
      "Üçüncü kart, içerideki hâlin dışarıya yansıma potansiyelini taşır. Zaman yine kişiye kalır.";
  } else {
    relation =
      "Üçüncü kart, ilk ikinin aritmetik toplamı değil. Onların sahneye nasıl dökülebileceğini gösterir.";
  }

  const themeBits: string[] = [];
  if (hasAny(a, ["commit", "stable"]) || hasAny(b, ["commit", "stable"])) {
    themeBits.push("ciddiyet ve yapılandırma");
  }
  if (hasAny(a, SCATTER) || hasAny(b, SCATTER) || hasAny(c, SCATTER)) {
    themeBits.push("netleşmemiş seçenek");
  }
  if (hasAny(a, WARM) || hasAny(b, WARM) || hasAny(c, WARM)) {
    themeBits.push("açıklık veya çekim");
  }
  if (hasAny(a, HEAVY) || hasAny(b, HEAVY) || hasAny(c, HEAVY)) {
    themeBits.push("kırgınlık veya temkin");
  }
  if (slowBuild) themeBits.push("yavaş ve somut ilerleme");
  const theme =
    themeBits.length > 0
      ? themeBits.slice(0, 3).join(" ile ")
      : "mevcut hâlin nasıl şekillendiği";

  if (topic === "thoughts") {
    const mindHeart = clash(a, b)
      ? `Düşünce ile duygu aynı yerde değil. Zihin ${kind(a)} dururken kalp ${kind(b)} okunuyor. ‘Ne düşünüyor?’ ile ‘ne hissediyor?’ sorularının cevabı bu yüzden birbirini tutmayabilir.`
      : `Düşünce ile duygu birbirini büyük ölçüde destekliyor. Zihin ${kind(a)}, kalp ${kind(b)}.`;
    return [
      `${topicLabel} açılımında mesele tek slogan değil; zihin, kalp ve duruş ayrı katmanlarda duruyor.`,
      mindHeart,
      blockedAction
        ? "Olumlu veya açık bir duygu olsa bile yaklaşım yavaş, mesafeli veya korumacı kalabilir. Kırgınlık, korku veya kararsızlık davranışı tutuyor olabilir."
        : `Yaklaşım ${kind(c)} duruyor. İçerideki hâl dışarıya böyle sızabilir.`,
      support,
      relation,
      `Ana tema ${theme}. Bu, kesin yazacak veya kesin seviyor cümlesi değildir. Zihin netleşir veya kalpteki kırılma yumuşarsa duruş da değişir.`,
    ].join("\n\n");
  }

  if (topic === "love") {
    return [
      `${topicLabel} açılımında ana tema ${theme}. Senin duruşun ${kind(a)}; bağın diğer yanı ${kind(b)}; olası yön ${kind(c)}.`,
      clash(a, b)
        ? "Sizin alanınız aynı yerde değil. Biri ciddiyet veya açıklık ararken diğeri başka bir tempo tutuyor olabilir. Bu, bağın bittiği anlamına gelmez; iki kutbun henüz aynı cümlede olmadığı anlamına gelir."
        : "İki kutup birbirini tamamen yutmuyor. Bağ, ciddiyet, emek veya yakınlığın nasıl paylaşılacağı üzerinden okunuyor olabilir.",
      relation,
      support,
      "Kesin evlilik, geri dönüş veya kopuş vaadi yoktur. Mevcut hâl korunursa bağ daha tanımlı bir zemine kayabilir; bunun zamana ve iki tarafın katkısına ihtiyacı olabilir. Sözlerden çok küçük gerçek hareketler yolu gösterir.",
    ].join("\n\n");
  }

  if (topic === "career") {
    return [
      `${topicLabel} açılımında ana tema ${theme}. Zemin ${kind(a)}, eşik ${kind(b)}, olası gelişim ${kind(c)}.`,
      clash(a, b)
        ? "İşin görünen yüzü ile asıl sürtünme aynı hikâye değil. Eşiği yok saymak gelişimi şişirir."
        : "Mevcut durum ve eşik birbirini besliyor; gelişim bu zeminin devamı gibi duruyor.",
      relation,
      support,
      "Zam, kovulma veya zenginleşme kehaneti yoktur. Kartlar emeğin nasıl aktığını ve hangi eşiğin yok sayılamayacağını gösterir.",
    ].join("\n\n");
  }

  return [
    `${topicLabel} açılımında ana tema ${theme}.`,
    support,
    relation,
    "Kesin sonuç dayatmaz. Yön, duruşun ve ortadan kalkan ya da büyüyen eşiğin nasıl taşındığıyla biçim değiştirir.",
  ].join("\n\n");
}

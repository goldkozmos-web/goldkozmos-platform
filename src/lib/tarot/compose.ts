import { TAROT_TOPICS, type TarotCard, type TarotTopicId } from "../../data/tarot/types";

export function topicById(id: string) {
  return TAROT_TOPICS.find((item) => item.id === id) ?? null;
}

export type PositionRole =
  | "thoughts"
  | "feelings"
  | "action"
  | "current"
  | "other"
  | "obstacle"
  | "advice"
  | "future"
  | "message";

export function positionRole(topic: TarotTopicId, index: number): PositionRole {
  const map: Record<TarotTopicId, PositionRole[]> = {
    thoughts: ["thoughts", "feelings", "action"],
    love: ["current", "other", "future"],
    career: ["current", "obstacle", "future"],
    general: ["current", "message", "future"],
    development: ["current", "obstacle", "future"],
    decision: ["current", "obstacle", "future"],
  };
  return map[topic][index] ?? "current";
}

function fieldFor(card: TarotCard, topic: TarotTopicId, role: PositionRole) {
  if (role === "thoughts") return card.thoughtsMeaning;
  if (role === "feelings") return card.feelingsMeaning;
  if (role === "action") return card.actionMeaning;
  if (role === "other") return card.relationshipMeaning;
  if (role === "obstacle") {
    return wordCount(card.shadowMeaning) >= 20 ? card.shadowMeaning : card.generalMeaning;
  }
  if (role === "advice" || role === "message") return card.adviceMeaning;
  if (role === "future") return card.futurePotential;
  if (topic === "love") return card.loveMeaning;
  if (topic === "career") return card.careerMeaning;
  if (topic === "decision") return card.thoughtsMeaning;
  return card.generalMeaning;
}

export function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

function sentences(text: string, count: number) {
  const parts = text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter(
      (item) =>
        !/enerji haritası|kartın iklimi|iklimi|kartların ritmi|kartın tonu|sahnenin zemini|ikinci bir ritim|damgasını vurur|mevcut dinamiklerin görünümü|şövalyenin coşkusunu|Prens tadar/i.test(
          item,
        ),
    );
  return parts.slice(0, count).join(" ");
}

function clampWords(text: string, min: number, max: number, pad: string) {
  let clean = text.replace(/\s+/g, " ").trim();
  const parts = clean
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item, index, list) => item !== list[index - 1]);
  clean = parts.join(" ");
  const fillers = [
    pad,
    "Asıl mesele kartın adı değil, bu konumda neyi gösterdiğidir.",
    "Sözlük etiketi yetmez; duruş, sürtünme ve olası yön okunur.",
    "Bu cümle kartı tekrar etmez, konumun sorusunu tamamlar.",
  ];
  let guard = 0;
  while (wordCount(clean) < min && guard < fillers.length) {
    clean = `${clean} ${fillers[guard]}`;
    guard += 1;
  }
  const words = clean.split(" ").filter(Boolean);
  if (words.length <= max) return clean;
  const cut = words.slice(0, max).join(" ");
  const last = Math.max(cut.lastIndexOf("."), cut.lastIndexOf("?"));
  if (last > 40) return cut.slice(0, last + 1);
  return `${cut}.`;
}

function opener(card: TarotCard, topic: TarotTopicId, role: PositionRole) {
  const a = card.coreThemes[0] ?? card.name;
  const b = card.coreThemes[1] ?? a;
  const name = card.name;

  if (role === "thoughts") {
    if (card.polar.confusion) {
      return `${name}, kişinin sana dair düşüncelerinin henüz net bir karara oturmadığını gösteriyor. Zihinde ${a} ve ${b} birlikte dönüyor olabilir.`;
    }
    if (card.polar.secrecy) {
      return `${name}, kişinin seni düşündüğünü fakat her şeyi açık etmediğini gösteriyor.`;
    }
    return `${name}, kişinin sana dair düşüncelerinde ${a} temasının öne çıktığını gösteriyor.`;
  }
  if (role === "feelings") {
    if (card.polar.confusion) {
      return `${name}, sana karşı bir his olduğunu fakat bu hissin henüz net adlandırılmadığını gösteriyor.`;
    }
    if (card.polar.warmth) {
      return `${name}, sana karşı duygunun soğuk veya yok olmadığını gösteriyor. His ${a} üzerinden akıyor olabilir.`;
    }
    if (card.polar.wound) {
      return `${name}, sana karşı hislerin yaralı, temkinli veya kırgın bir yerden geçtiğini gösteriyor.`;
    }
    if (card.polar.secrecy) {
      return `${name}, duygunun var olabileceğini fakat açıkça gösterilmediğini söylüyor.`;
    }
    return `${name}, duyguların ${a} ile şekillendiğini gösteriyor.`;
  }
  if (role === "obstacle") {
    return `${name}, ilerlemeyi zorlaştıran şeyin ${a} olduğunu gösteriyor. Fazla düşünmek, kendini sınırlamak veya “ne yapacağım” sıkışması bu kartla görünür olabilir. ${name} mevcut açıklığı yok saymaz; onu zihinde kilitler ve eyleme dökmeyi geciktirir.`;
  }
  if (role === "future") {
    return `${name}, mevcut şartlar korunursa sürecin ${a} yönüne evrilebileceğini gösteriyor. Bu kilitlenmiş bir kader cümlesi değildir. Sıkışma varsa ${name} o durağanlığın sonsuza dek sürmeyeceğini, bir noktada yönün değişebileceğini söyler.`;
  }
  if (role === "action") {
    if (card.polar.pause || card.polar.confusion) {
      return `${name}, kişinin hemen net ve rahat bir adım atmakta zorlanabileceğini gösteriyor. Davranış gecikebilir, dolaylı kalabilir veya korunma ihtiyacıyla şekillenebilir.`;
    }
    if (card.polar.motion) {
      return `${name}, yaklaşımın harekete yakın olduğunu gösteriyor. Kişi ${a} üzerinden daha cesur, hızlı veya görünür bir davranış üretebilir.`;
    }
    return `${name}, yaklaşımın ${a} ile belirleneceğini gösteriyor. Acele bir jestten çok kartın temposuna uygun bir duruş beklenir.`;
  }
  if (role === "advice" || role === "message") {
    return `${name} sana ${a} üzerinden durmanı öneriyor.`;
  }
  if (role === "other") {
    return `${name}, bağın öteki ucunda ${a} duruşunun öne çıktığını gösteriyor. Karşı tarafın hâli senin niyetin değil; onun duruşu, mesafesi veya yaklaşımı bu kartla okunur.`;
  }
  if (topic === "career") {
    return `${name} mevcut durumda ${a} ve sezgisel / pratik hassasiyetin güçlü olduğunu gösteriyor. Bu süreçte soğuk hesaptan çok ${a} yön veriyor olabilir. İş ve değer tarafında kart, rakamı ezberlemekten önce nasıl durduğunu konuşur.`;
  }
  if (topic === "love") {
    return `${name} mevcut durumda bağın ${a} temasından geçtiğini gösteriyor. Bu süreçte mantıktan çok kartın işaret ettiği hâlin yön verdiği bir dönem olabilir.`;
  }
  return `${name} mevcut durumda ${a} ve ${b} hattının güçlü olduğunu gösteriyor. Bu süreçte kartın işaret ettiği yaklaşım yön veriyor olabilir.`;
}

function polarTail(card: TarotCard, role: PositionRole) {
  const name = card.name;
  if (card.polar.confusion && (role === "obstacle" || role === "current" || role === "thoughts")) {
    return `${name} burada net bir yokluk değil, fazla seçenek, fazla düşünce veya kendini sınırlama üretebilir.`;
  }
  if (card.polar.pause) {
    return `Tempo yavaştır: kart acele bir kırılma vaat etmez, durup bakmayı veya sıkışmayı konuşur.`;
  }
  if (card.polar.motion) {
    return `Tempo daha canlıdır: bir giriş, bir davranış veya dürtüsel bir adım kapısı açık kalır. ${name} bekleyişi sonsuza çevirmez; hareket ihtimalini açık tutar.`;
  }
  if (card.polar.warmth) {
    return `Bu, hissin veya açıklığın yokluğu değil; nasıl tutulduğu ve nereye döküldüğü meselesidir.`;
  }
  return `${name} bu konumda ${card.coreThemes.slice(0, 3).join(", ")} üzerinden konuşur.`;
}

export function cardPositionReading(
  card: TarotCard,
  topic: TarotTopicId,
  index: number,
) {
  const role = positionRole(topic, index);
  const raw = fieldFor(card, topic, role);
  let body = sentences(raw, 3);
  if (wordCount(body) < 18) body = sentences(card.feelingsMeaning, 2);
  if (wordCount(body) < 12) body = sentences(card.generalMeaning, 1);
  const text = `${opener(card, topic, role)} ${body} ${polarTail(card, role)}`;
  return clampWords(
    text,
    70,
    120,
    `${card.name} bu konumda ${card.coreThemes.slice(0, 3).join(", ")} üzerinden cevap verir.`,
  );
}

function supports(a: TarotCard, b: TarotCard) {
  if (a.polar.warmth && b.polar.warmth) return true;
  if (a.polar.labor && b.polar.labor) return true;
  if (a.polar.motion && b.polar.motion && !b.polar.wound) return true;
  return false;
}

function conflicts(a: TarotCard, b: TarotCard) {
  if (a.polar.warmth && (b.polar.wound || b.polar.pause || b.polar.confusion)) return true;
  if (a.polar.motion && b.polar.pause) return true;
  if (a.polar.pause && b.polar.motion) return true;
  if (a.polar.confusion && b.polar.motion) return true;
  return false;
}

function domain(cards: TarotCard[]) {
  const counts = { cups: 0, swords: 0, wands: 0, pentacles: 0, major: 0 };
  for (const card of cards) {
    if (card.arcana === "major") counts.major += 1;
    else counts[card.suit] += 1;
  }
  const minor = (
    [
      ["cups", counts.cups, "duygusal"],
      ["swords", counts.swords, "zihinsel"],
      ["wands", counts.wands, "eylem odaklı"],
      ["pentacles", counts.pentacles, "maddi ve emekle ilgili"],
    ] as const
  ).sort((left, right) => right[1] - left[1])[0];
  return { counts, minor };
}

function speedLine(cards: TarotCard[]) {
  const slow = cards.filter((card) => card.polar.pause || card.polar.confusion).length;
  const fast = cards.filter((card) => card.polar.motion && !card.polar.pause).length;
  if (slow >= 2 && fast === 0) {
    return "Süreç yavaş görünüyor: kartlar acele bir kırılmadan çok, durup bakmayı veya sıkışmayı işaret ediyor.";
  }
  if (fast >= 2) {
    return "Süreç hızlanmaya açık: kartlar durağan bir bekleyişten çok hareket, giriş veya dürtü taşıyor.";
  }
  if (slow && fast) {
    return "Tempo karışık: bir yan yavaşlatırken diğer yan hız vaat ediyor. Bu yüzden süreç birden kopabilir veya birden açılabilir.";
  }
  return "Süreç orta tempoda: ne tam durmuş ne de kaçış hızında.";
}

function nowBlock(card: TarotCard, topic: TarotTopicId) {
  const bite = sentences(card.generalMeaning, 1);
  if (topic === "thoughts") {
    return `Şu an zihin tarafında ${card.name} duruyor. ${bite} ${sentences(card.thoughtsMeaning, 1)} Yani mevcut hâl boşluk değil; kişinin seni nasıl kurduğu ve henüz neyi netleştirebildiğidir.`;
  }
  if (topic === "career") {
    const work = sentences(card.careerMeaning, 2) || bite;
    return `Şu an iş ve değer tarafında ${card.name} mevcut durumu tanımlıyor. ${bite} ${work === bite ? "" : work} Mesele yalnızca unvan veya şans değil; bugün nasıl durduğun ve işi kalpten mi hesaptan mı tuttuğundur.`;
  }
  if (topic === "love") {
    return `Şu an bağın hâli ${card.name} ile okunuyor. ${bite} ${sentences(card.loveMeaning, 1)} Bu evlilik veya ayrılık ilanı değil; ilişkinin bugünkü duruşudur.`;
  }
  return `Şu an ${card.name} mevcut durumu tanımlıyor. ${bite}`;
}

function secondBlock(first: TarotCard, second: TarotCard, topic: TarotTopicId) {
  const bite = sentences(second.generalMeaning, 2);
  const extra = sentences(second.thoughtsMeaning, 1);

  if (conflicts(first, second)) {
    return `Ancak ${second.name} bu hâlin önünde bir zorluk açıyor. ${bite} ${extra} Fazla düşünmek, kendini sınırlamak veya “ne yapacağını bilememek” ${first.name} ile görünen açıklığı eyleme dökmeyi geciktirebilir. İkinci kart birinciyi yalanlamaz; onu sıkıştırır.`;
  }
  if (supports(first, second)) {
    return `${second.name} mevcut hâli güçlendiriyor. ${bite} ${extra} İki kart aynı yöne bakıyor: biri diğerini bozmuyor, temayı kalınlaştırıyor.`;
  }
  return `${second.name} mevcut hâle başka bir katman ekliyor. ${bite} ${extra} Bu, birinci kartı iptal etmez; tabloyu karmaşıklaştırır.`;
}

function thirdBlock(first: TarotCard, second: TarotCard, third: TarotCard, topic: TarotTopicId) {
  const bite = sentences(third.generalMeaning, 2);
  const act = sentences(third.actionMeaning, 1);
  const blockedThenFast =
    (first.polar.pause || second.polar.pause || second.polar.confusion) &&
    third.polar.motion;
  const stillSlow = third.polar.pause || third.polar.wound;

  if (blockedThenFast) {
    return `Olası yönde ${third.name} durağanlığın uzun sürmeyebileceğini gösteriyor. ${bite} ${act} Sıkışma kırılırsa süreç daha cesur, hızlı veya dürtüsel bir harekete açılabilir. Bu her şeyin hemen çözüleceği anlamına gelmez; yönün değişebileceği anlamına gelir.`;
  }
  if (stillSlow) {
    return `Olası yönde ${third.name} hız vaat etmiyor. ${bite} ${act} Üçüncü kart ilk iki karttaki yükü silmez; yön yine temkinli, yaralı veya yavaş kalabilir.`;
  }
  if (topic === "thoughts") {
    return `Yaklaşım ve olası harekette ${third.name} duruyor. ${bite} ${act} Düşünce ve duygu ne olursa olsun, dışarıya yansıyan adım bu kartın temposunda şekillenir.`;
  }
  return `Olası yönde ${third.name} süreci başka bir hatta çekebilir. ${bite} ${act} Gelecek kilitlenmiş değildir; ilk iki kartın yükü bu yönün ne kadar rahat geçileceğini belirler.`;
}

function togetherBlock(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  const majors = cards.filter((card) => card.arcana === "major");
  const { minor, counts } = domain(cards);
  const theme = [
    ...new Set([...one.coreThemes.slice(0, 2), ...two.coreThemes.slice(0, 1), ...three.coreThemes.slice(0, 1)]),
  ].join(", ");

  const conflictLine = conflicts(one, two) || conflicts(two, three)
    ? `Kartlar arasında çatışma var: ${one.name} bir kapı açarken ${two.name} o kapının önüne bir eşik koyuyor. ${three.name} ise bu eşiğin ardından yönü değiştiriyor.`
    : supports(one, two)
      ? `Kartlar birbirini destekliyor. ${one.name} ile ${two.name} aynı dili konuşuyor; ${three.name} bu dili yola döküyor veya yumuşatıyor.`
      : `Kartlar birbirini körlemesine alkışlamıyor. Biri diğerinin etkisini yumuşatır, geciktirir veya başka bir kanala çeker.`;

  const majorLine =
    majors.length > 0
      ? `Büyük Arkana kartı (${majors.map((card) => card.name).join(", ")}) açılımın ana mesajını büyütür: mesele küçük bir ayrıntı olmaktan çıkar, duruş ve asıl konu katmanına iner.`
      : `Bu açılımda Büyük Arkana yok. Mesele gündelik tekrarlarda, alışkanlıkta ve pratik seçimde duruyor olabilir; bu, önemsiz olduğu anlamına gelmez.`;

  const suitLine =
    counts.major === 3
      ? "Üç kart da Büyük Arkana; süreç kimlik ve eşik meselesine daha yakındır."
      : minor[1] >= 2
        ? `Baskın dil ${minor[2]}: okuma bu alandan kaçmamalı.`
        : "Tek bir alan baskın değil; duygu, zihin, emek ve eylem iç içe okunmalı.";

  void topic;
  return `Üç kart birlikte bakıldığında baskın tema ${theme} çevresinde toplanıyor. ${conflictLine} ${majorLine} ${suitLine} ${speedLine(cards)}`;
}

function closeBlock(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  const problem = conflicts(one, two)
    ? `Sorun ${one.name} ile görünen hâlin yokluğu değil; ${two.name} ile bu hâlin eyleme, karara veya netliğe dökülememesidir.`
    : supports(one, two)
      ? `Destek ${one.name} ve ${two.name} tarafında: aynı yön tekrarlanır, tema güçlenir. Dikkat edilecek yer ${three.name} ile bu desteğin yola dökülüp dökülmediğidir.`
      : `Destek ve sürtünme yan yana: ${one.name} bugünü, ${two.name} baskıyı, ${three.name} açık kalan yönü taşır.`;

  if (topic === "thoughts") {
    return `Kısaca anlaşılması gereken şudur. Şu an ne oluyor: kişi seni zihninden silmiş görünmez; ${one.name} düşünceyi, ${two.name} duyguyu adlandırır. ${problem} Süreç nereye gidebilir: ${three.name} davranışın temposunu gösterir. Üç kart birlikte, “düşünüyor mu?” sorusundan çok düşünce-duygu-hareketin aynı kapıdan çıkıp çıkmadığına cevap verir.`;
  }
  if (topic === "career") {
    return `Kısaca anlaşılması gereken şudur. Şu an ne oluyor: iş ve değer sahnesi ${one.name} ile duruyor. ${problem} Süreç nereye gidebilir: ${three.name} emeğin açılabileceği yönü gösterir, unvan kehaneti yazmaz. Üç kart birlikte bakıldığında mesele şans değil; duruş, sürtünme ve olası gelişimin nasıl bağlandığıdır.`;
  }
  if (topic === "love") {
    return `Kısaca anlaşılması gereken şudur. Şu an ne oluyor: bağ ${one.name} ile okunur. ${problem} Süreç nereye gidebilir: ${three.name} evrilme ihtimalini gösterir, mühür basmaz. Üç kart birlikte niyet okumaz; duruş, his ve hareketin nasıl kesiştiğini gösterir.`;
  }
  return `Kısaca anlaşılması gereken şudur. Şu an ne oluyor: ${one.name} bugünü adlandırır. ${problem} Süreç nereye gidebilir: ${three.name} açık kalan yönü taşır. Üç kart birlikte tek tek sözlük maddesi değil; aralarındaki ilişkidir.`;
}

export function spreadSynthesis(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  if (!one || !two || !three) return "";

  const text = [
    nowBlock(one, topic),
    secondBlock(one, two, topic),
    thirdBlock(one, two, three, topic),
    togetherBlock(cards, topic),
    closeBlock(cards, topic),
  ].join(" ");

  return clampWords(
    text,
    250,
    450,
    `Üç kart tek tek sözlük maddesi değildir. Asıl okuma duruş, sürtünme ve olası yönün nasıl bağlandığıdır.`,
  );
}

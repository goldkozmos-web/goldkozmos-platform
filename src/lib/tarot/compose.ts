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
  if (role === "obstacle") return card.shadowMeaning;
  if (role === "advice" || role === "message") return card.adviceMeaning;
  if (role === "future") return card.futurePotential;
  if (topic === "love") return card.loveMeaning;
  if (topic === "career") return card.careerMeaning;
  if (topic === "decision") return card.thoughtsMeaning;
  if (topic === "development") return card.spiritualMeaning;
  return card.generalMeaning;
}

function firstAnswer(card: TarotCard, topic: TarotTopicId, role: PositionRole) {
  const a = card.coreThemes[0] ?? card.name;
  const b = card.coreThemes[1] ?? a;
  if (role === "thoughts") {
    if (card.polar.confusion) {
      return `Bu kart, kişinin sana dair düşüncelerinin henüz net bir karara oturmadığını gösteriyor. Zihinde ${a} ve ${b} birlikte dönüyor olabilir.`;
    }
    if (card.polar.secrecy) {
      return `Bu kart, kişinin seni düşündüğünü fakat düşüncelerinin hepsini açık etmediğini gösteriyor. Aklında ${a} var, dışarıya ise seçerek yansıtıyor olabilir.`;
    }
    return `Bu kart, kişinin sana dair düşüncelerinde ${a} temasının öne çıktığını gösteriyor.`;
  }
  if (role === "feelings") {
    if (card.polar.confusion) {
      return `Bu kart, sana karşı bir his olduğunu fakat bu hissin henüz net adlandırılmadığını gösteriyor. Kalp ${a} ve ${b} arasında dağılmış olabilir.`;
    }
    if (card.polar.warmth) {
      return `Bu kart, sana karşı duygunun soğuk veya yok olmadığını gösteriyor. His ${a} üzerinden akıyor olabilir.`;
    }
    if (card.polar.wound) {
      return `Bu kart, sana karşı hislerin yaralı, temkinli veya kırgın bir yerden geçtiğini gösteriyor.`;
    }
    if (card.polar.secrecy) {
      return `Bu kart, duygunun var olabileceğini fakat açıkça gösterilmediğini söylüyor. His ${a} hattında saklı duruyor olabilir.`;
    }
    return `Bu kart, duyguların ${a} ile şekillendiğini gösteriyor.`;
  }
  if (role === "action") {
    if (card.polar.pause || card.polar.confusion) {
      return `Bu kart, kişinin hemen net ve rahat bir adım atmakta zorlanabileceğini gösteriyor. Davranış ${a} yüzünden gecikebilir veya dolaylı kalabilir.`;
    }
    if (card.polar.motion) {
      return `Bu kart, yaklaşımın harekete yakın olduğunu gösteriyor. Kişi ${a} üzerinden bir davranış üretebilir.`;
    }
    return `Bu kart, yaklaşımın ${a} ile belirleneceğini gösteriyor; acele bir jestten çok kartın temposuna uygun bir duruş beklenir.`;
  }
  if (role === "obstacle") {
    return `Bu kart, ilerlemeyi zorlaştıran şeyin ${a} olduğunu gösteriyor.`;
  }
  if (role === "future") {
    return `Bu kart, mevcut şartlar korunursa sürecin ${a} yönüne evrilebileceğini gösteriyor. Bu bir hüküm değil, açık duran bir potansiyel.`;
  }
  if (role === "advice" || role === "message") {
    return `Bu kart sana ${a} üzerinden durmanı öneriyor.`;
  }
  if (role === "other") {
    return `Bu kart, bağın öteki ucunda ${a} duruşunun öne çıktığını gösteriyor.`;
  }
  if (topic === "career") {
    return `Bu kart, iş ve değer alanında asıl meselenin ${a} olduğunu gösteriyor.`;
  }
  if (topic === "love") {
    return `Bu kart, bağın şu an ${a} temasından geçtiğini gösteriyor.`;
  }
  return `Bu kart, mevcut hâlin ${a} ile okunması gerektiğini gösteriyor.`;
}

function questionClose(topic: TarotTopicId, role: PositionRole, card: TarotCard) {
  if (role === "thoughts") {
    return `Kısaca: “Senin hakkında ne düşünüyor?” sorusuna ${card.name} ile bakıldığında zihin boş değil; mesele düşüncenin hangi malzemeyle dolduğu ve henüz karara bağlanıp bağlanmadığıdır.`;
  }
  if (role === "feelings") {
    return `Kısaca: “Sana karşı ne hissediyor?” sorusuna ${card.name} ile bakıldığında yokluk iddiası kurulmaz; his, bu kartın ikliminde adlandırılır.`;
  }
  if (role === "action") {
    return `Kısaca: “Nasıl davranabilir?” sorusuna ${card.name} tempo ve duruş verir. Niyet okunmaz; yaklaşımın pratik hâli okunur.`;
  }
  if (role === "future") {
    return `Kısaca: “Süreç mevcut şartlarla nereye gidebilir?” sorusuna ${card.name} bir yön gösterir, kilitlenmiş bir kader cümlesi yazmaz.`;
  }
  if (role === "obstacle") {
    return `Kısaca: “Neyi zorlaştırıyor?” sorusuna ${card.name} sürtünmenin adını koyar.`;
  }
  if (role === "advice" || role === "message") {
    return `Kısaca: “Bu kart sana ne öneriyor?” sorusuna cevap, ${card.name} dilinde pratik bir duruştur.`;
  }
  if (topic === "love" && role === "other") {
    return `Bu konum karşı tarafın duruşunu okur; senin niyetini değil.`;
  }
  if (topic === "career") {
    return `İş ve para sorusunda ${card.name} soyut bir etiket değil; emeğin, değerin ve tempo’nun somut hâlidir.`;
  }
  if (topic === "love") {
    return `Aşk ve ilişki sorusunda ${card.name} bağın iklimini, emeğini veya mesafe hâlini adlandırır; evlilik ya da ayrılık ilanı değildir.`;
  }
  return `Bu konumda ${card.name} sorunun cevabını kartın kendi malzemesiyle verir.`;
}

function topicLens(card: TarotCard, topic: TarotTopicId, role: PositionRole) {
  if (topic === "love") {
    if (role === "current") return "";
    if (role === "other") return "";
    if (role === "future") return "";
    return card.loveMeaning;
  }
  if (topic === "career") {
    if (role === "current") {
      return card.moneyMeaning !== card.careerMeaning ? card.moneyMeaning : "";
    }
    if (role === "obstacle") {
      return `İş bağlamında bu gölge, emeğin veya kazancın önünü ${card.coreThemes[0]} hattından kesebilir.`;
    }
    return "";
  }
  if (topic === "thoughts") return "";
  if (topic === "decision" && role === "current") {
    return `Yol ayrımında ${card.name} seçimin ham maddesini gösterir; doğru şıkkı dayatmaz.`;
  }
  return "";
}

function uniqueJoin(parts: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of parts) {
    const clean = part.replace(/\s+/g, " ").trim();
    if (!clean || seen.has(clean)) continue;
    seen.add(clean);
    out.push(clean);
  }
  return out.join(" ");
}

function sentenceTrim(text: string, max: number) {
  const words = text.split(" ").filter(Boolean);
  if (words.length <= max) return text;
  const cut = words.slice(0, max).join(" ");
  const last = Math.max(cut.lastIndexOf("."), cut.lastIndexOf("?"));
  if (last > 80) return cut.slice(0, last + 1);
  return `${cut}.`;
}

export function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

export function cardPositionReading(
  card: TarotCard,
  topic: TarotTopicId,
  index: number,
) {
  const role = positionRole(topic, index);
  const opener = firstAnswer(card, topic, role);
  const body = fieldFor(card, topic, role);
  const lens = topicLens(card, topic, role);
  const close = questionClose(topic, role, card);
  let text = uniqueJoin([opener, body, lens, close]);

  while (wordCount(text) < 90) {
    const before = text;
    text = uniqueJoin([
      text,
      `${card.name} bu konumda ${card.coreThemes.join(", ")} hattından okunur.`,
      card.symbols,
    ]);
    if (text === before) break;
  }
  return sentenceTrim(text, 160);
}

function suitLabel(suit: TarotCard["suit"]) {
  if (suit === "cups") return "kupa (duygu ve bağ)";
  if (suit === "swords") return "kılıç (zihin, söz ve keskinlik)";
  if (suit === "wands") return "değnek (irade ve hareket)";
  if (suit === "pentacles") return "tılsım (emek, madde ve süreklilik)";
  return "büyük arkana";
}

function polarOf(card: TarotCard) {
  const tags: string[] = [];
  if (card.polar.warmth) tags.push("sıcak / açık");
  if (card.polar.wound) tags.push("yaralı / temkinli");
  if (card.polar.motion) tags.push("harekete yakın");
  if (card.polar.pause) tags.push("yavaş / durduran");
  if (card.polar.confusion) tags.push("seçeneksiz veya çok seçenekli");
  if (card.polar.labor) tags.push("emek isteyen");
  if (card.polar.secrecy) tags.push("saklı / dolaylı");
  return tags.join(", ") || "nötr tempolu";
}

export function spreadSynthesis(cards: TarotCard[], topic: TarotTopicId) {
  const topicLabel = topicById(topic)?.label ?? "bu konu";
  const [one, two, three] = cards;
  if (!one || !two || !three) return "";

  const majors = cards.filter((card) => card.arcana === "major");
  const suits = cards.filter((card) => card.arcana === "minor");
  const suitCounts = suits.reduce<Record<string, number>>((acc, card) => {
    acc[card.suit] = (acc[card.suit] ?? 0) + 1;
    return acc;
  }, {});
  const dominantSuit = Object.entries(suitCounts).sort((a, b) => b[1] - a[1])[0];

  const sameWarmth = one.polar.warmth === two.polar.warmth;
  const thoughtFeel =
    topic === "thoughts"
      ? one.polar.confusion && two.polar.warmth
        ? `${one.name} zihni dağınık veya çok seçenekli tutarken ${two.name} duyguda daha açık bir iklim gösterir. Düşünce ile duygu aynı hızda değildir: his daha net, kafa daha kalabalık olabilir. Bu, kişinin ikiyüzlü olduğu anlamına gelmez; katmanlar ayrı çalışır.`
        : one.polar.warmth && two.polar.wound
          ? `${one.name} zihinde daha yumuşak veya olumlu bir bakış varken ${two.name} duyguda yarayı, temkini veya kırgınlığı taşır. Kafa “olabilir” der, kalp henüz rahat etmez.`
          : sameWarmth
            ? `${one.name} ile ${two.name} düşünce ve duygu tarafında aynı yöne bakar. Biri diğerini yalanlamaz; iklim paylaşılır. Asıl soru bu iklimin üçüncü karta, yani davranışa, dökülüp dökülmediğidir.`
            : `${one.name} düşüncede bir şey, ${two.name} duyguda başka bir şey anlatır. Çelişki, yokluk değil; zihin ile kalbin tempo farkıdır.`
      : one.polar.warmth && two.polar.wound
        ? `${one.name} alanda bir açıklık veya sıcaklık gösterirken ${two.name} aynı sahneye bir hassasiyet, mesafe veya yük ekler. İlk kart “var”, ikinci kart “ama” der.`
        : `${one.name} (${polarOf(one)}) ile ${two.name} (${polarOf(two)}) yan yana okunduğunda ${one.polar.wound && two.polar.wound ? "birbirini ağırlaştıran" : "birbirini tamamlayan veya gerilim üreten"} bir çift oluşturur.`;

  const act =
    three.polar.pause || three.polar.wound
      ? `Üçüncü konumda ${three.name} durur. Bu kart hızlı bir hamle vaat etmez. Duygu veya düşünce olumlu olsa bile davranış yavaş, temkinli, yaralı veya dolaylı kalabilir. “İstiyor mu?” ile “yapabilir mi?” aynı soru değildir.`
      : three.polar.motion
        ? `Üçüncü konumda ${three.name} durur. Tempo daha canlıdır; bir davranış, bir giriş veya bir yön denemesi üretilebilir. Yine de ilk iki kartın yükü bu adımın ne kadar rahat, ne kadar tutarlı olacağını belirler.`
        : `Üçüncü konumda ${three.name} durur. Ne ani bir kaçış ne de kesin bir hamle vaat eder; yaklaşım, kartın kendi temposunda şekillenir.`;

  const support =
    one.polar.warmth && two.polar.warmth && !three.polar.wound && !three.polar.pause
      ? `${one.name} ve ${two.name} birbirini destekler; ${three.name} de bu desteği davranışa taşıyabilecek bir yerde durur. Tema güçlenir.`
      : (one.polar.warmth || two.polar.warmth) && (three.polar.wound || three.polar.pause || three.polar.confusion)
        ? `Sıcak veya açık kart, hareket kartı tarafından zayıflatılır. Var olan his veya düşünce, davranışta aynı netlikte görünmeyebilir. Ana gerilim yokluk değil, çevirme sorunudur.`
        : one.polar.secrecy || two.polar.secrecy || three.polar.secrecy
          ? `Açılımda giz, saklama veya dolaylı duruş da vardır. Her şey yüzeye çıkmıyor olabilir. Okuma, görünmeyeni otomatik kötü niyet saymadan, şeffaflık sorusunu açık tutar.`
          : `Kartlar birbirini körlemesine alkışlamaz. Biri diğerinin etkisini yumuşatır, geciktirir veya başka bir kanala çeker.`;

  const majorLine =
    majors.length > 0
      ? `Büyük Arkana kartı (${majors.map((card) => card.name).join(", ")}) açılımı günlük bir ayrıntı olmaktan çıkarıp asıl meseleye çeker. Bu kart(lar) temanın ölçeğini değiştirir: mesele “küçük bir kıpırtı” değil, duruş, eşik veya kimlik katmanına daha yakındır.`
      : `Bu açılımda Büyük Arkana yok. Mesele arketipal bir eşiğe değil, gündelik tekrarlara, alışkanlıklara ve küçük Arkana’nın pratik diline daha yakın duruyor olabilir. Bu, önemsiz olduğu anlamına gelmez; değişimin tekrarlardan geçtiği anlamına gelir.`;

  const suitLine = dominantSuit
    ? `Küçük Arkana tarafında ${suitLabel(dominantSuit[0] as TarotCard["suit"])} dili baskın. Okuma bu unsurun alanından kaçmamalı: soru başka bir elemente çekilerek sulandırılmamalı.`
    : majors.length === 3
      ? `Üç kart da Büyük Arkana. Süreç kimlik, eşik ve yön meselesine daha yakındır.`
      : `Suit dağılımı tek bir unsura kilitlenmez; okuma tek elemente indirgenmemeli.`;

  const conflict =
    (one.polar.warmth && (two.polar.wound || three.polar.wound)) ||
    (two.polar.warmth && three.polar.pause)
      ? `İlişkinin veya sürecin ana çatışması yokluk değil, çevirmedir: var olanı davranışa, karara veya sürekliliğe dökmek zorlaşır.`
      : one.polar.confusion || two.polar.confusion
        ? `Ana çatışma netliktir. Seçenek, hayal veya sis, adımın önünde durur. Kişi umursamaz görünmekle, henüz seçememiş olmak aynı şey değildir.`
        : one.polar.labor || two.polar.labor || three.polar.labor
          ? `Ana çatışma tempo ve emektedir. Kartlar birbirini yalanlamaz, fakat sonuç jestle değil tekrar ve işçilikle gelir.`
          : `Ana çatışma ölçüdedir. Kartlar farklı hızlarda akar; acele bir hüküm, açılımı bozar.`;

  const close =
    topic === "thoughts"
      ? `Özetle: kişi seni zihninden silmiş görünmez. Asıl soru “düşünüyor mu?” değil, düşünce, duygu ve davranışın aynı kapıdan çıkıp çıkmadığıdır. ${one.name} zihni, ${two.name} kalbi, ${three.name} ise elin ve ayakların dilini taşır. Birlikte bakıldığında tablo, tek kartın sözlüğünü üç kez okumak değil; bu üç dilin birbirini destekleyip desteklemediğini görmektir.`
      : topic === "career"
        ? `Özetle: mesele yalnızca şans değil. ${one.name} bugünkü iş duruşunu, ${two.name} sürtünmeyi, ${three.name} ise emeğin açılabileceği yönü gösterir. Kariyer okuması, unvan kehaneti değil; emek, engel ve olası gelişimin birlikte konuşulmasıdır.`
        : topic === "love"
          ? `Özetle: bağın hâli ${one.name} ile okunur, öteki uç ${two.name} ile, olası evrilme ${three.name} ile. Kartlar niyet okumaz; duruş, his ve tempo okur. Üçü birden “evet” veya “hayır” mühürü basmaz; ilişkinin şu anki mekaniğini gösterir.`
          : `Özetle: ${topicLabel} açılımında ${one.name} bugünü, ${two.name} baskıyı veya mesajı, ${three.name} ise açık kalan yönü taşır. Tekrar etmeden bakıldığında asıl ders, kartların çarpışma veya destek noktasındadır.`;

  const weave = `Üç kartın temaları yan yana durur: ${one.name} için ${one.coreThemes.slice(0, 3).join(", ")}; ${two.name} için ${two.coreThemes.slice(0, 3).join(", ")}; ${three.name} için ${three.coreThemes.slice(0, 3).join(", ")}. Bu listeler kopyalanmaz, çarpıştırılır. ${one.name} ${polarOf(one)} bir damar açarken ${three.name} ${polarOf(three)} bir davranış üretir. ${two.name} ikisinin arasında köprü veya set olur.`;

  const notRepeat = `Bu genel okuma, kartların altındaki üç paragrafın özeti değildir. Orada her kart kendi konumunun sorusunu cevaplar. Burada bakılan şey şudur: düşünce ile duygu hizalı mı, duygu olumluysa davranış engelli mi, iki kart birbirini destekliyor mu, biri diğerini zayıflatıyor mu, hareket kartı hızlı mı yavaş mı, baskın unsur hangisi, Büyük Arkana temayı büyütüyor mu, asıl çatışma nedir.`;

  return [
    `${topicLabel} açılımında ${one.name}, ${two.name} ve ${three.name} birlikte durur.`,
    notRepeat,
    thoughtFeel,
    act,
    support,
    majorLine,
    suitLine,
    conflict,
    weave,
    `Olası yön üçüncü kart üzerinden okunur, fakat ${three.name} tek başına geleceği kilitlemez. İlk iki kartın iklimi bu yönün ne kadar rahat, ne kadar yaralı veya ne kadar emek isteyen bir yoldan geçeceğini belirler.`,
    close,
  ].join(" ");
}

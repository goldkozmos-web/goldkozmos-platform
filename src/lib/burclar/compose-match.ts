import { SIGNS } from "../../data/burclar/signs";
import type {
  MatchArticle,
  MatchScores,
  Sign,
  VerbalScore,
} from "../../data/burclar/types";
import { canonicalPair, parsePairSlug } from "./pairs";

const SCALE: VerbalScore[] = [
  "Düşük",
  "Düşük-Orta",
  "Orta",
  "Orta-Yüksek",
  "Yüksek",
];

function clampScore(index: number): VerbalScore {
  return SCALE[Math.max(0, Math.min(SCALE.length - 1, index))];
}

function signIndex(sign: Sign) {
  return SIGNS.findIndex((item) => item.id === sign.id);
}

function aspectDistance(a: Sign, b: Sign) {
  const diff = Math.abs(signIndex(a) - signIndex(b));
  return Math.min(diff, 12 - diff);
}

function elementFit(a: Sign, b: Sign) {
  if (a.element === b.element) return 1;
  const complement =
    (a.element === "ates" && b.element === "hava") ||
    (a.element === "hava" && b.element === "ates") ||
    (a.element === "toprak" && b.element === "su") ||
    (a.element === "su" && b.element === "toprak");
  if (complement) return 1;
  const square =
    (a.element === "ates" && b.element === "su") ||
    (a.element === "su" && b.element === "ates") ||
    (a.element === "toprak" && b.element === "hava") ||
    (a.element === "hava" && b.element === "toprak");
  if (square) return -1;
  return 0;
}

export function scorePair(a: Sign, b: Sign): MatchScores {
  const d = aspectDistance(a, b);
  const el = elementFit(a, b);
  const same = a.id === b.id;
  const attractionBase = [4, 2, 3, 1, 4, 2, 4][d] ?? 2;
  const emotionBase = [3, 2, 3, 1, 4, 1, 2][d] ?? 2;
  const talkBase = [3, 3, 4, 1, 3, 2, 2][d] ?? 2;
  const trustBase = [4, 2, 3, 1, 3, 1, 2][d] ?? 2;
  const longBase = [3, 2, 3, 1, 4, 1, 2][d] ?? 2;
  const sameMod = a.modality === b.modality ? 0 : 0;
  return {
    attraction: clampScore(attractionBase + (same ? -1 : 0) + (el === 1 ? 0 : 0)),
    emotional: clampScore(emotionBase + el + sameMod),
    communication: clampScore(talkBase + (el === -1 ? -1 : 0)),
    trust: clampScore(trustBase + (a.modality === "sabit" && b.modality === "sabit" ? 1 : 0) + el),
    longTerm: clampScore(longBase + (el === 1 ? 1 : el)),
  };
}

function planetClause(a: Sign, b: Sign) {
  const left = a.rulingPlanets[0];
  const right = b.rulingPlanets[0];
  if (left === right) {
    return `${a.name} ile ${b.name} aynı yönetici gezegen damarını (${left}) paylaşır; bu, benzer bir iştahın iki ayrı bedende görünmesi gibi okunabilir. Rahatlık gelir, kör nokta da büyüyebilir: ikisi de aynı kaçışı ‘anlaşıldık’ diye kutsayabilir.`;
  }
  return `Yönetici gezegen sembolizminde ${a.name} tarafında ${left}, ${b.name} tarafında ${right} öne çıkar. Bu iki damar bir ilişkide yan yana gelince tempo, mahremiyet ve karar biçimi aynı dilde konuşmaz; çeviri gerekir. Çeviri yapılmazsa her burç kendi gezegenini ‘doğru aşk’ sanabilir.`;
}

function strengthenList(a: Sign, b: Sign) {
  return [
    `${a.name} tarafının tamir hamlesi — ${a.repairMove} — ${b.name}’nin güven ihtiyacıyla (${b.trustNeed}) bilinçli birleştirilebilir.`,
    `${b.name} tarafının tamir hamlesi — ${b.repairMove} — ${a.name}’nin sürtünme alışkanlığını (${a.frictionHabit}) karşılamadan bırakılmamalıdır.`,
    `Haftada bir, element farkını konuşmak yerine somut bir ritim seçmek işe yarayabilir: ${a.tempo} ile ${b.tempo} aynı günü paylaşmak zorunda değildir, ama aynı masayı paylaşabilir.`,
    `Mahremiyet kuralı netleşsin: ${a.name} ${a.trustNeed}; ${b.name} ${b.trustNeed}. Bu iki cümle yargı değil, evin iskeleti olabilir.`,
  ].join(" ");
}

export function composeMatch(first: Sign, second: Sign): MatchArticle {
  const { a, b, slug } = canonicalPair(first.id, second.id);
  const self = a.id === b.id;
  const scores = scorePair(a, b);
  const names = self ? `${a.name}–${a.name}` : `${a.name} ve ${b.name}`;

  const intro = self
    ? `İki ${a.name} bir araya gelince ilişki, dışarıdan bakınca ‘aynı dili konuşuyorlar’ gibi durabilir. Astrolojik sembolizmde bu, ${a.elementLabel.toLocaleLowerCase("tr-TR")} elementinin ve ${a.modalityLabel.toLocaleLowerCase("tr-TR")} niteliğin aynada çoğalmasıdır. Rahatlık gerçek olabilir; kör nokta da öyle. ${a.relationshipStyle} Bu kez karşındaki de aynı kapıyı kullanır. Sorun ‘anlaşılmamak’ değil, aynı kaçışı kutsamaktır.`
    : `${a.name} ile ${b.name} ilişkisinde ilk bakışta görünen şey, ${a.elementLabel.toLocaleLowerCase("tr-TR")} ile ${b.elementLabel.toLocaleLowerCase("tr-TR")} elementinin aynı odada durmasıdır. Bu iki burcun ilişkisi nasıl olabilir? Çoğu zaman ${a.relationshipStyle.replace(/\.$/, "")}; buna karşılık ${b.name} tarafında bağ ${b.relationshipStyle.charAt(0).toLocaleLowerCase("tr-TR")}${b.relationshipStyle.slice(1)} İkisi de ‘doğru aşk’ı kendi temposunda arar. Tempo farkı kişilik kusuru değil, ${a.modalityLabel.toLocaleLowerCase("tr-TR")} ile ${b.modalityLabel.toLocaleLowerCase("tr-TR")} niteliğin sürtünmesidir.`;

  const attraction = self
    ? `İlk çekim, tanıdık bir ısıdır: ${a.attractionGives} karşısında aynı damarı görmek, ‘nihayet’ hissi verebilir. ${a.attractionSeeks} — bu cümle iki tarafta da çalışır. Aynadaki çekim, erken evde ‘kader’ gibi okunabilir; aslında benzer iştahın manyetikliğidir.`
    : `İlk çekimde ${a.name} çoğu zaman ${a.attractionGives} sunar; ${b.name} ise ${b.attractionGives} ile odaya girer. ${a.name}’nin aradığı şey — ${a.attractionSeeks} — ${b.name}’nin doğal ısısında bazen bulunur, bazen tercüme ister. Ters yönde ${b.name} ${b.attractionSeeks} ararken ${a.name}’nin ${a.passionNote} damarı ya kapı açar ya da erken kaçırır. Çekim, burçların afiş cümlelerinden değil, bu iki iştahın çarpışmasından doğar.`;

  const emotional = self
    ? `Duygusal uyumda ${a.emotionalNeeds} ihtiyacı iki katına çıkar. Aynı ihtiyaç karşılanmazsa ev ‘anlaşıldık’ sanılırken aslında iki kişi de aynı açlığı taşır. ${a.loveStyle}`
    : `Duygusal uyum, ${a.name}’nin ${a.emotionalNeeds} ihtiyacı ile ${b.name}’nin ${b.emotionalNeeds} ihtiyacının aynı anda masada durabilmesidir. ${a.withElement[b.element]} ${b.withElement[a.element]} Bu iki cümle aynı hikâyenin tekrarı değil; suyun ateşi, havanın toprağı ayrı ayrı haşlar. His, afişteki ‘uyumlu / uyumsuz’ etiketinden daha ince işler.`;

  const communication = self
    ? `İletişimde ${a.communicationStyle} Karşındaki de aynı dili kullanınca çevirmen kaybolur: hız da, ima da, sessizlik de ‘normal’ sanılır. Kör nokta, üçüncü bir kulağın yokluğudur.`
    : `İletişim uyumunda ${a.name} tarafı ${a.communicationStyle.charAt(0).toLocaleLowerCase("tr-TR")}${a.communicationStyle.slice(1)} ${b.name} ise ${b.communicationStyle.charAt(0).toLocaleLowerCase("tr-TR")}${b.communicationStyle.slice(1)} ${a.withModality[b.modality]} ${planetClause(a, b)} Çeviri yapılmazsa her burç diğerini ‘konuşmuyor’ veya ‘çok konuşuyor’ sanabilir.`;

  const trust = self
    ? `Güven ve bağlılıkta ${a.trustNeed} iki tarafta da kırmızı çizgidir. Aynı çizgi, ihlal edildiğinde ‘ben de yapıyorum’ diye görünmez olabilir. Sadakat afişi yetmez; küçük tutarsızlık birikir.`
    : `Güven, ${a.name} için ${a.trustNeed}; ${b.name} için ${b.trustNeed}. Bu iki ihtiyaç çelişirse ilişki ‘ihanet’ kelimesine düşmeden önce yorulur. ${a.frictionHabit} — bu alışkanlık ${b.name}’nin güven eşiğinde başka türlü okunur. Ters yönde ${b.frictionHabit}, ${a.name} tarafında kişilik değil, tehdit gibi çalınabilir. Bağlılık nutku değil, bu iki eşiğin korunması işe yarar.`;

  const passion = self
    ? `Tutku ve fiziksel çekim, ${a.passionNote}. Aynı ateş/su/hava/toprak iki bedende çoğalınca yakınlık tanıdık gelir; yenilik ise bilinçli açılmadıkça azalabilir. Cinsel bir el kitabı değil, tempo meselesidir: ${a.tempo}.`
    : `Tutku burada pornografik bir sahne değil, iki temposun çarpışmasıdır. ${a.name} yakınlığı ${a.passionNote}; ${b.name} ise ${b.passionNote}. ${a.tempo} ile ${b.tempo} aynı geceyi paylaşmak zorunda değildir. Çekim yüksek olsa bile, beden ‘şimdi’ derken diğeri ‘henüz’ diyebilir. Bu fark aşağılanma konusu değil, ritim sözleşmesi konusudur.`;

  const friction = self
    ? `Zorlanabilecekleri nokta, ${a.challenges.join(", ")} damarının aynada büyümesidir. ${a.frictionHabit} — karşındaki de aynı kapıyı kullanınca onarım gecikir. Afişteki ‘mükemmel uyum’ cümlesi bu kör noktayı örtmesin.`
    : `Zorlanabilecekleri yer, klişe ‘ateş suyu söndürür’ cümlesinden daha somuttur. ${a.name} tarafında ${a.challenges[0]} öne çıkabilir; ${b.name} tarafında ${b.challenges[0]}. ${a.withModality[b.modality]} Sürtünme, ${a.frictionHabit} ile ${b.frictionHabit} aynı haftaya denk gelince büyür. Bu iki alışkanlık kişilik kusuru gibi yargılanmak yerine, gezegen damarının bakımsız hali gibi okunabilir.`;

  const strengthen = `İlişkiyi güçlendiren şey, burç afişini tekrar etmek değil, tamir kapısını açık tutmaktır. ${strengthenList(a, b)}`;

  const womanAManB = self
    ? `${a.name} kadını ile ${a.name} erkeği aynı burç ismini paylaşır; metinleri aynı değildir. Kadın tarafta bağ çoğu zaman ${a.woman.whenInterested.split(".")[0].toLocaleLowerCase("tr-TR")}. Erkek tarafta duygunun görünürlüğü ${a.man.feelingsShown ? a.man.feelingsShown.split(".")[0].toLocaleLowerCase("tr-TR") : a.man.inLove.split(".")[0].toLocaleLowerCase("tr-TR")}. Ayna rahatlatır, kör nokta büyütür: ikisi de ${a.woman.whenDistant.split(".")[0].toLocaleLowerCase("tr-TR")} eğilimine düşerse ev sessizleşir. Onarım, aynı kaçışı kutsamak yerine birinin ${a.repairMove} demesidir.`
    : `${a.name} kadını ile ${b.name} erkeği yan yana gelince sahne, ${a.name} kadınının ${a.woman.values.split(".")[0].toLocaleLowerCase("tr-TR")} damarı ile ${b.name} erkeğinin ${b.man.whenInterested.split(".")[0].toLocaleLowerCase("tr-TR")} hamlesinin çarpışmasıdır. Kadın tarafta hoşlanma ${a.woman.whenInterested.split(".")[0].toLocaleLowerCase("tr-TR")}; erkek tarafta duygu ${b.man.feelingsShown ? b.man.feelingsShown.split(".")[0].toLocaleLowerCase("tr-TR") : b.man.inLove.split(".")[0].toLocaleLowerCase("tr-TR")}. Mesafe anında ${a.name} kadını ${a.woman.whenDistant.split(".")[0].toLocaleLowerCase("tr-TR")} eğilimi gösterebilir; ${b.name} erkeği ise ${b.man.whenDistant.split(".")[0].toLocaleLowerCase("tr-TR")}. Bu iki çekilme aynı şey değildir. Birleştiren şey, ${a.woman.strengths.split(".")[0].toLocaleLowerCase("tr-TR")} ile ${b.man.strengths.split(".")[0].toLocaleLowerCase("tr-TR")} damarının aynı haftada kullanılması olabilir.`;

  const manAWomanB = self
    ? `${a.name} erkeği ile ${a.name} kadını — sıra değişince hikâye de değişir. Erkek tarafta iş ve günlük hayatta ${a.man.workLife.split(".")[0].toLocaleLowerCase("tr-TR")}. Kadın tarafta zorlayıcı yön ${a.woman.challenges.split(".")[0].toLocaleLowerCase("tr-TR")}. Aynı burç, aynı paragrafın cinsiyet değiştirilmiş hali değildir; eşiğin kim tarafından açıldığı değişir.`
    : `${a.name} erkeği ile ${b.name} kadını başka bir ev kurar. Erkek tarafta hoşlanma ${a.man.whenInterested.split(".")[0].toLocaleLowerCase("tr-TR")}; kadın tarafta ilişki değeri ${b.woman.values.split(".")[0].toLocaleLowerCase("tr-TR")}. ${a.name} erkeği uzaklaşınca ${a.man.whenDistant.split(".")[0].toLocaleLowerCase("tr-TR")}; ${b.name} kadını ise ${b.woman.whenDistant.split(".")[0].toLocaleLowerCase("tr-TR")}. Tutku burada ${a.man.feelingsShown ? a.man.feelingsShown.split(".")[0].toLocaleLowerCase("tr-TR") : a.passionNote} ile ${b.woman.inLove.split(".")[0].toLocaleLowerCase("tr-TR")} arasında salınır. Güçlenen yer, ${a.man.strengths.split(".")[0].toLocaleLowerCase("tr-TR")} damarının ${b.woman.workLife.split(".")[0].toLocaleLowerCase("tr-TR")} ritmiyle çatışmadan masaya gelmesidir.`;

  const longTerm = self
    ? `Uzun vadede iki ${a.name}, ${a.strengths[0]} damarını çoğaltabilir. Aynı gölge — ${a.challenges[0]} — de çoğalır. Kalıcılık, ‘kader eşi’ afişinden çok, kör noktanın üçüncü bir dille konuşulmasına bağlıdır.`
    : `Uzun vadede uyum, ${a.name}’nin ${a.strengths[0]} damarı ile ${b.name}’nin ${b.strengths[0]} damarının aynı evde yaşayıp yaşayamamasıdır. ${a.withElement[b.element]} Zaman içinde ${a.tempo} ile ${b.tempo} ya bir ritim sözleşmesine döner ya da ‘ben değişmem’ gururuna. Kalıcılık, burç puanı değil; tamir kapısının kapanmamasıdır.`;

  const summary = self
    ? `${names} birleşimi, astrolojik sembolizmde ayna gibi çalışabilir: tanıdık ısı, tanıdık kaçış. Editorial olarak çekim ${scores.attraction.toLocaleLowerCase("tr-TR")}, iletişim ${scores.communication.toLocaleLowerCase("tr-TR")} okunabilir. Bu bir laboratuvar ölçümü değil; iki aynı damarın bakıma ihtiyacı olduğunun notudur.`
    : `${names} aşk uyumu, ${a.elementLabel.toLocaleLowerCase("tr-TR")} ile ${b.elementLabel.toLocaleLowerCase("tr-TR")} elementinin ve ${a.rulingPlanets[0]} ile ${b.rulingPlanets[0]} damarının çeviri işidir. Editorial okumada çekim ${scores.attraction.toLocaleLowerCase("tr-TR")}, duygusal uyum ${scores.emotional.toLocaleLowerCase("tr-TR")}, iletişim ${scores.communication.toLocaleLowerCase("tr-TR")}, güven ${scores.trust.toLocaleLowerCase("tr-TR")}, uzun vadeli denge ${scores.longTerm.toLocaleLowerCase("tr-TR")} görünebilir. Bu yüzdeler değil; bakılacak eşiklerin haritasıdır.`;

  const metaDescription = self
    ? `${a.name} burcu kendiyle aşk uyumu: ayna, çekim ve kör nokta. GoldKozmos editorial okuması.`
    : `${a.name} ve ${b.name} aşk uyumu: çekim, iletişim, güven ve uzun vade. ${a.name} kadını + ${b.name} erkeği / ${a.name} erkeği + ${b.name} kadını.`;

  return {
    slug,
    a,
    b,
    h1: self ? `${a.name} ve ${a.name} Aşk Uyumu` : `${a.name} ve ${b.name} Aşk Uyumu`,
    seoTitle: self
      ? `${a.name} Burcu Aşk Uyumu: İlişki ve Ayna | GoldKozmos`
      : `${a.name} ve ${b.name} Aşk Uyumu: İlişki, Çekim ve İletişim | GoldKozmos`,
    metaDescription: metaDescription.slice(0, 158),
    scores,
    intro,
    attraction,
    emotional,
    communication,
    trust,
    passion,
    friction,
    strengthen,
    womanAManB,
    manAWomanB,
    longTerm,
    summary,
  };
}

export function matchBySlug(slug: string) {
  const parsed = parsePairSlug(slug);
  if (!parsed) return null;
  const [x, y] = parsed;
  const pair = canonicalPair(x, y);
  if (pair.slug !== slug) return null;
  return composeMatch(pair.a, pair.b);
}

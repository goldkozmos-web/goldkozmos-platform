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
  let guard = 0;
  while (wordCount(clean) < min && guard < 6) {
    clean = `${clean} ${pad}`;
    guard += 1;
  }
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= max) return clean;
  return `${words.slice(0, max).join(" ")}.`;
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

function openingBeat(card: TarotCard, topic: TarotTopicId) {
  const a = card.coreThemes[0] ?? card.name;
  const b = card.coreThemes[1] ?? a;
  const name = card.name;
  if (topic === "thoughts") {
    if (card.polar.confusion) {
      return `Hikâye onun zihninde başlıyor ve orası henüz kapanmış bir cümle değil. ${name} ile bakıldığında seni düşünüyor olması, ne düşündüğünün net olduğu anlamına gelmiyor; ${a} ile ${b} aynı anda dönüyor olabilir. Kafa senaryo kuruyor, karar bağlamıyor olabilir. Bu, aklından çıktığın anlamına gelmez.`;
    }
    if (card.polar.secrecy) {
      return `Hikâye onun zihninde başlıyor fakat her sahne vitrine çıkmıyor. ${name} ile kişi seni aklında tutuyor, ama gösterdiği kadarını seçerek gösteriyor olabilir.`;
    }
    return `Hikâye onun zihninde ${a} hattından açılıyor. ${name} burada yokluk değil, aklın hangi malzemeyle meşgul olduğunu söylüyor.`;
  }
  if (topic === "decision") {
    return `Yol ayrımındasın ve ilk sahne net bir tabela değil. ${name} ile kararın eşiği ${a} ve ${b} üzerinden görünüyor: acele bir “evet/hayır”dan çok, içinde durduğun hâli okumak gerekiyor. Henüz seçilmeyen yol, henüz korunmayan sınır, henüz netleşmeyen niyet aynı masada duruyor olabilir.`;
  }
  if (card.polar.confusion) {
    return `Hikâyenin başı sisli. ${name} ile şu an görünene körü körüne güvenmek zor; ${a} ile ${b} birbirine karışmış olabilir. Bu, hiçbir şey olmadığı anlamına gelmez. Henüz ayırt edilmemiş olduğu anlamına gelir. İlk adım, sisin içinden acele bir karar koparmak değil, neyin gerçek neyin varsayım olduğunu ayırmaktır.`;
  }
  if (card.polar.warmth && !card.polar.wound) {
    return `Hikâye soğuk açılmıyor. ${name} ile masada bir yakınlık, bir yumuşaklık veya tutulmaya değer bir şey var. Mesele yokluk değil; bu hâlin nasıl taşınacağı.`;
  }
  if (card.polar.wound) {
    return `Hikâye yaradan açılıyor. ${name} ile şu anki sahne kırgın, temkinli veya ağır; yola çıkmadan önce neyin incittiği görünüyor.`;
  }
  if (card.polar.labor) {
    return `Hikâye emekle başlıyor. ${name} ile şu an jest değil, yük, iş veya tekrar var; sahne kendiliğinden açılmıyor.`;
  }
  return `Hikâyenin ilk sahnesi ${name}. Şu an ${a} üzerinden duruyorsun; kart bir etiket değil, içinde bulunduğun hâlin adıdır.`;
}

function turningBeat(first: TarotCard, second: TarotCard, topic: TarotTopicId) {
  const name = second.name;
  const a = second.coreThemes[0] ?? name;
  if (conflicts(first, second)) {
    if (topic === "thoughts") {
      return `Ortada hikâye sıkışır. ${name} birinci sahnenin verdiğini yola dökmez; ${a} yüzünden duygu veya düşünce davranışa çevrilemez. Bu, ilk sahnenin yalan olduğu anlamına gelmez. Çevirmenin zor olduğu anlamına gelir.`;
    }
    return `Sonra sahne ağırlaşır. ${first.name} bir kapı aralamışken ${name} o kapının önüne ${a} koyar: fazla düşünmek, fazla yüklenmek, kendini sınırlamak veya görünene güvenememek. Hikâye burada durur; yok olduğu için değil, ilerleyemediği için. Ortadaki kart düşman ilan etmez; omuzdaki ağırlığı ve “şimdi değil” hissini gösterir.`;
  }
  if (supports(first, second)) {
    return `Ortadaki ${name} ilk sahneyi bozmaz, aynı hikâyeyi kalınlaştırır. ${a} tekrarı, yönün rastgele olmadığını gösterir. Destek vardır; asıl soru bu desteğin üçüncü sahnede yola dökülüp dökülmeyeceğidir.`;
  }
  if (topic === "love" || topic === "thoughts") {
    return `Ortadaki sahne karşı tarafın duruşudur. ${name} ile hikâyenin öteki ucu ${a} üzerinden görünür: senin niyetin değil, onun taşıdığı hâldir. Bu uç, ilk sahneyle aynı cümleyi söylemeyebilir.`;
  }
  return `Ortada ${name} hikâyeye başka bir katman ekler. ${a} birinci sahneyi iptal etmez; onu karmaşıklaştırır.`;
}

function closingBeat(first: TarotCard, second: TarotCard, third: TarotCard, topic: TarotTopicId) {
  const name = third.name;
  const a = third.coreThemes[0] ?? name;
  const blockedThenFast =
    (first.polar.pause || second.polar.pause || second.polar.confusion) &&
    third.polar.motion;
  const seed = third.polar.labor && third.polar.warmth;
  if (blockedThenFast) {
    return `Son sahne durağanlığı sonsuza kilitlemez. ${name} ile hikâye bir noktada hızlanabilir, cesurlaşabilir veya dürtüsel bir adıma açılabilir. Bu sihirli bir çözüm değil; sıkışma kırılırsa yönün değişebileceğidir.`;
  }
  if (seed || (third.suit === "pentacles" && !third.polar.wound)) {
    return `Son sahne daha fazla hayal veya daha fazla yük değil. ${name} ile hikâye yere inebilir: küçük, somut, tutulabilir bir başlangıç. ${a} burada vaat değil, elde tutulursa büyüyen bir tohumdur. Çıkış, her şeyi bir anda çözmek değil; elde bir şey bırakmaktır.`;
  }
  if (third.polar.pause || third.polar.wound) {
    return `Son sahne acele etmez. ${name} ile yön ${a} üzerinden temkinli kalır; ilk iki sahnenin yükü bir anda silinmez. Hikâye kapanmaz, yavaş akar.`;
  }
  if (topic === "thoughts") {
    return `Son sahne yaklaşımıdır. ${name} ile kişi nasıl davranabileceğini ${a} üzerinden gösterir. Düşünce ve duygu ne olursa olsun, dışarıya yansıyan adım bu temponun içinden geçer.`;
  }
  return `Son sahne olası yöndür. ${name} ile hikâye ${a} hattına evrilebilir. Bu mühürlenmiş bir gelecek değil; ilk iki sahnenin nasıl taşındığına bağlı açık bir kapıdır.`;
}

function storyArc(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  const majors = cards.filter((card) => card.arcana === "major");
  const { minor, counts } = domain(cards);
  const thread = [one.coreThemes[0], two.coreThemes[0], three.coreThemes[0]]
    .filter(Boolean)
    .join(" → ");

  const clash = conflicts(one, two)
    ? `Üçlü birlikte bakıldığında mesele ${one.coreThemes[0]} yokluğu değil, onu ${two.coreThemes[0]} yüzünden yola dökememektir.`
    : supports(one, two)
      ? `Üçlü aynı hikâyeyi anlatıyor: ${one.name} ve ${two.name} birbirini tutuyor, ${three.name} bu tutuşu yola çeviriyor veya yumuşatıyor.`
      : `Üçlü tek bir slogan değil. ${one.name}, ${two.name} ve ${three.name} aynı cümleyi paylaşmadan bir hikâye kuruyor.`;

  const scale =
    majors.length > 0
      ? `${majors.map((card) => card.name).join(" ve ")} bu bakımı küçük bir kıpırtı olmaktan çıkarıyor: mesele günlük bir ayrıntı değil, duruş ve seçim katmanında.`
      : `Bu bakımda Büyük Arkana yok. Hikâye gündelik tekrarlarda, alışkanlıkta ve atılan küçük adımda yürüyor.`;

  const grain =
    counts.major === 3
      ? "Sahne kimlik ve eşik."
      : minor[1] >= 2
        ? `Hikâyenin dokusu ${minor[2]}.`
        : "Hikâye tek bir kanala sıkışmıyor.";

  const close =
    topic === "thoughts"
      ? `Anlaşılması gereken şey şu: kişi seni silmiş görünmüyor. Asıl düğüm düşünce, his ve davranışın aynı kapıdan çıkıp çıkmadığı. ${thread}. Soru “düşünüyor mu?” değil, düşündüğü şeyin yola dökülüp dökülmediğidir.`
      : topic === "decision"
        ? `Anlaşılması gereken şey şu: doğru şıkkı kart söylemez. Şu anki hâlin, ortadaki sürtünme ve açılabilecek yön bir hikâye kurar. ${thread}. Karar yine senin; kartlar yalnızca hangi sahnede durduğunu gösterir.`
        : topic === "career"
          ? `Anlaşılması gereken şey şu: şans cümlesi yok. Bugünkü duruş, ortadaki yük veya kilit, sonra gelebilecek somut yön. ${thread}. Emek hikâyesi jestle değil, elde tutulan adımla ilerler.`
          : topic === "love"
            ? `Anlaşılması gereken şey şu: bağın hikâyesi niyet okumaz. Şu anki hâl, öteki uç, olası evrilme. ${thread}. Sevgi varsa bile yük ve sis aynı masada oturabilir.`
            : `Anlaşılması gereken şey şu: şu an ne oluyor, ne zorluyor, nereye evrilebilir. ${thread}. Üç sahne tek tek ezberlenmez; birbirine bağlanır.`;

  return `${clash} ${scale} ${grain} ${speedLine(cards)} ${close}`;
}

export function spreadSynthesis(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  if (!one || !two || !three) return "";
  const text = [
    `Bu bakımda ${one.name}, ${two.name} ve ${three.name} yan yana duruyor.`,
    openingBeat(one, topic),
    turningBeat(one, two, topic),
    closingBeat(one, two, three, topic),
    storyArc(cards, topic),
    `Okuma kartları tek tek tanımlamaz. ${one.name} ile başlayan sahne ${two.name} ile döner, ${three.name} ile yön değiştirir. Senin sorun bu üçlünün kesişiminde durur.`,
  ].join(" ");
  const words = text.replace(/\s+/g, " ").trim().split(/\s+/).filter(Boolean);
  if (words.length <= 450) return words.join(" ");
  return `${words.slice(0, 450).join(" ")}.`;
}

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

const BANNED_LINE =
  /enerji haritası|kartın iklimi|kartların ritmi|kartın tonu|sahnenin zemini|ikinci bir ritim|damgasını vurur|mevcut dinamiklerin görünümü|şövalyenin coşkusunu|Prens tadar|hikâye açılıyor|hikâyenin dokusu|aynı cümle|\bkartların ritmi\b/i;

function sentences(text: string, count: number) {
  const parts = text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => !BANNED_LINE.test(item));
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
    return `${name}, mevcut şartlar korunursa sürecin ${a} yönüne evrilebileceğini gösteriyor. Sıkışma varsa ${name} o durağanlığın sonsuza dek sürmeyeceğini, bir noktada yönün değişebileceğini söyler.`;
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
    return `${name}, karşı tarafın duruşunda ${a} öne çıktığını gösteriyor. Bu senin niyetin değil; onun mesafesi, kontrolü veya yaklaşımı bu kartla okunur.`;
  }
  if (topic === "career") {
    return `${name} mevcut durumda ${a} ve sezgisel / pratik hassasiyetin güçlü olduğunu gösteriyor. Bu süreçte soğuk hesaptan çok ${a} yön veriyor olabilir. İş ve değer tarafında kart, rakamı saymadan önce nasıl durduğunu konuşur.`;
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
    return `Süreç acele bir kırılma vaat etmez; durup bakmayı veya sıkışmayı konuşur.`;
  }
  if (card.polar.motion) {
    return `Daha canlı bir adım kapısı açık kalır. ${name} bekleyişi sonsuza çevirmez; hareket ihtimalini açık tutar.`;
  }
  if (card.polar.warmth) {
    return `Bu, hissin veya açıklığın yokluğu değil; nasıl tutulduğu ve nereye döküldüğü meselesidir.`;
  }
  return `${name} burada ${card.coreThemes.slice(0, 3).join(", ")} üzerinden konuşur.`;
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

function blob(card: TarotCard) {
  return `${card.coreThemes.join(" ")} ${card.brief} ${card.generalMeaning}`.toLocaleLowerCase("tr-TR");
}

function isAnxiousMind(card: TarotCard) {
  return (
    card.suit === "swords" &&
    (card.polar.wound || card.polar.confusion || /kaygı|korku|pişman|felaket|gece/.test(blob(card)))
  );
}

function isControlledMind(card: TarotCard) {
  const text = blob(card);
  if (card.polar.motion || card.polar.wound) return false;
  return (
    (card.suit === "swords" && card.polar.labor && card.polar.pause) ||
    (card.suit === "swords" && card.polar.secrecy && card.polar.pause) ||
    /yargı|strateji|yetke|entelektüel/.test(text)
  );
}

function isClarifying(card: TarotCard) {
  return /denge|hakikat|sonuç|ölçü|sorumluluk|hesap/.test(blob(card));
}

function hasHeart(card: TarotCard) {
  return card.suit === "cups" || card.polar.warmth;
}

function supports(a: TarotCard, b: TarotCard) {
  if (a.polar.warmth && b.polar.warmth) return true;
  if (a.polar.labor && b.polar.labor) return true;
  if (a.polar.motion && b.polar.motion && !b.polar.wound) return true;
  if (a.suit === b.suit && a.suit !== "major") return true;
  return false;
}

function conflicts(a: TarotCard, b: TarotCard) {
  if (a.polar.warmth && (b.polar.wound || b.polar.pause || b.polar.confusion)) return true;
  if (a.polar.wound && b.polar.labor && b.polar.pause) return true;
  if (a.polar.motion && b.polar.pause) return true;
  if (a.polar.pause && b.polar.motion) return true;
  if (a.polar.confusion && b.polar.motion) return true;
  return false;
}

function topicNoun(topic: TarotTopicId) {
  if (topic === "love") return "ilişkinin";
  if (topic === "thoughts") return "kişinin sana dair sürecinin";
  if (topic === "career") return "iş ve para alanının";
  if (topic === "decision") return "karar sürecinin";
  if (topic === "development") return "bu konunun";
  return "mevcut durumun";
}

function axisPhrase(cards: TarotCard[], topic: TarotTopicId) {
  const parts: string[] = [];
  const push = (item: string) => {
    if (!parts.includes(item)) parts.push(item);
  };
  if (topic === "career") {
    if (cards.some((card) => isAnxiousMind(card) || card.suit === "swords" || card.polar.confusion)) {
      push("zihin, sıkışma");
    }
    if (cards.some(hasHeart)) push("insan ilişkileri");
    if (cards.some((card) => card.suit === "wands" || (card.polar.motion && !card.polar.pause))) {
      push("hareket");
    }
    if (cards.some((card) => card.suit === "pentacles" || card.polar.labor)) push("emek ve somut sonuç");
  } else {
    if (cards.some((card) => isAnxiousMind(card) || card.suit === "swords")) {
      push("düşünceler, kaygılar");
    }
    if (cards.some(isClarifying)) push("netleşmesi gereken meseleler");
    else if (cards.some(isControlledMind)) push("kontrol ve mesafe");
    if (cards.some((card) => card.suit === "pentacles" || (card.polar.labor && !isControlledMind(card)))) {
      push("emek");
    }
    if (cards.some((card) => /döngü|değişim|zaman/.test(card.coreThemes.join(" ")))) {
      push("değişim");
    }
    if (cards.some(hasHeart)) push("duygular");
    if (cards.some((card) => card.suit === "wands" || (card.polar.motion && !card.polar.pause))) {
      push("hareket");
    }
  }
  const shown = parts.slice(0, 2);
  if (shown.length === 0) {
    return cards
      .map((card) => card.coreThemes[0])
      .filter(Boolean)
      .slice(0, 3)
      .join(", ");
  }
  if (shown.length === 1) return shown[0];
  return `${shown[0]} ve ${shown[1]}`;
}

function forReading(text: string) {
  const clean = text
    .replace(/Aşk ve ilişki açılımında bu kart,?\s*/g, "")
    .replace(/\bAşkta /g, "")
    .replace(/\bKarşı tarafta kişi /g, "Karşı taraf ")
    .replace(/\bKarşı tarafta /g, "")
    .replace(/\bDüşüncelerde /g, "")
    .replace(/\bDuygularda /g, "")
    .replace(/\bDavranışta /g, "")
    .replace(/\bİşde /g, "İş tarafında ")
    .replace(/\bOlası yönde /g, "")
    .replace(/\bTavsiye olarak /g, "")
    .replace(/\s+/g, " ")
    .trim();
  return clean.replace(/^[a-zçğıöşü]/, (letter) => letter.toLocaleUpperCase("tr-TR"));
}

function meaningBody(card: TarotCard, topic: TarotTopicId, index: number) {
  const role = positionRole(topic, index);
  let body = forReading(sentences(fieldFor(card, topic, role), 3));
  if (wordCount(body) < 6) body = forReading(sentences(card.generalMeaning, 2));
  return body;
}

function currentIssue(card: TarotCard, topic: TarotTopicId) {
  if (topic === "career") {
    if (isAnxiousMind(card)) return "kaygı ve zihinsel sıkışmanın işi yorduğunu";
    if (hasHeart(card)) return "insan tarafının, bakımın veya ilişkilerin işi etkilediğini";
    if (card.polar.labor) return "emeğin, tekrarın veya somut duruşun öne çıktığını";
    if (card.polar.motion) return "girişim ve hız arayışının öne çıktığını";
    if (card.polar.pause) return "bekleyiş veya sıkışmanın öne çıktığını";
    return `${card.coreThemes[0]} temasının öne çıktığını`;
  }
  if (isAnxiousMind(card)) return "ciddi bir zihinsel yük oluşturduğunu";
  if (card.polar.confusion) return "belirsizlik ve dağınık seçenekler ürettiğini";
  if (card.polar.wound) return "kırgın, temkinli veya ağır bir yerden geçtiğini";
  if (hasHeart(card)) return "yakınlık, tutulma veya duygusal bir bağ olduğunu";
  if (card.polar.labor) return "jestten çok emek, tekrar veya yük üzerinden yürüdüğünü";
  if (card.polar.motion) return "hareket, giriş veya görünür bir adım aradığını";
  if (card.polar.secrecy) return "her şeyin açık edilmediğini";
  if (card.polar.pause) return "bekleyiş ve temkinle durduğunu";
  return `${card.coreThemes[0]} temasının öne çıktığını`;
}

function introPara(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  return `Bu açılımda ${one.name}, ${two.name} ve ${three.name} yan yana geldiğinde ${topicNoun(topic)} şu an daha çok ${axisPhrase(cards, topic)} üzerinden ilerlediğini görüyorum.`;
}

function firstPara(card: TarotCard, topic: TarotTopicId) {
  const body = meaningBody(card, topic, 0);
  const name = card.name;
  let extra = "";
  if (topic === "love" || topic === "thoughts") {
    if (isAnxiousMind(card)) {
      extra =
        "Fazla düşünmek, “ne olacak?”, “neden böyle davranıyor?”, “ben mi yanlış anlıyorum?” gibi soruların tekrar tekrar dönmesi mümkün. Burada asıl mesele duygunun olup olmamasından çok, belirsizliğin kişiyi yorması. Kart, olayların kendisinden daha fazla zihinde büyüyen bir kaygı olduğunu da gösterebilir.";
    } else if (card.polar.confusion) {
      extra =
        "Asıl mesele hiçbir şey olmaması değil; henüz ayırt edilmemiş seçeneklerin, varsayımların veya dağınık niyetin yorması.";
    } else if (hasHeart(card) && !card.polar.wound) {
      extra = "Asıl mesele hissin yokluğu değil; bu yakınlığın nasıl taşındığı ve karşı tarafta nasıl cevap bulduğu.";
    } else if (card.polar.labor && !isControlledMind(card)) {
      extra = "Asıl mesele romantik bir jest eksikliği değil; sürecin emek, tekrar veya somut duruş üzerinden yürümesi.";
    } else if (card.polar.wound) {
      extra = "Burada yokluk değil, incinmiş veya temkinli bir yer konuşuluyor. Acele bir “her şey bitti” cümlesi kartın tek okuması değildir.";
    }
  } else if (isAnxiousMind(card) || card.polar.confusion) {
    extra = "Asıl mesele yeteneksizlik değil; zihnin işi veya kararı olduğundan büyük göstermesi.";
  } else if (card.polar.labor) {
    extra = "Asıl mesele şans cümlesi değil; emeğin, tekrarın ve somut duruşun nasıl taşındığı.";
  }

  if (topic === "love") {
    return `${name} mevcut durumda, bu bağın sende ya da ilişkinin genel enerjisinde ${currentIssue(card, topic)} gösteriyor. ${body} ${extra}`.trim();
  }
  if (topic === "thoughts") {
    return `${name} kişinin düşüncelerinde ${currentIssue(card, topic)} gösteriyor. ${body} ${extra}`.trim();
  }
  if (topic === "career") {
    return `${name} mevcut iş ve para durumunda ${currentIssue(card, topic)} gösteriyor. ${body} ${extra}`.trim();
  }
  if (topic === "decision") {
    return `${name} kararın eşiğinde ${currentIssue(card, topic)} gösteriyor. Henüz seçilmeyen yol, henüz korunmayan sınır veya henüz netleşmeyen niyet aynı yerde duruyor olabilir. ${body} ${extra}`.trim();
  }
  return `${name} şu anki durumda ${currentIssue(card, topic)} gösteriyor. ${body} ${extra}`.trim();
}

function secondPara(card: TarotCard, topic: TarotTopicId) {
  const body = meaningBody(card, topic, 1);
  const name = card.name;
  let extra = "";
  if (isControlledMind(card) && (topic === "love" || topic === "thoughts")) {
    extra =
      "Hisleri olsa bile bunları kolayca göstermeyen, önce durumu analiz eden, mesafesini koruyan veya net bir karar vermeden adım atmak istemeyen bir yaklaşım olabilir. Bu kart sıcak ve spontane bir davranıştan çok kontrollü, ölçülü ve bazen soğuk görünen bir tavrı anlatır. Dolayısıyla geri durmak otomatik olarak hiçbir şey hissetmediği anlamına gelmez; fakat şu an davranışları duygudan ziyade akıl yönetiyor gibi görünüyor.";
  } else if (isControlledMind(card)) {
    extra = "Burada sıcak bir jestten çok ölçülü, kontrollü ve bazen soğuk görünen bir duruş var. İlerlemek için duygu kadar kural ve netlik de masada durur.";
  } else if (hasHeart(card) && !card.polar.wound && (topic === "love" || topic === "thoughts")) {
    extra = "Burada soğuk bir yokluk değil, daha açık veya yumuşak bir duruş var. His, ilk karttaki yükü tek başına silmez ama masada durur.";
  } else if (card.polar.wound) {
    extra = "Bu duruş kırgın, temkinli veya yorgun olabilir. İlerlemeyi zorlaştıran şey çoğu zaman niyet yokluğu değil, taşınan ağırlıktır.";
  } else if (card.polar.confusion || card.polar.secrecy) {
    extra = "Görünen ile tutulan aynı olmayabilir; zamanlama veya belirsizlik de büyüyebilir.";
  } else if (card.polar.motion) {
    extra = "Bu uç bekleyişten çok harekete yakındır. Adım, jest veya görünür bir davranış ihtimali açıktır.";
  }

  if (topic === "love") {
    return `${name} karşı tarafın duruşunda geldiğinde, onun şu anda nasıl durduğunu söyler. ${body} ${extra}`.trim();
  }
  if (topic === "thoughts") {
    return `${name} duygularında, düşüncenin arkasındaki hissi gösterir. ${body} ${extra}`.trim();
  }
  if (topic === "career" || topic === "development" || topic === "decision") {
    return `${name} süreçteki engel veya dikkat noktasında, ilerlemeyi neyin zorlaştırdığını veya neye bakman gerektiğini gösterir. ${body} ${extra}`.trim();
  }
  return `${name} sana gelen mesajda, durman gereken yeri gösterir. ${body} ${extra}`.trim();
}

function thirdPara(card: TarotCard, topic: TarotTopicId) {
  const body = meaningBody(card, topic, 2);
  const name = card.name;
  let extra = "";
  if (isClarifying(card)) {
    extra =
      topic === "love" || topic === "thoughts"
        ? "Belirsizliğin sonsuza kadar sürmesinden çok, bir noktada netleşme ihtiyacını gösterir. Konuşulmamış şeylerin konuşulması, sınırların belirlenmesi, durumun ne olduğunun veya ne olmadığının açık biçimde ortaya konması gündeme gelebilir. Bu kart romantik anlamda hızlı bir birleşme kartı değildir; daha çok iki tarafın da gerçeğe bakmasını ve sonuçları davranışlarına göre değerlendirmesini ister."
        : "Belirsizliğin sürüncemede kalmasından çok, bir noktada hesabın, sözün veya kararın netleşmesi gerekir. Sonuçlar davranışlara göre tartılır.";
  } else if (card.polar.motion && !card.polar.pause) {
    extra =
      "Süreç bir noktada hızlanabilir, dönebilir veya görünür bir adıma açılabilir. Durağanlık kırılırsa yön değişebilir.";
  } else if (card.suit === "pentacles" || (card.polar.labor && card.polar.warmth)) {
    extra =
      "Olası yön daha fazla hayal değil, elde tutulursa büyüyen somut bir adımdır. Çıkış her şeyi bir anda çözmek değil; küçük, gerçek bir şey bırakmaktır.";
  } else if (card.polar.pause || card.polar.wound) {
    extra =
      "Yön acele etmez. Mevcut yük bir anda silinmez; temkin, bekleyiş veya yavaş bir değişim daha olasıdır.";
  } else {
    extra = "Bu mühürlenmiş bir gelecek değil; şu anki hâl ve ortadaki duruş nasıl taşınırsa yön de ona göre açılır.";
  }

  if (topic === "thoughts") {
    return `${name} olası yaklaşımında, kişinin dışarıya nasıl yansıyabileceğini gösterir. ${body} ${extra}`;
  }
  if (topic === "career") {
    return `${name} olası gelişimde, iş ve değer tarafının nereye evrilebileceğini gösterir. ${body} ${extra}`;
  }
  return `${name} olası yönde ise sürecin nasıl etkilenebileceğini gösterir. ${body} ${extra}`;
}

function firstClause(card: TarotCard, topic: TarotTopicId) {
  if (topic === "career") {
    if (isAnxiousMind(card) || (card.polar.wound && card.polar.pause)) return "zihinsel sıkışma işi yoruyor";
    if (hasHeart(card) && !card.polar.wound) return "insan tarafı ve bakım önde";
    if (card.polar.labor) return "süreç jestle değil emekle yürüyor";
    if (card.polar.motion) return "hareket ve girişim önde";
    return `${card.coreThemes[0]} mevcut iş hâlini belirliyor`;
  }
  if (isAnxiousMind(card) || (card.polar.wound && card.polar.pause)) return "belirsizlik yoruyor";
  if (card.polar.confusion) return "netleşmemiş seçenekler dağıtıyor";
  if (hasHeart(card) && !card.polar.wound) {
    return topic === "love" ? "bağda bir yakınlık duruyor" : "elde tutulabilir bir his var";
  }
  if (card.polar.labor) return "süreç jestle değil emekle yürüyor";
  if (card.polar.motion) return "hareket isteği önde";
  return `${card.coreThemes[0]} mevcut hâli belirliyor`;
}

function secondClause(card: TarotCard, topic: TarotTopicId) {
  const other = topic === "love" || topic === "thoughts";
  if (topic === "career" || topic === "development" || topic === "decision") {
    if (card.polar.wound || isAnxiousMind(card)) return "ortadaki engel sıkışma veya ağırlık üretiyor";
    if (isControlledMind(card)) return "ortadaki duruş kontrol ve kural üretiyor";
    if (card.polar.motion) return "ortadaki unsur hareket kapısı açıyor";
    return `dikkat noktası ${card.coreThemes[0]}`;
  }
  if (isControlledMind(card)) {
    return other ? "karşı taraf kontrollü davranıyor" : "ortadaki duruş kontrol ve mesafe üretiyor";
  }
  if (hasHeart(card) && !card.polar.wound) {
    return other ? "karşı uçta his daha açık" : "ortadaki kart duygusal bir açıklık taşıyor";
  }
  if (card.polar.wound) {
    return other ? "diğer uç kırgın veya temkinli" : "ortadaki unsur kırgınlık veya ağırlık taşıyor";
  }
  if (card.polar.secrecy) return other ? "diğer uç her şeyi göstermiyor" : "görünen ile tutulan aynı olmayabilir";
  if (card.polar.motion) return other ? "diğer uç harekete daha yakın" : "ortadaki unsur hareket kapısı açıyor";
  return other
    ? `diğer uç ${card.coreThemes[0]} üzerinden duruyor`
    : `dikkat noktası ${card.coreThemes[0]}`;
}

function thirdClause(card: TarotCard) {
  if (isClarifying(card)) {
    return "sürecin ilerleyebilmesi için duygular kadar gerçeklerin de masaya konması gerekiyor";
  }
  if (card.polar.motion && !card.polar.pause) return "yön bir adım veya görünür davranışla açılabilir";
  if (card.polar.labor) return "yön somut, küçük ve tutulabilir bir adımla ilerler";
  if (card.polar.wound) return "yön hemen düzelmez; ağırlık birden silinmez";
  return `olası yön ${card.coreThemes[0]} hattından geçer`;
}

function themePair(card: TarotCard) {
  const first = card.coreThemes[0] ?? card.name;
  const second = card.coreThemes[1];
  return second ? `${first} ve ${second}` : first;
}

function midSlot(topic: TarotTopicId) {
  if (topic === "love") return "karşı tarafın duruşuna";
  if (topic === "thoughts") return "duygularına";
  if (topic === "career" || topic === "development" || topic === "decision") {
    return "ortadaki engel veya dikkat noktasına";
  }
  return "ortadaki mesaja";
}

function nowSlot(topic: TarotTopicId) {
  if (topic === "love") return "mevcut durumda bağın";
  if (topic === "thoughts") return "kişinin düşüncelerinde";
  if (topic === "career") return "işin mevcut hâlinde";
  if (topic === "decision") return "kararın eşiğinde";
  return "şu anki durumda";
}

function thenSlot(topic: TarotTopicId) {
  if (topic === "thoughts") return "olası yaklaşımı";
  if (topic === "career") return "olası gelişimi";
  return "olası yönü";
}

function consequenceLine(one: TarotCard, two: TarotCard, three: TarotCard, topic: TarotTopicId) {
  const clash = conflicts(one, two);
  const aligned = supports(one, two);
  const heart = [one, two, three].some(hasHeart);
  const mindHeavy =
    [one, two, three].filter((card) => card.suit === "swords" || isControlledMind(card) || isAnxiousMind(card))
      .length >= 2;

  if ((topic === "love" || topic === "thoughts") && isAnxiousMind(one) && isControlledMind(two)) {
    return `${one.name} belirsizliği fazlasıyla düşündüğünü, ${two.name} diğer tarafın kendini kontrol altında tuttuğunu, ${three.name} ise bu dengenin ancak açık ve dürüst bir netleşmeyle değişebileceğini anlatıyor.`;
  }
  if ((topic === "love" || topic === "thoughts") && mindHeavy && !heart) {
    return `Açılım duygu yok demiyor; fakat şu anda zihin, kaygı veya mesafe duygudan daha baskın. ${three.name} bu hâlin ancak ${themePair(three)} ile yer değiştirebileceğini söylüyor.`;
  }
  if (one.polar.labor && (two.polar.motion || two.polar.confusion)) {
    return `Emek ve tekrar duruyor, ama süreç kilitli değil; bir döngü, zamanlama veya beklenmedik kıpırtı da masada. ${three.name} bu kıpırtıyı ${themePair(three)} tarafına çekiyor.`;
  }
  if (three.polar.pause && (one.polar.labor || two.polar.motion || two.polar.confusion)) {
    return `Hızlı ve gösterişli bir kırılma güçlü görünmüyor. Yön daha çok sadeleşmek, çekilip bakmak veya kendi içinde netleşmekten geçer.`;
  }
  if (heart && mindHeavy) {
    return `Hem bir his hem de onu zorlaştıran bir zihin veya mesafe duruyor; biri diğerini iptal etmiyor.`;
  }
  if (clash) {
    return `Mevcut hâl ile ortadaki duruş birbirini sıkıştırıyor; süreç kolay akmaz. Olası yön bu sıkışmayı yok saymadan ${themePair(three)} hattından gider.`;
  }
  if (aligned) {
    return `İlk iki işaret aynı yönde tutuyor; ${three.name} bu hattı ${themePair(three)} ile ilerletiyor.`;
  }
  return `${firstClause(one, topic)}, ${secondClause(two, topic)} ve ${thirdClause(three)}.`;
}

function togetherPara(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  const weave = `Üç kartı birlikte okuduğumda ${one.name} ${nowSlot(topic)} ${themePair(one)} üzerinden durduğunu, ${two.name} ${midSlot(topic)} ${themePair(two)} getirdiğini, ${three.name} ise ${thenSlot(topic)} ${themePair(three)} tarafına çektiğini anlatıyor.`;
  return `${weave} ${consequenceLine(one, two, three, topic)}`;
}

function pacePara(cards: TarotCard[], topic: TarotTopicId) {
  const slow = cards.filter((card) => card.polar.pause || card.polar.confusion).length;
  const fast = cards.filter((card) => card.polar.motion && !card.polar.pause).length;
  if (slow >= 2 && fast === 0) {
    if (topic === "love" || topic === "thoughts") {
      return "Burada hızlı, romantik ve dürtüsel bir hareket enerjisi güçlü değil. Daha çok düşünme, değerlendirme ve sonunda bir karar verme süreci var. Eğer iletişim olursa bunun duygusal bir patlamadan ziyade daha ciddi ve net bir konuşma şeklinde gelmesi olası görünüyor.";
    }
    return "Burada hızlı ve dürtüsel bir kırılma güçlü değil. Daha çok düşünme, değerlendirme ve sonunda bir karar veya somut adım süreci var.";
  }
  if (fast >= 2) {
    return "Süreç hızlanmaya açık: kartlar durağan bir bekleyişten çok hareket, giriş veya görünür bir davranış taşıyor.";
  }
  if (slow && fast) {
    return "Bir yan yavaşlatırken diğer yan hız vaat ediyor. Bu yüzden süreç birden kapanabilir veya birden açılabilir; acele ile bekleyiş aynı anda duruyor.";
  }
  return "Süreç orta hızda: ne tam durmuş ne de kaçış halinde.";
}

function takeawayPara(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  return `Bu açılımın ana mesajı şu: ${firstClause(one, topic)}, ${secondClause(two, topic)} ve ${thirdClause(three)}.`;
}

export function spreadSynthesis(cards: TarotCard[], topic: TarotTopicId) {
  const [one, two, three] = cards;
  if (!one || !two || !three) return "";
  const paragraphs = [
    introPara(cards, topic),
    firstPara(one, topic),
    secondPara(two, topic),
    thirdPara(three, topic),
    togetherPara(cards, topic),
    pacePara(cards, topic),
    takeawayPara(cards, topic),
  ];
  let text = paragraphs.join("\n\n");
  const words = text.replace(/\s+/g, " ").trim().split(/\s+/).filter(Boolean);
  if (words.length <= 520) return text;
  const shorter = paragraphs.slice(0, 6).join("\n\n");
  const next = shorter.replace(/\s+/g, " ").trim().split(/\s+/).filter(Boolean);
  if (next.length <= 520) return shorter;
  return `${next.slice(0, 520).join(" ")}.`;
}

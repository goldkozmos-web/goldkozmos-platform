export type LikertQuestion = {
  id: string;
  text: string;
  dim: string;
  reverse?: boolean;
};

export const CHARACTER_DIMS = [
  "sosyal_enerji",
  "karar",
  "duygu_ifade",
  "sinir",
  "degisim",
  "kontrol",
  "risk",
  "sorumluluk",
  "iliski",
  "elestiri",
  "stres",
] as const;

export const CHARACTER_QUESTIONS: LikertQuestion[] = [
  { id: "c1", dim: "sosyal_enerji", text: "Kalabalık bir ortam beni canlandırır." },
  { id: "c2", dim: "sosyal_enerji", text: "Yalnız kaldığımda daha net düşünürüm.", reverse: true },
  { id: "c3", dim: "karar", text: "Karar verirken uzun süre tartarım." },
  { id: "c4", dim: "karar", text: "İçimden gelen ilk yön çoğu zaman yeter." },
  { id: "c5", dim: "duygu_ifade", text: "Ne hissettiğimi karşımdakine kolayca söylerim." },
  { id: "c6", dim: "sinir", text: "Hayır demek bana zor gelir.", reverse: true },
  { id: "c7", dim: "degisim", text: "Yeni bir düzen beni meraka çeker." },
  { id: "c8", dim: "kontrol", text: "İşlerin nasıl gideceğini önceden netleştirmek isterim." },
  { id: "c9", dim: "risk", text: "Sonucu belirsiz bir adımı denemek bana ağır gelir.", reverse: true },
  { id: "c10", dim: "sorumluluk", text: "Üstlendiğim işi sonuna kadar götürmek isterim." },
  { id: "c11", dim: "iliski", text: "Yakınlık kurarken yavaş ilerlemeyi tercih ederim." },
  { id: "c12", dim: "elestiri", text: "Eleştiri geldiğinde önce kendimi korurum." },
  { id: "c13", dim: "stres", text: "Baskı altında sessizleşirim." },
  { id: "c14", dim: "stres", text: "Zorlanınca daha hızlı harekete geçerim." },
];

export const SHADOW_QUESTIONS: LikertQuestion[] = [
  { id: "s1", dim: "onay", text: "Beğenilmediğimi hissedince içim daralır." },
  { id: "s2", dim: "kontrol", text: "İşler benden bağımsız ilerleyince huzursuz olurum." },
  { id: "s3", dim: "kiskanclik", text: "Başkasının kolay ilerlemesi bende gerilim bırakır." },
  { id: "s4", dim: "fedakarlik", text: "Kendi ihtiyacımı erteleyip başkasını öne alırım." },
  { id: "s5", dim: "geri_cekilme", text: "Yakınlık artınca mesafe koymak isterim." },
  { id: "s6", dim: "ofke", text: "Öfkemi içimde tutar, sonra birden çıkar." },
  { id: "s7", dim: "kacinma", text: "Zor konuşmayı ertelemeyi tercih ederim." },
  { id: "s8", dim: "mukemmeliyet", text: "Yeterince iyi olmadan paylaşmak bana ağır gelir." },
  { id: "s9", dim: "sabotaj", text: "İşler yolundayken kendime küçük engeller çıkarırım." },
  { id: "s10", dim: "sinir", text: "Sınır koymak bana suçluluk hissettirir." },
];

export const RELATIONSHIP_QUESTIONS: LikertQuestion[] = [
  { id: "r1", dim: "yakinlik", text: "Yakınlık arttıkça rahatlarım." },
  { id: "r2", dim: "mesafe", text: "Çok yakın hissedince alan ihtiyacı duyarım." },
  { id: "r3", dim: "sinir", text: "İlişkide ihtiyacımı açıkça söyleyebilirim." },
  { id: "r4", dim: "iletisim", text: "Rahatsız olduğum şeyi zamanında konuşurum." },
  { id: "r5", dim: "catisma", text: "Tartışmada önce geri çekilirim." },
  { id: "r6", dim: "verme", text: "Sevgiyi fazla vererek görünür kılmaya çalışırım." },
  { id: "r7", dim: "guven", text: "Güveni yavaş inşa ederim." },
  { id: "r8", dim: "bagimsizlik", text: "Kendi alanımı kaybetmekten çekinirim." },
  { id: "r9", dim: "terk", text: "Mesafe oluşunca bırakılma korkusu gelir." },
  { id: "r10", dim: "secim", text: "Beni zorlayan ama tanıdık gelen insanlara çekilirim." },
  { id: "r11", dim: "oruntu", text: "Aynı ilişki sahnesi farklı kişilerde tekrar eder." },
];

export function scoreLikert(
  questions: LikertQuestion[],
  answers: Record<string, number>,
) {
  const buckets = new Map<string, number[]>();
  for (const question of questions) {
    const raw = answers[question.id];
    if (!raw) continue;
    const value = question.reverse ? 6 - raw : raw;
    const list = buckets.get(question.dim) ?? [];
    list.push(value);
    buckets.set(question.dim, list);
  }
  const scores: Record<string, number> = {};
  for (const [dim, values] of buckets) {
    scores[dim] = values.reduce((a, b) => a + b, 0) / values.length;
  }
  return scores;
}

function band(value: number) {
  if (value >= 4) return "yüksek";
  if (value <= 2.4) return "düşük";
  return "orta";
}

export function characterNarratives(scores: Record<string, number>) {
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const hard = [...top].sort((a, b) => a[1] - b[1]);
  return {
    summary: `Bu okuma bir teşhis değil; bugünkü eğilimlerinin bir özeti. Sosyal enerjin ${band(scores.sosyal_enerji ?? 3)}, karar alırken ${band(scores.karar ?? 3)}, sınır koymada ${band(scores.sinir ?? 3)} bir iz bırakıyor.`,
    strengths: top.slice(0, 3).map(([key]) => labelDim(key)),
    struggle: hard.slice(0, 3).map(([key]) => labelDim(key)),
    relations: `İlişki kurarken yakınlık ve mesafe arasında ${band(scores.iliski ?? 3)} bir ritim görünüyor.`,
    decisions: `Karar verirken tempo ${band(scores.karar ?? 3)}; kontrol ihtiyacı ${band(scores.kontrol ?? 3)}.`,
    stress: `Stres altında davranışın ${band(scores.stres ?? 3)} düzeyde öne çıkıyor.`,
    growth: hard.slice(0, 2).map(([key]) => `${labelDim(key)} alanında küçük, günlük bir pratik yeterli.`),
    scores,
  };
}

export function shadowNarratives(scores: Record<string, number>) {
  const top = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  return {
    highlights: top.map(([key]) => labelDim(key)),
    when: "Bu eğilimler çoğu zaman yorgunluk, belirsizlik veya değerinin görülmediğini hissettiğin anlarda belirginleşir.",
    transform:
      "Gölge burada bir suç değil; korunma biçimi. Fark edildiğinde aynı enerji sınır, netlik veya öz-bakıma dönebilir.",
    tips: [
      "Tetiklenince bedende dur: omuz, çene, nefes.",
      "Tek cümleyle ihtiyacını yaz: ‘Şu an … istiyorum.’",
      "Küçük bir sınır dene; dramatik bir yüzleşme değil.",
    ],
    scores,
  };
}

export function relationshipNarratives(scores: Record<string, number>) {
  return {
    overall: `İlişkide genel eğilimin yakınlık ${band(scores.yakinlik ?? 3)} / mesafe ${band(scores.mesafe ?? 3)} arasında salınıyor. Bu bir bağlanma teşhisi değil; tekrar eden ritminin özeti.`,
    closeness: `Yakınlık ve mesafe: yakınlık ${band(scores.yakinlik ?? 3)}, bağımsızlık ${band(scores.bagimsizlik ?? 3)}.`,
    bounds: `Sınırların ${band(scores.sinir ?? 3)}; iletişim ${band(scores.iletisim ?? 3)}.`,
    conflict: `Çatışmada geri çekilme ${band(scores.catisma ?? 3)}, aşırı verme ${band(scores.verme ?? 3)}.`,
    patterns: `Tekrar eden örüntüler ${band(scores.oruntu ?? 3)}; terk kaygısı ${band(scores.terk ?? 3)}.`,
    growth: [
      "İhtiyacı suçlamadan söylemek.",
      "Mesafe isteğini kaybolma olarak okumamak.",
      "Tanıdık ama yorucu seçimlerin farkında olmak.",
    ],
    scores,
  };
}

function labelDim(key: string) {
  const map: Record<string, string> = {
    sosyal_enerji: "Sosyal enerji",
    karar: "Karar verme",
    duygu_ifade: "Duyguları ifade etme",
    sinir: "Sınır koyma",
    degisim: "Değişime açıklık",
    kontrol: "Kontrol ihtiyacı",
    risk: "Risk",
    sorumluluk: "Sorumluluk",
    iliski: "İlişki kurma biçimi",
    elestiri: "Eleştiriye tepki",
    stres: "Stres altında davranış",
    onay: "Onay ihtiyacı",
    kiskanclik: "Kıskançlık",
    fedakarlik: "Aşırı fedakârlık",
    geri_cekilme: "Geri çekilme",
    ofke: "Öfke",
    kacinma: "Kaçınma",
    mukemmeliyet: "Mükemmeliyetçilik",
    sabotaj: "Kendini sabote etme",
    yakinlik: "Yakınlık",
    mesafe: "Mesafe",
    iletisim: "İletişim",
    catisma: "Çatışma",
    verme: "Aşırı verme",
    guven: "Güven",
    bagimsizlik: "Bağımsızlık",
    terk: "Terk edilme kaygısı",
    secim: "Partner seçimi",
    oruntu: "Tekrar eden kalıplar",
  };
  return map[key] ?? key;
}

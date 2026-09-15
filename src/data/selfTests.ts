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
  { id: "c3", dim: "sosyal_enerji", text: "Yeni insanlarla sohbet başlatmak bana kolay gelir." },
  { id: "c4", dim: "karar", text: "Karar verirken uzun süre tartarım." },
  { id: "c5", dim: "karar", text: "İçimden gelen ilk yön çoğu zaman yeter." },
  { id: "c6", dim: "karar", text: "Kararsız kaldığımda başkasının yönünü beklerim." },
  { id: "c7", dim: "duygu_ifade", text: "Ne hissettiğimi karşımdakine kolayca söylerim." },
  { id: "c8", dim: "duygu_ifade", text: "Duygularımı önce içimde eviririm, sonra paylaşırım." },
  { id: "c9", dim: "duygu_ifade", text: "Kırıldığımda bunu cümleye dökmek bana ağır gelir.", reverse: true },
  { id: "c10", dim: "sinir", text: "Hayır demek bana zor gelir.", reverse: true },
  { id: "c11", dim: "sinir", text: "İhtiyacımı suçluluk duymadan söyleyebilirim." },
  { id: "c12", dim: "sinir", text: "Fazla yüklenince sessizce içime atarım.", reverse: true },
  { id: "c13", dim: "degisim", text: "Yeni bir düzen beni meraka çeker." },
  { id: "c14", dim: "degisim", text: "Alıştığım ritim bozulunca gerilirim.", reverse: true },
  { id: "c15", dim: "degisim", text: "Küçük rutinler beni güvende hissettirir.", reverse: true },
  { id: "c16", dim: "kontrol", text: "İşlerin nasıl gideceğini önceden netleştirmek isterim." },
  { id: "c17", dim: "kontrol", text: "Akışa bırakmak bana huzur verir.", reverse: true },
  { id: "c18", dim: "kontrol", text: "Plan sapınca içimde sıkışma olur." },
  { id: "c19", dim: "risk", text: "Sonucu belirsiz bir adımı denemek bana ağır gelir.", reverse: true },
  { id: "c20", dim: "risk", text: "Güvenli olanı seçmek beni rahatlatır.", reverse: true },
  { id: "c21", dim: "risk", text: "Kaybetme ihtimali olsa da denemek isterim." },
  { id: "c22", dim: "sorumluluk", text: "Üstlendiğim işi sonuna kadar götürmek isterim." },
  { id: "c23", dim: "sorumluluk", text: "Başkasının payına da omuz vermek bana doğal gelir." },
  { id: "c24", dim: "sorumluluk", text: "Yük fazla gelince ertelemeye kayarım.", reverse: true },
  { id: "c25", dim: "iliski", text: "Yakınlık kurarken yavaş ilerlemeyi tercih ederim." },
  { id: "c26", dim: "iliski", text: "Güven oluşmadan içimi açmam." },
  { id: "c27", dim: "iliski", text: "Bağı çabuk ve sıcak kurmak bana iyi gelir.", reverse: true },
  { id: "c28", dim: "elestiri", text: "Eleştiri geldiğinde önce kendimi korurum." },
  { id: "c29", dim: "elestiri", text: "Geri bildirimi bir öğrenme olarak alabilirim." },
  { id: "c30", dim: "elestiri", text: "Yargılandığımı hissedince kapanırım." },
  { id: "c31", dim: "stres", text: "Baskı altında sessizleşirim." },
  { id: "c32", dim: "stres", text: "Zorlanınca daha hızlı harekete geçerim." },
  { id: "c33", dim: "stres", text: "Stres olunca bedenimde gerilim birikir." },
];

export const SHADOW_QUESTIONS: LikertQuestion[] = [
  { id: "s1", dim: "onay", text: "Beğenilmediğimi hissedince içim daralır." },
  { id: "s2", dim: "onay", text: "Onay almadan bir işi bitmiş saymam." },
  { id: "s3", dim: "kontrol", text: "İşler benden bağımsız ilerleyince huzursuz olurum." },
  { id: "s4", dim: "kontrol", text: "Karşı tarafın adımını öngörmek isterim." },
  { id: "s5", dim: "kiskanclik", text: "Başkasının kolay ilerlemesi bende gerilim bırakır." },
  { id: "s6", dim: "kiskanclik", text: "Sevdiğim kişi başkasıyla yakınken içim sıkışır." },
  { id: "s7", dim: "fedakarlik", text: "Kendi ihtiyacımı erteleyip başkasını öne alırım." },
  { id: "s8", dim: "fedakarlik", text: "Vermezsem sevilmeyeceğim hissi gelir." },
  { id: "s9", dim: "geri_cekilme", text: "Yakınlık artınca mesafe koymak isterim." },
  { id: "s10", dim: "geri_cekilme", text: "Yoğun duyguda susmayı seçerim." },
  { id: "s11", dim: "ofke", text: "Öfkemi içimde tutar, sonra birden çıkar." },
  { id: "s12", dim: "ofke", text: "Kırıldığımda sert bir cümle kurarım." },
  { id: "s13", dim: "kacinma", text: "Zor konuşmayı ertelemeyi tercih ederim." },
  { id: "s14", dim: "kacinma", text: "Rahatsız eden konuyu yokmuş gibi geçerim." },
  { id: "s15", dim: "mukemmeliyet", text: "Yeterince iyi olmadan paylaşmak bana ağır gelir." },
  { id: "s16", dim: "mukemmeliyet", text: "Küçük bir hata bütün işi bozar gibi gelir." },
  { id: "s17", dim: "sabotaj", text: "İşler yolundayken kendime küçük engeller çıkarırım." },
  { id: "s18", dim: "sabotaj", text: "Başlamak üzereyken bahaneler üretirim." },
  { id: "s19", dim: "sinir", text: "Sınır koymak bana suçluluk hissettirir." },
  { id: "s20", dim: "sinir", text: "Hayır dediğimde ilişki bozulacakmış gibi gelir." },
  { id: "s21", dim: "onay", text: "Sessiz kaldığımda yanlış bir şey yaptığımı düşünürüm." },
  { id: "s22", dim: "kontrol", text: "Karşı tarafın planını bilmeden rahat edemem." },
  { id: "s23", dim: "kiskanclik", text: "Paylaşılan ilgi bende eksiklik hissi bırakır." },
  { id: "s24", dim: "fedakarlik", text: "Yorulunca bile ‘bir şey olmaz’ deyip devam ederim." },
  { id: "s25", dim: "geri_cekilme", text: "İhtiyaç duyulunca kaybolmak isterim." },
  { id: "s26", dim: "ofke", text: "Adaletsizlik görünce içimde ısı yükselir." },
  { id: "s27", dim: "kacinma", text: "Zor bir konuşmayı mesajla geçiştirmeyi tercih ederim." },
  { id: "s28", dim: "mukemmeliyet", text: "Bitmemiş işi göstermek utanç verir." },
  { id: "s29", dim: "sabotaj", text: "İlerleme görününce küçük bir kaos çıkarırım." },
  { id: "s30", dim: "sinir", text: "Başkasının hayır’ına saygı duymak bana kolay gelir.", reverse: true },
];

export const RELATIONSHIP_QUESTIONS: LikertQuestion[] = [
  { id: "r1", dim: "yakinlik", text: "Yakınlık arttıkça rahatlarım." },
  { id: "r2", dim: "yakinlik", text: "Sevildiğimi sık hatırlatılmasını isterim." },
  { id: "r3", dim: "mesafe", text: "Çok yakın hissedince alan ihtiyacı duyarım." },
  { id: "r4", dim: "guven", text: "Güveni yavaş inşa ederim." },
  { id: "r5", dim: "guven", text: "Küçük bir tutarsızlıkta şüphe uyanır." },
  { id: "r6", dim: "iletisim", text: "Rahatsız olduğum şeyi zamanında konuşurum." },
  { id: "r7", dim: "iletisim", text: "Duygumu dolaylı yollardan belli ederim.", reverse: true },
  { id: "r8", dim: "sinir", text: "İlişkide ihtiyacımı açıkça söyleyebilirim." },
  { id: "r9", dim: "sinir", text: "Karşı tarafın sınırına saygı duymak bana kolay gelir." },
  { id: "r10", dim: "catisma", text: "Tartışmada önce geri çekilirim." },
  { id: "r11", dim: "catisma", text: "Çatışmayı hemen çözmek isterim." },
  { id: "r12", dim: "verme", text: "Sevgiyi fazla vererek görünür kılmaya çalışırım." },
  { id: "r13", dim: "verme", text: "Karşılık gelmese de vermeye devam ederim." },
  { id: "r14", dim: "geri_cekilme", text: "Kırılınca susarım." },
  { id: "r15", dim: "bagimsizlik", text: "Kendi alanımı kaybetmekten çekinirim." },
  { id: "r16", dim: "bagimsizlik", text: "Birlikteyken bile ayrı bir hayatım olsun isterim." },
  { id: "r17", dim: "terk", text: "Mesafe oluşunca bırakılma korkusu gelir." },
  { id: "r18", dim: "terk", text: "Cevap gecikince içimde alarm çalar." },
  { id: "r19", dim: "secim", text: "Beni zorlayan ama tanıdık gelen insanlara çekilirim." },
  { id: "r20", dim: "secim", text: "Sakin ve istikrarlı bağ bana ‘eksik ateş’ gibi gelir." },
  { id: "r21", dim: "oruntu", text: "Aynı ilişki sahnesi farklı kişilerde tekrar eder." },
  { id: "r22", dim: "oruntu", text: "İlişki bozulunca eski bir hikâyeyi yeniden yaşar gibi olurum." },
  { id: "r23", dim: "yakinlik", text: "Sevgi görünür olmazsa içimde boşluk açılır." },
  { id: "r24", dim: "guven", text: "Söz ile davranış uymazsa bağ gevşer." },
  { id: "r25", dim: "iletisim", text: "Rahatsızlığımı yumuşak ama net söyleyebilirim." },
  { id: "r26", dim: "sinir", text: "İhtiyacımı erteleyince sonra kırgınlık birikir." },
  { id: "r27", dim: "catisma", text: "Tartışmada haklı çıkmak bağdan daha önemli hale gelir." },
  { id: "r28", dim: "verme", text: "Vermeyi kestiğimde sevilmeyeceğim korkusu gelir." },
  { id: "r29", dim: "geri_cekilme", text: "Yakınlık yoğunlaşınca soğurum." },
  { id: "r30", dim: "bagimsizlik", text: "Birlikte plan yapmak alanımı daraltır." },
  { id: "r31", dim: "terk", text: "Küçük bir mesafe bile bırakılma sahnesini çağırır." },
  { id: "r32", dim: "secim", text: "Sakin bağdan çok inişli çıkışlı bağa çekilirim." },
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

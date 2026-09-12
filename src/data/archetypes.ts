export const ARCHETYPES = [
  {
    id: "masum",
    name: "Masum",
    traits: "Güven, sadelik, umut.",
    strength: "Temiz niyet ve yenilenme kapasitesi.",
    shadow: "Naiflik, sınır koymakta zorlanma.",
    needs: "Güvenli alan ve dürüst bilgi.",
    relations: "Bağlarda iyilik varsayar; hayal kırıklığı ağır gelebilir.",
    growth: "Gerçeği görmek masumiyeti bozmaz; olgunlaştırır.",
  },
  {
    id: "kasesif",
    name: "Kaşif",
    traits: "Özgürlük, merak, hareket.",
    strength: "Yeni yollar açmak.",
    shadow: "Köklenememek, kaçış.",
    needs: "Nefes ve seçim hakkı.",
    relations: "Yakınlıkla birlikte alan ister.",
    growth: "Kalmak da bir keşiftir.",
  },
  {
    id: "bilge",
    name: "Bilge",
    traits: "Anlama, mesafe, netlik.",
    strength: "Örüntüyü görmek.",
    shadow: "Hayatı analizde dondurmak.",
    needs: "Sessizlik ve doğru soru.",
    relations: "Duyguyu geç anlar, sonra derin bağlanır.",
    growth: "Bilgiyi bedende kullan.",
  },
  {
    id: "kahraman",
    name: "Kahraman",
    traits: "Cesaret, hedef, irade.",
    strength: "Zor olanı üstlenmek.",
    shadow: "Savaşmadan duramamak.",
    needs: "Anlamlı bir meydan okuma.",
    relations: "Korur; bazen fazla taşır.",
    growth: "Zafer değil, ölçü.",
  },
  {
    id: "asi",
    name: "Asi",
    traits: "Özgünlük, kopuş, doğruluk.",
    strength: "Sahte düzeni bozmak.",
    shadow: "Karşıtlık için karşıtlık.",
    needs: "Özgür ifade.",
    relations: "Kurala sıkışınca uzaklaşır.",
    growth: "Yıkmak kadar kurmak.",
  },
  {
    id: "sihirbaz",
    name: "Sihirbaz",
    traits: "Dönüşüm, vizyon, etki.",
    strength: "Olasılığı görünür kılmak.",
    shadow: "Manipülasyon veya abartı.",
    needs: "Anlamlı bir sahne, dürüst niyet.",
    relations: "İlham verir, bazen fazla yükler.",
    growth: "Küçük gerçek değişim.",
  },
  {
    id: "siradan",
    name: "Sıradan İnsan",
    traits: "Aidiyet, eşitlik, paylaşım.",
    strength: "Yanında durmak.",
    shadow: "Kendini silmek.",
    needs: "Topluluk ve sıradan ritüel.",
    relations: "Uyum için fazla ödün verebilir.",
    growth: "Aidiyet, kendini iptal etmez.",
  },
  {
    id: "asik",
    name: "Aşık",
    traits: "Bağ, güzellik, seçim.",
    strength: "Yakınlık ve zevk.",
    shadow: "Onay ve kaybetme korkusu.",
    needs: "Sevilmek ve seçilmek.",
    relations: "Yoğun bağ; sınır zorlanır.",
    growth: "Kendini de seç.",
  },
  {
    id: "soytari",
    name: "Soytarı",
    traits: "Oyun, esneklik, an.",
    strength: "Ağırlığı çözmek.",
    shadow: "Ciddiyeti kaçırmak.",
    needs: "Nefes ve mizah.",
    relations: "Hafifletir, bazen kaçar.",
    growth: "Oyun, sorumluluğu silmez.",
  },
  {
    id: "bakici",
    name: "Bakıcı",
    traits: "Şefkat, bakım, koruma.",
    strength: "Başkasını tutmak.",
    shadow: "Tükenmek, kurtarıcılık.",
    needs: "Karşılıklı bakım.",
    relations: "Verir; almak zor gelir.",
    growth: "Kendine de bak.",
  },
  {
    id: "yaratici",
    name: "Yaratıcı",
    traits: "İfade, biçim, yenilik.",
    strength: "Yoktan form çıkarmak.",
    shadow: "Hiç bitmeyen taslak.",
    needs: "Zaman ve malzemeye dokunmak.",
    relations: "İlham ortaklığı arar.",
    growth: "Bitirmek de yaratımdır.",
  },
  {
    id: "hukumdar",
    name: "Hükümdar",
    traits: "Sorumluluk, düzen, yetki.",
    strength: "Alan tutmak.",
    shadow: "Kontrol ve katılık.",
    needs: "Net rol ve saygı.",
    relations: "Korur, bazen yönetir.",
    growth: "Güç, yumuşaklıkla durur.",
  },
] as const;

export type ArchetypeId = (typeof ARCHETYPES)[number]["id"];

export type ArchetypeQuestion = {
  id: string;
  text: string;
  options: { id: string; label: string; archetype: ArchetypeId }[];
};

export const ARCHETYPE_QUESTIONS: ArchetypeQuestion[] = [
  { id: "q1", text: "Zor bir günde ilk sığın evin neresi?", options: [
    { id: "a", label: "Güvenli birinin yanında sakinleşirim.", archetype: "masum" },
    { id: "b", label: "Dışarı çıkar, hava değişsin isterim.", archetype: "kasesif" },
    { id: "c", label: "Olanı anlamaya çalışırım.", archetype: "bilge" },
    { id: "d", label: "Hemen bir işe girişirim.", archetype: "kahraman" },
  ]},
  { id: "q2", text: "Bir ilişkide en çok neye ihtiyaç duyarsın?", options: [
    { id: "a", label: "Seçildiğini hissetmek.", archetype: "asik" },
    { id: "b", label: "Alan ve özgürlük.", archetype: "kasesif" },
    { id: "c", label: "Dürüst bakım.", archetype: "bakici" },
    { id: "d", label: "Net roller ve düzen.", archetype: "hukumdar" },
  ]},
  { id: "q3", text: "Karar verirken hangisi ağır basar?", options: [
    { id: "a", label: "Doğru olanı yapmak.", archetype: "kahraman" },
    { id: "b", label: "İçime yatıp yatmadığı.", archetype: "sihirbaz" },
    { id: "c", label: "Kimsenin dışarıda kalmaması.", archetype: "siradan" },
    { id: "d", label: "Sonucu tartmak.", archetype: "bilge" },
  ]},
  { id: "q4", text: "Sınır koyman gerektiğinde…", options: [
    { id: "a", label: "Geç koyar, sonra patlarım.", archetype: "bakici" },
    { id: "b", label: "Net çizerim.", archetype: "hukumdar" },
    { id: "c", label: "Kaçarak sınırlarım.", archetype: "asi" },
    { id: "d", label: "Şaka ile savuştururum.", archetype: "soytari" },
  ]},
  { id: "q5", text: "Üretmek senin için nedir?", options: [
    { id: "a", label: "Bir şeyin biçim alması.", archetype: "yaratici" },
    { id: "b", label: "Birini iyileştirmek.", archetype: "bakici" },
    { id: "c", label: "Düzeni kurmak.", archetype: "hukumdar" },
    { id: "d", label: "Oyalanmak ve keşfetmek.", archetype: "soytari" },
  ]},
  { id: "q6", text: "Risk karşısında duruşun?", options: [
    { id: "a", label: "Atılırım, sonra bakarım.", archetype: "kahraman" },
    { id: "b", label: "Eski kuralı kırarım.", archetype: "asi" },
    { id: "c", label: "Güvenli yolu seçerim.", archetype: "masum" },
    { id: "d", label: "Olasılıkları çeviririm.", archetype: "sihirbaz" },
  ]},
  { id: "q7", text: "Aidiyet sende nasıl durur?", options: [
    { id: "a", label: "Bir gruba ait olmak huzur.", archetype: "siradan" },
    { id: "b", label: "Ait olmak sıkışma gibi gelir.", archetype: "kasesif" },
    { id: "c", label: "Seçtiğim kişiye aitlik.", archetype: "asik" },
    { id: "d", label: "Topluluğu ben tutarım.", archetype: "hukumdar" },
  ]},
  { id: "q8", text: "Özgürlük sende neye benzer?", options: [
    { id: "a", label: "Yola çıkabilmek.", archetype: "kasesif" },
    { id: "b", label: "Kendi gerçeğimi söylemek.", archetype: "asi" },
    { id: "c", label: "Oynamak, ciddiyetten çıkmak.", archetype: "soytari" },
    { id: "d", label: "Kendi işimi kurmak.", archetype: "yaratici" },
  ]},
  { id: "q9", text: "Sorumluluk geldiğinde…", options: [
    { id: "a", label: "Alır, taşırım.", archetype: "hukumdar" },
    { id: "b", label: "Kahramanca yüklenirim.", archetype: "kahraman" },
    { id: "c", label: "Başkasının yükünü de alırım.", archetype: "bakici" },
    { id: "d", label: "Önce anlamak isterim.", archetype: "bilge" },
  ]},
  { id: "q10", text: "Yenilik karşında ilk tepkin?", options: [
    { id: "a", label: "Hemen denerim.", archetype: "yaratici" },
    { id: "b", label: "Niyetle şekil veririm.", archetype: "sihirbaz" },
    { id: "c", label: "Güvenli mi diye bakarım.", archetype: "masum" },
    { id: "d", label: "Herkes uyum sağlar mı diye bakarım.", archetype: "siradan" },
  ]},
  { id: "q11", text: "Çatışmada hangisi sana daha yakın?", options: [
    { id: "a", label: "Doğruyu yüksek sesle söylerim.", archetype: "asi" },
    { id: "b", label: "Ortamı yumuşatırım.", archetype: "soytari" },
    { id: "c", label: "Bağı korumaya çalışırım.", archetype: "asik" },
    { id: "d", label: "Mesafe alıp düşünürüm.", archetype: "bilge" },
  ]},
  { id: "q12", text: "Kendini en çok nerede tanırsın?", options: [
    { id: "a", label: "Yeni bir yerde.", archetype: "kasesif" },
    { id: "b", label: "Birine bakarken.", archetype: "bakici" },
    { id: "c", label: "Bir işi bitirirken.", archetype: "yaratici" },
    { id: "d", label: "İnançla dururken.", archetype: "masum" },
  ]},
  { id: "q13", text: "Onay ihtiyacın nasıl görünür?", options: [
    { id: "a", label: "Sevilmek isterim.", archetype: "asik" },
    { id: "b", label: "Beğenilen iş çıkarmak isterim.", archetype: "yaratici" },
    { id: "c", label: "Liderliğimin görülmesini isterim.", archetype: "hukumdar" },
    { id: "d", label: "Fark edilmesem de olur.", archetype: "bilge" },
  ]},
  { id: "q14", text: "Hayır demek sende nasıl durur?", options: [
    { id: "a", label: "Zor; kırılmasınlar.", archetype: "bakici" },
    { id: "b", label: "Kolay; alanım net.", archetype: "hukumdar" },
    { id: "c", label: "Kaçarım, hayır demem.", archetype: "kasesif" },
    { id: "d", label: "Şaka ile geçerim.", archetype: "soytari" },
  ]},
  { id: "q15", text: "Başarı sende neye benzer?", options: [
    { id: "a", label: "Bir eşiği aşmak.", archetype: "kahraman" },
    { id: "b", label: "Bir şeyi dönüştürmek.", archetype: "sihirbaz" },
    { id: "c", label: "Birlikte olmak.", archetype: "siradan" },
    { id: "d", label: "Özgün kalmak.", archetype: "asi" },
  ]},
  { id: "q16", text: "Gölgen en çok nerede çıkar?", options: [
    { id: "a", label: "Kontrol edemeyince.", archetype: "hukumdar" },
    { id: "b", label: "Sevilmediğimi sandığımda.", archetype: "asik" },
    { id: "c", label: "Sıkılınca her şeyi bırakınca.", archetype: "soytari" },
    { id: "d", label: "Naif güvenim bozulunca.", archetype: "masum" },
  ]},
  { id: "q17", text: "Bir grupta doğal rolün?", options: [
    { id: "a", label: "Tutucu / düzenleyici.", archetype: "hukumdar" },
    { id: "b", label: "Bakım veren.", archetype: "bakici" },
    { id: "c", label: "Fikir ve anlam taşıyan.", archetype: "bilge" },
    { id: "d", label: "Enerjiyi çeviren.", archetype: "sihirbaz" },
  ]},
  { id: "q18", text: "Sıkışınca ilk kaçışın?", options: [
    { id: "a", label: "Yola çıkmak.", archetype: "kasesif" },
    { id: "b", label: "İsyan.", archetype: "asi" },
    { id: "c", label: "Daha çok çalışmak.", archetype: "kahraman" },
    { id: "d", label: "İçeri kapanıp okumak.", archetype: "bilge" },
  ]},
  { id: "q19", text: "Güzellik sende ne işe yarar?", options: [
    { id: "a", label: "Bağ kurar.", archetype: "asik" },
    { id: "b", label: "Biçim verir.", archetype: "yaratici" },
    { id: "c", label: "Hayatı hafifletir.", archetype: "soytari" },
    { id: "d", label: "Umut tutar.", archetype: "masum" },
  ]},
  { id: "q20", text: "Değişim nasıl gelsin?", options: [
    { id: "a", label: "Yumuşak ve niyetli.", archetype: "sihirbaz" },
    { id: "b", label: "Keskin ve dürüst.", archetype: "asi" },
    { id: "c", label: "Hep birlikte.", archetype: "siradan" },
    { id: "d", label: "Cesaretle.", archetype: "kahraman" },
  ]},
  { id: "q21", text: "Kendine en çok hangi sözü söylersin?", options: [
    { id: "a", label: "Halletmen lazım.", archetype: "kahraman" },
    { id: "b", label: "Anlamadın henüz.", archetype: "bilge" },
    { id: "c", label: "Sen de hak ediyorsun.", archetype: "bakici" },
    { id: "d", label: "Başka bir şey dene.", archetype: "yaratici" },
  ]},
  { id: "q22", text: "Toplulukta görünürlük?", options: [
    { id: "a", label: "Sahne alırım.", archetype: "sihirbaz" },
    { id: "b", label: "Arada dururum.", archetype: "siradan" },
    { id: "c", label: "Öne çıkar, yön veririm.", archetype: "hukumdar" },
    { id: "d", label: "Kenardan izlerim.", archetype: "kasesif" },
  ]},
  { id: "q23", text: "Bağ kopunca ilk refleksin?", options: [
    { id: "a", label: "Onarmak isterim.", archetype: "asik" },
    { id: "b", label: "Bakımı artırırım.", archetype: "bakici" },
    { id: "c", label: "Gülerek geçerim.", archetype: "soytari" },
    { id: "d", label: "Kuralı ben bozarım.", archetype: "asi" },
  ]},
  { id: "q24", text: "İdeal bir gün sende nasıl biter?", options: [
    { id: "a", label: "Bir şey üretmiş olarak.", archetype: "yaratici" },
    { id: "b", label: "Birine iyi gelmiş olarak.", archetype: "bakici" },
    { id: "c", label: "Özgür ve hafif.", archetype: "kasesif" },
    { id: "d", label: "Düzen içinde.", archetype: "hukumdar" },
  ]},
];

export function scoreArchetypes(answers: Record<string, string>) {
  const tally: Record<string, number> = {};
  for (const question of ARCHETYPE_QUESTIONS) {
    const picked = question.options.find((item) => item.id === answers[question.id]);
    if (!picked) continue;
    tally[picked.archetype] = (tally[picked.archetype] ?? 0) + 1;
  }
  return [...ARCHETYPES]
    .map((item) => ({ ...item, score: tally[item.id] ?? 0 }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "tr"))
    .slice(0, 3);
}

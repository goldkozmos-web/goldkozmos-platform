export type ChakraGuide = {
  slug: string;
  name: string;
  sanskrit: string;
  color: string;
  focus: string;
  summary: string;
  dailySignals: string[];
  practice: string;
};

export const chakraGuides: ChakraGuide[] = [
  {
    slug: "kok-cakra",
    name: "Kök çakra",
    sanskrit: "Muladhara",
    color: "#b95b50",
    focus: "Güven · aidiyet · temel ihtiyaçlar",
    summary: "Kök çakra, yedi çakra modelinde güven duygusu, aidiyet ve günlük hayatın temel düzeniyle ilişkilendirilen sembolik alandır.",
    dailySignals: ["Değişim karşısında sürekli güvence aramak", "Ev, para veya düzen konularında zihnin dağılması", "Kendini bir yere ait hissetmekte zorlanmak"],
    practice: "Ayak tabanlarını yere hissettiğin kısa bir nefes çalışması yap. Ardından bu hafta güven duygunu somutlaştıracak tek bir düzen seç: uyku, bütçe, ev veya sınırların.",
  },
  {
    slug: "sakral-cakra",
    name: "Sakral çakra",
    sanskrit: "Svadhisthana",
    color: "#cf873c",
    focus: "Duygular · yaratıcılık · haz",
    summary: "Sakral çakra, duygularla temas, yaratıcılık ve hayattan keyif alma kapasitesini düşünmek için kullanılan sembolik bir çerçevedir.",
    dailySignals: ["Duyguyu hemen bastırmak ya da ertelemek", "Üretmek istediğin şeylere hiç alan bırakamamak", "Yakınlık ve keyif konusunda suçluluk hissetmek"],
    practice: "Beş dakika boyunca duygunu düzeltmeden yaz. Sonra senden sonuç beklemeyen küçük bir yaratıcı uğraşa yer aç.",
  },
  {
    slug: "solar-pleksus",
    name: "Solar pleksus çakrası",
    sanskrit: "Manipura",
    color: "#ae902c",
    focus: "İrade · özdeğer · sınırlar",
    summary: "Solar pleksus, karar alma, kendi ölçütünü duyma ve sınırlarını koruma temalarını ele almak için kullanılan sembolik merkezdir.",
    dailySignals: ["Karar verirken sürekli onay beklemek", "İhtiyacını söyleyip sonra geri çekilmek", "Kontrol ile sorumluluğu birbirine karıştırmak"],
    practice: "Bugün yalnızca kendi ölçütlerine göre vereceğin küçük bir kararı seç. Kararı savunmak yerine neden sana uyduğunu yaz.",
  },
  {
    slug: "kalp-cakrasi",
    name: "Kalp çakrası",
    sanskrit: "Anahata",
    color: "#4f8164",
    focus: "Sevgi · şefkat · bağ",
    summary: "Kalp çakrası, sevgi alışverişi, kendine şefkat ve yakınlık kurarken sınırlarını koruma temalarıyla ilişkilendirilir.",
    dailySignals: ["Yakınlık kurarken incinmekten kaçınmak", "Kendine başkalarına gösterdiğin anlayışı göstermemek", "Şefkat ile her yükü üstlenmeyi karıştırmak"],
    practice: "Kendine, aynı durumda sevdiğin birine söyleyeceğin kadar gerçekçi ve yumuşak bir cümle yaz.",
  },
  {
    slug: "bogaz-cakrasi",
    name: "Boğaz çakrası",
    sanskrit: "Vishuddha",
    color: "#527f96",
    focus: "İfade · dinleme · dürüstlük",
    summary: "Boğaz çakrası, ne söylemek istediğini fark etme, dinleme ve kendi gerçeğini açıkça ifade etme üzerine düşünmek için kullanılan bir semboldür.",
    dailySignals: ["Söylemek istediğini sürekli içine atmak", "Duyulmadığını varsayıp konuşmayı bırakmak", "Açık bir rica yerine imayla anlaşılmayı beklemek"],
    practice: "‘Şu anda … hissediyorum; ihtiyacım …’ cümlesini tamamla. Paylaşmak için güvenli ve uygun bir bağlam seç.",
  },
  {
    slug: "ucuncu-goz-cakrasi",
    name: "Üçüncü göz çakrası",
    sanskrit: "Ajna",
    color: "#696a98",
    focus: "İçgörü · dikkat · netlik",
    summary: "Üçüncü göz, gözlem ile varsayımı ayırmak, dikkatini toplamak ve kendi düşünce kalıplarını fark etmek için kullanılan sembolik bir alandır.",
    dailySignals: ["Bir hisse hemen kesin bilgi gibi davranmak", "Karar verirken bildiklerinle korkularını karıştırmak", "Zihnin aynı senaryoda dönüp durması"],
    practice: "Bir sayfayı üçe böl: bildiklerim, düşündüklerim, henüz bilmediklerim. Önemli kararlarında sezgine somut bilgiyi de eşlik ettir.",
  },
  {
    slug: "tac-cakra",
    name: "Taç çakra",
    sanskrit: "Sahasrara",
    color: "#936ea1",
    focus: "Anlam · bağlılık · bütünlük",
    summary: "Taç çakra, hayatına anlam veren değerleri ve kendinden daha büyük gördüğün şeylerle bağını düşünmek için kullanılan sembolik merkezdir.",
    dailySignals: ["Yaptıklarının anlamını kaybetmiş gibi hissetmek", "Kendi değerlerinden kopuk bir tempoda yaşamak", "Her cevabı dışarıda aramak"],
    practice: "Senin için anlamlı olan üç değeri yaz. Bu hafta onlardan birine küçük ama görünür bir yer aç.",
  },
];

export function getChakraGuide(slug: string) {
  return chakraGuides.find((item) => item.slug === slug);
}

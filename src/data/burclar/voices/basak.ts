import type { Sign } from "../types";

export const basak: Sign = {
  id: "basak",
  name: "Başak",
  slug: "basak",
  symbol: "♍",
  element: "toprak",
  elementLabel: "Toprak",
  modality: "degisken",
  modalityLabel: "Değişken",
  rulingPlanets: ["Merkür"],
  dateRange: "23 Ağustos – 22 Eylül",
  coreTraits: ["ayrıntı zekâsı", "hizmet", "tamir etme"],
  relationshipStyle:
    "Bağı nutukla değil, düzeltilen küçük şeylerle canlı tutmak ister.",
  communicationStyle:
    "Kesin konuşur, kusuru görür, niyeti düzeltmek olsa da kulağa eleştiri gibi gelebilir.",
  emotionalNeeds:
    "Emeğinin görünmesi ve ‘mükemmeliyetçi’ diye alaya alınmaması.",
  strengths: ["özen", "zekâ", "faydalı şefkat"],
  challenges: ["kaygı", "eleştiri", "kendini yeterince görmeme"],
  loveStyle:
    "Sevgiyi işe yarar kılmak, düzeltmek, sadeleştirmek üzerinden taşır.",
  bestMatches: ["boga", "oglak", "yengec", "akrep"],
  attractionGives: "hayatı kolaylaştıran somut özen",
  attractionSeeks: "emeğin takdir edilmesi",
  trustNeed: "dağınıklığın ve sözde özensizliğin azalması",
  frictionHabit: "düzeltmeyi sevgi sanmak",
  repairMove: "yumuşak bir hizmet ve eleştirisiz bir cümle",
  passionNote: "yakınlığı temiz, sade, dikkatli bir dokunuşla açar",
  tempo: "yavaş analiz, sadık idame",
  withElement: {
    ates: "Ateş burcu Başak’ın listesini yakabilir; cesaret gelir, kusur büyür gibi durur.",
    toprak: "İki toprak burcu işe yarar bir ev kurabilir; düzen artar, kendiliğindenlik kaybolabilir.",
    hava: "Hava burcu Başak’ın ayrıntısını fikre çevirir; zihin ısınır, beden kaygıya kaçabilir.",
    su: "Su burcu Başak’ın tamirini hisle ıslatır; şefkat gelir, kusur duygusal okunabilir.",
  },
  withModality: {
    oncu: "Öncü burç hemen ister; Başak önce kumaşı yoklar.",
    sabit: "Sabit burç Başak’ın düzeltmesini kalıcı düzene çevirir; bu ya yuva olur ya da sıkışma.",
    degisken: "İki değişken burç uyumla akar; yön kaybolursa kaygı çoğalır.",
  },
  woman: {
    intro:
      "Başak kadını, Merkür’ün değişken toprak burcunda ‘nasıl biridir?’ sorusuna çoğu zaman özenle cevap verir: görüneni düzeltir, görünmeyeni taşır. Bu, her Başak kadınının evhamlı veya soğuk olduğu anlamına gelmez. Daha çok, sevginin işe yaramasını isteyen bir tamir zekâsıdır.",
    character:
      "Karakteri bir kumaş gibi işler: dokusu okunur, söküğü görülür, onarılır. Değişken nitelik uyumu hem hizmet hem dağılma yapabilir. Zekâsı ayrıntıdadır; büyük nutuktan çok küçük gerçek. Merkür burada eleştiri kaderi değil, dünyayı kullanılabilir kılma iştahıdır. Başak kadını kusursuzluk aramaz; kusurun yok sayılmasını kaldıramaz. Emeği görünmezse karakter ‘huysuz’ diye yanlış etiketlenir. Asıl aranan, faydanın sayılmasıdır.",
    inLove:
      "Aşkta sevgi gösterme biçimi çoğu zaman işe yarar jesttir: düzeltilen bir iş, sadeleştirilen bir gün, hatırlanan bir ihtiyaç. Yakınlık, temiz ve dikkatli bir odadır. Güven, özensizliğin tekrar etmemesiyle büyür. Kıskançlık evrensel damga değildir; daha sık görülen, bağın dağınık ve kayıtsız kalması tedirginliğidir. Özgürlük, kusursuz olmak zorunda kalmamaktır.",
    values:
      "İlişkide özen, sadelik ve dürüst emek öne çıkabilir. Partnerinin ‘bırak aksın’ diye özensizleşmesi yakınlığı öldürebilir. Başak kadını dram aramaz; savurulan ayrıntıyı kaldıramaz.",
    whenInterested:
      "Hoşlandığında hayatınızı fark ettirmeden kolaylaştırabilir. Bu kontrol değil, davettir. Kelime az, hizmet çok olabilir. Emek görülmezse geri çekilir.",
    whenDistant:
      "Uzaklaştığında eleştiri artabilir veya hizmet kesilir. Bu ceza gibi durabilir; aslında kaygının dilidir. Geri dönüş yumuşak, eleştirisiz bir cümleyle gelir.",
    strengths:
      "Güçlü yönü, hayatı yaşanır kılmaktır. Krizde pratik şefkat sunar. Zekâsı süs değil, tamirdir.",
    challenges:
      "Zorlayıcı yönü, düzeltmeyi sevgi sanmasıdır. Kaygı bakımsız topraktır. Kendini yeterince görmemek, emeği görünmez kılar.",
    workLife:
      "İş hayatında ayrıntının anlam taşıdığı yerde canlıdır. Sağlık, editörlük, zanaat, analiz, hizmet bu damarı besleyebilir. Anlamsız kusur avı onu tüketir.",
    summary:
      "Başak kadını, astrolojik sembolizmde sevgiyi nutuk gibi değil, düzeltilen küçük şeyler gibi yaşar. Özeni hem şefkat hem eleştiri olabilir. Onu anlamak, kumaşı atmak değil; söküğü birlikte onarmaktır.",
  },
  man: {
    intro:
      "Başak erkeği, Merkür’ün değişken toprak burcunda ‘nasıl biridir?’ sorusuna özen ve tamirle cevap verir. Kusuru görür; niyeti çoğu zaman yıkmak değil, işe yarar kılmaktır. Bu, her Başak erkeğinin eleştirel olduğu anlamına gelmez. Daha çok, bağın bakımlı kalmasını isteyen bir topraktır.",
    character:
      "Karakteri bir atölye gibi işler. Değişken nitelik uyum sağlar. Zekâsı ayrıntıdadır. Merkür dünyayı kullanılabilir kılar. Emeği görülmezse kapanır.",
    inLove:
      "Aşkta yakınlığı işe yarar jestle kurar. Güven, özensizliğin azalmasıyla büyür. Özgürlük, kusursuz olmak zorunda kalmamaktır.",
    values:
      "İlişkide sadelik ve dürüst emek öne çıkabilir. Savrulan ayrıntı yakınlığı yorar.",
    whenInterested:
      "Hoşlandığında hayatınızı kolaylaştırır. Kelime az, hizmet çok olabilir.",
    feelingsShown:
      "Duygularını gösterme biçimi çoğu zaman tamir ve sade özenledir. Öfke eleştiri kılığında, şefkat iş bitince sızabilir. Partneri yalnızca şiir beklerse dil yok sanılabilir.",
    whenDistant:
      "Uzaklaştığında eleştiri artar veya hizmet kesilir. Geri dönüş eleştirisiz bir cümleledir.",
    strengths:
      "Güçlü yönü pratik şefkat, zekâ ve hayatı yaşanır kılmaktır.",
    challenges:
      "Zorlayıcı yönü düzeltmeyi sevgi sanmak ve kaygıdır. Bakım ister, hüküm değil.",
    workLife:
      "Ayrıntının anlam taşıdığı işte canlıdır. Anlamsız kusur avı tüketir.",
    summary:
      "Başak erkeği, astrolojik sembolizmde sevgiyi bakımlı bir atölye gibi yaşar. Özeni hem armağan hem eleştiri olabilir. Onu anlamak, söküğü birlikte onamaktır.",
  },
};

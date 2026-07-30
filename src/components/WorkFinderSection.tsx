"use client";

import { useMemo, useState } from "react";

type NeedKey = "ask" | "iliski" | "para" | "birebir";
type FormatKey = "birebir" | "analiz" | "digital";
type QuestionMode = "single" | "multiple";

type NeedScores = Partial<Record<NeedKey, number>>;
type FormatScores = Partial<Record<FormatKey, number>>;

type Option = {
  id: string;
  label: string;
  description?: string;
  scores?: NeedScores;
  formatScores?: FormatScores;
  exclusive?: boolean;
};

type Question = {
  id: string;
  chapter?: string;
  why?: string;
  eyebrow: string;
  title: string;
  helper?: string;
  mode: QuestionMode;
  maxSelections?: number;
  options: Option[];
};

type Answers = Record<string, string[]>;

const WHATSAPP_NUMBER = "905054722153";

const needDetails: Record<
  NeedKey,
  {
    eyebrow: string;
    title: string;
    shortTitle: string;
    href: string;
    description: string;
    reason: string;
    nextStep: string;
  }
> = {
  ask: {
    eyebrow: "SANA EN YAKIN BAŞLANGIÇ",
    title: "Aşkı Hayatına Çağır",
    shortTitle: "aşk alanı",
    href: "/calismalar/ask",
    description:
      "Yanıtların, yeni bir ilişki istemene rağmen geçmiş kırgınlıkların, güven sorunlarının veya kendini koruma biçimlerinin aşk alanını etkileyebildiğini gösteriyor.",
    reason:
      "Bu sonuç; geçmişi bırakma, yeni bir ilişkiye hazırlanma, bağlanma korkusu, görülmeme hissi ve ilişki seçimlerinde tekrar eden döngülerle ilgili yanıtlarının ağırlığına göre oluştu.",
    nextStep:
      "İlk adımın, geçmişten kalan duygusal yükleri fark etmek ve yeni bir ilişkiye hangi içsel yerden yaklaşmak istediğini netleştirmek olabilir.",
  },
  iliski: {
    eyebrow: "SANA EN YAKIN BAŞLANGIÇ",
    title: "İlişkini Şifalandır",
    shortTitle: "mevcut ilişki",
    href: "/calismalar/iliski",
    description:
      "Yanıtların, mevcut ilişkinde iletişim, güven, sınırlar, yakınlık veya yük paylaşımı konularının daha fazla ilgiye ihtiyaç duyduğunu gösteriyor.",
    reason:
      "Bu sonuç; ilişkide yalnız hissetme, kendini ifade edememe, güven sorunu, aynı tartışmaların tekrarı ve ilişkinin yükünü tek başına taşıma cevaplarının ağırlığına göre oluştu.",
    nextStep:
      "İlk adımın, ilişkide hangi ihtiyacının karşılanmadığını ve hangi sınırının görünmez hâle geldiğini fark etmek olabilir.",
  },
  para: {
    eyebrow: "SANA EN YAKIN BAŞLANGIÇ",
    title: "Para Enerjisi Aktivasyonu",
    shortTitle: "para ve bolluk",
    href: "/calismalar/para",
    description:
      "Yanıtların, para kazanma, alma, görünür olma, özdeğer ve başarı alanlarında tekrar eden bazı düşünce veya davranış kalıplarının etkili olabileceğini gösteriyor.",
    reason:
      "Bu sonuç; para gelirken tutamama, ücret istemekte zorlanma, görünürlük korkusu, erteleme ve başarıya yaklaşınca geri çekilme yanıtlarının ağırlığına göre oluştu.",
    nextStep:
      "İlk adımın, para ile kurduğun ilişkinin yalnızca kazançtan değil; değer, güvenlik, görünürlük ve alma kapasitesinden de beslendiğini fark etmek olabilir.",
  },
  birebir: {
    eyebrow: "SANA EN YAKIN BAŞLANGIÇ",
    title: "Birebir İçsel Dönüşüm",
    shortTitle: "kişisel dönüşüm",
    href: "/calismalar/birebir-seanslar",
    description:
      "Yanıtların, tek bir alan yerine duygular, aidiyet, sınırlar, geçmiş, bedensel stres ve yön duygusu gibi birden fazla başlığın aynı anda etkili olduğunu gösteriyor.",
    reason:
      "Bu sonuç; ne hissettiğini anlamakta zorlanma, boşluk, yönsüzlük, ait hissedememe, sürekli güçlü durma ve birden fazla alanda zorlanma yanıtlarının ağırlığına göre oluştu.",
    nextStep:
      "İlk adımın, bütün alanları aynı anda çözmeye çalışmak yerine en baskın döngüyü birlikte belirlemek ve kişisel bir yol haritası oluşturmak olabilir.",
  },
};

const formatDetails: Record<
  FormatKey,
  {
    title: string;
    href: string;
    description: string;
  }
> = {
  birebir: {
    title: "Birebir seans",
    href: "/calismalar/birebir-seanslar",
    description:
      "Yanıtların, kişisel ihtiyacına göre şekillenen ve adım adım ilerleyen bir sürecin sana daha uygun olabileceğini gösteriyor.",
  },
  analiz: {
    title: "Tarot veya numeroloji analizi",
    href: "/calismalar/analizler",
    description:
      "Önce mevcut durumunu, yaşam temalarını ve tekrar eden örüntülerini görmek istiyorsun. Analiz çalışmaları iyi bir başlangıç olabilir.",
  },
  digital: {
    title: "Ses kayıtları ve dijital çalışmalar",
    href: "/calismalar/ses-kayitlari",
    description:
      "Kendi zamanında uygulayabileceğin, tekrar dinleyebileceğin ve kişisel ritmine göre ilerleyebileceğin çalışmalar sana daha yakın görünüyor.",
  },
};

const questions: Question[] = [
  {
    id: "main-area",
    eyebrow: "BAŞLANGIÇ NOKTASI",
    title: "Şu anda hayatının en çok hangi alanında destek arıyorsun?",
    helper:
      "En yakın seçeneği işaretle. Sonraki sorular, ihtiyacının altında hangi dinamiklerin olduğunu daha ayrıntılı inceleyecek.",
    mode: "single",
    options: [
      {
        id: "single-love",
        label: "Hayatımda bir ilişki yok, aşka yeniden açılmak istiyorum.",
        scores: { ask: 6, birebir: 1 },
      },
      {
        id: "current-relationship",
        label: "Bir ilişkim var ama aramızdaki bağı dönüştürmek istiyorum.",
        scores: { iliski: 6, birebir: 1 },
      },
      {
        id: "money",
        label: "Para, kazanç ve bolluk alanında sıkışmış hissediyorum.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "many-areas",
        label: "Tek bir alan seçemiyorum, hayatımın birçok alanında zorlanıyorum.",
        scores: { birebir: 6, ask: 1, iliski: 1, para: 1 },
      },
    ],
  },
  {
    id: "recent-experiences",
    eyebrow: "SON ZAMANLARDA",
    title: "Son zamanlarda aşağıdakilerden hangilerini daha sık yaşıyorsun?",
    helper: "Sana uyan en fazla dört seçeneği işaretleyebilirsin.",
    mode: "multiple",
    maxSelections: 4,
    options: [
      {
        id: "same-love-cycle",
        label: "Benzer ilişki hayal kırıklıkları tekrar ediyor.",
        scores: { ask: 3, iliski: 2 },
      },
      {
        id: "relationship-uncertainty",
        label: "İlişkimde ne yapmam gerektiğini kestiremiyorum.",
        scores: { iliski: 4, birebir: 1 },
      },
      {
        id: "money-pressure",
        label: "Para ve gelecek düşüncesi zihnimi fazlasıyla meşgul ediyor.",
        scores: { para: 4, birebir: 1 },
      },
      {
        id: "motivation-loss",
        label: "İsteklerim var ama harekete geçmekte zorlanıyorum.",
        scores: { para: 2, birebir: 3 },
      },
      {
        id: "inner-emptiness",
        label: "Dışarıdan her şey normal görünse de içimde boşluk hissediyorum.",
        scores: { birebir: 4 },
      },
      {
        id: "over-responsible",
        label: "Herkese yetişmeye çalışırken kendimi ihmal ediyorum.",
        scores: { birebir: 3, iliski: 2 },
      },
      {
        id: "not-recognize-self",
        label: "Kendimi eskisi kadar tanıyor veya hissediyor gibi değilim.",
        scores: { birebir: 4 },
      },
      {
        id: "none-recent",
        label: "Bunların hiçbiri bana belirgin biçimde uymuyor.",
        scores: {},
        exclusive: true,
      },
    ],
  },
  {
    id: "dominant-emotion",
    eyebrow: "DUYGUSAL YÜK",
    title: "Son zamanlarda en sık hangi duyguyu yaşıyorsun?",
    mode: "single",
    options: [
      {
        id: "loneliness",
        label: "Yalnızlık ve görülmeme hissi.",
        scores: { ask: 3, birebir: 2 },
      },
      {
        id: "hurt",
        label: "Kırgınlık, öfke veya güvensizlik.",
        scores: { iliski: 3, ask: 2 },
      },
      {
        id: "future-anxiety",
        label: "Kaygı, yetersizlik veya gelecek korkusu.",
        scores: { para: 2, birebir: 3 },
      },
      {
        id: "emptiness",
        label: "Boşluk, yönsüzlük veya kendime yabancılaşma.",
        scores: { birebir: 4 },
      },
      {
        id: "strong",
        label: "Sürekli güçlü durmak zorunda olma hissi.",
        scores: { birebir: 3, iliski: 2 },
      },
      {
        id: "balanced",
        label: "Duygusal olarak genel anlamda dengedeyim.",
        scores: {},
      },
    ],
  },
  {
    id: "love-cycle",
    eyebrow: "AŞK DÖNGÜLERİ",
    title: "Aşk hayatında tekrar eden döngün hangisine daha yakın?",
    mode: "single",
    options: [
      {
        id: "wrong-people",
        label: "Bana uygun olmayan kişilere çekiliyorum.",
        scores: { ask: 4, birebir: 1 },
      },
      {
        id: "does-not-last",
        label: "Başlangıçlar güzel oluyor ama ilişkiler devam etmiyor.",
        scores: { ask: 4 },
      },
      {
        id: "cannot-release",
        label: "Geçmiş ilişkimi zihnimde veya duygusal olarak bırakamıyorum.",
        scores: { ask: 4, birebir: 1 },
      },
      {
        id: "withdraw",
        label: "Birisi yaklaştığında geri çekiliyorum.",
        scores: { ask: 3, birebir: 2 },
      },
      {
        id: "overgive",
        label: "Çok veriyorum ama karşılığını alamıyorum.",
        scores: { ask: 2, iliski: 2, birebir: 1 },
      },
      {
        id: "numb",
        label: "Uzun süredir kimseye karşı bir şey hissedemiyorum.",
        scores: { ask: 3, birebir: 2 },
      },
      {
        id: "alone-in-relationship",
        label: "İlişkideyim ama kendimi yalnız hissediyorum.",
        scores: { iliski: 4, birebir: 1 },
      },
      {
        id: "love-balanced",
        label: "Aşk alanımda belirgin bir tekrar döngüsü görmüyorum.",
        scores: {},
      },
    ],
  },
  {
    id: "relationship",
    eyebrow: "İLİŞKİ DİNAMİĞİ",
    title: "Mevcut bir ilişkin varsa, en çok nerede zorlanıyorsun?",
    helper:
      "Şu anda bir ilişkin yoksa son seçeneği işaretleyebilirsin.",
    mode: "single",
    options: [
      {
        id: "not-understood",
        label: "Kendimi anlatamıyorum veya anlaşılmadığımı hissediyorum.",
        scores: { iliski: 4, birebir: 1 },
      },
      {
        id: "trust",
        label: "Güvenmekte zorlanıyorum.",
        scores: { iliski: 4, ask: 1 },
      },
      {
        id: "carry-all",
        label: "İlişkinin bütün yükünü ben taşıyorum.",
        scores: { iliski: 4, birebir: 1 },
      },
      {
        id: "distance",
        label: "Yakınlık azaldı, aramızda görünmez bir mesafe oluştu.",
        scores: { iliski: 4 },
      },
      {
        id: "same-conflict",
        label: "Aynı sorunları tekrar tekrar yaşıyoruz.",
        scores: { iliski: 4, birebir: 1 },
      },
      {
        id: "boundaries-violated",
        label: "Sınırlarım ihlal ediliyor ama tepki veremiyorum.",
        scores: { iliski: 3, birebir: 2 },
      },
      {
        id: "stay-or-leave",
        label: "Ayrılmak mı devam etmek mi istediğimi bilmiyorum.",
        scores: { iliski: 3, birebir: 3 },
      },
      {
        id: "no-current",
        label: "Şu anda bir ilişkim yok.",
        scores: { ask: 3 },
      },
    ],
  },
  {
    id: "expression",
    eyebrow: "KENDİNİ İFADE ETME",
    title: "Kendini ifade ederken en çok ne yaşıyorsun?",
    mode: "single",
    options: [
      {
        id: "cannot-say",
        label: "Duygularımı söylemekte zorlanıyorum.",
        scores: { birebir: 3, iliski: 2 },
      },
      {
        id: "guilt",
        label: "Söyledikten sonra suçluluk duyuyorum.",
        scores: { birebir: 3, iliski: 1 },
      },
      {
        id: "suppress",
        label: "Karşımdaki kırılmasın diye kendimi bastırıyorum.",
        scores: { iliski: 2, birebir: 3 },
      },
      {
        id: "explode",
        label: "Öfkelendiğimde bir anda patlıyorum.",
        scores: { iliski: 3, birebir: 2 },
      },
      {
        id: "cannot-name",
        label: "Ne hissettiğimi ben de tam anlayamıyorum.",
        scores: { birebir: 4 },
      },
      {
        id: "express-well",
        label: "Kendimi genel olarak açıkça ifade edebiliyorum.",
        scores: {},
      },
    ],
  },
  {
    id: "boundaries",
    eyebrow: "SINIRLAR",
    title: "Sınırlarınla ilgili aşağıdakilerden hangileri sana yakın?",
    helper: "Sana uyan en fazla üç seçeneği işaretleyebilirsin.",
    mode: "multiple",
    maxSelections: 3,
    options: [
      {
        id: "cannot-no",
        label: "Hayır demekte zorlanıyorum.",
        scores: { birebir: 3, iliski: 2 },
      },
      {
        id: "take-responsibility",
        label: "İnsanların sorumluluklarını üstleniyorum.",
        scores: { birebir: 3, iliski: 2 },
      },
      {
        id: "second-chances",
        label: "Bana iyi gelmeyen kişilere tekrar tekrar şans veriyorum.",
        scores: { ask: 2, iliski: 2, birebir: 2 },
      },
      {
        id: "fear-abandonment",
        label: "Sınır koyduğumda terk edilmekten korkuyorum.",
        scores: { ask: 2, iliski: 2, birebir: 2 },
      },
      {
        id: "need-no-one",
        label: "Kimseye ihtiyaç duymuyormuş gibi davranıyorum.",
        scores: { ask: 2, birebir: 3 },
      },
      {
        id: "healthy-boundaries",
        label: "Sınırlarımı genel olarak koruyabiliyorum.",
        scores: {},
        exclusive: true,
      },
    ],
  },
  {
    id: "money-relationship",
    eyebrow: "PARAYLA KURDUĞUN İLİŞKİ",
    title: "Para alanında aşağıdakilerden hangilerini yaşıyorsun?",
    helper: "Sana uyan en fazla üç seçeneği işaretleyebilirsin.",
    mode: "multiple",
    maxSelections: 3,
    options: [
      {
        id: "comes-goes",
        label: "Para geliyor ama hızla gidiyor.",
        scores: { para: 4 },
      },
      {
        id: "must-work-hard",
        label: "Kazanmak için çok çalışmam gerektiğine inanıyorum.",
        scores: { para: 4, birebir: 1 },
      },
      {
        id: "ask-fee",
        label: "Ücret isterken veya hizmetimi satarken utanıyorum.",
        scores: { para: 4, birebir: 1 },
      },
      {
        id: "fear-judgment",
        label: "Para kazanırsam eleştirileceğimden korkuyorum.",
        scores: { para: 3, birebir: 2 },
      },
      {
        id: "never-safe",
        label: "Ne kadar kazansam da güvende hissetmiyorum.",
        scores: { para: 3, birebir: 2 },
      },
      {
        id: "cannot-invest",
        label: "Kendime yatırım yapmakta zorlanıyorum.",
        scores: { para: 3, birebir: 1 },
      },
      {
        id: "postpone",
        label: "Başlamak istediğim işler var ama sürekli erteliyorum.",
        scores: { para: 3, birebir: 2 },
      },
      {
        id: "money-ok",
        label: "Para alanımda ciddi bir sorun hissetmiyorum.",
        scores: {},
        exclusive: true,
      },
    ],
  },
  {
    id: "visibility",
    eyebrow: "GÖRÜNÜRLÜK VE BAŞARI",
    title: "Görünürlük ve başarı konusunda ne hissediyorsun?",
    mode: "single",
    options: [
      {
        id: "fear-failure",
        label: "Başarısız olmaktan çok korkuyorum.",
        scores: { para: 3, birebir: 2 },
      },
      {
        id: "judgment",
        label: "İnsanların beni yargılamasından çekiniyorum.",
        scores: { para: 3, birebir: 2 },
      },
      {
        id: "cannot-show",
        label: "Yeteneklerimi biliyorum ama ortaya koyamıyorum.",
        scores: { para: 4, birebir: 1 },
      },
      {
        id: "cannot-finish",
        label: "Başladığım işleri tamamlamakta zorlanıyorum.",
        scores: { para: 3, birebir: 2 },
      },
      {
        id: "self-sabotage",
        label: "Başarıya yaklaştığımda kendimi geri çekiyorum.",
        scores: { para: 4, birebir: 2 },
      },
      {
        id: "behind",
        label: "Başkaları ilerlediğinde kendimi geride hissediyorum.",
        scores: { para: 2, birebir: 3 },
      },
      {
        id: "visible-ok",
        label: "Görünürlük konusunda genel olarak rahatım.",
        scores: {},
      },
    ],
  },
  {
    id: "body-stress",
    eyebrow: "BEDENSEL STRES SİNYALLERİ",
    title: "Son dönemlerde stresle birlikte artan değişimler fark ettin mi?",
    helper:
      "En fazla dört seçenek işaretleyebilirsin. Bu soru yalnızca stres yükünü anlamaya yardımcı olur; tıbbi değerlendirme veya tanı yerine geçmez.",
    mode: "multiple",
    maxSelections: 4,
    options: [
      {
        id: "sleep",
        label: "Uyku düzenim bozuldu.",
        scores: { birebir: 3 },
      },
      {
        id: "fatigue",
        label: "Sürekli yorgun veya ağır hissediyorum.",
        scores: { birebir: 3 },
      },
      {
        id: "tension",
        label: "Kas gerginliği, baş ağrısı ya da bedensel sıkışma yaşıyorum.",
        scores: { birebir: 3 },
      },
      {
        id: "appetite",
        label: "İştahım veya yeme düzenim değişti.",
        scores: { birebir: 3 },
      },
      {
        id: "alert",
        label: "Kendimi huzursuz ve sürekli tetikte hissediyorum.",
        scores: { birebir: 4 },
      },
      {
        id: "physical-increase",
        label: "Stresli dönemlerde fiziksel şikâyetlerimin arttığını fark ediyorum.",
        scores: { birebir: 4 },
      },
      {
        id: "no-body-change",
        label: "Bedensel olarak belirgin bir değişim yaşamadım.",
        scores: {},
        exclusive: true,
      },
    ],
  },
  {
    id: "belonging",
    eyebrow: "AİDİYET",
    title: "Bir yere ait hissetme konusunda hangisi sana yakın?",
    mode: "single",
    options: [
      {
        id: "not-self-family",
        label: "Ailemin yanında bile kendim gibi hissedemiyorum.",
        scores: { birebir: 4 },
      },
      {
        id: "outsider",
        label: "Girdiğim ortamlarda kendimi dışarıda hissediyorum.",
        scores: { birebir: 4 },
      },
      {
        id: "adapt-self",
        label: "İnsanlara uyum sağlamak için kişiliğimi değiştiriyorum.",
        scores: { birebir: 4, iliski: 1 },
      },
      {
        id: "cannot-connect",
        label: "Yakın ilişkiler kurmakta zorlanıyorum.",
        scores: { ask: 2, birebir: 3 },
      },
      {
        id: "alone-crowd",
        label: "Kalabalıkların içinde bile yalnız hissediyorum.",
        scores: { ask: 1, birebir: 4 },
      },
      {
        id: "belong",
        label: "Kendimi ait hissettiğim insanlar ve alanlar var.",
        scores: {},
      },
    ],
  },
  {
    id: "past",
    eyebrow: "GEÇMİŞİN ETKİSİ",
    title: "Geçmişin bugününü hangi biçimlerde etkiliyor?",
    helper: "Sana uyan en fazla üç seçeneği işaretleyebilirsin.",
    mode: "multiple",
    maxSelections: 3,
    options: [
      {
        id: "old-relationships",
        label: "Eski ilişkilerimi sık sık düşünüyorum.",
        scores: { ask: 4 },
      },
      {
        id: "childhood",
        label: "Çocuklukta yaşadığım olayların etkisini hissediyorum.",
        scores: { birebir: 4 },
      },
      {
        id: "family-pattern",
        label: "Ailemin ilişki veya para kalıplarını tekrar ettiğimi düşünüyorum.",
        scores: { birebir: 2, para: 2, iliski: 2, ask: 1 },
      },
      {
        id: "unresolved",
        label: "Affettiğimi sandığım kişilerle ilgili duygularım hâlâ yoğun.",
        scores: { ask: 2, iliski: 2, birebir: 2 },
      },
      {
        id: "past-failure",
        label: "Geçmişteki başarısızlıklar yeni adımlarımı engelliyor.",
        scores: { para: 3, birebir: 2 },
      },
      {
        id: "balanced-past",
        label: "Geçmişimle daha dengeli bir ilişkim var.",
        scores: {},
        exclusive: true,
      },
    ],
  },
  {
    id: "inner-state",
    eyebrow: "İÇSEL ENERJİ VE YÖN",
    title: "İçsel durumunu en iyi hangi ifade anlatıyor?",
    mode: "single",
    options: [
      {
        id: "drained",
        label: "Enerjim düşük; dinlensem de toparlanmış hissetmiyorum.",
        scores: { birebir: 4 },
      },
      {
        id: "scattered",
        label: "Zihnim ve enerjim dağınık; neye odaklanacağımı bilmiyorum.",
        scores: { birebir: 4, para: 1 },
      },
      {
        id: "numb-inside",
        label: "Ne istediğimi ve ne hissettiğimi duymakta zorlanıyorum.",
        scores: { birebir: 5 },
      },
      {
        id: "hypervigilant",
        label: "Sürekli bir şey olacakmış gibi tetikteyim.",
        scores: { birebir: 5, iliski: 1 },
      },
      {
        id: "direction",
        label: "Bir yönüm var ama eski alışkanlıklar beni geri çekiyor.",
        scores: { birebir: 2, para: 2, ask: 1, iliski: 1 },
      },
      {
        id: "inner-balanced",
        label: "İçsel olarak genel anlamda dengedeyim.",
        scores: {},
      },
    ],
  },
  {
    id: "work-format",
    eyebrow: "ÇALIŞMA BİÇİMİ",
    title: "Nasıl bir çalışma biçimi sana daha uygun?",
    mode: "single",
    options: [
      {
        id: "personal-process",
        label: "Bana özel ilerleyen birebir bir süreç istiyorum.",
        formatScores: { birebir: 5 },
        scores: { birebir: 1 },
      },
      {
        id: "see-first",
        label: "Önce tarot veya numeroloji analiziyle durumumu görmek istiyorum.",
        formatScores: { analiz: 5 },
      },
      {
        id: "own-time",
        label: "Kendi zamanımda uygulayabileceğim ses kayıtları istiyorum.",
        formatScores: { digital: 5 },
      },
      {
        id: "unsure-format",
        label: "Çalışma biçiminden emin değilim; yönlendirilmek istiyorum.",
        formatScores: { birebir: 3, analiz: 2, digital: 1 },
        scores: { birebir: 1 },
      },
    ],
  },
  {
    id: "need",
    eyebrow: "İLK İHTİYAÇ",
    title: "Şu an en çok neye ihtiyacın olduğunu düşünüyorsun?",
    mode: "single",
    options: [
      {
        id: "new-love",
        label: "Geçmişi bırakıp yeni bir aşka hazırlanmak.",
        scores: { ask: 6 },
      },
      {
        id: "relationship-trust",
        label: "Mevcut ilişkimde iletişim ve güveni güçlendirmek.",
        scores: { iliski: 6 },
      },
      {
        id: "money-worth",
        label: "Özdeğerimi ve para alma kapasitemi geliştirmek.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "understand-self",
        label: "Kendimi, duygularımı ve tekrar eden döngülerimi anlamak.",
        scores: { birebir: 6 },
      },
      {
        id: "balance",
        label: "Enerjimi toparlamak ve içsel olarak yeniden dengelenmek.",
        scores: { birebir: 6 },
      },
      {
        id: "choose-together",
        label: "Nereden başlayacağımı birlikte belirlemek.",
        scores: { birebir: 6, ask: 1, iliski: 1, para: 1 },
      },
    ],
  },
];



questions.push(
  {
    id: "ask-attraction-pattern",
    chapter: "ÇEKİM DÖNGÜSÜ",
    why:
      "İlişkide tekrar eden döngü çoğu zaman ayrılıkta değil, ilk çekimde başlar. Kime çekildiğin, hangi duygusal zeminin tanıdık geldiğini gösterir.",
    eyebrow: "KİME ÇEKİLİYORSUN?",
    title: "Seni en çok çeken kişi profili hangisine daha yakın?",
    helper: "İlk aklına gelen, en tanıdık seçeneği işaretle.",
    mode: "single",
    options: [
      {
        id: "ask-unavailable",
        label: "Duygusal olarak ulaşılması zor veya kararsız kişiler.",
        scores: { ask: 5, birebir: 1 },
      },
      {
        id: "ask-intense",
        label: "Başlangıçta çok yoğun ilgi gösteren kişiler.",
        scores: { ask: 4 },
      },
      {
        id: "ask-rescue",
        label: "Sorunları olan ve desteğe ihtiyaç duyan kişiler.",
        scores: { ask: 4, birebir: 2 },
      },
      {
        id: "ask-prove",
        label: "Beni seçmesi için kendimi kanıtlamam gereken kişiler.",
        scores: { ask: 5, birebir: 1 },
      },
      {
        id: "ask-stable",
        label: "Tutarlı ve açık kişiler güvenli geliyor ama çekim yaratmıyor.",
        scores: { ask: 4, birebir: 1 },
      },
      {
        id: "ask-healthy-attraction",
        label: "Duygusal olarak erişilebilir ve tutarlı kişilere çekiliyorum.",
        scores: { ask: 1 },
      },
    ],
  },
  {
    id: "ask-interest-response",
    chapter: "YAKINLIKLA KARŞILAŞMA",
    why:
      "Birinin yaklaşmasına verdiğin ilk iç tepki, aşk isteğinin yanında çalışan korunma biçimini gösterir.",
    eyebrow: "BİRİSİ YAKLAŞTIĞINDA",
    title: "Birisi sana gerçekten ilgi gösterdiğinde ilk iç tepkin ne oluyor?",
    helper: "Dışarıdan ne yaptığından çok, içeride ilk ne hissettiğine odaklan.",
    mode: "single",
    options: [
      {
        id: "ask-suspicious",
        label: "Niyetinden şüphe ediyor, bir sorun arıyorum.",
        scores: { ask: 5, birebir: 1 },
      },
      {
        id: "ask-idealize",
        label: "Hızla umutlanıyor ve kişiye olduğundan fazla anlam yüklüyorum.",
        scores: { ask: 4 },
      },
      {
        id: "ask-pull-away",
        label: "İlgim olsa bile bir anda geri çekilmek istiyorum.",
        scores: { ask: 5, birebir: 2 },
      },
      {
        id: "ask-perform",
        label: "Beni beğenmesi için daha kusursuz görünmeye çalışıyorum.",
        scores: { ask: 5, birebir: 1 },
      },
      {
        id: "ask-observe",
        label: "Heyecanlansam da davranışlarını zamana yayarak gözlemleyebiliyorum.",
        scores: { ask: 1 },
      },
    ],
  },
  {
    id: "ask-receiving-love",
    chapter: "SEVGİYİ ALMAK",
    why:
      "Sevgi vermek kadar sevgiyi kabul etmek de ilişkinin dengesini belirler. Alma kapasitesi düşük olduğunda karşılıklılık bozulabilir.",
    eyebrow: "KARŞILIKLILIK",
    title: "Sevgi, ilgi ve destek sana geldiğinde ne oluyor?",
    helper: "Sana en yakın cevabı seç.",
    mode: "single",
    options: [
      {
        id: "ask-owe",
        label: "Karşılığını hemen vermem gerekiyormuş gibi hissediyorum.",
        scores: { ask: 4, birebir: 2 },
      },
      {
        id: "ask-uncomfortable-love",
        label: "İlgi gördüğümde utanıyor veya rahatsız oluyorum.",
        scores: { ask: 4, birebir: 2 },
      },
      {
        id: "ask-proof",
        label: "Söylenene inanmıyor, sürekli daha fazla kanıt arıyorum.",
        scores: { ask: 5 },
      },
      {
        id: "ask-distant-when-loved",
        label: "İlgi geldiğinde uzaklaşıyor, gidince özlüyorum.",
        scores: { ask: 5, birebir: 1 },
      },
      {
        id: "ask-receive-well",
        label: "Sevgiyi ve desteği suçluluk duymadan kabul edebiliyorum.",
        scores: { ask: 1 },
      },
    ],
  },
  {
    id: "ask-family-model",
    chapter: "AŞKIN İLK MODELİ",
    why:
      "Yakınlık, güven ve sevginin nasıl gösterildiğine dair ilk öğrenmeler aile ortamında oluşur. Bu soru suçlu aramak için değil, tanıdık ilişki dilini görmek için var.",
    eyebrow: "AİLE VE BAĞLANMA",
    title: "Çocukken sevgi ve ilişki hakkında en çok ne öğrendin?",
    helper: "Açıkça söylenen veya davranışlarla öğretilen mesaja odaklan.",
    mode: "single",
    options: [
      {
        id: "ask-love-earned",
        label: "Sevgi görmek için uslu, başarılı veya faydalı olmak gerekiyordu.",
        scores: { ask: 5, birebir: 2 },
      },
      {
        id: "ask-unstable-home",
        label: "Sevgi vardı ama ortam sık sık gergin veya öngörülemezdi.",
        scores: { ask: 5, birebir: 2 },
      },
      {
        id: "ask-emotions-unspoken",
        label: "Duygular vardı ama açıkça konuşulmazdı.",
        scores: { ask: 4, birebir: 2 },
      },
      {
        id: "ask-distance-normal",
        label: "Mesafe, sessizlik veya sevgiyi göstermemek normaldi.",
        scores: { ask: 4, birebir: 2 },
      },
      {
        id: "ask-family-healthy",
        label: "Sevgi, sınır ve iletişim konusunda genel olarak sağlıklı bir model gördüm.",
        scores: { ask: 1 },
      },
    ],
  },
  {
    id: "ask-readiness",
    chapter: "AŞKA HAZIRLIK",
    why:
      "İlişki istemek ile ilişkiye duygusal, zamansal ve davranışsal alan açabilmek aynı şey değildir.",
    eyebrow: "BUGÜNKÜ GERÇEKLİK",
    title: "Yeni bir ilişki için hayatında ne kadar alan var?",
    helper: "İdeal cevabı değil, bugünkü gerçekliğini seç.",
    mode: "single",
    options: [
      {
        id: "ask-no-space",
        label: "İstiyorum ama hayatımda duygusal veya zamansal alan çok az.",
        scores: { ask: 3, birebir: 3 },
      },
      {
        id: "ask-space-fear",
        label: "Alanım var ama yeniden incinmekten korkuyorum.",
        scores: { ask: 5 },
      },
      {
        id: "ask-space-unsure",
        label: "Alanım var; fakat kimi ve neyi istediğim net değil.",
        scores: { ask: 3, birebir: 2 },
      },
      {
        id: "ask-space-ready",
        label: "Hem duygusal hem gündelik hayatımda ilişkiye alan açmaya hazırım.",
        scores: { ask: 2 },
      },
    ],
  },
  {
    id: "rel-conflict-cycle",
    chapter: "TARTIŞMA DÖNGÜSÜ",
    why:
      "İlişkiyi yoran çoğu zaman sorun değil, sorun ortaya çıktığında iki kişinin birbirine nasıl tepki verdiğidir.",
    eyebrow: "SORUN ÇIKTIĞINDA",
    title: "Bir sorun çıktığında aranızdaki döngü nasıl ilerliyor?",
    helper: "Tartışmanın konusundan çok, karşılıklı tepki biçimine odaklan.",
    mode: "single",
    options: [
      {
        id: "rel-pursue-withdraw",
        label: "Birimiz konuşmak istiyor, diğerimiz geri çekiliyor.",
        scores: { iliski: 5, birebir: 1 },
      },
      {
        id: "rel-explode-silence",
        label: "Birimiz patlıyor, diğerimiz susuyor.",
        scores: { iliski: 5, birebir: 2 },
      },
      {
        id: "rel-logic-emotion",
        label: "Birimiz mantık anlatıyor, diğerimiz anlaşılmadığını hissediyor.",
        scores: { iliski: 4, birebir: 1 },
      },
      {
        id: "rel-no-resolution",
        label: "Konuşuyoruz ama gerçek bir çözüme ulaşmadan konu kapanıyor.",
        scores: { iliski: 5 },
      },
      {
        id: "rel-repair-well",
        label: "Zorlansak da konuşup onarabiliyoruz.",
        scores: { iliski: 1 },
      },
    ],
  },
  {
    id: "rel-trust-depth",
    chapter: "GÜVEN",
    why:
      "Güven yalnızca sadakat değildir; söz, davranış, şeffaflık ve duygusal erişilebilirlik de güvenin parçalarıdır.",
    eyebrow: "İÇ ALARM",
    title: "İlişkide güven duygun en çok nerede zorlanıyor?",
    helper: "En baskın olan seçeneği işaretle.",
    mode: "single",
    options: [
      {
        id: "rel-past-betrayal",
        label: "Geçmişte yaşanan bir ihanet veya yalan hâlâ etkiliyor.",
        scores: { iliski: 6, birebir: 1 },
      },
      {
        id: "rel-inconsistent",
        label: "Söylediği ile yaptığı sık sık birbirini tutmuyor.",
        scores: { iliski: 6, birebir: 1 },
      },
      {
        id: "rel-emotionally-absent",
        label: "Yanımda olsa da duygusal olarak ulaşamıyorum.",
        scores: { iliski: 5 },
      },
      {
        id: "rel-my-past",
        label: "Şimdiki ilişkiden çok geçmiş deneyimlerim nedeniyle güvenemiyorum.",
        scores: { iliski: 4, birebir: 3 },
      },
      {
        id: "rel-trust-ok",
        label: "Güven konusunda belirgin bir sorun yaşamıyorum.",
        scores: { iliski: 1 },
      },
    ],
  },
  {
    id: "rel-intimacy",
    chapter: "YAKINLIK",
    why:
      "Yakınlık yalnızca fiziksel temas değil; merak edilmek, paylaşmak ve duygusal olarak erişilebilir olmaktır.",
    eyebrow: "BİRBİRİNİZE ULAŞMAK",
    title: "Duygusal ve fiziksel yakınlık konusunda ne yaşıyorsunuz?",
    helper: "İlişkinizin bugünkü hâline en yakın olanı seç.",
    mode: "single",
    options: [
      {
        id: "rel-emotional-distance",
        label: "Konuşuyoruz ama derin duygularımızı paylaşmıyoruz.",
        scores: { iliski: 5 },
      },
      {
        id: "rel-physical-distance",
        label: "Fiziksel yakınlık ve çekim belirgin biçimde azaldı.",
        scores: { iliski: 5 },
      },
      {
        id: "rel-roommates",
        label: "İlişkiden çok aynı hayatı yöneten iki kişi gibiyiz.",
        scores: { iliski: 6 },
      },
      {
        id: "rel-one-reaches",
        label: "Yakınlık kurmaya daha çok bir taraf çabalıyor.",
        scores: { iliski: 5, birebir: 1 },
      },
      {
        id: "rel-intimacy-ok",
        label: "Yakınlık alanımız genel olarak canlı ve dengeli.",
        scores: { iliski: 1 },
      },
    ],
  },
  {
    id: "rel-hidden-load",
    chapter: "YÜK PAYLAŞIMI",
    why:
      "Planlamak, hatırlatmak, sakinleştirmek, barışmayı başlatmak ve sorunları çözmek de ilişki emeğidir.",
    eyebrow: "KİM NEYİ TAŞIYOR?",
    title: "İlişkinin görünmeyen yükü nasıl dağılıyor?",
    helper: "Sana uyan en fazla üç seçeneği işaretleyebilirsin.",
    mode: "multiple",
    maxSelections: 3,
    options: [
      {
        id: "rel-emotional-manager",
        label: "İlişkinin duygusal havasını çoğunlukla ben düzenliyorum.",
        scores: { iliski: 5, birebir: 2 },
      },
      {
        id: "rel-practical-manager",
        label: "Planlama, takip ve günlük sorumlulukların çoğu bende.",
        scores: { iliski: 5, birebir: 1 },
      },
      {
        id: "rel-repair-manager",
        label: "Tartışma sonrası barışmayı ve konuşmayı hep ben başlatıyorum.",
        scores: { iliski: 5 },
      },
      {
        id: "rel-partner-caretaker",
        label: "Partnerimin duygularından kendimi sorumlu hissediyorum.",
        scores: { iliski: 4, birebir: 3 },
      },
      {
        id: "rel-shared-load",
        label: "Yükü genel olarak paylaşabildiğimizi düşünüyorum.",
        scores: { iliski: 1 },
        exclusive: true,
      },
    ],
  },
  {
    id: "rel-repair",
    chapter: "KIRGINLIK VE ONARIM",
    why:
      "Affetmek ile konuyu konuşmadan kapatmak aynı şey değildir. Çözülmemiş kırgınlık bugünkü küçük olaylara geçmişin ağırlığını ekleyebilir.",
    eyebrow: "KAPANMAYAN DOSYALAR",
    title: "Geçmişte yaşanan sorunlar gerçekten kapandı mı?",
    helper: "Sana en yakın cevabı seç.",
    mode: "single",
    options: [
      {
        id: "rel-no-apology",
        label: "Özür veya gerçek bir telafi görmediğim için hâlâ içimde taşıyorum.",
        scores: { iliski: 6 },
      },
      {
        id: "rel-forgave-but",
        label: "Affettiğimi söyledim ama davranışlarımda hâlâ çıkıyor.",
        scores: { iliski: 5, birebir: 1 },
      },
      {
        id: "rel-repeat-harm",
        label: "Aynı davranış tekrar ettiği için konu hiç kapanmıyor.",
        scores: { iliski: 6 },
      },
      {
        id: "rel-avoid-topic",
        label: "Tartışma çıkmasın diye konuyu bir daha açmıyoruz.",
        scores: { iliski: 5, birebir: 2 },
      },
      {
        id: "rel-repaired",
        label: "Zor konuları konuşup onarabildiğimizi düşünüyorum.",
        scores: { iliski: 1 },
      },
    ],
  },
  {
    id: "money-family-belief",
    chapter: "İLK PARA HİKÂYESİ",
    why:
      "Para güvenliği, başarı ve ücret isteme biçimi çocuklukta duyulan ve davranışlarla öğrenilen mesajlardan etkilenebilir.",
    eyebrow: "AİLEDEN GELEN CÜMLE",
    title: "Çocukluğunda para hakkında en çok hangi mesajı aldın?",
    helper: "Ailende açıkça söylenen veya davranışlarla öğretilen mesajı seç.",
    mode: "single",
    options: [
      {
        id: "money-hard-earned",
        label: "Para çok zor kazanılır; rahat kazanılan para güvenilmezdir.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "money-never-enough",
        label: "Ne kadar olursa olsun yetmez; her an bir şey çıkabilir.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "money-rich-bad",
        label: "Çok para insanı bozar veya insanlardan uzaklaştırır.",
        scores: { para: 5, birebir: 1 },
      },
      {
        id: "money-do-not-ask",
        label: "Para konuşmak, ücret istemek veya hesap yapmak ayıptır.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "money-family-balanced",
        label: "Para hakkında genel olarak dengeli ve gerçekçi bir model gördüm.",
        scores: { para: 1 },
      },
    ],
  },
  {
    id: "money-receiving",
    chapter: "ALMA KAPASİTESİ",
    why:
      "Bazı kişiler fırsat yaratmakta değil, fırsat geldiğinde onu kabul etmekte, tutmakta veya karşılığını istemekte zorlanır.",
    eyebrow: "PARA GELDİĞİNDE",
    title: "Para, fırsat veya destek sana geldiğinde ne yapıyorsun?",
    helper: "En tanıdık olan cevabı seç.",
    mode: "single",
    options: [
      {
        id: "money-discount",
        label: "Ücretimi düşürüyor veya hemen indirim yapıyorum.",
        scores: { para: 6 },
      },
      {
        id: "money-overdeliver",
        label: "Aldığım parayı hak etmek için fazlasını vermeye çalışıyorum.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "money-spend-fast",
        label: "Para geldiğinde tutmakta zorlanıyor, hızla harcıyorum.",
        scores: { para: 5 },
      },
      {
        id: "money-reject-help",
        label: "Destek veya fırsat geldiğinde tek başıma yapmalıyım diye geri çeviriyorum.",
        scores: { para: 5, birebir: 2 },
      },
      {
        id: "money-receive-well",
        label: "Geleni suçluluk duymadan kabul edip yönetebiliyorum.",
        scores: { para: 1 },
      },
    ],
  },
  {
    id: "money-pricing",
    chapter: "EMEĞİNİN DEĞERİ",
    why:
      "Kazanç artışını engelleyen şey bazen talep değil, ücret söyleme ve alma sırasında oluşan utanç, suçluluk veya reddedilme korkusudur.",
    eyebrow: "ÜCRET SÖYLEMEK",
    title: "Emeğinin karşılığını isterken en çok ne yaşıyorsun?",
    helper: "Ücretli bir işin yoksa, yeteneğini veya emeğini sunma biçimini düşün.",
    mode: "single",
    options: [
      {
        id: "money-apologize-price",
        label: "Ücreti söylerken açıklama veya özür ekleme ihtiyacı hissediyorum.",
        scores: { para: 6 },
      },
      {
        id: "money-fear-expensive",
        label: "Pahalı bulunmaktan ve reddedilmekten korkuyorum.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "money-compare-price",
        label: "Başkalarının fiyatına bakıp kendi değerimi düşürüyorum.",
        scores: { para: 5, birebir: 1 },
      },
      {
        id: "money-free-work",
        label: "Ücretsiz veya karşılıksız emek vermeyi sıklaştırıyorum.",
        scores: { para: 5, birebir: 2 },
      },
      {
        id: "money-price-clear",
        label: "Ücretimi açıkça söyleyip sınırlarımı koruyabiliyorum.",
        scores: { para: 1 },
      },
    ],
  },
  {
    id: "money-opportunity",
    chapter: "FİKİRDEN HAREKETE",
    why:
      "Niyet ile davranış arasındaki kopuşun nerede oluştuğu, para alanında hangi başlangıcın daha doğru olduğunu gösterir.",
    eyebrow: "BİR FIRSAT GELDİĞİNDE",
    title: "Kazanç yaratacak bir fikir geldiğinde süreç genellikle nasıl ilerliyor?",
    helper: "Seni en iyi anlatan seçeneği işaretle.",
    mode: "single",
    options: [
      {
        id: "money-research-loop",
        label: "Araştırma ve eğitim sürecinde kalıyor, uygulamayı erteliyorum.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "money-start-drop",
        label: "Heyecanla başlıyor ama sürdüremiyorum.",
        scores: { para: 5, birebir: 1 },
      },
      {
        id: "money-many-ideas",
        label: "Çok fazla fikir arasında dağılıyor ve birini seçemiyorum.",
        scores: { para: 4, birebir: 3 },
      },
      {
        id: "money-fear-launch",
        label: "Yayınlama, satış veya teklif aşamasına gelince geri çekiliyorum.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "money-consistent",
        label: "Küçük de olsa düzenli ve sürdürülebilir adım atabiliyorum.",
        scores: { para: 1 },
      },
    ],
  },
  {
    id: "money-success-identity",
    chapter: "BAŞARI KİMLİĞİ",
    why:
      "Bazı geri çekilmeler başarısızlık korkusundan değil, başarının getireceği sorumluluk, görünürlük ve yeni kimlikten kaynaklanır.",
    eyebrow: "BÜYÜME EŞİĞİ",
    title: "Başarılı olma ihtimali gerçek olduğunda en çok ne düşündürür?",
    helper: "İlk aklına gelen korkuyu seç.",
    mode: "single",
    options: [
      {
        id: "money-more-responsibility",
        label: "Daha çok sorumluluk ve yük taşımam gerekecek.",
        scores: { para: 5, birebir: 2 },
      },
      {
        id: "money-lose-people",
        label: "Çevremle aram açılabilir veya yalnız kalabilirim.",
        scores: { para: 5, birebir: 2 },
      },
      {
        id: "money-cannot-maintain",
        label: "Başarıyı sürdüremem ve sonra düşerim.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "money-more-criticism",
        label: "Daha görünür olur ve daha çok eleştirilirim.",
        scores: { para: 6, birebir: 1 },
      },
      {
        id: "money-success-open",
        label: "Büyümenin getireceği değişime hazırlanabileceğimi düşünüyorum.",
        scores: { para: 1 },
      },
    ],
  },
  {
    id: "self-identity-depth",
    chapter: "KİMLİK",
    why:
      "Eski kimliğin artık sana uymaması ile kendini tamamen kaybetmiş olmak aynı şey değildir. Bu ayrım yönlendirmeyi değiştirir.",
    eyebrow: "ESKİ SEN, YENİ SEN",
    title: "Kendinle ilgili en çok hangi değişimi fark ediyorsun?",
    helper: "Bugünkü iç hâline en yakın olanı seç.",
    mode: "single",
    options: [
      {
        id: "self-old-life-no-fit",
        label: "Eskiden istediğim hayat artık bana uymuyor.",
        scores: { birebir: 6 },
      },
      {
        id: "self-roles-only",
        label: "Kendimi daha çok rollerimle tanımlıyorum; ben kimim bilmiyorum.",
        scores: { birebir: 6 },
      },
      {
        id: "self-adapt-everywhere",
        label: "Her ortamda farklı biri oluyorum.",
        scores: { birebir: 6 },
      },
      {
        id: "self-lost-desire",
        label: "Ne istediğimi duymakta zorlanıyorum.",
        scores: { birebir: 6 },
      },
      {
        id: "self-identity-clear",
        label: "Kim olduğum ve ne istediğim konusunda genel olarak netim.",
        scores: { birebir: 1 },
      },
    ],
  },
  {
    id: "self-belonging-depth",
    chapter: "AİDİYET",
    why:
      "Aidiyet yalnızca bir ortamda bulunmak değil, kendini saklamadan bağ kurabilmektir.",
    eyebrow: "KENDİN OLARAK VAR OLMAK",
    title: "Bir yere ait hissetme konusunda ne yaşıyorsun?",
    helper: "Sana en yakın cevabı seç.",
    mode: "single",
    options: [
      {
        id: "self-family-not-self",
        label: "Ailemin yanında bile tamamen kendim olamıyorum.",
        scores: { birebir: 6 },
      },
      {
        id: "self-outsider",
        label: "Girdiğim ortamlarda kendimi dışarıda hissediyorum.",
        scores: { birebir: 6 },
      },
      {
        id: "self-shape-shift",
        label: "Kabul edilmek için kişiliğimi değiştiriyorum.",
        scores: { birebir: 6 },
      },
      {
        id: "self-crowd-alone",
        label: "Kalabalıkların içinde bile yalnız hissediyorum.",
        scores: { birebir: 6 },
      },
      {
        id: "self-belong-balanced",
        label: "Kendimi ait hissettiğim insanlar ve alanlar var.",
        scores: { birebir: 1 },
      },
    ],
  },
  {
    id: "self-role",
    chapter: "GÖRÜNMEYEN YÜK",
    why:
      "Sürekli güçlü, çözen veya sakinleştiren kişi olmak kendi ihtiyaçlarınla bağı zayıflatabilir.",
    eyebrow: "HERKESİ TAŞIMAK",
    title: "Başkalarının hayatında hangi rolü daha çok üstleniyorsun?",
    helper: "Sana uyan en fazla iki seçeneği işaretleyebilirsin.",
    mode: "multiple",
    maxSelections: 2,
    options: [
      {
        id: "self-problem-solver",
        label: "Sorunları çözen ve herkesi toparlayan kişi.",
        scores: { birebir: 6 },
      },
      {
        id: "self-emotional-container",
        label: "Herkesin duygusunu dinleyen ve taşıyan kişi.",
        scores: { birebir: 6 },
      },
      {
        id: "self-peacekeeper",
        label: "Çatışma çıkmasın diye ortamı düzenleyen kişi.",
        scores: { birebir: 5 },
      },
      {
        id: "self-invisible-helper",
        label: "Yardım eden ama ihtiyaç duyduğunda kimseye söylemeyen kişi.",
        scores: { birebir: 6 },
      },
      {
        id: "self-shared-responsibility",
        label: "Sorumlulukları genel olarak ayırabiliyorum.",
        scores: { birebir: 1 },
        exclusive: true,
      },
    ],
  },
  {
    id: "self-daily-impact",
    chapter: "GÜNLÜK HAYAT",
    why:
      "İçsel zorlanmanın günlük yaşama etkisi, ihtiyaç duyulan destek düzeyini ve başlangıç biçimini belirlemeye yardımcı olur.",
    eyebrow: "İŞLEV VE ENERJİ",
    title: "İçsel zorlanman günlük hayatını en çok nerede etkiliyor?",
    helper: "Sana uyan en fazla üç seçeneği işaretleyebilirsin.",
    mode: "multiple",
    maxSelections: 3,
    options: [
      {
        id: "self-focus",
        label: "Odaklanmak ve işleri tamamlamakta zorlanıyorum.",
        scores: { birebir: 5 },
      },
      {
        id: "self-social-withdraw",
        label: "İnsanlardan uzaklaşıyor ve içime kapanıyorum.",
        scores: { birebir: 5 },
      },
      {
        id: "self-motivation",
        label: "Eskiden keyif aldığım şeylere karşı isteğim azaldı.",
        scores: { birebir: 5 },
      },
      {
        id: "self-routine",
        label: "Uyku, düzen ve günlük rutinleri sürdürmek zor geliyor.",
        scores: { birebir: 6 },
      },
      {
        id: "self-daily-balanced",
        label: "Günlük işlevlerimi genel olarak sürdürebiliyorum.",
        scores: { birebir: 1 },
        exclusive: true,
      },
    ],
  },
  {
    id: "self-direction-depth",
    chapter: "YÖN",
    why:
      "Yönsüzlük bazen seçenek azlığından değil, kendi isteğini duyamamaktan veya seçimin sonucundan korkmaktan doğar.",
    eyebrow: "SONRAKİ ADIM",
    title: "Hayatının yönüyle ilgili en çok hangi noktada zorlanıyorsun?",
    helper: "Bugünkü karar eşiğini en iyi anlatan seçeneği seç.",
    mode: "single",
    options: [
      {
        id: "self-too-many-paths",
        label: "Çok fazla seçenek var; hangisinin bana ait olduğunu bilmiyorum.",
        scores: { birebir: 6 },
      },
      {
        id: "self-know-afraid",
        label: "Ne istediğimi biliyorum ama sonuçlarından korkuyorum.",
        scores: { birebir: 6 },
      },
      {
        id: "self-others-life",
        label: "Başkalarının beklentilerine göre bir hayat kurduğumu fark ediyorum.",
        scores: { birebir: 6 },
      },
      {
        id: "self-no-energy",
        label: "Yönüm olabilir ama adım atacak enerjim yok.",
        scores: { birebir: 6 },
      },
      {
        id: "self-direction-clear",
        label: "Yönüm genel olarak net; uygulama ve süreklilik desteği istiyorum.",
        scores: { birebir: 2 },
      },
    ],
  }
);

type SelectedArea = "ask" | "iliski" | "para" | "birebir";

const selectedAreaByOptionId: Record<string, SelectedArea> = {
  "single-love": "ask",
  "current-relationship": "iliski",
  money: "para",
  "many-areas": "birebir",
};

const questionPaths: Record<SelectedArea, string[]> = {
  ask: [
    "main-area",
    "recent-experiences",
    "dominant-emotion",
    "ask-attraction-pattern",
    "ask-interest-response",
    "love-cycle",
    "ask-receiving-love",
    "expression",
    "boundaries",
    "ask-family-model",
    "body-stress",
    "belonging",
    "past",
    "inner-state",
    "ask-readiness",
    "work-format",
    "need",
  ],
  iliski: [
    "main-area",
    "recent-experiences",
    "dominant-emotion",
    "relationship",
    "rel-conflict-cycle",
    "rel-trust-depth",
    "rel-intimacy",
    "rel-hidden-load",
    "rel-repair",
    "expression",
    "boundaries",
    "body-stress",
    "belonging",
    "past",
    "inner-state",
    "work-format",
    "need",
  ],
  para: [
    "main-area",
    "recent-experiences",
    "dominant-emotion",
    "money-family-belief",
    "money-relationship",
    "money-receiving",
    "money-pricing",
    "visibility",
    "money-opportunity",
    "money-success-identity",
    "expression",
    "boundaries",
    "body-stress",
    "past",
    "inner-state",
    "work-format",
    "need",
  ],
  birebir: [
    "main-area",
    "recent-experiences",
    "dominant-emotion",
    "self-identity-depth",
    "self-belonging-depth",
    "self-role",
    "expression",
    "boundaries",
    "body-stress",
    "past",
    "self-daily-impact",
    "inner-state",
    "self-direction-depth",
    "work-format",
    "need",
  ],
};

const visibleOptionIds: Partial<
  Record<string, Partial<Record<SelectedArea, string[]>>>
> = {
  "recent-experiences": {
    ask: [
      "same-love-cycle",
      "inner-emptiness",
      "over-responsible",
      "not-recognize-self",
      "none-recent",
    ],
    iliski: [
      "same-love-cycle",
      "relationship-uncertainty",
      "inner-emptiness",
      "over-responsible",
      "not-recognize-self",
      "none-recent",
    ],
    para: [
      "money-pressure",
      "motivation-loss",
      "inner-emptiness",
      "over-responsible",
      "not-recognize-self",
      "none-recent",
    ],
    birebir: [
      "motivation-loss",
      "inner-emptiness",
      "over-responsible",
      "not-recognize-self",
      "none-recent",
    ],
  },
  "dominant-emotion": {
    ask: [
      "loneliness",
      "hurt",
      "future-anxiety",
      "emptiness",
      "strong",
      "balanced",
    ],
    iliski: [
      "hurt",
      "loneliness",
      "future-anxiety",
      "emptiness",
      "strong",
      "balanced",
    ],
    para: [
      "future-anxiety",
      "emptiness",
      "strong",
      "balanced",
    ],
    birebir: [
      "loneliness",
      "hurt",
      "future-anxiety",
      "emptiness",
      "strong",
      "balanced",
    ],
  },
  boundaries: {
    ask: [
      "cannot-no",
      "take-responsibility",
      "second-chances",
      "fear-abandonment",
      "need-no-one",
      "healthy-boundaries",
    ],
    iliski: [
      "cannot-no",
      "take-responsibility",
      "second-chances",
      "fear-abandonment",
      "need-no-one",
      "healthy-boundaries",
    ],
    para: [
      "cannot-no",
      "take-responsibility",
      "need-no-one",
      "healthy-boundaries",
    ],
    birebir: [
      "cannot-no",
      "take-responsibility",
      "second-chances",
      "fear-abandonment",
      "need-no-one",
      "healthy-boundaries",
    ],
  },
  past: {
    ask: [
      "old-relationships",
      "childhood",
      "family-pattern",
      "unresolved",
      "balanced-past",
    ],
    iliski: [
      "old-relationships",
      "childhood",
      "family-pattern",
      "unresolved",
      "balanced-past",
    ],
    para: [
      "childhood",
      "family-pattern",
      "past-failure",
      "balanced-past",
    ],
    birebir: [
      "childhood",
      "family-pattern",
      "unresolved",
      "past-failure",
      "balanced-past",
    ],
  },
  need: {
    ask: [
      "new-love",
      "understand-self",
      "balance",
      "choose-together",
    ],
    iliski: [
      "relationship-trust",
      "understand-self",
      "balance",
      "choose-together",
    ],
    para: [
      "money-worth",
      "understand-self",
      "balance",
      "choose-together",
    ],
    birebir: [
      "understand-self",
      "balance",
      "choose-together",
    ],
  },
};

const optionLabelOverrides: Partial<
  Record<
    string,
    Partial<Record<SelectedArea, Partial<Record<string, string>>>>
  >
> = {
  past: {
    ask: {
      "family-pattern":
        "Ailemin ilişki ve bağlanma kalıplarını tekrar ettiğimi düşünüyorum.",
    },
    iliski: {
      "family-pattern":
        "Ailemin ilişki ve iletişim kalıplarını tekrar ettiğimi düşünüyorum.",
    },
    para: {
      "family-pattern":
        "Ailemin para, güvenlik ve başarı kalıplarını tekrar ettiğimi düşünüyorum.",
    },
    birebir: {
      "family-pattern":
        "Ailemden öğrendiğim bazı kalıpları bugün de tekrar ettiğimi düşünüyorum.",
    },
  },
};

function getSelectedArea(answers: Answers): SelectedArea | null {
  const selectedOptionId = answers["main-area"]?.[0];

  if (!selectedOptionId) {
    return null;
  }

  return selectedAreaByOptionId[selectedOptionId] ?? null;
}

function buildVisibleQuestions(answers: Answers): Question[] {
  const selectedArea = getSelectedArea(answers);

  if (!selectedArea) {
    const firstQuestion = questions.find(
      (question) => question.id === "main-area"
    );

    return firstQuestion ? [firstQuestion] : [];
  }

  return questionPaths[selectedArea]
    .map((questionId) => questions.find((question) => question.id === questionId))
    .filter((question): question is Question => Boolean(question))
    .map((question) => {
      const allowedOptionIds =
        visibleOptionIds[question.id]?.[selectedArea];

      const options = (
        allowedOptionIds
          ? question.options.filter((option) =>
              allowedOptionIds.includes(option.id)
            )
          : question.options
      ).map((option) => ({
        ...option,
        label:
          optionLabelOverrides[question.id]?.[selectedArea]?.[option.id] ??
          option.label,
      }));

      return {
        ...question,
        options,
      };
    });
}


type InsightKey =
  | "pastBond"
  | "trust"
  | "avoidance"
  | "overgiving"
  | "selfWorth"
  | "receiving"
  | "boundaries"
  | "communication"
  | "resentment"
  | "intimacy"
  | "relationshipLoad"
  | "decision"
  | "moneySafety"
  | "pricing"
  | "visibility"
  | "successFear"
  | "procrastination"
  | "identity"
  | "belonging"
  | "overResponsibility"
  | "bodyStress"
  | "direction"
  | "emotionalSuppression";

type InsightRule = {
  title: string;
  description: string;
  reflection: string;
};

type ResultProfile = {
  title: string;
  subtitle: string;
  signals: InsightKey[];
  description: string;
  focus: string;
  steps: [string, string, string];
};

const insightDetails: Record<InsightKey, InsightRule> = {
  pastBond: {
    title: "Geçmiş bağların etkisi",
    description:
      "Geçmişte yaşanan ilişki veya duygusal deneyimler bugünkü seçimlerini ve yeni olasılıklara yaklaşma biçimini etkiliyor olabilir.",
    reflection:
      "Bırakmak, yaşananı yok saymak değil; bugünkü seçimlerini geçmişin yönetmemesine izin vermektir.",
  },
  trust: {
    title: "Güven ve korunma",
    description:
      "Yakınlık istesen de hayal kırıklığı yaşamamak için kendini erken aşamada korumaya alıyor olabilirsin.",
    reflection:
      "Güven bir anda teslim olmak değil; tutarlılığı zaman içinde gözlemleyebilme kapasitesidir.",
  },
  avoidance: {
    title: "Geri çekilme",
    description:
      "Yakınlık, görünürlük veya karar gerçek olduğunda geri çekilme ve erteleme eğilimi oluşabiliyor.",
    reflection:
      "Geri çekilme her zaman istememek değildir; bazen etkilenmekten veya sonuçtan korunma biçimidir.",
  },
  overgiving: {
    title: "Fazla verme döngüsü",
    description:
      "Sevilmek, kabul edilmek veya karşılığını hak etmek için kendi ihtiyacından daha fazlasını üstleniyor olabilirsin.",
    reflection:
      "Bağ kurmak ve değer üretmek kendini azaltmak değil; karşılıklılığa yer açmaktır.",
  },
  selfWorth: {
    title: "Özdeğer",
    description:
      "Neyi hak ettiğine dair içsel ölçün ilişki, para, görünürlük ve sınır davranışlarını etkiliyor olabilir.",
    reflection:
      "Değer, sürekli kanıtlanması gereken bir performans değil; seçimlerinin ve sınırlarının temelidir.",
  },
  receiving: {
    title: "Alma kapasitesi",
    description:
      "Sevgi, destek, para veya fırsat geldiğinde bunu rahatça kabul etmekte ya da tutmakta zorlanıyor olabilirsin.",
    reflection:
      "Almak pasiflik değildir; emek vermeden önce de değerli olabileceğini kabul etmektir.",
  },
  boundaries: {
    title: "Sınırlar",
    description:
      "Hayır demek, ihtiyacını söylemek veya geri çekilmek suçluluk ve kaybetme korkusu yaratabiliyor.",
    reflection:
      "Sınır, ilişkiyi cezalandırmak değil; ilişkinin ve hayatın içinde kendini kaybetmemektir.",
  },
  communication: {
    title: "İfade ve iletişim",
    description:
      "Söylemek istediğin şey ile söylediğin şey arasında mesafe oluşuyor; ihtiyaçların susma, savunma veya tartışma içinde kayboluyor olabilir.",
    reflection:
      "İletişim yalnızca konuşmak değil; ihtiyacı suçlamadan görünür kılabilmektir.",
  },
  resentment: {
    title: "Birikmiş kırgınlık",
    description:
      "Çözülmemiş olaylar ve söylenmemiş duygular bugünkü küçük sorunlara geçmişin ağırlığını ekliyor olabilir.",
    reflection:
      "Kırgınlık çoğu zaman yalnızca geçmiş olay değil; karşılanmamış bir ihtiyacın hafızasıdır.",
  },
  intimacy: {
    title: "Yakınlık ve mesafe",
    description:
      "Duygusal veya fiziksel yakınlık azalmış, ilişki günlük işleyişin içine sıkışmış olabilir.",
    reflection:
      "Yakınlık kendiliğinden korunmaz; güven, merak ve karşılıklı açıklıkla yeniden kurulur.",
  },
  relationshipLoad: {
    title: "İlişki yükünü taşıma",
    description:
      "İlişkinin duygusal, pratik veya zihinsel yükünün büyük kısmını üstleniyor olabilirsin.",
    reflection:
      "İki kişilik bir bağın tek kişilik emekle ayakta tutulması uzun vadede tükenmeye dönüşür.",
  },
  decision: {
    title: "Karar eşiği",
    description:
      "Devam etmek, bırakmak, beklemek veya yeni bir adım atmak arasında kalmış olabilirsin.",
    reflection:
      "Kararsızlık bazen bilgi eksikliğinden değil, seçimin getireceği kayıptan korkmaktan doğar.",
  },
  moneySafety: {
    title: "Para ve güvenlik",
    description:
      "Para yalnızca imkân değil, güvende kalmanın temel koşulu gibi hissedildiğinde kaygı ve kontrol artabilir.",
    reflection:
      "Finansal güvenlik önemlidir; fakat sürekli tetikte olmak güvenlik hissini otomatik olarak büyütmez.",
  },
  pricing: {
    title: "Ücret ve emeğin değeri",
    description:
      "Ücret söylerken, satış yaparken veya emeğinin karşılığını isterken utanma ve geri çekilme yaşayabilirsin.",
    reflection:
      "Ücret istemek insanlardan bir şey koparmak değil; sunduğun emeğin sınırını belirlemektir.",
  },
  visibility: {
    title: "Görünürlük",
    description:
      "Yeteneklerini göstermek, öne çıkmak veya insanların değerlendirmesine açık olmak tedirginlik yaratabiliyor.",
    reflection:
      "Görünürlük kusursuz görünmek değil; varlığını saklamadan ortaya koyabilmektir.",
  },
  successFear: {
    title: "Başarıya yaklaşınca geri çekilme",
    description:
      "Başarı yalnızca kazanç değil, sorumluluk, eleştiri ve değişim getireceği için bilinçsizce yavaşlatılıyor olabilir.",
    reflection:
      "Bazen korkulan başarısızlık değil; başarıdan sonra artık eski kimlikte kalamamaktır.",
  },
  procrastination: {
    title: "Erteleme ve eylem",
    description:
      "Ne yapmak istediğini bilsen de ilk adımı büyütüyor, hazırlıkta kalıyor veya mükemmel zamanı bekliyor olabilirsin.",
    reflection:
      "Eylem her zaman hazır hissetmekten sonra gelmez; bazen hazır oluş eylemin içinde oluşur.",
  },
  identity: {
    title: "Kimlik ve kendilik",
    description:
      "Kim olduğunu, ne istediğini veya eskiden sana ait olan şeylerin hâlâ sana uyup uymadığını sorguluyor olabilirsin.",
    reflection:
      "Kendini kaybetmiş hissetmek bazen eski kimliğin artık dar gelmeye başladığını gösterir.",
  },
  belonging: {
    title: "Aidiyet",
    description:
      "Ailede, ilişkide veya sosyal ortamlarda kendin gibi var olduğunda kabul edilmeyeceğinden çekiniyor olabilirsin.",
    reflection:
      "Aidiyet yalnızca bir yere kabul edilmek değil; kabul edilmek için kendini terk etmemektir.",
  },
  overResponsibility: {
    title: "Aşırı sorumluluk",
    description:
      "Başkalarının duygularını, kararlarını veya hayatını düzenlemek senin görevinmiş gibi hissedebilirsin.",
    reflection:
      "Destek olmak ile başkasının hayatını taşımak aynı şey değildir.",
  },
  bodyStress: {
    title: "Bedensel stres yükü",
    description:
      "Uyku, yorgunluk, gerginlik, iştah veya sürekli tetikte olma gibi sinyaller stres yükünün arttığını gösterebilir.",
    reflection:
      "Bedenin verdiği sinyaller yorumlanmadan önce ciddiye alınmalı; devam eden belirtiler sağlık uzmanıyla değerlendirilmelidir.",
  },
  direction: {
    title: "Yön ve anlam",
    description:
      "Ne istemediğini biliyor ama neye doğru ilerlemek istediğini netleştirmekte zorlanıyor olabilirsin.",
    reflection:
      "Yön her zaman tek bir büyük kararla bulunmaz; küçük ama tutarlı seçimlerle belirginleşir.",
  },
  emotionalSuppression: {
    title: "Duyguları bastırma",
    description:
      "Duygularını sorun çıkarmamak, güçlü görünmek veya kimseyi üzmemek için geri plana atıyor olabilirsin.",
    reflection:
      "Bastırılan duygu kaybolmaz; davranışa, bedene veya ilişkideki mesafeye başka bir biçimde taşınır.",
  },
};

const optionInsightWeights: Record<string, Partial<Record<InsightKey, number>>> = {
  "cannot-release": { pastBond: 5 },
  "old-relationships": { pastBond: 4 },
  unresolved: { pastBond: 3, resentment: 2 },
  "wrong-people": { selfWorth: 2, trust: 2 },
  "does-not-last": { trust: 2, avoidance: 2 },
  withdraw: { avoidance: 4 },
  overgive: { overgiving: 4, selfWorth: 2 },
  "fear-abandonment": { boundaries: 3, selfWorth: 2 },
  "second-chances": { boundaries: 3, overgiving: 2 },
  "cannot-no": { boundaries: 4 },
  "take-responsibility": { overResponsibility: 4 },
  suppress: { emotionalSuppression: 4, communication: 2 },
  "cannot-say": { communication: 4 },
  guilt: { communication: 3, boundaries: 2 },
  explode: { emotionalSuppression: 3, communication: 2 },
  "cannot-name": { emotionalSuppression: 4, identity: 2 },
  sleep: { bodyStress: 4 },
  fatigue: { bodyStress: 4 },
  tension: { bodyStress: 4 },
  appetite: { bodyStress: 3 },
  alert: { bodyStress: 4, trust: 1 },
  "physical-increase": { bodyStress: 5 },
  childhood: { identity: 1, emotionalSuppression: 2 },
  "family-pattern": { belonging: 1, selfWorth: 1 },
  "past-failure": { procrastination: 3, selfWorth: 2 },
  "inner-emptiness": { identity: 3, direction: 2 },
  "not-recognize-self": { identity: 4 },
  "over-responsible": { overResponsibility: 4, boundaries: 2 },
  "motivation-loss": { direction: 3, procrastination: 2 },
  "not-understood": { communication: 4 },
  trust: { trust: 5 },
  "carry-all": { relationshipLoad: 5, overResponsibility: 2 },
  distance: { intimacy: 5 },
  "same-conflict": { communication: 4, resentment: 3 },
  "boundaries-violated": { boundaries: 5 },
  "stay-or-leave": { decision: 5 },
  "comes-goes": { moneySafety: 4 },
  "must-work-hard": { moneySafety: 3, selfWorth: 2 },
  "ask-fee": { pricing: 5, selfWorth: 2 },
  "fear-judgment": { visibility: 4, successFear: 2 },
  "never-safe": { moneySafety: 5 },
  "cannot-invest": { receiving: 3, selfWorth: 2 },
  postpone: { procrastination: 5 },
  "fear-failure": { successFear: 4, selfWorth: 2 },
  judgment: { visibility: 5 },
  "cannot-show": { visibility: 5, selfWorth: 2 },
  "cannot-finish": { procrastination: 4 },
  "self-sabotage": { successFear: 5, procrastination: 2 },
  behind: { selfWorth: 4 },
  "ask-unavailable": { trust: 3, selfWorth: 2 },
  "ask-intense": { trust: 2, avoidance: 1 },
  "ask-rescue": { overgiving: 5, overResponsibility: 3 },
  "ask-prove": { selfWorth: 5, overgiving: 2 },
  "ask-stable": { avoidance: 4, trust: 2 },
  "ask-suspicious": { trust: 5 },
  "ask-idealize": { pastBond: 1, selfWorth: 1 },
  "ask-pull-away": { avoidance: 5, trust: 2 },
  "ask-perform": { selfWorth: 5, emotionalSuppression: 2 },
  "ask-owe": { receiving: 4, overgiving: 3 },
  "ask-uncomfortable-love": { receiving: 4, selfWorth: 2 },
  "ask-proof": { trust: 5 },
  "ask-distant-when-loved": { avoidance: 4, trust: 2 },
  "ask-love-earned": { selfWorth: 5, overgiving: 2 },
  "ask-unstable-home": { trust: 4, emotionalSuppression: 1 },
  "ask-emotions-unspoken": { emotionalSuppression: 4, communication: 2 },
  "ask-distance-normal": { avoidance: 3, emotionalSuppression: 2 },
  "ask-no-space": { overResponsibility: 3, direction: 2 },
  "ask-space-fear": { trust: 5, pastBond: 2 },
  "ask-space-unsure": { direction: 4, decision: 2 },
  "rel-pursue-withdraw": { communication: 4, avoidance: 3 },
  "rel-explode-silence": { communication: 4, emotionalSuppression: 3 },
  "rel-logic-emotion": { communication: 4 },
  "rel-no-resolution": { communication: 3, resentment: 4 },
  "rel-past-betrayal": { trust: 5, resentment: 3 },
  "rel-inconsistent": { trust: 5, decision: 2 },
  "rel-emotionally-absent": { intimacy: 4, trust: 2 },
  "rel-my-past": { trust: 4, pastBond: 4 },
  "rel-emotional-distance": { intimacy: 5, communication: 2 },
  "rel-physical-distance": { intimacy: 5 },
  "rel-roommates": { intimacy: 5, relationshipLoad: 2 },
  "rel-one-reaches": { intimacy: 3, relationshipLoad: 3 },
  "rel-emotional-manager": { relationshipLoad: 5, overResponsibility: 3 },
  "rel-practical-manager": { relationshipLoad: 5, boundaries: 2 },
  "rel-repair-manager": { relationshipLoad: 5, overgiving: 2 },
  "rel-partner-caretaker": { overResponsibility: 5, boundaries: 3 },
  "rel-no-apology": { resentment: 5, trust: 2 },
  "rel-forgave-but": { resentment: 4, emotionalSuppression: 2 },
  "rel-repeat-harm": { resentment: 5, trust: 4 },
  "rel-avoid-topic": { resentment: 3, avoidance: 3, communication: 2 },
  "money-hard-earned": { moneySafety: 4, selfWorth: 2 },
  "money-never-enough": { moneySafety: 5 },
  "money-rich-bad": { successFear: 4 },
  "money-do-not-ask": { pricing: 5, communication: 1 },
  "money-discount": { pricing: 5, selfWorth: 2 },
  "money-overdeliver": { receiving: 4, overgiving: 4, selfWorth: 2 },
  "money-spend-fast": { moneySafety: 4 },
  "money-reject-help": { receiving: 5, overResponsibility: 2 },
  "money-apologize-price": { pricing: 5 },
  "money-fear-expensive": { pricing: 4, visibility: 2, selfWorth: 2 },
  "money-compare-price": { pricing: 3, selfWorth: 4 },
  "money-free-work": { pricing: 3, overgiving: 4, boundaries: 2 },
  "money-research-loop": { procrastination: 5 },
  "money-start-drop": { procrastination: 4, direction: 2 },
  "money-many-ideas": { direction: 4, decision: 3 },
  "money-fear-launch": { visibility: 4, successFear: 3, procrastination: 2 },
  "money-more-responsibility": { successFear: 4, overResponsibility: 3 },
  "money-lose-people": { successFear: 4, belonging: 3 },
  "money-cannot-maintain": { successFear: 5, moneySafety: 2 },
  "money-more-criticism": { visibility: 4, successFear: 3 },
  "self-old-life-no-fit": { identity: 5, direction: 3 },
  "self-roles-only": { identity: 5, overResponsibility: 2 },
  "self-adapt-everywhere": { identity: 4, belonging: 4 },
  "self-lost-desire": { identity: 4, direction: 4 },
  "self-family-not-self": { belonging: 5, emotionalSuppression: 2 },
  "self-outsider": { belonging: 5, selfWorth: 2 },
  "self-shape-shift": { belonging: 5, identity: 3 },
  "self-crowd-alone": { belonging: 4 },
  "self-problem-solver": { overResponsibility: 5 },
  "self-emotional-container": { overResponsibility: 5, emotionalSuppression: 2 },
  "self-peacekeeper": { overResponsibility: 4, boundaries: 2 },
  "self-invisible-helper": { overResponsibility: 4, receiving: 3 },
  "self-focus": { procrastination: 3, direction: 2 },
  "self-social-withdraw": { avoidance: 3, belonging: 2 },
  "self-motivation": { direction: 3, identity: 2 },
  "self-routine": { bodyStress: 4 },
  "self-too-many-paths": { direction: 5, decision: 3 },
  "self-know-afraid": { direction: 3, decision: 3, avoidance: 2 },
  "self-others-life": { direction: 4, identity: 4, boundaries: 2 },
  "self-no-energy": { direction: 3, bodyStress: 4 },
};

const resultProfiles: Record<SelectedArea, ResultProfile[]> = {
  ask: [
    {
      title: "Geçmişten yeni aşka geçiş profili",
      subtitle: "Kalbin yeniye açık, fakat geçmiş hâlâ odada.",
      signals: ["pastBond", "trust"],
      description:
        "Yeni bir ilişki arzun güçlü olsa da geçmişte yaşananların oluşturduğu korunma refleksi yeni insanları değerlendirme biçimini etkiliyor olabilir.",
      focus:
        "Geçmiş bağları fark etmek, güveni acele etmeden yeniden kurmak ve yeni ilişkiyi eski ilişkinin devamı gibi okumamayı öğrenmek.",
      steps: [
        "Geçmiş ilişkiden bugüne taşıdığın üç duyguyu ve üç inancı ayır.",
        "Yeni bir kişide aradığın özelliklerle kaçındığın korkuları birbirinden ayır.",
        "Aşkı yalnızca seçilmek üzerinden değil, karşılıklı seçim ve uyum üzerinden değerlendirmeye başla.",
      ],
    },
    {
      title: "Yakınlık isteyip geri çekilen profil",
      subtitle: "Aşkı istiyorsun, fakat yaklaşınca savunma devreye giriyor.",
      signals: ["avoidance", "trust"],
      description:
        "İlişki ihtimali uzaktayken arzu güçlü, yakınlık gerçek olduğunda ise geri çekilme, kusur arama veya kontrol etme eğilimi oluşabilir.",
      focus:
        "Yakınlığın yarattığı belirsizliğe dayanabilmek, acele karar vermemek ve korunma ile gerçek uyumsuzluğu ayırt etmek.",
      steps: [
        "İlgi gördüğünde bedeninde ve zihninde oluşan ilk savunmayı fark et.",
        "Birini hemen idealize etmek ya da elemek yerine tutarlılığı zamana yayarak gözlemle.",
        "Yakınlık arttığında ihtiyacını açıkça söyleme pratiği oluştur.",
      ],
    },
    {
      title: "Sevilmek için fazla veren profil",
      subtitle: "Bağ kurarken kendi merkezinden uzaklaşabiliyorsun.",
      signals: ["overgiving", "boundaries", "selfWorth", "receiving"],
      description:
        "İlişkide değerini göstermek, vazgeçilmez olmak veya terk edilmemek için fazla emek verme eğilimin olabilir.",
      focus:
        "Sevilmek için performans göstermeyi bırakmak, alma kapasitesini büyütmek ve sınırları ilişkinin başında görünür kılmak.",
      steps: [
        "Bir ilişkide otomatik olarak üstlendiğin görevleri fark et.",
        "Karşı tarafın çabasını gözlemlemek için boşluk bırak.",
        "İhtiyacını söylemeden karşılanmasını beklemek yerine açık ve sade ifade et.",
      ],
    },
  ],
  iliski: [
    {
      title: "İlişkiyi sessizce taşıyan profil",
      subtitle: "Bağ sürsün diye kendi ihtiyacını geri plana atıyorsun.",
      signals: ["relationshipLoad", "overResponsibility", "boundaries"],
      description:
        "İlişkinin duygusal ve pratik yükünün büyük kısmını üstleniyor, sorun çıkmasın diye ihtiyaçlarını küçültüyor olabilirsin.",
      focus:
        "Yük paylaşımını görünür kılmak, sorumlulukları ayırmak ve ihtiyacını suçlamadan ifade etmek.",
      steps: [
        "İlişkide yalnızca senin üstlendiğin görünmez görevleri listele.",
        "Bir konuşmada tek bir somut ihtiyacı açıkça ifade et.",
        "Karşı tarafın sorumluluk almasına izin vermek için her boşluğu hemen doldurma.",
      ],
    },
    {
      title: "Güveni yeniden kurma profili",
      subtitle: "İlişki sürüyor, fakat içindeki alarm tamamen kapanmıyor.",
      signals: ["trust", "resentment"],
      description:
        "Geçmişte yaşanan bir kırılma, tutarsızlık veya belirsizlik nedeniyle ilişki devam etse de zihnin sürekli kanıt arıyor olabilir.",
      focus:
        "Kırılmanın ne olduğunu netleştirmek, telafi beklentisini görünür kılmak ve güveni davranışlar üzerinden değerlendirmek.",
      steps: [
        "Güveni zedeleyen olayı ve bugün devam eden etkisini birbirinden ayır.",
        "Güvenin yeniden oluşması için hangi davranışları görmen gerektiğini somutlaştır.",
        "Kontrol ederek rahatlamak yerine tutarlılığı zaman içinde gözlemle.",
      ],
    },
    {
      title: "Yakınlık kaybı ve döngüsel çatışma profili",
      subtitle: "Konu değişiyor, aynı duygu tekrar ediyor.",
      signals: ["communication", "intimacy", "resentment"],
      description:
        "Tartışmalar farklı başlıklardan çıksa da altında anlaşılmama, değer görmeme veya yalnız kalma duygusu tekrar ediyor olabilir.",
      focus:
        "Tartışmanın konusundan önce tekrar eden duyguyu görmek, onarım konuşmaları yapmak ve yakınlık için bilinçli alan açmak.",
      steps: [
        "Tekrarlayan üç tartışmanın altında ortak olan duyguyu bul.",
        "Tartışma sonrası kimin nasıl onarım beklediğini konuş.",
        "Sorun konuşmalarından bağımsız, düzenli bir yakınlık alanı oluştur.",
      ],
    },
    {
      title: "Karar eşiğindeki ilişki profili",
      subtitle: "Sorun yalnızca kalmak ya da gitmek değil; neyi kaybedeceğin.",
      signals: ["decision", "boundaries", "trust"],
      description:
        "İlişkinin geleceği konusunda kararsızlık yaşıyor olabilirsin. Bu kararsızlık yalnızlık korkusu ile kendinden vazgeçme arasında sıkışmaktan doğabilir.",
      focus:
        "Korkuyla verilen karar ile değerlerine uygun karar arasındaki farkı görmek.",
      steps: [
        "Kalmanın ve ayrılmanın sana kazandıracağı ve kaybettireceği şeyleri ayrı ayrı yaz.",
        "Değişmesi gereken davranışları somut ve zamanlı biçimde belirle.",
        "Kararı yalnızca duygusal yoğunluğa değil, ilişkinin gerçek davranış örüntüsüne göre değerlendir.",
      ],
    },
  ],
  para: [
    {
      title: "Para ile güvenlik kurmaya çalışan profil",
      subtitle: "Para senin için yalnızca imkân değil, alarmı susturma aracı.",
      signals: ["moneySafety", "decision"],
      description:
        "Para azaldığında yalnızca bütçe değil, bütün güvenlik hissin sarsılıyor olabilir. Bu nedenle kararların ihtiyaçtan çok kaygı tarafından yönetilebilir.",
      focus:
        "Gerçek finansal plan ile duygusal güvenlik ihtiyacını birbirinden ayırmak.",
      steps: [
        "Parayla ilgili gerçek riskleri ve zihninin büyüttüğü riskleri ayır.",
        "Ailenden öğrendiğin para cümlelerini fark et.",
        "Kontrol hissi için küçük, gerçekçi ve sürdürülebilir bir finansal düzen kur.",
      ],
    },
    {
      title: "Görünürlük ve başarı eşiğindeki profil",
      subtitle: "Yetenek var, fakat görünmek beraberinde yargılanma korkusu getiriyor.",
      signals: ["visibility", "successFear", "selfWorth"],
      description:
        "Üretme kapasiten olduğu hâlde görünür olmak, satış yapmak veya başarıyla anılmak savunma yaratabilir.",
      focus:
        "Görünürlük ile kusursuzluk beklentisini ayırmak ve küçük görünürlük adımlarıyla toleransı artırmak.",
      steps: [
        "Görünür olursan gerçekleşmesinden korktuğun üç şeyi yaz.",
        "Kusursuz sunum yerine düzenli ve gerçek bir paylaşım ritmi belirle.",
        "Başarıyı kimlik tehdidi değil, kapasitenin görünür hâli olarak yeniden tanımla.",
      ],
    },
    {
      title: "Emeğini verip karşılığını almakta zorlanan profil",
      subtitle: "Çalışmak kolay, istemek ve almak daha zor geliyor.",
      signals: ["pricing", "receiving", "overgiving", "selfWorth"],
      description:
        "Emeğinin karşılığını isterken suçluluk, utanma veya fazla açıklama ihtiyacı oluşabilir.",
      focus:
        "Ücret, alma ve değer ilişkisini yeniden kurmak; emeğin sınırını görünür kılmak.",
      steps: [
        "Sunduğun hizmetin zaman, bilgi ve sonuç değerini ayrı ayrı yaz.",
        "Ücret söylerken açıklama ve özür ekleme alışkanlığını azalt.",
        "Ücretsiz veya karşılıksız verdiğin emeğin sınırlarını belirle.",
      ],
    },
    {
      title: "Hazırlıkta kalıp eylemi erteleyen profil",
      subtitle: "Ne yapacağını bilmiyorsun değil; başlamak büyüyor.",
      signals: ["procrastination", "successFear", "direction"],
      description:
        "Planlama, eğitim alma veya hazırlık yapma süreci eylemin yerini almış olabilir.",
      focus:
        "Hazırlık ile kaçınmayı ayırmak, küçük eylem hedefleri koymak ve sonuç yerine sürekliliği ölçmek.",
      steps: [
        "Bu hafta tamamlanabilecek tek bir gelir adımı seç.",
        "Başarı ölçünü sonuçtan önce devamlılık üzerinden tanımla.",
        "İlk sürümü yayınlamak için kabul edeceğin yeterince iyi standardı belirle.",
      ],
    },
  ],
  birebir: [
    {
      title: "Kimlik dönüşümü yaşayan profil",
      subtitle: "Eski hâlin artık uymuyor, yenisi henüz tam şekillenmedi.",
      signals: ["identity", "direction", "belonging"],
      description:
        "Ne istediğini bilememek bazen yönsüzlükten değil, eski kimliğin artık sana dar gelmesinden kaynaklanır.",
      focus:
        "Eski rollerden ayrışmak, yeni değerleri tanımlamak ve yönü küçük seçimlerle oluşturmak.",
      steps: [
        "Artık sana ait hissettirmeyen rollerini yaz.",
        "Bugünkü hayatında daha fazla görmek istediğin üç değeri seç.",
        "Bu değerlere uygun tek bir küçük davranışı günlük hayata ekle.",
      ],
    },
    {
      title: "Herkesi taşıyıp kendini unutan profil",
      subtitle: "Güçlü görünürken iç kaynakların azalıyor.",
      signals: ["overResponsibility", "boundaries", "bodyStress"],
      description:
        "Başkalarının ihtiyaçlarını önceden fark edip düzenlemek, kendi ihtiyacını hissetmeni zorlaştırmış olabilir.",
      focus:
        "Sorumlulukları ayırmak, bedensel sinyalleri ciddiye almak ve ihtiyaçları görünür kılmak.",
      steps: [
        "Sana ait olmayan üç sorumluluğu belirle.",
        "Her gün bedeninin ve duygunun ne istediğini kısa biçimde not et.",
        "Bir alanda yardım isteme veya görev paylaşma pratiği yap.",
      ],
    },
    {
      title: "Aidiyet arayan profil",
      subtitle: "Kabul edilmek için kendini değiştirmek yoruyor.",
      signals: ["belonging", "identity", "selfWorth"],
      description:
        "Bir ortama uyum sağlamak için gerçek düşünceni, duygunu veya tarzını geri çekiyor olabilirsin.",
      focus:
        "Kabul görmek ile kendin olarak var olmak arasındaki dengeyi yeniden kurmak.",
      steps: [
        "Hangi ortamlarda kendini küçülttüğünü fark et.",
        "Güvenli bir ilişkide küçük bir gerçek düşünceni açıkça paylaş.",
        "Seni kendin olduğunda da kabul eden alanları çoğalt.",
      ],
    },
    {
      title: "Duygularını bastırarak ilerleyen profil",
      subtitle: "Duygu görünmüyor, fakat beden ve davranış onu taşıyor.",
      signals: ["emotionalSuppression", "communication", "bodyStress"],
      description:
        "Güçlü, sakin veya sorun çıkarmayan biri olma çabası duyguların bastırılmasına yol açmış olabilir.",
      focus:
        "Duyguyu isimlendirmek, güvenli biçimde ifade etmek ve iç eleştirmeni yumuşatmak.",
      steps: [
        "Gün içinde hissettiğin duyguyu çözmeden önce yalnızca isimlendir.",
        "Duygunun altında bulunan ihtiyacı ayır.",
        "Kendinle konuşurken kullandığın sert cümleleri daha gerçekçi ve destekleyici hâle getir.",
      ],
    },
  ],
};

function calculateInsightScores(answers: Answers) {
  const totals = {} as Record<InsightKey, number>;

  (Object.keys(insightDetails) as InsightKey[]).forEach((key) => {
    totals[key] = 0;
  });

  Object.values(answers)
    .flat()
    .forEach((optionId) => {
      const weights = optionInsightWeights[optionId] ?? {};

      Object.entries(weights).forEach(([key, value]) => {
        if (typeof value === "number") {
          totals[key as InsightKey] += value;
        }
      });
    });

  return totals;
}

function selectResultProfile(
  area: SelectedArea,
  insightScores: Record<InsightKey, number>
) {
  return resultProfiles[area]
    .map((profile) => ({
      ...profile,
      score: profile.signals.reduce(
        (total, signal) => total + insightScores[signal],
        0
      ),
    }))
    .sort((a, b) => b.score - a.score)[0];
}

function calculateNeedScores(answers: Answers) {
  const totals: Record<NeedKey, number> = {
    ask: 0,
    iliski: 0,
    para: 0,
    birebir: 0,
  };

  Object.entries(answers).forEach(([questionId, optionIds]) => {
    const question = questions.find((item) => item.id === questionId);

    optionIds.forEach((optionId) => {
      const option = question?.options.find((item) => item.id === optionId);

      Object.entries(option?.scores ?? {}).forEach(([key, value]) => {
        if (typeof value === "number") {
          totals[key as NeedKey] += value;
        }
      });
    });
  });

  return totals;
}

function calculateFormatScores(answers: Answers) {
  const totals: Record<FormatKey, number> = {
    birebir: 0,
    analiz: 0,
    digital: 0,
  };

  Object.entries(answers).forEach(([questionId, optionIds]) => {
    const question = questions.find((item) => item.id === questionId);

    optionIds.forEach((optionId) => {
      const option = question?.options.find((item) => item.id === optionId);

      Object.entries(option?.formatScores ?? {}).forEach(([key, value]) => {
        if (typeof value === "number") {
          totals[key as FormatKey] += value;
        }
      });
    });
  });

  return totals;
}

export default function WorkFinderSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isComplete, setIsComplete] = useState(false);

  const selectedArea = getSelectedArea(answers);

  const visibleQuestions = useMemo(
    () => buildVisibleQuestions(answers),
    [answers]
  );

  const safeCurrentStep = Math.min(
    currentStep,
    Math.max(visibleQuestions.length - 1, 0)
  );

  const currentQuestion = visibleQuestions[safeCurrentStep];
  const selectedOptions = currentQuestion
    ? answers[currentQuestion.id] ?? []
    : [];

  const progress = isComplete
    ? 100
    : Math.round(
        ((safeCurrentStep + 1) /
          Math.max(visibleQuestions.length, 1)) *
          100
      );

  const questionCountLabel = selectedArea
    ? `${visibleQuestions.length} soru`
    : "Seçimine göre 15–17 soru";

  const rankedFormats = useMemo(() => {
    const totals = calculateFormatScores(answers);

    return (Object.entries(totals) as [FormatKey, number][])
      .sort((a, b) => b[1] - a[1])
      .map(([key, score]) => ({
        key,
        score,
        ...formatDetails[key],
      }));
  }, [answers]);

  const primaryResult = selectedArea
    ? {
        key: selectedArea,
        score: Object.values(answers).flat().length,
        ...needDetails[selectedArea],
      }
    : null;

  const preferredFormat =
    rankedFormats.find((item) => item.score > 0) ?? rankedFormats[0];

  const insightScores = useMemo(
    () => calculateInsightScores(answers),
    [answers]
  );

  const rankedInsights = useMemo(() => {
    return (Object.entries(insightScores) as [InsightKey, number][])
      .filter(([, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key, score]) => ({
        key,
        score,
        ...insightDetails[key],
      }));
  }, [insightScores]);

  const selectedProfile = useMemo(() => {
    if (!selectedArea) {
      return null;
    }

    return selectResultProfile(selectedArea, insightScores);
  }, [selectedArea, insightScores]);

  const influentialAnswers = useMemo(() => {
    if (rankedInsights.length === 0) {
      return [];
    }

    const topInsightKeys = new Set(
      rankedInsights.slice(0, 4).map((item) => item.key)
    );

    return Object.entries(answers)
      .flatMap(([questionId, optionIds]) => {
        const question = questions.find((item) => item.id === questionId);

        return optionIds.map((optionId) => {
          const option = question?.options.find(
            (item) => item.id === optionId
          );

          const weight = Object.entries(
            optionInsightWeights[optionId] ?? {}
          ).reduce(
            (total, [key, value]) =>
              topInsightKeys.has(key as InsightKey) &&
              typeof value === "number"
                ? total + value
                : total,
            0
          );

          return {
            question: question?.title ?? "",
            answer: option?.label ?? "",
            weight,
          };
        });
      })
      .filter((item) => item.weight > 0)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 7);
  }, [answers, rankedInsights]);

  const hasBodyStress =
    (answers["body-stress"] ?? []).some(
      (optionId) => optionId !== "no-body-change"
    ) ||
    (answers["self-daily-impact"] ?? []).includes("self-routine") ||
    rankedInsights.some((item) => item.key === "bodyStress");

  function toggleOption(option: Option) {
    const currentSelections = answers[currentQuestion.id] ?? [];

    if (currentQuestion.mode === "single") {
      if (currentQuestion.id === "main-area") {
        setAnswers({
          "main-area": [option.id],
        });
        setCurrentStep(0);
        setIsComplete(false);
        return;
      }

      setAnswers((currentAnswers) => ({
        ...currentAnswers,
        [currentQuestion.id]: [option.id],
      }));
      return;
    }

    if (option.exclusive) {
      setAnswers((currentAnswers) => ({
        ...currentAnswers,
        [currentQuestion.id]: [option.id],
      }));
      return;
    }

    const exclusiveIds = currentQuestion.options
      .filter((item) => item.exclusive)
      .map((item) => item.id);

    const withoutExclusive = currentSelections.filter(
      (optionId) => !exclusiveIds.includes(optionId)
    );

    const isSelected = withoutExclusive.includes(option.id);

    if (isSelected) {
      setAnswers((currentAnswers) => ({
        ...currentAnswers,
        [currentQuestion.id]: withoutExclusive.filter(
          (optionId) => optionId !== option.id
        ),
      }));
      return;
    }

    if (
      currentQuestion.maxSelections &&
      withoutExclusive.length >= currentQuestion.maxSelections
    ) {
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: [...withoutExclusive, option.id],
    }));
  }

  function goForward() {
    if (selectedOptions.length === 0) {
      return;
    }

    if (safeCurrentStep === visibleQuestions.length - 1) {
      setIsComplete(true);
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, visibleQuestions.length - 1));
  }

  function goBack() {
    if (currentStep === 0) {
      return;
    }

    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  function restart() {
    setAnswers({});
    setCurrentStep(0);
    setIsComplete(false);
  }

  const whatsappMessage =
    primaryResult && selectedProfile
      ? `Merhaba, Goldkozmos® yönlendirme testini tamamladım. Ana yönlendirmem "${primaryResult.title}", sonuç profilim "${selectedProfile.title}" çıktı. Çalışma hakkında bilgi almak istiyorum.`
      : "Merhaba, Goldkozmos® Enerji Ekolü çalışmaları hakkında bilgi almak istiyorum.";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section className="deepFinderSection" id="calisma-bul">
      <div className="deepFinderContainer">
        <header className="deepFinderHeading">
          <p className="sectionEyebrow">
            <span>
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup>
            </span>

            <br />

            <span>ENERJİ EKOLÜ</span>

            <br />

            <span>SANA UYGUN ÇALIŞMAYI BUL</span>
          </p>

          <h2>
            Yalnızca alanını değil,
            <span> ihtiyacının altındaki döngüyü de keşfet.</span>
          </h2>

          <p>
            İlk seçimine göre yalnızca senin alanınla ilgili derin sorular açılır. Sorular ilerledikçe çekim, güven, sınırlar, geçmiş, aidiyet, görünürlük ve otomatik tepkilerin arasındaki bağ görünür hâle gelir.
          </p>

          <div className="deepFinderMeta">
            <span>{questionCountLabel}</span>
            <span>Yaklaşık 8–12 dakika</span>
            <span>Kişisel yönlendirme sonucu</span>
          </div>

          {selectedArea ? (
            <p className="deepFinderBranchNote">
              Seçtiğin alan:
              <strong>
                {selectedArea === "ask"
                  ? " Aşkı Hayatına Çağır"
                  : selectedArea === "iliski"
                    ? " İlişkini Şifalandır"
                    : selectedArea === "para"
                      ? " Para ve Bolluk"
                      : " Kişisel Dönüşüm"}
              </strong>
              . Bundan sonraki sorular yalnızca bu yolculuğa göre açılacak.
            </p>
          ) : null}
        </header>

        <div className="deepFinderPanel">
          <div className="deepFinderProgress">
            <div className="deepFinderProgressText">
              <span>
                {isComplete
                  ? "DEĞERLENDİRME TAMAMLANDI"
                  : `ADIM ${safeCurrentStep + 1} / ${visibleQuestions.length}`}
              </span>

              <span>%{progress}</span>
            </div>

            <div className="deepFinderProgressBar">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          {!isComplete ? (
            <div className="deepFinderQuestionView">
              <div className="deepFinderQuestion">
                <div className="deepFinderQuestionChapter">
                  <span>
                    {currentQuestion.chapter ?? "DERİNLEŞEN YOLCULUK"}
                  </span>
                  <small>
                    SORU {safeCurrentStep + 1} / {visibleQuestions.length}
                  </small>
                </div>

                <p>{currentQuestion.eyebrow}</p>
                <h3>{currentQuestion.title}</h3>

                {currentQuestion.helper ? (
                  <span>{currentQuestion.helper}</span>
                ) : null}

                <details className="deepFinderQuestionWhy">
                  <summary>Bu soruyu neden soruyoruz?</summary>
                  <p>
                    {currentQuestion.why ??
                      "Bu cevap, seçtiğin alanın altında çalışan otomatik duygu ve davranış döngüsünü daha doğru anlamamıza yardımcı olur."}
                  </p>
                </details>

                {currentQuestion.mode === "multiple" ? (
                  <small>
                    {selectedOptions.length}
                    {currentQuestion.maxSelections
                      ? ` / ${currentQuestion.maxSelections}`
                      : ""}{" "}
                    seçim yapıldı
                  </small>
                ) : null}
              </div>

              <div className="deepFinderOptions">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedOptions.includes(option.id);

                  return (
                    <button
                      type="button"
                      className={`deepFinderOption ${
                        isSelected ? "deepFinderOptionSelected" : ""
                      }`}
                      key={option.id}
                      onClick={() => toggleOption(option)}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={`deepFinderOptionMarker ${
                          currentQuestion.mode === "multiple"
                            ? "deepFinderOptionMarkerMultiple"
                            : ""
                        }`}
                      />

                      <span className="deepFinderOptionText">
                        <strong>{option.label}</strong>

                        {option.description ? (
                          <small>{option.description}</small>
                        ) : null}
                      </span>

                      <span
                        className="deepFinderOptionArrow"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="deepFinderActions">
                {safeCurrentStep > 0 ? (
                  <button
                    type="button"
                    className="deepFinderBackButton"
                    onClick={goBack}
                  >
                    ← Önceki Soru
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  className="deepFinderContinueButton"
                  onClick={goForward}
                  disabled={selectedOptions.length === 0}
                >
                  {safeCurrentStep === visibleQuestions.length - 1
                    ? "Sonucumu Gör"
                    : "Devam Et"}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          ) : primaryResult && selectedProfile ? (
            <div className="deepFinderResult">
              <div className="deepFinderResultTop deepFinderResultTopRich">
                <div>
                  <p className="deepFinderResultEyebrow">
                    {primaryResult.eyebrow}
                  </p>

                  <span className="deepFinderResultProgram">
                    {primaryResult.title}
                  </span>

                  <h3>{selectedProfile.title}</h3>

                  <strong className="deepFinderResultSubtitle">
                    {selectedProfile.subtitle}
                  </strong>

                  <p className="deepFinderResultDescription">
                    {selectedProfile.description}
                  </p>
                </div>

                <div className="deepFinderResultScore">
                  <span>DEĞERLENDİRME</span>
                  <strong>{visibleQuestions.length - 1}</strong>
                  <small>kişisel yanıta göre oluşturuldu</small>
                </div>
              </div>

              <div className="deepFinderResultReading">
                <p>SONUCUNUN DERİN OKUMASI</p>

                <div>
                  <p>
                    Yanıtlarında özellikle{" "}
                    <strong>
                      {rankedInsights
                        .slice(0, 3)
                        .map((item) =>
                          item.title.toLocaleLowerCase("tr")
                        )
                        .join(", ")}
                    </strong>{" "}
                    alanları öne çıktı.
                  </p>

                  <p>
                    Bu, sende bir eksiklik olduğu anlamına gelmez. Daha çok,
                    bugün verdiğin kararların ve otomatik tepkilerin hangi
                    duygusal zeminden beslendiğini gösterir.
                  </p>

                  <p>
                    Sana önerilen ilk odak:{" "}
                    <strong>{selectedProfile.focus}</strong>
                  </p>
                </div>
              </div>

              <div className="deepFinderInsightSection">
                <div className="deepFinderRichTitle">
                  <span>01</span>

                  <div>
                    <p>SENDE ÖNE ÇIKAN DİNAMİKLER</p>
                    <h4>Yanıtlarının işaret ettiği temel katmanlar</h4>
                  </div>
                </div>

                <div className="deepFinderInsightGrid">
                  {rankedInsights.slice(0, 4).map((insight, index) => (
                    <article key={insight.key}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h5>{insight.title}</h5>
                      <p>{insight.description}</p>
                      <blockquote>{insight.reflection}</blockquote>
                    </article>
                  ))}
                </div>
              </div>

              {influentialAnswers.length > 0 ? (
                <div className="deepFinderEvidenceSection">
                  <div className="deepFinderRichTitle">
                    <span>02</span>

                    <div>
                      <p>BU YÖNLENDİRME NEDEN OLUŞTU?</p>
                      <h4>Sonucu en çok etkileyen seçtiklerin</h4>
                    </div>
                  </div>

                  <div className="deepFinderEvidenceList">
                    {influentialAnswers.map((item, index) => (
                      <div key={`${item.question}-${item.answer}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="deepFinderPlanSection">
                <div className="deepFinderRichTitle">
                  <span>03</span>

                  <div>
                    <p>SANA ÖZEL BAŞLANGIÇ PLANI</p>
                    <h4>İlk üç odak noktan</h4>
                  </div>
                </div>

                <div className="deepFinderPlanGrid">
                  {selectedProfile.steps.map((step, index) => (
                    <article key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{step}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="deepFinderRecommendationRich">
                <div>
                  <p>ANA ÇALIŞMA ÖNERİN</p>
                  <h4>{primaryResult.title}</h4>
                  <span>{primaryResult.description}</span>
                </div>

                <a href={primaryResult.href}>
                  Çalışmayı İncele
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="deepFinderFormatResult">
                <div>
                  <p>SANA UYGUN ÇALIŞMA BİÇİMİ</p>
                  <h4>{preferredFormat.title}</h4>
                  <span>{preferredFormat.description}</span>
                </div>

                <a href={preferredFormat.href}>
                  Çalışma biçimini incele
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              {hasBodyStress ? (
                <div className="deepFinderMedicalNote">
                  <strong>Bedensel belirtiler hakkında önemli not:</strong>
                  <span>
                    Bu test tıbbi değerlendirme veya tanı yerine geçmez.
                    Devam eden, şiddetlenen veya seni endişelendiren fiziksel
                    belirtiler için bir sağlık uzmanına başvurman önemlidir.
                  </span>
                </div>
              ) : null}

              <div className="deepFinderResultActions">
                <a href={primaryResult.href}>
                  Önerilen Çalışmayı İncele
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sonucumla İlgili Bilgi Al
                  <span aria-hidden="true">↗</span>
                </a>

                <button type="button" onClick={restart}>
                  Testi Yeniden Çöz
                </button>
              </div>

              <p className="deepFinderResultNote">
                Bu test bir tanı, terapi, tıbbi değerlendirme veya kesin
                kişilik analizi değildir. Verdiğin yanıtlara göre Goldkozmos®
                Enerji Ekolü içindeki en yakın başlangıç alanını ve öne çıkan
                farkındalık başlıklarını gösterir.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
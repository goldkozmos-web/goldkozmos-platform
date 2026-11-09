import { chakraBookGuides } from '../../data/chakraBookGuides';

const guides: Record<string, string[]> = {
  "Kök çakra": ["Belirsizlikte tutunacak bir zemin bulamama ve güvence arama teması öne çıkar.", "Güvende hissetme, aidiyet ve değişime daha sağlam bir zeminden yaklaşma ile anlatılır.", "Kaybetme korkusuyla kontrol etmek yerine güveni tutarlı davranışlar ve açık sınırlarla kurmak.", "Gelir ve iş güvencesi kaygısıyla her talebe evet demek yerine sorumlulukları ve bütçeyi gerçekçi planlamak.", "Uyku, yemek ve ev düzeni gibi temel ihtiyaçlara düzenli yer açmak."],
  "Sakral çakra": ["Duyguları bastırma, keyfe suçlulukla yaklaşma ve yaratıcılıktan uzaklaşma teması öne çıkar.", "Duygulara yer açma, esneklik, oyun ve üretme isteğiyle anlatılır.", "Yakınlıkta isteklerini ve sınırlarını konuşabilmek; karşılıklı rızaya ve duygusal paylaşıma alan açmak.", "Hata yapma korkusuyla fikirleri saklamak yerine denemeye ve yaratıcı çözümlere yer vermek.", "Müzik, hareket veya çizim gibi sonuç beklemeden keyif aldığın bir uğraşa zaman ayırmak."],
  "Solar pleksus çakrası": ["Kararları erteleme, sürekli onay arama veya her şeyi kontrol etme ihtiyacıyla yorumlanır.", "Özgüven, kendi kararının sorumluluğunu alma ve kararlı ama esnek sınırlarla anlatılır.", "İhtiyaçlarını küçültmeden söylemek; anlaşmazlıkta üstünlük kurmak yerine eşit söz hakkını korumak.", "Emeğini görünür kılmak, görev sınırlarını belirtmek ve ulaşılabilir hedeflere adım atmak.", "Küçük bir kararı kendi ölçütlerinle almak ve başladığın bir işi tamamlamak."],
  "Kalp çakrası": ["İncinmemek için mesafe koyma, yalnızlık ve sevgi almaya kapanma teması öne çıkar.", "Şefkat, kabul ve kendini ihmal etmeden bağ kurmayla anlatılır.", "Sevgiyi sürekli fedakârlıkla kanıtlamak yerine karşılıklı ilgiye yer açmak; kırgınlığı konuşabilmek.", "Empatiyle işbirliği yapmak, yardım istemek ve başkalarının bütün yükünü üstlenmemek.", "Kendine anlayışlı bir dil kullanmak ve güvendiğin biriyle küçük bir paylaşım yapmak."],
  "Boğaz çakrası": ["Duyulmayacağını düşünerek susma, ihtiyacını ima etme veya dinlemeden konuşma üzerinden yorumlanır.", "Dürüst ifade, güvenle konuşma ve karşıdakini dinlemeyle anlatılır.", "“Sen hep…” yerine “Ben böyle hissediyorum, ihtiyacım şu…” diyerek açık konuşmak.", "Toplantıda fikrini söylemek, anlamadığını sormak ve teslim tarihlerini netleştirmek.", "Bir isteği kısa ve doğrudan dile getirmek; yanıtı bölmeden dinlemek."],
  "Üçüncü göz çakrası": ["Zihinsel karışıklık, varsayımlara kapılma ve büyük resmi görmekte zorlanmayla yorumlanır.", "Netlik, içgörü ve sezgiyi gözlemle birlikte değerlendirmeyle anlatılır.", "Karşıdakinin niyetini tahmin etmek yerine sormak; tekrar eden ilişki örüntülerini fark etmek.", "Acele karar vermeden verileri incelemek, öncelikleri ayırmak ve farklı olasılıkları görmek.", "Ekrana kısa bir ara verip bildiklerini, varsayımlarını ve bilmediklerini ayırmak."],
  "Taç çakra": ["Anlamdan kopma, sıkışmışlık ve hayatı yalnızca zorunluluklardan ibaret görmeyle yorumlanır.", "İç huzur, bütünlük ve kişisel değerlerle bağ kurmayla anlatılır.", "Farklı inançlara alan açmak ve ilişkinin ortak değerlerini konuşmak.", "İşinin sana ne anlam ifade ettiğini düşünmek; başarıyı yalnızca unvan ve gelirle ölçmemek.", "Sessizlik, doğa veya düşünme zamanı ayırarak değerlerine uygun küçük bir adım seçmek."],
};

export default function ChakraLifeGuide({ name }: { name: string }) {
  if (name === 'Kök çakra') return <section className="topicHubSection chakraBookGuide">
    <article><p className="topicHubEyebrow">01 · TEMELİN</p><h2>Kök çakranın özellikleri</h2>
      <p>Çakra öğretisinde kök çakra, yaşamla kurduğumuz bağın temelini temsil eder. Sanskritçe adı Muladhara olan bu merkez, omurganın tabanıyla ilişkilendirilir; kırmızı renk ve toprak elementiyle simgelenir. Güven, aidiyet, barınma ve temel ihtiyaçlar onun başlıca temalarıdır. “Hayatın içinde kendime ait bir yerim var mı?” sorusu, kök çakranın anlamını özetler.</p>
      <p>Köklenmek, yaşadığın ortamda yer bulmanın yanında bedeninle, ihtiyaçlarınla ve gündelik düzeninle temas kurmaktır. Ev, aile, para ve çalışma hayatı bu nedenle kök çakra anlatımında sıkça yer alır. Düzenli bir yaşam ritmi, destek alabileceğin ilişkiler ve kendi ayaklarının üzerinde durabilme hissi, bu temayı somutlaştırır.</p>
    </article>
    <article><p className="topicHubEyebrow">02 · GÜVEN SARSILDIĞINDA</p><h2>Kök çakra bloke olduğunda</h2>
      <p>Bu öğretide kök çakranın bloke olması, güven ve istikrar konularında zorlanmayı anlatan sembolik bir ifadedir. Kişi belirsizlik karşısında sürekli güvence arayabilir; elindekini kaybetme düşüncesi, değişimden duyduğu korkunun önüne geçmesini zorlaştırabilir. Bazen de kendini bir yere ait hissedemez, gündelik sorumluluklarını toparlamakta güçlük yaşar.</p>
      <p>İlişkilerde bu tema, terk edilme korkusuyla karşıdakini kontrol etme veya güven duymak için sürekli onay bekleme şeklinde düşünülebilir. İş hayatında ise gelir kaybı endişesiyle istemediğin koşullara razı olmak, yeni bir adım atmaktan kaçınmak ya da çalışmayı bıraktığında huzursuz hissetmek buna örnek olabilir. Bu deneyimler tek başına bir çakra blokajını göstermez; yaşadığın koşullar ve geçmiş deneyimlerin de güven duygunu şekillendirir.</p>
    </article>
    <article><p className="topicHubEyebrow">03 · SAĞLAM BİR ZEMİN</p><h2>Kök çakra dengede olduğunda</h2>
      <p>Dengeli kök çakra, bu sembolik anlatımda hayatın içinde daha sağlam durabilmekle ilişkilendirilir. Belirsizlik tamamen ortadan kalkmasa da kişi ihtiyaçlarını fark eder, kaynaklarını gerçekçi değerlendirir ve karşılaştığı sorunları adım adım ele alabilir. Güven duygusu, her şeyi kontrol etme çabasından çok, kendine ve ulaşabileceğin desteğe dayanır.</p>
      <p>İlişkilerde yakınlık kurarken kendi sınırlarını koruyabilir, güveni zaman içinde tutarlı davranışlarla geliştirebilirsin. İş hayatında emeğine sahip çıkmak, bütçeni planlamak ve gerektiğinde yeni seçenekleri değerlendirmek daha mümkün hâle gelir. Günlük yaşamda ise uykuya, beslenmeye, harekete ve ev düzenine yer açmak bu zemini destekler. Kök çakranın dengesi, büyük bir dönüşümden önce, yaşamını taşıyan küçük alışkanlıklara özen göstermeyi hatırlatır.</p>
    </article>
  </section>;
  const chapters = chakraBookGuides[name];
  if (chapters) return <section className="topicHubSection chakraBookGuide">{chapters.map((chapter, index) => <article key={chapter.title}><p className="topicHubEyebrow">0{index + 1} · {['ÖZELLİKLERİ', 'BLOKE OLDUĞUNDA', 'DENGEDE OLDUĞUNDA'][index]}</p><h2>{chapter.title}</h2>{chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>)}</section>;
  const content = guides[name];
  if (!content) return null;
  return <section className="topicHubSection chakraLifeGuide">
    <p className="topicHubEyebrow">DENGENİ FARK ET</p>
    <h2>Kendinde nasıl görünür?</h2>
    <div className="chakraBalanceGrid">
      {content.slice(0, 2).map((text, index) => <article className={`chakraBalanceCard ${index ? 'isBalanced' : 'isBlocked'}`} key={index}><span aria-hidden="true">{index ? '✧' : '◌'}</span><p className="chakraCardLabel">{index ? 'AKIŞ & DENGE' : 'ZORLANMA & BLOKAJ'}</p><h3>{index ? 'Dengede olduğunda' : 'Bloke olduğunda'}</h3><p>{text}</p></article>)}
    </div>
    <div className="chakraLifeRows">{content.slice(2).map((text, index) => <article key={index}><span className="chakraRowNumber" aria-hidden="true">0{index + 1}</span><div><h3>{['İlişkilerde', 'İş hayatında', 'Günlük yaşamda'][index]}</h3><p>{text}</p></div></article>)}</div>
    <p className="chakraSymbolNote">Bu örnekler çakra öğretisinin sembolik yorumlarıdır; bir tanı değildir.</p>
  </section>;
}

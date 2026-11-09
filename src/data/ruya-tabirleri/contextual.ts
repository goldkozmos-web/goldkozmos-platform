import type { DreamGuide } from "./types";
type ContextualReading = Pick<DreamGuide, "intro" | "variations" | "emotionMeaning">;

export const contextualDreamReadings: Partial<Record<string, ContextualReading>> = {
  "ruyada-altin": {
    intro: "Rüyada altın görmek, değer verdiğin şeyleri, emeğinin karşılığını ve kaybetmek istemediğin kaynakları düşünmeye açabilir. Altının nerede bulunduğu, sana ait olup olmadığı ve onunla ne yaptığın önemlidir. Bu sembolik yorum, maddi kazanç veya kayıp haberi olarak değerlendirilmez.",
    variations: [
      { heading: "Rüyada altın bulmak", body: "Beklenmedik bir yerde altın bulmak, gözden kaçırdığın bir değeri veya kendi becerini fark etme düşüncesini çağrıştırabilir. Bulduğunu saklıyorsan paylaşma, güven ve sahiplik duygularını da düşün. Buradaki değer yalnızca para değil, zamanın veya emeğin olabilir." },
      { heading: "Rüyada altın kaybetmek", body: "Kaybolan altını aramak, korumak istediğin bir şey üzerindeki belirsizliği görünür kılabilir. Kaybın ardından panik mi, rahatlama mı yaşadığın yorumu değiştirir. Yakın zamanda bir eşya, ilişki veya konumla ilgili kaygı yaşayıp yaşamadığını hatırla." },
      { heading: "Rüyada altın hediye almak", body: "Hediyeyi veren kişiyle kurduğun bağ, görülme ve takdir edilme ihtiyacını düşündürebilir. Hediye ağır geliyorsa karşılığında bir şey beklenmesi kaygısı öne çıkabilir. Sevinçle kabul etmekle borçlu hissetmek arasındaki farkı kendi deneyimin üzerinden değerlendir." }
    ], emotionMeaning: "Altın karşısında duyduğun sevinç, değerini görme isteğine; sürekli kontrol etme ihtiyacı ise kaybetme kaygısına eşlik edebilir. Rüyayı yorumlarken altının miktarından önce sende kalan hissi ve günlük hayatta değerini hangi ölçülerle belirlediğini düşün."
  },
  "ruyada-anne": {
    intro: "Rüyada anne görmek, bakım, yakınlık ve güven ihtiyacıyla bağlantılı çağrışımlar taşıyabilir. Ancak herkesin anneyle ilişkisi farklıdır; tek bir sıcaklık veya koruma anlamı varsaymak doğru olmaz. Rüyadaki konuşmayı, aranızdaki mesafeyi ve kendi duygunu birlikte ele al.",
    variations: [
      { heading: "Rüyada anneyle konuşmak", body: "Konuşmanın konusu, söylemek istediğin veya duymayı beklediğin bir cümleye işaret edebilir. Sana öğüt veriyorsa bunun kendi düşüncenle nerede örtüştüğünü gözlemle. Bu sahne, annenin gerçek hayatta ne düşündüğünü gösteren bir bilgi değildir." },
      { heading: "Rüyada anneye sarılmak", body: "Sarılma, destek ve anlaşılma isteği üzerinden okunabilir. Rahatlatıcı bir temas ile zorunlu hissettiğin bir yakınlık aynı anlamı taşımaz. Anneni özlüyor olman veya yakın zamanda bir anıyı hatırlaman da rüyanın kişisel bağlamının parçası olabilir." },
      { heading: "Rüyada anneyle tartışmak", body: "Tartışma, aile beklentileri ile kendi seçimin arasındaki gerilimi düşündürebilir. Kimin ne söylediği kadar, sözünü anlatıp anlatamadığın da önemlidir. Rüyadaki çatışmayı gerçek hayatta olacak bir kavganın haberi olarak görmek yerine ifade etmekte zorlandığın ihtiyaca bak." }
    ], emotionMeaning: "Anne figürü özlem, güven, kırgınlık veya sorumluluk gibi çok farklı hisleri canlandırabilir. Sana ait duyguyla toplumun ‘anne’ imgesine yüklediği anlamı ayırmak, yorumu daha kişisel hale getirir."
  },
  "ruyada-araba": {
    intro: "Rüyada araba görmek, hayatındaki yönü, ilerleme hızını ve kararlar üzerindeki söz hakkını düşünmek için bir sembol olabilir. Direksiyonda kimin bulunduğu, yolun koşulları ve varmak istediğin yer birlikte değerlendirilmelidir. Rüyadaki araç, gerçek bir yolculuk veya kaza tahmini değildir.",
    variations: [
      { heading: "Rüyada araba kullanmak", body: "Aracı rahatça kullanmak, kendi yönünü belirleme duygusunu çağrıştırabilir. Direksiyonu zor çevirmek veya yolu görememek ise karar verirken yaşadığın belirsizlikle ilişkilendirilebilir. Nereye gittiğini bilip bilmediğin, hızdan daha önemli bir ayrıntı olabilir." },
      { heading: "Rüyada arabada yolcu olmak", body: "Başkasının sürdüğü araçta olmak, bir kararda ne kadar söz sahibi hissettiğini düşündürebilir. Sürücüye güveniyorsan destek alma, rahatsızsan kendi tercihini anlatma ihtiyacı öne çıkabilir. Yolculuğa isteyerek mi katıldığını da hatırla." },
      { heading: "Rüyada arabanın bozulması", body: "Yolda duran araç, ilerlemek için kullandığın bir yöntemin artık işlemediği hissini canlandırabilir. Yardım istemek, beklemek veya başka bir yol seçmek farklı tepkilerdir. Sahneye yalnızca engel olarak değil, nasıl bir çözüm aradığına bakarak da yaklaşabilirsin." }
    ], emotionMeaning: "Hız seni heyecanlandırıyor mu, korkutuyor mu? Yavaş ilerlemek rahatlık mı, gecikme hissi mi yaratıyor? Aynı araç görüntüsü bu duygulara göre değişir; yaşamında şu anda hangi kararın ritmini ayarlamaya çalıştığını düşün."
  },
  "ruyada-dugun": {
    intro: "Rüyada düğün görmek, bir araya gelme, yeni bir aşamaya geçme ve toplumsal beklentiler üzerine okunabilir. Düğünün kime ait olduğu ve törendeki rolün yorumu değiştirir. Sahne, yaklaşan bir evlilik veya kesin ilişki sonucu anlamına gelmez.",
    variations: [
      { heading: "Rüyada kendi düğününü görmek", body: "Kendi düğünün, bir kararın sorumluluğunu üstlenme veya görünür hale gelme düşüncesini çağrıştırabilir. Törene isteyerek katılmakla hazır olmadan sahneye çıkmak farklı hislerdir. Gerçek yaşamında hangi bağlılığı kendi isteğinle seçtiğini düşün." },
      { heading: "Rüyada başkasının düğününe gitmek", body: "Bir başkasının yeni aşamasına tanık olmak, kıyaslama, sevinç veya kendi hayatının zamanlamasını düşünme ihtiyacını canlandırabilir. Kimin evlendiği ve senin nerede durduğun kişisel çağrışımı belirler. Her değişimi kendi hayatın için bir eksiklik ölçüsüne çevirmek zorunda değilsin." },
      { heading: "Rüyada düğüne yetişememek", body: "Hazırlığın bitmemesi veya törene geç kalmak, beklenen bir role yetişme baskısını düşündürebilir. Unuttuğun şeyin ne olduğu ve gecikmeye verilen tepki önemlidir. Bu sahneyi kötü bir işaret yerine, hangi beklentinin seni acele ettirdiğine bakarak okuyabilirsin." }
    ], emotionMeaning: "Düğündeki sevinç, sıkışmışlık veya yabancılık hissi, bağlılık ve değişimle kurduğun ilişkiyi düşünmene alan açabilir. Kalabalığın beklentisinden ayrı olarak senin ne istediğini fark etmek önemlidir."
  },
  "ruyada-ev": {
    intro: "Rüyada ev görmek, kişisel alan, güven ve yaşam düzeniyle ilgili çağrışımlar taşıyabilir. Ev tanıdık mı, yeni mi; içinde rahatça hareket edebiliyor musun? Odaların, kapıların ve evdeki insanların senin yaşamındaki karşılıkları tek bir hazır tabirden daha açıklayıcı olabilir.",
    variations: [
      { heading: "Rüyada yeni bir eve taşınmak", body: "Yeni ev, değişen ihtiyaçlara yer açma veya farklı bir düzen kurma düşüncesini çağrıştırabilir. Eşyalarının sığmaması, eski alışkanlıkların yeni koşullara uymaması üzerinden okunabilir. Taşınmanın gönüllü olup olmadığı da seçim hissini değiştirir." },
      { heading: "Rüyada eski evini görmek", body: "Eski ev, geçmişteki bir dönemi, aile hafızasını veya tanıdık davranışları hatırlatabilir. İçeri girmek istemekle uzak durmak aynı çağrışımı taşımaz. Rüyadaki evin gerçek evden hangi yönüyle farklı olduğunu düşünmek, bugün geçmişe nasıl baktığını görmene yardımcı olabilir." },
      { heading: "Rüyada evin içinde kaybolmak", body: "Tanımadığın odalar veya çıkışı bulamamak, kendi yaşamında henüz anlamlandıramadığın bir alanla ilişkilendirilebilir. Yeni bir odayı merakla keşfetmek ise başka bir duygu taşır. Güven ararken neyi araştırmak, neyi sınırlandırmak istediğini düşün." }
    ], emotionMeaning: "Evdeki his güven, özlem, sıkışmışlık veya merak olabilir. İç dünyanın tek bir oda gibi sabit olmadığını hatırla; yakın zamanda yaşam alanındaki değişiklikler ve günlük deneyimler de rüyanın bağlamına katılır."
  },
  "ruyada-kapi": {
    intro: "Rüyada kapı görmek, bir alana geçmek, sınır koymak veya erişim beklemek üzerinden yorumlanabilir. Kapının ardını bilmekle yalnızca merak etmek farklı deneyimlerdir. Kapıyı kimin açıp kapattığı, seçim üzerindeki söz hakkını düşünmeye yardımcı olabilir.",
    variations: [
      { heading: "Rüyada açık kapı görmek", body: "Açık bir kapı, erişilebilir bir ihtimali fark etmeyi çağrıştırabilir. İçeri girmek istemiyorsan açıklık tek başına davet anlamına gelmez. Gördüğün seçeneğin sana gerçekten uygun olup olmadığını ve adım atmayı neyin zorlaştırdığını düşün." },
      { heading: "Rüyada kilitli kapı görmek", body: "Kilit, hazırlık, izin veya güven sınırı üzerine okunabilir. Anahtarının bulunması ile başkasından kapıyı açmasını beklemek farklı tutumlardır. Engeli hemen dışarıdaki bir kişiye bağlamadan hangi koşulun henüz netleşmediğine bak." },
      { heading: "Rüyada kapıyı kapatmak", body: "Kapıyı kendi isteğinle kapatmak, bir alanı koruma veya bir dönemi sonlandırma ihtiyacını düşündürebilir. Zorla kapatılması ise dışarıda bırakılma hissi yaratabilir. Kapanışın ardından kalan rahatlama veya pişmanlık kişisel yorumu belirler." }
    ], emotionMeaning: "Kapının önündeki bekleyiş sana heyecan mı, çekinme mi hissettiriyor? Geçişin hızından çok, kendi isteğini duyup duymadığını düşün. Bir kapının kapanması gerçek hayatta bütün seçeneklerin bittiğini göstermez."
  },
  "ruyada-olum": {
    intro: "Rüyada ölüm görmek sarsıcı olabilir; fakat bu görüntü bir ölüm haberi veya geleceğin kanıtı değildir. Sembolik bir okumada bitiş, ayrılık ve değişimle ilgili duygular düşünülebilir. Yakın zamanda yaşadığın bir kayıp veya karşılaştığın bir haber de kişisel bağlamda önemlidir.",
    variations: [
      { heading: "Rüyada kendi ölümünü görmek", body: "Bu sahne, eski bir rolü bırakma veya yaşamındaki büyük bir değişim karşısında belirsizlik hissetme düşüncesini çağrıştırabilir. Olayı dışarıdan izlemekle içinde yoğun korku yaşamak farklı deneyimlerdir. Rüya, kendine zarar vermen veya yaşamında kötü bir olay olacağı anlamına gelmez." },
      { heading: "Rüyada yakınının öldüğünü görmek", body: "Yakın birinin kaybını görmek, o bağı kaybetme korkusunu veya ilişkinin değişmesini düşünmeye açabilir. Bu, o kişiyle ilgili gerçek bir tehlike bilgisi değildir. Özlem, kırgınlık ve söyleyemediğin sözler gibi kişisel çağrışımları ayrı ayrı ele alabilirsin." },
      { heading: "Rüyada ölümden sonra yeniden yaşamak", body: "Sahnenin yeniden başlaması, bir bitişin ardından başka bir ihtimali düşünme üzerinden okunabilir. Yeniden karşılaştığın insan ve mekânlar, geride bıraktığın şeyle neyi sürdürmek istediğini gösterebilir. Yorumu kesin bir ruhsal mesaj yerine kişisel bir anlatım olarak düşün." }
    ], emotionMeaning: "Korku, yas veya rahatlama gibi farklı hisler bu rüyaya eşlik edebilir. Rüyadan kalan duyguyu küçümsemeden, görüntüyü gerçekleşecek bir olay gibi kabul etmemek önemlidir. Yorumun odağı, o an yaşadığın hissi ve kişisel çağrışımlarını anlamaktır."
  },
  "ruyada-ucmak": {
    intro: "Rüyada uçmak, özgürlük, hareket alanı ve bir duruma daha geniş açıdan bakma düşüncesiyle ilişkilendirilebilir. Yükseklik, yön ve uçuş üzerindeki kontrolün kişisel anlamı değiştirir. Bu sahne tek başına başarı veya üstünlük işareti değildir.",
    variations: [
      { heading: "Rüyada rahatça uçmak", body: "Hafiflik ve rahat hareket etmek, bir yükten uzaklaşma veya kendi alanını genişletme isteğini çağrıştırabilir. Nereye gittiğin kadar neden uçmak istediğin de önemlidir. Rüyadaki ferahlığı günlük hayatında hangi küçük değişimin destekleyebileceğini düşün." },
      { heading: "Rüyada uçarken korkmak", body: "Yerden uzaklaşmak seni korkutuyorsa özgürlük ile güven ihtiyacı aynı sahnede bulunabilir. Kontrolün sende olup olmadığı, düşmekten duyduğun kaygıyı değiştirir. Yeni bir seçimin heyecanıyla belirsizliğini birlikte taşıyıp taşımadığını gözlemle." },
      { heading: "Rüyada uçmaya çalışıp uçamamak", body: "Yerinden kalkamamak, hareket etmek isterken bir koşula takılmış hissetme üzerinden okunabilir. Seni tutan şeyin kim veya ne olduğunu hatırla. İstediğin değişimi büyük bir sıçrama yerine küçük bir adımla başlatmak üzerine düşünebilirsin." }
    ], emotionMeaning: "Uçuşun hissi, görüntünün kendisinden daha kişisel olabilir. Neşe, tedirginlik veya yorgunluk farklı ihtiyaçları çağrıştırır; özgürlük isteğini günlük yaşamındaki sorumluluklar ve seçeneklerle birlikte değerlendir."
  },
  "ruyada-yagmur": {
    intro: "Rüyada yağmur görmek, duygusal hareket, rahatlama ve koşulların değişmesi üzerine okunabilir. Hafif bir yağış ile kontrol edemediğin sağanak aynı çağrışımı taşımaz. Yağmurun altında isteyerek durmak veya korunacak yer aramak kişisel yorumun önemli parçalarıdır.",
    variations: [
      { heading: "Rüyada hafif yağmur görmek", body: "Sakin bir yağış, birikmiş duygulara yumuşakça yer açma veya günlük ritmin yavaşlamasıyla ilişkilendirilebilir. Toprak kokusu ve serinlik gibi duyusal ayrıntılar gerçek anıları da canlandırabilir. Sana iyi gelen ortamın hangi özelliğini hatırladığını düşün." },
      { heading: "Rüyada sağanakta ıslanmak", body: "Yoğun yağış altında kalmak, bir durumun etkisine fazla açık hissetmeyi çağrıştırabilir. Kaçmak, beklemek veya yardım aramak farklı tepkilerdir. Islanmanın sende yarattığı his, duygusal yük ile rahatlama arasında ayrım yapmana yardımcı olabilir." },
      { heading: "Rüyada yağmurdan korunmak", body: "Bir çatı veya şemsiye aramak, kişisel alanını koruma ihtiyacına bağlanabilir. Korunduğunda dışarıyı izlemekle hemen yeniden çıkmak farklı tercihlerdir. Günlük hayatında hangi duyguya mesafe, hangisine alan açmak istediğini gözlemle." }
    ], emotionMeaning: "Yağmuru yalnızca bereket veya üzüntüye eşitlemek yerine sahnede nasıl hissettiğine bak. Ferahlık, yalnızlık ve bunalmışlık, aynı hava görüntüsünü farklı bir kişisel hikâyeye dönüştürebilir."
  },
  "ruyada-yol": {
    intro: "Rüyada yol görmek, seçim, ilerleme ve bir hedefle kurduğun ilişki üzerine düşünülebilir. Yolun uzunluğu kadar nereye çıktığı ve oraya gitmek isteyip istemediğin önemlidir. Bir yol ayrımı, gelecekte kesin olarak vereceğin bir kararın haberi değildir.",
    variations: [
      { heading: "Rüyada yol ayrımında kalmak", body: "İki yön arasında beklemek, farklı ihtiyaçlarını aynı anda değerlendirme hissini çağrıştırabilir. Yolların birinin tanıdık, diğerinin bilinmez olması seçimi nasıl yaşadığını değiştirir. Kararı kimin vermesini beklediğini de hatırla." },
      { heading: "Rüyada uzun bir yolda yürümek", body: "Uzun yürüyüş, bir sürecin devamlılığı ve kendi ritminle ilişkilendirilebilir. Yorgunluk, sabır veya keşif duygusu aynı sahnede bulunabilir. Hedefe varmaktan çok yol boyunca sana kimin eşlik ettiği ve ne taşıdığın üzerine düşün." },
      { heading: "Rüyada yolu kaybetmek", body: "Yönünü bulamamak, planın net olmadığı bir dönemi çağrıştırabilir. Bir işaret aramak veya birine sormak, destek alma biçimini görünür kılar. Bu sahne başarısızlık hükmü değildir; hangi bilgiye veya açıklığa ihtiyaç duyduğunu düşünmeye açılır." }
    ], emotionMeaning: "Acele, merak veya durmak istemek, yolun kişisel anlamını değiştirir. Günlük yaşamında yalnızca nereye gitmek istediğini değil, hangi hızın sana uygun olduğunu da değerlendirebilirsin."
  },
  "ruyada-anahtar": {
    intro: "Rüyada anahtar görmek, erişim, çözüm ve bir alan üzerindeki sorumlulukla ilişkilendirilebilir. Anahtarın hangi kapıya ait olduğunu bilmek, onu aramak veya başkasına vermek farklı çağrışımlar taşır. Anahtarı otomatik bir fırsat ya da kazanç haberi olarak değerlendirme.",
    variations: [
      { heading: "Rüyada anahtar bulmak", body: "Bir anahtarı fark etmek, yeni bir çözümü görme veya henüz kullanmadığın bir imkânı düşünme üzerinden okunabilir. Hangi kapıya uyduğunu bilmiyorsan fırsat kadar belirsizlik de vardır. Elindeki bilgiyi hangi konuda kullanmak istediğini düşün." },
      { heading: "Rüyada anahtarı kaybetmek", body: "Anahtar aramak, erişim veya kontrol kaygısını canlandırabilir. Ev, araç veya iş yeri anahtarı, yaşamındaki farklı alanları çağrıştırır. Ararken yanında kimin olduğu, kendi başına çözmekle destek almak arasındaki tutumunu gösterebilir." },
      { heading: "Rüyada anahtarın kapıyı açmaması", body: "Bir yöntemin beklenen sonucu vermemesi, tanıdık bir çözümün yeni koşullara uymadığını düşündürebilir. Aynı anahtarı tekrar denemekle başka bir yol aramak farklı tepkilerdir. Sorunun yalnızca sende olduğunu varsaymadan kapının ve koşulların değişip değişmediğine bak." }
    ], emotionMeaning: "Anahtarın yarattığı güven veya kaygı, erişmek istediğin şeyle ilişkin üzerinden anlam kazanır. Kendi alanını açma hakkın ile başka birinin sınırına saygı arasında nasıl bir denge kurduğunu düşün."
  },
  "ruyada-agac": {
    intro: "Rüyada ağaç görmek, kökler, büyüme ve zamanla kurulan bağları çağrıştırabilir. Ağacın türü, bulunduğu yer ve ona ne yaptığın kişisel yorumu değiştirir. Bir aile hatırası veya yakın zamanda gördüğün bir manzara da bu görüntüye eşlik edebilir.",
    variations: [
      { heading: "Rüyada yeşil ağaç görmek", body: "Canlı yapraklar, bakım verdiğin bir alanın büyümesi düşüncesiyle ilişkilendirilebilir. Gölgesinde dinlenmekle dallarına tırmanmak farklı ihtiyaçları çağrıştırır. Seni besleyen ilişki veya düzenin hangi yanına dikkat ettiğini düşün." },
      { heading: "Rüyada kurumuş ağaç görmek", body: "Kuruyan dallar, artık beslenmeyen bir alışkanlığı veya yorgun hissettiğin bir bağı düşünmeye açabilir. Bu, kayıp olacağına dair bir işaret değildir. Ağacı kurtarmak istemen veya ondan uzaklaşman, kendi kaynaklarını nereye ayırdığını görmene yardımcı olabilir." },
      { heading: "Rüyada ağaç dikmek", body: "Bir fidan dikmek, hemen sonuç almadan bir şeye emek verme isteğini çağrıştırabilir. Toprağı hazırlamak ve su vermek, başlangıcın koşullarına dikkat etmeyi gösteren ayrıntılardır. Hangi bağın veya projenin zamana ihtiyaç duyduğunu düşün." }
    ], emotionMeaning: "Ağaç karşısında hissettiğin aidiyet, hayranlık veya hüzün, geçmiş ve gelişimle kurduğun ilişkiye eşlik edebilir. Büyümeyi yalnızca hızla ölçmek yerine hangi koşulların sana destek olduğunu fark etmeye çalış."
  },
  "ruyada-aldatilmak": {
    intro: "Rüyada aldatılmak, güven, önemsenme ve kaybetme korkusuyla ilgili duyguları canlandırabilir. Rüya, partnerinin gerçekte aldattığının kanıtı değildir. Sahnedeki kişi, öğrendiğin şey ve verdiğin tepki üzerinden kendi duygusal ihtiyacına bakmak daha kişisel bir başlangıç sunar.",
    variations: [
      { heading: "Rüyada partnerinin aldattığını görmek", body: "Sahne, ilişkide güvende hissetme ihtiyacını veya yakın zamanda yaşanan bir belirsizliği çağrıştırabilir. Gerçek yaşamda bildiklerini, varsaydıklarını ve korkularını ayrı düşün. Rüyaya dayanarak birini suçlamak yerine iletişimde hangi sorunun açık kaldığını fark edebilirsin." },
      { heading: "Rüyada aldatıldığını birinden öğrenmek", body: "Bilginin başkasından gelmesi, başkalarının görüşüne ne kadar önem verdiğini veya bir gerçeği dışarıdan duymaktan duyduğun kaygıyı düşündürebilir. Haberi veren kişiyle ilişkin de sahnenin bir parçasıdır. Rüyadaki bilgi gerçek bir haber gibi ele alınmaz." },
      { heading: "Rüyada aldatılmaya tepki verememek", body: "Konuşamamak veya ortamdan ayrılamamak, kırgınlığını ifade ederken zorlanma hissiyle ilişkilendirilebilir. Burada odak yalnızca ihanet görüntüsü değil, kendi sınırını nasıl koruduğundur. Günlük hayatta hangi ihtiyacını açıkça söylemek istediğini düşün." }
    ], emotionMeaning: "Öfke, utanç, korku ve şaşkınlık birbirinden farklı ihtiyaçlar taşıyabilir. Duygunu ciddiye alırken rüyayı dış dünyadaki bir olayın doğrulanması gibi görmemek, daha açık ve adil bir değerlendirme sağlar."
  },
  "ruyada-ayna": {
    intro: "Rüyada ayna görmek, kendine nasıl baktığını, görünür olma isteğini ve başkalarının bakışına verdiğin önemi düşündürebilir. Yansımada ne gördüğün ve aynaya bakmak isteyip istemediğin birlikte ele alınmalıdır. Görüntü bir kişilik hükmü veya gelecek işareti değildir.",
    variations: [
      { heading: "Rüyada aynada kendini görmek", body: "Kendi görüntünü incelemek, kendini tanıma veya nasıl algılandığını düşünme ihtiyacını çağrıştırabilir. Yansımayı beğenmekle sürekli bir kusur aramak farklı deneyimlerdir. Kendine yönelttiğin ölçütün ne kadar sana ait olduğunu düşün." },
      { heading: "Rüyada aynada farklı bir yüz görmek", body: "Tanımadığın bir yansıma, değişen bir rolü veya kendinde henüz alışmadığın bir yönü düşündürebilir. Yüzün kime benzediği kişisel çağrışımı etkiler. Bu görüntü doğaüstü bir varlığa dair kanıt olarak yorumlanmaz." },
      { heading: "Rüyada kırık ayna görmek", body: "Parçalanan yansıma, kendini farklı bakışlarla değerlendirme veya bütünlük hissinin zorlanması üzerinden okunabilir. Kırık aynayı kötü şansla eşitlemek gerekmez. Parçalara bakmakla onlardan uzaklaşmak arasındaki tepkin, o anki ihtiyacını düşündürebilir." }
    ], emotionMeaning: "Aynadaki görüntüye verdiğin duygu, kendinle konuşma biçimine bakmana alan açabilir. Merak, yargı veya yabancılık hissini, günlük yaşamında karşılaştığın değerlendirmelerle birlikte düşün."
  },
  "ruyada-at": {
    intro: "Rüyada at görmek, hareket, güç ve kendi ritminle ilerleme düşüncesini çağrıştırabilir. Atın sakinliği, bulunduğu ortam ve onunla kurduğun temas önemlidir. Rüyayı belirli bir sonuç haberi yerine, güç ve yön duygunla kurduğun kişisel bir ilişki olarak okuyabilirsin.",
    variations: [
      { heading: "Rüyada ata binmek", body: "Atla uyumlu ilerlemek, hareket ederken kendi isteğinle koşulları dengeleme düşüncesini çağrıştırabilir. Kontrol etmekte zorlanıyorsan hız veya sorumlulukla ilgili hislerin öne çıkabilir. Nereye gittiğini bilmekle yalnızca sürüklenmek farklı çağrışımlardır." },
      { heading: "Rüyada koşan at görmek", body: "Uzaktan izlenen güçlü bir hareket, kendi harekete geçme isteğini düşünmeye açabilir. Atın serbest olmasıyla bir yarış içinde koşması, özgürlük ve değerlendirilme temalarını ayırır. Senin sahnede izleyen mi, katılan mı olduğuna dikkat et." },
      { heading: "Rüyada atı beslemek", body: "Güçlü bir canlıya bakım vermek, kendi enerjini ve devamlılığını destekleme isteğiyle ilişkilendirilebilir. Atın sana yaklaşması veya uzak durması güven duygusunu değiştirir. İlerlemek için hangi temel ihtiyacını ihmal ettiğini düşün." }
    ], emotionMeaning: "At karşısında cesaret, hayranlık veya korku hissedebilirsin. Bu his, gücü kullanma ve ona yaklaşma biçiminle bağlantılı çağrışımlar yaratır; görüntüyü herkese aynı anlama gelecek bir tabire indirgeme."
  }
};

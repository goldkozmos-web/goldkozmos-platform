import { contextualDreamReadings } from "./contextual";
import type { DreamGuide } from "./types";

// Original editorial notes: symbol | reading | contextual variation | reflection.
const entries = `
Abdest almak|Arınma ve yeni bir meseleye hazırlanma isteği üzerine okunabilir.|Temiz su iç rahatlığını, su bulamamak ise hazır hissetmekte zorlanmayı çağrıştırabilir.|Hangi meseleye başlamadan önce içimi rahatlatmalıyım?
Acıkmak|Karşılanmamış bir ihtiyaç, ilgi veya dinlenme isteğini görünür kılabilir.|Yemek aramak ihtiyacını fark etmeyi, yiyememek ise karşılığını bulamama hissini düşündürebilir.|Hayatımda karşılanmayı bekleyen ihtiyaç ne?
Ada|Kişisel alan, yalnızlık ve dış dünyadan uzaklaşma temalarını taşıyabilir.|Rahat olmak dinlenmeyi, mahsur kalmak ise destekten kopmuş hissetmeyi düşündürebilir.|Yalnızlık bana alan mı açıyor, beni daraltıyor mu?
Ağaç|Kökler, aile bağı ve zamanla büyüyen emekle ilişkilendirilebilir.|Yeşeren ağaç gelişimi, kuruyan dallar bakıma ihtiyaç duyan bir alanı çağrıştırabilir.|Hangi bağımı beslemek istiyorum?
Ağız|İfade ve söylenen ya da saklanan sözler üzerine okunabilir.|Konuşamamak anlatılmamış bir ihtiyacı, yabancı sözler ise başkasının beklentisini taşımayı düşündürebilir.|Hangi cümleyi içimde tutuyorum?
Ahtapot|Aynı anda birçok sorumluluğa yetişmekle ilişkilendirilebilir.|Seni tutan kollar baskıyı, uzaktan izlemek ise dağınık işleri düzenleme arayışını çağrıştırabilir.|Kaç farklı konuya aynı anda yetişiyorum?
Aile|Aidiyet ve yakınlardan beklenen destek üzerine okunabilir.|Ortak sofra sıcaklığı, tartışma ise konuşulmamış beklentileri görünür kılabilir.|Hangi aile rolünü istemeden üstleniyorum?
Akbaba|Bir sona yaklaşma ve geride kalanla ilişki üzerine yorumlanabilir.|Uzakta uçması gözlemlemeyi, çok yaklaşması kişisel sınırı koruma ihtiyacını düşündürebilir.|Bitmiş bir durumu hâlâ taşıyor muyum?
Akrep|Savunma ve incinme korkusunu çağrıştırabilir.|Sokulmak kırıcı bir olayın izini, uzaklaştırmak sınırlarını netleştirmeyi düşündürebilir.|Hangi sınırı konuşmalıyım?
Akşam|Bir dönemi tamamlama ve dinlenmeye geçiş üzerine okunabilir.|Huzur kapanışı, karanlığa yetişme telaşı bitmemiş işlerin baskısını çağrıştırabilir.|Günü kapatırken neyi bırakabilirim?
Aldatılmak|Güven ve kaybetme korkusu üzerine okunabilir; aldatmanın kanıtı değildir.|Tanıdık kişi belirli bir bağa, belirsiz kişi ise genel güvensizliğe dair çağrışım yaratabilir.|Güven ihtiyacımı nasıl anlatabilirim?
Aldatmak|Bir bağlılık ile farklı bir istek arasındaki çatışmayı çağrıştırabilir.|Suçluluk duymak değerlerinle beklentin arasındaki mesafeyi düşündürebilir.|Hangi isteğimi dile getirmiyorum?
Alışveriş|Seçimler ve ihtiyaçlar üzerine okunabilir.|İhtiyacını bulmak netliği, sürekli başka ürüne geçmek kararsızlığı düşündürebilir.|İstediğim şey gerçekten ihtiyaç mı?
Altın|Değer ve korumak istediğin kaynaklarla ilişkilendirilebilir.|Bulmak bir değeri fark etmeyi, kaybetmek özdeğer veya güven kaygısını çağrıştırabilir.|Değerimi hangi dış ölçüye bağlıyorum?
Alyans|Bağlılık ve ortak gelecek beklentileri üzerine okunabilir.|Dar yüzük baskıyı, kaybolması bağlılığın biçimine dair belirsizliği düşündürebilir.|Hangi sözü gerçekten vermek istiyorum?
Amca|Aile içindeki otorite ve dayanışmayla ilişkilendirilebilir.|Yardım destek ihtiyacını, eleştiri aile beklentilerinin etkisini çağrıştırabilir.|Hangi aile mesajı kararlarımı etkiliyor?
Anahtar|Çözüm ve yeni bir alana erişim üzerine yorumlanabilir.|Kapıyı açmak uygun yolu, uymaması alışılmış çözümün işlememesini düşündürebilir.|Hangi kapıyı tekrar tekrar deniyorum?
Anne|Bakım, korunma ve ihtiyaçlarını duyma üzerine okunabilir.|Sıcak konuşma desteği, mesafe görülme ihtiyacını çağrıştırabilir.|Kendime nerede daha çok şefkat gösterebilirim?
Anneanne|Aile hafızası ve geçmişin sıcaklığıyla ilişkilendirilebilir.|Birlikte yemek yapmak süren bağı, eski ev hatırlanan güven alanını çağrıştırabilir.|Geçmişten bana destek olan neyi taşıyorum?
Araba|Yön, kontrol ve hedefe ilerleme biçimi üzerine okunabilir.|Direksiyonda olmak seçimini, başkasının kullanması kararları devretmeyi düşündürebilir.|Gittiğim yönü ben mi seçiyorum?
Arı|Birlikte üretim ve emeğin karşılığı üzerine okunabilir.|Kovan düzeni, sokulmak çalışırken sınır aşılması hissini çağrıştırabilir.|Üretirken alanımı koruyor muyum?
Arkadaş|Paylaşım ve sosyal çevredeki yerinle ilişkilendirilebilir.|Eski arkadaş geçmişteki halini, dışlanma kabul görme kaygısını düşündürebilir.|Hangi arkadaşlıkta kendim gibi hissediyorum?
Armut|Olgunlaşmayı bekleyen bir fırsatla ilişkilendirilebilir.|Olgun meyve hazır oluşu, ham meyve acele sonuç istemeyi çağrıştırabilir.|Hangi sonucu erken bekliyorum?
Asansör|Konum değiştirme ve kontrolün dışarıda olması üzerine okunabilir.|Yükselmek ilerlemeyi, takılı kalmak geçişte sıkışmayı düşündürebilir.|Hangi alanda hareket etmek için bekliyorum?
Asker|Görev ve kurala uyma zorunluluğunu çağrıştırabilir.|Üniforma üstlenilen rolü, emir almak tercihin geri planda kalmasını düşündürebilir.|Hangi görevde kendi ihtiyacımı unutuyorum?
Aslan|Güç ve görünürlük üzerine okunabilir.|Sakin aslan gücü yönetmeyi, saldırı baskın bir duygu karşısındaki gerilimi çağrıştırabilir.|Gücümü nerede yumuşatmalıyım?
At|Hareket ve özgürce ilerleme isteğiyle ilişkilendirilebilir.|Rahat binmek ritimle uyumu, kontrolden çıkması hızın yönetilememesini düşündürebilir.|Kendi ritmimi dinliyor muyum?
Ateş|Yoğun duygu ve harekete geçiren enerjiyle ilişkilendirilebilir.|Isıtan ateş canlılığı, yayılan alev yönetilemeyen gerilimi çağrıştırabilir.|Hangi duygu hem güç hem yük oluyor?
Avize|Görünürlük ve ortamın havasıyla ilişkilendirilebilir.|Parlaklık netliği, kırılma gösterişli düzenin kırılganlığını düşündürebilir.|Dışarıdan iyi görünen hangi düzen yoruyor?
Ay|Duygular ve değişken iç ritimle ilişkilendirilebilir.|Dolunay görünür duyguyu, hilal gelişmekte olan niyeti çağrıştırabilir.|Hangi duygum bugün daha görünür?
Ayakkabı|Yola hazırlanma ve hayattaki rolle ilişkilendirilebilir.|Dar ayakkabı beklenti baskısını, yalınayaklık özgürlük veya korunmasızlığı düşündürebilir.|Hangi rol bana dar geliyor?
Ayı|Korunma ve kişisel alan ihtiyacını çağrıştırabilir.|Uyuyan ayı dinlenmeyi, yaklaşması sınırlarını savunmayı düşündürebilir.|Güven için nasıl bir alana ihtiyacım var?
Ayna|Kendini görme ve kendine yönelttiğin değerlendirmeyle ilişkilendirilebilir.|Net yansıma tanımayı, yabancı yüz kendine dair çelişkili bakışı çağrıştırabilir.|Kendime kimin gözünden bakıyorum?
Ayrılık|Veda ve kaybetme kaygısı üzerine okunabilir.|Rahatlama bırakma ihtiyacını, üzüntü bağı koruma isteğini düşündürebilir.|Neyi korumak, neye veda etmek istiyorum?
Baba|Otorite ve onay arayışıyla ilişkilendirilebilir.|Tartışma kendi kararını savunmayı, destek dayanak arayışını çağrıştırabilir.|Kimin onayını bekliyorum?
Bahçe|Emekle korunan kişisel alanı çağrıştırabilir.|Bakımlı bahçe düzenli ilgiyi, yabani otlar ertelenen işleri düşündürebilir.|Hangi yaşam alanımı beslemiyorum?
Balık|Duygusal akış ve görünür olmayan düşünceyle ilişkilendirilebilir.|Temiz su rahat akışı, karadaki balık uygun olmayan ortamı çağrıştırabilir.|Hangi ortamda rahat hareket edemiyorum?
Balon|Hafiflik ve geçici beklentilerle ilişkilendirilebilir.|Uçup gitmek kontrolü bırakmayı, patlamak büyütülmüş beklentinin dağılmasını düşündürebilir.|Hangi beklentiyi fazla büyütüyorum?
Banyo|Özel alan ve yorgunluğu üzerinden atma isteğiyle ilişkilendirilebilir.|Rahat yıkanmak yenilenmeyi, kapanmayan kapı mahremiyet kaygısını çağrıştırabilir.|Kendime ait zamanım korunuyor mu?
Bardak|İhtiyaç ve duyguyu taşıma kapasitesi üzerine okunabilir.|Doluluk yeterliliği, taşmak kapasitenin üstündeki talepleri düşündürebilir.|Hangi konuda kapasitem doldu?
Bayrak|Aidiyet ve savunulan değerle ilişkilendirilebilir.|Taşımak sorumluluğu, belirsiz bayrak ait olma kararsızlığını çağrıştırabilir.|Hangi değeri isteyerek savunuyorum?
Beyaz|Yeni sayfa ve sadeleşme isteğiyle ilişkilendirilebilir.|Huzur ferahlığı, soğuk his uzaklığı çağrıştırabilir.|Neyi sadeleştirmek istiyorum?
Bıçak|Ayırmak ve keskin sözlerin etkisiyle ilişkilendirilebilir.|Kesmek kararı, tehdit baskı hissini düşündürebilir.|Hangi ayrımı net yapmalıyım?
Bilet|Bir geçişe hazırlanmayla ilişkilendirilebilir.|Kaybetmek yetişememe kaygısını, bulmak seçeneğin netleşmesini çağrıştırabilir.|Gitmek istediğim yola hazır mıyım?
Bisiklet|Kendi emeğinle ilerleme ve denge kurma üzerine okunabilir.|Rahat sürmek uyumu, zincirin çıkması küçük aksamanın etkisini düşündürebilir.|Hangi küçük düzenleme ilerlememi kolaylaştırır?
Böcek|Biriken küçük rahatsızlıklarla ilişkilendirilebilir.|Tek böcek somut sorunu, yayılmak küçük meselelerin zihni kaplamasını çağrıştırabilir.|Ertelediğim hangi küçük konu büyüdü?
Buz|Mesafe ve bekleme üzerine okunabilir.|Eriyen buz yumuşamayı, kaygan zemin güvenli adım ihtiyacını düşündürebilir.|Hangi duygumu donduruyorum?
Bulut|Belirsiz düşünce ve değişen ruh haliyle ilişkilendirilebilir.|Dağılması açıklığı, ağır bulut birikmiş duyguyu çağrıştırabilir.|Netleşmesini beklediğim mesele ne?
Büyük dalga|Yoğun değişimin karşısında kalma hissini çağrıştırabilir.|Kaçmak bunalmayı, üzerinde kalmak değişimle hareket etmeyi düşündürebilir.|Beni aşar gibi gelen değişim ne?
Cami|Topluluk ve manevi yön arayışıyla ilişkilendirilebilir.|İçeride huzur aidiyeti, kapıda kalmak kabul görme sorusunu çağrıştırabilir.|Manevi hayatımda nerede rahat hissediyorum?
Cam|Görmek ile temas arasındaki mesafeyle ilişkilendirilebilir.|Şeffaflık açıklığı, kırık cam korunma ihtiyacını düşündürebilir.|Hangi sınır hem koruyor hem uzaklaştırıyor?
Cenaze|Veda ve bir dönemin kapanışı üzerine okunabilir; ölüm haberi sayılmaz.|Tanıdık kişi o bağdaki değişimi, isimsiz cenaze eski alışkanlıktan ayrılmayı çağrıştırabilir.|Hangi kapanışı kabul etmeye çalışıyorum?
Ceviz|Açılması emek isteyen değerle ilişkilendirilebilir.|Kabuğu kırmak engeli aşmayı, boş ceviz karşılık bulamamayı düşündürebilir.|Emek verdiğim şeyin değeri ne?
Cüzdan|Kaynak ve kişisel güvenle ilişkilendirilebilir.|Kaybetmek kontrol kaygısını, bulmak unutulan imkânı çağrıştırabilir.|Güvenimi yalnızca sahip olduklarımla mı kuruyorum?
Çanta|Taşınan sorumluluklarla ilişkilendirilebilir.|Ağır çanta fazla yükü, unutmak ihtiyaçlarına hazırlıksızlığı düşündürebilir.|Taşıdığım hangi yük bana ait değil?
Çay|Sohbet ve küçük molalarla ilişkilendirilebilir.|Birlikte içmek paylaşımı, soğumak ertelenen görüşmeyi çağrıştırabilir.|Kiminle sakin konuşmaya ihtiyacım var?
Çiçek|Özen ve duygusal ifadeyle ilişkilendirilebilir.|Açmak beslenen bağı, solmak ilgi ihtiyacını düşündürebilir.|Neye düzenli özen gösterebilirim?
Çocuk|Merak ve hassas ihtiyaçlarla ilişkilendirilebilir.|Oyun serbestliği, kaybolmak hassas yanını gözden kaçırmayı çağrıştırabilir.|Küçük ihtiyaçlarıma yer veriyor muyum?
Çorap|Günlük konforla ilişkilendirilebilir.|Islaklık küçük rahatsızlıkların etkisini, eşini bulamamak düzende eksikliği düşündürebilir.|Küçük görünen hangi ihtiyaç rahatımı etkiliyor?
Çöl|Yalnızlık ve azalan kaynaklarla ilişkilendirilebilir.|Su bulmak desteği, aynı yerde dönmek yön ihtiyacını çağrıştırabilir.|Nerede desteksiz hissediyorum?
Çöp|Birikmiş işler ve bırakma ihtiyacını çağrıştırabilir.|Atmak sadeleşmeyi, biriktirmek geçmişle vedalaşamamayı düşündürebilir.|Neyi taşımam artık gerekmiyor?
Dağ|Hedef ve büyük görünen emekle ilişkilendirilebilir.|Zirve ilerlemeyi, kayıp yol hedefi adımlara bölmeyi çağrıştırabilir.|Gerçekçi ilk adımım ne?
Davul|Duyulmak ve ortak ritimle ilişkilendirilebilir.|Düzenli ses uyumu, gürültü çevrenin taleplerinin baskısını düşündürebilir.|Kendi ritmimi nerede kaybediyorum?
Deprem|Güvenli düzenin sarsılmasıyla ilişkilendirilebilir; afet tahmini değildir.|Evin sallanması kişisel güveni, dışarı çıkmak yeni dayanak arayışını çağrıştırabilir.|Dayandığım hangi düzen değişiyor?
Ders|Öğrenme ve hazır olma beklentisiyle ilişkilendirilebilir.|Anlamamak yetersizlik kaygısını, öğrenmek gelişime açıklığı düşündürebilir.|Bilmediğimi kabul etmek nerede zor geliyor?
Düğün|Birleşme ve yeni aşama üzerine okunabilir.|Kendi düğünün sorumluluğu, başkasınınki değişime tanıklığı çağrıştırabilir.|Hangi yeni karara hazırlanıyorum?
Düşmek|Kontrol azalması ve güvensizlikle ilişkilendirilebilir.|Yüksekten düşmek dayanak kaygısını, tutulmak destek arayışını düşündürebilir.|Hangi konuda sağlam dayanak istiyorum?
Doktor|Destek arama ve bakım ihtiyacıyla ilişkilendirilebilir.|Muayene incelenme hissini, ulaşamamak yardım bulamama kaygısını çağrıştırabilir.|Nerede yardım isteyebilirim?
Dolap|Saklanan şeyler ve özel alanla ilişkilendirilebilir.|Açmak görünmeyeni fark etmeyi, kapanmamak biriken meseleleri düşündürebilir.|Neyi görünmez tutuyorum?
Duvar|Korunma ve ilerleyişin önündeki sınırla ilişkilendirilebilir.|Aşmak alternatif bulmayı, örmek mesafe ihtiyacını çağrıştırabilir.|Bu sınır beni neye karşı koruyor?
Ekmek|Temel ihtiyaç ve paylaşım üzerine okunabilir.|Tazelik yeterliliği, bitmek kaynak kaygısını düşündürebilir.|En temel ihtiyacım ne?
El|Yapabilme ve yardım alışverişiyle ilişkilendirilebilir.|Tutmak yakınlığı, karşılık bulamamak destek bekleyişini çağrıştırabilir.|Yardımı kabul etmek nerede zor geliyor?
Elbise|Sosyal rol ve görünür olmaya hazırlanmayla ilişkilendirilebilir.|Rahatlık kendinle uyumu, uymayan elbise dış beklentiye sığmayı düşündürebilir.|Görünür olurken hangi rolü giyiyorum?
Elma|Beslenme ve çekici görünen imkânla ilişkilendirilebilir.|Tazelik canlılığı, çürük iç dış görünüş ile deneyim farkını çağrıştırabilir.|Bir seçeneği yalnızca görüntüsüyle mi değerlendiriyorum?
Ev|Kişisel güven ve iç dünyayla ilişkilendirilebilir.|Yeni ev değişen ihtiyacı, eski ev geçmiş alışkanlıkları düşündürebilir.|Yaşam alanım hangi ihtiyacımı karşılamıyor?
Evlilik|Ortaklık ve uzun vadeli karar üzerine okunabilir.|İstekli olmak bağlılığı, istememek başkasının beklentisini çağrıştırabilir.|Söz verirken kendi isteğimi duyuyor muyum?
Fırtına|Yoğun duygu içinde yönünü korumayla ilişkilendirilebilir.|Sığınmak desteği, dinmesi gerilim sonrası rahatlamayı düşündürebilir.|Zorlandığımda hangi dayanağa dönüyorum?
Fil|Hafıza ve ağır sorumlulukla ilişkilendirilebilir.|Sakinlik dayanıklılığı, yolu kapatmak büyük görünen yükü çağrıştırabilir.|Büyük sorumluluğumla nasıl ilişkim var?
Fotoğraf|Geçmişteki kimlik ve hatırayı korumayla ilişkilendirilebilir.|Eski görüntü karşılaştırmayı, bulanıklık net hatırlanmayan olayı düşündürebilir.|Hangi geçmiş görüntü bugünkü bakışımı etkiliyor?
Gemi|Birlikte yol alma ve yön bulmayla ilişkilendirilebilir.|Sakin deniz ortak ritmi, su almak paylaşılan yükün güvenini çağrıştırabilir.|Birlikte ilerlediğim insanlara güveniyor muyum?
Gelinlik|Yeni rol ve görünür bağlılıkla ilişkilendirilebilir.|Rahatlık seçime uyumu, darlık beklenti baskısını düşündürebilir.|Bana ait olmayan beklenti ne?
Gökkuşağı|Farklı duygular ve gerilim sonrası ferahlıkla ilişkilendirilebilir.|Yağmur sonrası görünmek rahatlamayı, uzakta kalmak umutla beklemeyi çağrıştırabilir.|Hangi küçük ferahlığı görebiliyorum?
Göl|Duygusal birikim ve iç dünyayı gözlemlemeyle ilişkilendirilebilir.|Durgunluk durup bakmayı, bulanıklık adlandırılmamış duyguyu düşündürebilir.|İçimde ne birikiyor?
Göz|Dikkat ve değerlendirilme hissiyle ilişkilendirilebilir.|Kapanmak bakmaktan kaçınmayı, çok göz yargılanmayı çağrıştırabilir.|Hangi gerçeğe bakmayı erteliyorum?
Gül|Sevgi ve hassasiyetle ilişkilendirilebilir.|Açmış gül ilgiye açıklığı, diken yakınlıkta sınır ihtiyacını düşündürebilir.|Yakınlıkta hangi sınır önemli?
Güneş|Canlılık ve açıklıkla ilişkilendirilebilir.|Ilık güneş rahatlığı, kavurması yoğun hareketin yükünü çağrıştırabilir.|Beni canlı hissettiren ne?
Güvercin|Barışma ve güvenli bağla ilişkilendirilebilir.|Yanına konmak yakınlaşmayı, uçmak mesafeye alan vermeyi düşündürebilir.|Hangi ilişkide sakin iletişim kurabilirim?
Halı|Ev içi rahatlık ve gizli birikimle ilişkilendirilebilir.|Altına saklamak ertelemeyi, temizlemek gündelik özeni çağrıştırabilir.|Hangi meseleyi görünmez yapıyorum?
Hamilelik|Zaman isteyen oluşumla ilişkilendirilebilir; gebelik göstergesi değildir.|Sevinç hazırlığa açıklığı, kaygı yeni yükü düşündürebilir.|Henüz görünür olmayan neyi taşıyorum?
Hastane|Bakım ve destek ihtiyacıyla ilişkilendirilebilir.|Beklemek belirsizliği, ziyaret bakım sorumluluğunu çağrıştırabilir.|Bakım verme ve alma dengem nasıl?
Hırsız|Alan ihlali ve kaynak kaybı kaygısıyla ilişkilendirilebilir.|Çalınan eşya korunan değeri, durdurmak sınır ihtiyacını düşündürebilir.|Zamanımı nerede koruyamıyorum?
Hoca|Rehberlik ve otoriteden gelen mesajla ilişkilendirilebilir.|Destek öğrenmeye açıklığı, eleştiri değerlendirilme kaygısını çağrıştırabilir.|Hangi ses yol gösteriyor, hangisi küçültüyor?
Işık|Açıklık ve yön bulmayla ilişkilendirilebilir.|Yanması fark etmeyi, sönmesi yön arayışını düşündürebilir.|Net görmek istediğim mesele ne?
Irmak|Süreç ve değişimle ilişkilendirilebilir.|Akıntıyla gitmek uyumu, karşıya geçmek eşiği çağrıştırabilir.|Değişime nerede direniyorum?
İğne|Hassas ayrıntı ve onarmayla ilişkilendirilebilir.|Dikiş bağı onarmayı, batmak küçük ama inciten sözü düşündürebilir.|Küçük dediğim hangi incinmeyi konuşmadım?
İnci|Zamanla oluşan değerle ilişkilendirilebilir.|Bulmak değeri fark etmeyi, kopan kolye bütünlüğü korumayı çağrıştırabilir.|Hangi sessiz emeğim değerli?
İp|Bağ ve sorumlulukla ilişkilendirilebilir.|Düğüm çözülmemiş konuyu, kopma bırakma ihtiyacını düşündürebilir.|Hangi bağın düğümünü açıyorum?
İş yeri|Üretim ve değerlendirilme temalarını taşıyabilir.|Eski iş geçmiş beklentileri, boş ofis emeğin görülmemesini çağrıştırabilir.|Emeğimi ve sınırımı anlatabiliyor muyum?
Jandarma|Korunma ve kurala karşı sorumlulukla ilişkilendirilebilir.|Yardım güveni, sorgulanmak yargılanma kaygısını düşündürebilir.|Nerede kendimi açıklamak zorunda hissediyorum?
Jet|Hızlı geçiş ve uzak hedefle ilişkilendirilebilir.|Yetişmek hız baskısını, izlemek değişime uzaktan bakmayı çağrıştırabilir.|Aceleyi kim belirliyor?
Kahve|Duraklama ve konuşmayı sindirmeyle ilişkilendirilebilir.|Birlikte içmek sohbeti, taşmak taleplerle dolan molayı düşündürebilir.|Molam gerçekten bana ait mi?
Kalabalık|Sosyal beklenti ve kendi sesini bulmayla ilişkilendirilebilir.|Rahat olmak aidiyeti, kaybolmak isteğini duyamamayı çağrıştırabilir.|Çevrenin içinde benim isteğim ne?
Kan|Canlılık ve kayıp hissiyle ilişkilendirilebilir; hastalık göstergesi değildir.|Durdurmak kaynak korumayı, başkasında görmek yetişme kaygısını düşündürebilir.|Beni tüketen durumda sınırımı nasıl korurum?
Kapı|Yeni alana geçiş ve seçimle ilişkilendirilebilir.|Açık kapı erişimi, kilit hazırlık veya izin beklemeyi çağrıştırabilir.|Hangi geçişin önündeyim?
Kar|Yavaşlama ve örtülmüş duygularla ilişkilendirilebilir.|Yumuşak kar huzuru, kapanan yol hareketin engellenmesini düşündürebilir.|Yavaşlamak bana ne hissettiriyor?
Karanlık|Belirsizlik ve görülmeyen alanla ilişkilendirilebilir.|Kaybolmak yön ihtiyacını, rahatlık bilinmeyene alışmayı çağrıştırabilir.|Bilmeden ilerlemek nerede zor geliyor?
Kardeş|Paylaşım ve ailedeki yerle ilişkilendirilebilir.|Birlikte olmak dayanışmayı, tartışma ilgi paylaşımını düşündürebilir.|Kıyas yüzünden neyi kaçırıyorum?
Kartal|Geniş bakış ve bağımsızlıkla ilişkilendirilebilir.|Uçmak büyük resmi, yere inmek düşünceyi uygulamayı çağrıştırabilir.|Uzaktan bakınca ne değişir?
Kaybolmak|Yön arayışı ve değişen düzenle ilişkilendirilebilir.|Tanıdık sokak eski yolların işlememesini, yön sormak desteği düşündürebilir.|Hangi konuda yeni yola ihtiyacım var?
Kelebek|Değişim ve hafiflemeyle ilişkilendirilebilir.|İzlemek dönüşümü kabul etmeyi, yakalamak anı sabitlemeyi çağrıştırabilir.|Değişen hangi halime alan açabilirim?
Kırmızı|Yoğun ilgi ve güçlü tepkiyle ilişkilendirilebilir.|Canlılık heyecanı, tehdit gibi gelmek alarm halini düşündürebilir.|Yoğun duygumun altındaki ihtiyaç ne?
Kitap|Öğrenme ve kendine anlatılan hikâyeyle ilişkilendirilebilir.|Yeni kitap merakı, okunamayan sayfa anlamlandırma zorluğunu çağrıştırabilir.|Kendi hikâyem deneyimimle uyumlu mu?
Koşmak|Hedefe yetişmek veya uzaklaşmakla ilişkilendirilebilir.|Keyifli koşu canlılığı, kaçarken zorlanma yetişememeyi düşündürebilir.|Bir şeye mi gidiyorum, bir şeyden mi kaçıyorum?
Köprü|İki alan arasında geçişle ilişkilendirilebilir.|Sağlamlık güveni, kırılma başka bağlantı arayışını çağrıştırabilir.|Arasında kaldığım alanları nasıl bağlarım?
Kurt|Bağımsızlık ve grup içinde korunmayla ilişkilendirilebilir.|Sürü aidiyeti, yalnızlık özgürlük ile destek arasındaki dengeyi düşündürebilir.|Özgürlük ve birlikte olma nasıl dengeleniyor?
Kuş|Haberleşme ve geniş alan isteğiyle ilişkilendirilebilir.|Uçmak serbestliği, kafes ifade alanının daralmasını çağrıştırabilir.|Nerede kısıtlanmış hissediyorum?
Lamba|Sınırlı bir alanda açıklık kurmayla ilişkilendirilebilir.|Taşımak kendi yolunu bulmayı, titreme oturmamış güveni düşündürebilir.|İlerleyecek kadar netlik için ne gerekiyor?
Limon|Bir deneyimin bıraktığı tatla ilişkilendirilebilir.|Sıkmak sonuç çıkarmayı, ekşilik farklı karşılığı çağrıştırabilir.|Olayın bende bıraktığı duygu ne?
Mağara|Geri çekilme ve korunmayla ilişkilendirilebilir.|Dinlenmek güveni, çıkamamak yalnızlığın daralmasını düşündürebilir.|Geri çekilmek ne kadar iyi geliyor?
Masa|Paylaşım ve bir araya gelen ihtiyaçlarla ilişkilendirilebilir.|Sofra dayanışmayı, dağınık masa çok sayıda talebi çağrıştırabilir.|Hangi işleri aynı anda taşıyorum?
Mavi|Sakinlik ve mesafeyle ilişkilendirilebilir.|Açık mavi ferahlığı, soğuk mavi uzaklaşmayı düşündürebilir.|Sakinlik mi arıyorum, temastan mı kaçıyorum?
Mezar|Hatırlama ve vedayla ilişkilendirilebilir; ölüm kehaneti değildir.|Ziyaret hatırayı, isimsiz mezar adı konmamış kaybı çağrıştırabilir.|Geçmişe hangi yeri vermek istiyorum?
Merdiven|Adım adım ilerlemeyle ilişkilendirilebilir.|Çıkmak hedefi, eksik basamak ihtiyaç duyulan desteği düşündürebilir.|Sıradaki gerçekçi adım ne?
Misafir|Yeni bir etkiyi ağırlama ve alan sınırıyla ilişkilendirilebilir.|İstenen misafir yakınlığı, habersiz geliş beklenmeyen talepleri çağrıştırabilir.|Hangi talebe yer açmak istemiyorum?
Motor|Bağımsız hareket ve hızla ilişkilendirilebilir.|Rahat sürmek özgürlüğü, korumasızlık hızın kırılganlığını düşündürebilir.|İlerlerken korunmayı atlıyor muyum?
Mum|Sessiz odak ve kırılgan umudu korumayla ilişkilendirilebilir.|Yanmak iç yönü, sönmek dikkat dağılmasını çağrıştırabilir.|Korumak istediğim küçük umut ne?
Nar|Çok sayıda imkân ve paylaşım üzerine okunabilir.|Açmak ayrıntıları görmeyi, dağılan taneler birikimi toparlamayı düşündürebilir.|Çok seçenek arasında neyi seçiyorum?
Nehir|Değişen akışla ilişkilendirilebilir.|Yüzmek akışla ilişkiyi, kıyıya geçmek kararı uygulamayı çağrıştırabilir.|Hangi kıyıya varmak istiyorum?
Nikâh|Söz ve ortak sorumlulukla ilişkilendirilebilir.|İmza atmak kabulü, atamamak hazır olmamayı düşündürebilir.|Hangi anlaşma koşulunu netleştirmeliyim?
Oda|Özel alan ve hayatın belirli bir yönüyle ilişkilendirilebilir.|Boş oda imkânı, kilitli oda konuşulmayan deneyimi çağrıştırabilir.|Kendimde hangi alana girmedim?
Okul|Öğrenme ve kıyasla ilişkilendirilebilir.|Geç kalmak baskıyı, eski sınıf geçmiş yetersizlik duygusunu düşündürebilir.|Hangi eski değerlendirmeyi taşıyorum?
Orman|Keşif ve seçeneklerde yön bulmayla ilişkilendirilebilir.|Patika seçimi, sık ağaçlar karmaşada netlik arayışını çağrıştırabilir.|Bana ait yol hangisi?
Otobüs|Ortak yönde ilerlemeyle ilişkilendirilebilir.|Yetişmek plana katılmayı, yanlış araç başkasının yönünü seçmeyi düşündürebilir.|Yolum kendi tercihim mi?
Otel|Geçici düzen ve ara dönemle ilişkilendirilebilir.|Rahat oda molayı, odayı bulamamak geçişte yer aramayı çağrıştırabilir.|Geçici dönemde güveni nasıl kuruyorum?
Ölüm|Bitiş ve değişimle ilişkilendirilebilir; ölüm haberi değildir.|Kendi ölümün kimlik değişimini, başkasınınki o bağa dair kaygıyı düşündürebilir.|Hangi bitişi kabul etmek zor geliyor?
Öpüşmek|Yakınlık ve kabul ihtiyacıyla ilişkilendirilebilir.|İstekli olmak açıklığı, rahatsızlık sınırın korunmamasını çağrıştırabilir.|Yakınlıkta neye evet demek istiyorum?
Örümcek|İnce emek ve kurulmuş ağlarla ilişkilendirilebilir.|Ağ örmek kurmayı, takılmak bağlantıların kısıtlamasını düşündürebilir.|Kurduğum hangi düzen beni sıkıştırıyor?
Ördek|Uyum ve görünmeyen çabayla ilişkilendirilebilir.|Rahat yüzmek uyumu, telaşlı hareket görünmeyen emeği çağrıştırabilir.|Dışarıdan görülmeyen çabam ne?
Pencere|Dışarıya bakış ve yeni olasılıkla ilişkilendirilebilir.|Açıklık teması, buğulanma seçeneği net görememeyi düşündürebilir.|Dünyaya hangi noktadan bakıyorum?
Peynir|Gündelik paylaşım ve küçük kaynaklarla ilişkilendirilebilir.|Tazelik konforu, bozulma tanıdık şeyin iyi gelmemesini çağrıştırabilir.|Tanıdık olduğu için sürdürdüğüm ne yoruyor?
Polis|Kurallar ve değerlendirilme hissiyle ilişkilendirilebilir.|Yardım güveni, takip hata yapma korkusunu düşündürebilir.|Kendimi nerede sert yargılıyorum?
Portakal|Küçük ferahlık ve duyusal keyifle ilişkilendirilebilir.|Soymak değere erişmeyi, kuruluk beklenen keyfin yokluğunu çağrıştırabilir.|Küçük keyiflere zaman ayırıyor muyum?
Radyo|Gelen mesaj ve çevrenin sesleriyle ilişkilendirilebilir.|Net yayın anlaşılmayı, parazit kendi düşünceni duyamamayı düşündürebilir.|Hangi sesi fazla dinliyorum?
Renkler|Deneyimin farklı duygusal yönlerini görünür kılabilir.|Canlı renkler çeşitliliği, tek renk bir duygunun baskınlığını çağrıştırabilir.|Deneyimimi tek duyguyla mı anlatıyorum?
Rüzgâr|Dış etki ve değişen koşullarla ilişkilendirilebilir.|Esinti yenilenmeyi, savurma kontrol dışı değişimi düşündürebilir.|Hangi değişime sıkı tutunuyorum?
Saat|Zaman ve yetişme baskısıyla ilişkilendirilebilir.|Durmak beklemeyi, hızlanmak süreyi yönetememeyi çağrıştırabilir.|Zamanımı hangi beklenti belirliyor?
Saç|Kimlik ve görünür değişimle ilişkilendirilebilir.|Kesmek yeni görünümü, dökülmek kontrol kaygısını düşündürebilir.|Kendime dair neyi değiştirmek istiyorum?
Sandalye|Yer edinme ve dinlenmeyle ilişkilendirilebilir.|Boş yer katılımı, kırık sandalye yetersiz desteği çağrıştırabilir.|Ortamda bana ait yer var mı?
Sarı|Dikkat ve canlılıkla ilişkilendirilebilir.|Parlaklık merakı, rahatsızlık fazla uyarılmayı düşündürebilir.|Dikkatimi çeken şey ne hissettiriyor?
Sel|Biriken talep ve duygunun sınırı aşmasıyla ilişkilendirilebilir; afet tahmini değildir.|Su alan ev alanın zorlanmasını, yükselmek mesafe ihtiyacını çağrıştırabilir.|Hangi talepler kapasitemi aşıyor?
Sevgili|Yakınlık ve mevcut beklentilerle ilişkilendirilebilir.|Birlikte olmak teması, uzaklaşmak konuşulmayan mesafeyi düşündürebilir.|Hangi ihtiyacı konuşmadık?
Sınav|Hazırlık ve yeterlilik baskısını çağrıştırabilir.|Soruları unutmak kaygıyı, hazırlıksızlık taleple uyumsuzluğu düşündürebilir.|Kendimi hangi ölçüte göre değerlendiriyorum?
Siyah|Mahremiyet ve bilinmeyenle ilişkilendirilebilir.|Koruyuculuk sınırı, bunaltı belirsizliğin ağırlığını çağrıştırabilir.|Bilinmeyenin hangi yanı zor geliyor?
Sofra|İhtiyaçların ortak karşılanmasıyla ilişkilendirilebilir.|Doluluk yeterliliği, dışarıda kalmak paylaşımdan uzaklığı düşündürebilir.|İhtiyaçlarım ortak ortamda görülüyor mu?
Su|Duygusal hareketle ilişkilendirilebilir.|Temizlik açıklığı, bulanıklık duyguyu ayırt edememeyi çağrıştırabilir.|İçimdeki duyguya hangi adı verebilirim?
Şemsiye|Korunma ve yanında taşıdığın destekle ilişkilendirilebilir.|Sağlamlık güveni, ters dönmek korunmanın yetersizliğini düşündürebilir.|Hangi desteğim işe yarıyor?
Şeker|Ödül ve küçük keyiflerle ilişkilendirilebilir.|Paylaşmak yakınlığı, fazlası ihtiyacı geçici keyifle örtmeyi çağrıştırabilir.|İyi gelmek ile kaçmak arasındaki fark ne?
Şelale|Yoğun akış ve duygusal boşalmayla ilişkilendirilebilir.|İzlemek mesafeyi, altında kalmak yoğunluğu düşündürebilir.|Hangi birikimin akmasına ihtiyacım var?
Şişe|Saklama ve kaynak korumayla ilişkilendirilebilir.|Kapalı şişe tutulan duyguyu, çatlak dışarı sızmayı çağrıştırabilir.|İçimde tuttuğumu kimle paylaşabilirim?
Tabak|Pay ve ihtiyacın sunulma biçimiyle ilişkilendirilebilir.|Doluluk karşılığı, kırılma paylaşım düzeninin değişmesini düşündürebilir.|Sunulanla ihtiyacım aynı mı?
Taş|Dayanıklılık ve uzun süre taşınan meseleyle ilişkilendirilebilir.|Yoldaki taş engeli, elindeki taş bırakılabilir yükü çağrıştırabilir.|Hangi ağırlığı bırakabilirim?
Tavşan|Hassasiyet ve güven arayışıyla ilişkilendirilebilir.|Saklanmak korunmayı, serbest koşmak rahatlığı düşündürebilir.|Rahat hissetmek için ne gerekiyor?
Telefon|Ulaşılabilirlik ve beklenen mesajla ilişkilendirilebilir.|Çalmak bağlantıyı, çalışmamak duyulmama hissini çağrıştırabilir.|Hangi konuşmayı bekliyorum?
Toprak|Köklenme ve somut güvenle ilişkilendirilebilir.|İşlemek hazırlığı, çatlaklık beslenmeyen alanı düşündürebilir.|Hangi temeli beslemeliyim?
Tren|Belirli yönde ilerleme ve zamanlamayla ilişkilendirilebilir.|Binmek sürece katılmayı, kaçırmak fırsata yetişememeyi çağrıştırabilir.|Hangi kararı bekliyorum?
Tuz|Ölçü ve küçük ayrıntının etkisiyle ilişkilendirilebilir.|Denge yeterliliği, fazlalık iyi şeyin bile yoruculuğunu düşündürebilir.|Nerede ölçüyü kaçırıyorum?
Uçak|Uzak hedef ve hızlı değişimle ilişkilendirilebilir.|Rahatlık geçişe açıklığı, korku kontrolü bırakma zorluğunu çağrıştırabilir.|Hangi kontrolü bırakmak zor geliyor?
Uçmak|Serbestlik ve geniş bakışla ilişkilendirilebilir.|Rahat uçmak ferahlığı, korku özgürlüğün belirsizliğini düşündürebilir.|Özgürlük için hangi yükü azaltabilirim?
Uyumak|Dinlenme ve geri çekilmeyle ilişkilendirilebilir.|Güvenle uyumak rahatlığı, yer bulamamak korunmayan molayı çağrıştırabilir.|Dinlenmeye izin veriyor muyum?
Üzüm|Küçük emeklerin birikimiyle ilişkilendirilebilir.|Salkım gelişen sonucu, ayırmak ortak birikimde payını görmeyi düşündürebilir.|Emeklerimin birikimini fark ediyor muyum?
Ütü|Görünümü düzeltme ve hazırlıkla ilişkilendirilebilir.|Düzeltmek özeni, yakmak mükemmelleştirme baskısını çağrıştırabilir.|Düzeltirken fazla baskı uyguluyor muyum?
Vapur|Geçiş ve ortak ritimle ilişkilendirilebilir.|Huzur sakin geçişi, telaş zamanlama baskısını düşündürebilir.|Geçişte kendime zaman verebilir miyim?
Valiz|Yeni döneme taşınan birikimle ilişkilendirilebilir.|Hazırlamak kararı, kapanmamak fazla yükü çağrıştırabilir.|Neyi geride bırakmak istiyorum?
Yağmur|Duygusal boşalma ve rahatlamayla ilişkilendirilebilir.|Hafiflik ferahlığı, sırılsıklam olmak korunma ihtiyacını düşündürebilir.|Hangi duyguyu serbestçe yaşayabilirim?
Yarasa|Bilinmeyende yön bulmayla ilişkilendirilebilir.|Uzaktan uçmak keşfi, yaklaşmak belirsizlik kaygısını çağrıştırabilir.|Hangi küçük ipucunu görebilirim?
Yatak|Dinlenme ve mahremiyette rahatlıkla ilişkilendirilebilir.|Rahat yatak güveni, yabancı yatak alan değişimini düşündürebilir.|Özel alanım güven veriyor mu?
Yemek|Fiziksel ve duygusal ihtiyaçla ilişkilendirilebilir.|Birlikte yemek paylaşımı, doymamak karşılıkla ihtiyaç farkını çağrıştırabilir.|Neyle beslenmeye ihtiyacım var?
Yeşil|Gelişim ve yenilenmeyle ilişkilendirilebilir.|Canlı yeşil canlılığı, soluk ton bakım ihtiyacını düşündürebilir.|Neyi canlandırmak istiyorum?
Yıldız|Yön ve umutla ilişkilendirilebilir.|Parlaklık odaklanmayı, çok yıldız farklı seçenekleri çağrıştırabilir.|Bana yön veren işaret ne?
Yol|Seçim ve ilerlemeyle ilişkilendirilebilir.|Açık yol hareketi, ayrım karar ihtiyacını düşündürebilir.|Hangi seçenek bana yakın?
Yüzmek|Duygusal koşullarda hareket etmeyle ilişkilendirilebilir.|Rahatlık ritmi, zorlanmak fazla çabayı çağrıştırabilir.|Ne kadar destek alıyorum?
Yüzük|Bağ ve verilen sözle ilişkilendirilebilir.|Takmak bağlılığı, çıkarmak sorumluluğu yeniden değerlendirmeyi düşündürebilir.|Hangi söz iyi geliyor, hangisi baskı yapıyor?
Zarf|Beklenen haber ve açılmamış mesajla ilişkilendirilebilir.|Açmak açıklığa hazır olmayı, boş çıkmak beklenen karşılığın yokluğunu çağrıştırabilir.|Hangi konuşmanın sonucunu bekliyorum?
Zebra|Bir arada bulunan farklılıklarla ilişkilendirilebilir.|Sürü aidiyeti, yalnızlık özgünlüğü korumayı düşündürebilir.|Hem ait hem farklı kalabilir miyim?
Zeytin|Sabır ve kalıcı emekle ilişkilendirilebilir.|Ağaç uzun bağı, hasat emeğin karşılığını çağrıştırabilir.|Hangi emeğimi takdir edebilirim?
Zincir|Bağlılık ve hareket sınırıyla ilişkilendirilebilir.|Sağlam bağ güveni, kısıtlamak seçilmemiş zorunluluğu düşündürebilir.|Hangi bağlılığı isteyerek taşıyorum?
Zürafa|Geniş açı ve farklı konumla ilişkilendirilebilir.|Yüksek bakış perspektifi, ayrı durmak farklılığın mesafesini çağrıştırabilir.|Geniş açıdan bakarsam ne görürüm?
Abla|Aile içinde destek ve örnek alma temalarını taşıyabilir.|Yardımlaşmak dayanışmayı, tartışmak yaş veya deneyim farkının baskısını düşündürebilir.|Destek aldığım yerde kendi kararımı koruyor muyum?
Ağabey|Korunma ve ailedeki güç dengesiyle ilişkilendirilebilir.|Birlikte yol almak desteği, emir almak kendi tercihini savunma ihtiyacını çağrıştırabilir.|Hangi bağda kendi sesimi anlatmak zor geliyor?
Akraba|Aile çevresinin beklentileri ve ortak geçmişle ilişkilendirilebilir.|Kalabalık toplantı aidiyeti, yabancılaşmak aile rolünü yeniden değerlendirmeyi düşündürebilir.|Aile çevrem benden ne bekliyor, ben ne istiyorum?
Anahtar kaybetmek|Çözüm veya erişim imkânını yitirme kaygısını çağrıştırabilir.|Anahtarı aramak alışılmış yolu bulmaya çalışmayı, başka kapı bulmak alternatif düşünmeyi düşündürebilir.|Tek çözüm sandığım yolun başka seçeneği var mı?
Altın bilezik|Değer ile bağlılık arasındaki ilişki üzerine okunabilir.|Bileziğin ağır gelmesi sahip olunanın yükünü, rahat taşımak kendi değerini kabul etmeyi çağrıştırabilir.|Değerli bulduğum şey bana nasıl sorumluluk getiriyor?
Ateş etmek|Savunma, yoğun tepki ve bir meseleyi zorla bitirme isteğiyle ilişkilendirilebilir.|Hedefin belirsiz olması dağınık öfkeyi, silahı bırakmak tepkinin şiddetini azaltma ihtiyacını düşündürebilir.|Tepkimin altında hangi korunma ihtiyacı var?
Balkon|Kişisel alandan dışarıya bakış ve mesafe kurmayla ilişkilendirilebilir.|Güvenli balkon gözlemlemeyi, korku veren yükseklik görünür olmanın baskısını çağrıştırabilir.|Bir meseleyi dışarıdan izlemek bana ne sağlıyor?
Bal|Keyif, emek ve elde edilen karşılıkla ilişkilendirilebilir.|Balı paylaşmak yakınlığı, yapışkanlık keyifli bir şeyin bile zorlayıcı olabilmesini düşündürebilir.|İyi gelen şeyin ölçüsünü koruyabiliyor muyum?
Battaniye|Rahatlık, korunma ve sakinleşme ihtiyacıyla ilişkilendirilebilir.|Örtünmek güven arayışını, başkasına vermek bakım verme isteğini çağrıştırabilir.|Kendime sunduğum korunma yeterli mi?
Bayılmak|Kontrolün azalması ve fazla gelen bir durumdan uzaklaşma hissiyle ilişkilendirilebilir.|Birinin yardım etmesi destek ihtiyacını, yalnız olmak kendi sınırlarını duyuramamayı düşündürebilir.|Hangi talep bana fazla geliyor?
Bebek emzirmek|Yeni bir ihtiyacı besleme ve bakım sorumluluğuyla ilişkilendirilebilir.|Rahat beslemek uyumu, zorlanmak kendi kaynağının da korunması gerektiğini çağrıştırabilir.|Başkalarını beslerken ben nasıl besleniyorum?
Boğulmak|Duygusal veya gündelik taleplerin içinde sıkışma hissiyle ilişkilendirilebilir.|Yüzeye çıkmak rahatlama arayışını, yardım eli ise yükü paylaşma ihtiyacını düşündürebilir.|Bana nefes aldıracak hangi sınırı koyabilirim?
Cezaevi|Kısıtlanma, zorunluluk ve kendi kendini cezalandırma temalarıyla ilişkilendirilebilir.|Çıkış aramak hareket ihtiyacını, açık kapıyı kullanamamak içsel engeli çağrıştırabilir.|Hangi kuralı artık sorgulayabilirim?
Cin|Bilinmeyen karşısındaki korku ve kültürel çağrışımlarla ilişkilendirilebilir; görünmeyen bir varlığın kanıtı değildir.|Tehdit duymak güvende olma ihtiyacını, tanıdık mekân geceye dair korkuların etkisini düşündürebilir.|Belirsizlikte kendimi neyle güvende hissediyorum?
Çıplak olmak|Görünürlük, savunmasızlık ve değerlendirilme kaygısıyla ilişkilendirilebilir.|Utanmak yargılanma hissini, rahatlık kendini saklamadan kabul etmeyi çağrıştırabilir.|Hangi ortamda kendimi korumasız hissediyorum?
Çikolata|Ödül ve küçük rahatlık arayışıyla ilişkilendirilebilir.|Paylaşmak keyifli teması, fazla tüketmek başka bir ihtiyacı geçici rahatlıkla örtmeyi düşündürebilir.|Ödülün ardında hangi ihtiyacım var?
Dede|Aile hafızası ve yaşam deneyiminden destek arayışıyla ilişkilendirilebilir.|Öğüt almak rehberliği, sessiz birlikte olmak söze dökülmeyen bağı çağrıştırabilir.|Hangi eski değer bugün bana destek oluyor?
Doğum|Yeni bir oluşumun görünürleşmesi ve geçişin emeğiyle ilişkilendirilebilir.|Kolay doğum hazır oluşu, zorlanma yeni rolün ağırlığını düşündürebilir.|Hangi yeni başlangıca yer açıyorum?
Dua etmek|Destek, umut ve kontrol edilemeyen bir durumu taşıma isteğiyle ilişkilendirilebilir.|İç rahatlığı güveni, kelimeleri bulamamak ihtiyacını adlandırma zorluğunu çağrıştırabilir.|Dile getirmek istediğim en temel ihtiyaç ne?
Ejderha|Büyük görünen güç ve ürküten bir engelle ilişkilendirilebilir.|Sakin ejderha güçle anlaşmayı, kovalanmak devleştirilmiş bir soruna karşı çaresizliği düşündürebilir.|Hangi sorunu zihnimde büyütüyorum?
Eşek|Dayanıklılık, gündelik yük ve emeğin görülmesiyle ilişkilendirilebilir.|Yük taşımak sorumluluğu, ilerlememek sınırına gelmeyi çağrıştırabilir.|Hangi yükün görünmesini istiyorum?
Gelin|Yeni rol ve toplumsal beklentiyle ilişkilendirilebilir.|Mutlu gelin geçişe açıklığı, huzursuz gelin dış beklentinin kişisel istekle çatışmasını düşündürebilir.|Yeni rolümde hangi tercihim görünmüyor?
Gök gürültüsü|Ani uyarı, güçlü duygu ve çevresel gerilimle ilişkilendirilebilir.|Sesten ürkmek beklenmedik tepkiyi, sonrasında sessizlik gerilimin boşalmasını çağrıştırabilir.|Hangi söze veya olaya aşırı hazırlıklıyım?
Gözlük|Bakışını netleştirme ve bir meseleyi farklı araçla görmeyle ilişkilendirilebilir.|Net cam açıklığı, bulanık cam alışılmış bakışın yetersizliğini düşündürebilir.|Hangi konuya yeni gözle bakabilirim?
Helikopter|Bir duruma yukarıdan bakma ve hızlı çıkış arayışıyla ilişkilendirilebilir.|Yükselmek geniş açıyı, gürültü hızlı değişimin yarattığı yoğunluğu çağrıştırabilir.|Çözüm ararken mesafeye ihtiyacım var mı?
Hırsızlık yapmak|İstemek ile hak etme hissi arasındaki çatışmayla ilişkilendirilebilir.|Saklamak yargılanma kaygısını, geri vermek ihtiyaçla değerlerini uzlaştırma isteğini düşündürebilir.|İhtiyacımı açıkça istemek neden zor geliyor?
Horoz|Duyulmak, başlangıcı bildirmek ve dikkat çağrısıyla ilişkilendirilebilir.|Ötüş yeni bir güne hazırlığı, sürekli ses ise kendi sesini duyurmanın yükünü çağrıştırabilir.|Hangi konuda sesimi duyurmak istiyorum?
İmza|Karar, kabul ve sorumluluk üstlenmeyle ilişkilendirilebilir.|İsteyerek imzalamak netliği, metni okuyamamak koşulları bilmeden söz verme kaygısını düşündürebilir.|Kabul ettiğim koşulları gerçekten biliyor muyum?
Kâbe|Manevi yön, aidiyet ve değer verilen merkeze yaklaşma isteğiyle ilişkilendirilebilir.|Yaklaşmak anlam arayışını, uzaktan görmek özlenen manevi teması çağrıştırabilir.|Bana yön veren manevi değer ne?
Kaza|Beklenmedik kesinti ve kontrol kaybı kaygısıyla ilişkilendirilebilir; kaza tahmini değildir.|Fren yapmak yavaşlama ihtiyacını, sonrasında yardım bulmak desteğin önemini düşündürebilir.|Hızımı hangi noktada yeniden ayarlamalıyım?
Kavga|Çatışan istekler ve ifade edilmemiş öfkeyle ilişkilendirilebilir.|Sesini duyuramamak bastırılmış ihtiyacı, tartışmayı bırakmak farklı konuşma yolunu çağrıştırabilir.|Öfkem hangi sınırın aşıldığını anlatıyor?
Koyun|Uyum, grup içinde güven ve kendi yönünü seçmeyle ilişkilendirilebilir.|Sürü ortak ritmi, ayrılmak bağımsız karar ihtiyacını düşündürebilir.|Uyum uğruna kendi yönümü bırakıyor muyum?
Köpek ısırması|Güvenilen bir bağ içinde incinme kaygısıyla ilişkilendirilebilir.|Tanıdık köpek yakın bağdaki kırgınlığı, kaçabilmek kişisel sınırı korumayı çağrıştırabilir.|Güvendiğim ilişkide hangi davranış beni incitiyor?
Kusmak|Fazla gelen bir deneyimi üzerinden atma isteğiyle ilişkilendirilebilir.|Sonrasında rahatlamak yükten ayrılmayı, saklamaya çalışmak zorlanmanı göstermemeyi düşündürebilir.|İçimde tutmak istemediğim şey ne?
Mezarlık|Geçmiş, kayıp ve hatıralara verilen yerle ilişkilendirilebilir.|Sakin yürümek geçmişi kabulü, çıkış aramak bir kayıptan sonra yön bulmayı çağrıştırabilir.|Hatıralarım bugünkü hayatımda nasıl yer tutuyor?
Ölü balık|Beslemeyen bir ortam veya canlılığını yitirmiş beklentiyle ilişkilendirilebilir.|Sudan uzak oluşu koşulları, çok sayıda balık birikmiş hayal kırıklığını düşündürebilir.|Hangi beklentiyi yeniden değerlendirmeliyim?
Patlama|Biriken gerilim ve ani boşalmayla ilişkilendirilebilir.|Uzak patlama çevresel gerilimi, yakın patlama sınırına gelen duyguyu çağrıştırabilir.|Gerilimim büyümeden neyi konuşabilirim?
Saç kesmek|Görünür değişim ve eski görüntüyü bırakmayla ilişkilendirilebilir.|İsteyerek kesmek seçimi, zorla kesilmek kendi üzerindeki söz hakkı kaygısını düşündürebilir.|Değişimimde karar bana mı ait?
Saç dökülmesi|Kimlik, görünürlük ve kontrol azalması kaygısıyla ilişkilendirilebilir.|Dökülmeyi saklamak değerlendirilme korkusunu, kabullenmek değişen haline yer açmayı çağrıştırabilir.|Kendime baktığım ölçüt ne kadar sert?
Silah|Savunma, güç ve çatışmada kontrol arayışıyla ilişkilendirilebilir.|Taşımak korunma ihtiyacını, bırakmak farklı bir çözüm aramayı düşündürebilir.|Güven için güç göstermeden ne yapabilirim?
Tabut|Kapanış ve artık sürdürülmeyen bir dönemle ilişkilendirilebilir; ölüm haberi değildir.|Kapalı tabut tamamlanmayı, içini merak etmek geçmişten ayrılamamayı çağrıştırabilir.|Tamamlanmış hangi meseleye dönüyorum?
Taksi|Kısa geçişte yardım alma ve yönünü bir başkasına anlatmayla ilişkilendirilebilir.|Adresi bilmek netliği, yanlış yere gitmek beklentiyi açıklama ihtiyacını düşündürebilir.|Destek alırken isteğimi net anlatıyor muyum?
Tilki|Temkin, dolaylı iletişim ve belirsiz niyetleri anlamaya çalışmayla ilişkilendirilebilir.|Uzakta izlemek gözlemi, yakınlaşmak güveni sınama isteğini çağrıştırabilir.|Varsaymak yerine hangi soruyu sorabilirim?
Tuvalet|Bırakma, mahremiyet ve kişisel ihtiyaçlara alan bulmayla ilişkilendirilebilir.|Yer bulamamak kendine zaman ayıramamayı, kapının kapanmaması sınır kaygısını düşündürebilir.|Kendi ihtiyacım için ne kadar alanım var?
Un|Henüz biçim almamış kaynak ve hazırlıkla ilişkilendirilebilir.|Hamur yapmak bir şey kurmayı, dökülmek hazırlığın dağılmasını çağrıştırabilir.|Elimdeki kaynakla hangi küçük başlangıcı yapabilirim?
Üzüntü|Dile gelmemiş kayıp ve bakım ihtiyacıyla ilişkilendirilebilir.|Ağlamak duygunun görünür olmasını, paylaşamamak yalnız taşıma hissini düşündürebilir.|Hangi duygumun duyulmasını istiyorum?
Vadi|İki yüksek alan arasında mola ve geçişle ilişkilendirilebilir.|Yeşil vadi ferahlığı, dar geçit seçeneklerin sınırlı hissedilmesini çağrıştırabilir.|Yolumda nerede durup nefes alabilirim?
Yangın|Yoğun değişim ve yönetilemeyen gerilimle ilişkilendirilebilir; yangın tahmini değildir.|Evin yanması güven alanının değişimini, söndürmek kontrolü yeniden kurma isteğini düşündürebilir.|Hayatımda hangi gerilim büyümeden ele alınmalı?
Yılan ısırması|Sınır, incinme ve kaçınılamayan karşılaşmayla ilişkilendirilebilir.|Isırığın yeri rüyada öne çıkan hassas alanı, uzaklaşmak sınırı korumayı çağrıştırabilir.|Görmezden geldiğim hangi hassasiyet var?
Yumurta|Korunan potansiyel ve henüz gelişen bir başlangıçla ilişkilendirilebilir.|Sağlam kabuk korunmayı, kırılmak yeni aşamaya geçişi veya hassasiyeti düşündürebilir.|Gelişen hangi şeyi acele ettiriyorum?
Yunus|Oyun, iletişim ve rahat bir duygusal akışla ilişkilendirilebilir.|Birlikte yüzmek karşılıklılığı, uzaktan izlemek daha hafif temas arayışını çağrıştırabilir.|Yakınlıkta keyfe yer açabiliyor muyum?
Pirinç|Küçük kaynakların bir araya gelmesi ve temel ihtiyaçları karşılama üzerine okunabilir.|Pişirmek emeğin sonuca dönüşmesini, dökülmek küçük kayıpların birikmiş etkisini düşündürebilir.|Küçük kaynaklarımı nasıl değerlendiriyorum?
Muz|Kolay ulaşılabilen keyif ve gündelik beslenmeyle ilişkilendirilebilir.|Olgun meyve hazır karşılığı, ezilmiş meyve ise beklenen rahatlığın bulunamamasını çağrıştırabilir.|Bana kolayca iyi gelen hangi küçük şeyi unutuyorum?
`;

export function dreamSymbolSlug(text: string) {
  return text.toLocaleLowerCase("tr-TR").replaceAll("ı", "i").replaceAll("ğ", "g").replaceAll("ü", "u").replaceAll("ş", "s").replaceAll("ö", "o").replaceAll("ç", "c").replaceAll("â", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const expandedDreamGuides: DreamGuide[] = entries.trim().split("\n").map(line => {
  const [symbol, meaning, context, question] = line.split("|");
  const slug = `ruyada-${dreamSymbolSlug(symbol)}`;
  const title = `Rüyada ${symbol}${/(mak|mek|lık|lik|ması|mesi)$/.test(symbol) ? "" : " Görmek"}`;
  return {
    id: slug, slug, title, h1: title, seoTitle: `${title} Ne Anlama Gelir? | Goldkozmos`,
    metaDescription: `${symbol} rüyasının sembolik yorumu ve detayları. ${meaning}`.slice(0, 165),
    searchAliases: [symbol, `${symbol} gördüm`, slug.replaceAll("-", " ")],
    intro: `${title}, tek bir anlama indirgenmez. ${meaning} Sembolün sana ne hatırlattığını, sahnedeki yerini ve uyandığında kalan duyguyu birlikte düşün.`,
    spiritualMeaning: `${meaning} ${question} Bu okuma kesin bir olay haberi değil, kendi deneyimine bakabileceğin sembolik bir çerçevedir.`,
    variations: [{ heading: "Rüyadaki ayrıntı neyi değiştirir?", body: context }, { heading: "Sembol tekrar görülüyorsa", body: `${question} Tekrar eden sahnede neyin değiştiğini bir rüya notuna yaz. Tekrarı kesin bir işaret saymak yerine o günkü deneyim ve hislerinle karşılaştır.` }],
    emotionMeaning: `Rahatlık, merak, korku veya sıkışmışlık aynı sembole farklı bir anlam verebilir. ${context} Sahnenin sende bıraktığı duygu, hazır bir tabirden daha kişisel bir başlangıç sunar.`,
    summary: `${meaning} Kendine sor: ${question}`, relatedDreams: [],
    faqs: [{ question: `${title} kesin bir işaret mi?`, answer: `Bu yorum sembolik ve editoryaldir; gelecek olayın kanıtı değildir. ${context}` }],
    published: true, updatedAt: "2026-10-06",
    ...contextualDreamReadings[slug],
  };
});

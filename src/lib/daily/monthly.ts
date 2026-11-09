import { istanbulMessageDay } from './visual';

// One paired visual and message per calendar day. Add future month collections here.
export const OCTOBER_MESSAGES = [
 'Her şeyin aynı anda büyümesi gerekmez. Bugün kendi ritmine güven; kök salan değişimler sessizce güçlenir.',
 'Zor görünen bir yolun içinde de akış vardır. Enerjini bütün yolu çözmeye değil, bugün atabileceğin bir adıma ver.',
 'Zihninde açılan her boşluğu doldurmak zorunda değilsin. Biraz sessizlik bırak; kendini duymak için yerin olsun.',
 'Hayat her zaman düz bir çizgide ilerlemez. Yönünü korurken kıvrımlara da izin ver; esneklik seni yolundan uzaklaştırmaz.',
 'Gücünü her gün kanıtlaman gerekmez. Bazen kendinle sakin bir bağ kurmak, yeniden başlamak için yeterlidir.',
 'İçinde taşıdığın duygulara hemen bir çözüm arama. Önce onları gör; anlaşılmak, kendine verebileceğin en değerli alanlardan biridir.',
 'Enerjini korumak için herkese yetişmen gerekmez. Bugün seni besleyen bir şeye zaman ayır ve orada gerçekten kal.',
 'Her gün hızla geçtiğin yollarda keşfedilmeyi bekleyen çok şey var. Bugün biraz yavaşla; hayatın küçük ayrıntıları da sana eşlik etsin.',
 'Yeni bir başlangıç bazen büyük bir karar değil, kendine verdiğin küçük bir sözdür. Bugün o sözü bir adımla görünür kıl.',
 'Bazen ihtiyacın olan şey daha çok çabalamak değil, bulunduğun yere başka bir açıdan bakmaktır. Biraz geri çekil; yolun bütünü görünür olsun.',
 'Uzun zamandır taşıdığın her yükü bugün çözmek zorunda değilsin. Birini bırakmaya izin ver; hafiflemek de yolculuğun bir parçasıdır.',
 'Sakinlik, hiçbir şey hissetmemek değildir. İçinden geçenleri acele etmeden karşılamak ve kendine güvenli bir alan açmaktır.',
 'Kendi yolunda ilerlerken başkalarının hızını ölçü alma. Bugün seni bir adım ileri taşıyan şey, senin için yeterince değerlidir.',
 'İçinde birikenleri tutmak kadar bırakmayı da öğrenebilirsin. Bir nefes al; enerjini geçmişi taşımaktan bugünü yaşamaya çevir.',
 'Dikkatini nereye verdiğin, gününü nasıl yaşadığını etkiler. Bugün seni tüketen düşüncenin yanına, sana güç veren bir gerçeği de koy.',
 'Kendinle kurduğun bağ küçük anlarda güçlenir. Bir ihtiyacını fark et, bir sınırını koru, bir sevincine yer aç.',
 'Hayatın güzel taraflarını görmek için her şeyin tamamlanmasını bekleme. Bugün elinde olan küçük bir iyiliği gerçekten hisset.',
 'Değişim bazen yeni bir şey eklemekle değil, seni daraltan bir alışkanlığa ara vermekle başlar. Bugün kendine biraz daha alan aç.',
 'Her gün üretmek kadar dinlenmek de kıymetlidir. Enerjini yenileyen bir mola, yarım bırakılmış bir gün anlamına gelmez.',
 'Duyguların gelip geçerken kendine sert davranma. Akışına izin ver; bir duyguyu yaşamak, onun içinde kalmak zorunda olduğun anlamına gelmez.',
 'Belirsizlik içindeyken de küçük bir yön seçebilirsin. Bugün bütün cevapları aramak yerine, sana iyi gelen bir adımı dene.',
 'Bir şeyleri bırakmak, yaşadıklarını değersiz kılmaz. O deneyimden öğrendiğini al ve enerjine yeni bir yer aç.',
 'İlerlemenin tek ölçüsü hız değildir. Kendine daha dürüst davranıyor, ihtiyaçlarını daha açık duyuyorsan da yol alıyorsun.',
 'Dışarıdaki hareketin içinde kendi merkezine dönebilirsin. Bir nefes, kısa bir sessizlik, kendine yönelttiğin nazik bir soru yeterli bir başlangıçtır.',
 'Büyük hedefler küçük seçimlerle hayatına yaklaşır. Bugün yapabildiğin bir şeyi küçümseme; süreklilik oradan doğar.',
 'İçindeki canlılığı yalnızca zorunluluklara ayırma. Merak ettiğin, sevdiğin, seni kendine yaklaştıran bir şeye de enerji ver.',
 'Her düşüncene inanmak zorunda değilsin. Zihnin bir ihtimali gerçek gibi anlattığında dur ve kendine sor: Şu anda gerçekten ne biliyorum?',
 'Kendine dönüşün aceleye ihtiyacı yok. Bugün bir duygunu dinle, bir ihtiyacını kabul et ve kendine biraz daha yumuşak davran.',
 'Sınır koymak arana duvar örmek değildir. Sana ait zamanı, dikkati ve enerjiyi koruyarak ilişkilerine daha açık bir yerden katılabilirsin.',
 'Geride kalan günlere yalnızca eksiklerinle bakma. Dayandığın, öğrendiğin ve yeniden denediğin anlar da senin hikâyene ait.',
 'Yeni bir güne bütün yüklerinle başlamak zorunda değilsin. Bugün yanında taşımak istediğin bir niyet seç; adımların ona yer açsın.',
] as const;

// Keep the original collection and include the newly supplied nature images.
const DAILY_IMAGES = [
 ...Array.from({ length: 14 }, (_, i) => `/images/daily/nature/nature-${String(i + 1).padStart(2, '0')}.webp`),
 ...Array.from({ length: 31 }, (_, i) => `/images/daily/2026-10/day-${String(i + 1).padStart(2, '0')}.webp`),
];
const NATURE_START = Date.parse('2026-10-29T00:00:00Z');

export function monthlyDailyMessage(day = istanbulMessageDay()) {
 const dayNumber = Number(day.slice(8, 10));
 const index = Number.isInteger(dayNumber) && dayNumber >= 1 && dayNumber <= 31 ? dayNumber - 1 : 0;
 // The last prepared collection remains available until the next monthly batch arrives.
 const elapsedDays = Math.floor((Date.parse(`${day}T00:00:00Z`) - NATURE_START) / 86400000);
 const image = Number.isFinite(elapsedDays) && elapsedDays >= 0
  ? DAILY_IMAGES[elapsedDays % DAILY_IMAGES.length]
  : `/images/daily/2026-10/day-${String(index + 1).padStart(2, '0')}.webp`;
 return { body: OCTOBER_MESSAGES[index], assignedOn: day, image };
}

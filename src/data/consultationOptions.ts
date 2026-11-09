export const consultationOptions = [
  { slug: "tek-birebir-seans", title: "Tek birebir görüşme", duration: "90 dakika · Online", price: "2.000 TL", text: "Anlatmak istediğin bir konuya alan aç. Önce konuşuruz; ardından ele aldığımız konulara yönelik enerji çalışması yaparım.", message: "90 dakikalık tek birebir görüşme" },
  { slug: "5-gunluk-yogun-calisma", title: "5 günlük yoğun çalışma", duration: "Art arda 5 gün · Günde 60 dakika", price: "3.600 TL", text: "Aynı konu üzerinde beş gün üst üste çalışmak ve her gün deneyimini paylaşarak ilerlemek isteyenler için.", message: "5 günlük yoğun çalışma" },
  { slug: "4-haftalik-calisma-paketi", title: "4 haftalık çalışma paketi", duration: "Haftada bir gün · 4 × 90 dakika", price: "6.000 TL", text: "Yavaş ama sağlam temellerle ilerlemek için bir ay boyunca görüşürüz. Her görüşmede konuşma ve enerji çalışması birlikte yer alır.", message: "4 haftalık çalışma paketi" },
] as const;

export function consultationWhatsapp(message: string) {
  return `https://wa.me/905054722153?text=${encodeURIComponent(`Merhaba, ${message} için randevu almak istiyorum. Uygun gün ve saatleri öğrenebilir miyim?`)}`;
}

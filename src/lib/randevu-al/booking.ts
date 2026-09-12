export const RANDEVU_WHATSAPP_NUMBER = "905054722153";

export type RandevuServiceCard = {
  name: string;
  duration: string;
  format: string;
  note: string;
};

export const BIREBIR_SERVICE_CARDS: RandevuServiceCard[] = [
  {
    name: "Tek Birebir Seans",
    duration: "90 dk",
    format: "Online birebir",
    note: "Tek bir konuya odaklanan görüşme.",
  },
  {
    name: "5 Günlük Yoğun Çalışma",
    duration: "5 gün",
    format: "Online birebir",
    note: "Aynı niyet üzerinde beş gün boyunca ilerleyen yoğun paket.",
  },
];

export const ENERJI_SERVICE_CARDS: RandevuServiceCard[] = [
  {
    name: "7 Çakra Dengeleme",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "Yedi enerji merkezini dengelemek için.",
  },
  {
    name: "Karma Temizliği",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "Tekrar eden döngüleri bırakmaya alan açar.",
  },
  {
    name: "Nazar Enerjisinden Arın",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "Yoğun dış etkiden sonra alanı toparlar.",
  },
  {
    name: "Mekan Enerjisi Temizliği",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "Ev veya çalışma alanındaki durağanlığı açar.",
  },
  {
    name: "Atalardan Gelen Negatif Bağ",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "Aile sisteminden taşınan ağır bağlara bakar.",
  },
  {
    name: "Kalbini Aşka Aç",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "İlişki alanındaki kırılma ve tekrarları yumuşatır.",
  },
  {
    name: "Bolluk & Servet Çalışması",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "Değer, kazanç ve üretkenlik sıkışmasına odaklanır.",
  },
  {
    name: "Tali Çakra Temizliği",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "Ana çakraları destekleyen ince noktaları temizler.",
  },
  {
    name: "Dişil-Eril Denge",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "Alma, verme ve yön belirleme hallerini dengeler.",
  },
  {
    name: "Sezgini Güçlendir",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "İç sesi daha net duymak için açılım çalışması.",
  },
  {
    name: "Sarkaç Uyumlama",
    duration: "45–60 dk",
    format: "Online birebir",
    note: "Sarkacı kişiselleştirip güvenilir kullanım zemini kurar.",
  },
];

export const BIREBIR_SERVICES = BIREBIR_SERVICE_CARDS.map(
  (service) => service.name,
);
export const ENERJI_SERVICES = ENERJI_SERVICE_CARDS.map(
  (service) => service.name,
);

export const TAROT_SERVICE_CARD: RandevuServiceCard = {
  name: "Tarot Bakımı",
  duration: "kişiye özel",
  format: "Online tarot",
  note: "Konuna özel tarot bakımı.",
};

export function serviceFromQuery(raw: string | null | undefined) {
  const value = String(raw ?? "")
    .trim()
    .toLowerCase();
  if (!value) return null;
  if (
    value === "tarot" ||
    value === "tarot-bakimi" ||
    value === "tarot bakımı" ||
    value === "tarot bakimi"
  ) {
    return TAROT_SERVICE_CARD.name;
  }
  return null;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function toRandevuIso(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function randevuMinIso(now = new Date()) {
  const next = new Date(now);
  next.setHours(0, 0, 0, 0);
  next.setDate(next.getDate() + 1);
  return toRandevuIso(next);
}

export function formatRandevuDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatRandevuWeekday(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
    weekday: "long",
  });
}

export function randevuWhatsappMessage(dateIso: string, service: string) {
  return `Merhaba, ${formatRandevuDate(dateIso)} tarihinde ${service} için randevu almak istiyorum. Uygun saatleri konuşabilir miyiz?`;
}

export function randevuWhatsappHref(dateIso: string, service: string) {
  return `https://wa.me/${RANDEVU_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    randevuWhatsappMessage(dateIso, service),
  )}`;
}

export function canSubmitRandevuRequest(
  selectedDate: string | null,
  selectedService: string | null,
) {
  return Boolean(selectedDate && selectedService);
}

export function randevuRequestSummary(
  selectedDate: string | null,
  selectedService: string | null,
) {
  if (!selectedDate) {
    return "Önce günü seç.";
  }

  if (!selectedService) {
    return `${formatRandevuDate(selectedDate)} seçildi. Şimdi çalışmayı seç.`;
  }

  return `${formatRandevuDate(selectedDate)} · ${selectedService}`;
}

export const RANDEVU_WHATSAPP_NUMBER = "905054722153";

export const BIREBIR_SERVICES = [
  "Tek Birebir Seans",
  "5 Günlük Yoğun Çalışma",
] as const;

export const ENERJI_SERVICES = [
  "7 Çakra Dengeleme",
  "Karma Temizliği",
  "Nazar Enerjisinden Arın",
  "Mekan Enerjisi Temizliği",
  "Atalardan Gelen Negatif Bağ",
  "Kalbini Aşka Aç",
  "Bolluk & Servet Çalışması",
  "Tali Çakra Temizliği",
  "Dişil-Eril Denge",
  "Sezgini Güçlendir",
  "Sarkaç Uyumlama",
] as const;

export function formatRandevuDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
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

import type { ProfilimDrawerId } from "../lib/profilim/types";

export type ProfilimTileItem = {
  id: ProfilimDrawerId;
  eyebrow: string;
  title: string;
};

export type ProfilimTileGroup = {
  id: string;
  eyebrow: string;
  title: string;
  tiles: ProfilimTileItem[];
};

export const PROFILIM_TILE_GROUPS: ProfilimTileGroup[] = [
  {
    id: "alan",
    eyebrow: "ALANIM",
    title: "Alanım",
    tiles: [
      { id: "inbox", eyebrow: "MESAJ", title: "Gelen Mesajlar" },
      { id: "favorites", eyebrow: "KAYITLI", title: "Favorilerim" },
      { id: "purchases", eyebrow: "ÇALIŞMALAR", title: "Satın Aldıklarım" },
      { id: "appointments", eyebrow: "SEANSLAR", title: "Randevularım" },
      { id: "library", eyebrow: "ARŞİV", title: "Kütüphanem" },
    ],
  },
  {
    id: "gelisim",
    eyebrow: "GELİŞİM",
    title: "Gelişim",
    tiles: [
      { id: "journey", eyebrow: "YOLCULUK", title: "Gelişim Yolculuğum" },
      { id: "understand", eyebrow: "TEST", title: "Kendini Tanı / Test Sonuçlarım" },
      { id: "activityHistory", eyebrow: "GEÇMİŞ", title: "İlerleme Geçmişim" },
      { id: "pdfs", eyebrow: "ANALİZ", title: "Analizlerim" },
    ],
  },
  {
    id: "gunluk",
    eyebrow: "GÜNLÜKLER",
    title: "Günlükler",
    tiles: [
      { id: "emotionJournal", eyebrow: "DUYGU", title: "Duygu Günlüğüm" },
      { id: "dreamJournal", eyebrow: "RÜYA", title: "Rüya Günlüğüm" },
      { id: "successJournal", eyebrow: "BAŞARI", title: "Başarı Günlüğüm" },
      { id: "journal", eyebrow: "YAZI", title: "Kişisel Günlüğüm" },
      { id: "letter", eyebrow: "MEKTUP", title: "Kendime Mektup" },
      { id: "duyguRehberi", eyebrow: "REHBER", title: "Duygu Rehberi" },
    ],
  },
  {
    id: "rituel",
    eyebrow: "RİTÜELLER",
    title: "Ritüeller",
    tiles: [
      { id: "ritualDone", eyebrow: "RİTÜEL", title: "Uyguladığım Ritüeller" },
      { id: "ritualNotes", eyebrow: "RİTÜEL", title: "Ritüel Notlarım" },
      { id: "ritualSaved", eyebrow: "RİTÜEL", title: "Kayıtlı Ritüeller" },
    ],
  },
];

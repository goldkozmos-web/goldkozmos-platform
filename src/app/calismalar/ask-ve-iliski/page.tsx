import type { Metadata } from "next";
import SimplifiedWorkDetail from "../../../components/calismalar/SimplifiedWorkDetail";

export const metadata: Metadata = {
  title: "Aşk Çalışması | Kalp Alanı ve Güven | GoldKozmos",
  description: "Geçmiş kırgınlıklar, güven ve yeni ilişkilere açıklık üzerine Aşk Çalışması. Tek günlük veya paket çalışma seçeneklerini keşfet.",
  alternates: { canonical: "https://goldkozmos.com/calismalar/ask-ve-iliski" },
};

export default function WorkDetailPage() {
  return <SimplifiedWorkDetail slug="ask" />;
}

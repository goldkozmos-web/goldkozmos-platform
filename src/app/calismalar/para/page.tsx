import type { Metadata } from "next";
import SimplifiedWorkDetail from "../../../components/calismalar/SimplifiedWorkDetail";

export const metadata: Metadata = {
  title: "Bolluk Rezonansı | Para ve Bereket Algısı | GoldKozmos",
  description: "Parayla kurduğun ilişki, para biriktirme alışkanlıkları ve bolluk algısı üzerine Bolluk Rezonansı. 30 dk 1.000 TL, 60 dk 1.800 TL veya art arda 5 gün, 40 dakika üzerinden 4.500 TL paket.",
  alternates: { canonical: "https://goldkozmos.com/calismalar/para" },
};

export default function WorkDetailPage() {
  return <SimplifiedWorkDetail slug="bolluk" />;
}

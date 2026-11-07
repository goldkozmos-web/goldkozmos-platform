import type { Metadata } from "next";
import SimplifiedWorkDetail from "../../../components/calismalar/SimplifiedWorkDetail";

export const metadata: Metadata = {
  title: "Bolluk Rezonansı | Para ve Bereket Algısı | GoldKozmos",
  description: "Parayla kurduğun ilişki, para biriktirme alışkanlıkları ve bolluk algısı üzerine Bolluk Rezonansı. Tek günlük ve paket seçenekleri.",
  alternates: { canonical: "https://goldkozmos.com/calismalar/para" },
};

export default function WorkDetailPage() {
  return <SimplifiedWorkDetail slug="bolluk" />;
}

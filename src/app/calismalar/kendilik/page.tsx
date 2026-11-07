import type { Metadata } from "next";
import SimplifiedWorkDetail from "../../../components/calismalar/SimplifiedWorkDetail";

export const metadata: Metadata = {
  title: "Kendilik Rezonansı | Özdeğer ve Sınırlar | GoldKozmos",
  description: "Özdeğer, onay ihtiyacı ve kişisel sınırlar üzerine Kendilik Rezonansı. Tek günlük ve paket çalışma seçeneklerini keşfet.",
  alternates: { canonical: "https://goldkozmos.com/calismalar/kendilik" },
};

export default function WorkDetailPage() {
  return <SimplifiedWorkDetail slug="kendilik" />;
}

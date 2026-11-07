import type { Metadata } from "next";
import SimplifiedWorkDetail from "../../../components/calismalar/SimplifiedWorkDetail";

export const metadata: Metadata = {
  title: "Kendilik Rezonansı | Özdeğer ve Sınırlar | GoldKozmos",
  description: "Özdeğer, onay ihtiyacı ve kişisel sınırlar üzerine Kendilik Rezonansı. 60 dk tanışma 1.800 TL, 90 dk seans 2.500 TL ve 5 seans paketi 7.500 TL.",
  alternates: { canonical: "https://goldkozmos.com/calismalar/kendilik" },
};

export default function WorkDetailPage() {
  return <SimplifiedWorkDetail slug="kendilik" />;
}

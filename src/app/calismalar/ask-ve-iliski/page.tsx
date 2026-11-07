import type { Metadata } from "next";
import SimplifiedWorkDetail from "../../../components/calismalar/SimplifiedWorkDetail";

export const metadata: Metadata = {
  title: "Aşk Rezonansı | Geçmiş İlişkiler ve Güven | GoldKozmos",
  description: "Geçmiş kırgınlıklar ve güven üzerine bireysel Aşk Rezonansı: 60 dk tanışma 1.800 TL, 90 dk seans 2.500 TL, 5 seans 7.500 TL.",
  alternates: { canonical: "https://goldkozmos.com/calismalar/ask-ve-iliski" },
};

export default function WorkDetailPage() {
  return <SimplifiedWorkDetail slug="ask" />;
}

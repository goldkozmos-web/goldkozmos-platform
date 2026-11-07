import type { Metadata } from "next";
import SimplifiedWorkDetail from "../../../components/calismalar/SimplifiedWorkDetail";

export const metadata: Metadata = {
  title: "İlişki Rezonansı | Alma-Verme ve Güven | GoldKozmos",
  description: "İki kişinin birlikte katıldığı İlişki Rezonansı: 60 dk 2.500 TL, 90 dk 3.500 TL, 5 seanslık çift paketi 10.000 TL.",
  alternates: { canonical: "https://goldkozmos.com/calismalar/iliski" },
};

export default function WorkDetailPage() {
  return <SimplifiedWorkDetail slug="iliski" />;
}

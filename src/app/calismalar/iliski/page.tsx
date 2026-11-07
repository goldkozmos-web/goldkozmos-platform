import type { Metadata } from "next";
import SimplifiedWorkDetail from "../../../components/calismalar/SimplifiedWorkDetail";

export const metadata: Metadata = {
  title: "İlişki Rezonansı | Alma-Verme ve Güven | GoldKozmos",
  description: "İlişkilerde alma-verme dengesi, güven, sınırlar ve tekrar eden döngüler için İlişki Rezonansı. Tek günlük veya paket çalışma.",
  alternates: { canonical: "https://goldkozmos.com/calismalar/iliski" },
};

export default function WorkDetailPage() {
  return <SimplifiedWorkDetail slug="iliski" />;
}

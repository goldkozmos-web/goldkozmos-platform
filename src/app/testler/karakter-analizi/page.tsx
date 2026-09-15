import type { Metadata } from "next";

import SelfTestClient from "../SelfTestClient";
import { CHARACTER_QUESTIONS } from "../../../data/selfTests";

export const metadata: Metadata = {
  title: "Karakter Analizi",
  description:
    "Klinik test değil. Sosyal enerji, karar, sınır ve stres eğilimlerini gören öz-farkındalık aracı.",
};

export default function Page() {
  return (
    <SelfTestClient
      kind="character"
      title="Karakter Analizi"
      lead="Bu bir klinik değerlendirme değil. Nasıl karar verdiğini, sınır koyduğunu ve stres altında nasıl durduğunu görmek için bir öz-farkındalık aracı."
      questions={CHARACTER_QUESTIONS}
      href="/testler/karakter-analizi"
    />
  );
}

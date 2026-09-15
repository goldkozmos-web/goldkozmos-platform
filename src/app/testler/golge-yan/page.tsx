import type { Metadata } from "next";

import SelfTestClient from "../SelfTestClient";
import {
  SHADOW_QUESTIONS,
  scoreLikert,
  shadowNarratives,
} from "../../../data/selfTests";

export const metadata: Metadata = {
  title: "Gölge Yan Testi",
  description:
    "Zorlandığın eğilimleri suçlamadan gören öz-farkındalık aracı.",
};

export default function Page() {
  return (
    <SelfTestClient
      kind="shadow"
      title="Gölge Yan"
      lead="Bu test seni suçlamaz. Zorlandığın eğilimleri fark etmek, onları dönüştürmenin ilk adımıdır. Klinik bir teşhis değildir."
      questions={SHADOW_QUESTIONS}
      href="/testler/golge-yan"
      buildResult={(answers) =>
        shadowNarratives(scoreLikert(SHADOW_QUESTIONS, answers))
      }
    />
  );
}

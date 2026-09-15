import type { Metadata } from "next";

import SelfTestClient from "../SelfTestClient";
import {
  RELATIONSHIP_QUESTIONS,
  relationshipNarratives,
  scoreLikert,
} from "../../../data/selfTests";

export const metadata: Metadata = {
  title: "İlişki Örüntüsü Testi",
  description:
    "Yakınlık, sınır ve çatışma ritmini gören öz-farkındalık aracı. Klinik bağlanma teşhisi değildir.",
};

export default function Page() {
  return (
    <SelfTestClient
      kind="relationship"
      title="İlişki Örüntüsü"
      lead="Bu bir bağlanma teşhisi değil. Yakınlık, mesafe, çatışma ve tekrar eden kalıplarını gözlemlemek için bir araç."
      questions={RELATIONSHIP_QUESTIONS}
      href="/testler/iliski-oruntusu"
      buildResult={(answers) =>
        relationshipNarratives(scoreLikert(RELATIONSHIP_QUESTIONS, answers))
      }
    />
  );
}

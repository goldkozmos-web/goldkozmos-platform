import type { Metadata } from "next";

import CalismalarHub from "../../components/calismalar/CalismalarHub";
import "../../styles/home.css";

export const metadata: Metadata = {
  title: { absolute: "Çalışmalar | GoldKozmos" },
  description:
    "Numeroloji, tarot, birebir seanslar, enerji çalışmaları ve rezonans eğitimleri tek merkezde.",
};

export default function CalismalarPage() {
  return <CalismalarHub />;
}

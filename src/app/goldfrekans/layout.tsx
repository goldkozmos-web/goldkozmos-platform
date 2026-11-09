import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/goldfrekans", "GoldFrekans — Doğa Sesleri ve Meditasyon Müziği", "Yağmur ve deniz seslerini, meditasyon ve frekans müziklerini ücretsiz dinle. GoldFrekans ile dinlenme, odaklanma ve kendi ritmine dönme alanını keşfet.", "/images/platform/goldfrekans-premium.webp");

export default function Layout({ children }: { children: ReactNode }) { return children; }

import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/goldbook", "GoldBook — Kişisel Gelişim ve İlişki Kitapları", "Özge Batıgün imzalı dijital kişisel gelişim kitaplarını keşfet. İçindeki Kozmosu Kucakla, Aşk Manifestosu ve Özdeğer ve Onay Bağımlılığı içeriklerini incele, Shopier üzerinden satın al.", "/images/platform/goldbook-premium.webp");

export default function Layout({ children }: { children: ReactNode }) { return children; }

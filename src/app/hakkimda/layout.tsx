import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/hakkimda", "Özge Batıgün — Goldkozmos ve Kozmik Enerji Yaklaşımı", "Goldkozmos kurucusu Özge Batıgün’ün yolculuğunu ve kozmik enerji, kişisel gelişim ve farkındalık odaklı yaklaşımını tanı. Birebir çalışma seçeneklerini keşfet.");

export default function Layout({ children }: { children: ReactNode }) { return children; }

import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/arketip-testi", "Arketip Testi — Kendini Tanıma ve Kişisel Farkındalık", "Ücretsiz arketip testiyle kendini tanıma yolculuğuna başla. Sembolik eğilimlerini keşfet, kişisel gelişim içerikleri ve çalışma seçeneklerini incele.");

export default function Layout({ children }: { children: ReactNode }) { return children; }

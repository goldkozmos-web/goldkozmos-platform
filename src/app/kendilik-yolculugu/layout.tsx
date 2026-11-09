import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/kendilik-yolculugu", "Kendilik Yolculuğu — Kişisel Gelişim ve Farkındalık", "Özdeğer, kişisel sınırlar ve içsel farkındalık üzerine kendilik yolculuğunu keşfet. Goldkozmos kişisel gelişim içerikleriyle kendine bir alan aç.");

export default function Layout({ children }: { children: ReactNode }) { return children; }

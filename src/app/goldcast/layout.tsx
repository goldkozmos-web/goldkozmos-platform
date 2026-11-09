import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/goldcast", "GoldCast — Kişisel Gelişim ve Farkındalık Podcasti", "Kendilik, ilişkiler, bolluk ve kişisel gelişim üzerine GoldCast bölümlerini YouTube ve Spotify üzerinden dinle. Özge Batıgün ile yeni bir bakış keşfet.", "/images/platform/goldcast-premium.webp");

export default function Layout({ children }: { children: ReactNode }) { return children; }

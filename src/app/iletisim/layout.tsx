import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/iletisim", "İletişim — Kozmik Enerji Çalışmaları ve Randevu", "Kozmik enerji ve kişisel gelişim çalışmaları hakkında Goldkozmos ile iletişime geç. Özge Batıgün ile online birebir seans ve randevu bilgisi al.");

export default function Layout({ children }: { children: ReactNode }) { return children; }

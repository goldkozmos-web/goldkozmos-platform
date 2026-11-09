import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/etkinlikler", "Etkinlikler ve Farkındalık Buluşmaları", "Goldkozmos etkinliklerini, enerji ve kişisel farkındalık odaklı buluşmaları incele. Yayın ve katılım bilgilerini ilgili etkinlikten takip et.");

export default function Layout({ children }: { children: ReactNode }) { return children; }

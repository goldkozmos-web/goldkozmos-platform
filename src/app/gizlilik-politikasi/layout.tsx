import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/gizlilik-politikasi", "Gizlilik Politikası", "Goldkozmos web sitesinde kişisel bilgilerin işlenmesi, gizlilik ve veri kullanımı hakkında bilgi al.");

export default function Layout({ children }: { children: ReactNode }) { return children; }

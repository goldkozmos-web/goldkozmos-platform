import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/kullanim-kosullari", "Kullanım Koşulları", "Goldkozmos web sitesinin, içeriklerinin ve dijital hizmetlerinin kullanım koşullarını incele.");

export default function Layout({ children }: { children: ReactNode }) { return children; }

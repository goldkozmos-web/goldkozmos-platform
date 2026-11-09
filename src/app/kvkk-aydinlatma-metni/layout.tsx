import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/kvkk-aydinlatma-metni", "KVKK Aydınlatma Metni", "Goldkozmos kişisel verilerin korunması aydınlatma metnini ve veri işleme bilgilerini incele.");

export default function Layout({ children }: { children: ReactNode }) { return children; }

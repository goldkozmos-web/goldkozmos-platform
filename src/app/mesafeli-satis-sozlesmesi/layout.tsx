import type { ReactNode } from "react";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/mesafeli-satis-sozlesmesi", "Mesafeli Satış Sözleşmesi", "Goldkozmos ürün ve hizmetlerine ilişkin mesafeli satış sözleşmesi ve satın alma koşullarını incele.");

export default function Layout({ children }: { children: ReactNode }) { return children; }

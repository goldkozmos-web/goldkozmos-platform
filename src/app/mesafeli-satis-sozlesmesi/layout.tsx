import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Mesafeli Satış Sözleşmesi",
  description:
    "GoldKozmos mesafeli satış sözleşmesi: dijital ürün ve hizmet alımlarına dair hükümler.",
  path: "/mesafeli-satis-sozlesmesi",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

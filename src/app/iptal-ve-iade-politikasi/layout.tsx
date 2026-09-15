import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "İptal ve İade Politikası",
  description:
    "GoldKozmos dijital hizmet ve ürünlerde iptal ile iade koşullarının özeti.",
  path: "/iptal-ve-iade-politikasi",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

import { publicPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Enerji Çalışmaları",
  description:
    "Çakra, aura, dişil-eril denge ve mekân enerjisine odaklanan GoldKozmos enerji çalışmaları.",
  path: "/calismalar/enerji",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

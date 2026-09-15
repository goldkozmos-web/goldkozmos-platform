import type { Metadata } from "next";

import { noIndexFollow } from "../../lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hesap",
  robots: noIndexFollow,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

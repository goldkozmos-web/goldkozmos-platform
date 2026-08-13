import type { Metadata, Viewport } from "next";
import "../styles/home.css";

export const metadata: Metadata = {
  title: "Goldkozmos® Enerji Ekolü",
  description:
    "Kendilik, ilişkiler, bolluk, kişisel gelişim, Stoa ve öz farkındalık üzerine çalışmalar.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
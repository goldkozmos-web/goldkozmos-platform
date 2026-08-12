import type { Metadata } from "next";
import "../styles/home.css";

export const metadata: Metadata = {
  title: "Goldkozmos® Enerji Ekolü",
  description:
    "Kendilik, ilişkiler, bolluk, kişisel gelişim, Stoa ve öz farkındalık üzerine çalışmalar.",
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
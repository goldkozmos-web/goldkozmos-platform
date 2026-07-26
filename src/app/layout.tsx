import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goldkozmos",
  description:
    "İnsan değişmeden hayat değişmez. Kendi kozmosunu bul.",
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
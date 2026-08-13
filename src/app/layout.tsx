import type { Metadata, Viewport } from "next";
import "../styles/home.css";
import "../styles/mobile-v2.css";

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
}/* =========================================================
   MOBİL - PROFİL KARTI + SOSYAL İKON SON DÜZELTME
========================================================= */

@media (max-width: 650px) {

  /* ÖZGE BATIGÜN BİLGİ KARTI */

  .homeV3Page .homeV3HeroProfileName {
    position: relative !important;

    width: calc(100% - 24px) !important;
    max-width: none !important;

    min-height: 52px !important;

    margin:
      -64px
      12px
      0 !important;

    padding:
      10px
      14px !important;

    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;

    gap: 10px !important;

    border-radius: 16px !important;

    background: rgba(48, 38, 31, 0.94) !important;

    overflow: hidden !important;

    z-index: 10 !important;
  }


  /* ÖZGE BATIGÜN YAZISINI KUTUNUN İÇİNE KİLİTLE */

  .homeV3Page .homeV3HeroProfileName strong {
    position: static !important;

    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;

    display: block !important;

    margin: 0 !important;
    padding: 0 !important;

    transform: none !important;

    font-size: 13px !important;
    line-height: 1.15 !important;
    font-weight: 500 !important;

    color: #ffffff !important;

    white-space: nowrap !important;
  }


  /* SAĞDAKİ KÜÇÜK AÇIKLAMA */

  .homeV3Page .homeV3HeroProfileName span {
    position: static !important;

    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;

    margin: 0 !important;
    padding: 0 !important;

    transform: none !important;

    font-size: 7.5px !important;
    line-height: 1.2 !important;

    color: rgba(255, 255, 255, 0.82) !important;

    text-align: right !important;
  }


  /* SOSYAL İKONLARI BİR TIK BÜYÜT */

  .homeV3Page .homeV3HeroSocials {
    margin-top: 14px !important;
    gap: 8px !important;
  }

  .homeV3Page .homeV3HeroSocials a {
    width: 36px !important;
    height: 36px !important;
  }

  .homeV3Page .homeV3HeroSocials svg {
    width: 16px !important;
    height: 16px !important;
  }
}
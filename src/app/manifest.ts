import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Goldkozmos® Rezonans Ekolü",

    short_name: "Goldkozmos",

    description:
      "Kişisel gelişim, Stoa, sosyoloji, kendilik, ilişkiler, bolluk ve spiritüel farkındalık ekosistemi.",

    start_url: "/",
    scope: "/",
    display: "standalone",
    id: "/",

    background_color: "#1b1009",

    theme_color: "#1b1009",

    lang: "tr",

    icons: [
      {
        src: "/images/brand/goldkozmos-gk-google-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/brand/goldkozmos-gk-launch-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/notifications/goldkozmos-monochrome-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "monochrome",
      },
      {
        src: "/images/brand/goldkozmos-gk-launch-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

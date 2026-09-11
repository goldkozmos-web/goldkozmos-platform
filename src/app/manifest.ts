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

    background_color: "#fbf7ef",

    theme_color: "#1b1009",

    lang: "tr",

    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
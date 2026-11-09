export async function GET() {
  return Response.json({
    id: "/panel",
    name: "GoldKozmos Yönetim Merkezi",
    short_name: "GoldKozmos Panel",
    start_url: "/panel",
    scope: "/panel",
    display: "standalone",
    background_color: "#F6F0E5",
    theme_color: "#241813",
    lang: "tr",
    icons: [
      {
        src: "/images/brand/goldkozmos-gk-launch-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/brand/goldkozmos-gk-google-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  });
}

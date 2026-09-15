import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/profilim",
          "/profilim/",
          "/ayarlar",
          "/ayarlar/",
          "/auth/",
          "/giris",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: "goldkozmos.com",
  };
}

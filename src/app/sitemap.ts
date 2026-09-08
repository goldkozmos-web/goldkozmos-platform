import type { MetadataRoute } from "next";

const baseUrl = "https://goldkozmos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${baseUrl}/enerji-ekolu`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/sana-uygun-calismayi-bul`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/calismalar/kendilik`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/calismalar/iliski`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/calismalar/para`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/calismalar/birebir-seanslar`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/calismalar/enerji-calismalari`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/goldmind`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/calismalar/tarot`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/calismalar/numeroloji`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/calismalar/ses-kayitlari`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/rezonans-egitimleri`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/goldbook`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/goldcast`,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/goldblog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/goldfrekans`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/etkinlikler`,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/hakkimda`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/whatsapp-kanali`,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/randevu`,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    {
      url: `${baseUrl}/iletisim`,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/gizlilik-politikasi`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${baseUrl}/kvkk-aydinlatma-metni`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${baseUrl}/kullanim-kosullari`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${baseUrl}/iptal-ve-iade-politikasi`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${baseUrl}/mesafeli-satis-sozlesmesi`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${baseUrl}/erisilebilirlik`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
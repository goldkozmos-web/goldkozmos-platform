import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/burc-uyumu/:first(koc|boga|ikizler|yengec|aslan|basak|terazi|akrep|yay|oglak|kova|balik)-:second(koc|boga|ikizler|yengec|aslan|basak|terazi|akrep|yay|oglak|kova|balik)",
        destination: "/burclar?ilk=:first&ikinci=:second#burc-uyumu",
        permanent: true,
      },
      {
        source: "/burclar/:sign(koc|boga|ikizler|yengec|aslan|basak|terazi|akrep|yay|oglak|kova|balik)-:gender(kadini|erkegi)",
        destination: "/burclar/:sign",
        permanent: true,
      },
      {
        source: "/product-page/a%C5%9Fk-manifestosu-mini-kitap",
        destination: "/goldbook",
        permanent: true,
      },
      {
        source: "/burclar/oglak-kadini",
        destination: "/burclar/oglak",
        permanent: true,
      },
      {
        source: "/meditasyon-nefes-alani",
        destination: "/goldmind",
        permanent: true,
      },
      {
        source: "/icon",
        destination: "/icon.png",
        permanent: false,
      },
      {
        source: "/apple-icon",
        destination: "/apple-icon.png",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

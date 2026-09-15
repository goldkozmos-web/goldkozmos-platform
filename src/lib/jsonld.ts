import { AUTHOR_NAME, SITE_NAME, SOCIAL_SAME_AS, absoluteUrl } from "./seo";
import { SITE_ORIGIN } from "./site";

export function breadcrumbJsonLd(
  items: { name: string; path?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : undefined,
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/icon.png`,
    },
    sameAs: [...SOCIAL_SAME_AS],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: SITE_NAME,
    inLanguage: "tr-TR",
    publisher: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
  };
}

export function blogPostingJsonLd({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: "tr-TR",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: absoluteUrl("/hakkimda"),
    },
    publisher: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
    image: image ? absoluteUrl(image) : `${SITE_ORIGIN}/opengraph-image`,
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
    areaServed: "TR",
  };
}

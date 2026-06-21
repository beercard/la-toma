import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SEO_DEFAULT_IMAGE,
  SEO_LANGUAGE,
  SEO_LOCALE,
  SEO_ROBOTS,
  SEO_SITE_NAME,
  SEO_SITE_URL,
  buildStructuredData,
  getSeoForPath,
} from "../../lib/seo";

const upsertMetaTag = (selector: string, attributes: Record<string, string>, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertLinkTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
};

export default function RouteSeo() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // El panel /admin no se indexa ni gestiona meta pública.
    if (location.pathname.startsWith("/admin")) {
      return;
    }

    const pageSeo = getSeoForPath(location.pathname);
    const origin = SEO_SITE_URL;
    const canonicalUrl = new URL(pageSeo.path, origin).toString();
    const absoluteImageUrl = new URL(SEO_DEFAULT_IMAGE, origin).toString();
    const structuredData = buildStructuredData(origin, pageSeo);
    const title = pageSeo.title;

    document.documentElement.lang = SEO_LANGUAGE;
    document.title = title;

    upsertMetaTag('meta[name="description"]', { name: "description" }, pageSeo.description);
    upsertMetaTag('meta[name="keywords"]', { name: "keywords" }, pageSeo.keywords.join(", "));
    upsertMetaTag('meta[name="robots"]', { name: "robots" }, SEO_ROBOTS);
    upsertMetaTag('meta[property="og:type"]', { property: "og:type" }, "website");
    upsertMetaTag('meta[property="og:locale"]', { property: "og:locale" }, SEO_LOCALE);
    upsertMetaTag('meta[property="og:site_name"]', { property: "og:site_name" }, SEO_SITE_NAME);
    upsertMetaTag('meta[property="og:title"]', { property: "og:title" }, title);
    upsertMetaTag('meta[property="og:description"]', { property: "og:description" }, pageSeo.description);
    upsertMetaTag('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    upsertMetaTag('meta[property="og:image"]', { property: "og:image" }, absoluteImageUrl);
    upsertMetaTag('meta[property="og:image:alt"]', { property: "og:image:alt" }, SEO_SITE_NAME);
    upsertMetaTag('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMetaTag('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    upsertMetaTag('meta[name="twitter:description"]', { name: "twitter:description" }, pageSeo.description);
    upsertMetaTag('meta[name="twitter:image"]', { name: "twitter:image" }, absoluteImageUrl);
    upsertMetaTag('meta[name="twitter:image:alt"]', { name: "twitter:image:alt" }, SEO_SITE_NAME);

    upsertLinkTag('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    const scriptId = "route-structured-data";
    let scriptElement = document.head.querySelector<HTMLScriptElement>(`script#${scriptId}`);

    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.type = "application/ld+json";
      scriptElement.id = scriptId;
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(structuredData);
  }, [location.pathname]);

  return null;
}

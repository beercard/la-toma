import {
  SITE_ADDRESS_LINE,
  SITE_EMAIL,
  SITE_INSTAGRAM_LINK,
  SITE_LOCATION_TITLE,
  SITE_MAP_LINK,
  SITE_NAV_LINKS,
  SITE_WHATSAPP_DISPLAY,
  SITE_WHATSAPP_LINK,
} from "./siteConfig";

export const SEO_SITE_NAME = "La Toma Multiespacio";
export const SEO_SITE_URL = "https://latoma.com.ar";
export const SEO_DEFAULT_IMAGE = "/og-image.jpg";
export const SEO_LOCALE = "es_AR";
export const SEO_LANGUAGE = "es-AR";
export const SEO_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

const SEO_EVENTS = [
  {
    slug: "vinilos-rio",
    name: "Vinilos & Río",
    description:
      "DJ set en vinilo, coctelería y atardecer frente al río en La Toma, Costanera de Corrientes Capital.",
    startDate: "2026-07-11T19:00:00-03:00",
  },
  {
    slug: "taller-filtrados",
    name: "Taller de Filtrados",
    description:
      "Encuentro para descubrir métodos de café, sabores y degustaciones en La Toma, frente al río.",
    startDate: "2026-07-11T17:00:00-03:00",
  },
  {
    slug: "after-office",
    name: "After Office",
    description:
      "After office con música, coctelería y gastronomía en La Toma, restobar de la Costanera correntina.",
    startDate: "2026-07-11T20:00:00-03:00",
  },
  {
    slug: "ceramica-de-autor",
    name: "Cerámica de Autor",
    description:
      "Encuentro de diseño, oficio y sobremesa en La Toma con piezas de autor y experiencia gastronómica.",
    startDate: "2026-07-11T18:00:00-03:00",
  },
];

const SEO_GALLERY_IMAGES: string[] = [];

export interface RouteSeoData {
  path: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  pageType: string;
  keywords: string[];
}

export const routeSeoMap: Record<string, RouteSeoData> = {
  "/": {
    path: "/",
    title: "La Toma | Restobar en la Costanera de Corrientes Capital",
    description:
      "Restobar en la Costanera de Corrientes Capital frente al río. Reservas, café bar, eventos, tragos y experiencias al atardecer en La Toma.",
    breadcrumbLabel: "Inicio",
    pageType: "WebPage",
    keywords: [
      "restobar en Corrientes Capital",
      "restobar Costanera Corrientes",
      "bar en Corrientes Capital",
      "café bar en Corrientes",
      "reservas restobar Corrientes",
    ],
  },
  "/cafe-bar": {
    path: "/cafe-bar",
    title: "Café Bar en la Costanera de Corrientes | La Toma",
    description:
      "Descubrí el Café Bar de La Toma en la Costanera de Corrientes Capital: desayunos, meriendas, encuentros y momentos frente al río Paraná.",
    breadcrumbLabel: "Café Bar",
    pageType: "WebPage",
    keywords: [
      "café bar Corrientes Capital",
      "cafetería Costanera Corrientes",
      "café en Corrientes Capital",
      "merienda Costanera Corrientes",
      "bar frente al río Corrientes",
    ],
  },
  "/proyecto": {
    path: "/proyecto",
    title: "El Proyecto de La Toma | Restobar frente al río en Corrientes",
    description:
      "Conocé el proyecto de La Toma, restobar y multiespacio en la Costanera de Corrientes Capital con arquitectura, historia y versatilidad frente al río Paraná.",
    breadcrumbLabel: "El Proyecto",
    pageType: "AboutPage",
    keywords: [
      "restobar frente al río Corrientes",
      "bar Costanera Corrientes",
      "multiespacio Corrientes Capital",
      "proyecto gastronómico Corrientes",
    ],
  },
  "/galeria": {
    path: "/galeria",
    title: "Galería de La Toma | Restobar en Corrientes Capital",
    description:
      "Recorré la galería de La Toma con fotos de noches, encuentros, gastronomía y eventos en nuestro restobar de la Costanera de Corrientes Capital.",
    breadcrumbLabel: "Galería",
    pageType: "CollectionPage",
    keywords: [
      "bar en Corrientes Capital",
      "restobar Costanera Corrientes",
      "noches en Corrientes Capital",
      "galería restobar Corrientes",
    ],
  },
  "/eventos": {
    path: "/eventos",
    title: "Eventos en la Costanera de Corrientes | La Toma",
    description:
      "Organizá eventos en La Toma, espacio en la Costanera de Corrientes Capital para encuentros sociales, corporativos, after office y celebraciones a medida.",
    breadcrumbLabel: "Eventos",
    pageType: "CollectionPage",
    keywords: [
      "eventos en Corrientes Capital",
      "bar para eventos Corrientes",
      "after office Corrientes Capital",
      "cumpleaños en bar Corrientes",
      "espacio para eventos Costanera Corrientes",
    ],
  },
  "/reservas": {
    path: "/reservas",
    title: "Reservá tu mesa en Corrientes Capital | La Toma",
    description:
      "Reservá tu mesa en La Toma, restobar en la Costanera de Corrientes Capital. Coordinación por WhatsApp, atención personalizada y horarios disponibles.",
    breadcrumbLabel: "Reservas",
    pageType: "WebPage",
    keywords: [
      "reservá mesa Corrientes Capital",
      "reservas restobar Corrientes",
      "bar con reservas Corrientes",
      "cena Costanera Corrientes",
    ],
  },
  "/contacto": {
    path: "/contacto",
    title: "Contacto y ubicación | La Toma en Corrientes Capital",
    description:
      "Contactá a La Toma y encontrá nuestra ubicación en la Costanera de Corrientes Capital. WhatsApp, correo, mapa interactivo y acceso directo al restobar frente al río.",
    breadcrumbLabel: "Contacto",
    pageType: "ContactPage",
    keywords: [
      "ubicación La Toma Corrientes",
      "contacto restobar Corrientes Capital",
      "bar Costanera Corrientes ubicación",
      "mapa restobar Corrientes",
    ],
  },
  "/privacidad": {
    path: "/privacidad",
    title: "Políticas de privacidad | La Toma Multiespacio",
    description:
      "Conocé cómo La Toma Multiespacio recopila, utiliza y protege tus datos personales al usar nuestro sitio web y formularios de reservas y eventos.",
    breadcrumbLabel: "Políticas de privacidad",
    pageType: "WebPage",
    keywords: ["políticas de privacidad La Toma", "privacidad restobar Corrientes"],
  },
  "/terminos": {
    path: "/terminos",
    title: "Términos y Condiciones | La Toma Multiespacio",
    description:
      "Términos y condiciones de uso del sitio web de La Toma Multiespacio, restobar en la Costanera de Corrientes Capital, y de sus servicios de reservas y eventos.",
    breadcrumbLabel: "Términos y Condiciones",
    pageType: "WebPage",
    keywords: ["términos y condiciones La Toma", "condiciones restobar Corrientes"],
  },
};

export const getSeoForPath = (pathname: string) => routeSeoMap[pathname] ?? routeSeoMap["/"];

const toAbsoluteUrl = (origin: string, pathOrUrl: string) => {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, origin).toString();
};

const buildBreadcrumbSchema = (origin: string, page: RouteSeoData) => {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: toAbsoluteUrl(origin, "/"),
    },
  ];

  if (page.path !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: page.breadcrumbLabel,
      item: toAbsoluteUrl(origin, page.path),
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${toAbsoluteUrl(origin, page.path)}#breadcrumb`,
    itemListElement: items,
  };
};

const buildWebsiteSchema = (origin: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${origin}#website`,
  name: SEO_SITE_NAME,
  url: origin,
  inLanguage: SEO_LANGUAGE,
  description: routeSeoMap["/"].description,
  potentialAction: {
    "@type": "ReserveAction",
    target: `${toAbsoluteUrl(origin, "/reservas")}`,
  },
});

const buildSiteNavigationSchema = (origin: string) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${origin}#navigation`,
  name: "Navegación principal",
  itemListElement: SITE_NAV_LINKS.map((link, index) => ({
    "@type": "SiteNavigationElement",
    position: index + 1,
    name: link.name,
    url: toAbsoluteUrl(origin, link.path),
  })),
});

const buildOrganizationSchema = (origin: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${origin}#organization`,
  name: SEO_SITE_NAME,
  url: origin,
  logo: toAbsoluteUrl(origin, "/favicon.svg"),
  email: SITE_EMAIL,
  telephone: SITE_WHATSAPP_DISPLAY,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "reservas y atención al cliente",
      email: SITE_EMAIL,
      telephone: SITE_WHATSAPP_DISPLAY,
      url: SITE_WHATSAPP_LINK,
      availableLanguage: ["es-AR"],
      areaServed: "AR",
    },
  ],
  sameAs: [SITE_INSTAGRAM_LINK, SITE_MAP_LINK],
});

const buildRestaurantSchema = (origin: string) => ({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${origin}#restaurant`,
  name: SEO_SITE_NAME,
  description:
    "Restobar y multiespacio ubicado en la Costanera de Corrientes Capital, frente al río, con reservas, café bar, eventos y experiencias al atardecer.",
  url: origin,
  image: toAbsoluteUrl(origin, SEO_DEFAULT_IMAGE),
  logo: toAbsoluteUrl(origin, "/favicon.svg"),
  email: SITE_EMAIL,
  telephone: SITE_WHATSAPP_DISPLAY,
  servesCuisine: ["Restobar", "Cafetería", "Coctelería"],
  acceptsReservations: true,
  keywords:
    "restobar en Corrientes Capital, restobar Costanera Corrientes, café bar Corrientes, eventos en Corrientes Capital, reservas restobar Corrientes",
  areaServed: "Corrientes Capital y alrededores",
  sameAs: [SITE_INSTAGRAM_LINK, SITE_MAP_LINK],
  hasMap: SITE_MAP_LINK,
  hasMenu: toAbsoluteUrl(origin, "/cafe-bar"),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE_ADDRESS_LINE} 1214`,
    addressLocality: "Corrientes Capital",
    addressRegion: "Corrientes",
    postalCode: "W3400",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -27.4695762,
    longitude: -58.8544889,
  },
  containedInPlace: {
    "@type": "Place",
    name: SITE_LOCATION_TITLE,
  },
  potentialAction: {
    "@type": "ReserveAction",
    target: `${toAbsoluteUrl(origin, "/reservas")}`,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["https://schema.org/Thursday", "https://schema.org/Friday"],
      opens: "18:00",
      closes: "02:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "https://schema.org/Saturday",
      opens: "10:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "https://schema.org/Saturday",
      opens: "19:00",
      closes: "03:00",
    },
  ],
});

const buildWebPageSchema = (origin: string, page: RouteSeoData) => ({
  "@context": "https://schema.org",
  "@type": page.pageType,
  "@id": `${toAbsoluteUrl(origin, page.path)}#webpage`,
  name: page.title,
  description: page.description,
  url: toAbsoluteUrl(origin, page.path),
  inLanguage: SEO_LANGUAGE,
  keywords: page.keywords.join(", "),
  isPartOf: {
    "@id": `${origin}#website`,
  },
  about: {
    "@id": `${origin}#restaurant`,
  },
  breadcrumb: {
    "@id": `${toAbsoluteUrl(origin, page.path)}#breadcrumb`,
  },
});

const buildReservationServiceSchema = (origin: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${toAbsoluteUrl(origin, "/reservas")}#service`,
  name: "Reserva de mesa en La Toma",
  serviceType: "Reserva de mesa en restobar",
  areaServed: "Corrientes Capital",
  provider: {
    "@id": `${origin}#restaurant`,
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: toAbsoluteUrl(origin, "/reservas"),
  },
});

const buildGallerySchema = (origin: string) => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": `${toAbsoluteUrl(origin, "/galeria")}#gallery`,
  name: "Galería de La Toma",
  description:
    "Galería de imágenes de noches, encuentros, gastronomía y eventos en La Toma, restobar en la Costanera de Corrientes Capital.",
  url: toAbsoluteUrl(origin, "/galeria"),
  about: {
    "@id": `${origin}#restaurant`,
  },
  associatedMedia: SEO_GALLERY_IMAGES.map((imagePath, index) => ({
    "@type": "ImageObject",
    "@id": `${toAbsoluteUrl(origin, "/galeria")}#image-${index + 1}`,
    contentUrl: toAbsoluteUrl(origin, imagePath),
    url: toAbsoluteUrl(origin, imagePath),
    caption: `Imagen ${index + 1} de La Toma`,
  })),
});

const buildEventsSchemas = (origin: string) =>
  SEO_EVENTS.map((eventItem) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${toAbsoluteUrl(origin, "/eventos")}#${eventItem.slug}`,
    name: eventItem.name,
    description: eventItem.description,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    startDate: eventItem.startDate,
    endDate: eventItem.startDate,
    image: [toAbsoluteUrl(origin, SEO_DEFAULT_IMAGE)],
    url: toAbsoluteUrl(origin, "/eventos"),
    organizer: {
      "@id": `${origin}#organization`,
    },
    location: {
      "@type": "Place",
      name: SEO_SITE_NAME,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${SITE_ADDRESS_LINE} 1214`,
        addressLocality: "Corrientes Capital",
        addressRegion: "Corrientes",
        postalCode: "W3400",
        addressCountry: "AR",
      },
    },
  }));

const buildPageSpecificSchemas = (origin: string, page: RouteSeoData) => {
  if (page.path === "/reservas") {
    return [buildReservationServiceSchema(origin)];
  }

  if (page.path === "/galeria") {
    return [buildGallerySchema(origin)];
  }

  if (page.path === "/eventos") {
    return buildEventsSchemas(origin);
  }

  return [];
};

export const buildStructuredData = (origin: string, page: RouteSeoData) => [
  buildWebsiteSchema(origin),
  buildSiteNavigationSchema(origin),
  buildOrganizationSchema(origin),
  buildRestaurantSchema(origin),
  buildBreadcrumbSchema(origin, page),
  buildWebPageSchema(origin, page),
  ...buildPageSpecificSchemas(origin, page),
];

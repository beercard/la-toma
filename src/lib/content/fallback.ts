import type { CartaCategory, EventItem, GalleryItem } from "./types";

export const fallbackCarta: CartaCategory[] = [
  {
    id: "cat-cafe",
    title: "Café de especialidad",
    items: [
      { id: "i1", name: "Espresso", description: "Simple o doble, de tueste de la casa.", price: "$2.500" },
      { id: "i2", name: "Flat white", description: "Espresso doble con leche texturada.", price: "$3.800" },
      { id: "i3", name: "Cappuccino", description: "Con espuma cremosa y cacao.", price: "$3.600" },
      { id: "i4", name: "Filtrado V60", description: "Método de filtrado, grano de estación.", price: "$4.200" },
    ],
  },
  {
    id: "cat-acompanar",
    title: "Para acompañar",
    items: [
      { id: "i5", name: "Medialunas (x2)", description: "De manteca, recién horneadas.", price: "$2.400" },
      { id: "i6", name: "Tostado de campo", description: "Jamón, queso y tomate en pan de masa madre.", price: "$5.200" },
      { id: "i7", name: "Avocado toast", description: "Palta, huevo pochado y semillas.", price: "$6.800" },
      { id: "i8", name: "Budín del día", description: "Consultá la variedad de hoy.", price: "$3.200" },
    ],
  },
  {
    id: "cat-meriendas",
    title: "Meriendas frente al río",
    items: [
      { id: "i9", name: "Merienda La Toma", description: "Café, jugo, tostado y pastelería.", price: "$9.500" },
      { id: "i10", name: "Cheesecake de estación", description: "Con coulis de frutos rojos.", price: "$5.400" },
      { id: "i11", name: "Carrot cake", description: "Con frosting de queso crema.", price: "$5.200" },
    ],
  },
  {
    id: "cat-cocteleria",
    title: "Coctelería al atardecer",
    items: [
      { id: "i12", name: "Spritz La Toma", description: "Aperitivo cítrico con espumante.", price: "$7.500" },
      { id: "i13", name: "Gin tonic de autor", description: "Con botánicos de la casa.", price: "$8.200" },
      { id: "i14", name: "Negroni", description: "Gin, vermouth rosso y bitter.", price: "$8.000" },
      { id: "i15", name: "Vino por copa", description: "Tinto, blanco o rosado de bodega seleccionada.", price: "$5.500" },
    ],
  },
];

export const fallbackEvents: EventItem[] = [
  {
    id: "vinilos-rio",
    slug: "vinilos-rio",
    title: "Vinilos & Río",
    createdAt: "2026-06-28T20:00:00-03:00",
    dateLabel: "11|07",
    startsAt: "2026-07-11T19:00:00-03:00",
    description:
      "La transición perfecta de la tarde a la noche. Abrimos el fin de semana en la terraza de nuestro multiespacio con un DJ set 100% en vinilo, deep house y el atardecer cayendo sobre el río.",
    expandedDescription:
      "La transición perfecta de la tarde a la noche.\n\nAbrimos el fin de semana en la terraza de nuestro multiespacio con un DJ set 100% en vinilo, curado para acompañar la caída del sol sobre la Punta San Sebastián.\n\nMientras el ritmo del deep house marca el pulso, nuestra barra exterior despliega una carta de coctelería de autor y platillos de estación.",
  },
  {
    id: "taller-filtrados",
    slug: "taller-filtrados",
    title: "Taller de Filtrados",
    createdAt: "2026-06-27T20:00:00-03:00",
    dateLabel: "11|07",
    startsAt: "2026-07-11T17:00:00-03:00",
    description:
      "Una experiencia pensada para descubrir nuevos métodos y sabores. Compartimos una jornada de filtrados, conversación y degustación en un encuentro relajado frente al río.",
  },
  {
    id: "after-office",
    slug: "after-office",
    title: "After Office",
    createdAt: "2026-06-26T20:00:00-03:00",
    dateLabel: "11|07",
    startsAt: "2026-07-11T20:00:00-03:00",
    description:
      "El cierre ideal para la jornada. Música, coctelería y gastronomía en un formato descontracturado para encontrarse después de la oficina con colegas y amigos.",
  },
  {
    id: "ceramica-de-autor",
    slug: "ceramica-de-autor",
    title: "Cerámica de Autor",
    createdAt: "2026-06-25T20:00:00-03:00",
    dateLabel: "11|07",
    startsAt: "2026-07-11T18:00:00-03:00",
    description:
      "Un encuentro entre diseño, oficio y sobremesa. Presentamos piezas de cerámica de autor en una noche donde la estética, el detalle y la experiencia van de la mano.",
  },
];

export const fallbackGallery: GalleryItem[] = [
];

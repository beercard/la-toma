export interface CartaItem {
  id: string;
  name: string;
  description?: string;
  price?: string;
}

export interface CartaCategory {
  id: string;
  title: string;
  items: CartaItem[];
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  dateLabel?: string;
  startsAt?: string | null;
  description: string;
  expandedDescription?: string;
  imageUrl?: string | null;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  tag?: string;
}

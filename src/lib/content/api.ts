import { MEDIA_BUCKET, isSupabaseConfigured, supabase } from "../supabaseClient";
import { fallbackCarta, fallbackEvents, fallbackGallery } from "./fallback";
import type { CartaCategory, CartaItem, EventItem, GalleryItem } from "./types";

// ----------------------------------------------------------------------------
// LECTURA pública (con respaldo estático)
// ----------------------------------------------------------------------------

export async function getCarta(): Promise<CartaCategory[]> {
  if (!supabase) return fallbackCarta;

  const { data: categories, error: catError } = await supabase
    .from("menu_categories")
    .select("id, title, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (catError || !categories || categories.length === 0) return fallbackCarta;

  const { data: items, error: itemError } = await supabase
    .from("menu_items")
    .select("id, category_id, name, description, price, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (itemError) return fallbackCarta;

  return categories.map((category) => ({
    id: category.id,
    title: category.title,
    items: (items ?? [])
      .filter((item) => item.category_id === category.id)
      .map<CartaItem>((item) => ({
        id: item.id,
        name: item.name,
        description: item.description ?? undefined,
        price: item.price ?? undefined,
      })),
  }));
}

export async function getEvents(): Promise<EventItem[]> {
  if (!supabase) return fallbackEvents;

  const { data, error } = await supabase
    .from("events")
    .select("id, slug, title, date_label, starts_at, description, expanded_description, image_url, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackEvents;

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    dateLabel: row.date_label ?? undefined,
    startsAt: row.starts_at,
    description: row.description,
    expandedDescription: row.expanded_description ?? undefined,
    imageUrl: row.image_url,
  }));
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (!supabase) return fallbackGallery;

  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, image_url, alt, tag, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackGallery;

  return data.map((row) => ({
    id: row.id,
    src: row.image_url,
    alt: row.alt ?? "",
    tag: row.tag ?? undefined,
  }));
}

// ----------------------------------------------------------------------------
// ESCRITURA (panel /admin — requiere sesión autenticada)
// ----------------------------------------------------------------------------

function requireClient() {
  if (!supabase) {
    throw new Error("Supabase no está configurado. Cargá VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.");
  }
  return supabase;
}

async function run<T>(promise: PromiseLike<{ data: T; error: { message: string } | null }>): Promise<T> {
  const { data, error } = await promise;
  if (error) throw new Error(error.message);
  return data;
}

export const isAdminEnabled = isSupabaseConfigured;

// Carta — categorías
export const adminListCategories = () =>
  run(requireClient().from("menu_categories").select("*").order("sort_order"));
export const adminCreateCategory = (title: string, sortOrder = 0) =>
  run(requireClient().from("menu_categories").insert({ title, sort_order: sortOrder }).select().single());
export const adminUpdateCategory = (id: string, patch: Record<string, unknown>) =>
  run(requireClient().from("menu_categories").update(patch).eq("id", id).select().single());
export const adminDeleteCategory = (id: string) =>
  run(requireClient().from("menu_categories").delete().eq("id", id).select());

// Carta — ítems
export const adminListItems = () =>
  run(requireClient().from("menu_items").select("*").order("sort_order"));
export const adminCreateItem = (payload: Record<string, unknown>) =>
  run(requireClient().from("menu_items").insert(payload).select().single());
export const adminUpdateItem = (id: string, patch: Record<string, unknown>) =>
  run(requireClient().from("menu_items").update(patch).eq("id", id).select().single());
export const adminDeleteItem = (id: string) =>
  run(requireClient().from("menu_items").delete().eq("id", id).select());

// Eventos
export const adminListEvents = () =>
  run(requireClient().from("events").select("*").order("sort_order"));
export const adminCreateEvent = (payload: Record<string, unknown>) =>
  run(requireClient().from("events").insert(payload).select().single());
export const adminUpdateEvent = (id: string, patch: Record<string, unknown>) =>
  run(requireClient().from("events").update(patch).eq("id", id).select().single());
export const adminDeleteEvent = (id: string) =>
  run(requireClient().from("events").delete().eq("id", id).select());

// Galería
export const adminListGallery = () =>
  run(requireClient().from("gallery_images").select("*").order("sort_order"));
export const adminCreateGalleryImage = (payload: Record<string, unknown>) =>
  run(requireClient().from("gallery_images").insert(payload).select().single());
export const adminUpdateGalleryImage = (id: string, patch: Record<string, unknown>) =>
  run(requireClient().from("gallery_images").update(patch).eq("id", id).select().single());
export const adminDeleteGalleryImage = (id: string) =>
  run(requireClient().from("gallery_images").delete().eq("id", id).select());

// Storage — subida de imágenes
export async function uploadMedia(file: File, folder = "gallery"): Promise<string> {
  const client = requireClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await client.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const { data } = client.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

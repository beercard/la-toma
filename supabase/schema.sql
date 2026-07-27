-- =====================================================================
-- La Toma Multiespacio — esquema de autogestión (Supabase / PostgreSQL)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query → Run
-- =====================================================================

-- ---------- Extensiones ----------
create extension if not exists "pgcrypto";

-- ---------- Utilidad: updated_at automático ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================================
-- CARTA: categorías + ítems
-- =====================================================================
create table if not exists public.menu_categories (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  sort_order   int  not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.menu_items (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid not null references public.menu_categories(id) on delete cascade,
  name         text not null,
  description  text,
  price        text,                 -- texto libre: "$2.500"
  sort_order   int  not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists menu_items_category_idx on public.menu_items(category_id);

-- =====================================================================
-- EVENTOS
-- =====================================================================
create table if not exists public.events (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text unique not null,
  title                text not null,             -- "Vinilos & Río"
  date_label           text,                      -- "11|07" (display)
  starts_at            timestamptz,               -- fecha real (para schema.org)
  description          text not null,
  expanded_description text,
  image_url            text,
  sort_order           int  not null default 0,
  is_published         boolean not null default true,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- =====================================================================
-- GALERÍA
-- =====================================================================
create table if not exists public.gallery_images (
  id           uuid primary key default gen_random_uuid(),
  image_url    text not null,
  alt          text not null default '',
  tag          text,                      -- "APERTURA 11.07"
  sort_order   int  not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now()
);

-- =====================================================================
-- CONFIGURACIÓN DEL SITIO
-- =====================================================================
create table if not exists public.site_settings (
  setting_key   text primary key,
  value_boolean boolean not null default false,
  updated_at    timestamptz not null default now()
);

-- ---------- Triggers updated_at ----------
drop trigger if exists trg_menu_categories_updated on public.menu_categories;
create trigger trg_menu_categories_updated before update on public.menu_categories
  for each row execute function public.set_updated_at();
drop trigger if exists trg_menu_items_updated on public.menu_items;
create trigger trg_menu_items_updated before update on public.menu_items
  for each row execute function public.set_updated_at();
drop trigger if exists trg_events_updated on public.events;
create trigger trg_events_updated before update on public.events
  for each row execute function public.set_updated_at();
drop trigger if exists trg_site_settings_updated on public.site_settings;
create trigger trg_site_settings_updated before update on public.site_settings
  for each row execute function public.set_updated_at();

-- =====================================================================
-- ROW LEVEL SECURITY
-- Lectura pública sólo de filas publicadas; escritura sólo autenticados.
-- =====================================================================
alter table public.menu_categories enable row level security;
alter table public.menu_items      enable row level security;
alter table public.events          enable row level security;
alter table public.gallery_images  enable row level security;
alter table public.site_settings   enable row level security;

-- Lectura pública (anon) de lo publicado
drop policy if exists "public read published categories" on public.menu_categories;
create policy "public read published categories" on public.menu_categories
  for select using (is_published = true);
drop policy if exists "public read published items" on public.menu_items;
create policy "public read published items" on public.menu_items
  for select using (is_published = true);
drop policy if exists "public read published events" on public.events;
create policy "public read published events" on public.events
  for select using (is_published = true);
drop policy if exists "public read published gallery" on public.gallery_images;
create policy "public read published gallery" on public.gallery_images
  for select using (is_published = true);
drop policy if exists "public read site settings" on public.site_settings;
create policy "public read site settings" on public.site_settings
  for select using (true);

-- Acceso total para usuarios autenticados (admin)
drop policy if exists "auth full categories" on public.menu_categories;
create policy "auth full categories" on public.menu_categories
  for all to authenticated using (true) with check (true);
drop policy if exists "auth full items" on public.menu_items;
create policy "auth full items" on public.menu_items
  for all to authenticated using (true) with check (true);
drop policy if exists "auth full events" on public.events;
create policy "auth full events" on public.events
  for all to authenticated using (true) with check (true);
drop policy if exists "auth full gallery" on public.gallery_images;
create policy "auth full gallery" on public.gallery_images
  for all to authenticated using (true) with check (true);
drop policy if exists "auth full site settings" on public.site_settings;
create policy "auth full site settings" on public.site_settings
  for all to authenticated using (true) with check (true);

-- =====================================================================
-- STORAGE: bucket público "media" (lectura pública, escritura autenticada)
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');
drop policy if exists "auth upload media" on storage.objects;
create policy "auth upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');
drop policy if exists "auth update media" on storage.objects;
create policy "auth update media" on storage.objects
  for update to authenticated using (bucket_id = 'media');
drop policy if exists "auth delete media" on storage.objects;
create policy "auth delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media');

-- =====================================================================
-- SEED — contenido actual del sitio (idempotente por título/slug)
-- =====================================================================
insert into public.menu_categories (title, sort_order) values
  ('Café de especialidad', 1),
  ('Para acompañar', 2),
  ('Meriendas frente al río', 3),
  ('Coctelería al atardecer', 4)
on conflict do nothing;

insert into public.events (slug, title, date_label, starts_at, description, expanded_description, sort_order) values
  ('vinilos-rio', 'Vinilos & Río', '11|07', '2026-07-11T19:00:00-03:00',
   'La transición perfecta de la tarde a la noche. Abrimos el fin de semana en la terraza de nuestro multiespacio con un DJ set 100% en vinilo, deep house y el atardecer cayendo sobre el río.',
   'La transición perfecta de la tarde a la noche.\n\nAbrimos el fin de semana en la terraza de nuestro multiespacio con un DJ set 100% en vinilo, curado para acompañar la caída del sol sobre la Punta San Sebastián.\n\nMientras el ritmo del deep house marca el pulso, nuestra barra exterior despliega una carta de coctelería de autor y platillos de estación.', 1),
  ('taller-filtrados', 'Taller de Filtrados', '11|07', '2026-07-11T17:00:00-03:00',
   'Una experiencia pensada para descubrir nuevos métodos y sabores. Compartimos una jornada de filtrados, conversación y degustación en un encuentro relajado frente al río.', null, 2),
  ('after-office', 'After Office', '11|07', '2026-07-11T20:00:00-03:00',
   'El cierre ideal para la jornada. Música, coctelería y gastronomía en un formato descontracturado para encontrarse después de la oficina con colegas y amigos.', null, 3),
  ('ceramica-de-autor', 'Cerámica de Autor', '11|07', '2026-07-11T18:00:00-03:00',
   'Un encuentro entre diseño, oficio y sobremesa. Presentamos piezas de cerámica de autor en una noche donde la estética, el detalle y la experiencia van de la mano.', null, 4)
on conflict (slug) do nothing;

insert into public.site_settings (setting_key, value_boolean)
values ('gallery_coming_soon_enabled', true)
on conflict (setting_key) do nothing;

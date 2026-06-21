# Autogestión — Galería, Eventos y Carta (Supabase)

El sitio incluye un panel en **`/admin`** para que el dueño cargue y edite la
galería, los eventos y la carta, sin tocar código. Los cambios se ven **al
instante** en el sitio público (se leen en vivo desde Supabase).

Mientras Supabase no esté configurado, el sitio funciona igual mostrando el
**contenido de respaldo** (el que ya tenía), y `/admin` avisa que falta conectar.

---

## 1. Crear el proyecto en Supabase

1. Entrá a <https://supabase.com> → **New project** (plan gratuito alcanza).
2. Anotá la contraseña de la base.
3. Cuando termine de provisionar, andá a **Settings → API** y copiá:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

## 2. Crear las tablas

En el panel de Supabase: **SQL Editor → New query**, pegá el contenido de
[`supabase/schema.sql`](../supabase/schema.sql) y dale **Run**.
Esto crea las tablas (`menu_categories`, `menu_items`, `events`,
`gallery_images`), las políticas de seguridad (RLS), el bucket de imágenes
`media` y carga contenido inicial.

## 3. Crear el usuario administrador

**Authentication → Users → Add user** → email + contraseña.
Ese será el login del panel `/admin`. (No hay registro público: sólo los
usuarios que crees pueden entrar.)

## 4. Configurar las variables de entorno

Creá un archivo `.env` en la raíz (basado en `.env.example`):

```
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
```

> En DonWeb las variables se compilan en el build (Vite), así que después de
> cambiarlas hay que **reconstruir** (`npm run build`) y volver a subir `dist/`.

## 5. Build y deploy en DonWeb

```
npm install
npm run build
```

Subí **todo el contenido de `dist/`** a la raíz del hosting (`public_html`).
El archivo `.htaccess` ya viene incluido en el build y se encarga de:

- el ruteo de la SPA (React Router),
- servir el HTML por ruta (SEO para WhatsApp/Facebook/Google),
- forzar HTTPS, compresión y cache de assets.

## 6. Usar el panel

Entrá a `https://latoma.com.ar/admin`, iniciá sesión y gestioná:

- **Carta** — categorías e ítems (nombre, descripción, precio).
- **Eventos** — alta/edición/baja, fecha visible y fecha real, descripción y
  descripción ampliada, orden y visibilidad.
- **Galería** — subí imágenes (se guardan en Supabase Storage), editá su texto
  alternativo y etiqueta, ordená y ocultá/mostrá.

---

### Notas

- El contenido dinámico se lee en vivo: **no** queda dentro del HTML
  prerenderizado, por lo que los ítems individuales (cada evento/foto) no se
  indexan por separado. El SEO **a nivel de página** (título, descripción, Open
  Graph, datos estructurados) sí está cubierto.
- Si más adelante se quiere indexar cada evento, se puede agregar regeneración
  del HTML estático en el deploy.

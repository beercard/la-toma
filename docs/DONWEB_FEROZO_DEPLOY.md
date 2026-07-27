# Deploy en DonWeb / Ferozo

Este proyecto ya está preparado para hosting estático en **DonWeb (Ferozo)** con el dominio:

- `https://latoma.com.ar/`

## Qué subir al hosting

No se sube el proyecto completo. Se sube solo el sitio compilado:

- contenido de `dist/`
- o, mejor todavía, el contenido de `deploy/donweb-public_html/`

## Archivo clave

El build ya incluye:

- `.htaccess`

Ese archivo resuelve:

- `HTTPS` forzado
- fallback de SPA para React Router
- HTML estático por ruta para SEO (`/reservas`, `/eventos`, etc.)
- cache de assets
- compresión

## Flujo recomendado

1. Ejecutar:

```bash
npm run prepare:donweb
```

2. Eso deja lista esta carpeta:

```text
deploy/donweb-public_html
```

3. Subir **todo su contenido** a:

```text
public_html
```

en el panel Ferozo.

## Si vas a usar ZIP en Ferozo

1. Comprimir el contenido de `deploy/donweb-public_html`
2. Subir el `.zip`
3. Extraerlo dentro de `public_html`

## Importante sobre variables

Este sitio usa variables de entorno de Vite para:

- Supabase
- EmailJS

En DonWeb/Ferozo esas variables **no se configuran en runtime** como en Vercel. Quedan incorporadas al momento del build.

Por eso, el build debe hacerse localmente con el `.env` correcto antes de subir.

## Qué no subir

No hace falta subir:

- `src/`
- `node_modules/`
- `.git/`
- `scripts/`
- archivos de desarrollo

## Verificación rápida después del deploy

Comprobar en el dominio:

- `/`
- `/menu`
- `/reservas`
- `/galeria`
- `/eventos`
- `/contacto`
- `/admin`

Si esas rutas cargan directo sin 404, el `.htaccess` quedó bien activo.

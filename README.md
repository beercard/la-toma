# La Toma Bar - Web Project

`la-toma` - Sitio Web La Toma

Este proyecto ha sido desarrollado siguiendo las mejores prácticas de UI/UX y SEO, implementando un diseño "pixel perfect" con temática oscura y elegante ideal para un bar.

## 🚀 Tecnologías Utilizadas
- **React + Vite**: Para una carga ultra rápida y un entorno de desarrollo eficiente.
- **Tailwind CSS**: Estilos modulares, diseño *responsive* (Desktop-first a Mobile), y personalización avanzada.
- **React Router**: Para navegación "Single Page Application" que emula una experiencia Multi-page fluida.
- **Lucide React**: Iconografía moderna y ligera.

## 📸 Optimización de Imágenes (WebP)
Para garantizar una excelente puntuación en SEO y un rendimiento óptimo de carga:
Se ha configurado `vite-plugin-image-optimizer`. 
- Cualquier imagen (`.jpg`, `.png`) que agregues localmente en `src/assets` o en la carpeta `public` será **automáticamente comprimida y optimizada** durante el proceso de *build*.
- Las imágenes de demostración actuales se sirven a través de URLs externas, pero cuando incorpores las fotos reales del bar (de Figma o producción), asegúrate de que sean de alta calidad; el sistema se encargará de optimizarlas o puedes subirlas directamente en formato `.webp` para máxima eficiencia.

## 💻 Comandos de Desarrollo

Instalar dependencias:
```bash
npm install
```

Iniciar servidor local:
```bash
npm run dev
```

Construir para producción (aquí se optimizarán las imágenes):
```bash
npm run build
```

## 🐙 Control de Versiones (Git)

El repositorio local ya está inicializado y se ha hecho el primer *commit* (arquitectura, componentes, diseño base). 
También se ha configurado el control remoto a: `git@github.com:beercard/la-toma.git`.

Para subir los cambios a tu repositorio remoto, simplemente ejecuta:
```bash
git push -u origin main
```
*(Nota: Asegúrate de tener tus claves SSH configuradas en tu cuenta de GitHub para que el comando funcione correctamente).*

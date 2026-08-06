import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import {
  routeSeoMap,
  buildStructuredData,
  SEO_SITE_URL,
} from './src/lib/seo'

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const replaceMetaContent = (html: string, attr: 'name' | 'property', key: string, content: string) => {
  const re = new RegExp(`(<meta\\b[^>]*\\b${attr}="${key}"[^>]*\\bcontent=")[^"]*(")`)
  return html.replace(re, `$1${escapeAttr(content)}$2`)
}

const staticRouteSeoPlugin = (): Plugin => {
  let config: ResolvedConfig
  return {
    name: 'static-route-seo',
    apply: 'build',
    configResolved(resolved) {
      config = resolved
    },
    closeBundle() {
      const distDir = resolve(config.root, config.build.outDir)
      const baseHtmlPath = resolve(distDir, 'index.html')
      let baseHtml: string
      try {
        baseHtml = readFileSync(baseHtmlPath, 'utf-8')
      } catch {
        return
      }

      for (const page of Object.values(routeSeoMap)) {
        const canonicalUrl = new URL(page.path, SEO_SITE_URL).toString()
        const jsonLd = JSON.stringify(buildStructuredData(SEO_SITE_URL, page)).replace(/</g, '\\u003c')

        let html = baseHtml
        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(page.title)}</title>`)
        html = replaceMetaContent(html, 'name', 'description', page.description)
        html = replaceMetaContent(html, 'name', 'keywords', page.keywords.join(', '))
        html = replaceMetaContent(html, 'property', 'og:title', page.title)
        html = replaceMetaContent(html, 'property', 'og:description', page.description)
        html = replaceMetaContent(html, 'property', 'og:url', canonicalUrl)
        html = replaceMetaContent(html, 'name', 'twitter:title', page.title)
        html = replaceMetaContent(html, 'name', 'twitter:description', page.description)
        html = html.replace(/(<link\b[^>]*\brel="canonical"[^>]*\bhref=")[^"]*(")/, `$1${canonicalUrl}$2`)
        html = html.replace(
          /<\/head>/,
          `  <script type="application/ld+json" id="route-structured-data">${jsonLd}</script>\n  </head>`,
        )

        const outPath =
          page.path === '/'
            ? baseHtmlPath
            : resolve(distDir, `${page.path.replace(/^\//, '')}/index.html`)
        mkdirSync(dirname(outPath), { recursive: true })
        writeFileSync(outPath, html)
      }
    },
  }
}

export default defineConfig({
  base: '/latoma/',
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    sourcemap: false,
  },
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
    tsconfigPaths(),
    staticRouteSeoPlugin(),
  ],
})

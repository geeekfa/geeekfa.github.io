import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

// Salman drops BTS Notes screenshots straight into public/images/bts-notes/ named 1.png,
// 2.png, 3.png... This scans that folder and writes the list the gallery reads, so no code
// change is needed per screenshot. Runs on every dev-server start and before each build/generate.
function generateBtsNotesGalleryManifest() {
  const dir = path.join(rootDir, 'public/images/bts-notes')
  const outDir = path.join(rootDir, 'app/data/.generated')
  const outFile = path.join(outDir, 'bts-notes-gallery.json')

  let files: string[] = []
  try {
    files = fs.readdirSync(dir)
  } catch {
    // folder doesn't exist yet — ship an empty gallery
  }

  const images = files
    .filter((f) => /^\d+\.(png|jpe?g|webp)$/i.test(f))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(images, null, 2) + '\n')
}

generateBtsNotesGalleryManifest()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: false,
  app: {
    baseURL: '/',
    head: {
      title: 'Salman Majidi',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap'
        }
      ]
    }
  },

  css: [
    '@quasar/extras/material-icons/material-icons.css',
    'quasar/src/css/index.sass',
    '~/assets/css/theme.scss'
  ],

  build: {
    transpile: ['quasar']
  },

  vite: {
    vue: {
      template: { transformAssetUrls }
    },
    plugins: [
      quasar({
        sassVariables: false
      })
    ]
  }
})

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

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

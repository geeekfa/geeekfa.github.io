import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: false,
  app: {
    baseURL: '/'
  },

  css: ['quasar/src/css/index.sass'],

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

// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/nuxt3_google_sheet/' : '/',
    buildAssetsDir: '/static/'
  },
  runtimeConfig: {
    public: {
      NUXT_API_KEY: process.env.NUXT_API_KEY,
      NUXT_SHEET_ID: process.env.NUXT_SHEET_ID,
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxt/image',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  image: {
    dir: 'assets/images'
  }
})

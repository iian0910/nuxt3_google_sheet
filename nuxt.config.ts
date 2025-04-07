// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      NUXT_API_KEY: process.env.NUXT_API_KEY,
      NUXT_SHEET_ID: process.env.NUXT_SHEET_ID,
    }
  },
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      // 指定您想要的字體
      Roboto: true,
      "Roboto Mono": true
    },
  },
})

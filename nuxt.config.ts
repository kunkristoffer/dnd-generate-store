export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-vuefire',
    '@pinia/nuxt',
  ],
  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: process.env.NUXT_PUBLIC_VUEFIRE_CONFIG_API_KEY,
      authDomain: process.env.NUXT_PUBLIC_VUEFIRE_CONFIG_AUTH_DOMAIN,
      projectId: process.env.NUXT_PUBLIC_VUEFIRE_CONFIG_PROJECT_ID,
      appId: process.env.NUXT_PUBLIC_VUEFIRE_CONFIG_APP_ID,
    },
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  }
})
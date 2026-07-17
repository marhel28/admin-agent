// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_API_BASE || process.env.NUXT_PUBLIC_API_BASE || 'https://cctv-api.desa-sidomukti.com'
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/color-mode'
  ],

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  fonts: {
    families: [
      { name: 'Fira Sans', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Fira Code', weights: [400, 500, 600, 700] }
    ]
  }
})

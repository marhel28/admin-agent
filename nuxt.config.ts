// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'UMKM ADMIN DASHBORD',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Sistem Manajemen Admin untuk UMKM' },
        { property: 'og:title', content: 'UMKM ADMIN DASHBORD' },
        { property: 'og:description', content: 'Sistem Manajemen Admin untuk UMKM' },
        { property: 'og:image', content: '/logo.png' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'UMKM ADMIN DASHBORD' },
        { name: 'twitter:description', content: 'Sistem Manajemen Admin untuk UMKM' },
        { name: 'twitter:image', content: '/logo.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ]
    }
  },

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

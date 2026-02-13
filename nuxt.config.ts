// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    baseURL: "/web/",
  },

  runtimeConfig: {
    public: {
      gtagId: "G-QX439KY437",
      baseUrl: "https://sinjaikab.go.id/web",
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image"
  ],

  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp'],
  },

  compatibilityDate: "2025-02-25",
});

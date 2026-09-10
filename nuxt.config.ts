// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/",
  },

  runtimeConfig: {
    public: {
      gtagId: "G-QX439KY437",
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "https://sinjaikab.go.id",
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@vercel/analytics"],

  experimental: {
    appManifest: false,
  },

  compatibilityDate: "2025-02-25",
});

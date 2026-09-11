// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/",
  },

  runtimeConfig: {
    public: {
      gtagId: "G-QX439KY437",
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "https://sinjaikab.go.id",
      userwayAccount: process.env.NUXT_PUBLIC_USERWAY_ACCOUNT || "S41ThPrHz4",
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@vercel/analytics"],

  routeRules: {
    "/": { prerender: true },
  },

  features: {
    inlineStyles: true,
  },

  experimental: {
    appManifest: false,
    payloadExtraction: false,
  },

  compatibilityDate: "2025-02-25",
});

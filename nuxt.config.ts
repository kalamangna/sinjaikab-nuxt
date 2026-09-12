// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/",
    head: {
      script: [
        {
          src: "https://cdn.userway.org/widget.js",
          "data-account": "S41ThPrHz4",
          async: true,
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      gtagId: "G-QX439KY437",
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "https://sinjaikab.go.id",
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

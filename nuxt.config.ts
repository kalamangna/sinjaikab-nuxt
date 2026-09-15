// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/",
    head: {
      script: [
        {
          src: "https://cdn.jsdelivr.net/gh/kalamangna/a11y-sinjaikab@main/dist/widget.min.js",
          "data-position": "bottom-left",
          "data-lang": "id",
          "data-color": "#0056b3",
          defer: true,
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

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/",
    head: {
      script: [
        {
          src: "https://cdn.userway.org/widget.js",
          "data-account": "S41ThPrHz4", // Replace with your actual UserWay Account ID
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

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],

  image: {
    provider: "ipx",
    quality: 80,
    format: ["webp"],
  },

  compatibilityDate: "2025-02-25",
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      gtagId: "G-QX439KY437",
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "nuxt-swiper"],

  tailwindcss: {
    exposeConfig: true,
  },

  compatibilityDate: "2025-02-25",
});

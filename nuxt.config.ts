// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    baseURL: process.env.NODE_ENV === "development" ? "/" : "/nuxt",
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  tailwindcss: {
    exposeConfig: true,
  },
});

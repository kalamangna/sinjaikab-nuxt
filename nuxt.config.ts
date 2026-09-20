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
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseKey: process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    a11yAdminSecret: process.env.A11Y_ADMIN_SECRET || "sinjaikab-a11y-2026",
    public: {
      gtagId: "G-QX439KY437",
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "https://sinjaikab.go.id",
    },
  },

  css: ["@fortawesome/fontawesome-free/css/all.min.css"],
  modules: ["@nuxtjs/tailwindcss", "@vercel/analytics"],

  routeRules: {
    "/": { prerender: true },
    "/sitemap.xml": { swr: 3600 },
    "/informasi": { swr: 600 },
    "/informasi/**": { swr: 3600 },
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

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
    supabaseUrl: process.env.SUPABASE_URL || "https://rsnxumcwrpwczatxujyr.supabase.co",
    supabaseKey: process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzbnh1bWN3cnB3Y3phdHh1anlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0Mjk3NzAsImV4cCI6MjEwNTAwNTc3MH0.frTQwcDaxf3QsQWxn5lsotKsrdx15yZYkb5T4udTdkE",
    a11yAdminSecret: process.env.A11Y_ADMIN_SECRET || "sinjaikab-a11y-2026",
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

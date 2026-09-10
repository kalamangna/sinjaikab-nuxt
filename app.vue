<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();

if (route.path !== "/") {
  throw createError({
    statusCode: 404,
    statusMessage: "Halaman Tidak Ditemukan",
    fatal: true,
  });
}

const title = "Pemerintah Kabupaten Sinjai";
const description = "Website Resmi Pemerintah Kabupaten Sinjai.";
const baseUrl = config.public.baseUrl;
const imageUrl = `${baseUrl}/meta.png`;

useHead({
  title,
  meta: [
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "pemerintah kabupaten sinjai, pemkab sinjai, sinjaikab, bupati sinjai, diskominfo sinjai, portal sinjai, sinjai bersatu, layanan publik sinjai, sulawesi selatan",
    },
    { name: "author", content: "Diskominfo-SP Kabupaten Sinjai" },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { name: "theme-color", content: "#b91c1c" },
    // Local SEO & Geotagging
    { name: "geo.region", content: "ID-SN" },
    { name: "geo.placename", content: "Kabupaten Sinjai" },
    { name: "geo.position", content: "-5.11854;120.2129" },
    { name: "ICBM", content: "-5.11854, 120.2129" },
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "id_ID" },
    { property: "og:site_name", content: "Pemerintah Kabupaten Sinjai" },
    { property: "og:url", content: baseUrl },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1640" },
    { property: "og:image:height", content: "924" },
    { property: "og:image:alt", content: "Portal Resmi Pemerintah Kabupaten Sinjai" },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@sinjaikab" },
    { name: "twitter:creator", content: "@sinjaikab" },
    { name: "twitter:url", content: baseUrl },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: "Portal Resmi Pemerintah Kabupaten Sinjai" },
    // Viewport & Mobile
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
  link: [
    { rel: "icon", type: "image/png", href: `${config.app.baseURL}sinjai.png` },
    { rel: "canonical", href: baseUrl },
    {
      rel: "preload",
      as: "image",
      href: `${config.app.baseURL}poster-mobile.webp`,
      imageSrcset: `${config.app.baseURL}poster-mobile.webp 756w, ${config.app.baseURL}poster.webp 1200w`,
      imageSizes: "(max-width: 1023px) 100vw, 600px",
      type: "image/webp",
      fetchpriority: "high",
    },
    { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${baseUrl}#website`,
            url: baseUrl,
            name: "Pemerintah Kabupaten Sinjai",
            alternateName: "Portal Resmi Pemkab Sinjai",
            description: description,
            inLanguage: "id-ID",
            publisher: {
              "@id": `${baseUrl}#organization`,
            },
          },
          {
            "@type": "GovernmentOrganization",
            "@id": `${baseUrl}#organization`,
            name: "Pemerintah Kabupaten Sinjai",
            alternateName: [
              "Pemkab Sinjai",
              "Pemerintah Daerah Kabupaten Sinjai",
              "Sinjaikab",
            ],
            url: baseUrl,
            logo: `${baseUrl}/sinjai.png`,
            image: imageUrl,
            description: description,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Tanassang, Alehanuae, Sinjai Utara",
              addressLocality: "Kabupaten Sinjai",
              addressRegion: "Sulawesi Selatan",
              postalCode: "92615",
              addressCountry: "ID",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -5.11854,
              longitude: 120.2129,
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Support",
              email: "info@sinjaikab.go.id",
              availableLanguage: ["id"],
            },
            sameAs: [
              "https://www.facebook.com/FP.KabupatenSinjai",
              "https://www.instagram.com/sinjaikab",
              "https://www.tiktok.com/@pemkabsinjai",
              "https://www.youtube.com/@SINJAITV",
              "https://x.com/sinjaikab",
            ],
          },
          {
            "@type": "AdministrativeArea",
            "@id": `${baseUrl}#area`,
            name: "Kabupaten Sinjai",
            description: "Daerah Tingkat II di Provinsi Sulawesi Selatan, Indonesia",
            geo: {
              "@type": "GeoCoordinates",
              latitude: -5.11854,
              longitude: 120.2129,
            },
          },
        ],
      }),
    },
  ],
  htmlAttrs: {
    lang: "id",
  },
});

const services = [
  {
    name: "pemkab",
    label: "Berita",
    href: "https://humas.sinjaikab.go.id/",
    voice: "Portal Berita",
    icon: "fa-solid fa-newspaper",
  },
  {
    name: "ppid",
    label: "PPID",
    href: "https://ppidkab.sinjaikab.go.id/",
    voice: "Informasi Publik",
    icon: "fa-solid fa-circle-info",
  },
  {
    name: "sdi",
    label: "Satu Data",
    href: "https://satudata.sinjaikab.go.id/",
    voice: "Satu Data",
    icon: "fa-solid fa-database",
  },
  {
    name: "jdih",
    label: "JDIH",
    href: "https://jdih.sinjaikab.go.id/",
    voice: "Dokumentasi Hukum",
    icon: "fa-solid fa-gavel",
  },
  {
    name: "lpse",
    label: "LPSE",
    href: "https://spse.inaproc.id/sinjaikab/",
    voice: "Layanan Pengadaan",
    icon: "fa-solid fa-cart-shopping",
  },
  {
    name: "spbe",
    label: "SPBE",
    href: "https://spbe.sinjaikab.go.id/",
    voice: "Sistem Elektronik",
    icon: "fa-solid fa-laptop-code",
  },
  {
    name: "dprd",
    label: "DPRD",
    href: "https://dprd.sinjaikab.go.id/web/",
    voice: "Dewan Perwakilan",
    icon: "fa-solid fa-building-columns",
  },
  {
    name: "asn",
    label: "Portal ASN",
    href: "https://apps.sinjaikab.go.id/gateway/public/login",
    voice: "Layanan Kepegawaian",
    icon: "fa-solid fa-id-card-clip",
  },
];
</script>

<template>
  <NuxtLayout>
    <SectionsHero />
    <LazySectionsVisionMission />
    <LazySectionsPriorityPrograms />
    <LazySectionsServices :services="services" />
    <AppPlugins />
  </NuxtLayout>
</template>

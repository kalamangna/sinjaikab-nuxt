<script lang="ts" setup>
const config = useRuntimeConfig();

const title = "Pemerintah Kabupaten Sinjai";
const description =
  "Portal resmi Pemerintah Kabupaten Sinjai. Menyajikan informasi publik, transparansi tata kelola, program prioritas daerah, dan akses layanan digital terpadu.";
const baseUrl = config.public.baseUrl;
const imageUrl = `${baseUrl}/meta.png`;

useHead({
  title,
  meta: [
    { name: "description", content: description },
    { name: "author", content: "Diskominfo-SP Kabupaten Sinjai" },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { name: "theme-color", content: "#b91c1c" },
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "id_ID" },
    { property: "og:site_name", content: "Pemerintah Kabupaten Sinjai" },
    { property: "og:url", content: baseUrl },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: "Portal Resmi Pemerintah Kabupaten Sinjai" },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
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
    { rel: "preconnect", href: "https://cdn.userway.org" },
    { rel: "dns-prefetch", href: "https://cdn.userway.org" },
    { rel: "preconnect", href: "https://www.googletagmanager.com" },
    { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "GovernmentOrganization",
        name: "Pemerintah Kabupaten Sinjai",
        alternateName: "Pemkab Sinjai",
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
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "info@sinjaikab.go.id",
        },
        sameAs: [
          "https://www.facebook.com/FP.KabupatenSinjai",
          "https://www.instagram.com/sinjaikab",
          "https://www.tiktok.com/@pemkabsinjai",
          "https://www.youtube.com/@SINJAITV",
          "https://x.com/sinjaikab",
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
    href: "https://sinjaikab.go.id/spbe/",
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
    <SectionsVisionMission />
    <SectionsPriorityPrograms />
    <SectionsServices :services="services" />
    <AppPlugins />
  </NuxtLayout>
</template>

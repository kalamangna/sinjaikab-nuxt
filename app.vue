<script lang="ts" setup>
const config = useRuntimeConfig();

const title = "Pemerintah Kabupaten Sinjai";
const description = "Website Resmi Pemerintah Kabupaten Sinjai.";
const baseUrl = config.public.baseUrl;
const imageUrl = `${baseUrl}/meta.png`;

useHead({
  title,
  meta: [
    { name: "description", content: description },
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:url", content: baseUrl },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: baseUrl },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    // Viewport & Mobile
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
  link: [
    { rel: "icon", type: "image/png", href: `${config.app.baseURL}sinjai.png` },
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
    href: "http://apps.sinjaikab.go.id/gateway/public/login",
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

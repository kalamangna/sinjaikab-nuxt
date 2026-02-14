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
      content: "width=device-width, initial-scale=1, maximum-scale=1",
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
    name: "simpelmi",
    label: "Perizinan",
    href: "http://dpmptsp.sinjaikab.go.id/",
    voice: "Perizinan Online",
    icon: "fa-solid fa-file-signature",
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
    href: "https://satudata.sinjaikab.go.id/sistik/",
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
    href: "http://lpse.sinjaikab.go.id/",
    voice: "Layanan Pengadaan",
    icon: "fa-solid fa-cart-shopping",
  },
  {
    name: "dprd",
    label: "DPRD",
    href: "http://dprd.sinjaikab.go.id/",
    voice: "Dewan Perwakilan",
    icon: "fa-solid fa-building-columns",
  },
  {
    name: "rdtr",
    label: "Peta RDTR",
    href: "https://dpupr.sinjaikab.go.id/peta-rdtr/",
    voice: "Peta Tata Ruang",
    icon: "fa-solid fa-map",
  },
  {
    name: "webgis",
    label: "WebGIS",
    href: "http://webgis.sinjaikab.go.id/",
    voice: "Sistem Geografis",
    icon: "fa-solid fa-map-location-dot",
  },
  {
    name: "simpeg",
    label: "SIMPEG",
    href: "http://apps.sinjaikab.go.id/simpeg/user/login/",
    voice: "Kepegawaian",
    icon: "fa-solid fa-users",
  },
  {
    name: "enikda",
    label: "ENIKDA",
    href: "http://enikda.sinjaikab.go.id/",
    voice: "Kinerja Aparatur",
    icon: "fa-solid fa-chart-line",
  },
  {
    name: "e-office",
    label: "E-Office",
    href: "http://apps.sinjaikab.go.id/office/",
    voice: "Sistem E-Office",
    icon: "fa-solid fa-briefcase",
  },
  {
    name: "email",
    label: "Email",
    href: "https://sinjaikab.go.id/webmail",
    voice: "Webmail",
    icon: "fa-solid fa-envelope",
  },
  {
    name: "sirup",
    label: "SiRUP",
    href: "https://sirup.lkpp.go.id/",
    voice: "Rencana Pengadaan",
    icon: "fa-solid fa-list-check",
  },
  {
    name: "spbe",
    label: "SPBE",
    href: "https://sinjaikab.go.id/spbe/",
    voice: "Sistem Elektronik",
    icon: "fa-solid fa-laptop-code",
  },
  {
    name: "kotaku",
    label: "KOTAKU",
    href: "http://kotaku.pu.go.id/",
    voice: "Kota Tanpa Kumuh",
    icon: "fa-solid fa-city",
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

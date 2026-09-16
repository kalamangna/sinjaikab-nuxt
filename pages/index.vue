<script lang="ts" setup>
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
  <div>
    <SectionsHero />
    <LazySectionsVisionMission />
    <LazySectionsPriorityPrograms />
    <LazySectionsServices :services="services" />
    <AppPlugins />
  </div>
</template>

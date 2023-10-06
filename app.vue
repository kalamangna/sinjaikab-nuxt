<script setup lang="ts">
const title = "Pemerintah Kabupaten Sinjai";
const description =
  "Website Resmi Pemerintah Kabupaten Sinjai. Berkolaboratif, Integritas, Solutif, Adaptif. #SinjaiBisa";
const url = "https://sinjaikab.go.id";
const imageUrl = `${url}/sinjaikab-meta.png`;

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: imageUrl,
  twitterCard: "summary_large_image",
});

const menusLeft = [
  {
    name: "pemkab",
    href: "https://sinjaikab.go.id/v4",
  },
  {
    name: "lpse",
    href: "http://lpse.sinjaikab.go.id/eproc4",
  },
  {
    name: "dprd",
    href: "http://dprd.sinjaikab.go.id",
  },
  {
    name: "sistik",
    href: "http://apps.sinjaikab.go.id/sistik",
  },
  {
    name: "kotaku",
    href: "http://kotaku.pu.go.id",
  },
  {
    name: "rdtr",
    href: "https://rdtrsinjai.com",
  },
  {
    name: "simpelmi",
    href: "http://dpmptsp.sinjaikab.go.id",
  },
  {
    name: "asa",
    href: "https://asa.sinjaikab.go.id",
  },
];

const menusRight = [
  {
    name: "enikda",
    href: "http://enikda.sinjaikab.go.id/v3",
  },
  {
    name: "webgis",
    href: "http://webgis.sinjaikab.go.id",
  },
  {
    name: "sirup",
    href: "https://sirup.lkpp.go.id/sirup/ro/rekap/klpd/D401",
  },
  {
    name: "simpeg",
    href: "http://apps.sinjaikab.go.id/simpeg/user/login",
  },
  {
    name: "email",
    href: "https://sinjaikab.go.id/webmail",
  },
  {
    name: "ppid",
    href: "http://ppidkab.sinjaikab.go.id",
  },
  {
    name: "jdih",
    href: "http://jdih.sinjaikab.go.id",
  },
  {
    name: "e-office",
    href: "http://apps.sinjaikab.go.id/office",
  },
];
</script>

<template>
  <div>
    <main class="min-h-screen flex flex-col items-center justify-center">
      <div class="container p-4 mx-auto">
        <div class="flex flex-col justify-center items-center text-center py-4">
          <NuxtImg
            src="/sinjai.png"
            alt="logo kabupaten sinjai"
            class="h-12 w-12 mb-2"
          />

          <h1 class="text-4xl md:text-6xl font-bold">Selamat Datang</h1>
          <p class="md:text-lg">Website Resmi Pemerintah Kabupaten Sinjai</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          <div class="col-span-2 flex justify-center items-center md:order-2">
            <NuxtImg
              src="/pj.png"
              alt="penjabat bupati sinjai"
              sizes="100vw sm:50vw md:400px"
            />
          </div>

          <div class="grid grid-cols-2 gap-4 md:order-1">
            <div v-for="menu in menusLeft" :key="menu.name">
              <Grid :name="menu.name" :href="menu.href" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 md:order-3">
            <div v-for="menu in menusRight" :key="menu.name">
              <Grid :name="menu.name" :href="menu.href" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  </div>
</template>

<style>
main {
  background-image: url("/bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<script setup lang="ts">
const title = "Pemerintah Kabupaten Sinjai";
const description = "Website Resmi Pemerintah Kabupaten Sinjai";
// const url = "https://sinjaikab.go.id/nuxt";
// const image = `${url}/sinjaikab-meta.png`;

useHead({
  title: title,
  meta: [{ name: "description", content: description }],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});

const menusLeft = [
  {
    name: "pemkab",
    href: "https://www.sinjaikab.go.id/v4",
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
    <!-- <Header /> -->

    <main class="min-h-screen flex flex-col items-center justify-center">
      <div
        class="container px-4 py-8 mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div
          class="col-span-2 md:col-span-4 md:order-1 flex flex-col justify-center items-center text-center"
        >
          <NuxtImg
            src="/sinjai.png"
            alt="logo kabupaten sinjai"
            class="h-20 w-20 mb-4"
          />

          <h1 class="text-4xl md:text-6xl font-bold">Selamat Datang</h1>
          <p class="md:text-lg">Website Resmi Pemerintah Kabupaten Sinjai</p>
        </div>

        <div
          class="col-span-2 md:order-2 flex justify-center items-end md:items-center"
        >
          <NuxtImg
            src="/pj.png"
            alt="penjabat bupati sinjai"
            class="w-full h-full lg:w-96 lg:h-96"
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
    </main>

    <!-- <Footer /> -->
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

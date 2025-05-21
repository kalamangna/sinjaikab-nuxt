<script lang="ts" setup>
const title = "Pemerintah Kabupaten Sinjai";
const description =
  "Selamat Datang di Website Resmi Pemerintah Kabupaten Sinjai #samasamaki";
const url = "https://sinjaikab.go.id";
const imageUrl = `${url}/meta.png`;

useHead({
  title: title,
  meta: [
    {
      name: "title",
      content: title,
    },
    { name: "description", content: description },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: url,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:image",
      content: imageUrl,
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:url",
      content: url,
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: description,
    },
    {
      property: "twitter:image",
      content: imageUrl,
    },
  ],
  htmlAttrs: { lang: "id" },
  script: [
    {
      src: "https://cdn.userway.org/widget.js",
      "data-account": "S41ThPrHz4",
      async: true,
    },
  ],
});

const menusLeft = [
  {
    name: "pemkab",
    href: "https://sinjaikab.go.id/v4/",
  },
  {
    name: "lpse",
    href: "http://lpse.sinjaikab.go.id/",
  },
  {
    name: "dprd",
    href: "http://dprd.sinjaikab.go.id/",
  },
  {
    name: "sdi",
    href: "https://satudata.sinjaikab.go.id/sistik/",
  },
  {
    name: "kotaku",
    href: "http://kotaku.pu.go.id/",
  },
  {
    name: "rdtr",
    href: "https://dpupr.sinjaikab.go.id/peta-rdtr/",
  },
  {
    name: "simpelmi",
    href: "http://dpmptsp.sinjaikab.go.id/",
  },
  {
    name: "spbe",
    href: "https://sinjaikab.go.id/spbe/",
  },
];

const menusRight = [
  {
    name: "enikda",
    href: "http://enikda.sinjaikab.go.id/",
  },
  {
    name: "webgis",
    href: "http://webgis.sinjaikab.go.id/",
  },
  {
    name: "sirup",
    href: "https://sirup.lkpp.go.id/",
  },
  {
    name: "simpeg",
    href: "http://apps.sinjaikab.go.id/simpeg/user/login/",
  },
  {
    name: "email",
    href: "https://sinjaikab.go.id/webmail",
  },
  {
    name: "ppid",
    href: "https://ppidkab.sinjaikab.go.id/",
  },
  {
    name: "jdih",
    href: "https://jdih.sinjaikab.go.id/",
  },
  {
    name: "e-office",
    href: "http://apps.sinjaikab.go.id/office/",
  },
];

const slides = [
  {
    name: "poster",
  },
];
</script>

<template>
  <div>
    <main class="min-h-screen flex flex-col items-center justify-center">
      <div class="container p-4 mx-auto">
        <div class="flex justify-center items-center">
          <Banner />

          <!-- <NuxtImg
            src="/sinjai.png"
            alt="logo kabupaten sinjai"
            format="webp"
            width="48"
            height="48"
          />

          <h1 class="text-4xl md:text-5xl font-bold">Selamat Datang</h1>
          <p class="md:text-lg">Website Resmi Pemerintah Kabupaten Sinjai</p> -->
        </div>

        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 py-4 items-center"
        >
          <div class="col-span-2 flex justify-center items-center md:order-2">
            <SwipeContent :name="slides[0].name" />
            <!-- <Swiper
              :modules="[
                SwiperAutoplay,
                SwiperEffectFade,
                SwiperPagination,
                SwiperNavigation,
              ]"
              :slides-per-view="1"
              :loop="true"
              :effect="'fade'"
              :autoplay="{
                delay: 5000,
                disableOnInteraction: true,
              }"
              :mousewheel="true"
              :keyboard="{
                enabled: true,
              }"
              :pagination="{
                clickable: true,
              }"
            >
              <SwiperSlide v-for="slide in slides" :key="slide.name">
                <SwipeContent :name="slide.name" />
              </SwiperSlide>
            </Swiper> -->
          </div>

          <div class="grid grid-cols-2 gap-4 lg:gap-6 md:order-1">
            <div v-for="menu in menusLeft" :key="menu.name">
              <Grid :name="menu.name" :href="menu.href" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 lg:gap-6 md:order-3">
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
body {
  background-image: url("/bg.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.swiper-slide {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>

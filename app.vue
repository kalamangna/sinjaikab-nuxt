<script lang="ts" setup>
// Import config from Nuxt
const config = useRuntimeConfig();

// Deklarasi untuk SEO
const title = "Pemerintah Kabupaten Sinjai";
const description = "Portal Resmi Pemerintah Kabupaten Sinjai #samasamaki";
const baseUrl = config.public.baseUrl;
const imageUrl = `${baseUrl}/meta.png`;

// Deklarasi Responsive Voice
declare global {
  interface Window {
    responsiveVoice?: any;
  }
}

useHead({
  title: title,
  meta: [
    // Meta SEO
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
      content: baseUrl,
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
      content: baseUrl,
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
  link: [{ rel: "canonical", href: baseUrl }],
  script: [
    // Plugin Userway
    {
      src: "https://cdn.userway.org/widget.js",
      "data-account": "S41ThPrHz4",
      async: true,
    },
    // Plugin Responsive Voice
    {
      src: "https://code.responsivevoice.org/responsivevoice.js?key=cPHluKBi",
      async: true,
    },
  ],
});

// Load Responsive Voice setelah halaman dimuat
onMounted(() => {
  // Tunggu 1.5 detik sebelum bicara
  setTimeout(() => {
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(
        "Selamat datang di portal resmi Pemerintah Kabupaten Sinjai",
        "Indonesian Female"
      );
    }
  }, 1500);
});

// Fungsi untuk bicara
let speakTimeout: ReturnType<typeof setTimeout> | undefined;
const speak = (text: string) => {
  if (speakTimeout) clearTimeout(speakTimeout);
  speakTimeout = setTimeout(() => {
    window.responsiveVoice.cancel();
    window.responsiveVoice.speak(text, "Indonesian Female");
  }, 100); // jeda 100ms untuk memastikan perpindahan
};

// List menu yang ditampilkan di sebelah kiri
const menusLeft = [
  {
    name: "pemkab",
    href: "https://sinjaikab.go.id/v4/",
    voice: "Portal Berita Pemerintah Kabupaten Sinjai",
  },
  {
    name: "lpse",
    href: "http://lpse.sinjaikab.go.id/",
    voice: "Layanan Pengadaan Secara Elektronik",
  },
  {
    name: "dprd",
    href: "http://dprd.sinjaikab.go.id/",
    voice: "Dewan Perwakilan Rakyat Daerah",
  },
  {
    name: "sdi",
    href: "https://satudata.sinjaikab.go.id/sistik/",
    voice: "Satu Data Indonesia",
  },
  {
    name: "kotaku",
    href: "http://kotaku.pu.go.id/",
    voice: "Program Kota Tanpa Kumuh",
  },
  {
    name: "rdtr",
    href: "https://dpupr.sinjaikab.go.id/peta-rdtr/",
    voice: "Peta Rencana Detil Tata Ruang",
  },
  {
    name: "simpelmi",
    href: "http://dpmptsp.sinjaikab.go.id/",
    voice: "Sistem Informasi Perizinan Online",
  },
  {
    name: "spbe",
    href: "https://sinjaikab.go.id/spbe/",
    voice: "Sistem Pemerintahan Berbasis Elektronik",
  },
];

// List menu yang ditampilkan di sebelah kanan
const menusRight = [
  {
    name: "enikda",
    href: "http://enikda.sinjaikab.go.id/",
    voice: "Sistem Elektronik Penilaian Kinerja dan Disiplin Aparatur",
  },
  {
    name: "webgis",
    href: "http://webgis.sinjaikab.go.id/",
    voice: "Sistem Informasi Geografis",
  },
  {
    name: "sirup",
    href: "https://sirup.lkpp.go.id/",
    voice: "Sistem Informasi Rencana Umum Pengadaan",
  },
  {
    name: "simpeg",
    href: "http://apps.sinjaikab.go.id/simpeg/user/login/",
    voice: "Sistem Informasi Kepegawaian",
  },
  {
    name: "email",
    href: "https://sinjaikab.go.id/webmail",
    voice: "Webmail Pemerintah Kabupaten Sinjai",
  },
  {
    name: "ppid",
    href: "https://ppidkab.sinjaikab.go.id/",
    voice: "Pejabat Pengelola Informasi dan Dokumentasi",
  },
  {
    name: "jdih",
    href: "https://jdih.sinjaikab.go.id/",
    voice: "Jaringan Dokumentasi dan Informasi Hukum",
  },
  {
    name: "e-office",
    href: "http://apps.sinjaikab.go.id/office/",
    voice: "Sistem Data Pegawai E-Office",
  },
];

// List slide yang ditampilkan di bagian tengah
const slides = [
  {
    name: "poster",
    voice:
      "Visi Kabupaten Sinjai 2025 - 2030: Sinjai Maju, Sejahtera, Mandiri, dan Berkeadilan. Program Prioritas: Ramah Keagamaan, Ramah Pendidikan, Ramah Kesehatan, Ramah Infrastruktur, dan Ramah Ekonomi Kerakyatan. Sama-sama ki!",
  },
];
</script>

<template>
  <div>
    <main class="min-h-screen flex flex-col items-center justify-center">
      <div class="container p-4 mx-auto">
        <div class="flex justify-center items-center">
          <Banner />
        </div>

        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 py-4 items-center"
        >
          <div class="col-span-2 flex justify-center items-center md:order-2">
            <SwipeContent
              :name="slides[0].name"
              :voice="slides[0].voice"
              :speak="speak"
            />
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
              <Grid
                :name="menu.name"
                :href="menu.href"
                :voice="menu.voice"
                :speak="speak"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 lg:gap-6 md:order-3">
            <div v-for="menu in menusRight" :key="menu.name">
              <Grid
                :name="menu.name"
                :href="menu.href"
                :voice="menu.voice"
                :speak="speak"
              />
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

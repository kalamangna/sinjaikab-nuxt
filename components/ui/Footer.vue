<template>
  <footer class="bg-slate-900 text-white pt-16 pb-8">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-6">
            <div class="bg-white p-1.5 rounded-xl shrink-0">
              <NuxtImg
                src="/sinjai.png"
                alt="Logo Sinjai"
                class="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <h2
                class="font-black text-xl tracking-tighter uppercase leading-none"
              >
                Pemkab Sinjai
              </h2>
              <p
                class="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] leading-none"
              >
                Official Website
              </p>
            </div>
          </div>
          <p class="text-slate-400 max-w-sm mb-6 leading-relaxed">
            Website Resmi Pemerintah Kabupaten Sinjai.
          </p>
          <div class="flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/FP.KabupatenSinjai"
              target="_blank"
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <span class="sr-only">Facebook</span>
              <i class="fab fa-facebook-f fa-fw text-lg"></i>
            </a>
            <a
              href="https://www.instagram.com/sinjaikab"
              target="_blank"
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <span class="sr-only">Instagram</span>
              <i class="fab fa-instagram fa-fw text-lg"></i>
            </a>
            <a
              href="https://www.tiktok.com/@pemkabsinjai"
              target="_blank"
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <span class="sr-only">TikTok</span>
              <i class="fab fa-tiktok fa-fw text-lg"></i>
            </a>
            <a
              href="https://www.youtube.com/@SINJAITV"
              target="_blank"
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <span class="sr-only">YouTube</span>
              <i class="fab fa-youtube fa-fw text-lg"></i>
            </a>
            <a
              href="https://x.com/sinjaikab"
              target="_blank"
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <span class="sr-only">X (Twitter)</span>
              <i class="fab fa-x-twitter fa-fw text-lg"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-6 uppercase tracking-wider">
            Tautan Cepat
          </h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink
                to="/"
                @click.prevent="scrollToSection('#')"
                class="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                <i class="fas fa-home fa-fw text-xs"></i>
                Beranda</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="#visi-misi"
                @click.prevent="scrollToSection('#visi-misi')"
                class="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                <i class="fas fa-flag fa-fw text-xs"></i>
                Visi & Misi</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="#program-prioritas"
                @click.prevent="scrollToSection('#program-prioritas')"
                class="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                <i class="fas fa-star fa-fw text-xs"></i>
                Program Prioritas</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="#layanan"
                @click.prevent="scrollToSection('#layanan')"
                class="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                <i class="fas fa-rocket fa-fw text-xs"></i>
                Layanan Digital</NuxtLink
              >
            </li>
            <li>
              <a
                href="https://humas.sinjaikab.go.id/"
                target="_blank"
                class="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <i class="fas fa-newspaper fa-fw text-xs"></i>
                Portal Berita</a
              >
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-bold mb-6 uppercase tracking-wider">
            Kontak Kami
          </h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-5 flex justify-center mt-1 flex-shrink-0">
                <i class="fas fa-map-marker-alt text-red-500"></i>
              </div>
              <span class="text-slate-400">
                Kantor Bupati Sinjai, Jl. Tanassang, Alehanuae, Sinjai Utara,
                Sinjai, Sulawesi Selatan 92615
              </span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 flex justify-center flex-shrink-0">
                <i class="fas fa-envelope text-red-500"></i>
              </div>
              <span class="text-slate-400">info@sinjaikab.go.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-slate-500 text-sm">
          &copy; {{ new Date().getFullYear() }} Pemerintah Kabupaten Sinjai
        </p>
        <p class="text-slate-500 text-xs">
          Dikembangkan oleh Diskominfo-SP Sinjai
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToSection = (href: string) => {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const element = document.querySelector(href);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>

<template>
  <footer class="bg-slate-900 text-white pt-12 md:pt-16 pb-8">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-5">
            <div class="bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 shrink-0">
              <img
                src="/sinjai.png"
                alt="Lambang Daerah Kabupaten Sinjai"
                class="h-10 w-auto object-contain"
              />
            </div>
            <div class="flex flex-col gap-0.5">
              <span
                class="font-black text-sm lg:text-lg tracking-tighter uppercase leading-none"
              >
                Pemkab Sinjai
              </span>
              <span
                class="text-[9px] lg:text-[10px] font-bold text-red-400 uppercase tracking-[0.2em] leading-none"
              >
                Official Website
              </span>
            </div>
          </div>
          <p class="text-slate-400 max-w-sm mb-6 leading-relaxed text-sm">
            Website Resmi Pemerintah Kabupaten Sinjai.
          </p>
          <div class="flex flex-wrap gap-2.5">
            <a
              href="https://www.facebook.com/FP.KabupatenSinjai"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
            >
              <span class="sr-only">Facebook</span>
              <i class="fab fa-facebook-f fa-fw text-lg"></i>
            </a>
            <a
              href="https://www.instagram.com/sinjaikab"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
            >
              <span class="sr-only">Instagram</span>
              <i class="fab fa-instagram fa-fw text-lg"></i>
            </a>
            <a
              href="https://www.tiktok.com/@pemkabsinjai"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
            >
              <span class="sr-only">TikTok</span>
              <i class="fab fa-tiktok fa-fw text-lg"></i>
            </a>
            <a
              href="https://www.youtube.com/@SINJAITV"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
            >
              <span class="sr-only">YouTube</span>
              <i class="fab fa-youtube fa-fw text-lg"></i>
            </a>
            <a
              href="https://x.com/sinjaikab"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
            >
              <span class="sr-only">X (Twitter)</span>
              <i class="fab fa-x-twitter fa-fw text-lg"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-bold mb-5 uppercase tracking-wider text-white">
            Tautan Cepat
          </h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="#visi-misi"
                @click.prevent="scrollToSection('#visi-misi')"
                class="text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-2 text-sm"
              >
                <i class="fas fa-flag fa-fw text-xs text-red-500"></i>
                Visi &amp; Misi
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="#program-prioritas"
                @click.prevent="scrollToSection('#program-prioritas')"
                class="text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-2 text-sm"
              >
                <i class="fas fa-star fa-fw text-xs text-red-500"></i>
                Program Prioritas
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="#layanan"
                @click.prevent="scrollToSection('#layanan')"
                class="text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-2 text-sm"
              >
                <i class="fas fa-rocket fa-fw text-xs text-red-500"></i>
                Layanan Digital
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-bold mb-5 uppercase tracking-wider text-white">
            Kontak Kami
          </h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <i class="fas fa-map-marker-alt text-red-500 mt-0.5 flex-shrink-0"></i>
              <span class="text-slate-400 text-sm leading-relaxed">
                Kantor Bupati Sinjai, Jl. Tanassang, Alehanuae, Sinjai Utara,
                Sinjai, Sulawesi Selatan 92615
              </span>
            </li>
            <li class="flex items-center gap-3">
              <i class="fas fa-envelope text-red-500 flex-shrink-0"></i>
              <span class="text-slate-400 text-sm">info@sinjaikab.go.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2"
      >
        <p class="text-slate-500 text-xs sm:text-sm">
          &copy; {{ new Date().getFullYear() }} Pemerintah Kabupaten Sinjai
        </p>
        <p class="text-slate-500 text-xs">
          Diskominfo-SP Sinjai
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { scrollToSection } = useScrollTo();
</script>

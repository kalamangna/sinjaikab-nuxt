<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
    :class="[
      isScrolled || isMobileMenuOpen
        ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm'
        : 'bg-transparent border-transparent',
    ]"
  >
    <div
      class="container mx-auto px-4 md:px-6 flex items-center justify-between transition-all duration-300"
      :class="isScrolled ? 'py-3' : 'py-4 md:py-5'"
    >
      <!-- Logo -->
      <NuxtLink to="/" @click.prevent="scrollToSection('#')" class="flex items-center gap-3 group">
        <div
          class="bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 shrink-0 group-hover:scale-105 transition-transform"
        >
          <img
            src="/sinjai.png"
            alt="Lambang Daerah Kabupaten Sinjai"
            class="h-8 lg:h-10 w-auto object-contain"
          />
        </div>
        <div class="flex flex-col gap-0.5">
          <span
            class="font-black text-sm lg:text-lg tracking-tighter text-slate-900 uppercase leading-none"
          >
            Pemkab Sinjai
          </span>
          <span
            class="text-[9px] lg:text-[10px] font-bold text-red-700 uppercase tracking-[0.2em] leading-none"
          >
            Official Website
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center gap-8">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.href"
          @click.prevent="scrollToSection(item.href)"
          class="text-sm font-bold text-slate-600 hover:text-red-700 uppercase tracking-wider transition-colors duration-200 cursor-pointer"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- Right Action: CTA & Mobile Hamburger Button -->
      <div class="flex items-center gap-2 sm:gap-4">
        <a
          href="https://humas.sinjaikab.go.id/"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden lg:flex bg-red-700 hover:bg-red-800 text-white px-4 md:px-7 py-2 md:py-3 rounded-2xl text-[10px] md:text-xs font-bold transition-all duration-300 shadow-lg shadow-red-900/20 uppercase tracking-widest whitespace-nowrap items-center gap-2"
        >
          <i class="fas fa-newspaper fa-fw"></i>
          Portal Berita
        </a>

        <!-- Hamburger Toggle Button -->
        <button
          type="button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden p-2 rounded-xl text-slate-700 hover:text-red-700 hover:bg-slate-100 transition-colors duration-200 focus:outline-none"
          aria-label="Menu Navigasi"
          :aria-expanded="isMobileMenuOpen"
        >
          <i :class="isMobileMenuOpen ? 'fas fa-xmark' : 'fas fa-bars'" class="text-xl w-5 text-center block"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md py-4"
      >
        <div class="container mx-auto px-4 md:px-6 space-y-1">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.label"
            :to="item.href"
            @click.prevent="handleMobileNavClick(item.href)"
            class="block py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 hover:text-red-700 hover:bg-red-50 uppercase tracking-wider transition-colors duration-200"
          >
            {{ item.label }}
          </NuxtLink>
          <div class="pt-3 border-t border-slate-100">
            <a
              href="https://humas.sinjaikab.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full bg-red-700 hover:bg-red-800 text-white py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-md shadow-red-900/20 uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <i class="fas fa-newspaper fa-fw"></i>
              Portal Berita
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { scrollToSection } = useScrollTo();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const menuItems = [
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Program Prioritas", href: "#program-prioritas" },
  { label: "Layanan Digital", href: "#layanan" },
];

const handleMobileNavClick = (href: string) => {
  isMobileMenuOpen.value = false;
  scrollToSection(href);
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

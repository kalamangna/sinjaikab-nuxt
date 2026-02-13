<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
    :class="[
      isScrolled
        ? 'bg-white/90 backdrop-blur-md py-3 border-slate-200 shadow-sm'
        : 'bg-transparent py-5 border-transparent',
    ]"
  >
    <div
      class="container mx-auto px-4 md:px-6 flex items-center justify-between"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div
          class="bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 shrink-0 group-hover:scale-105 transition-transform"
        >
          <NuxtImg
            src="/sinjai.png"
            alt="Logo Sinjai"
            class="h-8 md:h-10 w-auto object-contain"
          />
        </div>
        <div class="flex flex-col -gap-1">
          <span
            class="font-black text-sm md:text-xl tracking-tighter text-slate-900 uppercase leading-none"
          >
            Pemkab Sinjai
          </span>
          <span
            class="text-[8px] md:text-[10px] font-bold text-red-700 uppercase tracking-[0.2em] leading-none"
          >
            Official Website
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.href"
          @click.prevent="scrollToSection(item.href)"
          class="text-sm font-bold text-slate-600 hover:text-red-700 uppercase tracking-wider transition-colors cursor-pointer"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- CTA -->
      <div class="flex items-center gap-4">
        <a
          href="https://humas.sinjaikab.go.id/"
          target="_blank"
          class="bg-red-700 hover:bg-red-800 text-white px-5 md:px-7 py-2 md:py-3 rounded-2xl text-[10px] md:text-xs font-bold transition-all shadow-lg shadow-red-900/20 uppercase tracking-widest whitespace-nowrap flex items-center gap-2"
        >
          <i class="fas fa-newspaper fa-fw"></i>
          Portal Berita
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);

const menuItems = [
  { label: "Beranda", href: "#" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Program", href: "#program-prioritas" },
  { label: "Layanan", href: "#layanan" },
];

const scrollToSection = (href: string) => {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const element = document.querySelector(href);
  if (element) {
    const offset = 80; // Navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

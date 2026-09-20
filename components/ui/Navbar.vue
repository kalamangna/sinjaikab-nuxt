<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
    :class="[
      isSolidNavbar
        ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm'
        : 'bg-transparent border-transparent',
    ]"
  >
    <div
      class="container mx-auto px-4 md:px-6 xl:px-8 max-w-7xl flex items-center justify-between transition-all duration-300"
      :class="isScrolled || isSubPage ? 'py-3' : 'py-4 md:py-5'"
    >
      <!-- Logo -->
      <NuxtLink :to="route.path === '/' ? '#' : '/'" @click.prevent="handleNavClick('#')" class="flex items-center gap-3 group">
        <div
          class="bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 shrink-0 group-hover:scale-105 transition-transform"
        >
          <picture>
            <source srcset="/sinjai.webp" type="image/webp" />
            <img
              src="/sinjai.png"
              alt="Lambang Daerah Kabupaten Sinjai"
              width="40"
              height="40"
              class="h-8 lg:h-10 w-auto object-contain"
              decoding="async"
            />
          </picture>
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

      <!-- Right Action: Portal Berita Button -->
      <div class="flex items-center gap-2 sm:gap-4">
        <a
          href="https://humas.sinjaikab.go.id/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex bg-red-700 hover:bg-red-800 text-white px-3.5 sm:px-5 md:px-7 py-2 md:py-3 rounded-xl sm:rounded-2xl text-[10px] md:text-xs font-bold transition-all duration-300 shadow-lg shadow-red-900/20 uppercase tracking-widest whitespace-nowrap items-center gap-2"
        >
          <AppIcon name="newspaper" />
          <span>Portal Berita</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);

const route = useRoute();
const router = useRouter();

const isSubPage = computed(() => route.path !== "/");
const isSolidNavbar = computed(
  () => isSubPage.value || isScrolled.value
);

const handleNavClick = (href: string) => {
  if (href === '#') {
    if (route.path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

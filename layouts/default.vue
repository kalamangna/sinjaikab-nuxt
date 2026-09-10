<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-red-700 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-lg focus:outline-none"
    >
      Lewati ke konten utama
    </a>
    <UiNavbar />
    <main id="main-content" tabindex="-1" class="flex-grow focus:outline-none">
      <slot />
    </main>
    <UiFooter />
  </div>
</template>

<script setup lang="ts">
// Standard landing page layout
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
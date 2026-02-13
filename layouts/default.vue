<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
    <UiNavbar />
    <main class="flex-grow py-8 md:py-12">
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
<template>
  <section id="layanan" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">
          Layanan <span class="text-red-700">Digital</span>
        </h2>
        <p class="text-slate-500 max-w-xl mx-auto">
          Akses cepat berbagai layanan publik dan sistem informasi pemerintahan Kabupaten Sinjai dalam satu pintu.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <ServiceCard 
          v-for="service in services" 
          :key="service.name"
          :title="service.label"
          :description="service.voice"
          :icon="service.name"
          :href="service.href"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ServiceCard from '../ui/ServiceCard.vue';

defineProps<{
  services: Array<{
    name: string;
    label: string;
    href: string;
    voice: string;
  }>;
}>();
</script>

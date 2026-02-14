<template>
  <a 
    :href="href"
    target="_blank"
    class="group flex flex-col items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-red-900/5 hover:-translate-y-1 transition-all duration-300"
    :title="description"
  >
    <!-- Icon Container -->
    <div class="mb-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-slate-50 rounded-2xl group-hover:bg-red-50 transition-colors duration-300">
      <i 
        :class="[icon, 'text-3xl md:text-4xl text-slate-400 group-hover:text-red-700 group-hover:scale-110 transition-all duration-300']"
      ></i>
    </div>
    
    <!-- Text -->
    <h3 class="text-sm md:text-base font-bold text-slate-900 text-center mb-1 group-hover:text-red-700 transition-colors uppercase tracking-tight">
      {{ title }}
    </h3>
    <p class="text-[10px] md:text-xs text-slate-400 text-center line-clamp-1 group-hover:text-slate-500 transition-colors">
      {{ description }}
    </p>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  icon: string;
  href: string;
}>();
</script>
<template>
  <section id="program-prioritas" class="py-16 md:py-24 bg-slate-50">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center mb-12 md:mb-16">
        <h2
          class="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4"
        >
          Program <span class="text-red-700">Prioritas</span>
        </h2>
        <div class="w-20 h-1.5 bg-red-700 mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div
          v-for="program in programs"
          :key="program.title"
          class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group"
        >
          <div
            class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-700 mb-6 group-hover:bg-red-700 group-hover:text-white transition-colors duration-300"
          >
            <i :class="[program.icon, 'text-2xl fa-fw']"></i>
          </div>
          <h3
            class="font-bold text-slate-900 uppercase tracking-tight text-sm md:text-base leading-tight"
          >
            {{ program.title }}
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const programs = [
  { title: "Ramah Keagamaan", icon: "fas fa-hands-praying" },
  { title: "Ramah Pendidikan", icon: "fas fa-graduation-cap" },
  { title: "Ramah Kesehatan", icon: "fas fa-heart-pulse" },
  { title: "Ramah Infrastruktur", icon: "fas fa-road" },
  { title: "Ramah Ekonomi Kerakyatan", icon: "fas fa-store" },
];
</script>

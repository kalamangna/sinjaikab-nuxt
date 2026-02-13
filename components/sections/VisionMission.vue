<template>
  <section id="visi-misi" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">
          Visi & <span class="text-red-700">Misi</span>
        </h2>
        <div class="w-20 h-1.5 bg-red-700 mx-auto rounded-full"></div>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
        <!-- Visi -->
        <div class="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
          <div class="flex items-center gap-4 mb-6">
            <div class="p-3 bg-red-700 rounded-2xl text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 uppercase tracking-tight">Visi</h3>
          </div>
          <p class="text-lg md:text-xl text-slate-700 leading-relaxed font-medium italic">
            "Terwujudnya Masyarakat Sinjai yang Mandiri, Berdaya Saing, dan Religius."
          </p>
        </div>

        <!-- Misi -->
        <div class="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50">
          <div class="flex items-center gap-4 mb-6">
            <div class="p-3 bg-red-700 rounded-2xl text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 uppercase tracking-tight">Misi</h3>
          </div>
          <ul class="space-y-4">
            <li v-for="(misi, index) in misiList" :key="index" class="flex gap-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 text-red-700 flex items-center justify-center font-bold text-sm">
                {{ index + 1 }}
              </span>
              <p class="text-slate-600 leading-relaxed pt-1">
                {{ misi }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const misiList = [
  "Meningkatkan kualitas sumber daya manusia yang unggul dan berdaya saing.",
  "Mewujudkan tata kelola pemerintahan yang baik, bersih, dan melayani.",
  "Mendorong pertumbuhan ekonomi daerah yang inklusif dan berkelanjutan.",
  "Meningkatkan pembangunan infrastruktur wilayah yang merata dan terintegrasi.",
  "Memperkuat nilai-nilai religius dan pelestarian budaya lokal dalam kehidupan masyarakat."
];
</script>

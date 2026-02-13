<template>
  <section class="relative min-h-[80vh] flex items-center pt-20 pb-16 overflow-hidden bg-slate-50">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-1/2 h-full bg-red-700/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs md:text-sm font-bold tracking-wider uppercase mb-6">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Official Website
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 uppercase tracking-tighter">
            Sinjai <span class="text-red-700">Bersatu</span>
            <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-amber-600 italic">#samasamaki</span>
          </h1>
          
          <p class="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Portal informasi publik Kabupaten Sinjai yang menghadirkan layanan digital terintegrasi, transparansi, dan perkembangan pembangunan daerah secara akuntabel.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#layanan" class="w-full sm:w-auto px-8 py-4 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-900/20 text-center uppercase tracking-wide">
              Layanan Publik
            </a>
            <a href="https://humas.sinjaikab.go.id/" target="_blank" class="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl font-bold transition-all text-center uppercase tracking-wide">
              Portal Berita
            </a>
          </div>
        </div>

        <!-- Hero Image/Poster -->
        <div class="flex-1 w-full max-w-2xl lg:max-w-none">
          <div class="relative group">
            <div class="absolute inset-0 bg-red-700/10 rounded-[2.5rem] blur-2xl transform rotate-3 scale-95 transition-transform group-hover:rotate-1"></div>
            <div class="relative bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-2xl">
              <NuxtImg
                src="/poster.png"
                alt="Sinjai Bersatu"
                class="w-full h-auto rounded-2xl object-cover"
                loading="eager"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Modern Hero Section
</script>
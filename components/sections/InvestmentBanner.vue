<template>
  <section class="py-6 md:py-10 bg-slate-50">
    <div class="container mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
      <div
        class="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 relative overflow-hidden"
      >
        <!-- Background decorative blur -->
        <div
          class="absolute -right-16 -top-16 w-64 h-64 bg-red-700/5 rounded-full blur-2xl pointer-events-none"
        ></div>

        <div
          class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10"
        >
          <div class="flex items-center gap-4 sm:gap-5">
            <!-- Icon Box -->
            <div
              class="p-3.5 sm:p-4 bg-red-700 rounded-2xl text-white shrink-0 flex items-center justify-center shadow-md shadow-red-900/10"
            >
              <AppIcon name="map-location-dot" class="text-xl sm:text-2xl" />
            </div>

            <!-- Content Details -->
            <div>
              <h2
                class="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight"
              >
                Peta Potensi &amp; <span class="text-red-700">Peluang Investasi</span>
              </h2>
            </div>
          </div>

          <!-- CTA Action -->
          <div class="w-full md:w-auto shrink-0">
            <a
              href="https://potensi-investasi.sinjaikab.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-red-900/20 uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2.5"
            >
              <span>Kunjungi Portal</span>
              <AppIcon name="arrow-up-right-from-square" class="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Komponen seksi banner terintegrasi untuk tautan resmi Peta Potensi & Peluang Investasi Sinjai
</script>

<template>
  <section class="py-6 md:py-10 bg-slate-50">
    <div class="container mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <!-- Banner Potensi Investasi -->
        <div
          class="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between gap-6"
        >
          <!-- Background decorative blur -->
          <div
            class="absolute -right-16 -top-16 w-48 h-48 bg-red-700/5 rounded-full blur-2xl pointer-events-none"
          ></div>

          <div class="flex items-center gap-4 sm:gap-5 relative z-10">
            <!-- Icon Box -->
            <div
              class="p-3.5 sm:p-4 bg-red-700 rounded-2xl text-white shrink-0 flex items-center justify-center shadow-md shadow-red-900/10"
            >
              <AppIcon name="map-location-dot" class="text-xl sm:text-2xl" />
            </div>

            <!-- Content Details -->
            <div>
              <h2
                class="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight"
              >
                Peta Potensi &amp; <span class="text-red-700">Peluang Investasi</span>
              </h2>
            </div>
          </div>

          <!-- CTA Action -->
          <div class="w-full sm:w-auto relative z-10">
            <a
              href="https://potensi-investasi.sinjaikab.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto px-6 py-3.5 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-red-900/20 uppercase tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2.5"
            >
              <span>Kunjungi Portal Investasi</span>
              <AppIcon name="arrow-up-right-from-square" class="text-sm" />
            </a>
          </div>
        </div>

        <!-- Banner SP4N LAPOR -->
        <div
          class="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between gap-6"
        >
          <!-- Background decorative blur -->
          <div
            class="absolute -right-16 -top-16 w-48 h-48 bg-red-700/5 rounded-full blur-2xl pointer-events-none"
          ></div>

          <div class="flex items-center gap-4 sm:gap-5 relative z-10">
            <!-- Icon Box -->
            <div
              class="p-3.5 sm:p-4 bg-red-700 rounded-2xl text-white shrink-0 flex items-center justify-center shadow-md shadow-red-900/10"
            >
              <AppIcon name="bullhorn" class="text-xl sm:text-2xl" />
            </div>

            <!-- Content Details -->
            <div>
              <h2
                class="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight"
              >
                Layanan Pengaduan <span class="text-red-700">SP4N LAPOR</span>
              </h2>
            </div>
          </div>

          <!-- CTA Action -->
          <div class="w-full sm:w-auto relative z-10">
            <a
              href="https://www.lapor.go.id/instansi/pemerintah-kabupaten-sinjai"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto px-6 py-3.5 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-red-900/20 uppercase tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2.5"
            >
              <span>Sampaikan Pengaduan</span>
              <AppIcon name="arrow-up-right-from-square" class="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Komponen seksi banner unggulan untuk Potensi Investasi dan SP4N LAPOR Sinjai
</script>

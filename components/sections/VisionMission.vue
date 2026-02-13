<template>
  <section id="visi-misi" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center mb-12 md:mb-16">
        <h2
          class="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2"
        >
          Visi & <span class="text-red-700">Misi</span>
        </h2>
        <p
          class="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4"
        >
          Periode 2025–2030
        </p>
        <div class="w-20 h-1.5 bg-red-700 mx-auto rounded-full"></div>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
        <!-- Visi -->
        <div
          class="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="p-3 bg-red-700 rounded-2xl text-white">
              <i class="fas fa-eye fa-fw text-xl"></i>
            </div>
            <h3
              class="text-2xl font-bold text-slate-900 uppercase tracking-tight"
            >
              Visi
            </h3>
          </div>
          <p
            class="text-xl md:text-3xl text-slate-900 leading-tight font-black uppercase italic"
          >
            "SINJAI MAJU, SEJAHTERA, MANDIRI DAN BERKEADILAN"
          </p>
        </div>

        <!-- Misi -->
        <div
          class="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="p-3 bg-red-700 rounded-2xl text-white">
              <i class="fas fa-bullseye fa-fw text-xl"></i>
            </div>
            <h3
              class="text-2xl font-bold text-slate-900 uppercase tracking-tight"
            >
              Misi
            </h3>
          </div>
          <ul class="space-y-4">
            <li
              v-for="(misi, index) in misiList"
              :key="index"
              class="flex gap-4"
            >
              <span
                class="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 text-red-700 flex items-center justify-center font-bold text-sm"
              >
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
  "Mewujudkan sumber daya manusia yang unggul melalui pendidikan dan kesehatan berkualitas.",
  "Menerapkan teknologi informasi dan komunikasi, hasil riset dan inovasi untuk meningkatkan daya saing daerah.",
  "Mewujudkan tata kelola pemerintahan yang profesional dan akuntabel.",
  "Meningkatkan pertumbuhan ekonomi melalui pengembangan potensi daerah berbasis agribisnis, agroindustri, pariwisata, pemberdayaan UMKM dan ramah investasi.",
  "Mewujudkan ketahanan keluarga, sosial budaya berdasarkan nilai religius kearifan lokal.",
  "Melestarikan sumber daya alam, lingkungan hidup dan kehutanan secara berkelanjutan.",
  "Meningkatkan kualitas dan kuantitas infrastruktur yang merata dan berkeadilan.",
  "Mewujudkan masyarakat yang taat hukum, tertib, aman dan tangguh bencana.",
];
</script>
<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const router = useRouter()
const route = useRoute()

const is404 = computed(() => props.error?.statusCode === 404)
const isFromPpid = computed(() => route.path.startsWith('/informasi/'))

const handleBack = () => {
  if (isFromPpid.value) {
    clearError({ redirect: '/informasi' })
  } else {
    clearError({ redirect: '/' })
  }
}

const handleHome = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full text-center space-y-6">
      <!-- Logo -->
      <img class="mx-auto h-16 w-auto" src="/sinjai.png" alt="Pemerintah Kabupaten Sinjai" />

      <!-- Kode Error -->
      <div>
        <p class="text-8xl font-black text-red-700 tracking-tight leading-none">
          {{ error?.statusCode || '?' }}
        </p>
      </div>

      <!-- Pesan -->
      <div class="space-y-2">
        <h1 class="text-2xl font-black text-slate-900">
          {{ is404 ? 'Dokumen Tidak Ditemukan' : 'Terjadi Kesalahan' }}
        </h1>
        <p class="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
          <template v-if="is404 && isFromPpid">
            Dokumen yang Anda cari tidak tersedia, sudah dipindahkan, atau belum dipublikasikan.
          </template>
          <template v-else-if="is404">
            Halaman yang Anda tuju tidak ditemukan atau telah dipindahkan.
          </template>
          <template v-else>
            Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.
          </template>
        </p>
      </div>

      <!-- Tombol Aksi -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <!-- Kembali ke Daftar (jika dari halaman PPID) -->
        <button
          v-if="isFromPpid"
          @click="handleBack"
          class="inline-flex items-center px-6 py-3 text-sm font-bold rounded-xl shadow-md shadow-red-700/20 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-700/20 transition-all cursor-pointer"
        >
          <i class="fas fa-list-ul mr-2 text-xs"></i>
          Kembali ke Daftar Dokumen
        </button>

        <!-- Ke Beranda -->
        <button
          @click="handleHome"
          :class="[
            'inline-flex items-center px-6 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-4',
            isFromPpid
              ? 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-red-700 hover:border-red-200 shadow-sm focus:ring-slate-200'
              : 'shadow-md shadow-red-700/20 text-white bg-red-700 hover:bg-red-800 focus:ring-red-700/20'
          ]"
        >
          <i class="fas fa-home mr-2 text-xs"></i>
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
</template>

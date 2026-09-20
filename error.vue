<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center space-y-6">
      <img class="mx-auto h-20 w-auto" src="/sinjai.png" alt="Pemerintah Kabupaten Sinjai" />
      <h1 class="text-6xl font-black text-red-700 tracking-tight">404</h1>
      <h2 class="text-2xl font-bold text-slate-900">Halaman Tidak Ditemukan</h2>
      <p class="text-slate-600 text-sm">Maaf, halaman yang Anda tuju tidak ditemukan atau telah dipindahkan.</p>
      <div class="pt-2">
        <button
          @click="handleError"
          class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl shadow-md shadow-red-700/20 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-700/20 transition-all cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
</template>

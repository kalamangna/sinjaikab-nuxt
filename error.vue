<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center space-y-6">
      <img class="mx-auto h-20 w-auto" src="/sinjai.png" alt="Pemerintah Kabupaten Sinjai" />
      <h1 class="text-6xl font-extrabold text-red-700 tracking-tight">404</h1>
      <h2 class="text-2xl font-bold text-gray-900">Halaman Tidak Ditemukan</h2>
      <div>
        <button
          @click="handleError"
          class="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
</template>

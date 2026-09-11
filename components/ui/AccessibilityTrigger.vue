<template>
  <div
    v-if="!isLoaded"
    class="fixed bottom-5 right-5 z-40 transition-transform duration-300"
  >
    <button
      type="button"
      @click="loadAndOpen"
      :disabled="isLoading"
      class="group relative flex items-center justify-center w-12 h-12 md:w-13 md:h-13 rounded-full bg-blue-700 hover:bg-blue-800 active:scale-95 text-white shadow-lg shadow-blue-900/30 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
      aria-label="Buka Menu Aksesibilitas"
      :title="isLoading ? 'Memuat aksesibilitas...' : 'Menu Aksesibilitas'"
      :aria-busy="isLoading"
    >
      <!-- Loading Spinner -->
      <svg
        v-if="isLoading"
        class="animate-spin h-6 w-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <!-- Universal Access Icon -->
      <AppIcon
        v-else
        name="universal-access"
        class="text-2xl transition-transform duration-200 group-hover:scale-110"
      />

      <!-- Tooltip on Desktop -->
      <span
        class="hidden lg:group-hover:block absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-200"
      >
        Aksesibilitas
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { loadAndOpen, isLoading, isLoaded } = useUserWay();
</script>

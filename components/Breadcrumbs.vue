<template>
  <nav v-if="breadcrumbs && breadcrumbs.length > 0" aria-label="Breadcrumb" class="mb-4 overflow-hidden">
    <ol class="flex flex-wrap items-center text-xs md:text-sm font-semibold gap-y-2" :class="theme === 'dark' ? 'text-gray-200' : 'text-gray-500'">
      <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <li v-if="index !== breadcrumbs.length - 1" class="flex items-center">
          <template v-if="breadcrumb.url">
            <NuxtLink :to="breadcrumb.url" class="hover:text-blue-400 transition-all duration-200 flex items-center group whitespace-nowrap">
              <i v-if="breadcrumb.icon" :class="[breadcrumb.icon, 'mr-1.5 transition-colors', theme === 'dark' ? 'text-gray-300 group-hover:text-blue-300' : 'text-gray-400 group-hover:text-blue-500']"></i>
              <span class="max-w-[100px] md:max-w-[200px] truncate">{{ breadcrumb.title }}</span>
            </NuxtLink>
          </template>
          <template v-else>
            <span class="flex items-center whitespace-nowrap">
              <i v-if="breadcrumb.icon" :class="[breadcrumb.icon, 'mr-1.5', theme === 'dark' ? 'text-gray-300' : 'text-gray-400']"></i>
              <span class="max-w-[100px] md:max-w-[200px] truncate">{{ breadcrumb.title }}</span>
            </span>
          </template>
          <span class="mx-2" :class="theme === 'dark' ? 'text-gray-400' : 'text-gray-300'">
            <i class="fas fa-chevron-right text-[10px]"></i>
          </span>
        </li>
        <li v-else class="flex items-center min-w-0" :class="theme === 'dark' ? 'text-white' : 'text-blue-600'">
          <i v-if="breadcrumb.icon" :class="[breadcrumb.icon, 'mr-1.5 flex-shrink-0']"></i>
          <span class="truncate font-bold">
            <span class="hidden md:inline">{{ breadcrumb.title }}</span>
            <span class="md:hidden">{{ breadcrumb.title.length > 20 ? breadcrumb.title.substring(0, 20) + '...' : breadcrumb.title }}</span>
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  breadcrumbs: {
    type: Array,
    default: () => []
  },
  theme: {
    type: String,
    default: 'light'
  }
})
</script>


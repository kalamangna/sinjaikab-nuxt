<template>
  <nav v-if="breadcrumbs && breadcrumbs.length > 0" aria-label="Breadcrumb" class="mb-4 overflow-hidden">
    <ol class="flex flex-wrap items-center text-xs md:text-sm font-semibold gap-y-2" :class="theme === 'dark' ? 'text-red-100' : 'text-slate-500'">
      <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <li v-if="index !== breadcrumbs.length - 1" class="flex items-center">
          <template v-if="breadcrumb.url">
            <NuxtLink :to="breadcrumb.url" class="transition-all duration-200 flex items-center group whitespace-nowrap" :class="theme === 'dark' ? 'hover:text-white' : 'hover:text-red-700'">
              <i v-if="breadcrumb.icon" :class="[breadcrumb.icon, 'mr-1.5 transition-colors', theme === 'dark' ? 'text-red-200 group-hover:text-white' : 'text-slate-400 group-hover:text-red-700']"></i>
              <span class="max-w-[100px] md:max-w-[200px] truncate">{{ breadcrumb.title }}</span>
            </NuxtLink>
          </template>
          <template v-else>
            <span class="flex items-center whitespace-nowrap">
              <i v-if="breadcrumb.icon" :class="[breadcrumb.icon, 'mr-1.5', theme === 'dark' ? 'text-red-200' : 'text-slate-400']"></i>
              <span class="max-w-[100px] md:max-w-[200px] truncate">{{ breadcrumb.title }}</span>
            </span>
          </template>
          <span class="mx-2" :class="theme === 'dark' ? 'text-red-300/60' : 'text-slate-300'">
            <i class="fas fa-chevron-right text-[10px]"></i>
          </span>
        </li>
        <li v-else class="flex items-center min-w-0" :class="theme === 'dark' ? 'text-white' : 'text-red-700'">
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


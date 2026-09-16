<template>
  <div>
    <div class="relative bg-gradient-to-br from-red-900 via-red-800 to-red-600 pt-6 md:pt-10 pb-24 overflow-hidden">
        <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div class="max-w-7xl mx-auto w-full px-4 relative z-10 text-center">
            <!-- Breadcrumbs -->
            

            <div class="flex justify-center items-center mt-12 md:mt-16 mb-4 flex-col">
                <picture class="mb-4">
                    <source srcset="/sinjai.webp" type="image/webp" />
                    <img
                        src="/sinjai.png"
                        alt="Lambang Daerah Kabupaten Sinjai"
                        class="h-20 md:h-24 w-auto object-contain drop-shadow-xl"
                        decoding="async"
                    />
                </picture>
                <div class="w-full relative">
                    <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                        {{ pageTitle }}
                    </h1>
                </div>
            </div>
            <p class="text-red-100 text-lg md:text-xl max-w-2xl mx-auto font-light mt-4">
                Transparansi Dokumen Pemerintah Kabupaten yang dapat Anda akses, telusuri, dan unduh dengan mudah.
            </p>
        </div>
        
        <div class="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none transform translate-y-1">
            <svg class="relative block w-full h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,121.22,201.2,110.53Z" class="fill-gray-50"></path>
            </svg>
        </div>
    </div>

    <div class="bg-gray-50 pb-16">
        <div class="max-w-7xl mx-auto w-full px-4 -mt-8 relative z-20">
            <!-- Notifikasi -->
            <div v-if="notification.message" 
                 :class="[
                   'mb-6 px-6 py-4 rounded-2xl shadow-sm flex items-start backdrop-blur-sm relative z-50 border',
                   notification.type === 'red' ? 'bg-red-50/90 border-red-200 text-red-700' : 'bg-green-50/90 border-green-200 text-green-700'
                 ]">
                <div class="flex-shrink-0 mt-0.5">
                    <i :class="notification.type === 'red' ? 'fas fa-exclamation-circle text-red-500 text-xl' : 'fas fa-check-circle text-green-500 text-xl'"></i>
                </div>
                <div class="ml-4 flex-1">
                    <h3 class="text-sm font-bold" :class="notification.type === 'red' ? 'text-red-800' : 'text-green-800'">
                        {{ notification.type === 'red' ? 'Perhatian' : 'Berhasil' }}
                    </h3>
                    <p class="mt-1 text-sm">{{ notification.message }}</p>
                </div>
                <button @click="notification.message = ''" class="ml-auto pl-3 text-gray-400 hover:text-gray-500 focus:outline-none">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-end bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl shadow-red-500/5 border border-white mb-6 relative z-50">
                    <div class="flex-1 relative" style="z-index: 50;">
                        <label class="block text-sm font-semibold text-gray-700 mb-2 ml-2">
                            <i class="fas fa-layer-group text-red-500 mr-1"></i> Kategori
                        </label>
                        <CustomSelect 
                            v-model="filters.kategori" 
                            :options="kategoriOptions" 
                            labelKey="label" 
                            valueKey="value" 
                            placeholder="Semua Kategori"
                            @change="resetJenis"
                            class="w-full"
                        />
                    </div>
                    
                    <div class="flex-1 relative" style="z-index: 49;">
                        <label class="block text-sm font-semibold text-gray-700 mb-2 ml-2">
                            <i class="fas fa-file-alt text-red-500 mr-1"></i> Jenis Dokumen
                        </label>
                        <CustomSelect 
                            v-model="filters.jenis_dokumen" 
                            :options="jenisDokumenOptions" 
                            labelKey="label" 
                            valueKey="value" 
                            placeholder="Semua Jenis Dokumen"
                            @change="applyFilters"
                            class="w-full transition-opacity"
                        />
                    </div>

                    <div class="flex-1 relative" style="z-index: 48;">
                        <label class="block text-sm font-semibold text-gray-700 mb-2 ml-2">
                            <i class="fas fa-calendar-alt text-red-500 mr-1"></i> Tahun
                        </label>
                        <CustomSelect 
                            v-model="filters.tahun" 
                            :options="tahunOptions" 
                            labelKey="label" 
                            valueKey="value" 
                            placeholder="Semua Tahun"
                            @change="applyFilters"
                            class="w-full"
                        />
                    </div>

                    <div class="flex-1 relative" style="z-index: 47;">
                        <label class="block text-sm font-semibold text-gray-700 mb-2 ml-2">
                            <i class="fas fa-search text-red-500 mr-1"></i> Pencarian
                        </label>
                        <div class="relative">
                            <input 
                                type="text" 
                                v-model="filters.search" 
                                @keyup.enter="applyFilters"
                                placeholder="Cari judul atau deskripsi..." 
                                class="w-full h-[44px] pl-10 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm bg-gray-50 focus:bg-white"
                            >
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                    </div>

                    <div class="w-full lg:w-32 flex-none pt-2 lg:pt-0 flex gap-2">
                        <button @click="applyFilters" class="flex-1 lg:flex-none w-full lg:w-14 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30 rounded-xl h-[44px] transition-all flex items-center justify-center font-bold" title="Terapkan Filter">
                            <i class="fas fa-search lg:mr-0"></i> <span class="inline lg:hidden ml-2">Cari</span>
                        </button>
                        <button @click="resetFilters" class="flex-1 lg:flex-none w-full lg:w-14 bg-gray-100 hover:bg-gray-200 text-gray-600 shadow-sm rounded-xl h-[44px] transition-all flex items-center justify-center border border-gray-200" title="Reset Filter">
                            <i class="fas fa-undo-alt lg:mr-0"></i> <span class="inline lg:hidden ml-2 font-semibold">Reset</span>
                        </button>
                    </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 relative z-10">
                <h2 class="text-xl font-bold text-gray-800">Daftar Dokumen</h2>
                
            </div>

            <!-- Daftar Dokumen -->
            <div class="bg-white/80 rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[400px]" style="z-index: 10;">
                
                <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden" style="opacity: 0.03;">
                    <div class="w-full h-full" :style="{ backgroundImage: `url(${getAssetUrl('storage/logo/Lambang_Kabupaten_Sinjai.png')})`, backgroundRepeat: 'repeat-y', backgroundPosition: 'center top', backgroundSize: 'contain', minHeight: '800px', filter: 'grayscale(100%)' }"></div>
                </div>

                <div v-if="isLoading" class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
                    <i class="fas fa-circle-notch fa-spin text-4xl text-red-500 mb-4"></i>
                    <p class="text-gray-700 font-bold">Memuat data...</p>
                </div>

                <template v-if="items.length > 0">
                    <div class="hidden md:block overflow-x-hidden relative z-10 w-full">
                        <table class="w-full bg-transparent table-fixed">
                            <thead>
                                <tr class="bg-gray-100/60 border-b border-gray-200 text-left backdrop-blur-sm">
                                    <th class="py-4 px-3 font-bold text-gray-700 text-sm tracking-wide uppercase w-12 text-center">No</th>
                                    <th class="py-4 px-4 font-bold text-gray-700 text-sm tracking-wide uppercase w-[40%]">Detail Dokumen</th>
                                    <th class="py-4 px-4 font-bold text-gray-700 text-sm tracking-wide uppercase w-32">Kategori</th>
                                    <th class="py-4 px-4 font-bold text-gray-700 text-sm tracking-wide uppercase w-48">Sumber</th>
                                    <th class="py-4 px-4 font-bold text-gray-700 text-sm tracking-wide uppercase w-28 text-center">Tanggal</th>
                                    <th class="py-4 px-4 font-bold text-gray-700 text-sm tracking-wide uppercase w-52 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100/50">
                                <tr v-for="(dokumen, index) in items" :key="dokumen.id" class="transition-colors group hover:bg-red-50/60">
                                    <td class="py-4 px-4 text-center align-middle font-medium text-gray-500">
                                        {{ (currentPage - 1) * Number(filters.per_page) + index + 1 }}
                                    </td>
                                    <td class="py-4 px-6 whitespace-normal align-middle">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-100 to-orange-50 border-red-100 text-red-600 flex items-center justify-center border shadow-sm">
                                                    <i class="fas fa-file-pdf text-lg"></i>
                                                </div>
                                            </div>
                                            <div class="ml-4">
                                                <NuxtLink :to="`/informasi/${dokumen.slug || dokumen.id}`" class="block text-base font-bold text-gray-800 hover:text-red-700 transition-all duration-300 leading-tight line-clamp-1 group-hover:line-clamp-none">
                                                    {{ dokumen.judul }}
                                                </NuxtLink>
                                                <p v-if="dokumen.deskripsi" class="text-sm text-gray-500 mt-1 transition-all duration-300 line-clamp-1 group-hover:line-clamp-none">
                                                    {{ dokumen.deskripsi }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-4 px-6 whitespace-normal align-middle">
                                        <span class="inline-block px-3 py-1 bg-white/80 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 mb-1 shadow-sm">
                                            {{ dokumen.kategori }}
                                        </span>
                                        <br>
                                        <span class="inline-block px-3 py-1 bg-red-50/80 text-red-700 text-xs font-semibold rounded-lg border border-red-100 mt-1 shadow-sm">
                                            {{ dokumen.jenis_dokumen }}
                                        </span>
                                    </td>
                                    <td class="py-4 px-4 whitespace-normal align-middle">
                                        <div v-if="dokumen.user" class="mb-1.5 text-xs text-gray-600 font-medium break-words">
                                            <i class="fas fa-user-circle mr-1 text-gray-400"></i>
                                            <template v-if="dokumen.user.role === 'superadmin' || (dokumen.user.admin_kabupaten && dokumen.user.admin_kabupaten == 1)">
                                                Admin Kabupaten ({{ dokumen.user.name }})
                                            </template>
                                            <template v-else>
                                                {{ dokumen.user.name }}
                                            </template>
                                        </div>
                                        <span v-if="dokumen.organization" class="inline-block px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 break-words max-w-full">
                                            <i class="fas fa-building mr-1"></i> {{ dokumen.organization.name }}
                                        </span>
                                        <span v-else class="text-xs text-gray-400 italic">Pemerintah Kabupaten</span>
                                    </td>
                                    <td class="py-4 px-6 text-center align-middle">
                                        <span class="inline-block bg-white/80 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-600 border border-gray-200 shadow-sm whitespace-nowrap">
                                            {{ formatDate(dokumen.published_at || dokumen.created_at) }}
                                        </span>
                                    </td>
                                    <td class="py-4 px-6 text-center align-middle">
                                        <div class="flex flex-nowrap items-center justify-center gap-2">
                                            <NuxtLink :to="`/informasi/${dokumen.slug || dokumen.id}`" class="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-sm transition-all duration-300" title="Lihat Detail">
                                                <i class="fas fa-eye"></i>
                                            </NuxtLink>
                                            <a v-if="dokumen.file_path" :href="getDownloadUrl(dokumen)" target="_blank" class="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 bg-green-50 border border-green-200 text-green-600 hover:bg-green-600 hover:text-white rounded-lg text-sm transition-all duration-300" title="Unduh">
                                                <i :class="dokumen.file_path.startsWith('http') ? 'fas fa-external-link-alt' : 'fas fa-cloud-download-alt'"></i>
                                            </a>
                                            
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
      
                    <div class="block md:hidden relative z-10 p-3 sm:p-4 space-y-4 bg-gray-50/50">
                          <div v-for="dokumen in items" :key="'mob-'+dokumen.id" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 relative flex flex-col group transition-all duration-300">
                              <div class="flex items-start">
                                  <div class="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-tr from-red-100 to-orange-50 text-red-600 border-red-100 flex items-center justify-center border shadow-sm mt-0.5">
                                      <i class="fas fa-file-pdf text-lg"></i>
                                  </div>
                                  <div class="ml-3 flex-grow min-w-0">
                                      <NuxtLink :to="`/informasi/${dokumen.slug || dokumen.id}`" class="block text-sm sm:text-base font-bold text-gray-800 hover:text-red-700 transition-all duration-300 leading-snug line-clamp-1 group-hover:line-clamp-none">
                                          {{ dokumen.judul }}
                                      </NuxtLink>
                                      <p v-if="dokumen.deskripsi" class="text-xs text-gray-500 mt-1.5 transition-all duration-300 line-clamp-1 group-hover:line-clamp-none leading-relaxed">
                                        {{ dokumen.deskripsi }}
                                    </p>
                                </div>
                            </div>
      
                            <div class="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                                <span class="px-2 py-1 bg-gray-100 text-gray-700 text-[10px] sm:text-xs font-semibold rounded-md border border-gray-200">
                                    {{ dokumen.kategori }}
                                </span>
                                <span class="px-2 py-1 bg-red-50 text-red-700 text-[10px] sm:text-xs font-semibold rounded-md border border-red-100">
                                    {{ dokumen.jenis_dokumen }}
                                </span>
                                <span v-if="dokumen.user" class="px-2 py-1 bg-purple-50 text-purple-700 text-[10px] sm:text-xs font-semibold rounded-md border border-purple-200">
                                    <i class="fas fa-user-circle mr-1"></i> 
                                    <template v-if="dokumen.user.role === 'superadmin' || (dokumen.user.admin_kabupaten && dokumen.user.admin_kabupaten == 1)">
                                        Admin Kabupaten ({{ dokumen.user.name }})
                                    </template>
                                    <template v-else>
                                        {{ dokumen.user.name }}
                                    </template>
                                </span>
                                <span v-if="dokumen.organization" class="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-semibold rounded-md border border-emerald-200">
                                    <i class="fas fa-building mr-1"></i> {{ dokumen.organization.name }}
                                </span>
                                <span class="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] sm:text-xs font-semibold rounded-md border border-gray-200">
                                    <i class="fas fa-calendar mr-1 text-gray-400"></i> {{ formatDate(dokumen.published_at || dokumen.created_at) }}
                                </span>
                            </div>
      
                            <div class="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
                                <a v-if="dokumen.file_path" :href="getDownloadUrl(dokumen)" target="_blank" class="inline-flex flex-1 sm:flex-none items-center justify-center h-9 px-3 bg-green-50 border border-green-200 text-green-600 hover:bg-green-600 hover:text-white rounded-lg text-xs font-bold transition-colors">
                                    <i :class="dokumen.file_path.startsWith('http') ? 'fas fa-external-link-alt' : 'fas fa-cloud-download-alt'"></i> <span class="hidden sm:inline sm:ml-1.5">Unduh</span>
                                </a>
                                <NuxtLink :to="`/informasi/${dokumen.slug || dokumen.id}`" class="inline-flex flex-1 sm:flex-none items-center justify-center h-9 px-3 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-xs font-bold transition-colors">
                                    <i class="fas fa-eye sm:mr-1.5"></i> <span class="hidden sm:inline">Detail</span>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </template>

                <div v-else class="py-20 text-center relative z-10">
                    <div class="flex flex-col items-center justify-center">
                        <div class="w-24 h-24 bg-white/80 shadow-sm rounded-full flex items-center justify-center mb-4">
                            <i class="fas fa-folder-open text-4xl text-gray-300"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-700 mb-2">Belum Ada Dokumen</h3>
                        <p class="text-gray-500 font-medium">Silakan sesuaikan filter pencarian Anda.</p>
                    </div>
                </div>
                
                <!-- Pagination -->
                <div v-if="lastPage > 1" class="relative z-10 px-6 py-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm flex justify-center mt-4">
                    <nav class="inline-flex rounded-xl shadow-sm border border-gray-100 bg-white p-1">
                        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-4 py-2 text-sm font-bold text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <template v-for="page in visiblePages" :key="page">
                            <span v-if="page === '...'" class="px-4 py-2 text-sm font-bold text-gray-400">...</span>
                            <button v-else @click="changePage(page)" :class="['px-4 py-2 text-sm font-bold rounded-lg transition-colors', page === currentPage ? 'bg-red-600 text-white shadow-md shadow-red-200' : 'text-gray-600 hover:bg-red-50 hover:text-red-600']">
                                {{ page }}
                            </button>
                        </template>
                        <button @click="changePage(currentPage + 1)" :disabled="currentPage === lastPage" class="px-4 py-2 text-sm font-bold text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const notification = ref({ type: '', message: '' })
let notificationTimeout = null

watch(() => notification.value.message, (newMsg) => {
  if (newMsg) {
    if (notificationTimeout) clearTimeout(notificationTimeout)
    notificationTimeout = setTimeout(() => {
      notification.value.message = ''
    }, 5000)
  }
})

// OG meta dinamis berbasis filter aktif
const pageTitle = computed(() => {
  const jd = route.query.jenis_dokumen
  const kat = route.query.kategori

  if (jd) {
    return `Dokumen ${jd}`
  } else if (kat) {
    return `Informasi Kategori ${kat}`
  }
  return 'Informasi Pemkab'
})



useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: 'Transparansi Dokumen Pemerintah Kabupaten Sinjai yang dapat Anda akses, telusuri, dan unduh dengan mudah.',
  ogDescription: 'Transparansi Dokumen Pemerintah Kabupaten Sinjai yang dapat Anda akses, telusuri, dan unduh dengan mudah.',
  ogImage: 'https://sinjaikab.go.id/sinjai.png',
  twitterCard: 'summary_large_image',
})


const filters = ref({
  kategori: route.query.kategori || '',
  jenis_dokumen: route.query.jenis_dokumen || '',
  tahun: route.query.tahun || '',
  search: route.query.search || '',
  per_page: route.query.per_page || '10',
  page: route.query.page || 1
})

const getDownloadUrl = (dokumen) => {
  if (!dokumen) return '#'
  return `https://ppidkab.sinjaikab.go.id/informasi/${dokumen.slug || dokumen.id}/download`
}

const getAssetUrl = (path) => `https://ppidkab.sinjaikab.go.id/${path}`

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

const { data, pending: isLoading, refresh } = useAsyncData(
  'informasi-pemkab',
  () => $fetch('https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab', { params: filters.value }),
  { watch: [filters], server: false }
)

const kategori_jenis = computed(() => data.value?.kategori_jenis || {})

const availableYears = computed(() => {
  const years = []
  const current = new Date().getFullYear()
  for (let y = current; y >= 2000; y--) years.push(y)
  return years
})

const kategoriOptions = computed(() => {
    const opts = [{ label: 'Semua Kategori', value: '' }]
    Object.keys(kategori_jenis.value).forEach(k => opts.push({ label: k, value: k }))
    return opts
})

const jenisDokumenOptions = computed(() => {
    const opts = [{ label: 'Semua Jenis Dokumen', value: '' }]
    if (filters.value.kategori && kategori_jenis.value[filters.value.kategori]) {
        kategori_jenis.value[filters.value.kategori].forEach(j => opts.push({ label: j, value: j }))
    } else if (kategori_jenis.value) {
        let allTypesSet = new Set()
        for (let cat in kategori_jenis.value) {
            kategori_jenis.value[cat].forEach(t => allTypesSet.add(t))
        }
        const allTypes = Array.from(allTypesSet).sort()
        allTypes.forEach(j => opts.push({ label: j, value: j }))
    }
    return opts
})

const tahunOptions = computed(() => {
    const opts = [{ label: 'Semua Tahun', value: '' }]
    availableYears.value.forEach(y => opts.push({ label: y.toString(), value: y.toString() }))
    return opts
})

const items = computed(() => data.value?.data?.data || [])
const currentPage = computed(() => data.value?.data?.current_page || 1)
const lastPage = computed(() => data.value?.data?.last_page || 1)

const visiblePages = computed(() => {
  const current = currentPage.value
  const last = lastPage.value
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1)
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', last]
  }
  if (current >= last - 3) {
    return [1, '...', last - 4, last - 3, last - 2, last - 1, last]
  }
  return [1, '...', current - 1, current, current + 1, '...', last]
})

const resetJenis = () => {
  filters.value.jenis_dokumen = ''
  applyFilters()
}

const applyFilters = () => {
  filters.value.page = 1
  updateRoute()
}

const resetFilters = () => {
  filters.value = {
    kategori: '',
    jenis_dokumen: '',
    tahun: '',
    search: '',
    per_page: '10',
    page: 1
  }
  updateRoute()
}

const changePage = (p) => {
  if (p >= 1 && p <= lastPage.value) {
    filters.value.page = p
    updateRoute()
  }
}

const updateRoute = () => {
  router.push({ query: { ...filters.value } })
}

watch(
  () => route.query,
  (newQuery) => {
    filters.value = {
      kategori: newQuery.kategori || '',
      jenis_dokumen: newQuery.jenis_dokumen || '',
      tahun: newQuery.tahun || '',
      search: newQuery.search || '',
      per_page: newQuery.per_page || '10',
      page: newQuery.page || 1
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="w-full min-h-screen bg-gray-50">
    <ClientOnly>
      <div v-if="isLoading && !dokumen" class="min-h-[60vh] flex items-center justify-center">
      <div class="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
        <i class="fas fa-spinner fa-spin text-4xl text-red-600 mb-4"></i>
        <p class="text-gray-600">Memuat data dokumen...</p>
      </div>
    </div>

    <div v-else-if="isError" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
        <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-6"></i>
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Dokumen Tidak Ditemukan</h2>
        <p class="text-gray-600 mb-8">Maaf, dokumen yang Anda cari tidak tersedia, ditarik, atau terjadi kesalahan pada server.</p>
        <NuxtLink to="/informasi" class="inline-flex items-center px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition">
          <i class="fas fa-arrow-left mr-2"></i> Kembali ke Daftar
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="dokumen" class="w-full">
      <div class="relative bg-gradient-to-br from-red-900 via-red-800 to-red-600 pt-20 md:pt-24 pb-24 overflow-hidden">
        <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div class="container max-w-5xl mx-auto px-4 relative z-10">
          <Breadcrumbs
            :breadcrumbs="[
              { title: 'Beranda', url: '/', icon: 'fas fa-home' },
              { title: 'Informasi Pemkab', url: '/informasi', icon: 'fas fa-folder-open' },
              { title: dokumen.judul }
            ]"
            theme="dark"
          />

          <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight max-w-4xl mt-4">
                        {{ dokumen.judul }}
                    </h1>
                    
                    <div class="flex flex-wrap items-center mt-6 gap-3">
                        <span class="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold border border-white/30 shadow-sm flex items-center">
                            <i class="fas fa-calendar-alt mr-2 opacity-70"></i> {{ dokumen.tahun }}
                        </span>
                        <span class="bg-red-700/50 backdrop-blur-sm text-red-100 px-4 py-1.5 rounded-full text-sm font-semibold border border-red-400/30 shadow-sm flex items-center">
                            <i class="fas fa-folder-open mr-2 opacity-70"></i> {{ dokumen.kategori }}
                        </span>
                    </div>
                </div>
                
                <div class="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none transform translate-y-1">
                    <svg class="relative block w-full h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,121.22,201.2,110.53Z" class="fill-gray-50"></path>
                    </svg>
                </div>
            </div>

            <div class="bg-gray-50 pb-20">
                <div class="container max-w-5xl mx-auto px-4 -mt-10 relative z-20">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <div class="lg:col-span-2 space-y-6">
                            <div v-if="dokumen.deskripsi" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                                    <h2 class="text-xl font-bold text-gray-800 flex items-center">
                                        <i class="fas fa-info-circle text-red-500 mr-2"></i> Deskripsi Dokumen
                                    </h2>
                                </div>
                                <div class="p-6 md:p-8">
                                    <div class="prose prose-blue max-w-none text-gray-700 leading-relaxed text-lg">
                                        <div v-html="dokumen.deskripsi"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex justify-between items-center">
                                    <h2 class="text-xl font-bold text-gray-800 flex items-center">
                                        <i class="fas fa-eye text-red-500 mr-2"></i> Pratinjau Dokumen
                                    </h2>
                                    <span class="text-xs bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full">
                                        <i class="fas fa-chart-line mr-1"></i> {{ dokumen.views_count || 0 }} Kali Dilihat
                                    </span>
                                </div>
                                <div class="p-0 h-[600px] w-full bg-gray-100">
                                    <template v-if="dokumen.file_path">
                                        <div v-if="isGoogleDriveFolder(dokumen.file_path) || isExternalWebpage(dokumen.file_path)" class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-8 text-center">
                                            <i class="fas fa-external-link-alt text-6xl text-gray-300 mb-4"></i>
                                            <h3 class="text-xl font-bold text-gray-700 mb-2">Dokumen Berupa Tautan Eksternal</h3>
                                            <p class="text-gray-500 mb-6">Tautan ini mengarah ke sumber eksternal dan tidak dapat dipratinjau langsung di sini.</p>
                                            <a :href="dokumen.file_path.startsWith('http') ? dokumen.file_path : getDownloadUrl(dokumen)" target="_blank" class="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition">
                                                Kunjungi Tautan <i class="fas fa-arrow-right ml-2"></i>
                                            </a>
                                        </div>
                                        <div v-else-if="isImage(dokumen.file_path)" class="w-full h-full flex items-center justify-center p-4 bg-gray-100 overflow-hidden">
                                            <img :src="getStorageUrl(dokumen.file_path)" :alt="dokumen.judul" class="max-w-full max-h-full object-contain rounded-lg shadow-sm">
                                        </div>
                                        <ClientOnly v-else>
                                            <iframe :src="getEmbedUrl(dokumen.file_path)" class="w-full h-full border-0"></iframe>
                                            <template #fallback>
                                                <div class="w-full h-full flex items-center justify-center text-gray-400">
                                                    <i class="fas fa-spinner fa-spin mr-2"></i> Memuat pratinjau dokumen...
                                                </div>
                                            </template>
                                        </ClientOnly>
                                    </template>
                                    <div v-else class="w-full h-full flex items-center justify-center text-gray-400 flex-col">
                                        <i class="fas fa-ban text-4xl mb-3"></i>
                                        <p>File tidak tersedia</p>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-md border border-red-100 overflow-hidden p-6 md:p-8 relative">
                                <div class="absolute right-0 bottom-0 opacity-5">
                                    <i class="fas fa-cloud-download-alt text-9xl -mr-6 -mb-6"></i>
                                </div>
                                
                                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h3 class="text-lg font-bold text-gray-800 mb-1">Akses Dokumen</h3>
                                        <p class="text-sm text-gray-600">Klik tombol di samping untuk melihat atau mengunduh dokumen secara lengkap.</p>
                                    </div>
                                    
                                    <div class="flex-shrink-0 w-full md:w-auto text-center md:text-right flex flex-col sm:flex-row gap-3">
                                        <div class="flex flex-col items-end w-full">
                                            <div class="flex flex-col sm:flex-row gap-3 w-full">
                                                <template v-if="dokumen.file_path">
                                                    <a :href="getDownloadUrl(dokumen)" target="_blank" 
                                                       class="w-full md:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                                       :class="(isGoogleDriveFolder(dokumen.file_path) || isExternalWebpage(dokumen.file_path)) ? 'from-red-600 to-red-700 shadow-red-500/30 hover:shadow-red-600/50' : 'from-green-500 to-emerald-600 shadow-green-500/30 hover:shadow-green-600/50'">
                                                        <i :class="[(isGoogleDriveFolder(dokumen.file_path) || isExternalWebpage(dokumen.file_path)) ? 'fa-external-link-alt' : 'fa-cloud-download-alt', 'fas mr-2 text-xl']"></i> 
                                                        {{ (isGoogleDriveFolder(dokumen.file_path) || isExternalWebpage(dokumen.file_path)) ? 'Kunjungi Tautan' : 'Unduh File Dokumen' }}
                                                    </a>
                                                </template>
                                                <span v-else class="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-500 font-bold rounded-xl cursor-not-allowed">
                                                    <i class="fas fa-ban mr-2"></i> File Tidak Tersedia
                                                </span>
                                                
                                                <button @click="copyShareLink(dokumen)" 
                                                   class="w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-white border-2 border-red-500 text-red-600 font-bold rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:bg-red-50">
                                                    <i class="fas fa-share-alt mr-2 text-xl"></i> Bagikan
                                                </button>
                                            </div>
                                            <p class="mt-4 text-xs text-gray-500 font-semibold w-full text-center sm:text-right"><i class="fas fa-eye mr-1"></i> Telah dilihat {{ dokumen.views_count || 0 }} kali</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="lg:col-span-1 space-y-6">
                            <NuxtLink to="/informasi" class="w-full flex items-center justify-center px-6 py-3.5 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all duration-300 shadow-sm">
                                <i class="fas fa-arrow-left mr-2"></i> Kembali ke Daftar Dokumen
                            </NuxtLink>

                            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                                    <h2 class="text-lg font-bold text-gray-800 flex items-center">
                                        <i class="fas fa-list-ul text-red-500 mr-2"></i> Metadata
                                    </h2>
                                </div>
                                <div class="p-6">
                                    <ul class="space-y-4">
                                        <li class="flex flex-col">
                                            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Di-upload oleh</span>
                                            <span v-if="dokumen.user" class="text-sm font-bold text-gray-800 flex items-center mb-2">
                                                <i class="fas fa-user-circle mr-2 text-purple-500 opacity-80"></i> 
                                                <template v-if="dokumen.user.role === 'superadmin' || (dokumen.user.admin_kabupaten && dokumen.user.admin_kabupaten == 1)">
                                                    Admin Kabupaten ({{ dokumen.user.name }})
                                                </template>
                                                <template v-else>
                                                    {{ dokumen.user.name }}
                                                </template>
                                            </span>
                                            <span class="text-sm font-bold text-gray-800 flex items-start">
                                                <i class="fas fa-building mt-1 mr-2 text-emerald-500 opacity-80"></i> 
                                                {{ dokumen.organization ? dokumen.organization.name : 'Pemerintah Kabupaten' }}
                                            </span>
                                        </li>
                                        <li class="pt-4 border-t border-gray-100 flex flex-col">
                                            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Sifat Akses</span>
                                            <span v-if="dokumen.visibility === 'public'" class="text-sm font-bold text-green-600 flex items-center">
                                                <i class="fas fa-globe mr-1.5"></i> Publik
                                            </span>
                                            <span v-else class="text-sm font-bold text-orange-500 flex items-center">
                                                <i class="fas fa-lock mr-1.5"></i> Private (Link Terbatas)
                                            </span>
                                        </li>
                                        <li class="pt-4 border-t border-gray-100 flex flex-col">
                                            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tahun Dokumen</span>
                                            <span class="text-sm font-semibold text-gray-700 flex items-center">
                                                <i class="fas fa-calendar mr-1.5 text-red-400"></i> {{ dokumen.tahun }}
                                            </span>
                                        </li>
                                        <li class="pt-4 border-t border-gray-100 flex flex-col">
                                            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tanggal Dokumen</span>
                                            <span class="text-sm font-semibold text-gray-700 flex items-center">
                                                <i class="fas fa-clock mr-1.5 text-red-400"></i> {{ formatDate(dokumen.published_at || dokumen.created_at) }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <template #fallback>
        <div class="min-h-[60vh] flex items-center justify-center">
          <div class="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
            <i class="fas fa-spinner fa-spin text-4xl text-red-600 mb-4"></i>
            <p class="text-gray-600">Memuat data dokumen...</p>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const config = useRuntimeConfig()
const slug = route.params.slug

const rawBaseUrl = config.public?.baseUrl || 'https://sinjaikab.go.id'
const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl
const pageUrl = computed(() => `${baseUrl}/informasi/${encodeURIComponent(String(slug))}`)

const hasMounted = ref(false)
const { data: detailData, pending: isLoading, refresh } = useAsyncData(
  'informasi-' + slug,
  () => $fetch('https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab/' + slug),
  { server: false }
)

onMounted(() => {
  hasMounted.value = true
  if (!detailData.value) {
    refresh()
  }
})

const dokumen = computed(() => detailData.value || null)
const isError = computed(() => hasMounted.value && !dokumen.value && !isLoading.value)

const getDownloadUrl = (dok) => {
  if (!dok) return '#'
  return `https://ppidkab.sinjaikab.go.id/informasi/${dok.slug || dok.id}/download`
}

const getAssetUrl = (path) => `https://ppidkab.sinjaikab.go.id/${path}`

const getStorageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `https://ppidkab.sinjaikab.go.id/storage/${path}`;
}

const getEmbedUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) {
      if (path.includes('drive.google.com/file/d/')) {
          return path.replace(/\/view\?.*$/, '/preview');
      }
      return path;
  }
  return getStorageUrl(path) + '#toolbar=0';
}

const isGoogleDriveFolder = (path) => {
  if (!path) return false;
  return path.includes('drive.google.com/drive/folders') || (path.includes('drive.google.com') && !path.includes('/file/d/'));
}

const isExternalWebpage = (path) => {
  if (!path) return false;
  return path.startsWith('http') && !isGoogleDriveFolder(path) && !path.includes('drive.google.com/file/d/');
}

const isImage = (path) => {
  if (!path) return false
  const ext = path.split('.').pop().toLowerCase()
  return ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'].includes(ext)
}

const copyShareLink = (dok) => {
  if (!dok) return;
  const dokSlug = dok.slug || dok.id;
  const url = `${baseUrl}/informasi/${dokSlug}`;
  
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      alert('Tautan berhasil disalin!');
    }).catch(() => {
      prompt('Salin tautan berikut secara manual:', url);
    });
  } else {
    prompt('Salin tautan berikut secara manual:', url);
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

const pageTitle = computed(() => dokumen.value ? dokumen.value.judul : 'Detail Dokumen Informasi Pemkab')
const pageDesc = computed(() => {
  if (!dokumen.value) return 'Detail dokumen Informasi Publik Pemerintah Kabupaten Sinjai.'
  if (dokumen.value.deskripsi) {
    return dokumen.value.deskripsi.replace(/(<([^>]+)>)/gi, '').replace(/\s+/g, ' ').trim().substring(0, 160)
  }
  return `Dokumen ${dokumen.value.judul} kategori ${dokumen.value.kategori || 'Publik'} tahun ${dokumen.value.tahun || ''} Kabupaten Sinjai.`
})

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: pageDesc,
  ogDescription: pageDesc,
  ogType: 'article',
  ogUrl: pageUrl,
  ogImage: `${baseUrl}/meta.png`,
  twitterCard: 'summary_large_image',
})

const structuredData = computed(() => {
  if (!dokumen.value) return []

  const doc = dokumen.value
  const docSchema = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    '@id': `${pageUrl.value}#document`,
    url: pageUrl.value,
    name: doc.judul,
    headline: doc.judul,
    description: pageDesc.value,
    datePublished: doc.published_at || doc.created_at,
    dateModified: doc.updated_at || doc.published_at || doc.created_at,
    inLanguage: 'id-ID',
    publisher: {
      '@type': 'GovernmentOrganization',
      '@id': `${baseUrl}#organization`,
      name: 'Pemerintah Kabupaten Sinjai',
      url: baseUrl,
    },
    creator: doc.organization?.name
      ? {
          '@type': 'GovernmentOrganization',
          name: doc.organization.name,
        }
      : undefined,
    encodingFormat: 'application/pdf',
    isAccessibleForFree: true,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Informasi Pemkab',
        item: `${baseUrl}/informasi`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: doc.judul,
        item: pageUrl.value,
      },
    ],
  }

  return [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(docSchema),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbSchema),
    },
  ]
})

useHead({
  link: [
    { rel: 'canonical', href: pageUrl }
  ],
  script: structuredData,
})
</script>

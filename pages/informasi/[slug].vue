<template>
  <div class="w-full min-h-screen bg-slate-50">
    <!-- Hero Section (Tetap dirender agar layout stabil dan bebas layout-shift) -->
    <div class="relative bg-gradient-to-br from-red-900 via-red-800 to-red-600 pt-32 md:pt-36 lg:pt-40 pb-36 md:pb-44 lg:pb-48 overflow-hidden">
      <div class="absolute inset-0 opacity-10 mix-blend-overlay" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E&quot;);"></div>
      <div class="container mx-auto px-4 md:px-6 xl:px-8 max-w-7xl relative z-10">
        <!-- Jika Dokumen Selesai Dimuat -->
        <h1 v-if="dokumen" class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight max-w-4xl break-words">
          {{ dokumen.judul }}
        </h1>

        <!-- Jika Terjadi Error / Dokumen Tidak Ditemukan -->
        <h1 v-else-if="isError" class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight max-w-4xl">
          Dokumen Tidak Ditemukan
        </h1>

        <!-- Skeleton Placeholder Judul saat Loading -->
        <div v-else class="space-y-4 max-w-4xl animate-pulse">
          <div class="h-9 md:h-12 bg-white/20 rounded-2xl w-5/6"></div>
          <div class="h-9 md:h-12 bg-white/20 rounded-2xl w-3/5"></div>
        </div>
      </div>
      
      <div class="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none transform translate-y-1">
        <svg class="relative block w-full h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,121.22,201.2,110.53Z" class="fill-slate-50"></path>
        </svg>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="bg-slate-50 pb-28 md:pb-36">
      <div class="container mx-auto px-4 md:px-6 xl:px-8 max-w-7xl -mt-10 md:-mt-12 relative z-20">
        
        <!-- KONDISI 1: ERROR / NOT FOUND -->
        <div v-if="isError" class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-14 text-center max-w-xl mx-auto">
          <div class="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h2 class="text-2xl font-black text-slate-900 mb-3">Dokumen Tidak Ditemukan</h2>
          <button @click="goBack" type="button" class="inline-flex items-center px-6 py-3.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-2xl shadow-lg shadow-red-900/20 transition uppercase tracking-wider text-xs">
            <i class="fas fa-arrow-left mr-2"></i> Kembali ke Daftar
          </button>
        </div>

        <!-- KONDISI 2: DATA DOKUMEN SIAP -->
        <div v-else-if="dokumen" class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 items-start">
          <!-- Kolom Kiri: Deskripsi & Pratinjau Dokumen -->
          <div class="lg:col-span-2 space-y-8 md:space-y-10">
            <!-- Deskripsi Dokumen -->
            <div v-if="dokumen.deskripsi" class="bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-red-100/50 transition-all duration-300 overflow-hidden">
              <div class="border-b border-slate-100 bg-slate-50/50 px-4 sm:px-8 py-4 sm:py-5">
                <h2 class="text-xl font-black text-slate-900 flex items-center">
                  <i class="fas fa-info-circle text-red-700 mr-2.5"></i> Deskripsi Dokumen
                </h2>
              </div>
              <div class="p-5 sm:p-8 md:p-10">
                <div class="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg">
                  <div v-html="dokumen.deskripsi"></div>
                </div>
              </div>
            </div>

            <!-- Pratinjau Dokumen -->
            <div class="bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-red-100/50 transition-all duration-300 overflow-hidden">
              <div class="border-b border-slate-100 bg-slate-50/50 px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center flex-wrap gap-3">
                <h2 class="text-xl font-black text-slate-900 flex items-center">
                  <i class="fas fa-eye text-red-700 mr-2.5"></i> Pratinjau Dokumen
                </h2>
                <div class="flex items-center gap-2.5">
                  <span class="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full">
                    <i class="fas fa-eye mr-1 text-slate-500"></i> {{ dokumen.views_count || 0 }} Kali Dilihat
                  </span>
                </div>
              </div>
              <div class="p-0 h-[480px] sm:h-[620px] md:h-[720px] xl:h-[820px] w-full bg-slate-100">
                <template v-if="dokumen.file_path">
                  <div v-if="isGoogleDriveFolder(dokumen.file_path) || isExternalWebpage(dokumen.file_path)" class="w-full h-full flex flex-col items-center justify-center bg-slate-100 p-6 sm:p-8 text-center">
                    <div class="w-16 h-16 rounded-2xl bg-slate-200/70 flex items-center justify-center text-slate-400 mb-3">
                      <i class="fas fa-external-link-alt text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-800 mb-1">Tautan Eksternal</h3>
                    <p class="text-slate-500 text-sm max-w-sm mb-5">Pratinjau tidak tersedia langsung untuk tautan ini.</p>
                    <a :href="dokumen.file_path.startsWith('http') ? dokumen.file_path : getDownloadUrl(dokumen)" target="_blank" class="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded-2xl shadow-md shadow-red-900/20 uppercase tracking-wider text-xs transition">
                      Buka Tautan <i class="fas fa-external-link-alt ml-1.5"></i>
                    </a>
                  </div>
                  <div v-else-if="isImage(dokumen.file_path)" class="w-full h-full flex items-center justify-center p-4 bg-slate-100 overflow-hidden">
                    <img :src="getStorageUrl(dokumen.file_path)" :alt="dokumen.judul" loading="lazy" decoding="async" class="max-w-full max-h-full object-contain rounded-2xl shadow-sm">
                  </div>
                  <!-- Google Drive File: On-Demand Preview untuk mencegah kebocoran third-party cookies dan browser CSP framing error -->
                  <div v-else-if="isGoogleDriveFile(dokumen.file_path) && !showGoogleDrivePreview" class="w-full h-full flex flex-col items-center justify-center bg-slate-100/90 p-6 sm:p-8 text-center relative overflow-hidden">
                    <div class="w-20 h-20 rounded-3xl bg-red-50 border border-red-100 flex items-center justify-center text-red-700 mb-4 shadow-sm">
                      <i class="fas fa-file-pdf text-3xl"></i>
                    </div>
                    <h3 class="text-lg sm:text-xl font-black text-slate-900 mb-5 max-w-md line-clamp-2">{{ dokumen.judul }}</h3>
                    <div class="flex items-center justify-center">
                      <button 
                        @click="showGoogleDrivePreview = true" 
                        type="button" 
                        class="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded-2xl shadow-md shadow-red-700/25 uppercase tracking-wider text-xs transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <i class="fas fa-eye text-xs"></i>
                        <span>Lihat Pratinjau</span>
                      </button>
                    </div>
                  </div>

                  <ClientOnly v-else>
                    <iframe 
                      :src="getEmbedUrl(dokumen.file_path)" 
                      title="Pratinjau Dokumen" 
                      loading="lazy" 
                      allow="fullscreen"
                      class="w-full h-full border-0"
                    ></iframe>
                    <template #fallback>
                      <div class="w-full h-full flex items-center justify-center text-slate-400 flex-col">
                        <i class="fas fa-circle-notch fa-spin text-3xl text-red-700 mb-3"></i>
                        <p class="text-sm font-medium text-slate-500">Memuat pratinjau dokumen...</p>
                      </div>
                    </template>
                  </ClientOnly>
                </template>
                <div v-else class="w-full h-full flex items-center justify-center text-slate-400 flex-col">
                  <i class="fas fa-ban text-4xl mb-3"></i>
                  <p>File tidak tersedia</p>
                </div>
              </div>

              <!-- Action Bar di Bawah Pratinjau Dokumen (Tanpa Teks Tambahan) -->
              <div class="border-t border-slate-100 bg-slate-50/50 px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <template v-if="dokumen.file_path">
                  <a :href="getDownloadUrl(dokumen)" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     :download="(!isGoogleDriveFolder(dokumen.file_path) && !isExternalWebpage(dokumen.file_path)) ? (dokumen.judul || 'dokumen') : undefined"
                     class="inline-flex items-center justify-center px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded-2xl shadow-md shadow-red-900/20 uppercase tracking-wider text-xs transition-all duration-300">
                    <i :class="[(isGoogleDriveFolder(dokumen.file_path) || isExternalWebpage(dokumen.file_path)) ? 'fa-external-link-alt' : 'fa-cloud-download-alt', 'fas mr-2 text-xs']"></i> 
                    {{ (isGoogleDriveFolder(dokumen.file_path) || isExternalWebpage(dokumen.file_path)) ? 'Buka Tautan' : 'Unduh Dokumen' }}
                  </a>
                </template>
                <span v-else class="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-400 font-bold rounded-2xl cursor-not-allowed text-xs uppercase tracking-wider">
                  <i class="fas fa-ban mr-1.5"></i> File Tidak Tersedia
                </span>

                <button @click="copyShareLink(dokumen)" 
                   :class="[
                     'inline-flex items-center justify-center px-5 py-3 border font-bold rounded-2xl shadow-sm transition-all duration-300 uppercase tracking-wider text-xs',
                     isCopied 
                       ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                       : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-red-700'
                   ]">
                  <i :class="[isCopied ? 'fas fa-check text-emerald-600' : 'fas fa-share-alt', 'mr-2 text-xs']"></i> 
                  {{ isCopied ? 'Tautan Disalin!' : 'Bagikan' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Kolom Kanan: Sidebar Metadata & Kembali (Sticky) -->
          <div class="lg:col-span-1 space-y-6 md:space-y-8 lg:sticky lg:top-28 self-start">
            <!-- Metadata Card -->
            <div class="bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-red-100/50 transition-all duration-300 overflow-hidden">
              <div class="border-b border-slate-100 bg-slate-50/50 px-4 sm:px-8 py-4 sm:py-5">
                <h2 class="text-lg font-black text-slate-900 flex items-center">
                  <i class="fas fa-list-ul text-red-700 mr-2.5"></i> Metadata
                </h2>
              </div>
              <div class="p-5 sm:p-8">
                <ul class="space-y-5">
                  <li class="flex flex-col">
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sumber</span>
                    <span class="text-sm font-bold text-slate-800">
                      {{ dokumen.organization ? dokumen.organization.name : 'Pemerintah Kabupaten' }}
                    </span>
                  </li>
                  <li class="pt-5 border-t border-slate-100 flex flex-col">
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kategori & Jenis</span>
                    <div class="flex flex-wrap items-center gap-2">
                      <span v-if="dokumen.kategori" class="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200/60">
                        {{ dokumen.kategori }}
                      </span>
                      <span v-if="dokumen.jenis_dokumen" class="px-2.5 py-1 bg-red-50 text-red-700 font-semibold rounded-lg text-xs border border-red-100">
                        {{ dokumen.jenis_dokumen }}
                      </span>
                    </div>
                  </li>
                  <li class="pt-5 border-t border-slate-100 flex flex-col">
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sifat Akses</span>
                    <span v-if="dokumen.visibility === 'public'" class="text-sm font-bold text-emerald-700">
                      Publik
                    </span>
                    <span v-else class="text-sm font-bold text-amber-700">
                      Terbatas
                    </span>
                  </li>
                  <li class="pt-5 border-t border-slate-100 flex flex-col">
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Publikasi</span>
                    <span class="text-sm font-bold text-slate-700">
                      {{ formatDate(dokumen.published_at || dokumen.created_at) }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <button @click="goBack" type="button" class="w-full flex items-center justify-center px-6 py-3.5 bg-white border border-slate-200 text-slate-600 hover:text-red-700 hover:border-red-200 font-bold rounded-2xl hover:bg-red-50/50 transition-all duration-300 shadow-sm uppercase tracking-wider text-xs">
              <i class="fas fa-arrow-left mr-2"></i> Kembali ke Daftar
            </button>
          </div>
        </div>

        <!-- KONDISI 3: SKELETON LOADING STATE (Saat isLoading / data belum siap) -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 items-start">
          <!-- Kolom Kiri: Pratinjau Skeleton -->
          <div class="lg:col-span-2 space-y-8 md:space-y-10">
            <!-- Pratinjau Dokumen Skeleton -->
            <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div class="border-b border-slate-100 bg-slate-50/50 px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center flex-wrap gap-3">
                <div class="flex items-center">
                  <i class="fas fa-eye text-red-700 mr-2.5"></i>
                  <span class="font-black text-slate-900 text-xl">Pratinjau Dokumen</span>
                </div>
                <div class="h-6 w-24 bg-slate-200/70 rounded-full animate-pulse"></div>
              </div>
              <div class="p-0 h-[480px] sm:h-[620px] md:h-[720px] w-full bg-slate-100/70 flex flex-col items-center justify-center p-8 relative">
                <div class="text-center">
                  <i class="fas fa-circle-notch fa-spin text-4xl text-red-700 mb-4"></i>
                  <p class="text-slate-600 font-bold text-sm tracking-wide">Memuat data dokumen...</p>
                  <p class="text-slate-500 text-xs mt-1">Menyiapkan pratinjau berkas informasi publik</p>
                </div>
              </div>
              <!-- Skeleton Action Bar di Bawah Pratinjau -->
              <div class="border-t border-slate-100 bg-slate-50/50 px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 animate-pulse">
                <div class="h-11 w-36 bg-red-200/60 rounded-2xl"></div>
                <div class="h-11 w-28 bg-slate-200/70 rounded-2xl"></div>
              </div>
            </div>
          </div>

          <!-- Kolom Kanan: Sidebar Skeleton (Sticky) -->
          <div class="lg:col-span-1 space-y-6 md:space-y-8 lg:sticky lg:top-28 self-start">
            <!-- Metadata Card Skeleton -->
            <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div class="border-b border-slate-100 bg-slate-50/50 px-4 sm:px-8 py-4 sm:py-5 flex items-center">
                <i class="fas fa-list-ul text-red-700 mr-2.5"></i>
                <span class="font-black text-slate-900 text-lg">Metadata</span>
              </div>
              <div class="p-5 sm:p-8 space-y-5 animate-pulse">
                <div>
                  <div class="h-3 bg-slate-200 rounded w-16 mb-2"></div>
                  <div class="h-5 bg-slate-200/80 rounded-lg w-44"></div>
                </div>
                <div class="pt-5 border-t border-slate-100">
                  <div class="h-3 bg-slate-200 rounded w-28 mb-2"></div>
                  <div class="flex gap-2">
                    <div class="h-6 bg-slate-200 rounded-lg w-24"></div>
                    <div class="h-6 bg-red-100 rounded-lg w-28"></div>
                  </div>
                </div>
                <div class="pt-5 border-t border-slate-100">
                  <div class="h-3 bg-slate-200 rounded w-20 mb-2"></div>
                  <div class="h-5 bg-emerald-100 rounded-lg w-24"></div>
                </div>
                <div class="pt-5 border-t border-slate-100">
                  <div class="h-3 bg-slate-200 rounded w-32 mb-2"></div>
                  <div class="h-5 bg-slate-200/80 rounded-lg w-36"></div>
                </div>
              </div>
            </div>

            <!-- Tombol Kembali Skeleton -->
            <button @click="goBack" type="button" class="w-full flex items-center justify-center px-6 py-3.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-sm uppercase tracking-wider text-xs">
              <i class="fas fa-arrow-left mr-2"></i> Kembali ke Daftar
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const slug = route.params.slug

const goBack = () => {
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/informasi')
    }
  } else {
    router.push('/informasi')
  }
}

const rawBaseUrl = config.public?.baseUrl || 'https://sinjaikab.go.id'
const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl
const pageUrl = computed(() => `${baseUrl}/informasi/${encodeURIComponent(String(slug))}`)

const getPpidApiUrl = (path = '') => {
  const base = import.meta.dev ? '/api/ppid' : 'https://ppidkab.sinjaikab.go.id/api/v1'
  return path ? `${base}/${path}` : base
}

const hasMounted = ref(false)

const { data: detailData, pending: isLoading, error: fetchError, refresh } = useAsyncData(
  'informasi-' + slug,
  () => $fetch(getPpidApiUrl(`informasi-pemkab/${slug}`), { timeout: 10000 }),
  {
    server: false,
    transform: (doc) => {
      if (!doc) return null
      return {
        id: doc.id,
        judul: doc.judul,
        slug: doc.slug,
        kategori: doc.kategori,
        jenis_dokumen: doc.jenis_dokumen,
        tahun: doc.tahun,
        deskripsi: doc.deskripsi ? doc.deskripsi.replace(/\r\n/g, '\n') : '',
        file_path: doc.file_path,
        status: doc.status,
        views_count: doc.views_count,
        downloads_count: doc.downloads_count,
        visibility: doc.visibility,
        published_at: doc.published_at,
        created_at: doc.created_at,
        updated_at: doc.updated_at,
        organization: doc.organization ? {
          name: doc.organization.name,
          slug: doc.organization.slug,
        } : null
      }
    }
  }
)

onMounted(() => {
  hasMounted.value = true
  if (!detailData.value) {
    refresh()
  }
})

const dokumen = computed(() => detailData.value || null)
const showGoogleDrivePreview = ref(false)
const isError = computed(() => hasMounted.value && !isLoading.value && (!dokumen.value || !!fetchError.value))

const getDownloadUrl = (dok) => {
  if (!dok || !dok.file_path) return '#'
  if (dok.file_path.startsWith('http://') || dok.file_path.startsWith('https://')) {
    return dok.file_path
  }
  return `https://ppidkab.sinjaikab.go.id/storage/${dok.file_path}`
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

const isGoogleDriveFile = (path) => {
  if (!path) return false;
  return path.includes('drive.google.com/file/d/');
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

const isCopied = ref(false)
let copyTimeout = null

const copyShareLink = (dok) => {
  if (!dok) return;
  const dokSlug = dok.slug || dok.id;
  const url = `${baseUrl}/informasi/${dokSlug}`;
  
  const setCopied = () => {
    isCopied.value = true
    if (copyTimeout) clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      isCopied.value = false
    }, 2500)
  }

  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      setCopied();
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
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Makassar' })
}

const pageTitle = computed(() => dokumen.value ? dokumen.value.judul : 'Detail Dokumen Informasi Publik')
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
        name: 'Informasi Publik',
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

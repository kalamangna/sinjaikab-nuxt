const fs = require('fs');

let index = fs.readFileSync('pages/informasi/index.vue', 'utf8');

// Replace script setup entirely for index.vue
const newScriptIndex = `<script setup>
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
  let title = 'Informasi Pemkab'
  const kat = route.query.kategori
  const jenis = route.query.jenis_dokumen

  if (kat && jenis) {
    title += \` - Kategori \${kat} Dokumen \${jenis}\`
  } else if (kat) {
    title += \` - Kategori \${kat}\`
  } else if (jenis) {
    title += \` - Dokumen \${jenis}\`
  }
  return title
})

useHead(computed(() => ({
  title: pageTitle.value,
})))

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
  return \`https://ppidkab.sinjaikab.go.id/transparansi/informasi-pemkab/\${dokumen.slug || dokumen.id}/download\`
}

const getAssetUrl = (path) => \`https://ppidkab.sinjaikab.go.id/\${path}\`

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

const { data, pending: isLoading, refresh } = useAsyncData(
  'informasi-pemkab',
  () => $fetch('https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab', { params: filters.value }),
  { watch: [filters] }
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
</script>`;

index = index.replace(/<script setup>[\s\S]*?<\/script>/, newScriptIndex);

// Remove Breadcrumbs since it might have missing dependencies
index = index.replace(/<Breadcrumbs.*?\/>/, '');
index = index.replace(/<NuxtLink\s+v-if="isAdmin".*?Tambah Informasi Pemkab\s*<\/NuxtLink>/s, '');
index = index.replace(/<template v-if="isAdmin.*?<\/template>/gs, '');
index = index.replace(/\/transparansi\/informasi-pemkab\//g, '/informasi/');

fs.writeFileSync('pages/informasi/index.vue', index);

let slug = fs.readFileSync('pages/informasi/[slug].vue', 'utf8');

const newScriptSlug = `<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const slug = route.params.slug

const { data: detailData, pending: isLoading } = useAsyncData(
  \`informasi-\${slug}\`,
  () => $fetch(\`https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab/\${slug}\`)
)

const dokumen = computed(() => detailData.value?.data || null)
const error = computed(() => !dokumen.value && !isLoading.value)

const getDownloadUrl = (dok) => {
  if (!dok) return '#'
  return \`https://ppidkab.sinjaikab.go.id/transparansi/informasi-pemkab/\${dok.slug || dok.id}/download\`
}

const getAssetUrl = (path) => \`https://ppidkab.sinjaikab.go.id/\${path}\`

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

useHead(computed(() => ({
  title: dokumen.value ? \`\${dokumen.value.judul} - Informasi Pemkab\` : 'Informasi Pemkab'
})))
</script>`;

slug = slug.replace(/<script setup>[\s\S]*?<\/script>/, newScriptSlug);
slug = slug.replace(/<Breadcrumbs.*?\/>/, '');
slug = slug.replace(/<NuxtLink\s+v-if="isAdmin".*?Edit\s*<\/NuxtLink>/s, '');
slug = slug.replace(/<template v-if="isAdmin.*?<\/template>/gs, '');
slug = slug.replace(/\/transparansi\/informasi-pemkab\//g, '/informasi/');

fs.writeFileSync('pages/informasi/[slug].vue', slug);

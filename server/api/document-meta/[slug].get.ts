import fallbackDocuments from '../../data/fallback-documents.json'

interface DocumentMetaResponse {
  judul: string
  deskripsi: string
  published_at: string | null
  updated_at: string | null
  organization: { name: string } | null
}

const LOWERCASE_CONNECTORS = new Set([
  'dan',
  'atau',
  'yang',
  'di',
  'ke',
  'dari',
  'pada',
  'untuk',
  'dengan',
  'tentang',
  'atas',
  'dalam',
  'serta',
  'oleh',
  'sebagai',
  'terhadap',
])

const UPPERCASE_ACRONYMS = new Set([
  'apbd',
  'apbdes',
  'dpa',
  'rka',
  'rkpd',
  'rpjmd',
  'rpjpd',
  'lakip',
  'lkjip',
  'sakip',
  'lppd',
  'lkpj',
  'ppid',
  'skpd',
  'opd',
  'bmd',
  'pbj',
  'spbe',
  'ipkd',
  'saq',
  'ded',
  'kua',
  'ppas',
  'kem',
  'ppkf',
  'sk',
  'sop',
  'asn',
  'pns',
  'pppk',
  'cpns',
  'umkm',
  'apbn',
  'dak',
  'dau',
  'dbh',
  'blud',
  'bumd',
  'rsud',
  'ri',
  'uu',
  'pp',
  'tpp',
  'ii',
  'iii',
  'iv',
])

const formatSlugToTitle = (slug: string): string => {
  if (!slug || /^\d+$/.test(slug)) {
    return ''
  }

  const words = slug
    .split(/[-_]+/)
    .map((word) => word.trim())
    .filter(Boolean)

  if (words.length === 0) {
    return ''
  }

  return words
    .map((word, index) => {
      const lower = word.toLowerCase()
      if (UPPERCASE_ACRONYMS.has(lower)) {
        return lower.toUpperCase()
      }
      if (index > 0 && LOWERCASE_CONNECTORS.has(lower)) {
        return lower
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(' ')
}

export default defineCachedEventHandler(
  async (event): Promise<DocumentMetaResponse | null> => {
    const rawSlug = getRouterParam(event, 'slug')
    const slug = rawSlug ? decodeURIComponent(rawSlug).trim() : ''

    if (!slug) {
      return null
    }

    // Prioritaskan live fetch dari API PPID agar deskripsi dan metadata terbaru ikut terambil
    try {
      const doc: any = await $fetch(
        `https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab/${encodeURIComponent(slug)}`,
        {
          timeout: 5000,
          headers: {
            Accept: 'application/json, text/plain, */*',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 SinjaikabPortal/1.0',
            Referer: 'https://sinjaikab.go.id/',
          },
        }
      )

      if (doc?.judul) {
        return {
          judul: doc.judul,
          deskripsi: doc.deskripsi || '',
          published_at: doc.published_at || doc.created_at || null,
          updated_at: doc.updated_at || doc.published_at || doc.created_at || null,
          organization: doc.organization?.name ? { name: doc.organization.name } : null,
        }
      }
    } catch (error: any) {
      // Jika API PPID secara eksplisit mengembalikan 404/422, dokumen memang tidak ditemukan
      const status = error?.response?.status || error?.statusCode
      if (status === 404 || status === 422) {
        return null
      }
      // Abaikan error jaringan/firewall karena IP datacenter Vercel dapat diblokir API PPID
    }

    // Gunakan dataset fallback lokal saat live fetch gagal atau timeout
    const fallbackItem = (fallbackDocuments as any[]).find(
      (item) => String(item.slug) === slug || String(item.id) === slug
    )

    if (fallbackItem?.judul) {
      return {
        judul: fallbackItem.judul,
        deskripsi: '',
        published_at: fallbackItem.updated_at || null,
        updated_at: fallbackItem.updated_at || null,
        organization: null,
      }
    }

    // Fallback terakhir untuk dokumen baru yang belum masuk snapshot saat API PPID tidak terjangkau
    const derivedTitle = formatSlugToTitle(slug)
    if (derivedTitle) {
      return {
        judul: derivedTitle,
        deskripsi: '',
        published_at: null,
        updated_at: null,
        organization: null,
      }
    }

    return null
  },
  {
    maxAge: 60 * 10,
    swr: true,
    name: 'document-meta',
    getKey: (event) => event.node.req.url || event.path,
  }
)

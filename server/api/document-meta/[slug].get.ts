import fallbackDocuments from '../../data/fallback-documents.json'

interface DocumentMetaResponse {
  judul: string
  deskripsi: string
  published_at: string | null
  updated_at: string | null
  organization: { name: string } | null
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
          timeout: 3500,
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
    } catch {
      // Abaikan error live fetch karena IP datacenter Vercel dapat diblokir firewall API PPID
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

    return null
  },
  {
    maxAge: 60 * 10,
    swr: true,
    name: 'document-meta',
    getKey: (event) => event.node.req.url || event.path,
  }
)

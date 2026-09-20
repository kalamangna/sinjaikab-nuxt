export default defineCachedEventHandler(
  async (event) => {
    const slugParam = event.context.params?.slug || ''
    const query = getQuery(event)
    const targetUrl = `https://ppidkab.sinjaikab.go.id/api/v1/${slugParam}`

    try {
      return await $fetch(targetUrl, {
        query,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        timeout: 15000
      })
    } catch (error: any) {
      throw createError({
        statusCode: error?.response?.status || error?.statusCode || 500,
        statusMessage: error?.message || 'Failed to proxy request to PPID API'
      })
    }
  },
  {
    maxAge: 60 * 10,
    name: 'ppid-api-proxy',
    getKey: (event) => event.node.req.url || event.path,
    swr: true,
  }
)

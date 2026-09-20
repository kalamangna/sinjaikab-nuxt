import fallbackDocuments from "../data/fallback-documents.json";

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const rawBaseUrl = config.public?.baseUrl || "https://sinjaikab.go.id";
    const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

    const escapeXml = (str: string) => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    };

    const today = new Date().toISOString().split("T")[0];

    const urls: Array<{
      loc: string;
      lastmod: string;
      changefreq: string;
      priority: string;
    }> = [
      {
        loc: `${baseUrl}/`,
        lastmod: today,
        changefreq: "daily",
        priority: "1.0",
      },
      {
        loc: `${baseUrl}/informasi`,
        lastmod: today,
        changefreq: "daily",
        priority: "0.9",
      },
    ];

    let items: any[] = [];

    // 1. Prioritaskan Live Fetch langsung dari server API PPID
    try {
      const perPage = 100;
      const firstPageResponse: any = await $fetch(
        `https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab?per_page=${perPage}&page=1`,
        { timeout: 7000 }
      );

      const liveItems = firstPageResponse?.data?.data || [];
      if (Array.isArray(liveItems) && liveItems.length > 0) {
        items = [...liveItems];
        const lastPage = Math.min(Number(firstPageResponse?.data?.last_page) || 1, 10);

        if (lastPage > 1) {
          const remainingPages = Array.from({ length: lastPage - 1 }, (_, i) => i + 2);
          const pageResponses = await Promise.allSettled(
            remainingPages.map((page) =>
              $fetch(
                `https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab?per_page=${perPage}&page=${page}`,
                { timeout: 5000 }
              )
            )
          );

          for (const res of pageResponses) {
            if (res.status === "fulfilled" && (res.value as any)?.data?.data) {
              items.push(...(res.value as any).data.data);
            }
          }
        }
      }
    } catch (error) {
      console.warn("[Sitemap] Live API fetch blocked or timed out, activating fallback dataset:", (error as any)?.message || error);
    }

    // 2. Hybrid Fallback: Jika live API diblokir firewall serverless, gunakan dataset cadangan
    if (!items || items.length === 0) {
      items = fallbackDocuments as any[];
    }

    for (const item of items) {
      const slug = item.slug || item.id;
      if (!slug) continue;

      let lastmod = today;
      if (item.updated_at) {
        lastmod = String(item.updated_at).split("T")[0];
      } else if (item.created_at) {
        lastmod = String(item.created_at).split("T")[0];
      }

      urls.push({
        loc: `${baseUrl}/informasi/${encodeURIComponent(String(slug))}`,
        lastmod,
        changefreq: "monthly",
        priority: "0.8",
      });
    }

    const xmlItems = urls
      .map(
        (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

    setHeader(event, "Content-Type", "application/xml; charset=utf-8");
    setHeader(event, "Cache-Control", "public, max-age=3600, s-maxage=3600");

    return xml;
  },
  {
    maxAge: 60 * 60, // In-memory cache selama 1 jam
    name: "sitemap-xml",
  }
);

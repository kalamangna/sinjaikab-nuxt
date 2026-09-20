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

    try {
      const perPage = 100;
      const firstPageResponse: any = await $fetch(
        `https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab?per_page=${perPage}&page=1`,
        { timeout: 10000 }
      );

      const items = [...(firstPageResponse?.data?.data || [])];
      const lastPage = Math.min(Number(firstPageResponse?.data?.last_page) || 1, 20); // batas aman maks 20 halaman (~2000 dokumen)

      if (lastPage > 1) {
        const remainingPages = Array.from({ length: lastPage - 1 }, (_, i) => i + 2);
        const pageResponses = await Promise.allSettled(
          remainingPages.map((page) =>
            $fetch(`https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab?per_page=${perPage}&page=${page}`, {
              timeout: 10000,
            })
          )
        );

        for (const res of pageResponses) {
          if (res.status === "fulfilled" && res.value?.data?.data) {
            items.push(...res.value.data.data);
          }
        }
      }

      for (const item of items) {
        const slug = item.slug || item.id;
        if (!slug) continue;

        let lastmod = today;
        if (item.updated_at) {
          lastmod = item.updated_at.split("T")[0];
        } else if (item.created_at) {
          lastmod = item.created_at.split("T")[0];
        }

        urls.push({
          loc: `${baseUrl}/informasi/${encodeURIComponent(String(slug))}`,
          lastmod,
          changefreq: "monthly",
          priority: "0.8",
        });
      }
    } catch (error) {
      console.error("[Sitemap] Failed to fetch documents from API:", error);
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
    maxAge: 60 * 60, // Cache selama 1 jam di server Nitro
    name: "sitemap-xml",
  }
);

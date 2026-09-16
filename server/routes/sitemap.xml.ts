export default defineEventHandler(async (event) => {
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
    const response: any = await $fetch(
      "https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab?per_page=500",
      { timeout: 8000 }
    );

    const items = response?.data?.data || [];
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
});

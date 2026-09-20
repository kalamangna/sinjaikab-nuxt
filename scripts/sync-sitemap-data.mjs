import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetFile = path.resolve(__dirname, '../server/data/fallback-documents.json');

const fetchDocuments = () => {
  return new Promise((resolve) => {
    const req = https.get('https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab?per_page=100&page=1', { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const items = (json?.data?.data || []).map((item) => ({
            id: item.id,
            slug: item.slug || String(item.id),
            judul: item.judul,
            updated_at: item.updated_at || item.created_at || new Date().toISOString()
          }));
          resolve(items);
        } catch (e) {
          console.warn('[Sync Sitemap Data] Error parsing response:', e.message);
          resolve(null);
        }
      });
    });

    req.on('error', (err) => {
      console.warn('[Sync Sitemap Data] Network error (will retain existing snapshot):', err.message);
      resolve(null);
    });

    req.on('timeout', () => {
      req.destroy();
      console.warn('[Sync Sitemap Data] Timeout contacting PPID server');
      resolve(null);
    });
  });
};

const main = async () => {
  // Skip sync saat di Vercel build environment — firewall PPID memblokir IP datacenter Vercel.
  // Sync hanya dijalankan dari lokal. Runtime sitemap menggunakan live fetch + whitelist IP.
  if (process.env.VERCEL) {
    console.log('[Sync Sitemap Data] Running on Vercel — skipping sync (runtime live fetch handles this).');
    return;
  }

  console.log('[Sync Sitemap Data] Checking for new PPID documents...');
  const items = await fetchDocuments();
  if (items && items.length > 0) {
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, JSON.stringify(items, null, 2));
    console.log(`[Sync Sitemap Data] Successfully updated snapshot with ${items.length} documents.`);
  } else {
    console.log('[Sync Sitemap Data] Retaining existing fallback dataset.');
  }
};

main();

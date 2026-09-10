# Official Website Pemerintah Kabupaten Sinjai

Website resmi Pemerintah Kabupaten Sinjai yang menyediakan akses cepat ke berbagai layanan publik dan sistem informasi pemerintahan.

## Fitur Utama

- **Portal Berita**: Berita terbaru seputar Kabupaten Sinjai.
- **Layanan Digital**: Akses ke berbagai sistem informasi seperti LPSE, SIMPEG, PPID, JDIH, dan lainnya.
- **Program Prioritas**: Informasi mengenai program prioritas pembangunan daerah.
- **Visi & Misi**: Panduan strategis pembangunan Kabupaten Sinjai 2025–2030.

## Teknologi

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Font Awesome 7](https://fontawesome.com/)
- **Assets**: Optimized images with [@nuxt/image](https://image.nuxt.com/)

## Pengembangan

### Setup

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Production

```bash
# Build for production
npm run build

# Generate static site
npm run generate
```

## Deployment

### Opsi A: Deployment ke Vercel (Direkomendasikan)

Proyek ini telah dikonfigurasi secara optimal untuk platform **Vercel** dengan berkas [`vercel.json`](./vercel.json) yang memuat HTTP Security Headers dan aturan redirect otomatis:

1. Buka [Vercel Dashboard](https://vercel.com/dashboard) dan pilih **Add New Project**.
2. Hubungkan repositori GitHub: `kalamangna/sinjaikab-nuxt`.
3. Vercel akan otomatis mengenali framework **Nuxt.js**:
   - **Framework Preset**: Nuxt.js
   - **Build Command**: `npm run generate` (untuk static export) atau `npm run build`
   - **Output Directory**: `.output/public`
4. Klik **Deploy**. Setiap commit baru pada branch `main` akan di-deploy secara otomatis dengan CDN Global, SSL gratis, dan kompresi Brotli/Gzip otomatis.

---

### Opsi B: Deployment ke cPanel (via Git Version Control)

Proyek ini juga tetap mendukung integrasi **GitHub Actions** dan fitur bawaan **cPanel Git™ Version Control**:

1. Setiap kali melakukan `git push` ke branch `main`, GitHub Actions akan:
   - Mengompilasi situs statis (`npm run generate`).
   - Menyiapkan bundle klien (`_nuxt/`), seluruh gambar publik, dan berkas konfigurasi `.cpanel.yml` serta `.htaccess`.
   - Mengunggah seluruh hasil build yang siap saji ke branch **`deploy`** di GitHub.
2. Di cPanel:
   - Buka menu **Git™ Version Control**.
   - Hubungkan repositori `https://github.com/kalamangna/sinjaikab-nuxt.git` dengan memilih branch **`deploy`**.
   - Setiap ada pembaruan, klik tombol **Update from Remote** lalu **Deploy HEAD Commit**.
   - cPanel akan secara otomatis menyalin seluruh file hasil generate ke `/home/sinjaikab/public_html/`.


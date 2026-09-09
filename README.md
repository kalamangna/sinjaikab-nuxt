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

## Deployment ke cPanel (via Git Version Control)

Proyek ini menggunakan integrasi **GitHub Actions** dan fitur bawaan **cPanel Git™ Version Control**:

1. Setiap kali melakukan `git push` ke branch `main`, GitHub Actions akan:
   - Mengompilasi situs statis (`npm run generate`).
   - Memasukkan berkas konfigurasi `.cpanel.yml` dan `.htaccess`.
   - Mengunggah seluruh hasil build yang siap saji ke branch **`deploy`** di GitHub.
2. Di cPanel:
   - Buka menu **Git™ Version Control**.
   - Hubungkan repositori `https://github.com/kalamangna/sinjaikab-nuxt.git` dengan memilih branch **`deploy`**.
   - Setiap ada pembaruan, klik tombol **Update from Remote** lalu **Deploy HEAD Commit** (atau pasang Webhook cPanel di GitHub untuk auto-deploy).
   - cPanel akan secara otomatis menyalin seluruh file hasil generate ke `/home/sinjaikab/public_html/`.

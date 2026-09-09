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

## Deployment ke cPanel

Proyek ini telah dikonfigurasi dengan otomatisasi deployment via **GitHub Actions** (`.github/workflows/deploy.yml`).

Setiap kali melakukan `git push` ke branch `main`, workflow akan secara otomatis melakukan kompilasi (`npm run generate`) dan mengunggah berkas ke cPanel via FTP.

### Konfigurasi GitHub Secrets
Sebelum melakukan push atau menjalankan deployment, tambahkan *Secrets* berikut pada repositori GitHub (**Settings > Secrets and variables > Actions**):

| Secret | Deskripsi | Contoh |
| --- | --- | --- |
| `FTP_SERVER` | Host / IP server FTP cPanel | `ftp.sinjaikab.go.id` / IP server |
| `FTP_USERNAME` | Akun user FTP cPanel | `deploy@sinjaikab.go.id` |
| `FTP_PASSWORD` | Kata sandi akun FTP | `********` |
| `FTP_SERVER_DIR` | *(Opsional)* Direktori tujuan di server | `/` (jika akun FTP mengarah ke `public_html`) |

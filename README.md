# Website Resmi Pemerintah Kabupaten Sinjai

Portal informasi publik Kabupaten Sinjai yang menghadirkan layanan digital terintegrasi, transparansi, dan perkembangan pembangunan daerah secara terbuka dan akuntabel.

## ✨ Fitur Utama

- **Nuxt 3 & Vue 3**: Framework modern dengan performa optimal dan SEO-friendly.
- **Tailwind CSS**: Antarmuka responsif dan modern dengan prinsip _Material Design_.
- **Font Awesome 6**: Integrasi ikon yang konsisten dan berbobot sama (`fa-fw`).
- **Smooth Scroll Navigation**: Navigasi yang halus antar bagian halaman dengan kompensasi tinggi header.
- **Visi & Misi 2025–2030**: Menampilkan visi "Sinjai Maju, Sejahtera, Mandiri dan Berkeadilan".
- **Layanan Digital Terintegrasi**: Akses cepat ke berbagai aplikasi pemerintahan dalam satu pintu.
- **Sub-path Deployment**: Konfigurasi khusus untuk berjalan di bawah sub-path `/web`.

## 🌐 Layanan Digital Terintegrasi

Aplikasi ini mengintegrasikan berbagai portal layanan publik, antara lain:

- **Informasi Publik**: Portal Berita, PPID, JDIH.
- **Pemerintahan & Kepegawaian**: E-Office, SIMPEG, ENIKDA.
- **Ekonomi & Perizinan**: LPSE, SiRUP, Perizinan Online (SIMPELMI).
- **Data & Perencanaan**: Satu Data (SDI), WebGIS, Peta RDTR, SPBE.

## 🚀 Teknologi & Library

- **Core**: [Nuxt 3.7+](https://nuxt.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Ikon**: [Font Awesome 6 Free](https://fontawesome.com/)
- **Optimasi Gambar**: [@nuxt/image](https://image.nuxt.com/)
- **Font**: Inter & Sans-serif (via Tailwind)

## 🛠️ Pengembangan Lokal

### Instalasi

```bash
# Clone dan masuk ke direktori proyek
npm install
```

### Jalankan Development Server

```bash
npm run dev
```

Akses melalui: `http://localhost:3000/web/`

### Build untuk Produksi

```bash
npm run build
```

## 📂 Struktur Folder Utama

- `components/sections/`: Blok bangunan utama halaman (Hero, Visi-Misi, Services).
- `components/ui/`: Komponen antarmuka yang dapat digunakan kembali (Navbar, Footer).
- `plugins/`: Konfigurasi global (Font Awesome, dsb).
- `public/`: Aset visual, logo, dan ikon layanan.

## ⚙️ Konfigurasi Deployment

Aplikasi menggunakan `baseURL: "/web/"`. Untuk mengubahnya, perbarui file `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  app: {
    baseURL: "/web/", // Sesuaikan dengan path deployment
  },
});
```

## 📱 Media Sosial Resmi

Dapat ditemukan di bagian Footer:

- **Facebook**: FP.KabupatenSinjai
- **Instagram**: @sinjaikab
- **TikTok**: @pemkabsinjai
- **YouTube**: @SINJAITV
- **X (Twitter)**: @sinjaikab

---

&copy; 2026 Pemerintah Kabupaten Sinjai. Dikembangkan oleh **Aptika Dev.**.

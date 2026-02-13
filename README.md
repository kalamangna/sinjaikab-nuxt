# Website Resmi Pemerintah Kabupaten Sinjai (Nuxt 3)

Proyek ini adalah desain ulang dan restrukturisasi landing page resmi Pemerintah Kabupaten Sinjai menggunakan Nuxt 3 dan Tailwind CSS.

## Fitur Utama

- **Modern & Responsive Design:** Layout yang bersih dan profesional, dioptimalkan untuk berbagai ukuran layar.
- **Hero Section:** Perkenalan visual yang menarik dengan slogan "Sinjai Bersatu #samasamaki".
- **Visi & Misi:** Bagian khusus yang memaparkan visi dan misi Kabupaten Sinjai secara jelas.
- **Layanan Digital:** Grid interaktif yang menyediakan akses cepat ke berbagai portal layanan publik (LPSE, JDIH, E-Office, dll).
- **Navbar & Footer Terintegrasi:** Navigasi yang memudahkan pengguna dan informasi kontak yang lengkap.
- **Performa Tinggi:** Menggunakan Nuxt 3 dengan optimasi gambar (`@nuxt/image`).

## Teknologi yang Digunakan

- [Nuxt 3](https://nuxt.com/) - Framework Vue.js modern.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS berbasis utilitas untuk desain cepat.
- [Nuxt Image](https://image.nuxt.com/) - Optimasi gambar otomatis.

## Pengembangan

### Persyaratan
- Node.js (versi terbaru direkomendasikan)
- npm / yarn / pnpm

### Instalasi
```bash
# Instalasi dependensi
npm install
```

### Jalankan dalam Mode Pengembangan
```bash
npm run dev
```

### Build untuk Produksi
```bash
npm run build
```

## Struktur Folder

- `components/sections/`: Berisi komponen besar seperti Hero, Visi & Misi, dan Services.
- `components/ui/`: Berisi komponen UI kecil seperti Navbar, Footer, dan ServiceCard.
- `layouts/`: Template layout utama aplikasi.
- `public/`: Aset statis seperti logo dan ikon layanan.

## Konfigurasi
Aplikasi ini dikonfigurasi untuk berjalan di bawah sub-path `/dev/` (dapat disesuaikan di `nuxt.config.ts`).

---
&copy; 2026 Pemerintah Kabupaten Sinjai. Dikembangkan oleh Diskominfo & Persandian Sinjai.
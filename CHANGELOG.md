# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Composable `composables/useScrollTo.ts` sebagai single source of truth untuk smooth scroll dengan offset navbar.
- Tag `<link rel="canonical">` pada `useHead` di `app.vue` untuk mencegah *duplicate content* di mesin pencari.
- Atribut `width` dan `height` pada `<NuxtImg>` logo di `Navbar.vue` dan `Footer.vue` untuk mencegah Cumulative Layout Shift (CLS).

### Security
- Tambahkan `rel="noopener noreferrer"` pada semua tautan `target="_blank"` di `Navbar.vue`, `Footer.vue`, `Hero.vue`, dan `ServiceCard.vue` untuk mencegah *tabnapping attack*.
- Hapus `@nuxt/devtools` (GHSA-279x-mwfv-vcqv: unauthenticated RPC — critical) karena tidak kompatibel dengan patch yang membutuhkan Nuxt 4, dan fitur devtools memang tidak dipakai di production.
- Perbaiki kerentanan `picomatch` (GHSA-3v7f-55p6-f55p, GHSA-c2c7-rcm5-vvqj — high) via `npm audit fix`. Total kerentanan berkurang dari 50 → 0.

### Changed
- Konsolidasi fungsi `scrollToSection` yang duplikat di `Hero.vue`, `Navbar.vue`, dan `Footer.vue` ke dalam composable bersama `composables/useScrollTo.ts`.
- Ganti URL Portal ASN dari `http://` ke `https://` pada `app.vue`.
- Ganti `npm install` menjadi `npm ci` pada workflow GitHub Actions untuk instalasi yang lebih deterministik di CI.
- Hapus konfigurasi `devtools: { enabled: false }` dari `nuxt.config.ts` karena paket sudah dihapus.
- Hapus padding `py-8 md:py-12` dari `<main>` di `layouts/default.vue` — tiap section sudah mengatur padding vertikal sendiri.
- Navbar: klik logo scroll to top halaman secara smooth.
- Navbar: hapus item menu "Beranda" karena fungsinya sudah digantikan klik logo.
- Navbar: perbaiki glitch hamburger — pisahkan padding bar dari `<nav>` ke container inner agar logo tidak bergeser saat menu dibuka, stabilkan transisi dropdown, fix ikon hamburger `w-5 block` agar tidak layout shift.
- Navbar: dropdown mobile menggunakan `container mx-auto px-4 md:px-6` agar sejajar dengan konten navbar.
- Navbar: ubah breakpoint dari `md` ke `lg` — hamburger menu tampil di mobile **dan tablet**, desktop menu hanya di `lg+`.
- Navbar: `handleResize` threshold diubah dari 768px ke 1024px sesuai breakpoint `lg`.
- Footer: rapikan grid gap (`gap-8 md:gap-10 lg:gap-12`), heading section, ukuran teks, dan copyright row.
- Hero: `pt-20` diganti `pt-24 sm:pt-28 md:pt-32` agar konten tidak tertutup navbar di semua ukuran layar.
- Hero: layout 1 kolom di mobile dan tablet, 2 kolom (`lg:flex-row`) di desktop.
- Hero: gambar poster `max-w-sm sm:max-w-md` di mobile/tablet, bebas di desktop.
- VisionMission: layout 1 kolom di mobile dan tablet, 2 kolom (`lg:grid-cols-2`) di desktop.
- PriorityPrograms: ganti grid dengan flex wrap `justify-center` dan lebar fixed per breakpoint agar 5 item selalu tampil simetris tanpa sel kosong.
- Services (Layanan Digital): grid `grid-cols-2 md:grid-cols-4` — 8 item terbagi rata 4+4 di tablet dan desktop.

### Removed
- `@nuxt/devtools` dari `devDependencies` (kerentanan critical, tidak dipakai di production).
- `@nuxtjs/color-mode` dari `devDependencies` (terdaftar tapi tidak diimplementasikan).
- `@nuxtjs/sitemap` dari `dependencies` (terdaftar tapi tidak diaktifkan di `nuxt.config.ts`).
- `composables/useVoice.ts` — dead code, tidak digunakan di mana pun.


- Berkas konfigurasi cPanel Git Version Control (`.cpanel.yml`) untuk sinkronisasi otomatis ke `/home/sinjaikab/public_html`.
- Berkas `public/.htaccess` untuk HTTPS enforcement, redirect rute lama `/web`, SPA fallback, kompresi Gzip (`mod_deflate`), dan browser caching (`mod_expires`).
- Berkas verifikasi Google Search Console (`googledc5c91fd2931e98f.html`), `robots.txt`, dan `sitemap.xml` di direktori `public/`.
- Menu navigasi mobile (tombol hamburger dan dropdown menu responsif) pada `Navbar.vue`.

### Changed
- Konfigurasi `baseURL` pada `nuxt.config.ts` diubah dari `/web/` ke root domain (`/`).
- Konfigurasi `runtimeConfig.public.baseUrl` pada `nuxt.config.ts` disesuaikan ke root domain `https://sinjaikab.go.id` dengan dukungan *fallback environment variable*.
- Penyederhanaan teks pada footer menjadi "Diskominfo-SP Sinjai".
- Penyesuaian perintah penyalinan berkas `.htaccess` pada `.cpanel.yml`.
- Kurasi daftar layanan digital menjadi 8 layanan utama yang relevan dan terkini (memperbarui LPSE ke INAPROC, DPRD, Satu Data, menyatukan kepegawaian ke Portal ASN, serta menghapus layanan non-aktif).
- Peningkatan tata letak responsif pada kartu `ServiceCard.vue` dan centering item ke-5 pada grid tablet `PriorityPrograms.vue`.

### Performance
- Optimasi elemen hero poster: konversi ke WebP responsif (`sizes`, `width`, `height`) dan penurunan drastis bobot transfer dari 1.9MB menjadi 32KB–130KB.
- Penghapusan `maximum-scale=1` pada meta viewport agar ramah aksesibilitas pengguna seluler.

### Fixed
- Kendala koneksi TLS timeout pada GitHub Actions FTP deploy dengan menambahkan `protocol: ftp`, pengaturan `port: 21`, dan peningkatan timeout.
- Pembaruan versi Node.js runner pada workflow ke versi 22.

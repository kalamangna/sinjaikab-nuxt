# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Memperbarui versi CDN widget aksesibilitas `a11y-sinjaikab` ke rilis stabil [`v1.0.1`](https://github.com/kalamangna/a11y-sinjaikab/releases/tag/v1.0.1) pada [`nuxt.config.ts`](./nuxt.config.ts) dengan perbaikan kompatibilitas elemen kustom dan stabilitas posisi fixed pada mode kontras tinggi.

### Added
- Integrasi widget aksesibilitas `a11y-sinjaikab` (`kalamangna/a11y-sinjaikab`) via CDN jsDelivr pada [`nuxt.config.ts`](./nuxt.config.ts) serta resource hint `preconnect` dan `dns-prefetch` pada [`app.vue`](./app.vue).

### Removed
- Widget aksesibilitas UserWay (`https://cdn.userway.org/widget.js`) beserta resource hint terkait.

### Changed
- Mengembalikan konfigurasi widget aksesibilitas UserWay ke setelan bawaan (*default head script*) pada [`nuxt.config.ts`](./nuxt.config.ts) dengan dukungan resource hint `preconnect` dan `dns-prefetch` pada [`app.vue`](./app.vue).

### Removed
- Menghapus komponen trigger kustom [`components/ui/AccessibilityTrigger.vue`](./components/ui/AccessibilityTrigger.vue) dan composable [`composables/useUserWay.ts`](./composables/useUserWay.ts) serta tombol pemicu aksesibilitas pada [`components/ui/Footer.vue`](./components/ui/Footer.vue).

### Performance
- Penerapan *lazy client hydration* dan *code-splitting* pada seluruh section *below-the-fold* ([`app.vue`](./app.vue) dan [`layouts/default.vue`](./layouts/default.vue)) dengan komponen `<LazySectionsVisionMission />`, `<LazySectionsPriorityPrograms />`, `<LazySectionsServices />`, dan `<LazyUiFooter />` untuk memecah bundle JavaScript klien, mengeliminasi *long tasks* hidrasi Vue pada CPU mobile, dan menekan Total Blocking Time (TBT) ke 0 ms.
- Implementasi Edge pre-rendering via `routeRules: { "/": { prerender: true } }` pada [`nuxt.config.ts`](./nuxt.config.ts) untuk menghasilkan `index.html` statis yang disajikan langsung dari Edge CDN global Vercel, memangkas *Time to First Byte* (TTFB) dari ~617 ms ke ~30–50 ms.
- Penerapan `features: { inlineStyles: true }` pada [`nuxt.config.ts`](./nuxt.config.ts) untuk menyematkan CSS kritis langsung ke dokumen HTML guna mempercepat *First Contentful Paint* (FCP < 900 ms) demi mengunci skor sempurna Lighthouse 100.
- Nonaktifkan ekstraksi payload (`experimental.payloadExtraction: false`) pada [`nuxt.config.ts`](./nuxt.config.ts) guna menghindari permintaan jaringan ekstra ke `_payload.json`.
- Tambahkan aturan caching jangka panjang `Cache-Control: public, max-age=31536000, immutable` pada [`vercel.json`](./vercel.json) untuk seluruh aset bundle `_nuxt/*` serta file `.css` dan `.js`.
- Eliminasi aset webfont Font Awesome (`fa-brands-400.woff2` 110 KB dan `fa-solid-900.woff2` 115 KB) serta bundle CSS Font Awesome (~70 KB) dari rantai kritis rendering (*critical request chain*) dengan menggantinya menggunakan komponen SVG native inline [`components/AppIcon.vue`](./components/AppIcon.vue).
- Optimasi ukuran gambar LCP poster Hero dengan menyediakan file responsif `public/poster-mobile.webp` (756×755 px, 59 KB dari 157 KB, pemangkasan ~62%), kompresi WebP desktop `public/poster.webp` (1200×1199 px, 108 KB), dan pembaruan preload responsif (`imagesrcset` dan `imagesizes`) pada [`app.vue`](./app.vue).
- Optimasi ukuran logo daerah `public/sinjai.webp` (100×100 px, 3.7 KB dari 29.8 KB, pemangkasan ~87%) untuk mengeliminasi peringatan Lighthouse Image Delivery.
- Penundaan pemuatan skrip analitik Google Tag Manager pada [`components/AppPlugins.vue`](./components/AppPlugins.vue) menggunakan strategi *User Interaction Deferred* (dimuat saat ada interaksi scroll, touch, mouse, atau klik pengguna dengan fallback aman 5000 ms) guna menekan Total Blocking Time (TBT) mendekati 0 ms.
- Nonaktifkan fitur `experimental.appManifest` pada [`nuxt.config.ts`](./nuxt.config.ts) untuk mengeliminasi permintaan latensi rantai kritis `meta/<id>.json` (~1.9 detik) pada navigasi awal halaman.

### Fixed
- Mengatasi galat Vite dev server `Pre-transform error: Failed to resolve import "#app-manifest"` dengan menonaktifkan appManifest virtual yang rentan desinkronisasi cache.

### Added
- Komponen ikon SVG mandiri [`components/AppIcon.vue`](./components/AppIcon.vue) yang memuat path vektor 28 ikon aktif secara inline, merender instan tanpa layout shift (*zero CLS/FOIT*), dan mengeliminasi audit *Reduce unused CSS*.

### Removed
- Plugin `plugins/fontawesome.ts` dan berkas penimpa `assets/css/fontawesome-display.css` karena seluruh ikon telah dimigrasikan ke SVG mandiri.
- Widget aksesibilitas pihak ketiga UserWay (`cdn.userway.org/widget.js`) beserta resource hint terkait pada [`app.vue`](./app.vue) dan [`components/AppPlugins.vue`](./components/AppPlugins.vue) untuk mengeliminasi 7 *third-party cookies* dan Hotjar tracker demi mencapai skor sempurna Lighthouse Best Practices 100 dengan tetap mempertahankan standar aksesibilitas WCAG 2.1 AA secara native.

### Performance
- Pangkas Total Blocking Time (TBT) dengan memindahkan inisialisasi script UserWay Accessibility Widget dan Google Tag Manager ke antrean browser idle (`requestIdleCallback`) pada [`components/AppPlugins.vue`](./components/AppPlugins.vue).
- Eliminasi peringatan "Font Display" dan perkecil ukuran bundle CSS Font Awesome dengan hanya mengimpor modul `solid` dan `brands`, mengeliminasi webfont `fa-regular` yang tidak terpakai, serta menerapkan `@font-face { font-display: swap; }` pada [`assets/css/fontawesome-display.css`](./assets/css/fontawesome-display.css).
- Hilangkan peringatan "Non-composited animation" pada Lighthouse dengan menambahkan layer GPU akselerasi `[will-change:transform,opacity]` pada elemen radar animasi `Hero.vue`.
- Optimasi Core Web Vitals (LCP) melalui kompresi format modern WebP untuk poster Hero (`public/poster.webp` 157 KB dari 1.5 MB, pemangkasan ~90%) dan logo Pemkab Sinjai (`public/sinjai.webp` 30 KB dari 118 KB, pemangkasan ~75%).
- Implementasi elemen responsif `<picture>` pada `Hero.vue`, `Navbar.vue`, dan `Footer.vue` dengan prioritas WebP dan fallback PNG.
- Penambahan resource hint `<link rel="preload">` untuk `poster.webp` pada `app.vue` guna memicu pengunduhan dini aset LCP utama.

### Fixed
- Perbaikan rasio kontras warna (*Color Contrast*) standar WCAG AAA/AA pada teks deskripsi kartu layanan [`components/ui/ServiceCard.vue`](./components/ui/ServiceCard.vue) (`text-slate-600`), teks copyright & kredit footer [`components/ui/Footer.vue`](./components/ui/Footer.vue) (`text-slate-400`), serta subtitle section guna meraih skor sempurna Lighthouse Accessibility 100.
- Penanganan variasi *trailing slash* (`/cpanel/`, `/webmail/`, `/whm/`, `/spbe/`, `/agenda/`) pada aturan pengalihan [`vercel.json`](./vercel.json) agar tidak jatuh kembali ke beranda Nuxt.
- Tautan menu layanan SPBE pada [`app.vue`](./app.vue) diperbarui dari `https://sinjaikab.go.id/spbe/` menjadi `https://spbe.sinjaikab.go.id/`.
- Validasi rute pada [`app.vue`](./app.vue) untuk melempar error 404 nyata saat mengakses rute selain root (`/`).

### Added
- Berkas penanganan galat kustom [`error.vue`](./error.vue) bertema resmi Pemerintah Kabupaten Sinjai untuk merespons status HTTP 404 pada URL yang tidak valid dan mencegah *Soft 404* pada Google Search Console.
- Aturan caching jangka panjang (`Cache-Control: public, max-age=31536000, immutable`) pada [`vercel.json`](./vercel.json) untuk file aset statis gambar dan font (`.ico`, `.png`, `.jpg`, `.svg`, `.webp`, `.woff2`, `.ttf`).
- Aturan redirect pada [`vercel.json`](./vercel.json) untuk rute `/spbe` dan `/spbe/:path+` ke `https://spbe.sinjaikab.go.id` serta rute warisan `/agenda` dan `/agenda/:path+` ke `https://apps.sinjaikab.go.id/agenda`.
- Optimasi Technical & On-Page SEO pada `app.vue`: implementasi Schema.org JSON-LD `@graph` (entitas `WebSite`, `GovernmentOrganization`, `AdministrativeArea` beserta `GeoCoordinates` Kantor Bupati Sinjai), metadata Geotagging lokal (`geo.region`, `geo.placename`, `geo.position`, `ICBM`), meta `keywords` daerah, serta metadata dimensi Open Graph dan akun Twitter/X.
- Proteksi *crawl budget* mesin pencari dengan menambahkan aturan `Disallow: /cpanel`, `Disallow: /webmail`, dan `Disallow: /whm` pada `public/robots.txt`.
- Integrasi paket dan modul resmi [`@vercel/analytics`](https://vercel.com/docs/analytics) pada `nuxt.config.ts` untuk pemantauan pengunjung dan *page views* secara real-time.
- Konfigurasi aturan redirect di [`vercel.json`](./vercel.json) untuk rute administratif server (`/cpanel` ke `https://cpanel.sinjaikab.go.id`, `/webmail` ke `https://webmail.sinjaikab.go.id`, dan `/whm` ke `https://whm.sinjaikab.go.id:2087`).
- Berkas konfigurasi Vercel ([`vercel.json`](./vercel.json)) dengan HTTP Security Headers lengkap untuk platform Vercel.
- Structured Data Schema.org (`GovernmentOrganization`) via JSON-LD di `app.vue` untuk pengenalan entitas resmi dan Knowledge Graph Google.
- Tautan aksesibilitas *Skip to Content* (`Lewati ke konten utama`) dan target `id="main-content"` pada `layouts/default.vue` (standar WCAG 2.1 AA).
- Resource hint `rel="preconnect"` dan `rel="dns-prefetch"` pada `app.vue` untuk mempercepat koneksi ke CDN UserWay dan Google Tag Manager.
- Meta tags pendukung di `app.vue`: `author`, `robots` (`index, follow, max-image-preview:large`), `theme-color` (`#b91c1c`), `og:locale` (`id_ID`), `og:site_name`, `og:image:alt`, dan `twitter:image:alt`.
- Divider aksen merah (`w-20 h-1.5 bg-red-700 mx-auto rounded-full`) pada header section Layanan Digital di `Services.vue`.
- Composable `composables/useScrollTo.ts` sebagai single source of truth untuk smooth scroll dengan offset navbar.
- Tag `<link rel="canonical">` pada `useHead` di `app.vue` untuk mencegah *duplicate content* di mesin pencari.
- Atribut `width` dan `height` pada `<NuxtImg>` logo di `Navbar.vue` dan `Footer.vue` untuk mencegah Cumulative Layout Shift (CLS).

### Security
- Penambahan HTTP Security Headers pada `public/.htaccess`: `X-Content-Type-Options` ("nosniff"), `X-Frame-Options` ("SAMEORIGIN"), `Referrer-Policy` ("strict-origin-when-cross-origin"), dan `Permissions-Policy` ("camera=(), microphone=(), geolocation=()").
- Tambahkan `rel="noopener noreferrer"` pada semua tautan `target="_blank"` di `Navbar.vue`, `Footer.vue`, `Hero.vue`, dan `ServiceCard.vue` untuk mencegah *tabnapping attack*.
- Hapus `@nuxt/devtools` (GHSA-279x-mwfv-vcqv: unauthenticated RPC — critical) karena tidak kompatibel dengan patch yang membutuhkan Nuxt 4, dan fitur devtools memang tidak dipakai di production.
- Perbaiki kerentanan `picomatch` (GHSA-3v7f-55p6-f55p, GHSA-c2c7-rcm5-vvqj — high) via `npm audit fix`. Total kerentanan berkurang dari 50 → 0.

### Fixed
- Perbaiki alur build & deploy di `.github/workflows/deploy.yml` dengan menambahkan langkah persiapan artefak lengkap: menyalin bundle klien JavaScript/CSS (`_nuxt/`), seluruh aset publik (gambar, robots.txt, sitemap), konfigurasi `.htaccess`, dan `.nojekyll` ke `.output/public` sebelum dipublikasikan ke branch `deploy`. Perbaikan ini mengaktifkan kembali hidrasi Vue, event listener scroll navbar, dan interaktivitas menu mobile di production.
- Panggil `handleScroll()` saat `onMounted` pada `Navbar.vue` dengan opsi `{ passive: true }` agar status latar belakang navbar sinkron seketika saat halaman dimuat atau dimuat ulang pada posisi ter-scroll.
- Gunakan tag gambar native untuk logo dan poster agar berkas langsung terlayani secara statis dari web server Apache cPanel tanpa ketergantungan pada runtime server Node.js IPX.
- Tata letak grid Program Prioritas diubah ke CSS Grid murni (`grid-cols-2 lg:grid-cols-5` dengan kartu ke-5 di tengah) untuk mengatasi masalah overflow lebar desktop pada rumus flex kalkulasi sebelumnya.
- Kembalikan langkah instalasi pada workflow GitHub Actions (`.github/workflows/deploy.yml`) ke `npm install` untuk mencegah galat `EUSAGE` akibat perbedaan resolusi pohon dependensi lintas sistem operasi (Linux runner vs macOS).

### Changed
- Penyesuaian deskripsi meta SEO pada [`app.vue`](./app.vue) menjadi lebih ringkas ("Website Resmi Pemerintah Kabupaten Sinjai.") agar pas dan tidak terpotong pada cuplikan hasil pencarian mesin pencari.
- Reposisi tautan aksesibilitas *Skip to Content* pada [`layouts/default.vue`](./layouts/default.vue) ke posisi tengah atas layar (*top center floating pill*) dengan outline fokus bundar agar tidak menutupi logo Pemkab Sinjai saat menerima navigasi keyboard.
- Penyederhanaan tampilan antarmuka halaman galat 404 pada [`error.vue`](./error.vue) dengan menghapus teks deskripsi pengalihan agar lebih bersih dan minimalis.
- Perbarui dokumentasi [`README.md`](./README.md) sesuai konteks migrasi Nuxt 3, Tailwind CSS, dan deployment Vercel.
- Perluas deskripsi meta pada `app.vue` (~155 karakter) memuat kata kunci layanan publik, transparansi, dan program daerah.
- Sempurnakan alt text gambar: Hero poster menjadi "Poster Visi dan Program Prioritas Kabupaten Sinjai", logo di Navbar & Footer menjadi "Lambang Daerah Kabupaten Sinjai".
- Konsistensikan gaya logo dan teks "Pemkab Sinjai" serta "Official Website" antara `Navbar.vue` dan `Footer.vue` (elemen `<span>`, gap, ukuran responsif, warna).
- Perbarui label menu di `Navbar.vue` menjadi "Program Prioritas" dan "Layanan Digital" agar selaras dengan judul section dan tautan cepat footer.
- Sederhanakan Tautan Cepat di `Footer.vue` dengan menghapus tautan Beranda dan Portal Berita yang redundan.
- Penyeragaman gaya icon container pada `ServiceCard.vue` (`bg-red-50` default -> hover `bg-red-700` dengan ikon teks putih) dan border-radius konsisten `rounded-3xl`.
- Penyeragaman durasi transisi (`duration-200` pada tautan/menu, `duration-300` pada tombol/kartu/sosial media) di seluruh komponen.
- Konsolidasi fungsi `scrollToSection` yang duplikat di `Hero.vue`, `Navbar.vue`, dan `Footer.vue` ke dalam composable bersama `composables/useScrollTo.ts`.
- Ganti URL Portal ASN dari `http://` ke `https://` pada `app.vue`.
- Ganti `npm install` menjadi `npm ci` pada workflow GitHub Actions untuk instalasi yang lebih deterministik di CI.
- Hapus konfigurasi `devtools: { enabled: false }` dari `nuxt.config.ts` karena paket sudah dihapus.
- Hapus padding `py-8 md:py-12` dari `<main>` di `layouts/default.vue` — tiap section sudah mengatur padding vertikal sendiri.
- Navbar: klik logo scroll to top halaman secara smooth.
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
- Aturan redirect rute `/web` dan `/web/*` pada [`vercel.json`](./vercel.json).
- Modul `@nuxt/image` dari dependensi proyek (`package.json`) dan `nuxt.config.ts` karena seluruh aset gambar menggunakan tag `<img>` native responsif.
- Berkas konfigurasi cPanel (`.cpanel.yml`), Apache `.htaccess` (`public/.htaccess`), dan workflow GitHub Actions (`.github/workflows/deploy.yml`) setelah migrasi penuh ke platform Vercel.
- Symlink usang `dist` di direktori root proyek.
- Berkas `.npmrc` usang (pnpm config) untuk membersihkan log peringatan build npm.
- `@nuxt/devtools` dari `devDependencies` (kerentanan critical, tidak dipakai di production).
- `@nuxtjs/color-mode` dari `devDependencies` (terdaftar tapi tidak diimplementasikan).
- `@nuxtjs/sitemap` dari `dependencies` (terdaftar tapi tidak diaktifkan di `nuxt.config.ts`).
- `composables/useVoice.ts` — dead code, tidak digunakan di mana pun.

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

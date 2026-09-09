# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Workflow GitHub Actions (`.github/workflows/deploy.yml`) untuk build dan deploy otomatis ke branch `deploy` saat push ke branch `main`.
- Berkas konfigurasi cPanel Git Version Control (`.cpanel.yml`) untuk sinkronisasi otomatis ke `/home/sinjaikab/public_html`.
- Berkas `public/.htaccess` untuk HTTPS enforcement, redirect rute lama `/web`, dan SPA routing fallback.
- Berkas verifikasi Google Search Console (`googledc5c91fd2931e98f.html`), `robots.txt`, dan `sitemap.xml` di direktori `public/`.

### Changed
- Konfigurasi `baseURL` pada `nuxt.config.ts` diubah dari `/web/` ke root domain (`/`).
- Konfigurasi `runtimeConfig.public.baseUrl` pada `nuxt.config.ts` disesuaikan ke root domain `https://sinjaikab.go.id` dengan dukungan *fallback environment variable*.
- Penyederhanaan teks pada footer menjadi "Diskominfo-SP Sinjai".
- Penyesuaian perintah penyalinan berkas `.htaccess` pada `.cpanel.yml`.

### Fixed
- Kendala koneksi TLS timeout pada GitHub Actions FTP deploy dengan menambahkan `protocol: ftp`, pengaturan `port: 21`, dan peningkatan timeout.
- Pembaruan versi Node.js runner pada workflow ke versi 22.

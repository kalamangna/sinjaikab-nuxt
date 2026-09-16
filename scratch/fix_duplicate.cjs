const fs = require('fs');
let content = fs.readFileSync('pages/informasi/index.vue', 'utf8');

// Remove the duplicate block from my previous script
content = content.replace(/const pageTitle = computed\(\(\) => \{\r?\n    if \(filters\.value\.jenis_dokumen\) \{\r?\n        return `Dokumen \$\{filters\.value\.jenis_dokumen\}`\r?\n    \} else if \(filters\.value\.kategori\) \{\r?\n        return `Informasi \$\{filters\.value\.kategori\}`\r?\n    \}\r?\n    return 'Informasi Pemkab'\r?\n\}\)\r?\n\r?\nconst pageDescription = computed\(\(\) => \{\r?\n    if \(filters\.value\.jenis_dokumen \|\| filters\.value\.kategori\) \{\r?\n        return `Menampilkan daftar \$\{filters\.value\.jenis_dokumen \? 'dokumen ' \+ filters\.value\.jenis_dokumen : 'informasi kategori ' \+ filters\.value\.kategori\} Pemerintah Kabupaten Sinjai yang dapat diakses oleh publik secara terbuka\.`\r?\n    \}\r?\n    return 'Transparansi Dokumen Pemerintah Kabupaten yang dapat Anda akses, telusuri, dan unduh dengan mudah\.'\r?\n\}\)\r?\n/, '');

// Replace the original pageTitle with the new logic
const correctPageTitle = `const pageTitle = computed(() => {
  if (filters.value.jenis_dokumen) {
    return \`Dokumen \${filters.value.jenis_dokumen}\`
  } else if (filters.value.kategori) {
    return \`Informasi Kategori \${filters.value.kategori}\`
  }
  return 'Informasi Pemkab'
})

const pageDescription = computed(() => {
  if (filters.value.jenis_dokumen || filters.value.kategori) {
    return \`Menampilkan daftar \${filters.value.jenis_dokumen ? 'dokumen ' + filters.value.jenis_dokumen : 'informasi kategori ' + filters.value.kategori} Pemerintah Kabupaten Sinjai yang dapat diakses oleh publik secara terbuka.\`
  }
  return 'Transparansi Dokumen Pemerintah Kabupaten yang dapat Anda akses, telusuri, dan unduh dengan mudah.'
})`;

content = content.replace(/const pageTitle = computed\(\(\) => \{[\s\S]*?return title\r?\n\}\)/, correctPageTitle);

fs.writeFileSync('pages/informasi/index.vue', content);

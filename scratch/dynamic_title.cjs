const fs = require('fs');
let content = fs.readFileSync('pages/informasi/index.vue', 'utf8');

// Use regex to be resilient against Windows (\r\n) or Unix (\n) line endings
content = content.replace(
  /Informasi Pemkab\s*<\/h1>/,
  '{{ pageTitle }}\n                    </h1>'
);

content = content.replace(
  /Transparansi Dokumen Pemerintah Kabupaten yang dapat Anda akses, telusuri, dan unduh dengan mudah.\s*<\/p>/,
  '{{ pageDescription }}\n            </p>'
);

const computedBlock = `const pageTitle = computed(() => {
    if (filters.value.jenis_dokumen) {
        return \`Dokumen \${filters.value.jenis_dokumen}\`
    } else if (filters.value.kategori) {
        return \`Informasi \${filters.value.kategori}\`
    }
    return 'Informasi Pemkab'
})

const pageDescription = computed(() => {
    if (filters.value.jenis_dokumen || filters.value.kategori) {
        return \`Menampilkan daftar \${filters.value.jenis_dokumen ? 'dokumen ' + filters.value.jenis_dokumen : 'informasi kategori ' + filters.value.kategori} Pemerintah Kabupaten Sinjai yang dapat diakses oleh publik secara terbuka.\`
    }
    return 'Transparansi Dokumen Pemerintah Kabupaten yang dapat Anda akses, telusuri, dan unduh dengan mudah.'
})
`;

content = content.replace('const filters = ref({', computedBlock + '\nconst filters = ref({');

fs.writeFileSync('pages/informasi/index.vue', content);

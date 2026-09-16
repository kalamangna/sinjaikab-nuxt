const fs = require('fs');
let content = fs.readFileSync('pages/informasi/[slug].vue', 'utf8');

const newScript = `<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const slug = route.params.slug

const { data: detailData, pending: isLoading } = useAsyncData(
  'informasi-' + slug,
  () => $fetch('https://ppidkab.sinjaikab.go.id/api/v1/informasi-pemkab/' + slug)
)

const dokumen = computed(() => detailData.value?.data || null)
const error = computed(() => !dokumen.value && !isLoading.value)

const getDownloadUrl = (dok) => {
  if (!dok) return '#'
  return \`https://ppidkab.sinjaikab.go.id/transparansi/informasi-pemkab/\${dok.slug || dok.id}/download\`
}

const getAssetUrl = (path) => \`https://ppidkab.sinjaikab.go.id/\${path}\`

const getStorageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return \`https://ppidkab.sinjaikab.go.id/storage/\${path}\`;
}

const getEmbedUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) {
      if (path.includes('drive.google.com/file/d/')) {
          return path.replace(/\\/view\\?.*$/, '/preview');
      }
      return path;
  }
  return getStorageUrl(path) + '#toolbar=0';
}

const isGoogleDriveFolder = (path) => {
  if (!path) return false;
  return path.includes('drive.google.com/drive/folders') || (path.includes('drive.google.com') && !path.includes('/file/d/'));
}

const isExternalWebpage = (path) => {
  if (!path) return false;
  return path.startsWith('http') && !isGoogleDriveFolder(path) && !path.includes('drive.google.com/file/d/');
}

const isImage = (path) => {
  if (!path) return false
  const ext = path.split('.').pop().toLowerCase()
  return ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'].includes(ext)
}

const copyShareLink = (dok) => {
  if (!dok) return;
  const dokSlug = dok.slug || dok.id;
  const url = \`https://sinjaikab.go.id/informasi/\${dokSlug}\`;
  
  navigator.clipboard.writeText(url).then(() => {
    alert('Tautan berhasil disalin!');
  }).catch(err => {
    prompt('Salin tautan berikut secara manual:', url);
  });
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

useHead(computed(() => ({
  title: dokumen.value ? \`\${dokumen.value.judul} - Informasi Pemkab\` : 'Informasi Pemkab'
})))
</script>`;

content = content.replace(/<script setup>[\s\S]*?<\/script>/, newScript);
fs.writeFileSync('pages/informasi/[slug].vue', content);

<script setup lang="ts">
const accessKey = ref('');
const isAuthenticated = ref(false);
const authError = ref('');
const loading = ref(false);
const stats = ref<any>(null);
const lastUpdated = ref('');

let refreshInterval: any = null;

onMounted(() => {
  const savedKey = sessionStorage.getItem('a11y_admin_key');
  if (savedKey) {
    accessKey.value = savedKey;
    fetchStats();
  }
});

onUnmounted(() => {
  stopAutoRefresh();
});

function startAutoRefresh() {
  stopAutoRefresh();
  refreshInterval = setInterval(() => {
    if (isAuthenticated.value && !loading.value) {
      fetchStats(true); // background silent refresh
    }
  }, 10000);
}

function stopAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
}

async function handleLogin() {
  if (!accessKey.value.trim()) {
    authError.value = 'Kunci akses wajib diisi.';
    return;
  }
  authError.value = '';
  await fetchStats();
}

async function fetchStats(isSilent = false) {
  if (!isSilent) loading.value = true;
  authError.value = '';
  try {
    const res: any = await $fetch(`/api/a11y/stats?_t=${Date.now()}`, {
      headers: {
        'x-a11y-key': accessKey.value.trim(),
      },
    });

    if (res && res.success) {
      stats.value = res.data;
      lastUpdated.value = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      isAuthenticated.value = true;
      sessionStorage.setItem('a11y_admin_key', accessKey.value.trim());
      if (!refreshInterval) startAutoRefresh();
    }
  } catch (err: any) {
    if (!isSilent) {
      isAuthenticated.value = false;
      authError.value = err.data?.statusMessage || 'Kunci akses tidak valid.';
      sessionStorage.removeItem('a11y_admin_key');
      stopAutoRefresh();
    }
  } finally {
    if (!isSilent) loading.value = false;
  }
}

function handleLogout() {
  stopAutoRefresh();
  isAuthenticated.value = false;
  accessKey.value = '';
  sessionStorage.removeItem('a11y_admin_key');
}

function formatDate(isoStr: string) {
  if (!isoStr) return '-';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoStr;
  }
}

function formatRelativeTime(isoStr: string) {
  if (!isoStr) return '-';
  try {
    const now = new Date().getTime();
    const past = new Date(isoStr).getTime();
    const diffSec = Math.floor((now - past) / 1000);

    if (diffSec < 60) return 'Baru saja';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} mnt lalu`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} jam lalu`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay} hr lalu`;
  } catch {
    return isoStr;
  }
}

const FEATURE_LABELS: Record<string, string> = {
  dyslexiaFont: 'Font Disleksia',
  contrast: 'Kontras Warna',
  textSize: 'Ukuran Teks',
  textSpacing: 'Jarak Teks',
  highlightLinks: 'Sorot Tautan',
  cursor: 'Kursor Besar',
  pauseAnimations: 'Hentikan Animasi',
};

function getFeatureLabel(key: string) {
  return FEATURE_LABELS[key] || key;
}

function getEventDescription(event: any) {
  const type = event.event_type || event.type;
  const feat = event.feature_name || event.feature;
  const val = event.feature_value || event.value;

  if (type === 'impression') return { label: 'Tayangan Widget', badge: 'bg-slate-100 text-slate-600 border-slate-200' };
  if (type === 'modal_open') return { label: 'Buka Panel', badge: 'bg-sky-50 text-sky-700 border-sky-200' };
  if (type === 'reset') return { label: 'Reset Opsi', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
  if (type === 'feature_toggle') {
    const featName = getFeatureLabel(feat);
    const detail = val && val !== 'true' ? `: ${val}` : '';
    return { label: `${featName}${detail}`, badge: 'bg-blue-50 text-blue-700 border-blue-200' };
  }
  return { label: type || 'Interaksi', badge: 'bg-slate-100 text-slate-600 border-slate-200' };
}

const totalFeatureUsage = computed(() => {
  if (!stats.value?.featureCounts) return 0;
  return Object.values(stats.value.featureCounts).reduce((a: any, b: any) => a + Number(b), 0);
});

const sortedFeatureList = computed(() => {
  if (!stats.value?.featureCounts) return [];
  const total = totalFeatureUsage.value || 1;
  return Object.entries(stats.value.featureCounts)
    .map(([key, count]: [string, any]) => ({
      key,
      label: getFeatureLabel(key),
      count: Number(count),
      percentage: Math.round((Number(count) / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
    <!-- Header Minimalis -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/sinjai.png" alt="Lambang Daerah Sinjai" class="h-8 w-auto object-contain" />
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm sm:text-base text-slate-900">Statistik Aksesibilitas</span>
            <span class="text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
              a11y-sinjaikab
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            class="text-xs text-slate-600 hover:text-slate-900 font-medium px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span class="hidden sm:inline">Portal Utama</span>
          </a>

          <template v-if="isAuthenticated">
            <button
              @click="fetchStats"
              :disabled="loading"
              class="text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 font-medium px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-sm"
              title="Segarkan data"
            >
              <i :class="['fa-solid fa-rotate-right text-[11px]', loading ? 'animate-spin text-blue-600' : '']"></i>
              <span class="hidden sm:inline">Segarkan</span>
            </button>
            <button
              @click="handleLogout"
              class="text-xs text-rose-700 hover:bg-rose-50 border border-rose-200 font-medium px-2.5 py-1.5 rounded-lg transition"
            >
              Keluar
            </button>
          </template>
        </div>
      </div>
    </header>

    <!-- Konten Utama -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <!-- Form Kunci Akses (Jika Belum Login) -->
      <div v-if="!isAuthenticated" class="max-w-sm mx-auto my-16 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 class="text-sm font-bold text-slate-900 text-center mb-1">Kunci Akses Admin</h2>
        <p class="text-xs text-slate-500 text-center mb-5">Masukkan kunci akses untuk melihat data pemakaian widget.</p>

        <form @submit.prevent="handleLogin" class="space-y-3">
          <div>
            <input
              v-model="accessKey"
              type="password"
              placeholder="Masukkan kunci akses..."
              class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              required
            />
          </div>

          <p v-if="authError" class="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-md p-2 text-center">
            {{ authError }}
          </p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition shadow-sm"
          >
            <span v-if="!loading">Buka Data</span>
            <span v-else class="flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-spinner animate-spin"></i> Memuat...
            </span>
          </button>
        </form>
      </div>

      <!-- Tampilan Data (Jika Sudah Login) -->
      <div v-else class="space-y-6">
        <!-- 4 Kartu Metrik Ringkas -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <!-- Total Website Terpasang -->
          <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span class="text-xs text-slate-500 font-medium block">Website Terpasang</span>
            <div class="mt-1 flex items-baseline gap-1.5">
              <span class="text-2xl font-bold text-slate-900">{{ stats?.totalDomains || 0 }}</span>
              <span class="text-xs text-slate-500">domain</span>
            </div>
          </div>

          <!-- Total Tayangan -->
          <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span class="text-xs text-slate-500 font-medium block">Total Tayangan</span>
            <div class="mt-1 flex items-baseline gap-1.5">
              <span class="text-2xl font-bold text-slate-900">{{ stats?.totalImpressions || 0 }}</span>
              <span class="text-xs text-slate-500">kali muat</span>
            </div>
          </div>

          <!-- Buka Panel Aksesibilitas -->
          <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span class="text-xs text-slate-500 font-medium block">Buka Panel</span>
            <div class="mt-1 flex items-baseline gap-1.5">
              <span class="text-2xl font-bold text-slate-900">{{ stats?.totalModalOpens || 0 }}</span>
              <span class="text-xs text-slate-500">interaksi</span>
            </div>
          </div>

          <!-- Total Fitur Diaktifkan -->
          <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span class="text-xs text-slate-500 font-medium block">Fitur Digunakan</span>
            <div class="mt-1 flex items-baseline gap-1.5">
              <span class="text-2xl font-bold text-slate-900">{{ totalFeatureUsage }}</span>
              <span class="text-xs text-slate-500">aktivasi</span>
            </div>
          </div>
        </div>

        <!-- Bagian Grid: Distribusi Fitur & Website Terpasang -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Distribusi Penggunaan Fitur (1 Kolom) -->
          <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div class="px-5 py-3.5 border-b border-slate-100">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700">Preferensi Fitur</h3>
              <p class="text-[11px] text-slate-400 mt-0.5">Fitur yang paling sering diaktifkan pengunjung</p>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-center">
              <div v-if="!sortedFeatureList.length" class="text-center py-6 text-slate-400 text-xs">
                Belum ada data aktivasi fitur.
              </div>
              <div v-else class="space-y-3.5">
                <div v-for="item in sortedFeatureList" :key="item.key" class="space-y-1">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-medium text-slate-700">{{ item.label }}</span>
                    <span class="text-slate-500 text-[11px]">{{ item.count }}x ({{ item.percentage }}%)</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      class="bg-slate-700 h-1.5 rounded-full transition-all duration-500"
                      :style="{ width: `${item.percentage}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Daftar Website Terpasang (2 Kolom) -->
          <div class="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700">Website Terpasang</h3>
                <p class="text-[11px] text-slate-400 mt-0.5">Daftar domain yang aktif memuat widget</p>
              </div>
              <div class="flex items-center gap-2 text-[11px] text-slate-400">
                <span class="inline-flex items-center gap-1.5 text-emerald-600 font-medium bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live (10s)
                </span>
                <span>Sinkron {{ lastUpdated }}</span>
              </div>
            </div>

            <div class="overflow-x-auto flex-1">
              <table class="w-full text-left text-xs text-slate-700">
                <thead class="text-[11px] uppercase bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th class="px-5 py-3">Domain Website</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Terakhir Aktif</th>
                    <th class="px-5 py-3 text-right">Tayangan</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-if="!stats?.domains?.length">
                    <td colspan="4" class="text-center py-8 text-slate-400 text-xs">
                      Belum ada website yang tercatat.
                    </td>
                  </tr>
                  <tr
                    v-for="dom in stats?.domains"
                    :key="dom.domain"
                    class="hover:bg-slate-50/70 transition"
                  >
                    <td class="px-5 py-3 font-medium text-slate-900">
                      <a
                        :href="`https://${dom.domain}`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:text-blue-600 inline-flex items-center gap-1.5 transition"
                      >
                        <span>{{ dom.domain }}</span>
                        <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
                      </a>
                    </td>
                    <td class="px-4 py-3">
                      <span class="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Aktif
                      </span>
                    </td>
                    <td class="px-4 py-3 text-slate-500">
                      {{ formatDate(dom.last_active_at) }}
                    </td>
                    <td class="px-5 py-3 text-right font-medium text-slate-900">
                      {{ dom.total_impressions || 1 }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tabel Log Interaksi Terkini -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700">Riwayat Interaksi Terkini</h3>
              <p class="text-[11px] text-slate-400 mt-0.5">Aktivitas penggunaan langsung dari pengunjung web</p>
            </div>
            <span class="text-[11px] text-slate-400">30 interaksi terakhir</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="text-[11px] uppercase bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th class="px-5 py-3 w-28">Waktu</th>
                  <th class="px-4 py-3 w-44">Domain</th>
                  <th class="px-4 py-3">Jenis Interaksi</th>
                  <th class="px-5 py-3 text-right">Halaman (Path)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-if="!stats?.recentEvents?.length">
                  <td colspan="4" class="text-center py-8 text-slate-400 text-xs">
                    Belum ada interaksi yang terekam.
                  </td>
                </tr>
                <tr
                  v-for="(evt, idx) in stats?.recentEvents"
                  :key="idx"
                  class="hover:bg-slate-50/70 transition"
                >
                  <td class="px-5 py-2.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    {{ formatRelativeTime(evt.created_at) }}
                  </td>
                  <td class="px-4 py-2.5 font-medium text-slate-800 whitespace-nowrap">
                    {{ evt.domain }}
                  </td>
                  <td class="px-4 py-2.5">
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border',
                        getEventDescription(evt).badge
                      ]"
                    >
                      {{ getEventDescription(evt).label }}
                    </span>
                  </td>
                  <td class="px-5 py-2.5 text-right font-mono text-slate-500 text-[11px] truncate max-w-xs" :title="evt.path">
                    {{ evt.path || '/' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

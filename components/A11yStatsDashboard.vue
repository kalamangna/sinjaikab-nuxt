<script setup lang="ts">
const accessKey = ref('');
const isAuthenticated = ref(false);
const authError = ref('');
const loading = ref(false);
const stats = ref<any>(null);
const lastUpdated = ref('');

// Check saved key on mount
onMounted(() => {
  const savedKey = sessionStorage.getItem('a11y_admin_key');
  if (savedKey) {
    accessKey.value = savedKey;
    fetchStats();
  }
});

async function handleLogin() {
  if (!accessKey.value.trim()) {
    authError.value = 'Silakan masukkan kunci akses admin.';
    return;
  }
  authError.value = '';
  await fetchStats();
}

async function fetchStats() {
  loading.value = true;
  authError.value = '';
  try {
    const res: any = await $fetch('/api/a11y/stats', {
      headers: {
        'x-a11y-key': accessKey.value.trim(),
      },
    });

    if (res && res.success) {
      stats.value = res.data;
      lastUpdated.value = new Date().toLocaleTimeString('id-ID');
      isAuthenticated.value = true;
      sessionStorage.setItem('a11y_admin_key', accessKey.value.trim());
    }
  } catch (err: any) {
    isAuthenticated.value = false;
    authError.value = err.data?.statusMessage || 'Kunci akses salah atau server tidak merespons.';
    sessionStorage.removeItem('a11y_admin_key');
  } finally {
    loading.value = false;
  }
}

function handleLogout() {
  isAuthenticated.value = false;
  accessKey.value = '';
  sessionStorage.removeItem('a11y_admin_key');
}

const featureLabels: Record<string, { label: string; icon: string; color: string }> = {
  dyslexiaFont: { label: 'Font Disleksia', icon: 'fa-solid fa-font', color: 'bg-indigo-500' },
  contrast: { label: 'Mode Kontras', icon: 'fa-solid fa-circle-half-stroke', color: 'bg-amber-500' },
  textSize: { label: 'Ukuran Teks', icon: 'fa-solid fa-text-height', color: 'bg-blue-500' },
  textSpacing: { label: 'Jarak Spasi', icon: 'fa-solid fa-arrows-left-right', color: 'bg-emerald-500' },
  highlightLinks: { label: 'Sorot Tautan', icon: 'fa-solid fa-link', color: 'bg-pink-500' },
  cursor: { label: 'Kursor & Panduan', icon: 'fa-solid fa-mouse-pointer', color: 'bg-purple-500' },
  pauseAnimations: { label: 'Hentikan Animasi', icon: 'fa-solid fa-pause', color: 'bg-rose-500' },
};

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
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white">
    <!-- Navbar Dashboard -->
    <header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/sinjai.png" alt="Logo Sinjai" class="h-9 w-auto object-contain" />
          <div>
            <h1 class="font-bold text-sm sm:text-base leading-tight tracking-tight flex items-center gap-2">
              Statistik Aksesibilitas
              <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                a11y-sinjaikab
              </span>
            </h1>
            <p class="text-xs text-slate-400 hidden sm:block">Pemerintah Kabupaten Sinjai</p>
          </div>
        </div>

        <div v-if="isAuthenticated" class="flex items-center gap-3">
          <span class="text-xs text-slate-400 hidden md:inline">Terakhir diperbarui: {{ lastUpdated }}</span>
          <button
            @click="fetchStats"
            :disabled="loading"
            class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
          >
            <i :class="['fa-solid fa-rotate-right', loading ? 'animate-spin' : '']"></i>
            <span>Segarkan</span>
          </button>
          <button
            @click="handleLogout"
            class="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold border border-rose-800/40 transition"
          >
            Keluar
          </button>
        </div>
      </div>
    </header>

    <!-- Content Area -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Login Card (If not authenticated) -->
      <div v-if="!isAuthenticated" class="max-w-md mx-auto my-16 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div class="text-center mb-6">
          <div class="inline-flex p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-3">
            <i class="fa-solid fa-shield-halved text-2xl"></i>
          </div>
          <h2 class="text-lg font-bold text-white">Akses Dashboard Telemetri</h2>
          <p class="text-xs text-slate-400 mt-1">Masukkan kunci akses admin untuk melihat statistik pemakaian widget.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Kunci Akses Admin (Secret Key)</label>
            <input
              v-model="accessKey"
              type="password"
              placeholder="Masukkan kunci akses..."
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              required
            />
          </div>

          <p v-if="authError" class="text-xs text-rose-400 bg-rose-950/30 border border-rose-800/40 rounded-lg p-2.5 text-center">
            {{ authError }}
          </p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold transition shadow-lg shadow-blue-600/30"
          >
            <span v-if="!loading">Buka Dashboard</span>
            <span v-else class="flex items-center justify-center gap-2">
              <i class="fa-solid fa-spinner animate-spin"></i> Memeriksa...
            </span>
          </button>
        </form>
      </div>

      <!-- Authenticated Dashboard -->
      <div v-else class="space-y-8">
        <!-- KPI Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Total Domains -->
          <div class="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Website Terpasang</span>
              <span class="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <i class="fa-solid fa-globe"></i>
              </span>
            </div>
            <div class="mt-3">
              <span class="text-3xl font-extrabold text-white tracking-tight">{{ stats?.totalDomains || 0 }}</span>
              <span class="text-xs text-slate-400 ml-2">domain</span>
            </div>
            <p class="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
              <i class="fa-solid fa-circle-check text-[9px]"></i> Aktif terdaftar
            </p>
          </div>

          <!-- Total Impressions -->
          <div class="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Impresi</span>
              <span class="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <i class="fa-solid fa-eye"></i>
              </span>
            </div>
            <div class="mt-3">
              <span class="text-3xl font-extrabold text-white tracking-tight">{{ stats?.totalImpressions || 0 }}</span>
              <span class="text-xs text-slate-400 ml-2">tayangan</span>
            </div>
            <p class="text-[11px] text-slate-400 mt-2">Pemuatan widget di browser</p>
          </div>

          <!-- Modal Opens -->
          <div class="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Interaksi Panel</span>
              <span class="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <i class="fa-solid fa-hand-pointer"></i>
              </span>
            </div>
            <div class="mt-3">
              <span class="text-3xl font-extrabold text-white tracking-tight">{{ stats?.totalModalOpens || 0 }}</span>
              <span class="text-xs text-slate-400 ml-2">klik buka</span>
            </div>
            <p class="text-[11px] text-slate-400 mt-2">Pengguna membuka pengaturan</p>
          </div>

          <!-- Events Sampled -->
          <div class="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aktivasi Fitur</span>
              <span class="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <i class="fa-solid fa-sliders"></i>
              </span>
            </div>
            <div class="mt-3">
              <span class="text-3xl font-extrabold text-white tracking-tight">
                {{ Object.values(stats?.featureCounts || {}).reduce((a: any, b: any) => a + b, 0) }}
              </span>
              <span class="text-xs text-slate-400 ml-2">kali</span>
            </div>
            <p class="text-[11px] text-slate-400 mt-2">Preferensi diubah pembaca</p>
          </div>
        </div>

        <!-- Middle Section: Feature Distribution -->
        <div class="bg-slate-950 border border-slate-800 rounded-2xl p-6">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h2 class="text-base font-bold text-white">Distribusi Penggunaan Fitur Aksesibilitas</h2>
              <p class="text-xs text-slate-400 mt-0.5">Memetakan fitur yang paling banyak membantu masyarakat berkebutuhan khusus.</p>
            </div>
          </div>

          <div v-if="Object.keys(stats?.featureCounts || {}).length === 0" class="text-center py-8 text-slate-500 text-xs">
            Belum ada data aktivasi fitur yang tercatat.
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(count, featureKey) in stats.featureCounts"
              :key="featureKey"
              class="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800/80"
            >
              <div class="flex items-center gap-3">
                <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs', featureLabels[featureKey as string]?.color || 'bg-slate-700']">
                  <i :class="featureLabels[featureKey as string]?.icon || 'fa-solid fa-gear'"></i>
                </div>
                <div>
                  <p class="text-xs font-semibold text-white">
                    {{ featureLabels[featureKey as string]?.label || featureKey }}
                  </p>
                  <p class="text-[11px] text-slate-400">Total interaksi</p>
                </div>
              </div>
              <span class="text-base font-bold text-white font-mono">{{ count }}</span>
            </div>
          </div>
        </div>

        <!-- Domains Table -->
        <div class="bg-slate-950 border border-slate-800 rounded-2xl p-6 overflow-hidden">
          <div class="mb-4">
            <h2 class="text-base font-bold text-white">Daftar Website & Portal Terpasang</h2>
            <p class="text-xs text-slate-400 mt-0.5">Semua domain publik di lingkungan Kabupaten Sinjai yang menggunakan widget.</p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-300">
              <thead class="text-[11px] uppercase bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th class="px-4 py-3 rounded-l-lg">Domain Website</th>
                  <th class="px-4 py-3">Pertama Terdeteksi</th>
                  <th class="px-4 py-3">Terakhir Aktif</th>
                  <th class="px-4 py-3">Total Impresi</th>
                  <th class="px-4 py-3 text-right rounded-r-lg">Tindakan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 font-mono">
                <tr v-if="!stats?.domains?.length">
                  <td colspan="5" class="text-center py-6 text-slate-500 font-sans">
                    Belum ada domain terdaftar. Pasang widget di website untuk mulai melacak.
                  </td>
                </tr>
                <tr v-for="dom in stats?.domains" :key="dom.domain" class="hover:bg-slate-900/50 transition">
                  <td class="px-4 py-3 font-semibold text-white flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {{ dom.domain }}
                  </td>
                  <td class="px-4 py-3 text-slate-400 font-sans">{{ formatDate(dom.first_seen_at) }}</td>
                  <td class="px-4 py-3 text-slate-400 font-sans">{{ formatDate(dom.last_active_at) }}</td>
                  <td class="px-4 py-3 text-slate-200">{{ dom.total_impressions || 1 }}</td>
                  <td class="px-4 py-3 text-right font-sans">
                    <a
                      :href="`https://${dom.domain}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] inline-flex items-center gap-1 transition"
                    >
                      Kunjungi <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Live Activity Feed -->
        <div class="bg-slate-950 border border-slate-800 rounded-2xl p-6">
          <div class="mb-4">
            <h2 class="text-base font-bold text-white">Aktivitas Terkini (Realtime Feed)</h2>
            <p class="text-xs text-slate-400 mt-0.5">30 log interaksi aksesibilitas terakhir dari seluruh website.</p>
          </div>

          <div class="divide-y divide-slate-800/60 max-h-80 overflow-y-auto">
            <div v-if="!stats?.recentEvents?.length" class="text-center py-6 text-slate-500 text-xs">
              Belum ada log aktivitas.
            </div>
            <div
              v-for="ev in stats?.recentEvents"
              :key="ev.id || ev.created_at"
              class="py-3 flex items-center justify-between text-xs hover:bg-slate-900/30 px-2 rounded-lg transition"
            >
              <div class="flex items-center gap-3">
                <span
                  :class="[
                    'px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider',
                    ev.event_type === 'impression'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : ev.event_type === 'modal_open'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-blue-500/20 text-blue-400',
                  ]"
                >
                  {{ ev.event_type || ev.type }}
                </span>
                <span class="font-mono text-slate-300 font-semibold">{{ ev.domain }}</span>
                <span v-if="ev.feature_name || ev.feature" class="text-slate-400 font-sans text-[11px]">
                  (Fitur: {{ ev.feature_name || ev.feature }} = {{ ev.feature_value || ev.value }})
                </span>
              </div>
              <span class="text-slate-500 text-[11px]">{{ formatDate(ev.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

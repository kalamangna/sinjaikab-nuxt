<template>
  <div>
    <div class="relative bg-gradient-to-br from-red-900 via-red-800 to-red-600 pt-20 md:pt-24 pb-32 md:pb-36 overflow-hidden">
        <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div class="container mx-auto px-4 md:px-6 relative z-10 text-center">

            <div class="flex justify-center items-center mt-6 md:mt-8 mb-4 flex-col">
                <picture class="mb-4">
                    <source srcset="/sinjai.webp" type="image/webp" />
                    <img
                        src="/sinjai.png"
                        alt="Lambang Daerah Kabupaten Sinjai"
                        class="h-20 md:h-24 w-auto object-contain drop-shadow-xl"
                        decoding="async"
                    />
                </picture>
                <div class="w-full relative">
                    <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                        {{ pageTitle }}
                    </h1>
                </div>
            </div>
            <p class="text-red-100 text-lg md:text-xl max-w-3xl mx-auto font-light mt-4 mb-4 md:mb-6">
                Akses dan unduh dokumen resmi Pemerintah Kabupaten Sinjai secara transparan.
            </p>
        </div>
        
        <div class="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none transform translate-y-1">
            <svg class="relative block w-full h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,121.22,201.2,110.53Z" class="fill-slate-50"></path>
            </svg>
        </div>
    </div>

    <div class="bg-slate-50 pb-28 md:pb-36">
        <div class="container mx-auto px-4 md:px-6 -mt-12 md:-mt-16 relative z-20">
            <!-- Notifikasi -->
            <div v-if="notification.message" 
                 :class="[
                   'mb-6 px-6 py-4 rounded-2xl shadow-sm flex items-start backdrop-blur-sm relative z-50 border',
                   notification.type === 'red' ? 'bg-red-50/90 border-red-200 text-red-700' : 'bg-emerald-50/90 border-emerald-200 text-emerald-700'
                 ]">
                <div class="flex-shrink-0 mt-0.5">
                    <i :class="notification.type === 'red' ? 'fas fa-exclamation-circle text-red-600 text-xl' : 'fas fa-check-circle text-emerald-600 text-xl'"></i>
                </div>
                <div class="ml-4 flex-1">
                    <h3 class="text-sm font-bold" :class="notification.type === 'red' ? 'text-red-800' : 'text-emerald-800'">
                        {{ notification.type === 'red' ? 'Perhatian' : 'Berhasil' }}
                    </h3>
                    <p class="mt-1 text-sm">{{ notification.message }}</p>
                </div>
                <button @click="notification.message = ''" class="ml-auto pl-3 text-slate-400 hover:text-slate-500 focus:outline-none">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center bg-white p-5 sm:p-6 lg:p-7 rounded-3xl shadow-sm border border-slate-100 hover:border-red-100/80 transition-all duration-300 mb-8 sm:mb-10 relative z-50">
                    <div class="flex-1 relative" style="z-index: 50;">
                        <CustomSelect 
                            v-model="filters.kategori" 
                            :options="kategoriOptions" 
                            labelKey="label" 
                            valueKey="value" 
                            placeholder="Semua Kategori"
                            @change="resetJenis"
                            class="w-full"
                        />
                    </div>
                    
                    <div class="flex-1 relative" style="z-index: 49;">
                        <CustomSelect 
                            v-model="filters.jenis_dokumen" 
                            :options="jenisDokumenOptions" 
                            labelKey="label" 
                            valueKey="value" 
                            placeholder="Semua Jenis Dokumen"
                            @change="applyFilters"
                            class="w-full transition-opacity"
                        />
                    </div>

                    <div class="flex-1 relative" style="z-index: 48;">
                        <CustomSelect 
                            v-model="filters.tahun" 
                            :options="tahunOptions" 
                            labelKey="label" 
                            valueKey="value" 
                            placeholder="Semua Tahun"
                            @change="applyFilters"
                            class="w-full"
                        />
                    </div>

                    <div class="flex-1 relative" style="z-index: 47;">
                        <div class="relative">
                            <input 
                                type="text" 
                                v-model="filters.search" 
                                @keyup.enter="applyFilters"
                                placeholder="Cari dokumen..." 
                                class="w-full h-[48px] pl-10 pr-4 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-700/10 focus:border-red-700 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white text-slate-800"
                            >
                            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <i class="fas fa-search text-xs"></i>
                            </div>
                        </div>
                    </div>

                    <div class="w-full lg:w-auto flex-none flex gap-2">
                        <button @click="applyFilters" class="flex-1 lg:flex-none w-full lg:w-12 bg-red-700 hover:bg-red-800 text-white shadow-lg shadow-red-900/20 rounded-2xl h-[48px] transition-all flex items-center justify-center font-bold" title="Terapkan Filter">
                            <i class="fas fa-search lg:mr-0"></i> <span class="inline lg:hidden ml-2 font-bold uppercase tracking-wider text-xs">Cari</span>
                        </button>
                        <button @click="resetFilters" class="flex-1 lg:flex-none w-full lg:w-12 bg-slate-100 hover:bg-slate-200 text-slate-600 shadow-sm rounded-2xl h-[48px] transition-all flex items-center justify-center border border-slate-200" title="Reset Filter">
                            <i class="fas fa-undo-alt lg:mr-0"></i> <span class="inline lg:hidden ml-2 font-semibold text-xs">Reset</span>
                        </button>
                    </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
                <div class="flex items-center gap-3">
                    <h2 class="text-2xl font-black text-slate-900 uppercase tracking-tight">Daftar Dokumen</h2>
                    <span v-if="!isLoading && totalItems > 0" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200/60 shadow-sm">
                        {{ totalItems }} Dokumen
                    </span>
                    <span v-else-if="isLoading && totalItems === 0" class="inline-block h-6 w-24 bg-slate-200/70 rounded-full animate-pulse"></span>
                </div>
                <div v-if="!isLoading && totalItems > 0" class="text-xs font-medium text-slate-500">
                    Menampilkan <span class="font-bold text-slate-800">{{ (currentPage - 1) * Number(filters.per_page) + 1 }}-{{ Math.min(currentPage * Number(filters.per_page), totalItems) }}</span> dari <span class="font-bold text-slate-800">{{ totalItems }}</span> dokumen
                </div>
                <div v-else-if="isLoading && totalItems === 0" class="h-4 w-44 bg-slate-200/60 rounded-md animate-pulse"></div>
            </div>

            <!-- Daftar Dokumen -->
            <ClientOnly>
                <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative min-h-[400px] hover:border-red-100/50 transition-all duration-300" style="z-index: 10;">
                    
                    <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden" style="opacity: 0.03;">
                        <div class="w-full h-full" :style="{ backgroundImage: `url(${getAssetUrl('storage/logo/Lambang_Kabupaten_Sinjai.png')})`, backgroundRepeat: 'repeat-y', backgroundPosition: 'center top', backgroundSize: 'contain', minHeight: '800px', filter: 'grayscale(100%)' }"></div>
                    </div>

                    <!-- Overlay Loading (Saat update halaman / pagination ketika data sudah ada) -->
                    <div v-if="isLoading && items.length > 0" class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/75 backdrop-blur-[2px] rounded-3xl transition-all duration-300">
                        <i class="fas fa-circle-notch fa-spin text-4xl text-red-700 mb-3"></i>
                        <p class="text-slate-700 font-bold text-sm tracking-wide">Memperbarui data...</p>
                    </div>

                    <!-- KONDISI 1: DATA DOKUMEN ADA -->
                    <template v-if="items.length > 0">
                        <div class="hidden md:block overflow-x-hidden relative z-10 w-full">
                            <table class="w-full bg-transparent table-fixed">
                                <thead>
                                    <tr class="bg-slate-50 border-b border-slate-200 text-left">
                                        <th class="py-4 px-4 font-bold text-slate-700 text-xs tracking-wider uppercase w-14 text-center">No</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase">Detail Dokumen</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase w-48">Kategori & Jenis</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase w-56">Sumber</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase w-36 text-center">Tanggal</th>
                                        <th class="py-4 px-4 font-bold text-slate-700 text-xs tracking-wider uppercase w-20 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    <tr v-for="(dokumen, index) in items" :key="dokumen.id" class="transition-colors group hover:bg-red-50/40">
                                        <td class="py-4 px-4 text-center align-middle font-semibold text-slate-400 text-sm">
                                            {{ (currentPage - 1) * Number(filters.per_page) + index + 1 }}
                                        </td>
                                        <td class="py-4 px-6 whitespace-normal align-middle">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0">
                                                    <div class="w-11 h-11 rounded-2xl bg-red-50 border border-red-100/60 text-red-700 flex items-center justify-center shadow-sm group-hover:bg-red-700 group-hover:text-white transition-colors duration-300">
                                                        <i class="fas fa-file-pdf text-lg"></i>
                                                    </div>
                                                </div>
                                                <div class="ml-4">
                                                    <NuxtLink :to="`/informasi/${dokumen.slug || dokumen.id}`" class="block text-base font-bold text-slate-900 hover:text-red-700 transition-all duration-300 leading-tight line-clamp-1 group-hover:line-clamp-none">
                                                        {{ dokumen.judul }}
                                                    </NuxtLink>
                                                    <p v-if="dokumen.deskripsi" class="text-sm text-slate-500 mt-1 transition-all duration-300 line-clamp-1 group-hover:line-clamp-none">
                                                        {{ dokumen.deskripsi }}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 px-6 whitespace-normal align-middle">
                                            <span class="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200/60 mb-1">
                                                {{ dokumen.kategori }}
                                            </span>
                                            <br>
                                            <span class="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-100 mt-1">
                                                {{ dokumen.jenis_dokumen }}
                                            </span>
                                        </td>
                                        <td class="py-4 px-6 whitespace-normal align-middle">
                                            <span v-if="dokumen.organization" class="inline-flex items-center text-xs font-semibold text-slate-700 leading-snug">
                                                <i class="fas fa-building mr-2 text-emerald-600 shrink-0"></i> {{ dokumen.organization.name }}
                                            </span>
                                            <span v-else class="text-xs text-slate-400 italic">Pemerintah Kabupaten</span>
                                        </td>
                                        <td class="py-4 px-6 text-center align-middle">
                                            <span class="inline-block bg-slate-50 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 whitespace-nowrap">
                                                {{ formatDate(dokumen.published_at || dokumen.created_at) }}
                                            </span>
                                        </td>
                                        <td class="py-4 px-4 text-center align-middle">
                                            <NuxtLink :to="`/informasi/${dokumen.slug || dokumen.id}`" class="inline-flex items-center justify-center w-9 h-9 bg-red-50 hover:bg-red-700 text-red-700 hover:text-white border border-red-200/80 rounded-xl text-sm transition-all duration-300 shadow-sm" title="Lihat Detail">
                                                <i class="fas fa-eye"></i>
                                            </NuxtLink>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
          
                        <div class="block md:hidden relative z-10 p-4 sm:p-6 space-y-4 bg-slate-50/50">
                            <div v-for="dokumen in items" :key="'mob-'+dokumen.id" class="bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-red-100 p-5 sm:p-6 relative flex flex-col group transition-all duration-300">
                                <div class="flex items-start">
                                    <div class="w-11 h-11 flex-shrink-0 rounded-2xl bg-red-50 text-red-700 border border-red-100/60 flex items-center justify-center shadow-sm mt-0.5 group-hover:bg-red-700 group-hover:text-white transition-colors duration-300">
                                        <i class="fas fa-file-pdf text-lg"></i>
                                    </div>
                                    <div class="ml-3 flex-grow min-w-0">
                                        <NuxtLink :to="`/informasi/${dokumen.slug || dokumen.id}`" class="block text-sm sm:text-base font-bold text-slate-900 hover:text-red-700 transition-all duration-300 leading-snug line-clamp-1 group-hover:line-clamp-none">
                                            {{ dokumen.judul }}
                                        </NuxtLink>
                                        <p v-if="dokumen.deskripsi" class="text-xs text-slate-500 mt-1.5 transition-all duration-300 line-clamp-1 group-hover:line-clamp-none leading-relaxed">
                                            {{ dokumen.deskripsi }}
                                        </p>
                                    </div>
                                </div>
          
                                <div class="mt-3.5 pt-3 border-t border-slate-100 flex flex-col gap-2">
                                    <div v-if="dokumen.organization" class="text-xs text-slate-600 font-medium flex items-center">
                                        <i class="fas fa-building mr-1.5 text-emerald-600 shrink-0"></i> {{ dokumen.organization.name }}
                                    </div>
                                    <div class="flex items-center justify-between gap-2 text-xs">
                                        <span class="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded-md text-[11px]">
                                            {{ dokumen.kategori }}
                                        </span>
                                        <span class="text-slate-400 font-medium text-[11px] flex items-center">
                                            <i class="fas fa-calendar mr-1"></i> {{ formatDate(dokumen.published_at || dokumen.created_at) }}
                                        </span>
                                    </div>
                                </div>
          
                                <div class="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                                    <NuxtLink :to="`/informasi/${dokumen.slug || dokumen.id}`" class="inline-flex items-center justify-center w-9 h-9 bg-red-50 hover:bg-red-700 text-red-700 hover:text-white border border-red-200/80 rounded-xl text-sm transition-all duration-300 shadow-sm" title="Lihat Detail">
                                        <i class="fas fa-eye"></i>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- KONDISI 2: SKELETON TABLE LOADING (Saat pemuatan awal dokumen) -->
                    <div v-else-if="isLoading" class="w-full">
                        <!-- Skeleton Desktop Table -->
                        <div class="hidden md:block overflow-x-hidden relative z-10 w-full">
                            <table class="w-full bg-transparent table-fixed">
                                <thead>
                                    <tr class="bg-slate-50 border-b border-slate-200 text-left">
                                        <th class="py-4 px-4 font-bold text-slate-700 text-xs tracking-wider uppercase w-14 text-center">No</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase">Detail Dokumen</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase w-48">Kategori & Jenis</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase w-56">Sumber</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase w-36 text-center">Tanggal</th>
                                        <th class="py-4 px-4 font-bold text-slate-700 text-xs tracking-wider uppercase w-20 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    <tr v-for="n in 5" :key="'skel-row-' + n" class="animate-pulse">
                                        <td class="py-5 px-4 text-center align-middle">
                                            <div class="h-4 w-6 bg-slate-200/80 rounded mx-auto"></div>
                                        </td>
                                        <td class="py-5 px-6 align-middle">
                                            <div class="flex items-center">
                                                <div class="w-11 h-11 rounded-2xl bg-slate-200/70 flex-shrink-0"></div>
                                                <div class="ml-4 flex-1 space-y-2">
                                                    <div class="h-4 bg-slate-200/80 rounded-lg w-3/4"></div>
                                                    <div class="h-3 bg-slate-200/50 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-5 px-6 align-middle">
                                            <div class="h-5 w-24 bg-slate-200/70 rounded-lg mb-1.5"></div>
                                            <div class="h-5 w-20 bg-red-100/60 rounded-lg"></div>
                                        </td>
                                        <td class="py-5 px-6 align-middle">
                                            <div class="h-4 w-36 bg-slate-200/70 rounded-lg"></div>
                                        </td>
                                        <td class="py-5 px-6 text-center align-middle">
                                            <div class="h-6 w-24 bg-slate-200/70 rounded-xl mx-auto"></div>
                                        </td>
                                        <td class="py-5 px-4 text-center align-middle">
                                            <div class="w-9 h-9 bg-slate-200/70 rounded-xl mx-auto"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Skeleton Mobile Cards -->
                        <div class="block md:hidden relative z-10 p-4 sm:p-6 space-y-4 bg-slate-50/50">
                            <div v-for="n in 3" :key="'skel-mob-' + n" class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6 flex flex-col space-y-3.5 animate-pulse">
                                <div class="flex items-start">
                                    <div class="w-11 h-11 flex-shrink-0 rounded-2xl bg-slate-200/70"></div>
                                    <div class="ml-3 flex-grow space-y-2">
                                        <div class="h-4 bg-slate-200/80 rounded-lg w-3/4"></div>
                                        <div class="h-3 bg-slate-200/50 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div class="pt-3 border-t border-slate-100 space-y-2">
                                    <div class="h-3 bg-slate-200/60 rounded w-1/3"></div>
                                    <div class="flex justify-between items-center">
                                        <div class="h-5 w-20 bg-slate-200/70 rounded-md"></div>
                                        <div class="h-3 w-24 bg-slate-200/60 rounded"></div>
                                    </div>
                                </div>
                                <div class="pt-3 border-t border-slate-100 flex justify-end">
                                    <div class="w-9 h-9 bg-slate-200/70 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- KONDISI 3: BELUM ADA DATA -->
                    <div v-else class="py-20 text-center relative z-10">
                        <div class="flex flex-col items-center justify-center">
                            <div class="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                                <i class="fas fa-folder-open text-3xl text-slate-300"></i>
                            </div>
                            <h3 class="text-xl font-bold text-slate-800 mb-2">Belum Ada Dokumen</h3>
                            <p class="text-slate-500 font-medium">Silakan sesuaikan filter pencarian Anda.</p>
                        </div>
                    </div>
                    
                    <!-- Pagination -->
                    <div v-if="!isLoading && items.length > 0 && lastPage > 1" class="relative z-10 px-6 py-6 border-t border-slate-100 bg-white/80 backdrop-blur-sm flex justify-center">
                        <nav class="inline-flex rounded-2xl shadow-sm border border-slate-100 bg-white p-1">
                            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-4 py-2 text-sm font-bold text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-700 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <template v-for="page in visiblePages" :key="page">
                                <span v-if="page === '...'" class="px-4 py-2 text-sm font-bold text-slate-400">...</span>
                                <button v-else @click="changePage(page)" :class="['px-4 py-2 text-sm font-bold rounded-xl transition-colors', page === currentPage ? 'bg-red-700 text-white shadow-md shadow-red-900/20' : 'text-slate-600 hover:bg-red-50 hover:text-red-700']">
                                    {{ page }}
                                </button>
                            </template>
                            <button @click="changePage(currentPage + 1)" :disabled="currentPage === lastPage" class="px-4 py-2 text-sm font-bold text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-700 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Fallback SSR ClientOnly -->
                <template #fallback>
                    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative min-h-[400px]">
                        <div class="hidden md:block overflow-x-hidden relative z-10 w-full">
                            <table class="w-full bg-transparent table-fixed">
                                <thead>
                                    <tr class="bg-slate-50 border-b border-slate-200 text-left">
                                        <th class="py-4 px-4 font-bold text-slate-700 text-xs tracking-wider uppercase w-14 text-center">No</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase">Detail Dokumen</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase w-48">Kategori & Jenis</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase w-56">Sumber</th>
                                        <th class="py-4 px-6 font-bold text-slate-700 text-xs tracking-wider uppercase w-36 text-center">Tanggal</th>
                                        <th class="py-4 px-4 font-bold text-slate-700 text-xs tracking-wider uppercase w-20 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    <tr v-for="n in 5" :key="'fallback-row-' + n" class="animate-pulse">
                                        <td class="py-5 px-4 text-center align-middle">
                                            <div class="h-4 w-6 bg-slate-200/80 rounded mx-auto"></div>
                                        </td>
                                        <td class="py-5 px-6 align-middle">
                                            <div class="flex items-center">
                                                <div class="w-11 h-11 rounded-2xl bg-slate-200/70 flex-shrink-0"></div>
                                                <div class="ml-4 flex-1 space-y-2">
                                                    <div class="h-4 bg-slate-200/80 rounded-lg w-3/4"></div>
                                                    <div class="h-3 bg-slate-200/50 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-5 px-6 align-middle">
                                            <div class="h-5 w-24 bg-slate-200/70 rounded-lg mb-1.5"></div>
                                            <div class="h-5 w-20 bg-red-100/60 rounded-lg"></div>
                                        </td>
                                        <td class="py-5 px-6 align-middle">
                                            <div class="h-4 w-36 bg-slate-200/70 rounded-lg"></div>
                                        </td>
                                        <td class="py-5 px-6 text-center align-middle">
                                            <div class="h-6 w-24 bg-slate-200/70 rounded-xl mx-auto"></div>
                                        </td>
                                        <td class="py-5 px-4 text-center align-middle">
                                            <div class="w-9 h-9 bg-slate-200/70 rounded-xl mx-auto"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="block md:hidden relative z-10 p-4 sm:p-6 space-y-4 bg-slate-50/50">
                            <div v-for="n in 3" :key="'fallback-mob-' + n" class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6 flex flex-col space-y-3.5 animate-pulse">
                                <div class="flex items-start">
                                    <div class="w-11 h-11 flex-shrink-0 rounded-2xl bg-slate-200/70"></div>
                                    <div class="ml-3 flex-grow space-y-2">
                                        <div class="h-4 bg-slate-200/80 rounded-lg w-3/4"></div>
                                        <div class="h-3 bg-slate-200/50 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div class="pt-3 border-t border-slate-100 space-y-2">
                                    <div class="h-3 bg-slate-200/60 rounded w-1/3"></div>
                                    <div class="flex justify-between items-center">
                                        <div class="h-5 w-20 bg-slate-200/70 rounded-md"></div>
                                        <div class="h-3 w-24 bg-slate-200/60 rounded"></div>
                                    </div>
                                </div>
                                <div class="pt-3 border-t border-slate-100 flex justify-end">
                                    <div class="w-9 h-9 bg-slate-200/70 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </ClientOnly>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const notification = ref({ type: '', message: '' })
let notificationTimeout = null

watch(() => notification.value.message, (newMsg) => {
  if (newMsg) {
    if (notificationTimeout) clearTimeout(notificationTimeout)
    notificationTimeout = setTimeout(() => {
      notification.value.message = ''
    }, 5000)
  }
})

// OG meta dinamis berbasis filter aktif
const config = useRuntimeConfig()
const rawBaseUrl = config.public?.baseUrl || 'https://sinjaikab.go.id'
const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl
const pageCanonical = `${baseUrl}/informasi`

const pageTitle = computed(() => {
  const jd = route.query.jenis_dokumen
  const kat = route.query.kategori

  if (jd) {
    return `Dokumen ${jd}`
  } else if (kat) {
    return `Informasi Kategori ${kat}`
  }
  return 'Informasi Publik'
})

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: 'Transparansi Dokumen Pemerintah Kabupaten Sinjai yang dapat Anda akses, telusuri, dan unduh dengan mudah.',
  ogDescription: 'Transparansi Dokumen Pemerintah Kabupaten Sinjai yang dapat Anda akses, telusuri, dan unduh dengan mudah.',
  ogUrl: pageCanonical,
  ogImage: `${baseUrl}/meta.png`,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: pageCanonical }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Beranda',
            'item': baseUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Informasi Publik',
            'item': pageCanonical
          }
        ]
      })
    }
  ]
})

const filters = ref({
  kategori: route.query.kategori || '',
  jenis_dokumen: route.query.jenis_dokumen || '',
  tahun: route.query.tahun || '',
  search: route.query.search || '',
  per_page: route.query.per_page || '10',
  page: route.query.page || 1
})

const getDownloadUrl = (dokumen) => {
  if (!dokumen || !dokumen.file_path) return '#'
  if (dokumen.file_path.startsWith('http://') || dokumen.file_path.startsWith('https://')) {
    return dokumen.file_path
  }
  return `https://ppidkab.sinjaikab.go.id/storage/${dokumen.file_path}`
}

const getAssetUrl = (path) => `https://ppidkab.sinjaikab.go.id/${path}`

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

const getPpidApiUrl = (path = '') => {
  const base = import.meta.dev ? '/api/ppid' : 'https://ppidkab.sinjaikab.go.id/api/v1'
  return path ? `${base}/${path}` : base
}

const cleanFilters = computed(() => {
  const p = {}
  if (filters.value.kategori) p.kategori = filters.value.kategori
  if (filters.value.jenis_dokumen) p.jenis_dokumen = filters.value.jenis_dokumen
  if (filters.value.tahun) p.tahun = filters.value.tahun
  if (filters.value.search) p.search = filters.value.search
  if (filters.value.per_page) p.per_page = filters.value.per_page
  if (filters.value.page) p.page = filters.value.page
  return p
})

const { data, pending: isLoading, refresh } = useAsyncData(
  'informasi-pemkab',
  () => $fetch(getPpidApiUrl('informasi-pemkab'), { params: cleanFilters.value }),
  { watch: [cleanFilters], server: false }
)

onMounted(() => {
  if (!data.value) {
    refresh()
  }
})

const kategori_jenis = computed(() => data.value?.kategori_jenis || {})

const availableYears = computed(() => {
  const years = []
  const current = new Date().getFullYear()
  for (let y = current; y >= 2000; y--) years.push(y)
  return years
})

const kategoriOptions = computed(() => {
    const opts = [{ label: 'Semua Kategori', value: '' }]
    Object.keys(kategori_jenis.value).forEach(k => opts.push({ label: k, value: k }))
    return opts
})

const jenisDokumenOptions = computed(() => {
    const opts = [{ label: 'Semua Jenis Dokumen', value: '' }]
    if (filters.value.kategori && kategori_jenis.value[filters.value.kategori]) {
        kategori_jenis.value[filters.value.kategori].forEach(j => opts.push({ label: j, value: j }))
    } else if (kategori_jenis.value) {
        let allTypesSet = new Set()
        for (let cat in kategori_jenis.value) {
            kategori_jenis.value[cat].forEach(t => allTypesSet.add(t))
        }
        const allTypes = Array.from(allTypesSet).sort()
        allTypes.forEach(j => opts.push({ label: j, value: j }))
    }
    return opts
})

const tahunOptions = computed(() => {
    const opts = [{ label: 'Semua Tahun', value: '' }]
    availableYears.value.forEach(y => opts.push({ label: y.toString(), value: y.toString() }))
    return opts
})

const items = computed(() => data.value?.data?.data || [])
const totalItems = computed(() => data.value?.data?.total || 0)
const currentPage = computed(() => data.value?.data?.current_page || 1)
const lastPage = computed(() => data.value?.data?.last_page || 1)

const visiblePages = computed(() => {
  const current = currentPage.value
  const last = lastPage.value
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1)
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', last]
  }
  if (current >= last - 3) {
    return [1, '...', last - 4, last - 3, last - 2, last - 1, last]
  }
  return [1, '...', current - 1, current, current + 1, '...', last]
})

const resetJenis = () => {
  filters.value.jenis_dokumen = ''
  applyFilters()
}

const applyFilters = () => {
  filters.value.page = 1
  updateRoute()
}

const resetFilters = () => {
  filters.value = {
    kategori: '',
    jenis_dokumen: '',
    tahun: '',
    search: '',
    per_page: '10',
    page: 1
  }
  updateRoute()
}

const changePage = (p) => {
  if (p >= 1 && p <= lastPage.value) {
    filters.value.page = p
    updateRoute()
  }
}

const updateRoute = () => {
  router.push({ query: { ...filters.value } })
}

watch(
  () => route.query,
  (newQuery) => {
    filters.value = {
      kategori: newQuery.kategori || '',
      jenis_dokumen: newQuery.jenis_dokumen || '',
      tahun: newQuery.tahun || '',
      search: newQuery.search || '',
      per_page: newQuery.per_page || '10',
      page: newQuery.page || 1
    }
  },
  { deep: true }
)
</script>

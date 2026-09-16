const fs = require('fs');
let content = fs.readFileSync('pages/informasi/index.vue', 'utf8');

const missingBlock = `            <div class="bg-white/80 rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[400px]" style="z-index: 10;">
                
                <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden" style="opacity: 0.03;">
                    <div class="w-full h-full" :style="{ backgroundImage: \`url(\${getAssetUrl('storage/logo/Lambang_Kabupaten_Sinjai.png')})\`, backgroundRepeat: 'repeat-y', backgroundPosition: 'center top', backgroundSize: 'contain', minHeight: '800px', filter: 'grayscale(100%)' }"></div>
                </div>

                <div v-if="isLoading" class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
                    <i class="fas fa-circle-notch fa-spin text-4xl text-red-500 mb-4"></i>
                    <p class="text-gray-700 font-bold">Memuat data...</p>
                </div>

                <template v-if="items.length > 0">
                    <div class="hidden md:block overflow-x-hidden relative z-10 w-full">
                        <table class="w-full bg-transparent table-fixed">
                            <thead>
                                <tr class="bg-gray-100/60 border-b border-gray-200 text-left backdrop-blur-sm">
                                    <th class="py-4 px-3 font-bold text-gray-700 text-sm tracking-wide uppercase w-12 text-center">No</th>
                                    <th class="py-4 px-4 font-bold text-gray-700 text-sm tracking-wide uppercase w-[40%]">Detail Dokumen</th>`;

let lines = content.split('\n');
let index = lines.findIndex(line => line.includes('<th class="py-4 px-4 font-bold text-gray-700 text-sm tracking-wide uppercase w-[40%]">Detail Dokumen</th>'));

lines.splice(index, 1, missingBlock);
content = lines.join('\n');

fs.writeFileSync('pages/informasi/index.vue', content);

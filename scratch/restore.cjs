const fs = require('fs');
let content = fs.readFileSync('pages/informasi/[slug].vue', 'utf8');

// I will just use regex to insert the missing block before the first </h2>
// Actually, let's just restore the file completely from the original using the logic from `fix.cjs` and `migrate.cjs`?
// No, that's too much work. I can just repair it by replacing the line where `</h2>` is.

let parts = content.split('                                    </h2>\r\n                                </div>\r\n                                <div class="p-6">');
if (parts.length > 1) {
    content = parts.join(`                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="lg:col-span-1 space-y-6">
                            <NuxtLink to="/informasi" class="w-full flex items-center justify-center px-6 py-3.5 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all duration-300 shadow-sm">
                                <i class="fas fa-arrow-left mr-2"></i> Kembali ke Daftar Dokumen
                            </NuxtLink>

                            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                                    <h2 class="text-lg font-bold text-gray-800 flex items-center">
                                        <i class="fas fa-list-ul text-red-500 mr-2"></i> Metadata
                                    </h2>
                                </div>
                                <div class="p-6">`);
}

// Also fix the first back button
content = content.replace(/\/transparansi\/informasi-pemkab/g, '/informasi');

fs.writeFileSync('pages/informasi/[slug].vue', content);

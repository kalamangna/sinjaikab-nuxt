<template>
  <div class="relative custom-select-root" :class="{ 'custom-select-open z-50': open, 'z-10': !open }" ref="rootEl">
    <!-- Trigger Button -->
    <button type="button" 
        @click="toggle" 
        @keydown.escape="open = false"
        :disabled="disabled"
        class="relative w-full border-2 border-gray-100 rounded-2xl shadow-sm pl-5 pr-12 py-4 text-left transition-all duration-300 group"
        :class="disabled ? 'bg-gray-50/80 cursor-not-allowed opacity-75' : 'bg-white cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'">
        
        <span class="flex items-center">
            <span class="block truncate transition-colors duration-300" 
                  :class="selectedLabel ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'">
                  {{ selectedLabel || placeholder }}
            </span>
        </span>
        
        <span class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <div class="p-1 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300">
                <svg class="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-transform duration-300" 
                     :class="open ? 'rotate-180' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </div>
        </span>
    </button>

    <!-- Dropdown Menu -->
    <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-1 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-1 scale-95"
    >
      <div v-if="open" 
          class="absolute mt-1 w-full rounded-2xl bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] z-[9999] border border-gray-100 overflow-hidden ring-1 ring-black/5">

          <div v-if="displaySearch" class="p-3 bg-gray-50/50 border-b border-gray-100">
              <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i class="fas fa-search text-blue-500 text-xs"></i>
                  </div>
                  <input type="text" 
                      v-model="search" 
                      @click.stop 
                      @keydown.enter.prevent
                      placeholder="Cari opsi..." 
                      class="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-gray-100 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-0 transition-all bg-white">
              </div>
          </div>

          <ul class="max-h-72 py-2 text-base overflow-auto focus:outline-none sm:text-sm custom-scrollbar" tabindex="-1">
              <li v-for="item in filteredData" :key="item.value"
                  @click="select(item)" 
                  class="mx-2 my-0.5 rounded-xl text-gray-700 cursor-pointer select-none relative py-3 pl-4 pr-10 transition-all duration-200 group/item"
                  :class="modelValue == item.value ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-blue-600 hover:text-white'">
                  
                  <span class="block truncate">{{ item.label }}</span>

                  <span v-if="modelValue == item.value" 
                        class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-hover/item:text-white">
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                  </span>
              </li>
              
              <li v-if="filteredData.length === 0" class="px-4 py-8 text-sm text-gray-400 text-center italic flex flex-col items-center">
                  <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                      <i class="fas fa-search-minus text-gray-300 text-xl"></i>
                  </div>
                  Data tidak ditemukan.
              </li>
          </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    },
    placeholder: {
        type: String,
        default: 'Pilih opsi...'
    },
    shouldShowSearch: {
        type: Boolean,
        default: false
    },
    searchable: {
        type: Boolean,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
    labelKey: {
        type: String,
        default: 'label'
    },
    valueKey: {
        type: String,
        default: 'value'
    }
});

const emit = defineEmits(['update:modelValue', 'change']);

const open = ref(false);
const search = ref('');
const rootEl = ref(null);

const toggle = () => {
    if (props.disabled) return;
    open.value = !open.value;
};

const displaySearch = computed(() => {
    if (props.searchable === false) return false;
    if (props.searchable === true) return true;
    if (props.shouldShowSearch) return true;
    return props.options.length >= 10;
});


const normalizedOptions = computed(() => {
    return props.options.map(item => {
        if (item && typeof item === 'object') {
            return {
                ...item,
                label: item[props.labelKey] !== undefined ? item[props.labelKey] : item.label,
                value: item[props.valueKey] !== undefined ? item[props.valueKey] : item.value
            };
        }
        return { label: item, value: item };
    });
});

const selectedLabel = computed(() => {
    const selected = normalizedOptions.value.find(item => String(item.value) === String(props.modelValue));
    return selected ? selected.label : null;
});

const filteredData = computed(() => {
    const term = search.value.toLowerCase().trim();
    if (!term) return normalizedOptions.value;
    return normalizedOptions.value.filter(item => 
        item.label && String(item.label).toLowerCase().includes(term)
    );
});

const select = (item) => {
    emit('update:modelValue', item.value);
    emit('change', item.value);
    open.value = false;
    search.value = '';
};

const handleClickOutside = (event) => {
    if (rootEl.value && !rootEl.value.contains(event.target)) {
        open.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #cbd5e1;
}
</style>


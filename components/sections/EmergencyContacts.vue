<template>
  <section id="kontak-darurat" class="py-12 sm:py-16 md:py-24 bg-slate-50">
    <div class="container mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
      <!-- Section Header -->
      <div class="text-center mb-10 sm:mb-12 md:mb-16">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-3 sm:mb-4">
          Kontak <span class="text-red-700">Darurat</span>
        </h2>
        <div class="w-16 sm:w-20 h-1.5 bg-red-700 mx-auto rounded-full"></div>
      </div>

      <!-- Emergency Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 gap-4 md:gap-4 lg:gap-4 xl:gap-6">
        <div
          v-for="(item, index) in emergencyContacts"
          :key="item.name"
          class="group flex flex-col items-center justify-between h-full p-4 sm:p-5 lg:p-4 xl:p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-red-900/5 hover:-translate-y-1 transition-all duration-300"
          :class="getCardResponsiveClass(index)"
        >
          <!-- Top Details -->
          <div class="flex flex-col items-center w-full mb-4 sm:mb-5">
            <!-- Icon Container -->
            <div class="mb-3 w-12 h-12 sm:w-14 sm:h-14 lg:w-14 lg:h-14 xl:w-16 xl:h-16 flex items-center justify-center bg-red-50 rounded-2xl group-hover:bg-red-700 transition-colors duration-300">
              <i
                :class="[item.icon, 'text-xl sm:text-2xl lg:text-2xl xl:text-3xl text-red-700 group-hover:text-white group-hover:scale-110 transition-all duration-300']"
                aria-hidden="true"
              ></i>
            </div>

            <!-- Title Container -->
            <div class="min-h-[2.5rem] flex items-center justify-center text-center">
              <h3 class="text-xs sm:text-sm lg:text-sm xl:text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors uppercase tracking-tight leading-snug">
                {{ item.name }}
              </h3>
            </div>
          </div>

          <!-- Bottom Action Area -->
          <div class="w-full flex flex-col justify-end gap-1.5 mt-auto">
            <!-- Single Phone Card Button -->
            <a
              v-if="item.phones.length === 1"
              :href="`tel:${item.phones[0].call}`"
              class="w-full py-3 sm:py-3.5 px-2 bg-red-50 hover:bg-red-700 text-red-700 hover:text-white rounded-xl transition-all duration-200 flex flex-col items-center justify-center text-center group/btn shadow-sm"
              :title="`Panggil nomor ${item.phones[0].display}`"
            >
              <span class="inline-flex items-center gap-1.5 text-[9px] font-bold text-red-600 group-hover/btn:text-red-100 uppercase tracking-wider leading-none mb-1">
                <i class="fa-solid fa-phone text-[8px]" aria-hidden="true"></i>
                <span>Panggil Darurat</span>
              </span>
              <span class="text-sm sm:text-base lg:text-sm xl:text-base font-black tracking-tight font-mono leading-tight">
                {{ item.phones[0].display }}
              </span>
            </a>

            <!-- Multiple Phones Card Buttons (Damkar & PLN) -->
            <template v-else>
              <a
                v-for="phone in item.phones"
                :key="phone.call"
                :href="`tel:${phone.call}`"
                class="w-full py-1.5 px-2 bg-red-50 hover:bg-red-700 text-red-700 hover:text-white rounded-xl transition-all duration-200 flex flex-col items-center justify-center text-center group/btn shadow-sm"
                :title="`Panggil nomor ${phone.display}`"
              >
                <span v-if="phone.label" class="text-[9px] font-semibold text-slate-500 group-hover/btn:text-red-100 uppercase tracking-wider leading-none mb-0.5 truncate max-w-full">
                  {{ phone.label }}
                </span>
                <span class="text-[11px] sm:text-xs lg:text-[11px] xl:text-xs font-black tracking-tight font-mono leading-tight">
                  {{ phone.display }}
                </span>
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PhoneOption {
  display: string;
  call: string;
  label?: string;
}

interface EmergencyContact {
  name: string;
  icon: string;
  phones: PhoneOption[];
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: "Polres Sinjai",
    icon: "fa-solid fa-shield-halved",
    phones: [
      {
        display: "110",
        call: "110",
      },
    ],
  },
  {
    name: "PSC Dinas Kesehatan",
    icon: "fa-solid fa-truck-medical",
    phones: [
      {
        display: "119",
        call: "119",
      },
    ],
  },
  {
    name: "Pemadam Kebakaran",
    icon: "fa-solid fa-fire",
    phones: [
      {
        display: "0482-113",
        call: "0482113",
        label: "Posko Induk",
      },
      {
        display: "0852-4222-5141",
        call: "085242225141",
        label: "Sektor Bikeru",
      },
      {
        display: "0813-5662-4625",
        call: "081356624625",
        label: "Sektor Manipi",
      },
    ],
  },
  {
    name: "TRC BPBD Sinjai",
    icon: "fa-solid fa-triangle-exclamation",
    phones: [
      {
        display: "0823-7772-0910",
        call: "082377720910",
      },
    ],
  },
  {
    name: "PLN Sinjai",
    icon: "fa-solid fa-bolt",
    phones: [
      {
        display: "123",
        call: "123",
        label: "Call Center",
      },
      {
        display: "0812-4789-2114",
        call: "081247892114",
        label: "Piket Pelayanan",
      },
    ],
  },
];

const getCardResponsiveClass = (index: number) => {
  switch (index) {
    case 3:
      return "md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto";
    case 4:
      return "sm:col-span-2 sm:max-w-sm sm:w-full sm:mx-auto md:col-span-2 md:max-w-none md:mx-0 lg:col-span-1";
    default:
      return "md:col-span-2 lg:col-span-1";
  }
};
</script>

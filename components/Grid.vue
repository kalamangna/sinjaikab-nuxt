<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});

const { name, href } = props;
</script>

<template>
  <NuxtLink :to="href" target="_blank" rel="noreferrer">
    <div
      class="h-20 w-20 lg:h-24 lg:w-24 mx-auto group flex items-center justify-center rounded-2xl bg-white lg:hover:rounded-full lg:hover:bg-white lg:hover:border-0"
    >
      <NuxtImg
        :src="`${name}.png`"
        :alt="`${name} sinjai`"
        class="scale-75 lg:scale-90 lg:group-hover:scale-100 transition-all"
        format="webp"
        fit="contain"
      />
    </div>
  </NuxtLink>
</template>

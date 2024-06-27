<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const { name } = props;
</script>

<template>
  <NuxtImg
    :src="`/${name}.png`"
    :alt="name"
    format="webp"
    sizes="100vw sm:50vw md:500px lg:550px"
    preload
  />
</template>

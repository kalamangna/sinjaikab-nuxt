<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  voice: {
    type: String,
    default: "",
  },
  speak: {
    type: Function,
    default: () => {},
  },
});

const { name } = props;
</script>

<template>
  <NuxtImg
    :src="`${name}.png`"
    :alt="`${name} sinjaikab`"
    format="webp"
    sizes="100vw sm:50vw md:500px lg:550px"
    preload
    @mouseover="speak(voice)"
  />
</template>

<script lang="ts" setup>
const swiper = useSwiper();
</script>

<template>
  <div class="text-center">
    <button @click="swiper.slidePrev()">Previous</button>
    <button @click="swiper.slideNext()">Next</button>
  </div>
</template>

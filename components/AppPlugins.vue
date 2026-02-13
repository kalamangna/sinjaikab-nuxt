<script setup lang="ts">
const config = useRuntimeConfig();
const gtagId = config.public.gtagId;

useHead({
  script: [
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
      async: true,
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtagId}');
      `,
      type: 'text/javascript',
    }
  ],
});
</script>

<template>
  <div v-if="false"></div>
</template>
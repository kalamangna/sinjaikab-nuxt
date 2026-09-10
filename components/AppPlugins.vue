<script setup lang="ts">
const config = useRuntimeConfig();
const gtagId = config.public.gtagId;

onMounted(() => {
  const loadThirdPartyScripts = () => {
    // 1. Google Tag Manager
    if (
      gtagId &&
      !document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gtagId}"]`)
    ) {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', gtagId);

      const gtmScript = document.createElement('script');
      gtmScript.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
      gtmScript.async = true;
      document.head.appendChild(gtmScript);
    }

    // 2. UserWay Accessibility Widget
    if (!document.querySelector('script[src*="cdn.userway.org/widget.js"]')) {
      const userwayScript = document.createElement('script');
      userwayScript.src = 'https://cdn.userway.org/widget.js';
      userwayScript.setAttribute('data-account', 'S41ThPrHz4');
      userwayScript.async = true;
      document.body.appendChild(userwayScript);
    }
  };

  // Muat script saat browser idle agar Total Blocking Time (TBT) mendekati 0ms
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => loadThirdPartyScripts(), { timeout: 3000 });
  } else {
    setTimeout(loadThirdPartyScripts, 1500);
  }
});
</script>

<template>
  <div v-if="false"></div>
</template>
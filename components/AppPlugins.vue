<script setup lang="ts">
const config = useRuntimeConfig();
const gtagId = config.public.gtagId;

onMounted(() => {
  let loaded = false;

  const loadThirdPartyScripts = () => {
    if (loaded) return;
    loaded = true;

    // Bersihkan listener interaksi
    interactionEvents.forEach((evt) => {
      window.removeEventListener(evt, triggerLoad);
    });

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
  };

  const triggerLoad = () => {
    loadThirdPartyScripts();
  };

  const interactionEvents = ['scroll', 'touchstart', 'mousemove', 'click', 'keydown'];

  // Pasang listener interaksi pengguna (passive agar tidak menghambat rendering/scroll)
  interactionEvents.forEach((evt) => {
    window.addEventListener(evt, triggerLoad, { once: true, passive: true });
  });

  // Fallback timeout setelah 5000ms jika pengguna tidak berinteraksi
  const timer = setTimeout(loadThirdPartyScripts, 5000);

  onUnmounted(() => {
    clearTimeout(timer);
    interactionEvents.forEach((evt) => {
      window.removeEventListener(evt, triggerLoad);
    });
  });
});
</script>

<template>
  <div v-if="false"></div>
</template>
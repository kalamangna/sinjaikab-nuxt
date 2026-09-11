export const useUserWay = () => {
  const config = useRuntimeConfig();
  const account = (config.public.userwayAccount as string) || "S41ThPrHz4";

  const isLoading = useState<boolean>("userway_loading", () => false);
  const isLoaded = useState<boolean>("userway_loaded", () => false);

  const loadAndOpen = () => {
    if (typeof window === "undefined") return;

    // Jika script sudah pernah dimuat, langsung buka widget
    if (isLoaded.value) {
      if ((window as any).UserWay && typeof (window as any).UserWay.widgetOpen === "function") {
        (window as any).UserWay.widgetOpen();
      } else if ((window as any).UserWay && typeof (window as any).UserWay.widgetToggle === "function") {
        (window as any).UserWay.widgetToggle();
      }
      return;
    }

    if (isLoading.value) return;
    isLoading.value = true;

    // Cek apakah script sudah ada di DOM untuk menghindari duplikasi
    const existingScript = document.querySelector('script[src*="cdn.userway.org/widget.js"]');
    if (existingScript) {
      isLoaded.value = true;
      isLoading.value = false;
      (window as any).UserWay?.widgetOpen?.();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.userway.org/widget.js";
    script.setAttribute("data-account", account);
    script.async = true;

    script.onload = () => {
      isLoaded.value = true;
      isLoading.value = false;

      // Berikan jeda singkat agar objek UserWay terinisialisasi sempurna sebelum dibuka
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        if ((window as any).UserWay && typeof (window as any).UserWay.widgetOpen === "function") {
          (window as any).UserWay.widgetOpen();
          clearInterval(checkInterval);
        } else if (attempts > 50) {
          clearInterval(checkInterval);
        }
      }, 100);
    };

    script.onerror = () => {
      isLoading.value = false;
      console.error("Gagal memuat script aksesibilitas UserWay.");
    };

    document.body.appendChild(script);
  };

  return {
    loadAndOpen,
    isLoading,
    isLoaded,
  };
};

<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();

const isAdminA11y = computed(() => route.path === "/admin/a11y-stats");

const pageTitle = computed(() =>
  isAdminA11y.value
    ? "Statistik Aksesibilitas - Pemerintah Kabupaten Sinjai"
    : "Pemerintah Kabupaten Sinjai"
);
const pageDescription = computed(() =>
  isAdminA11y.value
    ? "Dashboard statistik dan telemetri pemakaian widget aksesibilitas web Pemerintah Kabupaten Sinjai."
    : "Website Resmi Pemerintah Kabupaten Sinjai."
);
const robotsMeta = computed(() =>
  isAdminA11y.value
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large"
);
const rawBaseUrl = (config.public.baseUrl as string) || "https://sinjaikab.go.id";
const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
const imageUrl = `${baseUrl}/meta.png`;

const canonicalUrl = computed(() => {
  const path = route.path === "/" ? "" : route.path;
  return `${baseUrl}${path}`;
});

useHead({
  titleTemplate: (titleChunk?: string) => {
    if (!titleChunk || titleChunk === "Pemerintah Kabupaten Sinjai") {
      return "Pemerintah Kabupaten Sinjai";
    }
    if (titleChunk.includes("Pemerintah Kabupaten Sinjai")) {
      return titleChunk;
    }
    return `${titleChunk} - Pemerintah Kabupaten Sinjai`;
  },
  title: pageTitle,
  meta: [
    { name: "description", content: pageDescription },
    {
      name: "keywords",
      content:
        "pemerintah kabupaten sinjai, pemkab sinjai, sinjaikab, bupati sinjai, diskominfo sinjai, portal sinjai, sinjai bersatu, layanan publik sinjai, sulawesi selatan",
    },
    { name: "author", content: "Diskominfo-SP Kabupaten Sinjai" },
    { name: "robots", content: robotsMeta },
    { name: "theme-color", content: "#b91c1c" },
    // Local SEO & Geotagging
    { name: "geo.region", content: "ID-SN" },
    { name: "geo.placename", content: "Kabupaten Sinjai" },
    { name: "geo.position", content: "-5.11854;120.2129" },
    { name: "ICBM", content: "-5.11854, 120.2129" },
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "id_ID" },
    { property: "og:site_name", content: "Pemerintah Kabupaten Sinjai" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1640" },
    { property: "og:image:height", content: "924" },
    { property: "og:image:alt", content: "Portal Resmi Pemerintah Kabupaten Sinjai" },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@sinjaikab" },
    { name: "twitter:creator", content: "@sinjaikab" },
    { name: "twitter:url", content: canonicalUrl },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: pageDescription },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: "Portal Resmi Pemerintah Kabupaten Sinjai" },
    // Viewport & Mobile
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
  link: [
    { rel: "icon", type: "image/png", href: `${config.app.baseURL}sinjai.png` },
    { rel: "canonical", href: canonicalUrl },
    {
      rel: "preload",
      as: "image",
      href: `${config.app.baseURL}poster-mobile.webp`,
      imageSrcset: `${config.app.baseURL}poster-mobile.webp 756w, ${config.app.baseURL}poster.webp 1200w`,
      imageSizes: "(max-width: 1023px) 100vw, 600px",
      type: "image/webp",
      fetchpriority: "high",
    },
    { rel: "preconnect", href: "https://cdn.jsdelivr.net" },
    { rel: "dns-prefetch", href: "https://cdn.jsdelivr.net" },
    { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${baseUrl}#website`,
            url: baseUrl,
            name: "Pemerintah Kabupaten Sinjai",
            alternateName: "Portal Resmi Pemkab Sinjai",
            description: pageDescription.value,
            inLanguage: "id-ID",
            publisher: {
              "@id": `${baseUrl}#organization`,
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/informasi?search={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@type": "GovernmentOrganization",
            "@id": `${baseUrl}#organization`,
            name: "Pemerintah Kabupaten Sinjai",
            alternateName: [
              "Pemkab Sinjai",
              "Pemerintah Daerah Kabupaten Sinjai",
              "Sinjaikab",
            ],
            url: baseUrl,
            logo: `${baseUrl}/sinjai.png`,
            image: imageUrl,
            description: pageDescription.value,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Tanassang, Alehanuae, Sinjai Utara",
              addressLocality: "Kabupaten Sinjai",
              addressRegion: "Sulawesi Selatan",
              postalCode: "92615",
              addressCountry: "ID",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -5.11854,
              longitude: 120.2129,
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Support",
              email: "info@sinjaikab.go.id",
              availableLanguage: ["id"],
            },
            sameAs: [
              "https://www.facebook.com/FP.KabupatenSinjai",
              "https://www.instagram.com/sinjaikab",
              "https://www.tiktok.com/@pemkabsinjai",
              "https://www.youtube.com/@SINJAITV",
              "https://x.com/sinjaikab",
            ],
          },
          {
            "@type": "AdministrativeArea",
            "@id": `${baseUrl}#area`,
            name: "Kabupaten Sinjai",
            description: "Daerah Tingkat II di Provinsi Sulawesi Selatan, Indonesia",
            geo: {
              "@type": "GeoCoordinates",
              latitude: -5.11854,
              longitude: 120.2129,
            },
          },
        ],
      }),
    },
  ],
  htmlAttrs: {
    lang: "id",
  },
});

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

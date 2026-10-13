// https://nuxt.com/docs/api/configuration/nuxt-config
const env = process.env

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  css: [
    '~/assets/styles/vars.styl',
    'quill/dist/quill.snow.css',
    '~/assets/styles/quill.styl',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/icon',
    'pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    // or process.env.API_BASE_URL
    // public: process.env,
    public: {
      env: {
        API_BASE_URI: env.API_BASE_URI,
      }
    }
  },
  nitro: {
    // Fixes the Windows path-resolving bug by bundling packages natively
    noExternals: true,
    experimental: {
      inlineChunks: true
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        'vue-quilly',
        'quill/core',
        // 'katex',
        'quill',
      ]
    }
  },
  imports: {
    presets: [
      {
        from: '~/utils/store/factories',
        imports: ['defineCollectionStore', 'defineEntityStore', 'useStoreRefs']
      }
    ],
  }
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  devServer: {
    // host: true,
  },
  runtimeConfig: {

  },
  modules: [
    "@nuxt/icon",
    "nuxt-radash",
    "@vueuse/nuxt",
    "@nuxt/ui"
  ],
  css: ['~/assets/css/main.css'],
  ui: {

  }
});
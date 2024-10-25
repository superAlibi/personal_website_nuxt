// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  runtimeConfig: {
    apiSecret: process.env.AUTHING_SECRET_KEY,
  },
  modules: [
    "@unocss/nuxt",
    "@nuxt/icon",
    "nuxt-radash"
  ],
});
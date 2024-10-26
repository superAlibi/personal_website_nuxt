// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  runtimeConfig: {
    apiSecret: process.env.AUTHING_SECRET_KEY,
  },
  modules: ["@nuxt/icon", "nuxt-radash", "@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  tailwindcss: {
    config: {
      darkMode: "class",
      screens: {
        "xs": { "max": "640px" },
        "sm": { "min": "641px" },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        "md": { "min": "768px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        "lg": { "min": "1024px" },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        "xl": { "min": "1280px" },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        "2xl": { "min": "1536px" },
        // => @media (min-width: 1536px) { ... }
      }
    }
  }

});
import { defineNuxtConfig } from "nuxt";
import eslintPlugin from "vite-plugin-eslint";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ["@intlify/nuxt3", "@nuxtjs/tailwindcss"],
  localeDir: "locales",
  vueI18n: {
    legacy: false,
    fallbackLocale: "en",
    globalInjection: true,
    locales: [
      {
        code: "en",
        domain: "en.learning-resources.cdssandbox.xyz/"
      },
      {
        code: "fr",
        domain: "fr.learning-resources.cdssandbox.xyz/"
      }
    ],
    differentDomains: process.env.NODE_ENV === "production"
  },
  // build: {
  vite: {
    plugins: [eslintPlugin()]
  }
  // }
});

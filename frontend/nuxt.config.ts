import { defineNuxtConfig } from 'nuxt'

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
                code: 'en',
                domain: 'en.learning-resources.cdssandbox.xyz/'
            },
            {
                code: 'fr',
                domain: 'fr.learning-resources.cdssandbox.xyz/'
            },
        ],
        differentDomains: process.env.NODE_ENV === 'production'
    },
    // build: {
    transpile: [
        '@fortawesome/vue-fontawesome',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-brands-svg-icons',
        '@fortawesome/free-regular-svg-icons',
        '@fortawesome/free-solid-svg-icons',
    ]
    // }
})

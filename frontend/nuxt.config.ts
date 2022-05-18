import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: ["@intlify/nuxt3", "@nuxtjs/tailwindcss"],
    localeDir: "locales",
    vueI18n: {
        legacy: false,
        // locale: "en",
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
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                }
            },
        },
    },
    css: [
        '~/assets/css/tailwind.css',
    ]
    // modules: [['@nuxtjs/i18n', {
    //     langDir: '~/locales/',
    //     strategy: 'prefix',
    //     locales: [
    //         { code: 'en', iso: 'en-CA', file: 'en.json', name: 'English', dir: 'ltr' },
    //         { code: 'fr', iso: 'fr-CA', file: 'fr.json', name: 'Français' },
    //     ],
    //     defaultLocale: 'en',
    //     vueI18n: {
    //         fallbackLocale: 'en',
    //     },
    //     }]
    // ]
    // buildModules: ['@intlify/nuxt3'],
    // // config for `@intlify/nuxt3`
    // intlify: {
    //     vueI18n: {
    //         // You can setting same `createI18n` options here !
    //         locale: 'en',
    //         messages: {
    //             en: {
    //                 hello: 'Hello'
    //             },
    //             fr: {
    //                 hello: 'Bonjour'
    //             }
    //         }
    //     }
    // }
})

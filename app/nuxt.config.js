/* eslint-disable nuxt/no-cjs-in-config */
const config = require('./.contentful.json')
const i18n = require('./config/i18n.js')

const generatedRoutes = require('./utils/generateRoutes')

module.exports = {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Resources | Ressources',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  publicRuntimeConfig: {
    googleAnalyticsID: process.env.GOOGLE_ANALYTICS_ID,
    googleTagManagerID: process.env.GOOGLE_TAG_MANAGER_ID,
  },

  privateRuntimeConfig: {
    contentfulAccessToken:
      config.CTF_CDA_ACCESS_TOKEN || process.env.contentful_cda_access_token,
    contentfulSpaceID: config.CTF_SPACE_ID || process.env.contentful_space_id,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  plugins: ['~/plugins/vue-gtag', '~/plugins/vue-gtm', '~/plugins/axios'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://www.npmjs.com/package/@nuxtjs/fontawesome
    '@nuxtjs/fontawesome',
    // https://typescript.nuxtjs.org/
    '@nuxt/typescript-build',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://vuetifyjs.com/en/getting-started/installation/#nuxt-install
    // https://www.npmjs.com/package/@nuxtjs/vuetify
    '@nuxtjs/vuetify',

    /* [
      "k-domains",
      {
        // Directories that hold pages for subdomain
        subDomains: ["fr"],
        // Directory that holds pages for root domain
        rootDomain: "en"
      }
    ], */
    // https://www.npmjs.com/package/@nuxtjs/router
    /* [
      '@nuxtjs/router',
      {
        path: 'router',
        // fileName: 'index.js',
        keepDefaultRouter: true
      }
    ] */
  ],
  router: {
    prefetchLinks: false,
    prefetchPayloads: false,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://i18n.nuxtjs.org/
    ['@nuxtjs/i18n', i18n],
  ],

  // I18n: https://i18n.nuxtjs.org/
  // i18n Module Configuration
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-CA',
        file: 'en.json',
        name: 'English',
        dir: 'ltr',
        domain: process.env.DOMAIN_EN,
        // For local testing
        // domain: 'en.learning-resources:8080',
      },
      {
        code: 'fr',
        iso: 'fr-CA',
        file: 'fr.json',
        name: 'Français',
        domain: process.env.DOMAIN_FR,
        // For local testing
        // domain: 'fr.learning-resources:8080',
      },
    ],
    parsePages: false,
    differentDomains: true,
    // defaultLocale: 'en',
    // strategy: 'prefix',
    detectBrowserLanguage: false,
    pages: {
      index: {
        en: '/',
        fr: '/fr',
      },
      /* 'fr/index': {
        en: '/',
        fr: '/accueil/',
      }, */
      about: {
        en: '/about',
        fr: '/a-propos',
      },
      contact: {
        en: '/contact',
        fr: '/nous-joindre',
      },
      'topic/_topic': {
        en: '/topic/:topic',
        fr: '/themes/:topic',
      },
      'resource/_resource': {
        en: '/resource/:resource',
        fr: '/ressource/:resource',
      },
      'legal/_legal': {
        en: '/legal/:legal',
        fr: '/transparence/:legal',
      },
      'collection/_collection': {
        en: '/collection/:collection',
        fr: '/collection/:collection',
      },
    },
  },

  /* generate: {
    routes: [ {route: 'transparence/avis', payload: 'fr'},
      { route: "legal/terms"},
      { route: "legal/privacy"},
      { route: "transparence/confidentialite", payload: 'fr'}]
  }, */

  generate: {
    crawler: false,
    routes: () => {
      const accessToken =
        config.CTF_CDA_ACCESS_TOKEN || process.env.contentful_cda_access_token
      const spaceId = config.CTF_SPACE_ID || process.env.contentful_space_id
      return generatedRoutes(accessToken, spaceId)
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
    workbox: false,
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
  fontawesome: {
    icons: {
      solid: true,
      regular: true,
    },
  },
  typescript: {
    typeCheck: false,
  },
  solid: true,
  regular: true,
  // dev: process.env.NODE_ENV !== 'production'
  dev: false,
  telemetry: false,
  storybook: {
    // Options
  },

  googleFonts: {
    families: {
      Oswald: true,
    },
  },
}

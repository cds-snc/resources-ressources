/* eslint-disable nuxt/no-cjs-in-config */
const config = require('./.contentful.json')
const i18n = require('./config/i18n.js')

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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/contentful'],

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
    // https://google-analytics.nuxtjs.org/
    '@nuxtjs/google-analytics'
  ],

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
    parsePages: false,
    differentDomains: true,
    defaultLocale: 'en',
    // strategy: 'prefix',
    detectBrowserLanguage: {
      // If enabled, a cookie is set once a user has been redirected to his
      // preferred language to prevent subsequent redirections
      // Set to false to redirect every time
      useCookie: true,
      // Cookie name
      cookieKey: 'i18n_redirected',
      // Set to always redirect to value stored in the cookie, not just once
      alwaysRedirect: false,
      // If no locale for the browsers locale is a match, use this one as a fallback
      fallbackLocale: 'en',
    },
    pages: {
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
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN:
      config.CTF_CDA_ACCESS_TOKEN || process.env.contentful_cda_access_token,
    CTF_PERSON_ID: config.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID,
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
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID, // Use as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  }
}

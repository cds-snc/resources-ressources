/* eslint-disable nuxt/no-cjs-in-config */
const axios = require('axios')
const config = require('./.contentful.json')
const i18n = require('./config/i18n.js')

// --------------------------------------------------------------------------------------------------------------------

const missingRoutes = async () => {
  // axios.setToken(process.env.CTF_CDA_ACCESS_TOKEN, 'Bearer')

  // axios create

  const axiosConfig = {
    headers: {
      Authorization: `Bearer GUc49ra1DWc4wiEZ8vk-6o9oYzDPhg-uc-ZOxh3v2P0`,
    },
  }

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/zy72kv0qwyyq`

  const englishTopicSlugsQuery = `query
  {
    topicCollection(locale: "en-CA")
    {
      items
      {
        urlSlug
      }
    }
  }`

  const frenchTopicSlugsQuery = `query
  {
    topicCollection(locale: "fr-CA")
    {
      items
      {
        urlSlug
      }
    }
  }`

  const frenchResourceSlugsQuery = `query
  {
    testResourceCollection(locale: "fr-CA")
    {
      items
      {
        urlSlug
      }
    }
  }`

  // English Topic Slugs - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  const englishTopicSlugs = await axios
    .post(endpoint, { query: englishTopicSlugsQuery }, axiosConfig)
    .then((res) => {
      return res.data.data.topicCollection.items.map((topic) => ({
        route: `topic/${topic.urlSlug}`,
        payload: 'en',
      }))
    })

  // French Topic Slugs - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  const frenchtopicSlugs = await axios
    .post(endpoint, { query: frenchTopicSlugsQuery }, axiosConfig)
    .then((res) => {
      return res.data.data.topicCollection.items.map((topic) => ({
        route: `themes/${topic.urlSlug}`,
        payload: 'fr',
      }))
    })

  // French Resources Slugs - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  const frenchResources = await axios
    .post(endpoint, { query: frenchResourceSlugsQuery }, axiosConfig)
    .then((res) => {
      return res.data.data.testResourceCollection.items.map((resource) => ({
        route: `ressource/${resource.urlSlug}`,
        payload: 'fr',
      }))
    })

  const footerRoutes = [
    { route: 'transparence/avis', payload: 'fr' },
    { route: 'legal/terms', payload: 'en' },
    { route: 'legal/privacy', payload: 'en' },
    { route: 'transparence/confidentialite', payload: 'fr' },
    { route: '/', payload: 'en' },
    { route: '/fr', payload: 'fr' },
    // { route: "" , payload: 'en'}
  ]

  const slugs = englishTopicSlugs
    .concat(frenchtopicSlugs)
    .concat(frenchResources)
    .concat(footerRoutes) // .concat(indexPage);

  return slugs
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,

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

  plugins: ['~/plugins/contentful', '~/plugins/vue-gtag'],

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
        // domain: 'en.learning-resources:8080',
      },
      {
        code: 'fr',
        iso: 'fr-CA',
        file: 'fr.json',
        name: 'Français',
        domain: process.env.DOMAIN_FR,
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
        fr: '/fr/',
      },
      'fr/index': {
        en: '/',
        fr: '/fr/',
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
    },
  },

  /* generate: {
    routes: [ {route: 'transparence/avis', payload: 'fr'},
      { route: "legal/terms"},
      { route: "legal/privacy"},
      { route: "transparence/confidentialite", payload: 'fr'}]
  }, */

  generate: {
    routes: missingRoutes,
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
}

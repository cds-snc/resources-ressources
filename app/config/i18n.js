const { EN_LOCALE, FR_LOCALE } = require('../utils/constants')
const { langPaths } = require('../utils/paths')
module.exports = {
  locales: [
    {
      code: 'en',
      iso: EN_LOCALE,
      file: 'en.json',
      name: 'English',
      dir: 'ltr',
      domain: process.env.DOMAIN_EN,
      // For local testing
      // domain: 'en.learning-resources:8080',
    },
    {
      code: 'fr',
      iso: FR_LOCALE,
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
      en: `/${langPaths.en.topic}/:topic`,
      fr: `/${langPaths.fr.topic}/:topic`,
    },
    'resource/_resource': {
      en: `/${langPaths.en.resource}/:resource`,
      fr: `/${langPaths.fr.resource}/:resource`,
    },
    'legal/_legal': {
      en: `/${langPaths.en.legal}/:legal`,
      fr: `/${langPaths.fr.legal}/:legal`,
    },
    'collection/_collection': {
      en: `/${langPaths.en.collection}/:collection`,
      fr: `/${langPaths.fr.collection}/:collection`,
    },
  },
  langDir: '~/locales/',

  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
  },
}

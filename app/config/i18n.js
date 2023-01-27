const { EN_LOCALE, FR_LOCALE } = require('../utils/constants')
module.exports = {
  langDir: '~/locales/',
  // strategy: 'prefix',
  locales: [
    {
      code: 'en',
      iso: EN_LOCALE,
      file: 'en.json',
      name: 'English',
      dir: 'ltr',
      domain: process.env.DOMAIN_EN,
      /// For local testing
      // domain: 'en.learning-resources:8080',
    },
    {
      code: 'fr',
      iso: FR_LOCALE,
      file: 'fr.json',
      name: 'Français',
      domain: process.env.DOMAIN_FR,
      /// For local testing
      // domain: 'fr.learning-resources:8080',
    },
  ],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
  },
  differentDomains: true,
  // process.env.ENV === 'staging' || process.env.ENV === 'production',

  parsePages: false,

  pages: {
    'topic/_topic': {
      en: '/topic/:topic',
      fr: '/sujet/:topic',
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
}

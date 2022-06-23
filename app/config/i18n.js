module.exports = {
  langDir: '~/locales/',
  strategy: 'prefix',
  locales: [
    {
      code: 'en',
      iso: 'en-CA',
      file: 'en.json',
      name: 'English',
      dir: 'ltr',
      domain: process.env.DOMAIN_EN,
    },
    {
      code: 'fr',
      iso: 'fr-CA',
      file: 'fr.json',
      name: 'Français',
      domain: process.env.DOMAIN_FR,
    },
  ],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
  },
  differentDomains: process.env.ENV === 'staging' || process.env.ENV === 'production',

  parsePages: false,

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
}

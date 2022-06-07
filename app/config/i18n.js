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
  differentDomains:
    process.env.ENV === 'staging' || process.env.ENV === 'production',
}

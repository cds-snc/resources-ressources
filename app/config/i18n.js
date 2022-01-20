module.exports = {
  langDir: '~/locales/',
  locales: [
    { code: 'en', iso: 'en-CA', file: 'en.json', dir: 'ltr'},
    { code: 'fr', iso: 'fr-FR', file: 'fr.json'},
  ],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
  }
}
module.exports = {
  langDir: '~/locales/',
  strategy: 'prefix',
  locales: [
    { code: 'en', iso: 'en-CA', file: 'en.json', name: 'English', dir: 'ltr'},
    { code: 'fr', iso: 'fr-CA', file: 'fr.json', name: 'Français'},
  ],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
  }
}
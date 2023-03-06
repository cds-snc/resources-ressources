export const CONTENTFUL_CDA_BASE_URL = `https://graphql.contentful.com/content/v1/spaces/`
const langFR = require('../locales/fr.json')
const langEN = require('../locales/en.json')

export const featureNames = {
  F_HEADLINE: 'F_HEADLINE',
  F_HEADLINE_ALT: 'F_HEADLINE_ALT',
}

// Locales
export const EN_LOCALE = 'en-CA'
export const FR_LOCALE = 'fr-CA'
export const LOCALES = [EN_LOCALE, FR_LOCALE]
export const EN = 'en'
export const FR = 'fr'

export const EXAMPLES_LINK_ID = 'ex'

export const getExamplesLinkName = (currentLocale) => {
  return currentLocale === EN_LOCALE
    ? langEN.examples_from_our_work
    : langFR.examples_from_our_work
}

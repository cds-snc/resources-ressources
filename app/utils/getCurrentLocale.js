import { EN_LOCALE, FR_LOCALE } from '~/utils/constants'

/**
 * Returns the current locale code
 * @param payload
 * @param i18n
 * @returns {string} Locale
 */
export const getCurrentLocale = (payload, i18n) => {
  let currentLocale = payload && payload.locale ? payload.locale : null
  if (i18n && i18n.locale && currentLocale === null) {
    if (i18n.locale.includes('en')) {
      currentLocale = EN_LOCALE
    } else {
      currentLocale = FR_LOCALE
    }
  }
  if (currentLocale === null) {
    currentLocale = EN_LOCALE
  }

  return currentLocale
}

/**
 * Returns the first two characters of the locale code
 * @param locale
 * @returns {string} First two characters locale code
 */
export const getLocaleCode = (locale) => {
  return locale.substring(0, 2)
}

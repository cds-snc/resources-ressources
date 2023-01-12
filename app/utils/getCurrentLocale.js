import { EN_LOCALE, FR_LOCALE } from '~/utils/constants'

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

export const getLocaleCode = (locale) => {
  return locale.substring(0, 2)
}

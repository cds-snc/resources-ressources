import { langPaths } from '~/utils/paths'
import { getLocaleCode } from '~/utils/getCurrentLocale'
import { EN_LOCALE } from '~/utils/constants'

export const getTopicPathPrefix = (currentLocale = EN_LOCALE) => {
  return `/${langPaths[getLocaleCode(currentLocale)].topic}/`
}

export const getResourcePathPrefix = (currentLocale = EN_LOCALE) => {
  return `/${langPaths[getLocaleCode(currentLocale)].resource}/`
}

export const getLegalPathPrefix = (currentLocale = EN_LOCALE) => {
  return `/${langPaths[getLocaleCode(currentLocale)].legal}/`
}

export const getCollectionPathPrefix = (currentLocale = EN_LOCALE) => {
  return `/${langPaths[getLocaleCode(currentLocale)].collection}/`
}

export const getCollectionPath = (urlSlug) => {
  return getCollectionPathPrefix() + urlSlug
}

export const getResourcePath = (urlSlug, locale) => {
  return getResourcePathPrefix(locale) + urlSlug
}

export const getTopicPath = (urlSlug, locale) => {
  return getTopicPathPrefix(locale) + urlSlug
}

export const getAboutPagePath = (currentLocale = EN_LOCALE) => {
  return `/${langPaths[getLocaleCode(currentLocale)].about}`
}

export const getContactPagePath = (currentLocale = EN_LOCALE) => {
  return `/${langPaths[getLocaleCode(currentLocale)].contact}`
}

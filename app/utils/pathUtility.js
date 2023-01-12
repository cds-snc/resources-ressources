const topicPrefixEN = '/topic/'
const topicPrefixFR = '/sujet/'
const resourcePrefixEN = '/resource/'
const resourcePrefixFR = '/ressource/'
const collectionPrefix = '/collection/'
const legalPrefixEN = '/legal/'
const legalPrefixFR = '/transparence/'

export const getTopicPathPrefix = (currentLocale) => {
  return currentLocale.includes('en') ? topicPrefixEN : topicPrefixFR
}

export const getResourcePathPrefix = (currentLocale) => {
  return currentLocale.includes('en') ? resourcePrefixEN : resourcePrefixFR
}

export const getLegalPathPrefix = (currentLocale) => {
  return currentLocale.includes('en') ? legalPrefixEN : legalPrefixFR
}

export const getCollectionPathPrefix = () => {
  return collectionPrefix
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

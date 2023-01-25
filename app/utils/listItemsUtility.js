import {
  getCollectionPath,
  getResourcePath,
  getTopicPath,
} from '~/utils/pathUtility'

export const generateBreadcrumbs = (breadcrumbItems, locale) => {
  const breadcrumbs = breadcrumbItems.map((breadcrumbItem) => ({
    name: breadcrumbItem.name,
    path: getTopicPath(breadcrumbItem.urlSlug, locale),
  }))

  breadcrumbs.locale = locale.substring(0, 2)

  return breadcrumbs
}

export const generateCollections = (collectionItems, locale) => {
  return collectionItems.map((collectionItem) => ({
    name: collectionItem.name,
    path: getCollectionPath(collectionItem.urlSlug),
    locale: getLocaleCode(locale),
  }))
}

export const generateResources = (resourceItems, locale) => {
  return resourceItems
    .filter(
      (resourceItem) => resourceItem != null && resourceItem?.title != null
    )
    .map((resourceItem) => ({
      title: resourceItem.title,
      path: getResourcePath(resourceItem.urlSlug, locale),
      locale: getLocaleCode(locale),
    }))
}

export const getLocaleCode = (locale) => {
  return locale.substring(0, 2)
}

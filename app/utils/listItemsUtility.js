import {
  getCollectionPath,
  getResourcePath,
  getTopicPath,
} from '~/utils/pathUtility'
import { getLocaleCode } from '~/utils/getCurrentLocale'

export const generateBreadcrumbs = (breadcrumbItems, locale) => {
  const breadcrumbs = breadcrumbItems.map((breadcrumbItem) => ({
    name: breadcrumbItem.name,
    path: getTopicPath(breadcrumbItem.urlSlug, locale),
  }))

  breadcrumbs.locale = getLocaleCode(locale)

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

export const generateExternalResources = (externalResourceItems) => {
  return externalResourceItems
    .filter(
      (externalResourceItem) =>
        externalResourceItem != null && externalResourceItem?.title != null
    )
    .map((externalResourceItem) => ({
      resourceType: externalResourceItem.resourceType.name,
      source: new URL(externalResourceItem.url).host.startsWith('www.')
        ? new URL(externalResourceItem.url).host.substring(4)
        : new URL(externalResourceItem.url).host,
      title: externalResourceItem.title,
      url: externalResourceItem.url,
    }))
}

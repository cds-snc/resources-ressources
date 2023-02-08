const axios = require('axios')

const langEN = require('../locales/en.json')
const langFR = require('../locales/fr.json')
const {
  topicRoutesQuery,
  topicPageQuery,
  resourceRoutesQuery,
  resourcePageQuery,
  legalRoutesQuery,
  legalPageQuery,
  topLevelTopicsQuery,
  aboutPageQuery,
  contactPageQuery,
  getCollectionPageQuery,
  getQueryForAllCollectionUrlSlugs,
} = require('./queries')
const { CONTENTFUL_CDA_BASE_URL } = require('./constants')
const { EN_LOCALE, FR_LOCALE } = require('~/utils/constants')
// const {aboutPageQuery, contactPageQuery} = require("~/utils/queries");

module.exports = async (contentfulAccessToken, contentfulSpaceId) => {
  const apiURL = `${CONTENTFUL_CDA_BASE_URL}${contentfulSpaceId}`

  // Setup axios
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${contentfulAccessToken}`,
    },
  }

  // Locales
  const localeEN = EN_LOCALE
  const localeFR = FR_LOCALE
  const locales = [localeEN, localeFR]

  // Route prefixes
  const topicRoutePrefix = {}
  const resourceRoutePrefix = {}
  const legalRoutePrefix = {}
  const collectionRoutePrefix = {}

  topicRoutePrefix[localeEN] = langEN.page_prefix.topic
  topicRoutePrefix[localeFR] = langFR.page_prefix.topic
  resourceRoutePrefix[localeEN] = langEN.page_prefix.resource
  resourceRoutePrefix[localeFR] = langFR.page_prefix.resource
  legalRoutePrefix[localeEN] = langEN.page_prefix.legal
  legalRoutePrefix[localeFR] = langFR.page_prefix.legal
  collectionRoutePrefix[localeEN] = langEN.page_prefix.collection
  collectionRoutePrefix[localeFR] = langFR.page_prefix.collection

  const topicRoutes = []
  const collectionRoutes = []
  const resourceRoutes = []
  const legalRoutes = []

  // Get routes for all pages
  for (const locale of locales) {
    // get topic routes
    const topicQuery = topicRoutesQuery(locale)
    await axios.post(apiURL, { query: topicQuery }, axiosConfig).then((res) => {
      res.data.data.topicCollection.items.forEach((item) => {
        const prefix =
          locale === localeEN
            ? topicRoutePrefix[localeEN]
            : topicRoutePrefix[localeFR]
        const path = `/${prefix}/${item.urlSlug}`
        topicRoutes.push({
          locale,
          path,
          urlSlug: item.urlSlug,
        })
      })
    })

    // get collection routes
    const queryForAllCollectionUrlslugs =
      getQueryForAllCollectionUrlSlugs(locale)
    await axios
      .post(apiURL, { query: queryForAllCollectionUrlslugs }, axiosConfig)
      .then((res) => {
        res.data.data.collectionCollection.items.forEach((collectionItem) => {
          const pathPrefix =
            locale === localeEN
              ? collectionRoutePrefix[localeEN]
              : collectionRoutePrefix[localeFR]
          const path = `/${pathPrefix}/${collectionItem.urlSlug}`
          collectionRoutes.push({
            locale,
            path,
            urlSlug: collectionItem.urlSlug,
          })
        })
      })

    // get resource routes
    const resourceQuery = resourceRoutesQuery(locale)
    await axios
      .post(apiURL, { query: resourceQuery }, axiosConfig)
      .then((res) => {
        res.data.data.testResourceCollection.items.forEach((item) => {
          const prefix =
            locale === localeEN
              ? resourceRoutePrefix[localeEN]
              : resourceRoutePrefix[localeFR]
          const path = `/${prefix}/${item.urlSlug}`
          resourceRoutes.push({
            locale,
            path,
            urlSlug: item.urlSlug,
          })
        })
      })

    // get legal routes
    const legalQuery = legalRoutesQuery(locale)
    await axios.post(apiURL, { query: legalQuery }, axiosConfig).then((res) => {
      res.data.data.legalPageCollection.items.forEach((item) => {
        const prefix =
          locale === localeEN
            ? legalRoutePrefix[localeEN]
            : legalRoutePrefix[localeFR]
        const path = `/${prefix}/${item.urlSlug}`
        legalRoutes.push({
          locale,
          path,
          urlSlug: item.urlSlug,
        })
      })
    })
  }

  // Get payload for each route
  const topicRoutesWithPayload = []
  const resourceRoutesWithPayload = []
  const legalRoutesWithPayload = []
  const homeRoutesWithPayload = []
  const collectionRoutesWithPayload = []

  // routes: topic
  for (const route of topicRoutes) {
    // console.log(route)
    const alternateLocale = route.locale === localeEN ? localeFR : localeEN
    const pageQuery = topicPageQuery(
      route.urlSlug,
      route.locale,
      alternateLocale
    )
    // console.log(pageQuery)
    const topicItem = await axios
      .post(apiURL, { query: pageQuery }, axiosConfig)
      .then((res) => {
        // console.log(`from ${route.urlSlug}`, res, res.data, res.data.data.topicCollection)
        // console.log(res.data, res.data.data)
        return res.data.data.topicCollection.items[0]
      })
    // console.log(topicItem)
    topicRoutesWithPayload.push({
      route: route.path,
      payload: {
        locale: route.locale,
        topic: topicItem,
      },
    })
  }

  // routes: collections
  for (const collectionRoute of collectionRoutes) {
    const alternateLocale =
      collectionRoute.locale === localeEN ? localeFR : localeEN

    const collectionPageQuery = getCollectionPageQuery(
      collectionRoute.urlSlug,
      collectionRoute.locale,
      alternateLocale
    )

    const collectionItem = await axios
      .post(apiURL, { query: collectionPageQuery }, axiosConfig)
      .then((res) => {
        return res.data.data.collectionCollection.items[0]
      })

    collectionRoutesWithPayload.push({
      route: collectionRoute.path,
      payload: {
        locale: collectionRoute.locale,
        collection: collectionItem,
      },
    })
  }

  // routes: resources
  for (const route of resourceRoutes) {
    const alternateLocale = route.locale === localeEN ? localeFR : localeEN
    const pageQuery = resourcePageQuery(
      route.urlSlug,
      route.locale,
      alternateLocale
    )
    const resourceItem = await axios
      .post(apiURL, { query: pageQuery }, axiosConfig)
      .then((res) => {
        // console.log(res.data.data)
        return res.data.data.testResourceCollection.items[0]
      })
    resourceRoutesWithPayload.push({
      route: route.path,
      payload: {
        locale: route.locale,
        resource: resourceItem,
      },
    })
  }

  // routes: legal
  for (const route of legalRoutes) {
    const alternateLocale = route.locale === localeEN ? localeFR : localeEN
    const pageQuery = legalPageQuery(
      route.urlSlug,
      route.locale,
      alternateLocale
    )
    const legalItem = await axios
      .post(apiURL, { query: pageQuery }, axiosConfig)
      .then((res) => {
        // console.log(res.data)
        return res.data.data.legalPageCollection.items[0]
      })
    legalRoutesWithPayload.push({
      route: route.path,
      payload: {
        locale: route.locale,
        legalPage: legalItem,
      },
    })
  }

  // Home Page --------------------------------------------------------------------------------------------------------

  const homeRoutes = [
    {
      locale: localeEN,
      path: '/',
      urlSlug: '',
    },
    {
      locale: localeFR,
      path: '/fr',
      urlSlug: '',
    },
  ]
  for (const route of homeRoutes) {
    // const alternateLocale = route.locale === localeEN ? localeFR : localeEN
    const pageQuery = topLevelTopicsQuery(route.locale)
    const homeItem = await axios
      .post(apiURL, { query: pageQuery }, axiosConfig)
      .then((res) => {
        return res.data.data.topicCollection.items
      })
    homeRoutesWithPayload.push({
      route: route.path,
      payload: {
        locale: route.locale,
        topics: homeItem,
      },
    })
  }

  // About Page -------------------------------------------------------------------------------------------------------

  const aboutPageRoutes = [
    {
      locale: localeEN,
      path: '/about',
      urlSlug: '',
    },
    {
      locale: localeFR,
      path: '/a-propos',
      urlSlug: '',
    },
  ]

  for (const route of aboutPageRoutes) {
    // const alternateLocale = route.locale === localeEN ? localeFR : localeEN
    const pageQuery = aboutPageQuery(route.locale)
    const aboutPage = await axios
      .post(apiURL, { query: pageQuery }, axiosConfig)
      .then((res) => {
        return res.data.data.aboutPageCollection.items[0]
      })
    homeRoutesWithPayload.push({
      route: route.path,
      payload: {
        locale: route.locale,
        page: aboutPage,
      },
    })
  }

  // Contact Page -----------------------------------------------------------------------------------------------------

  const contactPageRoutes = [
    {
      locale: localeEN,
      path: '/contact',
      urlSlug: '',
    },
    {
      locale: localeFR,
      path: '/nous-joindre',
      urlSlug: '',
    },
  ]

  for (const route of contactPageRoutes) {
    // const alternateLocale = route.locale === localeEN ? localeFR : localeEN
    const pageQuery = contactPageQuery(route.locale)
    const contactPage = await axios
      .post(apiURL, { query: pageQuery }, axiosConfig)
      .then((res) => {
        return res.data.data.contactPageCollection.items[0]
      })
    homeRoutesWithPayload.push({
      route: route.path,
      payload: {
        locale: route.locale,
        page: contactPage,
      },
    })
  }

  return topicRoutesWithPayload
    .concat(homeRoutesWithPayload)
    .concat(resourceRoutesWithPayload)
    .concat(legalRoutesWithPayload)
    .concat(collectionRoutesWithPayload)
}

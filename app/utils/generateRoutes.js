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
} = require('./queries')
const { CONTENTFUL_CDA_BASE_URL } = require('./constants')

module.exports = async (contentfulAccessToken, contentfulSpaceId) => {
  const apiURL = `${CONTENTFUL_CDA_BASE_URL}${contentfulSpaceId}`

  // Setup axios
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${contentfulAccessToken}`,
    },
  }

  // Locales
  const localeEN = 'en-CA'
  const localeFR = 'fr-CA'
  const locales = [localeEN, localeFR]

  // Route prefixes
  const topicRoutePrefix = {}
  const resourceRoutePrefix = {}
  const legalRoutePrefix = {}

  topicRoutePrefix[localeEN] = langEN.page_prefix.topic
  topicRoutePrefix[localeFR] = langFR.page_prefix.topic
  resourceRoutePrefix[localeEN] = langEN.page_prefix.resource
  resourceRoutePrefix[localeFR] = langFR.page_prefix.resource
  legalRoutePrefix[localeEN] = langEN.page_prefix.legal
  legalRoutePrefix[localeFR] = langFR.page_prefix.legal

  const topicRoutes = []
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
        const path = `/${prefix}${item.urlSlug}`
        topicRoutes.push({
          locale,
          path,
          urlSlug: item.urlSlug,
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
          const path = `/${prefix}${item.urlSlug}`
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
        const path = `/${prefix}${item.urlSlug}`
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
        // console.log(res.data)
        // console.log(res.data.data)
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
        // console.log(`from ${route.urlSlug}`, res, res.data, res.data.data.topicCollection)
        // console.log(res.data)
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
        // console.log(res.data.data)
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
  console.log('------ generated routes ----------')
  console.log(
    // topicRoutesWithPayload,
    // resourceRoutesWithPayload,
    legalRoutesWithPayload
  )
  console.log("000000000")
  console.log(legalRoutes)

  return topicRoutesWithPayload
    .concat(resourceRoutesWithPayload)
    .concat(legalRoutesWithPayload)
}

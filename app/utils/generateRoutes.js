const axios = require('axios')

const langEN = require('../locales/en.json')
const langFR = require('../locales/fr.json')
const { topicRoutesQuery, topicPageQuery } = require('./queries')
const { CONTENTFUL_CDA_BASE_URL } = require('./constants')
const { resourceRoutesQuery, resourcePageQuery } = require('./queries')

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

  topicRoutePrefix[localeEN] = langEN.page_prefix.topic
  topicRoutePrefix[localeFR] = langFR.page_prefix.topic
  resourceRoutePrefix[localeEN] = langEN.page_prefix.resource
  resourceRoutePrefix[localeFR] = langFR.page_prefix.resource

  const topicRoutes = []
  const resourceRoutes = []

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
  }

  // Get payload for each route
  const topicRoutesWithPayload = []
  const resourceRoutesWithPayload = []

  // routes: topic
  for (const route of topicRoutes) {
    console.log(route)
    const alternateLocale = route.locale === localeEN ? localeFR : localeEN
    const pageQuery = topicPageQuery(
      route.urlSlug,
      route.locale,
      alternateLocale
    )
    console.log(pageQuery)
    const topicItem = await axios
      .post(apiURL, { query: pageQuery }, axiosConfig)
      .then((res) => {
        // console.log(`from ${route.urlSlug}`, res, res.data, res.data.data.topicCollection)
        console.log(res.data)
        console.log(res.data.data)
        return res.data.data.topicCollection.items[0]
      })
    console.log(topicItem)
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
        console.log(res.data)
        console.log(res.data.data)
        return res.data.data.testResourceCollection.items[0]
      })
    console.log(resourceItem)
    resourceRoutesWithPayload.push({
      route: route.path,
      payload: {
        locale: route.locale,
        topic: resourceItem,
      },
    })
  }
  console.log('------ topic routes ----------')
  console.log(topicRoutesWithPayload, resourceRoutesWithPayload)

  return topicRoutesWithPayload.concat(resourceRoutesWithPayload)
}

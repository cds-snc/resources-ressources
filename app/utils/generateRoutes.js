const axios = require('axios')

const langEN = require('../locales/en.json')
const langFR = require('../locales/fr.json')
const { topicRoutesQuery, topicPageQuery } = require('./queries')
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

  // Topics
  const topicRoutePrefix = {}
  topicRoutePrefix[localeEN] = langEN.page_prefix.topic
  topicRoutePrefix[localeFR] = langFR.page_prefix.topic

  console.log('routes?')
  console.log(
    topicRoutePrefix,
    topicRoutePrefix[localeEN],
    topicRoutePrefix[localeFR]
  )

  const topics = []
  const topicRoutes = []

  for (const locale of locales) {
    topics[locale] = []

    // get topic routes
    const topicQuery = topicRoutesQuery(locale)
    await axios.post(apiURL, { query: topicQuery }, axiosConfig).then((res) => {
      res.data.data.topicCollection.items.forEach((item) => {
        const prefix =
          locale === localeEN
            ? topicRoutePrefix[localeEN]
            : topicRoutePrefix[localeFR]
        const path = `${prefix}${item.urlSlug}`
        topicRoutes.push({
          locale,
          path,
          urlSlug: item.urlSlug,
        })
      })
    })

    console.log('topics', topics)
    console.log('topicRoutes', topicRoutes)

    // todo: get resource routes
  }

  const topicRoutesWithPayload = []
  // get payload for each route
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

  console.log('TOPIC ROUTESSS', topicRoutesWithPayload)

  console.log('------ topic routes ----------')
  console.log(topicRoutesWithPayload)

  return topicRoutesWithPayload
}

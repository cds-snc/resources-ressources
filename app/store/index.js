import {
  CONTENTFUL_CDA_BASE_URL,
  EN_LOCALE,
  FR_LOCALE,
} from '~/utils/constants'
import { getTopLevelTopicsQuery } from '~/utils/queries'
const axios = require('axios')
const config = require('../.contentful.json')

export const state = () => ({
  topics: {
    [EN_LOCALE]: [],
    [FR_LOCALE]: [],
  },
  topicsLoaded: false,
})

export const getters = {
  getTopics(state, locale) {
    return state.topics[locale]
  },
}

export const mutations = {
  addTopic(state, { locale, topic }) {
    state.topics[locale].push(topic)
  },
  setTopicsLoaded(state) {
    state.topicsLoaded = true
  },
}

export const actions = {
  async nuxtServerInit({ state, commit }) {
    // Locales
    // todo: refactor to use locales from config
    const locales = [EN_LOCALE, FR_LOCALE]

    const spaceId = config.CTF_SPACE_ID || process.env.contentful_space_id
    const accessToken =
      config.CTF_CDA_ACCESS_TOKEN || process.env.contentful_cda_access_token

    const apiURL = `${CONTENTFUL_CDA_BASE_URL}${spaceId}`

    // todo: refactor to not have duplication
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    if (!state.topicsLoaded) {
      for (const locale of locales) {
        const topicQuery = getTopLevelTopicsQuery(locale)

        await axios
          .post(apiURL, { query: topicQuery }, axiosConfig)
          .then((res) => {
            res.data.data.topicCollection.items.forEach((item) => {
              commit('addTopic', { locale, topic: item })
              commit('setTopicsLoaded', true)
            })
          })
      }
    }
  },
}
